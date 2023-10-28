import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components/c.index';
import {getPost} from '../store/postsServices';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const allPosts = useSelector((state)=> state.blog.posts);
    const {slug} = useParams();

    useEffect(()=> {
        if(slug) {
            const post = getPost(allPosts, slug);
            if(post) setPost(post);
        }
        else navigate('/');
    }, [slug])

  return (
      post ? (
          <div className='py-8'>
              <Container>
                  <PostForm post={post} />
              </Container>
          </div>
      ) : null
  )
}

export default EditPost