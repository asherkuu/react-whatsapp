import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "./axios";

import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

import "./App.css";

function App() {
    const [msgs, setMsgs] = useState([]);

    useEffect(() => {
        axios.get("/messages/sync").then((res) => setMsgs(res.data));
    }, []);

    useEffect(() => {
        var pusher = new Pusher("2e65538689cd28c448d1", {
            cluster: "ap3",
        });

        var channel = pusher.subscribe("messages");
        channel.bind("inserted", (newMessage) => {
            setMsgs([...msgs, newMessage]);
        });

        // clean up function
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [msgs]); // msgs가 변경될때마다 rerender 가 된다.

    /*
        1. fetch 를 통해 기존 messages 호출
        2. 호출 후 뿌려줌
        3. 새로 등록
        4. 새로 등록시 pusher를 이용해 pusher 에서 데이터를 새로 담음
        5. 새로 담은 데이터를 뿌려줌
    */

    return (
        <div className="app">
            <div className="app__body">
                <Sidebar></Sidebar>
                <Chat messages={msgs}></Chat>
            </div>
        </div>
    );
}

export default App;
