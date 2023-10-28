import React, {useEffect, useState} from 'react'
import {getActivePosts} from '../store/postsServices';
import {Container, Loader, PostCard} from '../components/c.index'
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);

    const authStatus = useSelector((state)=> state.auth.userStatus);
    const allPosts = useSelector((state)=> state.blog.posts);

    useEffect(() => {
        const activePosts = getActivePosts(allPosts);
        if(activePosts) setPosts(activePosts);
        setLoading(false);
    }, [])
  
    if (!authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read Posts.
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        !loading ? 
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                   {posts.length>0 ?  posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    )) : 
                    <div className="p-2 w-full">
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        No Posts to read.
                    </h1>
                </div>}
                </div>
            </Container>
        </div> : <div className='w-full pt-[10%] flex justify-center'><Loader/></div>
    )
}

export default Home