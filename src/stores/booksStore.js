import { defineStore } from "pinia";
import axios from "axios";

export const useBooksStore = defineStore("books", {
  state: () => ({
    books: [],
    booksBackup: [],
    errorMessage: "",
    filterBy: { key: "", value: "" },
    loading: true,
  }),
  getters: {
    filterOptions() {
      return [
        {
          key: "Select a filter option",
          value: "clear",
        },
        {
          key: "Filter by title",
          value: "title",
        },
        {
          key: "Filter by Publish Date",
          value: "publishDate",
        },
      ];
    },
  },
  actions: {
    async fetchBooks() {
      try {
        const { data } = await axios.get(
          "https://fakerestapi.azurewebsites.net/api/v1/Books"
        );
        this.books = this.booksBackup = data;
        this.loading = false;
      } catch (error) {
        this.errorMessage = error;
      }
    },
    selectFilterOption(option) {
      this.filterBy.key = option;
    },
    setFilterValue(value) {
      this.filterBy.value = value;
    },
    filterBooks() {
      const filtersFactory = {
        clear: () => this.clearFilters(),
        publishDate: () => this.filterByPublishDate(this.filterBy.value),
        title: () => this.filterByTitle(this.filterBy.value),
      };

      filtersFactory[this.filterBy.key]();
    },
    filterByTitle(title) {
      this.books = this.booksBackup.filter((book) =>
        book.title.toLowerCase().includes(title.toLowerCase())
      );
    },
    filterByPublishDate(publishDate) {
      this.books = this.booksBackup.filter(
        (book) => book.publishDate === publishDate
      );
      alert("Sorry, did't have time to implement it");
    },
    clearFilters() {
      this.loading = true;
      this.filterBy.value = "";
      this.books = this.booksBackup;
      this.loading = false;
    },
  },
});
