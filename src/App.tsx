import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/home/Home';
import Test from './components/template/default/TableDefault';

function App() {
  
  return (
  
  <BrowserRouter>
  
      <Routes>
  
        <Route path="/" element={<Home />} />
  
        <Route path="/default-template" element={<Test />} />

      </Routes>
  
    </BrowserRouter>
  
  );

}

export default App;
