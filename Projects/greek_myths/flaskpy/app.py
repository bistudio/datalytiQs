import requests
from beautifulsoup4 import BeautifulSoup


url= "https://www.theoi.com/greek-mythology/olympian-gods.html"
page = requests.get(url)
soup = BeautifulSoup(page.content, 'html.parser')
print(soup.prettify())