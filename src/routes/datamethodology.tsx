import { createFileRoute } from '@tanstack/react-router'

import MenuBackground from '../assets/image 18.png'
import { Button } from "@/components/ui/button"
import GriddedCapitalStock from "../assets/Gridded_Capital_Stock.png"
import GriddedGDP from "../assets/Gridded_GDP.png"


export const Route = createFileRoute('/datamethodology')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className={`absolute flex justify-center overflow-auto w-full mix-blend-hard-light bg-(--accentdarkblue-70) transition-all bg-cover`} style={{ backgroundImage: `url(${MenuBackground})` }}>
            <div className="flex py-15 flex-col items-center lg:items-start w-9/10 text-left text-white">
                <section className='pt-14.75 text-[26px] w-full max-w-174 font-bold'>Access the data that powers GeoPulse</section>
                <div className='flex flex-col gap-y-7'>
                    <div className='flex flex-col gap-x-20 gap-y-5 leading-[21px] pt-10'>
                                                <p className='text-[16px] max-w-250'>GeoPulse maps where people and assets meet climate and disaster risks. Three families of open data sit behind it: the IMF’s own high-resolution gridded macroeconomic layers, near-real-time disaster events, and forward-looking climate exposure indicators. Explore them in the app, download them, or pull them live through the API. Sources, methods, and citations for each are below.</p>

                        <span className='text-[22px]'><strong>Imagery layers </strong>(raster files 1km grid)</span>
                    </div>
                    <div className='flex flex-col lg:flex-row gap-y-15'>
                        <div className='w-full flex justify-center'>
                            <div className="w-95/100 flex flex-col gap-y-7 text-[16px]">
                                <div className='flex flex-col gap-y-6'>
                                    <p>The IMF-produced exposure layers GeoPulse is built on: global rasters on a 30 arc-second (~1 km) grid showing where economic output is generated and where physical capital sits. Pair them with a hazard layer to see what’s in harm’s way or use them directly in your own GIS.</p>
                                    <p>Only these IMF-generated layers (Gridded GDP and Gridded Capital Stock) are available to download here. The other exposure layers GeoPulse draws on (population, cropland, livestock, buildings) are produced by third parties; please obtain those from their original sources, listed in the relevant indicators’ methodology descriptions. Imagery layers are provided as direct GeoTIFF downloads and are not available through the API.</p>
                                </div>
                                <div className='w-full border-1 border-solid' ></div>
                                <div className='flex flex-row'>
                              <div className='flex flex-col items-center'>
                                  <strong>Gridded Capital Stock</strong>
                                  <img width={150} src={GriddedCapitalStock}></img>
                                  <div className='flex flex-col gap-y-4'>
                                      <span>A ~1 km global estimate of the value of buildings and built assets, from the IMF, showing where physical capital is concentrated.</span>
                                      <div className='flex flex-col'>
                                          <strong>Papers:&nbsp;</strong>
                                          <span><i>[Add relevant papers(s) here.]</i></span>
                                      </div>
                                      <div className='flex flex-col'>
                                          <strong>Citation:&nbsp;</strong>
                                          <span><i>Gridded Physical Capital Stock (forthcoming). International Monetary Fund. Accessed [date]. </i></span>
                                      </div>
                                      <div className='flex flex-col'>
                                          <strong>Data:&nbsp;</strong>
                                          <span><i>Global raster, 30 arc-second (~1 km at the equator), WGS84 (EPSG:4326). Available as a direct download.</i></span>
                                      </div>
                                    <Button className='w-36 h-7 bg-(--accentblue-60) rounded-md'>Download GeoTIFF</Button>
                                  </div>
                              </div>
                                    <div className='flex flex-col items-center'>
                                        <strong>Gridded GDP</strong>
                                        <img width={150} src={GriddedGDP}></img>
                                        <div className='flex flex-col gap-y-4'>
                                            <span><u>Multi-hazard risk to global port infrastructure and resulting trade and logistics losses</u></span>
                                            <span><u>Systemic risks from climate-related disruptions at ports</u></span>
                                        </div>
                                    </div>
                                </div>
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
                            <div className='flex flex-row gap-x-10  gap-y-10 flex-wrap'>
                                <div className='flex flex-col gap-y-5 w-4/10'>
                                    <span><strong>Temperature Extremes</strong></span>
                                    <span><u>Buildings</u></span>
                                    <span><u>Cropland</u></span>
                                    <span><u>GDP</u></span>
                                    <span><u>Urban GDP</u></span>
                                    <span><u>Population</u></span>
                                    <span><u>Livestock</u></span>
                                </div>
                                <div className='flex flex-col gap-y-5 w-4/10'>
                                    <span><strong>Coastal Flooding</strong></span>
                                    <span><u>Population</u></span>
                                    <span><u>Buildings</u></span>
                                    <span><u>GDP</u></span>
                                    <span><u>Urban GDP</u></span>
                                </div>
                                <div className='flex flex-col gap-y-5 w-4/10'>
                                    <span><strong>Drought</strong></span>
                                    <span><u>Livestock</u></span>
                                </div>
                                <div className='flex flex-col gap-y-5 w-4/10'>
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
}
