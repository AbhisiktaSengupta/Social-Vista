import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import Spinner from '../components/spinner/Spinner.jsx'
function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    })
    if(posts.length==0)
    {
        return(
            <div className="flex flex-col items-center">
            <Spinner />
            </div>
        )
    }
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                
                {
                    posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))
                }
            </div>
            </Container>
    </div>
  )
}

export default AllPosts