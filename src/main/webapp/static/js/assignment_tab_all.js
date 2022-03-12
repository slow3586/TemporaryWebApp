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
                    { field: 'executors', label: 'Executors'},
                    { field: 'authorId', label: 'Author'}
                ],
                employeeList: {},
                onGridUpdate: function(){
                    query(".field-authorId").forEach(function(node){
                        console.log(node.innerText);
                        if(domAttr.get(node, "role")==="gridcell"){
                            return request("api/employee?id="+node.innerText+"&limit=1").then(
                                function(data){
                                    var author = JSON.parse(data)[0];
                                    console.log(author);
                                    console.log(author.firstname +" "+ author.lastname);
                                    html.set(node, author.firstname + " " + author.lastname);
                                },
                                function(error){
                                    return error;
                                }
                            );
                        }
                    })
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