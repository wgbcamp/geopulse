import React, { useEffect, useState } from 'react'

import {
  Item,
  ItemContent,
} from "@/components/ui/item"

import { Slider } from "@/components/ui/slider"

type TimelineProps = {
  setTime: React.Dispatch<React.SetStateAction<{ time: number, url: string }>>,
  currentHazard: string,
  currentExposure: string,
  currentTime: { time: number, url: string }
}

//riverine flooding vs population 2080 is renamed to 2100
const tileLayerURLs = [
  { hazard: "Riverine Flooding", exposure: "Population", time: 1980, string: "1980-2014", url: "https://tiles.arcgis.com/tiles/weJ1QsnbMYJlCHdG/arcgis/rest/services/riverine_flood_grid_people_historical_1980/VectorTileServer" },
  { hazard: "Riverine Flooding", exposure: "Population", time: 2030, string: "2030", url: "https://tiles.arcgis.com/tiles/weJ1QsnbMYJlCHdG/arcgis/rest/services/riverine_flood_grid_people_rcp4p5_2030/VectorTileServer" },
  { hazard: "Riverine Flooding", exposure: "Population", time: 2050, string: "2050", url: "https://tiles.arcgis.com/tiles/weJ1QsnbMYJlCHdG/arcgis/rest/services/riverine_flood_grid_people_rcp4p5_2050/VectorTileServer" },
  { hazard: "Riverine Flooding", exposure: "Population", time: 2080, string: "2100", url: "https://tiles.arcgis.com/tiles/weJ1QsnbMYJlCHdG/arcgis/rest/services/riverine_flood_grid_people_rcp4p5_2080/VectorTileServer" }
];

const ticks:any = [];
tileLayerURLs.forEach(layer => {
  ticks.push(layer.string);
})
const min = 1980;
const max = 2080;

export const Timeline = ({ setTime, currentHazard, currentExposure, currentTime }: TimelineProps) => {

  const [value, setValue] = useState([0]);
  const [stringValue, setStringValue] = useState("1980-2014");

  const formatValue = (x:number) => {
      switch (x) {
        case 1980:
          setStringValue("1980-2014");
          break;
        case 2080:
          setStringValue("2100");
          break;
        default:
          setStringValue(x.toString());
      }
  }

  useEffect(() => {
  }, [currentTime]);

  // useEffect(() => {
  //   var x = 0;
  //   tileLayerURLs.forEach(layer => {
  //     if (layer.exposure === currentExposure && layer.hazard === currentHazard) {
  //       if ( ((Math.abs(layer.time - value[0])) < (Math.abs(x - value[0]))) || x === 0 ) {
  //         x = layer.time;
  //       }
  //     }
  //   });
  //   if (x !== 0) {
  //     setValue([x]);
  //     setTime({time: x, url: tileLayerURLs.filter((i) => i.time === x)[0]?.url ?? ""});
  //     formatValue(x);
  //   }
  // }, [currentHazard, currentExposure]);

  // const handleValueChange = (value: number[]) => {
  //   value.forEach(number => {
  //     tileLayerURLs.forEach(layer => {
  //       if (layer.exposure === currentExposure && layer.hazard === currentHazard) {
  //         if (number === layer.time) {
  //           setValue([number]);
  //           setTime({time: number, url: tileLayerURLs.filter((i) => i.time === number)[0]?.url ?? ""});
  //           formatValue(number);
  //         }
  //       } else {
  //         setValue([number]);
  //         setTime({time: number, url: ""});
  //         setStringValue(number.toString());
  //       }
  //     });
  //   })
  // }

  const handleValueChange = (value: number[]) => {
    if (currentHazard === "Riverine Flooding" && currentExposure === "Population") {
      setTime({time: tileLayerURLs[value[0]].time, url: tileLayerURLs[value[0]].url})
    } else {
      setTime({time: value[0], url: ""});
    }
  }

  return (
    <Item className='w-65 py-0 px-2'>
      <div className='w-full flex flex-col items-center'>
        <Slider
          className='w-full z-1 cursor-pointer bg-white'
          min={currentHazard === "Riverine Flooding" && currentExposure === "Population" ? 0 : 1980}
          max={currentHazard === "Riverine Flooding" && currentExposure === "Population" ? 3 : 2100}
          step={1}
          defaultValue={[0]}
          onValueChange={handleValueChange}
        />
        <div className="relative h-6" 
        style={{width: "calc(100% - 16px)"}}
        >
          {ticks.map((tick:any, index:any) => {
            const percent = (index / (ticks.length - 1)) * 100;
            return (
              <div
                key={tick}
                className="absolute flex flex-col items-center -translate-x-1/2"
                style={{ left: `${percent}%`}}
              >
                <div className="w-px h-2 bg-muted-foreground/50"></div>
                <span className={`text-xs mt-0.5 ${tick === tileLayerURLs[index]?.string && currentTime.time === tileLayerURLs[index]?.time ? "font-bold text-[black] text-foreground" : "text-muted-foreground"}`}>
                  {tick}
                </span>
              </div>
            )
          })
        }
        </div>
      </div>
    </Item>

  )
}