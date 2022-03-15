define([
        //DOJO
        "dojo/_base/declare",
        "dojo/_base/kernel",
        "dojo/request",
        "dijit/layout/ContentPane",
        "dijit/form/TextBox",
        "dijit/form/Button",
        "dijit/Dialog",
        "dijit/form/ValidationTextBox",
        //LOCAL
        "dojo/i18n!mydojo/nls/everything",
        "mydojo/organization_tab_all"
], function(
        //DOJO
        declare, kernel, request,
        ContentPane, TextBox, Button, Dialog, ValidationTextBox,
        //LOCAL
        i18
){

    return declare("OrganizationTabEdit", [ContentPane], {
        title: i18.organization_edit_title_new,
        closable: true,
        isEditing: false,
        postCreate: function(){
            var self = this;
            
            //Hidden ID text box
            var tbid = new TextBox({value:"", disabled:"true"});

            //Name
            var cp = new ContentPane({content:i18.organization_column_name});
            var tbname = new ValidationTextBox({
                required:true,
                validator:function(value, constraints){
                    return value.length>0 && value.length<64;
                },
                invalidMessage:i18.base_tab_edit_error_length
            });
            cp.addChild(tbname);
            this.addChild(cp);

            //Yur address
            cp = new ContentPane({content:i18.organization_column_yuraddress});
            var tbyuraddress = new ValidationTextBox({
                required:true,
                validator:function(value, constraints){
                    return value.length>0 && value.length<64;
                },
                invalidMessage:i18.base_tab_edit_error_length
            });
            cp.addChild(tbyuraddress);
            this.addChild(cp);
            
            //Phys address
            cp = new ContentPane({content:i18.organization_column_physaddress});
            var tbphysaddress = new ValidationTextBox({
                required:true,
                validator:function(value, constraints){
                    return value.length>0 && value.length<64;
                },
                invalidMessage:i18.base_tab_edit_error_length
            });
            cp.addChild(tbphysaddress);
            this.addChild(cp);
            
            //Director
            cp = new ContentPane({content:i18.organization_column_director});
            var directorExists = false;
            //Text box to the right with real data
            var tbdirectorreal = new TextBox({
                disabled:true,
            });
            var tbdirector = new ValidationTextBox({
                onChange:function(){
                    tbdirectorreal.set("value", "");
                    if(!tbdirector.isValid()) return;
                    directorExists = false;
                    request("api/employee?id="+tbdirector.get("value")+"&limit=1").then(
                        function(data){
                            //Data will be a list, get first item
                            var e = JSON.parse(data)[0];
                            if(e===null || e.firstname ===null) return;
                            tbdirectorreal.set("value", e.firstname + " " + e.lastname);
                            directorExists = true;
                        }
                    );
                },
                regExpGen:function(constraints){
                    return "\\d{1,10}";
                },
                invalidMessage:i18.base_tab_edit_error_single_employee_id
            });
            cp.addChild(tbdirector);
            cp.addChild(tbdirectorreal);
            this.addChild(cp);

            if(this.isEditing){
                tbid.set("value", this.rowData.data.id);
                tbname.set("value", this.rowData.data.name);
                tbyuraddress.set("value", this.rowData.data.yurAddress);
                tbphysaddress.set("value", this.rowData.data.physAddress);
                tbdirector.set("value", this.rowData.data.director);
                this.set("title", i18.organization_edit_title_edit+this.rowData.data.name);
            }

            //Submit button
            this.addChild(new Button({
                label: this.isEditing ? i18.base_tab_edit_save : i18.base_tab_edit_create,
                onClick: function(){
                    
                    //Validation
                    if(!tbname.isValid() || !tbyuraddress.isValid() || !tbphysaddress.isValid() || !tbdirector.isValid() || !directorExists){
                        new Dialog({
                            title: i18.base_tab_edit_error,
                            content: i18.base_tab_edit_error_fields_incorrect
                        }).show();
                        return;
                    }
                    
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