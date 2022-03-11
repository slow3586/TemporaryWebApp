require([
        "dojo/_base/kernel",
        "dijit/layout/BorderContainer",
        "dijit/layout/TabContainer", 
        "dijit/MenuBar",
        "dijit/DropDownMenu",
        "dijit/MenuItem",
        "dijit/PopupMenuBarItem",
        "dojo/store/Memory",
        "dijit/tree/ObjectStoreModel", 
        "dijit/Tree", 
        "mydojo/assignment_all",
        "mydojo/assignment_by_me",
        "dojo/domReady!",
], function(
        kernel, BorderContainer, TabContainer, MenuBar, DropDownMenu, MenuItem, PopupMenuBarItem, Memory, ObjectStoreModel, Tree,
        AssignmentAllTab, AssignmentByMe
){

    //
    var createBorderContainer = function() {
        //Init
        kernel.global.mainBorderContainer = new BorderContainer({style: "height: 100%; width:100%;", liveSplitters:true, gutter:true});
        
        createMainMenuBar();
        
        //Main tab container
        kernel.global.mainTabContainer = new TabContainer({region: "center"});
        kernel.global.mainBorderContainer.addChild(kernel.global.mainTabContainer);

        createTreeMenu();
        
        //Startup
        document.body.appendChild(kernel.global.mainBorderContainer.domNode);
        kernel.global.mainBorderContainer.startup();
    };

    function createMainMenuBar(){
        var menu = new MenuBar({region: "top"});
        var subMenu = new DropDownMenu({});
        subMenu.addChild(new MenuItem({
            label: "English"
        }));
        subMenu.addChild(new MenuItem({
            label: "Russian"
        }));
        menu.addChild(new PopupMenuBarItem({
            label: "Language",
            popup: subMenu
        }));
        
        kernel.global.mainBorderContainer.addChild(menu);
    };
    
    function createTreeMenu(){
        var treeMenuMemory = new Memory({
            data: [
                { id: 'root', name: 'root', root:true, type:'folder'},
                { id: 'organizations_root', name:'Organization structure',  parent: 'root', type:'folder'},
                { id: 'organizations', name:'Organizations',  parent: 'organizations_root', type:'item'},
                { id: 'employees', name:'Employees',  parent: 'organizations_root', type:'item'},
                { id: 'assignments_root', name:'Assignments',  parent: 'root', type:'folder'},
                { id: 'assignments_all', name:'All assignments',  parent: 'assignments_root', type:'item'},
                { id: 'assignments_by_me', name:'Assignments by me',  parent: 'assignments_root', type:'item'},
                { id: 'assignments_for_me', name:'Assignments for me',   parent: 'assignments_root', type:'item' },
            ],
            getIconClass: function( item, opened){
                return (!item || this.model.mayHaveChildren(item)) ? (opened ? "dijitFolderOpened" : "dijitFolderClosed") : "dijitLeaf"
            },
            getChildren: function(object){
                return this.query({parent: object.id});
            }
        });
        
        var treeMenuModel = new ObjectStoreModel({
            store: treeMenuMemory,
            query: {id: 'root'},
            mayHaveChildren: function(item){
                return item.type==='folder';
            }
        });
        
        var tree = new Tree({
            model: treeMenuModel,
            region: "left",
            showRoot: false
        });
        
        tree.onClick = function(item, node, event){
            
            if(item.id==='assignments_all' && !kernel.global.allAssignmentsTabOpen){
                AssignmentAllTab();
            }
            if(item.id==='assignments_by_me'){
                AssignmentByMe();
            }
            if(item.id==='assignments_for_me'){
                 
            }
            if(item.id==='organizations'){}
            if(item.id==='employees'){}
        }
        
        kernel.global.mainBorderContainer.addChild(tree);
    }
   
    createBorderContainer();
    
});