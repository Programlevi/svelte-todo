<script>
  import { focusable } from '../actions.js';
  import { todos } from '../stores.js';
  const { addTodo } = todos;
  let todo;

  const handleSubmit = () => {
    addTodo(todo);
    todo = '';
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input
    use:focusable
    type="text"
    bind:value={todo}
    placeholder="What needs to be done?"
  />
</form>

<style>
  input {
    width: 40rem;
    height: 5rem;
    padding: 1.5rem;
    border: none;
    font-size: 2rem;
    border: 1px solid black;
  }
  input::placeholder {
    color: gray;
  }
</style>
