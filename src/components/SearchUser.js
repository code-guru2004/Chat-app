import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import Loading from './Loading';
import UserSearchCard from './UserSearchCard';
import toast from 'react-hot-toast'
import axios from 'axios'
import { IoMdClose } from "react-icons/io";


function SearchUser({onClose}) {

  const [searchUser , setSearchUser] = useState([])
  const [loading , setLoading] = useState(false)
  const [search ,setSearch]  = useState("");

  useEffect(()=>{
    handleSearchUser();
  },[search])

const handleSearchUser = async ()=>{
  const URL = `${process.env.REACT_APP_BACKEND_URL}/api/search-user` ;
  try {

    setLoading(true)
    const res = await axios.post(URL, {search : search})
    setSearchUser(res?.data?.data)
    setLoading(false)

  } catch (error) {
    setLoading(false)
    toast.error(error.res?.data?.message)
  }
}

  console.log(searchUser);
  
  return (
    <div className='fixed left-0 top-0 bottom-0 right-0 bg-slate-700 bg-opacity-40 w-full mx-auto p-3 flex justify-center items-start gap-2 z-40'>
      <div className='w-full max-w-lg  mt-10 '>
          {/* input search user */}
          <div className='bg-white rounded h-14 overflow-hidden flex justify-center items-center px-2'>
            <input 
            type='text'
            placeholder='Enter User Name'
            className='w-full outline-none py-1 h-full px-2'
            onChange={(e)=>setSearch(e.target.value)}
            />
           <CiSearch
           size={30}
           />
          </div>

          {/* {Display searched user} */}
          <div className='bg-white mt-2  w-full p-4 rounded overflow-y-scroll'>
              {
                searchUser.length ===0 && !loading && (
                  <p className='text-center text-black'>No User Found</p>
                )
              }
              {
                loading && (
                    <Loading/>
                )
              }

              {
                searchUser.length > 0 && !loading &&(
                  searchUser.map((user,index)=>{
                    return(
                      <UserSearchCard onClose={onClose} key={user._id} user={user}/>
                    )
                  })
                )
              }
          </div>
      </div>
      <button onClick={onClose}>
        <IoMdClose size={30} className='mt-10 text-black'/>
      </button>
      
    </div>
  )
}

export default SearchUser