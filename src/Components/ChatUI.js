import React,{useRef} from "react";
import {useState} from "react";
import UserMenu from "./UserMenu";
import Messager from "./Messager";
import Sender from "./Sender";
import { socket } from "../socket";
import {useNavigate,useParams} from "react-router-dom";
import "./Login.css";

const ChatUI = ()=>{
    const [receiver, setReceiver] = useState('You');
    const [Switch, setSwitch] = useState(0);
    const [username, setUsername] = useState('');
    const {name} = useParams();
    const navigate = useNavigate();
    const [showLogout,setShowLogout] = useState(0);
    const [response,setResponse] = useState(1);
    socket.on("UI communication",(user,Key)=>{
        setSwitch(Key);
        setUsername(user);
    });
    const Ref = useRef({});
    const logOut = ()=>{
        navigate("/");
        setShowLogout(0);
       }
    return(
        <>
            <div>
           <div className="chatBox">
             <div className="chatHeader">
              <img className="ProfilePic" src = {`http://localhost:3000/Pics/${receiver}.jpg`} />
              <div className="HeadOrder">
              <h1 className="headerName">{receiver}</h1>
              </div>
              <div className="menu-icon">
              <i class="fa-solid fa-ellipsis-vertical fa-xl" onClick = {()=>{if(showLogout===0){setShowLogout(1)}else{setShowLogout(0)}}} style={{color: "black"}}></i>
              </div>
              {
                showLogout === 1 && (
                  <div className="logOut" onClick={()=>{logOut()}}>
                    <p className="logOutText">Log Out</p>
                  </div>
           )
              }
          </div>
          
           <Messager username = {name} receiver = {receiver} response = {response} setResponse = {setResponse}/>
           <Sender username = {name} Receiver = {receiver} setResponse = {setResponse} response={response} />
           </div>
          
          <UserMenu username = {name} Receiver = {setReceiver} image = {name}/>
        </div>
 
    
 
    </>
    );
}

export default ChatUI;