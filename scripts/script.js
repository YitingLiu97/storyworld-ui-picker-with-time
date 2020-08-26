//==============================================================================
// The following example demonstrates how to call a function repeatedly every
// 0.5 seconds as well as call a function once after 5 seconds has passed.
//
// Project setup:
// - Insert a plane
//==============================================================================

// Load the required modules
const Scene = require('Scene');
const Time = require('Time');
const Reactive = require('Reactive');

// Enable async/await in JS [part 1]
(async function() {
  // Locate the plane in the Scene
  const [plane] = await Promise.all([
    Scene.root.findFirst('plane0')
  ]);

  // Create a variable used in the timers
  const timeInMilliseconds = 500;

  //==============================================================================
  // Increase and decrease the scale of the plane every 0.5 seconds
  //==============================================================================

  // Create a boolean to determine if the plane's width is doubled or not
  var isPlaneDoubleWidth = false;

  // Store a reference to the plane's transform signal
  const planeTransform = plane.transform;

  // Store a reference to the plane's initial x-axis scale value
  const planeWidth = planeTransform.scaleX.pinLastValue();

  // Create a function that changes the width of the plane
  function changePlaneWidth() {

    // If the plane's width is not doubled...
    if (!isPlaneDoubleWidth) {

      // Multiply the x-axis scale value of the plane by 2, doubling it
      planeTransform.scaleX = Reactive.mul(planeWidth, 2);

    // Otherwise...
    } else {

      // Set the x-axis scale back to it's original value, halving it
      planeTransform.scaleX = planeWidth;

    }

    // Update the boolean
    isPlaneDoubleWidth = !isPlaneDoubleWidth;

  }

  // Create an interval timer that calls the changePlaneWidth function every 0.5
  // seconds
  const intervalTimer = Time.setInterval(changePlaneWidth, timeInMilliseconds);

  //==============================================================================
  // Stop the interval timer after 5 seconds using a timeout timer
  //==============================================================================

  // Create a function that stops the interval timer
  function stopIntervalTimer() {
    Time.clearInterval(intervalTimer);
  }

  // Create a timeout timer that calls the stopIntervalTimer function after 5
  // seconds have passed
  const timeoutTimer = Time.setTimeout(stopIntervalTimer, timeInMilliseconds * 10);
// Enable async/await in JS [part 2]
})();