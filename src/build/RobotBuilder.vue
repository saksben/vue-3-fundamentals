<!-- eslint-disable max-len -->
<template>
  <div class="content">
    <div class="preview">
      <CollapsibleSection>
        <template v-slot:collapse>&#x25B2; Hide</template>
        <template v-slot:expand>&#x25BC; Show</template>
        <div class="preview-content">
          <div class="top-row">
            <img :src="selectedRobot.head.imageUrl" alt="" />
          </div>
          <div class="middle-row">
            <img :src="selectedRobot.leftArm.imageUrl" class="rotate-left" alt="" />
            <img :src="selectedRobot.torso.imageUrl" alt="" />
            <img :src="selectedRobot.rightArm.imageUrl" class="rotate-right" alt="" />
          </div>
          <div class="bottom-row">
            <img :src="selectedRobot.base.imageUrl" alt="" />
          </div>
        </div>
      </CollapsibleSection>
  <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
</div>
    <div class="top-row">
      <!-- <div class="top part"> -->
          <div class="robot-name">
              {{  selectedRobot.head.title }}
              <span v-if="selectedRobot.head.onSale" class="sale">Sale!</span>
          </div>
          <PartSelector :parts="availableParts.heads" position="top" @partSelected="part => selectedRobot.head=part" />
        <!-- <img :src="selectedRobot.head.imageUrl" alt="head" />
        <button @click="selectPreviousHead()" class="prev-selector">&#9668;</button>
        <button @:click="selectNextHead()" class="next-selector">&#9658;</button> -->
      <!-- </div> -->
    </div>
    <div class="middle-row">
      <!-- <div class="left part">
        <img :src="selectedRobot.leftArm.imageUrl" alt="left arm" />
        <button @click="selectPreviousLeftArm()" class="prev-selector">&#9650;</button>
        <button @click="selectNextLeftArm()" class="next-selector">&#9660;</button>
      </div>
      <div class="center part">
        <img :src="selectedRobot.torso.imageUrl" alt="torso" />
        <button @click="selectPreviousTorso()" class="prev-selector">&#9668;</button>
        <button @click="selectNextTorso()" class="next-selector">&#9658;</button>
      </div>
      <div class="right part">
        <img :src="selectedRobot.rightArm.imageUrl" alt="right arm" />
        <button @click="selectPreviousRightArm()" class="prev-selector">&#9650;</button>
        <button @click="selectNextRightArm()" class="next-selector">&#9660;</button>
      </div> -->
      <PartSelector :parts="availableParts.arms" position="left" @partSelected="part => selectedRobot.leftArm=part" />
      <PartSelector :parts="availableParts.torsos" position="center" @partSelected="part => selectedRobot.torso=part" />
      <PartSelector :parts="availableParts.arms" position="right" @partSelected="part => selectedRobot.rightArm=part" />
    </div>
    <div class="bottom-row">
      <!-- <div class="bottom part">
        <img :src="selectedRobot.base.imageUrl" alt="base" />
        <button @click="selectPreviousBase()" class="prev-selector">&#9668;</button>
        <button @click="selectNextBase()" class="next-selector">&#9658;</button>
      </div> -->
      <PartSelector :parts="availableParts.bases" position="bottom" @partSelected="part => selectedRobot.base=part" />
    </div>
    <div>
      <h1>Cart</h1>
      <table>
          <thead>
              <tr>
                  <th>Robot</th>
                  <th class="cost">Cost</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(robot, index) in cart" :key="index">
                  <td>{{ robot.head.title }}</td>
                  <td class="cost">{{ toCurrency(robot.cost) }}</td>
              </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import parts from '../data/parts';
import { toCurrency } from '../shared/formatters';
import PartSelector from './PartSelector.vue';
import CollapsibleSection from '../shared/CollapsibleSection.vue';
// import createdHook from './created-hook-mixin';

// #region Helper functions
// function getNextValidIndex(index, length) {
//   const incrementedIndex = index + 1;
//   return incrementedIndex > length - 1 ? 0 : incrementedIndex;
// }

// function getPreviousValidIndex(index, length) {
//   const decrementedIndex = index - 1;
//   return decrementedIndex < 0 ? length - 1 : decrementedIndex;
// }
// #endregion

// There is a difference using the options api and composition api
// export default {
// name: 'RobotBuilder',
//   setup() {
// function getNextValidIndex(index, length) {
//   const incrementedIndex = index + 1;
//   return incrementedIndex > length - 1 ? 0 : incrementedIndex;
// }

