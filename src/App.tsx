import './App.css'
import React, { useState, useEffect } from 'react'
import { GridView } from './sections/GridView';
import { Region } from './sections/templates/region';
import { NewHeader } from './sections/header';
import { NewTemperatureThresholds } from './sections/templates/sub/temperatureThresholds';

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
  const [currentTime, setTime] = useState(1980);
  const [currentScenario, setScenario] = useState("rcp4p5");
  const [currentHazard, setHazard] = useState("Riverine Flooding");
  const [currentExposure, setExposure] = useState("Population");
  const [currentMeasure, setMeasure] = useState({ name: "Flood Level", id: "RF_PW_EXP" });
  const [currentThreshold, setCurrentThreshold] = useState({ name: "Hot Days", threshold: undefined });

  let [geoJson, setGeoJson] = React.useState<JsonShape | any>(null)

  useEffect(() => {
    const getGeoJson = async () => {
      var getData = await fetch('/geopulse-dev/GADM_ADMIN1.json');
      geoJson = await getData.json();
      setGeoJson(geoJson);
    }
    getGeoJson();
  }, []);
 
  const [maxValue, setMaxValue] = React.useState<{measure: string, value: number}[][]>([[]]);

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
              <Region
                currentTime={currentTime}
                currentScenario={currentScenario}
                currentExposure={currentExposure}
                setExposure={setExposure}
                currentHazard={currentHazard}
                setHazard={setHazard}
                currentMeasure={currentMeasure}
                setMeasure={setMeasure}
                currentThreshold={currentThreshold}
                defaultIso3={"CRI"}
                geoJson={geoJson}
                maxValue={maxValue}
                setMaxValue={setMaxValue}
              />
                <Region
                currentTime={currentTime}
                currentScenario={currentScenario}
                currentExposure={currentExposure}
                setExposure={setExposure}
                currentHazard={currentHazard}
                setHazard={setHazard}
                currentMeasure={currentMeasure}
                setMeasure={setMeasure}
                currentThreshold={currentThreshold}
                defaultIso3={"BGD"}
                geoJson={geoJson}
                maxValue={maxValue}
                setMaxValue={setMaxValue}
              />
                   
                  <NewTemperatureThresholds 
                    currentHazard={currentHazard}
                    currentThreshold={currentThreshold}
                    currentMeasure={currentMeasure}
                    setCurrentThreshold={setCurrentThreshold}
                    setMeasure={setMeasure}
                  />
          </div>
        </div>
        :
        <div></div>
      }

    </div>

  )
}

export default App
