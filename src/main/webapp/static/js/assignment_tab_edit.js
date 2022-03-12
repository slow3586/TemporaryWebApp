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

    return declare("AssignmentEditTab", [ContentPane], {
        title: "New assignment",
        closable: true,
        isEditing: false,
        rowData: "",
        postCreate: function(){
            var self = this;
            
            var tbid = new TextBox({value:"", disabled:"true"});

            var cp = new ContentPane({content:"Topic:"});
            var tbtopic = new TextBox();
            cp.addChild(tbtopic);
            this.addChild(cp);

            var tbauthor_id = new TextBox({disabled:"true"});

            cp = new ContentPane({content:"Author:"});
            var tbauthor = new TextBox({disabled:"true"});
            cp.addChild(tbauthor);
            this.addChild(cp);

            cp = new ContentPane({content:"Text:"});
            var tbtext = new TextArea();
            domClass.add(tbtext.domNode, "bigTextBox");
            cp.addChild(tbtext);
            this.addChild(cp);

            if(this.isEditing){
                tbid.set("value", this.rowData.data.id);
                tbtopic.set("value", this.rowData.data.topic);
                tbtext.set("value", this.rowData.data.text);
                tbauthor.set("value", this.rowData.data.author_id);
                tbauthor_id.set("value", this.rowData.data.author_id);
                this.set("title", "Edit assignment: "+this.rowData.data.topic);
            }

            this.addChild(new Button({
                label: this.isEditing ? "Save" : "Create",
                onClick: function(){
                    var adata = {
                                topic: tbtopic.get("value"),
                                text: tbtext.get("value"),
                                author_id: "1"//tbauthor_id.get("value")
                            };
                    if(tbid.get("value")!=="") { adata.id = tbid.get("value"); }
                    kernel.global.allAssignmentsGrid.collection.add(adata);
                }
            }));

            kernel.global.mainTabContainer.addChild(this);
        }
    })
});