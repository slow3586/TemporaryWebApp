require([
        //DOJO
        "dojo/_base/kernel",
        "dojo/store/Memory",
        //DIJIT
        "dijit/layout/BorderContainer",
        "dijit/layout/TabContainer", 
        "dijit/MenuBar",
        "dijit/DropDownMenu",
        "dijit/MenuItem",
        "dijit/PopupMenuBarItem",
        "dijit/tree/ObjectStoreModel", 
        "dijit/Tree", 
        //LOCAL
        "mydojo/assignment_tab_all",
        "mydojo/assignment_tab_by_me",
        "mydojo/employee_tab_all",
        "mydojo/organization_tab_all",
        "dojo/domReady!",
], function(
        //DOJO
        kernel, Memory, 
        //DIJIT
        BorderContainer, TabContainer, MenuBar, DropDownMenu, MenuItem, 
        PopupMenuBarItem, ObjectStoreModel, Tree,
        //LOCAL
        AssignmentTabAll, AssignmentTabByMe, EmployeeTabAll, OrganizationTabAll
){
    //
    //  Initialization
    //
    
    //
    //  Border container    -   Init
    //
    kernel.global.mainBorderContainer = new BorderContainer({style: "height: 100%; width:100%;", liveSplitters:true, gutter:true});

    //
    //  Menu bar    -   Languages
    //
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

    //
    //  Tab container   -   Init
    //
    kernel.global.mainTabContainer = new TabContainer({region: "center"});
    kernel.global.mainBorderContainer.addChild(kernel.global.mainTabContainer);

    //
    //  Tree menu   -   Init memory
    //
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

    //
    //  Tree menu   -   Init model
    //
    var treeMenuModel = new ObjectStoreModel({
        store: treeMenuMemory,
        query: {id: 'root'},
        mayHaveChildren: function(item){
            return item.type==='folder';
        }
    });

    //
    //  Tree menu   -   Init tree
    //
    var tree = new Tree({
        model: treeMenuModel,
        region: "left",
        showRoot: false
    });
    kernel.global.mainBorderContainer.addChild(tree);
    
    //
    //  Tree menu   -   Click events
    //
    tree.onClick = function(item, node, event){
        if(item.id==='assignments_all')
            AssignmentTabAll();
        else if(item.id==='assignments_by_me')
            AssignmentTabByMe();
        else if(item.id==='assignments_for_me')
            AssignmentTabAll();
        else if(item.id==='organizations')
            OrganizationTabAll();
        else if(item.id==='employees')
            EmployeeTabAll();
    }

    //
    //  Start everything
    //
    document.body.appendChild(kernel.global.mainBorderContainer.domNode);
    kernel.global.mainBorderContainer.startup();   
    
});