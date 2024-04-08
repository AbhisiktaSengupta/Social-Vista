import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
import {formatDateString} from './features/createdAt'
import { FaRegHeart } from "react-icons/fa";
import { CiSaveDown1 } from "react-icons/ci";
import { FaRegDotCircle } from "react-icons/fa";
function PostCard({$id, title, featuredImage, $createdAt,status}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-[#B7C9F2] rounded-xl p-4 h-96'>
            <div className='w-full justify-center  mb-4 h-auto '>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl h-64 w-full'/>
            </div>
            <div className='flex flex-row justify-between'>
                  <div className='flex flex-col '>
                      <p className='mb-2 font-serif text-xs text-indigo-950'>{formatDateString($createdAt)}</p>
                      <h2 className='font-serif font-semibold'>{title}</h2>
                  </div>
                  <div className='flex flex-col ml-5 '>
                      <div className='flex flex-row'>
                      <FaRegHeart className='mr-1 w-6 h-6'/>
                      <span className='mr-4'>1.12K</span>
                      </div>
                      <div className='flex flex-row mt-5 ml-2'>
                  
                  { (status==='active')? 
                  <div className='flex flex-row'>
                    <FaRegDotCircle className='w-4 h-4 mr-3 mt-1.5'style={{ color: 'green' }}/>
                  <span>active</span></div>
                  :
                  <div className='flex flex-row'>
                    <FaRegDotCircle className='w-4 h-4 mr-3 mt-1.5 ' style={{ color: 'red' }}/>
                  <span>inactive</span>
                  </div>
                  }
                  </div>

           </div>
          </div>
        </div>
    </Link>
  )
}


export default PostCard