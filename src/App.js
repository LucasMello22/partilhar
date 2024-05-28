import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScheduleAppointment from './components/ScheduleAppointment';
import ManagePatients from './components/ManagePatients';
import ManageDoctors from './components/ManageDoctors';
import ViewRecords from './components/ViewRecords';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/schedule-appointment" element={<ScheduleAppointment />} />
        <Route path="/manage-patients" element={<ManagePatients />} />
        <Route path="/manage-doctors" element={<ManageDoctors />} />
        <Route path="/view-records" element={<ViewRecords />} />
      </Routes>
    </div>
  );
}

export default App;
