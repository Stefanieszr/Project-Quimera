import moment from "moment";
import { useState, useEffect } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import "./styles.css";

const Countdown = ({ hours, minutes, seconds, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(
    moment.duration({ hours, minutes, seconds }).asSeconds()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onFinish();
    }
  }, [timeLeft, onFinish]);

  const duration = moment.duration(timeLeft, "seconds");
  const hoursLeft = duration.hours();
  const minutesLeft = duration.minutes();
  const secondsLeft = duration.seconds();

  return (
    <div className="ContainerCountdown">
      <AiOutlineClockCircle className="clockicon" />
      <span className="TimeCountdown">
        {hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft}:
        {minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}:
        {secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
      </span>
    </div>
  );
};

export default Countdown;
