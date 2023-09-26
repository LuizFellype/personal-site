'use client'

import { PlaygroundTeam } from '@/containers/PlaygroundTeam'
import { useTeamsCtx } from '@/hooks/TeamsContext'
import { useTeamStates } from '@/hooks/useTeamStates'
import { useMemo } from 'react'

export default function Playground() {
  const { selectedTeams, teams } = useTeamsCtx()

  const [rawTeamA, rawTeamB] = useMemo(() => {
    return teams.filter(team => selectedTeams.includes(team.id))
  }, [])

  const teamA = useTeamStates(rawTeamA.name, rawTeamA.players)
  const teamB = useTeamStates(rawTeamB.name, rawTeamB.players)

  return (
    <main className='force-landscap h-full w-full pt-2'>
      <div className='flex justify-between text-black'>
        <PlaygroundTeam team={teamA} />
        <PlaygroundTeam team={teamB} />
      </div>
    </main>
  )
}
