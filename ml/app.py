from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
from model import predict  # Your model function

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
async def home():
    return {"message": "FastAPI is running 🚀"}

class PredictRequest(BaseModel):
    fileUrl: str

@app.post("/api/ml/predict")
async def predict_expense(data: PredictRequest):
    try:
        print("📥 Received fileUrl:", data.fileUrl)  # Good for debugging
        result = await predict(data.fileUrl)
        print("✅ Prediction result:", result)
        return {"result": result}
    except Exception as e:
        print("❌ Error occurred:", str(e))  # Log in terminal
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=6001)  # Run FastAPI on port 6001
