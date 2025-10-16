<script lang="ts">
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    computed: {
      backgroundStyle() {
        return {
          backgroundImage: `url('${this.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      }
    }
  };
</script>

<template>
  <a
    :href='path'
    class="box"
  >
    <div
      class="slot"
      :style="backgroundStyle"
    >
      <div class="textSlot">
        <p class="title">{{ title }}</p>
        <p class="seeMore">もっと見る</p>
      </div>
    </div>
  </a>
</template>

<style lang="scss" scoped>
  .box {
    .slot {
      border-radius: 17px 5px;
      background-image: url();
      height: 200px;
      width: 300px;
      display: flex;
      box-sizing: border-box;
      align-items: flex-end;

      .textSlot {
        width: 100%;
        .title {
          font-size: 1.3em;
          margin-left: 20px;
          transition: all 0.2s ease-in-out;
          text-align: left;
          transform: translateY(50px);
        }

        .seeMore {
          transition: all 0.2s ease;
          text-align: right;
          font-size: 1em;
          transform: translateY(10px);
          opacity: 0;
        }
      }
    }
    &:hover {
      .textSlot {
        .title {
          transform: translateY(26px);
        }
        .seeMore {
          text-align: center;
          opacity: 1;
        }
      }
    }
  }
</style>