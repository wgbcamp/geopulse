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
  currentTime: number
}

//riverine flooding vs population 2080 is renamed to 2100
const tileLayerURLs = [
  { hazard: "Riverine Flooding", exposure: "Population", time: 1980, actual: "1980-2014", url: "https://tiles.arcgis.com/tiles/weJ1QsnbMYJlCHdG/arcgis/rest/services/riverine_flood_grid_people_historical_1980/VectorTileServer" },
  { hazard: "Riverine Flooding", exposure: "Population", time: 2030, actual: "2030", url: "https://tiles.arcgis.com/tiles/weJ1QsnbMYJlCHdG/arcgis/rest/services/riverine_flood_grid_people_rcp4p5_2030/VectorTileServer" },
  { hazard: "Riverine Flooding", exposure: "Population", time: 2050, actual: "2050", url: "https://tiles.arcgis.com/tiles/weJ1QsnbMYJlCHdG/arcgis/rest/services/riverine_flood_grid_people_rcp4p5_2050/VectorTileServer" },
  { hazard: "Riverine Flooding", exposure: "Population", time: 2100, actual: "2100", url: "https://tiles.arcgis.com/tiles/weJ1QsnbMYJlCHdG/arcgis/rest/services/riverine_flood_grid_people_rcp4p5_2080/VectorTileServer" }
];

export const Timeline = ({ setTime, currentHazard, currentExposure, currentTime }: TimelineProps) => {

  const [value, setValue] = useState([1980]);
  const [stringValue, setStringValue] = useState("1980-2014");

  const formatValue = (x:number) => {
      switch (x) {
        case 1980:
          setStringValue("1980-2014");
          break;
        default:
          setStringValue(x.toString());
      }
  }

  useEffect(() => {
  }, [currentTime]);

  useEffect(() => {
    var x = 0;
    tileLayerURLs.forEach(layer => {
      if (layer.exposure === currentExposure && layer.hazard === currentHazard) {
        if ( ((Math.abs(layer.time - value[0])) < (Math.abs(x - value[0]))) || x === 0 ) {
          x = layer.time;
        }
      }
    });
    if (x !== 0) {
      setValue([x]);
      setTime({time: x, url: tileLayerURLs.filter((i) => i.time === x)[0]?.url ?? ""});
      formatValue(x);
    }
  }, [currentHazard, currentExposure]);

  const handleValueChange = (value: number[]) => {
    value.forEach(number => {
      tileLayerURLs.forEach(layer => {
        if (layer.exposure === currentExposure && layer.hazard === currentHazard) {
          if (number === layer.time) {
            setValue([number]);
            setTime({time: number, url: tileLayerURLs.filter((i) => i.time === number)[0]?.url ?? ""});
            formatValue(number);
          }
        } else {
          setValue([number]);
          setTime({time: number, url: ""});
          setStringValue(number.toString());
        }
      });
    })
  }

  return (
    <Item className='w-65 pt-0'>
      <div className='w-full flex items-center pb-4'>
        <Slider
          className='w-full'
          min={1980}
          max={2100}
          step={1}
          value={value}
          onValueChange={handleValueChange}
        />
        <Item variant='muted' className='w-35 px-0 ml-4 py-0'>
          <ItemContent>
            <div className='flex items-center justify-center w-20 font-bold' style={{ paddingBottom: '4px', paddingTop: '4px' }}>
              {stringValue}
            </div>
          </ItemContent>
        </Item>
      </div>
    </Item>

  )
}