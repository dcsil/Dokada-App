import React from 'react';
import ReactDOM from 'react-dom/client';
import { render, screen, fireEvent, queryByAttribute, waitFor, getByTestId} from '@testing-library/react'
import jacket from '../images/denim_jacket.png'
import Dashboard from '../Dashboard';
import HomePage from '../HomePage';
import ProductHeatmap from '../ProductHeatmap';
import AggregateHeatmap from '../AggregateHeatmap';
import CanvasPage from '../CanvasPage';
import Canvas from '../Canvas';
import Menu from '../components/Menubar';
import ProductCarousel from '../components/Carousel';
import { act } from 'react-dom/test-utils';

const getById = queryByAttribute.bind(null, 'id');

describe.only("Product Carousel", () => {

    test('Product Carousel Render', async() => {
        render(<ProductCarousel updateFunction={(a, b)=>{return 0;}}/>);
    })
})

describe.only("Menubar", () => {

    test('Menubar Render', async() => {
        render(<Menu removeToken= {()=>{return 0;}}/>);
        
        expect(screen.getByText(/login/i)).toBeInTheDocument()
    })
})

describe("Canvas", () => {

    test('Canvas Render', async() => {
        render(<Canvas imageInfo={{imageUrl: jacket, imageId:2}}/>);
        
        expect(screen.getByText(/red/i)).toBeInTheDocument()
    })
})

describe("Canvas Page", () => {

    test('Canvas Page Render', async() => {
        render(<CanvasPage/>);

        expect(screen.getByText(/canvas/i)).toBeInTheDocument()
    })
})

describe("Aggregate Page", () => {

    test('Aggregate Page Render', async() => {

        let dom;

        act(() => {
            global.fetch = jest.fn(() => Promise.resolve({
                json: () => {
                    return {
                        content: {
                            product_id: 2,
                            imageDimensions: {
                                width: 2,
                                height: 2
                            },
                            downscale_factor: 1,
                            reviews_count: 1,
                            images: {
                                quality: {
                                    positive: {
                                        map: [1,0,0,1],
                                        max: 1
                                    }
                                }
                            }
                        }
                    }
                }
            }));

            render(<AggregateHeatmap imageUrl={jacket}/>)
            
        })

        let search = screen.getAllByRole('progressbar', '')
        console.log(search)

        await waitFor(()=>{
            expect(screen.getAllByRole('progressbar', '').length).toBe(1);
        })
    })

})

describe("Single View", () => {

    let dom;
    jest.setTimeout(20000)

    test('Single Page render', async() => {

        act(() => {
            global.fetch = jest.fn(() => Promise.resolve({
                json: () => {
                    return {
                        content : {
                            reviews: [
                                {
                                    layers: [
                                        {
                                            'imageData': {
                                                'image': [1,0,0,1],
                                                'bbox': {
                                                    'xMin': 0, 'yMin': 0, 'xMax': 1, 'yMax': 1,
                                                }
                                            },
                                            'weights': {
                                                'quality': 1,
                                                'style': 1,
                                                'fit': 1
                                            }
                                        }
                                    ],
                                    product_id:2,
                                }
                            ],
                            dimensions: {
                                width:2,
                                height:2,
                                downscale_factor:1
                            }
                        }
                    }
                }
            }));

            dom = render(<ProductHeatmap imageUrl={jacket}/>);
            
        })

        await waitFor(() => {
            // MuiCircularProgress-root MuiCircularProgress-indeterminate MuiCircularProgress-colorPrimary css-18lrjg1-MuiCircularProgress-root
            expect(dom.container).not.toHaveClass('MuiCircularProgress-root MuiCircularProgress-indeterminate MuiCircularProgress-colorPrimary css-18lrjg1-MuiCircularProgress-root');
          });

        console.log("Render fetch complete")
        
        let sliderText;
        sliderText = screen.getByText(/Quality/i);
        expect(sliderText).toBeInTheDocument();
        sliderText = screen.getByText(/Style/i);
        expect(sliderText).toBeInTheDocument();
        sliderText = screen.getByText(/Fit/i);
        expect(sliderText).toBeInTheDocument();
    })

    jest.setTimeout(5000)
})

describe("HomePage", () => {

    const expectedToken = 5;
    const setTokenF = (token) => {
        console.log("token values:",token, expectedToken)
        expect(token).toBe(expectedToken);
    }

    test('Homepage render', async() => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => {return {access_token: expectedToken}}
        }));

        render(<HomePage token={expectedToken} setToken={setTokenF}/>);

        const canvasButton = screen.getByText(/Canvas/i);
        const dashboardButton = screen.getByText(/Dashboard/i);
        expect(canvasButton).toBeInTheDocument();
        expect(dashboardButton).toBeInTheDocument();
    })
 
})

describe("Dashboard", () => {

    // Simple render of dashboard
    test('Dashboard rendering', async() => {
        
        render(<Dashboard/>)
        const linkElement = screen.getByText(/Select a view/i);
        expect(linkElement).toBeInTheDocument();
    })
})
