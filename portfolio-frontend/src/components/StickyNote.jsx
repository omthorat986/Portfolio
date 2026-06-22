import React from 'react';
import { stickyNote } from '../siteConfig';
import './StickyNote.css';

export default function StickyNote() {
  return (
    <article className="sticky-note shadow-md">
      <div className="sticky-pin"></div>
      <div className="sticky-content">
        <h3>{stickyNote.heading}</h3>
        <p>{stickyNote.body}</p>
        <p className="sticky-signature">{stickyNote.signature}</p>
      </div>
    </article>
  );
}
