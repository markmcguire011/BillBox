import fastapi
from fastapi import UploadFile, File, HTTPException
from datetime import datetime, timedelta
import uuid
import random

router = fastapi.APIRouter(prefix="/invoices", tags=["invoices"])

invoices = []

@router.get("/")
async def get_invoices():
    print(invoices)
    return invoices

@router.post("/upload")
async def upload_invoice(file: UploadFile = File(...)):
    content_type = file.content_type or ""
    print(content_type)
    
    if not any(allowed_type in content_type for allowed_type in ["pdf", "jpeg", "png", "jpg"]):
        raise HTTPException(
            status_code=400, 
            detail="Invalid file type. Only PDF, JPG, and PNG are supported."
        )
    
    invoice_id = str(uuid.uuid4())
    file_content = await file.read()
    file_size = len(file_content)
    
    #random invoice data
    invoice_date = datetime.now() - timedelta(days=random.randint(1, 30))
    due_date = invoice_date + timedelta(days=random.randint(15, 45))
    amount = round(random.uniform(10.0, 1000.0), 2)
    
    invoice = {
        "invoice_id": invoice_id,
        "filename": file.filename,
        "file_size": file_size,
        "upload_date": datetime.now().isoformat(),
        "analysis": {
            "invoice_date": invoice_date.isoformat(),
            "due_date": due_date.isoformat(),
            "amount": amount,
            "vendor": f"Example Vendor {random.randint(1, 100)}",
            "confidence_score": round(random.uniform(0.7, 0.99), 2)
        },
        "status": "processed"
    }
    
    invoices.append(invoice)
    
    return {
        "message": "Invoice uploaded and processed successfully",
        "invoice_id": invoice_id,
        "filename": file.filename,
        "file_size_bytes": file_size,
        "extracted_data": {
            "invoice_date": invoice_date.isoformat(),
            "due_date": due_date.isoformat(),
            "amount": amount,
            "vendor": invoice["analysis"]["vendor"],
            "confidence_score": invoice["analysis"]["confidence_score"]
        }
    }

