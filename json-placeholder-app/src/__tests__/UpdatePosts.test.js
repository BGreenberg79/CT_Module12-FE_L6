import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EditPost from '../components/EditPost';
import axios from 'axios';

jest.mock('axios');

// Mocking window.alert
window.alert = jest.fn();

test('EditPost updates the form and sends a PUT request', async () => {
    const mockPost = { id: 1, title: 'Updated Title', body: 'Updated Body' };
    axios.put.mockResolvedValueOnce({ data: mockPost });

    // render(
    //     <MemoryRouter initialEntries={['/edit/1']}>
    //         <Routes>
    //             <Route path="/edit/:id" element={<EditPost />} />
    //         </Routes>
    //     </MemoryRouter>
    // );

    render(
        <MemoryRouter>
            <EditPost id={1} />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Title:/i), {
        target: { value: 'Updated Title' },
    });
    fireEvent.change(screen.getByLabelText(/Body:/i), {
        target: { value: 'Updated Body' },
    });

    const button = await screen.findByRole('button', { name: /Edit Post/i });
    fireEvent.click(button);

    // fireEvent.click(screen.getByRole('button', { name: /Edit/i }));

    await waitFor(() =>
        expect(axios.put).toHaveBeenCalledWith(
            'https://jsonplaceholder.typicode.com/posts/1',
            { title: 'Updated Title', body: 'Updated Body' },
            { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
        )
    );
});
