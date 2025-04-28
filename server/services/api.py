# api.py
import subprocess

def run_in_docker_dalfox(arguments, timeout=60):
    """
    Executa o Dalfox dentro do container Docker usando os argumentos fornecidos.
    :param arguments: List[str] com os argumentos do Dalfox (por exemplo: ["url", "https://example.com"])
    :param timeout: Tempo máximo de execução (padrão: 60 segundos)
    :return: dict com 'success' (bool), 'output' (str) e, se erro, 'error' (str)
    """
    cmd = ["docker", "exec", "dalfox", "dalfox"] + arguments

    try:
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=timeout)

        if result.returncode != 0:
            return {
                "success": False,
                "output": result.stdout,
                "error": result.stderr
            }

        return {
            "success": True,
            "output": result.stdout
        }

    except subprocess.TimeoutExpired:
        return {
            "success": False,
            "output": "",
            "error": "Timeout: Dalfox demorou muito para responder."
        }
    except Exception as e:
        return {
            "success": False,
            "output": "",
            "error": f"Erro inesperado: {str(e)}"
        }
