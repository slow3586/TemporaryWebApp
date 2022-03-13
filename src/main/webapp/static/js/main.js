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
        "dojo/i18n!mydojo/nls/everything",
        "mydojo/assignment_tab_all",
        "mydojo/assignment_tab_by_me",
        "mydojo/assignment_tab_for_me",
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
        i18, AssignmentTabAll, AssignmentTabByMe, AssignmentTabForMe, EmployeeTabAll, OrganizationTabAll
){
    //
    //  Main application initialization
    //
    
    // Init main border container
    kernel.global.mainBorderContainer = new BorderContainer({style: "height: 100%; width:100%;", liveSplitters:true, gutter:true});

    // Init menu bar with language choices
    var menu = new MenuBar({region: "top"});
    var subMenu = new DropDownMenu({});
    subMenu.addChild(new MenuItem({
        label: i18.lang_english
    }));
    subMenu.addChild(new MenuItem({
        label: i18.lang_russian
    }));
    menu.addChild(new PopupMenuBarItem({
        label: i18.lang_language,
        popup: subMenu
    }));
    kernel.global.mainBorderContainer.addChild(menu);

    // Init main tab container
    kernel.global.mainTabContainer = new TabContainer({region: "center"});
    kernel.global.mainBorderContainer.addChild(kernel.global.mainTabContainer);

    // Init tree menu memory
    var treeMenuMemory = new Memory({
        data: [
            { id: 'root', name: 'root', root:true, type:'folder'},
            { id: 'organizations_root', name:i18.tree_organization_structure,  parent: 'root', type:'folder'},
            { id: 'organizations', name:i18.tree_organizations,  parent: 'organizations_root', type:'item'},
            { id: 'employees', name:i18.tree_employees,  parent: 'organizations_root', type:'item'},
            { id: 'assignments_root', name:i18.tree_assignments,  parent: 'root', type:'folder'},
            { id: 'assignments_all', name:i18.tree_all_assignments,  parent: 'assignments_root', type:'item'},
            { id: 'assignments_by_me', name:i18.tree_assignments_by_me,  parent: 'assignments_root', type:'item'},
            { id: 'assignments_for_me', name:i18.tree_assignments_for_me,   parent: 'assignments_root', type:'item' },
        ],
        //Setup icons
        getIconClass: function( item, opened){
            return (!item || this.model.mayHaveChildren(item)) ? (opened ? "dijitFolderOpened" : "dijitFolderClosed") : "dijitLeaf"
        },
        //Setup parent nodes
        getChildren: function(object){
            return this.query({parent: object.id});
        }
    });

    // Init tree model
    var treeMenuModel = new ObjectStoreModel({
        store: treeMenuMemory,
        query: {id: 'root'},
        //If the item has no children (it's type is folder), then we display it as a leaf.
        mayHaveChildren: function(item){
            return item.type==='folder';
        }
    });

    // Init tree menu
    var tree = new Tree({
        model: treeMenuModel,
        region: "left",
        showRoot: false
    });
    kernel.global.mainBorderContainer.addChild(tree);
    
    // Set up tree menu click events
    tree.onClick = function(item, node, event){
        if(item.id==='assignments_all')
            AssignmentTabAll();
        else if(item.id==='assignments_by_me')
            AssignmentTabByMe();
        else if(item.id==='assignments_for_me')
            AssignmentTabForMe();
        else if(item.id==='organizations')
            OrganizationTabAll();
        else if(item.id==='employees')
            EmployeeTabAll();
    }

    // Start everything
    document.body.appendChild(kernel.global.mainBorderContainer.domNode);
    kernel.global.mainBorderContainer.startup();   
});