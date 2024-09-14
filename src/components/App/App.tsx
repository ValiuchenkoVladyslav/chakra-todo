import { useTranslation } from 'react-i18next'

import { Box, Button, Card, CardBody, Input, Select } from '@chakra-ui/react'

import { TodosFilter, useTodos, useTodosFilter } from '@stores/todos'

const widthValue = 'max(33vw,300px)'

const TodoList = () => {
	const { todos, removeTodo, editTodo } = useTodos()
	const filter = useTodosFilter(store => store.filter)
	const { t } = useTranslation('todos')

	return (
		<>
			{todos
				.filter(todo => {
					if (filter === 'done') {
						return todo.isDone
					}
					if (filter === 'not-done') {
						return !todo.isDone
					}
					return true
				})
				.map(todo => (
					<Card
						key={todo.id}
						w={widthValue}
					>
						<CardBody>
							<Input
								textDecoration={todo.isDone ? 'line-through' : ''}
								placeholder="Task text"
								defaultValue={todo.text}
								onChange={e => {
									const text = e.target.value
									editTodo({
										...todo,
										text
									})
								}}
							/>

							<Box
								marginTop="1vh"
								display="flex"
								alignItems="center"
								justifyContent="space-between"
							>
								<div>
									<input
										type="checkbox"
										id={'isDone' + todo.id}
										defaultChecked={todo.isDone}
										onChange={() => {
											editTodo({ ...todo, isDone: !todo.isDone })
										}}
									/>
									<label htmlFor={'isDone' + todo.id}>{t('filter.done')}</label>
								</div>

								<Button
									colorScheme="red"
									variant="outline"
									size="sm"
									onClick={() => removeTodo(todo.id)}
								>
									{t('deleteTodo')}
								</Button>
							</Box>
						</CardBody>
					</Card>
				))}
		</>
	)
}

export const App = () => {
	const addTodo = useTodos(store => store.addTodo)
	const setFilter = useTodosFilter(store => store.setFilter)
	const { t } = useTranslation('todos')

	return (
		<Box
			w="100vw"
			minH="100dvh"
			display="flex"
			flexDirection="column"
			alignItems="center"
			paddingTop="4vh"
			gap="1vh"
		>
			<Button
				colorScheme="blue"
				variant="ghost"
				w={widthValue}
				onClick={() => {
					addTodo({
						text: 'New Todo',
						isDone: false
					})
				}}
			>
				{t('addTodo')}
			</Button>

			<Select
				w={widthValue}
				defaultValue="all"
				onChange={e => {
					setFilter(e.target.value as TodosFilter)
				}}
			>
				<option value="all">{t('filter.all')}</option>
				<option value="done">{t('filter.done')}</option>
				<option value="not-done">{t('filter.notDone')}</option>
			</Select>

			<TodoList />
		</Box>
	)
}
