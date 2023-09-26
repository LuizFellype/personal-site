'use client'

import { useCallback, useState } from "react";
import { Player, Team } from "./useTeamStates";

type FoulType = {
    commited: string,
    received: string,
    amount: number
}

const getPrevFoulIdx = (fouls: FoulType[], commited: string, received: string) => {
    const idx = fouls.findIndex(foul => {
        return commited === foul.commited && received === foul.received
    })

    const isNewFoul = idx === -1
    if (isNewFoul) return undefined

    return idx
}
const increaseFoulByIdx = (fouls: FoulType[], foulIdx: number): FoulType[] => {
    return fouls.map((foul, idx) => ({ ...foul, amount: idx === foulIdx ? foul.amount + 1 : foul.amount }))                
}

export const useFoulStates = () => {
    const [fouls, setFouls] = useState<FoulType[]>([])
    const [freeThrow, setFreeThrow] = useState<FoulType | undefined>()

    const addFoul = useCallback((commitedFoulPlayer: Player, receivedFoulPlayer: Player) => {
        const updateFouls = () => {
            const foulIdx = getPrevFoulIdx(fouls, commitedFoulPlayer.id, receivedFoulPlayer.id)
            if (foulIdx === undefined) {
                const newFoul = {
                    commited: commitedFoulPlayer.id,
                    received: receivedFoulPlayer.id,
                    amount: 1
                }
                const newFouls = [...fouls, newFoul]
                
                return setFouls(newFouls)
            }
            
            const updatedFouls = increaseFoulByIdx(fouls, foulIdx)
            setFouls(updatedFouls)

            const freeThrowFoul = updatedFouls[foulIdx]
            setFreeThrow(freeThrowFoul)
        }

        updateFouls()
    }, [fouls])

    return {
        fouls, addFoul, freeThrow
    }
}

