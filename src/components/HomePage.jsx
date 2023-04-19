import React, { useEffect, useState } from 'react'
import MainDash from './MainDash/MainDash'
import RightSide from './RigtSide/RightSide'
import Sidebar from './Sidebar'
import 'bootstrap/dist/css/bootstrap.css';
import Calendar from './Calendar';
function HomePage() {
const events=[]





  return (
    <div className='HomePage'  >
          <MainDash/>
        {/* <RightSide/> */}
        <Calendar events={events} />

    </div>
  )
}

export default HomePage


