import React from 'react';
import NewBikeModal from './components/NewBikeModal'
import Test from './components/Test'

const App = () => {

  const [modalVisible, setModalVisible] = React.useState<boolean>(false)

  const toggleModal = (e: any) => {
    //if (e.target.className !== 'modal-content') {
      setModalVisible(prev => !prev)
    //}
  }

  return (
    <div>
      {modalVisible 
        ? <NewBikeModal toggleModal={toggleModal} bikeNames={['bikeA', 'bikeB', 'bikeC']} />
        : null
      }
      <button onClick={toggleModal}>Toggle modal</button>
    </div>
  );
}

export default App;
