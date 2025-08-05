// app/api/careers/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '20')

    // Build filters
    const filters: any = { limit }
    if (category && category !== 'all') {
      filters.category = category
    }
    if (search) {
      filters.search = search
    }

    // Get careers from database
    const careers = await db.getCareers(filters)

    return NextResponse.json({
      success: true,
      data: careers,
      total: careers.length
    })

  } catch (error) {
    console.error('Careers API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Meslekler alınırken hata oluştu' 
      },
      { status: 500 }
    )
  }
}

// Get career by slug
export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json()

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug parametresi gerekli' },
        { status: 400 }
      )
    }

    const career = await db.getCareerBySlug(slug)

    if (!career) {
      return NextResponse.json(
        { success: false, error: 'Meslek bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: career
    })

  } catch (error) {
    console.error('Career detail API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Meslek detayı alınırken hata oluştu' 
      },
      { status: 500 }
    )
  }
}