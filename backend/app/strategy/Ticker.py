from PositionManager import PositionManager

class Ticker():
    """
    Represent a ticker that this strategy will trade.
    Handles market data updates and simple order actions.
    """

    def __init__(self, positionManager: PositionManager, symbol, exchange="SMART", currency="USD"):
        self.positionManager = positionManager

        self.symbol = symbol
        self.exchange = exchange
        self.currency = currency

        self.position = 0

        self.open = 0
        self.high = 0
        self.low = 0
        self.close = 0
        self.volume = 0

    def update_price(self, open=None, high=None, low=None, close=None, volume=None):
        if open is not None:
            self.open = open
        if high is not None:
            self.high = high
        if low is not None:
            self.low = low
        if close is not None:
            self.close = close
        if volume is not None:
            self.volume = volume

    def market_order(self, quantity):
        self.position = self.positionManager.scheduler.market_order(self, quantity)
        
    def limit_order(self, quantity, limit_price):
        self.position = self.positionManager.scheduler.limit_order(self, quantity, limit_price)

    def stop_order(self, quantity, stop_price):
        self.position = self.positionManager.scheduler.stop_order(self, quantity, stop_price)

    def liquidate(self):
        self.position = self.positionManager.scheduler.market_order(self, -self.position)
