import React, { useState, useEffect } from 'react'
import './slider.css'

const Slider = ({ data }) => {

  const [slide, setSlide] = useState(0);

  const slideLeft = () => {
    console.log(slide);
    slide <= 0 ? setSlide(data.length - 1) : setSlide(slide - 1)
  }
  const slideRight = () => {
    slide >= data.length - 1 ? setSlide(0) : setSlide(slide + 1)
  }

  // useEffect(() => {
  //   const lastIndex = data.length - 1;
  //   if (slide < 0) {
  //     setSlide(lastIndex);
  //   }
  //   if (slide > lastIndex) {
  //     setSlide(0)
  //   }
  // }, [slide, data])
  // Kako ovde da jedan useEffect ne ode dalje u render dok ne uradi i drugi useEffect? Jer ako je slide -1, ovaj drugi useEffect bi trebalo to da vidi, i odmah ga promeni u data.length - 1, ali on odmah renderuje i izbacuje gresku.

  useEffect(() => {
    let slideTimer = setInterval(() => {
      // setSlide(slide + 1)
      slideRight();
    }, 3000)
    return () => clearInterval(slideTimer)
  }, [slide])


  return (
    <div className="slider">
      <div className="slider__arrow slider__arrow--left" onClick={() => slideLeft()}>◀️</div>
      <div className="slider__arrow slider__arrow--right" onClick={() => slideRight()}>▶️</div>
      <div className="slider__contents">
        <img src={data[slide].url} alt="slider" className="slider__image" />
        <div className="slider__description">
          <h1 className="slider__title">{data[slide].title}</h1>
          <p className="slider__text">{data[slide].text}</p>
        </div>

      </div>
    </div>
  )
}

export default Slider
