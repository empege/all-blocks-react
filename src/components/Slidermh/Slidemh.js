import React, { useRef } from 'react'
import { componentsData } from '../../data';
const sliderMH = componentsData.sliderMH;

const Slidemh = ({ id, url, img, title, text, index, slideLeft, slideRight, slideFoo }) => {

  const slide = useRef();

  // Check which slide is clicked: If current then go to link, if prev or next image clicked, then do next / prev button.
  const checkClickedSlide = (e, id) => {
    const clickedWrapper = e.currentTarget;
    const clickedElement = e.target;
    if (clickedWrapper.className.includes(sliderMH.selectors.currentSlide)) {
      return true;
    }
    e.preventDefault();
    if (clickedElement.tagName === 'IMG') {
      if (id === index + 1) {
        slideRight();
      } else if (id === index - 1) {
        slideLeft();
      } else {
        slideFoo();
      }
    }
  }

  return (
    <a ref={slide} onClick={(e) => checkClickedSlide(e, id)} id={id} draggable="false" className="slider__slide js-slide" target="_blanc" href={url}>
      <img draggable="false" className="slider__image" src={img} alt="slide" />
      <div className="slider__content">
        <h3 className="slider__title">{title}</h3>
        <p className="slider__description">{text}&zwnj;</p>
        <div className="slider__action-btn">
          <span className="read-more">Read More</span>
        </div>
      </div>
    </a>
  )
}

export default Slidemh
