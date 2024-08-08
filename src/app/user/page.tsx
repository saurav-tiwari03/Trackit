"use client";
import { useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
  
export default function Page() {
  const [isExploding, setIsExploding] = useState(false);
  const { width, height } = useWindowSize();

  const handleClick = () => {
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), 5000); 
  };

  return (
    <div>
      <button onClick={handleClick}>
        Celebrate!
      </button>
      {isExploding && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={200}
          gravity={0.4}
        />
      )}
    </div>
  );
}
