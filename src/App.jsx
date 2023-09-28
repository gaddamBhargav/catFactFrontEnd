import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'https://catfact.ninja/fact';

function App() {
  const [catInfo, setCatInfo] = useState(undefined);
  const [history, setHistory] = useState([]);

  const fetchCatInfo = () => {
    fetch(API_URL, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => setCatInfo(data.fact))
  }

  const saveHistory = () => {
    console.log('--- catinfo ---', catInfo);
    const isFound = history.find(data => data.catInfo === catInfo);
    console.log(isFound);
    if (!isFound) {
      setHistory([
        ...history,
        { catInfo: catInfo, id: Math.floor((Math.random() * 100) + 1) }
      ])
    }
  }
  useEffect(() => {
    fetchCatInfo();
  }, [])

  return (
    <div className='app'>
      <div className='info'>
        <p>{catInfo}</p>
        <div className='buttons-wrapper'>
          <button className='btn' onClick={fetchCatInfo}>Load New Fact</button>
          <button className='btn' onClick={saveHistory}>Save To History</button>
        </div>
      </div>
      <div className='history'>
        <ol>
          { history.map(data => <li key={data.id}>{ data.catInfo }</li>)}
        </ol>
      </div>
    </div>
  )
}

export default App
