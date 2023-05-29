import React from 'react';
import { ToDos } from './components/ToDos';
import { Metrics } from './components/Metrics'
import { ToDoFormDialog } from './components/ToDoFormDialog';
import './styles/App.css';

function App() {
  return (
    <div className='container mt-5'>
      <ToDoFormDialog />
      <ToDos />
      <Metrics />
    </div>
  );
}

export default App;
