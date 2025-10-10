import NewsDetailPageClient from '@/components/NewsDetailPageClient'

// Fungsi generateMetadata sudah dihapus
// Kita hanya akan menampilkan komponen client
export default function NewsDetailPage({ params }) {
  return <NewsDetailPageClient params={params} />
}