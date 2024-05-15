const admin = require('firebase-admin');
const serviceAccount = require('../firebase-adminsdk.json');
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
      fileWriteStream.on('finish', resolve);
      fileWriteStream.on('error', reject);
    });

    const _metadata = await storageFile.getMetadata();
    const _fileId = _metadata[0].id;
    console.log('ID завантаженого файлу:', _fileId);

    try {
      fs.unlinkSync(file.path);
      console.log('Файл успішно видалений.');
    } catch (error) {
      console.error('Помилка при видаленні файлу:', error);
    }

    console.log('Файл успішно завантажений в Firebase Storage.');
    return _fileId;
  } catch (error) {
    throw error;
  }
};

const downloadFileFromStorage = async (res, folder, fileId) => {
  try {
    if (![folder, fileId].every(Boolean)) {
      throw new ExtendedError({
        messageLog: 'Invalid file for download.',
        code: 400,
        messageJson: 'Некоректний файл для завантаження з сервера.',
      });
    }

    const storage = admin.storage();

    const [files] = await storage.bucket().getFiles({ prefix: folder });

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

    const fileStream = file.createReadStream();

    res.setHeader('Content-Type', 'image/png');

    fileStream.pipe(res);
  } catch (error) {
    throw error;
  }
};

module.exports = { initializeFirebase, uploadFileToStorage, downloadFileFromStorage };
