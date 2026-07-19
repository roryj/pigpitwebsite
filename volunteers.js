/**
 * Bios for each volunteer, keyed by name and then by year.
 *
 * A "default" entry is used as a fallback when there's no bio specific to
 * the year being viewed. Add a year key (e.g. "2026") alongside "default"
 * to override the bio for that year only.
 */
const volunteerBios = {
  "Xen E.": {
    default:
      "As Pig Pit has grown it has highlighted a need for better organization, delegation, and planning. Xen steps in as a prominent project manager providing a much needed refactoring of our entire preparation process. Bringing us into the 21st century we actually have tasks, owners, and an asana board thanks to him. Plus if you like the quality of your merch, Xen also handles the sourcing of art and goods!",
  },
  "Hope M.": {
    default:
      "Hope focuses on helping us more dutifully track expenses, people, projects, and last mile planning. There are always a million and one things to own and do for Pig Pit and when in doubt, Hope often is the first to pick up ownership. In addition to the behind the scenes work, look out for some new activities and decoration theming this year!",
  },
  "Maseo B.": {
    default:
      "Our music man, the best talent acquisitioner we could have asked for. Maseo himself plays in a band in Seattle and is fantastic at networking, finding the local music willing to play, and managing all of the connection and booking process. Day of, you can find him near the stage, shepherding the bands, keeping things on time, and if you’re lucky, MCing. ",
  },
  "Alex D.": {
    default:
      "As we grow the need for more and more engineering projects becomes apparent. You like the stage? Alex built it. You like the gazebo? Alex built it. You like the grill? Alex built it. A master at his craft, give him a clean sheet of requirements and you’ll get a design that’s overbuilt and under cost. If you want to give him thanks, you can find him behind one of the cameras at Pig Pit, he also moonlights as a YouTuber so check him out at https://www.youtube.com/@MethodicalMaker",
  },
  "Greg G.": {
    default:
      "Music doesn’t play without sound, our king roadie, without his help getting the bands is only half the battle. Greg brings a professionalism and good attitude that is irreplaceable. I can’t remember a single audio issue that has happened at any Pig Pit and I can’t imagine one happening in the future. He stays busy during the entire event, but go checkout his stack during the event if you like audio tech, just don’t distract him too much!",
  },
  "Mike C.": {
    default:
      "With no clearly defined role, Mike is the all rounder and jack of all trades. Every year he has helped anywhere that needed resources, he has the ability to help with engineering, set up, logistical planning, food, transportation, you name it Mike can help. The need for resourcing goes up every year and Mike has been an invaluable asset to throw at problems.",
  },
  "Carly M.": {
    default:
      "In her first year helping out, Carly worked her magic connecting us to awesome local sponsors and added touches to the decorations.",
  },
  "Tansy H.": {
    default:
      "Tansy has been an attendee for the past few years, and has been an incredible help connecting us to incredible people, and finding new ways to make Pig Pit even better.",
  },
  "Casey H.": {
    default:
      "Casey has been a long time volunteer and friend of Pig Pit. Prepping food, helping with setup, and artistic planning, her skills and vision has help make the event what it is today.",
  },
  "Mike G.": {
    default:
      "Our staple travel volunteer. Since his first year out, Mike has consistently flown in early to help with Pig Pit. The taskmaster, throw him at the asana board and watch him work. Mike can excel in pretty much any role, but by his own admission, his favorite are the brain off, we need to do this rote work a hundred times, tasks. We love that for him. One of the early guests who really resonated with the prep side, it’s always a good time when he pulls up.",
  },
  "Jack": {
    default:
      "First year Jack came to party, the second year Jack came to solve problems and play sick tunes. Flying in multiple days early, Jack brings a lovely amount of autonomy and task completion to the final week run up of Pig Pit. Helping from construction to sun sails, meat wrapping to fire handling. He even started acting as a delegator of his own, directing some friends of his to do the highly important jobs no one else wants to do, bleach work and digging. Combined with his DJ set, Jack brings the energy.",
  },
  "Beena": {
    default:
      "A stand out volunteer who chose to help her first Pig Pit. Beena is all about community building through events and communal work. Pig Pit was a natural fit! Not only helping with a litany of tasks, but she ran a Yoga sesh during last year in the front yard, one of my favorite events!",
  },
  "Gabby": {
    default:
      "When your partners are so integrated into the planning of Pig Pit, there’s no escaping helping out. Gabby brings wonderful volunteer energy! She’s a jack of all trades, but shines with decorating and vibe setting. Some of the best small touches are from her hand.",
  },
  "Erik": {
    default:
      "No roadie can do it all by themselves. Greg’s right hand man, if you don’t see Greg handling some aspect of the sound, you can bet that Erik will be the one owning it. As we’ve grown, it helps immensely to have another set of hands and a very smart brain to help make sure everything runs smoothly. The unsung heroes of the entertainment.",
  },
  "Laura Lee & Anna": {
    default:
      "Our wonderful merch stand volunteers. They take us the final mile when it comes to not going broke! While we never break even, they do their best job in enticing folks to grab some swag, donate, or just learn more about what it costs to put on Pig Pit. Be sure to stop by and say hi!",
  },
  "Erin & Kyle": {
    default:
      "If you need physical labor, these folks can move boulders. We require volunteers of all types, months out, and the week before. Turns out, getting the space prepared for 250 people requires a lot of effort moving all sorts of heavy items, pounding ground, and cleaning. Not always the top of peoples want to do list, but we love any and all help in those endeavors. Shout out to the big effort they always bring.",
  },
  "Kelly & Justin": {
    default:
      "Staple get-er-dones. We love the task killers, there are a million and one things to do and it always helps to have hands. They helped spruce up the sun sail anchors, set up the sails themselves, and just general yard effort throughout. Every person helps and they’ve always heeded the call.",
  },
  "Josh & Tessa": {
    default:
      "These great volunteers were an incredible asset helping not only with the setup and decorations, but also making our chalkboard collaborative piece standout.",
  },
};

