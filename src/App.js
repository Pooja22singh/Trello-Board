import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TrelloContainer from './components/trelloContainer';
import './styles/styles.default.scss';

export default function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <TrelloContainer />
      </DndProvider>
    </div>
  );
}
