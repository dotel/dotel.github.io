let carouselContainer = document.querySelector(".carousel-container")
let imageWrapper = document.querySelector(".carousel-image-wrapper")

let leftButton = document.createElement("img")
let rightButton = document.createElement("img")
let imageControl = document.createElement("ul")


let imageWidth = 300;
let transitionSpeed = 10;

carouselContainer.style.width = imageWidth + "px"

let numberOfImages = imageWrapper.childElementCount;


imageWrapper.style.width = `${numberOfImages * 100}%` 

leftButton.src = "./images/keyboard_arrow_left-24px.svg"
rightButton.src = "./images/keyboard_arrow_right-24px.svg"

leftButton.id = "left-button"
rightButton.id = "right-button"
imageControl.id = "image-control"

carouselContainer.appendChild(leftButton)
carouselContainer.appendChild(rightButton)
carouselContainer.appendChild(imageControl)


/**
 * Set up dots for image control
 */
var dots = []
for(let i = 0; i < numberOfImages; i++){
    let dot = document.createElement("li");
    dot.classList = "dot"
    imageControl.appendChild(dot)
    dots.push(dot)
}

dots[0].classList = "dot selected"

let currentIndex = 0



/**
 * Shifts wrapper right if negative is true
 * @param {*} currentIndex 
 * @param {*} currentDot 
 * @param {*} negative 
 */
function shiftWrapper(currentIndex, currentDot, negative){
    function shift(){
        let imgwrrapper = window.getComputedStyle(imageWrapper);
        const matrix = new DOMMatrixReadOnly(imgwrrapper.transform)
        let xPosition = matrix.m41;    
        
        if(currentDot == dots[numberOfImages - 1] && negative){
            firstToLast(xPosition)
        }
        else if(currentDot == dots[0] && !negative){
            lastToFirst(-1800);
        }
        
        if((!negative && xPosition > -currentIndex * imageWidth) || 
            (negative && (xPosition < -currentIndex * imageWidth))){
            if(!negative)
                xPosition -= transitionSpeed;
            else
                xPosition += transitionSpeed;

            imageWrapper.style.transform = "translateX(" + xPosition + "px)";   
            requestAnimationFrame(shift)
        }
    }
    window.requestAnimationFrame(shift)
    currentDot.classList.add("selected");
}


/**
 * Animation transition when left is selected at start
 * @param {*} xPosition 
 */
function firstToLast(xPosition){
    if(xPosition > - imageWidth * (numberOfImages -1)){
        xPosition -= 6* transitionSpeed;
        imageWrapper.style.transform = "translateX(" + xPosition + "px)";   
        requestAnimationFrame(function(){
            firstToLast(xPosition)
        })
    }
}


/**
 * Animation transition when left is selected at last slide
 * @param {*} xPosition 
 */
function lastToFirst(xPosition){
    imageWrapper.style.transform = "translateX(" + xPosition + "px)";   
    if(xPosition < 0){
        xPosition += 6*transitionSpeed;
        requestAnimationFrame(function(){
            lastToFirst(xPosition);
        })
    }
}


imageControl.childNodes.forEach(function(currentDot, index){
    currentDot.addEventListener('click', function(){
        currentIndex = index;
        document.querySelector(".dot.selected").classList.remove("selected")
        imageWrapper.style.transform = `translateX(${-index * (100/numberOfImages)}%`;
        currentDot.classList.add("selected");
    })
});


rightButton.addEventListener('click', function slideRight(){
    dots[currentIndex].classList.remove("selected")
    currentIndex = currentIndex == numberOfImages - 1? 0: currentIndex + 1  ;
    shiftWrapper(currentIndex, dots[currentIndex], false)
});

leftButton.addEventListener('click', function slideLeft(){
    dots[currentIndex].classList.remove("selected")
    currentIndex = currentIndex == 0 ? numberOfImages - 1: currentIndex - 1  ;
    shiftWrapper(currentIndex, dots[currentIndex], true)
});

