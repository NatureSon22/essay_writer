import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function CopyButton({ essayInfo: { essay }, visible }) {
  const [icon, setIcon] = useState(faCopy);
  const [style, setStyle] = useState('copy-button');

  useEffect(() => {
    setStyle(`copy-button ${visible ? '' : 'visible'}`)
  }, [visible])

  const handleClick = async () => {
    setIcon(faCheck);

    setTimeout(() => {
      setIcon(faCopy);
    }, 1000);

    try {
      await navigator.clipboard.writeText(essay);
    } catch (err) {
      console.log("Error copying text: ", err);
    }
  };

  return (
    <div className={style}>
      <FontAwesomeIcon icon={icon} onClick={handleClick} />
    </div>
  );
}
