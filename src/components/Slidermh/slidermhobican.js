const sliderMH = {
  selectors: {
    slider: 'js-slider',
    slide: 'js-slide',
    sliderInner: 'js-slider-inner',
    sliderArrow: 'js-slide-arrow',
    arrowLeft: 'js-arrow-left',
    arrowRight: 'js-arrow-right',
    currentSlide: 'js-current-slide',
  },
  selectorsCSS: {
    slider: 'slider',
    slide: 'slider__slide',
    sliderInner: 'slider__inner',
    currentSlide: 'slider__slide--current',
    sliderContent: 'slider__content'
  }
}

// Elements
const slider = document.querySelector(`.${sliderMH.selectors.slider}`);
const sliderInner = document.querySelector(`.${sliderMH.selectors.sliderInner}`);
const slides = document.querySelectorAll(`.${sliderMH.selectors.slide}`);
const slide = document.querySelector(`.${sliderMH.selectors.slide}`)
const arrowLeft = document.querySelector(`.${sliderMH.selectors.arrowLeft}`)
const arrowRight = document.querySelector(`.${sliderMH.selectors.arrowRight}`)

// Event Listeners
if (window.PointerEvent) {
  slider.addEventListener('pointerdown', (e) => sliderMouseDown(e));
  slider.addEventListener('pointermove', (e) => sliderMouseMove(e));
  slider.addEventListener('pointerleave', () => sliderMouseLeaveOrUp())
  document.addEventListener('pointerup', () => sliderMouseLeaveOrUp())
} else {
  slider.addEventListener('pointerdown', (e) => sliderMouseDown(e));
  slider.addEventListener('pointermove', (e) => sliderMouseMove(e));
  slider.addEventListener('pointerleave', () => sliderMouseLeaveOrUp())
  document.addEventListener('pointerup', () => sliderMouseLeaveOrUp())

  slider.addEventListener('touchdown', (e) => sliderMouseDown(e));
  slider.addEventListener('touchmove', (e) => sliderMouseMove(e));
  slider.addEventListener('touchleave', () => sliderMouseLeaveOrUp())
  document.addEventListener('touchup  ', () => sliderMouseLeaveOrUp())
}
arrowLeft.addEventListener('click', () => slideLeft());
arrowRight.addEventListener('click', () => slideRight());
sliderInner.addEventListener('transitionend', (e) => expandCurrentSlide(e));
sliderInner.addEventListener('transitionend', (e) => checkSlideIndex(e));
slides.forEach(slide => slide.addEventListener('click', (e) => checkClickedSlide(e)))

// Width of slide element
let slideWidth = slide.offsetWidth;
let translateDivisionAmount;
window.onresize = () => {
  slideWidth = slide.offsetWidth;
  checkWindowSize();
  loadSlides();
}
const checkWindowSize = () => {
  // Na 767 i 768 ne radi kad se bas resize...
  if (window.innerWidth <= 767) {
    translateDivisionAmount = 8;
  } else {
    translateDivisionAmount = 2;
  }
}
checkWindowSize();

// As there are copies of all slides to the left and right, we divide number of all by 3, and the middle ones are the ones we are going to see. We get startIndex as below:
const startIndex = slides.length / 3;
const lastIndex = startIndex + startIndex - 1;
let index = startIndex;
let isSliding = false;

let isMoving = false;
let mouseLastPosition = 0;
let diffx;

const sliderMouseDown = (e) => {
  if (!e.target.className.includes(sliderMH.selectors.sliderArrow)) {
    isMoving = true;
    mouseLastPosition = e.pageX;
  }
}

const sliderMouseMove = (e) => {
  if (isMoving) {
    diffx = e.pageX - mouseLastPosition;
    // Transition je samo zezao brzinu pokreta misa kad dragujes...
    sliderInner.style.transition = 'none';
    sliderInner.style.transform = `translateX(${-slideWidth * index + slideWidth / translateDivisionAmount + diffx}px)`;
  }
}

