import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css';
import ApiContext from '../ApiContext';
import {withRouter} from 'react-router'
import PropTypes from 'prop-types'
import config from '../config';

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/api/notes}/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.history.push('/')
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const modified = formatDate(new Date(this.props.modified));
    return (
      <li className="Note">
        <Link to={`/notes/${this.props.id}`}>{this.props.name}</Link>
        <div>
            <p>Last modified: {modified}</p>

          <button onClick={this.handleClickDelete}>Delete Note</button>
        </div>
      </li>
    );
  }
}

export default withRouter(Note);

Note.propTypes = {
	notes: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			id_folder: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			content: PropTypes.string.isRequired,
			modified: PropTypes.instanceOf(Date).isRequired
		})
	)
};