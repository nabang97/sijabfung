!function(a){var e={};function n(t){if(e[t])return e[t].exports;var i=e[t]={i:t,l:!1,exports:{}};return a[t].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=a,n.c=e,n.d=function(a,e,t){n.o(a,e)||Object.defineProperty(a,e,{enumerable:!0,get:t})},n.r=function(a){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:!0})},n.t=function(a,e){if(1&e&&(a=n(a)),8&e)return a;if(4&e&&"object"==typeof a&&a&&a.__esModule)return a;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:a}),2&e&&"string"!=typeof a)for(var i in a)n.d(t,i,function(e){return a[e]}.bind(null,i));return t},n.n=function(a){var e=a&&a.__esModule?function(){return a.default}:function(){return a};return n.d(e,"a",e),e},n.o=function(a,e){return Object.prototype.hasOwnProperty.call(a,e)},n.p="/",n(n.s=47)}({47:function(a,e,n){a.exports=n(48)},48:function(a,e){var n=function(a){return $(".alert-sijabfung")&&$(".alert-sijabfung").remove(),$.post("/api/register/create/account",{data:a}).done((function(a){console.log(a),a.error?$(".data-alert").before('<div class="alert-sijabfung alert-sijabfung-danger">'.concat(a.message,"</div>")):($(".data-alert").before('<div class="alert-sijabfung alert-sijabfung-success">'.concat(a.message,"</div>")),document.getElementById("form-regis").reset())})).fail((function(a){console.log(a)}))};$(document).ready((function(){$.get("/api/instansi-pembina",(function(a,e){var n=$('select[name="instansi_pembina"]');n.empty(),n.append('<option value="0" >Pilih Instansi Pembina</option>'),a.forEach((function(a){n.append("<option value=".concat(a.id,">").concat(a.name,"</option>"))}))})).done((function(a){})).fail((function(a){})).always((function(a){})),$.get("/api/golongan",(function(a,e){a.forEach((function(a){$('select[name="golongan"]').append("<option value=".concat(a.id,">").concat(a.name,"</option>"))}))})).done((function(a){})).fail((function(a){console.log(a)})),$(".datepicker").datepicker({dateFormat:"mm-dd-yy",todayBtn:"linked",clearBtn:!0,changeYear:!0,changeMonth:!0,yearRange:"c-60:c"}),$('select[name="golongan"]').change((function(){console.log($('select[name="golongan"]').val())})),$('select[name="instansi_pembina"]').change((function(){var a;console.log($(this).val()),a=$(this).val(),console.log(a),$.get("/api/rumpun-jabatan-option",{id:a},(function(a,e){var n=$('select[name="rumpun_jabatan"]');n.empty(),n.append('<option value="0">Pilih Rumpun Jabatan</option>'),a.forEach((function(a){n.append("<option value=".concat(a.id,">").concat(a.nama,"</option>"))}))})).done((function(a){console.log(a)})).fail((function(a){})).always((function(a){})),$('select[name="jabatan_fungsional"]').empty(),$('select[name="jabatan_fungsional"]').append("<option>Pilih Jabatan Fungsional</option>")})),$('select[name="rumpun_jabatan"]').change((function(){var a;console.log($(this).val()),a=$(this).val(),console.log(a),$.get("/api/jabatan-fungsional-option",{id:a},(function(a,e){var n=$('select[name="jabatan_fungsional"]');n.empty(),n.append('<option value="0">Pilih Jabatan Fungsional</option>'),a.forEach((function(a){console.log(a.id),n.append("<option value=".concat(a.id,">").concat(a.nama,"</option>"))}))})).fail((function(a){}))})),$('select[name="jabatan_fungsional"]').change((function(){!function(a){$.get("/api/jenjang-jabatan/option",a,(function(a,e){var n=$('select[name="jenjang_kategori_lingkup"]');n.empty(),n.append('<option value="0">Pilih Jenjang-Kategori-Lingkup</option>'),a.forEach((function(a){console.log(a),n.append("<option value=".concat(a.id,">").concat(a.jenjang," - ").concat(a.kategori," - ").concat(1==a.lingkup?"Pusat":"Daerah","</option>"))}))})).done((function(a){console.log(a)})).fail((function(a){console.log(a)})).always((function(a){console.log(a)}))}({id_jabfung:$(this).val()})})),$.validator.addMethod("valueEquals",(function(a,e,n){return n!=a}),"Value must equal arg."),$.validator.addMethod("valueNotEquals",(function(a,e,n){return a==$('input[name="password"]').val()}),"Password and confirm password fields do not match"),$.validator.addMethod("passwordCheck",(function(a,e,n){return!!new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})").test(a)}),"Password must be eight characters or longer, contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character,1 numeric character, least one special character"),$("#form-regis").validate({rules:{email:{required:!0,email:!0},nama:{required:!0},password:{required:!0,passwordCheck:!1},confirm_password:{required:!0,valueNotEquals:!0},nip:{required:!0,maxlength:9,number:!0,minlength:9},tempat_lahir:{required:!0},tanggal_lahir:{required:!0,date:!0},golongan:{required:!0,valueEquals:0},instansi_pembina:{required:!0,valueEquals:0},rumpun_jabatan:{required:!0,valueEquals:0},jabatan_fungsional:{required:!0,valueEquals:0},jenjang_kategori_lingkup:{required:!0,valueEquals:0},unit_kerja_saat_ini:{required:!0,valueEquals:0}},messages:{email:{required:"Email is required"},nama:{required:"Nama is required"},password:{required:"Sandi is required",passwordCheck:"Password must be eight characters or longer, contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character,1 numeric character, least one special character"},confirm_password:{required:"Konfirm Sandi is required",valueNotEquals:"Sandi dan Konfirmasi Sandi tidak cocok"},nip:{required:"NIP is required",maxlength:"Panjang data harus 9 karakter",minlength:"Panjang data harus 9 karakter",number:"Data harus berupa angka"},tempat_lahir:{required:"Tempat lahir is required"},tanggal_lahir:{required:"Tanggal lahir is required"},golongan:{required:"Golongan is required",valueEquals:"Please select an item!"},instansi_pembina:{required:"Instansi Pembina is required",valueEquals:"Please select an item!"},rumpun_jabatan:{required:"Instansi Pembina is required",valueEquals:"Please select an item!"},jabatan_fungsional:{required:"Instansi Pembina is required",valueEquals:"Please select an item!"},jenjang_kategori_lingkup:{required:"Instansi Pembina is required",valueEquals:"Please select an item!"},unit_kerja_saat_ini:{required:"Unit kerja is required"}},submitHandler:function(a){console.log(a);var e=$('input[name="email"]').val(),t=$('input[name="password"]').val(),i=$('input[name="confirm_password"]').val(),o=$('input[name="nip"]').val(),r=$('input[name="nama"]').val(),l=$('input[name="tempat_lahir"]').val(),u=null!=$('input[name="tanggal_lahir"]').val()?Date.parse($('input[name="tanggal_lahir"]').val()).toString("yyyy-MM-dd"):null,s=$('select[name="jenjang_kategori_lingkup"]').val(),c=$('input[name="unit_kerja_saat_ini"]').val();!function(a){$(".alert-sijabfung")&&$(".alert-sijabfung").remove(),$.post("/api/register/create",{data:a},(function(a,e){console.log(e)})).done((function(e){e.error?$(".data-alert").before('<div class="alert-sijabfung alert-sijabfung-danger">'.concat(e.message,"</div>")):n(a)})).fail((function(a){console.log(a)}))}({email:e,password:t,confirm_password:i,nip:o,name:r,golongan:$('select[name="golongan"]').val(),tempat_lahir:l,tanggal_lahir:u,jenjang_kategori_lingkup:s,unit_kerja_saat_ini:c})}})}))}});