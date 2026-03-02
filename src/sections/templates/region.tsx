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
    exposureState: Array<Array<[string, number, number, string, string, string, string]>>,
    setExposureState: React.Dispatch<React.SetStateAction<Array<Array<[string, number, number, string, string, string, string]>>>>,
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
    setProgressTarget: React.Dispatch<React.SetStateAction<[number, number]>>,
    currentMeasure: {name: string, id: string},
    setMeasure: React.Dispatch<React.SetStateAction<{name: string, id: string}>>,
    currentThreshold: {name: string, threshold: any},
    currentSubnational: string[],
    setCurrentSubnational: React.Dispatch<React.SetStateAction<string[]>>,
}

type DataString = {
    alpha3: string,
    name: string,
};

type ExposureShape = [string, number, number, string, string, string, string][];

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
    currentMeasure,
    setMeasure,
    currentThreshold,
    currentSubnational,
    setCurrentSubnational
}: Filters) => {

    const temperatureModel = [
        {name: "_Z", number: 0}, 
        {name: "H_20", number: 20}, 
        {name: "H_26", number: 26}, 
        {name: "H_32", number: 32}, 
        {name: "H_30", number: 30}, 
        {name: "H_35", number: 35}, 
        {name: "H_40", number: 40}
    ];

    let colorAxisTitle: {title: string, hazard: string[], exposure: string[], Measure: string[], lineChartInfo: string, lineChartInfo2: string}[] = [
    { title: "Number of Days", hazard: ["Temperature Extremes"], exposure: ["Population", "Livestock", "GDP", "Urban GDP"], Measure: ["ID_PW_EXP", "TN_PW_EXP", "HD_PW_EXP", "HD_LW_EXP"], lineChartInfo: `${currentExposure}-weighted Number of ${currentMeasure.name}`, lineChartInfo2: ` at Tmax ${temperatureModel.find(t => t.name === currentThreshold.threshold)?.number}° Celsius` },
    { title: "Number of Days", hazard: ["Temperature Extremes"], exposure: ["Urban GDP"], Measure: ["ID_PW_EXP", "TN_PW_EXP", "HD_PW_EXP", "HD_LW_EXP"], lineChartInfo: `${currentExposure}-weighted Number of ${currentMeasure.name}`, lineChartInfo2: `` },
    { title: "Number of People", hazard: ["Riverine Flooding", "Coastal Flooding"], exposure: ["Population"], Measure: [""], lineChartInfo: "Number of People ", lineChartInfo2: `Exposed to ${currentHazard}` },
    { title: "Number of Buildings", hazard: ["Riverine Flooding", "Coastal Flooding"], exposure: ["Buildings"], Measure: [""], lineChartInfo: "Number of Buildings", lineChartInfo2: `Exposed to ${currentHazard}` },
    { title: "Builtup Area (Km²)", hazard: ["Riverine Flooding", "Coastal Flooding"], exposure: ["Builtup Area"], Measure: [""], lineChartInfo: "Builtup Area (Km²)", lineChartInfo2: `Exposed to ${currentHazard}` },
    { title: "Percentage of GDP", hazard: ["Riverine Flooding", "Coastal Flooding"], exposure: ["GDP"], Measure: [""], lineChartInfo: "Percentage of GDP" , lineChartInfo2: `Exposed to ${currentHazard}`},
    { title: "Percentage of Urban GDP", hazard: ["Riverine Flooding", "Coastal Flooding"], exposure: ["Urban GDP"], Measure: [""], lineChartInfo: "Percentage of Urban GDP", lineChartInfo2: `Exposed to ${currentHazard}` },
    { title: "Number of Dry Days", hazard: ["Drought"], exposure: ["Cropland"], Measure: ["CDD_CROP_EXP"], lineChartInfo: "Population-weighted Number of Dry Days", lineChartInfo2: "" },
    { title: "SPEI Index", hazard: ["Drought"], exposure: ["Cropland"], Measure: ["SPEI_CROP_EXP"], lineChartInfo: "Standardized Precipitation Evapotranspiration Index (SPEI)", lineChartInfo2: "" }
];

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
    }, [exposureState, currentTime, currentScenario, currentMeasure]);

    useEffect(() => {
        var data = {name: "", alpha3: ""};
        if (country[position].name !== "string" && country[position].iso3 !== "string") {
            data.name = country[position].name;
            data.alpha3 = country[position].iso3;
            loadGeoJson(data);
        }

        // reset subnational name on line chart when hazard/exposure switches
        setCurrentSubnational(prev => {
            const next = [...prev];
            next[position] = "";
            console.log(next);
            return next;
        })

    }, [currentHazard, currentExposure]);

    useEffect(() => { 
        if (country[position].name === "string") {
            var defaultCountries = [
                { name: "Costa Rica", alpha3: "CRI" },
                { name: "Bangladesh", alpha3: "BGD" }
            ];
            var data = { name: defaultCountries[position].name, alpha3: defaultCountries[position].alpha3 };
            loadGeoJson(data);
        } 
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
                MEASURE: string,
                TEMP_THRESHOLD: string
            }
        }>
    }>;

    const URL_BASE = "https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services";
 
    const urlObject: Record<string, Record<string, { url: string, measure: string[], threshold?: string }>> = {
        "Riverine Flooding":
        {
            "Population": {
                url: `${URL_BASE}/riverine_population_table/FeatureServer/0/query`,
                measure: ["HD_PW_EXP", "TN_PW_EXP", "ID_PW_EXP"],
                // threshold: "RETURN_PERIOD"
            }
        },
        "Drought":
        {
            "Cropland": {
                url: `${URL_BASE}/drought_cropland_table/FeatureServer/0/query`,
                measure: ["CDD_CROP_EXP", "SPEI_CROP_EXP"],
            }
        },
        "Temperature Extremes":
        {
            "Population": {
                url: `${URL_BASE}/temperature_population_table/FeatureServer/0/query`,
                measure: ["HD_PW_EXP", "TN_PW_EXP", "ID_PW_EXP"],
                threshold: "TEMP_THRESHOLD"
            },
            "Livestock": {
                url: `${URL_BASE}/temperature_livestock_table/FeatureServer/0/query`,
                measure: ["HD_LW_EXP"],
                threshold: "TEMP_THRESHOLD"
            }
            
        }
    }

    async function test(countryData: CountryData) {

        const whereClause = `ISO3 IN ('${countryData.iso3}')`;
        var queryString = `where=${encodeURIComponent(whereClause)}`;
        
        const url = urlObject[currentHazard][currentExposure].url + `?${queryString}`;
        

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
        const x = await result.json();

        var objectIdsArray = x.objectIds.filter((value: ObjectID) => value);
        console.log("objectIdsArray: ", objectIdsArray.length);

        var resultAmount = 0;
        const maxRecordCountFactor: string = '5'; 
        const maxRecordsPerQuery: number = Number(maxRecordCountFactor) * 1000;

        type SliceNumber = {
            start: number,
            end: number
        };

        type Feature = {
            attributes: Record<string, any>;
        };

        var tableData: {}[] = [];

        function counter({ start, end }: SliceNumber) {

            const params = new URLSearchParams({
                objectIds: objectIdsArray.slice(start, end).join(","),
                outFields: "*",
                f: 'json',
                maxRecordCountFactor: maxRecordCountFactor
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
                 
                    tableData.push(...data.features.map((feature: Feature) => feature.attributes));
                    resultAmount += data.features.length;
           
                    if (resultAmount < objectIdsArray.length) {
                        counter({ start: resultAmount, end: resultAmount + maxRecordsPerQuery });
                    } else {
                        sumWeightedExposure(tableData);
                    }
                });

                console.log(tableData);
        }

        counter({ start: 0, end: maxRecordsPerQuery });
    }

    var lineChartModel = [
        {label: "1980-2014", position: 0, year: 1980},
        {label: "Early Century", position: 1, year: 2030},
        {label: "Mid-Century", position: 2, year: 2050},
        {label: "End-Century", position: 3, year: 2080}
    ];
    var scenarioModel = [
        {scenario: 'rcp4p5', name: 'Orderly trajectory'},
        {scenario: 'rcp8p5', name: 'Disorderly trajectory'},
        {scenario: 'SSP126', name: 'Orderly trajectory'},
        {scenario: 'SSP245', name: 'Disorderly trajectory'},
        {scenario: 'SSP370', name: 'Hot House'}  
    ];

    var measureModel = [ 
        { hazard: "Drought", exposure: "Cropland", measure: ["CDD_CROP_EXP", "SPEI_CROP_EXP"]},
        { hazard: "Temperature Extremes", exposure: "Population", measure: ["HD_PW_EXP", "TN_PW_EXP", "ID_PW_EXP"]},
        { hazard: "Temperature Extremes", exposure: "Livestock", measure: ["HD_LW_EXP"]},
        { hazard: "Riverine Flooding", exposure: "Population", measure: ["RF_PW_EXP"]}
    ];

    type MeasureRange = {
        measure: string;
        maxValue: number;
        minValue: number;
    };

    const sumWeightedExposure = async (tableData: any[]) => {
        console.log(tableData);

        // legend values for map
        var mapLegendValueRange: MeasureRange[] = tableData
            .filter((entry: Record<string, any>) => entry["ADMIN_FILTER"] === "adm1")
            .reduce((acc: {measure: string, maxValue: number, minValue: number}[], entry: Record<string, any>) => {
                const measure = entry["MEASURE"] as string;
                const median = Number(entry["MEDIAN"]);
 
                const existing = acc.find(obj => obj.measure === measure);
 
                if (!existing) {
                    acc.push({
                        measure,
                        maxValue: median,
                        minValue: measure === "SPEI_CROP_EXP" ? median : 0
                    });
                } else {
                    existing.maxValue = Math.max(existing.maxValue, median);
                    existing.minValue = measure === "SPEI_CROP_EXP" ? Math.min(existing.minValue, median) : 0
                }
 
                return acc;
            }, []);
        console.log("ADM1 Min and Max by Measure across all Thresholds: ", mapLegendValueRange);

        // country data for line chart
        var adm0ChartData: Record<string, any>[] = tableData
            .filter((entry: Record<string, any>) => entry["ADMIN_FILTER"] === "adm0")
            .filter((entry: Record<string, any>) => entry["MEASURE"] === currentMeasure.id)
            .filter((entry: Record<string, any>) => urlObject[currentHazard][currentExposure].threshold ? entry[urlObject[currentHazard][currentExposure].threshold] == currentThreshold : true );
        console.log("adm0ChartData ", adm0ChartData);

        // region selected data && adm1 data for polygons
        var adm1Data: Record<string, any>[] = tableData
            .filter((entry: Record<string, any>) => entry["ADMIN_FILTER"] === "adm1")
            .filter((entry: Record<string, any>) => entry["MEASURE"] === currentMeasure.id)
            .filter((entry: Record<string, any>) => urlObject[currentHazard][currentExposure].threshold ? entry[urlObject[currentHazard][currentExposure].threshold] == currentThreshold : true )
            .reduce((acc: Record<string, Record<string, any>>, entry: Record<string, any>) => {
                const key = entry["REF_AREA"] as string;
                
                if (!acc[key]) {
                    acc[key] = [];
                }

                acc[key].push(entry);
                return acc;
            }, {});
        console.log("adm1Data ", adm1Data);
        console.log("printallofthat", Object.keys(adm1Data));
        console.log(
             Object.keys(adm1Data).map((refArea: any) => {
            return adm1Data[refArea]
            .filter((entry: Record<string, any>) => entry["MEASURE"] === currentMeasure.id)
            .filter((entry: Record<string, any>) => urlObject[currentHazard][currentExposure].threshold ? entry[urlObject[currentHazard][currentExposure].threshold] == currentThreshold : true )                                
            .filter((entry: Record<string, any>) => entry["TIME_PERIOD"] === currentTime.time)
            .filter((entry: Record<string, any>) => currentTime.time !== 1980 ? entry["CLIMATE_SCENARIO"] == currentScenario : true)
        })  
        )
        // Object.keys(adm1Data).map((refArea: any) => {
        //     return adm1Data[refArea]
        //     .filter((entry: Record<string, any>) => entry["MEASURE"] === currentMeasure.id)
        //     .filter((entry: Record<string, any>) => urlObject[currentHazard][currentExposure].threshold ? entry[urlObject[currentHazard][currentExposure].threshold] == currentThreshold : true )                                
        //     .filter((entry: Record<string, any>) => entry["TIME_PERIOD"] === currentTime.time)
        //     .filter((entry: Record<string, any>) => currentTime.time !== 1980 ? entry["CLIMATE_SCENARIO"] == currentScenario : true)
        // })      
        
        
                            // })
                 // const updateAreaValues = (position: number) => {
        //     setAreaSeries(prev => {
        //         const next = [...prev];
        //         next[position] = tempGadm0;
        //         return next;
        //     });
        //         console.log(areaSeries);
        // }
        // updateAreaValues(position);

        //fix the type >>>>>
        const updateMaxValue = (position: number) => {
            setMaxValue(prev => {
                const next = [...prev];
                next[position] = mapLegendValueRange.filter((item) => {item.measure == currentMeasure.id});
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
                    .filter((value) => ((currentMeasure.measures.includes(value[5])) || value[5]))
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

    function setSubnationalName(value: string) {
            setCurrentSubnational(prev => {
                const next = [...prev];
                next[position] = value;
                console.log(next);
                return next;
            })
    }

    return (
        <Card className="bg-[#1E1E1E] w-full h-9/10 dark flex items-center shadow-md">
            <ComboBox loadGeoJson={loadGeoJson} setSubnationalName={setSubnationalName} country={country} position={position} />
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
                                    const isMatch = currentMeasure.measures.includes(i.measure);

                                    console.log({
                                        itemMeasure: i.measure,
                                        filterMeasures: currentMeasure.measures,
                                        isMatch
                                    });

                                    return isMatch;
                                })?.value ?  Math.max(...maxValue[position].filter((a) =>  currentMeasure.measures.includes(a.measure)).map((a) => a.value)) : Math.max(...maxValue[position].map((a) => a.value)),
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
                            legend: {
                                title: {
                                    text: colorAxisTitle.find(i => i.exposure.includes(currentExposure) && i.hazard.includes(currentHazard) && i.Measure.includes(currentMeasure.measures[0]))?.title,
                                    style: {
                                        color: "white",
                                        fontWeight: "bold"
                                    }
                                }
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
                                                var tempGadm1: {data: number[], name: string, measure: string[], threshold: any}[] = [];
                                                exposureState[position].forEach((element) => {
                                                    if (this.NAME_1 === element[0]) {
                                                        lineChartOrder.forEach((index) => {
                                                            if (element[2] === index.period) {
                                                                scenarioModel.forEach((item) => {
                                                                    if (element[3] === item.scenario) {
                                                                        if (!tempGadm1.some(i => i.name === item.name && i.measure.includes(element[5]) && i.threshold === element[6])) {
                                                                            tempGadm1.push({ data: [0, 0, 0, 0], name: item.name, measure: [element[5]], threshold: element[6] });
                                                                        } 
                                                                        tempGadm1.forEach((i) => { 
                                                                            if (i.name === item.name && i.measure.includes(element[5]) && i.threshold === element[6]) {
                                                                                i.data[index.position] += element[1];
                                                                            }
                                                                        });
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                });
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
                                                setSubnationalName("(" + this.NAME_1 + ")");
                                            }
                                        }
                                    }
                                }
                            }
                        }}
                    >
                        <MapSeries
                            data={Object.keys(series[position]["adm1Data"]).forEach((refArea)  =>  {
                                entries = adm1Data[refArea];
                                entries.filter((entry: Record<string, any>) => entry["MEASURE"] === currentMeasure.id)
                                        .filter((entry: Record<string, any>) => urlObject[currentHazard][currentExposure].threshold ? entry[urlObject[currentHazard][currentExposure].threshold] == currentThreshold : true )                                
                            }) }
                            
                            joinBy={['GID_1', 'GID_1']}
                            keys={['NAME_1', 'value', 'year', 'scenario', 'GID_1']}
                            nullColor="#c9c9c9"
                        />
                    </MapsChart>
                    <Chart
                        options={{
                            chart: {
                                type: 'line',
                                height: 500,
                                marginTop: 130,
                                events: {
                                    render() {
                                        const chart = this as unknown as Highcharts.Chart;
                                        const titleBBox = chart.title.getBBox();
                                        chart.subtitle.attr({
                                            y: titleBBox.y + titleBBox.height + 15
                                        })
                                    }
                                }
                            },
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
                                x: 90,
                                y: 75,
                                floating: true,
                                layout: 'vertical',
                                symbolWidth: 1,
                                symbolPadding: 15,
                                itemMarginBottom: 3,
                            },
                            title: {
                                text: colorAxisTitle.find(i => i.exposure.includes(currentExposure) && i.hazard.includes(currentHazard) && i.Measure.includes(currentMeasure.measures[0]))?.lineChartInfo
                                 + "" + colorAxisTitle.find(i => i.exposure.includes(currentExposure) && i.hazard.includes(currentHazard) && i.Measure.includes(currentMeasure.measures[0]))?.lineChartInfo2
                                 + ": " + country[position].name + " " + currentSubnational[position],
                                align: 'left',
                                style: {
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: '16px',
                                    width: '60%'
                                },
                                useHTML: true,
                                x: 18,
                                y: 20,
                            },
                            subtitle: {
                                text: "(Exposure quantity)",
                                x: 16,
                                style: {
                                    color: "#999999",
                                    fontSize: '13px'
                                }
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
                        {areaSeries[position].filter(a => a.measure.some(m => currentMeasure.measures.includes(m) && a.threshold === currentThreshold.threshold) || !measureModel.find(c => c.exposure === currentExposure && c.hazard === currentHazard)).map((i, index) =>
                            <Series
                                key={i.name}
                                type="line"
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