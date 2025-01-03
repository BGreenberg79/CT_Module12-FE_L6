import { TextEncoder, TextDecoder } from 'text-encoding';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;


import React from 'react';
import '@testing-library/jest-dom';
import PostList from '../components/PostList';
import axios from 'axios';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios')

describe('PostList Read component', ()=>{
    test('fetches posts from JSON Placeholder API upon loading', async ()=> {
        
        jest.mock('axios');
        // const mockResponse = {data: [{userId:1, id:1, title:'test title', body:'test body'}]};
        // axios.get.mockResolvedValue(mockResponse);

        axios.get.mockResolvedValue({
            data: [{ userId: 1, id: 1, title: 'test title', body: 'test body' }]
        });

        render(
            <MemoryRouter>
                <PostList/>
            </MemoryRouter>
        );

        await waitFor(()=> {
            expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts')
        });

            expect(screen.getByText(/test title/i)).toBeInTheDocument();
            expect(screen.getByText(/test body/i)).toBeInTheDocument();
        });


    test('matches the snapshot', () => {
        const { asFragment } = render(
        <MemoryRouter>
            <PostList />
        </MemoryRouter>);
        expect(asFragment()).toMatchSnapshot();
    
    });
});

// test('renders PostList', () => {
//     render(
//         <MemoryRouter>
//             <PostList />
//         </MemoryRouter>
//     );
// });