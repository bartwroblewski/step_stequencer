import React from 'react'
import { NameInput, MileageInput, BikeInput } from './Inputs'
import { OKButton, CancelButton } from './Buttons'
import '../css/NewItemModal.css'

interface NewItemModalProps {
  toggleModal: (e: any) => void,
  inputs: JSX.Element[],
}

const NewItemModal = ({toggleModal, inputs}: NewItemModalProps) => {

/*   const [inputValue, setInputValue] = React.useState<any>()

  const handleInputChange = (new_value: any) => {
    setInputValue(new_value)
  } */


  const handleOKButtonClick = (e: any) => {
    toggleModal(e)
  }

  return (
    <div className="modal" onClick={toggleModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}> {/*  prevent hiding modal on modal content click */}
        {inputs}
        <div className="modal-buttons">
          <OKButton onClick={handleOKButtonClick} />
          <CancelButton onClick={toggleModal} />
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