import React, { useState, useContext, useReducer, useEffect } from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const toggleSlideAccordionItem = (accordionItemHeader, accordionContentRef, accordionParagraphRef) => {
    const header = accordionItemHeader;
    const content = accordionContentRef;
    const paragraph = accordionParagraphRef;
    const paragraphHeight = paragraph.offsetHeight;
    if ([...header.classList].includes('accordion__header--active')) {
      header.classList.remove('accordion__header--active');
      content.style.maxHeight = 0;
    } else {
      header.classList.add('accordion__header--active');
      content.style.maxHeight = `${paragraphHeight + 40}px`;
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