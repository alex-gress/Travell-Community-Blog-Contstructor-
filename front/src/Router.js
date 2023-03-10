import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Tags from './pages/Tags/Tags';
import NotFound from './pages/NotFound/NotFound';
import Header from './components/Header/Header';
import PodHeader from './components/PodMenu/PodHeader';

const Router = () => {
  return (
    <div className='App'>
      <PodHeader/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/auth' element={<Auth/>} />
        <Route path='/tags' element={<Tags/>} />

        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  )
}
export default Router