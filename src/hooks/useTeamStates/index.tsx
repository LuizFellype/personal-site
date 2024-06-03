import { useEffect, useMemo, useState } from "react"
import {
    Player, Team, StatsKey,
    initialStatsState
} from './helpers'
export * from './helpers'

const getUpdatedPlayerPoints = (player: Player, amount: number) => {
    const isRevertingScore = amount < 0
    if (isRevertingScore) { 
        return {
            3: { threePoints: player.threePoints - 1 },
            2: { twoPoints: player.twoPoints - 1 },
            1: { onePoints: player.onePoints - 1 },
        }[amount * -1]
    }

    return {
        3: { threePoints: player.threePoints + 1 },
        2: { twoPoints: player.twoPoints + 1 },
        1: { onePoints: player.onePoints + 1 },
    }[amount]
}

export const useTeamStates = (teamName: string, teamMembers: Player[] = []): Team => {
    const [players, setPlayers] = useState<Player[]>(teamMembers)

    useEffect(() => {
        setPlayers(teamMembers)
    }, [teamMembers])

    const methods = useMemo(() => {
        const increasePlayerProp = (playerPropKey: StatsKey) => (playerId: string) => (amountToIncrease: number) => {
            const updatePlayerPoints = (currentPlayers: Player[]) => currentPlayers.map(player => {
                const newValue = player[playerPropKey] + amountToIncrease
                const shouldUpdatePoints = playerPropKey === 'points'
                
                const specificPointsForPlayerStats = shouldUpdatePoints ? getUpdatedPlayerPoints(player, amountToIncrease) : {}

                return player.id === playerId ?
                    {
                        ...player,
                        [playerPropKey]: newValue < 0 ? 0 : newValue,
                        ...specificPointsForPlayerStats
                    } : player
            }
            )

            setPlayers(updatePlayerPoints)
        }

        return {
            increasePoints: increasePlayerProp('points'),
            increaseRebounds: increasePlayerProp('rebounds'),
            increaseAssistances: increasePlayerProp('assistances'),
            increaseBallSteals: increasePlayerProp('ballSteals'),
            increaseBlocks: increasePlayerProp('blocks'),
        }
    }, [setPlayers])


    const matchStats = useMemo(() => {
        return players.reduce((acc, crt) => {
            return {
                points: acc.points + crt.points,
                assistances: acc.assistances + crt.assistances,
                ballSteals: acc.ballSteals + crt.ballSteals,
                blocks: acc.blocks + crt.blocks,
                rebounds: acc.rebounds + crt.rebounds,
            }
        }, initialStatsState)
    }, [players])

    return {
        id: teamName,
        name: teamName,
        players, ...matchStats, ...methods,
    }
}