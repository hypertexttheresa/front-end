const brickWidth = 90;
const brickHeight = 40;
const wallWidth = 590;
const wallHeight = 250;
const mortar = 10;
var brickColumn = 0;
var brickRow = 0;
var bricks = 0;
var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', wallWidth);
svg.setAttribute('height', wallHeight);
var svgNS = svg.namespaceURI;
var group = document.createElementNS(svgNS,'g');
group.setAttribute('fill','#fff');
svg.appendChild(group);

function getBrick(x, y) {
    var brickId = 'brick-' + bricks;
    var brick = document.createElementNS(svgNS,'rect');
    if (brickRow % 2 === 1) {
        // uneven rows start with half a brick
        x = x - (brickWidth + mortar) / 2;
    }
    brick.setAttribute('x', x);
    brick.setAttribute('y', y);
    brick.setAttribute('width', brickWidth);
    brick.setAttribute('height', brickHeight);
    
    brickAnimation = getBrickAnimation(brickId);
    brick.appendChild(brickAnimation);

    return brick;
}

function getBrickAnimation(brickId) {
    var brickAnimationId = 'brick-animation-' + bricks;
    var brickAnimation = document.createElementNS(svgNS,'animate');
    var animationStart = 'brickButton.click+' + (bricks * 400).toString() + 'ms';
    brickAnimation.setAttribute('id', brickAnimationId);
    brickAnimation.setAttribute('attributeName', 'fill');
    brickAnimation.setAttribute('attributeType', 'XML');
    brickAnimation.setAttribute('from', '#fff');
    brickAnimation.setAttribute('to', '#990000');
    brickAnimation.setAttribute('dur', '0.5s');
    brickAnimation.setAttribute('fill', 'freeze');
    brickAnimation.setAttribute('repeatCount', '1');
    brickAnimation.setAttribute('begin', animationStart);
    brickAnimation.setAttribute('targetElement', brickId);
    
    return brickAnimation;
}

function getWall() {
    var x = 0;
    var y = wallHeight - brickHeight - mortar;
    var brick;
    
    while (y >= 0) {
        brick = getBrick(x, y)
        group.appendChild(brick);
        
        if (x + brickWidth > svg.getAttribute('width')) {
            brickRow++;
            brickColumn = 0; 
            y = wallHeight - brickHeight - mortar - brickRow * (brickHeight + mortar);
            x = 0;
        } else {
            brickColumn++;
            x = brickColumn * (brickWidth + mortar);
        }
        bricks++;
    }
}

function finishWall() {
    var title = document.getElementById('title');
    title.innerText = 'Bedankt voor de bakstenen';
    brickButton.style.visibility = 'hidden';
}

document.addEventListener('DOMContentLoaded', function() {
    const brickButton = document.getElementById('brickButton');
    document.body.appendChild(svg);
    getWall();
    brickButton.addEventListener('click', finishWall);
}); 
