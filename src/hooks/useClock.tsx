import { useMemo, useRef, useState } from "react"
import Countdown from "react-countdown"
import type { CountdownProps } from "react-countdown"


export const useClock = (params: { initialDate?: number, onComplete: CountdownProps['onComplete'] }) => {
    const { initialDate = 60000 * 10, onComplete } = params || {}

    const countDownRef = useRef<Countdown>(null)
    
    const [isPaused, setIsPaused] = useState<boolean>(false);
    
    const handleOnPlayPause = () => {
        const isClockPaused = countDownRef.current?.isPaused?.()
        
        if (isClockPaused) {
            countDownRef.current?.start?.()
            setIsPaused(false)
        } else {
            countDownRef.current?.pause?.()
            setIsPaused(true)
        }
    }
    
    const startCountDown = useMemo(() => Date.now() + initialDate
    , [initialDate])

    const clockComponent = <div className="flex justify-center gap-3 pb-3">
        ⏳︎
        
        <Countdown className={`text-orange-500 ${isPaused ? 'text-xl text-red-500' : ''}`} date={startCountDown} ref={countDownRef} onComplete={onComplete}  />

        <button aria-label={isPaused ? 'Play time' : 'Pause time'} className={`btn-config text-orange-400`} onClick={handleOnPlayPause}>{isPaused ? '⏵︎' : '⏸︎'}</button>
    </div>

    

    return { clockComponent, isPaused, countDownRef }
}
