// src/app/api/auth/user/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      user_metadata: user.user_metadata,
      created_at: user.created_at
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching user data' },
      { status: 500 }
    )
  }
}