/**
 * Gets the bio for a volunteer in a given year, falling back to their
 * default bio if no year-specific one has been written.
 *
 * @param {String} name
 * @param {Number} year
 * @returns {String|undefined}
 */
function getVolunteerBio(name, year) {
  const bios = volunteerBios[name];
  if (!bios) {
    return undefined;
  }

  return bios[year] ?? bios.default;
}

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
      "Josh & Tessa",
      "Laura Lee",
      "Gabby",
      "Carly",
      "Erik",
      "Stefan",
    ];
  } else if (year == 2026) {
    return [
      "Hope M.",
      "Xen E.",
      "Maseo B.",
      "Alex D.",
      "Greg G.",
      "Carly M.",
      "Tansy H.",
      "Mike C.",
      "Mike G.",
      "Casey H.",
      "Jack",
      "Beena",
      "Gabby",
      "Erik",
      "Laura Lee & Anna",
      "Erin & Kyle",
      "Kelly & Justin",
    ];
  } else {
    return [];
  }
}

(async function () {
  let volunteerBubbles = [];
  let currentYear = null;

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
      drawVolunteerBlurbs(volunteerBlurbs, volunteerBubbles, currentYear);
      volunteerBlurbs.style.display = "block";
      document.body.classList.remove("no-overflow");
    }
  });

  // uncomment to start with the blurb view
  // toggle.click();

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let l = canvas.getContext("2d");

  const years = [2024, 2025, 2026];

  years.forEach((year, _index) => {
    const button = document.getElementById(`${year}-volunteers`);
    button.addEventListener("click", function (event) {
      // Remove the selected class from all buttons
      const buttons = document.querySelectorAll(".year-button");
      buttons.forEach((btn) => {
        btn.classList.remove("selected");
      });

      button.classList.add("selected");
      currentYear = year;
      const volunteers = getVolunteers(year);
      volunteerBubbles = volunteers.map((v) => {
        return new VolunteerBubble(v, innerWidth, innerHeight);
      });
      drawVolunteerBlurbs(volunteerBlurbs, volunteerBubbles, currentYear);
    });

    if (year == 2026) {
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

function drawVolunteerBlurbs(root, volunteers, year) {
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

    const bioText = getVolunteerBio(v.name, year);
    if (bioText) {
      let bio = document.createElement("p");
      bio.className = "volunteer-bio";
      bio.innerHTML = bioText.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" style="color:#fccfa1;">$1</a>'
      );
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
