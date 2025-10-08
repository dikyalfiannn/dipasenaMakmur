'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Eye } from 'lucide-react'

export default function BeritaPage() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news')
      const data = await response.json()
      if (data.success) {
        setNews(data.data)
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
      
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <Card className="rounded-2xl shadow-lg bg-white mb-8">
            <CardContent className="text-center p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Berita Kampung</h1>
              <p className="text-xl text-gray-700">
                Informasi terkini dari Kampung Bumi Dipasena Makmur
              </p>
            </CardContent>
          </Card>

          {/* News Grid */}
          <Card className="rounded-2xl shadow-lg bg-white">
            <CardContent className="p-8">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : news.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {news.map((article) => (
                    <Link key={article.id} href={`/berita/${article.slug}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                        <div className="relative h-48">
                          <Image
                            src={article.coverImage || 'https://images.unsplash.com/photo-1442544213729-6a15f1611937'}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-6 flex flex-col justify-between flex-grow">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">
                              {article.title}
                            </h3>
                            <p className="text-gray-800 mb-4 line-clamp-3">
                              {article.excerpt}
                            </p>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600 mt-auto">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              {formatDate(article.createdAt)}
                            </div>
                            <div className="flex items-center text-green-600 font-medium">
                              <Eye size={14} className="mr-1" />
                              Baca
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="mb-4">
                    <Calendar size={64} className="mx-auto text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Belum Ada Berita
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Belum ada berita yang dipublikasikan. Silakan kembali lagi nanti.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
      
      <Footer />
    </div>
  )
}
