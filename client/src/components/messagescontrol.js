const MessagesControl = (props) => {
  const {
    sendMessage,
    onChange,
    value,
    receiver,
    allmessage,
    sortNames,
    username,
    avatar,
    setMedia,
  } = props;

  const messages = allmessage ? allmessage[sortNames(username, receiver)] : [];

  return (
    <div>
      <div className="online-users-header">
        <div style={{ margin: "5px 10px", textTransform: "capitalize" }}>
          {receiver}
        </div>
      </div>
      <div className="message-area">
        <ul>
          {messages &&
            messages.length > 0 &&
            messages.map((msg, index) => (
              <li>
                <div className="user-pic">
                  <img src={avatar} alt="user-icon" srcset="" />
                </div>
                <div className="message-text">{msg.message}</div>
              </li>
            ))}
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
          <input
            type="file"
            id="hidden-file"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                console.log(reader.result);
                setMedia({
                  image: true,
                  content: reader.result,
                  name: file.name,
                });
              };
              reader.onerror = (err) => {
                console.log(err);
              };
              console.log(file);
            }}
          />
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
