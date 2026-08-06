import { NextResponse } from 'next/server'
import { BASE_URL, getAllIndexableUrls } from '@/lib/site-urls'

const INDEXNOW_KEY = 'cae0b11cf67e49c78a192df668fb82d4'

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization')
  const expectedToken = process.env.INDEXNOW_SECRET

  if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const urls = getAllIndexableUrls()

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host: 'phigo.se',
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  })

  if (!response.ok) {
    return NextResponse.json(
      { error: 'IndexNow request failed', status: response.status },
      { status: 502 }
    )
  }

  return NextResponse.json({ submitted: urls.length, urls })
}
