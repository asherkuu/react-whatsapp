import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import axios from "../axios";
import "./SidebarChat.css";

export default function SidebarChat() {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        axios.get("/user/").then((res) => setUserList(res.data));
    }, []);

    return (
        <>
            {userList.map((user, index) => (
                <div className="sidebarChat" key={index}>
                    <Avatar />
                    <div className="sidebarChat__info">
                        <h2>{user.name}</h2>
                        <p>This is the last message</p>
                    </div>
                </div>
            ))}
        </>
    );
}
