<template>
  <svg 
    width="40" 
    height="40" 
    viewBox="0 0 100 100" 
    class="text-primary-content"
  >
    <!-- Hexagon -->
    <path 
      d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z" 
      fill="currentColor"
      opacity="0.2"
    />
    <!-- Inner hexagon for depth -->
    <path 
      d="M50 15 L80 32.5 L80 67.5 L50 85 L20 67.5 L20 32.5 Z" 
      fill="currentColor"
      opacity="0.4"
    />
    <!-- Core hexagon -->
    <path 
      d="M50 25 L70 37.5 L70 62.5 L50 75 L30 62.5 L30 37.5 Z" 
      fill="currentColor"
    />
  </svg>
</template>
