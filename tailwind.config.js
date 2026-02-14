/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Lato', 'sans-serif'],
			display: ['Playfair Display', 'serif'],
			serif: ['Playfair Display', 'serif'],
  			script: ['Great Vibes', 'cursive'],
			logo: ['Dancing Script', 'cursive'],
  			mono: ['JetBrains Mono', 'monospace']
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
			burgundy: {
				DEFAULT: '#8B1538',
				foreground: '#FFFFFF'
			},
			sky_blue: {
				DEFAULT: '#87CEEB',
				foreground: '#2c2c2c'
			},
			off_white: '#F8F8F5',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))'
  		},
  		keyframes: {
  			'fade-in': {
  				'0%': { opacity: '0', transform: 'translateY(20px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			}
  		},
  		animation: {
  			'fade-in': 'fade-in 1s ease-out forwards'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
}