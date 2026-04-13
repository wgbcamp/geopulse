import { countryByIso3 } from '@/config/isoCountries';

export const URL_BASE = "https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services";
export const URL_RTBASE = "https://tiledimageservices9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services";
export const URL_GRIDBASE = URL_RTBASE;

export const gridObject: Record<string, Record<string, Record<string, Record<number, string>>>> = {
    "Riverine Flooding": {
        "Population": {
            "rcp4p5": {
                1980: `${URL_GRIDBASE}/riverine_population_historical_1980_rp1000/ImageServer`,
                2030: `${URL_GRIDBASE}/riverine_population_rcp4p5_2030_rp1000/ImageServer`,
                2050: `${URL_GRIDBASE}/riverine_population_rcp4p5_2050_rp1000/ImageServer`,
                2080: `${URL_GRIDBASE}/riverine_population_rcp4p5_2080_rp1000/ImageServer`,
            },
            "rcp8p5": {
                1980: `${URL_GRIDBASE}/riverine_population_historical_1980_rp1000/ImageServer`,
                2030: `${URL_GRIDBASE}/riverine_population_rcp8p5_2030_rp1000/ImageServer`,
                2050: `${URL_GRIDBASE}/riverine_population_rcp8p5_2050_rp1000/ImageServer`,
                2080: `${URL_GRIDBASE}/riverine_population_rcp8p5_2080_rp1000/ImageServer`,
            },
        }
    },
    "Coastal Flooding": {
        "Population": {
            "rcp4p5": {
                1980: `${URL_GRIDBASE}/coastal_population_historical_1980_rp1000/ImageServer`,
                2030: `${URL_GRIDBASE}/coastal_population_rcp4p5_2030_rp1000/ImageServer`,
                2050: `${URL_GRIDBASE}/coastal_population_rcp4p5_2050_rp1000/ImageServer`,
                2080: `${URL_GRIDBASE}/coastal_population_rcp4p5_2080_rp1000/ImageServer`,
            },
            "rcp8p5": {
                1980: `${URL_GRIDBASE}/coastal_population_historical_1980_rp1000/ImageServer`,
                2030: `${URL_GRIDBASE}/coastal_population_rcp8p5_2030_rp1000/ImageServer`,
                2050: `${URL_GRIDBASE}/coastal_population_rcp8p5_2050_rp1000/ImageServer`,
                2080: `${URL_GRIDBASE}/coastal_population_rcp8p5_2080_rp1000/ImageServer`,
            },
        }
    }
};

