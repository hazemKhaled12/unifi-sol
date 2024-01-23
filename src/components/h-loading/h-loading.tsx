import { CgSpinner } from 'react-icons/cg'
import { classNames } from '@/utils'

export const HLoading = (props: any) => {
	const { label } = props
	return (
		<div
			className={classNames('w-full h-full flex flex-col items-center justify-center p-4 m-6')}
		>
			<CgSpinner className="absolute w-8 h-8 animate-spin text-primary-500" />
		</div>
	)
}
