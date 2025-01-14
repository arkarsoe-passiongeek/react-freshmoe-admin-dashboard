/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontSize: {
			xs: '0.688rem',
			sm: '0.812rem',
			base: '1rem',
			lg: '1.188rem',
			xl: '1.438rem',
			'2xl': '1.750rem',
			'3xl': '2.062rem',
			'4xl': '2.500rem',
			'5xl': '3.000rem'
		},
		container: {
			padding: {
				DEFAULT: '1rem',
				sm: '1rem',
				lg: '2rem',
				xl: '5rem',
				'2xl': '6rem'
			}
		},
		extend: {
			screens: {
				sm: '375px',
				md: '768px',
				lg: '1024px',
				'2lg': '1280px',
				xl: '1440px',
				'2xl': '1920px'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				'c-primary': '#5BBA47',
				'c-secondary': '#ED1C24',
				'c-white': '#ffffff',
				'c-black': '#000',
				'c-text': '#212121',
				'c-contrast': '#9E9E9E',
				'c-footer-bg': '#EFF8ED',
				'c-button-stroke': '#9CFE8A',
				'c-button-bg': '#EFFFEC',
				'c-border-stroke': '#D6D6D6',
				'c-bg': '#F6F6F6',
				'c-home-bg': '#ECF6F4',
				'c-disable': '#DBDBDB',
				'c-hover': '#4D9F3C',
				'c-secondary-hover': '#AC0F15',
				'c-blue': '#29BFFF',
				'c-yellow': '#D08813',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}

