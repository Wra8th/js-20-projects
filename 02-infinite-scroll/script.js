
// Unplash API
const COUNT = 30
const API_KEY = config.API_KEY;
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${COUNT}`

const imagesContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++
  if (imagesLoaded === totalImages) {
    ready = true
    loader.hidden = true
  }
}

// Function to SetAttributes to DOM Element
function setAttributes(element, attributes) {
  for(const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Create Elements for Links & Photos, add to DOM
async function displayPhotos() {
  imagesLoaded = 0
  totalImages = photosArray.length
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

    // Event Listener, Check when each img is finished loading
    img.addEventListener('load', imageLoaded)
    item.appendChild(img)
    imagesContainer.appendChild(item)
  })
}

// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(API_URL)
    photosArray = await response.json()
    displayPhotos()
  } catch (error) {
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false
    getPhotos();
  }
})

// OnLoad
  getPhotos()