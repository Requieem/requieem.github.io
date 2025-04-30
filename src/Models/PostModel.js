class PostModel {
  /** @type {string} */
  title
  /** @type {string} */
  date
  /** @type {string} */
  src
  /** @type {Element} */
  content
  /** @type {Element} */
  icon

  constructor (
    title = /** string */ '', date = /** string */ '', src = /** string */ '', content = /** Element */ null,
    icon = /** Element */ null,
  ) {
    this.title = title
    this.date = date
    this.src = src
    this.content = content
    this.icon = icon
  }
}

export default PostModel