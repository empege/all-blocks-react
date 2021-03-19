import React from 'react'
import './accordion.css'
import AccordionItem from './AccordionItem';

const Accordion = ({ data, theme }) => {

  return (
    <div className={`accordion accordion--theme--${theme}`}>
      {
        data.map(panel => <AccordionItem key={panel.id} {...panel} />)
      }
    </div>
  )
}

export default Accordion
