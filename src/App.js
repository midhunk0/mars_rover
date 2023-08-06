import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Mars from './components/Mars';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route Component={Home} path="/"/>
                    <Route Component={Mars} path="/mars"/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
