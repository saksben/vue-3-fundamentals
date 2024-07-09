<template>
  <div class="content">
    <h1>Cart</h1>
    <table>
      <thead>
        <tr>
          <th class="robot-title">
            Robot
          </th>
          <th class="cost">
            Cost
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(robot, index) in cartStore.cart" :key="index">
          <td class="robot-title">
            <img :src="robot.head.imageUrl" alt="" /> {{ robot.head.title }}
          </td>
          <td class="cost">
            {{ toCurrency(robot.cost) }}
          </td>
        </tr>
        <tr class="total">
          <td>Total</td>
          <td>{{ toCurrency(cartStore.cartTotal) }}</td>
        </tr>
      </tbody>
    </table>
    <!-- <h3>Last Robot Cost: {{ cartStore.lastRobotCost }}</h3> -->
  </div>
</template>

<script setup>
import { toCurrency } from '../shared/formatters';
import { useCartStore } from '../stores/cartStore';

const cartStore = useCartStore();
</script>

<style scoped>
.content {
  font-size: 22px;
}
td,
th {
  padding: 5px;
}

.robot-title {
  text-align: left;
  padding-right: 200px;
}

.robot-title img {
  width: 50px;
  vertical-align: middle;
}
.cost {
  text-align: right;
}

.total {
  font-weight: bold;
}
</style>
