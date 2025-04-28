# tools.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from schemas.target_request import TargetRequest
from services.dalfox import Dalfox

router = APIRouter()

@router.post("/dalfox/detect-xss")
def detect_xss(request: TargetRequest, db: Session = Depends(get_db)):
    if not request.target:
        raise HTTPException(status_code=400, detail="Target é obrigatório.")

    result = Dalfox.detect_xss(request.target)
    return result

@router.post("/dalfox/bypass-waf")
def bypass_waf(request: TargetRequest, db: Session = Depends(get_db)):
    if not request.target:
        raise HTTPException(status_code=400, detail="Target é obrigatório.")

    result = Dalfox.bypass_waf(request.target)
    return result

@router.post("/dalfox/analyze-context")
def analyze_context(request: TargetRequest, db: Session = Depends(get_db)):
    if not request.target:
        raise HTTPException(status_code=400, detail="Target é obrigatório.")

    result = Dalfox.analyze_context(request.target)
    return result

@router.post("/dalfox/check-csp")
def check_csp(request: TargetRequest, db: Session = Depends(get_db)):
    if not request.target:
        raise HTTPException(status_code=400, detail="Target é obrigatório.")

    result = Dalfox.check_csp(request.target)
    return result

@router.post("/dalfox/discover-hidden-params")
def discover_hidden_params(request: TargetRequest, db: Session = Depends(get_db)):
    if not request.target:
        raise HTTPException(status_code=400, detail="Target é obrigatório.")

    result = Dalfox.discover_hidden_params(request.target)
    return result

@router.post("/dalfox/detect-reflected-params")
def detect_reflected_params(request: TargetRequest, db: Session = Depends(get_db)):
    if not request.target:
        raise HTTPException(status_code=400, detail="Target é obrigatório.")

    result = Dalfox.detect_reflected_params(request.target)
    return result

@router.post("/dalfox/detect-persistent-xss")
def detect_persistent_xss(request: TargetRequest, db: Session = Depends(get_db)):
    if not request.target:
        raise HTTPException(status_code=400, detail="Target é obrigatório.")

    result = Dalfox.detect_persistent_xss(request.target)
    return result

@router.post("/dalfox/check-input-sanitization")
def check_input_sanitization(request: TargetRequest, db: Session = Depends(get_db)):
    if not request.target:
        raise HTTPException(status_code=400, detail="Target é obrigatório.")

    result = Dalfox.check_input_sanitization(request.target)
    return result

@router.post("/dalfox/detect-xss-json")
def detect_xss_in_json(request: TargetRequest, db: Session = Depends(get_db)):
    if not request.target:
        raise HTTPException(status_code=400, detail="Target é obrigatório.")

    result = Dalfox.detect_xss_in_json(request.target)
    return result
