import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'

const created = []
vi.mock('@toast-ui/editor', () => ({
  default: {
    factory: vi.fn((opts) => {
      const v = { opts, destroy: vi.fn() }
      created.push(v)
      return v
    }),
  },
}))
vi.mock('@toast-ui/editor/dist/toastui-editor.css', () => ({}))
vi.mock('@toast-ui/editor/dist/theme/toastui-editor-dark.css', () => ({}))

import MarkdownViewer from './MarkdownViewer'

describe('MarkdownViewer', () => {
  beforeEach(() => { created.length = 0 })

  it('renders with defaults', () => {
    const { getByTestId, unmount } = render(<MarkdownViewer />)
    expect(getByTestId('markdown-viewer')).toBeInTheDocument()
    expect(created[0].opts).toMatchObject({ viewer: true, initialValue: '', theme: 'light' })
    unmount()
    expect(created[0].destroy).toHaveBeenCalled()
  })

  it('renders content in dark mode and re-creates on change', () => {
    const { rerender } = render(<MarkdownViewer content="# hi" darkMode />)
    expect(created[0].opts).toMatchObject({ initialValue: '# hi', theme: 'dark' })
    rerender(<MarkdownViewer content="# bye" darkMode />)
    expect(created).toHaveLength(2)
    expect(created[0].destroy).toHaveBeenCalled()
  })
})
