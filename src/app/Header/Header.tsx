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
import { WeatherHailDay24RegularIcon } from '../../components/icons/fluent-weather-hail-day-24-regular'
import { Scales20RegularIcon } from '../../components/icons/fluent-scales-20-regular'
import { Globe32LightIcon } from '../../components/icons/fluent-globe-32-light'
import { Warning20RegularIcon } from '../../components/icons/fluent-warning-20-regular'
import { Layer20RegularIcon } from '@/components/icons/fluent-layer-20-regular'
import { ChevronCircleDown20RegularIcon } from '@/components/icons/fluent-chevron-circle-down-20-regular'
import { ChevronCircleUp20RegularIcon } from '@/components/icons/fluent-chevron-circle-up-20-regular'
import { Timer20RegularIcon } from '@/components/icons/fluent-timer-20-regular'
import { ChevronUpIcon } from '@/components/icons/lucide-chevron-up'
import { ChevronDownIcon } from '@/components/icons/lucide-chevron-down'
import { Timeline } from './timeline'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from 'date-fns';

import { urlObject, scenarioMapper, measureMapper } from '@/config/datasets';

export const NewHeader = ({ props }: any) => {

    const [riskState, setRiskState] = useState<string>("Riverine Flooding");
    const [riskOpened, setRiskOpened] = useState<boolean>(false);
    const [scenarioOpened, setScenarioOpened] = useState<boolean>(false);
    const handleOpenChange = (newOpenState: boolean) => {
        if (newOpenState) {
            setRiskState(props.currentHazard)
        }
        setRiskOpened(newOpenState);
    };

    const swapTable = (hazard: string, exposure: string, threshold: object, measure: object ) => {
        const findMatchingScenario = new Promise((resolve) => {
            if (urlObject[hazard][exposure].scenarios.find((element) => scenarioMapper[element] == scenarioMapper[props.currentScenario])) {
                resolve(true);
            } else {
                resolve(props.setScenario(urlObject[props.currentHazard][props.currentExposure].scenarios[0]));
            }
        });

        findMatchingScenario.then(() => {
            props.setHazard(hazard);
            props.setExposure(exposure);
            props.setThreshold(threshold);
            props.setMeasure(measure);
        });
    }

    const calendarComponent =
        <Card className={`rounded-none w-[590px] p-0 items-center justify-center shadow-none border-x-0 gap-0`}>
            <div className='w-7/10 flex flex-col items-start'>
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="flex justify-between w-full">
                            <div>
                                <div className="font-extrabold text-[#707070] text-[11px] w-full">
                                    <div className='flex'>START</div>
                                </div>
                                <Button
                                    variant="outline"
                                    data-empty={!props.dateRange.from}
                                    className="w-[175px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                                >
                                    {props.dateRange.from ? format(props.dateRange.from, "PPP") : <span>Select a date</span>}
                                </Button>
                            </div>
                            <div>
                                <div className="font-extrabold text-[#707070] text-[11px]">
                                    <div className='flex'>END</div>
                                </div>
                                <Button
                                    variant="outline"
                                    data-empty={!props.dateRange.to}
                                    className="w-[175px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                                >
                                    {props.dateRange.to ? format(props.dateRange.to, "PPP") : <span>Select a date</span>}
                                </Button>
                            </div>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 my-[10px] rounded-none flex flex-row" align="start">
                        <Calendar
                            mode="range"
                            defaultMonth={props.dateRange.from}
                            selected={props.dateRange}
                            onSelect={(date) => {
                                if (date) props.setDateRange(date)
                            }}
                            numberOfMonths={2}
                            disabled={(date) => date < new Date("2019-01-01")}
                            startMonth={new Date("2019-01-07")}
                            captionLayout='dropdown'
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </Card>;

    return (
        <div className={`h-[69px] fixed top-0 z-50`}>
            <div className='flex flex-row h-[69px] w-full'>
                <Button className='rounded-none h-full w-[67px] bg-[var(--darkblue)] text-white hover:bg-[var(--darkblue)]'>Menu</Button>
                <Card className="rounded-none w-[208px] p-0 flex flex-row items-center justify-center font-semibold bg-[var(--lightblue)] text-white border-0">IMF GEOPULSE</Card>
                <Card className={`rounded-none w-[208px] p-0 flex flex-col items-center justify-center gap-0 ${props.currentView !== "Event tracking" ? 'bg-[var(--unselectedview)]' : 'bg-white'} border-0`}>
                        <div className='h-full flex flex-col justify-center'>
                            <div className="text-[11px]">REALTIME</div>
                            <div className="flex flex-row">
                                <Timer20RegularIcon size={26} strokeWidth={1} color={`${props.currentView !== "Event tracking" ? 'black'  : 'var(--orange)'}`} />
                                <div className="text-[16px] font-bold text-end flex items-center pl-2 cursor-pointer" onClick={() => props.setView("Event tracking")}>Event Tracking</div>
                            </div>
                        </div>
                        <div className={`h-[4px] w-full bg-[var(--orange)] ${props.currentView === "Event tracking" ? "opacity-100" : "opacity-0"}`}></div>
                </Card>
                {props.currentView === "Event tracking" ?
                    <div className='flex '>
                        {calendarComponent}
                    </div>
                    : 
                    <div></div>}
                <Card className={`rounded-none w-[366px] p-0 flex flex-col items-center justify-end gap-0 ${props.currentView == "Event tracking" ? 'bg-[var(--unselectedview)]' : 'bg-white'} border-0`}>
                    <div className="text-[11px]">FORWARD LOOKING</div>
                    <div className="flex flex-end flex-col w-full ">
                        <div className="flex flex-row justify-evenly items-start w-full h-full">
                            <div className='flex flex-col justify-end w-full cursor-pointer' onClick={() => props.setView("Grid")}>
                                <div className="flex flex-row h-[35px] items-start justify-center">
                                    <Scales20RegularIcon size={26} strokeWidth={1} color={props.currentView === "Grid" ? "var(--orange)" : "black"}/>
                                    <div className={`text-[16px] ${props.currentView === "Grid" ? "text-[var(--orange)]" : "text-black"} font-bold text-end flex items-center pr-2`}>Grid</div>
                                </div>
                                <div className={`h-[4px] bg-[var(--orange)] ${props.currentView === "Grid" ? "opacity-100" : "opacity-0"}`}></div>
                            </div>
                            <div className='w-[2px] h-8/10 bg-blue-300'></div>
                            <div className='flex flex-col justify-end w-full cursor-pointer' onClick={() => props.setView("Compare")}>
                                <div className="flex flex-row h-[35px] items-start justify-center">
                                    <Globe32LightIcon size={24} strokeWidth={1} color={props.currentView === "Compare" ? "var(--orange)" : "black"} />
                                    <div className={`text-[16px] ${props.currentView === "Compare" ? "text-[var(--orange)]" : "text-black"} font-bold text-end flex items-center pr-2 pl-1`}>Compare</div>
                                </div>
                                <div className={`h-[4px] bg-[var(--orange)] ${props.currentView === "Compare" ? "opacity-100" : "opacity-0"}`}></div>
                            </div>
                        </div>
                    </div>
                </Card>
                {props.currentView === "Compare" || props.currentView === "Grid" ? 
                <div className="flex flex-row h-full">
                    <Card className="rounded-none p-0 flex flex-col items-center justify-center gap-0">
                        <Popover open={riskOpened} onOpenChange={handleOpenChange}>
                            <PopoverTrigger>
                                <div className="flex flex-row items-center justify-between w-[295px] px-5">
                                    <div className='flex items-center cursor-pointer'>
                                        <Warning20RegularIcon size={26} strokeWidth={1} color="var(--orange)" />
                                        <div className='flex flex-col items-start pl-1'>
                                            <div className="text-[16px] font-bold text-end flex items-center">{props.currentHazard}</div>
                                            <div className='w-[115px] h-[2px] bg-gray-300'></div>
                                            <div className="text-[16px] font-bold text-end flex items-center">{props.currentExposure}</div>
                                        </div>
                                    </div>
                                    {riskOpened ? <ChevronCircleUp20RegularIcon size={28} strokeWidth={1} className='pl-1' /> : <ChevronCircleDown20RegularIcon size={28} strokeWidth={1} className='pl-1' />}
                                </div>
                            </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0 py-[20px] my-[5px] rounded-none shadow-[0_-10px_10px_-5px_rgba(0,0,0,0.1)]">
                                    <div className="flex flex-row justify-center">
                                        <ItemGroup>
                                            {Object.entries(urlObject).map(([key, value]) => {
                                                return <Item key={key} className={`cursor-pointer my-[4px] items-start ${riskState === key ? ' ' : ""} transition-all hover:duration-50 duration-200 ease-in`} onClick={() => setRiskState(key)}>
                                                    <ItemContent>
                                                        <ItemHeader className={`${riskState === key ? 'font-bold' : 'font-medium'} text-[16px]`}>{key}</ItemHeader>
                                                        <div className={`${riskState === key ? `h-[calc(80px*${value.length})]` : "h-0 hidden"}`}>
                                                            {Object.entries(value).map(([a, b]) =>
                                                                <Item key={a} className={`cursor-pointer my-[8px] py-[7px] pl-0 ${props.currentExposure == a && riskState == props.currentHazard ? "font-extrabold text-(--orange) underline underline-offset-5 decoration-2" : "font-medium"}`} onClick={() => { () => setRiskState(key); swapTable(key, a, { name: "", threshold: Object.keys(b.threshold?.group || {})[0] }, { id: b.measure[0], name: measureMapper[b.measure[0]] }); }}>
                                                                    <ItemContent>
                                                                        <ItemHeader>{a}</ItemHeader>
                                                                    </ItemContent>
                                                                </Item>
                                                            )}
                                                        </div>
                                                    </ItemContent>
                                                    {riskState == key ? <ChevronUpIcon/> : <ChevronDownIcon/>}
                                                    
                                                </Item>
                                            })}
                                        </ItemGroup>
                                    </div>
                                </PopoverContent>
                        </Popover>
                    </Card>
                    <Card className="rounded-none p-0 flex flex-col items-center justify-center gap-0">
                        <Popover open={scenarioOpened} onOpenChange={() => setScenarioOpened(!scenarioOpened)}>
                            <PopoverTrigger>
                                <div className="flex flex-row items-center w-[225px] h-[50px] px-5 justify-between cursor-pointer">
                                    <div className='flex items-center'>
                                        <Layer20RegularIcon size={26} strokeWidth={1} color="var(--orange)" />
                                        <div className="text-[16px] font-bold text-end flex items-center">{scenarioMapper[props.currentScenario]}</div>
                                    </div>
                                    {scenarioOpened ? <ChevronCircleUp20RegularIcon size={28} strokeWidth={1} className='pl-1' /> : <ChevronCircleDown20RegularIcon size={28} strokeWidth={1} className='pl-1' />}
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-[225px] p-0 my-[5px] rounded-none shadow-[0_-10px_10px_-5px_rgba(0,0,0,0.1)]">
                                <div className={`flex flex-row justify-center py-[10px] h-[calc(80px*${urlObject[props.currentHazard][props.currentExposure].scenarios.length})]`}>
                                    <ItemGroup>
                                        {urlObject[props.currentHazard][props.currentExposure].scenarios.map((x) =>
                                            <Item key={x} className={`cursor-pointer my-[8px] ${scenarioMapper[props.currentScenario] === scenarioMapper[x] ? 'font-bold text-(--orange) underline underline-offset-5 decoration-2' : ""} transition-all duration-200 ease-in`} onClick={() => props.setScenario(x)}>
                                                <ItemContent>
                                                    <ItemHeader onClick={() => props.setScenario(x)}>{scenarioMapper[x]}</ItemHeader>
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
                            <Timeline props={props} />
                        </div>
                    </Card>
                </div>
                :
                <div></div>
                }
                

            </div>
        </div>
    );
};