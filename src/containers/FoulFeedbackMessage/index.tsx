import { FoulType } from "@/hooks/useFoulStates";
import React from "react"

type FoulFeedbackMessageProps = {
    foul?: FoulType;
    isFreeThrow?: boolean;
}

const getClasses = (isFreeThrow: boolean) => {
    const orangeLevels = isFreeThrow ? {
        general: 100,
        title: 400,
        name: 300
    } : {
        general: 100,
        title: 600,
        name: 400
    }

    const playerNameClasses = `modal-name-shaddow text-lg text-orange-${orangeLevels.name}`

    return { orangeLevels, playerNameClasses }
}

const FoulFeedbackMessageContainer = ({ foul, isFreeThrow = false }: FoulFeedbackMessageProps) => {
    if (!foul) return <></>

    const { orangeLevels, playerNameClasses } = getClasses(isFreeThrow)

    return (
        <div className={`text-orange-${orangeLevels.general} tracking-wider`}>
            <div className={`modal-name-shaddow flex font-bold text-xl text-orange-${orangeLevels.title}`}>
                <h2 className='uppercase mr-1 tracking-widest'>Falta</h2>
                <span> {isFreeThrow ? '- Lance Livre' : ''}</span>
            </div>
            <div className='mt-2'>
                <b className={playerNameClasses}>{foul.commited}</b> <span>cometeu <b>{foul.amount}</b> falta(s) em </span> <b className={playerNameClasses}>{foul.received}</b>

                {isFreeThrow && <span className='mt-1 block'><b className={playerNameClasses}>{foul.received}</b> tem direito ao <i className="text-orange-200 modal-name-shaddow">Lance Livre</i>.</span>}
            </div>
        </div>
    )

}

export const FoulFeedbackMessage = React.memo(FoulFeedbackMessageContainer)