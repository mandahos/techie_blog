async function newPost(event) {
    event.preventDefault();
    const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('textarea[name="post-text"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_text,
        }),
        headers: { 
            'Content-Type': 'application/json'
        });
    if (response.ok) {
        document.location.replace("./main");
    }  else {
        alert(response.statusText);
    }
}

document.querySelector(".post-form").addEventListener("submit", newPost);