/**
 * siteConfig.js
 * ─────────────
 * Single source of truth for every piece of personal / portfolio data
 * used across the site.
 */

// ── Personal ────────────────────────────────────────────────────────
export const personal = {
  name: 'OM',
  fullName: 'Om Thorat',
  title: 'Gameplay & Systems Programmer',
  roleSubtitle: 'C++ / C# / Game Engine Architecture / Unity',
  department: 'Engineering Dept // Level 02',
  badgeId: 'ID: 0x8F9B2C',
  location: 'Available Globally / Remote',
  avatar: './images/avatar.jpg',
  status: 'OPEN FOR OPPORTUNITIES',
  bio: 'Systems and gameplay programmer passionate about physics simulation, cache-friendly architecture, and responsive combat feel.',
};

// ── Contact ─────────────────────────────────────────────────────────
export const contact = {
  email: 'thoratom33@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/om-thorat-623630299',
  linkedinLabel: 'om-thorat-623630299',
  githubUrl: 'https://github.com/omthorat986',
  githubLabel: 'omthorat986',
  resumeUrl: '#dossier',
};

// ── Terminal Bio ────────────────────────────────────────────────────
export const terminalLines = [
  '~ $ ./execute_profile.sh --verbose',
  '> [INIT] Loading Game Systems Core...',
  '> [ARCH] Memory Arena initialized (Cache-aligned 64B)',
  '> [READY] Om Thorat // Gameplay & Engine Programmer',
  '> Type "help" or click quick chips to inspect systems.',
];

// ── Skills ──────────────────────────────────────────────────────────
export const codeSkills = [
  { name: 'C++', level: '90%', desc: 'Modern C++ (17/20), pointers, memory management, cache locality' },
  { name: 'C#', level: '92%', desc: 'OOP, generics, LINQ, Unity runtime scripting, delegate events' },
  { name: 'Java', level: '80%', desc: 'Data structures, algorithms, object-oriented architecture' },
  { name: 'Python', level: '78%', desc: 'Tooling, automation, prototyping, math simulations' },
  { name: 'SQL', level: '75%', desc: 'Relational database schema design, state persistence' },
  { name: 'JavaScript', level: '80%', desc: 'Web integrations, tooling UI, interactive frontends' },
];

export const toolSkills = [
  { name: 'Unity', level: '90%', desc: 'Custom inspectors, physics, particle VFX, profiling' },
  { name: 'OpenGL', level: '78%', desc: 'Shader programming (GLSL), rendering pipeline, buffers' },
  { name: 'Direct3D / Vulkan', level: '74%', desc: 'Low-level graphics concepts, draw call optimization' },
  { name: 'Git & Perforce', level: '88%', desc: 'Branching strategies, version control workflows' },
  { name: 'RenderDoc', level: '82%', desc: 'Frame capture, draw call inspection, shader debugging' },
  { name: 'Visual Studio', level: '92%', desc: 'Native C++ profiling, memory dump analysis, debugging' },
];

// ── Skill Tree Levels ───────────────────────────────────────────────
export const skillLevels = [
  {
    level: 1,
    icon: 'Ⅰ',
    title: 'C# & C++ Fundamentals',
    subtitle: 'Base Architecture',
    description:
      'Core programming paradigms, OOP (classes, inheritance, polymorphism, enums), multi-dimensional arrays, data structures, and console algorithms.',
    mastery: 'Mastered',
    tags: ['OOP', 'Data Structures', 'Memory Models', 'Algorithms'],
  },
  {
    level: 2,
    icon: 'Ⅱ',
    title: 'Core Game Systems',
    subtitle: 'Mechanics & Simulation',
    description:
      'Building responsive player controllers, combat logic, raycast collision detection, inventory management, and grid-based movement loops.',
    mastery: 'Active Focus',
    tags: ['Player Controllers', 'Combat State Machine', 'Raycasting', 'Inventories'],
  },
  {
    level: 3,
    icon: 'Ⅲ',
    title: 'Gameplay & Engine Architecture',
    subtitle: 'Production & Optimization',
    description:
      'Custom engine pipelines, cache-friendly entity component systems, spatial partitioning, behavior trees for tactical AI, and 60 FPS profiling.',
    mastery: 'Advanced Craft',
    tags: ['ECS', 'Spatial Hash', 'Behavior Trees', 'Profiler Optimization'],
  },
];

// ── Sticky Note ─────────────────────────────────────────────────────
export const stickyNote = {
  heading: 'URGENT BUG!',
  body: 'Double-check broadphase AABB spatial partitioning before Friday milestone build!',
  signature: '- Lead Dev',
  timestamp: '11:42 PM',
};

