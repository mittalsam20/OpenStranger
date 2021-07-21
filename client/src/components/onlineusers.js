const OnlineUsers = (props) => {
  const { onUserSelect, users, username, checkMessages } = props;
  return (
    <>
      <div className="online-users-header">
        <div style={{ margin: "5px 10px" }}>Online Users</div>
      </div>
      <ul className="users-list">
        {users &&
          Object.keys(users).map((user, index) => (
            <>
              {user !== username && (
                <li
                  key={user}
                  onClick={() => {
                    onUserSelect(user);
                  }}
                >
                  <span style={{ textTransform: "capitalize" }}>{user}</span>
                  {checkMessages(user) !== 0 && (
                    <span className="new-message-count">
                      {checkMessages(user)}
                    </span>
                  )}
                </li>
              )}
            </>
          ))}
      </ul>
    </>
  );
};

export default OnlineUsers;
