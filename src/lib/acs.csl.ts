const acsfmtcsl = `
<?xml version="1.0" encoding="utf-8"?>
<style xmlns="http://purl.org/net/xbiblio/csl" class="in-text" version="1.0" demote-non-dropping-particle="sort-only" page-range-format="expanded" default-locale="en-US">
  <info>
    <title>Modified American Chemical Society</title>
    <title-short>ACSmod</title-short>
    <id>acsmod</id>
    <link href="http://www.zotero.org/styles/american-chemical-society" rel="self"/>
    <link href="https://pubs.acs.org/doi/full/10.1021/acsguide.40303" rel="documentation"/>
    <link href="https://pubs.acs.org/doi/book/10.1021/acsguide" rel="documentation"/>
    <author>
      <name>Julian Onions</name>
      <email>julian.onions@gmail.com</email>
    </author>
    <contributor>
      <name>Ivan Bushmarinov</name>
      <email>ib@ineos.ac.ru</email>
    </contributor>
    <contributor>
      <name>Sebastian Karcher</name>
    </contributor>
    <contributor>
      <name>Patrick O'Brien</name>
    </contributor>
    <category citation-format="numeric"/>
    <category field="chemistry"/>
    <summary>The American Chemical Society style</summary>
    <updated>2022-11-13T02:40:31+00:00</updated>
    <rights license="http://creativecommons.org/licenses/by-sa/3.0/">This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 License</rights>
  </info>
  <locale xml:lang="en">
    <terms>
      <term name="editortranslator" form="short">
        <single>ed. and translator</single>
        <multiple>eds. and translators</multiple>
      </term>
      <term name="translator" form="short">
        <single>translator</single>
        <multiple>translators</multiple>
      </term>
      <term name="collection-editor" form="short">
        <single>series ed.</single>
        <multiple>series eds.</multiple>
      </term>
    </terms>
  </locale>
  <macro name="editor">
    <group delimiter="; ">
      <names variable="editor translator" delimiter="; ">
        <name sort-separator=", " initialize-with=". " name-as-sort-order="all" delimiter=", " delimiter-precedes-last="always"/>
        <label form="short" prefix=", " text-case="title"/>
      </names>
      <names variable="collection-editor">
        <name sort-separator=", " initialize-with=". " name-as-sort-order="all" delimiter=", " delimiter-precedes-last="always"/>
        <label form="short" prefix=", " text-case="title"/>
      </names>
    </group>
  </macro>
  <macro name="author">
    <names variable="author" suffix=".">
      <name sort-separator=", " initialize-with=". " name-as-sort-order="all" delimiter="; " delimiter-precedes-last="always"/>
      <label form="short" prefix=", " text-case="capitalize-first"/>
    </names>
  </macro>
  <macro name="publisher">
    <choose>
      <if type="thesis" match="any">
        <group delimiter=", ">
          <text variable="publisher"/>
          <text variable="publisher-place"/>
        </group>
      </if>
      <else>
        <group delimiter=": ">
          <text variable="publisher"/>
          <text variable="publisher-place"/>
        </group>
      </else>
    </choose>
  </macro>
  <macro name="title">
    <choose>
      <if type="bill book graphic legal_case legislation motion_picture report song" match="any">
        <text variable="title" text-case="title" font-style="italic"/>
      </if>
      <else>
        <text variable="title" text-case="title"/>
      </else>
    </choose>
  </macro>
  <macro name="volume">
    <group delimiter=" ">
      <text term="volume" form="short" text-case="capitalize-first"/>
      <text variable="volume"/>
    </group>
  </macro>
  <macro name="series">
    <text variable="collection-title"/>
  </macro>
  <macro name="pages">
    <label variable="page" form="short" suffix=" " strip-periods="true"/>
    <text variable="page"/>
  </macro>
  <macro name="book-container">
    <group delimiter=". ">
      <text macro="title"/>
      <choose>
        <if type="entry-dictionary entry-encyclopedia" match="none">
          <group delimiter=" ">
            <text term="in" text-case="capitalize-first"/>
            <text variable="container-title" font-style="italic"/>
          </group>
        </if>
        <else>
          <text variable="container-title" font-style="italic"/>
        </else>
      </choose>
    </group>
  </macro>
  <macro name="issued">
    <date variable="issued" delimiter=" ">
      <date-part name="year"/>
    </date>
  </macro>
  <macro name="full-issued">
    <date variable="issued" delimiter=" ">
      <date-part name="month" form="long" suffix=" "/>
      <date-part name="day" suffix=", "/>
      <date-part name="year"/>
    </date>
  </macro>
  <macro name="edition">
    <choose>
      <if is-numeric="edition">
        <group delimiter=" ">
          <number variable="edition" form="ordinal"/>
          <text term="edition" form="short"/>
        </group>
      </if>
      <else>
        <text variable="edition" suffix="."/>
      </else>
    </choose>
  </macro>
  <macro name="access">
    <choose>
      <if variable="DOI" match="any">
        <text variable="DOI" prefix="https://doi.org/"/>
      </if>
      <else-if type="article-journal book chapter entry-encyclopedia entry-dictionary paper-conference" match="none">
        <choose>
          <if variable="URL">
            <group delimiter=" ">
              <text variable="URL"/>
              <group delimiter=" " prefix="(" suffix=")">
                <text term="accessed"/>
                <date variable="accessed">
                  <date-part name="year"/>
                  <date-part name="month" prefix="-" form="numeric-leading-zeros"/>
                  <date-part name="day" prefix="-" form="numeric-leading-zeros"/>
                </date>
              </group>
            </group>
          </if>
        </choose>
      </else-if>
    </choose>
  </macro>
  <citation collapse="citation-number">
    <sort>
      <key variable="citation-number"/>
    </sort>
    <layout delimiter="," vertical-align="sup">
      <text variable="citation-number"/>
    </layout>
  </citation>
  <bibliography second-field-align="flush" entry-spacing="0">
    <layout suffix=".">
      <text variable="citation-number" prefix="(" suffix=")"/>
      <text macro="author" suffix=" "/>
      <choose>
        <if type="article-journal review" match="any">
          <group delimiter=" ">
            <text macro="title" suffix="."/>
            <text variable="container-title" font-style="italic" form="short"/>
            <group delimiter=", ">
              <text macro="issued" font-weight="bold"/>
              <choose>
                <if variable="volume">
                  <group delimiter=" ">
                    <text variable="volume" font-style="italic"/>
                  </group>
                </if>
                <else>
                  <group delimiter=" ">
                    <text term="issue" form="short" text-case="capitalize-first"/>
                    <text variable="issue"/>
                  </group>
                </else>
              </choose>
              <text variable="page"/>
            </group>
          </group>
        </if>
        <else-if type="article-magazine article-newspaper article" match="any">
          <group delimiter=" ">
            <text macro="title" suffix="."/>
            <text variable="container-title" font-style="italic" suffix="."/>
            <text macro="edition"/>
            <text macro="publisher"/>
            <group delimiter=", ">
              <text macro="full-issued"/>
              <text macro="pages"/>
            </group>
          </group>
        </else-if>
        <else-if type="thesis">
          <group delimiter=", ">
            <group delimiter=". ">
              <text macro="title"/>
              <text variable="genre"/>
            </group>
            <text macro="publisher"/>
            <text macro="issued"/>
            <text macro="volume"/>
            <text macro="pages"/>
          </group>
        </else-if>
        <else-if type="bill book graphic legal_case legislation motion_picture report song" match="any">
          <group delimiter="; ">
            <group delimiter=", ">
              <text macro="title"/>
              <text macro="edition"/>
            </group>
            <text macro="editor" prefix=" "/>
            <text macro="series"/>
            <choose>
              <if type="report">
                <group delimiter=" ">
                  <text variable="genre"/>
                  <text variable="number"/>
                </group>
              </if>
            </choose>
            <group delimiter=", ">
              <text macro="publisher"/>
              <text macro="issued"/>
            </group>
            <group delimiter=", ">
              <text macro="volume"/>
              <text macro="pages"/>
            </group>
          </group>
        </else-if>
        <else-if type="patent">
          <group delimiter=", ">
            <group delimiter=". ">
              <text macro="title"/>
              <text variable="number"/>
            </group>
            <date variable="issued" form="text"/>
          </group>
        </else-if>
        <else-if type="chapter paper-conference entry-dictionary entry-encyclopedia" match="any">
          <group delimiter="; ">
            <text macro="book-container"/>
            <text macro="editor"/>
            <text macro="series"/>
            <group delimiter=", ">
              <text macro="publisher"/>
              <text macro="issued"/>
            </group>
            <group delimiter=", ">
              <text macro="volume"/>
              <text macro="pages"/>
            </group>
          </group>
        </else-if>
        <else-if type="webpage post post-weblog" match="any">
          <group delimiter=". ">
            <text variable="title" font-style="italic"/>
            <text variable="container-title"/>
          </group>
        </else-if>
        <else>
          <group delimiter=", ">
            <group delimiter=". ">
              <text macro="title"/>
              <text variable="container-title" font-style="italic"/>
            </group>
            <group delimiter=", ">
              <text macro="issued"/>
              <text variable="volume" font-style="italic"/>
              <text variable="page"/>
            </group>
          </group>
        </else>
      </choose>
    </layout>
  </bibliography>
</style>
`

export { acsfmtcsl };