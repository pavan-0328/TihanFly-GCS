import React from 'react';
import MapComponent from './Components/MapComponent';
import HeaderComponent from './Components/HeaderComponent';
import ActionBar from './Components/ActionBar';
import { AppContext, AppContextProvider } from './Context/AppContext';
const App = () => {
  return (
    <div>
      <AppContextProvider>
        <HeaderComponent/>
        <ActionBar/>
        <MapComponent />
      </AppContextProvider> 
    </div>
  );
};

export default App;
