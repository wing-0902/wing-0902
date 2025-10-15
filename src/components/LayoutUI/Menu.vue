<template>
  <div class='menuContainer'>
    <button
      :class="{ 'is-active': isOpen, 'is-down': isDown, 'is-45deg': is45deg }"
      @click="toggleMenu"
      aria-label="メニューを開閉"
    >
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>
    <nav
      :class="{'is-open': isOpen}"
    >
      <ul>
        <li>
          <a href="/">ホーム</a>
          <ul>
            <li><a href="/profile/">自己紹介</a></li>
            <li><a>特技</a></li>
            <li><a href="/contact/">連絡先</a></li>
          </ul>
        </li>
        <li>
          <a href="/blog/">ブログ</a><br />
          <span>ブログはじめました！</span>
          <ul>
            <li><a>投稿一覧</a></li>
            <li><a>タグから探す</a></li>
            <li><a>検索</a></li>
          </ul>
        </li>
        <li>
          <a>アプリ一覧</a><br />
          <span>Wingが作成したWebサイト・アプリ等をまとめています．ぜひご覧ください！</span>
          <ul>
            <li><a target="_blank" href="https://github.com/wing-0902">GitHubプロフィール</a></li>
            <li><a target="_blank" href="https://wave.graphics/">Wave Graphics App by Wing</a></li>
            <li><a target="_blank" href="https://lifeis.money/">LIFE IS MONEY</a></li>
          </ul>
        </li>
        <li>
          <a>サイトマップ</a>
          <ul>
            <li><a href="/form/">アンケート</a></li>
            <li>メール：<a href="mailto:wing@me.wing.osaka">wing@me.wing.osaka</a></li>
          </ul>
        </li>
      </ul>
    </nav>
    <div v-if="isOpen" class="overlay" @click="toggleMenu"></div>
  </div>
</template>

<script lang="ts">
  export default {
    name: "HamburgerMenu",
    data() {
      return {
        isOpen: false,
        isDown: false,
        is45deg: false,
      };
    },
    methods: {
      toggleMenu() {
        if (!this.isOpen) {
          this.isOpen = true;
          this.isDown = true;
          setTimeout(() => {
            this.is45deg = true;
          }, 300);
        } else {
          this.isOpen = false;
          this.is45deg = false;
          setTimeout(() => {
            this.isDown = false;
          },300);
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  .menuContainer {
    position: relative;
    z-index: 1000;

    // メニューのほう
    nav {
      position: fixed;
      z-index: 1000;
      top: 0;
      left: 0;
      height: 100dvh;
      width: 400px;
      max-width: 100vw;
      padding-top: 20px;
      transform: translateX(-100%);
      transition: all 0.44s ease-in-out;
      background-color: var(--background-transparent);

      &.is-open {
        transform: translateX(0);
        opacity: 1;
      }
    }

    // ボタンのほう
    button {
      width: 30px;
      height: 30px;
      background: none;
      border: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      cursor: pointer;
      z-index: 1001;
      position: relative;

      .bar {
        display: block;
        width: 100%;
        height: 2px;
        border-radius: 1px;
        background-color: var(--foreground);
        transition: all 0.4s ease;
      }
      &.is-active {
        .bar {
          &:nth-child(2) {
            background-color: transparent;
          }
        }
      }
      &.is-down {
        .bar {
          --goDown: 10px;
          --goUp: -10px;
          &:nth-child(1) {
            transform: translateY(var(--goDown));
          }
          &:nth-child(3) {
            transform: translateY(var(--goUp));
          }
        }
      }
      &.is-45deg {
        .bar {
          &:nth-child(1) {
            transform: translateY(var(--goDown)) rotate(45deg);
          }
          &:nth-child(3) {
            transform: translateY(var(--goUp)) rotate(-45deg);
          }
        }
      }
    }

    .overlay {
      position: fixed;
      z-index: 900;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100dvh;
      transition: all 0.44s ease;
      opacity: 0;
    }
  }
</style>