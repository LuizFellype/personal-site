import { useMemo, useState } from "react"
import {
    Player, Team, StatsKey,
    createTeamPlayer, initialStatsState
} from './helpers'
export * from './helpers'

export const useTeamStates = (teamName: string, teamMembers: string[] = []): Team => {
    const [players, setPlayers] = useState<Player[]>(teamMembers.map(createTeamPlayer(teamName)))

    const methods = useMemo(() => {
        const increasePlayerProp = (playerPropKey: StatsKey) => (playerId: string) => (amountToIncrease: number) => {
            const updatePlayerPoints = (currentPlayers: Player[]) => currentPlayers.map(player => {
                const newValue = player[playerPropKey] + amountToIncrease
                return player.id === playerId ?
                    {
                        ...player,
                        [playerPropKey]: newValue < 0 ? 0 : newValue
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