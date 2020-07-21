  
import React from 'react';
import './NoteListNav.css'
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import AddFolder from '../AddFolder/AddFolder';



class NoteListNav extends React.Component {
  static contextType = ApiContext;

  render() {
    const { folders=[], notes=[] } = this.context
    return (
      <div className="note-list-nav">
        <h2>Folders</h2>
        <ul>
          {this.context.folders.map((folder) => {
            const classes = this.context.selected === folder.id
              ? 'folder selected'
              : 'folder'
            return(

              <li key={folder.id}>
                <Link className={classes} to={`/folders/${folder.id}`}>{folder.name}
                </Link>
              </li>
            )
          })}
        </ul>
        <button>New Folder</button>
      </div>
    );
  }
}

NoteListNav.defaultProps = {
  folders: []
}

export default NoteListNav;