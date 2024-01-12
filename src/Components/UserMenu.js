import React from "react";
import { useState,useRef } from "react";
import  "./UserMenu.css";
import Lonely from "../Pics/lonelyWarrior.jpg";
const UserMenu = () =>{
    const [user,setUser] = useState(["Meow","DumDum","ShadowSlave"]);
    return(
        <div className="userMenu">
            <div className="navbar">
                 <img className="userProfile" src = {Lonely}/>
                 <p>Dummy UserName</p>
            </div>
            
            <div className="userList">
              {
                user.map((User,index)=>{
                    return(
                    <div className="users">
                        <img src = {Lonely} className="ProfilePic"/>
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