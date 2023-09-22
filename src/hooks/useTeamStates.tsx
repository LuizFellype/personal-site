import { useMemo, useState } from "react"

type MatchStats = {
    points: number;
    assistances: number;
    ballSteals: number;
    blocks: number;
    rebounds: number;
}
export type Player = {
    id: string;
    name: string,
} & MatchStats

type StatsKey = keyof MatchStats

export const createPlayer = (playerName: string): Player => {
    return {
        id: playerName,
        name: playerName,
        points: 0,
        assistances: 0,
        ballSteals: 0,
        blocks: 0,
        rebounds: 0,
    }
}

export const useTeamStates = (teamMembers: string[] = []) => {
    const [players, setPlayers] = useState<Player[]>(teamMembers.map(createPlayer))

    const methods = useMemo(() => {
        const increasePlayerProp = (playerPropKey: StatsKey) => (playerId: string) => (amountToIncrease: number) => {
            const updatePlayerPoints = (currentPlayers: Player[]) => currentPlayers.map(player =>
                player.id === playerId ? { ...player, [playerPropKey]: player[playerPropKey] + amountToIncrease } : player
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
        const getMatchCounts = (statsKey: StatsKey) =>
            players.reduce((acc, crt) => {
                return acc + crt[statsKey]
            }, 0)

        return {
            points: getMatchCounts('points'),
            assistances: getMatchCounts('assistances'),
            ballSteals: getMatchCounts('ballSteals'),
            blocks: getMatchCounts('blocks'),
            rebounds: getMatchCounts('rebounds')
        }
    }, [players])

    return {
        players, ...matchStats, ...methods,
    }
}