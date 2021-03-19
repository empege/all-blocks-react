import React, { useState, useRef } from 'react';
import { useAppContext } from '../../context';

const AccordionItem = ({ title, text }) => {

  const { toggleSlideAccordionItem } = useAppContext();

  const [accordionItemIcon, setAccordionItemIcon] = useState(true);

  const accordionContentRef = useRef(null);
  const accordionParagraphRef = useRef(null);

  const handleAccordionItemClick = (e) => {
    toggleSlideAccordionItem(e.currentTarget, accordionContentRef.current, accordionParagraphRef.current);
    setAccordionItemIcon(!accordionItemIcon);
  }

  return (
    <div className="accordion__item">
      <div className="accordion__header" onClick={handleAccordionItemClick}>
        <h1 className="accordion__title">{title}</h1>
        <span className="accordion__icon">
          <i className={accordionItemIcon ? `fas fa-plus` : `fas fa-minus`}></i>
        </span>
      </div>
      <div className="accordion__content js-accordion-content" ref={accordionContentRef}>
        <p ref={accordionParagraphRef} className="accordion__paragraph js-accordion-paragraph">{text}</p>
      </div>
    </div>
  )
}

export default AccordionItem
