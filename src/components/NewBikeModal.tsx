import React from 'react'
import { NameInput, MileageInput, BikeInput } from './Inputs'
import '../css/NewItemModal.css'

interface ModalButtonProps {
  text: string,
}

const ModalButton = ({text}: ModalButtonProps) => <button className="modal-button">{text}</button>
const OKButton = () => <ModalButton text="OK" />
const CancelButton = () => <ModalButton text="Cancel" />

interface NewItemModalProps {
  toggleModal: (e: any) => void,
  inputs: JSX.Element[],
}

const NewItemModal = ({toggleModal, inputs}: NewItemModalProps) => {
  return (
    <div className="modal" onClick={toggleModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}> {/*  prevent hiding modal on modal content click */}
        {inputs}
        <div className="modal-buttons">
          <OKButton />
          <CancelButton />
        </div>
      </div>
    </div>
  )
}

interface NewBikeModalProps {
  toggleModal: (e: any) => void,
  bikeNames: string[],
}

const NewBikeModal = ({toggleModal, bikeNames}: NewBikeModalProps) => {
  const inputs = [
    <NameInput />,
    <MileageInput />,
    <BikeInput bikeNames={bikeNames} />,
  ]

  return <NewItemModal toggleModal={toggleModal} inputs={inputs} />
}

export default NewBikeModal