import requests
import pandas as pd
import yfinance as yf
from datetime import datetime, timedelta

def get_earnings(date):
    url = f'https://api.nasdaq.com/api/calendar/earnings?date={date}'
    response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
    return response.json()['data']['rows']

def generate_dates(start_date):
    start_date = datetime.strptime(start_date, '%Y-%m-%d')
    max_date = datetime.now() + timedelta(weeks=1)
    dates = []
    delta = max_date - start_date
    for i in range(delta.days + 1):
        date = start_date + timedelta(days=i)
        if date.weekday() < 5:
            dates.append(date.strftime('%Y-%m-%d'))
    return dates

def get_high_prices(ticker, earnings_date):
    stock = yf.Ticker(ticker)
    date_format = '%Y-%m-%d'
    
    date_ranges = {
        'day_before': datetime.strptime(earnings_date, date_format) - timedelta(days=1),
        'week_before': datetime.strptime(earnings_date, date_format) - timedelta(weeks=1),
        'month_before': datetime.strptime(earnings_date, date_format) - timedelta(weeks=4),
        'earnings_day': datetime.strptime(earnings_date, date_format),
        'day_after': datetime.strptime(earnings_date, date_format) + timedelta(days=1),
        'week_after': datetime.strptime(earnings_date, date_format) + timedelta(weeks=1),
        'month_after': datetime.strptime(earnings_date, date_format) + timedelta(weeks=4)
    }

    start_date = (min(date_ranges.values()) - timedelta(days=1)).strftime(date_format)
    end_date = (max(date_ranges.values()) + timedelta(days=1)).strftime(date_format)

    try:
        hist = stock.history(start=start_date, end=end_date)
        high_prices = {}
        for key, date in date_ranges.items():
            date_str = date.strftime(date_format)
            if date_str in hist.index:
                high_prices[key] = hist.loc[date_str]['High']
            else:
                high_prices[key] = None
    except Exception as e:
        high_prices = {key: None for key in date_ranges}
        print(f'Error fetching data for {ticker} from {start_date} to {end_date}: {e}')
    
    return high_prices

# Main script
if __name__ == '__main__':
    past_dates = generate_dates('2024-07-01')
    all_earnings = []

    for date in past_dates:
        earnings_data = get_earnings(date)
        if earnings_data:
            for item in earnings_data:
                all_earnings.append({
                    'date': date,
                    'symbol': item['symbol'],
                    'eps': item.get('eps', None),
                    'epsForecast': item.get('epsForecast', None),
                    'noOfEsts': item.get('noOfEests', None),
                    'marketCap': item['marketCap']
                })

    for earnings in all_earnings:
        high_prices = get_high_prices(earnings['symbol'], earnings['date'])
        earnings.update(high_prices)

    # Convert results to DataFrame for better readability
    df = pd.DataFrame(all_earnings)
    
    df.to_csv('prices/earnings.csv', index=False)