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
  { search: /bg-white/g, replace: 'bg-white dark:bg-[#0d1117]' },
  { search: /bg-\[#f6f8fa\]/g, replace: 'bg-[#f6f8fa] dark:bg-[#161b22]' },
  { search: /text-\[#24292f\]/g, replace: 'text-[#24292f] dark:text-[#c9d1d9]' },
  { search: /text-\[#57606a\]/g, replace: 'text-[#57606a] dark:text-[#8b949e]' },
  { search: /border-\[#d0d7de\]/g, replace: 'border-[#d0d7de] dark:border-[#30363d]' },
  { search: /hover:bg-\[#f3f4f6\]/g, replace: 'hover:bg-[#f3f4f6] dark:hover:bg-[#30363d]' },
  { search: /bg-\[#2da44e\]/g, replace: 'bg-[#2da44e] dark:bg-[#238636]' },
  { search: /hover:bg-\[#2c974b\]/g, replace: 'hover:bg-[#2c974b] dark:hover:bg-[#2ea043]' },
  { search: /text-\[#0969da\]/g, replace: 'text-[#0969da] dark:text-[#58a6ff]' },
  { search: /border-\[rgba\(27,31,36,0\.15\)\]/g, replace: 'border-[rgba(27,31,36,0.15)] dark:border-[#f0f6fc1a]' },
  
  { search: /bg-\[#e6ffec\]/g, replace: 'bg-[#e6ffec] dark:bg-[#2ea04326]' },
  { search: /text-\[#1a7f37\]/g, replace: 'text-[#1a7f37] dark:text-[#3fb950]' },
  { search: /border-\[#4ac26b\]\/40/g, replace: 'border-[#4ac26b]/40 dark:border-[#2ea043]' },

  { search: /bg-\[#ddf4ff\]/g, replace: 'bg-[#ddf4ff] dark:bg-[#388bfd26]' },
  { search: /border-\[#54aeff\]\/40/g, replace: 'border-[#54aeff]/40 dark:border-[#388bfd]' },

  { search: /bg-\[#ffebe9\]/g, replace: 'bg-[#ffebe9] dark:bg-[#ff7b7226]' },
  { search: /bg-\[#ffdce0\]/g, replace: 'bg-[#ffdce0] dark:bg-[#ff7b724d]' },
  { search: /bg-\[#ccffd8\]/g, replace: 'bg-[#ccffd8] dark:bg-[#2ea0434d]' },

  { search: /hover:bg-\[#ebecf0\]/g, replace: 'hover:bg-[#ebecf0] dark:hover:bg-[#21262d]' },
  { search: /hover:bg-gray-200/g, replace: 'hover:bg-gray-200 dark:hover:bg-[#21262d]' },

  { search: /border-\[#0969da\]\/20/g, replace: 'border-[#0969da]/20 dark:border-[#58a6ff]/20' },
  { search: /border-t-\[#0969da\]/g, replace: 'border-t-[#0969da] dark:border-t-[#58a6ff]' }
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Quick guard to prevent double-replacements
    if (content.includes('dark:bg-[#0d1117]')) {
       console.log(`Skipping ${file} - already processed`);
       return;
    }

    replacements.forEach(r => {
      content = content.replace(r.search, r.replace);
    });
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
