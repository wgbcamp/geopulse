import { Region } from "./region";

export const CompareView = (props: any) => {
    return (
        <div className="bg-[#1E1E1E] w-full h-full flex justify-center pb-15" >
            <div className="w-9/10 h-full dark flex flex-col 2xl:flex-row gap-x-5 pt-18">
                <Region
                    defaultIso3={"CHN"}
                    {...props}

                />
                <Region
                    defaultIso3={"BGD"}
                    {...props}

                />
            </div>
        </div>
    )
}