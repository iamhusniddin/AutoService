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

function MainApp() {
  return (
    <div className='flex'>
      <Sidebar />
            <Routes>  
                <Route path='/' element={<Asosiy/>}/>
                <Route path='/импортные товары' element={<KirimTovarlar/>}/>
                <Route path='/товары' element={<Tovarlar/>}/>
                <Route path='/заказы' element={<Buyurtmalar />}/>
                <Route path='/поставщик' element={<Taminlovchi />}/>
                <Route path='/услуги' element={<Xizmatlar/> }/>
                <Route path='/клиенты' element={<Mijozlar/> }/>
                <Route path='/автомобили' element={<Avtomobillar/> }/>
                <Route path='/рабочий' element={<Xodimlar/> }/>
                <Route path='/расходы' element={<Xarajatlar/> }/>
            </Routes>
        </div>
  )
}

export default MainApp