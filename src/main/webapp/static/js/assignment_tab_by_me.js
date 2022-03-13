define([
        //DOJO
        "dojo/_base/kernel",
        "dojo/request",
        "dojo/query",
        "dojo/dom-attr",
        //LOCAL
        "dojo/i18n!mydojo/nls/everything",
        "mydojo/base_tab_all",
        "mydojo/assignment_tab_edit",
], function(
        //DOJO
        kernel, request, query, domAttr,
        //LOCAL
        i18, BaseTabAll, AssignmentTabEdit
){    
    //Tab singleton instance
    var instance = null;
    
    //Return new instance if there is none
    return function(){
        if(instance === null){
            instance = new BaseTabAll({
                //Tab title
                title : i18.assignment_by_me_title,
                
                //Rest path
                restTarget: "api/assignment",
                
                //Columns list for the filter selection
                searchColumnChoices: [
                    {label:i18.assignment_all_column_id, value:"id", selected:true},
                    {label:i18.assignment_all_column_topic, value:"topic"},
                    {label:i18.assignment_all_column_text, value:"text"},
                    {label:i18.assignment_all_column_status, value:"executeattr"},
                    {label:i18.assignment_all_column_execute_by, value:"executeby"},
                    {label:i18.assignment_all_column_executors, value:"executors"}
                ], 
                
                //Grid column labels and fields for the grid itself
                gridColumns :[{ field: 'id', label: i18.assignment_all_column_id},
                    { field: 'topic', label: i18.assignment_all_column_topic },
                    { field: 'text', label: i18.assignment_all_column_text},
                    { field: 'executeattr', label: i18.assignment_all_column_status},
                    { field: 'executeby', label: i18.assignment_all_column_execute_by},
                    { field: 'executorsIds', label: i18.assignment_all_column_executors}
                ],
                
                //Saves the tab instance to a global variable.
                assignGlobalVar: function(){
                    kernel.global.assignmentTabByMeInstance = this;
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
                        }
                    }
                    
                    //Set up filter to only display rows from author with id 1
                    //TODO: implement users and make tab display user's assignments
                    filterData.authorId = 1;
                    
                    //Apply filter
                    this.grid.set("collection", this.gridData.filter(filterData));
                },
                
                //When data is done loading,
                //this function replaces author and executor ids
                //with their respective first and last names for clarity.
                onGridUpdate: function(){
                    
                    //A list of unique employee IDs that exist in the grid.
                    var employeeIds = Array();
                    
                    //A mapping of employee IDs to cells that have them.
                    var employeeNodeMap = new Array(1).fill(0).map(() => new Array(1).fill(0));
                    
                    //Iterate executor id cells.
                    query(".field-executorsIds").forEach(function(node){
                        if(domAttr.get(node, "role")==="gridcell"){
                            
                            //Get IDs from cell and clear it.
                            var ids = node.innerText.split(",");
                            node.innerText = "";
                            
                            //Iterate ids, put them in the list, map nodes
                            for(let i=0; i<ids.length; i++){
                                if(employeeIds.includes(ids[i])){
                                    employeeNodeMap[employeeIds.indexOf(ids[i])].push(node);
                                }else{
                                    employeeIds.push(ids[i]);
                                    employeeNodeMap[employeeIds.indexOf(ids[i])] = Array();
                                    employeeNodeMap[employeeIds.indexOf(ids[i])].push(node);
                                }
                            }
                        }
                    });
                    
                    //After we're done collecting the IDs,
                    //send ajax request to get the employee data
                    //and put the names in the cells
                    for(let i=0; i<employeeIds.length; i++){
                        request("api/employee?id="+employeeIds[i]+"&limit=1").then(
                            function(data){
                                //Data will be a list, get first item
                                var e = JSON.parse(data)[0];
                                for(let j=0; j<employeeNodeMap[i].length; j++){
                                    employeeNodeMap[i][j].innerText += e.firstname + " " + e.lastname + " ";
                                }  
                            }
                        );
                    }
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