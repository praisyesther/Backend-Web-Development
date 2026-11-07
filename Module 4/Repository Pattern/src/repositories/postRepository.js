
const posts = new Map([
  [
    1,
    {
      id: 1,
      title: 'First post',
      body: 'Repository boundaries protect change.',
      authorId: 7,
    },
  ],
  [
    2,
    {
      id: 2,
      title: 'Second post',
      body: 'Services should speak in domain language.',
      authorId: 8,
    },
  ],
]);

let nextId = 3;

const postRepository = {
  findAll() {
    return Array.from(posts.values(), (post) => ({ ...post }));
  },

  findById(id) {
    const post = posts.get(Number(id));
    return post ? { ...post } : null;
  },

  create(fields) {
    const post = {
      ...fields,
      id: nextId++,
    };

    posts.set(post.id, post);
    return { ...post };
  },

  update(id, patch) {
    const post = posts.get(Number(id));

    if (!post) return null;

    const updatedPost = { ...post, ...patch };
    posts.set(Number(id), updatedPost);

    return { ...updatedPost };
  },

  remove(id) {
    return posts.delete(Number(id));
  },
};

module.exports = postRepository;

// When replacing this Map with Prisma, only repository methods
// need to change. The service and controller remain unchanged.
