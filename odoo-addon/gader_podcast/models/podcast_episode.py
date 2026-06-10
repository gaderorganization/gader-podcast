from odoo import models, fields

class PodcastEpisode(models.Model):
    _name = 'gader_podcast.episode'
    _description = 'Podcast Episode'
    _order = 'publish_date desc'

    name = fields.Char(string='Title', required=True)
    youtube_url = fields.Char(string='YouTube URL', required=True)
    thumbnail = fields.Image(string='Thumbnail')
    category_id = fields.Many2one('gader_podcast.category', string='Category', required=True)
    status = fields.Selection([
        ('draft', 'Draft'),
        ('published', 'Published')
    ], string='Status', default='draft', required=True)
    publish_date = fields.Datetime(string='Publish Date', default=fields.Datetime.now)
    summary = fields.Text(string='AI-Generated Summary')
