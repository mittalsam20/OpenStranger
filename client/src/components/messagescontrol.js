const MessagesControl = (props) => {
  const { sendMessage, onChange, value, receiver } = props;
  return (
    <div>
      <div className="online-users-header">
        <div style={{ margin: "5px 10px", textTransform: "capitalize" }}>
          {receiver}
        </div>
      </div>
      <div className="message-area">
        <ul>
          <li>
            <div className="user-pic">
              <img src="/images/users_head/1.png" alt="user-icon" srcset="" />
            </div>
            <div className="message-text">Your Message</div>
          </li>
        </ul>
      </div>
      <form className="message-control" onSubmit={sendMessage}>
        <textarea
          value={value}
          onChange={onChange}
          name=""
          id=""
          placeholder="Type something..!!"
        />

        <div className="file-input-container">
          <input type="file" id="hidden-file" />
          <label htmlFor="hidden-file">
            <img src="images/paper-clip.png" alt="attachment-icon" width="20" />
          </label>
        </div>
        <button>
          <img src="images/send.png" alt="send-icon" />
          <span style={{ display: "inline-block" }}>Send</span>
        </button>
      </form>
    </div>
  );
};

export default MessagesControl;
