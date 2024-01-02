'use client'
import { TeamFormData } from '@/containers/CreateTeamForm/zodSchema/teamForm';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Player, Team, createTeamPlayer } from './useTeamStates';
import { setupSession } from '@/utils/localStorage';
import { FoulType } from './useFoulStates';

export type OnGoingMatchStateType = { teamA: Team; teamB: Team, fouls: FoulType[], remainingTime?: number } | undefined

export type RawTeam = {
    id: string;
    name: string;
    players: Player[]
}

type ContextStateType = {
    teams: RawTeam[],
    selectedTeams: string[],
    onGoingMatchStates?: OnGoingMatchStateType;
    resetOnGoingMatchState: () => void
    addTeam: (teamFormData: TeamFormData) => void
    deleteTeam: (id: string) => void
    selectTeam: (id: string) => void
}

const initialState: ContextStateType = {
    teams: [],
    selectedTeams: [],
    resetOnGoingMatchState: () => { },
    addTeam: () => { },
    deleteTeam: () => { },
    selectTeam: () => { }
};
const TeamsContext = createContext<ContextStateType>(initialState);

const createRawTeam = (teamFormData: TeamFormData): RawTeam => {
    const { teamName, player1, player2, player3 } = teamFormData
    const newTeam = {
        id: teamName, name: teamName,
        players: [player1, player2, player3].map(createTeamPlayer(teamName))
    };
    return newTeam
}


const initialTeamsTest = [createRawTeam({
    teamName: 'Centro', player1: 'Luiz', player2: 'LypeZ', player3: 'Kaio',
}),
createRawTeam({
    teamName: 'Santa', player1: 'Chris', player2: 'Drew', player3: 'Gelin',
}),
createRawTeam({
    teamName: 'El Crime', player1: 'Bruno', player2: 'Luiz Agua', player3: 'Jack',
})]

const initialSelectedTeamsTest = [initialTeamsTest[0].id, initialTeamsTest[1].id]

const session = setupSession()

export function TeamsProvider(props: { children: React.ReactNode }) {
    const [teams, setTeams] = useState<RawTeam[]>(initialTeamsTest);
    const [selectedTeams, setSelectedTeams] = useState<string[]>(initialSelectedTeamsTest);
    const [onGoingMatchStates, setOnGoingMatchStates] = useState<OnGoingMatchStateType>()

    useEffect(() => {
        const { teams, selectedTeams } = session.get(session.keys.teamsCtx, {})

        if (!!teams || !!selectedTeams) {
            setTeams(teams)
            setSelectedTeams(selectedTeams)
        }

        const onGoingMatch = session.get(session.keys.onGoingMatchState)

        if (onGoingMatch) { setOnGoingMatchStates(onGoingMatch) }
    }, []);

    const addTeam = useCallback((teamFormData: TeamFormData) => {
        const newTeam = createRawTeam(teamFormData)
        setTeams(crtTeams => !!crtTeams.find(team => team.name === newTeam.name) ? crtTeams : [...crtTeams, newTeam])
    }, [setTeams])

    const deleteTeam = useCallback((id: string) => {
        setTeams(crtTeams => crtTeams.filter(team => team.id !== id))
    }, [setTeams])


    const selectTeam = useCallback((teamId: string) => {
        setSelectedTeams(crtSelectedTeamsId => {
            if (crtSelectedTeamsId.includes(teamId)) {
                return crtSelectedTeamsId.filter(id => id !== teamId)
            }

            if (crtSelectedTeamsId.length >= 2) {
                return [crtSelectedTeamsId[1], teamId]
            }

            return [...crtSelectedTeamsId, teamId]
        })
    }, [setSelectedTeams])

    const resetOnGoingMatchState = useCallback(() => {
        setOnGoingMatchStates(undefined)
        session.remove(session.keys.onGoingMatchState)
    }, [])


    const state = useMemo(() => {
        return { teams, selectedTeams, onGoingMatchStates, addTeam, deleteTeam, selectTeam, resetOnGoingMatchState }
    }, [teams, selectedTeams, onGoingMatchStates, addTeam, deleteTeam, selectTeam, resetOnGoingMatchState])
    return (
        <TeamsContext.Provider value={state}>
            {props.children}
        </TeamsContext.Provider>
    );
}

export const useTeamsCtx = () => useContext(TeamsContext)