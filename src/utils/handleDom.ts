const trim = function (string: string) {
	return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export const on = (function () {
  return function (
		element: Element | Window,
		event: string,
		handler: EventListener
	) {
		element.addEventListener(event, handler, false)
	}
})()

export const off = (function () {
		return function (
			element: Element | Window,
			event: string,
			handler: EventListener
		) {
			element.removeEventListener(event, handler, false)
		}
})()

export function hasClass(el: Element, cls: string) {
	if (cls.indexOf(' ') !== -1)
		throw new Error('className should not contain space.')
	if (el.classList) {
		return el.classList.contains(cls)
	} else {
		return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
	}
}

export function addClass(el: Element, cls: string) {
	let curClass = el.className
	const classes = (cls || '').split(' ')

	for (var i = 0, j = classes.length; i < j; i++) {
		const clsName = classes[i]
		if (!clsName) continue

		if (el.classList) {
			el.classList.add(clsName)
		} else if (!hasClass(el, clsName)) {
			curClass += ' ' + clsName
		}
	}
	if (!el.classList) {
		el.className = curClass
	}
}

export function removeClass(el: Element, cls: string) {
	const classes = cls.split(' ')
	let curClass = ' ' + el.className + ' '

	for (let i = 0, j = classes.length; i < j; i++) {
		const clsName = classes[i]
		if (!clsName) continue

		if (el.classList) {
			el.classList.remove(clsName)
		} else if (hasClass(el, clsName)) {
			curClass = curClass.replace(' ' + clsName + ' ', ' ')
		}
	}
	if (!el.classList) {
		el.className = trim(curClass)
	}
}
