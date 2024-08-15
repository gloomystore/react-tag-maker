import React, { useState } from 'react';
import GloomyTags from './dist'
// import GloomyTags from './lib'
// import GloomyTags from 'react-tag-maker'

function App() {
  const [state, setState] = useState([])
  return (
    <div className="App">
      <GloomyTags state={state} setState={setState}  />
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
