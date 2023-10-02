import { setValueByFlag } from "@/utils/setValueByFlag";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import './index.css'
import { Player } from "@/hooks/useTeamStates";

const hasOrangeShadow = (flag: boolean) => flag ? 'orange-shadow' : ''
const hasRedShadow = (flag: boolean) => flag ? 'red-shadow' : ''
export const flipCurrentState = (setState: React.Dispatch<React.SetStateAction<boolean>>) => () => {
    setState(crt => !crt)
}

type ConfigButtons = {
    revert: boolean; seePlayerStats: boolean;
    setRevert: Dispatch<SetStateAction<boolean>>;
    setSeePlayerStats: Dispatch<SetStateAction<boolean>>
    onFoulClick: (player?: Player) => string | void
    isFoulOn: boolean;
}

const ConfigButtonsContainer = ({
    revert, seePlayerStats, 
    setRevert, setSeePlayerStats, 
    isFoulOn, onFoulClick
}: ConfigButtons) => {
    const handleFoulClick = useCallback(() => {
        onFoulClick()
    }, [onFoulClick])

    return <div className="flex justify-between w-full landscape:absolute md:absolute">
        <button
            className={`self-start btn-config text-orange-400 ${hasOrangeShadow(revert)}`}
            onClick={flipCurrentState(setRevert)}>Revert</button>
        <button
            className={`self-start btn-config text-orange-400 ${hasRedShadow(isFoulOn)}`}
            onClick={handleFoulClick}
        >{setValueByFlag(isFoulOn)('Cancelar', 'Falta')}</button>
        <button
            className={`self-start btn-config text-orange-400 ${hasOrangeShadow(seePlayerStats)}`}
            onClick={flipCurrentState(setSeePlayerStats)}>{setValueByFlag(seePlayerStats)('Hide', 'Show')}</button>
    </div>
}

export const ConfigButtons = React.memo(ConfigButtonsContainer)