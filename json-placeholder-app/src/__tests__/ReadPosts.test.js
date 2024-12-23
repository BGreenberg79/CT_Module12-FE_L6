import React from 'react';
import '@testing-library/jest-dom';
import PostList from '../components/PostList';
import axios from 'axios';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios')

describe('PostList Read component', ()=>{
    test('fetches posts from JSON Placeholder API upon loading', async ()=> {
        const mockResponse = {data: [{userId:1, id:1, title:'test title', body:'test body'}]};
        axios.get.mockResolvedValue(mockResponse);

        render(<PostList/>);

        await waitFor(()=> {
            expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts')
        });

            expect(screen.getByText(/test title/i)).toBeInTheDocument();
            expect(screen.getByText(/test body/i)).toBeInTheDocument();
        });


    test('matches the snapshot', () => {
        const { asFragment } = render(<PostList />);
        expect(asFragment()).toMatchSnapshot();
    
    });
});