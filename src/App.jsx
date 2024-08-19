import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/Auth/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import MainApp from "./MainApp";
import { SidebarProvider } from "./context/SidebarContext";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";


function App() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-in",
      delay: 100,
    });
    AOS.refresh();
  });
  return (
    <div className="bg-slate-200 overflow-x-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route
            path="/*"
            element={
              <SidebarProvider>
                <ProtectedRoute>
                  <MainApp />
                </ProtectedRoute>
              </SidebarProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
