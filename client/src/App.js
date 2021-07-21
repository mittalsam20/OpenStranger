import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
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
  const [allmessage, setAllmessage] = useState({});
  const [media, setMedia] = useState(null);
  const [avatar, setAvatar] = useState("");
  const receiverRef = useRef(null);
  // ------------------------------------------------FUNCTIONS-----------------------------------------

  const gobot = () => {
    const ele = document.querySelector(".message-area ul");
    if (ele) {
      ele.scrollTop = ele.scrollHeight;
    }
  };

  const onChatClose = () => {
    setStep(1);
    receiverRef.current = null;
  };

  const sortNames = (username1, username2) => {
    return [username1, username2].sort().join("-");
  };

  const checkMessages = (receiver) => {
    const key = sortNames(username, receiver);
    let unseenmessages = [];
    if (key in allmessage) {
      unseenmessages = allmessage[key].filter((msg) => !msg.view);
    }
    return unseenmessages.length;
  };

  const onCreateUser = () => {
    console.log(username);
    socket.emit("new_user", username);
    const picpath = `images/users_head/${parseInt(
      Math.floor(Math.random() * 8 + 1)
    )}.png`;
    setAvatar(picpath);
    setStep((prevStep) => prevStep + 1);
  };

  const onUserSelect = (username) => {
    setReceiver(username);
    receiverRef.current = username;
    setStep((prevStep) => prevStep + 1);
  };

  // ---------------------------------------------------SEND MESSAGE FUNCTION--------------------------
  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    const data = {
      sender: username,
      view: false,
      receiver,
      message,
      media,
      avatar,
    };

    socket.emit("send_message", data);
    const key = sortNames(username, receiver);
    const tempAllMessage = { ...allmessage };
    //If chat has already happened
    if (key in tempAllMessage) {
      tempAllMessage[key] = [...tempAllMessage[key], { ...data, view: true }];
    } else {
      //if brand new chatting begins
      tempAllMessage[key] = [{ ...data, view: true }];
    }
    setAllmessage({ ...tempAllMessage });
    console.log(allmessage);
    if (media !== null) {
      setMedia(null);
    }
    setMessage("");
  };

  const updateview = () => {
    const key = sortNames(username, receiver);
    if (key in allmessage) {
      const messages = allmessage[key].map((msg) =>
        !msg.view ? { ...msg, view: true } : msg
      );

      allmessage[key] = [...messages];
      setAllmessage({ ...allmessage });
    }
  };
  // -------------------------------------------------------------UseEffects---------------------------------
  useEffect(() => {}, [username]);

  useEffect(() => {
    const key = sortNames(username, receiver);
    if (key in allmessage) {
      if (allmessage[key].length > 0) {
        gobot();
      }
    }
  }, [allmessage]);

  useEffect(() => {
    updateview();
  }, [receiver]);

  useEffect(() => {
    socket.on("all_users", (users) => {
      console.log({ users });
      setUsers(users);
    });

    socket.on("new_message", (data) => {
      console.log(data);

      setAllmessage((prevAllmessage) => {
        const messages = { ...prevAllmessage };
        const key = sortNames(data.sender, data.receiver);
        if (receiverRef.current === data.sender) {
          console.log("inside true cond", receiverRef.current, data.sender);
          data.view = true;
        }
        if (key in messages) {
          messages[key] = [...messages[key], data];
        } else {
          messages[key] = [data];
        }
        return { ...messages };
      });
    });
  }, []);

  //----------------------------
  console.log(allmessage);
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
              checkMessages={checkMessages}
            />
          )}

          {/* select user and switch to chat window */}
          {step === 2 && (
            <MessagesControl
              sendMessage={sendMessage}
              value={message}
              receiver={receiver}
              allmessage={allmessage}
              sortNames={sortNames}
              username={username}
              avatar={avatar}
              media={media}
              setMedia={setMedia}
              onChatClose={onChatClose}
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
