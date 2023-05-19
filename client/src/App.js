import axios from "axios";
import Routers from "./Routes";

function App() {
  axios.defaults.baseURL = "https://chat-backend-sh8h.onrender.com";
  axios.defaults.withCredentials = true;
  return <Routers />;
}

export default App;