// function getPreviousValidIndex(index, length) {
//   const decrementedIndex = index - 1;
//   return decrementedIndex < 0 ? length - 1 : decrementedIndex;
// }

const availableParts = parts;
// const selectedHeadIndex = ref(0);
// const selectedLeftArmIndex = ref(0);
// const selectedTorsoIndex = ref(0);
// const selectedRightArmIndex = ref(0);
// const selectedBaseIndex = ref(0);
const cart = ref([]);

onMounted(() => console.log('onMounded executed'));
// const selectedRobot = computed(() => ({
//   head: availableParts.heads[selectedHeadIndex.value],
//   leftArm: availableParts.arms[selectedLeftArmIndex.value],
//   torso: availableParts.torsos[selectedTorsoIndex.value],
//   rightArm: availableParts.arms[selectedRightArmIndex.value],
//   base: availableParts.bases[selectedBaseIndex.value],
// }));
const selectedRobot = ref({
  head: {},
  leftArm: {},
  torso: {},
  rightArm: {},
  base: {},
});

const headBorderColor = computed(() => (selectedRobot.value.head.onSale ? 'red' : '#aaa'));

const addToCart = () => {
  const robot = selectedRobot.value;
  const cost = robot.head.cost +
        robot.leftArm.cost +
        robot.torso.cost +
        robot.rightArm.cost +
        robot.base.cost;
  cart.value.push({ ...robot, cost });
  console.log(cart.value.length);
};
// #region Part Selector Methods
// const selectNextHead = () => {
//   selectedHeadIndex.value = getNextValidIndex(
//     selectedHeadIndex.value,
//     availableParts.heads.length,
//   );
// };
// const selectPreviousHead = () => {
//   selectedHeadIndex.value = getPreviousValidIndex(
//     selectedHeadIndex.value,
//     availableParts.heads.length,
//   );
// };
// const selectNextLeftArm = () => {
//   selectedLeftArmIndex.value = getNextValidIndex(
//     selectedLeftArmIndex.value,
//     availableParts.arms.length,
//   );
// };
// const selectPreviousLeftArm = () => {
//   selectedLeftArmIndex.value = getPreviousValidIndex(
//     selectedLeftArmIndex.value,
//     availableParts.arms.length,
//   );
// };
// const selectNextTorso = () => {
//   selectedTorsoIndex.value = getNextValidIndex(
//     selectedTorsoIndex.value,
//     availableParts.torsos.length,
//   );
// };
// const selectPreviousTorso = () => {
//   selectedTorsoIndex.value = getPreviousValidIndex(
//     selectedTorsoIndex.value,
//     availableParts.torsos.length,
//   );
// };
// const selectNextRightArm = () => {
//   selectedRightArmIndex.value = getNextValidIndex(
//     selectedRightArmIndex.value,
//     availableParts.arms.length,
//   );
// };
// const selectPreviousRightArm = () => {
//   selectedRightArmIndex.value = getPreviousValidIndex(
//     selectedRightArmIndex.value,
//     availableParts.arms.length,
//   );
// };
// const selectNextBase = () => {
//   selectedBaseIndex.value = getNextValidIndex(
//     selectedBaseIndex.value,
//     availableParts.bases.length,
//   );
// };
// const selectPreviousBase = () => {
//   selectedBaseIndex.value = getPreviousValidIndex(
//     selectedBaseIndex.value,
//     availableParts.bases.length,
//   );
// };
// #endregion

// return {
//   availableParts,
//   selectedHeadIndex.value,
//   selectedLeftArmIndex.value,
//   selectedTorsoIndex.value,
//   selectedRightArmIndex.value,
//   selectedBaseIndex.value,
//   cart,
//   selectedRobot,
//   toCurrency,
//   addToCart,
//   selectNextHead,
//   selectPreviousHead,
//   selectNextLeftArm,
//   selectPreviousLeftArm,
//   selectNextTorso,
//   selectPreviousTorso,
//   selectNextRightArm,
//   selectPreviousRightArm,
//   selectNextBase,
//   selectPreviousBase,

