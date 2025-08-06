const volunteerBios = {
  "Xen E.":
    "As Pig Pit has grown it has highlighted a need for better organization, delegation, and planning. Xen steps in as a prominent project manager providing a much needed refactoring of our entire preparation process. Bringing us into the 21st century we actually have tasks, owners, and an asana board thanks to him. Plus if you like the quality of your merch, Xen also handles the sourcing of art and goods!",
  "Hope M.":
    "Hope focuses on helping us more dutifully track expenses, people, projects, and last mile planning. There are always a million and one things to own and do for Pig Pit and when in doubt, Hope often is the first to pick up ownership. In addition to the behind the scenes work, look out for some new activities and decoration theming this year!",
  "Maseo B.":
    "Our music man, the best talent acquisitioner we could have asked for. Maseo himself plays in a band in Seattle and is fantastic at networking, finding the local music willing to play, and managing all of the connection and booking process. Day of, you can find him near the stage, shepherding the bands, keeping things on time, and if you’re lucky, MCing. ",
  "Alex D.":
    "As we grow the need for more and more engineering projects becomes apparent. You like the stage? Alex built it. You like the gazebo? Alex built it. You like the grill? Alex built it. A master at his craft, give him a clean sheet of requirements and you’ll get a design that’s overbuilt and under cost. If you want to give him thanks, you can find him behind one of the cameras at Pig Pit, he also moonlights as a YouTuber so check him out at https://www.youtube.com/@MethodicalMaker",
  "Greg G.":
    "Music doesn’t play without sound, our king roadie, without his help getting the bands is only half the battle. Greg brings a professionalism and good attitude that is irreplaceable. I can’t remember a single audio issue that has happened at any Pig Pit and I can’t imagine one happening in the future. He stays busy during the entire event, but go checkout his stack during the event if you like audio tech, just don’t distract him too much!",
  "Mike C.":
    "With no clearly defined role, Mike is the all rounder and jack of all trades. Every year he has helped anywhere that needed resources, he has the ability to help with engineering, set up, logistical planning, food, transportation, you name it Mike can help. The need for resourcing goes up every year and Mike has been an invaluable asset to throw at problems.",
  "Carly M.":
    "Carly is a new addition to the team this year. She is helping with the planning and logistics of the event. She has a great eye for detail and is helping us make sure everything runs smoothly.",
  "Casey H.":
    "Casey has been a long time volunteer and friend of Pig Pit. Prepping food, helping with setup, and artistic planning, her skills and vision has help make the event what it is today.",
};

/**
 * Stores the current state and details for a bubble
 */
class VolunteerBubble {
  /**
   * Create the volunteer bubble object
   *
   * Given a name, and the max X & Y for the canvas, will generate a
   * volunteer bubble with a randomized starting point and velocity
   *
   * @param {String} volunteerName
   * @param {Number} maxX
   * @param {Number} maxY
   */
  constructor(volunteerName, maxX, maxY) {
    let potentialX = Math.floor(Math.random() * maxX);
    // now make it not attached to the edge
    potentialX = Math.max(potentialX, 50);
    potentialX = Math.min(potentialX, maxX - 50);

    let potentialY = Math.floor(Math.random() * maxY);
    // now make it not attached to the edge
    potentialY = Math.max(potentialY, 50);
    potentialY = Math.min(potentialY, maxY - 50);

    this.name = volunteerName;
    this.x = potentialX;
    this.y = potentialY;
    this.velocityX = Math.floor(2 + Math.random() * 4);
    this.velocityY = Math.floor(2 + Math.random() * 4);
    this.radius = 60;
    this.colour = "#fccfa1";
  }

  /**
   * Gets the text to display in the bubble
   *
   * @param {Boolean} debug
   * @returns The inner bubble text
   */
  getText(debug) {
    if (debug) {
      return `${this.name}\n(${this.x},${this.y})`;
    }

    return this.name;
  }

