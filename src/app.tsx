// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import {
    createContext, useContext, useState, useMemo,
    type Dispatch, type SetStateAction, type ReactNode,
} from 'react'
import { type DateRange } from "react-day-picker"


// Create a new router instance
const router = createRouter({
    routeTree
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

type Measure = { name: string; id: string }
type Threshold = { name: string; threshold: any }

type AppState = {
  currentView: string
  currentTime: number
  currentScenario: string
  currentHazard: string
  currentExposure: string
  currentMeasure: Measure
  currentThreshold: Threshold
  dateRange: any
  eventFilter: string
}

type AppActions = {
  setView: Dispatch<SetStateAction<string>>
  setTime: Dispatch<SetStateAction<number>>
  setScenario: Dispatch<SetStateAction<string>>
  setHazard: Dispatch<SetStateAction<string>>
  setExposure: Dispatch<SetStateAction<string>>
  setMeasure: Dispatch<SetStateAction<Measure>>
  setThreshold: Dispatch<SetStateAction<Threshold>>
  setDateRange: Dispatch<SetStateAction<DateRange | undefined>>
  setEventFilter: Dispatch<SetStateAction<string>>
}

export const AppStateContext = createContext<AppState | null>(null)
export const AppActionsContext = createContext<AppActions | null>(null)

export function App() {
  const [currentView, setView] = useState("Event tracking")
  const [currentTime, setTime] = useState<number>(1980)
  const [currentScenario, setScenario] = useState<string>("rcp4p5")
  const [currentHazard, setHazard] = useState<string>("Coastal Flooding")
  const [currentExposure, setExposure] = useState<string>("Population")
  const [currentMeasure, setMeasure] = useState<Measure>({ name: "Flood Level", id: "CF_PW_EXP" })
  const [currentThreshold, setThreshold] = useState<Threshold>({ name: "", threshold: "rp0005" })
  const today = new Date;
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()),
    to: (new Date)
  });
  const [eventFilter, setEventFilter] = useState<string>("All Events");

  const state = useMemo<AppState>(() => ({
    currentView, currentTime, currentScenario, currentHazard,
    currentExposure, currentMeasure, currentThreshold, dateRange,
    eventFilter
  }), [currentView, currentTime, currentScenario, currentHazard,
       currentExposure, currentMeasure, currentThreshold, dateRange, eventFilter])

  const actions = useMemo<AppActions>(() => ({
    setView, setTime, setScenario, setHazard, setExposure, setMeasure, setThreshold,
    setDateRange, setEventFilter
  }), [])


    return (
        <AppActionsContext.Provider value={actions}>
            <AppStateContext.Provider value={state}>
                <RouterProvider router={router} />
            </AppStateContext.Provider>
        </AppActionsContext.Provider>
    )
}