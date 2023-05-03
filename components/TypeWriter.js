import React from "react";
import Typewriter from 'typewriter-effect';

export default function TypingEffect() {
  return (
    <div>
      <Typewriter
          options={{
            strings: ['CODE'],
            autoStart: true,
            loop: true,
          }}
      />
    </div>
  );
}