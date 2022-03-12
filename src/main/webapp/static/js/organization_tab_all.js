define([
        "dojo/request",
        "dojo/query",
        "dojo/dom-attr",
        "mydojo/base_tab_all",
        "mydojo/organization_tab_edit"
], function(
        request, query, domAttr,
        BaseTabAll, OrganizationTabEdit
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
                    {label:"Yur Address", value:"yurAddress"},
                    {label:"Phys Address", value:"physAddress"},
                    {label:"Director", value:"director"},
                ], 
                gridColumns :[{ field: 'id', label: 'Id'},
                    { field: 'name', label: "Name"},
                    { field: 'yurAddress', label: "Yur Address"},
                    { field: 'physAddress', label: "Phys Address"}, 
                    { field: 'director', label: 'Director'} 
                ],
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
                    this.grid.set("collection", this.gridData.filter(filterData));
                },
                onGridUpdate: function(){
                    var employeeIds = Array();
                    var employeeNodeMap = new Array(1).fill(0).map(() => new Array(1).fill(0));
                    query(".field-director").forEach(function(node){
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
                openAddTab : function(){
                    new OrganizationTabEdit({
                        isEditing:false,
                        rowData:this.selectedRow
                    });
                },
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