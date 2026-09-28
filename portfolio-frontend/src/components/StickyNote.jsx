import React, { useState } from 'react';
import { sounds } from '../utils/soundEffects';
import './StickyNote.css';

const DEFAULT_TASKS = [
  { id: 1, text: 'Fix broadphase AABB spatial hash leak', done: true },
  { id: 2, text: 'Profile ECS memory allocation under 60 FPS', done: true },
  { id: 3, text: 'Finalize boss battle state machine demo', done: false },
];

export default function StickyNote({ onToast }) {
  const [tasks, setTasks] = useState(DEFAULT_TASKS);

  const toggleTask = (id) => {
    sounds.playClick();
    const updated = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    setTasks(updated);

    const allCompleted = updated.every((t) => t.done);
    if (allCompleted) {
      sounds.playSuccessChirp();
      if (onToast) onToast('All milestone sprint tasks checked! 🚀');
    }
  };

  const completedCount = tasks.filter((t) => t.done).length;

  return (
    <article className="sticky-note shadow-md" tabIndex={0}>
      <div className="sticky-pin"></div>
      <div className="sticky-content">
        <div className="sticky-header">
          <h3>SPRINT LOG // DEMO</h3>
          <span className="sticky-counter">
            {completedCount}/{tasks.length}
          </span>
        </div>

        <ul className="sticky-task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`sticky-task-item ${task.done ? 'task-done' : ''}`}
              onClick={() => toggleTask(task.id)}
            >
              <span className="task-checkbox">{task.done ? '☑' : '☐'}</span>
              <span className="task-text">{task.text}</span>
            </li>
          ))}
        </ul>

        <div className="sticky-footer">
          <p className="sticky-timestamp">Due: Friday 18:00</p>
          <p className="sticky-signature">- Om &amp; Lead</p>
        </div>
      </div>
    </article>
  );
}
