import type { Config } from 'tailwindcss';
import aspectRatio from '@tailwindcss/aspect-ratio';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import catppuccin from '@catppuccin/tailwindcss';
import flowbitePlugin from 'flowbite/plugin';

export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
  ],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        primary: {
          50:"#eff6ff",
          100:"#dbeafe",
          200:"#bfdbfe",
          300:"#93c5fd",
          400:"#60a5fa",
          500:"#3b82f6",
          600:"#2563eb",
          700:"#1d4ed8",
          800:"#1e40af",
          900:"#1e3a8a"
        }
      }
    },
  },
  safelist: [
    {
      pattern: /bg-.+/
    },
    'mocha',
    'macchiato',
    'frappe',
    'latte'
  ],

  plugins: [
    typography,
    forms,
    aspectRatio,
    flowbitePlugin
  ],

  corePugins: [
    'items-center',
    'self-center'
  ]
} satisfies Config;
