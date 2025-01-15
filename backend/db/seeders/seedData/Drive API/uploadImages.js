const axios = require('axios');
const fs = require('fs');

// Define the number of requests per minute and total runtime in minutes
const MAX_REQUESTS_PER_MINUTE = 100;
const API_KEY = '48235405-31ae802168951db7283ad9b7c'; // Replace with your actual API key
const BASE_URL = 'https://pixabay.com/api/';
const searchQuery = 'soccer'; // Change this to your desired search termç
const fetchNumber = 20;
const pageLimit = 200;
const totalPages = 3;

// Initialize the array to store the image URLs
const imageLinks = Array(totalPages * pageLimit * fetchNumber + 1);  // Array to store the image URLs
imageLinks[0] = 'imageLinks = [';  // Opening bracket for the list
imageLinks[totalPages * pageLimit * fetchNumber] = ']';  // Closing bracket for the list

// Function to fetch image data from the Pixabay API
async function fetchImages(page, fetch) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        // q: searchQuery,
        image_type: 'photo',
        per_page: pageLimit,   // Number of results per page
        page: page + 1,        // Page number is 1-based in the API, so increment by 1
      },
    });

    const images = response.data.hits;
    
    // Fill imageLinks with the image URLs
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const startIndex = (fetch * totalPages * pageLimit) + (page * pageLimit);

      if (i === 0 && page === 0 && fetch === 0) {
        imageLinks[0] = `${imageLinks[0]} \n '${image.webformatURL}'`;  // Handle first URL differently
      } else {
        imageLinks[startIndex + i] = `'${image.webformatURL}'`;  // Correct index for each page
      }
    }


    console.log(`Fetched request ${fetch} with page ${page + 1} with ${images.length} images.`);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

// Function to seed the image file with URLs
function seedImageFile() {
  const data = imageLinks.join(',\n ');  // Join with commas and newlines
  fs.writeFileSync('./imageLinks.py', data);  // Write to file
}

// Function to fetch multiple pages of images
async function fetchMultiplePages(index) {
  // Create an array of promises for each page request
  const fetchPromises = [];

  for (let i = 0; i < totalPages; i++) {
    fetchPromises.push(fetchImages(i, index));  // Add the fetchImages call for each page
  }

  // Wait for all pages to be fetched concurrently
  await Promise.all(fetchPromises);

}

// Start fetching images
async function main() {
  const fetchPromises = [];

  for (let i = 0; i < fetchNumber; i++) {
    fetchPromises.push(fetchMultiplePages(i));  // Start fetching for each fetch number
  }

  await Promise.all(fetchPromises);

  seedImageFile();
}

main();



