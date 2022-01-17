from odoo import api, fields, models


class OmsPricelist(models.Model):
    _name = 'oms.pricelist'
    _description = 'New Description'

    name = fields.Char(string='Nombre', required=True)
    currency_id = fields.Many2one('res.currency', string='Currency', required=True)
    pricelist_item_ids = fields.One2many('oms.pricelist.item', 'pricelist_id', string='Pricelist Items')
    
    def get_pricelist_item_price(self, seller_id, subservice_id, warehouse_id, district_id, size_id, size_quant):
        pricelist_item_id = self.env['oms.pricelist.item'].search([('pricelist_id', '=', self.id), ('seller_id', '=', seller_id.id), ('subservice_id', '=', subservice_id.id), (
        'warehouse_id', '=', warehouse_id.id), ('district_id', '=', district_id.id), ('size_id', '=', size_id.id), ('size_quant', '=', size_quant)], limit=1)
        return pricelist_item_id.price