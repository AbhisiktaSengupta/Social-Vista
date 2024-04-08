import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { formatDateString } from "../components/features/createdAt";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci"
import { MdDelete } from "react-icons/md";
import LikeBtn from "../components/LikeBtn";
import { CiSaveDown1 } from "react-icons/ci";


export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    console.log(userData)
    console.log(post)
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
                toast.success("Post deleted successfully")
            }
        });
    };

    return post ? (
      
        <div className="py-8 font-montserrat">

            <Container>
                <div className='flex flex-row justify-between'>
                <div className="w-full my-3 pl-10 flex flex-wrap flex-col gap-3 ">
                    <h1 className="text-3xl text-[#350b39] font-extrabold font-serif ">{post.title}</h1>
                    <p className="text-sm font-bold text-[#dedffc]">Posted on {formatDateString(post.$createdAt)} by {post.userName}</p>
                </div>
                <div className="mr-20">
                    <LikeBtn {...post}/>
                </div>
                </div>
                
                
                <div className="flex flex-col justify-center my-10 items-center ">
                    <div className="w-9/12 h-70vh flex flex-row justify-center bg-[#dedffc] mb-4 relative rounded-xl p-2">
                        <div>
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl object-cover object-center mr-4"
                        />
                        </div>
                        
                        {isAuthor && (
                            <div className="right-6 top-6 flex-col">
                            <Link to={`/edit-post/${post.$id}`}>
                                <div className="my-2 flex flex-row">
                                    <CiEdit className="w-8 h-8 mt-3 mr-2"/>
                                    <Button  className="bg-[#350b39] text-white w-25 font-serif my-2 font-bold text-lg mb-2 hover:bg-[#B7C9F2] hover:text-black hover:font-semibold">
                                        Edit
                                    </Button>
                                </div>
                            </Link>
                            <div className="flex flex-row">
                                
                                <Button className="bg-[#350b39] text-white w-full font-serif font-bold text-lg flex flex-row mb-2 hover:bg-[#B7C9F2] hover:text-black hover:font-semibold" onClick={deletePost}>
                                <MdDelete className="w-6 h-6 mr-1"/>Delete
                                </Button>
                            </div>
                        </div>
                        
                        )}
                    </div>
                    <div className="browser-css text-xl pl-10 font-serif text-[#350b39] py-5">
                        {parse(post.content)}
                    </div> 
                </div>
                
                   

            </Container>
        </div>
    ) : null;
}
