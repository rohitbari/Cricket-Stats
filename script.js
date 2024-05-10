document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const titleInput = document.getElementById('titleInput');
    const contentInput = document.getElementById('contentInput');
    const postsSection = document.getElementById('postsSection');

    // Function to fetch and display blog posts
    const fetchPosts = async () => {
        try {
            const response = await fetch('/posts');
            const posts = await response.json();

            // Clear existing posts
            postsSection.innerHTML = '';

            // Display each post
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                `;
                postsSection.appendChild(postElement);
            });
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    // Fetch and display posts when the page loads
    fetchPosts();

    // Event listener for form submission
    postForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if (title && content) {
            try {
                await fetch('/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title, content })
                });

                // Clear form inputs
                titleInput.value = '';
                contentInput.value = '';

                // Fetch and display updated posts
                fetchPosts();
            } catch (error) {
                console.error('Error creating post:', error);
            }
        }
    });
});
