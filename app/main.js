// Init new camera instance on the player node
const camera = new Camera(document.getElementById("player"));

// Main App logic

const _init = () => {
  // Switch on camera in viewfinder
  $("#viewfinder").on("show.bs.modal", () => {
    camera.switch_on();
  });

  // Switch off camera in viewfinder
  $("#viewfinder").on("hidden.bs.modal", () => {
    camera.switch_off();
  });

  // Take photo
  $("#shutter").on("click", () => {
    let photo = camera.take_photo();

    // Show photo preview in camera button
    $("#camera")
      .css("background-image", `url(${photo})`)
      .addClass("withphoto");
  });

  // Submit message
  $("#send").on("click", () => {
    // Get caption text
    let caption = $("#caption").val();

    // Check message is ok
    if (!camera.photo || !caption) {
      // Show notification and return
      toastr.warning("Photo & Caption Required", "Incomplete Message");
      return;
    }

    // Render new message in feed
    renderMessage({ photo: camera.photo, caption });

    // Reset caption field on success
    $("#caption").val("");
    $("#camera")
      .css("background-image", "")
      .removeClass("withphoto");
    camera.photo = null;
  });
};

// create new message element
const renderMessage = message => {
  // Message HTML
  let msgHTML = `
    <div style="display: none;" class="row message bg-light mb-2 rounded shadow">
        <div class="col-2 p-1">
            <img src="${message.photo}" class="photo w-100 rounded"/>
        </div>
        <div class="col-10 p-1">
        ${message.caption}
        </div>
    </div>
    `;

  // Prepend to #messages
  $(msgHTML)
    .prependTo("#messages")
    .show(500)

    // Bind a click handler on new img element to show in modal
    .find("img")
    .on("click", showPhoto);
};

// Show message photo in modal
const showPhoto = e => {
  // Get photo src
  let photoSrc = $(e.currentTarget).attr("src");

  // Set to and show photoframe modal
  $("#photoframe img").attr("src", photoSrc);
  $("#photoframe").modal("show");
};
