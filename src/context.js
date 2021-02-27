import React, { useState, useContext, useReducer, useEffect } from 'react'
import { componentsData } from './data';

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const accordion = componentsData.accordion;

  const toggleSlideAccordionItem = (e) => {
    const accordionItem = e.currentTarget.parentElement;
    const header = e.currentTarget;
    const content = accordionItem.querySelector(accordion.selectors.content);
    const paragraph = content.querySelector(accordion.selectors.paragraph);
    const paragraphHeight = paragraph.offsetHeight;
    const icons = accordionItem.querySelectorAll(accordion.selectors.icon);
    if ([...header.classList].includes('accordion__header--active')) {
      header.classList.remove('accordion__header--active');
      content.style.maxHeight = 0;
      icons[0].classList.add('display-none')
      icons[1].classList.remove('display-none')
    } else {
      header.classList.add('accordion__header--active');
      content.style.maxHeight = `${paragraphHeight + 40}px`;
      icons[0].classList.remove('display-none')
      icons[1].classList.add('display-none')
    }
  }

  return (
    <AppContext.Provider value={{
      toggleSlideAccordionItem,
      // removeAll,
    }}>
      {children}
    </AppContext.Provider>
  )

}

// make sure use
export const useAppContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }