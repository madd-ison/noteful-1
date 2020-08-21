import React from 'react';
import { withRouter } from 'react-router'
import Note from '../Note/Note';
import './NoteListMain.css'
import ApiContext from '../ApiContext';

class NoteListMain extends React.Component {
  
  static contextType = ApiContext

  getNotesForFolder = (notesArray) => {
    if (this.props.match.params.folderId) {
      return notesArray.filter((note) => {
        return note.folder_id === Number(this.props.match.params.folderId)
      })
    }

    return notesArray
  }

  handleAddNote = () => {
    this.props.history.push('/add-note')
  }

  render() {
    const notes = this.getNotesForFolder(this.context.notes)
    return (
      <div className="note-list-main">
        <h2>Notes</h2>
        <ul>
          {notes.map((note) => {
            return (
              <Note modified={note.date_created} key={note.id} id={note.id } name={note.title}/>
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

export default withRouter(NoteListMain);