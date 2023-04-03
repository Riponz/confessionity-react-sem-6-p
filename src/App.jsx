import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Account from './Pages/Account'
import Home from './Pages/Home'
import Myposts from './Pages/Myposts'
import Post from './Pages/Post'

function App() {

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/post/' element={ <Post/> }/>
        <Route path='/my-posts/' element={ <Myposts/> }/>
        <Route path='/accounts/' element={ <Account/> }/>
      </Routes>
    </div>
  )
}

export default App
