export const URL_BASE = "https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services";

export const urlObject: Record<string, Record<string, { url: string, measure: string[], threshold?: string, scenarios: string[] }>> = {
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
            scenarios: ["SSP126", "SSP245", "SSP370"]
        }
    },
    "Temperature Extremes":
    {
        "Population": {
            url: `${URL_BASE}/temperature_population_table/FeatureServer/0/query`,
            measure: ["HD_PW_EXP", "TN_PW_EXP", "ID_PW_EXP"],
            scenarios: ["SSP126", "SSP245", "SSP370"],
            threshold: "TEMP_THRESHOLD"
        },
        "Livestock": {
            url: `${URL_BASE}/temperature_livestock_table/FeatureServer/0/query`,
            measure: ["HD_LW_EXP"],
            scenarios: ["SSP126", "SSP245", "SSP370"],
            threshold: "TEMP_THRESHOLD"
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