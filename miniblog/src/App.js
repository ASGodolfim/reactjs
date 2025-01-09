import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

import { useState, useEffect } from 'react';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Account from './pages/Account/Account';
import CreatePost from './pages/CreatePost/CreatePost';
import Edit from './pages/Edit/Edit'
import Users from './pages/User/Users'

import { AuthProvider } from './context/AuthContext';

import app from './firebase/config';
import Search from './pages/Search/Search';
import Posts from './pages/Posts/Posts';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(undefined);
  const loadingUser = user === undefined;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (loadingUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>
              
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/search' element={<Search />} />
              <Route path='/posts/:id' element={<Posts />} />
              <Route path='user/:uid' element={<Users />} />

              <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />

              <Route path='/account' element={user ? <Account /> : <Navigate to="/login" />} />
              <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to="/login" />} />
              <Route path='/posts/edit/:id' element={user ? <Edit /> : <Navigate to="/login"/>} />

            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;