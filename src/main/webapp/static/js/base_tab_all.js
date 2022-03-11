define([
        "dojo/_base/declare",
        "dojo/_base/kernel",
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
        "mydojo/assignment_edit"
], function(
        declare, kernel, 
        ContentPane, Button, Select, TextBox, Dialog,
        Rest, SimpleQuery, Trackable, 
        Grid, Selection, Pagination,
        AssignmentEditTab
){
    return declare("AssignmentAllTab", [ContentPane], {
        title: "All assignments",
        closable: true,
        filterColumn : "id",
        grid: "",
        gridData: "",
        selectedRow: "",
        filterValue: "",
        restTarget: 'api/assignments',
        searchColumnChoices: [
            {label:"Id", value:"id", selected:true},
            {label:"Topic", value:"topic"},
            {label:"Text", value:"text"},
            {label:"Author", value:"author_id"}
        ], 
        postCreate : function(){
            var self = this;
            
            this.addChild(new Button({
                label: "Add",
                onClick: function(){new AssignmentEditTab()}
            }));
            this.addChild(new Button({
                label: "Edit",
                onClick: function(){new AssignmentEditTab({isEditing:true})}
            }));
            this.addChild(new Button({
                label: "Delete",
                onClick: function(){this.openDeleteAssignmentDialog()}
            }));
            var grid = this.createAllAssignmentsGrid();
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
                    self.filterAllAssignments();
                }
            });
            this.addChild(searchoptcb);
            var searchtb = new TextBox({
                label: "Search",
                onChange: function(newValue){
                    self.filterValue = searchtb.get("value");
                    self.filterAllAssignments();
                },
                onKeyUp: function(event){
                    self.filterValue = searchtb.get("value");
                    self.filterAllAssignments();
                }
            });
            this.addChild(searchtb);
            this.addChild(grid);
            kernel.global.mainTabContainer.addChild(this);
            grid.startup();
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
            this.grid.set("collection", this.gridData.filter(filterData));
        },

        openDeleteAssignmentDialog : function(){
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

        createAllAssignmentsGrid : function(){
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
                columns: [{ field: 'id', label: 'ID'},
                    { field: 'topic', label: 'Topic' },
                    { field: 'text', label: 'Text'},
                    { field: 'author_id', label: 'Author', 
                        formatter: function (author) {
                                return author;
                        }
                    }],
                loadingMessage: 'Loading data...',
                noDataMessage: 'No results found.'
            });
            this.grid.on('dgrid-select', function (event) {
                this.gridSelectedRow = this.grid.row(event.rows[0]);
            });
            this.grid.on('dgrid-deselect', function (event) {
                this.gridSelectedRow = undefined;
            });
            this.grid.on('.dgrid-row:dblclick', function (event) {
                new AssignmentEditTab({isEditing:true});
            });
            return this.grid;
        }
    });
});