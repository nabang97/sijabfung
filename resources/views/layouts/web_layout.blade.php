<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>@yield('title')</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <link href="{{ asset('vendor/fontawesome-free/css/all.min.css') }}" rel="stylesheet"
        type="text/css">
    <link rel="stylesheet"
        href="{{ asset('vendor/OwlCarousel2-2.3.4/assets/owl.carousel.min.css') }}">
    <link rel="stylesheet"
        href="{{ asset('vendor/OwlCarousel2-2.3.4/assets/owl.theme.default.min.css') }}">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <style>
        .item {
            background-color: pink;
            /* max-height: 100vh; */
        }

        .owl-dots {
            position: absolute;
            bottom: 20px;
            margin: auto;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .dropdown {
            position: relative;
            display: inline-block;
        }

        .dropdown-content {
            display: none;
            width: content;
            position: absolute;
            background-color: #f9f9f9;
            /* min-width: 100px; */
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            z-index: 2;
            right: 0px;
        }

        .dropdown:hover .dropdown-content {
            display: block;
        }

        .dropdown-list {
            list-style: none;
            padding: 0px
        }

        .dropdown-list>li {
            min-width: 80px;
            padding: 8px 15px;
        }

        .dropdown-list>li:hover,
        .dropdown-list>li>a:hover {
            background: #38A9FF;
            color: white
        }

    </style>
    @yield('style')
</head>

<body>
    <header>
        <!-- Image and text -->
        <nav class="navbar-sijabfung">
            <div class="navbar-logo-sb">
                <a href="#" class="logo">
                    <img src="{{ asset('/img/logo-sumbar.png') }}" alt="" width="45px">
                </a>
            </div>
            <div class="user-menu dropdown">
                <div class="dropdown dropleft">
                    <a href="/login" class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false"><i class="fas fa-user-alt"></i></a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        @if(Auth::user())
                            @if(Auth::user()->role == 1)
                                <a class="dropdown-item" href="/admin/golongan">Dashboard</a>
                                <a class="dropdown-item" href="/logout">Logout</a>
                            @else
                                <a class="dropdown-item" href="/profile">Profile</a>
                                <a class="dropdown-item" href="/logout">Logout</a>
                            @endif
                        @else
                            <a class="dropdown-item" href="/login">Login</a>
                            <a class="dropdown-item" href="/register">Register</a>
                        @endif
                    </div>
                </div>
            </div>
            <button class="navbar-toggle-sb btn btn-default" type="button" collapse-target="#sijabfungMenu"
                button-role="collapse" collapse-status=true><i class="fas fa-bars 7x"></i></button>
            <div class="navbar-menu-sb" id="sijabfungMenu">
                <ul class="navbar-menu-list">
                    <li><a href="/">Home</a></li>
                    <li><a href="/dasar-hukum/all">Dasar Hukum</a></li>
                    <li><a href="/jabatan-fungsional">Jabatan Fungsional</a></li>
                    <li><a href="">Tentang Kami</a></li>
                </ul>
                <!-- <div class="navbar-sijabfung">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/dasar-hukum/all">Dasar Hukum</a></li>
                    <li><a href="/jabatan-fungsional">Jabatan Fungsional</a></li>
                    <li><a href="">Tentang Kami</a></li>
                </ul>
            </div>
            <div class="search-sijabfung dropdown">
                <div class="dropdown dropleft">
                    <a href="/login" class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false"><i class="fas fa-user-alt"></i></a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
@if(Auth::user())
@if(Auth::user()->role == 1)
                                <a class="dropdown-item" href="/admin/golongan">Dashboard</a>
                                <a class="dropdown-item" href="/logout">Logout</a>
@else
                                <a class="dropdown-item" href="/profile">Profile</a>
                                <a class="dropdown-item" href="/logout">Logout</a>
@endif
@else
                            <a class="dropdown-item" href="/login">Login</a>
                            <a class="dropdown-item" href="/register">Register</a>
@endif
                    </div>
                </div>
            </div> -->
            </div>
        </nav>
        @yield('header')
    </header>
    <main>
        @yield('content')
    </main>
    <footer>
        <div class="container">
            <div class="item-footer">
                <h2><strong>BPSDM Sumbar</strong></h2>
                <span style="font-size: 12px"><b>Badan Pengembangan Sumber Daya Manusia</b></span>
                <div class="footer-nav">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/dasar-hukum/all">Dasar Hukum</a></li>
                        <li><a href="/jabatan-fungsional">Jabatan Fungsional</a></li>
                        <li><a href="">Tentang Kami</a></li>
                    </ul>
                </div>
            </div>
            <div class="item-footer">
                <div class="contact">
                    <h5>Kontak</h5>
                </div>
                <div class=" contact-container">
                    <div class="contact-group">
                        <div class="contact-icon"><i class="fas fa-home"></i></div>
                        <div class="contact-desc">
                            <p>Jl. Raya Indarung Padang Besi KM. 12
                            </p>
                        </div>
                    </div>
                    <div class="contact-group">
                        <div class="contact-icon"><i class="fas fa-phone-alt"></i></div>
                        <div class="contact-desc">
                            <p>(0751) 71860, 72370 | Fax (0751) 72370</p>
                        </div>
                    </div>
                    <div class="contact-group">
                        <div class="contact-icon"><i class="fas fa-envelope"></i></div>
                        <div class="contact-desc">
                            <p>diklat.pemprovsumbar@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    @yield('modal')
    <script src="{{ asset('vendor\jquery\jquery.min.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
        integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous">
    </script>
    <script src="{{ asset('vendor\paginationjs\pagination.min.js') }}"></script>
    <script src="{{ asset('vendor\OwlCarousel2-2.3.4\owl.carousel.min.js') }}"></script>
    <script>
        $(document).ready(function () {
            $(".owl-carousel").owlCarousel({
                loop: true,
                autoWidth: false,
                nav: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 1
                    },
                    1000: {
                        items: 1
                    }
                }
            });
        });

    </script>
    @yield('script')
    <script>
        $(document).ready(() => {
            const btnCollapse = $('button[button-role="collapse"]');
            const menuCollapse = $('.navbar-menu-sb');
            const collapseTarget = $(btnCollapse).attr("collapse-target");
            let collapseStatus = $(btnCollapse).attr('collapse-status');

            function btnCollapseFunction(x) {
                if (x.matches) { // If media query matches
                    $(btnCollapse).removeClass("collapse");
                    $(menuCollapse).addClass("collapse");
                    $(collapseTarget).addClass("navbar-expanded");
                } else {
                    $(btnCollapse).addClass("collapse");
                    $(menuCollapse).removeClass("collapse");
                    $(collapseTarget).removeClass("navbar-expanded");
                }
            }

            $(btnCollapse).click(() => {
                // $(collapseTarget).attr('collapse-status', `${!collapseStatus}`);
                $(btnCollapse).attr("collapse-status", function (i, origValue) {
                    if (origValue == 'true') {
                        $(collapseTarget).removeClass("collapse");
                        $(collapseTarget).addClass("navbar-expanded");

                        return false;
                    } else {
                        $(collapseTarget).addClass("collapse");
                        $(collapseTarget).removeClass("navbar-expanded");
                        return true;
                    }
                });
            });

            var x = window.matchMedia("(max-width: 990px)")
            btnCollapseFunction(x) // Call listener function at run time
            x.addListener(btnCollapseFunction) // Attach listener function on state changes

        })

    </script>
</body>

</html>
