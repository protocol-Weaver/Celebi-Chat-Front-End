import React from "react";
import { useState, useEffect } from "react";
import "./Messager.css";
import { socket } from "../socket";
const Messager = ({username,receiver, setResponse}) =>{ 
  const [SMessages, setSMessages] = useState([]);
  setResponse(0);
  setTimeout(()=>{
  socket.emit("Messages",username,receiver);
  },700);
  

  socket.on("Messages",(Message,user,Receiver)=>{
    if(user === username && Receiver === receiver){
    setSMessages(Message);
    }
    else if(Receiver === username && user === receiver ){
      setSMessages(Message);
    }
  });

  

    return(
    <>
        <div className="messages">

  { SMessages.map( (message,index)=>{ 
    return (
        <> 
   <li key = {index}>
    <div  className={(message.Sender === receiver)?"MessageList":"SMessageList"}>  
    <p>{message.Content}</p>
    </div>       
    </li>
    </>
  )
    }
  )
}
  </div>
</>
  );
}
export default Messager;