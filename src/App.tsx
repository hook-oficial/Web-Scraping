import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/home/Home';
import DefaultTemplate from "./components/template/default/DefaultTemplate";

function App() {
  
  return (
  
  <BrowserRouter>
  
      <Routes>
  
        <Route path="/" element={<Home />} />
  
        <Route path="/default-template" element={<DefaultTemplate />} />

      </Routes>
  
    </BrowserRouter>
  
  );

}

export default App;
