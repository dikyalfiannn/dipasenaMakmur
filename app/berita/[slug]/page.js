import NewsDetailPageClient from '@/components/NewsDetailPageClient'

export async function generateMetadata({ params }) {
  try {
    const slug = params.slug;
    const response = await fetch(`https://dipasena-makmur.vercel.app/api/news/${slug}`);
    if (!response.ok) return { title: 'Berita Tidak Ditemukan' };
    const result = await response.json();
    const news = result.data;
    if (!news) return { title: 'Berita Tidak Ditemukan' };
    return {
      title: news.title,
      description: news.excerpt,
      openGraph: {
        title: news.title,
        description: news.excerpt,
        images: [{ url: news.coverImage, width: 1200, height: 630 }],
      },
    };
  } catch (error) {
    return { title: 'Error', description: 'Gagal memuat metadata berita.' };
  }
}

export default function NewsDetailPage({ params }) {
  return <NewsDetailPageClient params={params} />
}