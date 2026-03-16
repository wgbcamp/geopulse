import '../App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item"
import {
  Card
} from "@/components/ui/card"
import { WeatherHailDay24RegularIcon } from '../components/icons/fluent-weather-hail-day-24-regular'
import { Scales20RegularIcon } from '../components/icons/fluent-scales-20-regular'
import { Globe32LightIcon } from '../components/icons/fluent-globe-32-light'
import { Warning20RegularIcon } from '../components/icons/fluent-warning-20-regular'
import { Layer20RegularIcon } from '@/components/icons/fluent-layer-20-regular'
import { ChevronCircleDown20RegularIcon } from '@/components/icons/fluent-chevron-circle-down-20-regular'
import { Timeline } from './sub/timeline'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { urlObject, scenarioMapper } from '@/data/datasets';

type HeaderProps = {
    currentTime: number,
    setTime: React.Dispatch<React.SetStateAction<number>>,
    currentView: string,
    setView: React.Dispatch<React.SetStateAction<string>>
    currentScenario: string,
    setScenario: React.Dispatch<React.SetStateAction<string>>,
    currentHazard: string,
    setHazard: React.Dispatch<React.SetStateAction<string>>,
    currentExposure: string,
    setExposure: React.Dispatch<React.SetStateAction<string>>,
    currentMeasure: {name: string, id: string},
    setMeasure: React.Dispatch<React.SetStateAction<{name: string, id: string}>>
    setThreshold: React.Dispatch<React.SetStateAction<{name: string, threshold: any}>>
};

let risks: {hazard: string, exposure: string[], measureStat: string, measureName: string, thresholdStat: any, thresholdName: string}[] = [
  { hazard: "Temperature Extremes", exposure: ["Population", "Livestock", "GDP", "Urban GDP"], measureStat: "HD_PW_EXP", measureName: "Hot Days", thresholdStat: "H_30", thresholdName: "Hot Days" },
  { hazard: "Riverine Flooding", exposure: ["Population", "Buildings", "Builtup Area", "GDP", "Urban GDP"], measureStat: "RF_PW_EXP", measureName: "Flood Level", thresholdStat: undefined, thresholdName: "" },
  { hazard: "Coastal Flooding", exposure: ["Population", "Buildings", "Builtup Area", "GDP", "Urban GDP"], measureStat: "", measureName: "", thresholdStat: undefined, thresholdName: "" },
  { hazard: "Drought", exposure: ["Cropland"], measureStat: "CDD_CROP_EXP", measureName: "Dry Days", thresholdStat: undefined, thresholdName: "" }
];

const scenarioFlip = [
    { frontend: 'Orderly', data: 'rcp4p5' },
    { frontend: 'Disorderly', data: 'rcp8p5' },
    { frontend: 'Hot House', data: 'SSP370' }
];



