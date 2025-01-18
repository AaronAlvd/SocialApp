const axios = require('axios');
const fs = require('fs');
const { uploadFile } = require('./driveAPI');
const { v4: uuidv4 } = require('uuid');

const API_KEY = '48235405-31ae802168951db7283ad9b7c'; 
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages() {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        image_type: 'photo',
        per_page: 200,
        page: 1,
      },
    });

    if (response.error) {
      throw new Error(response.error.message);
    };

    const data = response.data.hits.map((info) => info.webformatURL)

    return data;

  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

async function uploadFiles() {
  try {
    const response = await fetchImages();

    for (const url of response) {
      const id = uuidv4();
      await uploadFile(url, `image${id}.jpg`, 'image/jpg')
            .then((response) => console.log(response))
    }

    console.log('Upload Completed')
  } catch (error) {
    console.log('Error: ', error)
  }
}

uploadFiles()



