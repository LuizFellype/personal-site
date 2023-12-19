'use client'

import CreateTeamForm from '@/containers/CreateTeamForm'
import DynamicButtons from '@/containers/DynamicButtons'
import { TeamsList } from '@/containers/TeamsList'
import { useTeamsCtx } from '@/hooks/TeamsContext'
import { useHiddenContentState } from '@/hooks/useHiddenContentState'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'



export default function Home() {
  const { addTeam, resetOnGoingMatchState } = useTeamsCtx()
  const router = useRouter()
  const { isContentHidden, onMouseDown, onMouseUp } = useHiddenContentState({ onMouseUp: () => router.push('/history') })

  useEffect(() => {
    resetOnGoingMatchState()
  }, [])
  

  return (
    <main >
      <DynamicButtons buttons={[{
        label: 'History',
        onMouseDown, onMouseUp,
        onTouchStart: onMouseDown,
        onTouchEnd: onMouseUp
      }, {
        label: 'Strategies',
        onClick: () => router.push('/strategy'),
        hidden: isContentHidden,
        className: 'd_shake'
      }]} />

      <CreateTeamForm onSubmit={addTeam} />

      <TeamsList />
    </main>
  )
}
