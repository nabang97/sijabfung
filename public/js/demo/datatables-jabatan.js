!function(n){var t={};function a(o){if(t[o])return t[o].exports;var e=t[o]={i:o,l:!1,exports:{}};return n[o].call(e.exports,e,e.exports,a),e.l=!0,e.exports}a.m=n,a.c=t,a.d=function(n,t,o){a.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:o})},a.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},a.t=function(n,t){if(1&t&&(n=a(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var e in n)a.d(o,e,function(t){return n[t]}.bind(null,e));return o},a.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return a.d(t,"a",t),t},a.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},a.p="/",a(a.s=57)}({57:function(n,t,a){n.exports=a(58)},58:function(n,t){var a=$("#tableJabatan").DataTable({processing:!0,ajax:{url:"/api/jabatan",dataType:"json",cache:!1,dataSrc:""},order:[[1,"asc"]],columns:[{data:"id",render:function(n,t,a,o){return o.row+o.settings._iDisplayStart+1}},{data:"name"},{defaultContent:'<button type="button" id="btnEditJabatan" data-toggle="modal" data-target="#modalEditJabatan" class="btn btn-sm btn-primary" >Edit</button> <button type="button"  id="btnRemoveJabatan" class="btn btn-sm btn-primary">Remove</button>'}]});a.on("order.dt search.dt",(function(){a.column(0,{search:"applied",order:"applied"}).nodes().each((function(n,t){n.innerHTML=t+1}))})).draw(),$("#tableJabatan tbody ").on("click","button",(function(){var n=a.row($(this).parents("tr")).data();"btnEditJabatan"==this.id&&$("#modalEditJabatan").on("show.bs.modal",(function(t){$(this).find('input[name="idJabatan"]').val(n.id),$(this).find('input[name="namaJabatan"]').val(n.name)})),"btnRemoveJabatan"==this.id&&o(n.id)})),$("#btnUpdateJabatan").click((function(){var n=$('input[name="namaJabatan"]').val(),t=$(this).parent().parent().find(".modal-body").find('input[name="idJabatan"]').val();e(t,n)}));var o=function(n){$.post("/api/jabatan/destroy",{id:n}).done((function(n){a.ajax.reload(),console.log(n)})).fail((function(n){console.log(n)})).always((function(n){console.log(n)}))},e=function(n,t){$.post("/api/jabatan/update",{id:n,name:t}).done((function(n){tableGolongan.ajax.reload(),console.log(n)})).fail((function(n){console.log(n)})).always((function(n){console.log(n)}))};$("#btnAddJabatan").click((function(n){n.preventDefault();var t=$('input[name="namaJabatan"]').val();console.log(t),$.post("/api/jabatan/store",{_token:"{{csrf_token()}}",name:t}).done((function(n){a.ajax.reload(),console.log(n)})).fail((function(n){console.log(n)})).always((function(n){console.log(n)}))}))}});