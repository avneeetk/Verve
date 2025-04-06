
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// New Verve.ai custom colors with black and white base
				verve: {
					black: '#000000',    // Pure Black
					white: '#FFFFFF',    // Pure White
					teal: '#00F0FF',     // Vibrant Teal
					blue: '#536DFE',     // Electric Blue
					pink: '#FF4081',     // Hot Pink
					lime: '#C6FF00',     // Bright Lime
					gray: '#BBBBBB',     // Light Gray
				}
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						opacity: '1',
						boxShadow: '0 0 4px 1px rgba(0, 240, 255, 0.3)'
					},
					'50%': { 
						opacity: '0.8',
						boxShadow: '0 0 8px 2px rgba(0, 240, 255, 0.5)'
					},
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-6px)' },
				},
				'particle-drift': {
					'0%': { transform: 'translate(0, 0)', opacity: '0.2' },
					'33%': { transform: 'translate(3px, -3px)', opacity: '0.5' },
					'66%': { transform: 'translate(-3px, 3px)', opacity: '0.3' },
					'100%': { transform: 'translate(0, 0)', opacity: '0.2' },
				},
				'wave': {
					'0%, 100%': { transform: 'translateY(0)' },
					'25%': { transform: 'translateY(-3px)' },
					'50%': { transform: 'translateY(0)' },
					'75%': { transform: 'translateY(3px)' },
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'rotate-3d': {
					'0%': { transform: 'rotate3d(0, 1, 0, 0deg)' },
					'50%': { transform: 'rotate3d(0, 1, 0, 180deg)' },
					'100%': { transform: 'rotate3d(0, 1, 0, 360deg)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 3s infinite ease-in-out',
				'float': 'float 5s infinite ease-in-out',
				'particle-drift': 'particle-drift 10s infinite ease-in-out',
				'wave': 'wave 2s infinite ease-in-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'slide-up': 'slide-up 0.4s ease-out',
				'rotate-3d': 'rotate-3d 8s infinite linear',
			},
			backdropBlur: {
				'xs': '2px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
