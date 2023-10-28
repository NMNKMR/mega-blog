import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbService from "../appwrite/database";
import { getPost } from "../store/postsServices";
import { deletePost } from "../store/postsSlice";
import { Button, Container } from "../components/c.index";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const allPosts = useSelector((state)=> state.blog.posts);
    const dispatch = useDispatch();

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    useEffect(() => {
        if (slug) {
            const post = getPost(allPosts, slug);
                if (post) setPost(post);
                else navigate("/");
        } else navigate("/");
    }, [slug, navigate]);

    const handleDeletePost = () => {
        dbService.deletePost(post.$id).then((status) => {
            if (status) {
                dbService.deleteFile(post.featuredImage);
                dispatch(deletePost({id: post.$id}));
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border border-black/30 rounded-xl p-2">
                    <img
                        src={dbService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-700" className="mr-3 mb-1 w-20 hover:bg-opacity-50">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-700" className="w-20 hover:bg-opacity-50" onClick={handleDeletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}