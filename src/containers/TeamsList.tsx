import { useTeamsCtx } from '@/hooks/TeamsContext'

export function TeamsList() {
    const {teams, deleteTeam} = useTeamsCtx()

    return (
        <main className='text-black flex justify-around flex-wrap gap-3'>
            {teams.map(rawTeam => {
                return <div className='rounded-tr-4xl bg-white px-5 pb-4 pt-2 rounded-2xl shadow-2xl' key={rawTeam.id}>
                    <div className='flex justify-between'>
                    <b className='block'>{rawTeam.name}</b>
                    <button onClick={() => deleteTeam(rawTeam.id)}>D</button>
                    </div>
                    <span>{rawTeam.players.join(', ')}</span>
                </div>
            })}
        </main>
    )
}
