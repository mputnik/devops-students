import { render, cleanup, screen } from "@testing-library/react";
import { MemoryRouter as Router } from 'react-router-dom';
import SubmitForm from "../pages/Homepage";

afterEach(() => {
    cleanup();
})

test('should render submit button', () => {
    
    render(
        <Router>
            <SubmitForm/>
        </Router>
    );
    const submitButton = screen.getByTestId('submitButton');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent('Submit Online');
    expect(submitButton).toHaveClass('btn btn-primary');
});