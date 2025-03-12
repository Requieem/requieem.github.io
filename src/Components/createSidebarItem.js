/**
 * Creates a sidebar item.
 * @param {string} text - The text of the sidebar item.
 * @param {JSX.Element} icon - The icon of the sidebar item.
 * @param {() => void} action - The function to call when the sidebar item is clicked.
 * @returns {SidebarInfo} A sidebar item object.
 */
const createSidebarItem = (text, icon, action) => (
  {
    text,
    icon,
    action,
  }
)

export default createSidebarItem