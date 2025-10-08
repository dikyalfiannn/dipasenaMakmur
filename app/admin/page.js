'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Eye, Edit, Trash2, Plus, LogOut } from 'lucide-react'

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [news, setNews] = useState([])
  const [editingNews, setEditingNews] = useState(null)
  const [newsForm, setNewsForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: ''
  })

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      fetchNews()
    }
  }, [isLoggedIn])

  const checkAuth = () => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      setIsLoggedIn(true)
    }
    setLoading(false)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      })
      
      const data = await response.json()
      
      if (data.success) {
        localStorage.setItem('admin_token', data.token)
        setIsLoggedIn(true)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat login')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setIsLoggedIn(false)
    setNews([])
    setEditingNews(null)
    setNewsForm({ title: '', excerpt: '', content: '', coverImage: '' })
    toast.success('Berhasil logout')
  }

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news')
      const data = await response.json()
      if (data.success) {
        setNews(data.data)
      }
    } catch (error) {
      toast.error('Gagal memuat berita')
    }
  }

  const handleSubmitNews = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const token = localStorage.getItem('admin_token')
    const url = editingNews ? `/api/news/${editingNews.slug}` : '/api/news'
    const method = editingNews ? 'PUT' : 'POST'
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newsForm)
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast.success(data.message)
        fetchNews()
        setNewsForm({ title: '', excerpt: '', content: '', coverImage: '' })
        setEditingNews(null)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  const handleEditNews = (newsItem) => {
    setEditingNews(newsItem)
    setNewsForm({
      title: newsItem.title,
      excerpt: newsItem.excerpt,
      content: newsItem.content,
      coverImage: newsItem.coverImage
    })
  }

  const handleDeleteNews = async (slug) => {
    if (!confirm('Yakin ingin menghapus berita ini?')) return
    
    const token = localStorage.getItem('admin_token')
    
    try {
      const response = await fetch(`/api/news/${slug}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast.success(data.message)
        fetchNews()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Terjadi kesalahan')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-black font-bold">
              Admin Panel
            </CardTitle>
            <p className="text-center text-gray-800 font-medium">
              Kampung Bumi Dipasena Makmur
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-gray-800 font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-800 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
                {loading ? 'Loading...' : 'Login'}
              </Button>
            </form>
            
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-black">
              Admin Panel - Kampung Bumi Dipasena Makmur
            </h1>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* News Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-black">
                <Plus size={20} className="mr-2" />
                {editingNews ? 'Edit Berita' : 'Tambah Berita Baru'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitNews} className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-gray-800 font-medium">Judul Berita</Label>
                  <Input
                    id="title"
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                    placeholder="Masukkan judul berita..."
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="excerpt" className="text-gray-800 font-medium">Ringkasan</Label>
                  <Textarea
                    id="excerpt"
                    value={newsForm.excerpt}
                    onChange={(e) => setNewsForm({...newsForm, excerpt: e.target.value})}
                    placeholder="Ringkasan singkat berita..."
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="coverImage" className="text-gray-800 font-medium">URL Gambar Cover</Label>
                  <Input
                    id="coverImage"
                    value={newsForm.coverImage}
                    onChange={(e) => setNewsForm({...newsForm, coverImage: e.target.value})}
                    placeholder="https://example.com/image.jpg (opsional)"
                  />
                </div>
                
                <div>
                  <Label htmlFor="content" className="text-gray-800 font-medium">Isi Berita</Label>
                  <Textarea
                    id="content"
                    value={newsForm.content}
                    onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
                    placeholder="Tulis isi berita di sini..."
                    rows={8}
                    required
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                    {loading ? 'Menyimpan...' : editingNews ? 'Update Berita' : 'Simpan Berita'}
                  </Button>
                  {editingNews && (
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setEditingNews(null)
                        setNewsForm({ title: '', excerpt: '', content: '', coverImage: '' })
                      }}
                    >
                      Batal
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* News List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Daftar Berita ({news.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {news.length > 0 ? news.map((newsItem) => (
                  <div key={newsItem.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <h3 className="font-semibold mb-2 line-clamp-2 text-black">{newsItem.title}</h3>
                    <p className="text-sm text-gray-700 mb-2 line-clamp-2">{newsItem.excerpt}</p>
                    <p className="text-xs text-gray-600 mb-3">{formatDate(newsItem.createdAt)}</p>
                    
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`/berita/${newsItem.slug}`, '_blank')}
                      >
                        <Eye size={14} className="mr-1" />
                        Lihat
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditNews(newsItem)}
                      >
                        <Edit size={14} className="mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteNews(newsItem.slug)}
                      >
                        <Trash2 size={14} className="mr-1" />
                        Hapus
                      </Button>
                    </div>
                  </div>
                )) : (
                  <p className="text-center text-gray-700 py-8">Belum ada berita</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Tutorial */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-black">
              <span>Panduan Penggunaan Admin Panel</span>
              <Button 
                asChild 
                variant="outline" 
                size="sm"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
               
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-black">Cara Menambah Berita:</h4>
                <ol className="text-sm text-gray-700 space-y-1">
                  <li>1. Isi form "Tambah Berita Baru" di sebelah kiri</li>
                  <li>2. Judul harus menarik dan informatif</li>
                  <li>3. Ringkasan berisi poin-poin penting (1-2 kalimat)</li>
                  <li>4. URL gambar bisa dari internet atau kosong</li>
                  <li>5. Isi berita tulis dengan lengkap dan jelas</li>
                  <li>6. Klik "Simpan Berita"</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-black">Tips Menulis Berita:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Gunakan bahasa yang mudah dipahami</li>
                  <li>• Berikan informasi yang akurat</li>
                  <li>• Tambahkan detail waktu dan tempat</li>
                  <li>• Sertakan foto jika ada</li>
                  <li>• Koreksi sebelum menyimpan</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
