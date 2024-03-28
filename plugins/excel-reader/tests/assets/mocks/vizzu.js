class Vizzu {
	_feature = null
	_data = null

	feature(feature) {
		this._feature = feature || null
	}

	async animate() {
		if (this._feature) {
			const { prepareAnimation } = this._feature.hooks
			const ctx = { target: [{ target: arguments[0], options: null }] }
			await prepareAnimation(ctx, () => {})

			this._data = ctx.target[0].target.data
		}
	}
	async initializing() {
		return Promise.resolve()
	}

	get data() {
		return this._data
	}
}

export default Vizzu
