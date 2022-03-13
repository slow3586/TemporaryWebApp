define([
        //DOJO
        "dojo/_base/declare",
        "dojo/_base/kernel",
        "dijit/layout/ContentPane",
        "dijit/form/TextBox",
        "dijit/form/Button",
        //LOCAL
        "dojo/i18n!mydojo/nls/everything"
], function(
        //DOJO
        declare, kernel,
        ContentPane, TextBox, Button,
        //LOCAL
        i18
){

    return declare("EmployeeTabEdit", [ContentPane], {
        title: i18.employee_edit_title_new,
        closable: true,
        isEditing: false,
        postCreate: function(){
            var self = this;
            
            var tbid = new TextBox({value:"", disabled:"true"});

            var cp = new ContentPane({content:i18.employee_all_column_firstname});
            var tbfirstname = new TextBox();
            cp.addChild(tbfirstname);
            this.addChild(cp);
            
            cp = new ContentPane({content:i18.employee_all_column_lastname});
            var tblastname = new TextBox();
            cp.addChild(tblastname);
            this.addChild(cp);
            
            cp = new ContentPane({content:i18.employee_all_column_middlename});
            var tbmiddlename = new TextBox();
            cp.addChild(tbmiddlename);
            this.addChild(cp);
            
            cp = new ContentPane({content:i18.employee_all_column_position});
            var tbposition = new TextBox();
            cp.addChild(tbposition);
            this.addChild(cp);

            if(this.isEditing){
                tbid.set("value", this.rowData.data.id);
                tbfirstname.set("value", this.rowData.data.firstname);
                tblastname.set("value", this.rowData.data.lastname);
                tbmiddlename.set("value", this.rowData.data.middlename);
                tbposition.set("value", this.rowData.data.position);
                this.set("title", i18.employee_edit_title_edit+" "+this.rowData.data.firstname+" "+this.rowData.data.lastname);
            }

            this.addChild(new Button({
                label: this.isEditing ? i18.base_tab_edit_save : i18.base_tab_edit_create,
                onClick: function(){
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