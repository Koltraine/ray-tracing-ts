import Export from './export';

class JPGExport extends Export {
    private filename: string;

    constructor(filename: string) {
        super()
        this.filename = filename;
    }

    export(content: string): void {
        // TODO
    }
}

export default JPGExport;
