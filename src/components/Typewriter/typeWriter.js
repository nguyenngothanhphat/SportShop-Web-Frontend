import React from "react";
import { Typewriter } from "typewriter-effect";

const Type = ({ text }) => {
  return (
    <Typewriter
      options={{
        strings: text,
        autoStart: true,
        loop: true,
      }}
    />
  );
};

export default Type;
