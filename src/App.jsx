import { useEffect, useState } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './components/services/Notes'

const App = ( ) => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('... a new note')
  const [showAll, setShowAll] = useState(true);


  // useEffect(() =>{
  //   axios
  //     .get('http://localhost:3001/notes')
  //     .then(response =>{
  //       console.log('promise completada')
  //       setNotes(response.data);
  //     })
  // }, [])
  // console.log('render', notes.length, 'notes');

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response.data)
      })
  })

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

    // axios
    //   .post('http://localhost:3001/notes', noteObject)
    //   .then(response => {
    //     setNotes(notes.concat(noteObject))
    //     //Esto es para una vez enviado el array el formulario se ponga en blanco
    //     setNewNote('')
    //   })
    noteService
      .create(noteObject)
      .then(response =>{
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
    
      console.log(notes);
    

  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important == true )


  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    // find devuelve la primera nota cuyo id coincida con el valor de id que se pasó a la función.
    const note = notes.find( n => n.id === id)
    //El operador de propagación (...) se usa aquí para crear una copia superficial de todas las 
    // propiedades de note. Es decir, toma todas las propiedades de note (como id, text, date, etc.) 
    // y las copia en un nuevo objeto.
    const changedNote = {...note, important: !note.important}
    noteService
      .update(id, changedNote).then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response.data))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
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
