import React, { useState, useEffect, useRef } from 'react';
import { terminalLines } from '../siteConfig';
import './TerminalBio.css';

export default function TerminalBio() {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState(0);
  const timersRef = useRef([]);

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;

    const schedule = (fn, delay) => {
      const id = setTimeout(fn, delay);
      timersRef.current.push(id);
      return id;
    };

    const typeChar = () => {
      if (currentLine >= terminalLines.length) {
        setPhase(2); // Done
        return;
      }

      const fullLine = terminalLines[currentLine];

      if (currentChar < fullLine.length) {
        setText((prev) => prev + fullLine.charAt(currentChar));
        currentChar++;
        schedule(typeChar, 40);
      } else {
        setText((prev) => prev + '\n');
        currentLine++;
        currentChar = 0;
        schedule(typeChar, 300);
      }
    };

    setPhase(1);
    schedule(typeChar, 500);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  return (
    <article className="mac-terminal shadow-lg">
      <header className="terminal-header">
        <div className="window-controls">
          <span className="control close"></span>
          <span className="control minimize"></span>
          <span className="control maximize"></span>
        </div>
        <div className="window-title">bash — 80×24</div>
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
