from app.database.config import Base
from sqlalchemy import Column, Integer, Text, Numeric, ForeignKey

class RefrigeratorItem(Base):
    __tablename__ = "refrigerator"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    ingredient = Column(Text, nullable=False)
    quantity = Column(Numeric(10,2), nullable=False)
    unit_measurement = Column(Text, nullable=False)
