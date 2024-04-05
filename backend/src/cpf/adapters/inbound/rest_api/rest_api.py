from fastapi import FastAPI, APIRouter

router = APIRouter(prefix="/cpf/api")
app = FastAPI()


@router.get(path="/health")
def health_check():
    return "Ok!"


app.include_router(router=router)
