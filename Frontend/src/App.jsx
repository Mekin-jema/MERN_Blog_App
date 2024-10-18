import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, About, SignIn, SignUp, Dashboard, Project } from "./Pages";
import Header from "./Components/Header";
import FooterCom from "./Components/Footer";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project" element={<Project />} />
      </Routes>
      <FooterCom />
    </BrowserRouter>
  );
}

export default App;