// };
//   },
// #region option api
//   mixins: [createdHook],
//   data() {
//     return {
//   availableParts: parts,
//   selectedHeadIndex.value: 0,
//   selectedLeftArmIndex.value: 0,
//   selectedTorsoIndex.value: 0,
//   selectedRightArmIndex.value: 0,
//   selectedBaseIndex.value: 0,
//   cart: [],
//     };
//   },
//   computed: {
// selectedRobot() {
//   return {
//     head: this.availableParts.heads[this.selectedHeadIndex.value],
//     leftArm: this.availableParts.arms[this.selectedLeftArmIndex.value],
//     torso: this.availableParts.torsos[this.selectedTorsoIndex.value],
//     rightArm: this.availableParts.arms[this.selectedRightArmIndex.value],
//     base: this.availableParts.bases[this.selectedBaseIndex.value],
//   };
// },
//   },
//   methods: {
// addToCart() {
//   const robot = this.selectedRobot;
//   const cost = robot.head.cost +
//     robot.leftArm.cost +
//     robot.torso.cost +
//     robot.rightArm.cost +
//     robot.base.cost;
//   this.cart.push({ ...robot, cost });
//   console.log(this.cart.length);
// },
// toCurrency,
// selectNextHead() {
//   this.selectedHeadIndex.value = getNextValidIndex(
//     this.selectedHeadIndex.value,
//     this.availableParts.heads.length,
//   );
// },
// selectPreviousHead() {
//   this.selectedHeadIndex.value = getPreviousValidIndex(
//     this.selectedHeadIndex.value,
//     this.availableParts.heads.length,
//   );
// },
// selectNextLeftArm() {
//   this.selectedLeftArmIndex.value = getNextValidIndex(
//     this.selectedLeftArmIndex.value,
//     this.availableParts.arms.length,
//   );
// },
// selectPreviousLeftArm() {
//   this.selectedLeftArmIndex.value = getPreviousValidIndex(
//     this.selectedLeftArmIndex.value,
//     this.availableParts.arms.length,
//   );
// },
// selectNextTorso() {
//   this.selectedTorsoIndex.value = getNextValidIndex(
//     this.selectedTorsoIndex.value,
//     this.availableParts.torsos.length,
//   );
// },
// selectPreviousTorso() {
//   this.selectedTorsoIndex.value = getPreviousValidIndex(
//     this.selectedTorsoIndex.value,
//     this.availableParts.torsos.length,
//   );
// },
// selectNextRightArm() {
//   this.selectedRightArmIndex.value = getNextValidIndex(
//     this.selectedRightArmIndex.value,
//     this.availableParts.arms.length,
//   );
// },
// selectPreviousRightArm() {
//   this.selectedRightArmIndex.value = getPreviousValidIndex(
//     this.selectedRightArmIndex.value,
//     this.availableParts.arms.length,
//   );
// },
// selectNextBase() {
//   this.selectedBaseIndex.value = getNextValidIndex(
//     this.selectedBaseIndex.value,
//     this.availableParts.bases.length,
//   );
// },
// selectPreviousBase() {
//   this.selectedBaseIndex.value = getPreviousValidIndex(
//     this.selectedBaseIndex.value,
//     this.availableParts.bases.length,
//   );
// },
//   },
// #endregion
// };

</script>

<style lang="scss" scoped>
.part {
  position: relative;
  width: 200px;
  height: 200px;
  border: 3px solid #aaa;
}

.top.part {
  border: 3px solid v-bind(headBorderColor);
}

.part {
  img {
    width: 200px;
  }
}

.top-row {
  display: flex;
  justify-content: space-around;
}

.middle-row {
  display: flex;
  justify-content: center;
}

.bottom-row {
  display: flex;
  justify-content: space-around;
  border-top: none;
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

.left img {
  transform: rotate(-90deg);
}

.right img {
  transform: rotate(90deg);
}

.bottom {
  border-top: none;
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

.right .next-selector {
  right: -3px;
}

.robot-name {
    position: absolute;
    top: -25px;
    text-align: center;
    width: 100%;
}

.sale {
    color: red;
}

.content {
    position: relative;
}

.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 310px;
  height: 310px;
  padding: 5px;
}

.preview-content {
  border: 1px solid #999;
}

.preview img {
  width: 70px;
  height: 70px;
}

.rotate-right {
  transform: rotate(90deg);
}

.rotate-left {
  transform: rotate(-90deg);
}

.add-to-cart {
    position: absolute;
    width: 310px;
    padding: 3px;
    font-size: 16px;
}

td,
th {
    text-align: left;
    padding: 5px;
    padding-right: 20px;
}

.cost {
    text-align: right;
}
</style>
