import React, { useEffect, useState } from 'react'

import {
  Item,
  ItemContent,
} from "@/components/ui/item"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Slider } from "@/components/ui/slider"

import {Beach20FilledIcon} from "@/components/icons/fluent-beach-20-filled"
import {WeatherSnowflake20FilledIcon} from "@/components/icons/fluent-weather-snowflake-20-filled"
import {WeatherSunny20FilledIcon} from "@/components/icons/fluent-weather-sunny-20-filled"

type TimelineProps = {
  setTime: React.Dispatch<React.SetStateAction<{ time: number, url: string }>>,
  currentHazard: string,
  currentExposure: string,
  currentTime: { time: number, url: string },
  currentThreshold: { name: string, threshold: any },
  currentExposureFilter: { name: string, measures: string[] },
  setCurrentThreshold: React.Dispatch<React.SetStateAction<{ name: string, threshold: any }>>,
  setExposureFilter: React.Dispatch<React.SetStateAction<{ name: string, measures: string[] }>>
}

const ticks = [0, 20, 26, 32, 30, 35, 40];

const labels = [
  {
    name: "ICING DAYS", position: 0, icon: WeatherSnowflake20FilledIcon, color: "#4FADD0", svg: "",
  },
  { name: "", position: 100, icon: "", color: "#FFC800", svg:
    `<svg xmlns=http://www.w3.org/2000/svg width="60" height="40" viewBox="0 0 60 40">
      <rect x="20" y="20" width="15" height="3" rx="2" fill="#FFC107"/>
      <rect x="20" y="14" width="3" height="15" rx="2" fill="#FFC107"/>
    </svg>`
},
  { name: "TROPICAL NIGHTS", position: 85, icon: Beach20FilledIcon, color: "#FFC800", svg: "" },
  { name: "", position: 92, icon: "", color: "#FFC800", svg:
    `<svg xmlns=http://www.w3.org/2000/svg width="60" height="40" viewBox="0 0 60 40">
      <rect x="20" y="20" width="15" height="3" rx="2" fill="#FFC107"/>
      <rect x="34" y="14" width="3" height="15" rx="2" fill="#FFC107"/>
    </svg>`},
  { name: "", position: 100, icon: "", color: "#FF0000", svg:
      `<svg xmlns=http://www.w3.org/2000/svg width="60" height="40" viewBox="0 0 60 40">
      <rect x="20" y="20" width="15" height="3" rx="2" fill="#FF0000"/>
      <rect x="20" y="14" width="3" height="15" rx="2" fill="#FF0000"/>
    </svg>` 
},
  { name: "HOT DAYS", position: 97, icon: WeatherSunny20FilledIcon, color: "#FF0000", svg: "" },
  { name: "", position: 96, icon: "", color: "#FF0000", svg:
    `<svg xmlns=http://www.w3.org/2000/svg width="60" height="40" viewBox="0 0 60 40">
      <rect x="20" y="20" width="15" height="3" rx="2" fill="#FF0000"/>
      <rect x="34" y="14" width="3" height="15" rx="2" fill="#FF0000"/>
    </svg>`
   }
];
// let temperatureExposures = ["Hot Days", "Tropical Nights", "Icing Days"];
// let thresholds = [
//   { category: "Hot Days", symbols: ["H_30", "H_35", "H_40"] },
//   { category: "Tropical Nights", symbols: ["H_20", "H_26", "H_32"] },
//   { category: "Icing Days", symbols: ["_Z"] }
// ];

// var measureModel = [
//   { measures: ['SPEI_CROP_EXP'], name: "SPEI Index" },
//   { measures: ['CDD_CROP_EXP'], name: "Dry Days" },
//   { measures: ["HD_PW_EXP", "HD_LW_EXP"], name: "Hot Days" },
//   { measures: ['TN_PW_EXP'], name: "Tropical Nights" },
//   { measures: ['ID_PW_EXP'], name: "Icing Days" }
// ];


