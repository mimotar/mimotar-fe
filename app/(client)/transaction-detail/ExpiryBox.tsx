import React from 'react'

interface ExpirtBoxProps {
    amount: number;
    duration: string;
}
export default function ExpiryBox({ amount, duration }: ExpirtBoxProps) {
    return (
        <div className='h-[82px] w-[72px] border-[#CBD5E1] border rounded-lg pt-0 px-1 pb-2.5 flex flex-col items-center'>
            <p className=' leading-[60px] text-black font-semibold text-4xl'> {amount} </p>
            <h4 className='text-[#64748B] font-semibold text-xs'>{duration} </h4>

        </div>
    )
}
