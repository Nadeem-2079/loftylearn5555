const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
    { search: /rgba\(115,\s*230,\s*69,/g, replace: 'rgba(197, 209, 199,' },
    { search: /#162D1A/gi, replace: '#0b2b10' },
    { search: /#203F25/gi, replace: '#114218' },
    { search: /#2B4F34/gi, replace: '#195c24' },
    { search: /#366242/gi, replace: '#207328' },
    { search: /#73E645/gi, replace: '#C5D1C7' },
    { search: /#458A27/gi, replace: '#98A699' },
    { search: /#F1FBF3/gi, replace: '#F0F4F1' },
    { search: /#A6CCA6/gi, replace: '#899E8C' },
    { search: /#6E8F6E/gi, replace: '#627865' }
];

function processPath(dirPath) {
    const items = fs.readdirSync(dirPath);
    for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processPath(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;
            for (const { search, replace } of replacements) {
                if (search.test(content)) {
                    content = content.replace(search, replace);
                    changed = true;
                }
            }
            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

processPath(srcDir);
console.log('Done!');
