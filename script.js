const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totaImages = 0;
let photosArray = [];

//Unsplash API
const count = 30;
const query = 'computer';
const apiKey = 'XCVgiaj5mY2UFZS-cp6XvlvScLXlmH58inBczDMeYek';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}`;
//Check is all images were loaded


function imageLoaded () {
imagesLoaded++;
if(imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log('ready = ',ready);
}

}





//Create Elements for Links and Photos, Add to DOM


//Helper Function to Set Attributes on DOM Elements

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');

        setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
       });
        //Create <img> for photo
        const img = document.createElement('img');
       //img.setAttribute('src', photo.urls.regular);
        //img.setAttribute('alt', photo.alt_description);
       // img.setAttribute('title', photo.alt_description);
       setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
       });
        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);

        img.addEventListener('load', imageLoaded);
    });

    //Event Listener, CHeck When Each is Finishing Loading
    img.addEventListener('load', imageLoaded);

}


//Get Photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch (error){
        //Catch error
    
    }
}

//Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll',() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos();
        ready = false;
    }

});

//On Load
getPhotos();