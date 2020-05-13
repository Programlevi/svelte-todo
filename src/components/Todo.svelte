<script>
  import { fade } from 'svelte/transition';
  import { focusable } from '../actions.js';
  import { todos } from '../stores.js';
  const { updateTodo, deleteTodo } = todos;
  export let todo;

  let isEditMode = false;
  let update = todo.text;

  const submitUpdate = () => {
    if (update.length) {
      updateTodo(todo, { text: update });
    } else {
      deleteTodo(todo);
    }
    isEditMode = !isEditMode;
  };

  const handleKeyDown = event => {
    if (event.which === 13) {
      submitUpdate();
    }
  };
</script>

<svelte:options immutable />
<li transition:fade on:dblclick={() => (isEditMode = !isEditMode)}>
  {#if isEditMode}
    <input
      use:focusable
      type="text"
      bind:value={update}
      on:blur={() => submitUpdate()}
      on:keydown={handleKeyDown}
    />
  {:else}
    <label for="completed{todo.id}">
      <input
        type="checkbox"
        on:input={e => updateTodo(todo, { isDone: e.target.checked })}
        checked={todo.isDone}
        id="completed{todo.id}"
      />
      <span />
    </label>
    <p class:completed={todo.isDone}>{todo.text}</p>
    <button on:click={() => deleteTodo(todo)} />
  {/if}
</li>

<!-- Styles -->

<style>
  li {
    display: flex;
    align-items: center;
    max-width: 40rem;
    font-size: 2rem;
    border-top: 1px solid black;
    border-left: 1px solid black;
    border-right: 1px solid black;
  }

  li:first-child {
    border-top: none;
  }

  label {
    width: 2rem;
    height: 2rem;
    margin: 0 1.5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1.5px solid gray;
  }

  input[type='checkbox'] {
    display: none;
  }

  span {
    display: block;
    background-color: transparent;
    margin-top: 1px;
    width: 80%;
    height: 80%;
    border-radius: 50%;
    transition: all 0.1s;
  }

  input[type='checkbox']:checked + span {
    background-color: gray;
  }

  input[type='text'],
  p {
    flex: 1;
    font-weight: 500;
    min-height: 5rem;
    padding: 1.5rem 0;
    word-break: break-all;
  }

  input[type='text'] {
    margin-left: 5rem;
    font-size: inherit;
  }

  input[type='text']:focus {
    outline: 0.5px dotted blue;
  }

  p {
    transition: all 1s;
  }

  p.completed {
    color: gray;
    text-decoration: line-through;
  }

  button {
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    visibility: hidden;
    margin-right: 1.5rem;
  }

  button::after {
    content: '\00d7';
    font-size: 2rem;
    color: gray;
    cursor: pointer;
  }

  li:hover > button {
    visibility: visible;
  }
</style>
