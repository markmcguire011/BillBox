from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.invoice import router as invoice_router

app = FastAPI(title="BillBox API", description="API for BillBox invoice management")

app.include_router(router=invoice_router)

origins = [
    "http://localhost:3001",  # development URL
    "http://localhost:3000",
    "https://your-next-app.com",  # deployed site
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

@app.get("/")
async def root():
    return {"message": "Welcome to BillBox API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)