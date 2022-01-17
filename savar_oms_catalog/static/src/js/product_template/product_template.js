odoo.define('savar_oms_catalog.product_template', function (require) {
    'use strict';

    var publicWidget = require('web.public.widget');
    var rpc = require('web.rpc');

    publicWidget.Widget.include({
        init: function (parent, action) 
        {
            var self = this;
            $('nav.merchant_navigation_nav li#edit-page-menu').unbind( "click" );
            $('nav.merchant_navigation_nav li#save-page-menu').unbind( "click" );
            $('nav.merchant_navigation_nav li#edit-page-menu').click(function (event) 
            {
                event.preventDefault();
                self.init_product_edition_001();
            });
            $('nav.merchant_navigation_nav li#save-page-menu').click(function (event) 
            {
                event.preventDefault();
                self.save_product_taxes_edition_001();
            });
            self._super(parent, action);
        },        
        init_product_edition_001: function () {
            var self = this;
            self.enable_fields_for_edition_001();
            self.enable_product_list_price_001();
        },
        save_product_taxes_edition_001: function () {
            var self = this;
            self.save_values();
            self.disable_fields_for_edition_001();
            self.disable_fields_product_name_001();
            self.disable_fields_product_list_price_001();
        },
        save_values:function()
        {
          var _id = $(".js_publish_management").attr('data-id');
          var product_name = $("input#product_name").val();
          var product_list_price = $("#product_list_price").val();
          var taxes_id = $("#taxes_id").val();
          var taxes = [];
          try
          {
            taxes_id = String(taxes_id).split(',');
            taxes_id.forEach(function(tax){
                taxes.push(tax);
            });            
          }
          catch(e)
          {}
          var standard_price = $("input[name='standard_price']").val();
          var default_code = $("input[name='default_code']").val();
          var barcode = $("input[name='barcode']").val();
          var public_description = $("textarea[name='public_description']").html();

          var params = {
            'id': _id,
            'name': product_name,
            'list_price': product_list_price,
            'taxes_id': taxes,
            'standard_price': standard_price,
            'default_code': default_code,
            'barcode': barcode,
            'public_description': public_description,
        }
          rpc.query({
            model: "product.template",
            method: "save_values",
            args: ["", params],
            }).then(() => {});
        },
        enable_product_list_price_001: function()
        {
            var self = this;
            var _product_list_price_element = $('b.oe_price');
            var _product_list_price = _product_list_price_element.find('span.oe_currency_value').text();
            _product_list_price_element.find('span.oe_currency_value').hide();
            if(_product_list_price_element.find("input#product_list_price").length>0)
            {
                _product_list_price_element.find("input#product_list_price").val(_product_list_price);
            }
            else
            {
                _product_list_price_element.append('<input class="form-control" type="number" step="any" id="product_list_price" value="'+String(_product_list_price)+'"/>');   
            }
            _product_list_price_element.find("input#product_list_price").fadeIn();
        },
        disable_fields_product_list_price_001: function()
        {            
            var _product_list_price_element = $('b.oe_price');
            var _price = _product_list_price_element.find("input#product_list_price").val();
            _product_list_price_element.find("input#product_list_price").hide();
            _product_list_price_element.find('span.oe_currency_value').text(_price).fadeIn();
        },
        disable_fields_for_edition_001: function()
        {
            var self = this;
            $("#taxes_id").select2("readonly", true); 
            self.disable_product_extra_fields_001();           
        },
        enable_fields_for_edition_001: function()
        {
            var self = this;
            $("#taxes_id").select2("readonly", false);
            self.enable_product_name_001();
            self.enable_product_extra_fields_001();         
        },
        enable_product_name_001:function()
        {
            var self = this;
            var _product_name_element = $('h1[itemprop="name"]');
            _product_name_element.hide()
            var _product_name = _product_name_element.text();

            console.log("#################################")
            console.log( String("_product_name: ") + String(_product_name) );
            console.log( String("_product_name lenth: " + String(_product_name).length) ) ;
            console.log("#################################")

            if($("input#product_name").length>0)
            {
                $("input#product_name").val(_product_name);
            }
            else
            {
                _product_name_element.before('<input class="form-control" type="text" id="product_name" value="'+String(_product_name)+'"/>');   
                $("input#product_name").val(_product_name);
            }           
        },
        disable_fields_product_name_001: function()
        {
            var _product_name_element = $('h1[itemprop="name"]');
            var _name = _product_name_element.find("input#product_name").val();
            $("input#product_name").remove();
            _product_name_element.text(_name);
            _product_name_element.fadeIn();
        },
        enable_product_extra_fields_001:function()
        {
            var self = this;
            // list_price
            self.label_looks_as_input_001($("input[name='list_price']"));
            // standard_price
            self.label_looks_as_input_001($("input[name='standard_price']"));            
            // default_code
            self.label_looks_as_input_001($("input[name='default_code']"));
            // barcode
            self.label_looks_as_input_001($("input[name='barcode']"));
            // public_description
            self.label_looks_as_input_001($("textarea[name='public_description']"));
        },
        disable_product_extra_fields_001:function()
        {
            var self = this;
            // list_price
            self.input_looks_as_label_001($("input[name='list_price']"));
            // standard_price
            self.input_looks_as_label_001($("input[name='standard_price']"));
            // default_code
            self.input_looks_as_label_001($("input[name='default_code']"));
            // barcode
            self.input_looks_as_label_001($("input[name='barcode']"));
            // public_description
            self.input_looks_as_label_001($("textarea[name='public_description']"));
        },
        input_looks_as_label_001:function(element)
        {
            element.addClass("input-as-label");
            element.attr('readonly','1');
        },
        label_looks_as_input_001:function(element)
        {
            element.removeClass("input-as-label");
            element.removeAttr('readonly');
        },
    });
});