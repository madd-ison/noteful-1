import React from 'react'

const ApiContext = React.createContext({
  notes: [],
  folders: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})

export const ApiProvider = ApiContext.Provider
export const ApiConsumer = ApiContext.Consumer

export default ApiContext;