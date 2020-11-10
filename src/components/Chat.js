import React, { useState } from "react";
import { SearchOutlined, AttachFile, MoreVert } from "@material-ui/icons";
import { IconButton, Avatar } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from "../axios";

import "./Chat.css";

export default function Chat({ messages }) {
    const [input, setInput] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post("/messages/new", {
            name: "Bab",
            message: input,
            timestamp: new Date().toUTCString(),
            received: false,
        });

        setInput("");
    };
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>Romm name</h3>
                    <p>Last seen at...</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map((msg) => (
                    <p className={`chat__message ${msg.received && "chat__receiver"}`}>
                        <span className="chat__name">{msg.name}</span>
                        {msg.message}
                        <span className="chat__timestamp">{msg.timestamp}</span>
                    </p>
                ))}
            </div>

            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"></input>
                    <button type="submit" onClick={sendMessage}>
                        Send a message
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    );
}
