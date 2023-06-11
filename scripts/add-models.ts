/* eslint-disable no-console */
import checkbox, { Separator } from '@inquirer/checkbox'
import fetch from 'node-fetch'

const fs = require('fs')
const BASE_DIR = 'app/models/'
const BASE_URL = 'http://localhost:8001'

const main = async (): Promise<void> => {
	const _allModelsResponse: any = await fetch(BASE_URL + '/get-all-models')

	const allModels = await _allModelsResponse.json()
	const choices: any[] = []
	Object.keys(allModels).forEach((key) => {
		choices.push(new Separator())
		choices.push(new Separator(`${key}`))

		allModels[key].forEach((model: any) => {
			choices.push({
				value: model.name,
				name: `   ${model.name}`,
				checked: true
			})
		})
	})

	const answer = await checkbox({
		message: 'Select the SQL models you want to add to this project',
		choices,
		pageSize: 40,
		instructions: 'Use tab to select / unselect the models'
	})

	const res = await fetch(BASE_URL + '/ts/?models=' + answer.join(','))
	const jsonResponse = (await res.json()) as any[]

	if (!fs.existsSync(BASE_DIR)) {
		fs.mkdirSync(BASE_DIR)
	}

	jsonResponse.forEach((file) => {
		try {
			fs.writeFileSync(
				`${BASE_DIR}${file.file_name}`,
				file.file_content,
				(err: any) => {
					console.error(err)
				}
			)
		} catch (err) {
			console.log(err)
		}
	})
}

main().then(() => {
	console.log('Completed successfully')
})
