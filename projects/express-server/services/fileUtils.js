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
    if (!file || !file.originalname || !file.path) {
      throw new ExtendedError({
        messageLog: 'Invalid file for upload.',
        code: 400,
        messageJson: 'Некорректный файл для загрузки.',
      });
    }

    const fileName = `${folder}/${file.originalname}`;

    const fileContent = fs.readFileSync(file.path);

    console.log('Загружаемый файл:', file);
    console.log('Полный путь к файлу:', fileName);

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
          const metadata = await storageFile.getMetadata();
          const fileId = metadata[0].id;
          console.log('ID загруженного файла:', fileId);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
      fileWriteStream.on('error', reject);
    });

    fs.unlinkSync(file.path);

    console.log('Файл успешно загружен в Firebase Storage.');
  } catch (error) {
    throw error;
  }
};

// // Функция для загрузки файла из Firebase Storage
const downloadFileFromStorage = async (folder, filePath2) => {
  const storage = admin.storage();

  // Получаем путь к папке, где находится текущий модуль
  const currentDir = __dirname;

  const filePath = `${folder}/Screenshot_41.png`;
  console.log(filePath);

  // Определяем путь для сохранения файла
  const tempFileName = 'temp.png'; // Пример имени временного файла
  const tempFilePath = path.join(currentDir, tempFileName);

  // Загружаем файл из Firebase Storage
  await storage.bucket().file(filePath).download({
    destination: tempFilePath,
  });

  console.log('Файл успешно загружен из Firebase Storage.');
  console.log('Путь к текущей рабочей директории:', currentDir);

  /////////////////////////////

  // Получаем список файлов в папке
  const [files] = await storage.bucket().getFiles({ prefix: folder });

  console.log(files?.[0]?.metadata);

  // Ищем файл по его ID
  // const file = files.find((file) => file.metadata?.id === fileId);
};

// Функция для загрузки файла из Firebase Storage
// async function downloadFileFromStorage(filePath, tempFilePath, currentDir) {
//   const storage = admin.storage();

//   // Загружаем файл из Firebase Storage
//   await storage.bucket().file(filePath).download({
//     destination: tempFilePath,
//   });

//   console.log('Файл успешно загружен из Firebase Storage.');
//   console.log('Путь к текущей рабочей директории:', currentDir);
// }

// async function downloadFileFromStorage(filePath, res) {
//   try {
//     const storage = admin.storage();

//     // Определяем временное местоположение для сохранения файла
//     const tempFileName = 'temp.png'; // Пример имени временного файла
//     const tempFilePath = path.join(__dirname, tempFileName);

//     // Загружаем файл из Firebase Storage
//     await storage.bucket().file(filePath).download({
//       destination: tempFilePath,
//     });

//     console.log('Файл успешно загружен из Firebase Storage.');
//     console.log('Путь к текущей рабочей директории:', __dirname);

//     // Отправляем файл в ответ на запрос
//     res.sendFile(tempFilePath);
//   } catch (error) {
//     console.error('Ошибка загрузки файла из Firebase Storage:', error);
//     res.status(500).json({ status: false, message: 'Ошибка загрузки файла из Firebase Storage' });
//   }
// }

module.exports = { initializeFirebase, uploadFileToStorage, downloadFileFromStorage };
