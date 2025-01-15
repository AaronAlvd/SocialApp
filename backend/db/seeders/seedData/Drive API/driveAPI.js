const { google } = require('googleapis');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');
const fs = require('fs');
const path = require('path');

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

const images = [
 
];

async function uploadFile(filePath, fileName, mimeType) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileName, // File name on Google Drive
        mimeType: mimeType, // MIME type of the file
      },
      media: {
        mimeType: mimeType, // MIME type of the file
        body: fs.createReadStream(filePath) // Stream the file from the local disk
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

async function uploadFiles() {
  for (let i = 0; i < images.length; i++) {
    const imagePath = images[i];
    const fileName = path.basename(imagePath); // Get file name (e.g., image01.png)
    const mimeType = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg'; // Set MIME type based on extension

    await uploadFile(imagePath, fileName, mimeType);
  }
}

function setFilePermissions(fileId) {
  const permission = {
    type: 'anyone',
    role: 'reader',
  };

  drive.permissions.create(
    {
      fileId: fileId,
      resource: permission,
    },
    (err, res) => {
      if (err) {
        console.error('Error setting file permissions:', err);
        return;
      }

      console.log('Permissions set. The file is now publicly viewable.');

      // Get the shareable link to the file
      drive.files.get(
        {
          fileId: fileId,
          fields: 'webViewLink',
        },
        (err, res) => {
          if (err) {
            console.error('Error getting file link:', err);
            return;
          }

          console.log('Shareable link:', res.data.webViewLink);
        }
      );
    }
  );
}

function listFiles() {

  drive.files.list({
    fields: 'files(id, name)',  // We only need 'id' and 'name'
  }, (err, res) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }

    const files = res.data.files;
    if (files.length) {
      console.log('Files:');
      files.forEach((file) => {
        console.log(`${file.name} (${file.id})`);
      });
    } else {
      console.log('No files found.');
    }
  });
}


