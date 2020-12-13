
// Unplash API
const COUNT = 10
const API_KEY = config.API_KEY;
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${COUNT}`


// Get Photos from Unsplash API

async function getPhotos() {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log('error')
  }
}

// OnLoad

getPhotos()