import { useState, useRef, useEffect } from 'react'

import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import Map from "@arcgis/core/Map.js";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer.js";
import MapView from "@arcgis/core/views/MapView.js";
import SceneView from "@arcgis/core/views/SceneView.js";
import Polygon from "@arcgis/core/geometry/Polygon.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type MapProps = {
    currentTime: number
}

export const GridView = ({ currentTime }: MapProps) => {

    const [position, setPosition] = useState({});
    const [currentDimension, setDimension] = useState("2D");

    const ref = useRef(null);
    let map = useRef<Map | null>(null);
    const vtlayer = useRef<VectorTileLayer | null>(null);
    var view = useRef<MapView | SceneView>(new MapView);


    useEffect(() => {
        if (ref.current) {

            map.current = new Map({
                basemap: 'dark-gray'
            })


            switch (currentDimension) {
                case "2D":
                    view.current = new MapView({
                        container: ref.current,
                        map: map.current,
                        zoom: 3,
                        center: [-40.9465, 0.775],
                        constraints: {
                            minZoom: 2,
                            maxZoom: 10,
                        },
                        spatialReference: {
                            wkid: 3857,
                        },
                        viewpoint: position
                    });
                    break;
                case "3D":
                    view.current = new SceneView({
                        map: map.current,
                        container: ref.current,
                        center: [-38.9465, 7.775],
                        zoom: 4,
                        constraints: {
                            altitude: {
                                min: 150000
                            }
                        },
                        viewpoint: position
                    });
            }

            view.current.ui.components = [];


            reactiveUtils.watch(() =>
                [view.current.interacting, view.current.viewpoint],
                ([interacting, viewpoint]) => {
                    if (interacting) {
                    }
                    if (viewpoint) {
                        setPosition(viewpoint);
                    }
                }
            )

        }
        return () => {
            view.current.destroy();
        }
    }, [currentDimension]);

    useEffect(() => {

        if (!map.current) return;

        if (vtlayer.current) {
            map.current.remove(vtlayer.current);
            vtlayer.current.destroy();
        }

        vtlayer.current = new VectorTileLayer({
            url: "https://tiles.arcgis.com/tiles/weJ1QsnbMYJlCHdG/arcgis/rest/services/riverine_flood_grid_people_historical_1980/VectorTileServer"
        });

        map.current.add(vtlayer.current);
    }, [currentTime, currentDimension])

    return (
        <div className="h-full">
        <div className='w-full h-350 bg-[#1D2224] pt-[152px]' ref={ref}></div>
            {/* <div id="viewControlsContainer" className="bg-amber-900 absolute top-174 left-33 flex flex-col items-center justify-center z-100 gap-10 ">
                <div className="h-90 w-40 flex items-center justify-center flex-col bg-amber-200 rounded-[10px]">
                    <div id=""
                        className="font-[Arial] text-black bg-red-500 h-45 w-82/100 flex justify-center items-center font-[700] cursor-pointer">
                        <div><FontAwesomeIcon icon={faPlus} size="2xs" color="white" /></div>
                    </div>
                    <div id="zoomOut"
                        className="font-[Arial] text-(--black) h-45 w-82/100 flex justify-center items-center font-[700] cursor-pointer">
                        <div><i className="fa-solid fa-minus fa-lg"></i></div>
                    </div>
                </div>
                <div id="viewContainer" className="h-45 w-40 flex items-center justify-center flex-col bg-(--emptyShade) rounded-[10px]">
                    <div className="font-[Arial] text-(--black) h-45 w-82/100 flex justify-center items-center font-[700] cursor-pointer"
                        tabindex="0">
                        <div id="view">3D</div>
                    </div>
                </div>
                <div className="h-45 w-40 flex items-center justify-center flex-col bg-(--emptyShade) rounded-[10px]">
                    <div id="searchButton"
                        className="font-[Arial] text-(--black) h-45 w-82/100 flex justify-center items-center font-[700] cursor-pointer"
                        tabindex="0">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
            </div> */}
        <svg id="legendContainer" className="w-[210px] md:w-[260px] border-solid border-b-1 absolute bottom-65 md:bottom-65 lg:bottom-0 z-1 pointer-events-none" width="260"  viewBox="0 0 260 175" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="260" height="175" fill="white" />
          <text id="color3Text" x="12" y="23" fill="#DE4FA6" style={{ font: "bold 12px Arial"}}>
            Population
            <tspan x="12" dy="15">Count</tspan>
          </text>
          <text id="color7Text" x="250" y="23" fill="#4FADD0" text-anchor="end"
            style={{ font: "bold 12px Arial", textAlign: "right" }}>
            Riverine
            <tspan x="247" dy="15">Flood</tspan>
          </text>
          <text x="143" y="23" fill="black" text-anchor="end" style={{ font: "bold 12px Arial", textAlign: "right" }}>
            High
          </text>
          <text x="65" y="95" fill="black" text-anchor="end" style={{ font: "bold 12px Arial", textAlign: "right" }}>
            High-Low
          </text>
          <text x="250" y="95" fill="black" text-anchor="end" style={{ font: "bold 12px Arial", textAlign: "right" }}>
            Low-High
          </text>
          <text x="143" y="161" fill="black" text-anchor="end" style={{ font: "bold 12px Arial", textAlign: "right" }}>
            Low
          </text>
          <rect id="color9" x="148.539" y="127.924" width="26" height="26" transform="rotate(135 148.539 127.924)"
            fill="#e9e6f2" />
          <rect id="color5" x="130.154" y="109.539" width="26" height="26" transform="rotate(135 130.154 109.539)"
            fill="#9080bd" />
          <rect id="color3" x="111.77" y="91.1543" width="26" height="26" transform="rotate(135 111.77 91.1543)"
            fill="#DE4FA6" />
          <rect id="color8" x="166.924" y="109.539" width="26" height="26" transform="rotate(135 166.924 109.539)"
            fill="#9ccae1" />
          <rect id="color7" x="185.309" y="91.1543" width="26" height="26" transform="rotate(135 185.309 91.1543)"
            fill="#4FADD0" />
          <path id="color4" d="M166.924 72.7695L148.539 91.1543L130.154 72.7695L148.539 54.3848L166.924 72.7695Z"
            fill="#3D64AD" />
          <rect id="color1" x="148.539" y="54.3848" width="26" height="26" transform="rotate(135 148.539 54.3848)"
            fill="#2A1A89" />
          <rect id="color2" x="130.154" y="72.7695" width="26" height="26" transform="rotate(135 130.154 72.7695)"
            fill="#843598" />
          <rect id="color6" x="148.539" y="91.1543" width="26" height="26" transform="rotate(135 148.539 91.1543)"
            fill="#E39BCC" />
          <path
            d="M196.165 104.655C196.18 104.379 195.969 104.143 195.693 104.129L191.199 103.887C190.924 103.872 190.688 104.084 190.673 104.359C190.658 104.635 190.87 104.871 191.146 104.886L195.14 105.1L194.925 109.095C194.91 109.37 195.122 109.606 195.398 109.621C195.673 109.636 195.909 109.424 195.924 109.148L196.165 104.655ZM146.666 148.628L147 149L196 105L195.666 104.628L195.332 104.256L146.332 148.256L146.666 148.628Z"
            fill="black" />
          <path
            d="M64.0002 101.5C63.7241 101.5 63.5002 101.724 63.5002 102L63.5002 106.5C63.5002 106.776 63.7241 107 64.0002 107C64.2764 107 64.5002 106.776 64.5002 106.5L64.5002 102.5L68.5002 102.5C68.7764 102.5 69.0002 102.276 69.0002 102C69.0002 101.724 68.7764 101.5 68.5002 101.5L64.0002 101.5ZM110.567 148.567L110.921 148.214L64.3538 101.647L64.0002 102L63.6467 102.354L110.214 148.921L110.567 148.567Z"
            fill="black" />
      </svg>
        </div>
    )
}