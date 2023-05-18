import axios from "axios";
import Routers from "./Routes";

export const baseurl = "https://chat-backend.onrender.com";
function App() {
  axios.defaults.baseURL = "https://chat-backend.onrender.com";
  axios.defaults.withCredentials = true;
  return <Routers />;
}

export default App;
