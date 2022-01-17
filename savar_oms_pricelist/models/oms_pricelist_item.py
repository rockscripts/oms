from odoo import api, fields, models


class OmsPricelistItem(models.Model):
    _name = 'oms.pricelist.item'
    _description = 'New Description'

    pricelist_id = fields.Many2one(
        'oms.pricelist', string='Pricelist', required=True)

    seller_id = fields.Many2one('res.partner', string='Seller', required=True)
    subservice_id = fields.Many2one('fsm.order.service', string='SubServicio')
    warehouse_id = fields.Many2one('stock.warehouse', string='Local')
    district_id = fields.Many2one('res.district', string='Zona', required=True)
    sufix = fields.Char(string='Sufijo')
    size_id = fields.Many2one('product.size', string='Talla', required=True)
    size_quant = fields.Integer(string='Cantidad Talla', required=True)
    price = fields.Float(string='Tarifa', required=True)
