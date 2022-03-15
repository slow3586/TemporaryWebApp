define([
        //DOJO
        "dojo/_base/declare",
        "dojo/_base/kernel",
        "dojo/dom-class",
        "dojo/request",
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
        declare, kernel, domClass, request, 
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
            
            //Hidden ID text box for when you're editing
            var tbid = new TextBox({value:"", disabled:"true"});

            //Topic
            var cp = new ContentPane({content:i18.assignment_all_column_topic});
            var tbtopic = new ValidationTextBox({
                required:true,
                validator:function(value, constraints){
                    return value.length>0 && value.length<64;
                },
                invalidMessage:i18.base_tab_edit_error_length,
            });
            cp.addChild(tbtopic);
            this.addChild(cp);

            //Author
            cp = new ContentPane({content:i18.assignment_all_column_author});
            //Textbox to the right with real data
            var authorExists = false;
            var tbauthorreal = new TextBox({
               disabled:true
            });
            var tbauthor  = new ValidationTextBox({
                required:true,
                regExpGen:function(constraints){
                    return "\\d{1,10}";
                },
                onChange:function(){
                    tbauthorreal.set("value", "");
                    if(!tbauthor.isValid()) return;
                    authorExists = false;
                    request("api/employee?id="+tbauthor.get("value")+"&limit=1").then(
                        function(data){
                            //Data will be a list, get first item
                            var e = JSON.parse(data)[0];
                            if(e===null || e.firstname ===null) return;
                            tbauthorreal.set("value", e.firstname + " " + e.lastname);
                            authorExists = true;
                        }
                    );
                },
                invalidMessage:i18.base_tab_edit_error_single_employee_id
            });
            cp.addChild(tbauthor);
            cp.addChild(tbauthorreal);
            this.addChild(cp);

            //Status
            cp = new ContentPane({content:i18.assignment_all_column_status});
            var tbstatus = new Select({
                options: [
                    {label:i18.assignment_all_created, value:"0"},
                    {label:i18.assignment_all_assigned, value:"1"},
                    {label:i18.assignment_all_accepted, value:"2"},
                    {label:i18.assignment_all_executed, value:"3"}
                ],
                value: "0",
            });
            cp.addChild(tbstatus);
            this.addChild(cp);
            
            //Execute by
            cp = new ContentPane({content:i18.assignment_all_column_execute_by});
            var tbexecuteby = new ValidationTextBox({
                required:true,
                regExpGen:function(constraints){
                    return "\\d{2}:\\d{2} \\d{2}\.\\d{2}\.\\d{4}";
                },
                invalidMessage:i18.base_tab_edit_error_date
            });
            cp.addChild(tbexecuteby);
            this.addChild(cp);
            
            //Executors
            cp = new ContentPane({content:i18.assignment_all_column_executors});
            //Textbox to the right with real data
            var tbexecutorsreal = new TextBox({
               disabled:true
            });
            var executorsExist = false;
            var tbexecutors = new ValidationTextBox({
                required:true,
                regExpGen:function(constraints){
                    return "(\\d+,?)+";
                },
                onChange:function(){
                    tbexecutorsreal.set("value", "");
                    if(!tbexecutors.isValid()) return;
                    executorsExist = false;
                    var ids = tbexecutors.get("value").split(",");
                    if(ids.length===0) return;
                    for(i=0; i<ids.length; i++){
                        request("api/employee?id="+ids[i]+"&limit=1").then(
                            function(data){
                                var e = JSON.parse(data)[0];
                                if(e===null || e.firstname === null) return;
                                
                                if(tbexecutorsreal.get("value")!=="")
                                    tbexecutorsreal.set("value", tbexecutorsreal.get("value") + ", ");
                                
                                tbexecutorsreal.set("value", tbexecutorsreal.get("value") + e.firstname + " " + e.lastname);
                                executorsExist = true;
                            }
                        );
                    }
                },
                invalidMessage:i18.base_tab_edit_error_multiple_employee_id
            });
            cp.addChild(tbexecutors);
            cp.addChild(tbexecutorsreal);
            this.addChild(cp);

            //Text
            cp = new ContentPane({content:i18.assignment_all_column_text});
            var tbtext = new TextArea();
            domClass.add(tbtext.domNode, "bigTextBox");
            cp.addChild(tbtext);
            this.addChild(cp);

            //Insert values when we are editing
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

            //Submit button
            this.addChild(new Button({
                label: this.isEditing ? i18.base_tab_edit_save : i18.base_tab_edit_create,
                onClick: function(){
                    
                    //Validation
                    if(!tbtopic.isValid() || !tbauthor.isValid()  ||
                            !tbexecutors.isValid() || !tbexecuteby.isValid() || !authorExists || !executorsExist){
                        new Dialog({
                            title: i18.base_tab_edit_error,
                            content: i18.base_tab_edit_error_fields_incorrect
                        }).show();
                        return;
                    }
                    
                    var adata = {
                        topic: tbtopic.get("value"),
                        text: tbtext.get("value"),
                        author: tbauthor.get("value"),
                        executors: tbexecutors.get("value").split(","),
                        executeby: tbexecuteby.get("value"),
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