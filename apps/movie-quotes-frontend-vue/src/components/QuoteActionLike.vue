<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  id: string
  likes: number
}>()

const likes = ref(props.likes)

async function likeQuote() {
  const req = await fetch(`/api/like-movie-quote/${props.id}`, { method: 'POST' })
  const newLikes = Number(await req.text())
  if (newLikes !== likes) {
    likes.value = newLikes
  }
}
</script>

<template>
  <span 
    @click.once="likeQuote"
    class="like-quote mr-5 flex items-center"
    :class="{'cursor-pointer': likes === 0, liked: likes > 0}">
    <svg 
      class="like-icon w-6 h-6 mr-2 text-red-600"
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke-width="1.5" 
      stroke="currentColor" >
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
      <span class="likes-count" w-8>{{ likes }}</span>
  </span>
</template>

<style scoped>
  .like-quote:hover .like-icon,
  .like-quote.liked .like-icon {
    fill: currentColor;
  }
</style>
