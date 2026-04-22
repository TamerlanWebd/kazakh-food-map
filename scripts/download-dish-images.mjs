import https from 'https';
import fs from 'fs';
import path from 'path';

const images = [
  { name: 'sorpa.jpg', url: 'https://perspectum.info/wp-content/uploads/2021/07/dreamstime_xxl_136677871-1024x645.jpg' },
  { name: 'kopchenoe-myaso.webp', url: 'https://fruity-style.com/wa-data/public/shop/products/04/webp/54/06/20654/images/29996/29996.970.webp' },
  { name: 'myaso-marala.jpg', url: 'https://dikoed.ru/upload/resize_cache/iblock/9cc/730_400_1/15065-gulyash-iz-myasa-marala.jpg' },
  { name: 'samsa.jpg', url: 'https://kz.kursiv.media/wp-content/uploads/2024/12/610668f441589178-1024x682.jpg' },
  { name: 'kazy-karta.jpg', url: 'https://saltmagazine.ru/wp-content/uploads/2021/09/kazakh-cuisine-1024x683.jpg' },
  { name: 'shelpeki.jpg', url: 'https://www.povarenok.ru/data/cache/2020jun/25/33/2727829_25959-710x460x.jpg' },
  { name: 'pelmeni.jpg', url: 'https://www.iamcook.ru/storage/2016/09/19/f5ecc63345100f913d8583495f50ac02.jpg' },
  { name: 'vareniki.jpg', url: 'https://fissman.ru/upload/medialibrary/8cc/8cc7de18361730707718e268a86a073f.jpg' },
  { name: 'beshbarmak-jaima.jpg', url: 'https://static.tengrinews.kz/userdata/images/2023/03/21/28eb97e743a129d20c57173b2bedf711.jpg' },
  { name: 'sube-oramasy.jpg', url: 'https://jjtv.kz/storage/image/3/3/a/b/cc7686f059cb6750e39c807b5e43a9dc_1678170068.jpg' }
];

const targetDir = 'd:/Оксана Д/kazakh-food-map/public/images/dishes/';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function download(url, filePath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: Status Code ${res.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${path.basename(filePath)}`);
        resolve();
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  for (const img of images) {
    try {
      await download(img.url, path.join(targetDir, img.name));
    } catch (err) {
      console.error(err.message);
    }
  }
}

run();
