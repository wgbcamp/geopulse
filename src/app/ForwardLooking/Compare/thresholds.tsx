import React, { useEffect, useState, type ReactElement } from 'react'

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

import { urlObject } from "@/config/datasets"
import { measureMapper } from "@/config/datasets"

import {Beach20FilledIcon} from "@/components/icons/fluent-beach-20-filled"
import {WeatherSnowflake20FilledIcon} from "@/components/icons/fluent-weather-snowflake-20-filled"
import {WeatherSunny20FilledIcon} from "@/components/icons/fluent-weather-sunny-20-filled"

const floodingTicks = [20, 10, 4, 2, 1, 0.4, 0.2, 0.1];

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

export const Thresholds = ( { props }: any ) => {
 
  const [thresholdSliderValue, setThresholdSliderValue] = useState<number[]>([0]);

  useEffect(() => {    
    handleValueChange([0]);
  }, [props.currentHazard])

  const config = urlObject[props.currentHazard][props.currentExposure];
  const thresholdGroup = config?.threshold?.group ?? {};

  const handleValueChange = (value: number[]) => {
    const config = urlObject[props.currentHazard][props.currentExposure];
    if (!config?.threshold || !config?.thresholdToMeasure) return;

    const thresholdKey = Object.keys(config.threshold.group)[value[0]];
    const measureId = config.thresholdToMeasure[thresholdKey];
    const measureName = measureMapper[measureId];

    props.setThreshold({ name: measureName, threshold: thresholdKey });
    props.setMeasure({ name: measureName, id: measureId });

    //
    setThresholdSliderValue(value);
  };
  
  const handleDroughtTabChange = (value: string) => {
    console.log(value);
    switch (value) {
      case "Dry Days":
        props.setMeasure({ name: "Dry Days", id: 'CDD_CROP_EXP' });
        break;
      case "SPEI Index":
        props.setMeasure({ name: "SPEI Index", id: 'SPEI_CROP_EXP' });
        break;
    }
  }

  const tabComponent = 
    <div className="absolute w-[500px] h-[30px] left-1/2 top-[10%] -translate-x-1/2  p-[1px] rounded-xl flex justify-center">
      <Tabs onValueChange={handleDroughtTabChange} value={props.currentMeasure.name} defaultValue="Dry Days">
        <TabsList className='w-[300px]'>
          {urlObject[props.currentHazard][props.currentExposure].measure.map((id) => 
            <TabsTrigger key={id} value={measureMapper[id]}>{measureMapper[id]}</TabsTrigger>
          )}
        </TabsList>
      </Tabs>
    </div>;
  
  const temperatureSliderComponent = 
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
                  max={Object.values(thresholdGroup).length - 1}
                  step={1}
                  defaultValue={[0]}
                  value={thresholdSliderValue}
                  onValueChange={handleValueChange}
                />
                <div className="relative h-6"
                  style={{ width: "calc(100% )" }}
                >
                  {Object.entries(thresholdGroup).map(([key, value], index: any) => {
                    const percent = (index / (Object.entries(thresholdGroup).length - 1)) * 100;
                    return (
                      <div
                        key={key}
                        className="absolute flex flex-col items-center -translate-x-1/2"
                        style={{ left: `${percent}%` }}
                      >
                        <div className="w-px h-2 bg-muted-foreground/50"></div>
                        <span className={`text-xs w-[42px] mt-0.5 ${value === props.currentThreshold.threshold ? "font-bold text-[black] text-foreground" : "text-muted-foreground"}`}>
                          <div>{index >= 1 && index <= 3 ? 'Tmin' : 'Tmax'}</div>
                          <div>{value}° C</div>
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
                        <span className={`text-xs w-[42px] mt-0.5 flex items-end ${label.name === props.currentThreshold.threshold ? "font-bold text-[black] text-foreground" : "text-muted-foreground"}`}>
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
        </div>;

  const floodingSliderComponent =
    <div className="absolute w-[500px] h-[125px] left-1/2 top-[175px] -translate-x-1/2 -translate-y-1/2 p-[1px] rounded-xl"
      style={{
        background:
          "linear-gradient(174.18deg, #0084FF 7.23%, rgba(92, 92, 92, 0) 95.52%)",
      }}>
      <div className="w-full h-full rounded-xl bg-[#1D1D1D]">
        <Item className='w-100 py-0 px-2 -translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2'>
          <div className="text-lg w-full font-extrabold text-[var(--muted-foreground)] absolute top-[-35px]">ANNUAL PROBABILITY OF FLOODING</div>
          <div className='w-full flex flex-col items-center'>
            <Slider
              className='w-full z-1 cursor-pointer bg-white [&_[data-slot=slider-range]]:bg-transparent [&_[data-slot=slider-track]]:bg-gradient-to-r [&_[data-slot=slider-track]]:from-[rgb(16,48,80)] [&_[data-slot=slider-track]]:to-[rgb(116,221,208)]'
              min={0}
              max={Object.values(thresholdGroup).length - 1}
              step={1}
              defaultValue={[0]}
              value={thresholdSliderValue}
              onValueChange={handleValueChange}
            />
            <div className="relative h-6"
              style={{ width: "calc(100% )" }}
            >
              {Object.values(thresholdGroup).map((tick: any, index: any) => {
                const percent = (index / (Object.values(thresholdGroup).length - 1)) * 100;
                return (
                  <div
                    key={tick}
                    className="absolute flex flex-col items-center -translate-x-1/2"
                    style={{ left: `${percent}%` }}
                  >
                    <div className="w-px h-2 bg-muted-foreground/50"></div>
                    <span className={`text-xs w-[42px] mt-0.5 ${tick === props.currentThreshold.threshold ? "font-bold text-[black] text-foreground" : "text-muted-foreground"}`}>
                      <div>{tick}</div>
                      <div>{index == 0 ? 'High' : index == Object.values(thresholdGroup).length - 1 ? "Low" : <br></br>}</div>
                    </span>
                  </div>
                )
              })
              }
            </div>
          </div>
        </Item>
      </div>
    </div>;

  const defaultComponent = <div></div>;

  const thresholdComponents : Record<string, Record<string, ReactElement>> = {
    "Riverine Flooding":
    {
      "Population": floodingSliderComponent,
      "Buildings": floodingSliderComponent,
      "GDP": floodingSliderComponent,
      "Urban GDP": floodingSliderComponent
    },
    "Coastal Flooding":
    {
      "Population": floodingSliderComponent,
      "Buildings": floodingSliderComponent,
      "GDP": floodingSliderComponent,
      "Urban GDP": floodingSliderComponent
    },
    "Drought":
    {
      "Cropland": tabComponent
    },
    "Temperature Extremes":
    {
      "Population": temperatureSliderComponent,
      "Livestock": defaultComponent,
    }
  } 

  return (
    <div>
          {thresholdComponents[props.currentHazard][props.currentExposure]}
    </div>
  )
}