import requests
from bs4 import BeautifulSoup
from datetime import datetime
import time
def checkPrice():
    r = requests.get('https://www.okcoin.com/')
    soup = BeautifulSoup(r.text)
    price = soup.select("#bannerLtcLast")[0].get_text()
    timing = str(datetime.now()) 
    print price + " --- " + timing

while True:
    checkPrice()
    time.sleep(60)


