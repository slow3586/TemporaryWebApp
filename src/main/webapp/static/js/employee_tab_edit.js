define([
        "dojo/_base/declare",
        "dojo/_base/kernel",
        "dojo/dom-class",
        "dijit/layout/ContentPane",
        "dijit/form/TextBox",
        "dijit/form/Textarea",
        "dijit/form/Button"
], function(
        declare, kernel, domClass, 
        ContentPane, TextBox, TextArea, Button
){

    return declare("EmployeeTabEdit", [ContentPane], {
        title: "New employee",
        closable: true,
        isEditing: false,
        rowData: "",
        postCreate: function(){
            var self = this;
            
            var tbid = new TextBox({value:"", disabled:"true"});

            cp = new ContentPane({content:"First name:"});
            var tbfirstname = new TextBox();
            cp.addChild(tbfirstname);
            this.addChild(cp);
            
            cp = new ContentPane({content:"Last name:"});
            var tblastname = new TextBox();
            cp.addChild(tblastname);
            this.addChild(cp);
            
            cp = new ContentPane({content:"Middle name:"});
            var tbmiddlename = new TextBox();
            cp.addChild(tbmiddlename);
            this.addChild(cp);
            
            cp = new ContentPane({content:"Position:"});
            var tbposition = new TextBox();
            cp.addChild(tbposition);
            this.addChild(cp);

            if(this.isEditing){
                tbid.set("value", this.rowData.data.id);
                tbfirstname.set("value", this.rowData.data.firstname);
                tblastname.set("value", this.rowData.data.lastname);
                tbmiddlename.set("value", this.rowData.data.middlename);
                tbposition.set("value", this.rowData.data.position);
                this.set("title", "Edit employee: "+this.rowData.data.firstname+" "+this.rowData.data.lastname);
            }

            this.addChild(new Button({
                label: this.isEditing ? "Save" : "Create",
                onClick: function(){
                    var adata = {
                        firstname: tbfirstname.get("value"),
                        lastname: tblastname.get("value"),
                        middlename: tbmiddlename.get("value"),
                        position: tbposition.get("value"),
                    };
                    if(tbid.get("value")!=="") { adata.id = tbid.get("value"); }
                    kernel.global.allAssignmentsGrid.collection.add(adata);
                }
            }));

            kernel.global.mainTabContainer.addChild(this);
        }
    })
});