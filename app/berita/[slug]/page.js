import NewsDetailPageClient from '@/components/NewsDetailPageClient'

// Ini adalah 'resep dapur' dinamis (Server) untuk preview link
export async function generateMetadata({ params }) {
  try {
    const slug = params.slug;
    // Pastikan URL ini adalah URL production Anda
    const response = await fetch(`https://dipasena-makmur.vercel.app/api/news/${slug}`);
    
    if (!response.ok) {
      return { title: 'Berita Tidak Ditemukan' };
    }

    const result = await response.json();
    const news = result.data;

    if (!news) {
      return { title: 'Berita Tidak Ditemukan' };
    }

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
    console.error('Failed to generate metadata:', error);
    return { 
      title: 'Error Memuat Berita', 
      description: 'Gagal memuat metadata untuk berita ini.' 
    };
  }
}

// Ini adalah komponen Server yang memanggil komponen Client Anda
export default function NewsDetailPage({ params }) {
  // Kita meneruskan 'params' dari Server ke Client sebagai props
  return <NewsDetailPageClient params={params} />
}