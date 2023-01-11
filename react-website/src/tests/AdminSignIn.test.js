import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter as Router } from 'react-router-dom';
import AdminSignIn from '../pages/AdminSignIn'

afterEach(() => {
    cleanup();
})

test('should render admin username input field with required label', () => {
    render(<Router>
        <AdminSignIn/>
    </Router>);
    const parentElement = screen.getByTestId('adminUsername');
    const label = screen.getByTestId('adminUsernameLabel');

    expect(parentElement).toBeInTheDocument();
    expect(parentElement).toContainElement(label);

    expect(label).toHaveClass('required');
});

test('should render admin password input field with required label', () => {
    render(<Router>
        <AdminSignIn/>
    </Router>);
    const parentElement = screen.getByTestId('adminPass');
    const label = screen.getByTestId('adminPassLabel');

    expect(parentElement).toBeInTheDocument();
    expect(parentElement).toContainElement(label);

    expect(label).toHaveClass('required');
});

test('should render Sign-in button', () => {
    render(<Router>
        <AdminSignIn/>
    </Router>);
    const signInButton = screen.getByTestId('SignInBtn');
    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveTextContent('Sign In');
    expect(signInButton).toHaveClass('btn btn-default');
});