define([
        "dojo/_base/declare",
        "dojo/_base/kernel",
        "dojo/dom-class",
        "dijit/layout/ContentPane",
        "dijit/form/TextBox",
        "dijit/form/Textarea",
        "dijit/form/Button",
        "mydojo/organization_tab_all"
], function(
        declare, kernel, domClass, 
        ContentPane, TextBox, TextArea, Button,
        OrganizationTabAll
){

    return declare("OrganizationTabEdit", [ContentPane], {
        title: "New organization",
        closable: true,
        isEditing: false,
        rowData: "",
        postCreate: function(){
            var self = this;
            
            var tbid = new TextBox({value:"", disabled:"true"});

            var cp = new ContentPane({content:"Name:"});
            var tbname = new TextBox();
            cp.addChild(tbname);
            this.addChild(cp);

            cp = new ContentPane({content:"Yur address:"});
            var tbyuraddress = new TextBox();
            cp.addChild(tbyuraddress);
            this.addChild(cp);
            
            cp = new ContentPane({content:"Phys address:"});
            var tbphysaddress = new TextBox();
            cp.addChild(tbphysaddress);
            this.addChild(cp);
            
            cp = new ContentPane({content:"Director:"});
            var tbdirector = new TextBox();
            cp.addChild(tbdirector);
            this.addChild(cp);

            if(this.isEditing){
                tbid.set("value", this.rowData.data.id);
                tbname.set("value", this.rowData.data.name);
                tbyuraddress.set("value", this.rowData.data.yurAddress);
                tbphysaddress.set("value", this.rowData.data.physAddress);
                tbdirector.set("value", this.rowData.data.directorId);
                this.set("title", "Edit organization: "+this.rowData.data.name);
            }

            this.addChild(new Button({
                label: this.isEditing ? "Save" : "Create",
                onClick: function(){
                    var adata = {
                        name: tbname.get("value"),
                        yuraddress: tbyuraddress.get("value"),
                        physaddress: tbphysaddress.get("value"),
                        director: tbdirector.get("value"),
                    };
                    if(tbid.get("value")!=="") { adata.id = tbid.get("value"); }
                    OrganizationTabAll().collection.add(adata);
                }
            }));    
            kernel.global.mainTabContainer.addChild(this);
        }
    })
});