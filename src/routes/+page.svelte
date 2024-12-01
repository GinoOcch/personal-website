<script lang="ts">
	import Icon from "@iconify/svelte";
	import { pubs } from "$lib/pubs";
	import Citation from "$lib/components/Citation.svelte";
</script>

<div class="text-justify text-lg my-4 mx-10 text-slate-900 dark:text-slate-300">
	<div
		class="mx-auto flex md:flex-row flex-col justify-center items-center mb-4"
	>
		<img src="/images/profile.jpg" class="h-52 mr-10 rounded-full" alt="" />
		<div class="">
			<h1 class="text-2xl font-bold text-center mb-2">
				Gino&nbsp;Occhialini
			</h1>
			<p class="text-center font-bold">Postdoctoral&nbsp;Fellow</p>
			<p class="text-center mb-2">
				California&nbsp;Institute&nbsp;of&nbsp;Technology
			</p>
			<div class="flex justify-center space-x-4">
				<a href="/"><Icon icon="mdi:home" class="text-3xl" /></a>
				<a href="https://orcid.org/0000-0001-9682-1740"
					><Icon icon="academicons:orcid" class="text-3xl" /></a
				>
				<a
					href="https://scholar.google.com/citations?user=5o3wF_IAAAAJ&hl=en"
					><Icon
						icon="academicons:google-scholar-square"
						class="text-3xl"
					/></a
				>
				<a href="https://www.linkedin.com/in/gino-occhialini-4bb670103"
					><Icon icon="mdi:linkedin" class="text-3xl" /></a
				>
			</div>
		</div>
	</div>
	<p class="mb-5">
		I received my Ph.D. in Chemistry from the Massachusetts Institute of
		Technology in 2024, where I conducted research under the supervision of <a
			href="https://wendlandtlab.com/">Prof. Alison Wendlandt</a
		>
		as an NSF graduate research fellow on the development of new methods for
		selective catalysis, in particular the use of light to drive uphill
		editing reactions, for example in the context of terminally selective
		olefin isomerization. While studying one such epimerization reaction, we
		discovered an underlying network structure that contributed kinetic
		complexity and enabled, rather than eroded, selective catalysis. This
		study sparked my interests in using computational methods to study
		complex reactivity, for example numerically integrated kinetic models. I
		am now a postdoctoral fellow in the lab of
		<a href="http://reismangroup.caltech.edu/">Prof. Sarah Reisman</a> at the
		California Institute of Technology, where I am excited to develop and apply
		new methods for the synthesis of complex natural products. I am particularly
		interested in how high-throughput experimentation and machine learning can
		enable synthetic efforts.
	</p>
	<p class="mb-5">
		Prior to MIT, I received my B.S. in Chemistry from the University of
		Texas at Dallas, where I was a Goldwater scholar and conducted research
		in the lab of <a href="https://labs.utdallas.edu/smaldone/"
			>Prof. Ron Smaldone</a
		> on the synthesis and modeling of covalent organic frameworks and porous
		polymers. I am originally from central Texas and enjoy cooking, 3D printing,
		and experimenting with technology.
	</p>
</div>

<div class="text-justify text-lg mb-4 mx-10">
	<p class="mb-5 text-lg font-bold text-slate-900 dark:text-slate-300">
		Publications:
	</p>
	<!-- for each pub, display citation -->
	<div class="text-slate-900 dark:text-slate-300">
		{#each pubs as pub, i}
			<Citation
				publication={pub}
				cssclass="mb-2"
				listchar="({i + 1})   "
			/>
		{/each}
	</div>
</div>
