function Blog({ posts }) {
  return (
    <div>
      <h1>Blog</h1>
      <div>
        {posts.map((post) => (
          <p>{post.title}</p>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  console.log(posts);
  return {
    props: {
      posts,
    },
  };
}

export default Blog;