export const NewTemperatureThresholds = ({ setTime, currentHazard, currentExposure, currentTime, currentThreshold, currentExposureFilter, setCurrentThreshold, setExposureFilter }: TimelineProps) => {

  const handleValueChange = (value: number[]) => {
    if (currentHazard === "Riverine Flooding" && currentExposure === "Population") {
      // setTime({time: tileLayerURLs[value[0]].time, url: tileLayerURLs[value[0]].url})
    } else {
      // setTime({time: value[0], url: ""});
    }

    switch (value[0]) {
      case 0:
        setExposureFilter({ name: "Icing Days", measures: ['ID_PW_EXP'] });
        setCurrentThreshold({ name: "Icing Days", threshold: "_Z" });
        break;
      case 1:
        setExposureFilter({ name: "Tropical Nights", measures: ['TN_PW_EXP'] });
        setCurrentThreshold({ name: "Tropical Nights", threshold: 'H_20' });
        break;
      case 2:
        setExposureFilter({ name: "Tropical Nights", measures: ['TN_PW_EXP'] });
        setCurrentThreshold({ name: "Tropical Nights", threshold: 'H_26' });
        break;
      case 3:
        setExposureFilter({ name: "Tropical Nights", measures: ['TN_PW_EXP'] });
        setCurrentThreshold({ name: "Tropical Nights", threshold: 'H_32' });
        break;
      case 4:
        setExposureFilter({ name: "Hot Days", measures: ["HD_PW_EXP", "HD_LW_EXP"] });
        setCurrentThreshold({ name: "Hot Days", threshold: 'H_30' });
        break;
      case 5:
        setExposureFilter({ name: "Hot Days", measures: ["HD_PW_EXP", "HD_LW_EXP"] });
        setCurrentThreshold({ name: "Hot Days", threshold: 'H_35' });
        break;
      case 6:
        setExposureFilter({ name: "Hot Days", measures: ["HD_PW_EXP", "HD_LW_EXP"] });
        setCurrentThreshold({ name: "Hot Days", threshold: 'H_40' });
        break;
    }
  }

  const thresholdValues = ["_Z", "H_20", "H_26", "H_32", "H_30", "H_35", "H_40"];

  const handleTabChange = (value: string) => {
    switch (value) {
      case "Dry Days":
        setExposureFilter({ name: "Dry Days", measures: ['CDD_CROP_EXP'] });
        break;
      case "SPEI Index":
        setExposureFilter({ name: "SPEI Index", measures: ['SPEI_CROP_EXP'] });
        break;
    }
  }

  const conditionalMeasurements = [
    {
      hazard: "Temperature Extremes",
      component:
        <div className="absolute w-[500px] h-[125px] left-1/2 top-[175px] -translate-x-1/2 -translate-y-1/2 p-[1px] rounded-xl"
          style={{
            background:
              "linear-gradient(174.18deg, #0084FF 7.23%, rgba(92, 92, 92, 0) 95.52%)",
          }}>
          <div className="w-full h-full rounded-xl bg-[#1D1D1D]">
            <Item className='w-100 py-0 px-2 -translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2'>
              <div className='w-full flex flex-col items-center'>
                <Slider
                  className='w-full z-1 cursor-pointer bg-white [&_[data-slot=slider-range]]:bg-transparent [&_[data-slot=slider-track]]:bg-gradient-to-r [&_[data-slot=slider-track]]:from-[#004C97] [&_[data-slot=slider-track]]:via-[#FDBB33] [&_[data-slot=slider-track]]:to-[#FF0000]'
                  min={0}
                  max={6}
                  step={1}
                  defaultValue={[0]}
                  onValueChange={handleValueChange}
                  value={[thresholdValues.indexOf(currentThreshold.threshold)]}
                />
                <div className="relative h-6"
                  style={{ width: "calc(100% )" }}
                >
                  {ticks.map((tick: any, index: any) => {
                    const percent = (index / (ticks.length - 1)) * 100;
                    return (
                      <div
                        key={tick}
                        className="absolute flex flex-col items-center -translate-x-1/2"
                        style={{ left: `${percent}%` }}
                      >
                        <div className="w-px h-2 bg-muted-foreground/50"></div>
                        <span className={`text-xs w-[42px] mt-0.5 ${tick === currentThreshold.threshold ? "font-bold text-[black] text-foreground" : "text-muted-foreground"}`}>
                          <div>Tmax</div>
                          <div>{tick > 0 ? '>' : '<'} {tick}° C</div>
                        </span>
                      </div>
                    )
                  })
                  }
                  {labels.map((label: any, index: any) => {
                    const percent = (index / (labels.length - 1)) * label.position;
                    return (
                      <div
                        key={label}
                        className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-13"
                        style={{ left: `${percent}%` }}
                      >
                        <span className={`text-xs w-[42px] mt-0.5 flex items-end ${label.name === currentThreshold.threshold ? "font-bold text-[black] text-foreground" : "text-muted-foreground"}`}>
                          <div dangerouslySetInnerHTML={{ __html: label.svg }} className="w-6 h-9" />
                          <div className=''>{label.icon && React.createElement(label.icon, { size: 24, color: label.color })}</div>
                          <div className="font-extrabold">{label.name}</div>
                        </span>
                      </div>
                    )
                  })
                  }
                </div>
              </div>
            </Item>
          </div>
        </div>
    },
    {
      hazard: "Drought",
      component:
        <div className="absolute w-[500px] h-[30px] left-1/2 top-[10%] -translate-x-1/2  p-[1px] rounded-xl flex justify-center">
          <Tabs onValueChange={handleTabChange} value={currentExposureFilter.name} defaultValue="Dry Days">
            <TabsList className='w-[300px]'>
              <TabsTrigger value="Dry Days">Dry Days</TabsTrigger>
              <TabsTrigger value="SPEI Index">SPEI Index</TabsTrigger>
            </TabsList>
          </Tabs>
        </div> 
    }
  ]

  return (
    <div>
      {conditionalMeasurements.filter(i => i.hazard === currentHazard)[0]?.component}
    </div>
  )
}