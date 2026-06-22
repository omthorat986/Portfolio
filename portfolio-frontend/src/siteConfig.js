/**
 * siteConfig.js
 * ─────────────
 * Single source of truth for every piece of personal / portfolio data
 * used across the site. Update values here instead of hunting through
 * individual components.
 */

// ── Personal ────────────────────────────────────────────────────────
export const personal = {
  name: 'OM',
  fullName: 'Om Thorat',
  title: 'Gameplay & Systems Programmer',
  department: 'Engineering Dept // Level 02',
  badgeId: 'ID: 0x8F9B2C',
};

// ── Contact ─────────────────────────────────────────────────────────
export const contact = {
  email: 'thoratom33@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/om-thorat-623630299',
  linkedinLabel: 'linkedin.com/in/om-thorat-623630299',
  githubUrl: 'https://github.com/omthorat986',
  githubLabel: 'github.com/omthorat986',
  resumeUrl: '#', // Replace with an actual URL when available
};

// ── Terminal Bio ────────────────────────────────────────────────────
export const terminalLines = [
  '~ $ ./execute_profile.sh',
  '> Loading Game Developer...',
  '> 1+ years compiling code and drinking coffee.',
];

// ── Skills ──────────────────────────────────────────────────────────
export const codeSkills = ['C++', 'C#', 'Java', 'Python', 'SQL', 'JavaScript'];
export const toolSkills = ['Unity', 'OpenGL', 'Git', 'Perforce'];

// ── Skill Tree Levels ───────────────────────────────────────────────
export const skillLevels = [
  {
    icon: 'Ⅰ',
    title: 'C# Fundamentals',
    description:
      'Core C# programming, OOP (classes, constructors, enums), arrays (1D, 2D, jagged), and console-based problem solving.',
  },
  {
    icon: 'Ⅱ',
    title: 'Core Game Systems',
    description:
      'Building gameplay systems like player mechanics, combat logic, inventory systems, and grid-based movement.',
  },
  {
    icon: 'Ⅲ',
    title: 'Gameplay & Systems Development',
    description:
      'Developing interactive console-based games and preparing for Unity-based game development.',
  },
];

// ── Sticky Note ─────────────────────────────────────────────────────
export const stickyNote = {
  heading: 'URGENT!',
  body: 'Fix collision detection logic in physics engine before Friday demo!',
  signature: '- T.',
};

// ── Fallback Projects ───────────────────────────────────────────────
export const fallbackProjects = [
  {
    id: 1,
    title: 'Project: OVERDRIVE',
    role: 'Engine Architecture',
    engineUsed: 'C++ / Direct3D',
    description: 'Key optimizations achieved targeting 60FPS lock under massive entity counts.',
  },
  {
    id: 2,
    title: 'Nebula Tactics',
    role: 'AI Programming',
    engineUsed: 'Unity',
    description: 'Strategic AI opponents with dynamic difficulty scaling and adaptive behavior trees.',
  },
];
