import { defineConfig } from 'windicss/helpers'

export default defineConfig({
    /* configurations... */
    plugins: [require("daisyui"), require('windicss/plugin/forms'),],
    daisyui: {
        themes: ["cmyk"],
    },
    theme: {
        container: {
            center: true,
        },
        extend: {
            transitionProperty: {
                height: 'height',
                spacing: 'margin, padding',
                display: 'visibility',
                position: 'left'
            },
        },
    },
})