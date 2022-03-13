define([
        //DOJO
        "dojo/_base/declare",
        "dojo/_base/kernel",
        "dojo/dom-class",
        "dijit/layout/ContentPane",
        "dijit/form/TextBox",
        "dijit/form/Textarea",
        "dijit/form/Button",
        //LOCAL
        "dojo/i18n!mydojo/nls/everything",
        "mydojo/assignment_tab_all"
], function(
        //DOJO
        declare, kernel, domClass, 
        ContentPane, TextBox, TextArea, Button,
        //LOCAL
        i18, AssignmentTabAll
){

    return declare("AssignmentEditTab", [ContentPane], {
        title: i18.assignment_edit_title_new,
        closable: true,
        isEditing: false,
        postCreate: function(){
            var self = this;
            
            var tbid = new TextBox({value:"", disabled:"true"});

            var cp = new ContentPane({content:i18.assignment_all_column_topic});
            var tbtopic = new TextBox();
            cp.addChild(tbtopic);
            this.addChild(cp);

            var tbauthor_id = new TextBox({disabled:"true"});

            cp = new ContentPane({content:i18.assignment_all_column_author});
            var tbauthor = new TextBox({disabled:"true"});
            cp.addChild(tbauthor);
            this.addChild(cp);
            
            cp = new ContentPane({content:i18.assignment_all_column_status});
            var tbstatus = new TextBox({disabled:"true"});
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
                tbauthor.set("value", this.rowData.data.author_id);
                tbauthor_id.set("value", this.rowData.data.author_id);
                this.set("title", i18.assignment_edit_title_edit+": "+this.rowData.data.topic);
            }

            this.addChild(new Button({
                label: this.isEditing ? i18.base_tab_edit_save : i18.base_tab_edit_create,
                onClick: function(){
                    var adata = {
                        topic: tbtopic.get("value"),
                        text: tbtext.get("value"),
                        author_id: "1",
                        executors_ids: ["1", "2"],
                        executeby: "2000-01-01T10:01:01Z",
                        executeattr: "0",
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