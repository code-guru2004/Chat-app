import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFiles';
import axios from 'axios'
import toast from 'react-hot-toast';

function Register() {
  const navigate = useNavigate()
  const [data ,setData] =useState({
    name : "",
    email : "",
    password : "",
    profile_pic : ""
  });
  const handelOnChange = (e)=>{
    const {name ,value} = e.target
    setData((prev)=>{
      return{
        ...prev,
        [name] : value
      }
    })
  }

  const [uploadPhoto , setUploadPhoto] = useState("")

  const handleUploadPhoto = async (e)=>{
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file)
    console.log(uploadPhoto);
    
    setUploadPhoto(file);

    setData((prev)=>{
      return{
        ...prev,
        profile_pic:uploadPhoto?.url
      }
    })
  }

  //console.log(uploadPhoto);

  const handelSubmit = async (e)=>{
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register` ;
    try {

      const response = await axios.post(URL,data)
      console.log("response",response);
      toast.success(response.data.message)
      if(response.data.message){
        setData({
          name : "",
          email : "",
          password : "",
          profile_pic : ""
        })
        navigate("/email")
      }
    } catch (error) {

      toast.error(error?.response?.data?.message)
      //console.log("error",error);
      
      
    }
    console.log("data",data);
  }

  const handelClose = (e)=>{
    setUploadPhoto(null)
    e.preventDefault();
    e.stopPropagation();
  }


  

  return (
    <div className='mt-12 flex items-center justify-center '>

      
        <div className='bg-white w-[30rem] mx-2 rounded-md overflow-hidden py-6  flex flex-col items-center justify-center'>
          <h2 className='text-yellow-900 font-bold '>Welcome to <span className='text-[#e632eb]'>Chat App</span></h2>
          <form 
          className='grid gap-4 mt-7 mb-3'
          onSubmit={handelSubmit}
          >
            <div className='flex flex-col gap-3 w-[100%]'>
              <label className='' htmlFor='name'>Name: </label>
              
              <input 
              type='text' 
              id= 'name'
              name='name'
              value={data.name}
              placeholder='Enter your name'
              className='bg-slate-100 px-2 py-1 focus:outline-primary border-none w-[27rem]'
              onChange={handelOnChange}
              required
              />
            </div>

            <div className='flex flex-col gap-3'>
              <label className='' htmlFor='email'>Email: </label>
              
              <input 
              type='email' 
              id= 'email'
              name='email'
              value={data.email}
              placeholder='Enter your email'
              className='bg-slate-100 px-2 py-1 focus:outline-primary border-none'
              onChange={handelOnChange}
              required
              />
            </div>

            <div className='flex flex-col gap-3'>
              <label className='' htmlFor='password'>Password: </label>
              
              <input 
              type='password' 
              id= 'password'
              name='password'
              value={data.password}
              placeholder='Enter your password'
              className='bg-slate-100 px-2 py-1 focus:outline-primary border-none'
              onChange={handelOnChange}
              required
              />
            </div>

            <div className='flex flex-col gap-3'>
              <label className='' htmlFor='profile_pic'>Profile Picture: 
                <div className='h-14 bg-slate-100 rounded-md flex items-center justify-center border hover:border-primary cursor-pointer gap-3'>
                  <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                    {
                      uploadPhoto?.name ? uploadPhoto.name : "Upload Profile Image"
                    }
                  </p>
                  {
                    uploadPhoto?.name ?
                    <button 
                  onClick={handelClose}
                  className='text-lg ml-2 hover:text-red-600'
                  ><IoMdClose className='text-[1.5rem]'/></button>
                  : null
                  }
                  
                </div>
              </label>
              
              <input 
              type='file' 
              accept="image/png, image/jpeg, image/jpg"
              id= 'profile_pic'
              name='profile_pic'
              className='bg-slate-100 px-2 py-1 focus:outline-primary border-none hidden'
              onChange={handleUploadPhoto}
              />
            </div>

            <div>
              <button className='bg-primary text-white px-8 py-2 w-full rounded-md font-bold hover:bg-secondary mt-6 '>Register</button>
            </div>
          </form>
          <p>Already Have Account ?<Link to={"/email"} className='text-blue-700 underline font-semibold hover:text-primary'>Login</Link></p>
        </div>
      
    </div>
  )
}

export default Register