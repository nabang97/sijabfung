const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/app.js", "public/js")
    .js("resources/js/script.js", "public/js")
    .js("resources/js/dasar-hukum.js", "public/js")
    .js("resources/js/home.js", "public/js")
    .js("resources/js/jabatan-fungsional.js", "public/js")
    .js("resources/js/sb-admin-2.js", "public/js")
    .js("resources/js/sb-admin-2.min.js", "public/js")
    .js("resources/js/register.js", "public/js")
    .js("resources/js/demo/datatables-dasar-hukum.js", "public/js/demo")
    .js("resources/js/demo/datatables-detail-jabfung.js", "public/js/demo")
    .js("resources/js/demo/datatables-golongan.js", "public/js/demo")
    .js("resources/js/demo/datatables-instansi-pembina.js", "public/js/demo")
    .js("resources/js/demo/datatables-jabatan.js", "public/js/demo")
    .js("resources/js/demo/datatables-jabatan-fungsional.js", "public/js/demo")
    .js("resources/js/demo/datatables-jabfung-pegawai.js", "public/js/demo")
    .js("resources/js/demo/datatables-jenjang-jabatan.js", "public/js/demo")
    .js("resources/js/demo/datatables-kategori.js", "public/js/demo")
    .js("resources/js/demo/datatables-pegawai.js", "public/js/demo")
    .js("resources/js/demo/datatables-rumpun-jabatan.js", "public/js/demo")
    .js("resources/js/user/profile-edit-detail.js", "public/js/user")
    .js("resources/js/user/profile-account-setting.js", "public/js/user")
    .js("resources/js/user/profile-diklat.js", "public/js/user")
    .js("resources/js/demo/datatables-slider.js", "public/js/demo")
    .sass("resources/sass/app.scss", "public/css");
