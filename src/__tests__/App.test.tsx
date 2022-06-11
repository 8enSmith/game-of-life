import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';

describe('When App renders', () => {
  describe('Should correctly render', () => {
    it('table', async () => {
      render(<App />)

      expect(await screen.findByTestId('table')).toBeVisible();
    });

    it('correct iteration value', async () => {
      render(<App />)
      
      expect(await screen.findByText('Iteration 0')).toBeTruthy();
    });
  });

  describe('The button', () => {
    it('stop should work as expected', async () => {
      render(<App />)
      
      const user = userEvent.setup()
      await user.click(screen.getByText('Start'));
      expect(screen.getByText('Pause')).toBeInTheDocument();
    });

    it('reset should work as expected', async () => {
      render(<App />)
      
      const user = userEvent.setup()
      await user.click(screen.getByText('Start'));

      await screen.findByText('Iteration 1')

      await user.click(screen.getByText('Reset'));

      expect(screen.getByText('Iteration 0')).toBeInTheDocument();
    });
  });

  describe('the time interval input', () => {
    it('should work as expected', async () => {
      render(<App />)
      
      const input = screen.getByLabelText('timeout-interval');
      fireEvent.input(input, { target: { value: '500' } });
      expect((input as HTMLInputElement).value).toBe('500');
    });

    it('should display zero when slider moved to minimum value', async () => {
      render(<App />)
      
      const input = screen.getByLabelText('timeout-interval');
      fireEvent.input(input, { target: { value: '0' } });
      expect((input as HTMLInputElement).value).toBe('0');
    });
  });

  describe('Clicking on a dead cell in the grid', () => {
    it('should bring it back to life', async () => {
      render(<App />)
      
      const deadCells = await screen.findAllByLabelText(/dead/);
      const sut = deadCells[0];
      await userEvent.click(sut);
      expect(sut.getAttribute('class')).toBe('alive');
    });
  });
});
