import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Input } from 'antd';
import "./Login.css";
import Sender from "./Sender";
import lonelyWarrior from "../Pics/lonelyWarrior.jpg";
import Messager from "./Messager";
import UserMenu from "./UserMenu";

const UserRegistration = () => {
    
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [Switch,setSwitch] = useState(0);
   
    const doRegistration =  () =>  {
      const usernameValue = username;
      const passwordValue = password;
      const Data = {Username : usernameValue, Password : passwordValue};
      const Body = JSON.stringify(Data);
      fetch('http://localhost:9000/submission', {
        method: 'POST',
        mode : 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: Body
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => console.error('Error:', error));
      setSwitch(0);
    }

    return(
      <>
      { Switch === 0 && (
        <div className="container">
        <div className="form_wrapper">
          <Input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            size="large"
            className="form_input"
          />
          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            size="large"
            type="password"
            className="form_input"
          />
        <div className="form_buttons">
          <button
            onClick={() => doRegistration()}
            className="form_button"
          >
            Login
          </button>
         </div>
        </div>
        </div>
      )}
       {Switch && (
        <div>
       <div className="chatBox">
         <div className="chatHeader">
          <img className="ProfilePic" src = {lonelyWarrior} />
          <div className="HeadOrder">
          <h1 className="headerName">Dummy Username</h1>
          </div>
          <div className="menu-icon">
          <i class="fa-solid fa-ellipsis-vertical fa-xl" style={{color: "black"}}></i>
          </div>
      </div>
       <Messager username = {username}/>
       <Sender username = {username}/>
       </div>
       <UserMenu/> 
</div>
)}
        </>
    );

}

export default UserRegistration;
