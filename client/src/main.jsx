import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/NavbarComp';
import Header from './components/HeaderComp';

import Start from './start/Start';
import List from './pricelist/List';
import UploadLists from './uploadlists/UploadLists';
import Providers from './providers/Providers';

import './styles/navbar.css';
import './styles/header.css';
import './styles/list.css';
import './styles/uploads.css';
import '/main.css';

const App = () => (
    <Router>
        <Header />
        <Navbar />
        <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/pricelist" element={<List />} />
            <Route path="/uploadlists" element={<UploadLists />} />
            <Route path="/providers" element={<Providers />} />
        </Routes>
    </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
