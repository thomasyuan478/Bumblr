import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./NotFound.css"
import { useEffect, useState } from "react";

function NotFound() {
  const history = useHistory();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountDown => prevCountDown - 1);
    }, 1000);

    if (countdown === 0) {
      history.push('/')
    };

    return () => {
      clearInterval(timer)
    };
  }, [countdown, history])

  return (
    <div id="not-found-div">
      <h1 id="not-found">
        There is nothing here...
      </h1>
      <h2 id="redirecting-text">
        Whatever you were looking for doesn't currently exist at this address. Unless you were looking for this error page, in which case: Congrats! You totally found it.
        <br></br>
        Redirecting in {countdown}...
      </h2>
    </div>
  )
}

export default NotFound;
