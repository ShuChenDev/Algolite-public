from abc import ABC, abstractmethod
from datetime import date, time, datetime

from Scheduler import Scheduler
from PositionManager import PositionManager
from Ticker import Ticker

class Strategy(ABC):
    """
    Abstract class for algo strategies. Users define logic with `on_data`, 
    and set parameters using provided initialization methods.
    """

    def __init__(self, cash=0, interval="minute", warmup_bars=0,
        start_date=None, end_date=None,
        start_time="09:30:00", end_time="16:00:00"):
      
      self.set_cash(cash)
      self.set_data_interval(interval)
      self.set_warmup(warmup_bars)
      self.set_trading_date(start_date or date.today(), end_date)
      self.set_trading_time(start_time, end_time)




    @abstractmethod
    def initialize(self):
      pass

    @abstractmethod
    def on_data(self):
      pass


# GENRAL STRATEGY METHODS

    def resume_strategy(self):
      pass

    def pause_strategy(self):
      pass

    def terminate_strategy(self):
      pass


# INITIALIZATION METHODS

    def set_cash(self, cash):
      self.cash = cash

    def set_trading_date(self, start_date, end_date):
      self.start_date = start_date
      self.end_date = end_date

    def set_trading_time(self, start_time, end_time):
      self.start_time = datetime.strptime(start_time, "%H:%M:%S").time()
      self.end_time = datetime.strptime(end_time, "%H:%M:%S").time()

    def set_warmup(self, warmup_bars):
      self.warmup = warmup_bars

    def set_data_interval(self, interval):
      valid_intervals = {"minute", "day", "month"}
      if interval in valid_intervals:
        self.interval = interval
      else:
        self.interval = "minute"
        print("Invalid interval, defaulting to 'minute'.")