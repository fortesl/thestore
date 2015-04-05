/**
 * Name: management-labels.js
 * Created by lfortes on 2/13/2015.
 */

(function () {
    'use strict';

    angular.module('management').factory('ManagementLabels', ['$translate', function($translate) {

        function continueForm() {
            return $translate.instant('CONTINUE');
        }

        function finishForm() {
            return $translate.instant('ADD');
        }

        function other() {
            return $translate.instant('OTHER');
        }
        function yes() {
            return $translate.instant('YES');
        }
        function no() {
            return $translate.instant('NO');
        }

        function addDepartment() {
            return $translate.instant('ADD_DEPARTMENT');
        }

        function confirmNewDepartment() {
            return $translate.instant(('CONFIRM_NEW_DEPARTMENT'));
        }

        function enterNewDepartment() {
            return $translate.instant(('ENTER_NEW_DEPARTMENT'));
        }

        function repeatNewDepartment() {
            return $translate.instant(('REPEAT_NEW_DEPARTMENT'));
        }

        function departmentTooltip() {
            return $translate.instant(('DEPARTMENT_TOOLTIP'));
        }
        function newDepartment() {
            return $translate.instant(('NEW_DEPARTMENT'));
        }
        function departmentMismatch() {
            return $translate.instant(('DEPARTMENT_MISMATCH'));
        }


        function addCategory() {
            return $translate.instant('ADD_CATEGORY');
        }

        function confirmNewCategory() {
            return $translate.instant(('CONFIRM_NEW_CATEGORY'));
        }

        function enterNewCategory() {
            return $translate.instant(('ENTER_NEW_CATEGORY'));
        }

        function repeatNewCategory() {
            return $translate.instant(('REPEAT_NEW_CATEGORY'));
        }

        function categoryTooltip() {
            return $translate.instant(('CATEGORY_TOOLTIP'));
        }
        function newCategory() {
            return $translate.instant(('NEW_CATEGORY'));
        }
        function categoryMismatch() {
            return $translate.instant(('CATEGORY_MISMATCH'));
        }

        function selectCategory() {
            return $translate.instant('SELECT_CATEGORY');
        }

        function category() {
            return $translate.instant('CATEGORY');
        }

        function department() {
            return $translate.instant('DEPARTMENT');
        }

        return {
            addProduct: function() { return $translate.instant('ADD_PRODUCT'); },
            finishForm: finishForm,
            continueForm: continueForm,
            other: other,
            yes: yes,
            no: no,

            selectDepartment: function() { return $translate.instant('SELECT_DEPARTMENT'); },
            addDepartment: addDepartment,
            confirmNewDepartment: confirmNewDepartment,
            enterNewDepartment: enterNewDepartment,
            repeatNewDepartment: repeatNewDepartment,
            newDepartment: newDepartment,
            departmentTooltip: departmentTooltip,
            departmentMismatch: departmentMismatch,

            selectCategory: selectCategory,
            addCategory: addCategory,
            confirmNewCategory: confirmNewCategory,
            enterNewCategory: enterNewCategory,
            repeatNewCategory: repeatNewCategory,
            newCategory: newCategory,
            categoryTooltip: categoryTooltip,
            categoryMismatch: categoryMismatch,
            category: category,
            department: department

        };
    }]);

})();