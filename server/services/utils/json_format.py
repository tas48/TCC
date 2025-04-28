from typing import Optional, Dict, Any
import re

def is_valid_target(target: str) -> bool:
    """
    Verifica se o target (domínio, IP ou site) é válido.

    Parâmetros:
    - target (str): O domínio, IP ou site a ser validado.

    Retorna:
    - bool: True se for um alvo válido (domínio, IP ou site), False caso contrário.
    """
    # Expressão regular para validar IPs no formato IPv4
    ip_pattern = r'^(?:\d{1,3}\.){3}\d{1,3}$'
    
    # Expressão regular para validar domínios (sem o esquema http:// ou https://)
    domain_pattern = r'^(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$'
    
    # Expressão regular para validar URLs completas (http:// ou https://)
    url_pattern = r'^(https?://)(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}(?:/.*)?$'

    # Verifica se é um IP válido
    if re.match(ip_pattern, target):
        return True

    # Verifica se é um domínio válido
    if re.match(domain_pattern, target):
        return True

    # Verifica se é uma URL válida (com http:// ou https://)
    if re.match(url_pattern, target):
        return True

    return False


def format_response(status: str, message: str, data: Optional[Dict[str, Any]] = None, error_code: Optional[int] = None) -> Dict[str, Any]:
    """
    Parâmetros:
    - status (str): "success" para sucesso, "error" para erro.
    - message (str): Mensagem descritiva sobre o resultado.
    - data (dict, opcional): Dados retornados pela ferramenta.
    - error_code (int, opcional): Código de erro, se aplicável.

    Retorna:
    - dict: Resposta padronizada no formato JSON.
    """
    return {
        "status": status,
        "message": message,
        "error_code": error_code if error_code is not None else None,
        "data": data if data is not None else {}
    }