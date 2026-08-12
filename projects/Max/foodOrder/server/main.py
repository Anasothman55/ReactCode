from ast import List
from typing import Annotated, Any, Final
import json
from uuid import UUID, uuid7
from pydantic import BaseModel, BeforeValidator, ConfigDict, EmailStr, Field, StringConstraints, ValidationInfo, field_validator
import uvicorn
import aiofiles
from fastapi import Body, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.responses import FileResponse
from pathlib import Path
from rich import print
from functools import partial
from fastapi.staticfiles import StaticFiles


BASE_PATH: Final = Path(__file__).resolve().parent 
image_dir = BASE_PATH / 'public'
meals_json = BASE_PATH / 'data' /'available-meals.json'
order_json = BASE_PATH / 'data' / 'orders.json'


app = FastAPI()


HOST: Final[str] = "0.0.0.0"
SERVER_PORT: Final[int] = 8000

app.mount("/images", StaticFiles(directory=f"{image_dir}/images"), name="images")


origins = [
  "http://localhost.tiangolo.com",
  "https://localhost.tiangolo.com",
  "http://localhost:5173",
  f"http://{HOST}:{SERVER_PORT}",
  f"http://{HOST}:5173",
  "http://localhost:{SERVER_PORT}",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)


@app.get('/meals')
async def get_meals():
  async with aiofiles.open(meals_json, "r") as file:
    content = await file.read()

  return json.loads(content)

@app.get('/{image_url}')
async def get_image(
  image_url: str
):
  image_path = image_dir / image_url

  if not image_path.exists():
    raise HTTPException(status_code=404, detail="Image not found")
  
  return FileResponse(
    image_path,
  )


def not_empty(v: str | EmailStr, field_name: str) -> str:
  if not v.strip():
    raise ValueError(f"{field_name} must not be empty")
  return v

class PostOrders(BaseModel):
  email : Annotated[EmailStr, BeforeValidator(partial(not_empty, field_name="Email"))]
  name: Annotated[str, BeforeValidator(partial(not_empty, field_name="name"))]
  street: Annotated[str, BeforeValidator(partial(not_empty, field_name="street"))]
  city: Annotated[str, BeforeValidator(partial(not_empty, field_name="city"))]
  postal_code: int
  
  
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

class Order(PostOrders):
  uid: UUID = Field(default_factory=uuid7)

@app.post('/orders')
async def post_order(
  body: Annotated[list[PostOrders], Body(min_length=1)]
):
  orders = [Order(**o.model_dump()) for o in body]
  async with aiofiles.open(order_json, "r") as file:
    content: list[Order] = json.loads(await file.read())

  content.append(*orders)

  async with aiofiles.open(order_json, "w") as file:
    await file.write(json.dumps(jsonable_encoder(content), indent=2))

  return {'message': 'Order created!' }


if __name__ == "__main__":
  uvicorn.run("main:app", port=SERVER_PORT, reload=True, host=HOST)

