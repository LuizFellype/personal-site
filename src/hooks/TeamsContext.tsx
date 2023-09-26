'use client'
import { TeamFormData } from '@/containers/CreateTeamForm/zodSchema/teamForm';
import { createContext, useCallback, useContext, useState } from 'react';

export type RawTeam = {
    id: string;
    name: string,
    players: string[]
}

type ContextStateType = {
    teams: RawTeam[],
    addTeam: (teamFormData: TeamFormData) => void
    deleteTeam: (id: string) => void
}

const initialState = { teams: [], addTeam: () => { }, deleteTeam: () => { } };
const TeamsContext = createContext<ContextStateType>(initialState);

export function TeamsProvider(props: { children: React.ReactNode }) {
    const [teams, setTeams] = useState<RawTeam[]>([]);

    const addTeam = useCallback((teamFormData: TeamFormData) => {
        const { teamName, player1, player2, player3 } = teamFormData
        const newTeam = {
            id: teamName, name: teamName,
            players: [player1, player2, player3]
        };

        setTeams(crtTeams => !!crtTeams.find(team => team.name === newTeam.name) ? crtTeams : [...crtTeams, newTeam])
    }, [setTeams])

    const deleteTeam = useCallback((id: string) => {
        setTeams(crtTeams => crtTeams.filter(team => team.id !== id))
    }, [setTeams])

    return (
        <TeamsContext.Provider value={{ teams, addTeam, deleteTeam }}>
            {props.children}
        </TeamsContext.Provider>
    );
}

export const useTeamsCtx = () => useContext(TeamsContext)