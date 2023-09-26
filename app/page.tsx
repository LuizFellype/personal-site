'use client'

import CreateTeamForm from '@/containers/CreateTeamForm'
import { TeamsList } from '@/containers/TeamsList'
import { useTeamsCtx } from '@/hooks/TeamsContext'

export default function Home() {
  const {addTeam} = useTeamsCtx()

  return (
    <main >
      <CreateTeamForm onSubmit={addTeam} />

      <TeamsList />
    </main>
  )
}
