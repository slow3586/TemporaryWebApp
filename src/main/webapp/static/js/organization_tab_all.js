define([
        //DOJO
        "dojo/_base/kernel",
        //LOCAL
        "dojo/i18n!mydojo/nls/everything",
        "mydojo/base_tab_all",
        "mydojo/organization_tab_edit"
], function(
        //DOJO
        kernel,
        //LOCAL
        i18, BaseTabAll, OrganizationTabEdit,
){
    //Tab singleton instance
    var instance = null;
    
    //Return new instance if there is none
    return function(){
        if(instance === null){
            instance = new BaseTabAll({
                //Tab title
                title : i18.organization_all_title,
                
                //Rest path
                restTarget : "api/organization",
                
                //Columns list for the filter selection
                searchColumnChoices: [
                    {label:i18.organization_column_id, value:"id", selected:true},
                    {label:i18.organization_column_name, value:"name"},
                    {label:i18.organization_column_yuraddress, value:"yurAddress"},
                    {label:i18.organization_column_physaddress, value:"physAddress"},
                    {label:i18.organization_column_director, value:"director"},
                ], 
                
                //Grid column labels and fields for the grid itself
                gridColumns :[{ field: 'id', label: i18.organization_column_id},
                    { field: 'name', label: i18.organization_column_name},
                    { field: 'yurAddress', label: i18.organization_column_yuraddress},
                    { field: 'physAddress', label: i18.organization_column_physaddress}, 
                    { field: 'director', label: i18.organization_column_director} 
                ],
                
                //Saves the tab instance to a global variable.
                assignGlobalVar: function(){
                    kernel.global.organizationTabAllInstance = this;
                },
                
                //Sets up delete dialog.
                openDeleteDialog : function(){
                    this._openDeleteDialog(i18.base_tab_all_delete_title+this.selectedRow.data.name, 
                        i18.base_tab_all_delete_content+this.selectedRow.data.name+"?", 
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
                        }else if(this.filterColumn==="name"){
                            filterData = {'name':this.filterValue};
                        }else if(this.filterColumn==="yurAddress"){
                            filterData = {'yurAddress':this.filterValue};
                        }else if(this.filterColumn==="physAddress"){
                            filterData = {'physAddress':this.filterValue};
                        }else if(this.filterColumn==="director"){
                            filterData = {'director':this.filterValue};
                        }
                    }
                    
                    //Apply filter
                    this.grid.set("collection", this.gridData.filter(filterData));
                },
                
                //When data is done loading,
                //this function replaces author and executor ids
                //with their respective first and last names for clarity.
                onGridUpdate: function(){
                    this.replaceIdsWithEmployees(".field-director");
                },
                
                //Delete instance on tab close
                onClose : function(){
                    instance = null;
                    return true;
                },
                
                //Opens a new item tab on add button click
                openAddTab : function(){
                    new OrganizationTabEdit({
                        isEditing:false,
                        rowData:this.selectedRow
                    });
                },
                
                //Open an edit tab on row/edit button click
                openEditTab : function(){
                    new OrganizationTabEdit({
                        isEditing:true,
                        rowData:this.selectedRow
                    });
                }
            });
        }
        return instance;
    };
});