export const urlObject: Record<string, Record<string, { url: string, measure: string[], threshold?: {type: string; group: Record<string, string>}, thresholdToMeasure?: Record<string, string>, scenarios: string[], source: string, value: string }>> = {
    "Riverine Flooding":
    {
        "Population": {
            url: `${URL_BASE}/riverine_population_table/FeatureServer/0/query`,
            measure: ["RF_PW_EXP"],
            scenarios: ["rcp4p5", "rcp8p5"],
            threshold: {
                type: "RETURN_PERIOD",
                group: { 
                    "rp0005": "20%",
                    "rp0010": "10%",  
                    "rp0025": "2%",  
                    "rp0050": "1%",  
                    "rp0100": "0.4%",  
                    "rp0500": "0.2%",  
                    "rp1000": "0.1%"
                }
            },
            thresholdToMeasure: {
                "rp1000": "RF_PW_EXP",
                "rp0500": "RF_PW_EXP",
                "rp0100": "RF_PW_EXP",
                "rp0050": "RF_PW_EXP",
                "rp0025": "RF_PW_EXP",
                "rp0010": "RF_PW_EXP",
                "rp0005": "RF_PW_EXP",
            },
            value: "PERCENT_",
            source: "Sources: IMF Staff Calculations.",
        },
        "Buildings": {
            url: `${URL_BASE}/riverine_buildings_table/FeatureServer/0/query`,
            measure: ["RF_BLD_EXP"],
            scenarios: ["rcp4p5", "rcp8p5"],
            threshold: {
                type: "RETURN_PERIOD",
                group: { 
                    "rp0005": "20%",
                    "rp0010": "10%",  
                    "rp0025": "2%",  
                    "rp0050": "1%",  
                    "rp0100": "0.4%",  
                    "rp0500": "0.2%",  
                    "rp1000": "0.1%"
                }
            },
            thresholdToMeasure: {
                "rp1000": "RF_BLD_EXP",
                "rp0500": "RF_BLD_EXP",
                "rp0100": "RF_BLD_EXP",
                "rp0050": "RF_BLD_EXP",
                "rp0025": "RF_BLD_EXP",
                "rp0010": "RF_BLD_EXP",
                "rp0005": "RF_BLD_EXP",
            },
            value: "PERCENT_",
            source: "Sources: IMF Staff Calculations."
        },
        "GDP": {
            url: `${URL_BASE}/riverine_gdp_table/FeatureServer/0/query`,
            measure: ["RF_GDP_EXP"],
            scenarios: ["rcp4p5", "rcp8p5"],
            threshold: {
                type: "RETURN_PERIOD",
                group: { 
                    "rp0005": "20%",
                    "rp0010": "10%",  
                    "rp0025": "2%",  
                    "rp0050": "1%",  
                    "rp0100": "0.4%",  
                    "rp0500": "0.2%",  
                    "rp1000": "0.1%"
                }
            },
            thresholdToMeasure: {
                "rp1000": "RF_GDP_EXP",
                "rp0500": "RF_GDP_EXP",
                "rp0100": "RF_GDP_EXP",
                "rp0050": "RF_GDP_EXP",
                "rp0025": "RF_GDP_EXP",
                "rp0010": "RF_GDP_EXP",
                "rp0005": "RF_GDP_EXP",
            },
            value: "PERCENT_",
            source: "Sources: IMF Staff Calculations."
        },
        "Urban GDP": {
            url: `${URL_BASE}/riverine_ugdp_table/FeatureServer/0/query`,
            measure: ["RF_UGDP_EXP"],
            scenarios: ["rcp4p5", "rcp8p5"],
            threshold: {
                type: "RETURN_PERIOD",
                group: {
                    "rp0005": "20%",
                    "rp0010": "10%",  
                    "rp0025": "2%",  
                    "rp0050": "1%",  
                    "rp0100": "0.4%",  
                    "rp0500": "0.2%",  
                    "rp1000": "0.1%"
                }
            },
            thresholdToMeasure: {
                "rp1000": "RF_UGDP_EXP",
                "rp0500": "RF_UGDP_EXP",
                "rp0100": "RF_UGDP_EXP",
                "rp0050": "RF_UGDP_EXP",
                "rp0025": "RF_UGDP_EXP",
                "rp0010": "RF_UGDP_EXP",
                "rp0005": "RF_UGDP_EXP",
            },
            value: "PERCENT_",
            source: "Sources: IMF Staff Calculations."
        }
    },
    "Coastal Flooding":
    {
        "Population": {
            url: `${URL_BASE}/coastal_population_table/FeatureServer/0/query`,
            measure: ["CF_PW_EXP"],
            scenarios: ["rcp4p5", "rcp8p5"],
            threshold: {
                type: "RETURN_PERIOD",
                group: { 
                    "rp0005": "20%",
                    "rp0010": "10%",  
                    "rp0025": "2%",  
                    "rp0050": "1%",  
                    "rp0100": "0.4%",  
                    "rp0500": "0.2%",  
                    "rp1000": "0.1%"
                }
            },
            thresholdToMeasure: {
                "rp1000": "CF_PW_EXP",
                "rp0500": "CF_PW_EXP",
                "rp0100": "CF_PW_EXP",
                "rp0050": "CF_PW_EXP",
                "rp0025": "CF_PW_EXP",
                "rp0010": "CF_PW_EXP",
                "rp0005": "CF_PW_EXP",
            },
            value: "PERCENT_",
            source: "Sources: IMF Staff Calculations."
        },
        "Buildings": {
            url: `${URL_BASE}/coastal_buildings_table/FeatureServer/0/query`,
            measure: ["CF_BLD_EXP"],
            scenarios: ["rcp4p5", "rcp8p5"],
            threshold: {
                type: "RETURN_PERIOD",
                group: { 
                    "rp0005": "20%",
                    "rp0010": "10%",  
                    "rp0025": "2%",  
                    "rp0050": "1%",  
                    "rp0100": "0.4%",  
                    "rp0500": "0.2%",  
                    "rp1000": "0.1%"
                }
            },
            thresholdToMeasure: {
                "rp1000": "CF_BLD_EXP",
                "rp0500": "CF_BLD_EXP",
                "rp0100": "CF_BLD_EXP",
                "rp0050": "CF_BLD_EXP",
                "rp0025": "CF_BLD_EXP",
                "rp0010": "CF_BLD_EXP",
                "rp0005": "CF_BLD_EXP",
            },
            value: "PERCENT_",
            source: "Sources: IMF Staff Calculations."
        },
        "GDP": {
            url: `${URL_BASE}/coastal_gdp_table/FeatureServer/0/query`,
            measure: ["CF_GDP_EXP"],
            scenarios: ["rcp4p5", "rcp8p5"],
            threshold: {
                type: "RETURN_PERIOD",
                group: { 
                    "rp0005": "20%",
                    "rp0010": "10%",  
                    "rp0025": "2%",  
                    "rp0050": "1%",  
                    "rp0100": "0.4%",  
                    "rp0500": "0.2%",  
                    "rp1000": "0.1%"
                }
            },
            thresholdToMeasure: {
                "rp1000": "CF_GDP_EXP",
                "rp0500": "CF_GDP_EXP",
                "rp0100": "CF_GDP_EXP",
                "rp0050": "CF_GDP_EXP",
                "rp0025": "CF_GDP_EXP",
                "rp0010": "CF_GDP_EXP",
                "rp0005": "CF_GDP_EXP",
            },
            value: "PERCENT_",
            source: "Sources: IMF Staff Calculations."
        },
        "Urban GDP": {
            url: `${URL_BASE}/coastal_ugdp_table/FeatureServer/0/query`,
            measure: ["CF_UGDP_EXP"],
            scenarios: ["rcp4p5", "rcp8p5"],
            threshold: {
                type: "RETURN_PERIOD",
                group: {
                    "rp0005": "20%",
                    "rp0010": "10%",  
                    "rp0025": "2%",  
                    "rp0050": "1%",  
                    "rp0100": "0.4%",  
                    "rp0500": "0.2%",  
                    "rp1000": "0.1%"
                }
            },
            thresholdToMeasure: {
                "rp1000": "CF_UGDP_EXP",
                "rp0500": "CF_UGDP_EXP",
                "rp0100": "CF_UGDP_EXP",
                "rp0050": "CF_UGDP_EXP",
                "rp0025": "CF_UGDP_EXP",
                "rp0010": "CF_UGDP_EXP",
                "rp0005": "CF_UGDP_EXP",
            },
            value: "PERCENT_",
            source: "Sources: IMF Staff Calculations."
        }
    },
    "Drought":
    {
        "Cropland": {
            url: `${URL_BASE}/drought_cropland_table/FeatureServer/0/query`,
            measure: ["CDD_CROP_EXP", "SPEI_CROP_EXP"],
            scenarios: ["SSP126", "SSP245", "SSP370"],
            value: "MEDIAN",
            source: "Sources: OECD."
        }
    },
    "Temperature Extremes":
    {
        "Population": {
            url: `${URL_BASE}/temperature_population_table/FeatureServer/0/query`,
            measure: ["ID_PW_EXP", "TN_PW_EXP", "HD_PW_EXP"],
            scenarios: ["SSP126", "SSP245", "SSP370"],
            threshold: {
                type: "TEMP_THRESHOLD",
                group: { 
                    "_Z": "< 0",
                    "H_20": "> 20",  
                    "H_26": "> 26",  
                    "H_32": "> 32",  
                    "H_30": "> 30",  
                    "H_35": "> 35",  
                    "H_40": "> 40"
                }
            },
            thresholdToMeasure: {
                "_Z": "ID_PW_EXP",
                "H_20": "TN_PW_EXP",
                "H_26": "TN_PW_EXP",
                "H_32": "TN_PW_EXP",
                "H_30": "HD_PW_EXP",
                "H_35": "HD_PW_EXP",
                "H_40": "HD_PW_EXP",
            },
            value: "MEDIAN",
            source: "Sources: OECD."
        },
        "Livestock": {
            url: `${URL_BASE}/temperature_livestock_table/FeatureServer/0/query`,
            measure: ["HD_LW_EXP"],
            scenarios: ["SSP126", "SSP245", "SSP370"],
            threshold: {
                type: "TEMP_THRESHOLD",
                group: { "H_35": "> 35" }
            },
            value: "MEDIAN",
            source: "Sources: OECD."
            
        }

    }
}

