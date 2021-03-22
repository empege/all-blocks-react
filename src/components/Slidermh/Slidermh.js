import React, { useState, useEffect, useRef } from 'react'
import './slidermh.css'
import arrowRightImg from './arrowright.png';
import arrowLeftImg from './arrowleft.png';
import Slidemh from './Slidemh'
import { componentsData } from '../../data';
import { useWindowSize, usePreviousValue } from '../CustomHooks'

/* SELECTORS */
const sliderMH = componentsData.sliderMH;

const Slidermh = ({ data }) => {
  const originalSlidesArray = data;
  // Triple it for slide effect so prev and next slides are visible and can slide in
  const slidesArray = originalSlidesArray.concat(originalSlidesArray, originalSlidesArray);

  const startIndex = slidesArray.length / 3
  const lastIndex = startIndex + startIndex - 1;

  const [index, setIndex] = useState(startIndex);
  const [slideWidth, setSlideWidth] = useState('');
  // Sta ovde mora da bude state, sta ne mora... mislim radi ovako, ali sta ima smisla?
  const [translateDivisionAmount, setTranslateDivisionAmount] = useState(2);
  // Ako se deli sa 2, current slide zauzima 50% u sredini, a ova dva sa strane 25%, a sa 1.25, current zauzima 80%, a ovi po 10%
  const slideWidthDivisionLarge = 2;
  const slideWidthDivisionSmall = 1.25;

  const slider = useRef();
  const sliderInner = useRef();
  // Da li nekako moze lista svih elemenata da bude useRef ili je ovako ok?
  const [slides, setSlides] = useState(null);

  // Custom hook to get window width and height
  const [width, height] = useWindowSize();

  // Use previous index custom hook
  const prevIndex = usePreviousValue(index);

  // Nadji svu deci od sliderInner (to su sve slidovi) - radi jer ih vidi tek posle rendera uvek useEffect - dakle ne moram da proveravam da li se nesto ucitalo, use ref je sigurno ucitam jer se desava pre useEffecta
  useEffect(() => {
    setSlides(Array.from(sliderInner.current.children))
  }, [])

  // Kad se dobije tek ga stavi, i menjaj na resize posle uvek
  // Koji ono bese hook da izbegnem ovaj eslint problem - nisam umeo sa useCallback... druga logika?
  useEffect(() => {
    if (slideWidth) {
      loadSlider()
    }
  }, [slideWidth])

  useEffect(() => {
    onWindowResize();
  }, [width, height])

  const onWindowResize = () => {
    if (window.innerWidth <= 767) {
      setSlideWidth(slider.current.offsetWidth / slideWidthDivisionSmall)
      setTranslateDivisionAmount(8);
    } else {
      setSlideWidth(slider.current.offsetWidth / slideWidthDivisionLarge)
      setTranslateDivisionAmount(2);
    }
  }

  const loadSlider = () => {
    console.log(index);
    sliderInner.current.style.transform = `translateX(${-slideWidth * index + slideWidth / translateDivisionAmount}px)`;
    slides[index].classList.add(sliderMH.selectorsCSS.currentSlide)
  }

  const [isSliding, setIsSliding] = useState(false); //Slide sliding
  // Da li je okej koristiti let ovde? Ne znam da se ista rerenderuje, samo da ne moze da klikne dok se animacija ne zavrsi?
  let isMoving = false; //Mouse moving

  useEffect(() => {
    // If instant translateX is happening, don't do slideFoo (it would be ran twice that way)
    if (!((index === lastIndex && prevIndex === startIndex - 1) || (index === startIndex && prevIndex === lastIndex + 1)) && sliderInner.current) {
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
    if (slides) {
      sliderInner.current.style.transition = '.4s all'
      sliderInner.current.style.transform = `translateX(${-slideWidth * index + slideWidth / translateDivisionAmount}px)`;
      slides.forEach(slide => slide.classList.remove(sliderMH.selectorsCSS.currentSlide))
    }
  }

  // Expand current slide after the transitions have ended
  const expandCurrentSlide = (e) => {
    if (e.propertyName !== 'transform') {
      return;
    }
    if (e.target.className.includes(sliderMH.selectors.sliderInner)) {
      if (index < startIndex) {
        slides[lastIndex].classList.add(sliderMH.selectorsCSS.currentSlide)
      } else if (index > lastIndex) {
        slides[startIndex].classList.add(sliderMH.selectorsCSS.currentSlide)
      } else {
        slides[index].classList.add(sliderMH.selectorsCSS.currentSlide)
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
        sliderInner.current.style.transition = 'none';
        setIndex(lastIndex);
        sliderInner.current.style.transform = `translateX(${-slideWidth * lastIndex + slideWidth / translateDivisionAmount}px)`;
      } else if (index > lastIndex) {
        sliderInner.current.style.transition = 'none';
        setIndex(startIndex);
        sliderInner.current.style.transform = `translateX(${-slideWidth * startIndex + slideWidth / translateDivisionAmount}px)`;
      }
      setIsSliding(false);
    }
  }

  // Isto pitanje, ako ne zelim rerender da li je let ok u reactu? Ili mi je cela logika uzas? x(
  let mouseLastPosition = 0;
  let diffX = 0;

  const sliderMouseDown = (e) => {
    if (!e.target.className.includes(sliderMH.selectors.sliderArrow) && e.button === 0) {
      isMoving = true;
      mouseLastPosition = e.pageX;
    }
  }

  const sliderMouseMove = (e) => {
    if (isMoving) {
      diffX = e.pageX - mouseLastPosition;
      sliderInner.current.style.transition = 'none';
      sliderInner.current.style.transform = `translateX(${-slideWidth * index + slideWidth / translateDivisionAmount + diffX}px)`;
    }
  }

  const sliderMouseLeaveOrUp = () => {
    isMoving = false;
    if (diffX >= slideWidth / 2) {
      slideLeft();
    }
    if (diffX <= - (slideWidth / 2)) {
      slideRight();
    }
    if (diffX > - (slideWidth / 2) && diffX < slideWidth / 2 && diffX !== 0) {
      slideFoo();
    }
    if (diffX === 0 && !slider.current.querySelector(`.${sliderMH.selectors.currentSlide}`)) {
      slides[index].classList.add(sliderMH.selectorsCSS.currentSlide)
    }
    diffX = 0;
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

      <div ref={sliderInner} onTransitionEnd={(e) => { checkSlideIndex(e); expandCurrentSlide(e); }} className="slider__inner js-slider-inner">
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
