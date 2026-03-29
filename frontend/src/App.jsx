import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import EditTransaction from "./pages/EditTransaction";

function App() {
  
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/transactions/add" element={<AddTransaction></AddTransaction>}></Route>
          <Route path="/transactions/:id" element={<EditTransaction></EditTransaction>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;