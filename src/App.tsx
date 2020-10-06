import React from 'react';
import NewItemModal from './components/NewItemModal'
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
        ? <NewItemModal toggleModal={toggleModal} />
        : null
      }
      <button onClick={toggleModal}>Toggle modal</button>
    </div>
  );
}

export default App;
