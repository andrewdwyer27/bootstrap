module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        "outline": [
            "1px 0 0 white",
            "0 1px 0 white",
            "-1px 0 0 white",
            "0 -1px 0 white"
        ],
        "lg": '0 0 20px rgba(48, 131, 109, 1)',
        "xl": "-15px 15px 0 rgba(28, 34, 60, 1)",
      },
      colors: {
        "darkblue": "#094067",
        "darkgold": "#D0AE33",
        "background-color": "#F8FAFC",
        "darkgray": "#587393",
        "lightblue": "#0EA5E9",
        "navblue": "#2563EB",
        "backgroundgray": "#15191E",
        "green": "#30826D",
        "primary-green": "rgba(48,131,109,1)",
        "primary-red": "#ED3237",
        "gray-container": "rgb(28, 32, 37)",
        "grayfont": "#6E7174"
      },
    },
  },
  plugins: [],
}

