export const EventTracking = (props: any) => {

    const tempExposuresArray: any = [
        {
            name: "Population",
            icon: "population",
        },
        {
            name: "Buildings",
            icon: "buildings",
        },
        {
            name: "Capital Stock",
            icon: "capital-stock",
        },
        {
            name: "Nightlights",
            icon: "nightlights",
        },
        {
            name: "GDP",
            icon: "gdp",
        },
        {
            name: "Cropland",
            icon: "cropland",
        },
        {
            name: "Airports",
            icon: "airports",
        },
        {
            name: "Ports",
            icon: "ports",
        },
    ]

    return (
        <div className=" w-full h-full flex justify-start pt-15" >
            <div className="h-full w-[300px] flex flex-col justify-start items-start bg-gray-200">
                {tempExposuresArray.map((e: any) => 
                    <div className="flex h-[37px] pl-5 items-center justify-center my-2">
                        <div className="">
                            <div className="flex items-center w-[200px] h-[25px] rounded-2xl border-[1.37px] border-solid border-[#0084FF] bg-black text-white">
                                <div className="rounded-full bg-black border-[1.37px] border-solid border-[#0084FF] h-[37px] w-[37px] mr-[10px]"></div>
                                TEST
                            </div>
                        </div>
                    </div>
                )}
                    

            </div>
        </div>
    )
}