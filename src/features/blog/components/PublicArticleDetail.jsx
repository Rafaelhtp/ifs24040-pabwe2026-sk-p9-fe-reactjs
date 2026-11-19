import { Suspense, lazy, useEffect, useState } from 'react'
import { getPublicPostBySlug } from '../api/blogApi'
import { formatDate } from '../../../helpers/toolsHelper'

const MarkdownViewer = lazy(() => import('../../../components/MarkdownViewer'))

export default function PublicArticleDetail({ slug, navigate, isDark }) {
  // undefined = loading, null = not found
  const [post, setPost] = useState(undefined)

  useEffect(() => {
    getPublicPostBySlug(slug).then((res) => setPost(res.status === 'success' ? res.data : null))
  }, [slug])

  if (post === undefined) return <h1 className="p-6 text-center text-xl font-semibold">Memuat...</h1>

  if (post === null) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-semibold">Artikel tidak ditemukan.</h1>
        <button type="button" className="mt-2 text-[var(--color-accent)]" onClick={() => navigate('/')}>
          Kembali
        </button>
      </div>
    )
  }

  return (
    <article className="w-full px-4 py-6 md:px-10">
      <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
        {post.author_name} · {formatDate(post.published_at)} · {post.category} ·{' '}
        {post.reading_time} menit baca
      </p>
      {post.cover_image && (
        <img src={post.cover_image} alt={post.title} className="mb-6 max-h-96 w-full rounded object-cover" />
      )}
      <Suspense fallback={<div className="py-4 text-sm text-gray-600 dark:text-gray-300">Memuat konten...</div>}>
        <MarkdownViewer content={post.content} darkMode={isDark} />
      </Suspense>
    </article>
  )
}
