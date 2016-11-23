
// remove body class 
// s
// set a variable to 0. The function carouselBG will increament the image counter by 1
var imageCounter = 0;

/*
 * carouselBG: This function changes the background-image of the landing page
 *
 */
 
var images = [
    "url(../img/fire-56677_1920.jpg)",
    "url(../img/tent-548022_1920.jpg)",
    "url(../img/tent-1208201_1920.jpg)",
    "url(../img/tent-1209076_1920.jpg)"
    ];
    
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

function carouselBG() {

   imageCounter = ((imageCounter === images.length) ? 0 : (imageCounter + 1))
   $("body").css("background-image", images[imageCounter]);
   
}

// Preload all images
preload();
// change the background image every two seconds
setInterval(carouselBG, 2000);
