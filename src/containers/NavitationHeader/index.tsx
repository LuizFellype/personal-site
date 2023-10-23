import { MouseEventHandler, memo } from 'react';

function NavigationHeader({ buttons, absolute = true }: { buttons: { onClick: MouseEventHandler<HTMLButtonElement>; label: string }[], absolute?: boolean }) {
    return (
        <div className='flex justify-between w-full'>
            {buttons.map(({ onClick, label }) => <button key={label}
                className={`text-orange-400 border-dotted border-orange-400 border-2 p-1 rounded-md ${absolute && 'absolute'}`}
                onClick={onClick}
            >{label}</button>)}
        </div>
    )
}

export default memo(NavigationHeader)
