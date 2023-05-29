import React from 'react';
import { ToDos } from './components/ToDos';
import { Metrics } from './components/Metrics';
import { ToDoFormDialog } from './components/ToDoFormDialog';
import { ToDosFilters } from './components/ToDosFilters';
import './styles/App.css';

function App() {
  return (
    <div className='container mt-5'>
      <ToDosFilters />
      <ToDoFormDialog />
      <ToDos />
      <Metrics />
    </div>
  );
}

export default App;
