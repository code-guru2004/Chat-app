import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';


function Avater({userId ,name , imageUrl ,width ,height}) {
    const onlineUser = useSelector(state => state?.user?.onlineUser)
    let avaterName = ""

    if(name){
        const splitName = name?.split(" ")

        if(splitName.length > 1){
            avaterName = splitName[0][0] + splitName[1][0]
        }else{
            avaterName = splitName[0][0]
        }
    }
    //console.log("iMg",imageUrl);
    
    const bgColor = [
        "bg-slate-200",
        "bg-red-200",
        "bg-orange-200",
        "bg-amber-200",
        "bg-yellow-200",
        "bg-lime-200",
        "bg-green-200",
        "bg-emerald-200",
        "bg-teal-300",
        "bg-cyan-200",
        "bg-sky-200",
        "bg-indigo-300",
        "bg-violet-300",
        "bg-fuchsia-300",
        "bg-pink-300"
    ];

    const randomIndex = Math.floor(Math.random() * bgColor.length)
    //console.log(randomIndex);
    const isOnline = onlineUser.includes(userId)
  return (
    <div 
    className={`text-black  shadow border-black  rounded-full flex items-center justify-center text-2xl font-bold relative ${bgColor[randomIndex]}`}
    style={{width: width+'px' , height: height+'px'}}
    >
        {imageUrl ? (
            <img
                src={imageUrl}
                alt={name}
                width={width}
                height={height}
                style={{width: width+'px' , height: height+'px'}}
                className='overflow-hidden rounded-full object-cover'
            />
            )   : (
                name ? (
                    <div style={{width : width + 'px', height: height+ 'px'} } className='overflow-hidden rounded-full flex items-center justify-center z-0'>
                        {avaterName}
                    </div>
                ) : (
                    <FaUserAlt
                    size={50}
                   />
                )
            )
            }
            {
                isOnline &&  <div className='bg-green-600 p-1 absolute bottom-0 -right-1 z-10000 rounded-full'></div>
            }
       
    </div>
  )
}

export default Avater