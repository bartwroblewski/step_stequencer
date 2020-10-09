import React from 'react'
import { CancelButton, SubmitButton } from './Buttons'
import AddGearForm from './Forms'
import '../css/NewItemModal.css'

interface NewItemModalProps {
  toggleModal: (e: any) => void,
  itemForm: JSX.Element,
}

const NewItemModal = ({toggleModal, itemForm}: NewItemModalProps) => {
  return (
    <div className="modal" onClick={toggleModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}> {/*  prevent hiding modal on modal content click */}
        {itemForm}
      </div>
    </div>
  )
}

interface NewGearModalProps {
  addGear: (name: string, mileage: number, bikeName: string) => void,
  toggleModal: (e: any) => void,
  bikeNames: string[],
}

const NewGearModal = ({addGear, toggleModal, bikeNames}: NewGearModalProps) => {

  const handleFormSubmit = (e: any) => {
    toggleModal(e)
    return addGear
  }
  return (
    <NewItemModal 
      toggleModal={toggleModal}
      itemForm={
        <AddGearForm
          onSubmit={(e: any) => handleFormSubmit(e)}
          onCancel={toggleModal}
          bikeNames={bikeNames}
        />
      }
    />
  )
}

export default NewGearModal