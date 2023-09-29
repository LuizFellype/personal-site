'use client'
import { useMemo, useState } from 'react'

import { PlaygroundTeam } from '@/containers/PlaygroundTeam'
import { ConfigButtons } from '@/containers/ConfigButtons'
import { useTeamsCtx } from '@/hooks/TeamsContext'

import { useFoulStates } from '@/hooks/useFoulStates'
import { useTeamStates } from '@/hooks/useTeamStates'

export default function Playground() {
  const [revert, setRevert] = useState(false)
  const [seePlayerStats, setSeePlayerStats] = useState(false)

  const { selectedTeams, teams } = useTeamsCtx()

  const [rawTeamA, rawTeamB] = useMemo(() => {
    return teams.filter(team => selectedTeams.includes(team.id))
  }, [teams, selectedTeams])

  const teamA = useTeamStates(rawTeamA.name, rawTeamA.players)
  const teamB = useTeamStates(rawTeamB.name, rawTeamB.players)

  const { handleFoul, currentFoul, fouls } = useFoulStates()

  return (
    <main className='force-landscap h-full w-full pt-2'>
      <div className='flex justify-between text-black relative'>
        <ConfigButtons
          seePlayerStats={seePlayerStats} revert={revert} setRevert={setRevert} setSeePlayerStats={setSeePlayerStats}
          onFoulClick={handleFoul}
          isFoulOn={!!currentFoul}
        />
        <PlaygroundTeam
          team={teamA}
          seePlayerStats={seePlayerStats}
          revert={revert}
          onFoulClick={handleFoul}
          currentFoul={currentFoul}
        />
        <PlaygroundTeam
          team={teamB}
          seePlayerStats={seePlayerStats}
          revert={revert}
          onFoulClick={handleFoul}
          currentFoul={currentFoul}
        />
      </div>
    </main>
  )
}
