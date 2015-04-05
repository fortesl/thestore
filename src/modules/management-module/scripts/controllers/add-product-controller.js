/**
 * Name: add-product-controller.js
 * Created by lfortes on 2/13/2015.
 */

(function () {
    'use strict';

    angular.module('management').controller('AddProductController',
        [ 'ProductManagementService', 'ManagementLabels', 'lfToastrService', '$routeParams',
        function(ProductManagementService, ManagementLabels, lfToastrService, $routeParams) {

        var self = this;

        self.init = function () {

            self.labels = ManagementLabels;
            self.departments = [];
            self.categories = [];

            ProductManagementService.getList('/departments').then(function(result) {
                self.departments = result;
                localizeOther(self.departments, self.selectedDepartment);
                if ($routeParams.departmentId) {
                    angular.forEach(self.departments, function(department) {
                        if (department.$id === $routeParams.departmentId) {
                            self.selectedDepartment = department;
                        }
                    });
                }
            }, function(error) {
                lfToastrService.openToast(error.message, 'GET Departments', {closeButton: true, positionClass: 'toast-top-right'});
            });

            ProductManagementService.getList('/categories').then(function(result) {
                self.categories = result;
                localizeOther(self.categories, self.selectedCategory);
            }, function(error) {
                lfToastrService.openToast(error.message, 'GET Categories', {timeOut: 5000, positionClass: 'toast-top-right'});
            });

            self.submitFormLabel = self.labels.continueForm();

        };

        var localizeOther = function(list, selected) {
            var listOther;
            angular.forEach(list, function(item) {
                if (item.id) {
                    item.label = self.labels.other();
                    listOther = item;
                }
            });

            if (!listOther) {
                ProductManagementService.addListItem(list, {label: 'Other', id: 2000}, listOther);
                selected = listOther;
            }
            return listOther;
        };

        self.add = function() {

            if (self.selectedDepartment && !self.selectedCategory) {
                if (self.newDepartmentName) {
                    ProductManagementService.addListItem(self.departments, {label: self.newDepartmentName}, self.selectedDepartment);
                }
            }
            else if (self.selectedCategory) {
                if (self.newCategoryName) {
                    ProductManagementService.addListItem(self.categories,
                        {label: self.newCategoryName, departmentLabel: self.selectedDepartment.label, departmentId: self.selectedDepartment.$id},
                        self.selectedCategory);
                }
            }
        };

        self.departmentCategories = function(category) {
            return (category.id || category.departmentId === self.selectedDepartment.$id);
        };

        self.init();
    }]);

})();