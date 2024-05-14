const admin = require('firebase-admin');
const serviceAccount = require('../firebase-adminsdk.json');
const path = require('path');
const { Readable } = require('stream');
const mime = require('mime-types');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { ExtendedError } = require('../tools');

const initializeFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'noname-shop-84557.appspot.com', // TODO в env
  });
};

const uploadFileToStorage = async (folder, file) => {
  try {
    if (![folder, file, file.originalname, file.path].every(Boolean)) {
      throw new ExtendedError({
        messageLog: 'Invalid file for upload.',
        code: 400,
        messageJson: 'Некоректний файл для завантаження на хмару.',
      });
    }

    const fileId = uuidv4();
    const fileName = `${folder}/${fileId}_${file.originalname}`;

    const fileContent = fs.readFileSync(file.path);

    const storage = admin.storage();
    const storageFile = storage.bucket().file(fileName);

    const contentType = mime.lookup(fileName) || 'application/octet-stream';

    const fileWriteStream = storageFile.createWriteStream({
      resumable: false,
      contentType: contentType,
    });

    const bufferStream = new Readable();
    bufferStream.push(fileContent);
    bufferStream.push(null);

    bufferStream.pipe(fileWriteStream);

    await new Promise((resolve, reject) => {
      fileWriteStream.on('finish', async () => {
        try {
          const _metadata = await storageFile.getMetadata();
          const _fileId = _metadata[0].id;
          console.log('ID загруженного файла:', _fileId); //? noname-shop-84557.appspot.com/products/9bc06894-c268-49a1-94d6-c1884ac0de50_Screenshot_53.png/1715717849699824
          resolve();
        } catch (error) {
          reject(error);
        }
      });
      fileWriteStream.on('error', reject);
    });

    fs.unlinkSync(file.path);

    console.log('Файл успішно завантажений у Firebase Storage.');
  } catch (error) {
    throw error;
  }
};

const downloadFileFromStorage = async (
  folder,
  fileId = 'noname-shop-84557.appspot.com/products/9bc06894-c268-49a1-94d6-c1884ac0de50_Screenshot_53.png/1715717849699824',
) => {
  try {
    if (![folder, fileId].every(Boolean)) {
      throw new ExtendedError({
        messageLog: 'Invalid file for upload.',
        code: 400,
        messageJson: 'Некоректний файл для завантаження на сервер.',
      });
    }

    const storage = admin.storage();

    const [files] = await storage.bucket().getFiles({ prefix: folder });

    // Ищем файл по его ID
    const file = files.find((file) => {
      const id = file?.metadata?.id;

      return id === fileId;
    });

    if (!file) {
      throw new ExtendedError({
        messageLog: 'File not found in storage.',
        code: 404,
        messageJson: 'Файл не знайдено у сховищі.',
      });
    }

    const currentDir = __dirname;
    const tempFileName = 'temp.png';
    const tempFilePath = path.join(currentDir, tempFileName);

    await file.download({
      destination: tempFilePath,
    });

    console.log('Файл успішно завантажений на сервер.');
  } catch (error) {
    throw error;
  }
};

module.exports = { initializeFirebase, uploadFileToStorage, downloadFileFromStorage };
