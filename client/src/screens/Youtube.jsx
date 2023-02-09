import React from "react";
import logo from "../ban.png";
import "../App.css";
import Checkbox from "../components/Checkbox.js";

const Youtube = ({ user }) => {
    const [ready, setReady] = React.useState(null);
    const [Data, setData] = React.useState(null);
    const [urlData, setUrlData] = React.useState("");
    const [report, setReport] = React.useState("");
    const [copySuccess, setCopySuccess] = React.useState("");
    const textAreaRef = React.useRef(null);
    const [showImg, setShowImg] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [walletConnect, setWalletConnect] = React.useState(false);
    const [blog, setBlog] = React.useState(false);

    const form = (e) => {
        fetch("https://autoreporter.onrender.com/api/youtube", {
            //@dev https://autoreporter.onrender.com/api/youtube for local test: /api/youtube
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                URL: `${urlData}`,
                WC: `${walletConnect}`,
                BLOG: `${blog}` 
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                setData(result.message);
                setShowImg(true);
                setLoading(false);
                serverReady();
            })
            .catch((err) => console.log("error"));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (urlData.trim().length !== 0) {
            await form();
            await setUrlData("");
            await setShowImg(false);
            await setLoading(true);
            await setReady("Reporting now stand by ⬆");
        } else {
            setReport("Please enter valid URL");
            setTimeout(() => setReport(""), 900);
        }
    };

    const handleChange = async (e) => {
        await setUrlData(e.target.value);
        await setReport(e.target.value);
    };

    const handleCheckOne = () => {
        setBlog(!blog);
    };

    const handleCheckTwo = () => {
        setWalletConnect(!walletConnect);
    };

    const serverReady = () => {
        fetch("https://autoreporter.onrender.com/api/ready") //@dev https://autoreporter.onrender.com/api/ready for local test: /api/ready
            .then((res) => res.json())
            .then((r) => {
                console.log(r);
                setReady(r.message);
            });
    };

    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand("copy");
        e.target.focus();
        setCopySuccess("Copied!");

        setTimeout(() => setCopySuccess(""), 900);
    }

    React.useEffect(() => {
        serverReady();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img
                    src={logo}
                    className={loading ? "App-logo-spin" : "App-logo"}
                    alt="logo"
                />
            </header>
            <h2>Youtube Video & Profile Report</h2>
            <p>This action takes two parameters, a URL to a scam site and what type of scam, indicated by the checkbox. If neither checkbox is selected, the report verbiage describes a general malicious video. Reports video and profile.</p>
            <p>{!ready ? "Server not ready yet" : ready}</p>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={urlData}
                    onChange={handleChange}
                    tabIndex="1"
                />
                  <br/>
                <p>If applicable, indicate if this is affiliated with a link in the comment or description before submitting:</p>
                <Checkbox
                    label="Link in Comment"
                    value={blog}
                    onChange={handleCheckOne}
                />
                <br/>
                <br/>
                <Checkbox
                    label="Link in Description"
                    value={walletConnect}
                    onChange={handleCheckTwo}
                />
                <br/>
                <br/>
                <button type="submit" tabIndex="2">
                    {" "}
                    Report{" "}
                </button>

            </form>

            <p>The URL reported is:</p>

            <input
                name="url"
                ref={textAreaRef}
                onClick={copyToClipboard}
                value={report}
                readOnly
            />

            <br />
            {copySuccess}
            <br />

            <div className="imageDiv">
                {showImg && (
                    <img
                        className="screenshot"
                        alt="Something went wrong, submit again."
                        src={`data:image/jpeg;base64,${Data}`}
                    />
                )}
            </div>
        </div>
    );
};

export default Youtube;