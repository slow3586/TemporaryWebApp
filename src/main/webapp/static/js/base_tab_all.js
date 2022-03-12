define([
        "dojo/_base/declare",
        "dojo/_base/kernel",
        "dojo/aspect",
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
        "mydojo/assignment_tab_edit"
], function(
        declare, kernel, aspect, 
        ContentPane, Button, Select, TextBox, Dialog,
        Rest, SimpleQuery, Trackable, 
        Grid, Selection, Pagination,
        AssignmentTabEdit
){
    return declare("BaseTabAll", [ContentPane], {
        title: "BaseTabAll",
        closable: true,
        filterColumn : "id",
        grid: "",
        gridData: "",
        selectedRow: "",
        filterValue: "",
        postCreate : function(){
            var self = this;
            
            this.addChild(new Button({
                label: "Add",
                onClick: function(){self.openAddTab()}
            }));
            this.addChild(new Button({
                label: "Edit",
                onClick: function(){self.openEditTab()}
            }));
            this.addChild(new Button({
                label: "Delete",
                onClick: function(){self.openDeleteDialog()}
            }));
            var grid = this.createGrid();
            this.addChild(new Button({
                label: "Update",
                onClick: function(){
                    self.grid.refresh();
                }
            }));

            var searchoptcb = new Select({
                options: self.searchColumnChoices,
                value: "id",
                onChange: function(newValue){
                    self.filterColumn = newValue;
                    self.filterAll();
                }
            });
            this.addChild(searchoptcb);
            var searchtb = new TextBox({
                label: "Search",
                onChange: function(newValue){
                    self.filterValue = searchtb.get("value");
                    self.filterAll();
                },
                onKeyUp: function(event){
                    self.filterValue = searchtb.get("value");
                    self.filterAll();
                }
            });
            this.addChild(searchtb);
            this.addChild(grid);
            kernel.global.mainTabContainer.addChild(this);
            grid.startup();
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

        openDeleteDialog : function(){
            if(this.gridSelectedRow===undefined) return;

            var dialog = new Dialog({
                title: "Delete assignment "+this.gridSelectedRow.data.topic,
                content: "Are you sure you want to delete "+this.gridSelectedRow.data.topic+"?"
            });
            dialog.addChild(new Button({
                label: "Yes",
                onClick: function(){
                    this.grid.collection.remove(this.gridSelectedRow.data.id);
                    dialog.hide();
                    this.grid.refresh();
                }
            }));
            dialog.addChild(new Button({
                label: "Cancel",
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
                /*
                maxRowsPerPage: 10,
                minRowsPerPage: 10,
                bufferRows: 10,
                pagingDelay: 100,
                 * */
                keepScrollPosition: 'true',
                pagingLinks: 1,
                pagingTextBox: true,
                firstLastArrows: true,
                pageSizeOptions: [10, 20, 30, 40, 50],
                columns: this.gridColumns,
                loadingMessage: 'Loading data...',
                noDataMessage: 'No results found.'
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
            this.grid.on('dgrid-deselect', function (event) {
                self.selectedRow = undefined;
            });
            this.grid.on('.dgrid-row:dblclick', function (event) {
                self.openEditTab();
            });
            return this.grid;
        },
        onGridUpdate : function(){
            this.gridData.forEach(function(item){
                console.log(item.topic);
            });
        },
        openAddTab : function(){
            new AssignmentTabEdit({isEditing:false});
        },
        openEditTab : function(){
            new AssignmentTabEdit({isEditing:true});
        }
    });
});