import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter as Router } from 'react-router-dom';
import SubmitForm from "../pages/Homepage";

//test block
test('Button test', () => {
    
    render(
        <Router>
            <SubmitForm/>
        </Router>
    );

    const submitButton = screen.getByTestId('submitButton');
    expect(submitButton).toBeInTheDocument();

});