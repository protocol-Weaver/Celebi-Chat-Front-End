import React, { useEffect, useRef } from "react";
import {useState} from "react";
import "./Login.css";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import ChatUI from "./ChatUI";
import LoginUI from "./Login UI";

const RouterApp = () => {
    
    const [username,setUsername] = useState('');
    const [Switch,setSwitch] = useState(0); 

   
 
    
    return(
      <>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<LoginUI  />} exact />
        <Route path="/:name" element = {<ChatUI/>} />
      </Routes>
      </BrowserRouter>
      


        </>
    );

}

export default RouterApp;
