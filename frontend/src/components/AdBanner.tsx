export interface Banner {
  id: number
  name: string
  target_url: string
  banner_image_url: string
}

export function AdBanner({ banner }: { banner: Banner | null }) {
  if (!banner) return null;

  const ODOO_URL = process.env.ODOO_URL || "http://localhost:8069"

  return (
    <div className="w-full max-w-5xl mx-auto my-8 overflow-hidden rounded-xl shadow-sm border border-border group">
      <a href={banner.target_url} target="_blank" rel="noreferrer" className="block relative w-full h-32 md:h-48 bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={`${ODOO_URL}${banner.banner_image_url}`} 
          alt={banner.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">
          Advertisement
        </div>
      </a>
    </div>
  )
}
