import React, { useState } from 'react'
import { AiFillMessage } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";
import {NavLink, useNavigate} from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import Avater from './Avater'
import {useSelector} from 'react-redux'
import EditUser from './EditUser';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { logout } from '../redux/UseSlice'
import { SiAzuredataexplorer } from "react-icons/si";
import SearchUser from './SearchUser';



function Sidebar() {
  const naviagte = useNavigate()
  const dispatch = useDispatch()
  const userDetails = useSelector(state=>state?.user);
  //console.log(userDetails);
  const [editUserOpen ,setEditUserOpen] = useState(false)
  const [openSeachUser , setOpenSeachUser] = useState(false)
  const [allUser ,setAllUser] = useState([]);



const handleLogout = async()=>{

  try {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/logout` ;
    const response = await axios({
      method:'post',
      url: URL
    });
    console.log(response);
    
    if(response?.data.success){
      dispatch(logout())
      toast.success("Logout Successfully")
      naviagte("/email")
    }
  } catch (error) {
    toast.error("Something Went Wrong")
  }

}
  return (


    <div className='w-full h-full grid grid-cols-[48px,1fr]'>
        <div className='bg-slate-100 w-12 h-full rounded-t-md rounded-br-lg py-5 text-slate-600 flex flex-col justify-between'>
           <div>
                <NavLink  className={({isActive})=> `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive && "bg-slate-200"}`} title='Chat' >
                    <AiFillMessage
                    size={20}
                    />
                </NavLink>
                <div 
                className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded' 
                title='Add Friend'
                onClick={()=>setOpenSeachUser(true)}
                >
                    <FaUserPlus
                    size={20}
                    />
                </div>
          </div>
          <div className='flex flex-col justify-center items-center gap-4'>
            <button 
            className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded' 
            title={userDetails?.name}
            onClick={()=>setEditUserOpen(true)}
            >
              <span>
                  <Avater
                    userId = {userDetails?._id}
                    width={35}
                    height={35}
                    name={userDetails?.name}
                    imageUrl={userDetails?.profile_pic}
                  />
              </span>

            </button>
            <button className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded' title='Logout'
            onClick={handleLogout}
            >
              <span className='-ml-2'>
                  <BiLogOut
                  size={25}
                  />
              </span>
            </button>
          </div>
      </div>
      <div className='w-full'>
        <div className='h-16'>
          <h2 className='text-lg font-bold p-4'>Messages</h2>
        </div>

        <hr className='text-black font-bold'/>
        <div className='h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
              {
                allUser.length ===0 && (
                  <div>
                    <div className='flex justify-center items-center py-10 mt-10'>
                        <SiAzuredataexplorer
                        size={50}
                        />
                    </div>
                    <p className='text-lg text-center '>Explore user to Start Chat</p>
                  </div>
                )
              }
        </div>
      </div>


      {
        editUserOpen? (
          <EditUser onClose={()=>setEditUserOpen(false)} user={userDetails}/>
        ):null
      }

      {
        openSeachUser && (
          <SearchUser onClose={()=>setOpenSeachUser(false)}/>
        )
      }
    </div>
  )
}

export default Sidebar