import React from 'react';
import './index.css';
import LoginForm from './LoginForm';
import SuccessPage from './SuccessPage';
import reportWebVitals from './reportWebVitals';
import { render } from "react-dom";
import { BrowserRouter, Routes, Route} from "react-router-dom";

const rootElement = document.getElementById("root");
    
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginForm/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/sucesso" element={<SuccessPage/>} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

reportWebVitals();
