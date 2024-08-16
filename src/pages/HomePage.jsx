import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import MainText from '../components/MainText';
import Input from '../components/Input';
import ShortLinks from '../components/ShortLinks';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { backendPortURL } from '../../confiq';
import { setUser } from '../Redux/slices/UserSlice';

const HomePage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const checkForLoginUser = async ()=>{
      axios.defaults.withCredentials = true
      const loginResponse = await axios.get(`${backendPortURL}user/me`)
      console.log("loginresponse", loginResponse)
      dispatch(setUser(loginResponse.data))
    }
    checkForLoginUser()

  }, [])
  
  
  return (
    <div className='text-white'>
      <Navbar />
      <div className=' flex flex-col justify-start gap-4 text-center w-full pt-20'>
        <MainText />
        <Input />
      </div>
      <div className=' w-full pt-6 px-3'>
        <ShortLinks />
      </div>
    </div>
  );
};

export default HomePage;
