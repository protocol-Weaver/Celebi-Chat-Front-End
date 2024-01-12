import React from "react";
import { useEffect,useState, useRef } from "react";
import "./Sender.css";
import {socket} from "../socket";
import TextareaAutosize from 'react-textarea-autosize';

const Sender = ({username})=>{
let [Messages,setMessages] = useState("");
const [show, setShow] = useState(false);
const [index,setIndex] = useState(0);
const Ref = useRef(null);
useEffect(()=>{
    socket.on("connect", () => {
        console.log("connected");
    });
},[]);
const handleSubmit = (event) => {
    event.preventDefault();
    if (Messages !== "") {
      inputSanitizer(index);
      console.log("this - >" , Messages);
      socket.emit("chat message", Messages,username);
      setMessages("");
    }
  };
  const newLineChecker = () => {
    let found = false;
    for(let i = 0; i< Messages.length; i++){
      if(Messages.charCodeAt(i) != 10){
          setIndex(i);
          found  = true;
          break;
        }
    }
    return found;
  }

  const inputSanitizer = (Index)=> {
    setMessages(prevMessages => {
      const newMessages = prevMessages.substring(Index, prevMessages.length-1);
      return newMessages;
    });
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      setMessages(Messages + "\n");
      return false;
    }
    if(e.key === "Enter"&& newLineChecker()){
        handleSubmit(e);
      }
  };

   return(
   <>
    {show && <div className="PopUpList" onClick = {()=>{
      Ref.current.click()
    }}  >
       <li className="content"><i class="fa-solid fa-upload fa-lg"></i>  <input ref={Ref} type="file" className = "Upload"/> <span> Upload a File</span> </li>
    
    </div>}
  <div className="senderBox">
    <div className="messageOptions" onClick={()=>{setShow(!show)}}>
      <i class="fa-solid fa-plus fa-lg PlusCenter"></i>
      </div>
 <TextareaAutosize
   value = {Messages}
      className="Sender"
      onKeyDown={handleKeyDown}
      placeholder="Type a Message"
      onChange={(e) => {setMessages(e.target.value)}}
    />
       </div>
    </>
    );
}

export default Sender;