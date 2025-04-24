import { defineNuxtModule, addComponent, createResolver } from '@nuxt/kit'

export interface ModuleOptions {
  // Module options TypeScript interface
  prefix?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-daisyui-charts',
    configKey: 'daisyuiCharts',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    prefix: 'Chart'
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Register all components
    const components = ['LineChart', 'BarChart', 'PieChart']
    components.forEach(component => {
      addComponent({
        name: component,
        filePath: resolver.resolve(`./runtime/components/${component}.vue`),
        global: true
      })
    })
  }
})
