import React, { useEffect } from 'react';
import { ComboBox } from './sub/comboBox';

import {
    Card,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import { MapsChart } from '@highcharts/react/Maps';

import { MapSeries } from '@highcharts/react/series/Map';
import {
    Chart,
    Series,
    Title,
    Subtitle,
    YAxis,
    XAxis,
    Legend,
    Credits,
    Highcharts
} from '@highcharts/react';

import { 
    type JsonShape, 
    type SeriesT, 
    type RegionSeries,
    type AreaSeries
} from '../../App';

export type Filters = {
    currentTime: {
        time: number,
        url: string
    },
    currentScenario: string,
    country: {
      type: string,
      features: {}[],
      name: string,
      iso3: string
    }[],
    setCountry: React.Dispatch<React.SetStateAction<{
        type: string,
        features: {}[],
        name: string,
        iso3: string
    }[]>>,
    mapPolygon: JsonShape,
    position: any,
    series: SeriesT,
    setSeries: React.Dispatch<React.SetStateAction<SeriesT>>,
    exposureState: Array<Array<[string, number, number, string, string, string]>>,
    setExposureState: React.Dispatch<React.SetStateAction<Array<Array<[string, number, number, string, string, string]>>>>,
    maxValue: {measure: string, value: number}[][],
    setMaxValue: React.Dispatch<React.SetStateAction<{measure: string, value: number}[][]>>,
    regionExposure: RegionSeries,
    setRegionExposure: React.Dispatch<React.SetStateAction<RegionSeries>>,
    areaSeries: AreaSeries,
    setAreaSeries: React.Dispatch<React.SetStateAction<AreaSeries>>,
    currentExposure: string
    setExposure: React.Dispatch<React.SetStateAction<string>>,
    currentHazard: string,
    setHazard: React.Dispatch<React.SetStateAction<string>>,
    progressBar: [number, number],
    setProgressBar: React.Dispatch<React.SetStateAction<[number, number]>>,
    progressTarget: [number, number],
    setProgressTarget: React.Dispatch<React.SetStateAction<[number, number]>>
    currentExposureFilter: {name: string, measure: string},
    setExposureFilter: React.Dispatch<React.SetStateAction<{name: string, measure: string}>>
}

type DataString = {
    alpha3: string,
    name: string,
};

type ExposureShape = [string, number, number, string, string, string][];

export const Region = ({
    currentTime, 
    currentScenario, 
    country, 
    setCountry, 
    mapPolygon, 
    position, 
    series, 
    setSeries, 
    exposureState, 
    setExposureState,
    maxValue,
    setMaxValue,
    // regionExposure,
    // setRegionExposure,
    areaSeries,
    setAreaSeries,
    currentExposure,
    setExposure,
    currentHazard,
    setHazard,
    progressBar,
    setProgressBar,
    progressTarget,
    setProgressTarget,
    currentExposureFilter,
    setExposureFilter
}: Filters) => {

    var exposure: ExposureShape = [];
    var gadm0exposure: RegionSeries = [];

    Highcharts.setOptions({
    chart: {
        backgroundColor: 'transparent',
        plotBackgroundColor: 'transparent',
            style: {
              color: '#ffffff',
              fontFamily: 'Arial'
            },
    }
});

    useEffect(() => {
            applyFilter();
    }, [exposureState, currentTime, currentScenario, currentExposureFilter]);

    useEffect(() => {
        var data = {name: "", alpha3: ""};
        if (country[position].name !== "string" && country[position].iso3 !== "string") {
            data.name = country[position].name;
            data.alpha3 = country[position].iso3;
            loadGeoJson(data);
        }
    }, [currentHazard, currentExposure]);

    useEffect(() => { 
        var defaultCountries = [
            {name: "Costa Rica", alpha3: "CRI"},
            {name: "Bangladesh", alpha3: "BGD"}
        ];
        var data = { name: defaultCountries[position].name, alpha3: defaultCountries[position].alpha3 };
        loadGeoJson(data);
    }, []);



    var loadGeoJson = async (data: DataString) => {

        const updateProgressBar = (position: number) => {
            setProgressBar(prev => {
                const next: [number, number] = [...prev];
                next[position] = 0;
                return next;
            })
        }
        updateProgressBar(position);

        const updateProgressTarget = (position: number) => {
            setProgressTarget(prev => {
                const next: [number, number] = [...prev];
                next[position] = 0;
                return next;
            })
        }
        updateProgressTarget(position);

        var temp = {
            type: "FeatureCollection",
            features: [{}],
            name: data.name,
            iso3: data.alpha3
        };
        console.log(mapPolygon);
        for (var i = 0; i < mapPolygon.features.length; i++) {
            if (data.alpha3 == mapPolygon.features[i].properties.GID_0) {
                temp.features.push(mapPolygon.features[i]);
            }
        }

        const updateCountryGeo = (position: number) => {
            const newItems = country;
            newItems.splice(position, 1, temp);
            setCountry(newItems);
        }

        console.log(country)
        updateCountryGeo(position);
        return test(temp);
    }

    type ObjectID = {
      objectIds: number
    };

    type CountryData = {
        type: string,
        features: {}[],
        name: string,
        iso3: string
    }

    type TableArray = Array<{
        features: Array<{
            attributes: {
                NAME_1: string,
                Reference_area_name: string,
                MEDIAN: number,
                period: number,
                scenario: string,
                Admin_Filter: string,
                [key: string]: string | number,
                Reference_area: string,
                MEASURE: string
            }
        }>
    }>;

    async function test(countryData: CountryData) {

        const whereClause = `ADMIN_FILTER IN ('adm0', 'adm1') AND ISO3 IN ('${countryData.iso3}')`;
        var queryString = `where=${encodeURIComponent(whereClause)}`;
        
        const urlObject = [
            {
                hazard: "Riverine Flooding",
                exposure: "Population",
                url: `https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/riverine_population_table/FeatureServer/0/query?${queryString}`,
            },
            { 
                hazard: "Draught", 
                exposure: "Cropland", 
                url: `https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/draught_cropland_table/FeatureServer/0/query?${queryString}`,
            },
            { 
                hazard: "Temperature Extremes", 
                exposure: "Population",
                url: `https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/temperature_population_table/FeatureServer/0/query?${queryString}`,
            },
            { 
                hazard: "Temperature Extremes", 
                exposure: "Livestock", 
                url: `https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/temperature_livestock_table/FeatureServer/0/query?${queryString}`, 
            }
        ];

        let url = "";
        let outFields = "";

        urlObject.forEach((item) => {
            if (item.hazard === currentHazard && item.exposure === currentExposure) {
                url = item.url;
                outFields = 'ADMIN_FILTER,MEDIAN,REF_AREA_NAME,ISO3,TIME_PERIOD,CLIMATE_SCENARIO,MEASURE,REF_AREA';
            }
        });

        console.log(queryString);
        console.log(url);

        const parameters = new URLSearchParams({
            returnIdsOnly: 'true',
            cacheHint: 'true',
            f: 'json'
        });

        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: parameters
        });
        var x = await result.json();
        console.log(x);

        const updateProgressTarget = (position: number) => {
            setProgressTarget(prev => {
                const next = prev;
                next[position] = x.objectIds.length;
                return next;
            })
        }
        updateProgressTarget(position);

        var y = x.objectIds.filter((value: ObjectID) => value);
        console.log(y);
        console.log(y.join(","));

        var resultAmount = 0;

        type SliceNumber = {
            start: number,
            end: number
        };

        var tableData: TableArray = [];

        function counter({ start, end }: SliceNumber) {

            const params = new URLSearchParams({
                objectIds: y.slice(start, end).join(","),
                outFields: outFields,
                f: 'json',
                maxRecordCountFactor: '5'
            });

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    console.log(end);
                    tableData.push(data);
                    resultAmount += data.features.length;
                    console.log(tableData);
                    console.log(tableData.length);
                    console.log(resultAmount);
                    if (resultAmount < y.length) {
                        counter({ start: resultAmount, end: resultAmount + 10000 });
                    } else {
                        sumWeightedExposure(tableData);
                        // console.log(country);
                        console.log(tableData[0].features[0].attributes);
                    }

                    const updateProgressBar = (position: number) => {
                        setProgressBar(prev => {
                            const next = prev;
                            next[position] = resultAmount;
                            return next;
                        })
                    }
                    updateProgressBar(position);
                });

                console.log(tableData);
        }

        counter({ start: 0, end: 10000 });
    }

    var tempMaxValue: {measure: string, value: number}[];
    var tempPeriods: number[];
    // var tempGadm0: AreaSeries = [[]];
    let tempGadm0: { data: number[]; name: string; measure: string[] }[] = [];
    var lineChartOrder = [
        {period: 1980, position: 0},
        {period: 2030, position: 1},
        {period: 2050, position: 2},
        {period: 2080, position: 3}
    ];
    var scenarioModel = [
        {scenario: 'rcp4p5', name: 'Orderly trajectory'},
        {scenario: 'rcp8p5', name: 'Disorderly trajectory'},
        {scenario: 'SSP126', name: 'Orderly trajectory'},
        {scenario: 'SSP245', name: 'Disorderly trajectory'},
        {scenario: 'SSP370', name: 'Hot House'}  
    ];

    var measureModel = [ 
        { hazard: "Draught", exposure: "Cropland", measure: ["CDD_CROP_EXP", "SPEI_CROP_EXP"]},
        { hazard: "Temperature Extremes", exposure: "Population", measure: ["HD_PW_EXP", "TN_PW_EXP", "ID_PW_EXP"]},
        { hazard: "Temperature Extremes", exposure: "Livestock", measure: ["HD_LW_EXP"]},
        // { hazard: "Riverine Flooding", exposure: "Population", measure: ["RF_PW_EXP"]}
    ];

    const sumWeightedExposure = async (tableData: TableArray) => {
        tempMaxValue = [];
        tempPeriods = [];
        console.log(tableData);

        // loop through tableData
        tableData.forEach((parent) => {
            // loop through each feature property
            parent.features.forEach((entry) => {
                // find attributes keys
                var a = Object.keys(entry.attributes);
                // execute code if gadm1 is found (subnational)
                if (entry.attributes[a[0]] === "adm1") {
                    // update tempMaxValue for colorAxis range
                    if (!tempMaxValue.some(maxObject => maxObject.measure === entry.attributes[a[6]] as string)) {
                        tempMaxValue.push({ measure: entry.attributes[a[6]] as string, value: entry.attributes[a[1]] as number });
                    } else {
                        tempMaxValue.forEach((maxObject) => {
                            if (maxObject.measure === entry.attributes[a[6]]) {
                                if (maxObject.value < Number(entry.attributes[a[1]])) {
                                    maxObject.value = Number(entry.attributes[a[1]]);
                                }
                            }
                        })
                    }
                    var b = false;
                    if (exposure.length > 0) {
                        // loop through exposure array
                        exposure.forEach((exposureElement) => {
                            // if exposure measure value equals entry measure value, add value
                            if (exposureElement[0] === entry.attributes[a[7]]
                                && exposureElement[2] === entry.attributes[a[4]]
                                && exposureElement[3] === entry.attributes[a[5]]
                            ) {
                                exposureElement[1] += entry.attributes[a[1]] as number;
                                b = true;
                            }
                        })
                    }
                    // push entry array values into exposure array, if entry doesn't already exist
                    if (b === false) {
                        exposure.push([
                            entry.attributes[a[2]] as string, //reference area name
                            entry.attributes[a[1]] as number, //median value
                            entry.attributes[a[4]] as number, // time period
                            entry.attributes[a[5]] as string,  //scenario
                            entry.attributes[a[7]] as string, //reference area
                            entry.attributes[a[6]] as string //measure
                        ])
                    }
                    // filter down to gadm0 values (national)
                } else if (entry.attributes[a[0]] === "adm0") {
                    // loop through scenario model
                    scenarioModel.forEach((item) => {
                        // reference matching scenario from scenarioModel object
                        if (item.scenario === entry.attributes[a[5]]) {
                            if (!tempGadm0.some((gadm0Object) => gadm0Object.name === item.name && gadm0Object.measure.includes(entry.attributes[a[6]].toString()))) {
                                lineChartOrder.forEach((index) => {
                                    if (index.period === entry.attributes[a[4]]) {
                                        const data = [0, 0, 0, 0];
                                        data[index.position] = entry.attributes[a[1]] as number;
                                        tempGadm0.push({ data, name: item.name, measure: [entry.attributes[a[6]] as string] });
                                    }
                                })
                            } else {
                                tempGadm0.forEach((gadm0Object) => {
                                    if (gadm0Object.name === item.name && gadm0Object.measure.includes(entry.attributes[a[6]].toString())) {
                                        lineChartOrder.forEach((index) => {
                                            if (index.period === entry.attributes[a[4]]) {
                                                gadm0Object.data.splice(index.position, 1, entry.attributes[a[1]] as number);
                                                if (!gadm0Object.measure.includes(entry.attributes[a[6]] as string)) {
                                                    gadm0Object.measure.push(entry.attributes[a[6]] as string);
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        }
                        // gather the period values to be added to the timeline
                        if (tempPeriods.includes(entry.attributes[a[5]] as number)) {
                            tempPeriods.push(entry.attributes[a[5]] as number);
                            console.log(tempPeriods);
                        }
                    })
                }
            })
        })

        console.log(exposure);

        //replace exposure scenario values with the names that would be visualized
        exposure.forEach((element) => {
            switch (element[3]) {
                case "SSP126":
                    element.splice(3, 1, 'rcp4p5');
                    break;
                case "SSP245":
                    element.splice(3, 1, 'rcp8p5');
            }
        });
         
        console.log(tempGadm0);
        console.log(exposure);
        console.log(tempMaxValue);

        const updateAreaValues = (position: number) => {
            setAreaSeries(prev => {
                const next = [...prev];
                next[position] = tempGadm0;
                return next;
            });
                console.log(areaSeries);
        }
        updateAreaValues(position);

        const updateMaxValue = (position: number) => {
            setMaxValue(prev => {
                const next = [...prev];
                next[position] = tempMaxValue;
                console.log(next);
                return next;
            })
        }
        updateMaxValue(position);

        const updateExposureValues = (position: number) => {
            setExposureState(prev => {
                const next = [...prev];
                        console.log(next);
                next[position] = exposure;
                console.log(next);
                console.log(exposure);
                return next;
            })
        }
        updateExposureValues(position);
    }

    function applyFilter() {
        console.log(exposureState);
        console.log(series);

        const updateSeriesValues = (position: number) => {
            setSeries(prev => {
                const next = [...prev];
                next[position] = exposureState[position]
                    .filter((value) => (value[2] === currentTime.time))
                    .filter((value) => (value[3] === currentScenario))
                    .filter((value) => ((value[5] === currentExposureFilter.measure) || value[5]))
                    ;
                    // .filter((value) => (value[5] === measureModel.filter((b) => (b.measure === "SPEI_CROP_EXP" && b.name === "Dry Days"))[0].measure));
                console.log(exposureState[position]);
                console.log(exposureState[position]
                    .filter((value) => (value[2] === currentTime.time))
                    .filter((value) => (value[3] === currentScenario))
                    .filter((value) => (value[5] === "SPEI_CROP_EXP" )));
                return next;
            })
       }
        updateSeriesValues(position);
    }

    return (
        <Card className="bg-[#1E1E1E] w-full h-9/10 dark flex items-center shadow-md">
            <ComboBox loadGeoJson={loadGeoJson} country={country} position={position} />
            {progressTarget[position] !== 0 && maxValue[position] && areaSeries[position]
                ?
                <div className='flex flex-col'>
                    <MapsChart
                        options={{
                            chart: {
                                map: country[position],
                                backgroundColor: 'RGBA(0,0,0,0)',
                                animation: false,
                            },
                            mapView: {
                                projection: {
                                    name: 'WebMercator',
                                    rotation: [-50, 0]
                                },
                                padding: 15,
                            },
                            colorAxis: {
                                min: 0,
                                max: maxValue[position].find(i => {
                                    const isMatch = i.measure === currentExposureFilter.measure;

                                    console.log({
                                        itemMeasure: i.measure,
                                        filterMeasure: currentExposureFilter.measure,
                                        isMatch
                                    });

                                    return isMatch;
                                })?.value ? maxValue[position].find((i) => i.measure === currentExposureFilter.measure)?.value : Math.max(...maxValue[position].map((a) => a.value)),
                                minColor: '#fcdba9',
                                maxColor: '#E35205',
                                labels: {
                                    style: {
                                        color: "#999999",
                                        fontWeight: "bold",
                                        textOverflow: 'none'
                                    },
                                    formatter: function () {
                                        if (this.value >= 1000000) {
                                            return this.value / 1000000 + 'M';
                                        } else if (this.value < 1000000 && this.value >= 1000) {
                                            return this.value / 1000 + 'k';
                                        } else {
                                            return this.value;
                                        }
                                    }
                                },
                                width: '90%',

                            },
                            tooltip: {
                                formatter: function () {
                                    var value = Math.ceil(this.point.value).toString();
                                    var counter = 0;

                                    for (var i = value.length - 1; i > 0; i--) {
                                        counter++;
                                        if (counter % 3 === 0) {
                                            value = value.slice(0, i) + "," + value.substring(i, value.length);
                                        }
                                    }

                                    return `<b>${this.point.NAME_1}</b><br/>${value}`;
                                },
                                backgroundColor: "#212121",
                                style: {
                                    color: "white"
                                },
                            },
                            credits: {
                                enabled: false
                            },
                            plotOptions: {
                                series: {
                                    point: {
                                        events: {
                                            click: function () {
                                                var tempGadm1 =
                                                    [
                                                        { data: [0, 0, 0, 0], name: "Orderly trajectory" },
                                                        { data: [0, 0, 0, 0], name: "Disorderly trajectory" }
                                                    ];
                                                exposureState[position].forEach((element) => {
                                                    if (this.NAME_1 === element[0]) {
                                                        lineChartOrder.forEach((index) => {
                                                            if (element[2] === index.period) {
                                                                scenarioModel.forEach((item) => {
                                                                    if (element[3] === item.scenario) {
                                                                        tempGadm1.forEach((i) => {
                                                                            if (item.name === i.name) {
                                                                                i.data[index.position] += element[1]
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                                // console.log(exposureState[position]);
                                                console.log(tempGadm1);
                                                const loadSubnationalArea = (position: number) => {
                                                    setAreaSeries(prev => {
                                                        const next = [...prev];
                                                        next[position] = tempGadm1;
                                                        return next;
                                                    });
                                                    console.log(areaSeries);
                                                }
                                                loadSubnationalArea(position);
                                            }
                                        }
                                    }
                                }
                            }
                        }}
                    >
                        <MapSeries
                            data={series[position].filter(i => i[5] === currentExposureFilter.measure || !measureModel.find(c => c.exposure === currentExposure && c.hazard === currentHazard))}
                            joinBy={['GID_1', 'GID_1']}
                            keys={['NAME_1', 'value', 'year', 'scenario', 'GID_1']}
                            nullColor="#c9c9c9"
                        />
                    </MapsChart>
                    <Chart
                        options={{
                            legend: {
                                itemStyle: {
                                    color: '#ffffff',
                                    fontWeight: "700",
                                },
                                itemHoverStyle: {
                                    fontWeight: "900",
                                    color: '#ffffff'
                                },
                                align: 'left',
                                verticalAlign: 'top',
                                x: 100,
                                y: -15,
                                floating: true,
                                layout: 'vertical',
                                symbolWidth: 1,
                                symbolPadding: 15,
                                itemMarginBottom: 3,
                            },
                            tooltip: {
                                backgroundColor: "#212121",
                                style: {
                                    color: "white"
                                },
                                valueDecimals: 0,
                                formatter: function (this: any) {

                                    var value = Math.ceil(this.y).toString();
                                    var counter = 0;

                                    for (var i = value.length - 1; i > 0; i--) {
                                        counter++;
                                        if (counter % 3 === 0) {
                                            value = value.slice(0, i) + "," + value.substring(i, value.length);
                                        }
                                    }
                                    return '<div>' + this.category + '</div><br></br>' + this.series.name + ': ' + value; 
                                }
                            },
                            colors: [
                                {
                                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                                    stops: [[0, '#0098FF'], [1, '#0098FF00']]
                                },
                                {
                                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                                    stops: [[0, '#FF9500'], [1, '#FF950000']]
                                },
                                {
                                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                                    stops: [[0, '#ff0040'], [1, '#FF950000']]
                                },

                            ],
                            series: [

                            ],
                            plotOptions: {
                                series: {
                                    lineWidth: 3.5,
                                },
                                area: {
                                    marker: {
                                        lineWidth: 2,
                                        lineColor: 'white',
                                    },

                                }
                            }
                        }}
                    >
                        <Credits enabled={false} />
                        <XAxis
                            categories={["1980", "2030", "2050", "2080"]}
                            tickmarkPlacement={'on'}
                            lineWidth={1}
                            lineColor={'#555555'}
                            startOnTick={false}
                            labels={{
                                style: {
                                    color: '#ffffff',
                                    fontSize: '14px'
                                }
                            }}
                        />
                        <YAxis
                            title={{ text: "" }}
                            lineWidth={1}
                            gridLineWidth={0}
                            tickWidth={1}
                            tickPosition={'inside'}
                            tickLength={5}
                            lineColor={'#555555'}
                            tickColor={'#555555'}
                            labels={{
                                reserveSpace: true,
                                style: {
                                    color: '#ffffff',
                                    fontSize: '14px'
                                },
                                formatter: function () {
                                    if (this.value >= 1000000) {
                                        return this.value / 1000000 + 'M';
                                    } else if (this.value < 1000000 && this.value >= 1000) {
                                        return this.value / 1000 + 'k';
                                    } else {
                                        return this.value;
                                    }
                                }
                            }}
                        />

                        {/* {areaSeries[position].filter(item => item.measure === currentExposureFilter.measure || !measureModel.find(c => c.exposure === currentExposure && c.hazard === currentHazard)).map((i, index) =>
                            <Series
                                type="area"
                                name={i.name}
                                data={i.data}
                                marker={{
                                    radius: 6,
                                    lineWidth: 2,
                                    lineColor: 'white',
                                }}
                            /> */}
                        {areaSeries[position].filter(a => a.measure.includes(currentExposureFilter.measure) || !measureModel.find(c => c.exposure === currentExposure && c.hazard === currentHazard)).map((i, index) =>
                            <Series
                                key={i.name}
                                type="area"
                                name={i.name}
                                data={[...i.data]}
                                marker={{
                                    radius: 6,
                                    lineWidth: 2,
                                    lineColor: 'white',
                                }}
                            />
                        )}
                    </Chart>
                </div>
                :
                country[position].name !== "string"
                ?
                    <Button disabled size="sm">
                        <Spinner data-icon="inline-start" />
                        Loading...
                    </Button>
                    
                :
                <div></div>
            }
        </Card>
    )
}