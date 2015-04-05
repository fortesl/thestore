/**
 * Name: product-management-sevice.js
 * Created by lfortes on 2/13/2015.
 */

(function () {
    'use strict';

    angular.module('management').factory('ProductManagementService', ['$q', 'FIREBASE_URL', '$firebaseArray', function($q, FIREBASE_URL, $firebaseArray) {

        //function getDepartmentsM() {
        //    return $q(function(resolve) {
        //        resolve({status: 'success', departments: [{'label': 'Electronics', id: '1'}, {'label': 'Books', id: '2'}]});
        //    });
        //}

        function getList(path) {
            return $q(function(resolve, reject) {
                var ref = new Firebase(FIREBASE_URL + path);
                var list = $firebaseArray(ref);
                list.$loaded().then(function(rlist) {
                    resolve(rlist);
                })
                .catch(function(error) {
                    reject(error);
                });
            });

        }

        function addListItem(list, item, selected) {
            var listLength = list.length;
            list.$add(item).then(function(ref) {
                if (selected) {
                    if (list.length === listLength) {
                        ref.on("value", function(snapshot) {
                            selected = snapshot.val();
                            selected.$id = ref.key();
                            selected.$priority = null;
                            list.push(selected);
                        }, function (error) {
//                            reject(error);
                            console.log(error);
                        });
                    }
                    else {
                        selected = list[list.$indexFor(ref.key())];
                    }
                }
            })
            .catch(function(error) {
                    console.log(error);
//                    reject(error);
                });
        }

        return {
            getList: getList,
            addListItem: addListItem
        };
    }]);


})();