import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'

const client = new MongoClient(process.env.MONGO_URL)
const secret = new TextEncoder().encode('your-secret-key-change-in-production')

// Database connection
async function connectDB() {
  if (!client.topology?.isConnected()) {
    await client.connect()
  }
  return client.db(process.env.DB_NAME || 'desa_dipasena')
}

// JWT Helper functions
async function signToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(secret)
}

async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}

// GET Routes
export async function GET(request) {
  const { pathname } = new URL(request.url)
  
  try {
    const db = await connectDB()

    // Get all news
    if (pathname === '/api/news') {
      const news = await db.collection('news').find({}).sort({ createdAt: -1 }).toArray()
      return NextResponse.json({ success: true, data: news })
    }

    // Get single news by slug
    if (pathname.startsWith('/api/news/')) {
      const slug = pathname.split('/').pop()
      const news = await db.collection('news').findOne({ slug })
      
      if (!news) {
        return NextResponse.json({ success: false, message: 'Berita tidak ditemukan' }, { status: 404 })
      }
      
      return NextResponse.json({ success: true, data: news })
    }

    // Test route
    if (pathname === '/api/' || pathname === '/api') {
      return NextResponse.json({ success: true, message: 'API is working!' })
    }

    return NextResponse.json({ success: false, message: 'Route not found' }, { status: 404 })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}

// POST Routes
export async function POST(request) {
  const { pathname } = new URL(request.url)
  
  try {
    const db = await connectDB()

    // Admin login
    if (pathname === '/api/auth/login') {
      const { username, password } = await request.json()
      
      // Simple hardcoded admin for now - in production, store in database
      if (username === 'admin' && password === 'admin123') {
        const token = await signToken({ username, role: 'admin' })
        return NextResponse.json({ 
          success: true, 
          token,
          message: 'Login berhasil' 
        })
      }
      
      return NextResponse.json({ success: false, message: 'Username atau password salah' }, { status: 401 })
    }

    // Create news
    if (pathname === '/api/news') {
      const authHeader = request.headers.get('authorization')
      // PERBAIKAN: Mengganti "?." dengan pengecekan eksplisit
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ success: false, message: 'Token required' }, { status: 401 })
      }

      const token = authHeader.split(' ')[1]
      const payload = await verifyToken(token)
      if (!payload) {
        return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 })
      }

      const { title, content, excerpt, coverImage } = await request.json()
      
      // Create slug from title
      const slug = title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()

      const news = {
        id: uuidv4(),
        slug,
        title,
        content,
        excerpt,
        coverImage: coverImage || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      await db.collection('news').insertOne(news)
      return NextResponse.json({ success: true, data: news, message: 'Berita berhasil dibuat' })
    }

    return NextResponse.json({ success: false, message: 'Route not found' }, { status: 404 })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}

// PUT Routes
export async function PUT(request) {
  const { pathname } = new URL(request.url)
  
  try {
    const db = await connectDB()

    // Update news
    if (pathname.startsWith('/api/news/')) {
      const authHeader = request.headers.get('authorization')
      // PERBAIKAN: Mengganti "?." dengan pengecekan eksplisit
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ success: false, message: 'Token required' }, { status: 401 })
      }

      const token = authHeader.split(' ')[1]
      const payload = await verifyToken(token)
      if (!payload) {
        return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 })
      }

      const slug = pathname.split('/').pop()
      const { title, content, excerpt, coverImage } = await request.json()
      
      const updatedNews = {
        title,
        content,
        excerpt,
        coverImage: coverImage || '',
        updatedAt: new Date().toISOString()
      }

      const result = await db.collection('news').updateOne(
        { slug },
        { $set: updatedNews }
      )

      if (result.matchedCount === 0) {
        return NextResponse.json({ success: false, message: 'Berita tidak ditemukan' }, { status: 404 })
      }

      return NextResponse.json({ success: true, message: 'Berita berhasil diupdate' })
    }

    return NextResponse.json({ success: false, message: 'Route not found' }, { status: 404 })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}

// DELETE Routes
export async function DELETE(request) {
  const { pathname } = new URL(request.url)
  
  try {
    const db = await connectDB()

    // Delete news
    if (pathname.startsWith('/api/news/')) {
      const authHeader = request.headers.get('authorization')
      // PERBAIKAN: Mengganti "?." dengan pengecekan eksplisit
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ success: false, message: 'Token required' }, { status: 401 })
      }

      const token = authHeader.split(' ')[1]
      const payload = await verifyToken(token)
      if (!payload) {
        return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 })
      }

      const slug = pathname.split('/').pop()
      const result = await db.collection('news').deleteOne({ slug })

      if (result.deletedCount === 0) {
        return NextResponse.json({ success: false, message: 'Berita tidak ditemukan' }, { status: 404 })
      }

      return NextResponse.json({ success: true, message: 'Berita berhasil dihapus' })
    }

    return NextResponse.json({ success: false, message: 'Route not found' }, { status: 404 })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}