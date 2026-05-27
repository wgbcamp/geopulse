import MenuBackground from '../../assets/image 18.png'
import { Button } from "@/components/ui/button"

export const DataMethodology = () => {
    return (
        <div className={`absolute flex justify-center h-full w-full mix-blend-hard-light bg-(--accentdarkblue-70) transition-all bg-cover`} style={{ backgroundImage: `url(${MenuBackground})` }}>
            <div className="flex py-15 flex-col items-center overflow-scroll lg:items-start w-9/10 text-left text-white">
                <section className='pt-14.75 text-[26px] w-full max-w-174 font-bold'>Access Data & Methodology Page</section>
                <div className='flex flex-col gap-y-7'>
                    <div className='flex flex-col gap-x-20 gap-y-5 leading-[21px] pt-10'>
                        <span className='text-[22px]'><strong>Imagery layers </strong>(raster files 1km grid)</span>
                        <p className='text-[16px] max-w-250'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a tellus sit amet erat tincidunt tincidunt vitae et mauris. Curabitur eget ex vestibulum, iaculis dolor pretium, lobortis ipsum. Morbi imperdiet tellus tempus odio porttitor, eget eleifend elit molestie. </p>
                        <div className='w-full border-1 border-solid' ></div>
                    </div>
                    <div className='flex flex-col lg:flex-row gap-y-15'>
                        <div className='w-full flex justify-center'>
                            <div className="w-95/100 flex flex-col gap-y-7 text-[16px]">
                                <div className='flex flex-col'>
                                    <strong className='text-[18px]'>Gridded Capital Stock</strong>
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
                                </div>
                                <div className='flex flex-col'>
                                    <strong>Papers:</strong>
                                    <div className='flex flex-col gap-y-4'>
                                        <span><u>Multi-hazard risk to global port infrastructure and resulting trade and logistics losses</u></span>
                                        <span><u>Systemic risks from climate-related disruptions at ports</u></span>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <strong>Citation:</strong>
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
                                </div>
                                <div className='flex flex-col'>
                                    <strong>Data:</strong>
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
                                </div>
                                <Button className='w-28 h-7 bg-(--accentblue-60) rounded-sm'>Download Data</Button>
                            </div>
                        </div>
                        <div className='w-full flex justify-center'>
                            <div className="w-95/100 flex flex-col gap-y-7 text-[16px]">
                                <div className='flex flex-col'>
                                    <strong className='text-[18px]'>Gridded GDP</strong>
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
                                </div>
                                <div className='flex flex-col'>
                                    <strong>Papers:</strong>
                                    <div className='flex flex-col gap-y-4'>
                                        <span><u>Multi-hazard risk to global port infrastructure and resulting trade and logistics losses</u></span>
                                        <span><u>Systemic risks from climate-related disruptions at ports</u></span>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <strong>Citation:</strong>
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
                                </div>
                                <div className='flex flex-col'>
                                    <strong>Data:</strong>
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
                                </div>
                                <div className='flex flex-row gap-x-20'>
                                    <div className='flex flex-col gap-y-5'>
                                        <span><u>Sector 1 Name</u></span>
                                        <span><u>Sector 2 Name</u></span>
                                        <span><u>Sector 3 Name</u></span>
                                        <span><u>Sector 4 Name</u></span>
                                        <span><u>Sector 5 Name</u></span>
                                    </div>
                                    <div className='flex flex-col gap-y-5'>
                                        <span><u>Sector 6 Name</u></span>
                                        <span><u>Sector 7 Name</u></span>
                                        <span><u>Sector 8 Name</u></span>
                                        <span><u>Sector 9 Name</u></span>
                                        <span><u>Sector 10 Name</u></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-y-7'>
                    <div className='flex flex-col gap-x-20 gap-y-5 leading-[21px] pt-20'>
                        <span className='text-[22px]'><strong>Events layer </strong>(Polygons Layer)</span>
                        <p className='text-[16px] max-w-250'>We use the <u>Global Disaster Alert and Coordination System (GDACS)</u> service to collect information on natural disasters (earthquakes, tsunamis, tropical cyclones, floods, volcanic eruptions, or droughts). Other types of disruptions are also included, such as those caused by geopolitical tensions. We intersect disaster areas with our ports and chokepoints to identify ports and chokepoints at risk of being disrupted.</p>
                        <div className='w-full border-1 border-solid' ></div>
                    </div>
                    <div className='w-full flex justify-center'>
                        <div className="w-95/100 flex flex-col gap-y-7 text-[16px]">
                            <div className='flex flex-col'>
                                <strong>Papers:</strong>
                                <div className='flex flex-col gap-y-4'>
                                    <span><u>Multi-hazard risk to global port infrastructure and resulting trade and logistics losses</u></span>
                                    <span><u>Systemic risks from climate-related disruptions at ports</u></span>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <strong>Citation:</strong>
                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
                            </div>
                            <div className='flex flex-col'>
                                <strong>Data:</strong>
                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
                            </div>
                            <div className='flex flex-row gap-x-5'>
                                <Button className='w-28 h-7 bg-(--accentblue-60) rounded-sm'>Download Data</Button>
                                <Button className='w-28 h-7 bg-(--accentblue-60) rounded-sm'>Access API</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-y-7'>
                    <div className='flex flex-col gap-x-20 gap-y-5 leading-[21px] pt-20'>
                        <span className='text-[22px]'><strong>Events layer </strong>(Polygons Layer)</span>
                        <p className='text-[16px] max-w-250'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a tellus sit amet erat tincidunt tincidunt vitae et mauris. Curabitur eget ex vestibulum, iaculis dolor pretium, lobortis ipsum. Morbi imperdiet tellus tempus odio porttitor, eget eleifend elit molestie. </p>
                        <div className='w-full border-1 border-solid' ></div>
                    </div>
                    <div className='w-full flex justify-center'>
                        <div className="w-95/100 flex flex-col gap-y-7 text-[16px]">
                            <div className='flex flex-col'>
                                <strong>Papers:</strong>
                                <div className='flex flex-col gap-y-4'>
                                    <span><u>Multi-hazard risk to global port infrastructure and resulting trade and logistics losses</u></span>
                                    <span><u>Systemic risks from climate-related disruptions at ports</u></span>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <strong>Citation:</strong>
                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
                            </div>
                            <div className='flex flex-col'>
                                <strong>Data:</strong>
                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
                            </div>
                            <div className='flex flex-row gap-x-20 gap-y-10 flex-wrap'>
                                <div className='flex flex-col gap-y-5'>
                                    <span><strong>Temperature Extremes</strong></span>
                                    <span><u>Buildings</u></span>
                                    <span><u>Cropland</u></span>
                                    <span><u>GDP</u></span>
                                    <span><u>Urban GDP</u></span>
                                    <span><u>Population</u></span>
                                    <span><u>Livestock</u></span>
                                </div>
                                <div className='flex flex-col gap-y-5'>
                                    <span><strong>Coastal Flooding</strong></span>
                                    <span><u>Population</u></span>
                                    <span><u>Buildings</u></span>
                                    <span><u>GDP</u></span>
                                    <span><u>Urban GDP</u></span>
                                </div>
                                <div className='flex flex-col gap-y-5'>
                                    <span><strong>Drought</strong></span>
                                    <span><u>Livestock</u></span>
                                </div>
                                <div className='flex flex-col gap-y-5'>
                                    <span><strong>Temperature Extremes</strong></span>
                                    <span><u>Population</u></span>
                                    <span><u>Livestock</u></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}