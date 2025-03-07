import { useEffect, useState } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = ( ) => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('... a new note')
  const [showAll, setShowAll] = useState(true);


  useEffect(() =>{
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response =>{
        console.log('promise completada')
        setNotes(response.data);
      })
  }, [])
  console.log('render', notes.length, 'notes');

  //El event es un simple parametro no es nada mas que eso 
  const addNote = (event) => {
    //Evita de que se envie todo, osea que se quede en consola el console log
    event.preventDefault()
    //EL target es para que se registre en la consola
    //console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    setNotes(notes.concat(noteObject))
    //Esto es para una vez enviado el array el formulario se ponga en blanco
    setNewNote('')

  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important == true )


  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default App
