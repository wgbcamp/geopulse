import './App.css'
import React, { useState, useEffect, useContext } from 'react'
import { GridView } from './ForwardLooking/Grid/Grid'
import { NewHeader } from './Header/Header'
import { CompareView } from './ForwardLooking/Compare/Compare'
import { Thresholds } from './ForwardLooking/Compare/thresholds'
import { EventTracking } from './Realtime/EventTracking'
import { About } from './Articles/About'
import { type DateRange } from "react-day-picker"
import { DataMethodology } from './Articles/DataMethodology'
import { RoutingContext } from '../context/Routing';

function App() {
  
  const page = useContext(RoutingContext);

  const [currentView, setView] = useState("Event tracking");
  const [currentTime, setTime] = useState<number>(1980);
  const [currentScenario, setScenario] = useState<string>("rcp4p5");
  const [currentHazard, setHazard] = useState<string>("Coastal Flooding");
  const [currentExposure, setExposure] = useState<string>("Population");
  const [currentMeasure, setMeasure] = useState<{ name: string, id: string }>({ name: "Flood Level", id: "CF_PW_EXP" });
  const [currentThreshold, setThreshold] = useState<{ name: string, threshold: any }>({ name: "", threshold: "rp0005" });
  const today = new Date;
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()),
    to: (new Date)
  });
  const [eventFilter, setEventFilter] = useState<string>("All Events");

  const pagesMapping: any = {
    "/about": <About />,
    "/datamethodology": <DataMethodology />,
    "/eventtracking": <EventTracking props={{
      dateRange: dateRange,
      setDateRange: setDateRange,
      eventFilter: eventFilter,
    }} />,
    "/compare": <CompareView props={{
      currentTime,
      currentScenario,
      currentExposure,
      currentHazard,
      currentMeasure,
      currentThreshold,
      setScenario,
      setThreshold
    }} />,
    "/grid": <GridView currentTime={currentTime} currentHazard={currentHazard} currentExposure={currentExposure} currentScenario={currentScenario} />,
    "/": <EventTracking props={{
      dateRange: dateRange,
      setDateRange: setDateRange,
      eventFilter: eventFilter,
    }} />
  };

  return (
    <div className='h-full'>
      <NewHeader props={{
        currentTime,
        setTime,
        currentView,
        setView,
        currentScenario,
        setScenario,
        currentHazard,
        setHazard,
        currentExposure,
        setExposure,
        currentMeasure,
        setMeasure,
        setThreshold,
        dateRange: dateRange,
        setDateRange: setDateRange,
        eventFilter: eventFilter,
        setEventFilter: setEventFilter,
      }} />
      {pagesMapping[page.pageStatus]}
    </div>
  )
}

export default App
