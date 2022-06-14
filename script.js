﻿// USADO COM app_713.js
api = 'https://andre-braga-app-713.herokuapp.com';
$(document).ready(() => {
    $("#bt1").click(function(e){
        usersx.list();
    });
    $("#bt2").click(
        function(e){
            users.list();
        }        
    );
});
var users = {   
    list() {
        $.ajax({
            url: api + '/users',
            type: 'GET',
            success: data => {
                var tx = '';
                tx += '<div class="insert" onclick="user.insert()">Inserir</div>';
                data.forEach(element => {
                    tx += '<div class="user">';
                        tx += '<div class="title">' + element.title + '</div>';
                        tx += '<div class="actions">';
                            tx += '<div class="action" onclick="user.update(' + element.userId + ',\'' + element.title + '\')">Editar</div>';
                            tx += '<div class="action" onclick="user.delete(' + element.userId + ')">Excluir</div>';
                        tx += '</div>';
                    tx += '</div>';
                });
                $('#LISTA').html(tx);
            }
        });        
    }
};
var usersx = {
    list() {
        $.ajax({
            url: api + '/users',
            type: 'GET',
            success: data => {
                var tx = '';
                data.forEach(element => {
                        tx += '<div class="user">';
                        tx += '<div class="title">' + element.title + '</div>';
                        tx += '</div>';
                });
                $('#LISTA').html(tx);
            }
        });        
    }    
};
var user = {
    insert() {
        var title = prompt('Digite o nome:');
        if (title) {
            if (title.trim() != '') {
                $.ajax({
                    type: 'POST',
                    url: api + '/userinsert',
                    data: {title: title},
                }).done(function () {
                    users.list();
                }).fail(function (msg) {
                    //console.log('FAIL');
                }).always(function (msg) {
                    //console.log('ALWAYS');
                });
            }
        }
    },
    update(userId, oldTitle) {
        var title = prompt('Digite o novo nome:', oldTitle);
        if (title) {
            if (title.trim() != '') {
                $.ajax({
                    type: 'POST',
                    url: api + '/userupdate',
                    data: {title: title, userId: userId},
                }).done(function () {
                    users.list();
                }).fail(function (msg) {
                    //console.log('FAIL');
                }).always(function (msg) {
                    //console.log('ALWAYS');
                });
            }
        }
    },
    delete(userId) {
        if (confirm('Confirma a exclusão?')) {
            $.ajax({
                type: 'POST',
                url: api + '/userdelete',
                data: {userId: userId},
            }).done(function () {
                users.list();
            }).fail(function (msg) {
                console.log('FAIL');
            }).always(function (msg) {
                //console.log('ALWAYS');
            });
        }
    },
}