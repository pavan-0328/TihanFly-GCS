import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapComponent from './Components/MapComponent';
import HeaderComponent from './Components/HeaderComponent';
import ActionBar from './Components/ActionBar';
import WaypointPage from './Components/WaypointPage';
import { AppContext, AppContextProvider } from './Context/AppContext';
const App = () => {
  return (
    <Router>
      <AppContextProvider>
        <HeaderComponent/>
        <Routes>
          <Route 
            path="/"
            element={
              <>
                 <ActionBar/>
                 <MapComponent />
              </>
            }
            />
          <Route path="/waypoints" element={<WaypointPage/>}/>
       </Routes>
      </AppContextProvider> 
    </Router>
  );
};

export default App;
