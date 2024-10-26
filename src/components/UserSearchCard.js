import React from 'react'
import Avater from './Avater'
import {Link} from 'react-router-dom'


function UserSearchCard({user ,onClose}) {
  return (

<Link to={"/" + user?._id} onClick={onClose} className='flex mb-3 gap-8 justify-start items-center border-b-2 p-3 hover:border hover:border-primary cursor-pointer hover:bg-slate-100'>
    <div className='border-[3px] rounded-full '>
        <Avater
        width={30}
        height={30}
        name= {user?.name}
        imageUrl={user?.profile_pic}
        userId= {user?._id}
        />
    </div>
    <div>
        <p className='text-md font-bold'>{user?.name}</p>
        <p className='text-sm'>{user?.email}</p>
    </div>
</Link>

  )
}

export default UserSearchCard