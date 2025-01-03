import { TextEncoder, TextDecoder } from 'text-encoding';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;


import React from 'react';
import '@testing-library/jest-dom';
import PostForm from '../components/PostForm';
import axios from 'axios';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';


jest.mock('axios');

describe('PostForm component', () => {
    test('takes user inputs and then submits to JSON Placeholder API', async () => {
        const mockPost = { title: 'Test Title', body: 'Test Body', userId: 1 }
        axios.post.mockResolvedValue(mockPost);

        render(<PostForm />);

        // Tests user inputs
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/Title:/i), { target: { value: "Test Title" } });
            fireEvent.change(screen.getByLabelText(/Body:/i), { target: { value: "Test Body" } });
            fireEvent.change(screen.getByLabelText(/User Id:/i), { target: { value: "1" } });
        })

        // Simulates Submit button
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /Add Post/i }));
        })

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts',
                { title: 'Test Title', body: 'Test Body', userId: 1 },
                { headers: { 'Content-type': 'application/json; charset=UTF-8', } }
            )
        });
    });

    test('matches the snapshot', () => {
        const { asFragment } = render(<PostForm />);
        expect(asFragment()).toMatchSnapshot();
    });
});