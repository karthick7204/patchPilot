const fs = require('fs');
const path = require('path');

const files = [
  'c:/patchPilot/frontend/src/app/page.tsx',
  'c:/patchPilot/frontend/src/components/Sidebar.tsx',
  'c:/patchPilot/frontend/src/components/IssueDetailModal.tsx',
  'c:/patchPilot/frontend/src/app/dashboard/page.tsx',
  'c:/patchPilot/frontend/src/app/issues/page.tsx',
  'c:/patchPilot/frontend/src/components/PatchEditor.tsx',
  'c:/patchPilot/frontend/src/app/editor/[id]/page.tsx'
];

const replacements = [
  { search: /bg-\[#0d1117\]/g, replace: 'bg-white' },
  { search: /bg-\[#161b22\]/g, replace: 'bg-[#f6f8fa]' },
  { search: /text-\[#c9d1d9\]/g, replace: 'text-[#24292f]' },
  { search: /text-\[#8b949e\]/g, replace: 'text-[#57606a]' },
  { search: /border-\[#30363d\]/g, replace: 'border-[#d0d7de]' },
  { search: /hover:bg-\[#30363d\]/g, replace: 'hover:bg-[#f3f4f6]' },
  { search: /bg-\[#238636\]/g, replace: 'bg-[#2da44e]' },
  { search: /hover:bg-\[#2ea043\]/g, replace: 'hover:bg-[#2c974b]' },
  { search: /text-\[#58a6ff\]/g, replace: 'text-[#0969da]' },
  { search: /border-\[#f0f6fc1a\]/g, replace: 'border-[rgba(27,31,36,0.15)]' },
  
  { search: /bg-\[#2ea04326\]/g, replace: 'bg-[#e6ffec]' },
  { search: /text-\[#3fb950\]/g, replace: 'text-[#1a7f37]' },
  { search: /border-\[#2ea043\]/g, replace: 'border-[#4ac26b]/40' },

  { search: /bg-\[#388bfd26\]/g, replace: 'bg-[#ddf4ff]' },
  { search: /border-\[#388bfd\]/g, replace: 'border-[#54aeff]/40' },

  { search: /bg-\[#ff7b7226\]/g, replace: 'bg-[#ffebe9]' },
  { search: /bg-\[#ff7b724d\]/g, replace: 'bg-[#ffdce0]' },
  { search: /bg-\[#2ea0434d\]/g, replace: 'bg-[#ccffd8]' },

  { search: /hover:bg-\[#21262d\]/g, replace: 'hover:bg-[#ebecf0]' },

  // For editor/[id]/page.tsx
  { search: /border-\[#58a6ff\]\/20/g, replace: 'border-[#0969da]/20' },
  { search: /border-t-\[#58a6ff\]/g, replace: 'border-t-[#0969da]' }
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    replacements.forEach(r => {
      content = content.replace(r.search, r.replace);
    });
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
