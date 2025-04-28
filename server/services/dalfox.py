# dalfox_service.py
from services.api import run_in_docker_dalfox
from services.utils.json_format import format_response, is_valid_target

class Dalfox:

    @staticmethod
    def detect_xss(target):
        if not is_valid_target(target):
            return format_response("error", "Target inválido. Forneça um domínio ou IP válido.", error_code=422)

        response = run_in_docker_dalfox(["url", target])

        if not response["success"]:
            return format_response("error", f"Erro ao rodar Dalfox: {response.get('error', 'Erro desconhecido')}", error_code=500)

        output = response["output"]

        if "VULN" in output.upper():
            return format_response("warning", "XSS detectado!", data={"output": output})
        else:
            return format_response("success", "Nenhum XSS detectado.", data={"output": output})

    @staticmethod
    def bypass_waf(target):
        if not is_valid_target(target):
            return format_response("error", "Target inválido. Forneça um domínio ou IP válido.", error_code=422)

        response = run_in_docker_dalfox(["url", target, "--waf-evasion"])

        if not response["success"]:
            return format_response("error", f"Erro ao rodar Dalfox (Bypass WAF): {response.get('error', 'Erro desconhecido')}", error_code=500)

        output = response["output"]

        if "VULN" in output.upper():
            return format_response("warning", "Bypass de WAF detectado!", data={"output": output})
        else:
            return format_response("success", "Nenhum Bypass de WAF detectado.", data={"output": output})

    @staticmethod
    def analyze_context(target):
        if not is_valid_target(target):
            return format_response("error", "Target inválido.", error_code=422)

        response = run_in_docker_dalfox(["url", target, "--deep-dive"])

        if not response["success"]:
            return format_response("error", f"Erro ao rodar Dalfox (Analyze Context): {response.get('error', 'Erro desconhecido')}", error_code=500)

        output = response["output"]

        if "VULN" in output.upper():
            return format_response("warning", "Vulnerabilidades de contexto detectadas!", data={"output": output})
        else:
            return format_response("success", "Nenhuma vulnerabilidade de contexto detectada.", data={"output": output})

    @staticmethod
    def check_csp(target):
        if not is_valid_target(target):
            return format_response("error", "Target inválido.", error_code=422)

        response = run_in_docker_dalfox(["url", target, "--find-csp"])

        if not response["success"]:
            return format_response("error", f"Erro ao rodar Dalfox (Check CSP): {response.get('error', 'Erro desconhecido')}", error_code=500)

        output = response["output"]

        if "CSP" in output.upper():
            return format_response("warning", "Possíveis problemas de CSP detectados!", data={"output": output})
        else:
            return format_response("success", "Nenhum problema de CSP encontrado.", data={"output": output})

    @staticmethod
    def discover_hidden_params(target):
        if not is_valid_target(target):
            return format_response("error", "Target inválido.", error_code=422)

        response = run_in_docker_dalfox(["url", target, "--find-dom-hidden"])

        if not response["success"]:
            return format_response("error", f"Erro ao rodar Dalfox (Discover Hidden Params): {response.get('error', 'Erro desconhecido')}", error_code=500)

        output = response["output"]

        if "hidden" in output.lower():
            return format_response("warning", "Parâmetros ocultos detectados!", data={"output": output})
        else:
            return format_response("success", "Nenhum parâmetro oculto encontrado.", data={"output": output})

    @staticmethod
    def detect_reflected_params(target):
        if not is_valid_target(target):
            return format_response("error", "Target inválido.", error_code=422)

        response = run_in_docker_dalfox(["url", target, "--find-reflect"])

        if not response["success"]:
            return format_response("error", f"Erro ao rodar Dalfox (Detect Reflected Params): {response.get('error', 'Erro desconhecido')}", error_code=500)

        output = response["output"]

        if "reflect" in output.lower():
            return format_response("warning", "Parâmetros refletidos detectados!", data={"output": output})
        else:
            return format_response("success", "Nenhum parâmetro refletido detectado.", data={"output": output})

    @staticmethod
    def detect_persistent_xss(target):
        if not is_valid_target(target):
            return format_response("error", "Target inválido.", error_code=422)

        response = run_in_docker_dalfox(["url", target, "--upload"])

        if not response["success"]:
            return format_response("error", f"Erro ao rodar Dalfox (Detect Persistent XSS): {response.get('error', 'Erro desconhecido')}", error_code=500)

        output = response["output"]

        if "VULN" in output.upper():
            return format_response("warning", "Possível XSS persistente detectado!", data={"output": output})
        else:
            return format_response("success", "Nenhuma evidência de XSS persistente detectada.", data={"output": output})

    @staticmethod
    def check_input_sanitization(target):
        if not is_valid_target(target):
            return format_response("error", "Target inválido.", error_code=422)

        response = run_in_docker_dalfox(["url", target, "--sqli", "--blind"])

        if not response["success"]:
            return format_response("error", f"Erro ao rodar Dalfox (Input Sanitization): {response.get('error', 'Erro desconhecido')}", error_code=500)

        output = response["output"]

        if "vulnerable" in output.lower():
            return format_response("warning", "Problemas de sanitização detectados!", data={"output": output})
        else:
            return format_response("success", "Entrada parece sanitizada.", data={"output": output})

    @staticmethod
    def detect_xss_in_json(target):
        if not is_valid_target(target):
            return format_response("error", "Target inválido.", error_code=422)

        response = run_in_docker_dalfox(["url", target, "--content-type", "application/json"])

        if not response["success"]:
            return format_response("error", f"Erro ao rodar Dalfox (XSS in JSON): {response.get('error', 'Erro desconhecido')}", error_code=500)

        output = response["output"]

        if "VULN" in output.upper():
            return format_response("warning", "Possível XSS em resposta JSON detectado!", data={"output": output})
        else:
            return format_response("success", "Nenhum XSS em JSON detectado.", data={"output": output})
