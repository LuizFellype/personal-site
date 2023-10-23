'use client'

import NavigationHeader from '@/containers/NavitationHeader'
import { PlaygroundTeam } from '@/containers/PlaygroundTeam'
import { HistoryMatchType } from '@/types/teams'
import { STORAGE_KEYS, getFromStorage, setInStorage } from '@/utils/localStorage'
import { useRouter } from 'next/navigation'
import { MouseEventHandler, memo, useCallback, useEffect, useMemo, useState } from 'react'

const getFormattedTime = (dateTime: number) => {
    const formatedDate = new Date(dateTime)

    const simpleHours = formatedDate.getHours()
    const simpleMinutes = formatedDate.getMinutes()

    return {
        hours: simpleHours < 10 ? `0${simpleHours}` : simpleHours,
        minutes: simpleMinutes < 10 ? `0${simpleMinutes}` : simpleMinutes,
    }
}
// eslint-disable-next-line react/display-name
const HistoryAccordion = memo(({ teamA, teamB, endedAt, onDeleteClick, fouls }: HistoryMatchType & { onDeleteClick: (endedAt: number) => void }) => {
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
    const { hours, minutes } = useMemo(() => getFormattedTime(endedAt), [endedAt])

    const handleDeleteClick = () => {
        if (isConfirmingDelete) {
            onDeleteClick(endedAt)
            setIsConfirmingDelete(false)
        }
        setIsConfirmingDelete(true)
    }

    const header = <summary className='text-center'>
        <b>{teamA.id}</b> <span>{teamA.points}</span> x
        <span> {teamB.points}</span> <b>{teamB.id}</b>
        <i className='text-xs relative bottom-1'> {hours}:{minutes}</i>
        <button className={` ${isConfirmingDelete ? 'text-green-500' : 'text-purple-500'} ml-2 text-xs`} onClick={handleDeleteClick}>{isConfirmingDelete ? 'Confirmar' : 'Delete'}</button>
    </summary>

    return <details className='text-black'>
        {header}

        <div className='flex flex-col landscape:flex-row md:flex-row flex-wrap justify-between relative gap-3'>
            <PlaygroundTeam
                team={teamA}
                seePlayerStats
                wrapperClass="landscape:pr-3 md:pr-3"
                fouls={fouls}
            />
            <PlaygroundTeam
                team={teamB}
                seePlayerStats
                wrapperClass="landscape:pl-3 md:pl-3"
                fouls={fouls}
            />
        </div>
    </details>
})

export default function History() {
    const router = useRouter()
    const [matches, setMatches] = useState<HistoryMatchType[]>([]);

    useEffect(() => {
        const history = getFromStorage(STORAGE_KEYS.matchesList, [])
        setMatches(history)
    }, [])

    const updateHistory = (updatedList: HistoryMatchType[]) => {
        setMatches(updatedList)
        setInStorage(STORAGE_KEYS.matchesList, updatedList)
    }

    const handleDeleteMatch = useCallback((matchEndedAt: number) => {
        const updatedList = matches.filter(({ endedAt }) => endedAt !== matchEndedAt)
        console.log({ updatedList, matchEndedAt })
        updateHistory(updatedList)
    }, [matches])

    return (
        <main className=''>
            <NavigationHeader buttons={[{
                onClick: () => router.push('/'), label: 'Home'
            }, {
                onClick: () => {
                    updateHistory([])
                }, label: 'Clean History'
            }]} absolute={false}/>

            {
                matches.map(match => <HistoryAccordion key={`${match.teamA.id}_${match.teamB.id}_${match.endedAt}`} {...match} onDeleteClick={handleDeleteMatch} />)
            }
        </main>
    )
}
