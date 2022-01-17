# -*- coding: utf-8 -*-
{
    'name': "Tarifas Savar",

    'summary': """
     """,

    'description': """
        Long description of module's purpose
    """,

    'author': "My Company",
    'website': "http://www.instagram.com/rockscripts",
    'category': 'Uncategorized',
    'version': '0.1',
    'depends': [
        'base',
        'fieldservice',
        'savar_tms_fms',
    ],
    'data': [
        'data/data.xml',
        'views/product_size_views.xml',
        'views/oms_pricelist_views.xml',
        'views/sale_order_views.xml',
        'views/menuitem_views.xml',
        'security/ir.model.access.csv',
    ],
}
