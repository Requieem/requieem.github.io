class PageModel {
  /** @type {string} */
  title
  /** @type {string} */
  description
  /** @type {string} */
  poster
  /** @type {Element} */
  icon
  /** @type {string[]} */
  images
  /** @type {{text: string, language: string}[]} */
  codeBlocks
  /** @type {string[]} */
  docs
  /** @type {string[]} */
  tags

  constructor (
    title = /** string */ '', description = /** string */ '', poster = /** string */ '', icon = /** Element */ null,
    images = /** @type {string[]} */ [],
    codeBlocks = /** @type {{text: string, language: string}[]} */ [], docs = /** @type {string[]} */ [],
    tags = /** @type {string[]} */ [],
  ) {
    this.title = title
    this.description = description
    this.poster = poster
    this.icon = icon
    this.images = images
    this.codeBlocks = codeBlocks
    this.docs = docs
    this.tags = tags
  }

  get maxIndex () {
    return Math.max(this.images.length, this.codeBlocks.length, this.docs.length)
  }
}

export default PageModel