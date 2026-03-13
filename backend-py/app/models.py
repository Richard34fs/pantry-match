from sqlalchemy import Column, Integer, String, Text, Numeric, ForeignKey
from sqlalchemy.orm import declarative_base, relationship
from app.database import engine

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)

    refrigerator_items = relationship("RefrigeratorItem", back_populates="owner", cascade="all, delete-orphan")

class RefrigeratorItem(Base):
    __tablename__ = "refrigerator"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    ingredient = Column(Text, nullable=False) # Exact match with your DB
    quantity = Column(Numeric(10, 2), nullable=False)
    unit_measurement = Column(Text, nullable=False)

    owner = relationship("User", back_populates="refrigerator_items")

Base.metadata.create_all(bind=engine)
