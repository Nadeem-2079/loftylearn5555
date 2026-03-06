import fs from 'fs';
import path from 'path';

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;

            if (content.includes("'Syne'")) {
                content = content.replace(/'Syne'/g, "'Plus Jakarta Sans'");
                changed = true;
            }
            if (content.includes("'Outfit'")) {
                content = content.replace(/'Outfit'/g, "'Plus Jakarta Sans'");
                changed = true;
            }
            if (content.includes("'Instrument Sans'")) {
                content = content.replace(/'Instrument Sans'/g, "'Inter'");
                changed = true;
            }

            // Check for exact grid string
            const gridStr1 = "backgroundImage: `linear-gradient(rgba(248,248,248,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(248,248,248,0.06) 1px,transparent 1px)`";
            const gridStr2 = "backgroundImage:`linear-gradient(rgba(248,248,248,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(248,248,248,0.06) 1px,transparent 1px)`";
            const gridStr3 = "linear-gradient(rgba(248,248,248,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(248,248,248,0.06) 1px,transparent 1px)";

            if (content.includes(gridStr1)) {
                content = content.split(gridStr1).join('background: "transparent"');
                changed = true;
            }
            if (content.includes(gridStr2)) {
                content = content.split(gridStr2).join('background: "transparent"');
                changed = true;
            }
            if (content.includes(gridStr3)) {
                content = content.split(gridStr3).join('transparent');
                changed = true;
            }

            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
            }
        }
    }
}

replaceInDir('./src');
