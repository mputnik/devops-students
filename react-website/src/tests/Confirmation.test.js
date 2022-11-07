import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter as Router } from 'react-router-dom';
import Confirmation from '../pages/Confirmation'

afterEach(()=>{
    cleanup();
})

test('should render return to homepage link', () =>{
    render(<Router>
            <Confirmation/>
        </Router>);
    const returnButton = screen.getByTestId('return');
    expect(returnButton).toBeInTheDocument();
    expect(returnButton).toHaveTextContent('Return to Homepage');
    expect(returnButton).toContainHTML('</Link>');
});
