---

templateEngineOverride: njk, md
---

# Kevin C. Tofel


> [!info]- Tip
> My second brain data is organized by folder categories in the sidebar. My daily writings are found in the Journal folder there. Long articles are on this page.


<ul>
{%- for post in collections.article | reverse -%}
  <h3><a href="{{post.url}}">{{ post.data.title }}</a></h3>{{ post.data.description}}
  </br></br>
{%- endfor -%}
</ul>



