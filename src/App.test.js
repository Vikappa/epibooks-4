import { render, screen, fireEvent } from '@testing-library/react';
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

test('Controllo che il componente CommentArea venga renderizzato correttamente.', () => {
  render(<App/>)

let FormConPlaceHolderNoto = screen.getByPlaceholderText("Inserisci qui il testo")
let pRecensione = screen.getByText(/recensione/i)
let pValutazione = screen.getByText(/valutazione/i)


expect(pRecensione).toBeInTheDocument()
expect(FormConPlaceHolderNoto).toBeInTheDocument()
expect(FormConPlaceHolderNoto).toBeInTheDocument()
})


test('Verifico effettivo funzionamento filtro navbar', async ()=>{
render(<BookList books={fantasy}/>)

  const formRicerca = screen.getByPlaceholderText('Cerca un libro')

  const contaLibriRisultatoRicerca = (filtro, array) => {
    let res = 0;
    // Converti il filtro in minuscolo per ignorare le differenze di maiuscole/minuscole
    const filtroMinuscolo = filtro.toLowerCase();
    for (let i = 0; i < array.length; i++) {
      // Controlla se il titolo del libro (convertito in minuscolo) contiene il filtro
      if (array[i].title.toLowerCase().includes(filtroMinuscolo)) {
        res++;
      }
    }
    return res;
  };
  

  let testoRicerca = "witcher" // Per la prima ricerca

  //Dico al robot di digitare la ricerca che voglio
  fireEvent.change(formRicerca, { target: { value: testoRicerca } })  

  //Conto le card rimanenti
  let bookCards = await screen.findAllByTestId('book-card')

  //Test 1
  expect(bookCards.length).toBe(contaLibriRisultatoRicerca(testoRicerca, fantasy))

  //Test 2, cambio il testo della ricerca e riprovo
  testoRicerca = "dungeons"
  fireEvent.change(formRicerca, { target: { value: "" } })//Svuoto per sicurezza  
  fireEvent.change(formRicerca, { target: { value: testoRicerca } })  

  //Conto le card rimanenti
  bookCards = await screen.findAllByTestId('book-card')

  //Eseguo test 2
  expect(bookCards.length).toBe(contaLibriRisultatoRicerca(testoRicerca, fantasy))

})