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
    type RegionSeries,
} from '../../App';

import { isoCountries, type CountryString, countryByIso3 } from '@/data/isoCountries';

export type Filters = {
    defaultIso3: string,
    currentTime: number,
    currentScenario: string,
    geoJson: JsonShape,
    maxValue: {measure: string, value: number}[][],
    setMaxValue: React.Dispatch<React.SetStateAction<{measure: string, value: number}[][]>>,
    currentExposure: string
    setExposure: React.Dispatch<React.SetStateAction<string>>,
    currentHazard: string,
    setHazard: React.Dispatch<React.SetStateAction<string>>,
    currentMeasure: {name: string, id: string},
    setMeasure: React.Dispatch<React.SetStateAction<{name: string, id: string}>>,
    currentThreshold: {name: string, threshold: any}
}

export const Region = ({
    currentTime, 
    currentScenario,
    geoJson, 
    maxValue,
    currentExposure,
    currentHazard,
    currentMeasure,
    currentThreshold,
    defaultIso3
}: Filters) => {

    type Feature = Record<string, any>;

    type ChartData = {
        // mapData: { GID_1: string, NAME_1: string, value: number }[],
        adm1Data: Record<string, Feature[]>,
        adm0ChartData: Feature[],
        mapLegendValueRange: Record<string, MeasureRange>
    };
 
    const [iso3, setIso3] = React.useState(defaultIso3);
    const [chartData, setChartData] = React.useState<ChartData | null>(null);
    const [mapChartData, setMapChartData] = React.useState<Feature[]>([])
    const [lineChartData, setLineChartData] = React.useState<Record<string, number[]>>({});
    const [polygons, setPolygons] = React.useState({
        features: [{}],
        iso3: iso3,
        name: "",
        type: "FeatureCollection"
    });
    const [show, updateShow] = React.useState(false);

    const temperatureModel = [
        {name: "_Z", number: 0}, 
        {name: "H_20", number: 20}, 
        {name: "H_26", number: 26}, 
        {name: "H_32", number: 32}, 
        {name: "H_30", number: 30}, 
        {name: "H_35", number: 35}, 
        {name: "H_40", number: 40}
    ];

    let colorAxisTitle: {title: string, hazard: string[], exposure: string[], measure: string[], lineChartInfo: string, lineChartInfo2: string}[] = [
    { title: "Number of Days", hazard: ["Temperature Extremes"], exposure: ["Population", "Livestock", "GDP", "Urban GDP"], measure: ["ID_PW_EXP", "TN_PW_EXP", "HD_PW_EXP", "HD_LW_EXP"], lineChartInfo: `${currentExposure}-weighted Number of ${currentMeasure.name}`, lineChartInfo2: ` at Tmax ${temperatureModel.find(t => t.name === currentThreshold.threshold)?.number}° Celsius` },
    { title: "Number of Days", hazard: ["Temperature Extremes"], exposure: ["Urban GDP"], measure: ["ID_PW_EXP", "TN_PW_EXP", "HD_PW_EXP", "HD_LW_EXP"], lineChartInfo: `${currentExposure}-weighted Number of ${currentMeasure.name}`, lineChartInfo2: `` },
    { title: "Number of People", hazard: ["Riverine Flooding", "Coastal Flooding"], exposure: ["Population"], measure: [""], lineChartInfo: "Number of People ", lineChartInfo2: `Exposed to ${currentHazard}` },
    { title: "Number of Buildings", hazard: ["Riverine Flooding", "Coastal Flooding"], exposure: ["Buildings"], measure: [""], lineChartInfo: "Number of Buildings", lineChartInfo2: `Exposed to ${currentHazard}` },
    { title: "Builtup Area (Km²)", hazard: ["Riverine Flooding", "Coastal Flooding"], exposure: ["Builtup Area"], measure: [""], lineChartInfo: "Builtup Area (Km²)", lineChartInfo2: `Exposed to ${currentHazard}` },
    { title: "Percentage of GDP", hazard: ["Riverine Flooding", "Coastal Flooding"], exposure: ["GDP"], measure: [""], lineChartInfo: "Percentage of GDP" , lineChartInfo2: `Exposed to ${currentHazard}`},
    { title: "Percentage of Urban GDP", hazard: ["Riverine Flooding", "Coastal Flooding"], exposure: ["Urban GDP"], measure: [""], lineChartInfo: "Percentage of Urban GDP", lineChartInfo2: `Exposed to ${currentHazard}` },
    { title: "Number of Dry Days", hazard: ["Drought"], exposure: ["Cropland"], measure: ["CDD_CROP_EXP"], lineChartInfo: "Population-weighted Number of Dry Days", lineChartInfo2: "" },
    { title: "SPEI Index", hazard: ["Drought"], exposure: ["Cropland"], measure: ["SPEI_CROP_EXP"], lineChartInfo: "Standardized Precipitation Evapotranspiration Index (SPEI)", lineChartInfo2: "" }
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

    // Effect 1: fetch new data
    const loadCountryData = async (iso3: string) => {
        const countryPolygons = {
            features: geoJson.features.filter((f) => f.properties.GID_0 === iso3),
            iso3: iso3,
            name: countryByIso3[iso3],
            type: "FeatureCollection"
        };
        setPolygons(countryPolygons);
        const queryResults = await query(iso3);
        const arrangedData = arrangeData(queryResults);
        setChartData(arrangedData);
        setMapChartData(mapChartDataPrep(arrangedData.adm1Data));
        setLineChartData(lineChartDataPrep(arrangedData.adm0ChartData));
    };

    // Effect 1: fetch new data when country, hazard or exposure changes
    useEffect(() => {
        loadCountryData(iso3);
    }, [iso3, currentHazard, currentExposure]);

    useEffect(() => {
        if (mapChartData.length > 0) {
            updateShow(true);
        }
    }, [mapChartData])

    // Effect 2: re-process already-fetched data
    useEffect(() => {
        if (chartData == null) return; // guard: don't run before first fetch
        setMapChartData(mapChartDataPrep(chartData.adm1Data));
        setLineChartData(lineChartDataPrep(chartData.adm0ChartData));

    }, [currentTime, currentScenario, currentMeasure, currentThreshold]);

    const URL_BASE = "https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services";
 
    const urlObject: Record<string, Record<string, { url: string, measure: string[], threshold?: string, scenarios: string[] }>> = {
        "Riverine Flooding":
        {
            "Population": {
                url: `${URL_BASE}/riverine_population_table/FeatureServer/0/query`,
                measure: ["HD_PW_EXP", "TN_PW_EXP", "ID_PW_EXP"],
                scenarios: ["rcp4p5", "rcp8p5"]
            }
        },
        "Drought":
        {
            "Cropland": {
                url: `${URL_BASE}/drought_cropland_table/FeatureServer/0/query`,
                measure: ["CDD_CROP_EXP", "SPEI_CROP_EXP"],
                scenarios: ["rcp4p5", "rcp8p5"]
            }
        },
        "Temperature Extremes":
        {
            "Population": {
                url: `${URL_BASE}/temperature_population_table/FeatureServer/0/query`,
                measure: ["HD_PW_EXP", "TN_PW_EXP", "ID_PW_EXP"],
                scenarios: ["rcp4p5", "rcp8p5"],
                threshold: "TEMP_THRESHOLD"
            },
            "Livestock": {
                url: `${URL_BASE}/temperature_livestock_table/FeatureServer/0/query`,
                measure: ["HD_LW_EXP"],
                scenarios: ["rcp4p5", "rcp8p5"],
                threshold: "TEMP_THRESHOLD"
            }
            
        }
    }

    async function query(iso3: string) {

        const whereClause = `ISO3 IN ('${iso3}')`;
        const queryString = `where=${encodeURIComponent(whereClause)}`;
        const url = urlObject[currentHazard][currentExposure].url + `?${queryString}`;

        const idResult = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ returnIdsOnly: 'true', cacheHint: 'true', f: 'json' })
        });

        const { objectIds } = await idResult.json();
        const maxRecordsPerQuery = 5000;
        const tableData: Feature[] = [];

        // fetch all pages sequentially and await each one

        for (let start = 0; start < objectIds.length; start += maxRecordsPerQuery) {
            const end = Math.min(start + maxRecordsPerQuery, objectIds.length);
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    objectIds: objectIds.slice(start, end).join(","),
                    outFields: "*",
                    f: 'json',
                    maxRecordCountFactor: '5'
                })
            });

            const page = await res.json();
            tableData.push(...page.features.map((f: { attributes: Feature }) => f.attributes));
        }

        return tableData;
    }


    // async function query(iso3: string) {

    //     const whereClause = `ISO3 IN ('${iso3}')`;
    //     var queryString = `where=${encodeURIComponent(whereClause)}`;
        
    //     const url = urlObject[currentHazard][currentExposure].url + `?${queryString}`;
        

    //     console.log(queryString);
    //     console.log(url);

    //     const parameters = new URLSearchParams({
    //         returnIdsOnly: 'true',
    //         cacheHint: 'true',
    //         f: 'json'
    //     });

    //     const result = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         body: parameters
    //     });
    //     const x = await result.json();

    //     var objectIdsArray = x.objectIds.filter((value: ObjectID) => value);
    //     console.log("objectIdsArray: ", objectIdsArray.length);

    //     var resultAmount = 0;
    //     const maxRecordCountFactor: string = '5'; 
    //     const maxRecordsPerQuery: number = Number(maxRecordCountFactor) * 1000;

    //     type SliceNumber = {
    //         start: number,
    //         end: number
    //     };

    //     var tableData: {}[] = [];

    //     function counter({ start, end }: SliceNumber) {

    //         const params = new URLSearchParams({
    //             objectIds: objectIdsArray.slice(start, end).join(","),
    //             outFields: "*",
    //             f: 'json',
    //             maxRecordCountFactor: maxRecordCountFactor
    //         });

    //         fetch(url, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             },
    //             body: params
    //         })
    //             .then(res => res.json())
    //             .then(data => {
                 
    //                 tableData.push(...data.features.map((feature: { attributes: Feature }) => feature.attributes));
    //                 resultAmount += data.features.length;
           
    //                 if (resultAmount < objectIdsArray.length) {
    //                     counter({ start: resultAmount, end: resultAmount + maxRecordsPerQuery });
    //                 }
    //             });
    //     }
    //     counter({ start: 0, end: maxRecordsPerQuery });
    //     return tableData;
    // }
    

    var lineChartXLabels: string[] = [
        "1980-2014",
        "Early Century",
        "Mid-Century",
        "End-Century",
    ];
    var scenarioMapper: Record<string, string> = {
        rcp4p5: 'Orderly trajectory',
        rcp8p5: 'Disorderly trajectory',
        SSP126: 'Orderly trajectory',
        SSP245: 'Disorderly trajectory',
        SSP370: 'Hot House'
    };

    var measureModel = [ 
        { hazard: "Drought", exposure: "Cropland", measure: ["CDD_CROP_EXP", "SPEI_CROP_EXP"]},
        { hazard: "Temperature Extremes", exposure: "Population", measure: ["HD_PW_EXP", "TN_PW_EXP", "ID_PW_EXP"]},
        { hazard: "Temperature Extremes", exposure: "Livestock", measure: ["HD_LW_EXP"]},
        { hazard: "Riverine Flooding", exposure: "Population", measure: ["RF_PW_EXP"]}
    ];

    type MeasureRange = {
        maxValue: number;
        minValue: number;
    };

    // function lineChartDataPrep(data: Record<string, any>[]) {
    //     const filteredData = data.filter((entry: Feature) => entry["MEASURE"] === currentMeasure.id)
    //         .filter((entry: Feature) => urlObject[currentHazard][currentExposure].threshold ? entry[urlObject[currentHazard][currentExposure].threshold] == currentThreshold : true)
    //     const dataPointZero = filteredData.filter((entry: Record<string, any>) => entry["CLIMATE_SCENARIO"] === "historical")
    //     urlObject[currentHazard][currentExposure].scenarios.map((scenario: string) => {
    //         var series = filteredData.filter((entry) => entry["CLIMATE_SCENARIO"] == scenario)
    //         dataPointZero.concat(series.sort((a, b) => a.TIME_PERIOD - b.TIME_PERIOD)).map((x) => x["MEDIAN"])
    //     }
    // }

    function lineChartDataPrep(data: Record<string, any>[]) {

        console.log("=== lineChartDataPrep ==="); 
        console.log("data length:", data.length); 
        console.log("currentMeasure.id:", currentMeasure.id); 
        console.log("sample entry:", data[0]);

        const filteredData = data
        .filter((entry) => entry["MEASURE"] === currentMeasure.id)
        .filter((entry) => urlObject[currentHazard][currentExposure].threshold 
            ? entry[urlObject[currentHazard][currentExposure].threshold] == currentThreshold.threshold 
            : true
        );
 
    const dataPointZero = filteredData.filter((entry) => entry["CLIMATE_SCENARIO"] === "historical");
 
    return urlObject[currentHazard][currentExposure].scenarios.reduce((acc: Record<string, number[]>, scenario: string) => {
        const scenarioData = filteredData.filter((entry) => entry["CLIMATE_SCENARIO"] === scenario);
        acc[scenario] = dataPointZero
            .concat(scenarioData.sort((a, b) => a.TIME_PERIOD - b.TIME_PERIOD))
            .map((x) => x["MEDIAN"]);
        return acc;
    }, {});
}
    

    function mapChartDataPrep(data: Record<string, Feature[]>) {

        console.log("=== mapChartDataPrep ==="); 
        console.log("currentTime:", currentTime); 
        console.log("currentScenario:", currentScenario); 
        console.log("currentMeasure:", currentMeasure); 
        console.log("currentThreshold:", currentThreshold); 
        console.log("data keys:", Object.keys(data));

        const mapData = Object.keys(data).flatMap((refArea: string) => {
            return data[refArea].filter((entry: Feature) => entry["TIME_PERIOD"] === currentTime)
                .filter((entry: Feature) => entry["MEASURE"] === currentMeasure.id)
                .filter((entry: Feature) => urlObject[currentHazard][currentExposure].threshold ? entry[urlObject[currentHazard][currentExposure].threshold] == currentThreshold : true )
                .filter((entry: Feature) => currentTime !== 1980 ? entry["CLIMATE_SCENARIO"] === currentScenario : true)
                .map((entry: Feature) => ({ GID_1: entry["REF_AREA"], NAME_1: entry["REF_AREA_NAME"], value: entry["MEDIAN"] }))
        });
        return mapData;
    }

    const arrangeData = (data: Feature[]) => {

        // legend values for map
        var mapLegendValueRange: Record<string, MeasureRange> = data
            .filter((entry: Feature) => entry["ADMIN_FILTER"] === "adm1")
            .reduce((acc: Record<string, MeasureRange>, entry: Feature) => {
                const measure = entry["MEASURE"] as string;
                const median = Number(entry["MEDIAN"]);
                
                if (!acc[measure]) {
                    acc[measure] = {
                        maxValue: median,
                        minValue: measure === "SPEI_CROP_EXP" ? median : 0
                    };
                } else {
                    acc[measure].maxValue = Math.max(acc[measure].maxValue, median);
                    acc[measure].minValue = measure === "SPEI_CROP_EXP" ? Math.min(acc[measure].minValue, median) : 0
                }
 
                return acc;
            }, {});
        console.log("ADM1 Min and Max by Measure across all Thresholds: ", mapLegendValueRange);

        // country data for line chart
            const adm0ChartData: Feature[] = data
            .filter((entry: Feature) => entry["ADMIN_FILTER"] === "adm0")
            // .filter((entry: Feature) => entry["MEASURE"] === currentMeasure.id)
            // .filter((entry: Feature) => urlObject[currentHazard][currentExposure].threshold ? entry[urlObject[currentHazard][currentExposure].threshold] == currentThreshold : true );
            console.log("adm0ChartData ", adm0ChartData);

        // region selected data && adm1 data for polygons
            const adm1Data = data
            .filter((entry: Feature) => entry["ADMIN_FILTER"] === "adm1")
            // .filter((entry: Feature) => entry["MEASURE"] === currentMeasure.id)
            // .filter((entry: Feature) => urlObject[currentHazard][currentExposure].threshold ? entry[urlObject[currentHazard][currentExposure].threshold] == currentThreshold : true )
            .reduce((acc: Record<string, Feature[]>, entry: Feature) => {
                const key = entry["REF_AREA"] as string;
                
                if (!acc[key]) {
                    acc[key] = [];
                }

                acc[key].push(entry);
                return acc;
            }, {});
        console.log("adm1Data ", adm1Data);

        // map data: one value per region for the current time + scenario  
        // const mapData = Object.keys(adm1Data).flatMap((refArea: string) => {
        //     return adm1Data[refArea].filter((entry: Feature) => entry["TIME_PERIOD"] === currentTime)
        //         .filter((entry: Feature) => currentTime !== 1980 ? entry["CLIMATE_SCENARIO"] === currentScenario : true)
        //         .map((entry: Feature) => ({ GID_1: entry["REF_AREA"], NAME_1: entry["REF_AREA_NAME"], value: entry["MEDIAN"] }))
        // });

        // console.log("mapData: ", mapData);

    // function setSubnationalName(value: string) {
    //         setCurrentSubnational(prev => {
    //             const next = [...prev];
    //             next[position] = value;
    //             console.log(next);
    //             return next;
    //         })
    // }

    return {adm1Data, adm0ChartData, mapLegendValueRange}
}

    console.log("RENDER STATE:", {
        chartData: chartData ? "exists" : "null",
        mapChartData,
        lineChartData,
        polygons: polygons.features.length
    });

    return (
        <Card className="bg-[#1E1E1E] w-full h-9/10 dark flex items-center shadow-md">
            <ComboBox loadCountryData={loadCountryData} iso3={iso3} setIso3={setIso3}/>
            {chartData ?  
                <div className='flex flex-col'>
                    <MapsChart
                        immutable={true}
                        options={{
                            chart: {
                                map: polygons,
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
                                min: chartData.mapLegendValueRange[currentMeasure.id].minValue,
                                max: chartData.mapLegendValueRange[currentMeasure.id].maxValue,
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
                                    // text: colorAxisTitle.find(i => i.exposure.includes(currentExposure) && i.hazard.includes(currentHazard) && i.Measure.includes(currentMeasure.measures[0]))?.title,
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
                                                console.log(this.GID_1);
                                                setLineChartData(lineChartDataPrep(chartData.adm1Data[this.GID_1]))                       
                                            }
                                        }
                                    }
                                }
                            }
                        }}
                    >
                       
                        <MapSeries
                            data={mapChartData}
                            joinBy={['GID_1', 'GID_1']}
                            keys={['NAME_1', 'value']}
                            nullColor="#c9c9c9"
                        /> 
                        
                    </MapsChart>
                    {/* <Chart
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
                                // text: colorAxisTitle.find(i => i.exposure.includes(currentExposure) && i.hazard.includes(currentHazard) && i.Measure.includes(currentMeasure.measures[0]))?.lineChartInfo
                                //  + "" + colorAxisTitle.find(i => i.exposure.includes(currentExposure) && i.hazard.includes(currentHazard) && i.Measure.includes(currentMeasure.measures[0]))?.lineChartInfo2
                                //  + ": " + country[position].name + " " + currentSubnational[position],
                                text: countryByIso3[iso3] + colorAxisTitle.filter((desc) => desc.exposure.includes(currentExposure) && desc.hazard.includes(currentHazard) && desc.measure.includes(currentMeasure.id)),
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
                            categories={lineChartXLabels}
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
                        {urlObject[currentHazard][currentExposure].scenarios.map((scenario: string) =>
                            <Series
                                key={scenario}
                                type="line"
                                name={scenarioMapper[scenario]}
                                data={lineChartData[scenario]}
                                marker={{
                                    radius: 6,
                                    lineWidth: 2,
                                    lineColor: 'white',
                                }}
                            />
                        )}
                    </Chart> */}
                </div>
                : 
                <Button disabled size="sm">
                    <Spinner data-icon="inline-start" />
                    Loading...
                </Button>
        }
        </Card>
        )
    }
