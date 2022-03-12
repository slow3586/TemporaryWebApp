define([
        "dojo/_base/kernel",
        "dojo/request",
        "dojo/query",
        "dojo/dom-attr",
        "mydojo/base_tab_all",
        "mydojo/assignment_tab_edit",
], function(
        kernel, request, query, domAttr,
        BaseTabAll, AssignmentTabEdit
){    
    var instance = null;
    return function(){
        if(instance === null){
            instance = new BaseTabAll({
                title : "Assignments by me",
                restTarget: "api/assignment",
                searchColumnChoices: [
                    {label:"Id", value:"id", selected:true},
                    {label:"Topic", value:"topic"},
                    {label:"Text", value:"text"},
                    {label:"Status", value:"executeattr"},
                    {label:"Execute by", value:"executeby"},
                    {label:"Executors", value:"executors"}
                ], 
                gridColumns :[{ field: 'id', label: 'ID'},
                    { field: 'topic', label: 'Topic' },
                    { field: 'text', label: 'Text'},
                    { field: 'executeattr', label: 'Status'},
                    { field: 'executeby', label: 'Execute by'},
                    { field: 'executorsIds', label: 'Executors'}
                ],
                assignGlobalVar: function(){
                    kernel.global.assignmentTabByMeInstance = this;
                },
                filterAll : function(){
                    var filterData = {'id':""};
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
                    filterData.authorId=1;
                    this.grid.set("collection", this.gridData.filter(filterData));
                },
                onGridUpdate: function(){
                    var employeeIds = Array();
                    var employeeNodeMap = new Array(1).fill(0).map(() => new Array(1).fill(0));
                    query(".field-executorsIds").forEach(function(node){
                        if(domAttr.get(node, "role")==="gridcell"){
                            var ids = node.innerText.split(",");
                            node.innerText = "";
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
                    for(let i=0; i<employeeIds.length; i++){
                        request("api/employee?id="+employeeIds[i]+"&limit=1").then(
                            function(data){
                                var e = JSON.parse(data)[0];
                                for(let j=0; j<employeeNodeMap[i].length; j++){
                                    employeeNodeMap[i][j].innerText += e.firstname + " " + e.lastname + " ";
                                }  
                            }
                        );
                    }
                },
                onClose : function(){
                    instance = null;
                    return true;
                },
                openAddTab : function(){
                    new AssignmentTabEdit({
                        isEditing:false,
                        rowData:this.selectedRow
                    });
                },
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