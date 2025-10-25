import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Plotly from 'react-plotly.js'
import * as d3 from 'd3'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Fetch CSV and create Plotly map
    d3.csv(
      'https://raw.githubusercontent.com/plotly/datasets/master/2015_06_30_precipitation.csv'
    ).then(rows => {
      function unpack(rows, key) {
        return rows.map(row => row[key])
      }

      const data = [
        {
          type: 'scattermapbox',
          text: unpack(rows, 'Globvalue'),
          lon: unpack(rows, 'Lon'),
          lat: unpack(rows, 'Lat'),
          marker: { color: 'fuchsia', size: 4 },
        },
      ]

      const layout = {
        dragmode: 'zoom',
        mapbox: {
          style: 'open-street-map',
          center: { lat: 38, lon: -90 },
          zoom: 3,
        },
        margin: { r: 0, t: 0, b: 0, l: 0 },
      }

      Plotly.newPlot('myDiv', data, layout)
    })
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Plotly</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* Plotly chart container */}
      <div id="myDiv" style={{ width: '100%', height: '500px' }}></div>
    </>
  )
}

export default App