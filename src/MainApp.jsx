import React from 'react'
import Asosiy from './pages/Asosiy'
import KirimTovarlar from './pages/KirimTovarlar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Tovarlar from './pages/Tovarlar'
import Buyurtmalar from './pages/Buyurtmalar'
import Xizmatlar from './pages/Xizmatlar'
import Mijozlar from './pages/Mijozlar'
import Avtomobillar from './pages/Avtomobillar'
import Xodimlar from './pages/Xodimlar'
import Xarajatlar from './pages/Xarajatlar'
import Taminlovchi from './pages/Ta\'minlovchi'
import BuyurtmaTarixi from './pages/BuyurtmaTarixi'
import BuyurtmaTavfsiloti from './pages/BuyurtmaTavfsiloti'

function MainApp() {
  return (
    <div className='flex'>
      <Sidebar />
            <Routes>  
                <Route path='/' element={<Asosiy/>}/>
                <Route path='/buyurtma' element={<Buyurtmalar />}/>
                <Route path='/buyurtmatarixi' element={<BuyurtmaTarixi />}/>
                <Route path='/buyurtmatafsilotlari/:id' element={<BuyurtmaTavfsiloti />}/>
                <Route path='/kirimtovarlar' element={<KirimTovarlar/>}/>
                <Route path='/tovarlar' element={<Tovarlar/>}/>
                <Route path='/taminotchi' element={<Taminlovchi />}/>
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