from sqlmodel import SQLModel, Field
import datetime


class AlgoliteProject(SQLModel, table=True):
  projectName: str = Field(primary_key=True)
  code: str | None = Field(default=None, nullable=True)
  
class StockCandle(SQLModel, table=True):
  ticker: str = Field(primary_key=True)
  interval: str = Field(primary_key=True)
  timestamp: datetime.datetime = Field(primary_key=True)
  open: float
  high: float
  low: float
  close: float
  volume: int

