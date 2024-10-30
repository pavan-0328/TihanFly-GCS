import React from 'react';
import MapComponent from './Components/MapComponent';
import HeaderComponent from './Components/HeaderComponent';
import ActionBar from './Components/ActionBar';
const App = () => {
  return (
    <div>
      <HeaderComponent/>
      <ActionBar/>  
      <MapComponent />  
    </div>
  );
};

export default App;
