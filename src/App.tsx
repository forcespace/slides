import React from 'react';
import logo from './logo.svg';
import './App.css';

function Content(){
    return (
        <div>Content</div>
    )
}

function Sidebar(){
    return (
        <div>Sidebar</div>
    )
}

function Menu(){
    return (
        <div>Menu</div>
    )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <div className="App">
           <div><Sidebar></Sidebar></div>
           <div><Content></Content></div>
       </div>
       <div>
       </div>
      </header>
    </div>
  );
}

export default App;
