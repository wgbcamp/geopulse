import { createFileRoute } from '@tanstack/react-router'

import { Region } from "../components/region"
import { Thresholds } from "../components/thresholds"

import { GADM_ADMIN1 } from "../config/GADM_ADMIN1"

export const Route = createFileRoute('/compare')({
  component: CompareView,
})

function CompareView() {
    
    return (
        <div className="bg-[#1E1E1E] w-full flex justify-center pb-15" >
                <div className="w-9/10 dark flex flex-col lg:flex-row gap-5 pt-18">
                    <Region
                        defaultIso3={"CHN"}
                        geoJson={GADM_ADMIN1}
                    />
                    <Region
                        defaultIso3={"BGD"}
                        geoJson={GADM_ADMIN1}
                    />
                </div>
            <Thresholds />
        </div>
    )
}


