import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';

const replacements = [
    { from: /93,214,44/g, to: '115,230,69' },
    { from: /93, 214, 44/g, to: '115, 230, 69' },
    { from: /5DD62C/gi, to: '73E645' },
    { from: /#0F0F0F/gi, to: '#162D1A' },
    { from: /#337418/gi, to: '#458A27' },
    { from: /#202020/gi, to: '#203F25' },
    { from: /#2a2a2a/gi, to: '#2B4F34' },
    { from: /#333333/gi, to: '#366242' },
    { from: /#A0A0A0/gi, to: '#A6CCA6' },
    { from: /#666666/gi, to: '#6E8F6E' },
    { from: /#111111|#111(?![0-9a-f])/gi, to: '#1A2E24' },
    { from: /#0a0a0a/gi, to: '#122315' }
];

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;
            for (const r of replacements) {
                if (r.from.test(content)) {
                    content = content.replace(r.from, r.to);
                    changed = true;
                }
            }
            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDir(SRC_DIR);
console.log('Done replacing colors.');
