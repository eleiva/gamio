/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
	extend: {
		fontFamily: {
			'inter': ['Inter', 'sans-serif'],
		},
		fontSize: {
			'h1-mobile': ['20px', { lineHeight: '1.2', fontWeight: '600' }],
			'h1-desktop': ['24px', { lineHeight: '1.2', fontWeight: '600' }],
			'h2-mobile': ['16px', { lineHeight: '1.3', fontWeight: '600' }],
			'h2-desktop': ['16px', { lineHeight: '1.3', fontWeight: '600' }],
			'h3-mobile': ['14px', { lineHeight: '1.4', fontWeight: '500' }],
			'h3-desktop': ['14px', { lineHeight: '1.4', fontWeight: '500' }],
			'h4-mobile': ['14px', { lineHeight: '1.4', fontWeight: '500' }],
			'h4-desktop': ['16px', { lineHeight: '1.4', fontWeight: '500' }],
			'h5-desktop': ['14px', { lineHeight: '1.4', fontWeight: '500' }],
		},
		colors: {
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))'
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))'
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))'
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))'
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))'
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))'
			},
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))'
			},
			chart: {
				'1': 'hsl(var(--chart-1))',
				'2': 'hsl(var(--chart-2))',
				'3': 'hsl(var(--chart-3))',
				'4': 'hsl(var(--chart-4))',
				'5': 'hsl(var(--chart-5))'
			},
			violet: {
				50: '#E2DCE7',
				100: '#E7C0DB',
				200: '#E2DCE7',
				600: '#6727A6',
				700: '#5A1F8F',
				800: '#4A148C',
				900: '#3C1661'
			},
			typography: {
				'gradient-start': '#6727A6',
				'gradient-end': '#3C1661',
				'black': '#000000',
				'muted-purple': '#775C90',
				'dark-grey': '#666666'
			}
		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}