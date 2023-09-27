import { Team } from "@/hooks/useTeamStates"
import { useCallback, useMemo, useState } from "react"

const hasOrangeShadow = (flag: boolean) => flag ? 'orange-shadow' : ''
const flipCurrentState = (setState: React.Dispatch<React.SetStateAction<boolean>>) => () => {
    setState(crt => !crt)
}

export const usePlayground = (team: Team) => {
    const [revert, setRevert] = useState(false)
    const amountToChange = useCallback((negative: any, positive: any) => revert ? negative : positive, [revert])

    const [seePlayerStats, setSeePlayerStats] = useState(false)
    const configLabelToShow = useMemo(() => seePlayerStats ? 'hide' : 'view', [seePlayerStats])

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
        revert, seePlayerStats,
        amountToChange, configLabelToShow,
        shadowByRevert: hasOrangeShadow(revert), 
        shadowByStatsView: hasOrangeShadow(seePlayerStats),
        switchRevert: flipCurrentState(setRevert),
        switchStatsView: flipCurrentState(setSeePlayerStats)
    }
}
