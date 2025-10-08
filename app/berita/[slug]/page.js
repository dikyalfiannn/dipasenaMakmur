'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowLeft } from 'lucide-react'

export default function NewsDetailPage() {
  const params = useParams()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (params.slug) {
      fetchNews()
    }
  }, [params.slug])

  const fetchNews = async () => {
    try {
      const response = await fetch(`/api/news/${params.slug}`)
      const data = await response.json()
      
      if (data.success) {
        setNews(data.data)
      } else {
        setError('Berita tidak ditemukan')
      }
    } catch (error) {
      console.error('Error fetching news:', error)
      setError('Terjadi kesalahan saat memuat berita')
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="rounded-2xl shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-6"></div>
                  <div className="h-64 bg-gray-300 rounded mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="rounded-2xl shadow-lg bg-white">
              <CardContent className="p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Berita Tidak Ditemukan</h1>
                <p className="text-gray-800 mb-6">{error}</p>
                <Button asChild>
                  <Link href="/berita">
                    <ArrowLeft size={16} className="mr-2" />
                    Kembali ke Berita
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Back Button */}
          <div className="mb-6">
            <Button asChild variant="outline">
              <Link href="/berita">
                <ArrowLeft size={16} className="mr-2" />
                Kembali ke Berita
              </Link>
            </Button>
          </div>

          {/* Article Content */}
          <Card className="rounded-2xl shadow-lg bg-white">
            <CardContent className="p-8">
              
              {/* Title and Meta */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{news?.title}</h1>
                <div className="flex items-center text-gray-800 mb-6">
                  <Calendar size={16} className="mr-2" />
                  {formatDate(news?.createdAt)}
                </div>
              </div>

              {/* Cover Image */}
              {news?.coverImage && (
                <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={news.coverImage}
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="text-gray-900 leading-relaxed whitespace-pre-wrap text-lg">
                {news?.content}
              </div>

            </CardContent>
          </Card>

          {/* Related News or Back to News */}
          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/berita">Lihat Berita Lainnya</Link>
            </Button>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  )
}
