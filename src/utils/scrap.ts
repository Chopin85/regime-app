import axios from 'axios';
import * as cheerio from 'cheerio';
// import fs from 'fs';

export const scrapPicard = async () => {
  const response = await axios.get(
    'https://www.picard.fr/rayons/plats-cuisines/types-de-plats-cuisines?prefn1=format&prefv1=1-part&sz=140',
  );
  const html = response.data;

  const $ = cheerio.load(html);

  const links = $('#search-result-items > li > div > a')
    .map((i, link) => $(link).attr('href'))
    .get();

  const fetchInfos = await Promise.all(
    links.map(async (link) => {
      const response = await axios.get(`https://www.picard.fr${link}`);
      const html = response.data;
      const $ = cheerio.load(html);
      const kcal = $(
        '#tableNutrition0 > table > tbody > tr:nth-child(1) > td:nth-child(4) > div:nth-child(2)',
      )
        .text()
        .trim();

      const name = $('h1').text().trim();
      const image = $(
        '#pdpMain > div > div.pi-ProductPage-top > div.pi-ProductPage-medias > div.pi-ProductImage > img',
      ).attr('src');
      return { name, kcal: parseInt(kcal), image, link };
    }),
  );

  const infoFiltered = fetchInfos.filter((info) => info.kcal);

  return infoFiltered;
};
