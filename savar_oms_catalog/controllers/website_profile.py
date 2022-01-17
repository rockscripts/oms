from odoo import http, _
from odoo.http import request
from odoo.exceptions import Warning, UserError
from odoo.addons.portal.controllers.portal import CustomerPortal
import logging, sys
_logger = logging.getLogger(__name__)

class CustomerPortalInerith(CustomerPortal):
    OPTIONAL_BILLING_FIELDS = ["zipcode", "state_id", "vat", "company_name", "merchant_catalog_owner"]

    @http.route('/my/categories', auth='public', website=True)
    def my_categories(self, **kw):
        return http.request.render('savar_oms_catalog.portal_my_categories_webpage', kw)
    
    @http.route('/merchant/orders', auth='public', website=True)
    def merchant_orders(self, **kw):
        return http.request.render('savar_oms_catalog.portal_merchant_orders_webpage', kw)

    @http.route(['/merchant/order/new'], auth='public', website=True)
    def merchant_orders_new(self, **kw):
        return http.request.render('savar_oms_catalog.portal_merchant_orders_new_webpage',{})