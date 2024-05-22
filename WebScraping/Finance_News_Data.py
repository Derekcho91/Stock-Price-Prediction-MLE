from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time
import requests
from bs4 import BeautifulSoup
import pandas as pd
from datetime import date
import os

def get_news_urls(url): 
    # Configure Selenium to use headless mode
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    # Set up the Chrome WebDriver
    #driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    # Open the Yahoo Finance META news page
    driver.get(url)
    # Scroll to the bottom of the page to load all content
    max_attempts = 10
    #print(f"Scrolling to the bottom of the page...{scroll_attempts}")
    scroll_attempts = 0

    #print("Scrolling to the bottom of the page...")

    while True:
        #driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        driver.execute_script('window.scrollBy(0, 1000)')
        #print(f"Scrolling to the bottom of the page...{scroll_attempts}")
        time.sleep(2)  # Wait for the page to load
        scroll_attempts += 1
        if scroll_attempts >= max_attempts:
            #print("Reached the bottom of the page")
            break

    # Find all news article links
    articles = driver.find_elements(By.XPATH, "//a[contains(@href, '/news/')]")

    # Extract URLs and metadata
    news_urls = []
    for article in articles:
        url = article.get_attribute('href')
        if url not in news_urls:
            news_urls.append(url)
            
    driver.quit()
    print(f"URL Extraction Complete: {len(news_urls)} news articles found.")
    return news_urls

def extract_article_content(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Extract the title
    title = soup.find('h1').get_text()

    # Extract the date and source
    date_tag = soup.find('time')
    date = date_tag['datetime'] if date_tag else 'No date available'
    source = soup.find('div', class_='caas-attr-meta').get_text() if soup.find('div', class_='caas-attr-meta') else 'No source available'

    # Extract the content paragraphs
    paragraphs = soup.find_all('p')
    content = ' '.join([p.get_text() for p in paragraphs[:10]])

    return title, date, source, content

news_data_folder = f'news_data_{str(date.today())}'
if not os.path.exists(news_data_folder):
    os.makedirs(news_data_folder)

df_news = pd.DataFrame()

# Get news URLs for a list of stocks, Doing it this way so that data can be extracted one stock at a time
stock_list = ['META', 
              'AAPL', 
              'GOOG', 
              'AMZN', 
              'MSFT', 
              'NVDA', 
              'AMD']
for stock in stock_list:
    if os.path.exists(f'{news_data_folder}\{stock}_data_{str(date.today())}.csv'):
        print(f"Data already exists for {stock}")
        continue
    if os.path.exists(f'{news_data_folder}\{stock}_url_{str(date.today())}.txt'):
        with open(f'{news_data_folder}\{stock}_url_{str(date.today())}.txt', 'r') as file:
            news_urls = file.read().splitlines()
    else:
        news_urls = get_news_urls(f'https://sg.finance.yahoo.com/quote/{stock}/news')
        with open(f'{news_data_folder}\{stock}_url_{str(date.today())}.txt', 'w') as file:
            for url in news_urls:
                file.write(f"{url}\n")

    # Extract content from each news article
    for url in news_urls:
        title, article_date, source, content = extract_article_content(url)
        row_data = {'Title': title, 'Date': article_date, 'Source': source, 'Content': content, 'URL': url, 'Stock': stock}
        df_news = pd.concat([df_news, pd.DataFrame([row_data])])
    print(f"Extracted {len(news_urls)} news articles for {stock}")

# Post Dataframe generation

    df_news.reset_index(drop=True, inplace=True)
    df_news.drop(df_news[df_news['Source'] == 'No source available'].index, inplace=True)
    df_news.reset_index(drop=True, inplace=True)
    #df_news['Date'] = pd.to_datetime(df_news['Date']).dt.strftime(format = 'ISO8601')
    df_news.to_csv(f'{news_data_folder}\{stock}_data_{str(date.today())}.csv', index=False)

# Combine all CSV Files in news_data_folder
all_files = [f'{news_data_folder}\{file}' for file in os.listdir(news_data_folder) if file.endswith('.csv')]
df_combined = pd.concat([pd.read_csv(file) for file in all_files])
df_combined.reset_index(drop=True, inplace=True)
df_combined.to_csv(f'{news_data_folder}\combined_data_{str(date.today())}.csv', index=False)
print("Data Extraction Complete")
