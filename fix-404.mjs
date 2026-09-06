import fs from 'node:fs';
import path from 'node:path';

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (entry.name === '404') {
        const indexPath = path.join(fullPath, 'index.html');
        const targetPath = path.join(dir, '404.html');
        
        if (fs.existsSync(indexPath)) {
          fs.renameSync(indexPath, targetPath);
          fs.rmdirSync(fullPath);
          console.log(`Renamed: ${fullPath}/index.html -> ${targetPath}`);
        }
      } else {
        processDirectory(fullPath);
      }
    }
  }
}

processDirectory('./dist');