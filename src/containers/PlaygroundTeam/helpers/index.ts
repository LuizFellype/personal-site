import { MomentFoul } from "@/hooks/useFoulStates"
import { Player, Team } from "@/hooks/useTeamStates"
import { setValueByFlag } from "@/utils/setValueByFlag"
import { useCallback } from "react"

export const usePlayground = (team: Team) => {
    const { id, name,
        increasePoints,
        increaseRebounds,
        increaseAssistances,
        increaseBallSteals,
        increaseBlocks,
        players,
        ...teamStats
    } = team

    const getActionHandler = useCallback((statsKey: string, playerId: string, amount: number) => {
        return () => {
            const increaseMethod = {
                points: increasePoints?.(playerId),
                rebounds: increaseRebounds?.(playerId),
                assistances: increaseAssistances?.(playerId),
                ballSteals: increaseBallSteals?.(playerId),
                blocks: increaseBlocks?.(playerId),
            }[statsKey]
    
            increaseMethod?.(amount)
        }
    }, [increaseAssistances, increaseBallSteals, increaseBlocks, increasePoints, increaseRebounds])

    return {
        getActionHandler, id, name, teamStats, players,
    }
}


export const foulClasses = {
    possibleOffender: 'possible-foul-offender',
    offender: 'foul-offender',
    possibleReceiver: 'possible-foul-receiver',
}
export const getFoulClassName = (currentFoul: MomentFoul) => {
    return (player: Player) => {
        const isFoulOn = !!currentFoul
        
        if (!isFoulOn) return ''

        const isOffenderSelected = !!currentFoul?.commited
        const isPossibleReceiver = isOffenderSelected && currentFoul?.commited?.teamId !== player.teamId

        if (isPossibleReceiver) return foulClasses.possibleReceiver

        const isPlayerOffender = currentFoul?.commited?.id === player.id

        const setWhenOffenderWasSelected = setValueByFlag(isOffenderSelected)
        const setFoulOffenderClass = setValueByFlag(isPlayerOffender)

        const foulClassName = `${setWhenOffenderWasSelected(setFoulOffenderClass(foulClasses.offender), foulClasses.possibleOffender)}`

        return foulClassName
    }
}
