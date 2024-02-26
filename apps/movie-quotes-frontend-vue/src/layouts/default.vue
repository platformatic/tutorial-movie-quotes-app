<script setup>
import { useRouteContext } from '/:core.js'
const { page } = useRouteContext().data
const navActiveClasses = 'font-bold bg-yellow-400 no-underline'
</script>

<template>
  <header class="prose mx-auto mb-6">
    <h1>🎬 Movie Quotes</h1>
  </header>
  <nav class="prose mx-auto mb-6 border-y border-gray-200 flex">
    <router-link to="/?sort=createdAt" :class="['p-3', page === 'listing-createdAt' ? navActiveClasses : '']">Latest quotes</router-link>
    <router-link to="/?sort=likes" :class="['p-3', page === 'listing-likes' ? navActiveClasses : '']">Top quotes</router-link>
    <router-link to="/add" :class="['p-3', page === 'add' ? navActiveClasses : '']">Add a quote</router-link>
  </nav>
  <section class="prose mx-auto">
    <slot />
  </section>
</template>