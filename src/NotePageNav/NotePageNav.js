import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';

class NotePageNav extends React.Component {

  static contextType = ApiContext;

  render() {

    const selectedFolderId = this.context.notes.find(
      note => note.id === this.props.match.params.noteId
    ).folderId

    const selectedFolder = this.context.folders.find(
      folder => folder.id === selectedFolderId
    )

    return (
      <div className="Sidebar">

        <Link to='/'>Go Back</Link>
        <h2>Current Folder: {selectedFolder.name}</h2>
      </div>
    );
  }

}

export default NotePageNav