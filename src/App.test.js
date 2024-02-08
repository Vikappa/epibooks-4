import { render, screen } from '@testing-library/react';
import App from './App';
import fantasy from './data/fantasy.json'
import BookList from './components/BookList';


test('Check "Benvenuti in EpiBooks!" mounted', () => {
  render(<App />);
  const welcomeSottotitolo = screen.getByText(/benvenuti in epibooks!/i); //A quanto pare non è case sensitive
  expect(welcomeSottotitolo).toBeInTheDocument();
});

test('Controllo che BookList.jsx renderizzi tante Card quanti sono gli oggetti libro dati in argomento', async () => {
  render(<BookList books={fantasy}/>);
  const arrayCards = await screen.findAllByTestId('book-card');
  expect(arrayCards.length).toBe(fantasy.length);
});
