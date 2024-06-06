import { Route, Routes } from "react-router-dom";
import AddToken from "./pages/AddToken";
import Home from "./pages/Home";
import EditToken from "./pages/EditToken";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={"/edit-token/:tokenId"} element={<EditToken />} />
      <Route path={"/add-token"} element={<AddToken />} />
    </Routes>
  );
}

export default App;
