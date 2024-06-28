/**
 * The class 
 */
class VolunteerBubble {
    /**
     * 
     * @param {String} volunteerName 
     */
    constructor(volunteerName) {
        this.name = volunteerName;
        this.x = 100;
        this.y = 100;
        this.velocityX = 5;
        this.velocityY = 2;
        this.radius = 50;
    }
}

(async function() {
    const volunteers = ["Rory", "Elliot"];

    var circles = [
        
    ];

    let canvas = document.getElementById("volunteer-canvas");
 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
     
    let l = canvas.getContext('2d');

    const volunteerBubbles = volunteers.map((v) => {
        return new VolunteerBubble(v)
    });
     
    // x and y are the coordinates of the circle
    // vx and vy are the respective speeds
    let x = Math.floor(Math.random() * innerWidth);
    let y = Math.floor(Math.random() * innerHeight);
    let vx = Math.floor(Math.random() * 2);
    let vy = Math.floor(Math.random() * 4);
    let radius = 50;
     
    move();
     
    // This function will do the animation
    function move() {
     
        // // It clears the specified pixels within
        // // the given rectangle
        l.clearRect(0, 0, innerWidth, innerHeight);

        volunteerBubbles.forEach((b) => drawBubble(l, b));
        requestAnimationFrame(move);
    }
})();

/**
 * 
 * @param {VolunteerBubble} bubble 
 */
function drawBubble(canvas2dContext, bubble) {
    // Creating a circle
    canvas2dContext.beginPath();
    canvas2dContext.strokeStyle = "white";
    canvas2dContext.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2, false);
    canvas2dContext.stroke();

    canvas2dContext.font = '16pt Calibri';
    canvas2dContext.fillStyle = 'white';
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