import React, { useEffect } from 'react';
import { ComboBox } from './comboBox';
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { MapsChart } from '@highcharts/react/Maps';
import {
    Chart,
    Title,
    Subtitle,
    YAxis,
    XAxis,
    Legend,
    Credits,
    Highcharts
} from '@highcharts/react';

import { Exporting } from '@highcharts/react/options/Exporting';

import { countryByIso3 } from '@/data/isoCountries';
import { urlObject, scenarioMapper, comparisonTitles } from '@/data/datasets';

export const Region = ( props: any ) => {
    props = {
        ...props.props,
        defaultIso3: props.defaultIso3,
    }
    type Feature = Record<string, any>;

    type ChartData = {
        adm1Data: Record<string, Feature[]>,
        adm0ChartData: Feature[],
        mapLegendValueRange: Record<string, MeasureRange>
    };

    const [iso3, setIso3] = React.useState(props.defaultIso3);
    const [chartData, setChartData] = React.useState<ChartData | null>(null);
    const [mapChartData, setMapChartData] = React.useState<Feature[]>([])
    const [lineChartData, setLineChartData] = React.useState<Record<string, number[]>>({});
    const [polygons, setPolygons] = React.useState({
        features: [{}],
        iso3: iso3,
        name: "",
        type: "FeatureCollection"
    });

    const [currentSubnational, setSubnational] = React.useState<Record<any, any>>({refAreaName: null, refArea: null, iso3: null});

    // set global highcharts chart styling options
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

    Highcharts.SVGRenderer.prototype.symbols.download = function (x, y, w, h) {
    const path = [
        // Arrow stem
        'M', x + w * 0.5, y,
        'L', x + w * 0.5, y + h * 0.7,
        // Arrow head
        'M', x + w * 0.3, y + h * 0.5,
        'L', x + w * 0.5, y + h * 0.7,
        'L', x + w * 0.7, y + h * 0.5,
        // Box
        'M', x, y + h * 0.9,
        'L', x, y + h,
        'L', x + w, y + h,
        'L', x + w, y + h * 0.9
    ];
    return path;
};


    const lineChartStyleMapper: Record<string, Record<string, string>> = {
        rcp4p5: {color: '#407EC9', symbol: 'circle'},
        rcp8p5: {color: '#FF8200', symbol: 'triangle'},
        SSP126: {color: '#407EC9', symbol: 'circle'},
        SSP245: {color: '#FF8200', symbol: 'triangle'},
        SSP370: {color: '#DA291C', symbol: 'diamond'}
    }


    // fetch new data when country, hazard or exposure changes
    useEffect(() => {
        var loadCountryData = async (iso3: string) => {
            // reset subnational value when the iso3 property is not null and does not match the iso3 property of the new country
            if (currentSubnational.iso3 && currentSubnational.iso3 !== iso3) {
                setSubnational({refAreaName: null, refArea: null, iso3: null});
            }
        
            // retrieve polygons from geoJson object
            const countryPolygons = {
                features: props.geoJson.features.filter((f: any) => f.properties.GID_0 === iso3),
                iso3: iso3,
                name: countryByIso3[iso3],
                type: "FeatureCollection"
            };

            // store polygon data for selected country
            setPolygons(countryPolygons);

            // run query based on iso3
            const queryResults = await query(iso3);

            // first data organization based on filters
            const arrangedData = arrangeData(queryResults);

            // assign data to chartData state
            setChartData(arrangedData);

            // second data organization for filters, used in map and line chart
            setMapChartData(mapChartDataPrep(arrangedData.adm1Data));
            setLineChartData(lineChartDataPrep(arrangedData.adm1Data[currentSubnational.refArea] ?? arrangedData.adm0ChartData));

            // reset subnational value when the currentSubnational refArea property does not exist in the arrangedData.adm1Data object 
            if (!arrangedData.adm1Data[currentSubnational.refArea]) {
                setSubnational({refAreaName: null, refArea: null, iso3: null});
            }

            // check and see if the currentScenario exists on the chosen table based on urlObject
            if (
                !Object.values(urlObject[props.currentHazard][props.currentExposure].scenarios)
                    .map((k) => scenarioMapper[k])
                    .includes(scenarioMapper[props.currentScenario])) {
                props.setScenario(urlObject[props.currentHazard][props.currentExposure].scenarios[0]); 
            } 
        };
        loadCountryData(iso3);
    }, [iso3, props.currentHazard, props.currentExposure]);

    // re-process already-fetched data
    useEffect(() => {
        if (chartData == null) return; // guard
        setMapChartData(mapChartDataPrep(chartData.adm1Data));
        setLineChartData(lineChartDataPrep(chartData.adm1Data[currentSubnational.refArea] ?? chartData.adm0ChartData));
    }, [props.currentMeasure, props.currentThreshold]);

    useEffect(() => {
        if (chartData == null) return; // guard
        setMapChartData(mapChartDataPrep(chartData.adm1Data));
    }, [props.currentTime, props.currentScenario]);

    async function query(iso3: string) {

        const whereClause = `ISO3 IN ('${iso3}')`;
        const queryString = `where=${encodeURIComponent(whereClause)}`;
        const url = urlObject[props.currentHazard][props.currentExposure].url + `?${queryString}`;

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

        console.log("logging tableData: ", tableData);
        return tableData;
    }

    var lineChartXLabels: string[] = [
        "1980-2014",
        "Early Century",
        "Mid-Century",
        "End-Century",
    ];

    type MeasureRange = {
        maxValue: number;
        minValue: number;
    };

    const daysOfMeasure = ["ID_PW_EXP", "TN_PW_EXP", "HD_PW_EXP", "CDD_CROP_EXP", "HD_LW_EXP"];

    function lineChartDataPrep(data: Record<string, any>[]) {
        const thresholdKey = urlObject[props.currentHazard][props.currentExposure].threshold?.type;
        const filteredData = data
            .filter((entry) => entry["MEASURE"] === props.currentMeasure.id)
            .filter((entry) => thresholdKey
                ? entry[thresholdKey] == props.currentThreshold.threshold
                : true
            );

        const dataPointZero = filteredData.filter((entry) => entry["CLIMATE_SCENARIO"] === "historical" || entry["CLIMATE_SCENARIO"] === "H");

        return urlObject[props.currentHazard][props.currentExposure].scenarios.reduce((acc: Record<string, number[]>, scenario: string) => {
            const scenarioData = filteredData.filter((entry) => entry["CLIMATE_SCENARIO"] === scenario);
            acc[scenario] = dataPointZero
                .concat(scenarioData.sort((a, b) => a.TIME_PERIOD - b.TIME_PERIOD))
                .map((x) => x["MEDIAN"]);
                console.log("logging line chart acc: ", acc);
            return acc;
            
        }, {});
    }

    function mapChartDataPrep(data: Record<string, Feature[]>) {
        console.log("logging data input: ", data);
        const mapData = Object.keys(data).flatMap((refArea: string) => {
            const thresholdKey = urlObject[props.currentHazard][props.currentExposure].threshold?.type;
            console.log("thresholdKey: ", thresholdKey);
            return data[refArea].filter((entry: Feature) => entry["TIME_PERIOD"] === props.currentTime)
                .filter((entry: Feature) => entry["MEASURE"] === props.currentMeasure.id)
                .filter((entry: Feature) => thresholdKey ? entry[thresholdKey] == props.currentThreshold.threshold : true)
                .filter((entry: Feature) => props.currentTime !== 1980 ? scenarioMapper[entry["CLIMATE_SCENARIO"]] === scenarioMapper[props.currentScenario] : true)
                .map((entry: Feature) => ({ GID_1: entry["REF_AREA"], NAME_1: entry["REF_AREA_NAME"], value: entry["MEDIAN"] }))
        });
        console.log("logging mapData: ", mapData);
        return mapData;
    }

    const arrangeData = (data: Feature[]) => {
        console.log("arrange data input!: ", data)
        console.log("Arrange data adm0 input: ", data.filter((entry: Feature) => entry["ADMIN_FILTER"] === "adm0"));
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
                    
                    switch (measure) {
                        case "SPEI_CROP_EXP" : 
                            acc[measure].maxValue = 2.5;
                            acc[measure].minValue = -2.5;
                            break;
                        case "ID_PW_EXP":
                        case "TN_PW_EXP":
                        case "HD_PW_EXP":
                        case "CDD_CROP_EXP":
                            acc[measure].maxValue = 365;
                            acc[measure].minValue = 0;
                            break;
                        default: 
                            acc[measure].maxValue = Math.max(acc[measure].maxValue, median);
                            acc[measure].minValue = Math.min(acc[measure].minValue, median);  
                    }
                }
                


                return acc;
            }, {});
        console.log("ADM1 Min and Max by Measure across all Thresholds: ", mapLegendValueRange);

        // country data for line chart
        const adm0ChartData: Feature[] = data
            .filter((entry: Feature) => entry["ADMIN_FILTER"] === "adm0")
        console.log("adm0ChartData ", adm0ChartData);

        // region selected data && adm1 data for polygons
        const adm1Data = data
            .filter((entry: Feature) => entry["ADMIN_FILTER"] === "adm1")
            .reduce((acc: Record<string, Feature[]>, entry: Feature) => {
                const key = entry["REF_AREA"] as string;

                if (!acc[key]) {
                    acc[key] = [];
                }

                acc[key].push(entry);
                return acc;
            }, {});
        console.log("adm1Data ", adm1Data);

        return { adm1Data, adm0ChartData, mapLegendValueRange }
    }

    return (
        <Card className="bg-[#1E1E1E] w-full h-9/10 dark flex items-center shadow-md">
            <ComboBox iso3={iso3} setIso3={setIso3} />
            {chartData && mapChartData ?
                <div className='flex flex-col'>
                    <MapsChart
                        options={{
                            chart: {
                                map: polygons,
                                backgroundColor: 'RGBA(0,0,0,0)',
                                animation: false,
                                events: {
                                }
                            },
                            mapView: {
                                projection: {
                                    name: 'WebMercator',
                                    rotation: [-50, 0]
                                },
                                padding: 15,
                            },
                            series: [{
                                type: 'map',
                                data: mapChartData,
                                joinBy: ['GID_1', 'GID_1'],
                                keys: ['NAME_1', 'value'],
                                nullColor: '#c9c9c9'
                            }],
                            colorAxis: { 
                                min: chartData.mapLegendValueRange[props.currentMeasure.id]?.minValue,
                                max: chartData.mapLegendValueRange[props.currentMeasure.id]?.maxValue,
                                endOnTick: false,
                                minColor: '#fcdba9',
                                maxColor: '#E35205',
                                  labels: {
                                        style: {
                                            color: "#999999",
                                            fontWeight: "bold",
                                            textOverflow: 'none'
                                        }
                                    },
                                ...(props.currentMeasure.id == "SPEI_CROP_EXP" && {
                                    stops: [
                                        [0.0, '#791F1F'], // Extremely dry
                                        [0.2, '#BA7517'], // Severely dry
                                        [0.3, '#FAC775'], // Moderately dry
                                        [0.5, '#FFFFFF'], // Near normal
                                        [0.7, '#85B7EB'], // Moderately wet
                                        [0.8, '#378ADD'], // Very wet
                                        [1.0, '#0C447C']  // Extremely wet
                                    ],
                                    tickPositions: [-2.5, -2, -1.5, -1, 0, 1, 1.5, 2, 2.5],
                                }),
                                width: '90%',
                            },

                            legend: {
                                title: {
                                    text: comparisonTitles(props.currentHazard, props.currentExposure, props.currentMeasure.id, props.currentThreshold.threshold, iso3).colorAxis,
                                    style: {
                                        color: "white",
                                        fontWeight: "bold"
                                    }
                                }
                            },
                            tooltip: {
                                formatter: function () {

                                    var value = this.point.value;
                                    if (props.currentMeasure.id !== "SPEI_CROP_EXP") {
                                        value = Math.ceil(value).toString();
                                    }
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
                                                if (this.point.NAME_1 == currentSubnational.refAreaName) {
                                                    setLineChartData(lineChartDataPrep(chartData.adm0ChartData));
                                                    setSubnational({refAreaName: null, refArea: null, iso3: null});
                                                } else {
                                                    setSubnational({refAreaName: this.point.NAME_1, refArea: this.GID_1, iso3: iso3});
                                                    setLineChartData(lineChartDataPrep(chartData.adm1Data[this.GID_1]));
                                                }
                                            },
                                        }
                                    },
                                    allowPointSelect: false,
                                    states: {
                                        select: {
                                           
                                        }
                                    },
                                    events: {
                       
                                    }

                                }
                            }
                        }}
                    >
                        <Exporting 
                            buttons={{
                                contextButton: {
                                    symbol: 'download',
                                    symbolSize: 20,      // default is 12, increase as needed
                                    symbolX: 22,         // adjust position to keep it centered
                                    symbolY: 22,
                                    theme: {
                                        fill: 'transparent',
                                        stroke: 'none',
                                        states: {
                                            hover: {
                                                fill: 'transparent', 
                                                stroke: 'none' 
                                            },
                                            select: {
                                                 fill: 'transparent', 
                                                stroke: 'none' 
                                            }
                                        }
                                    },
                                    symbolStroke: '#a3a3a3',
                                    symbolFill: '#a3a3a3',
                                }
                            }}
                        />
                    </MapsChart>
                    <Chart
                        options={{
                            chart: {
                                type: 'line',
                                height: 500,
                                marginTop: 130,
                                events: {
                               
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
                                text: comparisonTitles(props.currentHazard, props.currentExposure, props.currentMeasure.id, props.currentThreshold.threshold, iso3).chart 
                                + (currentSubnational.refAreaName ? " (" + currentSubnational.refAreaName + ")" : "") ,
                                align: 'left',
                                style: {
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: '16px',
                                    width: '60%'
                                },
                                useHTML: true,
                                x: 18,
                                y: 15,
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
                            series: urlObject[props.currentHazard][props.currentExposure].scenarios.map((scenario: string) => ({
                                type: 'line',
                                name: scenarioMapper[scenario],
                                data: lineChartData[scenario],
                                color: lineChartStyleMapper[scenario].color,
                                marker: {
                                    radius: 6,
                                    lineWidth: 2,
                                    symbol: lineChartStyleMapper[scenario].symbol
                                }
                            }))
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
                        <Exporting 
                            buttons={{
                                contextButton: {
                                    symbol: 'download',
                                    symbolSize: 20,      // default is 12, increase as needed
                                    symbolX: 22,         // adjust position to keep it centered
                                    symbolY: 22,
                                    theme: {
                                        fill: 'transparent',
                                        stroke: 'none',
                                        states: {
                                            hover: {
                                                fill: 'transparent', 
                                                stroke: 'none' 
                                            },
                                            select: {
                                                 fill: 'transparent', 
                                                stroke: 'none' 
                                            }
                                        }
                                    },
                                    symbolStroke: '#a3a3a3',
                                    symbolFill: '#a3a3a3',
                                }
                            }}
                        />
                    </Chart>
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
