import React from 'react'
import { NameInput, MileageInput, BikeInput } from './Inputs'
import '../css/NewItemModal.css'

interface NewItemModalProps {
  toggleModal: (e: any) => void,
}

const NewItemModal = ({toggleModal}: NewItemModalProps) => {
  return (
    <div className="modal" onClick={toggleModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}> {/*  prevent hiding modal on modal content click */}
        <NameInput />
        <MileageInput />
        <BikeInput bikes={['bikeA', 'bikeB', 'bikeC']} />
      </div>
    </div>
  )
}

export default NewItemModal