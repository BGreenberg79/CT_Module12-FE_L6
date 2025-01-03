import React, { useEffect, useState } from 'react'
import { Form, Button, Container  } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const EditPost = () => {
    const {id} = useParams()
    const [post,setPost] = useState({
        title: '',
        body: '',
        userId: 1
    })

    const fetchSinglePost = async () => {
        try{
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?id=${id}`)
            if (response && response.data){
                return response.data
            }
            console.warn('No data found for post')
        } catch(err){
            console.error(err)
            return null;
        }
    }

    const updatePost = async () => {
        const data = await fetchSinglePost();
        if (data.length() < 0){
            return
        }

        data = data[0]

        if (data) {
            setPost({
                id: data.id,
                title: data.title,
                body: data.body,
                userId: data.userId
            });
        } else {
            console.warn('No data found for post');
        }
    };
    useEffect(() => {
        updatePost()
    }, [id])

    const editPostAPI = async (updatedPost) => {
        try {
            const response = await axios.put(
                `https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`,
                {
                    title: updatedPost.title,
                    body: updatedPost.body,
                    userId: updatedPost.userId
                },
                {
                    headers: { 'Content-type': 'application/json; charset=UTF-8' },
                }
            );
            // console.log('Post Updated', response.data),
            alert('Post Updated Successfully')        
        } catch (err) {
            console.error('Error updating post: ', err);
            alert('Failed to update post')

        }
    }

    // const handleSubmit = async () => {
    //     try {
    //         const response = await axios.put(
    //             `https://jsonplaceholder.typicode.com/posts/${id}`,
    //             {
    //                 title,
    //                 body,
    //                 userId,
    //             },
    //             { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
    //         );
    //         console.log('Post Updated', response.data);
    //         alert('Post Updated Successfully');
    //     } catch (err) {
    //         console.error('Error updating post:', err);
    //         alert('Failed to update post');
    //     }
    // };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        editPostAPI(post)
    }

    return (
        <Container>
            <h1>Edit Post</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        onChange={(event) =>
                            setPost({ ...post, title: event.target.value })
                        }
                        value={post.title}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="body">
                    <Form.Label>Body:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter body"
                        onChange={(event) =>
                            setPost({ ...post, body: event.target.value })
                        }
                        value={post.body}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="userId">
                    <Form.Label>User Id:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter User Id"
                        onChange={(event) =>
                            setPost({ ...post, userId: Number(event.target.value) })
                        }
                        value={post.userId}
                    />
                </Form.Group>


                <Button variant="success" type="submit">
                    Edit Post
                </Button>
            </Form>
        </Container>
    )
}

export default EditPost