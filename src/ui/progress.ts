import { createEl, createStyle } from "../lib/createEl";
import progressCss from "./progress.css";
import progressHtml from "./progress.html";

import type * as _vue from "vue";
declare const Vue: typeof _vue;
import "./injectVue";

createStyle(progressCss);

export const el = createEl(progressHtml);
export interface progressVM extends _vue.ComponentPublicInstance {
  totalChapterNumber: number;
  finishedChapterNumber: number;
  zipPercent: number;
  reset: () => void;
}
export const vm = Vue.createApp({
  data() {
    return {
      totalChapterNumber: 0,
      finishedChapterNumber: 0,
      zipPercent: 0,
    };
  },
  computed: {
    chapterPercent() {
      if (this.totalChapterNumber !== 0 && this.finishedChapterNumber !== 0) {
        return (this.finishedChapterNumber / this.totalChapterNumber) * 100;
      } else {
        return 0;
      }
    },
    chapterProgressSeen() {
      return this.chapterPercent !== 0;
    },
    zipProgressSeen() {
      return this.zipPercent !== 0;
    },
    ntProgressSeen() {
      if (this.chapterProgressSeen || this.zipProgressSeen) {
        return true;
      } else {
        return false;
      }
    },
    chapterProgressTitle() {
      return `章节：${this.finishedChapterNumber}/${this.totalChapterNumber}, ${this.chapterPercent}`;
    },
  },
  methods: {
    reset() {
      this.totalChapterNumber = 0;
      this.finishedChapterNumber = 0;
      this.zipPercent = 0;
    },
  },
}).mount(el);
