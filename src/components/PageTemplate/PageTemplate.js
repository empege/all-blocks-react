import React from 'react'
import './pageTemplate.css'
import Accordion from '../Accordion/Accordion'
import Sidebar from '../Sidebar/Sidebar'
import Modal from '../Modal/Modal'
import Slider from '../Slider/Slider'
import Slidermh from '../Slidermh/Slidermh'
import { pageAccordionData, sliderData, sliderMHData1, sliderMHData2 } from '../../data'

const PageTemplate = () => {
  return (
    <div className="pageTemplate">
      <h1 className="pageTemplate__title">Some Page and Accordion khm... Accordingly</h1>
      <Accordion data={pageAccordionData} theme={'primary'} />
      <Sidebar />
      {/* <Slider data={sliderData} /> */}
      {/* <Modal theme={'dark'} enterStyle={'fadein'} /> */}
      <Slidermh data={sliderMHData1} />
      <div className="small-test" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '100px' }}>
        <Slidermh data={sliderMHData2} />
        <Slidermh data={sliderMHData1} />
      </div>

    </div >
  )
}

export default PageTemplate
