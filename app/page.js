import HomePageClient from '@/components/HomePageClient'

// Ini adalah 'resep dapur' (Server) untuk preview link
export const metadata = {
  title: 'Beranda | Website Resmi Kampung Bumi Dipasena Makmur',
  description: 'Selamat datang di website resmi Kampung Bumi Dipasena Makmur. Temukan informasi terbaru, profil, struktur organisasi, dan layanan kampung.',
  openGraph: {
    title: 'Beranda | Website Resmi Kampung Bumi Dipasena Makmur',
    description: 'Selamat datang di website resmi Kampung Bumi Dipasena Makmur.',
    images: [
      {
        url: 'https://customer-assets.emergentagent.com/job_desadipasena/artifacts/shnka1zd_ChatGPT%20Image%20Sep%2019%2C%202025%2C%2003_05_16%20AM.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

// Ini adalah komponen Server yang tugasnya memanggil komponen Client Anda
export default function HomePage() {
  return <HomePageClient />
}