import notFound from './not-found.json'
import todos from './todos.json'
import translation from './translation.json'

export const en = {
	translation: translation,
	'not-found': notFound,
	todos: todos
} as const
