(function ($) {
    $.fn.simpleJekyllSearch = function (options) {
        var settings = $.extend({
            jsonFile: '/search.json',
            jsonFormat: 'title,description,type,url,date,shortdate',
            template: '<li><a href="{url}">{title} - <span class="entry-date"><time datetime="{date}">{date}</time></span></a></li>',
            searchResults: '.search-results',
            limit: '10',
            noResults: '<p class="no-results">Ops!<br/><small>Não encontramos nenhum resultado!</small></p>'
        }, options);

        var properties = settings.jsonFormat.split(',');

        var jsonData = [],
            origThis = this,
            searchResults = $(settings.searchResults);

        if (settings.jsonFile.length && searchResults.length) {
            $.ajax({
                type: "GET",
                url: settings.jsonFile,
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    jsonData = data;
                    registerEvent();
                },
                error: function (x, y, z) {
                    console.log("***ERROR in simpleJekyllSearch.js***");
                    console.log(x);
                    console.log(y);
                    console.log(z);
                    // x.responseText should have what's wrong
                }
            });
        }


        function registerEvent() {
            origThis.keyup(function (e) {
                if ($(this).val().length) {
                    writeMatches(performSearch($(this).val()));
                } else {
                    clearSearchResults();
                }
            });
        }

        function performSearch(str) {
            var matches = [];

            $.each(jsonData, function (i, entry) {
                for (var i = 0; i < properties.length; i++)
                    if (entry[properties[i]] !== undefined && entry[properties[i]].toLowerCase().indexOf(str.toLowerCase()) !== -1) {
                        matches.push(entry);
                        i = properties.length;
                    }
            });
            return matches;

        }

        function writeMatches(m) {
            clearSearchResults();

            if (m.length) {
                $.each(m, function (i, entry) {
                    if (i < settings.limit) {
                        var output = settings.template;
                        for (var i = 0; i < properties.length; i++) {
                            var regex = new RegExp("\{" + properties[i] + "\}", 'g');
                            output = output.replace(regex, entry[properties[i]]);
                        }
                        searchResults.append($(output));
                    }
                });
            } else {
                searchResults.append(settings.noResults);
            }


        }

        function clearSearchResults() {
            searchResults.children().remove();
        }
    };

    $("#search-input").simpleJekyllSearch();

}(Zepto, window));