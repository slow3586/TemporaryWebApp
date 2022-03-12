define([
        "dojo/_base/declare",
        "dojo/request",
        "dojo/html",
        "dojo/query",
        "dojo/dom-attr",
        "mydojo/base_tab_all",
        "mydojo/assignment_tab_edit",
], function(
        declare, request, html, query, domAttr,
        BaseTabAll, AssignmentTabEdit
){
    var instance = null;
    return function(){
        if(instance === null){
            instance = new BaseTabAll({
                title : "All assignments",
                restTarget: "api/assignment",
                searchColumnChoices: [
                    {label:"Id", value:"id", selected:true},
                    {label:"Topic", value:"topic"},
                    {label:"Text", value:"text"},
                    {label:"Status", value:"executeattr"},
                    {label:"Execute by", value:"executeby"},
                    {label:"Executors", value:"executors"},
                    {label:"Author", value:"author"}
                ], 
                gridColumns :[{ field: 'id', label: 'ID'},
                    { field: 'topic', label: 'Topic' },
                    { field: 'text', label: 'Text'},
                    { field: 'executeattr', label: 'Status'},
                    { field: 'executeby', label: 'Execute by'},
                    { field: 'executorsIds', label: 'Executors'},
                    { field: 'authorId', label: 'Author'}
                ],
                employeeList: {},
                onGridUpdate: function(){
                    var tempEmployees = {};
                    
                    var nodes = Array();
                    var qwe = Array();
                    var ewq = new Array(1).fill(0).map(() => new Array(1).fill(0));
                    query(".field-authorId").forEach(function(node){
                        if(domAttr.get(node, "role")==="gridcell"){
                            var ids = node.innerText.split(",");
                            node.innerText = "";
                            for(let i=0; i<ids.length; i++){
                                if(qwe.includes(ids[i])){
                                    ewq[qwe.indexOf(ids[i])].push(node);
                                }else{
                                    qwe.push(ids[i]);
                                    ewq[qwe.indexOf(ids[i])] = Array();
                                    ewq[qwe.indexOf(ids[i])].push(node);
                                }
                            }
                        }
                    });
                    query(".field-executorsIds").forEach(function(node){
                        if(domAttr.get(node, "role")==="gridcell"){
                            var ids = node.innerText.split(",");
                            node.innerText = "";
                            for(let i=0; i<ids.length; i++){
                                if(qwe.includes(ids[i])){
                                    ewq[qwe.indexOf(ids[i])].push(node);
                                }else{
                                    qwe.push(ids[i]);
                                    ewq[qwe.indexOf(ids[i])] = Array();
                                    ewq[qwe.indexOf(ids[i])].push(node);
                                }
                            }
                        }
                    });
                    for(let i=0; i<qwe.length; i++){
                        request("api/employee?id="+qwe[i]+"&limit=1").then(
                            function(data){
                                var e = JSON.parse(data)[0];
                                for(let j=0; j<ewq[i].length; j++){
                                    ewq[i][j].innerText += e.firstname + " " + e.lastname + " ";
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
    }
});