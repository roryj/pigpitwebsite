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
        // ALSO!!!! On my phone the offset event layer doesnt need an offset. WTF
        let canvasLeft = canvas.offsetLeft + canvas.clientLeft;
        let canvasTop = canvas.offsetTop + canvas.clientTop;
        // console.log(`${canvas.offsetTop}, ${canvas.clientTop}`)
        // console.log(`Layer: (${event.layerX},${event.layerY}) Page: (${event.pageX},${event.pageY})`)

        let clickX = event.layerX;
        let clickY = event.layerY;
        if (!isMobile()) {
            clickX -= canvasLeft;
            clickY -= canvasTop;
        }

        // console.log(`clicked (${clickX},${clickY})`)

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

/**
 * @returns Whether the current device is a phone
 */
function isMobile() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};