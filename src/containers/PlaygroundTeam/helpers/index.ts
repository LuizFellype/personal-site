import { Team } from "@/hooks/useTeamStates"
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
        const increaseMethod = {
            points: increasePoints(playerId),
            rebounds: increaseRebounds(playerId),
            assistances: increaseAssistances(playerId),
            ballSteals: increaseBallSteals(playerId),
            blocks: increaseBlocks(playerId),
        }[statsKey]

        return () => increaseMethod?.(amount)
    }, [increaseAssistances, increaseBallSteals, increaseBlocks, increasePoints, increaseRebounds])

    return {
        getActionHandler, id, name, teamStats, players,
    }
}
