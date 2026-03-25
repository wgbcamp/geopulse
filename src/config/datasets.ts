import { countryByIso3 } from '@/config/isoCountries';

export const URL_BASE = "https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services";

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
            source: "Sources: IMF Staff Calculations."
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
