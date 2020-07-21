import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';

class NotePageNav extends React.Component {

  static contextType = ApiContext;

  render() {

    const selectedNote = this.context.notes.find(
      note => note.id === this.props.match.params.noteId)

    const selectedFolder = selectedNote ? this.context.folders.find(
      folder => folder.id === selectedNote.folderId
    ) : null

    return (
      <div className="Sidebar">

        <Link to='/'>Go Back</Link>
       {selectedFolder && <h2>Current Folder: {selectedFolder.name}</h2>}
      </div>
    );
  }

}

export default NotePageNav