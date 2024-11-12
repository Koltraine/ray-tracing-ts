import fs from 'fs';
import path from 'path';
import Export from './export';

const PPM_EXT = '.ppm';

class PPMExport extends Export {

    private filePath: string;

    constructor(fileName: string, directory: string = 'output') {
        super();
        this.filePath = this.generateUniqueFilePath(fileName, directory);
    }

    private generateUniqueFilePath(fileName: string, directory: string): string {
        let filePath = path.join(process.cwd(), directory, `${fileName}${PPM_EXT}`);
        let counter = 1;

        while (fs.existsSync(filePath)) {
            filePath = path.join(process.cwd(), directory, `${fileName}-${counter}${PPM_EXT}`);
            counter++;
        }

        return filePath;
    }

    export(data: string): void {
        fs.writeFileSync(this.filePath, data, 'utf8');
    }
}

export default PPMExport;
