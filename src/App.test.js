import { render, screen } from '@testing-library/react';
import App from './App';

test('Check "Benvenuti in EpiBooks!" mounted', () => {
  render(<App />);
  const welcomeSottotitolo = screen.getByText(/benvenuti in epibooks!/i); //A quanto pare non è case sensitive
  expect(welcomeSottotitolo).toBeInTheDocument();
});
