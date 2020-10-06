import React from 'react'

interface ModalButtonProps {
    text: string,
    onClick: (e: any) => void,
}

const ModalButton = ({text, onClick}: ModalButtonProps) => {
    return (
        <button onClick={onClick} className="modal-button">{text}</button>
    )
}

const OKButton = ({onClick}: {onClick: (e: any) => void}) => {
    return (
        <ModalButton 
            text="OK"  
            onClick={onClick}
        />
    )
}

const CancelButton = ({onClick}: {onClick: (e: any) => void}) => {
    return (
        <ModalButton 
            text="Cancel"  
            onClick={onClick}
        />
    )
}

export { OKButton, CancelButton }