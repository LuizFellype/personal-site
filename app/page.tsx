'use client'

import CreateTeamForm from '@/containers/CreateTeamForm'
import DynamicButtons from '@/containers/DynamicButtons'
import { TeamsList } from '@/containers/TeamsList'
import { useTeamsCtx } from '@/hooks/TeamsContext'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { addTeam } = useTeamsCtx()
  const router = useRouter()


  return (
    <main >
      <DynamicButtons buttons={[{
        onClick: () => router.push('/history'), label: 'History'
      }]} />
      <CreateTeamForm onSubmit={addTeam} />

      <TeamsList />
    </main>
  )
}
