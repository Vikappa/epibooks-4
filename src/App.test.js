import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import fantasy from './data/fantasy.json'
import BookList from './components/BookList'


test('Check "Benvenuti in EpiBooks!" mounted', () => {
  render(<App />)
  const welcomeSottotitolo = screen.getByText(/benvenuti in epibooks!/i) //A quanto pare non è case sensitive
  expect(welcomeSottotitolo).toBeInTheDocument()
})

test('Controllo che BookList.jsx renderizzi tante Card quanti sono gli oggetti libro dati in argomento', async () => {
  render(<BookList books={fantasy}/>)
  // Aggiunto data-testid "book-card"
  const arrayCards = await screen.findAllByTestId('book-card')
  expect(arrayCards.length).toBe(fantasy.length)
})

test('Controllo che il componente CommentArea venga renderizzato correttamente.', () => {
  render(<App/>)

let FormConPlaceHolderNoto = screen.getByPlaceholderText("Inserisci qui il testo")
let pRecensione = screen.getByText(/recensione/i)

expect(pRecensione).toBeInTheDocument()
expect(FormConPlaceHolderNoto).toBeInTheDocument()
expect(FormConPlaceHolderNoto).toBeInTheDocument()
})


test('Verifico effettivo funzionamento filtro navbar', async ()=>{
render(<BookList books={fantasy}/>)

  const formRicerca = screen.getByPlaceholderText('Cerca un libro')

  const contaLibriRisultatoRicerca = (filtro, array) => {
    let res = 0
    // Converti il filtro in minuscolo per ignorare le differenze di maiuscole/minuscole
    const filtroMinuscolo = filtro.toLowerCase()
    for (let i = 0; i < array.length; i++) {
      // Controlla se il titolo del libro (convertito in minuscolo) contiene il filtro
      if (array[i].title.toLowerCase().includes(filtroMinuscolo)) {
        res++
      }
    }
    return res
  }
  

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

test('Controllo che cliccando su un libro il suo bordo cambi colore', async () => {
  render(<BookList books={fantasy}/>)

  const bookCards = await screen.findAllByTestId('book-card')

  const limite = fantasy.length // Tetto per generatore numeri casuali basato su lunghezza array
  
  const random = function(tetto) {
    return Math.floor(Math.random() * (tetto + 1)) //Genera un numero casuale da 0 a 150 (limite array)
  }
  
  const indiceTest1 = random(limite) // Indice della card da cliccare e checkare alla fine

  fireEvent.click(bookCards[indiceTest1])

  expect(bookCards[indiceTest1].style.border).toBe('3px solid red')

  const indiceTest2 = random(limite) // Secondo test per la gloria

  fireEvent.click(bookCards[indiceTest2])
  expect(bookCards[indiceTest2].style.border).toBe('3px solid red')

})

test('Controllo che cliccando su un secondo libro il bordo del primo torni normale', async () => {
  render(<BookList books={fantasy}/>)

  const bookCards = await screen.findAllByTestId('book-card')

  const limite = fantasy.length // Tetto per generatore numeri casuali basato su lunghezza array
  
  const random = function(tetto) {
    return Math.floor(Math.random() * (tetto + 1)) //Genera un numero casuale da 0 a 150 (limite array)
  }
  
  const indiceTest1 = random(limite) // Indice della card da cliccare e checkare alla fine

  fireEvent.click(bookCards[indiceTest1])

  expect(bookCards[indiceTest1].style.border).toBe('3px solid red')

  const indiceTest2 = random(limite) // Secondo test per la gloria

  fireEvent.click(bookCards[indiceTest2])
  expect(bookCards[indiceTest2].style.border).toBe('3px solid red')
  expect(bookCards[indiceTest1].style.border).not.toBe('3px solid red')

})

test('Controllo che non ci siano li del componente SingleComment a pagina appena avviata', () => {
  render(<App />)
  // Aggiunto data-testid "li-comment"

  const arrayLiComments = screen.queryAllByTestId('li-comment') // Uso queryAll invece che findAll per non fare promise e attendere fetch
console.log(arrayLiComments.length)
  expect(arrayLiComments.length).toBe(0)
})