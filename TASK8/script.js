$(document).ready(function () {

    let booksData = [];

    $.ajax({
        url: "book.xml",
        dataType: "xml",
        success: function (xml) {

            $(xml).find("book").each(function () {

                let book = {
                    title: $(this).find("title").text(),
                    author: $(this).find("author").text(),
                    genre: $(this).find("genre").text(),
                    price: parseFloat($(this).find("price").text()),
                    publish_date: $(this).find("publish_date").text()
                };

                booksData.push(book);
            });

            populateFilters(booksData);
            displayBooks(booksData);
        }
    });

    function populateFilters(data) {

        let genres = new Set();
        let authors = new Set();

        data.forEach(book => {
            genres.add(book.genre);
            authors.add(book.author);
        });

        genres.forEach(genre => {
            $("#genreFilter").append(`<option value="${genre}">${genre}</option>`);
        });

        authors.forEach(author => {
            $("#authorFilter").append(`<option value="${author}">${author}</option>`);
        });
    }

    function displayBooks(data) {

        let tbody = $("#bookTable tbody");
        tbody.empty();

        data.forEach(book => {
            tbody.append(`
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.genre}</td>
                    <td>${book.price}</td>
                    <td>${book.publish_date}</td>
                </tr>
            `);
        });
    }

    $("#applyFilter").click(function () {

        let selectedGenre = $("#genreFilter").val();
        let selectedAuthor = $("#authorFilter").val();
        let minPrice = $("#minPrice").val();
        let maxPrice = $("#maxPrice").val();

        let filtered = booksData.filter(book => {

            let matchGenre = selectedGenre === "all" || book.genre === selectedGenre;
            let matchAuthor = selectedAuthor === "all" || book.author === selectedAuthor;
            let matchMin = minPrice === "" || book.price >= parseFloat(minPrice);
            let matchMax = maxPrice === "" || book.price <= parseFloat(maxPrice);

            return matchGenre && matchAuthor && matchMin && matchMax;
        });

        displayBooks(filtered);
    });

});