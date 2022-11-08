import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter as Router } from 'react-router-dom';
import AdminForm from '../pages/AdminForm'

//Note: it is not necessary to test for 'required' fields on this page because both form pages inherit
//from ../base/FormBase.js which is already tested by Form.test.js

afterEach(()=>{
    cleanup();
})

test('should render Save Changes button', () => {
    window.alert = jest.fn();
    render(<Router>
            <AdminForm/>
        </Router>);
    const saveButton = screen.getByTestId('saveChanges');
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toHaveTextContent('Save Changes');
    expect(saveButton).toHaveClass('btn btn-default');
    window.alert.mockClear();
});

test('should render Delete button', () => {
    window.alert = jest.fn();
    render(<Router>
            <AdminForm/>
        </Router>);
    const deleteButton = screen.getByTestId('delete');
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveTextContent('Delete');
    expect(deleteButton).toHaveClass('btn btn-danger');
    window.alert.mockClear();
});