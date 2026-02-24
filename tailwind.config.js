/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				display: ['"Bodoni Moda"', '"Playfair Display"', 'serif'],
				script: ['"Pinyon Script"', '"Great Vibes"', 'cursive'],
				subtitle: ['"Cormorant Garamond"', 'serif'],
				sans: ['"DM Sans"', 'sans-serif'],
			},
			colors: {
				background: '#080608',
				primary_dark: '#111111',
				warm_sepia: '#C8A882',
				gold_accent: '#C9A84C',
				soft_cream: '#F7F0E6',
				muted_rose: '#6B1A2A',
				overlay_tint: 'rgba(201,168,76,0.12)',
				ink_black: '#080608',
				deep_charcoal: '#111111',
				rich_burgundy: '#6B1A2A',
				blood_rose: '#8B1A1A',
				antique_gold: '#C9A84C',
				champagne: '#E8D5A3',
				cream_white: '#F7F0E6',
				muted_silver: '#9A9A9A',
				accent_crimson: '#B5132A'
			},
			backgroundImage: {
				vignette: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)',
			},
			keyframes: {
				'marquee-left': {
					'100%': { transform: 'translateX(-50%)' }
				},
				'marquee-right': {
					'0%': { transform: 'translateX(-50%)' },
					'100%': { transform: 'translateX(0%)' }
				}
			},
			animation: {
				'marquee-left': 'marquee-left 35s linear infinite',
				'marquee-right': 'marquee-right 45s linear infinite'
			},
			transitionProperty: {
				'transform-shadow': 'transform, box-shadow'
			}
		}
	},
	plugins: [require("tailwindcss-animate")]
}