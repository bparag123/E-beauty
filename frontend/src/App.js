import './App.css';
import SignUp from './components/User/SignUp';
import Login from './components/User/Login';
import MyNavBar from './components/UI/Navbar';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import NotFound from './components/NotFound';
import { useSelector } from 'react-redux';

function App() {
  const authSlice = useSelector(state => state.user)
  return (

    < div className="App" >
      <MyNavBar />

      <Routes>
        {authSlice.isLoggedIn && <>
          <Route path="/" element={<Home />}></Route>
        </>}
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
