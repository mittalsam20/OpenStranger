const OnlineUsers = (props) => {
  const { onUserSelect, users, username } = props;
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
                  <span className="new-message-count">3</span>
                </li>
              )}
            </>
          ))}
      </ul>
    </>
  );
};

export default OnlineUsers;
