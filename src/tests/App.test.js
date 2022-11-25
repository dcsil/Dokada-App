import { render, screen } from '@testing-library/react'
import App from '../App'
import { BrowserRouter } from 'react-router-dom';

test('Basic App rendering', async() => {
    render(<BrowserRouter><App/></BrowserRouter>)
    const linkElement = screen.getByText(/Dokada/i);
    expect(linkElement).toBeInTheDocument();
})
