import React from "react";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton, Avatar } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";

import SidebarChat from "./SidebarChat";
import "./Sidebar.css";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src="https://scontent-gmp1-1.cdninstagram.com/v/t51.2885-19/s150x150/90441929_204756314286332_377904809346334720_n.jpg?_nc_ht=scontent-gmp1-1.cdninstagram.com&_nc_ohc=_zMkz1OermIAX_tvMYD&oh=f70fb7ef0deb539a5af29038fbcc2d41&oe=5FCA0FF8"></Avatar>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search or start new chat" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat />
            </div>
        </div>
    );
}
