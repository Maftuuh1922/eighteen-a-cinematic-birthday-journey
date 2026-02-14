/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Inter', 'sans-serif'],
			display: ['Playfair Display', 'serif'],
			body: ['Lora', 'serif'],
			georgia: ['Georgia', 'serif'],
  			mono: ['JetBrains Mono', 'monospace']
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
			priPurple: '#2D1B2E',
			medPurple: '#3D2A3E',
			ltPurple: '#5D3E5F',
			cream: '#F5E6D3',
			wCream: '#E8C4A8',
			brown: '#8B6F5F',
			offWhite: '#F9F6F1',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))'
  		},
		transitionProperty: {
			'transform-shadow': 'transform, box-shadow'
		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
}