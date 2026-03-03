import * as React from "react"
import { useState } from 'react';

import '../../../data/isoCountries';

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

import { isoCountries, type CountryString } from "@/data/isoCountries";

type ComboBoxProps = {
  loadCountryData(value: CountryString): Promise<void>,
  setSubnationalName(value: string): void,
  iso3: string
}

export const ComboBox = ({ loadCountryData, iso3 }: ComboBoxProps) => {

    const [open, setOpen] = React.useState(false);
    const [selectedCountry, setCountry] = React.useState<CountryString>({iso3: "", name: ""});

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between dark"
                >
                { selectedCountry.name !== "" ? selectedCountry.name : isoCountries.find((country) => country.iso3 == iso3)?.name } 
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
                        loadCountryData(country)
                        setOpen(false)
                        setCountry(country)
                      }}
                    >
                      {country.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          selectedCountry.name === country.name ? "opacity-100" : "opacity-0"
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