
function refresh_document_list ( endpoint, allow_all)
{
    document_list_query_string = "SELECT DISTINCT ?g WHERE { GRAPH ?g { ?s ?p ?o } }";
    
    if (endpoint != '')
        sparql_root = endpoint
    else
        sparql_root = 'http://localhost/sparql/';
    
    if (allow_all == '')
        allow_all = false;
    
    var option = $('<option></option>').attr("value", "wait").text("Please wait...");
    $("#document_list").empty().append(option);

    $.ajax({
        url: sparql_root,
        dataType: 'json',
        data: {
            query: document_list_query_string,
        },

        success: function( response ) {
            $("#document_list").empty();
            
            if (allow_all)
            {
                var option = $('<option></option>').attr("value", '').text("All Documents");
                $("#document_list").append(option);
            }
            
            $.each(response.results.bindings, function (index, triple) {
                var text_parts = triple.g.value.split("/");
                var name = "User: " + text_parts[text_parts.length - 2] + " - Doc: " + text_parts[text_parts.length - 1];
                var option = $('<option></option>').attr("value", triple.g.value).text(name);
                $("#document_list").append(option);
            });
            $('#document_list').prop('selectedIndex', 0);
            refresh_page();
        },
    });
}