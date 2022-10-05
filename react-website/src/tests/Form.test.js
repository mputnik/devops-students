import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter as Router } from 'react-router-dom';
import Form from '../pages/Form'

afterEach(()=>{
    cleanup();
})

test('should render first name input', () =>{
    render(<Router>
        <Form/>
    </Router>);
    const returnButton = screen.getByTestId('FnameInput');
    expect(returnButton).toBeInTheDocument();
    expect(returnButton).toContainHTML('</input>');
});

test('should render last name input', () =>{
    render(<Router>
        <Form/>
    </Router>);
    const returnButton = screen.getByTestId('LnameInput');
    expect(returnButton).toBeInTheDocument();
    expect(returnButton).toContainHTML('</input>');
});


test('should render colour input', () =>{
    render(<Router>
        <Form/>
    </Router>);
    const returnButton = screen.getByTestId('ColourInput');
    expect(returnButton).toBeInTheDocument();
    expect(returnButton).toContainHTML('</input>');
});

test('should render pet select', () =>{
    render(<Router>
        <Form/>
    </Router>);
    const returnButton = screen.getByTestId('PetSelect');
    expect(returnButton).toBeInTheDocument();
    expect(returnButton).toContainHTML('</select>');
});

test('should render submit button', () =>{
    render(<Router>
        <Form/>
    </Router>);
    const returnButton = screen.getByTestId('SubmitBtn');
    expect(returnButton).toBeInTheDocument();
    expect(returnButton).toContainHTML('</button>');
});



