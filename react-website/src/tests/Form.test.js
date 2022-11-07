import { render, screen, cleanup, getByTestId } from "@testing-library/react";
import { MemoryRouter as Router } from 'react-router-dom';
import UserForm from '../pages/UserForm'

afterEach(() => {
    cleanup();
})

test('should render first name input field with required label', () => {
    render(<Router>
        <UserForm/>
    </Router>);
    const parentElement = screen.getByTestId('FnameInput');
    const label = screen.getByTestId('FnameLabel');

    expect(parentElement).toBeInTheDocument();
    expect(parentElement).toContainElement(label);

    expect(label).toHaveClass('required');
});

test('should render last name input field with required label', () => {
    render(<Router>
        <UserForm/>
    </Router>);
    const parentElement = screen.getByTestId('LnameInput');
    const label = screen.getByTestId('LnameLabel');

    expect(parentElement).toBeInTheDocument();
    expect(parentElement).toContainElement(label);

    expect(label).toHaveClass('required');
});

test('should render colour input field with required label', () =>{
    render(<Router>
        <UserForm/>
    </Router>);
    const parentElement = screen.getByTestId('ColourInput');
    const label = screen.getByTestId('ColourLabel');

    expect(parentElement).toBeInTheDocument();
    expect(parentElement).toContainElement(label);

    expect(label).toHaveClass('required');
});

test('should render pet drop-down menu with required label', () =>{
    render(<Router>
        <UserForm/>
    </Router>);
    const parentElement = screen.getByTestId('PetSelect');
    const label = screen.getByTestId('PetLabel');

    expect(parentElement).toBeInTheDocument();
    expect(parentElement).toContainElement(label);

    expect(label).toHaveClass('required');
});

test('should render message box', () =>{
    render(<Router>
        <UserForm/>
    </Router>);
    const msgBox = screen.getByTestId('msgBox');
    expect(msgBox).toBeInTheDocument();
});

test('should render submit button', () =>{
    render(<Router>
        <UserForm/>
    </Router>);
    const submitButton = screen.getByTestId('SubmitBtn');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent('Submit');
    expect(submitButton).toHaveClass('btn btn-default');
});