import { useState } from "react";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleGoogle = async (response) => {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
      },
      body: JSON.stringify({ credential: response.credential }),
    })
      .then((res) => {
        setLoading(false);
        let returned = res.json();
        console.log(returned)
        return returned;
      })
      .then((data) => {
        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data?.user));
          window.location.reload();
        }

        throw new Error(data?.message || data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  return { loading, handleGoogle, error };
};

export default useFetch;
