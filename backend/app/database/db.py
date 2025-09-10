from sqlmodel import Field, Session, SQLModel, create_engine, select
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy import delete

from app.database.history_data import fetch_stock_candles
from app.database.models import StockCandle, AlgoliteProject

import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")
DATABASE_URL = os.environ["DATABASE_URL"]
engine = create_engine(DATABASE_URL)
SQLModel.metadata.create_all(engine)

# Market Data


def save_stock_candles(ticker, interval, start, end):
    """
    Fetch historical stock candlestick and create or update to database
    """
    df = fetch_stock_candles(ticker, interval, start, end)
    rows = [
        dict(
            ticker=ticker,
            interval=interval,
            timestamp=row.date,
            open=row.open,
            high=row.high,
            low=row.low,
            close=row.close,
            volume=row.volume,
        )
        for row in df.itertuples(index=False)
    ]
    with Session(engine) as session:
        statement = insert(StockCandle).values(rows)
        statement = statement.on_conflict_do_nothing(
            index_elements=["ticker", "interval", "timestamp"]
        )
        session.exec(statement)
        session.commit()


def get_stock_candles(ticker, interval=None, start=None, end=None, limit="100"):
    """
    Return {limit} amount of stock candlestick data
    """

    with Session(engine) as session:
        statement = select(StockCandle).where(StockCandle.ticker == ticker)

        if interval:
            statement = statement.where(StockCandle.interval == interval)

        if start and end:
            statement = statement.where(
                StockCandle.timestamp.between(start, end))

        statement = statement.order_by(
            StockCandle.timestamp.asc()).limit(limit)

        results = session.exec(statement).all()

        if start and end and not results:
            try:
                save_stock_candles(ticker, interval, start, end)
                results = session.exec(statement).all()
            except Exception:
                pass

        return results


def delete_stock_candles(ticker, interval=None, start=None, end=None):
    """
    Delete candlestick data for a ticker, return the total bars deleted
    """
    with Session(engine) as session:
        statement = delete(StockCandle).where(StockCandle.ticker == ticker)

        if interval:
            statement = statement.where(StockCandle.interval == interval)
        if start and end:
            statement = statement.where(
                StockCandle.timestamp.between(start, end))

        result = session.exec(statement)
        session.commit()
        return result.rowcount
    """
  Delete a project by its name, return the deleted project
  """
    with Session(engine) as session:
        statement = select(AlgoliteProject).where(
            AlgoliteProject.projectName == projectName)
        result = session.exec(statement)
        project = result.one()
        session.delete(project)
        session.commit()
        return project
