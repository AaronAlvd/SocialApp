const { google } = require('googleapis');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');
const fs = require('fs');
const axios = require('axios')

const CLIENT_ID = '2822231369-grn6271k9djhc5b0t1p21u7j0uhogfoe.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04lR89BIVn_h9CgYIARAAGAQSNwF-L9Irc7SddwEfKkoyIxUOWDGIZLAWiMFX4lkHPqy2dNUwia7LaauTWPURI8s86QaeOvX_UZQ';

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

async function uploadFile(imageUrl, fileName, mimeType) {
  try {
    const results = await axios({
      method: 'get',
      url: imageUrl,
      responseType: 'stream',
    });

    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: mimeType,
      },
      media: {
        mimeType: mimeType,
        body: results.data
      }
    });

    console.log(`File uploaded successfully: ${fileName}, File ID: ${response.data.id}`);
  } catch (error) {
    console.error(`Error uploading ${fileName}: ${error.message}`);
    if (error.response) {
      console.error('Detailed error response:', error.response.data);
    }
  }
}

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

drive.files.list({
  fields: 'files(id)', // Only retrieve the file IDs to reduce unnecessary data
}).then(async (response) => {
  const array = response.data.files;

  if (array.length === 0) {
    console.log('No files found.');
    return;
  }

  // Iterate over all files and set permissions
  for (const item of array) {
    try {
      // Create permission for "anyone" to read the file
      await drive.permissions.create({
        fileId: item.id,
        requestBody: {
          role: 'reader',  // Grant read access
          type: 'anyone'   // Make it public to anyone with the link
        }
      });

      console.log(`Permission set to 'reader' for anyone on file: ${item.id}`);
    } catch (err) {
      console.error(`Error setting permission for file ${item.id}:`, err);
    }
  }
}).catch((err) => {
  console.error('Error retrieving files:', err);
});


module.exports = { uploadFile }




