// import {  } from './helpers/index'

import { setValueByFlag } from "@/utils/setValueByFlag";
import { Dispatch, SetStateAction } from "react";

const hasOrangeShadow = (flag: boolean) => flag ? 'orange-shadow' : ''
export const flipCurrentState = (setState: React.Dispatch<React.SetStateAction<boolean>>) => () => {
    setState(crt => !crt)
}

type ConfigButtons = {
    revert: boolean; seePlayerStats: boolean; setRevert: Dispatch<SetStateAction<boolean>>; setSeePlayerStats: Dispatch<SetStateAction<boolean>>
}
export const ConfigButtons = ({
    revert, seePlayerStats, setRevert, setSeePlayerStats
}: ConfigButtons) => {
    return <div className="flex justify-between absolute w-full">
        <button
            className={`self-start btn-config text-orange-400 ${hasOrangeShadow(revert)}`}
            onClick={flipCurrentState(setRevert)}>Revert</button>
        <button
            className={`self-start btn-config text-orange-400 ${hasOrangeShadow(false)}`}
        >Falta</button>
        <button
            className={`self-start btn-config text-orange-400 ${hasOrangeShadow(seePlayerStats)}`}
            onClick={flipCurrentState(setSeePlayerStats)}>{setValueByFlag(seePlayerStats)('Hide', 'Show')}</button>
    </div>
} 