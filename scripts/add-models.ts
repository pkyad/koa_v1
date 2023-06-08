import fetch from 'node-fetch';
const fs = require('fs');
const BASE_DIR = 'app/models/';

const main = async () => {
  const res = await fetch('http://localhost:8001/ts/shared/');
  const jsonResponse = (await res.json()) as any[];

  if (!fs.existsSync(BASE_DIR)) {
    fs.mkdirSync(BASE_DIR);
  }

  jsonResponse.forEach((file) => {
    try {
      fs.writeFileSync(
        BASE_DIR + file.file_name,
        file.file_content,
        (err: any) => {
          console.error(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  });
};

main();
