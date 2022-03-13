define([
        //DOJO
        "dojo/_base/declare",
        "dojo/_base/kernel",
        "dojo/dom-class",
        "dijit/layout/ContentPane",
        "dijit/form/TextBox",
        "dijit/form/Textarea",
        "dijit/form/Button",
        "dijit/Dialog",
        "dijit/form/ValidationTextBox",
        //LOCAL
        "dojo/i18n!mydojo/nls/everything",
], function(
        //DOJO
        declare, kernel, domClass, 
        ContentPane, TextBox, TextArea, Button, Dialog, ValidationTextBox,
        //LOCAL
        i18
){

    return declare("AssignmentEditTab", [ContentPane], {
        title: i18.assignment_edit_title_new,
        closable: true,
        isEditing: false,
        postCreate: function(){
            var self = this;
            
            var tbid = new TextBox({value:"", disabled:"true"});

            var cp = new ContentPane({content:i18.assignment_all_column_topic});
            var tbtopic = new ValidationTextBox({
                required:true,
                validator:function(value, constraints){
                    return value.length>0 && value.length<64;
                },
                invalidMessage:"Topic must not be empty or longer than 64 characters"
            });
            cp.addChild(tbtopic);
            this.addChild(cp);

            var tbauthor_id = new TextBox({disabled:"true"});

            cp = new ContentPane({content:i18.assignment_all_column_author});
            var tbauthor  = new ValidationTextBox({
                regExpGen:function(constraints){
                    return "\\d{1,10}";
                },
                invalidMessage:"This field must contain a single author ID"
            });
            cp.addChild(tbauthor);
            this.addChild(cp);
            
            cp = new ContentPane({content:i18.assignment_all_column_status});
            var tbstatus = new ValidationTextBox({
                regExpGen:function(constraints){
                    return "[0123]";
                },
                invalidMessage:"Status must be a number from 0 to 3"
            });
            cp.addChild(tbstatus);
            this.addChild(cp);
            
            cp = new ContentPane({content:i18.assignment_all_column_execute_by});
            var tbexecuteby = new TextBox({disabled:"true"});
            cp.addChild(tbexecuteby);
            this.addChild(cp);
            
            cp = new ContentPane({content:i18.assignment_all_column_executors});
            var tbexecutors = new TextBox({disabled:"true"});
            cp.addChild(tbexecutors);
            this.addChild(cp);

            cp = new ContentPane({content:i18.assignment_all_column_text});
            var tbtext = new TextArea();
            domClass.add(tbtext.domNode, "bigTextBox");
            cp.addChild(tbtext);
            this.addChild(cp);

            if(this.isEditing){
                tbid.set("value", this.rowData.data.id);
                tbtopic.set("value", this.rowData.data.topic);
                tbtext.set("value", this.rowData.data.text);
                tbstatus.set("value", this.rowData.data.executeattr);
                tbauthor.set("value", this.rowData.data.author_id);
                tbexecuteby.set("value", this.rowData.data.executeby);
                tbexecutors.set("value", this.rowData.data.executors_ids);
                tbauthor_id.set("value", this.rowData.data.author_id);
                this.set("title", i18.assignment_edit_title_edit+": "+this.rowData.data.topic);
            }

            this.addChild(new Button({
                label: this.isEditing ? i18.base_tab_edit_save : i18.base_tab_edit_create,
                onClick: function(){
                    if(!tbtopic.isValid() || !tbauthor.isValid() || !tbstatus.isValid()){
                        new Dialog({
                            title: "Error",
                            content: "One of the values is incorrect"
                        }).show();
                        return;
                    }
                    var adata = {
                        topic: tbtopic.get("value"),
                        text: tbtext.get("value"),
                        author_id: "1",
                        executors_ids: ["1", "2"],
                        executeby: "2100-01-01T10:01:01Z",
                        executeattr: tbstatus.get("value"),
                        controlattr: "0"
                    };
                    if(tbid.get("value")!=="") { adata.id = tbid.get("value"); }
                    kernel.global.assignmentTabAllInstance.gridData.add(adata);
                }
            }));
            kernel.global.mainTabContainer.addChild(this);
        }
    })
});