<template>
  <section class="card col-span-12 overflow-hidden bg-base-100 shadow-sm xl:col-span-6">
    <div class="card-body grow-0">
      <h2 class="card-title">
        <a class="link-hover link">Transactions</a>
      </h2>
    </div>
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <tbody>
          <tr v-for="(transaction, index) in transactions" :key="index">
            <td>{{ transaction.name }}</td>
            <td>{{ transaction.date }}</td>
            <td>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                :class="['inline-block h-5 w-5', transaction.type === 'incoming' ? 'text-success' : 'text-error']">
                <path v-if="transaction.type === 'incoming'" fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd" />
                <path v-else d="M6.28 5.22a.75.75 0 00-1.06 1.06l7.22 7.22H6.75a.75.75 0 000 1.5h7.5a.747.747 0 00.75-.75v-7.5a.75.75 0 00-1.5 0v5.69L6.28 5.22z" />
              </svg>
              {{ transaction.amount }} USD
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
const transactions = [
  { name: 'Cy Ganderton', date: 'Feb 2nd', amount: 180, type: 'incoming' },
  { name: 'Hart Hagerty', date: 'Sep 2nd', amount: 250, type: 'incoming' },
  { name: 'Jim Hagerty', date: 'Sep 2nd', amount: 250, type: 'incoming' },
  { name: 'Hart Hagerty', date: 'Sep 2nd', amount: 250, type: 'outgoing' },
  { name: 'Hart Hagerty', date: 'Sep 2nd', amount: 250, type: 'outgoing' },
  { name: 'Brice Swyre', date: 'Jul 2nd', amount: 320, type: 'incoming' },
];
</script>