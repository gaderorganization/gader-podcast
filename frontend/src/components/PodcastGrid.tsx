import Image from "next/image"

export interface Episode {
  id: number
  name: string
  youtube_url: string
  thumbnail_url: string
  category: { id: number, name: string, color: string }
  publish_date: string
  summary: string
}

export function PodcastGrid({ episodes }: { episodes: Episode[] }) {
  if (!episodes || episodes.length === 0) {
    return <div className="text-center text-muted-foreground mt-12">No episodes found.</div>
  }

  const ODOO_URL = process.env.ODOO_URL || "http://localhost:8069"

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {episodes.map(episode => (
        <div key={episode.id} className="group relative rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <a href={episode.youtube_url} target="_blank" rel="noreferrer" className="block relative aspect-video bg-muted overflow-hidden">
            {/* We use standard img here as Odoo thumbnail urls might not be configured in Next.js domains */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={`${ODOO_URL}${episode.thumbnail_url}`} 
              alt={episode.name}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm" style={{ backgroundColor: episode.category.color || 'var(--color-primary)' }}>
              {episode.category.name}
            </div>
          </a>
          <div className="p-5">
            <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              <a href={episode.youtube_url} target="_blank" rel="noreferrer">{episode.name}</a>
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {episode.summary}
            </p>
            <div className="text-xs text-muted-foreground">
              {new Date(episode.publish_date).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
