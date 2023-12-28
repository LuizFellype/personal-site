import Link from 'next/link'

export default function History() {

    return (
        <div>
            <Link className={`text-orange-400 border-dotted border-orange-400 border-2 p-1 rounded-md `} href='/' title='Home' >HOME</Link>

            <div className='bg-orange-200 text-black mx-5 p-5 d_card'>
                <h1 className='text-2xl font-bolder text-center d_shake mb-4'>Stratégias</h1>

                <div className="flex space-x-5 d_border w-fit mb-3 mx-auto">
                    <div className='w-fit flex flex-col mb-4'>
                        <span className='text-bold'>Alinhamento de jogadores:</span>
                        <div className='w-20 flex self-center flex-col'>
                            <div className='flex justify-between'><span>J1</span>
                                <span>J3</span></div>
                            <span className='self-center'>J2</span>
                        </div>

                    </div>

                    <div className='flex flex-col'>
                        <i className='text-sm'>J1 - ala esquerda,</i>
                        <i className='text-sm'>J3 - ala direita,</i>
                        <i className='text-sm'>J2 - armador.</i>
                    </div>
                </div>

                <div className='mb-3 d_border w-fit mx-auto'>
                    <h2 className='text-bold text-center text-xl'>Corta luz indireta</h2>
                    <h4>2 Passa bola pra 3, faz corta luz pro 1 ir receber a bola.</h4>
                    <i className='block mt-0.5'>Variaçoes:</i>
                    <span>J1 infiltra por traz do corta-luz recebendo a bola de J3</span>
                    <span>J2 infiltra após fazer o corta-luz para receber a bola do J3</span>
                </div>

                <div className='mb-3 d_border'>
                    <h2 className='text-bold text-center text-xl'>Chifre</h2>
                    <span>Dois pivos na linha do garrafao.</span>
                    <span className='block'>J2 se movimenta pra um lado recebendo corte de J1</span>
                    <span>J1 passa pro outro lado aberto recebendo corte indireto de J3</span>
                    <i className='block mt-0.5'>Variaçoes:</i>
                    <span>J1 abre pro shoot e J3 faz o corta-luz pra J1 (podendo assim infiltrar ou passar posteriormente)</span>
                    <span>J1 infiltra em vez de abrir pro shoot</span>
                </div>

                <div className='mb-3 d_border'>
                    <h2 className='text-bold text-center text-xl'>Figura 8</h2>
                    <h4>Cançar a defesa</h4>
                    <span>Rotaçao com bola na mao sempre protegendo</span>
                    <i>Variaçao:</i>
                    <span>Back door</span>
                    <span>Finta troca de bola e infiltra por tras da defesa</span>

                </div>

                <div className='mb-3 d_border'>
                    <h2 className='text-bold text-center text-xl'>Granada</h2>
                    <span>J2 passa bola pra J3, correndo proximo para receber a bola infiltrando</span>
                    <span>J3 passa bola BLOQUEANDO marcador acompanhando 2</span>
                </div>

                <i className='text-sm'>OBS.: A IDEIA É FAZER ANIMAÇAO COM CANVAS DESSAS PLAYS.</i>
            </div>

            {/* <div className='bg-orange-200 text-black p-5 d_card w-fit mx-auto'> */}
            <div className='bg-orange-200 text-black p-5 d_card mx-auto'>
                <h1 className='text-2xl font-bolder text-center d_shake mb-4'>Treinos</h1>

                
                <div className='mb-3 d_border mx-auto w-fit'>
                    <h2 className='text-bold text-center text-lg'>Tips</h2>
                    <p className='text-sm text-center'>Wide base. Chess up.</p>
                    <p className='text-sm'>Activate feet. Low and Tight.</p>
                </div>

                <div className='mb-3 d_border w-6/12 mx-auto'>
                    <h2 className='text-bold text-center text-lg'>Warm up Drills</h2>
                    
                    {[
                        ['One handle cross', `↑5x`],
                        ['OHC + Double Cross' ,'1,2. 1,2', '5x'],
                        ['OHC + Triple Cross' ,'1,2. 1,2,3', '6x'],
                        ['OHC + In Between' ,'1,2 ~ 3 e 4', '5x'],
                        ['OHC + 2xCross + inB' , '1,2. 3,4 ~ 5, 6', '5x'],
                        ['3xCross + inB' ,'1,2,3 e 4', '5x'],
                        ['Pop + inB + Behind' ,'1. 1,2', '5x'],
                        ['Pop + inB + inB Reverse' ,'1. 1,2', '5x'],
                        ['Mix (pop, crossover, behind, reverse)' ,'1. 1,2. 1,2. 1,2', '3x'],
                        ['1,5 Crossover + 2xCross)' ,'1, 2, 3. 1,2', '↑garrafao'],
                        ['In and Out + 2xCross + crossover)' ,'1. 1,2, 1, 2', '↑garrafao'],
                        ['2x Crossover + inB shift + cross)' ,'1, 2, 1 ~ 2', '↑garrafao'],
                    ].map(([desc, sound, rep]) => {
                        return <div key={desc} className='flex justify-between'> <span>{desc} </span> <i >{sound}</i>  <span>{rep}</span></div>
                    })}
                </div>

            </div>
        </div>
    )
}
