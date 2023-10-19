import { MouseEventHandler, memo } from 'react';

function NavigationHeader({onClick, label}: {onClick: MouseEventHandler<HTMLButtonElement>; label: string}) {
    return (
        <div>
            <button
                className={`text-orange-400 border-dotted border-orange-400 border-2 p-1 rounded-md absolute`}
                onClick={onClick}
            >{label}</button>
        </div>
    )
}

export default memo(NavigationHeader)
