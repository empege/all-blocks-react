import React, { useState, useEffect, useRef } from 'react'
import './slidermh.css'
import arrowRightImg from './arrowright.png';
import arrowLeftImg from './arrowleft.png';
import Slidemh from './Slidemh'
import { componentsData } from '../../data';

/* SELECTORS */
const sliderMH = componentsData.sliderMH;

const Slidermh = ({ data }) => {
  const originalSlidesArray = data;
  const slidesArray = originalSlidesArray.concat(originalSlidesArray, originalSlidesArray);

  const startIndex = slidesArray.length / 3
  const lastIndex = startIndex + startIndex - 1;

  const [index, setIndex] = useState(startIndex);
  const [slideWidth, setSlideWidth] = useState('');
  const [translateDivisionAmount, setTranslateDivisionAmount] = useState(2);

  const slider = useRef();
  const [sliderInner, setSliderInner] = useState(null);
  const [slides, setSlides] = useState(null);
  const [slide, setSlide] = useState(null);

  // Custom hook to get window width and height
  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
    useEffect(() => {
      const handleResize = () => {
        setWindowSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize)
    }, [])
    return windowSize;
  }
  // Zasto ovo radi ja ne znam :P iako se jednom samo pozvalo...
  const [width, height] = useWindowSize();

  // Use previous index custom hook
  const usePreviousValue = (value) => {
    const ref = useRef();

    useEffect(() => {
      ref.current = value
    }, [value])

    return ref.current;
  }
  const prevIndex = usePreviousValue(index);

  // Slider se update kad se sve izlista, zato treba u dependency, jer prvo ne moze da ga nadje
  useEffect(() => {
    if (slider.current) {
      setSlide(slider.current.querySelector(`.${sliderMH.selectors.slide}`))
      setSlides(slider.current.querySelectorAll(`.${sliderMH.selectors.slide}`))
      setSliderInner(slider.current.querySelector(`.${sliderMH.selectors.sliderInner}`))
      setSlideWidth(slider.current.offsetWidth / 2)
    }
  }, [slider])

  // Cim se update slider, dobijamo slide, dakle ovde i njegov width za dalje
  useEffect(() => {
    if (slide) {
      loadSlider()
    }
  }, [slide])

  // Koji ono bese hook da izbegnem ovaj eslint problem
  useEffect(() => {
    onWindowResize();
  }, [width, height])

  const onWindowResize = () => {
    console.log(width, translateDivisionAmount, slideWidth, index);
    if (slide) {
      setSlideWidth(slider.current.offsetWidth / 2)
    }
    if (window.innerWidth <= 767) {
      setTranslateDivisionAmount(8);
    } else {
      setTranslateDivisionAmount(2);
    }
    loadSlider();
  }

  // Set slider to be at the startIndex slide, transition: none so it's not visible to user.
  const loadSlider = () => {
    if (slider.current && sliderInner && slides && index) {
      // console.log(slideWidth, translateDivisionAmount);
      sliderInner.style.transform = `translateX(${-slideWidth * index + slideWidth / translateDivisionAmount}px)`;
      slides[index].classList.add(sliderMH.selectors.currentSlide, sliderMH.selectorsCSS.currentSlide)
    }
  }

  const [isSliding, setIsSliding] = useState(false); //Slide sliding
  let isMoving = false; //Mouse moving

  useEffect(() => {
    if ((index === lastIndex && prevIndex === startIndex - 1) || (index === startIndex && prevIndex === lastIndex + 1)) {
      // Do nothing
    } else if (sliderInner) {
      slideFoo();
    }
  }, [index])

  const slideRight = () => {
    if (!isSliding) {
      setIsSliding(true)
      setIndex(index + 1);
    }
  }
  const slideLeft = () => {
    if (!isSliding) {
      setIsSliding(true)
      setIndex((prev) => index - 1);
    }
  }

  // Slide left and right - show slider based on current index
  const slideFoo = () => {
    sliderInner.style.transition = '.4s all'
    sliderInner.style.transform = `translateX(${-slideWidth * index + slideWidth / translateDivisionAmount}px)`;
    slides.forEach(slide => slide.classList.remove(sliderMH.selectors.currentSlide, sliderMH.selectorsCSS.currentSlide))
  }

  // Expand current slide after the transitions have ended
  const expandCurrentSlide = (e) => {
    if (e.propertyName !== 'transform') {
      return;
    }
    if (e.target.className.includes(sliderMH.selectors.sliderInner)) {
      if (index < startIndex) {
        slides[lastIndex].classList.add(sliderMH.selectors.currentSlide, sliderMH.selectorsCSS.currentSlide)
      } else if (index > lastIndex) {
        slides[startIndex].classList.add(sliderMH.selectors.currentSlide, sliderMH.selectorsCSS.currentSlide)
      } else {
        slides[index].classList.add(sliderMH.selectors.currentSlide, sliderMH.selectorsCSS.currentSlide)
      }
    }
  }

  // Check slider index - rearange translateX if index is below start or above last
  const checkSlideIndex = (e) => {
    if (e.propertyName !== 'transform') {
      return;
    }
    if (e.target.className.includes(sliderMH.selectors.sliderInner)) {
      if (index < startIndex) {
        sliderInner.style.transition = 'none';
        setIndex(lastIndex);
        sliderInner.style.transform = `translateX(${-slideWidth * lastIndex + slideWidth / translateDivisionAmount}px)`;
      } else if (index > lastIndex) {
        sliderInner.style.transition = 'none';
        setIndex(startIndex);
        sliderInner.style.transform = `translateX(${-slideWidth * startIndex + slideWidth / translateDivisionAmount}px)`;
      }
      setIsSliding(false);
    }
  }


  isMoving = false;
  let mouseLastPosition = 0;
  let diffx = 0;

  const sliderMouseDown = (e) => {
    if (!e.target.className.includes(sliderMH.selectors.sliderArrow) && e.button === 0) {
      isMoving = true;
      mouseLastPosition = e.pageX;
    }
  }

  const sliderMouseMove = (e) => {
    if (isMoving) {
      diffx = e.pageX - mouseLastPosition;
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
    if (diffx === 0 && !slider.current.querySelector(`.${sliderMH.selectors.currentSlide}`)) {
      slides[index].classList.add(sliderMH.selectors.currentSlide, sliderMH.selectorsCSS.currentSlide)
    }
    diffx = 0;
  }

  // if (window.PointerEvent) {
  return (
    <section
      onPointerDown={sliderMouseDown}
      onPointerMove={sliderMouseMove}
      onPointerLeave={sliderMouseLeaveOrUp}
      onPointerUp={sliderMouseLeaveOrUp}
      ref={slider}
      className="slider js-slider"
    >
      <button onClick={() => slideLeft()} className="slider__arrow slider__arrow--left js-arrow-left
      ">
        <img src={arrowLeftImg} alt="arrow-left" className="js-slide-arrow" />
      </button>

      <button onClick={() => slideRight()} className="slider__arrow slider__arrow--right js-arrow-right">
        <img src={arrowRightImg} alt="arrow-right" className="js-slide-arrow" />
      </button>

      <div onTransitionEnd={(e) => { checkSlideIndex(e); expandCurrentSlide(e); }} className="slider__inner js-slider-inner">
        {
          slidesArray.map((slide, id) =>
            <Slidemh key={id} {...slide} id={id} index={index} slideLeft={slideLeft} slideRight={slideRight} slideFoo={slideFoo} />
          )
        }
      </div>
    </section >
  )
  // };

  // return (
  //   <section
  //     onMouseDown={sliderMouseDown}
  //     onMouseMove={sliderMouseMove}
  //     onMouseLeave={sliderMouseLeaveOrUp}
  //     onMouseUp={sliderMouseLeaveOrUp}
  //     onTouchDown={sliderMouseDown}
  //     onTouchMove={sliderMouseMove}
  //     onTouchLeave={sliderMouseLeaveOrUp}
  //     onTouchUp={sliderMouseLeaveOrUp}
  //     ref={slider}
  //     className="slider js-slider"
  //   >
  //     <button onClick={() => slideLeft()} className="slider__arrow slider__arrow--left js-arrow-left
  //   "><img src={arrowLeftImg} alt="arrow-left" className="js-slide-arrow" /> </button>
  //     <button onClick={() => slideRight()} className="slider__arrow slider__arrow--right js-arrow-right"> <img src={arrowRightImg} alt="arrow-right" className="js-slide-arrow" /> </button>
  //     <div onTransitionEnd={(e) => { checkSlideIndex(e); expandCurrentSlide(e); }} className="slider__inner js-slider-inner">
  //       {
  //         [1, 2, 3].map(el => {
  //           return (
  //             slidesArray.map((slide, id) => {
  //               const { url, img, title, text } = slide;
  //               return (
  //                 <a > title
  //                 </a>

  //               )
  //             })
  //           )
  //         })
  //       }

  //     </div>
  //   </section >
  // )
}

export default Slidermh
