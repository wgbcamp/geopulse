import * as React from "react"
import { useState } from 'react';

import '../../data/isoCountries';

import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { isoCountries, type CountryString, countryByIso3 } from "@/data/isoCountries";

type ComboBoxProps = {
  loadCountryData(iso3: string): Promise<void>,
  iso3: string,
  setIso3: React.Dispatch<React.SetStateAction<string>>
}

export const ComboBox = ({ iso3, setIso3 }: ComboBoxProps) => {

    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between dark"
                >
                { countryByIso3[iso3] } 
                <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 dark">
            <Command>
              <CommandInput placeholder="Search country..." className="h-9" />
              <CommandList>
                <CommandEmpty>Country not found.</CommandEmpty>
                <CommandGroup>
                  {isoCountries.map((country) => (
                    <CommandItem
                      key={country.iso3}
                      value={country.name}
                      onSelect={() => {
                        setOpen(false)
                        setIso3(country.iso3)
                      }}
                    >
                      {country.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          iso3 === country.iso3 ? "opacity-100" : "opacity-0"
                        )}
                        />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
    )
}