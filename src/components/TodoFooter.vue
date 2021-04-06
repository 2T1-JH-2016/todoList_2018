<template>
	<div class="clearAllContainer">
		<span class="clearAllBtn" @click="clearTodo">Clear All</span>
	</div>
</template>

<script>
	export default {
		methods: {
			clearTodo() {
			//this.$store.commit('clearAll');
			this.$store.dispatch('clearAll');
			navigator.vibrate([150]);
			}
		}
	}
</script>

<style scoped>
	.clearAllContainer {
		width: 8.5rem;
		height: 50px;
		line-height: 50px;
		background-color: white;
		border-radius: 5px;
		margin: 0 auto;
	}
	.clearAllBtn{
		width: 100%;
		color:red;
	}
</style>
