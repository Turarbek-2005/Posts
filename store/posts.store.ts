import { defineStore } from "pinia";

export const usePosts = defineStore("posts", {
  state: () => ({
    data: [] as Array<{ id: number; title: string; body: string }>,
    currentPage: 1,
    itemsPerPage: 10,
  }),
  getters: {
    paginatedPosts(state) {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = state.currentPage * state.itemsPerPage;
      return state.data.slice(start, end);
    },
    totalPages(state) {
      return Math.ceil(state.data.length / state.itemsPerPage);
    },
  },
  actions: {
    async loadPosts() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      this.data = data;
    },
    addPost(post: { id: number; title: string; body: string }) {
      this.data.push(post);
      this.currentPage = this.totalPages; // Переключение на последнюю страницу
    },
    setPage(page: number) {
      this.currentPage = page;
    },
  },
});
