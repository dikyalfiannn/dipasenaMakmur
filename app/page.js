'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Users, FileText, Phone } from 'lucide-react'

export const metadata = {
  title: 'Beranda | Website Resmi Kampung Bumi Dipasena Makmur',
  description: 'Selamat datang di website resmi Kampung Bumi Dipasena Makmur. Temukan informasi terbaru, profil, struktur organisasi, dan layanan kampung.',
  openGraph: {
    title: 'Beranda | Website Resmi Kampung Bumi Dipasena Makmur',
    description: 'Selamat datang di website resmi Kampung Bumi Dipasena Makmur.',
    images: [
      {
        // Saya ambil URL gambar ini dari Hero Section di kode Anda
        url: 'https://customer-assets.emergentagent.com/job_desadipasena/artifacts/shnka1zd_ChatGPT%20Image%20Sep%2019%2C%202025%2C%2003_05_16%20AM.png', 
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function HomePage() {
  const [latestNews, setLatestNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLatestNews()
  }, [])

  const fetchLatestNews = async () => {
    try {
      const response = await fetch('/api/news')
      const data = await response.json()
      if (data.success) {
        setLatestNews(data.data.slice(0, 3))
      }
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="https://customer-assets.emergentagent.com/job_desadipasena/artifacts/shnka1zd_ChatGPT%20Image%20Sep%2019%2C%202025%2C%2003_05_16%20AM.png"
            alt="Desa Bumi Dipasena Makmur"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              DESA BUMI DIPASENA MAKMUR
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Maju Bersama, Makmur Bersama
            </p>
            <p className="text-lg mb-8 opacity-90">
              Kecamatan Rawajitu Timur, Kabupaten Tulang Bawang, Lampung
            </p>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/profil">Lihat Profil Lengkap</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Berita Terbaru Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="rounded-2xl shadow-lg bg-white">
            <CardContent className="p-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Berita Terbaru</h2>
                <p className="text-gray-700">Informasi terkini dari Kampung Bumi Dipasena Makmur</p>
              </div>
              
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : latestNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  {latestNews.map((news) => (
                    <Link key={news.id} href={`/berita/${news.slug}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="relative h-48">
                          <Image
                            src={news.coverImage || 'https://images.unsplash.com/photo-1442544213729-6a15f1611937'}
                            alt={news.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{news.title}</h3>
                          <p className="text-sm text-gray-700 mb-3 line-clamp-2">{news.excerpt}</p>
                          <div className="flex items-center text-xs text-gray-600">
                            <Calendar size={14} className="mr-1" />
                            {formatDate(news.createdAt)}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-700">Belum ada berita terbaru.</p>
                </div>
              )}
              
              <div className="text-center">
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/berita">Lihat Semua Berita</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Profil & Layanan Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="rounded-2xl shadow-lg bg-white">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Profil Singkat */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Profil Kampung</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Kampung Bumi Dipasena Makmur adalah salah satu dari delapan kampung di Kecamatan Rawajitu Timur, 
                    Kabupaten Tulang Bawang. Terbentuk dari program tambak inti rakyat (TIR) terpadu untuk budidaya udang, 
                    dimana masyarakat setempat menjadi petambak plasma dengan PT Dipasena Citra Darmaja (PT DCD) sebagai perusahaan inti.
                  </p>
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    Kampung ini secara resmi didirikan pada tahun 2001 dan terus berkembang menjadi kawasan pertanian 
                    dan perikanan yang produktif dengan luas wilayah sekitar 2.016,19 hektar.
                  </p>
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <Link href="/profil">Lihat Profil Lengkap</Link>
                  </Button>
                </div>

                {/* Layanan Cards */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Layanan Kampung</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex items-center">
                        <FileText className="text-green-600 mr-4" size={24} />
                        <div>
                          <h3 className="font-semibold text-gray-900">Surat Pengantar</h3>
                          <p className="text-sm text-gray-700">Pelayanan surat pengantar untuk berbagai keperluan</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex items-center">
                        <Users className="text-green-600 mr-4" size={24} />
                        <div>
                          <h3 className="font-semibold text-gray-900">Informasi Publik</h3>
                          <p className="text-sm text-gray-700">Akses informasi publik dan transparansi kampung</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex items-center">
                        <Phone className="text-green-600 mr-4" size={24} />
                        <div>
                          <h3 className="font-semibold text-gray-900">Kontak Aparatur</h3>
                          <p className="text-sm text-gray-700">Hubungi aparatur kampung untuk konsultasi</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
