<script setup lang="ts">
import { usePosts } from "~/store/posts.store";

const posts = usePosts();
const isLoadingStore = useIsLoadingStore();

onMounted(async () => {
  isLoadingStore.set(true);
  await posts.loadPosts();
  isLoadingStore.set(false);
});

const displayedPosts = computed(() => posts.paginatedPosts);
const totalPages = computed(() => posts.totalPages);

function changePage(page: number) {
  isLoadingStore.set(true);
  setTimeout(() => {
    if (page >= 1 && page <= totalPages.value) {
      posts.setPage(page);
    }
    isLoadingStore.set(false);
  }, 500);
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

function toggleSortOrder() {
  posts.toggleSortOrder();
}

const formData = reactive({
  title: "",
  body: "",
});

function addPost() {
  if (formData.title && formData.body) {
    posts.set({
      title: formData.title,
      id: posts.data.length + 1,
      body: formData.body,
    });
  }
  formData.title = "";
  formData.body = "";
}
</script>

<template>
  <LayoutLoader v-if="isLoadingStore.isLoading" />
  <div v-else class="bg">
    <div
      class="flex justify-center items-center w-full h-32 bg-indigo-950 text-white text-5xl font-bold"
    >
      Posts
    </div>
    <div class="container py-5">
      <div class="flex justify-center items-center gap-5">
        <Button
          class="mb-5 w-64 text-xl bg-indigo-800 hover:bg-indigo-950"
          @click="toggleSortOrder"
        >
          Sort by ID ({{ posts.isAscending ? "Ascending" : "Descending" }})
        </Button>

        <Button class="mb-5 w-64 text-xl bg-indigo-800 hover:bg-indigo-950">
          <Dialog>
            <DialogTrigger
              class="w-full h-full flex justify-center items-center"
            >
              Add Post
            </DialogTrigger>
            <DialogContent>
              <div class="flex flex-col gap-4 mt-5">
                <Input
                  placeholder="Title"
                  class="bg-indigo-800 border-none outline-none text-white"
                  v-model="formData.title"
                />
                <Input
                  placeholder="Body"
                  class="bg-indigo-800 border-none outline-none text-white"
                  v-model="formData.body"
                />
                <Button
                  class="w-1/4 text-xl mx-auto flex bg-indigo-800 hover:bg-indigo-950"
                  @Click="addPost"
                >
                  Add Post
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </Button>
      </div>

      <div class="gap-5 flex flex-col">
        <div
          class="w-full bg-indigo-950 text-white p-3 rounded-2xl relative"
          v-for="post in displayedPosts"
          :key="post.id"
        >
          <h3 class="text-2xl font-bold">{{ post.title }}</h3>
          <p class="text-lg">{{ post.body }}</p>
          <label class="text-lg absolute right-5 top-2"
            >id: {{ post.id }}</label
          >
        </div>
      </div>

      <div class="mt-5 flex justify-center items-center gap-2">
        <Button
          @click="prevPage"
          class="bg-indigo-950 text-white"
          :disabled="posts.currentPage === 1"
        >
          <
        </Button>

        <Button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page)"
          :variant="posts.currentPage === page ? 'outline' : 'default'"
          class="mx-1 bg-indigo-950 text-white"
        >
          {{ page }}
        </Button>

        <Button
          @click="nextPage"
          class="bg-indigo-950 text-white"
          :disabled="posts.currentPage === totalPages"
        >
          >
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  background-image: url(/bg.jpg);
  background-size: cover;
  min-height: 100vh;
}
</style>
