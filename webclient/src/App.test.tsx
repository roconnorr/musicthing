import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn header', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/welcome/i);
  expect(headerElement).toBeInTheDocument();
});
