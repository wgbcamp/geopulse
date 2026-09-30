import { AppStateContext } from "@/app"
import { useContext } from "react"

export default function () {
    const state = useContext(AppStateContext);
    return (
        <div>
            <div className={`h-full w-full flex items-center justify-center ${state?.loadingOverlay == "initial" ? "-z-10" : state?.loadingOverlay == true ? "fadeIn z-21" : "z-21 fadeOut" } absolute top-0`}>
                <div className="w-21 h-21 border-dotted border-white border-10 rounded-full z-20 rotate"></div>
                <div className="h-full w-full absolute bg-black opacity-40">
                </div>
            </div>
        </div>
    )
}
  