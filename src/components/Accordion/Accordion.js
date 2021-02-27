import React from 'react'
import './accordion.css'
import { useAppContext } from '../../context';

const Accordion = ({ data, theme }) => {

  const { toggleSlideAccordionItem } = useAppContext();

  return (
    <div className={`accordion accordion--theme--${theme}`}>
      {
        data.map(panel => {
          const { id, title, text } = panel;
          return (
            <div className="accordion__item" key={id}>
              <div className="accordion__header" onClick={(e) => toggleSlideAccordionItem(e)}>
                <h1 className="accordion__title">{title}</h1>
                <span className="accordion__icon js-acordion-icon">
                  <i className="fas fa-plus"></i>
                </span>
                <span className="accordion__icon js-acordion-icon display-none">
                  <i className="fas fa-minus"></i>
                </span>
              </div>
              <div className="accordion__content js-accordion-content">
                <p className="accordion__paragraph js-accordion-paragraph">{text}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Accordion