export const NewHeader: React.FC<HeaderProps> = ({ currentTime, currentView, currentScenario, currentHazard, currentExposure, currentMeasure,
    setExposure, setHazard, setTime, setView, setScenario, setMeasure, setThreshold
}) => {

    const [riskState, setRiskState] = useState<{hazard: string, exposure: string}>({hazard: currentHazard, exposure: currentExposure});

    return (
        <div className={`h-[69px] sticky top-0 z-50`}>
            <div className='flex flex-row h-[69px] w-full'>
                <Button className='rounded-none h-full w-[67px] bg-[var(--darkblue)] text-white hover:bg-[var(--darkblue)]'>Menu</Button>
                <Card className="rounded-none w-[208px] p-0 flex flex-row items-center justify-center font-semibold bg-[var(--lightblue)] text-white border-0">IMF | GEO PULSE</Card>
                <Card className="rounded-none w-[208px] p-0 flex flex-col items-center justify-center gap-0">
                    <div className="text-[11px]">REALTIME</div>
                    <div className="flex flex-row">
                        <WeatherHailDay24RegularIcon size={26} strokeWidth={1}/>
                        <div className="text-[16px] font-bold text-end flex items-center pl-2">Event Tracking</div>  
                    </div>
                </Card>
                <Card className="rounded-none w-[366px] p-0 flex flex-col items-center justify-end gap-0">
                    <div className="text-[11px]">FORWARD LOOKING</div>
                    <div className="flex flex-end flex-col w-full ">
                        <div className="flex flex-row justify-evenly items-start w-full h-full">
                            <div className='flex flex-col justify-end w-full cursor-pointer' onClick={() => setView("Grid")}>
                                <div className="flex flex-row h-[35px] items-start justify-center">
                                    <Scales20RegularIcon size={26} strokeWidth={1} color={currentView === "Grid" ? "var(--orange)" : "black"}/>
                                    <div className={`text-[16px] ${currentView === "Grid" ? "text-[var(--orange)]" : "text-black"} font-bold text-end flex items-center pr-2`}>Grid</div>
                                </div>
                                <div className={`h-[4px] bg-[var(--orange)] ${currentView === "Grid" ? "opacity-100" : "opacity-0"}`}></div>
                            </div>
                            <div className='w-[2px] h-8/10 bg-blue-300'></div>
                            <div className='flex flex-col justify-end w-full cursor-pointer' onClick={() => setView("Compare")}>
                                <div className="flex flex-row h-[35px] items-start justify-center">
                                    <Globe32LightIcon size={24} strokeWidth={1} color={currentView === "Compare" ? "var(--orange)" : "black"} />
                                    <div className={`text-[16px] ${currentView === "Compare" ? "text-[var(--orange)]" : "text-black"} font-bold text-end flex items-center pr-2 pl-1`}>Compare</div>
                                </div>
                                <div className={`h-[4px] bg-[var(--orange)] ${currentView === "Compare" ? "opacity-100" : "opacity-0"}`}></div>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className="rounded-none p-0 flex flex-col items-center justify-center gap-0">
                    <Popover>
                        <PopoverTrigger>
                            <div className="flex flex-row items-center justify-between w-[295px] px-5">
                                <div className='flex items-center cursor-pointer'>
                                    <Warning20RegularIcon size={26} strokeWidth={1} color="var(--orange)"/>
                                    <div className='flex flex-col items-start pl-1'>
                                        <div className="text-[16px] font-bold text-end flex items-center">{currentHazard}</div>
                                        <div className='w-[115px] h-[2px] bg-gray-300'></div>
                                        <div className="text-[16px] font-bold text-end flex items-center">{currentExposure}</div>
                                    </div>
                                </div>
                                <ChevronCircleDown20RegularIcon size={28} strokeWidth={1} className='pl-1' />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0 py-[20px]">
                            <div className="flex flex-row justify-center">
                                <ItemGroup>
                                    {risks.map((x) =>
                                        <Item key={x.hazard} className={`cursor-pointer my-[4px] hover:bg-gray-200 ${riskState.hazard === x.hazard ? 'bg-gray-100 border-b-3 border-black' : ""} transition-all hover:duration-50 duration-200 ease-in`} onClick={() => setRiskState({hazard: x.hazard, exposure: currentExposure})}>
                                            <ItemContent>
                                                <ItemHeader className={`${riskState.hazard === x.hazard ? 'font-bold' : 'font-medium'} text-[16px]`}>{x.hazard}</ItemHeader>
                                                <div className={`${riskState.hazard === x.hazard ? "h-[265px]" : "h-0 hidden" }`}>
                                                    {x.exposure.map((y) =>
                                                        <Item key={y} className={`cursor-pointer my-[8px] py-[7px] hover:bg-gray-300 ${riskState.exposure === y && riskState.hazard === currentHazard ? "bg-gray-300 font-bold" : ""}`} onClick={() => {() => setRiskState({hazard: x.hazard, exposure: y}); setHazard(x.hazard); setExposure(y); setThreshold({ name: x.thresholdName, threshold: x.thresholdStat }); setMeasure({ id: x.measureStat, name: x.measureName,}); }}>
                                                            <ItemContent>
                                                                <ItemHeader className=''>{y}</ItemHeader>
                                                            </ItemContent>
                                                        </Item>
                                                    )}
                                                </div>
                                            </ItemContent>
                                        </Item>
                                    )}
                                </ItemGroup>
                            </div>
                        </PopoverContent>
                    </Popover>
                </Card>
                <Card className="rounded-none p-0 flex flex-col items-center justify-center gap-0">
                    <Popover>
                        <PopoverTrigger>
                            <div className="flex flex-row items-center w-[225px] h-[50px] px-5 justify-between cursor-pointer">
                                <div className='flex items-center'>
                                    <Layer20RegularIcon size={26} strokeWidth={1} color="var(--orange)"/>
                                    <div className="text-[16px] font-bold text-end flex items-center">{scenarioMapper[currentScenario]}</div>
                                </div>
                                <ChevronCircleDown20RegularIcon size={28} strokeWidth={1} className='pl-1' />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-[225px] p-0">
                                <div className={`flex flex-row justify-center py-[10px] h-[calc(80px*${urlObject[currentHazard][currentExposure].scenarios.length})]`}>
                                    <ItemGroup>
                                        {urlObject[currentHazard][currentExposure].scenarios.map((x) =>
                                            <Item key={x} className={`cursor-pointer hover:bg-gray-100 my-[8px] ${scenarioMapper[currentScenario] === scenarioMapper[x] ? 'bg-gray-100 font-bold border-b-3 border-black' : ""} transition-all duration-200 ease-in`} onClick={() => setScenario(x)}>
                                                <ItemContent>
                                                    <ItemHeader onClick={() => setScenario(x)}>{scenarioMapper[x]}</ItemHeader>
                                                </ItemContent>
                                            </Item>
                                        )}
                                    </ItemGroup>
                                </div>
                        </PopoverContent>
                    </Popover>
                </Card>
                <Card className='rounded-none w-[400px]'>
                    <div className="h-full flex items-center justify-center">
                        <Timeline
                            currentTime={currentTime}
                            setTime={setTime}
                            currentHazard={currentHazard}
                            currentExposure={currentExposure}
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
};