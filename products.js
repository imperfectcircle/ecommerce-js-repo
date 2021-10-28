/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable operator-linebreak */
/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable no-undef */
fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
        let choosenProduct = data;
        let categories = [...new Set(data.map((el) => el.category_name))]
        //* data.map(el => el.category_name) mi ritorna un array con tutte le categorie ripetute in base a quanti prodotti hanno quella categoria
        //* new Set(data.map(el => el.category_name)) mi ritorna un set con tutte le categorie ma estratte una sola volta
        //* [... new Set(data.map(el => el.category_name))] ritorna un array del set
            .sort(); // ordino in ordine alfabetico
    
        const PRODUCTWRAPPER = document.querySelector('#productWrapper');
        const PRODUCTSNUMBER = document.querySelector('#productsNumber');
        const SORTBYBUTTONS = document.querySelectorAll('.sortBy');
        const PRICERANGE = document.querySelector('#priceRange');
        const MINPRICE = document.querySelector('#minPrice');
        const SHOWPRICE = document.querySelector('#showPrice');
        const MAXPRICE = document.querySelector('#maxPrice');
        const SEARCHBYWORD = document.querySelector('#searchByWord');
        const CATEGORIESLIST = document.querySelector('#categoriesList');
        SORTBYBUTTONS.forEach((button) => {
            button.addEventListener('click', () => {
                let sortCondition = button.dataset.sort;
                let sorted;
                if (sortCondition === 'up') {
                    sorted = choosenProduct.sort((a, b) => a.product_price - b.product_price);
                } else {
                    sorted = choosenProduct.sort((a, b) => b.product_price - a.product_price);
                }
                displayPruducts(sorted);
            });
        });
        categories.forEach((category) => {
        // CATEGORIESLIST.textContent += category + '\n' //* += aggiungi a quello che già c'è
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML =
        `
        <input data-category="${category}" class="form-check-input" type="radio" name="categoriesFilter" id="${category}">
        <label data-category="${category}" class="form-check-label" for="${category}">
          ${category}
        </label>
        `;
            CATEGORIESLIST.appendChild(div);
        });

        let resetCategories = document.createElement('button');
        resetCategories.classList.add('mt-5', 'btn', 'bgColorAccent');
        resetCategories.textContent = 'Reset';
        CATEGORIESLIST.appendChild(resetCategories);
        resetCategories.addEventListener('click', () => {
            document.querySelectorAll(':checked')
                .forEach((el) => {
                    (el.checked = false);
                }); 
            choosenProduct = data;  
            displayPruducts(choosenProduct);        
        });

        function displayPruducts(products) {
            PRODUCTWRAPPER.textContent = '';
            products.forEach((product) => {
                let col = document.createElement('div');
                col.classList.add('col-12', 'col-md-6', 'mb-3');
                col.innerHTML = 
            `
            <div class="card-product shadow-lg">
                <div>
                    <h4>${product.product_name.substring(0, 20)} [...]</h4>
                    <p>${product.category_name}
                        <span class="float-end">
                            ${product.product_price} €
                        </span>
                    </p>
                </div>
                <p class="small">${product.product_description.substring(0, 40)} [...]</p>
                <a href="#" class="card-product-link shadow"><i class="fas fa-chevron-right"></i></a>
            </div>
            `;
                PRODUCTWRAPPER.appendChild(col);
                PRODUCTSNUMBER.textContent = products.length;
            });
        }
        displayPruducts(choosenProduct);
    
        document.querySelectorAll('[data-category]')
            .forEach((label) => {
                label.addEventListener('click', () => {
                    const CHOOSENCATEGORY = label.dataset.category;
                    let filteredProducts = data.filter((label) => label.category_name === CHOOSENCATEGORY);  
                    choosenProduct = filteredProducts;
                    displayPruducts(choosenProduct);
                });
            });
    
        let maxPriceAvailable = Math.ceil(Math.max(...data.map((el) => el.product_price)));
        let minPriceAvailable = Math.ceil(Math.min(...data.map((el) => el.product_price)));
    
        MINPRICE.textContent = `${minPriceAvailable} €`;
        MAXPRICE.textContent = `${maxPriceAvailable} €`;
        SHOWPRICE.textContent = `${maxPriceAvailable} €`;

        PRICERANGE.min = minPriceAvailable;
        PRICERANGE.max = maxPriceAvailable;
        PRICERANGE.value = maxPriceAvailable;
        PRICERANGE.addEventListener('input', () => {
            let choosenPrice = PRICERANGE.value;
            SHOWPRICE.textContent = `${choosenPrice} €`;
            let filteredProducts = data.filter((el) => el.product_price <= choosenPrice); 
            choosenProduct = filteredProducts;
            displayPruducts(choosenProduct);
        });

        SEARCHBYWORD.addEventListener('input', () => {
            let { value } = SEARCHBYWORD; //* equivale a let value = SEARCHBYWORD.value
            if (value.length > 3) {
                let filteredProducts = data.filter((el) => el.product_name.toLowerCase().includes(value.toLowerCase()));
                choosenProduct = filteredProducts;
                displayPruducts(choosenProduct);
            } else {
                displayPruducts(data);
            }
        });
    });
