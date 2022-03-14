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
        "dijit/form/Select",
        //LOCAL
        "dojo/i18n!mydojo/nls/everything",
], function(
        //DOJO
        declare, kernel, domClass, 
        ContentPane, TextBox, TextArea, Button, Dialog, ValidationTextBox, Select,
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
            var tbstatus = new Select({
                options: [
                    {label:"Created", value:"0"},
                    {label:"Assigned", value:"1"},
                    {label:"Accepted", value:"2"},
                    {label:"Executed", value:"3"}
                ],
                value: "0",
            });
            cp.addChild(tbstatus);
            this.addChild(cp);
            
            cp = new ContentPane({content:i18.assignment_all_column_execute_by});
            var tbexecuteby = new ValidationTextBox({
                regExpGen:function(constraints){
                    return "\\d{2}:\\d{2} \\d{2}\.\\d{2}\.\\d{4}";
                },
                invalidMessage:"Execute by must by a date formatted as HH:mm dd.MM.yyyy"
            });
            cp.addChild(tbexecuteby);
            this.addChild(cp);
            
            cp = new ContentPane({content:i18.assignment_all_column_executors});
            var tbexecutors = new ValidationTextBox({
                regExpGen:function(constraints){
                    return "(\\d+,?)+";
                },
                invalidMessage:"Executors must be a list of employee IDs separated by ,"
            });
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
                tbauthor.set("value", this.rowData.data.author);
                tbexecuteby.set("value", this.rowData.data.executeby);
                tbexecutors.set("value", this.rowData.data.executors);
                this.set("title", i18.assignment_edit_title_edit+this.rowData.data.topic);
            }

            this.addChild(new Button({
                label: this.isEditing ? i18.base_tab_edit_save : i18.base_tab_edit_create,
                onClick: function(){
                    if(!tbtopic.isValid() || !tbauthor.isValid()  ||
                            !tbexecutors.isValid() || !tbexecuteby.isValid()){
                        new Dialog({
                            title: "Error",
                            content: "One of the values is incorrect"
                        }).show();
                        return;
                    }
                    
                    var adata = {
                        topic: tbtopic.get("value"),
                        text: tbtext.get("value"),
                        author: tbauthor.get("value"),
                        executors: tbexecutors.get("value").split(","),
                        executebyAsString: tbexecuteby.get("value"),
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