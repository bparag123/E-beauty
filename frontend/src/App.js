import './App.css';
import SignUp from './components/User/SignUp';
import Login from './components/User/Login';
import MyNavBar from './components/UI/Navbar';
import { Routes, Route, Outlet } from 'react-router-dom'
import Home from './components/Home';
import NotFound from './components/NotFound';
import TreatmentList from './components/treatments/TreatmentList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TreatmentDetails from './components/treatments/TreatmentDetails';

function App() {
  return (

    < div className="App" >
      <MyNavBar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/treatments" element={<Outlet />}>
          <Route path=':id' element={<TreatmentDetails />}/>
          <Route path='' element={<TreatmentList />}/>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        {/* {authSlice.isLoggedIn && <>
          <Route path="/treatments" element={<TreatmentList />} />
        </>}
        {!authSlice.isLoggedIn && <>
          <Route path="login" element={<Login />} />
        </>}
        {!authSlice.isLoggedIn && <>
          <Route path="signup" element={<SignUp />} />
        </>} */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
