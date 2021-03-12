/* SELECTORS */
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

const allSliders = document.querySelectorAll(`.${sliderMH.selectors.slider}`);

allSliders.forEach((currentSlider, id) => {
  // Kako znaju svi ovi dole da menjaju bas taj diffx npr kad je let i kad ga i jedno i drugo menjaju? Kako js pamti razlicitosti iz ove dve anonimne funkcije? Bas zanimljivo, i korisno.

  /* ELEMENTS */
  // const sliderTemp = {};
  // sliderTemp[id] = currentSlider;
  // const slider = sliderTemp[id];
  const slider = currentSlider;
  const sliderInner = slider.querySelector(`.${sliderMH.selectors.sliderInner}`);
  const slides = slider.querySelectorAll(`.${sliderMH.selectors.slide}`);
  const slide = slider.querySelector(`.${sliderMH.selectors.slide}`)
  const arrowLeft = slider.querySelector(`.${sliderMH.selectors.arrowLeft}`)
  const arrowRight = slider.querySelector(`.${sliderMH.selectors.arrowRight}`)

  // Event Listeners
  if (window.PointerEvent) {
    slider.addEventListener('pointerdown', (e) => sliderMouseDown(e));
    slider.addEventListener('pointermove', (e) => sliderMouseMove(e));
    slider.addEventListener('pointerleave', () => sliderMouseLeaveOrUp())
    // document.addEventListener('pointerup', () => sliderMouseLeaveOrUp())
    slider.addEventListener('pointerup', () => sliderMouseLeaveOrUp())
  } else {
    slider.addEventListener('mousedown', (e) => sliderMouseDown(e));
    slider.addEventListener('mousemove', (e) => sliderMouseMove(e));
    slider.addEventListener('mouseleave', () => sliderMouseLeaveOrUp())
    // document.addEventListener('mouseup', () => sliderMouseLeaveOrUp())
    slider.addEventListener('mouseup', () => sliderMouseLeaveOrUp())

    slider.addEventListener('touchdown', (e) => sliderMouseDown(e));
    slider.addEventListener('touchmove', (e) => sliderMouseMove(e));
    slider.addEventListener('touchleave', () => sliderMouseLeaveOrUp())
    // document.addEventListener('touchup  ', () => sliderMouseLeaveOrUp())
    slider.addEventListener('touchup', () => sliderMouseLeaveOrUp())
  }
  arrowLeft.addEventListener('click', () => slideLeft());
  arrowRight.addEventListener('click', () => slideRight());
  sliderInner.addEventListener('transitionend', (e) => expandCurrentSlide(e));
  sliderInner.addEventListener('transitionend', (e) => checkSlideIndex(e));
  slides.forEach(slide => slide.addEventListener('click', (e) => checkClickedSlide(e)))

  /* VARIABLES */
  // Width of slide element
  let slideWidth = slide.offsetWidth;
  let translateDivisionAmount;
  // As there are copies of all slides to the left and right, we divide number of all by 3, and the middle ones are the ones we are going to see. We get startIndex as below:
  const startIndex = slides.length / 3;
  const lastIndex = startIndex + startIndex - 1;
  let index = startIndex;
  let isSliding = false; //Slide sliding
  let isMoving = false; //Mouse moving
  let mouseLastPosition = 0;
  let diffx = 0;

  // addEventListener umesto onresize, i onda ce normalno da doda na svakom loopu... ali ne znam koliko je dobro imati vise funkcija zakacenih za window...Ovako radi tho.
  window.addEventListener('resize', () => {
    slideWidth = slide.offsetWidth;
    checkWindowSize();
    loadSlides();
  });
  const checkWindowSize = () => {
    // Na 767 i 768 ne radi kad se bas resize...
    if (window.innerWidth <= 767) {
      translateDivisionAmount = 8;
    } else {
      translateDivisionAmount = 2;
    }
  }
  checkWindowSize();

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

  const sliderMouseDown = (e) => {
    // Kad se klikne desni pa levi, on prepozna mouse down, ali ne mouse up. Zato gledaj samo levi klik: levi = 0, mousewheel = 1, desni = 2
    if (!e.target.className.includes(sliderMH.selectors.sliderArrow) && e.button === 0) {
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
    // Proba - ako kliknem samo (btn up i diff 0) a nema current slide, onda samo postavi current slide tu gde je sad index
    // Ovo pomaze kad dodje do tog baga da nastavi da radi na klik! Ali zasto dolazi do baga majku mu...???
    if (diffx === 0 && !slider.querySelector(`.${sliderMH.selectors.currentSlide}`)) {
      console.log(document.querySelector(`.${sliderMH.selectors.currentSlide}`));
      slides[index].classList.add(sliderMH.selectors.currentSlide, sliderMH.selectorsCSS.currentSlide)
    }
    diffx = 0;
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
      // Ovo treba da bude na kraju expand currenta! - ali ni kod njih nije ocigledno pa moze i da ostane...
      isSliding = false;
    }
  }

  // Expand current slide after the transitions have ended
  const expandCurrentSlide = (e) => {
    // 1) --- ILI JE OVDE GRESKA I VRATI GA JER IMA NEKI DRUGI PROPERTYNAME I NE URADI POSLE DA VIDI TRANSFORM I ONDA TO BUDE
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
      } else if (clickedWrapper.nextElementSibling.className.includes(sliderMH.selectors.currentSlide)) {
        slideLeft();
      } else {
        // Ovo jos proveri... ako slucajno nesto zabode i on skloni sve current slide klase i ne postavi novu na kraju transitiona, da uradi opet slide foo. Ne znam da li to resava taj problem koji se desi jednom u sto godina... jer ako stoji u mestu... slide foo iako mu daje transition novi, nece ga pomeriti? jer je vec na tom indexu, znaci na tom translateX i nece se mrdnuti?
        slideFoo();
      }
    }
  }
})

