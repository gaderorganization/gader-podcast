from odoo import models, fields

class PodcastCategory(models.Model):
    _name = 'gader_podcast.category'
    _description = 'Podcast Category'

    name = fields.Char(string='Name', required=True)
    color = fields.Char(string='Color', help='Hex color code for the category badge (e.g., #FF0000)')
