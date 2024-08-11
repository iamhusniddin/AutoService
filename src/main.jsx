import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'
// import router from './components/router/Index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ChakraProvider>
      {/* <RouterProvider router={router}> */}
         <App />
      {/* </RouterProvider> */}
    </ChakraProvider>
)
