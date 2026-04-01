import React, { useState, useEffect } from 'react';
import './TerminalBio.css';

const lines = [
  '~ $ ./execute_profile.sh',
  '> Loading Game Developer...',
  '> 1+ years compiling code and drinking coffee.'
];

export default function TerminalBio() {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let typingTimer;

    const typeChar = () => {
      if (currentLine >= lines.length) {
        setPhase(2); // Done
        return;
      }

      const fullLine = lines[currentLine];

      if (currentChar < fullLine.length) {
        setText((prev) => prev + fullLine.charAt(currentChar));
        currentChar++;
        typingTimer = setTimeout(typeChar, 40); // typing speed
      } else {
        setText((prev) => prev + '\n');
        currentLine++;
        currentChar = 0;
        typingTimer = setTimeout(typeChar, 300); // pause between lines
      }
    };

    setPhase(1); // Typing
    typingTimer = setTimeout(typeChar, 500); // Initial delay

    return () => clearTimeout(typingTimer);
  }, []);

  return (
    <article className="mac-terminal shadow-lg">
      <header className="terminal-header">
        <div className="window-controls">
          <span className="control close"></span>
          <span className="control minimize"></span>
          <span className="control maximize"></span>
        </div>
        <div className="window-title">bash - 80x24</div>
      </header>
      <div className="terminal-body">
        <pre className="terminal-text">
          {text}
          {phase !== 2 && <span className="cursor">_</span>}
        </pre>
      </div>
    </article>
  );
}
