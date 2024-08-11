import React from 'react'
import Asosiy from './pages/Asosiy'
import KirimTovarlar from './pages/KirimTovarlar'
import Sidebar from './components/Sidebar'
import Hisobot from './pages/Xizmatlar'
import { Route, Routes } from 'react-router-dom'
import Tovarlar from './pages/Tovarlar'
import Buyurtmalar from './pages/Buyurtmalar'
import Servislar from './pages/Servislar'
import Mahsulotlar from './pages/Mahsulotlar'
import Xizmatlar from './pages/Xizmatlar'
import Mijozlar from './pages/Mijozlar'
import Avtomobillar from './pages/Avtomobillar'
import Xodimlar from './pages/Xodimlar'
import Xarajatlar from './pages/Xarajatlar'

function MainApp() {
  return (
    <div className='flex'>
      <Sidebar />
            <Routes>  
                <Route path='/' element={<Asosiy/>}/>
                <Route path='/kirim-tovarlar' element={<KirimTovarlar/>}/>
                <Route path='/tovarlar' element={<Tovarlar/>}/>
                <Route path='/buyurtmalar' element={<Buyurtmalar />}/>
                <Route path='/xizmatlar' element={<Xizmatlar/> }/>
                <Route path='/mijozlar' element={<Mijozlar/> }/>
                <Route path='/avtomobillar' element={<Avtomobillar/> }/>
                <Route path='/xodimlar' element={<Xodimlar/> }/>
                <Route path='/xarajatlar' element={<Xarajatlar/> }/>
            </Routes>
        </div>
  )
}

export default MainApp