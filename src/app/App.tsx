import './App.css'
import React, { useState, useEffect } from 'react'
import { GridView } from './ForwardLooking/Grid/Grid';
import { NewHeader } from './Header/Header';
import { CompareView } from './ForwardLooking/Compare/Compare';
import { Thresholds } from './ForwardLooking/Compare/thresholds';
import { EventTracking } from './Realtime/EventTracking';

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
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date);

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
        startDate,
        setStartDate,
        endDate,
        setEndDate
      }} />

      {currentView == "Grid"
        ?
        <GridView currentTime={currentTime} currentHazard={currentHazard} currentExposure={currentExposure} currentScenario={currentScenario}/>
        :
        <div></div>
      }
      {currentView == "Compare" && geoJson 
      ? 
          <div>
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
                  setScenario
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
          :
          <div></div>
          }
      {currentView == "Event tracking"
        ?
          <EventTracking props={{
            startDate: startDate,
            setStartDate: setStartDate,
            endDate: endDate,
            setEndDate: setEndDate
          }} />
        :
        <div></div>
      }
    </div>

  )
}

export default App
