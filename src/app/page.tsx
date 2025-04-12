'use client'

import { useState } from 'react'

export default function Home() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState<{ id: number, text: string, done: boolean }[]>([])

  const addTask = () => {
    if (task.trim() === '') return
    setTasks([...tasks, { id: Date.now(), text: task, done: false }])
    setTask('')
  }

  const toggleDone = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const removeTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <main className="min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">📝 Minha ToDo List</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder="Digite uma tarefa"
          className="px-4 py-2 border rounded shadow"
        />
        <button onClick={addTask} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Adicionar
        </button>
      </div>

      <ul className="w-full max-w-md">
        {tasks.map(t => (
          <li key={t.id} className="flex justify-between items-center p-2 mb-2 border rounded shadow">
            <span
              onClick={() => toggleDone(t.id)}
              className={`cursor-pointer ${t.done ? 'line-through text-gray-500' : ''}`}
            >
              {t.text}
            </span>
            <button onClick={() => removeTask(t.id)} className="cursor-pointer text-red-500 hover:text-red-700">Remover</button>
          </li>
        ))}
      </ul>
    </main>
  )
}
