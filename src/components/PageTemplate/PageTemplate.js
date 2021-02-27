import React from 'react'
import './pageTemplate.css'
import Accordion from '../Accordion/Accordion'
import Sidebar from '../Sidebar/Sidebar'
import Modal from '../Modal/Modal'
import Slider from '../Slider/Slider'
import { pageAccordionData, sliderData } from '../../data'

const PageTemplate = () => {
  return (
    <div className="pageTemplate">
      <h1 className="pageTemplate__title">Some Page and Accordion khm... Accordingly</h1>
      <Accordion data={pageAccordionData} theme={'primary'} />
      <Sidebar />
      <Slider data={sliderData} />
      <Modal theme={'dark'} enterStyle={'fadein'} />
    </div>
  )
}

export default PageTemplate
