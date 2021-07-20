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
  const [users, setUsers] = useState({});

  // ------------------------------------------------FUNCTIONS-----------------------------------------

  const onCreateUser = () => {
    console.log(username);
    socket.emit("new_user", username);
    setStep((prevStep) => prevStep + 1);
  };

  const onUserSelect = (key) => {
    setStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {}, [username]);

  useEffect(() => {
    socket.on("all_users", (users) => {
      console.log({ users });
      setUsers(users);
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
          {step === 2 && <MessagesControl />}
        </div>
      </div>
    </div>
  );
};

export default App;
