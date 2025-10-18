export const revalidate = 0; // Disable caching - Forces re-fetching on every request

export default async function TodosPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await res.json();

  return (
    <div>
      <h1>Todos</h1>

      <ul className="text-black">
        {todos.map((todo: { id: string; title: string }) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
