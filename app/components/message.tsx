export function Message({ name, message, createdAt }: { name: string; message: string; createdAt: Date }) {
	const formatDate = (d: Date) => `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`
	return (
		<div className="w-full text-left flex flex-row justify-between p-2 border-b">
			<div>
				<div className="text-sm text-gray-500 leading-3">{name}</div>
				<div className="text-md leading-6">{message}</div>
			</div>
			<div className="text-xs text-gray-500 leading-3 flex flex-row items-center justify-center">
				<div>{formatDate(createdAt)}</div>
			</div>
		</div>
	)
}
