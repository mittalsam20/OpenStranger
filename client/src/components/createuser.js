const CreateUser = (props) => {
  const { onCreateUser, value, onChange } = props;
  return (
    <div>
      <div className="username-container">
        <form style={{ display: "inline-block" }} onSubmit={onCreateUser}>
          <h4 className="username-label">Enter UserName</h4>
          <input className="input" value={value} onChange={onChange} />
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
