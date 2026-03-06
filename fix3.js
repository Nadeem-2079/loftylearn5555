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

            // Global Font Unification to Poppins
            const fontsToReplace = ["'Syne'", "'Outfit'", "'Plus Jakarta Sans'", "'Instrument Sans'", "'Inter'"];
            fontsToReplace.forEach(font => {
                if (content.includes(font)) {
                    content = content.replace(new RegExp(font, 'g'), "'Poppins'");
                    changed = true;
                }
            });
            // Also catch without quotes just in case (e.g., globals)
            if (content.includes("font-family: 'Inter'")) {
                content = content.replace(/font-family: 'Inter'/g, "font-family: 'Poppins'");
                changed = true;
            }
            if (content.includes("font-family: 'Plus Jakarta Sans'")) {
                content = content.replace(/font-family: 'Plus Jakarta Sans'/g, "font-family: 'Poppins'");
                changed = true;
            }

            // Currency swap
            if (content.includes("$")) {
                // We must be careful not to replace template literal variables like ${...}
                // A Regex that matches a literal $ not followed by a {
                content = content.replace(/\$(?!\{)/g, "₹");
                changed = true;
            }

            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
            }
        }
    }
}

replaceInDir('./src');
