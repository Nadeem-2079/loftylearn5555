import fs from 'fs';
import path from 'path';

const SRC_DIR = './src/pages';

function removeGridBg(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            removeGridBg(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('GridBg')) {
                content = content.replace(/import\s+GridBg\s+from\s+['"][^'"]+GridBg['"];?/g, '');
                content = content.replace(/<GridBg[^>]*\/>/g, '');
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Removed GridBg from ${fullPath}`);
            }
        }
    }
}

removeGridBg(SRC_DIR);
console.log('Finished removing GridBg');
