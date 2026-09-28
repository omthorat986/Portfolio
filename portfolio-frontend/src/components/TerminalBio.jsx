import React, { useState, useEffect, useRef } from 'react';
import { terminalLines, codeSkills, toolSkills, contact, personal } from '../siteConfig';
import { sounds } from '../utils/soundEffects';
import './TerminalBio.css';

const COMMANDS_HELP = [
  'help      - Display available console commands',
  'skills    - Print technical proficiencies & engines',
  'projects  - List gameplay & engine projects',
  'contact   - View direct contact channels',
  'whoami    - Print developer identity & mission',
  'clear     - Reset the terminal screen',
  'matrix    - Run digital rain simulation',
  'sudo hire - Instant recruit authorization',
];

export default function TerminalBio({ onOpenProject, onOpenDossier, onToast }) {
  const [outputLines, setOutputLines] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isTypingInit, setIsTypingInit] = useState(true);

  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [outputLines, isTypingInit]);

  // Initial auto-typing intro
  useEffect(() => {
    let lineIdx = 0;
    const timers = [];

    const printNextLine = () => {
      if (lineIdx < terminalLines.length) {
        const line = terminalLines[lineIdx];
        setOutputLines((prev) => [...prev, { text: line, type: 'init' }]);
        sounds.playTerminalKey();
        lineIdx++;
        timers.push(setTimeout(printNextLine, 280));
      } else {
        setIsTypingInit(false);
      }
    };

    timers.push(setTimeout(printNextLine, 350));
    return () => timers.forEach(clearTimeout);
  }, []);

  const executeCommand = (cmdStr) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    sounds.playClick();
    const newOutput = [...outputLines, { text: `om@gamedev:~$ ${raw}`, type: 'command' }];
    setHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    const cmd = raw.toLowerCase();

    switch (cmd) {
      case 'help':
        COMMANDS_HELP.forEach((c) => newOutput.push({ text: `  ${c}`, type: 'system' }));
        break;

      case 'skills':
        newOutput.push({ text: '── [ LANGUAGES ] ────────────────', type: 'header' });
        codeSkills.forEach((s) => newOutput.push({ text: `  • ${s.name.padEnd(12)} [${s.level}] ${s.desc}`, type: 'text' }));
        newOutput.push({ text: '── [ ENGINES & TOOLS ] ──────────', type: 'header' });
        toolSkills.forEach((t) => newOutput.push({ text: `  • ${t.name.padEnd(14)} [${t.level}] ${t.desc}`, type: 'text' }));
        break;

      case 'projects':
      case 'project':
        newOutput.push({ text: '── [ RECENT PROJECTS ] ──────────', type: 'header' });
        newOutput.push({ text: '  [1] Project: OVERDRIVE - C++ / Direct3D 12 ECS Engine (60 FPS)', type: 'accent' });
        newOutput.push({ text: '  [2] Nebula Tactics   - Unity C# Tactical AI & Hex Grid', type: 'accent' });
        newOutput.push({ text: '  (Type "open 1" or "open 2" to launch architectural inspection)', type: 'system' });
        break;

      case 'open 1':
      case 'project 1':
      case 'overdrive':
        newOutput.push({ text: 'Opening blueprint: Project: OVERDRIVE...', type: 'accent' });
        if (onOpenProject) onOpenProject({ id: 1, title: 'Project: OVERDRIVE' });
        break;

      case 'open 2':
      case 'project 2':
      case 'nebula':
        newOutput.push({ text: 'Opening blueprint: Nebula Tactics...', type: 'accent' });
        if (onOpenProject) onOpenProject({ id: 2, title: 'Nebula Tactics' });
        break;

      case 'contact':
        newOutput.push({ text: `  Email:    ${contact.email}`, type: 'text' });
        newOutput.push({ text: `  LinkedIn: ${contact.linkedinUrl}`, type: 'text' });
        newOutput.push({ text: `  GitHub:   ${contact.githubUrl}`, type: 'text' });
        break;

      case 'whoami':
        newOutput.push({ text: `  Name:     ${personal.fullName}`, type: 'text' });
        newOutput.push({ text: `  Role:     ${personal.title}`, type: 'text' });
        newOutput.push({ text: `  Bio:      ${personal.bio}`, type: 'text' });
        break;

      case 'clear':
        setOutputLines([]);
        setInputValue('');
        return;

      case 'matrix':
        newOutput.push({ text: 'Wake up, Neo...', type: 'system' });
        newOutput.push({ text: '01001111 01001101 00100000 01010100 01001000 01001111 01010010 01000001 01010100', type: 'accent' });
        newOutput.push({ text: 'Reality simulation running at 60Hz. No memory leaks detected.', type: 'system' });
        break;

      case 'sudo':
      case 'sudo hire':
      case 'hire':
        sounds.playSuccessChirp();
        newOutput.push({ text: '>>> [SECURITY OVERRIDE GRANTED] <<<', type: 'accent' });
        newOutput.push({ text: `Candidate ${personal.fullName} marked: "RECOMMENDED HIRE" 🚀`, type: 'header' });
        newOutput.push({ text: `Opening confidential dossier...`, type: 'system' });
        if (onOpenDossier) onOpenDossier();
        if (onToast) onToast('Access granted! Opening dossier...');
        break;

      default:
        newOutput.push({
          text: `bash: command not found: "${raw}". Type "help" for a list of commands.`,
          type: 'error',
        });
        break;
    }

    setOutputLines(newOutput);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputValue);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputValue(history[nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < history.length) {
          setHistoryIndex(nextIdx);
          setInputValue(history[nextIdx] || '');
        } else {
          setHistoryIndex(-1);
          setInputValue('');
        }
      }
    } else {
      sounds.playTerminalKey();
    }
  };

  const handleChipClick = (cmd) => {
    executeCommand(cmd);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <article className={`mac-terminal shadow-lg ${isMaximized ? 'terminal-maximized' : ''} ${isMinimized ? 'terminal-minimized' : ''}`}>
      <header className="terminal-header">
        <div className="window-controls">
          <button
            className="control close"
            onClick={() => {
              sounds.playClick();
              setOutputLines([{ text: 'Terminal reset. Type "help" to start.', type: 'system' }]);
            }}
            title="Reset Terminal"
            aria-label="Reset Terminal"
          />
          <button
            className="control minimize"
            onClick={() => {
              sounds.playClick();
              setIsMinimized(!isMinimized);
            }}
            title="Toggle Collapse"
            aria-label="Toggle Collapse"
          />
          <button
            className="control maximize"
            onClick={() => {
              sounds.playClick();
              setIsMaximized(!isMaximized);
            }}
            title="Toggle Maximize"
            aria-label="Toggle Maximize"
          />
        </div>
        <div className="window-title">bash — om@gamedev-workstation: ~ (80×24)</div>
        <div className="window-status-badge">
          <span className="terminal-live-dot" /> LIVE
        </div>
      </header>

      {!isMinimized && (
        <>
          {/* Quick command action chips */}
          <div className="terminal-quick-chips">
            <span className="chips-label">Quick Run:</span>
            {['help', 'skills', 'projects', 'contact', 'clear', 'sudo hire'].map((cmd) => (
              <button
                key={cmd}
                className="terminal-chip"
                onClick={() => handleChipClick(cmd)}
              >
                ${cmd}
              </button>
            ))}
          </div>

          <div
            className="terminal-body"
            ref={terminalBodyRef}
            onClick={() => inputRef.current && inputRef.current.focus()}
          >
            <div className="terminal-output">
              {outputLines.map((line, idx) => (
                <div key={idx} className={`terminal-line line-${line.type}`}>
                  {line.text}
                </div>
              ))}
            </div>

            {/* Input Row */}
            <div className="terminal-input-row">
              <span className="terminal-prompt">om@gamedev:~$</span>
              <input
                ref={inputRef}
                type="text"
                className="terminal-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isTypingInit ? '' : 'Type a command (try "help" or "skills")...'}
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </div>
        </>
      )}
    </article>
  );
}
