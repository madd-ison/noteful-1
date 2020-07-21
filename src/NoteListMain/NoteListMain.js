import React from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import './NoteListMain.css'
import ApiContext from '../ApiContext';

class NoteListMain extends React.Component {
  
  static contextType = ApiContext

  getNotesForFolder = (notesArray) => {
    if (this.props.match.params.folderId) {
      return notesArray.filter((note) => {
        return note.folderId === this.props.match.params.folderId
      })
    }

    return notesArray
  }

  handleAddNote() {

  }

  render() {
    const notes = this.getNotesForFolder(this.context.notes)
    return (
      <div className="note-list-main">
        <h2>Notes</h2>
        <ul>
          {notes.map((note) => {
            return (
              <Note modified={note.modified} key={note.id} id={note.id } name={note.name} />
            )
          })}
        </ul>
        <button onClick={this.handleAddNote}>New Note</button>
      </div>
    );
  }
}

NoteListMain.defaultProps = {
  notes: []
}

export default NoteListMain;