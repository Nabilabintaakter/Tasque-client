import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("https://tasque-server.onrender.com"); 
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    return socket;
};

export default useSocket;
