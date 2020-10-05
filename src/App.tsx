import React from 'react';
import MultiSelect from './components/MultiSelect'

const App = () => {

  return (
    <MultiSelect 
      options={['aaaa', 'bbbb', 'cccccc', 'fdaaf', 'aaaaaaaaaaaaaaaaaaaa', 'v', 'vdv', 'vwe']} 
      initial_option="Choose an option..."
    />
  );
}

export default App;
