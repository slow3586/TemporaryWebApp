define([
        "dojo/_base/kernel",
        "mydojo/base_tab_all",
        "mydojo/employee_tab_edit"
], function(
        kernel, BaseTabAll, EmployeeTabEdit
){
    var instance = null;
    return function(){
        if(instance === null){
            instance = new BaseTabAll({
                title : "All employees",
                restTarget : "api/employee",
                searchColumnChoices: [
                    {label:"Id", value:"id", selected:true},
                    {label:"First Name", value:"firstname"},
                    {label:"Last Name", value:"lastname"},
                    {label:"Middle Name", value:"middlename"},
                    {label:"Position", value:"position"},
                ], 
                gridColumns :[{ field: 'id', label: 'Id'},
                    { field: 'firstname', label: 'First Name' },
                    { field: 'lastname', label: 'Last Name'},
                    { field: 'middlename', label: 'Middle Name'}, 
                    { field: 'position', label: 'Position'} 
                ],
                assignGlobalVar: function(){
                    kernel.global.employeeTabAllInstance = this;
                },
                onClose : function(){
                    instance = null;
                    return true;
                },
                filterAll : function(){
                    var filterData = {'id':""};
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
                    //this.grid.set("collection", this.gridData.filter(filterData));
                },
                openAddTab : function(){
                    new EmployeeTabEdit({
                        isEditing:false,
                        rowData:this.selectedRow
                    });
                },
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