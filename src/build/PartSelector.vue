<!-- eslint-disable max-len -->
 <!-- eslint-disable click-events-have-key-events -->
<template>
    <div class="part" :class="position">
        <!-- <div>User: {{ userName }}</div> -->
        <router-link :to="{ name: 'Parts', params: { partType: selectedPart.type, id: selectedPart.id } }"><img :src="selectedPart.imageUrl" alt="part" /></router-link>
        <button @click="selectPreviousPart()" class="prev-selector"></button>
        <button @click="selectNextPart()" class="next-selector"></button>
        <span v-pin="{ bottom: pinPadding, right: pinPadding }" @click="pinPadding='30px'" class="sale" v-show="selectedPart.onSale">
          Sale!</span>
    </div>
</template>

<!-- <script>
export default {
  name: 'PartSelector',
  props: ['parts', 'position'],
  data() {
    return {};
  },
  methods: {
    selectNextPart() {
      this.parts;
    },
  },
};
</script> -->

<script setup>
import {
  computed, ref, onUpdated,
} from 'vue';

const pinPadding = ref('10px');

// const userName = inject('userName');

// import availableParts from '../data/parts';

const props = defineProps({
  parts: { type: Array, required: true },
  position: { type: String, required: true, validator(value) { ['left', 'right', 'top', 'center', 'bottom'].includes(value); } },
});
// const parts = availableParts.heads;
const emit = defineEmits(['partSelected']);
const selectedPartIndex = ref(0);
const selectedPart = computed(() => props.parts[selectedPartIndex.value]);

emit('partSelected', selectedPart);

onUpdated(() => emit('partSelected', selectedPart));

function getPreviousValidIndex(index, length) {
  const deprecatedIndex = index - 1;
  return deprecatedIndex < 0 ? length - 1 : deprecatedIndex;
}

function getNextValidIndex(index, length) {
  const incrementedIndex = index + 1;
  return incrementedIndex > length - 1 ? 0 : incrementedIndex;
}

const selectNextPart = () => {
  selectedPartIndex.value = getNextValidIndex(
    selectedPartIndex.value,
    props.parts.length,
  );
  console.log(selectedPart.value);
};

const selectPreviousPart = () => {
  selectedPartIndex.value = getPreviousValidIndex(
    selectedPartIndex.value,
    props.parts.length,
  );
};
</script>

  <style scoped>
  .part {
    position: relative;
    width: 200px;
    height: 200px;
    border: 3px solid #aaa;
  }

  .sale {
    color: white;
    background-color: red;
    padding: 3px;
  }

  .part-title {
    position: absolute;
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: red;
    padding-top: 5px;
    top: -25px;
  }

  .part img {
    width: 200px;
    cursor: pointer;
  }

  .top {
    border-bottom: none;
  }

  .left {
    border-right: none;
  }

  .right {
    border-left: none;
  }

  .bottom {
    border-top: none;
  }

  .left img {
    transform: rotate(-90deg);
  }

  .right img {
    transform: rotate(90deg);
  }

  .prev-selector {
    position: absolute;
    z-index: 1;
    top: -3px;
    left: -28px;
    width: 25px;
    height: 206px;
  }

  .next-selector {
    position: absolute;
    z-index: 1;
    top: -3px;
    right: -28px;
    width: 25px;
    height: 206px;
  }

  .left .prev-selector:after,
  .right .prev-selector:after {
    content: '\25B2'
  }

  .left .next-selector:after,
  .right .next-selector:after {
    content: '\25BC'
  }

  .top .prev-selector:after,
  .bottom .prev-selector:after,
  .center .prev-selector:after {
    content: '\25C4'
  }

  .top .next-selector:after,
  .bottom .next-selector:after,
  .center .next-selector:after {
    content: '\25BA'
  }

  .center .prev-selector,
  .center .next-selector {
    opacity: 0.8;
  }

  .left .prev-selector {
    top: -28px;
    left: -3px;
    width: 179px;
    height: 25px;
  }

  .left .next-selector {
    top: auto;
    bottom: -28px;
    left: -3px;
    width: 179px;
    height: 25px;
  }

  .right .prev-selector {
    top: -28px;
    left: 24px;
    width: 179px;
    height: 25px;
  }

  .right .next-selector {
    top: auto;
    bottom: -28px;
    left: 24px;
    width: 179px;
    height: 25px;
  }

  .highlight {
    border: 1px solid red;
  }
  </style>
