import React from 'react';
import axios from 'axios';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import PostList from '../components/PostList';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react';
import '@testing-library/jest-dom';

jest.mock('axios');


test('Delete button is clicked and sends a delete request', async () => {


    // Mock the axios.get response to return posts
    axios.get.mockResolvedValueOnce({
        data: [{ id: 1, title: 'Sample Title', body: 'Sample Body', userId: 1 }],
    });

    axios.delete.mockResolvedValueOnce({
        status: 200,
    })

    await act(async () =>{
        render(
            <MemoryRouter>
                <PostList />
            </MemoryRouter>
        )
    });

    // Ensure the post is rendered first
    await waitFor(() => {
    expect(screen.getByText(/Sample Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Body/i)).toBeInTheDocument();
    });

    // Find delete button and click
    const button = await screen.findByRole('button',{ name: /Delete/i } )
    expect(button).toBeInTheDocument();
    fireEvent.click(button);


    // Assert axios.delete was called correctly
    await waitFor(() =>
        expect(axios.delete).toHaveBeenCalledWith(
            'https://jsonplaceholder.typicode.com/posts/1'
        )
    );
});


test('matches the snapshot', async () => {

    axios.get.mockResolvedValueOnce({
        data: [{ id: 1, title: 'Sample Title', body: 'Sample Body', userId: 1 }],
    });

    const { asFragment } = render(
                                <MemoryRouter>
                                    <PostList />
                                </MemoryRouter>
                            );
    
    await waitFor(() => {
        expect(screen.getByText(/Sample Title/i)).toBeInTheDocument();
        expect(screen.getByText(/Sample Body/i)).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
});