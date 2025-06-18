import * as vscode from 'vscode'

interface CompletionResponse {
	completion: string
}

export function activate(context: vscode.ExtensionContext) {
	console.log('Prototype is now active!')

	context.subscriptions.push(
		vscode.languages.registerInlineCompletionItemProvider(
			{ pattern: '**' }, 
			{
				async provideInlineCompletionItems(document, position) {
					const linePrefix = document.lineAt(position).text.slice(0, position.character)
					console.log("welps: extension triggered with prompt →", linePrefix)


					if (linePrefix.trim().length === 0) return []

					try {
						const response = await fetch('http://localhost:3000/complete', {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' }, 
							body: JSON.stringify({ prompt: linePrefix }),
						})

						const data = (await response.json()) as CompletionResponse

						return [
							{
								insertText: data.completion,
								range: new vscode.Range(position, position),
							},
						]
					} catch (error) {
						console.error(' backend error:', error)
						return []
					}
				},
			}
		)
	)
}

export function deactivate() {}

