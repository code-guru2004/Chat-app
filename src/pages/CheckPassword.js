import React, { useState } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import Avater from '../components/Avater';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/UseSlice';

function CheckPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  console.log(location);
  

  const [password,setPassword] = useState("")
  // const handelOnChange = (e)=>{
  //   const {name ,value} = e.target
  //   setData((prev)=>{
  //     return{
  //       ...prev,
  //       [name] : value
  //     }
  //   })
  // }


  const handelSubmit = async (e)=>{
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password` ;


    try {

      const response = await axios({
        method:"post",
        url: URL , data : {
          userId: location?.state?.data?._id,
          password
        },
        withCredentials:true
      })
      console.log("response",response);

      toast.success(response.data?.message);


      if(response?.data?.success){

        dispatch(setToken(response?.data?.token));

        localStorage.setItem("token",response?.data?.token);

        setPassword("")

        navigate("/")
      }

    } catch (error) {

      toast.error(error?.response?.data?.message)
      //console.log("error",error);
      
      
    }
    //console.log("data",data);
  }



  return (
    <div className='mt-5'>
        <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>

            

         
          <div className='w-fit mx-auto mb-2 flex flex-col items-center gap-2'>
                <Avater 
                width={70}
                height={70}
                imageUrl={location?.state?.data.profile_pic}
                name={location?.state?.data?.name}

                />
                <h2>{location?.state?.data?.name}</h2>
            </div>

          <form className='grid gap-4 mt-3' onSubmit={handelSubmit}>
              

              <div className='flex flex-col gap-1'>
                <label htmlFor='email'>Password :</label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='enter your password' 
                  className='bg-slate-100 px-2 py-1 focus:outline-primary'
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                />
              </div>

              <button
               className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
              >
                Log in
              </button>

          </form>

          {/* <p className='my-3 text-center'>New User ? <Link to={"/register"} className='hover:text-primary font-semibold'>Register</Link></p> */}
        </div>
    </div>
  )
}

export default CheckPassword