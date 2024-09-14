import { create } from 'zustand'

const todosKey = 'todo-items'

export type TodoItem = {
	id: number
	text: string
	isDone: boolean
}

// unknown breaks the type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useTodos = create((_set: any, _get: any) => {
	const set: (typeof useTodos)['setState'] = _set
	const get: (typeof useTodos)['getState'] = _get

	return {
		todos: JSON.parse(localStorage.getItem(todosKey) ?? '[]') as TodoItem[],

		addTodo: (todo: Omit<TodoItem, 'id'>) => {
			const todos = get().todos

			let highetstId = 0
			for (const { id } of todos) {
				if (id > highetstId) {
					highetstId = id
				}
			}

			todos.push({
				id: highetstId + 1,
				...todo
			})

			localStorage.setItem(todosKey, JSON.stringify(todos))
			set({ todos })
		},

		editTodo: (newTodo: TodoItem) => {
			const todos = get().todos.map((todo: TodoItem) => {
				if (todo.id === newTodo.id) {
					return newTodo
				}

				return todo
			})

			localStorage.setItem(todosKey, JSON.stringify(todos))
			set({ todos })
		},

		removeTodo: (id: TodoItem['id']) => {
			const todos = get().todos.filter((todo: TodoItem) => todo.id !== id)

			localStorage.setItem(todosKey, JSON.stringify(todos))
			set({ todos })
		}
	}
})

export type TodosFilter = 'all' | 'done' | 'not-done'

// unknown breaks the type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useTodosFilter = create((_set: any) => {
	const set: (typeof useTodosFilter)['setState'] = _set

	return {
		filter: 'all' as TodosFilter,

		setFilter: (newFilter: TodosFilter) => {
			set({ filter: newFilter })
		}
	}
})
