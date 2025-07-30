import React from "react";
import "./StarryBackground.css";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default function StarryBackground({ starCount = 80 }) {
  const stars = Array.from({ length: starCount }).map((_, i) => {
    const size = getRandomInt(3) + 1;
    return (
      <div
        key={i}
        className="star"
        style={{
          left: `${getRandomInt(100)}vw`,
          top: `${getRandomInt(100)}vh`,
          width: size,
          height: size,
          animationDelay: `${Math.random() * 2}s`
        }}
      />
    );
  });
  return <div className="starry-bg">{stars}</div>;
} 