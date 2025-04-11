// Refactored PostTabs with responsive layout and polished transitions
import React, { useEffect, useRef, useState } from 'react'
import PropTypes                              from 'prop-types'
import {
  FaArrowLeft,
  FaArrowRight,
  FaClipboard,
  FaClipboardCheck,
  FaExpand,
  FaFileImage,
}                                             from 'react-icons/fa'
import { FaCircleXmark, FaX }                 from 'react-icons/fa6'
import { atomOneDark, CodeBlock }             from 'react-code-blocks'
import PageModel                              from '../Models/PageModel.js'

function TabsNavigation (props) {
  return <div className="relative flex justify-center items-center gap-5">
    <button onClick={props.onClick} className="text-white text-lg">
      <FaArrowLeft/>
    </button>
    <div
      className="flex gap-1 px-2 py-1 rounded-lg bg-yinmn-blue/25 border border-yinmn-blue shadow-inner backdrop-blur-md">
      {Array.from({ length: props.length }).map(props.callbackfn)}
    </div>
    <button onClick={props.onClick1} className="text-white text-lg">
      <FaArrowRight/>
    </button>
  </div>
}

TabsNavigation.propTypes = {
  onClick: PropTypes.func,
  length: PropTypes.any,
  callbackfn: PropTypes.func,
  onClick1: PropTypes.func,
}

function PostTabs ({ model }) {
  const [index, setIndex] = useState(0)
  const [docsOpen, setDocsOpen] = useState(false)
  const [imageOpen, setImageOpen] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [codeCopied, setCodeCopied] = useState(false)
  const [touchStartX, setTouchStartX] = useState(null)

  const codeBlock = model.codeBlocks[index] || {}
  const docText = model.docs[index] || ''
  const imageSrc = model.images[index] || ''

  useEffect(() => {
    setCodeCopied(false)
  }, [index])

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeBlock.text.trimEnd())
      setCodeCopied(true)
    }
    catch (e) {
      console.error('Clipboard error:', e)
      setCodeCopied(false)
    }
  }

  const prev = () => setIndex((prev) => (
                                          prev - 1 + model.maxIndex
                                        ) % model.maxIndex)
  const next = () => setIndex((prev) => (
                                          prev + 1
                                        ) % model.maxIndex)

  const toggleDocs = () => {
    setDocsOpen(!docsOpen)
    if (!docsOpen) setImageOpen(false)
  }

  const toggleImage = () => {
    setImageOpen(!imageOpen)
    if (!imageOpen) setDocsOpen(false)
  }

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return
    const touchEndX = e.changedTouches[0].clientX
    const deltaX = touchEndX - touchStartX
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) prev()
      else next()
    }
    setTouchStartX(null)
  }

  const getPanelSizeClass = (panel) => {
    const full = 'basis-full grow shrink transition-all duration-500 z-30'
    const half = 'basis-1/2 grow shrink transition-all duration-500 z-20'
    const hidden = 'basis-0 grow-0 shrink transition-all duration-500 opacity-0 pointer-events-none z-10'

    if (imageOpen && panel === 'image') return full
    if (docsOpen && panel === 'docs') return full
    if (!imageOpen && !docsOpen) return half
    return hidden
  }

  return (
    <div className="z-0 w-full h-[32rem] relative flex flex-col select-none">
      <div className="flex-1 relative flex overflow-hidden rounded-lg">
        <div className="p-2 flex flex-col sm:flex-row w-full h-full">
          {/* Image Panel */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className={`group relative overflow-hidden rounded-lg bg-black/15 mr-0 sm:mr-1 mb-2 sm:mb-0 ${getPanelSizeClass('image')}`}
          >
            {imageSrc ? (
              <img src={imageSrc} alt="slide" className="w-full h-full object-cover"/>
            ) : (
              <FaFileImage className="w-full h-full text-gray-500"/>
            )}
            <button
              onClick={toggleImage}
              className="absolute inset-0 flex items-center justify-center hover:bg-black/50 group-hover:opacity-100 opacity-0 transition"
            >
              {imageOpen ? <FaX className="text-white text-2xl"/> : <FaExpand className="text-white text-2xl"/>}
            </button>
          </div>
          {/* Navigation */}
          <div className={'block sm:hidden'}>
            <TabsNavigation onClick={prev} length={model.maxIndex} callbackfn={(_, i) => (
              <button
                key={`dot_${i}`}
                onClick={() => setIndex(i)}
                className={`rounded-full transition-all ease-in-out duration-200 ${index === i
                  ? 'bg-white w-4 h-2'
                  : 'bg-white/50 w-2 h-2'}`}
              />
            )} onClick1={next}/>
          </div>
          {/* Docs/Code Panel */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className={`relative overflow-hidden rounded-lg bg-gradient-to-br from-yinmn-blue to-oxford-blue mt-2 sm:mt-0 ml-0 sm:ml-1 ${getPanelSizeClass('docs')}`}
          >
            <div className="text-platinum flex items-center justify-between px-4 py-2 bg-oxford-blue">
              <div className="flex gap-4">
                <button className="hover:underline" onClick={() => setShowCode(false)}>Docs</button>
                <button
                  className={`hover:underline ${!codeBlock.text ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!codeBlock.text}
                  onClick={() => codeBlock.text && setShowCode(true)}
                >
                  Code
                </button>
              </div>
              <div className="flex gap-3 items-center justify-end grow">
                <button onClick={copyCode} className="text-xl">
                  {showCode && codeCopied ? <FaClipboardCheck className="text-amber-300"/> : showCode
                    ? <FaClipboard/>
                    : null}
                </button>
                <button onClick={toggleDocs} className="text-xl">
                  {docsOpen ? <FaCircleXmark/> : <FaExpand/>}
                </button>
              </div>
            </div>
            <div className="h-full overflow-auto pb-3">
              {showCode && codeBlock.text ? (
                <div className="bg-[#282C34] pb-10">
                  <CodeBlock
                    language={codeBlock.language}
                    text={codeBlock.text}
                    showLineNumbers
                    theme={atomOneDark}
                  />
                </div>
              ) : (
                <div className="text-platinum text-justify text-sm leading-relaxed px-3 pt-2">
                  {docText}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={'hidden sm:block'}>
        {/* Navigation */}
        <TabsNavigation onClick={prev} length={model.maxIndex} callbackfn={(_, i) => (
          <button
            key={`dot_${i}`}
            onClick={() => setIndex(i)}
            className={`rounded-full transition-all ease-in-out duration-200 ${index === i
              ? 'bg-white w-4 h-2'
              : 'bg-white/50 w-2 h-2'}`}
          />
        )} onClick1={next}/>
      </div>

    </div>
  )
}

PostTabs.propTypes = {
  model: PropTypes.instanceOf(PageModel).isRequired,
}

export default PostTabs