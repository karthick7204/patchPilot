const fs = require('fs');
const path = require('path');

const files = [
  'c:/patchPilot/frontend/src/app/page.tsx',
  'c:/patchPilot/frontend/src/components/Sidebar.tsx',
  'c:/patchPilot/frontend/src/components/IssueDetailModal.tsx',
  'c:/patchPilot/frontend/src/app/dashboard/page.tsx',
  'c:/patchPilot/frontend/src/app/issues/page.tsx',
  'c:/patchPilot/frontend/src/components/PatchEditor.tsx'
];

const replacements = [
  { search: /bg-white/g, replace: 'bg-[#0d1117]' },
  { search: /bg-\[#f6f8fa\]/g, replace: 'bg-[#161b22]' },
  { search: /text-\[#24292f\]/g, replace: 'text-[#c9d1d9]' },
  { search: /text-\[#57606a\]/g, replace: 'text-[#8b949e]' },
  { search: /border-\[#d0d7de\]/g, replace: 'border-[#30363d]' },
  { search: /hover:bg-\[#f3f4f6\]/g, replace: 'hover:bg-[#30363d]' },
  { search: /bg-\[#2da44e\]/g, replace: 'bg-[#238636]' },
  { search: /hover:bg-\[#2c974b\]/g, replace: 'hover:bg-[#2ea043]' },
  { search: /text-\[#0969da\]/g, replace: 'text-[#58a6ff]' },
  { search: /border-\[rgba\(27,31,36,0\.15\)\]/g, replace: 'border-[#f0f6fc1a]' },
  
  // Specific statuses
  { search: /bg-\[#dafbe1\]/g, replace: 'bg-[#2ea04326]' },
  { search: /text-\[#1a7f37\]/g, replace: 'text-[#3fb950]' },
  { search: /border-\[#4ac26b\]\/40/g, replace: 'border-[#2ea043]' },
  { search: /bg-\[#daefdc\]/g, replace: 'bg-[#2ea04326]' },

  { search: /bg-\[#ddf4ff\]/g, replace: 'bg-[#388bfd26]' },
  { search: /border-\[#54aeff\]\/40/g, replace: 'border-[#388bfd]' },
  { search: /bg-\[#ddeefe\]/g, replace: 'bg-[#388bfd26]' },

  // Diffs
  { search: /bg-\[#ffebe9\]/g, replace: 'bg-[#ff7b7226]' },
  { search: /bg-\[#ffdce0\]/g, replace: 'bg-[#ff7b724d]' },
  { search: /bg-\[#e6ffec\]/g, replace: 'bg-[#2ea04326]' },
  { search: /bg-\[#ccffd8\]/g, replace: 'bg-[#2ea0434d]' },
  { search: /text-\[#6e7781\]/g, replace: 'text-[#8b949e]' },

  // Sidebar active hover
  { search: /hover:bg-\[#ebecf0\]/g, replace: 'hover:bg-[#21262d]' },
  { search: /hover:bg-gray-200/g, replace: 'hover:bg-[#21262d]' },
  { search: /hover:bg-\[#e0e4e8\]/g, replace: 'hover:bg-[#30363d]' },
  { search: /text-black/g, replace: 'text-[#c9d1d9]' }
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
