/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

import { fireEvent } from '@testing-library/react';

describe('App Component', () => {
  test('renders desktop app heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/React Desktop App/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('calls alert on button click', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(window.alert).toHaveBeenCalledWith('Button Clicked!');
  });
});