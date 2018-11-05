<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  <% if(isRem) { %>
  .#app {
    width: 7.5rem;margin: 0px auto;
  }
  <% } else if(isWap) { %>#app{
    min-width:320px;
    margin:0 auto;
  }
  @media only screen and (min-width: 1025px) {
    #app{max-width:320px}
  }
  <% } else { %>body .g-footer .gft-links,
  body .g-footer .gft-links a {
    color:#000;
  }
  body .g-footer .gft-copyRight,
  body .g-footer .gft-copyRight a {
    color:#000;
  }<% } %>
</style>
