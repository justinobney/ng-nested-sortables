app.controller('TreeController', function($scope, $timeout) {

    $scope.selected = null;

    $scope.setSelected = function(child){
        $scope.selected = child;
        console.log(child);
    };

    $scope.pushToSelected = function(task){
        var target = (!!$scope.selected) ? $scope.selected.children : $scope.data.children;
        console.log(target);
        target.push(task);
    };

    $scope.data = {
        children: [
            {
                "TaskType": "Folder","minimized": true,
                "Name": "Engineering: Analysis \u0026 Configuration",
                "TotalHours": 569.03,
                "TotalCost": 77284.2000,
                "Id": 164,
                "SortOrder": 0,
                "ParentId": null,
                "children": [{
                    "TaskType": "Folder","minimized": true,
                    "Name": "Model Development",
                    "TotalHours": 1.80,
                    "TotalCost": 252.0000,
                    "Id": 270,
                    "SortOrder": 11,
                    "ParentId": 164,
                    "children": []
                }, {
                    "TaskType": "Folder","minimized": true,
                    "Name": "Model Checking",
                    "TotalHours": 0.02,
                    "TotalCost": 2.8000,
                    "Id": 1591,
                    "SortOrder": 12,
                    "ParentId": 164,
                    "children": [{
                        "TaskType": "Labor","minimized": true,
                        "TotalCost": 2.8000,
                        "TotalHours": 0.02,
                        "children": [],
                        "Name": "Check Model \u0026 TCC\u0027s (Per Bus)",
                        "Id": 1592,
                        "SortOrder": 1,
                        "ParentId": 1591
                    }]
                }]
            }
        ]
    };

    $scope.data2 = {
        children: [
            {
                "TaskType": "Labor",
                "Name": "New #1",
                "TotalHours": 569.03,
                "TotalCost": 77284.2000,
                "Id": 164,
                "SortOrder": 0,
                "ParentId": null,
                "children": []
            },
            {
                "TaskType": "Labor",
                "Name": "New #2",
                "TotalHours": 1.80,
                "TotalCost": 252.0000,
                "Id": 270,
                "SortOrder": 11,
                "ParentId": null,
                "children": []
            },
            {
                "TaskType": "Labor",
                "Name": "New #3",
                "TotalHours": 0.02,
                "TotalCost": 2.8000,
                "Id": 1591,
                "SortOrder": 12,
                "ParentId": null,
                "children": []
            }
        ]
    };

    $scope.options = {
        listType: 'ol',
        items: 'lis',
        doNotClear: true,
        placeholder: 'ui-state-highlightsss',
        forcePlaceholderSize: true,
        toleranceElement: '> div',
        startMin: true
    };

    $scope.toggleMinimized = function(child) {
        child.minimized = !child.minimized;
    };

    $scope.addChild = function(child) {
        child.children.push({
            title: '',
            children: []
        });
    };

    $scope.remove = function(child) {
        function walk(target) {
            var children = target.children,
                i;
            if (children) {
                i = children.length;
                while (i--) {
                    if (children[i] === child) {
                        return children.splice(i, 1);
                    } else {
                        walk(children[i])
                    }
                }
            }
        }
        walk($scope.data);
    };

    $scope.update = function(event, ui) {

        var root = event.target,
            item = ui.item,
            parent = item.parent(),
            target = (parent[0] === root) ? $scope.data : parent.scope().child,
            child = item.scope().child,
            index = item.index();

        if (!target)
            return;

        target.children || (target.children = []);

        function walk(target, child) {
            var children = target.children,
                i;
            if (children) {
                i = children.length;
                while (i--) {
                    if (children[i] === child) {
                        return children.splice(i, 1);
                    } else {
                        walk(children[i], child);
                    }
                }
            }
        }

        walk($scope.data, child);

        target.children.splice(index, 0, child);
    };

    $scope.isAllowed = function(placeholderEl, placeholderParentEl, itemEl){
        var item = angular.element(itemEl).scope().child;
        var hasParentScope = !!angular.element(placeholderParentEl).scope();
        return item.TaskType == "Folder" || hasParentScope;
    };

});