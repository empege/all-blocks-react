import React from 'react'

const sliderMHData1 = [
  {
    title: 'Filter technology in detail',
    text: 'Our filters separate the useful from the harmful. But what is the definition of harmful? And who decides that? In order to find the right solutions, we selectively use all of our system expertise. And we are happy to offer you some insights into how filter technology works in detail in different applications.',
    url: 'https://www.mann-hummel.com/en/research-and-development/filter-technology-in-detail/',
    img: 'https://www.mann-hummel.com/fileadmin/_processed_/4/1/csm_filtertechnik_buehnenbilder_fdf3a1ecf3.jpg',
  },
  {
    title: 'Credentials',
    text: 'For individual large-scale orders or series production, MANN+HUMMEL guarantees the highest quality for the best price. In this way we are able to convince customers in many different sectors that we are the right partner for them. Our references speak for themselves.',
    url: 'https://www.mann-hummel.com/en/the-company/credentials/',
    img: 'https://www.mann-hummel.com/fileadmin/_processed_/6/8/csm_Referenzen_buehnenbild_01_847bdb81ca.jpg',
  },
  {
    title: 'Innovations and creativity',
    text: 'Particulate filter in a motorcycle helmet? Fine dust eater? Bionic filter? – MANN+HUMMEL is using its creativity and ability to take a broader view to develop solutions to meet the challenges of the future. Here we like to take inspiration from nature.',
    url: 'https://www.mann-hummel.com/en/research-and-development/innovations-and-creativity/',
    img: 'https://www.mann-hummel.com/fileadmin/_processed_/0/8/csm_innovation_kreativitaet_buehnenbild_05de1dafc3.jpg',
  },
  {
    title: 'Future trends',
    text: 'The Internet of Things Lab in Singapore, pilot projects against microplastics in water and field tests for electro-mobility are just some of the areas where we are conducting research to help shape the innovations of the future. As filtration experts the demand for our expertise has been greater than ever.',
    url: 'https://www.mann-hummel.com/en/research-and-development/future-trends/',
    img: 'https://www.mann-hummel.com/fileadmin/_processed_/4/8/csm_shaker_teaser_34d75fd1df.jpg',
  },
];

const Slidermh = () => {







  return (
    <section className="slider js-slider" key={id}>
      <button className="slider__arrow slider__arrow--left js-arrow-left
    "><img src="../sliderMH/arrowleft.png" alt="arrow-left" className="js-slide-arrow" /> </button>
      <button className="slider__arrow slider__arrow--right js-arrow-right"> <img src="../sliderMH/arrowright.png" alt="arrow-right" className="js-slide-arrow" /> </button>
      <div className="slider__inner js-slider-inner">
        {

        }
        <a key={id} draggable="false" className="slider__slide js-slide" target="_blanc" href={url}>
          <img draggable="false" className="slider__image" src={img} alt="slide-image" />
          <div className="slider__content">
            <h3 className="slider__title">{title}</h3>
            <p className="slider__description">{text}</p>
            <div className="slider__action-btn">
              <span className="read-more">Read More</span>
            </div>
          </div>
        </a>

      </div>
    </section >
  )
}

export default Slidermh
