import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter as Router } from 'react-router-dom';
import Confirmation from '../pages/Confirmation'

afterEach(() => {
    cleanup();
})

test('should render Return to Homepage button', () => {
    render(<Router>
            <Confirmation/>
        </Router>);
    const returnButton = screen.getByTestId('return');
    expect(returnButton).toBeInTheDocument();
    expect(returnButton).toHaveTextContent('Return to Homepage');
    expect(returnButton).toHaveClass('btn btn-primary');
});

test('should render View Submissions button', () => {
    render(<Router>
            <Confirmation/>
        </Router>);
    const viewButton = screen.getByTestId('view');
    expect(viewButton).toBeInTheDocument();
    expect(viewButton).toHaveTextContent('View Submissions');
    expect(viewButton).toHaveClass('btn btn-primary');
});