import React from 'react';
import { SumStatsType } from '@/types/MVP';


type ModalProps = { mvp: SumStatsType }
export const MVPInfo = ({ mvp }: ModalProps) => {

    return mvp && <div className="bg-orange-300 flex space-x-5 d_border w-fit mt-10 mx-auto d_scale text-black">
            <div className='w-fit flex flex-col mb-4'>
                <span className='text-bold text-4xl d_shake '>MVP</span>
                <div className='w-20 flex'>
                    <span className='text-center text-2xl'>{mvp.name}</span>
                </div>

            </div>

            <div className='flex flex-col'>
                <i className='text-2xl'>Média:</i>
                <i className='text-2xl text-center'>{mvp.points}pts</i>
            </div>
        </div>

};