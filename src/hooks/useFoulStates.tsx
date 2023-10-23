'use client'

import { useCallback, useState } from "react";
import { Player } from "./useTeamStates";

export type FoulType = {
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

export type MomentFoul = { commited?: Player } | undefined

export type UseFoulStatesProps = { onAddFoul?: Function }
export const useFoulStates = (props: UseFoulStatesProps) => {
    const { onAddFoul: onAddFoulCallback } = props || {}
    
    const [fouls, setFouls] = useState<FoulType[]>([])
    const [freeThrow, setFreeThrow] = useState<FoulType | undefined>()
    const [currentFoul, setCurrentFoul] = useState<MomentFoul>()

    const addFoul = useCallback((commitedFoulPlayerId: string, receivedFoulPlayerId: string) => {
        const updateFouls = () => {
            const foulIdx = getPrevFoulIdx(fouls, commitedFoulPlayerId, receivedFoulPlayerId)
            if (foulIdx === undefined) {
                const newFoul = {
                    commited: commitedFoulPlayerId,
                    received: receivedFoulPlayerId,
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

    const handleFoul = useCallback((player?: Player): string | void => {
        if (!player) {
            return setCurrentFoul(crt => !crt ? {} : undefined)
        }

        const committedFoulPlayer = currentFoul?.commited
        if (!!committedFoulPlayer && committedFoulPlayer.teamId !== player.teamId) {
            addFoul(committedFoulPlayer.id, player.id)
            setCurrentFoul(undefined)
            onAddFoulCallback?.()
            return committedFoulPlayer.id
        }

        setCurrentFoul({ commited: player })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setCurrentFoul, addFoul, currentFoul])


    const resetFreeThrow = useCallback(() => {
        setFreeThrow(undefined)
    }, [setFreeThrow])
    
    
    return {
        fouls, handleFoul, freeThrow, currentFoul, resetFreeThrow
    }
}