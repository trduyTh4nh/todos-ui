import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import InformationPage from './pages/Information';
import Layout from './pages/Layout';
function App() {
  return (
    <BrowserRouter>
      <Routes path="/" element={<Layout></Layout>} >
        <Route index element={<Home></Home>}></Route>
        <Route path='/info' element={<InformationPage></InformationPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
