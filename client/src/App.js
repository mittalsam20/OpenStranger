import "./App.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:7000");
function App() {
  return <div className="App"></div>;
}

export default App;
