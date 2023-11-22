// import axios from 'axios';
// import cheerio from 'cheerio';
// import http from 'http';


// interface MetaData {
//   title: string;
//   description: string;
//   imageUrl: string;
// }

//   const url = 'https://facebook.com/';
//  //console.log(parseUrl(url));

// async function parseUrl(url: string): Promise<MetaData | null> {
  
//     const response = await axios.get(url);

//     const html = response.data;
//     const $ = cheerio.load(html);

//     const title = $('head title').text().trim();
//     const description = $('meta[name="description"]').attr('content') || '';
//     const imageUrl = $('meta[property="og:image"]').attr('content') || '';

//     const metaData: MetaData = {
//       title,
//       description,
//       imageUrl,
//     };

//     return metaData;
//     // console.log(metaData);

// }



// parseUrl(url)
//   .then((metaData) => {
//     if (metaData) {
//       console.log('Parsed Meta-Data:', metaData);
//     } else {
//       console.log('Failed to parse Meta-Data');
//     }
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });







// const server = http.createServer(async (req, res) => {
//   const url = req.url;
//   if (url === '/parse') {
//     const metaData = await parseUrl('https://facebook.com/');
//     if (metaData) {
//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.write(JSON.stringify(metaData));
//     } else {
//       res.writeHead(500, { 'Content-Type': 'text/plain' });
//       res.write('Failed to parse Meta-Data');
//     }
//   } else {
//     res.writeHead(404, { 'Content-Type': 'text/plain' });
//     res.write('404 Not Found');
//   }
//   res.end();
// });

// server.listen(3005, () => {
//   console.log('Server listening on port 3005');
// });

// module.exports = parseUrl;





import puppeteer from 'puppeteer';
import http from 'http';
import url from 'url';

const targetUrl = 'https://www.facebook.com/';

export async function getMetaData(url: string): Promise<{ image?: string; description?: string; title?: string }> {
  // const browser = await puppeteer.launch({ headless: true });
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto(url);

  const metaData = await page.evaluate(() => {
    const metaTags = document.querySelectorAll<HTMLMetaElement>('meta[property^="og:"]');
    const data: { image?: string; description?: string; title?: string } = {};

    metaTags.forEach(tag => {
      const property = tag.getAttribute('property');
      const content = tag.getAttribute('content');

      if (property && content) {
        if (property === 'og:image') {
          data.image = content;
        } else if (property === 'og:description') {
          data.description = content;
        } else if (property === 'og:title') {
          data.title = content;
        }
      }
    });

    return data;
  });

  await browser.close();
  return metaData;
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url || '', true);

  if (parsedUrl.pathname === '/metadata') {
    // Handle metadata request
    getMetaData(targetUrl)
      .then(metaData => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(metaData));
      })
      .catch(error => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error: ${error.message}`);
      });
  } else {
    // Handle other requests
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 3005;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});