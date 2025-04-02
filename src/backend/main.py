from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uuid
import os
from datetime import datetime, timedelta
import random

app = FastAPI(title="BillBox API", description="API for BillBox invoice management")

# Allow requests from your Next.js frontend
origins = [
    "http://localhost:3001",  # Next.js development URL
    "https://your-next-app.com",  # Replace with your deployed site
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

# Simple in-memory storage for demo purposes
invoices = []

@app.get("/")
async def root():
    return {"message": "Welcome to BillBox API"}

@app.post("/invoices/upload")
async def upload_invoice(file: UploadFile = File(...)):
    # Validate file type
    allowed_types = ["application/pdf", "image/jpeg", "image/png"]
    content_type = file.content_type or ""
    
    if not any(allowed_type in content_type for allowed_type in ["pdf", "jpeg", "png", "jpg"]):
        raise HTTPException(
            status_code=400, 
            detail="Invalid file type. Only PDF, JPG, and PNG are supported."
        )
    
    # Generate a unique ID for this invoice
    invoice_id = str(uuid.uuid4())
    
    # Get file size
    file_content = await file.read()
    file_size = len(file_content)
    
    # In a real app, you would save the file and process it with OCR
    # For now, we'll just return some mock data
    
    # Generate random invoice data
    invoice_date = datetime.now() - timedelta(days=random.randint(1, 30))
    due_date = invoice_date + timedelta(days=random.randint(15, 45))
    amount = round(random.uniform(10.0, 1000.0), 2)
    
    # Create a mock invoice object
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
    
    # In a real app, you would store this in a database
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

@app.get("/invoices")
async def get_invoices():
    print(invoices)
    return invoices

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)