import React from 'react';
import './FloppyDisk.css';

export default function FloppyDisk() {
  return (
    <a href="https://github.com/omthorat986" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block', cursor: 'pointer' }} title="Visit GitHub Repository">
      <article className="floppy-disk shadow-xl">
        <div className="floppy-shutter">
          <div className="shutter-slide"></div>
        </div>
        
        <div className="floppy-label-area">
          <div className="floppy-top-arrows">
            <span>&darr;</span>
          </div>
          
          <div className="floppy-sticker">
            <div className="sticker-stripes"></div>
            <h3>GITHUB.EXE</h3>
            <p>Repository Backups</p>
            <p className="capacity">1.44 MB</p>
          </div>
        </div>
        
        <div className="floppy-bottom-notch"></div>
      </article>
    </a>
  );
}
