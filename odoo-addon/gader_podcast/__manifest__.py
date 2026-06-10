{
    'name': 'Gader Podcast',
    'version': '18.0.1.0',
    'summary': 'Podcast Curation Platform for Youth Association',
    'description': 'Manage podcast episodes, categories, and ad banners.',
    'category': 'Website',
    'author': 'Your Name',
    'website': 'https://www.example.com',
    'depends': ['base', 'web'],
    'data': [
        'security/ir.model.access.csv',
        'views/podcast_category_views.xml',
        'views/ad_banner_views.xml',
        'views/podcast_episode_views.xml',
        'views/menu_views.xml',
    ],
    'installable': True,
    'application': True,
}
