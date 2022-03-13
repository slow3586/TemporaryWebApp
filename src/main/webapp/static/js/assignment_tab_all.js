define([
        //DOJO
        "dojo/_base/kernel",
        //LOCAL
        "dojo/i18n!mydojo/nls/everything",
        "mydojo/base_tab_all",
        "mydojo/assignment_tab_edit",
], function(
        //DOJO
        kernel,
        //LOCAL
        i18, BaseTabAll, AssignmentTabEdit
){    
    //All assignments tab singleton instance
    var instance = null;
    
    //Return new instance if there is none
    return function(){
        if(instance === null){
            instance = new BaseTabAll({
                
                //Tab title
                title : i18.assignment_all_title,
                
                //REST path
                restTarget: "api/assignment",
                
                //Columns list for the filter selection
                searchColumnChoices: [
                    {label:i18.assignment_all_column_id, value:"id", selected:true},
                    {label:i18.assignment_all_column_topic, value:"topic"},
                    {label:i18.assignment_all_column_text, value:"text"},
                    {label:i18.assignment_all_column_status, value:"executeattr"},
                    {label:i18.assignment_all_column_execute_by, value:"executeby"},
                    {label:i18.assignment_all_column_executors, value:"executors"},
                    {label:i18.assignment_all_column_author, value:"author"}
                ], 
                
                //Grid column labels and fields for the grid itself
                gridColumns :[{ field: 'id', label: i18.assignment_all_column_id},
                    { field: 'topic', label: i18.assignment_all_column_topic },
                    { field: 'text', label: i18.assignment_all_column_text},
                    { field: 'executeattr', label: i18.assignment_all_column_status},
                    { field: 'executeby', label: i18.assignment_all_column_execute_by},
                    { field: 'executors_ids', label: i18.assignment_all_column_executors},
                    { field: 'author_id', label: i18.assignment_all_column_author}
                ],
                
                //Saves the tab instance to a global variable.
                assignGlobalVar: function(){
                    kernel.global.assignmentTabAllInstance = this;
                },
                
                //Sets up delete dialog.
                openDeleteDialog : function(){
                    this._openDeleteDialog(i18.base_tab_all_delete_title+this.selectedRow.data.topic, 
                        i18.base_tab_all_delete_content+this.selectedRow.data.topic+"?", 
                        this.selectedRow.data.id);
                },
                
                //Sets up grid collection to be filtered
                //according to selected filter column.
                //Only one column can be selected for now.
                filterAll : function(){
                    
                    //Empty id filter will return all objects as if there's no filter
                    var filterData = {'id':""};
                    
                    //Check filter value is not empty
                    if(this.filterValue === undefined || this.filterValue === ""){}
                    else{
                        if(this.filterColumn==="id"){
                            filterData = {'id':this.filterValue};
                        }else if(this.filterColumn==="topic"){
                            filterData = {'topic':this.filterValue};
                        }else if(this.filterColumn==="text"){
                            filterData = {'text':this.filterValue};
                        }else if(this.filterColumn==="executeattr"){
                            filterData = {'executeattr':this.filterValue};
                        }else if(this.filterColumn==="executeby"){
                            filterData = {'executeby':this.filterValue};
                        }else if(this.filterColumn==="executorsIds"){
                            filterData = {'executorsIds':this.filterValue};
                        }else if(this.filterColumn==="authorId"){
                            filterData = {'authorId':this.filterValue};
                        }
                    }
                    
                    //Apply filter
                    this.grid.set("collection", this.gridData.filter(filterData));
                },
                
                //When data is done loading,
                //this function replaces author and executor ids
                //with their respective first and last names for clarity.
                onGridUpdate: function(){
                    this.replaceIdsWithEmployees(".field-author_id,.field-executors_ids");
                },
                
                //Delete instance on tab close
                onClose : function(){
                    instance = null;
                    return true;
                },
                
                //Opens a new item tab on add button click
                openAddTab : function(){
                    new AssignmentTabEdit({
                        isEditing:false,
                        rowData:this.selectedRow
                    });
                },
                
                //Open an edit tab on row/edit button click
                openEditTab : function(){
                    new AssignmentTabEdit({
                        isEditing:true,
                        rowData:this.selectedRow
                    });
                }
            });
        }
        return instance;
    };
});