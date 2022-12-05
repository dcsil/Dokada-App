import { render, screen } from '@testing-library/react'
import App from '../App'
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../Dashboard'

test('Basic App rendering', async() => {
    render(<Dashboard/>)
    const linkElement = screen.getByText(/Dashboard/i);
    expect(linkElement).toBeInTheDocument();
})
