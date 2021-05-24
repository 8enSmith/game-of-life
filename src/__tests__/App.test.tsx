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
      expect(getByText('Start')).toBeInTheDocument();
    });

    it('reset should work as expected', async () => {
      const { getByText } = render(<App />);

      // Set timeout to 3 seconds as the default value is 1 second.
      await waitFor(() => getByText('Iteration 1'), {
        timeout: 3000,
      });

      fireEvent.click(getByText('Reset'));

      expect(getByText('Iteration 0')).toBeInTheDocument();
    });
  });

  describe('the time interval input', () => {
    it('should work as expected', () => {
      const { getByLabelText } = render(<App />);
      const input = getByLabelText('timeout-interval');
      fireEvent.input(input, { target: { value: '500' } });
      expect((input as HTMLInputElement).value).toBe('500');
    });

    it('should display zero when all numbers deleted', () => {
      const { getByLabelText } = render(<App />);
      const input = getByLabelText('timeout-interval', {});
      fireEvent.input(input, { target: { value: '' } });
      expect((input as HTMLInputElement).value).toBe('0');
    });
  });

  describe('Clicking on a cell in the grid', () => {
    it('should work as expected', async () => {
      const { findByLabelText } = render(<App />);
      const cellToTest = await findByLabelText('0_0_dead');
      fireEvent.click(cellToTest);
      expect(await findByLabelText('0_0_alive')).toBeInTheDocument();
    });
  });
});
