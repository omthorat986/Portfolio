import React from 'react';
import './StickyNote.css';

export default function StickyNote() {
  return (
    <article className="sticky-note shadow-md">
      <div className="sticky-pin"></div>
      <div className="sticky-content">
        <h3>URGENT!</h3>
        <p>Fix collision detection logic in physics engine before Friday demo!</p>
        <p className="sticky-signature">- T.</p>
      </div>
    </article>
  );
}
