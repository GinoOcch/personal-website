<script lang="ts">
	import '../app.css';
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode } from 'flowbite-svelte';
	let { children } = $props();
</script>

<div class="bg-white dark:bg-slate-900">

<Navbar class="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300">
  <NavBrand href="/">
      <img src="/images/icon1_dark.svg" class="me-3 h-6 sm:h-9 hidden dark:block" alt="Gino.phd Logo" />
      <img src="/images/icon1.svg" class="me-3 h-6 sm:h-9 dark:hidden" alt="Gino.phd Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold">Gino.PhD</span>
  </NavBrand>
  <NavHamburger  />
  <NavUl>
    <NavLi href="/" class="self-center whitespace-nowrap text-xl font-semibold">Home</NavLi>
    <DarkMode />
  </NavUl>
</Navbar>
<div class="container mx-auto">
{@render children()}
</div>
</div>
