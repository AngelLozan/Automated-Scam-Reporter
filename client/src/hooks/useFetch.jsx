import { useState } from "react";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleGoogle = async (response) => {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ credential: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        // if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data?.user));
          window.location.reload();
        //}

        //throw new Error(data?.message || data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  return { loading, handleGoogle, error };
};

export default useFetch;
