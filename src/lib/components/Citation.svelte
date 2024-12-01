<script lang="ts">
    import type { Publication } from '$lib/types/publication.type';

    // get publication from props
    let {publication, cssclass=' ', listchar=''}:{publication: Publication, cssclass: string, listchar: string} = $props();

    // process authors list
    // 'Gino Occhialini' --> 'Occhialini, G.'
    // if '‡' is the last character, then it should be 'Occhialini, G.‡'
    let authors = publication.authors.map((author: string) => {
        let authorParts = author.trim().split(' ');
        let lastName = authorParts[authorParts.length - 1];
        let ddag = false;
        if (lastName.endsWith('‡')) {
            // remove the last character
            lastName = lastName.slice(0, -1);
            ddag = true;
        }
        let initials = authorParts.slice(0, authorParts.length - 1).map((name) => name[0]).join('. ');
        if (ddag) {
            return `${lastName}, ${initials}‡`;
        }
        return `${lastName}, ${initials}`;
    }).join('; ');


</script>

<p class={cssclass}>
    <a href="https://doi.org/{publication.doi}">{listchar}{authors} {publication.title}. <i>{publication.journal}</i> <b>{publication.year}</b>, <i>{publication.volume}</i>, {publication.pages}.</a>
</p>