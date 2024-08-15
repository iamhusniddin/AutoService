import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/Auth/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import MainApp from "./MainApp";
import { SidebarProvider } from "./context/SidebarContext";

function App() {
  return (
    <div className="bg-slate-200">
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
