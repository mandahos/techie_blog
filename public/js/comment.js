async function commentHandler(event) {
    event.preventDefault();

    const input_text = document.querySelector('textarea[name="comment-area"]')
        .value.trim();
    
    const post_id = window.location.toString().split('/')
    [window.location.toString().split('/').length - 1];

    if (input_text) {
        const response = await fetch(`/api/comments'`, {
            method: 'Post',
            body: JSON.stringify({ post_id, input_text }),
            headers: {'Content-Type': 'application/json'},
        });
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentHandler);