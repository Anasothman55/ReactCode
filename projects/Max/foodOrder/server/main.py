from typing import Annotated, Any, Final
import json
from pydantic import BaseModel, BeforeValidator, ConfigDict, EmailStr, Field, StringConstraints, ValidationInfo, field_validator
import uvicorn
import aiofiles
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import rich
from functools import partial



app = FastAPI()


origins = [
  "http://localhost.tiangolo.com",
  "https://localhost.tiangolo.com",
  "http://localhost",
  "http://10.141.45.139:8080",
  "http://10.141.45.139:8080",
  "http://localhost:8080",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

BASE_PATH: Final = Path(__file__).resolve().parent / "data"
image_path = BASE_PATH / 'public/images'
meals_json = BASE_PATH / 'available-meals.json'
order_json = BASE_PATH / 'orders.json'

@app.get('/meals')
async def get_meals():
  async with aiofiles.open(meals_json, "r") as file:
    content = await file.read()

  return json.loads(content)



def not_empty(v: str | EmailStr, field_name: str) -> str:
  if not v.strip():
    raise ValueError(f"{field_name} must not be empty")
  return v

class PostOrders(BaseModel):
  email : Annotated[EmailStr, BeforeValidator(partial(not_empty, field_name="Email"))]
  name: Annotated[str, BeforeValidator(partial(not_empty, field_name="name"))]

  
  model_config = ConfigDict(
    str_strip_whitespace=True,
    extra="forbid"
  )

  # @field_validator("name",'email', mode="before")
  # @classmethod
  # def not_empty(cls, v: Any, info: ValidationInfo) -> str:
  #   if not isinstance(v, str) or not v.strip():
  #     raise ValueError(f"{info.field_name} must not be empty")
  #   return v

@app.post('/orders')
async def post_order(
  body: PostOrders
):
  return body



if __name__ == "__main__":
  uvicorn.run("main:app", port=8080, reload=True, host="10.141.45.139")

