$(function() {

    // Nur auf der suchseite
    if($('body.suche')) {

        // Collapse State im Suchformular speichern
        $('.collapse').on('hidden.bs.collapse', function () {
            $('#hdn-collapse').val('collapsed');
        }).on('shown.bs.collapse', function () {
            $('#hdn-collapse').val('in');
        });

        // Reset Suchform
        $('#reset').click(function() {
            $('input[type=text]').attr('value', '');
        });

        // Erzeucgt clickbare <tr>-Elemente
        $('.clickable-row').click(function() {
            window.document.location = $(this).data('href');
        });

        // Bloodhound Datasource mit dynamischer URL
        function getBloodHound(url) {
            return new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                prefetch: {
                    url: url,
                    ttl: 600000 // 10 Minuten
                },
                remote: {
                    url: url + '/%QUERY',
                    wildcard: '%QUERY'
                }
            });
        }

        // Typahead binden
        $('.typeahead').each(function () {
            if($(this).attr('data-typehead').length > 0) {
                $(this).typeahead(
                    {highlight: true},
                    {
                        display: 'value',
                        source: getBloodHound('ajax/' + $(this).data('typehead').replace('-', '/'))
                    }
                );
            }
        });

    } // if($('body.suche'))

});