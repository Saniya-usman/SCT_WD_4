import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { useState, useEffect } from "react";
import {Toaster} from "react-hot-toast";
function App() {
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("profile"));
    setProfile(stored);
  }, []);

  return (
    <BrowserRouter>
    <Toaster
  position="top-center"
  toastOptions={{
    style: {
      background: "#4B2E2B",
      color: "#fff",
      borderRadius: "12px",
    },
  }}
/>
      <Routes>
        
        {!profile ? (
          <Route path="*" element={<Profile />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;