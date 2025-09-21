/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neural: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        matrix: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Monaco', 'Cascadia Code', 'Segoe UI Mono', 'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro', 'Fira Code', 'Droid Sans Mono', 'Courier New', 'monospace'],
        neural: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'neural-pulse': 'neural-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'matrix-rain': 'matrix-rain 3s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'terminal-blink': 'terminal-blink 1s step-end infinite',
        'scan-line': 'scan-line 2s ease-in-out infinite',
      },
      keyframes: {
        'neural-pulse': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.5',
            transform: 'scale(1.05)',
          },
        },
        'matrix-rain': {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: '0',
          },
          '10%': {
            opacity: '1',
          },
          '90%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100vh)',
            opacity: '0',
          },
        },
        'glow-pulse': {
          'from': {
            'box-shadow': '0 0 20px #3b82f6, 0 0 40px #3b82f6, 0 0 60px #3b82f6',
          },
          'to': {
            'box-shadow': '0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 30px #3b82f6',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'terminal-blink': {
          '0%, 50%': {
            opacity: '1',
          },
          '51%, 100%': {
            opacity: '0',
          },
        },
        'scan-line': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'neural-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'matrix-gradient': 'linear-gradient(180deg, #000000 0%, #001100 100%)',
        'cyber-gradient': 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)',
      },
      boxShadow: {
        'neural': '0 0 50px rgba(59, 130, 246, 0.5)',
        'glow': '0 0 20px rgba(34, 197, 94, 0.5)',
        'cyber': '0 0 30px rgba(139, 92, 246, 0.6)',
      },
      screens: {
        'xs': '475px',
        '3xl': '1680px',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.neural-glow': {
          'box-shadow': '0 0 20px theme("colors.cyan.400"), 0 0 40px theme("colors.cyan.400"), 0 0 60px theme("colors.cyan.400")',
        },
        '.text-glow': {
          'text-shadow': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
        },
        '.backdrop-neural': {
          'backdrop-filter': 'blur(10px) saturate(180%)',
          'background-color': 'rgba(17, 25, 40, 0.25)',
          'border': '1px solid rgba(255, 255, 255, 0.125)',
        },
        '.matrix-text': {
          'font-family': 'monospace',
          'color': '#00ff00',
          'text-shadow': '0 0 5px #00ff00',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}