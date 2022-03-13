define([
        //DOJO
        "dojo/_base/declare",
        "dojo/_base/kernel",
        "dijit/layout/ContentPane",
        "dijit/form/TextBox",
        "dijit/form/Button",
        //LOCAL
        "dojo/i18n!mydojo/nls/everything",
        "mydojo/organization_tab_all"
], function(
        //DOJO
        declare, kernel, 
        ContentPane, TextBox, Button,
        //LOCAL
        i18
){

    return declare("OrganizationTabEdit", [ContentPane], {
        title: i18.organization_edit_title_new,
        closable: true,
        isEditing: false,
        postCreate: function(){
            var self = this;
            
            var tbid = new TextBox({value:"", disabled:"true"});

            var cp = new ContentPane({content:i18.organization_column_name});
            var tbname = new TextBox();
            cp.addChild(tbname);
            this.addChild(cp);

            cp = new ContentPane({content:i18.organization_column_yuraddress});
            var tbyuraddress = new TextBox();
            cp.addChild(tbyuraddress);
            this.addChild(cp);
            
            cp = new ContentPane({content:i18.organization_column_physaddress});
            var tbphysaddress = new TextBox();
            cp.addChild(tbphysaddress);
            this.addChild(cp);
            
            cp = new ContentPane({content:i18.organization_column_director});
            var tbdirector = new TextBox();
            cp.addChild(tbdirector);
            this.addChild(cp);

            if(this.isEditing){
                tbid.set("value", this.rowData.data.id);
                tbname.set("value", this.rowData.data.name);
                tbyuraddress.set("value", this.rowData.data.yurAddress);
                tbphysaddress.set("value", this.rowData.data.physAddress);
                tbdirector.set("value", this.rowData.data.directorId);
                this.set("title", i18.organization_edit_title_edit+this.rowData.data.name);
            }

            this.addChild(new Button({
                label: this.isEditing ? i18.base_tab_edit_save : i18.base_tab_edit_create,
                onClick: function(){
                    var adata = {
                        name: tbname.get("value"),
                        yurAddress: tbyuraddress.get("value"),
                        physAddress: tbphysaddress.get("value"),
                        director: tbdirector.get("value"),
                    };
                    if(tbid.get("value")!=="") { adata.id = tbid.get("value"); }
                    kernel.global.organizationTabAllInstance.gridData.add(adata);
                }
            }));    
            kernel.global.mainTabContainer.addChild(this);
        }
    })
});