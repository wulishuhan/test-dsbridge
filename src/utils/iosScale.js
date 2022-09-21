window.onload = function () {
  document.addEventListener("touchstart", function (event) {
    if (event.touches.length > 1) {
      console.log("test1");
      event.preventDefault();
    }
  });
  document.addEventListener("gesturestart", function (event) {
    console.log("test2");
    event.preventDefault();
  });
};
