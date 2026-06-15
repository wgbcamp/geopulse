import { createFileRoute } from '@tanstack/react-router'

import { Region } from "../components/region"
import { Thresholds } from "../components/thresholds"

import { useState, useEffect } from 'react'

export const Route = createFileRoute('/compare')({
  component: CompareView,
})

 type JsonShape = {
        features: Array<{
            properties: {
                GID_0: string,
                GID_1: string,
                COUNTRY: string,
                NAME_1: string
            }
        }>
    };

function CompareView() {
    let [geoJson, setGeoJson] = useState<JsonShape | any>(null);

    const base = import.meta.env.VITE_BASE;

    useEffect(() => {
        const getGeoJson = async () => {
            var getData = await fetch(`${base}/GADM_ADMIN1.json`);
            geoJson = await getData.json();
            setGeoJson(geoJson);
            console.log(geoJson)
        }
        getGeoJson();
    }, []);
    return (
        <div className="bg-[#1E1E1E] w-full flex justify-center pb-15" >
            {geoJson ?
                <div className="w-9/10 dark flex flex-col lg:flex-row gap-5 pt-18">
                    <Region
                        defaultIso3={"CHN"}
                        geoJson={geoJson}
                    />
                    <Region
                        defaultIso3={"BGD"}
                        geoJson={geoJson}
                    />
                </div>
                :
                null}
            <Thresholds />
        </div>
    )
}


