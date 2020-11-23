<template>
  <div>
    <h1>Voici la liste de tous les articles</h1>
    <div
      v-for="post in posts"
      v-bind:key="post.id"
      class="row articles-content"
    >
      <div class="col-lg-10 offset-lg-1 articles">
        <h2 class="title">{{ post.title }}</h2>

        <p class="articles-datas">
          <span class="author-name"
            >Ecrit par
            <b
              ><em
                >{{ post.author.firstName }} {{ post.author.lastName }}</em
              ></b
            ></span
          >,<span class="data"> {{ formatDate(post.createdAt) }}</span>
        </p>
        <p>{{ post.content | truncate 10 '....' }}</p>
        <a :href="'http://localhost:8080/post/' + post.id" class="see-more"
          ><em>Voir l'article...</em></a
        >
      </div>
    </div>
    <ul class="pagination">
      <li
        :class="n === page ? 'page-active' : 'page-inactive'"
        v-for="n in Math.floor(postsCount / 5)"
        :key="n"
        @click="getPosts(n)"
      >
        {{ n }}
      </li>
    </ul>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";

export default {
  name: "PostsList",
  data() {
    return {
      posts: [],
      userId: null,
      isAdmin: false,
      postsCount: 0,
      page: 1,
    };
  },
  methods: {
    getPosts(page) {
      this.page = page;
      PostDataService.getAll(page)
        .then((response) => {
          this.posts = response.data.posts.rows;
          this.postsCount = response.data.posts.count;
        })
        .catch((e) => {
          console.log("error", e);
        });
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  mounted() {
    this.getPosts(this.page);
    this.userId = localStorage.getItem("userId");
    this.isAdmin = localStorage.getItem("role") === "admin";
  },
};
</script>

<style lang="scss">
@import "../assets/custom.scss";

h1 {
  text-align: center;
}

.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

img {
  width: 100%;
}

.pagination {
  display: flex;
  justify-content: center;

  .page-active {
    background-color: $grey;
  }

  li {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 2px;
    margin: 1rem;
    text-align: center;
  }
}
</style>
