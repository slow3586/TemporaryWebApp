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
                onClose : function(){
                    instance = null;
                    return true;
                }
            });
        }
    }
});