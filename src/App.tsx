import React, { useState } from 'react';
import Autocomplete from './autocomplete/Autocomplete';
import './app.css';
import { countries } from './data/countries';

function App() {

  const [options, setOptions] = useState<{ closeResultsOnSelection: boolean, clearOnScape: boolean }>({
    closeResultsOnSelection: false,
    clearOnScape: false
  })

  return (
    <>
      <div className='section'>
        <h3>General configuration</h3>
        <label>Setup the general configuration for all components showcasing all its features</label>
        <div className="options">
          <label>
            <input type="checkbox" onChange={x => setOptions({
              ...options,
              closeResultsOnSelection: x.target.checked,
            })} /> Auto close the dialog when the user selects an item with the Enter key
          </label>
          <label>
            <input type="checkbox" onChange={x => setOptions({
              ...options,
              clearOnScape: x.target.checked,
            })} /> Clear the input when the user press the Escape on the input
          </label>
        </div>
      </div>
      <div className="section">
        <h3>Simple example</h3>
        <Autocomplete items={countries}
          label='Countries'
          clearOnScape={options.clearOnScape}
          closeOnNavigationSelection={options.closeResultsOnSelection}
          getLabel={x => x.name} />
      </div>
      <div className="section">
        <h3>Simple with onChange event</h3>
        <Autocomplete items={countries}
          label='Countries'
          clearOnScape={options.clearOnScape}
          closeOnNavigationSelection={options.closeResultsOnSelection}
          onChange={x => {
            alert(`selected item ${JSON.stringify(x)}`)
          }}
          getLabel={x => x.name} />
      </div>
    </>
  );
}

export default App;
