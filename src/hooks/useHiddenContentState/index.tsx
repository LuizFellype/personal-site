import { useRef, useState } from 'react'

export const useHiddenContentState = ({ onMouseUp = () => {} }) => {
    const [isContentHidden, setIsContentHidden] = useState<boolean>(true);
    const shouldToggleHiddenContent = useRef(false)

    return {
        isContentHidden,
        onMouseDown: () => {
            setTimeout(() => {
                shouldToggleHiddenContent.current = true
                setIsContentHidden(crnt => !crnt)
            }, 1000)
        },
        onMouseUp: () => {
            if (shouldToggleHiddenContent.current) {
                shouldToggleHiddenContent.current = false
                return
            }

            onMouseUp?.()
        },
    }
}