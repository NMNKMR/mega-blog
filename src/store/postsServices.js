
const getActivePosts = (posts)=> {
    return posts.filter((post)=> post.status === 'active');
}

const getUserPosts = (posts, userId)=> {
    return posts.filter((post)=> post.userId === userId);
}

const getPost = (posts, postId)=> {
    return posts.find((post)=> post.$id === postId);
}

export {getActivePosts, getUserPosts, getPost};