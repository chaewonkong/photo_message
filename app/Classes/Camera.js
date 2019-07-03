class Camera {
  constructor(video_node) {
    // Camera stream DOM
    this.video_node = video_node;
    console.log("camera WORKS");
  }

  // Camera feed (viewfinder) on
  switch_on() {
    // Get camera media stream and set on player <video>
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 600, height: 600 },
        audeo: false
      })
      .then(stream => {
        this.video_node.srcObject = this.stream = stream;
      });
  }

  // Camera feed (viewfinder) off
  switch_off() {
    // Pause video node
    this.video_node.pause();

    // Stop media stream
    this.stream.getTracks()[0].stop();
  }

  take_photo() {
    // Create a <canvas> element to render the photo
    let canvas = document.createElement("canvas");

    // Set canvas dimensions same as video stream
    canvas.setAttribute("width", 600);
    canvas.setAttribute("height", 600);

    // Get canvas context
    let context = canvas.getContext("2d");

    // Draw (render) the image onto the canvas
    context.drawImage(this.video_node, 0, 0, canvas.width, canvas.height);

    // Get the canvas image as a data uri
    this.photo = context.canvas.toDataURL();

    context = null;
    canvas = null;

    return this.photo;
  }
}
