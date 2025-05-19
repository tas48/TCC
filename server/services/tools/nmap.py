import subprocess
import re
import nmap
from json_format import format_response

class NmapService:
    @staticmethod
    def port_scan(target: str, scan_type: str):
        if scan_type == "fast":
            command = ["nmap", "-T4", "-sV", target]
        elif scan_type == "full":
            command = ["nmap", "-p-", "-sV", target]    
        else:
            return format_response("error", "Tipo de varredura inválido. Use 'fast' ou 'full'.", error_code=400)

        try:
            result = subprocess.run(command, stdout=subprocess.PIPE, text=True)

            # Extração de dados da saída do Nmap
            port_info = re.findall(r"(\d+/\w+)\s+(\w+)\s+(\S+)\s+(.*)", result.stdout)
            if not port_info:
                return format_response("success", "Nenhuma porta encontrada.", {"target": target})

            portas = []
            for port, state, service, version in port_info:
                portas.append({"port": port, "state": state, "service": service, "version": version})

            return format_response("success", "Scan de portas concluído.", {"target": target, "scan_type": scan_type, "ports": portas})
        except Exception as e:
            return format_response("error", f"Erro ao executar scan: {str(e)}", error_code=500)
        
    @staticmethod
    def scan_vulnerabilities(target: str, vuln_scan_type: int):
        nm = nmap.PortScanner()
        
        try:
            # Define o tipo de scan: específico (1) ou padrão (qualquer outro valor)
            scan_argument = (
                '--script=ssl-heartbleed,smb-vuln-ms17-010,smb-vuln-cve-2020-0796,http-log4shell,http-shellshock,ftp-anon,smtp-open-relay,dns-recursion,http-vuln-cve2017-5638,mysql-brute'
                if vuln_scan_type == 1 else '--script=vuln'
            )

            # Executa o scan
            nm.scan(hosts=target, arguments=scan_argument)

            # Processa os resultados
            if target not in nm.all_hosts():
                return format_response("error", "Nenhum host encontrado.", {"target": target}, error_code=404)

            vulnerabilities = {
                protocol: {
                    port: {
                        "estado": nm[target][protocol][port]['state'],
                        "vulnerabilidades": [
                            {"script": script, "output": output}
                            for script, output in nm[target][protocol][port].get('script', {}).items()
                        ]
                    }
                    for port in nm[target][protocol]
                }
                for protocol in nm[target].all_protocols()
            }

            return format_response("success", "Scan de vulnerabilidades concluído.", {"target": target, "vulnerabilities": vulnerabilities})

        except Exception as e:
            return format_response("error", f"Erro ao executar scan de vulnerabilidades: {str(e)}", error_code=500)        
    
    @staticmethod
    def network_scan(target: str):
        nm = nmap.PortScanner()
        try:
            nm.scan(hosts=target, arguments='-sn')

            hosts_info = {
                host: {
                    "estado": nm[host].state(),
                    "hostnames": nm[host].get('hostnames', []),
                    "enderecos": nm[host].get('addresses', {})
                }
                for host in nm.all_hosts()
            }

            return format_response("success", "Scan de rede concluído.", {"target": target, "hosts": hosts_info})

        except Exception as e:
            return format_response("error", f"Erro ao executar scan de rede: {str(e)}", error_code=500)

    @staticmethod
    def evade_firewall_scan(target: str):
        command = ["nmap", "-f", "--mtu", "16", "--data-length", "50", "-D", "RND:10", "-sS", "-sV", target]

        try:
            result = subprocess.run(command, stdout=subprocess.PIPE, text=True)
            port_info = re.findall(r"(\d+/\w+)\s+(\w+)\s+(\S+)\s+(.*)", result.stdout)

            if not port_info:
                return format_response("success", "Nenhuma porta encontrada ou bloqueada pelo firewall.", {"target": target})

            portas = [{"port": port, "state": state, "service": service, "version": version} for port, state, service, version in port_info]

            return format_response("success", "Scan com evasão de firewall concluído.", {"target": target, "ports": portas})

        except Exception as e:
            return format_response("error", f"Erro ao executar scan de evasão: {str(e)}", error_code=500)

    @staticmethod
    def firewall_detection(target: str):
        nm = nmap.PortScanner()
        resultado = {"target": target, "firewall_detected": False, "evasions": {}}

        try:
            scan_normal = nm.scan(hosts=target, arguments="-p 80,443 -sT")

            if 'tcp' in scan_normal["scan"].get(target, {}):
                portas_filtradas = [
                    p for p, v in scan_normal["scan"][target]["tcp"].items() if v["state"] == "filtered"
                ]

                if portas_filtradas:
                    resultado["firewall_detected"] = True
                    resultado["filtered_ports"] = portas_filtradas

                    evasions = {
                        "fragmentacao": "-f",
                        "mtu_16": "--mtu 16",
                        "data_length": "--data-length 50",
                        "decoy": "-D RND:5",
                        "syn_scan": "-sS"
                    }

                    for nome, arg in evasions.items():
                        try:
                            evasao_scan = nm.scan(hosts=target, arguments=f"-p 80,443 {arg}")
                            if 'tcp' in evasao_scan["scan"].get(target, {}):
                                resultado["evasions"][nome] = {
                                    "bypassed_ports": [
                                        p for p, v in evasao_scan["scan"][target]["tcp"].items() if v["state"] == "open"
                                    ]
                                }
                        except nmap.PortScannerError as e:
                            resultado["evasions"][nome] = {"error": str(e)}

            return format_response("success", "Detecção de firewall concluída.", resultado)

        except nmap.PortScannerError as e:
            return format_response("error", f"Erro ao detectar firewall: {str(e)}", error_code=500)
