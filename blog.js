(() => {
  
    function createElement(id) {
        return document.createElement(id);
    }

    function createArticle(container, articleTitle, articleId) {        
        const a = createElement('a');
        a.textContent = articleTitle;
        a.classList.add('list-group-item', 'list-group-item-action');
        a.setAttribute('href', `details.html?id=${articleId}`); 
        container.append(a); 
    }    

    function createArticles(articles, container) {
        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            const articleTitle = article.title;
            const articleId = article.id;

            createArticle(container, articleTitle, articleId);           
        }    
    }
    
    function configurePagination(pagesCount, currentPage) {
        $(".myPages").pxpaginate( {
            totalPageCount: pagesCount,
            currentpage: currentPage,
            align:'center',
            nextPrevBtnShow: true,
            firstLastBtnShow: true,
            callback: function(pagenumber) { 
                window.location.href = pagenumber === 1 
                    ? 'index.html' 
                    : `index.html?page=${pagenumber}`; 
            }
        });
    }

    async function createBlogApp(container) {        
        const pageParams = new URLSearchParams(window.location.search); 
        const page = pageParams.get('page') === null ? 1 : pageParams.get('page');

        let responseArticles =  await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);
        responseArticles = await responseArticles.json();
        
        const articles = responseArticles.data;
        const meta = responseArticles.meta;
         
        const pagesCount = meta.pagination.pages;
        const currentPage = meta.pagination.page;     
        
        createArticles(articles, container);
        configurePagination(pagesCount, currentPage);       
    }

    window.createBlogApp = createBlogApp;
})();

