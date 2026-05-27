import './App.css'
import React, { useState, useEffect } from 'react'
import { GridView } from './ForwardLooking/Grid/Grid';
import { NewHeader } from './Header/Header';
import { CompareView } from './ForwardLooking/Compare/Compare';
import { Thresholds } from './ForwardLooking/Compare/thresholds';
import { EventTracking } from './Realtime/EventTracking';
import { About } from './Articles/About';
import { type DateRange } from "react-day-picker"
import { DataMethodology } from './Articles/DataMethodology';


type JsonShape = {
  features: Array<{
    properties: {
      GID_0: string,
      GID_1: string,
      COUNTRY: string,
      NAME_1: string
    }
  }>
};

function App() {

  const base = import.meta.env.VITE_BASE;

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
  })

  let [geoJson, setGeoJson] = React.useState<JsonShape | any>(null);

  useEffect(() => {
    const getGeoJson = async () => {
      console.log(base);
      var getData = await fetch(`${base}/GADM_ADMIN1.json`);
      geoJson = await getData.json();
      setGeoJson(geoJson);
    }
    getGeoJson();
  }, []);

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
        setDateRange: setDateRange
      }} />   
      {(() => {
        switch (currentView) {
          case 'About':
            return <About />
          case 'DataMethodology':
            return <DataMethodology />
          case 'Event tracking':
            return <EventTracking props={{
          dateRange: dateRange,
          setDateRange: setDateRange
        }} />
          case 'Grid':
            return <GridView currentTime={currentTime} currentHazard={currentHazard} currentExposure={currentExposure} currentScenario={currentScenario} />
          case 'Compare':
            return <div>
          <div className="bg-[#1E1E1E] w-full h-full flex justify-center pb-15">
            <div className="w-9/10 h-full dark flex flex-col 2xl:flex-row gap-x-5 pt-18">
              <CompareView props={{
                currentTime,
                currentScenario,
                geoJson,
                currentExposure,
                currentHazard,
                currentMeasure,
                currentThreshold,
                setScenario,
                setThreshold
              }} />
            </div>
          </div>
          <Thresholds props={{
            currentHazard,
            currentExposure,
            currentThreshold,
            currentMeasure,
            setThreshold,
            setMeasure
          }} />
        </div>
        }
      })()}
   
    </div>

  )
}

export default App
