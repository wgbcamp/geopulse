import React, { useEffect, useState } from 'react'

import {
  Item,
  ItemContent,
} from "@/components/ui/item"

import { Slider } from "@/components/ui/slider"

//riverine flooding vs population 2080 is renamed to 2100
const tileLayerURLs = [
  { hazard: "Riverine Flooding", exposure: "Population", time: 1980, string: "1980-2014", url: "https://tiles.arcgis.com/tiles/weJ1QsnbMYJlCHdG/arcgis/rest/services/riverine_flood_grid_people_historical_1980/VectorTileServer" },
  { hazard: "Riverine Flooding", exposure: "Population", time: 2030, string: "Early Century", url: "https://tiles.arcgis.com/tiles/weJ1QsnbMYJlCHdG/arcgis/rest/services/riverine_flood_grid_people_rcp4p5_2030/VectorTileServer" },
  { hazard: "Riverine Flooding", exposure: "Population", time: 2050, string: "Mid-Century", url: "https://tiles.arcgis.com/tiles/weJ1QsnbMYJlCHdG/arcgis/rest/services/riverine_flood_grid_people_rcp4p5_2050/VectorTileServer" },
  { hazard: "Riverine Flooding", exposure: "Population", time: 2080, string: "End-Century", url: "https://tiles.arcgis.com/tiles/weJ1QsnbMYJlCHdG/arcgis/rest/services/riverine_flood_grid_people_rcp4p5_2080/VectorTileServer" }
];

const ticks:any = [];
tileLayerURLs.forEach(layer => {
  ticks.push(layer.string);
})

export const Timeline = ({ props }: any) => {

  useEffect(() => {
    console.log("props: ",props)
  }, [props.currentTime]);

  const handleValueChange = (value: number[]) => {
    props.setTime(tileLayerURLs[value[0]].time)
  }

  return (
    <Item className='w-65 py-0 px-2'>
      <div className='w-full flex flex-col items-center'>
        <Slider
          className='w-[320px] z-1 cursor-pointer bg-white'
          min={0}
          max={3}
          step={1}
          defaultValue={[0]}
          onValueChange={handleValueChange}
        />
        <div className="relative h-6" 
        style={{width: "calc(100% + 62px)"}}
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
                <span className={`text-xs w-20 mt-0.5 ${tick === tileLayerURLs[index]?.string && props.currentTime === tileLayerURLs[index]?.time ? "font-bold" : "text-[black]"}`}>
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