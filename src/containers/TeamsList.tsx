import { useTeamsCtx } from '@/hooks/TeamsContext'
import { useRouter } from 'next/navigation'

export function TeamsList() {
    const { teams, selectedTeams, deleteTeam, selectTeam } = useTeamsCtx()
    const router = useRouter()
    return (
        <main className='text-black flex justify-around flex-wrap gap-3'>
            {teams.map(rawTeam => {
                const isSelected = selectedTeams.includes(rawTeam.id) ? 'stroke-sky-500' : ''
                return <div className='rounded-tr-4xl bg-white px-5 pb-4 pt-2 rounded-2xl shadow-2xl' key={rawTeam.id}>
                    <div className='flex justify-between items-center' onClick={() => selectTeam(rawTeam.id)}>
                        <svg className={`h-6 w-6 flex-none fill-sky-100 ${isSelected} stroke-2`} stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="8" />
                            <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                        </svg>
                        <b className='block'>{rawTeam.name}</b>
                        <button className='text-blue-300' onClick={() => deleteTeam(rawTeam.id)}>X</button>
                    </div>
                    <span>{rawTeam.players.join(', ')}</span>
                </div>
            })}

            <button
                type="submit"
                disabled={selectedTeams.length !== 2}
                className="block w-full cursor-pointer rounded bg-rose-500 px-4 py-2 mx-8 mt-3 text-center font-semibold text-white hover:bg-rose-400 focus:outline-none focus:ring focus:ring-rose-500 focus:ring-opacity-80 focus:ring-offset-2 disabled:opacity-70"
                onClick={() => {
                    router.push('/playground', { scroll: true })
                }}
            >
                Começar partida
            </button>
        </main>
    )
}
