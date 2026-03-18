import { countryByIso3 } from '@/data/isoCountries';

export const URL_BASE = "https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services";

export const urlObject: Record<string, Record<string, { url: string, measure: string[], threshold?: {type: string; group: string[]}, scenarios: string[] }>> = {
    "Riverine Flooding":
    {
        "Population": {
            url: `${URL_BASE}/riverine_population_table/FeatureServer/0/query`,
            measure: ["RF_PW_EXP"],
            scenarios: ["rcp4p5", "rcp8p5"]
        }
    },
    "Drought":
    {
        "Cropland": {
            url: `${URL_BASE}/drought_cropland_table/FeatureServer/0/query`,
            measure: ["CDD_CROP_EXP", "SPEI_CROP_EXP"],
            scenarios: ["SSP126", "SSP245", "SSP370"]
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
                group: ["_Z", "H_20", "H_26", "H_32", "H_30", "H_35", "H_40"]
            }
        },
        "Livestock": {
            url: `${URL_BASE}/temperature_livestock_table/FeatureServer/0/query`,
            measure: ["HD_LW_EXP"],
            scenarios: ["SSP126", "SSP245", "SSP370"],
            threshold: {
                type: "TEMP_THRESHOLD",
                group: ["H_35"]
            }
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
    SPEI_CROP_EXP: "SPEI",
    HD_LW_EXP: "Hot Days"
};

const thresholdToTitle: Record<string, string> = {
    _Z: "< 0",
    H_20: "> 20",
    H_26: "> 26",
    H_32: "> 32",
    H_30: "> 30",
    H_35: "> 35",
    H_40: "> 40"
}

export const comparisonTitles = (hazard: string, exposure: string, measure: string, threshold: string, iso3: string) => {

    const colorAxisTitleMapper: Record<string, Record<string, Record<string, string>>> = {
        "Temperature Extremes": {
            "Population": {
                colorAxis: "Number of Days",
                chart: `Population-weighted Number of ${measureMapper[measure]} at Tmax ${thresholdToTitle[threshold]}° Celsius: ${countryByIso3[iso3]}`
            },
            "Livestock": {
                colorAxis: "Number of Days",
                chart: `Livestock-weighted Number of ${measureMapper[measure]} at Tmax ${thresholdToTitle[threshold]}° Celsius: ${countryByIso3[iso3]}`
            },
            "GDP": {
                colorAxis: "Number of Days",
                chart: `GDP-weighted Number of ${measureMapper[measure]} at Tmax ${thresholdToTitle[threshold]}° Celsius: ${countryByIso3[iso3]}`
            },
            "Urban GDP": {
                colorAxis: "Number of Days",
                chart: `Urban GDP-weighted Number of ${measureMapper[measure]} at Tmax ${thresholdToTitle[threshold]}° Celsius: ${countryByIso3[iso3]}`
            }
        },
        "Riverine Flooding": {
            "Population": {
                colorAxis: "Number of People",
                chart: `Number of People Exposed to Riverine Flooding: ${countryByIso3[iso3]}`
            },
            "Buildings": {
                colorAxis: "Number of Buildings",
                chart: `Number of Buildings Exposed to Riverine Flooding: ${countryByIso3[iso3]}`
            },
            "Builtup Area": {
                colorAxis: "Builtup Area (Km²)",
                chart: `Builtup Area (Km²) Exposed to Riverine Flooding: ${countryByIso3[iso3]}`
            },
            "GDP": {
                colorAxis: "Percentage of GDP",
                chart: `Percentage of GDP Exposed to Riverine Flooding: ${countryByIso3[iso3]}`
            },
            "Urban GDP": {
                colorAxis: "Percentage of Urban GDP",
                chart: `Percentage of Urban GDP Exposed to Riverine Flooding: ${countryByIso3[iso3]}`
            }
        },
        "Coastal Flooding": {
            "Population": {
                colorAxis: "Number of People",
                chart: `Number of People Exposed to Coastal Flooding: ${countryByIso3[iso3]}`
            },
            "Buildings": {
                colorAxis: "Number of Buildings",
                chart: `Number of Buildings Exposed to Coastal Flooding: ${countryByIso3[iso3]}`
            },
            "Builtup Area": {
                colorAxis: "Builtup Area (Km²)",
                chart: `Builtup Area (Km²) Exposed to Coastal Flooding: ${countryByIso3[iso3]}`
            },
            "GDP": {
                colorAxis: "Percentage of GDP",
                chart: `Percentage of GDP Exposed to Coastal Flooding: ${countryByIso3[iso3]}`
            },
            "Urban GDP": {
                colorAxis: "Percentage of Urban GDP",
                chart: `Percentage of Urban GDP Exposed to Coastal Flooding: ${countryByIso3[iso3]}`
            },
        },
        "Drought": {
            "Cropland": {
                colorAxis: `${measureMapper[measure] == "Dry Days" ? "Number of Dry Days" : "SPEI Index"}`,
                chart: `${measureMapper[measure] == "Dry Days" ? `Population-weighted Number of Dry Days ${countryByIso3[iso3]}` : "Standardized Precipitation Evapotranspiration"}`
            }
        }
    }

    return colorAxisTitleMapper[hazard][exposure]
}
