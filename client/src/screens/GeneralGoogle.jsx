import React from 'react';
import logo from '../ban.png';
import '../App.css';

const GeneralGoogle = ({user}) => {
    const [ready, setReady] = React.useState(null);
    const [Data, setData] = React.useState(null);
    const [urlData, setUrlData] = React.useState('');
    const [report, setReport] = React.useState('');
    const [copySuccess, setCopySuccess] = React.useState('');
    const textAreaRef = React.useRef(null);
    const [showImg, setShowImg] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const logout = ({user}) => {
        localStorage.removeItem("user");
        window.location.reload();
      };


    const form = (e) => {
        fetch('/api', { //@dev https://autoreporter.onrender.com/api for local test: /api
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ URL: `${urlData}` }), //JSON.stringify(urlData),
            })
            .then((res) => res.json())
            .then((result) => {
                setData(result.message)
                setShowImg(true)
                setLoading(false)
                serverReady();
            })
            .catch((err) => console.log('error'))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (urlData.trim().length !== 0) {
            await form();
            await setUrlData('');
            await setShowImg(false);
            await setLoading(true);
            await setReady('Reporting now stand by ⬆')
        } else {
            setReport('Please enter valid URL')
            setTimeout(() =>
                setReport(''), 900
            )
        }
    }

    const handleChange = async (e) => {
        await setUrlData(e.target.value)
        await setReport(e.target.value)
    }

    const serverReady = () => {
        fetch("/api/ready") //@dev https://autoreporter.onrender.com/api/ready for local test: /api/ready
            .then((res) => res.json())
            .then((r) => {
                console.log(r)
                setReady(r.message)
            });
    }


    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
        setCopySuccess('Copied!');

        setTimeout(() =>
            setCopySuccess(''), 900
        )
    };

    React.useEffect(() => {
        serverReady();
        // fetch("/api/ready") //@dev https://autoreporter.onrender.com/api/ready for local test: /api/ready
        //     .then((res) => res.json())
        //     .then((r) => {
        //         console.log(r)
        //         setReady(r.message)
        //     });
    }, []);

    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className={loading ? 'App-logo-spin' : 'App-logo'} alt="logo" />
      </header>

      <p>{!ready ? "Server not ready yet" : ready}</p>

      <form onSubmit={handleSubmit}>
                <input type="text" value={urlData} onChange={handleChange} tabIndex="1"/>
                <button type="submit" tabIndex="2"> Report </button>
      </form>
            
            <p>The URL reported is:</p>
             
             <input
             name="url" 
             ref={textAreaRef} 
             onClick={copyToClipboard}
             value={report}
             />

            <br/>
            {copySuccess}
            <br/>

            <div className="imageDiv">
            {showImg &&
            <img className="screenshot" alt="Something went wrong, submit again." src={`data:image/jpeg;base64,${Data}` } />
            }
            </div>

      

      <div style={{ textAlign: "center", margin: "3rem" }}>
      <p>User {user?.email}</p>
        <button className="logout" onClick={logout}>
          Log Out
        </button>
      </div>

            
    </div>

    );
}


export default GeneralGoogle;