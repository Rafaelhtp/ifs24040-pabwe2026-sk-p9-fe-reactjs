import { useEffect, useRef } from 'react'
import Viewer from '@toast-ui/editor/viewer'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'

export default function MarkdownViewer({ content = '', darkMode = false }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const viewer = new Viewer({
      el: containerRef.current,
      initialValue: content,
      theme: darkMode ? 'dark' : 'light',
    })
    return () => viewer.destroy()
  }, [content, darkMode])

  return (
    <div
      data-testid="markdown-viewer"
      className="w-full max-w-full overflow-x-auto break-words"
      ref={containerRef}
    />
  )
}
