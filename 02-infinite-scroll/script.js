
// Unplash API
const COUNT = 10
const API_KEY = config.API_KEY;
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${COUNT}`

const imagesContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = []

// Function to SetAttributes to DOM Element

function setAttributes(element, attributes) {
  for(const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Create Elements for Links & Photos, add to DOM
async function displayPhotos() {
  photosArray.forEach((photo) => {

    const item = document.createElement('a')
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    })
    
    const img = document.createElement('img')
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })

    item.appendChild(img)
    imagesContainer.appendChild(item)
  })
}

// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(API_URL)
    photosArray = await response.json()
    console.log(photosArray)
    displayPhotos()
  } catch (error) {
    console.log('error')
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    getPhotos();
    console.log('Load More')
  }
})

// OnLoad
  getPhotos()