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
import { Options24FilledIcon } from '@/components/icons/fluent-options-24-filled'
import { Dismiss12RegularIcon } from '@/components/icons/fluent-dismiss-12-regular'
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
            <div className='w-full flex flex-col items-start'>
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
        <div className={`flex fixed top-0 z-51 w-full flex-wrap 2xl:flex-nowrap ${dataOptions ? '' : 'overflow-hidden h-14.75'} md:h-[unset]`}>
            <div className={`flex w-full justify-between md:justify-start bg-(--fundblue) ${dataOptions ? 'h-0' : 'h-14.75'} overflow-hidden md:h-14.75 md:w-58 `}>
                <div className='flex'>
                    <div className='flex h-14.75 w-full'>
                        <div className='relative flex items-center rounded-none h-full w-16.75 bg-(--fundblue) md:bg-(--accentdarkblue-90) text-white'>
                            <img className='absolute right-4' src={Hamburger}></img>
                            <div className='absolute text-[11px] top-8.5 right-6.5 font-bold'>MENU</div>
                        </div>
                    </div>
                </div>
                <div className="rounded-none w-full flex flex-row items-center justify-center font-semibold bg-(--fundblue) text-white border-none">
                    <div>IMF GEOPULSE</div>
                </div>
                <div className={`flex items-center w-16.75 md:w-0 md:h-0 overflow-hidden justify-center bg-(--fundblue) rounded-none border-0 border-none`}>
                    <div className='h-7/10 flex items-center justify-around rounded-lg' onClick={() => setDataOptions(true)}>
                        <Options24FilledIcon className="text-white" />
                    </div>
                </div>
            </div>
            {/* <div className={`flex justify-end 2xl:justify-start grow 2xl:grow-0 overflow-hidden ${dataOptions ? 'h-14.75' : 'h-0'} md:h-14.75 `}> */}
            <div className='h-14.75 flex flex-wrap md:flex-nowrap md:w-44'>
                <Card className={`rounded-none p-0 flex flex-col items-center justify-center gap-0 ${props.currentView !== "Event tracking" ? 'bg-[var(--unselectedview)]' : 'bg-white'} border-0`}>
                    <div className='h-full flex flex-col justify-end w-40 md:w-44'>
                        <div className="text-[11px]">REAL-TIME</div>
                        <div className="flex flex-row h-[35px] items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.537 9.99983C18.537 14.7074 14.7075 18.5372 10.0003 18.5372C5.29321 18.5372 1.463 14.7074 1.463 9.99983C1.463 5.2923 5.29287 1.46244 10.0003 1.46244C11.7447 1.46244 13.4073 1.98621 14.815 2.95286L13.1275 3.19924L13.3392 4.64652L17.3756 4.05635L16.7835 0.0202228L15.3363 0.232225L15.5483 1.67748C13.9192 0.586124 12.0042 0 9.99966 0C4.48571 0 0 4.48643 0 10.0002C0 15.5142 4.48638 20 10.0003 20C15.5143 20 20 15.5139 20 9.99983H18.537ZM7.43361 3.65628L6.0852 4.22286L9.25182 11.7565L16.7859 8.58929L16.2197 7.24077L10.0334 9.84142L7.43361 3.65628Z" fill={`${props.currentView !== "Event tracking" ? 'black' : 'var(--orange)'}`} />
                            </svg>
                            <div className={`text-sm font-bold text-end flex items-center pl-1 cursor-pointer ${props.currentView !== "Event tracking" ? 'text-red' : 'text-(--orange)'}`} onClick={() => props.setView("Event tracking")}>Event Tracking</div>
                        </div>
                    </div>
                    <div className={`h-1 w-full bg-(--orange) ${props.currentView === "Event tracking" ? "opacity-100" : "opacity-0"}`}></div>
                </Card>
            </div>
            {props.currentView === "Event tracking" ?
                <div className={`flex ${dataOptions ? 'h-14.75' : 'h-0'} overflow-hidden md:h-14.75 w-full md:w-192 2xl:w-95 order-1 2xl:order-0`}>
                    {calendarComponent}
                </div>
                :
                null}
            <div className='h-14.75 flex grow md:grow-0 md:w-90'>
                <Card className={`rounded-none grow p-0 h-full flex flex-col items-center justify-end gap-0 ${props.currentView == "Event tracking" ? 'bg-(--accentblue-40)' : 'bg-white'} border-0`}>
                    <div className="text-[11px]">FORWARD LOOKING</div>
                    <div className="flex flex-end flex-col w-full ">
                        <div className="flex flex-row justify-evenly items-start w-full h-full">
                            <div className='flex flex-col justify-end w-full cursor-pointer' onClick={() => props.setView("Grid")}>
                                <div className="flex flex-row h-8.75 items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.67078 0.396729C1.86271 0.396729 0.396973 1.86246 0.396973 3.67054V16.3293C0.396973 18.1373 1.86271 19.6031 3.67078 19.6031H16.3295C18.1376 19.6031 19.6033 18.1373 19.6033 16.3293V3.67054C19.6033 1.86246 18.1376 0.396729 16.3295 0.396729H3.67078ZM16.3295 1.70625C17.4144 1.70625 18.2938 2.58569 18.2938 3.67054V4.3253L1.7065 4.3253V3.67054C1.7065 2.58569 2.58594 1.70625 3.67078 1.70625H16.3295ZM1.7065 5.63482L18.2938 5.63482V14.365L1.7065 14.365V5.63482ZM1.7065 16.3293V15.6745L18.2938 15.6745V16.3293C18.2938 17.4141 17.4144 18.2936 16.3295 18.2936H3.67078C2.58594 18.2936 1.7065 17.4141 1.7065 16.3293ZM13.9985 9.34514H6.00186L6.7792 8.47062C7.01945 8.20035 6.9951 7.78649 6.72483 7.54625C6.45455 7.30601 6.0407 7.33035 5.80045 7.60062L4.05442 9.56491C3.83391 9.81299 3.83391 10.1868 4.05442 10.4349L5.80045 12.3992C6.0407 12.6695 6.45455 12.6938 6.72483 12.4536C6.9951 12.2133 7.01945 11.7995 6.7792 11.5292L6.00184 10.6547H13.9985L13.2211 11.5292C12.9809 11.7995 13.0052 12.2133 13.2755 12.4536C13.5458 12.6938 13.9596 12.6695 14.1999 12.3992L15.9459 10.4349L15.9551 10.4243C16.047 10.3165 16.1045 10.1785 16.1107 10.0272C16.1114 10.0097 16.1115 9.99207 16.1108 9.9745C16.1048 9.8165 16.0427 9.67284 15.944 9.5628L14.1999 7.60062C13.9596 7.33035 13.5458 7.30601 13.2755 7.54625C13.0052 7.78649 12.9809 8.20035 13.2211 8.47062L13.9985 9.34514Z" fill={`${props.currentView === "Grid" ? "var(--orange)" : "black"}`} />
                                    </svg>
                                    <div className={`text-sm ${props.currentView === "Grid" ? "text-(--orange)" : "text-black"} font-bold text-end flex items-center pl-1 pr-0.5`}>Grid</div>
                                </div>
                                <div className={`h-1 bg-(--orange) ${props.currentView === "Grid" ? "opacity-100" : "opacity-0"}`}></div>
                            </div>
                            <div className='w-0.5 h-8/10 bg-(--accentblue-60)'></div>
                            <div className='flex flex-col justify-end w-full cursor-pointer' onClick={() => props.setView("Compare")}>
                                <div className="flex flex-row h-8.75 items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.4219 16.4062C13.1641 14.9219 13.6719 12.8516 13.75 10.625H6.25C6.32812 12.8516 6.875 14.9219 7.61719 16.4062C8.47656 18.1641 9.41406 18.75 10 18.75C10.625 18.75 11.5234 18.1641 12.4219 16.4062ZM13.75 9.375C13.6719 7.14844 13.1641 5.11719 12.4219 3.59375C11.5234 1.83594 10.625 1.25 10 1.25C9.41406 1.25 8.47656 1.83594 7.61719 3.59375C6.875 5.11719 6.32812 7.14844 6.25 9.375H13.75ZM15 10.625C14.8828 13.7109 13.9844 16.6016 12.6953 18.3203C16.0156 17.2656 18.4766 14.2578 18.7109 10.625H15ZM18.7109 9.375C18.4766 5.78125 16.0156 2.77344 12.6953 1.67969C13.9844 3.39844 14.8828 6.28906 15 9.375H18.7109ZM5 9.375C5.11719 6.28906 6.01562 3.39844 7.30469 1.67969C3.98438 2.77344 1.52344 5.78125 1.28906 9.375H5ZM1.28906 10.625C1.52344 14.2578 3.98438 17.2656 7.30469 18.3203C6.01562 16.6016 5.11719 13.7109 5 10.625H1.28906ZM10 20C4.49219 20 0 15.5078 0 10C0 4.49219 4.49219 0 10 0C15.5078 0 20 4.49219 20 10C20 15.5078 15.5078 20 10 20Z" fill={`${props.currentView === "Compare" ? "var(--orange)" : "black"}`} />
                                    </svg>
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
            {/* </div> */}

            {(props.currentView === "Compare" || props.currentView === "Grid") ?
                <div className={`flex flex-col 2xl:flex-row w-full md:w-192 2xl:w-230 ${dataOptions ? 'h-full' : 'h-0'} md:h-52 2xl:h-14.75 overflow-hidden`}>
                    <Card className="rounded-none p-0 flex flex-col h-14.75 items-center justify-center gap-0 2xl:px-2">
                        <Popover open={riskOpened} onOpenChange={handleOpenChange}>
                            <PopoverTrigger asChild>
                                <div className="flex flex-row items-center justify-between w-95/100 2xl:w-60 h-14.75 ">
                                    <div className='flex items-center justify-start cursor-pointer'>
                                        <svg id="hazardIcon" width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.0781 0C10.625 0 11.1719 0.3125 11.4453 0.820312L19.8828 16.4453C20.1172 16.9141 20.1172 17.5 19.8438 18.0078C19.5703 18.4766 19.0625 18.75 18.5156 18.75H1.64062C1.05469 18.75 0.546875 18.4766 0.273438 18.0078C0 17.5 0 16.9141 0.234375 16.4453L8.67188 0.820312C8.94531 0.3125 9.49219 0 10.0781 0ZM10.0781 1.25C9.96094 1.25 9.84375 1.32812 9.80469 1.40625L1.36719 17.0312C1.28906 17.1484 1.28906 17.2656 1.36719 17.3438C1.40625 17.4609 1.52344 17.5 1.64062 17.5H18.5156C18.5938 17.5 18.7109 17.4609 18.7891 17.3438C18.8281 17.2656 18.8281 17.1484 18.7891 17.0312L10.3516 1.40625C10.2734 1.32812 10.1953 1.25 10.0781 1.25ZM10.0781 15.625C9.53125 15.625 9.14062 15.1953 9.14062 14.6875C9.14062 14.1797 9.53125 13.75 10.0781 13.75C10.5859 13.75 11.0156 14.1797 11.0156 14.6875C11.0156 15.1953 10.5859 15.625 10.0781 15.625ZM10.0781 6.875C10.5859 6.875 11.0156 7.34375 10.9766 7.85156L10.7031 11.9141C10.6641 12.2656 10.3906 12.5 10.0781 12.5C9.72656 12.5 9.45312 12.2656 9.45312 11.9141L9.14062 7.85156C9.10156 7.34375 9.53125 6.875 10.0781 6.875Z" fill='var(--orange)' />
                                        </svg>

                                        <div className='flex flex-col items-start pl-2'>
                                            <div className="text-[16px] font-bold text-end flex items-center">{props.currentHazard}</div>
                                            <div className='w-28.75 h-0.5 bg-gray-300'></div>
                                            <div className="text-[16px] font-bold text-end flex items-center">{props.currentExposure}</div>
                                        </div>
                                    </div>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g transform={`rotate(${riskOpened ? "180" : "0"}, 10, 10)`}>
                                            <path d="M10 18.75C14.8438 18.75 18.75 14.8438 18.75 10C18.75 5.15625 14.8438 1.25 10 1.25C5.15625 1.25 1.25 5.15625 1.25 10C1.25 14.8438 5.15625 18.75 10 18.75ZM10 0C15.5078 0 20 4.49219 20 10C20 15.5078 15.5078 20 10 20C4.49219 20 0 15.5078 0 10C0 4.49219 4.49219 0 10 0ZM5.19531 9.17969C4.96094 8.94531 4.96094 8.55469 5.19531 8.32031C5.42969 8.08594 5.82031 8.08594 6.05469 8.32031L10 12.2266L13.9453 8.32031C14.1797 8.08594 14.5703 8.08594 14.8047 8.32031C15.0781 8.55469 15.0781 8.94531 14.8047 9.17969L10.4297 13.5547C10.1953 13.8281 9.80469 13.8281 9.57031 13.5547L5.19531 9.17969Z" fill="black" />
                                        </g>
                                    </svg>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-75 p-0 py-5 my-1.25 rounded-none shadow-[0_-10px_10px_-5px_rgba(0,0,0,0.1)]">
                                <div className="mx-3">
                                    <ItemGroup>
                                        {Object.entries(urlObject).map(([key, value]) => {
                                            return <Item key={key} className={`cursor-pointer my-1 items-center ${riskState === key ? ' ' : ""} transition-all hover:duration-50 duration-200 ease-in`} onClick={() => setRiskState(key)}>
                                                <ItemContent>
                                                    <div className='flex items-center'>
                                                        <ItemHeader className={`${riskState === key ? 'font-bold' : 'font-medium'} text-[16px]`}>{key}</ItemHeader>
                                                        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g transform={`rotate(${riskState === key ? "180" : "0"}, 4, 2.5)`}>
                                                                <path d="M3.69141 4.27148L0.175781 0.755859C0 0.597656 0 0.333984 0.175781 0.158203C0.333984 0 0.597656 0 0.773438 0.158203L3.99023 3.375L7.20703 0.158203C7.36523 0 7.62891 0 7.78711 0.158203C7.96289 0.316406 7.96289 0.597656 7.78711 0.755859L4.27148 4.27148C4.11328 4.42969 3.84961 4.42969 3.69141 4.27148Z" fill="black" />
                                                            </g>
                                                        </svg>
                                                    </div>
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
                                            </Item>
                                        })}
                                    </ItemGroup>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </Card>
                    <Card className="rounded-none p-0 flex flex-col items-center justify-center gap-0 h-14.75 2xl:w-40 2xl:px-2">
                        <Popover open={scenarioOpened} onOpenChange={() => setScenarioOpened(!scenarioOpened)}>
                            <PopoverTrigger asChild>
                                <div className="flex flex-row items-center w-95/100 h-14.75 justify-between cursor-pointer">
                                    <div className='flex items-center'>
                                        <svg id="scenariosIcon" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.3906 1.40625C10.1562 1.28906 9.84375 1.28906 9.60938 1.40625L1.67969 5.07812L9.60938 8.75C9.84375 8.86719 10.1562 8.86719 10.3906 8.75L18.3203 5.07812L10.3906 1.40625ZM10.9375 0.273438L19.4531 4.21875C19.8047 4.375 20 4.72656 20 5.07812C20 5.42969 19.8047 5.78125 19.4531 5.9375L10.9375 9.88281C10.3516 10.1562 9.64844 10.1562 9.10156 9.88281L0.546875 5.9375C0.195312 5.78125 0 5.42969 0 5.07812C0 4.72656 0.195312 4.375 0.546875 4.21875L9.10156 0.273438C9.64844 0 10.3516 0 10.9375 0.273438ZM1.875 8.59375L3.35938 9.29688L1.67969 10.0781L9.60938 13.75C9.84375 13.8672 10.1562 13.8672 10.3906 13.75L18.3203 10.0781L16.6406 9.29688L18.125 8.59375L19.4531 9.21875C19.8047 9.375 20 9.72656 20 10.0781C20 10.4297 19.8047 10.7812 19.4531 10.9375L10.9375 14.8828C10.3516 15.1562 9.64844 15.1562 9.10156 14.8828L0.546875 10.9375C0.195312 10.7812 0 10.4297 0 10.0781C0 9.72656 0.195312 9.375 0.546875 9.21875L1.875 8.59375ZM0.546875 14.2188L1.875 13.5938L3.35938 14.2969L1.67969 15.0781L9.60938 18.75C9.84375 18.8672 10.1562 18.8672 10.3906 18.75L18.3203 15.0781L16.6406 14.2969L18.125 13.5938L19.4531 14.2188C19.8047 14.375 20 14.7266 20 15.0781C20 15.4297 19.8047 15.7812 19.4531 15.9375L10.9375 19.8828C10.3516 20.1562 9.64844 20.1562 9.10156 19.8828L0.546875 15.9375C0.195312 15.7812 0 15.4297 0 15.0781C0 14.7266 0.195312 14.375 0.546875 14.2188Z" fill="var(--orange)" />
                                        </svg>
                                        <div className="text-[16px] font-bold text-end flex items-center pl-2">{scenarioMapper[props.currentScenario]}</div>
                                    </div>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g transform={`rotate(${scenarioOpened ? "180" : "0"}, 10, 10)`}>
                                            <path d="M10 18.75C14.8438 18.75 18.75 14.8438 18.75 10C18.75 5.15625 14.8438 1.25 10 1.25C5.15625 1.25 1.25 5.15625 1.25 10C1.25 14.8438 5.15625 18.75 10 18.75ZM10 0C15.5078 0 20 4.49219 20 10C20 15.5078 15.5078 20 10 20C4.49219 20 0 15.5078 0 10C0 4.49219 4.49219 0 10 0ZM5.19531 9.17969C4.96094 8.94531 4.96094 8.55469 5.19531 8.32031C5.42969 8.08594 5.82031 8.08594 6.05469 8.32031L10 12.2266L13.9453 8.32031C14.1797 8.08594 14.5703 8.08594 14.8047 8.32031C15.0781 8.55469 15.0781 8.94531 14.8047 9.17969L10.4297 13.5547C10.1953 13.8281 9.80469 13.8281 9.57031 13.5547L5.19531 9.17969Z" fill="black" />
                                        </g>
                                    </svg>
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
                    <div className='2xl:w-92 flex justify-center bg-white'>
                        <div className='rounded-none flex flex-row items-center gap-0 h-14.75 w-95/100'>
                            <div className="h-full flex items-center justify-start pl-14">
                                <Timeline props={props} />
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div></div>
            }


        </div>
    );
};