  /**
   * Checks to see if the x,y coordinates hit the bubble
   *
   * @param {Number} x
   * @param {Number} y
   * @returns Whether the click event happened in the bubble
   */
  isHit(x, y) {
    const radiusWithBuffer = this.radius * 1.5;

    const bubbleTop = Math.max(this.y - radiusWithBuffer, 0);
    const bubbleBottom = this.y + radiusWithBuffer;
    const bubbleLeft = Math.max(this.x - radiusWithBuffer);
    const bubbleRight = this.x + radiusWithBuffer;

    // console.log(`left: ${bubbleLeft}, right: ${bubbleRight}, top: ${bubbleTop}, bottom: ${bubbleBottom}`)

    return (
      y < bubbleBottom && y > bubbleTop && x > bubbleLeft && x < bubbleRight
    );
  }

  /**
   * Increases the velocity of the bubble
   */
  increaseVelocity() {
    if (this.velocityX > 0) {
      this.velocityX = this.velocityX + 5;
    } else {
      this.velocityX = this.velocityX - 5;
    }

    if (this.velocityY > 0) {
      this.velocityY = this.velocityY + 5;
    } else {
      this.velocityY = this.velocityY - 5;
    }
  }
}

/**
 * Gets the volunteers for the given year
 *
 * @param {Number} year
 * @returns {Array} The list of volunteers
 * */
function getVolunteers(year) {
  if (year == 2024) {
    return [
      "Hope M.",
      "Xen E.",
      "Casey H.",
      "Maseo B.",
      "Alex D.",
      "Greg G.",
      "Matt F.",
      "Mew",
      "Anna W.",
      "Mike G.",
      "Mike C.",
      "Erik B.",
      "Kelsie W.",
      "Austin B.",
    ];
  } else if (year == 2025) {
    return [
      "Hope M.",
      "Xen E.",
      "Maseo B.",
      "Alex D.",
      "Greg G.",
      "Carly M.",
      "Casey H.",
      "Mike C.",
      "Erin",
      "Kelly",
      "Justin",
      "Jack",
      "Beena",
      "Josh",
      "Tessa",
      "Laura Lee",
      "Gabby",
      "Carly",
      "Erik",
      "Stefan",
    ];
  } else {
    return [];
  }
}

(async function () {
  let volunteerBubbles = [];

  const debugDiv = document.getElementById("debug-info");

  let canvas = document.getElementById("volunteer-canvas");
  let volunteerBlurbs = document.getElementById("volunteer-blurbs");

  console.log(`${canvas.offsetTop}, ${canvas.clientTop}`);

  let toggle = document.getElementById("volunteer-view-toggle");
  toggle.checked = true;
  toggle.addEventListener("change", function (event) {
    console.log("Toggle changed..");
    if (this.checked) {
      canvas.style.visibility = "visible";
      volunteerBlurbs.style.display = "none";
      document.body.classList.add("no-overflow");
    } else {
      canvas.style.visibility = "hidden";
      drawVolunteerBlurbs(volunteerBlurbs, volunteerBubbles);
      volunteerBlurbs.style.display = "block";
      document.body.classList.remove("no-overflow");
    }
  });

  // uncomment to start with the blurb view
  // toggle.click();

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let l = canvas.getContext("2d");

  const years = [2024, 2025];

  years.forEach((year, _index) => {
    const button = document.getElementById(`${year}-volunteers`);
    button.addEventListener("click", function (event) {
      // Remove the selected class from all buttons
      const buttons = document.querySelectorAll(".year-button");
      buttons.forEach((btn) => {
        btn.classList.remove("selected");
      });

      button.classList.add("selected");
      const volunteers = getVolunteers(year);
      volunteerBubbles = volunteers.map((v) => {
        return new VolunteerBubble(v, innerWidth, innerHeight);
      });
      drawVolunteerBlurbs(volunteerBlurbs, volunteerBubbles);
    });

    if (year == 2025) {
      button.click();
    }
  });

  move();

  // This function will do the animation
  function move() {
    // Clear out the screen for the redraw
    l.clearRect(0, 0, innerWidth, innerHeight);

    volunteerBubbles.forEach((b) => drawBubble(l, b));
    requestAnimationFrame(move);
  }

  canvas.addEventListener("click", function (event) {
    // I am getting the offset here during the click event because for some reason if I get this
    // earlier on, the canvas offset is significantly higher than it should be. Maybe something with
    // the DOM loading later than the canvas value is set? Don't know. But this works
    // let canvasLeft = canvas.offsetLeft + canvas.clientLeft;
    // let canvasTop = canvas.offsetTop + canvas.clientTop;
    // console.log(`${canvas.offsetTop}, ${canvas.clientTop}`)
    // console.log(`Layer: (${event.layerX},${event.layerY}) Page: (${event.pageX},${event.pageY})`)

    let clickX = event.offsetX;
    let clickY = event.offsetY;

    // // ALSO!!!! On my phone (MouseEvent) the offset event layer doesnt need an offset. Unlike the PointerEvent
    // // seen from the browser
    // const eventType = event.__proto__.constructor.name;
    // // This means that if we are receiving a pointer event, we have to subtract the canvas offsets to get the correct
    // // point in the canvas. If it is not a pointer event, we do not do this...
    // if (eventType == 'PointerEvent') {
    //     // clickX -= canvasLeft;
    //     // clickY -= canvasTop;
    // }

    // // Firefox uses mouse events. Which has the offsetX and Y values
    // if (eventType == 'MouseEvent') {
    //     clickX = event.offsetX;
    //     clickY = event.offsetY;
    // }

    console.log(`clicked (${clickX},${clickY})`);

    // debugDiv.textContent = `TYPE: ${event.__proto__.constructor.name} | layer: (${event.layerX},${event.layerY}) | offset: (${event.offsetX},${event.offsetY}) | clicked (${clickX},${clickY}) | ${canvasLeft},${canvasTop} | ${canvas.offsetLeft} ^ ${canvas.clientLeft} | ${canvas.offsetTop} ^ ${canvas.clientTop}`

    volunteerBubbles.forEach(function (bubble) {
      console.log(bubble.getText(true));
      if (bubble.isHit(clickX, clickY)) {
        bubble.colour = chooseRandomColour();
        bubble.increaseVelocity();
      }
    });
  });
})();

