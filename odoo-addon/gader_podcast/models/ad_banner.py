from odoo import models, fields

class AdBanner(models.Model):
    _name = 'gader_podcast.ad_banner'
    _description = 'Advertisement Banner'

    name = fields.Char(string='Name', required=True)
    banner_image = fields.Image(string='Banner Image', required=True)
    target_url = fields.Char(string='Target URL', required=True)
    is_active = fields.Boolean(string='Is Active', default=True)
