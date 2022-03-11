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
                title:"Assignments by me",
                searchColumnChoices:[
                    {label:"Id", value:"id", selected:true},
                    {label:"Topic", value:"topic"},
                    {label:"Text", value:"text"}
                ],
                onClose : function(){
                    instance = null;
                    return true;
                },
                filterAllAssignments : function(){
                    var filterData = {'id':""};
                    if(this.filterValue === undefined || this.filterValue === ""){}
                    else{
                        if(this.filterColumn==="id"){
                            filterData = {'id':this.filterValue};
                        }else if(this.filterColumn==="topic"){
                            filterData = {'topic':this.filterValue};
                        }else if(this.filterColumn==="text"){
                            filterData = {'text':this.filterValue};
                        }
                    }
                    filterData.author_id = 2;
                    console.log(filterData);
                    this.grid.set("collection", this.gridData.filter(filterData));
                }
            });
        }
    }
});