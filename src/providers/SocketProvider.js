import React, {useState, useEffect, createContext} from "react";

export const SocketContext = createContext({socket: null, setSocket: () => {}});
export default (props) => {
    const [socket, setSocket] = useState(null);
    const value = { socket, setSocket };

    return (
        <SocketContext.Provider value={value}>{props.children}</SocketContext.Provider>
    )
}