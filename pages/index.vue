<script setup lang="ts">
import { computed, onMounted } from "vue";
import { usePosts } from "~/store/posts.store";

const posts = usePosts();

onMounted(() => {
  posts.loadPosts();
});

const displayedPosts = computed(() => posts.paginatedPosts);
const totalPages = computed(() => posts.totalPages);

function changePage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    posts.setPage(page);
  }
}

function prevPage() {
  if (posts.currentPage > 1) {
    changePage(posts.currentPage - 1);
  }
}

function nextPage() {
  if (posts.currentPage < totalPages.value) {
    changePage(posts.currentPage + 1);
  }
}

function addPost() {
  posts.addPost({
    title: "New Post",
    id: posts.data.length + 1,
    body: "This is a new post.",
  });
}
</script>

<template>
  <div class="container py-5">
    <div class="gap-5 flex flex-col" v-if="displayedPosts">
      <div
        class="w-full bg-white text-black p-3 rounded-2xl"
        v-for="post in displayedPosts"
        :key="post.id"
      >
        <h3 class="text-2xl font-bold">{{ post.title }}</h3>
        <p class="text-lg">{{ post.body }}</p>
      </div>
    </div>
    <div v-else>Loading...</div>
    <div class="mt-5 flex justify-center items-center gap-2">
      <Button @click="prevPage" :disabled="posts.currentPage === 1"> < </Button>

      <Button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :variant="posts.currentPage === page ? 'default' : 'outline'"
        class="mx-1 text-white"
      >
        {{ page }}
      </Button>

      <Button @click="nextPage" :disabled="posts.currentPage === totalPages">
        >
      </Button>
    </div>
  </div>
</template>

<style scoped></style>
