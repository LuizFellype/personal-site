import { memo } from 'react';

type DynamicButtonsType = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { label: string }

type DynamicButtonsPropsType = { buttons: DynamicButtonsType[], absolute?: boolean }

function NavigationHeader({ buttons, absolute = true }: DynamicButtonsPropsType) {
    return (
        <div className='flex justify-between w-full'>
            {buttons.map(({ label, ...buttonProps }) => <button key={label}
                className={`text-orange-400 border-dotted border-orange-400 border-2 p-1 rounded-md ${absolute && 'absolute'} ${buttonProps.disabled && 'text-gray-400 border-gray-400'}`}
                {...buttonProps}
            >{label}</button>)}
        </div>
    )
}

export default memo(NavigationHeader)
