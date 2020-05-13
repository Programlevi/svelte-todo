<script>
  import { onMount } from 'svelte';
  import { todos } from './stores';
  import TodoForm from './components/TodoForm.svelte';
  import TodoList from './components/TodoList.svelte';

  onMount(() => {
    const res = JSON.parse(localStorage.getItem('todos'));
    if (Array.isArray(res)) {
      todos.setTodos(res);
    }
  });

  const handleUnload = () => {
    localStorage.setItem('todos', JSON.stringify($todos));
  };
</script>

<svelte:window on:unload={handleUnload} />
<header>
  <h1>Todo</h1>
</header>
<div>
  <TodoForm />
  <TodoList />
</div>
<footer>
  <p>* Double-click a todo to edit it *</p>
</footer>

<style>
  div {
    margin-top: 1rem;
    flex: 1;
  }
  footer {
    margin: 3rem;
  }
</style>
