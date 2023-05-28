import React from 'react';
import { ToDos } from './components/ToDos';
import { Metrics } from './components/Metrics'
import { TestComponent } from './components/TestComponent'
import './styles/App.css';

function App() {
  //const backendRequestUrl = 'https://jsonplaceholder.typicode.com/todos';
  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>To Do List</h1>
      <ToDos />
      <Metrics />
    </div>
  );
}

export default App;
