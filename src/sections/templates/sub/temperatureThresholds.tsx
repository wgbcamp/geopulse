import React from 'react'

import {
  Item,
  ItemContent,
} from "@/components/ui/item"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type InequalityGroup = {
    currentExposureFilter: {name: string, measures: string[]},
    setExposureFilter: React.Dispatch<React.SetStateAction<{name: string, measures: string[]}>>
    thresholds: {category: string, symbols: string[]}[],
    headerState: boolean,
    setCurrentThreshold: React.Dispatch<React.SetStateAction<{name: string, threshold: string}>>
}    

export const InequalityGroup = ({headerState, thresholds, currentExposureFilter, setExposureFilter, setCurrentThreshold} : InequalityGroup) => {

  const handleValueChange = (value: string) => {
    setCurrentThreshold({name: currentExposureFilter.name, threshold: value})
  }

    return (
      <Item className='w-65 pt-0'>
        <div className='w-full flex items-center'>
        </div>  
        {headerState == false
          ?
          <div>{currentExposureFilter.name === "Hot Days" ?
            <RadioGroup onValueChange={handleValueChange}>
              {thresholds.filter(i => i.category === currentExposureFilter.name)[0].symbols.map((i, index) => 
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={i} id={i} />
                  <Label htmlFor={i}>{currentExposureFilter.name} {'>'} {i}</Label>
                </div>
              )}
            </RadioGroup>
            : currentExposureFilter.name === "Tropical Nights" ? 
            <RadioGroup onValueChange={handleValueChange}>
              {thresholds.filter(i => i.category === currentExposureFilter.name)[0].symbols.map((i, index) => 
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={i} id={i} />
                  <Label htmlFor={i}>{currentExposureFilter.name} {'>'} {i}</Label>
                </div>
              )}
            </RadioGroup>
            : currentExposureFilter.name === "Icing Days" ?
              <RadioGroup onValueChange={handleValueChange}>
              {thresholds.filter(i => i.category === currentExposureFilter.name)[0].symbols.map((i, index) => 
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={i} id={i} />
                  <Label htmlFor={i}>{currentExposureFilter.name} {'>'} {i}</Label>
                </div>
              )}
            </RadioGroup>
            :
            null
          }
          </div>
          :
          <RadioGroup defaultValue="option-one" className='flex'>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Placeholder</Label>
            </div>
          </RadioGroup>
        }
      </Item>
    )
  }