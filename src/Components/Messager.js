import React from "react";
import { useState, useEffect } from "react";
import "./Messager.css";
import { socket } from "../socket";
const Messager = ({username}) =>{ 
const [SMessages, setSMessages] = useState([]);
socket.on("chat message",(msg,Username)=>{
setSMessages([...SMessages,{name : Username, content : msg}]);

});
    return(
    <>
        <div className="messages">

  { SMessages.map( (message,index)=>{ 
    return (
        <> 
   <li>
   <p>{message.name}</p>
    <div  className="MessageList">  
    <p>{message.content}</p>
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