const sliderMouseLeaveOrUp = () => {
  isMoving = false;
  if (diffx >= slideWidth / 2) {
    slideLeft();
  }
  if (diffx <= - (slideWidth / 2)) {
    slideRight();
  }
  if (diffx > - (slideWidth / 2) && diffx < slideWidth / 2 && diffx !== 0) {
    slideFoo();
  }
  diffx = 0;
}

// Set slider to be at the startIndex slide, transition: none so it's not visible to user.
const loadSlides = () => {
  sliderInner.style.transform = `translateX(${-slideWidth * index + slideWidth / translateDivisionAmount}px)`;
  slides[index].classList.add(sliderMH.selectors.currentSlide, sliderMH.selectorsCSS.currentSlide)
}
loadSlides();

// Slide left and right - show slider based on current index
const slideFoo = () => {
  sliderInner.style.transition = '.4s all'
  sliderInner.style.transform = `translateX(${-slideWidth * index + slideWidth / translateDivisionAmount}px)`;
  slides.forEach(slide => slide.classList.remove(sliderMH.selectors.currentSlide, sliderMH.selectorsCSS.currentSlide))
}

// Check slider index - rearange translateX if index is below start or above last
const checkSlideIndex = (e) => {
  // OVO JE BITNO KAO BOG - GLEDAJ POSLE KOG TRANSITIONA ZELIS F-JU, JER IH IMA DOSTA, SVE STO SE DESI UNUTAR ELEMENTA AKTIVIRA OVU ISTU FUNKCIJU!!!
  if (e.propertyName !== 'transform') {
    return;
  }
  if (e.srcElement.className.includes(sliderMH.selectors.sliderInner)) {
    if (index < startIndex) {
      sliderInner.style.transition = 'none';
      index = lastIndex;
      sliderInner.style.transform = `translateX(${-slideWidth * index + slideWidth / translateDivisionAmount}px)`;
    } else if (index > lastIndex) {
      sliderInner.style.transition = 'none';
      index = startIndex;
      sliderInner.style.transform = `translateX(${-slideWidth * index + slideWidth / translateDivisionAmount}px)`;
    }
    isSliding = false;
  }
}

// Expand current slide after the transitions have ended
const expandCurrentSlide = (e) => {
  if (e.propertyName !== 'transform') {
    return;
  }
  if (e.srcElement.className.includes(sliderMH.selectors.sliderInner)) {
    if (index < startIndex) {
      slides[lastIndex].classList.add(sliderMH.selectors.currentSlide, sliderMH.selectorsCSS.currentSlide)
    } else if (index > lastIndex) {
      slides[startIndex].classList.add(sliderMH.selectors.currentSlide, sliderMH.selectorsCSS.currentSlide)
    } else {
      slides[index].classList.add(sliderMH.selectors.currentSlide, sliderMH.selectorsCSS.currentSlide)
    }
  }
}

const slideRight = () => {
  if (!isSliding) {
    isSliding = true;
    index++;
    slideFoo();
  }
}
const slideLeft = () => {
  if (!isSliding) {
    isSliding = true;
    index--;
    slideFoo();
  }
}

// Check which slide is clicked: If current then go to link, if prev or next image clicked, then do next / prev button.
const checkClickedSlide = (e) => {
  const clickedWrapper = e.currentTarget;
  const clickedElement = e.target;
  if (clickedWrapper.className.includes(sliderMH.selectors.currentSlide)) {
    return true;
  }
  e.preventDefault();
  if (clickedElement.tagName === 'IMG') {
    if (clickedWrapper.previousElementSibling.className.includes(sliderMH.selectors.currentSlide)) {
      slideRight();
    }
    if (clickedWrapper.nextElementSibling.className.includes(sliderMH.selectors.currentSlide)) {
      slideLeft();
    }
  }
}