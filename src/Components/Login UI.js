import React,{useEffect,useRef} from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { socket } from "../socket";
import lonelyWarrior from "./lonelyWarrior.jpg";
import {Input} from "antd";
import  "./Login.css";

const LoginUI = ()=>{
  const [SignUI,setSignUI] = useState([1,0,0]);
  const [Switch,setSwitch] = useState(0);
  const [username,setUsername] = useState('');
  const [event,setEvent] = useState(lonelyWarrior);
  const [image, setImage] = useState(lonelyWarrior);
  const [Registeration,setRegistration] = useState(0);
  const [password,setPassword] = useState('');
  const navigate = useNavigate();
  const Ref = useRef({});
  useEffect(()=>{
    socket.on("connect", () => {
        console.log("connected");
    });
    socket.on('find Registered', (found,user)=>{
      if(found){
        setSwitch(1);
        setUsername(user);
        socket.emit("UI communication", username,Switch);
        navigate(`/${user}`);
      }
    });
},[]);
const imageUpload = async(e)=>{

  try{    
    let image = e.target.files[0];
    setEvent(image);
    setImage(URL.createObjectURL(image));
  }
  catch(err){
    console.log(err);
  }
}


const doRegistration =  async(e) =>  {
  e.preventDefault();
  const usernameValue = username;
  const passwordValue = password;
  const Data = {Username : usernameValue, Password : passwordValue};
  const formData = new FormData();
  formData.append("Username", Data.Username);
  formData.append("Password", Data.Password);
  formData.append("profile",event);
  const result =  await axios.post('http://localhost:9000/submission', formData, { headers: {'Content-Type': 'multipart/form-data'}});
  setSwitch(1);
  setRegistration(0);
  navigate(`/${username}`);
    }
const findRegistered = ()=>{
  const usernameValue = username;
  const passwordValue = password;
  socket.emit("find Registered",usernameValue, passwordValue);
}

    return(
        <>
        { Switch === 0 && Registeration === 0 && (

            <div className="container">
            <h3 className="Login_Header">Welcome To Celebi Chat</h3>  
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
                onClick={() => findRegistered()}
                className="pillButton form_button "
              >
                Login
              </button>
             </div>
             <button className="Sign_In_Button" onClick={()=>{setRegistration(1)}}>
                Create An Account
             </button>
            </div>
            </div>
          )}
          { Registeration === 1 && (
            <>
              {SignUI[0] === 1 &&(
              <div style = {{display : "flex", flexDirection : "column", width : "50%", position : "absolute", left : "25%", top : "15%", height : "50%", border : "1px solid gray", paddingTop : "5%"}}>
                <h2 style={{position : "relative", left : "30%", fontWeight : "100"}}>Enter Username</h2>
                <Input
                  value={username}
                  onChange={(event) =>{ setUsername(event.target.value)}}
                  placeholder="Username"
                  onKeyDown={(e)=>{
                    if(e.key === "Enter"){
                      setSignUI([0,1,0]);
                    }
                  }}
                  size="large"
                  style={{position : "relative", left : "15%"}}
                  className="form_input"
              />
               <button className="pillButton" style={{position : "relative", left : "6%", top : "20%"}} onClick = {()=>{setSignUI([0,0,0], setRegistration(1), setSwitch(0) )}}>
                      Back
                    </button>
                    
               <button className="pillButton" style={{position : "relative", left : "60%", top : "6%"}} onClick = {()=>{if(username !== ""){setSignUI([0,1,0])}}}>
                      Next
                    </button>
            </div>
              )
              }
              { SignUI[1] === 1 &&(
                <div style={{display : "flex", flexDirection : "column", width : "50%", position : "absolute", left : "25%", top : "15%", height : "50%", border : "1px solid gray", paddingTop : "5%"}}>
                  <h2 style = {{position : "relative", left : "30%", fontWeight : "100"}}>Enter Password</h2>
               <Input
               value={password}
               onChange={(event) => setPassword(event.target.value)}
               placeholder="Password"
               onKeyDown={(e)=>{
                if(e.key === "Enter"){
                  setSignUI([0,0,1]);
                }
               }}
               size="large"
               type="password"
               style={{position : "relative", left : "15%"}}
               className="form_input"
             />
             <button className="pillButton" style={{position : "relative", left : "6%", top : "20%"}} onClick = {()=>{setSignUI([1,0,0])}}>
                      Back
                    </button>
                    
               <button className="pillButton" style={{position : "relative", left : "60%", top : "6%"}} onClick = {()=>{setSignUI([0,0,1])}}>
                      Next
                    </button>
                    </div>
              )}
    
              {
                SignUI[2] === 1 && (
                  <form className="ProfileUploader" onSubmit={(e)=>{doRegistration(e)}}>
                    <div style={{display : "flex", flexDirection : "column", gap : 50, position : "relative", width : "100%" , top:"8%"}}>
                    <img className = "profile" onClick={()=> Ref.current.click()} src = {image}/>
                    <input  type="file" name = "profile" ref = {Ref} onChange = {(e)=>{imageUpload(e)}} style={{display: "none"}} />
                    <h2 className="Image_Text"> Upload Your Image</h2>
                    </div>
                    <div style={{display : "flex", flexDirection : "row", gap : "35%", position : "relative", top : "4%", left : "4%" }}>
                    <button className="pillButton" onClick = {()=>{setSignUI([0,1,0])}}>
                      Back
                    </button>
                    <button type="submit"  className="pillButton">Finish</button>
                    </div>
                  </form>  
                )
              }

             
    
             </> 
          )
    
          }
          </>
    );
}

export default LoginUI;