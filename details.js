(() => {
    const pageParams = new URLSearchParams(window.location.search); 
    const id = pageParams.get('id');
    const commentsContainer = getElement('comments');
    
    function getElement(id) {
        return document.getElementById(id);
    }

    function createElement(id) {
        return document.createElement(id);
    }

    async function createDetails() {  
        let articleResponse = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
        const textJson = await articleResponse.json();     
        createText(textJson.data);

        let responseComments = await fetch(`https://gorest.co.in/public-api/comments?post_id=${id}`);
        const commentsJson = await responseComments.json();
        createComments(commentsJson.data);             
    }

    function createText(text) {
        const h1 = getElement('articleTitle');
        const p = getElement('articleDetails');
        
        h1.textContent = text.title;
        p.textContent = text.body;
    }

    function createComments(comments) {
        if (comments.length) {
            for (let i = 0; i < comments.length; i++) { 
                const commentatorName = comments[i].name;
                const commentBody = comments[i].body;
    
                createComment(commentatorName, commentBody);           
            }
        } else {
            commentsContainer.textContent = 'Комментариев пока нет';
        }        
    }

    function createComment(commentatorName, commentBody) {        
        const commentContainer = createElement('div');
        const comment = createElement('div');
        const avatarImage = createElement('img');
        const commentator = createElement('h6');        
        const textOfComment = createElement('p');      

        commentContainer.classList.add('media', 'border', 'p-3', 'mb-2');
        avatarImage.setAttribute('src','./img/avatar.png');
        avatarImage.classList.add('mr-3','rounded-circle');
        avatarImage.style.width = '60px';
        comment.classList.add('media-body');
       
        commentator.textContent = commentatorName;
        textOfComment.textContent = `"${commentBody}"`;

        comment.append(commentator);        
        comment.append(textOfComment); 
        
        commentContainer.append(avatarImage);
        commentContainer.append(comment);

        commentsContainer.append(commentContainer); 
    } 
   
    window.createDetails = createDetails;
})();
