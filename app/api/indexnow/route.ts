import { NextResponse } from 'next/server'
import { getCases } from '@/lib/cases'
import { getPublishedBlogPosts } from '@/lib/blog'

const BASE_URL = 'https://phigo.se'
const INDEXNOW_KEY = 'cae0b11cf67e49c78a192df668fb82d4'

function getAllUrls(): string[] {
  const staticUrls = [BASE_URL, `${BASE_URL}/cases`, `${BASE_URL}/blogg`]
  const caseUrls = getCases().map((c) => `${BASE_URL}/cases/${c.slug}`)
  const blogUrls = getPublishedBlogPosts().map((p) => `${BASE_URL}/blogg/${p.slug}`)
  return [...staticUrls, ...caseUrls, ...blogUrls]
}

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization')
  const expectedToken = process.env.INDEXNOW_SECRET

  if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const urls = getAllUrls()

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
