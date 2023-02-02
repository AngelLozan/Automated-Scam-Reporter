import React from 'react';
import logo from './ban.png';
import './App.css';

function App() {
   const [ready, setReady] = React.useState(null);
   const [data, setData] = React.useState(null);
   const [urlData, setUrlData] = React.useState(null);

  
  const form = (e) => {
    fetch('https://autoreporter.onrender.com/api', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({URL: `${urlData}`}),//JSON.stringify(urlData),
    })
      .then((res) => res.json())
      .then((result) => setData(result.message))
      .catch((err) => console.log('error'))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    await form();
    await setUrlData('');
    await setData("Reporting now...");
  }

  const handleChange = (e) => {
    setUrlData(e.target.value)
  }

  React.useEffect(() => {
    fetch("/api/ready")
      .then((res) => res.json())
      .then((r) => setReady(r.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <p>{!ready ? "Server not ready yet" : ready}</p>

      <form onSubmit={handleSubmit}>
                <input type="text" value={urlData} onChange={handleChange} tabindex="1"/>
                <button type="submit" tabindex="2"> Report </button>
      </form>
            <p>
            {!data ? "Script complete message will show here." : data}
            </p>
    </div>
  );
}

export default App;