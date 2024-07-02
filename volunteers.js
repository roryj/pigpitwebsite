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
        this.velocityX = Math.floor(2 + (Math.random() * 4));
        this.velocityY = Math.floor(2 + (Math.random() * 4));
        this.radius = 60;
        this.colour = '#fccfa1';
    }

    /**
     * Gets the text to display in the bubble
     *
     * @param {Boolean} debug
     * @returns The inner bubble text
     */
    getText(debug) {
        if (debug) {
            return `${this.name}\n(${this.x},${this.y})`
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

        return y < bubbleBottom && y > bubbleTop && x > bubbleLeft && x < bubbleRight;
    }

}

(async function() {
    const volunteers = ["Hope M.", "Xen E.", "Tom P.", "Colleen C.", "Casey H.", "Maseo B.", "Alex"];

    const debugDiv = document.getElementById('debug-info');

    let canvas = document.getElementById("volunteer-canvas");
    console.log(`${canvas.offsetTop}, ${canvas.clientTop}`)

 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
     
    let l = canvas.getContext('2d');

    const volunteerBubbles = volunteers.map((v) => {
        return new VolunteerBubble(v, innerWidth, innerHeight)
    });

    move();
     
    // This function will do the animation
    function move() {
     
        // Clear out the screen for the redraw
        l.clearRect(0, 0, innerWidth, innerHeight);

        volunteerBubbles.forEach((b) => drawBubble(l, b));
        requestAnimationFrame(move);
    }

    canvas.addEventListener('click', function(event) {
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

        console.log(`clicked (${clickX},${clickY})`)

        // debugDiv.textContent = `TYPE: ${event.__proto__.constructor.name} | layer: (${event.layerX},${event.layerY}) | offset: (${event.offsetX},${event.offsetY}) | clicked (${clickX},${clickY}) | ${canvasLeft},${canvasTop} | ${canvas.offsetLeft} ^ ${canvas.clientLeft} | ${canvas.offsetTop} ^ ${canvas.clientTop}`

        volunteerBubbles.forEach(function(bubble) {
            console.log(bubble.getText(true))
            if (bubble.isHit(clickX, clickY)) {
                bubble.colour = chooseRandomColour()
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
    return 'hsla(' + (Math.random() * 360) + ', 100%, 50%, 1)';
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

    canvas2dContext.font = '18pt Palatino Linotype';
    canvas2dContext.fillStyle = bubble.colour;
    canvas2dContext.textAlign = 'center';
    canvas2dContext.fillText(bubble.getText(false), bubble.x, bubble.y+3);
    
    
    // Conditions so that the ball bounces
    // from the edges
    if (bubble.radius + bubble.x > innerWidth)
        bubble.velocityX = 0 - bubble.velocityX;
    
    if (bubble.x - bubble.radius < 0)
        bubble.velocityX = 0 - bubble.velocityX;
    
    if (bubble.y + bubble.radius > innerHeight)
        bubble.velocityY = 0 - bubble.velocityY;
    
    if (bubble.y - bubble.radius < 0)
        bubble.velocityY = 0 - bubble.velocityY;
    
    bubble.x = bubble.x + bubble.velocityX;
    bubble.y = bubble.y + bubble.velocityY;
}