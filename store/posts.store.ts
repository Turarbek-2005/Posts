import { defineStore } from "pinia";

export const usePosts = defineStore("posts", {
  state: () => ({
    data: [] as Array<{ id: number; title: string; body: string }>,
    currentPage: 1,
    itemsPerPage: 10,
    isAscending: true,
  }),
  getters: {
    sortedData(state): Array<{ id: number; title: string; body: string }> {
      return state.isAscending
        ? state.data.slice().sort((a, b) => a.id - b.id)
        : state.data.slice().sort((a, b) => b.id - a.id);
    },
    paginatedPosts(state): Array<{ id: number; title: string; body: string }> {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = state.currentPage * state.itemsPerPage;
      return this.sortedData.slice(start, end);
    },
    totalPages(state): number {
      return Math.ceil(state.data.length / state.itemsPerPage);
    },
  },
  actions: {
    async loadPosts() {
      const isLoadingStore = useIsLoadingStore();
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        this.data = data;
      } finally {
        isLoadingStore.set(false);
      }
    },
    set(post: { id: number; title: string; body: string }) {
      this.data.push(post);
      this.currentPage = this.totalPages;
    },
    setPage(page: number) {
      this.currentPage = page;
    },
    toggleSortOrder() {
      this.isAscending = !this.isAscending;
    },
  },
});

export const useIsLoadingStore = defineStore("isLoading", {
  state: () => ({
    isLoading: true,
  }),
  actions: {
    set(data: boolean) {
      this.$patch({ isLoading: data });
    },
  },
});
