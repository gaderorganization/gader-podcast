from odoo import http
from odoo.http import request
import json

class PodcastAPI(http.Controller):

    def _cors_headers(self):
        return {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }

    @http.route('/api/podcasts/categories', type='http', auth='public', methods=['GET', 'POST', 'OPTIONS'], csrf=False, cors='*')
    def get_categories(self, **kwargs):
        if request.httprequest.method == 'OPTIONS':
            return request.make_response('', headers=self._cors_headers())
        
        categories = request.env['gader_podcast.category'].sudo().search([])
        data = [{
            'id': cat.id,
            'name': cat.name,
            'color': cat.color
        } for cat in categories]
        
        return request.make_response(json.dumps({'result': data}), headers=dict(self._cors_headers(), **{'Content-Type': 'application/json'}))

    @http.route('/api/podcasts/episodes', type='http', auth='public', methods=['GET', 'POST', 'OPTIONS'], csrf=False, cors='*')
    def get_episodes(self, **kwargs):
        if request.httprequest.method == 'OPTIONS':
            return request.make_response('', headers=self._cors_headers())
            
        domain = [('status', '=', 'published')]
        
        category_ids = kwargs.get('category_ids')
        if category_ids:
            cat_ids = [int(cid) for cid in str(category_ids).split(',') if cid.strip().isdigit()]
            if cat_ids:
                domain.append(('category_id', 'in', cat_ids))
                
        episodes = request.env['gader_podcast.episode'].sudo().search(domain, order='publish_date desc')
        data = [{
            'id': ep.id,
            'name': ep.name,
            'youtube_url': ep.youtube_url,
            'thumbnail_url': f'/web/image/gader_podcast.episode/{ep.id}/thumbnail',
            'category': {
                'id': ep.category_id.id,
                'name': ep.category_id.name,
                'color': ep.category_id.color
            },
            'publish_date': ep.publish_date.isoformat() if ep.publish_date else None,
            'summary': ep.summary
        } for ep in episodes]
        
        return request.make_response(json.dumps({'result': data}), headers=dict(self._cors_headers(), **{'Content-Type': 'application/json'}))

    @http.route('/api/podcasts/banner', type='http', auth='public', methods=['GET', 'POST', 'OPTIONS'], csrf=False, cors='*')
    def get_active_banner(self, **kwargs):
        if request.httprequest.method == 'OPTIONS':
            return request.make_response('', headers=self._cors_headers())
            
        banner = request.env['gader_podcast.ad_banner'].sudo().search([('is_active', '=', True)], limit=1)
        data = None
        if banner:
            data = {
                'id': banner.id,
                'name': banner.name,
                'target_url': banner.target_url,
                'banner_image_url': f'/web/image/gader_podcast.ad_banner/{banner.id}/banner_image'
            }
        return request.make_response(json.dumps({'result': data}), headers=dict(self._cors_headers(), **{'Content-Type': 'application/json'}))
