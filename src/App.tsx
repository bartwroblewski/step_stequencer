import React from 'react';
import NewItemModal from './components/NewItemModal'
import Test from './components/Test'

const App = () => {

  const [modalVisible, setModalVisible] = React.useState<boolean>(false)

  const toggleModal = () => {
    setModalVisible(prev => !prev)
  }

  return (
    <div>
      {modalVisible 
        ? <NewItemModal />
        : null
      }
      <button onClick={toggleModal}>Toggle modal</button>
    </div>
  );
}

export default App;
