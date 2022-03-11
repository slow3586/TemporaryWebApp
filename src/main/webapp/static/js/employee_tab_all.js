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
                onClose : function(){
                    instance = null;
                    return true;
                }
            });
        }
    }
});