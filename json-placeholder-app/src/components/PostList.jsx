import React, { useState, useEffect } from 'react'
import { Container, ListGroup, Button } from 'react-bootstrap'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

const PostList = ()=> {

    const [posts, setPosts] = useState([])
    const navigate = useNavigate();


    const fetchPosts = async ()=> {try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        console.log(response)
        setPosts(response.data);
        // setPosts(response);
        return response.data}
        catch(err){ console.error(err)}}

    const deletePostAPI = async (id) => {
        try{
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        console.log(response);
        fetchPosts();
        } catch(err){ console.error(err)}
    }
    const handleDeletePost = (id) =>{
        deletePostAPI(id);
    }

    const handleEditButton = (id) =>{
        navigate(`/edit-post/${id}`)
    }
    useEffect(() =>{
        fetchPosts();
    }, []);

  return (
    <Container>
    <h2>JSON Placeholder Post List</h2>
    <ListGroup>
        {posts.map((post, index) => (
            <ListGroup.Item variant='info' key={index}>
                Post ID: {post.id}<br />
                User ID: {post.userId}<br />
                Title: {post.title}<br />
                Body: {post.body}
                <Button variant='warning' className='shadow-sm m-1 p-1' onClick={() => handleEditButton(post)}>
                    Edit
                </Button>
                <Button variant='danger' className='shadow-sm m-1 p-1' onClick={() => handleDeletePost(post.id)}>
                    Delete
                </Button>
            </ListGroup.Item>
        ))}
    </ListGroup>
</Container>
  )
}

export default PostList;