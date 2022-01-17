odoo.define('savar_oms_catalog.web_editor', function (require) {
    'use strict';

    var publicWidget = require('web.public.widget');
    var rpc = require('web.rpc');
    var wUtils = require('website.utils');
    var core = require('web.core');
    var _t = core._t;

    publicWidget.Widget.include({
        init: function (parent, action) 
        {
            var self = this;
            $('nav.merchant_navigation_nav li#new-content-menu').on('click', function () 
            {
                self.init_product_add();
            });
            $('.o_new_content_element a').on('click', function () 
            {
                self.init_add_wizard($(this).attr('data-action'));
            });
            $('nav.merchant_navigation_nav li#edit-page-menu').on('click', function () 
            {
                self.init_product_edition();
            });
            $('nav.merchant_navigation_nav li#save-page-menu').on('click', function () 
            {
                self.save_product_edition();                
            });
            this._super(parent, action);
        },
        save_product_edition: function () 
        {
            $("nav.merchant_navigation_nav li#save-page-menu").hide();
            $("nav.merchant_navigation_nav li#edit-page-menu").fadeIn();
        },
        init_product_edition: function () 
        {
            $("nav.merchant_navigation_nav li#edit-page-menu").hide();
            $("nav.merchant_navigation_nav li#save-page-menu").fadeIn();
            
        },
        init_product_add: function () 
        {
            $("nav.merchant_navigation_nav #o_new_content_menu_choices").removeClass("o_hidden");
            $("nav.merchant_navigation_nav .o_new_content_element").css('opacity','initial');
        },
        init_add_wizard: function (_action) 
        {
            var self = this;
            if(String(_action) == "new_product")
            {
                self._createNewProduct();
            }            
        },
        _createNewProduct: function () {
            var self = this;
            return wUtils.prompt({
                id: "editor_new_product",
                window_title: _t("New Product"),
                input: _t("Product Name"),
            }).then(function (result) {
                if (!result.val) {
                    return;
                }
                return self._rpc({
                    route: '/shop/add_product',
                    params: {
                        name: result.val,
                    },
                }).then(function (url) {
                    window.location.href = url;
                    return new Promise(function () {});
                });
            });
        },
    });
});
