"use strict";
// import axios from 'axios';
// import cheerio from 'cheerio';
// import http from 'http';
Object.defineProperty(exports, "__esModule", { value: true });
// interface MetaData {
//   title: string;
//   description: string;
//   imageUrl: string;
// }
// const url = 'https://facebook.com/'
// async function parseUrl(url: string): Promise<MetaData | null> {
//   const response = await axios.get(url);
//   const html = response.data;
//   const $ = cheerio.load(html);
//   const title = $('head title').text().trim();
//   const description = $('meta[name="description"]').attr('content') || '';
//   const imageUrl = $('meta[property="og:image"]').attr('content') || '';
//   const metaData: MetaData = {
//     title,
//     description,
//     imageUrl,
//   };
//   return metaData;
// }
// describe('parseUrl function', () => {
//   it('should parse the meta-data from a valid URL', async () => {
//     const testUrl = 'https://facebook.com/'; // Replace with a valid URL for testing
//     const metaData = await parseUrl(testUrl);
//     expect(metaData).toBeDefined();
//     expect(metaData!.title).toBeTruthy();
//     expect(metaData!.description).toBeTruthy();
//     expect(metaData!.imageUrl).toBeTruthy();
//   });
//   it('should return null for an invalid URL', async () => {
//     const testUrl = 'https://error.com/'; // Replace with an invalid URL for testing
//     const metaData = await parseUrl(testUrl);
//     expect(metaData).toBeNull();
//   });
// });
// describe('HTTP Server', () => {
//   let server: http.Server;
//   beforeAll(() => {
//     server = http.createServer(async (req, res) => {
//       const url = req.url;
//       if (url === '/parse') {
//         const metaData = await parseUrl('https://facebook.com/'); // Replace with a valid URL for testing
//         if (metaData) {
//           res.writeHead(200, { 'Content-Type': 'application/json' });
//           res.write(JSON.stringify(metaData));
//         } else {
//           res.writeHead(500, { 'Content-Type': 'text/plain' });
//           res.write('Failed to parse Meta-Data');
//         }
//       } else {
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.write('404 Not Found');
//       }
//       res.end();
//     });
//     server.listen(3005);
//   });
//   afterAll(() => {
//     server.close();
//   });
//   it('responds with parsed meta-data for /parse endpoint', async () => {
//     const response = await axios.get('http://localhost:3005/parse');
//     expect(response.status).toBe(200);
//     expect(response.data).toBeDefined();
//   });
//   it('responds with 404 for unknown routes', async () => {
//     const response = await axios.get('http://localhost:3005/unknown-route');
//     expect(response.status).toBe(404);
//   });
// });
// const exp = require("constants");
// const { parseUrl } = require("./app");
// describe("Web Scraping App", () => {
//   test("should extract meta data correctly", async () => {
//     const targetUrl =
//       "https://facebook.com/";
//     const metaData = await parseUrl(targetUrl);
//     expect(metaData).toHaveProperty("imageUrl");
//     expect(metaData).toHaveProperty("description");
//     expect(metaData).toHaveProperty("title");
//     // console.log("Image URL:", metaData.image);
//     // console.log("Description:", metaData.description);
//     // console.log("Title:", metaData.title);
//   });
// });
const app_js_1 = require("./app.js");
describe('Web Scraping App', () => {
    test('should extract meta data correctly', async () => {
        const targetUrl = 'https://facebook.com/';
        const metaData = await (0, app_js_1.getMetaData)(targetUrl);
        console.log('Image URL:', metaData.image);
        console.log('Description:', metaData.description);
        console.log('Title:', metaData.title);
    }, 10000);
});
