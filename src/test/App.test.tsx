import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('When App renders', () => {
  describe('Should correctly render', () => {
    beforeEach(() => render(<App />));
    it('table', async () => {
      expect(await screen.findAllByTestId('table')).toBeTruthy();
    });

    it('correct iteration value', async () => {
      expect(await screen.findByText('Iteration 1')).toBeTruthy();
    });
  });

  describe('The button', () => {
    it('stop should work as expected', async () => {
      const { getByText } = render(<App />);
      fireEvent.click(getByText('Pause'));
    });

    it('reset should work as expected', async () => {
      const { getByText } = render(<App />);

      // Set timeout to 3 seconds as the default value is 1 second.
      await waitFor(() => getByText('Iteration 2'), {
        timeout: 3000,
      });

      fireEvent.click(getByText('Reset'));

      expect(getByText('Iteration 1')).toBeInTheDocument();
    });
  });
});
