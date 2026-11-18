import { useEffect, useRef } from 'react'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'

export default function MarkdownViewer({ content = '', darkMode = false }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const viewer = Editor.factory({
      el: containerRef.current,
      viewer: true,
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
