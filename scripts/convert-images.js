
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const walkSync = (dir, filelist = []) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            filelist = walkSync(filepath, filelist);
        } else {
            filelist.push(filepath);
        }
    });
    return filelist;
};

const convertImages = async () => {
    const publicDir = path.join(process.cwd(), 'public');
    const files = walkSync(publicDir);
    const imageExtensions = ['.png', '.jpg', '.jpeg'];

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (imageExtensions.includes(ext)) {
            const newFile = file.replace(ext, '.webp');
            console.log(`Converting: ${file} -> ${newFile}`);
            try {
                await sharp(file)
                    .webp({ quality: 80 })
                    .toFile(newFile);
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        }
    }
};

convertImages();
