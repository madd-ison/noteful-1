import React from 'react';
import './App.css';
import NoteListNav from '../NoteListNav/NoteListNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import NotePageNav from '../NotePageNav/NotePageNav'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import { Route, Link } from 'react-router-dom';
import { ApiProvider } from '../ApiContext';
import config from '../config';
import HandleError from '../HandleError';

class App extends React.Component {
  state = {
    notes: [],
    folders: []
  }

  componentDidMount() {
    Promise.all([
        fetch(`${config.NOTES_ENDPOINT}`),
        fetch(`${config.FOLDERS_ENDPOINT}`)
    ])
        .then(([notesRes, foldersRes]) => {
            if (!notesRes.ok)
                return notesRes.json().then(e => Promise.reject(e));
            if (!foldersRes.ok)
                return foldersRes.json().then(e => Promise.reject(e));

            return Promise.all([notesRes.json(), foldersRes.json()]);
        })
        .then(([notes, folders]) => {
            this.setState({notes, folders});
        })
        .catch(error => {
            console.error({error});
        });
}

handleAddFolder = folder => {
  this.setState({
    folders: [
      ...this.state.folders,
      folder
    ]
  })
}

handleAddNote = note => {
  this.setState({
    notes: [
      ...this.state.notes,
      note
    ]
  })
}

handleDeleteNote = noteId => {
  console.log(noteId)
  this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
  });
};

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote
  }; 
    return (
      <HandleError>
      <ApiProvider value={value}>
      <div className="App">
        <header className="App-header">
          <h1><Link to={'/'}>Noteful</Link></h1>
        </header>
      
      <div className="flex-box">
        <div className="sidebar">
          <Route
            exact
            path='/'
            component={NoteListNav}/>

            <Route 
              exact
              path='/folders/:folderId'
              component={NoteListNav} />

            <Route 
              exact
              path='/notes/:noteId'
              component={NotePageNav}
              />
               <Route
                exact
                path='/add-note'
                component={NotePageNav}
                />
                <Route 
                  exact
                  path='/add-folder'
                  component={NotePageNav} />
        </div>
        <main>
          <Route 
            exact
            path='/'
            component={NoteListMain} />
          <Route 
            exact
            path='/folders/:folderId' 
            component={NoteListMain} />
          <Route 
            exact
            path='/notes/:noteId'
            component={NotePageMain}/>
          <Route
              exact
              path='/add-folder'
              component={AddFolder}
            />
            <Route
              exact
              path='/add-note'
              component={AddNote}
             />
        </main>
            </div>
      </div>
      </ApiProvider>
      </HandleError>
    );
  }
}

export default App;