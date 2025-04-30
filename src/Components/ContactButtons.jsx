import { useState }                                      from 'react'
import { Mail, Github, Gamepad2, Check, ClipboardCheck } from 'lucide-react'
import { FaDiscord }                                     from 'react-icons/fa'
import { SiItchdotio }                                   from 'react-icons/si'

function ContactButtons () {
  const [copied, setCopied] = useState(false)

  const copyDiscord = async () => {
    try {
      await navigator.clipboard.writeText('requieem#0001')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    catch (err) {
      console.error('Failed to copy Discord handle:', err)
    }
  }

  const buttonStyle =
    'w-full aspect-square hover:bg-white/40 transition-all flex items-center justify-center bg-white/35 backdrop-blur-2xl shadow-inner shadow-black rounded-lg'

  const iconContainer = 'w-2/3 h-2/3 flex items-center justify-center scale-90 hover:scale-105 transition-all ease-in-out duration-200 about-image'

  return (
    <div className="w-full max-w-4xl grid grid-cols-4 gap-4">
      <button
        onClick={() => window.open('mailto:farace.marco@outlook.it')}
        title="Email"
        className={buttonStyle}
      >
        <div className={iconContainer}>
          <Mail
            className="w-full h-full text-[#0078D4]"/>
        </div>
      </button>

      <button
        onClick={copyDiscord}
        title="Copy Discord handle"
        className={buttonStyle}
      >
        <div className={iconContainer}>
          {copied ? (
            <ClipboardCheck className="w-full h-full text-green-300"/>
          ) : (
            <FaDiscord className="w-full h-full text-[#5865F2]"/>
          )}
        </div>
      </button>

      <button
        onClick={() => window.open('https://github.com/requieem', '_blank')}
        title="GitHub"
        className={buttonStyle}
      >
        <div className={iconContainer}>
          <Github className="w-full h-full text-[#181717]"/>
        </div>
      </button>

      <button
        onClick={() => window.open('https://requieem.itch.io', '_blank')}
        title="Itch.io"
        className={buttonStyle}
      >
        <div className={iconContainer}>
          <SiItchdotio className="w-full h-full text-[#FA5C5C]"/>
        </div>
      </button>
    </div>
  )
}

export default ContactButtons