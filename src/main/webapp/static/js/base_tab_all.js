define([
        //DOJO
        "dojo/_base/declare",
        "dojo/_base/kernel",
        "dojo/aspect",
        "dojo/request",
        "dojo/query",
        "dojo/dom-attr",
        "dijit/layout/ContentPane", 
        "dijit/form/Button",
        "dijit/form/Select",
        "dijit/form/TextBox",
        "dijit/Dialog",
        'dstore/Rest',
        'dstore/SimpleQuery',
        'dstore/Trackable',
        'dgrid/Grid',
        'dgrid/Selection',
        'dgrid/extensions/Pagination',
        //LOCAL
        "dojo/i18n!mydojo/nls/everything",
], function(
        //DOJO
        declare, kernel, aspect, request, query, domAttr, 
        ContentPane, Button, Select, TextBox, Dialog,
        Rest, SimpleQuery, Trackable, 
        Grid, Selection, Pagination,
        //LOCAL
        i18
){
    return declare("BaseTabAll", [ContentPane], {
        title: "BaseTabAll",
        closable: true,
        
        //Base empty values
        filterColumn : "id",
        grid: "",
        gridData: "",
        selectedRow: "",
        filterValue: "",
        
        //Init tab
        postCreate : function(){
            var self = this;
            
            //Top menu buttons
            this.addChild(new Button({
                label: i18.base_tab_all_add,
                onClick: function(){self.openAddTab()}
            }));
            this.addChild(new Button({
                label: i18.base_tab_all_edit,
                onClick: function(){self.openEditTab()}
            }));
            this.addChild(new Button({
                label: i18.base_tab_all_delete,
                onClick: function(){self.openDeleteDialog()}
            }));
            var grid = this.createGrid();
            this.addChild(new Button({
                label: i18.base_tab_all_update,
                onClick: function(){
                    self.grid.refresh();
                }
            }));

            //Search options combo box
            var searchoptcb = new Select({
                options: self.searchColumnChoices,
                value: "id",
                onChange: function(newValue){
                    self.filterColumn = newValue;
                    self.filterAll();
                }
            });
            this.addChild(searchoptcb);
            
            //Search text box
            var searchtb = new TextBox({
                label: "Search"
            });
            this.addChild(searchtb);
            
            //Search button
            this.addChild(new Button({
                label: i18.base_tab_all_search,
                onClick: function(){
                    self.filterValue = searchtb.get("value");
                    self.filterAll();
                }
            }));
            
            //Start up
            this.addChild(grid);
            kernel.global.mainTabContainer.addChild(this);
            grid.startup();
            this.assignGlobalVar();
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
                }
            }
            this.grid.set("collection", this.gridData.filter(filterData));
        },
        
        replaceIdsWithEmployees : function(cellClasses){
            //A list of unique employee IDs that exist in the grid.
            var employeeIds = Array();

            //A mapping of employee IDs to cells that have them.
            var employeeNodeMap = new Array(1).fill(0).map(() => new Array(1).fill(0));
        
            //Iterate author id cells.
            query(cellClasses).forEach(function(node){
                if(domAttr.get(node, "role")==="gridcell"){
                    //Get IDs from cell and clear it.
                    var ids = node.innerText.split(",");
                    if(isNaN(ids[0]) || ids[0]==="") return;
                    node.innerText = "";

                    //Iterate ids, put them in the list, map nodes
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
            
            //Replace status ID with actual string - here for now
            //TODO: move away
            query(".field-executeattr").forEach(function(node){
                if(domAttr.get(node, "role")==="gridcell"){
                    var id = node.innerText;
                    if(isNaN(id[0]) || id[0]==="") return;
                    if(id==="0")
                        node.innerText = "Created";
                    if(id==="1")
                        node.innerText = "Assigned";
                    if(id==="2")
                        node.innerText = "Accepted";
                    if(id==="3")
                        node.innerText = "Executed";
                }
            });

            //After we're done collecting the IDs,
            //send ajax request to get the employee data
            //and put the names in the cells
            for(let i=0; i<employeeIds.length; i++){
                request("api/employee?id="+employeeIds[i]+"&limit=1").then(
                    function(data){
                        //Data will be a list, get first item
                        var e = JSON.parse(data)[0];
                        for(let j=0; j<employeeNodeMap[i].length; j++){
                            if(employeeNodeMap[i][j].innerText!=="")
                                employeeNodeMap[i][j].innerText += ",";
                            employeeNodeMap[i][j].innerText += " " + e.firstname + " " + e.lastname + " ";
                        }  
                    }
                );
            }
        },
        
        openDeleteDialog : function(){
            //this._openDeleteDialog(titleText, contentText, rowId);
        },
        
        _openDeleteDialog : function(titleText, contentText, rowId){
            if(this.selectedRow===undefined) return;
            var self = this;
            var dialog = new Dialog({
                title: titleText,
                content: contentText
            });
            dialog.addChild(new Button({
                label: i18.base_yes,
                onClick: function(){
                    self.gridData.remove(rowId);
                    dialog.hide();
                    self.grid.refresh();
                }
            }));
            dialog.addChild(new Button({
                label: i18.base_cancel,
                onClick: function(){
                    dialog.hide();
                }
            }));

            dialog.show();
        },
        
        createGrid : function(){
            var self = this;
            
            var TrackableRest = declare([Rest, SimpleQuery, Trackable]);
            this.gridData = new TrackableRest({ 
                target: this.restTarget, 
                sortParam: "order_by",
                rangeStartParam: "from",
                rangeCountParam: "limit"
            });

            this.grid = new (declare([ Grid, Pagination, Selection ]))({
                collection: this.gridData,
                selectionMode: 'single',
                keepScrollPosition: 'true',
                pagingLinks: 1,
                pagingTextBox: true,
                firstLastArrows: true,
                pageSizeOptions: [10, 20, 30, 40, 50],
                columns: this.gridColumns,
                loadingMessage: i18.base_tab_all_loading_data,
                noDataMessage: i18.base_tab_all_no_data
            });
            aspect.after(this.grid, 'gotoPage', function (promise, args) {
                promise.then(function () {
                    self.onGridUpdate();
                });
                return promise;
            });
            this.grid.on('dgrid-select', function (event) {
                self.selectedRow = self.grid.row(event.rows[0]);
            });
            this.grid.on('dgrid-error', function (event) {
                var dialog = new Dialog({
                    title: "Data error",
                    content: "There is a data error: "+event.error
                });
            });
            this.grid.on('dgrid-deselect', function (event) {
                self.selectedRow = undefined;
            });
            this.grid.on('.dgrid-row:dblclick', function (event) {
                self.openEditTab();
            });
            return this.grid;
        },
        
        assignGlobalVar : function(){},
        onGridUpdate : function(){},
        openAddTab : function(){},
        openEditTab : function(){}
    });
});