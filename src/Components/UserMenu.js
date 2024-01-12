import React from "react";
import { useState,useRef, useEffect } from "react";
import  "./UserMenu.css";
import { socket } from "../socket";
const UserMenu = ({username,Receiver,image}) =>{
    const [user,setUser] = useState([]);
    const [name, setName] = useState('');
    const [key, setKey] = useState(0);
    
    useEffect(()=>{
    socket.on('find User', (found)=>{
        if(found){
            setKey(1);
          }
          else{
            setKey(0);
          }
        });

     
     
  
    },[]);
    setTimeout(
        ()=>{
        socket.emit('Receiver List',username);
        }
        ,1000);
        
    socket.on('Receiver List', (receive,user)=>{
        if(user === username){
        setUser(receive);
        }
        else if(user === Receiver){
            setUser(receive);
        }
    });
    const AddUser = async(e)=>{
        if(e.key === 'Enter'&& name.trim() !== ''){
            const found = await user.findIndex(element=>element === name);
            if(found === -1){
            socket.emit('find User',name);
            if(key){
            setUser([...user,name]);
            socket.emit('create Session',username,name);
            setName("");
            Ref.current.value = '';
            setKey(0);
            socket.emit('Receiver List',username);
        } 
    }  
        else{
            setName('');
            Ref.current.value = '';
            alert("DM already open");
        }
        }
    }


    
    let Ref = useRef();
    const handleInput = (e)=>{
        setName(e.target.value);
    }
    
    
    return(
        <div className="userMenu">
            <div className="navbar">
                 <img className="userProfile" src={`http://localhost:3000/Pics/${image}.jpg`}/>
                 <p>{username}</p>
            </div>
            <div className="AddUser">
                <input type = "text" className="InputUser" ref={Ref} placeholder="Add User" onChange={(e)=> handleInput(e)} onKeyDown={(e)=>AddUser(e)}/>
            </div>
            <div className="userList">
              {
                user.map((User,index)=>{
                    return(
                    <div className="users" onClick = {()=>{Receiver(User)}}>
                        <img src = {`http://localhost:3000/Pics/${User}.jpg`} className="ProfilePic"/>
                       <p className="userText"> {User} </p>
                    </div>
                    )   
            }
                )  
            }
                </div>

        </div>
    );
}

export default UserMenu;