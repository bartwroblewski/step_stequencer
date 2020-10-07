import React from 'react';
import NewGearModal from './components/Modals'
import Test from './components/Test'

const App = () => {

  const addGear = (name: string, mileage: number, bikeName: string) => {
    const url = 'add gear url'
    console.log(`Posting ${name}, ${mileage}, ${bikeName} to ${url}`)
  }

  const [modalVisible, setModalVisible] = React.useState<boolean>(false)

  const toggleModal = (e: any) => {
    //if (e.target.className !== 'modal-content') {
      setModalVisible(prev => !prev)
    //}
  }

  return (
    <div>
      {modalVisible 
        ? <NewGearModal addGear={addGear} toggleModal={toggleModal} bikeNames={['bikeA', 'bikeB', 'bikeC']} />
        : null
      }
      <button onClick={toggleModal}>Toggle modal</button>
      {/* <Test /> */}
    </div>
  );
}

export default App;
