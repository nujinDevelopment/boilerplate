<template>
  <div class="py-32 bg-base-200 relative" id="code">
    <div class="container mx-auto px-4">
      <div class="text-center mb-20">
        <h2 class="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up">
          Clean & Modern Code
        </h2>
        <p class="text-xl text-base-content/70 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          Write better code with TypeScript and modern best practices
        </p>
      </div>

      <div class="tabs tabs-boxed justify-center mb-8 max-w-fit mx-auto" data-aos="fade-up">
        <a class="tab" :class="{ 'tab-active': activeTab === 'setup' }" @click="activeTab = 'setup'">Setup</a>
        <a class="tab" :class="{ 'tab-active': activeTab === 'subscription' }" @click="activeTab = 'subscription'">Subscription</a>
        <a class="tab" :class="{ 'tab-active': activeTab === 'components' }" @click="activeTab = 'components'">Components</a>
        <a class="tab" :class="{ 'tab-active': activeTab === 'cms' }" @click="activeTab = 'cms'">CMS</a>
      </div>

      <!-- CMS Example -->
      <div v-show="activeTab === 'cms'" class="mockup-code max-w-4xl mx-auto" data-aos="fade-up">
        <pre data-prefix="1"><code>// Content Management System with TypeScript</code></pre>
        <pre data-prefix="2"><code>import { useContent } from '~/modules/content-management'</code></pre>
        <pre data-prefix="3"><code></code></pre>
        <pre data-prefix="4"><code>const {</code></pre>
        <pre data-prefix="5"><code>  contents,</code></pre>
        <pre data-prefix="6"><code>  currentContent,</code></pre>
        <pre data-prefix="7"><code>  contentVersions,</code></pre>
        <pre data-prefix="8"><code>  createContent,</code></pre>
        <pre data-prefix="9"><code>  updateContent,</code></pre>
        <pre data-prefix="10"><code>  restoreVersion</code></pre>
        <pre data-prefix="11"><code>} = useContent()</code></pre>
        <pre data-prefix="12"><code></code></pre>
        <pre data-prefix="13"><code>// Create new content with versioning</code></pre>
        <pre data-prefix="14"><code>const newContent = await createContent({</code></pre>
        <pre data-prefix="15"><code>  title: 'Getting Started',</code></pre>
        <pre data-prefix="16"><code>  type: 'article',</code></pre>
        <pre data-prefix="17"><code>  content: '# Welcome\nGet started...',</code></pre>
        <pre data-prefix="18"><code>  metadata: {</code></pre>
        <pre data-prefix="19"><code>    author: 'John Doe',</code></pre>
        <pre data-prefix="20"><code>    tags: ['guide', 'tutorial']</code></pre>
        <pre data-prefix="21"><code>  }</code></pre>
        <pre data-prefix="22"><code>})</code></pre>
      </div>

      <!-- Setup Example -->
      <div v-show="activeTab === 'setup'" class="mockup-code max-w-4xl mx-auto" data-aos="fade-up">
        <pre data-prefix="$"><code>npx create-nuxt-app@latest my-app -t nujin</code></pre>
        <pre data-prefix=">" class="text-success"><code>Creating a new Nujin project...</code></pre>
        <pre data-prefix=">" class="text-warning"><code>Installing dependencies...</code></pre>
        <pre data-prefix=">" class="text-success"><code>Done! 🚀 Your project is ready!</code></pre>
      </div>

      <!-- Subscription Example -->
      <div v-show="activeTab === 'subscription'" class="mockup-code max-w-4xl mx-auto" data-aos="fade-up">
        <pre data-prefix="1"><code>// Use the subscription composable in your component</code></pre>
        <pre data-prefix="2"><code>import { useSubscription } from '~/composables/useSubscription'</code></pre>
        <pre data-prefix="3"><code></code></pre>
        <pre data-prefix="4"><code>const {</code></pre>
        <pre data-prefix="5"><code>  currentPlan,</code></pre>
        <pre data-prefix="6"><code>  isSubscribed,</code></pre>
        <pre data-prefix="7"><code>  hasFeature,</code></pre>
        <pre data-prefix="8"><code>  subscribe,</code></pre>
        <pre data-prefix="9"><code>  cancelSubscription</code></pre>
        <pre data-prefix="10"><code>} = useSubscription()</code></pre>
        <pre data-prefix="11"><code></code></pre>
        <pre data-prefix="12"><code>// Check if user has access to a feature</code></pre>
        <pre data-prefix="13"><code>if (hasFeature('advanced_analytics')) {</code></pre>
        <pre data-prefix="14"><code>  // Show advanced analytics</code></pre>
        <pre data-prefix="15"><code>}</code></pre>
      </div>

      <!-- Components Example -->
      <div v-show="activeTab === 'components'" class="mockup-code max-w-4xl mx-auto" data-aos="fade-up">
        <pre data-prefix="1"><code>&lt;template&gt;</code></pre>
        <pre data-prefix="2"><code>  &lt;div class="pricing-plans"&gt;</code></pre>
        <pre data-prefix="3"><code>    &lt;PricingPlans</code></pre>
        <pre data-prefix="4"><code>      @subscribe="handleSubscribe"</code></pre>
        <pre data-prefix="5"><code>      @cancel="handleCancel"</code></pre>
        <pre data-prefix="6"><code>    /&gt;</code></pre>
        <pre data-prefix="7"><code></code></pre>
        <pre data-prefix="8"><code>    &lt;!-- Feature gating example --&gt;</code></pre>
        <pre data-prefix="9"><code>    &lt;div v-if="hasFeature('api_access')"&gt;</code></pre>
        <pre data-prefix="10"><code>      &lt;ApiKeyManager /&gt;</code></pre>
        <pre data-prefix="11"><code>    &lt;/div&gt;</code></pre>
        <pre data-prefix="12"><code>  &lt;/div&gt;</code></pre>
        <pre data-prefix="13"><code>&lt;/template&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('setup')
</script>
