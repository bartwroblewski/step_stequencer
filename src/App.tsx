import React from 'react';
import NewItemModal from './components/NewItemModal'

const App = () => {

  const [modalVisible, setModalVisible] = React.useState<boolean>(false)

  const toggleModal = () => {
    setModalVisible(prev => !prev)
  }

  React.useEffect(() => {
    console.log(modalVisible)
  }, [modalVisible])

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
