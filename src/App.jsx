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

// function MainApp(){
//   return (
//     <div className='flex bg-slate-200'>
//       <Sidebar />
//             <Routes>
//                 <Route path='/' element={<Asosiy/>}/>
//                 <Route path='/kirim-tovarlar' element={<KirimTovarlar/>}/>
//                 <Route path='/ombor-bolimi' element={<Ombor/>}/>
//                 <Route path='/sotuv-bolimi' element={<Sotuv />}/>
//                 <Route path='/xarajatlar-bolimi' element={<Xarajatlar />}/>
//                 <Route path='/hisobot-bolimi' element={<Hisobot/> }/>
//             </Routes>
//         </div>
//   )
// }
export default App;
