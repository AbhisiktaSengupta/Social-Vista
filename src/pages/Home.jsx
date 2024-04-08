import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import Login from '../components/Login.jsx'
import Signup from '../components/Signup.jsx'
import Button  from '../components/Button.jsx';
import { useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../components/Logo.jsx'
import Spinner from '../components/spinner/Spinner.jsx'
function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            const userPosts = []
            if(posts){
                posts.documents.map((doc) =>{
                    if(doc.userId === localStorage.getItem('currentUser'))
                    {
                        userPosts.push(doc);
                    }
                })
                setPosts(userPosts)
            }
            console.log(posts)
        }).catch((err) => { console.error("Home.jsx Error : ",err) })
    }, [])
  const navigate=useNavigate()
    if (!authStatus && posts.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Container>
                <div className="flex flex-col items-center">
                <h1 className="text-6xl  mb-4 text-center text-[#350b39] font-Title font-extrabold">
                            Welcome to Social Vista!
                        </h1>
                        <div className='w-110 h-110'><Logo/></div>
                        <div className="p-2 flex flex-col items-center">
                            <Button className="bg-[#350b39] text-white text-lg font-serif font-bold text-lg mb-2 hover:bg-[#B7C9F2] hover:text-black hover:font-semibold"
onClick={() => navigate('/login')} >Login</Button>
                            <Button className='bg-[#350b39] text-white font-serif font-bold text-lg hover:bg-[#B7C9F2] hover:text-black hover: font-semibold' onClick={() => navigate('/signup')}>Sign Up</Button>
                        </div>
                </div>
                </Container>
            </div>
        )
    }
    else if(authStatus && posts.length==0)
    {
        return(
            <div className="flex flex-col items-center">
            {/* <h1 className="text-4xl mb-4 text-center text-[#e9eafd] font-serif font-bold">No post available</h1>
            <div className="flex justify-center"> 
                <Button className="bg-[#350b39] text-white font-serif font-bold text-lg mb-2 hover:bg-[#B7C9F2] hover:text-black hover:font-semibold" onClick={() => navigate('/add-post')}>Add New Post</Button>
            </div> */}
            <Spinner />
        </div>
        
        )
        
    }
    else{
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/3 '>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
                    }
}

export default Home