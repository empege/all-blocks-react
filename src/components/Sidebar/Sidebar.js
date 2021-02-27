import React, { useState } from 'react'
import './sidebar.css'
import Accordion from '../Accordion/Accordion'
import { sidebarAccordionData } from '../../data'

const Sidebar = () => {

  const [isSidebarOn, setIsSidebarOn] = useState(false);

  return (
    <div className={`sidebar ${isSidebarOn && 'sidebar--active'}`}>
      <div className="sidebar__title">
        <h1>Test Sidebar</h1>
        <div className="sidebar__icon sidebar__icon--hide" onClick={() => setIsSidebarOn(false)}><i className="fas fa-minus"></i></div>
        {
          !isSidebarOn && <div className="sidebar__icon sidebar__icon--show" onClick={() => setIsSidebarOn(true)}><i className="fas fa-plus"></i></div>
        }
      </div>
      <Accordion data={sidebarAccordionData} theme={'secondary'} />
    </div>
  )
}

export default Sidebar
