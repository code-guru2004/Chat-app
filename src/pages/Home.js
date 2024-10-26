import axios from 'axios'
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUser , setOnlineUser, setSocketConnection} from '../redux/UseSlice';
import Sidebar from '../components/Sidebar';
import Chat_v from '../assets/Chat_v.mp4'
import io from 'socket.io-client'


function Home() {
const dispatch = useDispatch();
const navigate = useNavigate();
const location = useLocation()
  useEffect(()=>{
    fetchData()
  },[])

  const user = useSelector(state => state.user);

  console.log('redux user' , user);
  
  const fetchData = async ()=>{
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user`
      const response = await axios({
        url: URL,
        withCredentials: true
      });

      dispatch(setUser(response?.data?.data))

      if(response?.data.data.logout){
        dispatch(logout());
        navigate("/email");
      }
      console.log("User Details: " , response);
      
    } catch (error) {
      console.log(error);
      
    }
  }


  // socket connection
useEffect(()=>{
  const socketConnection = io(process.env.REACT_APP_BACKEND_URL , {
    auth : {
      token :localStorage.getItem('token')
    }
  })

  socketConnection.on("onlineUser" , (data)=>{
    console.log(data);
    dispatch(setOnlineUser(data))
  })

  dispatch(setSocketConnection(socketConnection))

  return ()=>{
    socketConnection.disconnect()
  }
},[])

  const basePath = location.pathname === '/'
  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && 'hidden'} lg:block`}>

          <Sidebar/>
      </section>
      <section className={basePath && 'hidden'}>
        <Outlet/>
      </section>

      <div className={`justify-center items-center rounded-full hidden ${basePath===false? "hidden" : "lg:flex"}`}>
        <div>
          <video src={Chat_v} loop autoPlay muted
          width={200}
          ></video>
        </div>
      </div>
    </div>
  )
}

export default Home