/**
 * Generates a random colour based off the hue saturation lightness alpha model
 *
 * @returns Returns a random colour
 */
function chooseRandomColour() {
  return "hsla(" + Math.random() * 360 + ", 100%, 50%, 1)";
}

function drawVolunteerBlurbs(root, volunteers) {
  // remove any existing volunteer-blurb elements that were created
  const existing = root.querySelectorAll(".volunteer-blurb");
  existing.forEach((b) => {
    b.remove();
  });
  volunteers.forEach((v) => {
    let blurb = document.createElement("div");
    blurb.className = "volunteer-blurb";
    root.appendChild(blurb);

    let name = document.createElement("p");
    name.className = "volunteer-name";
    name.textContent = v.name;
    blurb.appendChild(name);

    if (volunteerBios[v.name]) {
      let bio = document.createElement("p");
      bio.className = "volunteer-bio";
      bio.textContent = volunteerBios[v.name];
      blurb.appendChild(bio);
    }
  });
}

/**
 * Draws the current volunteer bubble on the HTML canvas
 *
 * @param {*} canvas2dContext
 * @param {VolunteerBubble} bubble
 */
function drawBubble(canvas2dContext, bubble) {
  // Creating a circle
  canvas2dContext.beginPath();
  canvas2dContext.strokeStyle = bubble.colour;
  canvas2dContext.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2, false);
  canvas2dContext.stroke();

  canvas2dContext.font = "18pt Palatino Linotype";
  canvas2dContext.fillStyle = bubble.colour;
  canvas2dContext.textAlign = "center";
  canvas2dContext.fillText(bubble.getText(false), bubble.x, bubble.y + 3);

  // Conditions so that the ball bounces
  // from the edges
  if (bubble.radius + bubble.x > innerWidth)
    bubble.velocityX = 0 - bubble.velocityX;

  if (bubble.x - bubble.radius < 0) bubble.velocityX = 0 - bubble.velocityX;

  if (bubble.y + bubble.radius > innerHeight)
    bubble.velocityY = 0 - bubble.velocityY;

  if (bubble.y - bubble.radius < 0) bubble.velocityY = 0 - bubble.velocityY;

  bubble.x = bubble.x + bubble.velocityX;
  bubble.y = bubble.y + bubble.velocityY;
}
