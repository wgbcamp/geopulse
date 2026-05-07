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
import { Options24FilledIcon } from '@/components/icons/fluent-options-24-filled'
import { Dismiss12RegularIcon } from '@/components/icons/fluent-dismiss-12-regular'
import { Calendar24RegularIcon } from '@/components/icons/fluent-calendar-24-regular'
import { Timeline } from './timeline'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from 'date-fns';

import { urlObject, scenarioMapper, measureMapper } from '@/config/datasets';

import Hamburger from '../../assets/Group 51.png'

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
    const [dataOptions, setDataOptions] = useState<boolean>(false);

    const swapTable = (hazard: string, exposure: string, threshold: object, measure: object) => {
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
        <Card className={`rounded-none w-full p-0 items-center justify-center shadow-none border-x-0 gap-0`}>
            <div className='w-full flex flex-col items-start pl-2.5 md:pl-5'>
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="flex justify-around px-3 max-w-125 gap-x-2">
                            <div>
                                <div className="font-bold text-[#707070] text-[11px] w-full">
                                    <div className='flex'>START</div>
                                </div>
                                <Button
                                    variant="outline"
                                    data-empty={!props.dateRange.from}
                                    className="w-43.75 h-9 px-4 py-2 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                                >
                                    {props.dateRange.from ? format(props.dateRange.from, "PPP") : <span>Select a date</span>}
                                </Button>
                            </div>
                            <div>
                                <div className="font-bold text-[#707070] text-[11px]">
                                    <div className='flex'>END</div>
                                </div>
                                <Button
                                    variant="outline"
                                    data-empty={!props.dateRange.to}
                                    className="w-43.75 h-9 px-4 py-2 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                                >
                                    {props.dateRange.to ? format(props.dateRange.to, "PPP") : <span>Select a date</span>}
                                </Button>
                            </div>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 my-2.5 rounded-none flex flex-row">
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
        <div className='flex fixed top-0 z-51 w-full flex-wrap 2xl:flex-nowrap '>
            <div className={`flex w-full justify-between md:justify-start bg-(--fundblue) overflow-hidden ${dataOptions ? 'h-0' : 'h-17.25'} md:h-17.25 md:w-58 `}>
                <div className='flex'>
                    <div className='flex h-17.25 w-full'>
                        <div className='relative flex items-center rounded-none h-full w-16.75 bg-(--fundblue) md:bg-(--accentdarkblue-90) text-white'>
                            <img className='absolute right-4' src={Hamburger}></img>
                            <div className='absolute text-[11px] top-9.5 right-7 font-bold'>MENU</div>
                        </div>
                    </div>
                </div>
                <div className="rounded-none flex flex-row items-center justify-start md:pl-6 font-semibold bg-(--fundblue) text-white border-none">IMF GEOPULSE</div>
                <div className={`flex items-center w-16.75 md:w-0 md:h-0 overflow-hidden justify-center bg-(--fundblue) rounded-none border-0 border-none`}>
                    <div className='h-7/10 flex items-center justify-around rounded-lg' onClick={() => setDataOptions(true)}>
                        <Options24FilledIcon className="text-white" />
                    </div>
                </div>
            </div>
                <div className={`flex justify-end 2xl:justify-start grow 2xl:grow-0 overflow-hidden ${dataOptions ? 'h-17.25' : 'h-0'} md:h-17.25 `}>
                    <div className='h-17.25 flex flex-wrap md:flex-nowrap md:w-45'>
                        <Card className={`rounded-none p-0 flex flex-col items-center justify-center gap-0 ${props.currentView !== "Event tracking" ? 'bg-[var(--unselectedview)]' : 'bg-white'} border-0`}>
                            <div className='h-full flex flex-col justify-end w-40 md:w-45'>
                                <div className="text-[11px]">REALTIME</div>
                                <div className="flex flex-row h-[35px] items-center justify-center">
                                    <Timer20RegularIcon size={26} strokeWidth={1} color={`${props.currentView !== "Event tracking" ? 'black' : 'var(--orange)'}`} />
                                    <div className="text-sm font-bold text-end flex items-center pl-0.5 cursor-pointer" onClick={() => props.setView("Event tracking")}>Event Tracking</div>
                                </div>
                            </div>
                            <div className={`h-1 w-full bg-(--orange) ${props.currentView === "Event tracking" ? "opacity-100" : "opacity-0"}`}></div>
                        </Card>
                    </div>
                    <div className='h-17.25 flex grow md:grow-0 md:w-90 2xl:w-90'>
                        <Card className={`rounded-none grow p-0 h-full flex flex-col items-center justify-end gap-0 ${props.currentView == "Event tracking" ? 'bg-(--accentblue-40)' : 'bg-white'} border-0`}>
                            <div className="text-[11px]">FORWARD LOOKING</div>
                            <div className="flex flex-end flex-col w-full ">
                                <div className="flex flex-row justify-evenly items-start w-full h-full">
                                    <div className='flex flex-col justify-end w-full cursor-pointer' onClick={() => props.setView("Grid")}>
                                        <div className="flex flex-row h-8.75 items-center justify-center">
                                            <Scales20RegularIcon size={26} strokeWidth={1} color={props.currentView === "Grid" ? "var(--orange)" : "black"} />
                                            <div className={`text-sm ${props.currentView === "Grid" ? "text-(--orange)" : "text-black"} font-bold text-end flex items-center pr-0.5`}>Grid</div>
                                        </div>
                                        <div className={`h-1 bg-(--orange) ${props.currentView === "Grid" ? "opacity-100" : "opacity-0"}`}></div>
                                    </div>
                                    <div className='w-0.5 h-8/10 bg-(--accentblue-60)'></div>
                                    <div className='flex flex-col justify-end w-full cursor-pointer' onClick={() => props.setView("Compare")}>
                                        <div className="flex flex-row h-8.75 items-center justify-center">
                                            <Globe32LightIcon size={24} strokeWidth={1} color={props.currentView === "Compare" ? "var(--orange)" : "black"} />
                                            <div className={`text-sm ${props.currentView === "Compare" ? "text-(--orange)" : "text-black"} font-bold text-end flex items-center pr-0.5 pl-1`}>Compare</div>
                                        </div>
                                        <div className={`h-1 bg-(--orange) ${props.currentView === "Compare" ? "opacity-100" : "opacity-0"}`}></div>
                                    </div>

                                </div>
                            </div>
                        </Card>
                        <div className='bg-white h-full w-10 md:w-0 flex justify-center items-center ' style={props.currentView == "Event tracking" ? { backgroundColor: "var(--accentblue-40)" } : { backgroundColor: "white" }}>
                            <Dismiss12RegularIcon size={18} onClick={() => setDataOptions(false)} />
                        </div>
                    </div>
                </div>
            
            {(props.currentView === "Compare" || props.currentView === "Grid") ?
                <div className={`flex flex-col 2xl:flex-row w-full md:w-135 2xl:w-230 md:fixed md:right-0 md:top-17.25 2xl:static ${dataOptions ? 'h-full' : 'h-0'} md:h-52 2xl:h-17.25 overflow-hidden`}>
                    <Card className="rounded-none p-0 flex flex-col h-17.25 items-center justify-center gap-0">
                        <Popover open={riskOpened} onOpenChange={handleOpenChange}>
                            <PopoverTrigger asChild>
                                <div className="flex flex-row items-center justify-between w-95/100 2xl:w-60 h-17.25 px-1.25">
                                    <div className='flex items-center justify-start cursor-pointer'>
                                        <Warning20RegularIcon size={26} strokeWidth={1} color="var(--orange)"/>
                                        <div className='flex flex-col items-start pl-1'>
                                            <div className="text-[16px] font-bold text-end flex items-center">{props.currentHazard}</div>
                                            <div className='w-28.75 h-0.5 bg-gray-300'></div>
                                            <div className="text-[16px] font-bold text-end flex items-center">{props.currentExposure}</div>
                                        </div>
                                    </div>
                                    {riskOpened ? <ChevronCircleUp20RegularIcon size={28} strokeWidth={1} className='pl-1' /> : <ChevronCircleDown20RegularIcon size={28} strokeWidth={1} className='pl-1' />}
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-75 p-0 py-5 my-1.25 rounded-none shadow-[0_-10px_10px_-5px_rgba(0,0,0,0.1)]">
                                <div className="flex flex-row justify-center">
                                    <ItemGroup>
                                        {Object.entries(urlObject).map(([key, value]) => {
                                            return <Item key={key} className={`cursor-pointer my-1 items-start ${riskState === key ? ' ' : ""} transition-all hover:duration-50 duration-200 ease-in`} onClick={() => setRiskState(key)}>
                                                <ItemContent>
                                                    <ItemHeader className={`${riskState === key ? 'font-bold' : 'font-medium'} text-[16px]`}>{key}</ItemHeader>
                                                    <div className={`${riskState === key ? `h-[calc(80px*${value.length})]` : "h-0 hidden"}`}>
                                                        {Object.entries(value).map(([a, b]) =>
                                                            <Item key={a} className={`cursor-pointer my-2 py-1.75 pl-0 ${props.currentExposure == a && riskState == props.currentHazard ? "font-extrabold text-(--orange) underline underline-offset-1.25 decoration-0.5" : "font-medium"}`} onClick={() => { () => setRiskState(key); swapTable(key, a, { name: "", threshold: Object.keys(b.threshold?.group || {})[0] }, { id: b.measure[0], name: measureMapper[b.measure[0]] }); }}>
                                                                <ItemContent>
                                                                    <ItemHeader>{a}</ItemHeader>
                                                                </ItemContent>
                                                            </Item>
                                                        )}
                                                    </div>
                                                </ItemContent>
                                                {riskState == key ? <ChevronUpIcon /> : <ChevronDownIcon />}

                                            </Item>
                                        })}
                                    </ItemGroup>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </Card>
                    <Card className="rounded-none p-0 flex flex-col items-center justify-center gap-0 h-17.25 2xl:w-40">
                        <Popover open={scenarioOpened} onOpenChange={() => setScenarioOpened(!scenarioOpened)}>
                            <PopoverTrigger asChild>
                                <div className="flex flex-row items-center w-95/100 h-17.25 px-1.25 justify-between cursor-pointer">
                                    <div className='flex items-center'>
                                        <Layer20RegularIcon size={26} strokeWidth={1} color="var(--orange)" />
                                        <div className="text-[16px] font-bold text-end flex items-center">{scenarioMapper[props.currentScenario]}</div>
                                    </div>
                                    {scenarioOpened ? <ChevronCircleUp20RegularIcon size={28} strokeWidth={1} className='pl-1' /> : <ChevronCircleDown20RegularIcon size={28} strokeWidth={1} className='pl-1' />}
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-56.25 p-0 my-1.25 rounded-none shadow-[0_-10px_10px_-5px_rgba(0,0,0,0.1)]">
                                <div className={`flex flex-row justify-center py-2.5 h-[calc(80px*${urlObject[props.currentHazard][props.currentExposure].scenarios.length})]`}>
                                    <ItemGroup>
                                        {urlObject[props.currentHazard][props.currentExposure].scenarios.map((x) =>
                                            <Item key={x} className={`cursor-pointer my-2 ${scenarioMapper[props.currentScenario] === scenarioMapper[x] ? 'font-bold text-(--orange) underline underline-offset-1.25 decoration-0.5' : ""} transition-all duration-200 ease-in`} onClick={() => props.setScenario(x)}>
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
                    <Card className='rounded-none flex flex-row gap-0 pl-5 h-17.25 2xl:w-110'>
                        <Calendar24RegularIcon size={26} strokeWidth={1} color="var(--orange)"/>
                        <div className="h-full flex items-center justify-start pl-14">
                            <Timeline props={props} />
                        </div>
                    </Card>
                </div>
                :
                <div></div>
            }
            {props.currentView === "Event tracking" ?
                <div className={`flex ${dataOptions ? 'h-17.25' : 'h-0'} overflow-hidden md:h-17.25 w-full md:w-135 order-last md:fixed md:right-0 md:top-17.25 2xl:static 2xl:order-0`}>
                    {calendarComponent}
                </div>
                :
                null}
            
        </div>
    );
};