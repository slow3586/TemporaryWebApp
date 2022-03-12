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
                title : "All organizations",
                restTarget : "api/organization",
                searchColumnChoices: [
                    {label:"Id", value:"id", selected:true},
                    {label:"Name", value:"name"},
                    {label:"Yur Address", value:"yuraddress"},
                    {label:"Phys Address", value:"physaddress"},
                    {label:"Director", value:"director"},
                ], 
                gridColumns :[{ field: 'id', label: 'Id'},
                    { field: 'name', label: "Name"},
                    { field: 'yuraddress', label: "Yur Address"},
                    { field: 'physaddress', label: "Phys Address"}, 
                    { field: 'director', label: 'Director'} 
                ],
                onClose : function(){
                    instance = null;
                    return true;
                }
            });
        }
    }
});