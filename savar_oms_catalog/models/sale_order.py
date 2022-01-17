
from odoo import models, fields, _
from odoo.http import request
import logging
_logger = logging.getLogger(__name__)

class sale_order(models.Model):
    _inherit = 'sale.order'

    merchant_account = fields.Many2one('res.partner', string="Comerciante", domain="[('merchant_catalog_owner', '=', True)]")