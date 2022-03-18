import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'

export type ItemType = {
  id: number,
  title: string,
  image: string,
  createdAt: string,
  price: number
}
export type OrderType = {
  id: number,
  quantity: number,
  createdAt: string,
  userId: number,
  itemId: number,
  item: ItemType
}
export type UserType = {
  id?: number,
  name?: string,
  email?: string,
  joinedAt?: string,
  orders?: OrderType
}

function App() {
  const [currentUser, setCurrentUser] = useState<UserType>()
  
  
  return (
    <div className="App">
      <Routes>
          <Route index element={<HomePage currentUser={currentUser} setCurrentUser={setCurrentUser} />}/>
          <Route path='/login'  
          element={
            currentUser
            ?<Navigate replace to="/" />
            :<LoginPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            
            } />
          <Route path='/register' element={<RegisterPage setCurrentUser={setCurrentUser} />} />
      </Routes>
    </div>
  )
}

export default App
