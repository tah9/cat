<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
body {
	width: 100vw;
	height: 100vh;
}

#app {
  width: 100vw;
  height: 100vh;
}

.btn {
  border-radius: 50px;
  line-height: 50px;
  height: 50px;
  background: #eeeff3;
  margin: 0 30px;
  text-align: center;
}

input {
  padding-left: 1em;
  border-bottom: 1px solid rgba(0, 0, 0, .05);
  border-top: none;
  border-left: none;
  border-right: none;
  width: calc(100% - 1em);
  margin: 5px 0;
  height: 45px;

}

</style>
