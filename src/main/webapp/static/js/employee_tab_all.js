define([
        "dojo/_base/declare",
        "mydojo/base_tab_all"
], function(
        declare,
        BaseTabAll
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
                onClose : function(){
                    instance = null;
                    return true;
                }
            });
        }
    }
});