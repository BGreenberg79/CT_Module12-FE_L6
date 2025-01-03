import { TextEncoder, TextDecoder } from 'text-encoding';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import React from 'react';
import '@testing-library/jest-dom';
import EditPost from '../components/EditPost';
import PostList from '../components/PostList'
import axios from 'axios';
import { render, waitFor, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom'; 


jest.mock('axios');

describe('EditPost component', ()=>{
    test('retrieves user inputs from PostList button click and then allows user to update form and edit to JSON Placeholder API', async ()=>{
        const mockPost = { id: 1, title: 'Test Title', body: 'Test Body', userId:1}
        
        axios.get.mockResolvedValue({ data: [mockPost] });
        axios.put.mockResolvedValue({ data: mockPost });

        render(
            <MemoryRouter initialEntries={['/list']}>
            <Routes>
                <Route path="/list" element={<PostList />} />
            </Routes>
        </MemoryRouter>
        )

        await act(async () => {
            fireEvent.click(screen.getByRole('button', {name: /Edit/i }));
        })
        
        await waitFor(()=> {
            screen.getByLabelText(/Title:/i);
        })

        expect(screen.getByLabelText(/Title:/i).value).toBe(mockPost.title);
        expect(screen.getByLabelText(/Body:/i).value).toBe(mockPost.body);
        expect(screen.getByLabelText(/User Id:/i).value).toBe(String(mockPost.userId));

        // Tests updated inputs
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/Title:/i), { target: { value: "Update Title" } });
            fireEvent.change(screen.getByLabelText(/Body:/i), { target: { value: "Update Body" } });
            fireEvent.change(screen.getByLabelText(/User Id:/i), { target: { value: "2" } });
        })

        // Simulates Submit button
        await act(async () => {
            fireEvent.click(screen.getByRole('button', {name: /Edit Post/i }));
        })

        await waitFor(()=>{
            expect(axios.put).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/posts/${post.id}`,
            { title: 'Update Title', body: 'Update Body', userId: 2 },
            {headers: {'Content-type': 'application/json; charset=UTF-8',}}                
            )
        });
    });

    test('matches the snapshot', () => {
        const { asFragment } = render(
            <MemoryRouter initialEntries={['/edit-post/1']}>
                <Routes>
                    <Route path='edit-post/:id' element={<EditPost/>}/>
                </Routes>
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});