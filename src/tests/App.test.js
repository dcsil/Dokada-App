import { render, screen } from '@testing-library/react'
import App from '../App'
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../Dashboard'
import HomePage from '../HomePage';


describe.only("HomePage", () => {

    test('Homepage render', async() => {
        const tokenValue = 3;
        const expectedToken = 5;
        const setTokenF = (token) => {
            console.log("token values:",token, expectedToken)
            expect(token).toBe(4);
        }

        global.fetch = jest.fn(() => Promise.resolve({
            data: () => Promise.resolve({expectedToken})
        }));

        render(<HomePage token={tokenValue} setToken={setTokenF}/>);

        render(<HomePage token={tokenValue} setToken={setTokenF}/>);
    })
 
})

describe("Dashboard", () => {
    test('Basic App rendering', async() => {
        render(<Dashboard/>)
        const linkElement = screen.getByText(/Dashboard/i);
        expect(linkElement).toBeInTheDocument();
    })
})
