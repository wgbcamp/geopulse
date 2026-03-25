import './App.css'
import React, { useState, useEffect } from 'react'
import { GridView } from './ForwardLooking/Grid/Grid';
import { NewHeader } from './Header/Header';
import { CompareView } from './ForwardLooking/Compare/Compare';
import { Thresholds } from './ForwardLooking/Compare/thresholds';

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

  const [currentView, setView] = useState("Compare");
  const [currentTime, setTime] = useState<number>(1980);
  const [currentScenario, setScenario] = useState<string>("rcp4p5");
  const [currentHazard, setHazard] = useState<string>("Riverine Flooding");
  const [currentExposure, setExposure] = useState<string>("Population");
  const [currentMeasure, setMeasure] = useState<{ name: string, id: string }>({ name: "Flood Level", id: "RF_PW_EXP" });
  const [currentThreshold, setThreshold] = useState<{ name: string, threshold: any }>({ name: "", threshold: "rp1000" });

  let [geoJson, setGeoJson] = React.useState<JsonShape | any>(null)

  useEffect(() => {
    const getGeoJson = async () => {
      var getData = await fetch('/geopulse-dev/GADM_ADMIN1.json');
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
        setThreshold
      }} />
      {currentView == "Grid"
        ?
        <GridView currentTime={currentTime} />
        :
        geoJson ?
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

    </div>

  )
}

export default App
