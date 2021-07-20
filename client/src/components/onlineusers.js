const OnlineUsers = (props) => {
  const { onUserSelect } = props;
  return (
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
  );
};

export default OnlineUsers;
