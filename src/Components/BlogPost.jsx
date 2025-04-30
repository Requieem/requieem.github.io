import React from 'react'

/**
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onClose - Callback to close the modal
 * @param {JSXElement} props.markdown - Markdown string to render
 */
export default function BlogPost ({ isOpen, onClose, markdown }) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-99 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="w-full h-full relative rounded-lg overflow-clip flex flex-row justify-stretch items-stretch"
        onClick={(e) => e.stopPropagation()} // prevent outside click from closing
      >
        <div
          className={'m-5 md:m-10 bg-white text-black dark:text-white overflow-y-auto rounded-lg shadow-xl p-6 sm:p-10 relative'}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500 text-2xl font-bold"
          >
            ×
          </button>
          <div>
            {markdown}
          </div>
        </div>
      </div>
    </div>
  )
}