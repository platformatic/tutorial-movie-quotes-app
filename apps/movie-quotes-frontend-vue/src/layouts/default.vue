<script setup>
import { useRouteContext } from '/:core.js'

const context = useRouteContext()
const { page } = context.data

const navActiveClasses = 'font-bold bg-yellow-400 no-underline'
</script>

<template>
  <header class="prose mx-auto mb-6">
    <h1>🎬 Movie Quotes</h1>
  </header>
  <nav class="prose mx-auto mb-6 border-y border-gray-200 flex">
    <a href="/?sort=createdAt" :class="['p-3', page === 'listing-createdAt' ? navActiveClasses : '']">Latest quotes</a>
    <a href="/?sort=likes" :class="['p-3', page === 'listing-likes' ? navActiveClasses : '']">Top quotes</a>
    <a href="/add" :class="['p-3', page === 'add' ? navActiveClasses : '']">Add a quote</a>
  </nav>
  <section class="prose mx-auto">
    <slot />
  </section>
</template>