// ── Fallback Projects (Enriched) ────────────────────────────────────
export const fallbackProjects = [
  {
    id: 1,
    title: 'Project: OVERDRIVE',
    role: 'Engine Architecture & Optimization',
    engineUsed: 'C++ / Direct3D 12',
    image: './images/project_overdrive.jpg',
    description:
      'High-performance cybernetic vehicular combat engine designed for massive entity simulations with a solid 60 FPS lock.',
    tags: ['C++20', 'Direct3D 12', 'ECS', 'Multithreading', 'SIMD', 'Custom Allocators'],
    highlights: [
      'Implemented data-oriented Entity Component System (ECS) managing 15,000+ simultaneous dynamic entities.',
      'Designed custom linear & pool memory allocators eliminating runtime heap fragmentation.',
      'Authored GLSL/HLSL compute passes for particle turbulence and volumetric rain reflections.',
      'Optimized draw call sorting with spatial hash partitioning, reducing draw calls below 120/frame.'
    ],
    stats: [
      { label: 'Target Frame Rate', val: '60 FPS Lock' },
      { label: 'Active Entities', val: '15,000+' },
      { label: 'Memory Budget', val: '< 256MB VRAM' },
    ],
    githubUrl: 'https://github.com/omthorat986',
    demoUrl: 'https://github.com/omthorat986',
  },
  {
    id: 2,
    title: 'Nebula Tactics',
    role: 'Tactical AI & Gameplay Systems',
    engineUsed: 'Unity (C#)',
    image: './images/project_nebula.jpg',
    description:
      'Turn-based sci-fi tactical fleet combat with adaptive behavior trees, hierarchical squad pathfinding, and dynamic difficulty scaling.',
    tags: ['C#', 'Unity HDRP', 'Behavior Trees', 'A* Pathfinding', 'Hex Grid', 'Dynamic AI'],
    highlights: [
      'Engineered hierarchical behavior tree system for autonomous fleet wings (flanking, defensive screens, focus fire).',
      'Implemented multi-threaded burst-compiled A* pathfinding over non-Euclidean hex matrices.',
      'Created real-time telemetry analyzer predicting player advantage and adapting enemy tactical aggression.',
      'Developed custom hex-grid visualizer and shader-driven fog-of-war.'
    ],
    stats: [
      { label: 'Simultaneous Drones', val: '500+ Ships' },
      { label: 'Pathfinding Tick', val: '0.8ms' },
      { label: 'AI Decision Nodes', val: '48 Nodes' },
    ],
    githubUrl: 'https://github.com/omthorat986',
    demoUrl: 'https://github.com/omthorat986',
  },
];

// ── Confidential Dossier (Resume) ───────────────────────────────────
export const dossierData = {
  clearanceLevel: 'LEVEL 4 // ACTIVE AGENT',
  codeName: 'OM THORAT',
  specialization: 'GAMEPLAY & SYSTEMS PROGRAMMING',
  summary:
    'Dedicated gameplay and engine developer with an obsessive focus on code performance, memory locality, and silky-smooth game feel. Proven ability to craft custom engine modules, tactical AI behavior systems, and responsive game mechanics in C++ and C#.',
  experience: [
    {
      period: '2024 - Present',
      role: 'Gameplay & Systems Developer',
      company: 'Indie Game Projects & Open Source',
      bullets: [
        'Built custom C++ physics & entity simulation pipelines achieving 60 FPS performance locks.',
        'Engineered reusable Unity gameplay modules for combat systems, player movement, and inventory.',
        'Profiled performance bottlenecks using Visual Studio Diagnostics and RenderDoc.'
      ],
    },
    {
      period: '2023 - 2024',
      role: 'Game Programming Fellow',
      company: 'Independent Game Labs',
      bullets: [
        'Implemented console-based game prototypes in C# to master OOP patterns and algorithmic state machines.',
        'Developed algorithms for A* pathfinding, raycast intersections, and procedural level generation.'
      ],
    },
  ],
  education: {
    degree: 'Bachelor of Computer Applications / Computer Science',
    focus: 'Software Engineering & Interactive Game Systems',
    honors: 'Systems Programming & Algorithms Focus',
  },
  keyCompetencies: [
    'Object-Oriented Design & ECS Paradigms',
    'Custom Memory Allocation (Pool / Linear / Stack)',
    'Real-time Collision & Broadphase Spatial Hashing',
    'Behavior Trees & Autonomous Steering Agents',
    'Cross-Platform Git & Perforce Workflows',
  ],
};
