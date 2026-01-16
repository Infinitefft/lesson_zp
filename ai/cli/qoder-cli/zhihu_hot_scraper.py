import requests
from bs4 import BeautifulSoup


def get_zhihu_hot_list():
    """
    抓取知乎热榜前十的标题
    """
    url = "https://www.zhihu.com/hot"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        response.encoding = 'utf-8'
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        hot_items = soup.select('.HotItem-content')
        
        print("知乎热榜 Top 10:\n")
        print("=" * 60)
        
        for index, item in enumerate(hot_items[:10], start=1):
            title_element = item.select_one('.HotItem-title')
            if title_element:
                title = title_element.get_text(strip=True)
                print(f"{index}. {title}")
        
        print("=" * 60)
        
    except requests.exceptions.RequestException as e:
        print(f"请求失败: {e}")
    except Exception as e:
        print(f"发生错误: {e}")


if __name__ == "__main__":
    get_zhihu_hot_list()
