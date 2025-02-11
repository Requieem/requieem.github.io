class PageModel {
    /** @type {string[]} */
    images;
    /** @type {{text: string, language: string}[]} */
    codeBlocks;
    /** @type {string[]} */
    docs;

    constructor(images = /** @type {string[]} */ [], codeBlocks = /** @type {{text: string, language: string}[]} */ [], docs = /** @type {string[]} */ []) {
        this.images = images;
        this.codeBlocks = codeBlocks;
        this.docs = docs;
    }

    get maxIndex() {
        return Math.max(this.images.length, this.codeBlocks.length, this.docs.length);
    }
}

export default PageModel;