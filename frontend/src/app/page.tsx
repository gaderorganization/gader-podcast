import { FilterSystem } from "@/components/FilterSystem"
import { PodcastGrid } from "@/components/PodcastGrid"
import { AdBanner } from "@/components/AdBanner"

export const dynamic = 'force-dynamic'

async function getCategories() {
  const ODOO_URL = process.env.ODOO_URL || "http://localhost:8069"
  const ODOO_DB = process.env.ODOO_DB || ""
  const dbQuery = ODOO_DB ? `?db=${ODOO_DB}` : ""
  try {
    const res = await fetch(`${ODOO_URL}/api/podcasts/categories${dbQuery}`, {
      cache: 'no-store'
    })
    const data = await res.json()
    return data.result || []
  } catch (error) {
    console.error("Failed to fetch categories", error)
    return []
  }
}

async function getEpisodes(categoryIds: string[]) {
  const ODOO_URL = process.env.ODOO_URL || "http://localhost:8069"
  const ODOO_DB = process.env.ODOO_DB || ""
  try {
    const dbParam = ODOO_DB ? `db=${ODOO_DB}` : ""
    const catParam = categoryIds.length > 0 ? `category_ids=${categoryIds.join(',')}` : ""
    const params = [dbParam, catParam].filter(Boolean).join('&')
    const query = params ? `?${params}` : ''
    
    const res = await fetch(`${ODOO_URL}/api/podcasts/episodes${query}`, {
      cache: 'no-store'
    })
    const data = await res.json()
    return data.result || []
  } catch (error) {
    console.error("Failed to fetch episodes", error)
    return []
  }
}

async function getAdBanner() {
  const ODOO_URL = process.env.ODOO_URL || "http://localhost:8069"
  const ODOO_DB = process.env.ODOO_DB || ""
  const dbQuery = ODOO_DB ? `?db=${ODOO_DB}` : ""
  try {
    const res = await fetch(`${ODOO_URL}/api/podcasts/banner${dbQuery}`, {
      cache: 'no-store'
    })
    const data = await res.json()
    return data.result || null
  } catch (error) {
    console.error("Failed to fetch ad banner", error)
    return null
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  let categoryIds: string[] = []
  if (params.category) {
    categoryIds = Array.isArray(params.category) ? params.category : [params.category]
  }

  const [categories, episodes, banner] = await Promise.all([
    getCategories(),
    getEpisodes(categoryIds),
    getAdBanner()
  ])

  return (
    <main className="min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Gader Podcast Platform</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          Curated discussions, expert insights, and engaging conversations for the youth.
        </p>
      </header>

      <div className="container mx-auto px-4 mt-8">
        <AdBanner banner={banner} />

        <div className="my-12">
          <FilterSystem categories={categories} />
        </div>

        <PodcastGrid episodes={episodes} />
      </div>
    </main>
  )
}
