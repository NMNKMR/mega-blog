import React, {useEffect, useState} from 'react'
import { getUserPosts } from '../store/postsServices';
import {Container, Loader, PostCard} from '../components/c.index';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state)=> state.auth.userData);
    const allPosts = useSelector((state)=> state.blog.posts);

    useEffect(() => {
        const userPosts = getUserPosts(allPosts, userData.$id);
        if(userPosts) setPosts(userPosts);
        setLoading(false);
    }, [])
  
    if (posts.length === 0 && !loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No Posts Added.
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        !loading ? <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div> : <div className='w-full pt-[10%] flex justify-center'><Loader/></div>
    )
}

export default Home