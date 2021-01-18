let carouselMade = 1;
function Carousel(imageWrapper, transitionTime, holdTime, imageMaxWidth){
    this.imageWrapper = imageWrapper;    
    this.transitionTime = transitionTime;
    this.holdTime = holdTime;

    this.numberOfImages = this.imageWrapper.childElementCount;

    this.carouselContainer = document.querySelectorAll(`.carousel-container:nth-child(${carouselMade})`)[0];
    
    this.carouselContainer.classList = `carousel-container carousel-container${carouselMade}`
    
    carouselMade++;

    this.currentContainer = this.carouselContainer.classList[1]

    frames = 60;

    this.transitionSpeed = imageMaxWidth*(1000/transitionTime)/frames;
    
    this.transitionSpeedFaster = this.transitionSpeed*6;

    this.carouselContainer.style.maxWidth = imageMaxWidth + "px"
    
    this.carouselContainer.style.width = "90vw";
    
    this.imageWrapper.style.maxWidth = `${this.numberOfImages * 100}%` 
    this.imageWrapper.style.width = `${this.numberOfImages * 90}vw`

    // Set responsive image width 
    this.images = document.querySelectorAll(`.${this.currentContainer} .carousel-image-wrapper img`)
    
    Array.from(this.images).forEach((img) =>{
        img.style.width = "90vw";
        img.style.maxWidth = imageMaxWidth + "px";
    })

    this.imageWidth = parseInt(window.getComputedStyle(this.carouselContainer).width);
    
    while(this.transitionSpeed++){
        if(this.imageWidth % this.transitionSpeed == 0) break;
    }

    while(this.transitionSpeedFaster++){
        if(this.imageWidth % this.transitionSpeedFaster == 0) break;
    }
    
    var self = this;

    self.leftButton = document.createElement("img")
    self.rightButton = document.createElement("img")
    self.imageControl = document.createElement("ul")
    
    self.leftButton.src = "../images/keyboard_arrow_left-24px.svg"
    self.rightButton.src = "../images/keyboard_arrow_right-24px.svg"
    
    self.leftButton.id = "left-button"
    self.rightButton.id = "right-button"
    self.imageControl.id = "image-control"
    
    this.carouselContainer.appendChild(self.leftButton)
    this.carouselContainer.appendChild(self.rightButton)
    this.carouselContainer.appendChild(self.imageControl)
    
    
    /**
     * Set up dots for image control
     */
    self.dots = []
    for(let i = 0; i < self.numberOfImages; i++){
        let dot = document.createElement("li");
        dot.classList = "dot"
        self.imageControl.appendChild(dot)
        self.dots.push(dot)
    }
    
    self.dots[0].classList = "dot selected"
    
    let currentIndex = 0
    
    /**
     * Starts slide show until the mouse is hovered
     */
    
    self.interval = setInterval(slideRight, holdTime + transitionTime);
    
    function resumeSlides(){
        self.interval = setInterval(slideRight, holdTime + transitionTime);
        
    }

    let slide = document.getElementsByClassName(self.carouselContainer.classList[1])[0];
            
    slide.onmouseover = pauseSlides;
    slide.onmouseout = resumeSlides;

    function pauseSlides(event)
    {
        clearInterval(self.interval); // Clear the interval we set earlier
    }
    
    
    
    
    /**
     * Shifts wrapper right if negative is true
     * @param {*} currentIndex 
     * @param {*} currentDot 
     * @param {*} negative 
     */
    function shiftWrapper(currentIndex, currentDot, negative){
        function shift(){
            let imgwrrapper = window.getComputedStyle(self.imageWrapper);
            
            const matrix = new DOMMatrixReadOnly(imgwrrapper.transform)
            let xPosition = matrix.m41;  
            
            if(currentDot == self.dots[self.numberOfImages - 1] && negative){
                firstToLast(xPosition)
            }
            else if(currentDot == self.dots[0] && !negative){
                lastToFirst(-self.numberOfImages * self.imageWidth);
            }

            
            if((!negative && xPosition > -currentIndex * self.imageWidth) || 
            (negative && (xPosition < -currentIndex * self.imageWidth))){
                if(!negative)
                    xPosition -= self.transitionSpeed;
                else
                    xPosition += self.transitionSpeed;
                
                self.imageWrapper.style.transform = "translateX(" + xPosition + "px)";   
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
        if(xPosition > - self.imageWidth * (self.numberOfImages -1)){
            xPosition -= self.transitionSpeedFaster;
            self.imageWrapper.style.transform = "translateX(" + xPosition + "px)";   
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
        self.imageWrapper.style.transform = "translateX(" + xPosition + "px)";   
        if(xPosition < 0){
            xPosition += self.transitionSpeedFaster;
            requestAnimationFrame(function(){
                lastToFirst(xPosition);
            })
        }
    }

    
    self.imageControl.childNodes.forEach(function(currentDot, index){
        currentDot.addEventListener('click', function(){
            currentIndex = index;
            document.querySelector(`.${self.currentContainer} .dot.selected`).classList.remove("selected")
            self.imageWrapper.style.transform = `translateX(${-index * (100/self.numberOfImages)}%`;
            currentDot.classList.add("selected");
        })
    });
    
    
    self.rightButton.addEventListener('click', slideRight);
    
    self.leftButton.addEventListener('click', slideLeft);

    function slideRight(){
        self.dots[currentIndex].classList.remove("selected")
        currentIndex = currentIndex == self.numberOfImages - 1? 0: currentIndex + 1  ;
        shiftWrapper(currentIndex, self.dots[currentIndex], false)
    }
    
    function slideLeft(){
        self.dots[currentIndex].classList.remove("selected")
        currentIndex = currentIndex == 0 ? self.numberOfImages - 1: currentIndex - 1  ;
        shiftWrapper(currentIndex, self.dots[currentIndex], true)
    }
    
}




var carousel1 = new Carousel(document.querySelectorAll('.carousel-container:nth-child(1) .carousel-image-wrapper')[0], 1000, 1000, 600);

var carousel2 = new Carousel(document.querySelectorAll('.carousel-container:nth-child(2) .carousel-image-wrapper')[0], 2000, 2000, 600);

var carousel3 = new Carousel(document.querySelectorAll('.carousel-container:nth-child(3) .carousel-image-wrapper')[0], 500, 500, 600);



