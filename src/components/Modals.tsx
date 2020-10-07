import React from 'react'
import { NameInput, MileageInput, BikeInput } from './Inputs'
import { OKButton, CancelButton, SubmitButton } from './Buttons'
import AddGearForm from './Forms'
import '../css/NewItemModal.css'

interface NewItemModalProps {
  toggleModal: (e: any) => void,
  itemForm: JSX.Element,
}

const NewItemModal = ({toggleModal, itemForm}: NewItemModalProps) => {

  const handleOKButtonClick = (e: any) => {
    toggleModal(e)
  }

  return (
    <div className="modal" onClick={toggleModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}> {/*  prevent hiding modal on modal content click */}
        {itemForm}
      </div>
    </div>
  )
}

interface NewGearModalProps {
  toggleModal: (e: any) => void,
  bikeNames: string[],
}

const NewGearModal = ({toggleModal, bikeNames}: NewGearModalProps) => {
  return (
    <NewItemModal 
      toggleModal={toggleModal}
      itemForm={
        <AddGearForm
          onSubmit={toggleModal}
          bikeNames={bikeNames}
        />
      }
    />
  )
}

export default NewGearModal