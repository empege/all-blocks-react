import React, { useState, useEffect, useRef } from 'react'
import './slidermh.css'
import arrowRightImg from './arrowright.png';
import arrowLeftImg from './arrowleft.png';
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

const Slidermh = ({ data }) => {

  const sliderData = { ...data };

  const [index, setIndex] = useState('');
  const [slideWidth, setSlideWidth] = useState('');
  const [translateDivisionAmount, setTranslateDivisionAmount] = useState(2);

  const slider = useRef();
  // const slide = slider.document.querySelector(sliderMH.selectors.slide)
  useEffect(() => {
    if (slider.document.querySelector(`.${sliderMH.selectors.slide}`)) {
      setSlideWidth(slider.document.querySelector(sliderMH.selectors.slide))
      console.log(slideWidth);
    }
  }, [slider])

  /* VARIABLES */
  // Width of slide element
  // setSlideWidth(slide.offsetWidth);
  // // As there are copies of all slides to the left and right, we divide number of all by 3, and the middle ones are the ones we are going to see. We get startIndex as below:
  // const startIndex = slides.length / 3;
  // const lastIndex = startIndex + startIndex - 1;
  // setIndex(startIndex);
  // let isSliding = false; //Slide sliding
  // let isMoving = false; //Mouse moving
  // let mouseLastPosition = 0;
  // let diffx = 0;


  // /* ELEMENTS */
  // const sliderInner = slider.querySelector(`.${sliderMH.selectors.sliderInner}`);
  // const slides = slider.querySelectorAll(`.${sliderMH.selectors.slide}`);
  // const arrowLeft = slider.querySelector(`.${sliderMH.selectors.arrowLeft}`)
  // const arrowRight = slider.querySelector(`.${sliderMH.selectors.arrowRight}`)

  // // Event Listeners
  // if (window.PointerEvent) {
  //   slider.addEventListener('pointerdown', (e) => sliderMouseDown(e));
  //   slider.addEventListener('pointermove', (e) => sliderMouseMove(e));
  //   slider.addEventListener('pointerleave', () => sliderMouseLeaveOrUp())
  //   slider.addEventListener('pointerup', () => sliderMouseLeaveOrUp())
  // } else {
  //   slider.addEventListener('mousedown', (e) => sliderMouseDown(e));
  //   slider.addEventListener('mousemove', (e) => sliderMouseMove(e));
  //   slider.addEventListener('mouseleave', () => sliderMouseLeaveOrUp())
  //   slider.addEventListener('mouseup', () => sliderMouseLeaveOrUp())

  //   slider.addEventListener('touchdown', (e) => sliderMouseDown(e));
  //   slider.addEventListener('touchmove', (e) => sliderMouseMove(e));
  //   slider.addEventListener('touchleave', () => sliderMouseLeaveOrUp())
  //   slider.addEventListener('touchup', () => sliderMouseLeaveOrUp())
  // }
  // arrowLeft.addEventListener('click', () => slideLeft());
  // arrowRight.addEventListener('click', () => slideRight());
  // sliderInner.addEventListener('transitionend', (e) => expandCurrentSlide(e));
  // sliderInner.addEventListener('transitionend', (e) => checkSlideIndex(e));
  // slides.forEach(slide => slide.addEventListener('click', (e) => checkClickedSlide(e)))

  // window.addEventListener('resize', () => {
  //   slideWidth = slide.offsetWidth;
  //   checkWindowSize();
  //   loadSlides();
  // });
  // const checkWindowSize = () => {
  //   if (window.innerWidth <= 767) {
  //     translateDivisionAmount = 8;
  //   } else {
  //     translateDivisionAmount = 2;
  //   }
  // }
  // checkWindowSize();

  // // Set slider to be at the startIndex slide, transition: none so it's not visible to user.
  // const loadSlides = () => {
  //   sliderInner.style.transform = `translateX(${-slideWidth * index + slideWidth / translateDivisionAmount}px)`;
  //   slides[index].classList.add(sliderMH.selectors.currentSlide, sliderMH.selectorsCSS.currentSlide)
  // }
  // loadSlides();

  // // Slide left and right - show slider based on current index
  // const slideFoo = () => {
  //   sliderInner.style.transition = '.4s all'
  //   sliderInner.style.transform = `translateX(${-slideWidth * index + slideWidth / translateDivisionAmount}px)`;
  //   slides.forEach(slide => slide.classList.remove(sliderMH.selectors.currentSlide, sliderMH.selectorsCSS.currentSlide))
  // }

  // const sliderMouseDown = (e) => {
  //   if (!e.target.className.includes(sliderMH.selectors.sliderArrow) && e.button === 0) {
  //     isMoving = true;
  //     mouseLastPosition = e.pageX;
  //   }
  // }

  // const sliderMouseMove = (e) => {
  //   if (isMoving) {
  //     diffx = e.pageX - mouseLastPosition;
  //     sliderInner.style.transition = 'none';
  //     sliderInner.style.transform = `translateX(${-slideWidth * index + slideWidth / translateDivisionAmount + diffx}px)`;
  //   }
  // }

  // const sliderMouseLeaveOrUp = () => {
  //   isMoving = false;
  //   if (diffx >= slideWidth / 2) {
  //     slideLeft();
  //   }
  //   if (diffx <= - (slideWidth / 2)) {
  //     slideRight();
  //   }
  //   if (diffx > - (slideWidth / 2) && diffx < slideWidth / 2 && diffx !== 0) {
  //     slideFoo();
  //   }
  //   if (diffx === 0 && !slider.querySelector(`.${sliderMH.selectors.currentSlide}`)) {
  //     console.log(document.querySelector(`.${sliderMH.selectors.currentSlide}`));
  //     slides[index].classList.add(sliderMH.selectors.currentSlide, sliderMH.selectorsCSS.currentSlide)
  //   }
  //   diffx = 0;
  // }

  // // Check slider index - rearange translateX if index is below start or above last
  // const checkSlideIndex = (e) => {
  //   if (e.propertyName !== 'transform') {
  //     return;
  //   }
  //   if (e.srcElement.className.includes(sliderMH.selectors.sliderInner)) {
  //     if (index < startIndex) {
  //       sliderInner.style.transition = 'none';
  //       index = lastIndex;
  //       sliderInner.style.transform = `translateX(${-slideWidth * index + slideWidth / translateDivisionAmount}px)`;
  //     } else if (index > lastIndex) {
  //       sliderInner.style.transition = 'none';
  //       index = startIndex;
  //       sliderInner.style.transform = `translateX(${-slideWidth * index + slideWidth / translateDivisionAmount}px)`;
  //     }
  //     isSliding = false;
  //   }
  // }

  // // Expand current slide after the transitions have ended
  // const expandCurrentSlide = (e) => {
  //   if (e.propertyName !== 'transform') {
  //     return;
  //   }
  //   if (e.srcElement.className.includes(sliderMH.selectors.sliderInner)) {
  //     if (index < startIndex) {
  //       slides[lastIndex].classList.add(sliderMH.selectors.currentSlide, sliderMH.selectorsCSS.currentSlide)
  //     } else if (index > lastIndex) {
  //       slides[startIndex].classList.add(sliderMH.selectors.currentSlide, sliderMH.selectorsCSS.currentSlide)
  //     } else {
  //       slides[index].classList.add(sliderMH.selectors.currentSlide, sliderMH.selectorsCSS.currentSlide)
  //     }
  //   }
  // }

  // const slideRight = () => {
  //   if (!isSliding) {
  //     isSliding = true;
  //     index++;
  //     slideFoo();
  //   }
  // }
  // const slideLeft = () => {
  //   if (!isSliding) {
  //     isSliding = true;
  //     index--;
  //     slideFoo();
  //   }
  // }

  // // Check which slide is clicked: If current then go to link, if prev or next image clicked, then do next / prev button.
  // const checkClickedSlide = (e) => {
  //   const clickedWrapper = e.currentTarget;
  //   const clickedElement = e.target;
  //   if (clickedWrapper.className.includes(sliderMH.selectors.currentSlide)) {
  //     return true;
  //   }
  //   e.preventDefault();
  //   if (clickedElement.tagName === 'IMG') {
  //     if (clickedWrapper.previousElementSibling.className.includes(sliderMH.selectors.currentSlide)) {
  //       slideRight();
  //     } else if (clickedWrapper.nextElementSibling.className.includes(sliderMH.selectors.currentSlide)) {
  //       slideLeft();
  //     } else {
  //       slideFoo();
  //     }
  //   }
  // }






  return (
    <section ref={slider} className="slider js-slider" key={sliderData.id}>
      <button className="slider__arrow slider__arrow--left js-arrow-left
    "><img src={arrowLeftImg} alt="arrow-left" className="js-slide-arrow" /> </button>
      <button className="slider__arrow slider__arrow--right js-arrow-right"> <img src={arrowRightImg} alt="arrow-right" className="js-slide-arrow" /> </button>
      <div className="slider__inner js-slider-inner">
        {
          sliderData.data.map((slide, id) => {
            return (
              <a key={id} draggable="false" className="slider__slide js-slide" target="_blanc" href={slide.url}>
                <img draggable="false" className="slider__image" src={slide.img} alt="slide" />
                <div className="slider__content">
                  <h3 className="slider__title">{slide.title}</h3>
                  <p className="slider__description">{slide.text}</p>
                  <div className="slider__action-btn">
                    <span className="read-more">Read More</span>
                  </div>
                </div>
              </a>

            )
          })
        }

      </div>
    </section >
  )
}

export default Slidermh
