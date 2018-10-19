import * as cheerio from 'cheerio';
import * as request from 'request';

function getHTML(options: any, callback: Function) {
  request(options, (error: any, response: any, html: any) => {
    // First we'll check to make sure no errors occurred when making the request
    if (!error) {
      callback(html);
    } else {
      console.log('oops');
    }
  });
}

export function getEvents(callback: Function) {
  let list: any[] = [];
  let options = {
    url: 'https://www.thecedar.org/listing/',
    headers: {
      referer: 'https://www.thecedar.org/contact/',
      cookie:
        'ss_cid=ad9008ab-9955-4a83-95bd-1c2a73fd7984; _ga=GA1.2.1792311422.1539287340; crumb=Bdad7tTRlurEODRlOGYyMjhjNTI2MTEzMmVlZTE5OTFhOTg5NTY1; _gid=GA1.2.606144189.1539899011; ss_cvr=d67a4139-6267-4f4a-87d4-4fa59cee662b|1539287339592|1539899011243|1539912003787|3; ss_cvt=1539912003787;  ss_cpvisit=1539912003831; _gat=1',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
      'if-none-match': 'W/"6979b102000a4b898be4c9983d8db9cf"'
    }
  };
  getHTML(options, (data: any) => {
    callback(scrapeEvents(data));
  });
}

function scrapeEvents(html: any) {
  console.log('cedar');
  var shows = [];
  let titles: any[] = [];
  let doorss: any[] = [];
  let dates: any[] = [];
  // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
  var $ = cheerio.load(html);

  $('.summary-title-link').each((i, elem) => {
    titles[i] = elem.children[0].data;
  });
  $('span.event-time-12hr').each((i, elem) => {
    doorss[i] = elem.children[0].data;
  });
  $('time.summary-metadata-item--date').each((i, elem) => {
    dates[i] = elem.children[0].data;
  });

  for (var i = 0; i < titles.length; i++) {
    let json = {
      title: titles[i],
      date: dates[i],
      doors: doorss[i]
    };

    shows.push(json);
  }
  console.log(shows);
  return shows;
}
