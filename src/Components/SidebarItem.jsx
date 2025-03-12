import React from 'react'

/**
 *
 * @param {Object} props - The properties of the component
 * @param {String} props.text - The text of the sidebar item
 * @param {JSX.Element} props.icon - The icon of the sidebar item
 * @param {Boolean} props.selected - Whether the sidebar item is selected
 * @param {Function} props.onClick - The function to call when the sidebar item is clicked
 * @returns {JSX.Element} - A JSX Element representing a sidebar item
 */
function SidebarItem (props) {
  return (
    <button
      onClick={props.onClick}
      className={`w-full h-10 flex flex-row items-center group hover:sidebar-item-selected pl-3 ${props.selected
        ? 'sidebar-item-selected' : null}`}>
      <div
        className={`h-10 p-2 flex flex-row items-center group hover:scale-110 transition-all hover:pl-[17.5px] ${props.selected
          ? 'pl-[17.5px] scale-110' : null} duration-150 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]`}>
        <div
          style={{
            background: 'var(--color-gradient-light)',
          }}
          className={'rounded-3xl w-0 h-1 group-hover:mr-2 group-hover:w-5 transform-origin-left transition-all '
                     + `duration-150 ease-[cubic-bezier(0.34, 1.56,0.64, 1)] ${props.selected ? 'mr-2 w-5' : null}`}/>
        {props.icon}
        <p
          className={`text-sm text-left ml-2 ${props.selected
            ? 'font-semibold text-amber-300'
            : null} text-text-light group-hover:text-amber-300 font-extralight group-hover:font-semibold `}>
          {props.text}
        </p>
      </div>
    </button>
  )
}

export default SidebarItem