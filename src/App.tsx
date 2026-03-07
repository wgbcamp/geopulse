import './App.css'
import React, { useState, useEffect } from 'react'
import { GridView } from './sections/views/GridView';
import { NewHeader } from './sections/header';
import { CompareView } from './sections/views/CompareView';

export type JsonShape = {
  features: Array<{
    properties: {
      GID_0: string,
      GID_1: string,
      COUNTRY: string,
      NAME_1: string
    }
  }>
};

export type PolygonPosition = number;

export type RegionSeries = object[];

function App() {

  const [currentView, setView] = useState("Compare");
  const [currentTime, setTime] = useState<number>(1980);
  const [currentScenario, setScenario] = useState<string>("rcp4p5");
  const [currentHazard, setHazard] = useState<string>("Riverine Flooding");
  const [currentExposure, setExposure] = useState<string>("Population");
  const [currentMeasure, setMeasure] = useState<{ name: string, id: string }>({ name: "Flood Level", id: "RF_PW_EXP" });
  const [currentThreshold, setCurrentThreshold] = useState<{ name: string, threshold: any }>({ name: "Hot Days", threshold: undefined });

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
      <NewHeader 
        currentTime={currentTime}
        setTime={setTime}
        currentView={currentView}
        setView={setView}
        currentScenario={currentScenario}
        setScenario={setScenario}
        currentHazard={currentHazard}
        setHazard={setHazard}
        currentExposure={currentExposure}
        setExposure={setExposure}
        currentMeasure={currentMeasure}
        setMeasure={setMeasure}
        setCurrentThreshold={setCurrentThreshold}
        />
      {currentView == "Grid"
        ?
        <GridView currentTime={currentTime} />
        :
        geoJson ?
        <div className="bg-[#1E1E1E] w-full h-full flex justify-center pb-15">
          <div className="w-9/10 h-full dark flex flex-col 2xl:flex-row gap-x-5 pt-18">
              <CompareView props={{
                currentTime,
                currentScenario,
                geoJson,
                currentExposure,
                currentHazard,
                currentMeasure,
                currentThreshold
              }}/>
          </div>
        </div>
        :
        <div></div>
      }

    </div>

  )
}

export default App
