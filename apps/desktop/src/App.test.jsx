import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

import { fireEvent } from '@testing-library/react';

describe('App Component', () => {
  test('renders desktop app heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/React Desktop App/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('toggles button text on click', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent('Click Me');
    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveTextContent('Clicked!');
  });

  test('displays error message when input is invalid', () => {
    render(<App />);
    const inputElement = screen.getByLabelText('Username');
    fireEvent.change(inputElement, { target: { value: ' ' } });
    const errorElement = screen.getByText(/Username cannot be empty/i);
    expect(errorElement).toBeInTheDocument();
  });
});