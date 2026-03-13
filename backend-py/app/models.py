from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import declarative_base
from database import engine

Base = declarative_base()

class RefrigeratorItem(Base):
    __tablename__ = "refrigerator"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    ingredient_name = Column(String, nullable=False)
    quantity = Column(Float, nullable=False)
    unit_measurement = Column(String, nullable=False)

Base.metadata.create_all(bind=engine)
