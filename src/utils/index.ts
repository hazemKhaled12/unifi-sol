export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export const toQuery = (data: any) => {
	const deleteNullUndefinedOrEmpty = (obj: any) => {
		const newObj = { ...obj }
		for (let key in newObj) {
			if (
				newObj[key] === null ||
				newObj[key] === undefined ||
				newObj[key] === 'undefined' ||
				newObj[key] === 'null' ||
				newObj[key] === ''
			) {
				delete newObj[key]
			}
		}
		return newObj
	}
	const cleanedData = deleteNullUndefinedOrEmpty(data)
	const params = new URLSearchParams(cleanedData)
	return params.toString()
}
