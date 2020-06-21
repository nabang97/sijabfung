const container = $('#pagination-dasar-hukum');
const template = (e) => {
    e.forEach(element => {
    `<div class="item-news">
        <div class="layer-items"></div>
        <a href="/dasar-hukum/view/${element.id}">${element.judul}</a>
    </div>`
    });

}
const paginationDasarHukum = (urlApi, input) => {
    container.pagination({
        dataSource: function(done) {
            $.ajax({
                type: 'GET',
                url: urlApi,
                data : {data : input},
                success: function(response) {
                    done(response);                    
                }
            });
         },
        pageSize: 6,
        position: 'top',
        showPrevious: true,
        showNext: true,
        callback: function(data, pagination) {
            // template method of yourself
            console.log(data);
            $('#newest-dasar-hukum').empty();
            data.forEach(element => {
                $('#newest-dasar-hukum').append(`<div class="item-news">
                    <div class="layer-items"></div>
                    <a href="/dasar-hukum/view/${element.id}">${element.judul}</a>
                </div>`);
                
            });         
        }
    });
}

$(document).ready(()=>{
    
    container.addHook('beforeInit', function () {
        window.console && console.log('beforeInit...');
        });

    paginationDasarHukum('/api/dasar-hukum/all');

    container.addHook('beforePageOnClick', function () {
        window.console && console.log('beforePageOnClick...');
        //return false
        });

        $('#searchDasarHukum').click(()=>{
            const input = $('#searchInputDasarHukum').val();
            console.log(input);
            paginationDasarHukum('/api/dasar-hukum/all/search', input);
        });
});
