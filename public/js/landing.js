
// remove body class 
// s
// set a variable to 0. The function carouselBG will increament the image counter by 1
var imageCounter = 0;

/*
 * carouselBG: This function changes the background-image of the landing page
 *
 */
function carouselBG() {
   var imgs = [
       "url(../img/fire-56677_1920.jpg)",
       "url(../img/tent-548022_1920.jpg)",
       "url(../img/tent-1208201_1920.jpg)",
       "url(../img/tent-1209076_1920.jpg)"
       ]
   
   imageCounter = ((imageCounter === imgs.length) ? 0 : (imageCounter + 1))
   $("body").css("background-image", imgs[imageCounter]);
   
}

// change the background image every two seconds
setInterval(carouselBG, 2000);
