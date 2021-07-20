import "./App.css";
import { io } from "socket.io-client";
import { useState } from "react";

const socket = io("http://localhost:7000");

const App = () => {
  // -----------------------------------------------STATES-----------------------------------
  const [step, setStep] = useState(0);

  // ------------------------------------------------FUNCTIONS-----------------------------------------

  const onCreateUser = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const onUserSelect = (key) => {
    setStep((prevStep) => prevStep + 1);
  };
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
            <div className="username-container">
              <form style={{ display: "inline-block" }} onSubmit={onCreateUser}>
                <h4 className="username-label">Enter UserName</h4>
                <input className="input" />
              </form>
            </div>
          )}

          {/* Show all Online Users */}

          {step === 1 && (
            <>
              <div className="online-users-header">
                <div style={{ margin: "5px 10px" }}>Online Users</div>
              </div>
              <ul className="users-list">
                <li
                  onClick={() => {
                    onUserSelect("regrests");
                  }}
                >
                  <span style={{ textTransform: "capitalize" }}>
                    person I am talking to
                  </span>
                  <span className="new-message-count">3</span>
                </li>
              </ul>
            </>
          )}
          {/* select user and switch to chat window */}

          {step === 2 && (
            <>
              <div className="online-users-header">
                <div style={{ margin: "5px 10px" }}>
                  name of the user i am talik to
                </div>
              </div>
              <div className="message-area">
                <ul>
                  <li>
                    <div className="user-pic">
                      <img src="/images/users_head/1.png" alt="" srcset="" />
                    </div>
                  </li>
                </ul>
              </div>
              <form className="message-control">
                <textarea name="" id="" placeholder="Type something..!!" />

                <div>
                  <input type="file" />
                </div>
                <button>
                  <img src="" alt="" />
                  <span>Send</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
