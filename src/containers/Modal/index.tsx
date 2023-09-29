import React, { useEffect } from 'react';
import Popup from 'reactjs-popup';
import './index.css';


type ModalProps = { isTemporary?: boolean; isOpen: boolean; onClose: () => void, children: React.ReactNode }
export const Modal = ({ onClose, isOpen, isTemporary = false, children }: ModalProps) => {
    const temporaryClass = isTemporary ? 'quick-popup' : ''

    useEffect(() => {
        if (isOpen && temporaryClass) {
            setTimeout(() => {
                onClose()
            }, 3000)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [temporaryClass, isOpen])

    return (
        <div>
            <Popup open={isOpen} closeOnDocumentClick onClose={onClose} className={temporaryClass}>
                <div className="modal">
                    {children}

                    <a className="close-modal" onClick={onClose}>
                        &times;
                    </a>
                </div>
            </Popup>
        </div>
    );
};