export const scenarioMapper: Record<string, string> = {
    rcp4p5: 'Orderly',
    rcp8p5: 'Disorderly',
    SSP126: 'Orderly',
    SSP245: 'Disorderly',
    SSP370: 'Hot House'
};

export const measureMapper: Record<string, string> = {
    HD_PW_EXP: "Hot Days",
    TN_PW_EXP: "Tropical Nights",
    ID_PW_EXP: "Icing Days",
    CDD_CROP_EXP: "Dry Days",
    SPEI_CROP_EXP: "SPEI Index",
    HD_LW_EXP: "Hot Days",
    RF_PW_EXP: "Flood Level" // not sure
};

const thresholdToTitle: Record<string, string> = {
    _Z: "Tmax < 0",
    H_20: "Tmin > 20",
    H_26: "Tmin > 26",
    H_32: "Tmin > 32",
    H_30: "Tmax > 30",
    H_35: "Tmax > 35",
    H_40: "Tmax > 40"
}


export const realtimeObject: Record<string, { url: string, colorScheme: Array<Record<string, any>> }> = {

    "Population": 
    {
        url: `${URL_RTBASE}/worldpop_population/ImageServer`,
        colorScheme: [
            {
                "minValue": 0.0,
                "maxValue": 2.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [0, 0, 4, 1.0]
                },
                "label": "< 2"
            },
            {
                "minValue": 2.0,
                "maxValue": 8.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [10, 58, 74, 1.0]
                },
                "label": "8"
            },
            {
                "minValue": 8.0,
                "maxValue": 59.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [27, 138, 138, 1.0]
                },
                "label": "59"
            },
            {
                "minValue": 59.0,
                "maxValue": 284.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [94, 201, 98, 1.0]
                },
                "label": "284"
            },
            {
                "minValue": 284.0,
                "maxValue": 107609.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [212, 255, 80, 1.0]
                },
                "label": "> 284"
            }
        ]

    },
    "Vulnerable People":
    {
        url: `${URL_RTBASE}/worldpop_vulnerable_population/ImageServer`,
        colorScheme: [
            {
                "minValue": 0.0,
                "maxValue": 2.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [0, 0, 4, 1.0]
                },
                "label": "< 2"
            },
            {
                "minValue": 2.0,
                "maxValue": 8.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [10, 58, 74, 1.0]
                },
                "label": "8"
            },
            {
                "minValue": 8.0,
                "maxValue": 59.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [27, 138, 138, 1.0]
                },
                "label": "59"
            },
            {
                "minValue": 59.0,
                "maxValue": 284.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [94, 201, 98, 1.0]
                },
                "label": "284"
            },
            {
                "minValue": 284.0,
                "maxValue": 107609.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [212, 255, 80, 1.0]
                },
                "label": "> 284"
            }
        ]

    },
    "Buildings":
    {
       url: `${URL_RTBASE}/gba_buildings_count/ImageServer`,
        colorScheme: [
            {
                "minValue": 0.0,
                "maxValue": 1.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [0, 0, 139, 1.0]
                },
                "label": "< 1"
            },
            {
                "minValue": 1.0,
                "maxValue": 5.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [0, 153, 204, 1.0]
                },
                "label": "5"
            },
            {
                "minValue": 5.0,
                "maxValue": 18.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [0, 204, 136, 1.0]
                },
                "label": "18"
            },
            {
                "minValue": 18.0,
                "maxValue": 81.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [204, 204, 0, 1.0]
                },
                "label": "81"
            },
            {
                "minValue": 81.0,
                "maxValue": 30203.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [255, 0, 0, 1.0]
                },
                "label": "> 81"
            }
        ]
 
    },
    "Nightlights":
    {
        url: `${URL_RTBASE}/viirs_nighttimelights_harmonized/ImageServer`,
        colorScheme: [
            {
                'minValue': 7,
                'maxValue': 10,
                'symbol': { 'type': 'simple-fill', 'color': [45, 48, 64, 1.0] },
                'label': '< 10'
            },
            {
                'minValue': 10,
                'maxValue': 15,
                'symbol': { 'type': 'simple-fill', 'color': [74, 80, 104, 1.0] },
                'label': '15'
            },
            {
                'minValue': 15,
                'maxValue': 25,
                'symbol': { 'type': 'simple-fill', 'color': [120, 136, 168, 1.0] },
                'label': '25'
            },
            {
                'minValue': 25,
                'maxValue': 40,
                'symbol': { 'type': 'simple-fill', 'color': [255, 200, 100, 1.0] },
                'label': '40'
            },
            {
                'minValue': 40,
                'maxValue': 63,
                'symbol': { 'type': 'simple-fill', 'color': [255, 255, 255, 1.0] },
                'label': '> 40'
            }
        ]
    },
    "GDP":
    {
        url: `${URL_RTBASE}/imf_gdp_total_2021_logv3/ImageServer`,
        colorScheme: [
            {
                "minValue": 4.0,
                "maxValue": 6096.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [50, 48, 50, 1.0]
                },
                "label": "< $6.1K"
            },
            {
                "minValue": 6096.0,
                "maxValue": 104910.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [90, 55, 65, 1.0]
                },
                "label": "$104.9K"
            },
            {
                "minValue": 104910.0,
                "maxValue": 627995.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [160, 70, 100, 1.0]
                },
                "label": "$628.0K"
            },
            {
                "minValue": 627995.0,
                "maxValue": 13321377.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [210, 130, 60, 1.0]
                },
                "label": "$13.3M"
            },
            {
                "minValue": 13321377.0,
                "maxValue": 4346626560.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [240, 249, 33, 1.0]
                },
                "label": "> $13.3M"
            }
        ]

    },
    "Urban GDP":
    {
        url: `${URL_RTBASE}/murakami_urbangdp/ImageServer`,
        colorScheme: [
            {
                "minValue": 4.0,
                "maxValue": 6096.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [50, 48, 50, 1.0]
                },
                "label": "< $6.1K"
            },
            {
                "minValue": 6096.0,
                "maxValue": 104910.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [90, 55, 65, 1.0]
                },
                "label": "$104.9K"
            },
            {
                "minValue": 104910.0,
                "maxValue": 627995.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [160, 70, 100, 1.0]
                },
                "label": "$628.0K"
            },
            {
                "minValue": 627995.0,
                "maxValue": 13321377.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [210, 130, 60, 1.0]
                },
                "label": "$13.3M"
            },
            {
                "minValue": 13321377.0,
                "maxValue": 4346626560.0,
                "symbol": {
                    "type": "simple-fill",
                    "color": [240, 249, 33, 1.0]
                },
                "label": "> $13.3M"
            }
        ]
 
    },
    "Cropland":
    {
        url: `${URL_RTBASE}/esri_cropland/ImageServer`,
        colorScheme: [
            {
                'minValue': 0.5,
                'maxValue': 1.0,
                'symbol': { 'type': 'simple-fill', 'color': [168, 198, 108, 1] },
                'label': ''
            }
        ]
    },
    "Airports":
    {
        url: `${URL_BASE}/airports_latest/FeatureServer`,
        colorScheme: [
            {
                'minValue': 0.5,
                'maxValue': 1.0,
                'symbol': { 'type': 'simple-fill', 'color': [255, 200, 0, 1] },
                'label': ''
            }
        ]
    },
    "Ports":
    {
        url: `${URL_BASE}/PortWatch_ports_database/FeatureServer`,
        colorScheme: [
            {
                'minValue': 0.5,
                'maxValue': 1.0,
                'symbol': { 'type': 'simple-fill', 'color': [255, 200, 0, 1] },
                'label': ''
            }
        ]
    }
}

