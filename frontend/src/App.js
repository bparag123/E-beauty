import './App.css';
import SignUp from './components/User/SignUp';
import Login from './components/User/Login';
import MyNavBar from './components/UI/Navbar';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import NotFound from './components/NotFound';
import { useSelector } from 'react-redux';
import Treatment from './components/Treatment';

function App() {
  const authSlice = useSelector(state => state.user)
  return (

    < div className="App" >
      <MyNavBar />

      <Routes>

        <Route path="/" element={<Home />} />

        {authSlice.isLoggedIn && <>
          <Route path="/treatments" element={<Treatment />} />
        </>}
        {!authSlice.isLoggedIn && <>
          <Route path="login" element={<Login />} />
        </>}
        {!authSlice.isLoggedIn && <>
          <Route path="signup" element={<SignUp />} />
        </>}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
