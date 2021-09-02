// get value from input text
const searchButton = () => {
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    console.log(searchText);
    searchField.value = '';

    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayBookDiv(data))
}

// find total search result
const displayBookDiv = (data) => {
    result.textContent = '';
    const noResult = document.getElementById('no-result');
    noResult.style.display = "none";
    if(data.numFound === 0){
        noResult.style.display = "block";
    }else{
        const result = document.getElementById('result');
        const para = document.createElement('p');
        para.innerText = `total result : ${data.numFound}`;
        result.appendChild(para);
    }


    // display books result and info
    const slice = data.docs.slice(0, 8);
    const divId = document.getElementById('bookscontainer');
    divId.textContent = '';
    slice.forEach(books => {
        const cover_i = books.cover_i;
        const paraDiv = document.createElement('p');
        paraDiv.classList.add('grid-book')
        paraDiv.innerHTML = `
            <div>
            <img src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg">
            </div>
            <h5>Book Name: ${books.title}</h5>
            <p>Author: ${books.author_name}</p>
            <p>Publisher: ${books.publisher}</p>
            <p>First Published Year: ${books.first_publish_year}</p>
        `;
        divId.appendChild(paraDiv);
    })    
}