export const comparisonTitles = (hazard: string, exposure: string, measure: string, threshold: string, iso3: string) => {

    const colorAxisTitleMapper: Record<string, Record<string, Record<string, string>>> = {
        "Temperature Extremes": {
            "Population": {
                colorAxis: "Number of Days",
                chart: `Population-weighted Number of ${measureMapper[measure]} at ${thresholdToTitle[threshold]}° Celsius: ${countryByIso3[iso3]}`,
            },
            "Livestock": {
                colorAxis: "Number of Days",
                chart: `Livestock-weighted Number of ${measureMapper[measure]} at ${thresholdToTitle[threshold]}° Celsius: ${countryByIso3[iso3]}`,
            },
            "GDP": {
                colorAxis: "Number of Days",
                chart: `GDP-weighted Number of ${measureMapper[measure]} at ${thresholdToTitle[threshold]}° Celsius: ${countryByIso3[iso3]}`,
            },
            "Urban GDP": {
                colorAxis: "Number of Days",
                chart: `Urban GDP-weighted Number of ${measureMapper[measure]} at ${thresholdToTitle[threshold]}° Celsius: ${countryByIso3[iso3]}`,
            }
        },
        "Riverine Flooding": {
            "Population": {
                colorAxis: "Percentage of Population",
                chart: `Percentage of Population Exposed to Riverine Flooding: ${countryByIso3[iso3]}`,
            },
            "Buildings": {
                colorAxis: "Percentage of Buildings",
                chart: `Percentage of Buildings Exposed to Riverine Flooding: ${countryByIso3[iso3]}`,
            },
            "Builtup Area": {
                colorAxis: "Builtup Area (Km²)",
                chart: `Builtup Area (Km²) Exposed to Riverine Flooding: ${countryByIso3[iso3]}`,
            },
            "GDP": {
                colorAxis: "Percentage of GDP",
                chart: `Percentage of GDP Exposed to Riverine Flooding: ${countryByIso3[iso3]}`,
            },
            "Urban GDP": {
                colorAxis: "Percentage of Urban GDP",
                chart: `Percentage of Urban GDP Exposed to Riverine Flooding: ${countryByIso3[iso3]}`,
            }
        },
        "Coastal Flooding": {
            "Population": {
                colorAxis: "Percentage of Population",
                chart: `Percentage of Population Exposed to Coastal Flooding: ${countryByIso3[iso3]}`,
            },
            "Buildings": {
                colorAxis: "Percentage of Buildings",
                chart: `Percentage of Buildings Exposed to Coastal Flooding: ${countryByIso3[iso3]}`,
            },
            "Builtup Area": {
                colorAxis: "Builtup Area (Km²)",
                chart: `Builtup Area (Km²) Exposed to Coastal Flooding: ${countryByIso3[iso3]}`,
            },
            "GDP": {
                colorAxis: "Percentage of GDP",
                chart: `Percentage of GDP Exposed to Coastal Flooding: ${countryByIso3[iso3]}`,
            },
            "Urban GDP": {
                colorAxis: "Percentage of Urban GDP",
                chart: `Percentage of Urban GDP Exposed to Coastal Flooding: ${countryByIso3[iso3]}`,
            },
        },
        "Drought": {
            "Cropland": {
                colorAxis: `${measureMapper[measure] == "Dry Days" ? "Number of Consecutive Dry Days" : "Cropland SPEI Index"}`,
                chart: `${measureMapper[measure] == "Dry Days" ? ` Maximum Number of Consecutive Dry Days on Cropland: ${countryByIso3[iso3]}` : "Standardized Precipitation Evapotranspiration Index for Cropland"}`
            }
        }
    }

    return colorAxisTitleMapper[hazard][exposure]
}
