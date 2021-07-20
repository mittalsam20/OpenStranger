import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import CreateUser from "./components/createuser";
import OnlineUsers from "./components/onlineusers";
import MessagesControl from "./components/messagescontrol";

const socket = io("http://localhost:7000");

const App = () => {
  // -----------------------------------------------STATES-----------------------------------
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState("");
  const [receiver, setReceiver] = useState("");
  const [users, setUsers] = useState({});
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState(null);
  const [avatar, setAvatar] = useState("");
  // ------------------------------------------------FUNCTIONS-----------------------------------------

  const onCreateUser = () => {
    console.log(username);
    socket.emit("new_user", username);
    const picpath = `images/users_head/${Math.floor(Math.random() * 8)}.png`;
    setAvatar(picpath);
    setStep((prevStep) => prevStep + 1);
  };

  const onUserSelect = (username) => {
    setReceiver(username);
    setStep((prevStep) => prevStep + 1);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    const data = {
      sender: username,
      receiver,
      message,
      media,
      avatar,
    };

    socket.emit("send_message", data);
  };

  useEffect(() => {}, [username]);

  useEffect(() => {
    socket.on("all_users", (users) => {
      console.log({ users });
      setUsers(users);
    });

    socket.on("new_message", (data) => {
      console.log(data);
    });
  }, []);

  // --------------------------------------------RETURN------------------------------------------
  return (
    <div className="App">
      <header className="app-header">
        <img src="images/chat.png" alt="Logo" />
        <div className="app-name b-500 primaryColor">Let's Meet</div>
      </header>
      <div className="chat-system">
        <div className="chat-box">
          {/* Ask User Name or email */}
          {step === 0 && (
            <CreateUser
              onCreateUser={onCreateUser}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          )}

          {/* Show all Online Users */}
          {step === 1 && (
            <OnlineUsers
              onUserSelect={onUserSelect}
              users={users}
              username={username}
            />
          )}

          {/* select user and switch to chat window */}
          {step === 2 && (
            <MessagesControl
              sendMessage={sendMessage}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
