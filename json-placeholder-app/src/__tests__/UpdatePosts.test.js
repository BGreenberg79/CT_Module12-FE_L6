// import React from 'react';
// import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
// import { MemoryRouter, Routes, Route } from 'react-router-dom';
// import EditPost from '../components/EditPost';
// import axios from 'axios';

// jest.mock('axios');

// // Mocking window.alert
// window.alert = jest.fn();

// test('EditPost updates the form and sends a PUT request', async () => {
//     const mockPost = { id: 2, title: 'Updated Title', body: 'Updated Body' };
//     axios.put.mockResolvedValueOnce({ data: mockPost });

//     // render(
//     //     <MemoryRouter initialEntries={['/edit/1']}>
//     //         <Routes>
//     //             <Route path="/edit/:id" element={<EditPost />} />
//     //         </Routes>
//     //     </MemoryRouter>
//     // );

//     render(
//         <MemoryRouter>
//             <EditPost id={1} />
//         </MemoryRouter>
//     );

//     fireEvent.change(screen.getByLabelText(/Title:/i), {
//         target: { value: 'Updated Title' },
//     });
//     fireEvent.change(screen.getByLabelText(/Body:/i), {
//         target: { value: 'Updated Body' },
//     });

//     const button = await screen.findByRole('button', { name: /Edit Post/i });
//     fireEvent.click(button);

//     // fireEvent.click(screen.getByRole('button', { name: /Edit/i }));

//     await waitFor(() =>
//         expect(axios.put).toHaveBeenCalledWith(
//             'https://jsonplaceholder.typicode.com/posts/1',
//             { title: 'Updated Title', body: 'Updated Body' },
//             { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
//         )
//     );
// });
import React from 'react';
import axios from 'axios';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import EditPost from '../components/EditPost';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react';
import '@testing-library/jest-dom';

jest.mock('axios');


test('EditPost updates the form and sends a PUT request', async () => {

    window.alert = jest.fn();

    // Mock the axios.get response
    axios.get.mockResolvedValueOnce({
        data: { id: 1, title: 'Sample Title', body: 'Sample Body', userId: 1 },
    });

    // Mock the axios.put response
    axios.put.mockResolvedValueOnce({
        data: { id: 1, title: 'Updated Title', body: 'Updated Body', userId: 1 },
    });

    await act(async () => {
        render(
            <MemoryRouter>
                <EditPost id={1} />
            </MemoryRouter>
        )
    });

    // Ensure the title and body inputs are pre-filled
    expect(screen.getByLabelText(/Title:/i).value).toBe('Sample Title');
    expect(screen.getByLabelText(/Body:/i).value).toBe('Sample Body');

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Title:/i), { target: { value: 'Updated Title' } });
    fireEvent.change(screen.getByLabelText(/Body:/i), { target: { value: 'Updated Body' } });

    // Simulate form submission
    const button = await screen.findByRole('button', { name: /Update/i })
    fireEvent.click(button);


    // Assert axios.put was called with the correct arguments
    await waitFor(() =>
        expect(axios.put).toHaveBeenCalledWith(
            'https://jsonplaceholder.typicode.com/posts/1',
            { title: 'Updated Title', body: 'Updated Body', userId: 1 },
            { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
        )
    );
});


test('matches the snapshot', async () => {
    axios.get.mockResolvedValueOnce({
        data: { id: 1, title: 'Sample Title', body: 'Sample Body', userId: 1 },
    });

    const { asFragment } = render(
        <MemoryRouter>
            <EditPost id={1} />
        </MemoryRouter>
    );
    await waitFor(() => {
        expect(screen.getByLabelText(/Title:/i).value).toBe('Sample Title');
        expect(screen.getByLabelText(/Body:/i).value).toBe('Sample Body');
    });

    expect(asFragment()).toMatchSnapshot();
});