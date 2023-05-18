import axios from "axios";
import Routers from "./Routes";

export const baseurl = "https://chat-backend-2u02.onrender.com";
function App() {
  axios.defaults.baseURL = "https://chat-backend-2u02.onrender.com";
  axios.defaults.withCredentials = true;
  return <Routers />;
}

export default App;
