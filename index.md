---

templateEngineOverride: njk, md
---

# Articles



<ul>
{%- for post in collections.article -%}
  <h3><a href="{{post.url}}">{{ post.data.title }}</a></h3>{{ post.data.description}}
  </br></br>
{%- endfor -%}
</ul>



