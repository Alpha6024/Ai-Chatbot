import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Hero from "./components/hero"
import Chatbot from "./components/chatbot"
import Login from "./components/login"

const router= createBrowserRouter([
  {
    path:"",
    element:<Hero/>
  },
  {
    path:"/chatbot",
    element:<Chatbot/>
  },
  {
    path:"/login",
    element:<Login/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
