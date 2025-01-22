const { google } = require('googleapis');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');
const fs = require('fs');

const CLIENT_ID = process.env.DRIVE_CLIENT_ID;
const CLIENT_SECRET = process.env.DRIVE_CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.DRIVE_RERESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

async function handleUpload(data) {
  try {
    const response = uploadFile("TestingName", data, data.type);
  } catch (error) {
    return error
  }
};

async function uploadFile(fileName, data, mime) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: mime,
      },
      media: {
        mimeType: mime,
        body: data,
      }
    });

    console.log(`File uploaded successfully: ${fileName}, File ID: ${response.data.id}`);
  } catch (error) {
    console.log(`Error uploading ${fileName}: ${error.message}`);
  }
};

async function generateImageLink() {
  try {
    const response = await drive.files.list({
      fields: 'files(id)'
    });

    if (response.error) {
      throw new Error(response.error.message);
    };

    const array = response.data.files.map((file) => `https://drive.google.com/thumbnail?id=${file.id}`);
    const newArray = ['const imageLinks = [ \n'];

    for (let item of array) {
      newArray.push(`{ photo: '${item}' }, \n`)
    }

    newArray.push(']')

    fs.writeFile('./backend/db/seeders/seedData/Drive API/imageLinks.js', newArray.join(''), () => {

    });

  } catch (error) {
    console.log('Error message: ', error.message);
  }
};

module.exports = { handleUpload }




