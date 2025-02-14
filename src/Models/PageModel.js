class PageModel {
    /** @type {string} */
    title;
    /** @type {string} */
    description;
    /** @type {string[]} */
    images;
    /** @type {{text: string, language: string}[]} */
    codeBlocks;
    /** @type {string[]} */
    docs;

    constructor(title = /** string */ "", description = /** string */ "", images = /** @type {string[]} */ [], codeBlocks = /** @type {{text: string, language: string}[]} */ [], docs = /** @type {string[]} */ []) {
        this.title = title;
        this.description = description;
        this.images = images;
        this.codeBlocks = codeBlocks;
        this.docs = docs;
    }

    get maxIndex() {
        return Math.max(this.images.length, this.codeBlocks.length, this.docs.length);
    }
}

export default PageModel;