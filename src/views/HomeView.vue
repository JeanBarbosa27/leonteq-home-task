<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useBooksStore } from "@/stores/booksStore";
import CardSection from "@/components/CardSection.vue";
import loadingGif from "@/assets/loading.gif";

const store = useBooksStore();
const { books, loading, filterOptions, filterBy } = storeToRefs(store);

function formatPublishDate(publishDate) {
  const date = new Date(publishDate);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };

  return new Intl.DateTimeFormat("pt-PT", options).format(date);
}

function applyFilterSelection(event) {
  store.selectFilterOption(event.target.value);
}

function applyFilter(event) {
  event.preventDefault();
  store.filterBooks();
}

function applyFilterValue(event) {
  store.setFilterValue(event.target.value);
}

onMounted(async () => {
  await store.fetchBooks();
});
</script>

<template>
  <main class="home">
    <h1 class="home__title">Books from fakerestapi</h1>
    <p class="home__description">
      Here you can find a list of books that comes from
      https://fakerestapi.azurewebsites.net/api/v1/Books.
    </p>
    <div v-if="loading" class="home__loading">
      <img :src="loadingGif" alt="Loading" />
    </div>
    <div v-else class="home__search-results">
      <form @submit="applyFilter">
        <select
          name="filterOption"
          @change="applyFilterSelection"
          class="home__select"
        >
          <option
            v-for="filterOption in filterOptions"
            :key="filterOption.value"
            :value="filterOption.value"
          >
            {{ filterOption.key }}
          </option>
        </select>
        <template v-if="filterBy.key != ''">
          <input
            name="filterValue"
            :value="filterBy.value"
            @input="applyFilterValue"
            placeholder="Type your filter here"
            class="home__input"
          />
          <button
            @click="applyFilter"
            class="home__filter-button home__filter-button--apply"
          >
            Filter
          </button>
          <button
            type="button"
            @click="store.clearFilters"
            class="home__filter-button home__filter-button--clear"
          >
            Clear
          </button>
        </template>
      </form>
      <ul class="home__list">
        <li v-for="book in books" :key="book.id" class="home__item">
          <CardSection cardSectionKey="Title" :cardSectionValue="book.title" />
          <CardSection
            cardSectionKey="Description"
            :cardSectionValue="book.description"
          />
          <CardSection
            cardSectionKey="Publish Date"
            :cardSectionValue="formatPublishDate(book.publishDate)"
          />
        </li>
      </ul>
    </div>
  </main>
</template>
<style lang="scss">
.home {
  &__title {
    font-size: 3.6rem;
  }

  &__loading {
    display: flex;
    width: 100%;
    justify-content: center;

    img {
      max-width: 25rem;
    }
  }

  &__search-results {
    margin-top: 3rem;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1.5rem;
    margin-top: 2rem;
    padding-left: 0;
    list-style: none;
  }

  &__item {
    display: flex;
    flex-direction: column;
  }

  &__select,
  &__input {
    padding: 0.5rem;
  }

  &__input {
    width: 30rem;
    margin-left: 1rem;
  }

  &__filter-button {
    margin-left: 1rem;
    padding: 0.5rem;
    color: #444444;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;

    &--apply {
      background-color: lightblue;
      border: 0.1rem solid lightblue;
    }
    &--clear {
      background-color: lightyellow;
      border: 0.1rem solid lightyellow;
    }
  }
}
</style>
