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
        this.velocityX = Math.floor(3 + (Math.random() * 4));
        this.velocityY = Math.floor(3 + (Math.random() * 4));
        this.radius = 60;
    }
}

(async function() {
    const volunteers = ["Hope M.", "Xen E.", "Tom P.", "Colleen C.", "Casey H.", "Maseo B.", "Alex"];

    let canvas = document.getElementById("volunteer-canvas");
 
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
})();

/**
 * Draws the current volunteer bubble on the HTML canvas
 * 
 * @param {*} canvas2dContext
 * @param {VolunteerBubble} bubble 
 */
function drawBubble(canvas2dContext, bubble) {
    // Creating a circle
    canvas2dContext.beginPath();
    canvas2dContext.strokeStyle = "#fccfa1";
    canvas2dContext.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2, false);
    canvas2dContext.stroke();

    canvas2dContext.font = '18pt Palatino Linotype';
    canvas2dContext.fillStyle = '#fccfa1';
    canvas2dContext.textAlign = 'center';
    canvas2dContext.fillText(bubble.name, bubble.x, bubble.y+3);
    
    
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