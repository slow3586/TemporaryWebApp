define([
        //DOJO
        "dojo/_base/kernel",
        //LOCAL
        "dojo/i18n!mydojo/nls/everything",
        "mydojo/base_tab_all",
        "mydojo/employee_tab_edit"
], function(
        kernel, 
        //LOCAL
        i18, BaseTabAll, EmployeeTabEdit,
){
     //Tab singleton instance
    var instance = null;
    
    //Return new instance if there is none
    return function(){
        if(instance === null){
            instance = new BaseTabAll({
                
                //Tab title
                title : i18.employee_all_title,
                
                //REST path
                restTarget : "api/employee",
                
                //Columns list for the filter selection
                searchColumnChoices: [
                    {label:i18.employee_all_column_id, value:"id", selected:true},
                    {label:i18.employee_all_column_firstname, value:"firstname"},
                    {label:i18.employee_all_column_lastname, value:"lastname"},
                    {label:i18.employee_all_column_middlename, value:"middlename"},
                    {label:i18.employee_all_column_position, value:"position"},
                ], 
                
                //Grid column labels and fields for the grid itself
                gridColumns :[{ field: 'id', label: i18.employee_all_column_id},
                    { field: 'firstname', label: i18.employee_all_column_firstname },
                    { field: 'lastname', label: i18.employee_all_column_lastname},
                    { field: 'middlename', label: i18.employee_all_column_middlename}, 
                    { field: 'position', label: i18.employee_all_column_position} 
                ],
                
                //Saves the tab instance to a global variable.
                assignGlobalVar: function(){
                    kernel.global.employeeTabAllInstance = this;
                },
                
                //Sets up delete dialog.
                openDeleteDialog : function(){
                    this._openDeleteDialog(i18.base_tab_all_delete_title+this.selectedRow.data.firstname, 
                        i18.base_tab_all_delete_content+this.selectedRow.data.firstname+" "+this.selectedRow.data.lastname+"?", 
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
                        }else if(this.filterColumn==="firstname"){
                            filterData = {'firstname':this.filterValue};
                        }else if(this.filterColumn==="lastname"){
                            filterData = {'lastname':this.filterValue};
                        }else if(this.filterColumn==="middlename"){
                            filterData = {'middlename':this.filterValue};
                        }else if(this.filterColumn==="position"){
                            filterData = {'position':this.filterValue};
                        }
                    }
                    
                     //Apply filter
                    this.grid.set("collection", this.gridData.filter(filterData));
                },
                
                //Delete instance on tab close
                onClose : function(){
                    instance = null;
                    return true;
                },
                
                //Opens a new item tab on add button click
                openAddTab : function(){
                    new EmployeeTabEdit({
                        isEditing:false,
                        rowData:this.selectedRow
                    });
                },
                
                //Open an edit tab on row/edit button click
                openEditTab : function(){
                    new EmployeeTabEdit({
                        isEditing:true,
                        rowData:this.selectedRow
                    });
                }
            });
        }
        return instance;
    };
});