from odoo import http
from odoo.http import request

class PodcastAPI(http.Controller):

    @http.route('/api/podcasts/categories', type='json', auth='public', cors='*')
    def get_categories(self, **kwargs):
        categories = request.env['gader_podcast.category'].sudo().search([])
        return [{
            'id': cat.id,
            'name': cat.name,
            'color': cat.color
        } for cat in categories]

    @http.route('/api/podcasts/episodes', type='json', auth='public', cors='*')
    def get_episodes(self, category_ids=None, **kwargs):
        domain = [('status', '=', 'published')]
        if category_ids:
            domain.append(('category_id', 'in', category_ids))
            
        episodes = request.env['gader_podcast.episode'].sudo().search(domain, order='publish_date desc')
        return [{
            'id': ep.id,
            'name': ep.name,
            'youtube_url': ep.youtube_url,
            # For simplicity returning thumbnail as URL if you set it up, but in Odoo Image fields are base64
            # Next.js will need to handle base64 images or a special image route. Let's return a route for it.
            'thumbnail_url': f'/web/image/gader_podcast.episode/{ep.id}/thumbnail',
            'category': {
                'id': ep.category_id.id,
                'name': ep.category_id.name,
                'color': ep.category_id.color
            },
            'publish_date': ep.publish_date.isoformat() if ep.publish_date else None,
            'summary': ep.summary
        } for ep in episodes]

    @http.route('/api/podcasts/banner', type='json', auth='public', cors='*')
    def get_active_banner(self, **kwargs):
        banner = request.env['gader_podcast.ad_banner'].sudo().search([('is_active', '=', True)], limit=1)
        if banner:
            return {
                'id': banner.id,
                'name': banner.name,
                'target_url': banner.target_url,
                'banner_image_url': f'/web/image/gader_podcast.ad_banner/{banner.id}/banner_image'
            }
        return None
