export default {
  content: ['./src/index.html', './src/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
