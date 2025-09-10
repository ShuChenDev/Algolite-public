from Ticker import Ticker
from Scheduler import Scheduler

class PositionManager():
    def __init__(self, scheduler: Scheduler):
        self.tickers = []
        self.scheduler = scheduler
    def add_stock_ticker(self, symbol, exchange='SMART', currency='USD'):
        """
        Add a stock ticker to current strategy, advised to use a reference variable to track each single ticker
        """
        
        ticker = Ticker(self, symbol, exchange, currency)
        self.tickers.append(ticker)
        return ticker
    
    def liquidate(self):
        """
        Liquidate all tickers in this position manager
        """
        for ticker in self.tickers:
            ticker.liquidate()