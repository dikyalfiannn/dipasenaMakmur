'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Head from 'next/head' // <-- 1. Tambahkan import ini
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowLeft } from 'lucide-react'

export default function NewsDetailPageClient() {
  const params = useParams()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/news/${params.slug}`)
        const data = await response.json()
        if (data.success) {
          setNews(data.data)
        } else {
          setError('Berita tidak ditemukan')
        }
      } catch (err) {
        setError('Terjadi kesalahan saat memuat berita')
      } finally {
        setLoading(false)
      }
    }

    if (params && params.slug) {
      fetchNews()
    } else if (params) {
      setLoading(false)
      setError('Slug berita tidak ditemukan di URL.')
    }
  }, [params])

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // ... (kode untuk 'loading' dan 'error' tidak berubah)
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        {/* ... sisa kode loading ... */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        {/* ... sisa kode error ... */}
      </div>
    );
  }


  return (
    <>
      {/* 2. TAMBAHKAN BLOK HEAD DI SINI */}
      <Head>
        <title>{news?.title}</title>
        <meta name="description" content={news?.excerpt} />
        {/* Ini adalah bagian terpenting untuk WhatsApp/Facebook */}
        <meta property="og:title" content={news?.title} />
        <meta property="og:description" content={news?.excerpt} />
        <meta property="og:image" content={news?.coverImage} />
        <meta property="og:url" content={`https://dipasena-makmur.vercel.app/berita/${news?.slug}`} />
        <meta property="og:type" content="article" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            {/* ... sisa kode JSX Anda yang sudah benar ... */}
            <div className="mb-6">
              <Button asChild variant="outline">
                <Link href="/berita">
                  <ArrowLeft size={16} className="mr-2" />
                  Kembali ke Berita
                </Link>
              </Button>
            </div>
            <Card className="rounded-2xl shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{news?.title}</h1>
                  <div className="flex items-center text-gray-800 mb-6">
                    <Calendar size={16} className="mr-2" />
                    {formatDate(news?.createdAt)}
                  </div>
                </div>
                {news?.coverImage && (
                  <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                    <Image src={news.coverImage} alt={news.title} fill className="object-cover" />
                  </div>
                )}
                <div className="text-gray-900 leading-relaxed whitespace-pre-wrap text-lg">
                  {news?.content}
                </div>
              </CardContent>
            </Card>
            {/* ... sisa kode JSX Anda ... */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}