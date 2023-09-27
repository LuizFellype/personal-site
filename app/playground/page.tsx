'use client'
import { PlaygroundTeam } from '@/containers/PlaygroundTeam'
import { ConfigButtons, flipCurrentState } from '@/containers/PlaygroundTeam/ConfigButtons'
import { useTeamsCtx } from '@/hooks/TeamsContext'
import { useFoulStates } from '@/hooks/useFoulStates'
import { useTeamStates } from '@/hooks/useTeamStates'
import { useCallback, useMemo, useState } from 'react'

export default function Playground() {
  const [revert, setRevert] = useState(false)
  const [seePlayerStats, setSeePlayerStats] = useState(false)

  const { selectedTeams, teams } = useTeamsCtx()

  const [rawTeamA, rawTeamB] = useMemo(() => {
    return teams.filter(team => selectedTeams.includes(team.id))
  }, [teams, selectedTeams])

  const teamA = useTeamStates(rawTeamA.name, rawTeamA.players)
  const teamB = useTeamStates(rawTeamB.name, rawTeamB.players)

  // const { addFoul, fouls, freeThrow } = useFoulStates()

  return (
    <main className='force-landscap h-full w-full pt-2'>
      <div className='flex justify-between text-black relative'>
        <ConfigButtons
          seePlayerStats={seePlayerStats} revert={revert} setRevert={setRevert} setSeePlayerStats={setSeePlayerStats} />
        <PlaygroundTeam
          team={teamA}
          seePlayerStats={seePlayerStats}
          revert={revert}
        />
        <PlaygroundTeam
          team={teamB}
          seePlayerStats={seePlayerStats}
          revert={revert}
        />
      </div>
    </main>
  )
}
