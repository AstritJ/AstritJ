import scrapy
from scrapy import signals
from scrapy import Spider
from bs4 import BeautifulSoup
from scrapy.crawler import CrawlerProcess
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor


class MySpider(CrawlSpider):
    def __init__(self, *args, **kwargs):
        super(MySpider, self).__init__(*args, **kwargs)
        self.items = set()
        self.filename = 'ibcmitrovica'

    name = 'uni-scrapper'
    allowed_domains = ['ibcmitrovica.eu']
    start_urls = ['http://ibcmitrovica.eu']
    rules = (
        Rule(LinkExtractor(), callback='parse_item', follow=True),
    )

    def parse_item(self, response):
        soup = BeautifulSoup(response.text, 'html.parser')
        for link in soup.find_all('a', href=True):
            if 'href' in link.attrs:
                self.items.add(link['href'])
            print('items count: %s' % len(self.items))

    @classmethod
    def from_crawler(cls, crawler, *args, **kwargs):
        spider = super(MySpider, cls).from_crawler(crawler, *args, **kwargs)
        crawler.signals.connect(spider.spider_closed,
                                signal=signals.spider_closed)
        return spider

    def spider_closed(self, spider):
        filename = 'links/%s-links.txt' % self.filename
        with open(filename, 'a') as w:
            for l in self.items:
                w.write('\n%s' % l)


if __name__ == '__main__':
    process = CrawlerProcess({
        'USER_AGENT': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)',
        'REDIRECT_ENABLED': False
    })
    process.crawl(MySpider)
    process.start()
