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
  const [hideInstallButton, setHideInstallButton] = useState<boolean>(true);

  const installPrompt = useRef<any>()

  function disableInAppInstallPrompt() {
    installPrompt.current = null;
    setHideInstallButton(true)
  }

  useEffect(() => {
    resetOnGoingMatchState()

    const onBefore = (event: Event) => {
      console.log('----------------------')
      event.preventDefault();
      installPrompt.current = event;
      setHideInstallButton(false)
    }
    window.addEventListener("beforeinstallprompt", onBefore);
    window.addEventListener("appinstalled", disableInAppInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBefore)
      window.removeEventListener("appinstalled", disableInAppInstallPrompt);
    }
  }, [])
  

  return (
    <main >
      <DynamicButtons buttons={[{
        label: 'History',
        onMouseDown, onMouseUp,
        onTouchStart: onMouseDown,
        onTouchEnd: onMouseUp
      }, {
        label: 'Install',
        onClick: async () => {
          if (!installPrompt.current) {
            return;
          }
          const result = await installPrompt.current.prompt?.();
          console.log(`Install prompt was: ${result.outcome}`);
          disableInAppInstallPrompt();
        },
        hidden: hideInstallButton,
        className: 'd_shake'
      },
      {
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
