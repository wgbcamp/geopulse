import './App.css'
import { Header } from './sections/header';
import React, { useState, useEffect } from 'react'
import { ViewContainer } from './sections/ViewContainer';
import { Region } from './sections/templates/region';
import { NewHeader } from './sections/newHeader';
import { NewTemperatureThresholds } from './sections/templates/sub/newTemperatureThresholds';

export type JsonShape = {
  features: Array<{
    properties: {
      GID_0: string
    }
  }>
};

export type PolygonPosition = number;

type SeriesTuple = [string, number, number, string, string, string, string];
export type SeriesT = SeriesTuple[][];

export type RegionSeries = object[];

export type AreaSeries = {data: number[], name: string, measure: string[], threshold: any}[][];

type PositionTableData = Array<{
  features: Array<{
    attributes?: {
      NAME_1: string,
      Reference_area_name: string,
      MEDIAN: number,
      period: number,
      scenario: string,
      Admin_Filter: string,
      [key: string]: string | number,
      Reference_area: string,
      MEASURE: string,
      TEMP_THRESHOLD: string
    }
  }>
}>;

function App() {

  const [currentView, setView] = useState("Compare");
  const [currentDimension, setDimension] = useState("2D");
  const [currentTime, setTime] = useState({ time: 1980, url: "https://tiles.arcgis.com/tiles/weJ1QsnbMYJlCHdG/arcgis/rest/services/riverine_flood_grid_people_historical_1980/VectorTileServer" });
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
      console.log(geoJson);
      setGeoJson(geoJson);
    }
    getGeoJson();
  }, []);

  const [countries, setCountries] = React.useState([
    {
      features: [{}],
      name: "Costa Rica",
      iso3: "CRI",
      data: [{}]
    },
    {
      features: [{}],
      name: "Bangladesh",
      iso3: "BGD",
      data: [{}]
    }
  ]);
 
  const [exposureState, setExposureState] = React.useState<SeriesT>([[],[]]);  //8
  const [series, setSeries] = React.useState<SeriesT>([[],[]]);
  const [maxValue, setMaxValue] = React.useState<{measure: string, value: number}[][]>([[]]);

  const [regionExposure, setRegionExposure] = React.useState<RegionSeries>([{}]);

  const [areaSeries, setAreaSeries] = React.useState<AreaSeries>(
    [
      [
        { data: [0, 0, 0, 0], name: "Orderly trajectory", measure: [], threshold: ""},
      ],
    ]
  );

  const regionCount = [0, 1];

  const [currentSubnational, setCurrentSubnational] = React.useState(["", ""]);

  // const [currentTableData, setCurrentTableData] = React.useState<PositionTableData>(
  //   [
  //     {
  //       features: [{
  //         attributes: {
  //           key: "",
  //           NAME_1: "",
  //           Reference_area_name: "",
  //           MEDIAN: 0,
  //           period: 0,
  //           scenario: "",
  //           Admin_Filter: "",
  //           Reference_area: "",
  //           MEASURE: "",
  //           TEMP_THRESHOLD: ""
  //         }
  //       }]
  //     },
  //     {
  //       features: [{
  //         attributes: {
  //           key: "",
  //           NAME_1: "",
  //           Reference_area_name: "",
  //           MEDIAN: 0,
  //           period: 0,
  //           scenario: "",
  //           Admin_Filter: "",
  //           Reference_area: "",
  //           MEASURE: "",
  //           TEMP_THRESHOLD: ""
  //         }
  //       }]
  //     }
  //   ]
  // );

  return (
    <div className='h-full'>
      <NewHeader 
        currentDimension={currentDimension}
        setDimension={setDimension}
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
        <ViewContainer currentTime={currentTime} currentDimension={currentDimension} />
        :
        geoJson ?
        <div className="bg-[#1E1E1E] w-full h-full flex justify-center pb-15">
          <div className="w-9/10 h-full dark flex flex-col 2xl:flex-row gap-x-5 pt-18">
            {regionCount.map((i) =>
              <Region
                key={i}
                currentTime={currentTime}
                currentScenario={currentScenario}
                currentExposure={currentExposure}
                setExposure={setExposure}
                currentHazard={currentHazard}
                setHazard={setHazard}
                currentMeasure={currentMeasure}
                setMeasure={setMeasure}
                currentThreshold={currentThreshold}
                countries={countries}
                setCountries={setCountries}
                mapPolygon={geoJson}
                position={i}
                series={series}
                setSeries={setSeries}
                exposureState={exposureState}
                setExposureState={setExposureState}
                maxValue={maxValue}
                setMaxValue={setMaxValue}
                regionExposure={regionExposure}
                setRegionExposure={setRegionExposure}
                areaSeries={areaSeries}
                setAreaSeries={setAreaSeries}
                currentSubnational={currentSubnational}
                setCurrentSubnational={setCurrentSubnational}
              />
            )}         
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
