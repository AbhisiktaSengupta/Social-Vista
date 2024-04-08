import React, { useState } from 'react'
import { GoHeartFill } from "react-icons/go";
import appwriteService from './../appwrite/config'
function LikeBtn({likeCount,$id}) {
   const [likes,setLikes]=useState(likeCount);
   const[toggle,setToggle]=useState(false);
   
   const likeHandler=async ()=>{
    const newLikesCount = toggle ? likes - 1 : likes + 1;
        setLikes(newLikesCount);
        setToggle(!toggle);
        try{
            const updatedPost = await appwriteService.updateLikes($id, {likeCount : newLikesCount});
            console.log(updatedPost);
        } catch (error) {
            console.log("Error updating likes:", error);
        }
   }
    return (
    <div className='flex flex-row gap-5'>
        <button onClick={likeHandler}>
           { (toggle==true)?<GoHeartFill color='red' size={34} />:<GoHeartFill color='white' size={34} />}
        </button>
        <div>{likes}</div>
    </div>
  )
}

export default LikeBtn