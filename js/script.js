
// Updates every 100 milliseconds
const INTERVAL = 100;
// Fade rate between texts
const ANIMATION_DURATION = 500;

const MAX_TIME_SINCE_FACE = 100;
var timeSinceFace = 1000;

// var noStrings = [
//   "Where are you?",
//   "Where did you go?",
//   "I miss you.",
//   "I can't see you.",
//   "Come back.",
//   "I'm so lonely.",
//   "Why do you keep leaving me?",
//   "Don't be shy.",
//   "I wish you'd show me your face.",
//   "Please don't hide from me."
// ];
// var yesStrings = [
//   "There you are.",
//   "Welcome back.",
//   "Hey there, friend.",
//   "I'm glad you're back.",
//   "I missed you, pal.",
//   "Stay with me for a while.",
//   "You look so serious.",
//   "You have nice eyes.",
//   "You're so intriguing to watch.",
//   "I wish I knew more about you."
// ];


////////////////////////////////////////////////////


$(document).ready(function(){

  webcamFeed();

  // startTracking();

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    if (navigator.getUserMedia) {      
      navigator.getUserMedia({video: true}, handleVideo, videoError);


    }



});


////////////////////////////////////////////////////

// WEBCAM FEED
// from tracking.js
// https://github.com/eduardolundgren/tracking.js/blob/master/examples/face_camera.html


function webcamFeed (){

  // variables
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var tracker = new tracking.ObjectTracker(['face', 'eye','mouth']);
  tracker.setInitialScale(1);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);

  tracking.track('#video', tracker, { camera: true });

  tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    event.data.forEach(function(rect) {
      context.strokeStyle = 'cyan';
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);

    });
  });





}



// handleVideo (stream)
//
// When getUserMedia gets hold of the user's webcam, it calls this function
// with the argument "stream" which is the stream of the webcam data
function handleVideo(stream) {
  // First get the URL of the stream
  var streamURL = window.URL.createObjectURL(stream);
  // Now hold of the element on the page that can contain the video
  // (the video element with id 'webcam') and set its src attribute
  // to the URL we created for the stream...
  $('#webcam').attr({
    src: streamURL
  });
  // And now that the webcam is available, we can start actually tracking
  startTracking();


}

// videoError (e)
//
// If there's a problem with getting the webcam, this will get called.
// For now it just sets the background color to red to show something
// went wrong. Not very sophisticated.
function videoError(e) {
  $('body').css({
    'background-color': 'red'
  })
}

// startTracking()
//
// Called when webcam is available. Sets up the face tracking.
function startTracking() {

  // Make a face tracker...
  var faceTracker = new tracking.ObjectTracker(['face']);

  // Set up the function to call each frame while tracking
  faceTracker.on('track', handleTrackingEvent);

  // Start tracking
  tracking.track('#webcam', faceTracker);



  // Also start an interval function that will check if the page
  // should become sad
  setInterval(checkCam,INTERVAL);


}




//
// Called every INTERVAL - updates the page content based on
// when it last saw our face...
function checkCam () {
  // Update our variable tracking how long it's been since we saw a face...
  timeSinceFace += 100;
  // Note this is set back to 0 every frame that the tracker detects a face.

  // Check whether it's been too long since we saw a face
  if (timeSinceFace > MAX_TIME_SINCE_FACE) {
    console.log('show webcam')
    // If so, show the webcamfeed
    // $('#webcam').css({
    //   visibility: 'visible'
    // });
  }
}

// handleTrackingEvent
//
// Called every frame of video that detection is running
function handleTrackingEvent (event) {
  // Check if anything was tracked (a face)
  if (event.data.length === 0) {
    console.log('...')
    // No faces were detected in this frame.
  }
  else {
    console.log('a face!')
    // We found a face!
    // Reset the time since we saw a face to 0
    timeSinceFace = 0;
    //hide the webcam feed
    // $('#webcam').css({
    //   visibility: 'hidden'
    // });
  }
}

// // updateFeelings ()
// //
// // Called every INTERVAL - updates how the page is feeling based on
// // when it last saw our face...
// function checkSad () {
//   // Update our variable tracking how long it's been since we saw a face...
//   timeSinceFace += 100;
//   // Note this is set back to 0 every frame that the tracker detects a face.
//
//   // Check whether it's been too long since we saw a face
//   // AND the happy face is still full opacity (i.e. not animating away)
//   if (timeSinceFace > MAX_TIME_SINCE_FACE && $('#yes').css('opacity') == 1) {
//     // If so, animate in the sad face and animate out the happy face
//     $('#no').animate({
//       opacity: 1
//     },ANIMATION_DURATION);
//     $('#yes').animate({
//       opacity: 0
//     },ANIMATION_DURATION);
//     // Say a random string from our sad lines
//     $('#no').text(getRandomString(noStrings));
//   }
//
//
// }
//
// // handleTrackingEvent
// //
// // Called every frame of video that detection is running
// function handleTrackingEvent (event) {
//   // Check if anything was tracked (a face)
//   if (event.data.length === 0) {
//     // No faces were detected in this frame.
//   }
//   else {
//     // We found a face!
//     // Reset the time since we saw a face to 0
//     timeSinceFace = 0;
//     // If the happy face has opacity 0, we need to animate it in
//     // and animate out the sad face
//     if ($('#yes').css('opacity') == 0) {
//       $('#no').animate({
//         opacity: 0
//       },ANIMATION_DURATION);
//       $('#yes').animate({
//         opacity: 1,
//       },ANIMATION_DURATION);
//       // Speak a happy line
//       $('#yes').text(getRandomString(yesStrings));
//     }
//   }
//
//
// }
//
//
//
//
//
//
//
// // getRandomString (array)
// //
// // A helper function that just returns a random string from the provided
// // array. This is a classic way to select a random element from an array.
// function getRandomString(array) {
//   var randomIndex = Math.floor(Math.random() * array.length);
//   return array[randomIndex];
// }
