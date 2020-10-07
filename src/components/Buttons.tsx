import React from 'react'

interface FormButtonProps {
    text: string,
    onClick?: (e: any) => void,
    type: 'submit' | 'reset' | 'button',
}

const FormButton = ({text, onClick, type}: FormButtonProps) => {
    return (
        <button 
            type={type}
            onClick={onClick}
            className="modal-button">{text}
        </button>
    )
}

const SubmitButton = () => {
    return (
        <FormButton 
            type="submit"
            text="OK"  
        />
    )
}

const CancelButton = ({onClick}: {onClick: (e: any) => void}) => {
    return (
        <FormButton 
            type="button"
            text="Cancel"  
            onClick={onClick}
        />
    )
}

export { SubmitButton, CancelButton }