/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF9324', // Add your primary color here
        // or you can define multiple shades
        // primary: {
        //   50: '#fff7ed',
        //   100: '#ffedd5',
        //   200: '#fed7aa',
        //   300: '#fdba74',
        //   400: '#fb923c',
        //   500: '#FF9324', // main primary color
        //   600: '#ea580c',
        //   700: '#c2410c',
        //   800: '#9a3412',
        //   900: '#7c2d12',
        // }
      },
      animation: {
        'text-shine': 'text-shine 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'text-shine': {
          '0%': {
            'background-position': '0% 50%',
          },
          '100%': {
            'background-position': '100% 50%',
          },
        },
      },
    },
  },
  plugins: [],
}