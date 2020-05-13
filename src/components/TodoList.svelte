<script>
  import { fade } from 'svelte/transition';
  import { todos } from '../stores.js';
  import Todo from './Todo.svelte';

  let filter = 'all';

  $: filtered = $todos.filter(todo => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'active') {
      return todo.isDone === false;
    } else {
      return todo.isDone === true;
    }
  });
</script>

<div>
  <ul>
    {#each filtered as todo (todo.id)}
      <Todo {todo} />
    {/each}
  </ul>
  {#if $todos.length}
    <div
      in:fade={{ duration: 100 }}
      out:fade={{ duration: 500, delay: 1000 }}
      class="filters"
    >
      <label for="all">
        <input bind:group={filter} type="radio" value="all" id="all" />
        <span>All</span>
      </label>
      <label for="active">
        <input bind:group={filter} type="radio" value="active" id="active" />
        <span>Active</span>
      </label>
      <label for="completed">
        <input
          bind:group={filter}
          type="radio"
          value="completed"
          id="completed"
        />
        <span>Completed</span>
      </label>
    </div>
  {/if}
</div>

<style>
  .filters {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    border: 1px solid black;
  }
  label {
    margin: 0 0.5rem;
  }
  span {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    color: gray;
    border: 1px solid gray;
    padding: 3px;
    cursor: pointer;
  }

  input[type='radio'] {
    display: none;
  }

  input[type='radio']:checked + span {
    border-color: black;
    color: black;
  }
</style>
