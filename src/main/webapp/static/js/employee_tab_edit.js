define([
        //DOJO
        "dojo/_base/declare",
        "dojo/_base/kernel",
        "dijit/layout/ContentPane",
        "dijit/form/TextBox",
        "dijit/form/Button",
        "dijit/Dialog",
        "dijit/form/ValidationTextBox",
        //LOCAL
        "dojo/i18n!mydojo/nls/everything"
], function(
        //DOJO
        declare, kernel,
        ContentPane, TextBox, Button, Dialog, ValidationTextBox,
        //LOCAL
        i18
){

    return declare("EmployeeTabEdit", [ContentPane], {
        title: i18.employee_edit_title_new,
        closable: true,
        isEditing: false,
        postCreate: function(){
            var self = this;
            
            //Hidden ID text box
            var tbid = new TextBox({value:"", disabled:"true"});

            //First name
            var cp = new ContentPane({content:i18.employee_all_column_firstname});
            var tbfirstname = new ValidationTextBox({
                required:true,
                validator:function(value, constraints){
                    return value.length>0 && value.length<64;
                },
                invalidMessage:i18.base_tab_edit_error_length
            });
            cp.addChild(tbfirstname);
            this.addChild(cp);
            
            //Last name
            cp = new ContentPane({content:i18.employee_all_column_lastname});
            var tblastname = new ValidationTextBox({
                required:true,
                validator:function(value, constraints){
                    return value.length>0 && value.length<64;
                },
                invalidMessage:i18.base_tab_edit_error_length
            });
            cp.addChild(tblastname);
            this.addChild(cp);
            
            //Middle name
            cp = new ContentPane({content:i18.employee_all_column_middlename});
            var tbmiddlename = new ValidationTextBox({
                required:true,
                validator:function(value, constraints){
                    return value.length>0 && value.length<64;
                },
                invalidMessage:i18.base_tab_edit_error_length
            });
            cp.addChild(tbmiddlename);
            this.addChild(cp);
            
            //Position
            cp = new ContentPane({content:i18.employee_all_column_position});
            var tbposition = new ValidationTextBox({
                required:true,
                validator:function(value, constraints){
                    return value.length>0 && value.length<64;
                },
                invalidMessage:i18.base_tab_edit_error_length
            });
            cp.addChild(tbposition);
            this.addChild(cp);

            //Insert values when we're editing
            if(this.isEditing){
                tbid.set("value", this.rowData.data.id);
                tbfirstname.set("value", this.rowData.data.firstname);
                tblastname.set("value", this.rowData.data.lastname);
                tbmiddlename.set("value", this.rowData.data.middlename);
                tbposition.set("value", this.rowData.data.position);
                this.set("title", i18.employee_edit_title_edit+" "+this.rowData.data.firstname+" "+this.rowData.data.lastname);
            }

            //Submit button
            this.addChild(new Button({
                label: this.isEditing ? i18.base_tab_edit_save : i18.base_tab_edit_create,
                onClick: function(){
                    
                    //Validation
                    if(!tbfirstname.isValid() || !tblastname.isValid() || !tbmiddlename.isValid() || !tbposition.isValid()){
                        new Dialog({
                            title: i18.base_tab_edit_error,
                            content: i18.base_tab_edit_error_fields_incorrect
                        }).show();
                        return;
                    }
                    
                    var adata = {
                        firstname: tbfirstname.get("value"),
                        lastname: tblastname.get("value"),
                        middlename: tbmiddlename.get("value"),
                        position: tbposition.get("value"),
                    };
                    if(tbid.get("value")!=="") { adata.id = tbid.get("value"); }
                    
                    kernel.global.employeeTabAllInstance.gridData.add(adata);
                }
            }));

            kernel.global.mainTabContainer.addChild(this);
        }
    })
});