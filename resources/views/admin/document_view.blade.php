<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $data->judul }}</title>
    <style>
        * {
            margin: 0 auto;
        }

        body {
            overflow: hidden
        }

    </style>
</head>

<body>
    <embed src="{{ url('storage/uploads/'.$data->file_path) }}" type="application/pdf"
        style="width:100vw; height: 100vh; padding:0px">
</body>

</html>
