import React from 'react';
import './App.css';
import STORE from '../dummy-store'
import NoteListNav from '../NoteListNav/NoteListNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import NotePageNav from '../NotePageNav/NotePageNav'
import { Route, Switch, Link } from 'react-router-dom';
import { ApiProvider } from '../ApiContext';
import config from '../config';

class App extends React.Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    Promise.all([
        fetch(`${config.API_ENDPOINT}/notes`),
        fetch(`${config.API_ENDPOINT}/folders`)
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

handleDeleteNote = noteId => {
  this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
  });
};

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote
  }; 
    return (
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
        </main>
            </div>
      </div>
      </ApiProvider>
    );
  }
}

export default App;