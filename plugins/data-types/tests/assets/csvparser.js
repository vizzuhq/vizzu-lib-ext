var se = {},
	Re = !1
function Ge() {
	if (Re) return se
	;(Re = !0), (se.byteLength = p), (se.toByteArray = w), (se.fromByteArray = N)
	for (
		var c = [],
			r = [],
			d = typeof Uint8Array < 'u' ? Uint8Array : Array,
			u = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
			a = 0,
			h = u.length;
		a < h;
		++a
	)
		(c[a] = u[a]), (r[u.charCodeAt(a)] = a)
	;(r['-'.charCodeAt(0)] = 62), (r['_'.charCodeAt(0)] = 63)
	function o(m) {
		var E = m.length
		if (E % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4')
		var b = m.indexOf('=')
		b === -1 && (b = E)
		var B = b === E ? 0 : 4 - (b % 4)
		return [b, B]
	}
	function p(m) {
		var E = o(m),
			b = E[0],
			B = E[1]
		return ((b + B) * 3) / 4 - B
	}
	function y(m, E, b) {
		return ((E + b) * 3) / 4 - b
	}
	function w(m) {
		var E,
			b = o(m),
			B = b[0],
			T = b[1],
			S = new d(y(m, B, T)),
			O = 0,
			U = T > 0 ? B - 4 : B,
			L
		for (L = 0; L < U; L += 4)
			(E =
				(r[m.charCodeAt(L)] << 18) |
				(r[m.charCodeAt(L + 1)] << 12) |
				(r[m.charCodeAt(L + 2)] << 6) |
				r[m.charCodeAt(L + 3)]),
				(S[O++] = (E >> 16) & 255),
				(S[O++] = (E >> 8) & 255),
				(S[O++] = E & 255)
		return (
			T === 2 &&
				((E = (r[m.charCodeAt(L)] << 2) | (r[m.charCodeAt(L + 1)] >> 4)),
				(S[O++] = E & 255)),
			T === 1 &&
				((E =
					(r[m.charCodeAt(L)] << 10) |
					(r[m.charCodeAt(L + 1)] << 4) |
					(r[m.charCodeAt(L + 2)] >> 2)),
				(S[O++] = (E >> 8) & 255),
				(S[O++] = E & 255)),
			S
		)
	}
	function I(m) {
		return c[(m >> 18) & 63] + c[(m >> 12) & 63] + c[(m >> 6) & 63] + c[m & 63]
	}
	function _(m, E, b) {
		for (var B, T = [], S = E; S < b; S += 3)
			(B = ((m[S] << 16) & 16711680) + ((m[S + 1] << 8) & 65280) + (m[S + 2] & 255)),
				T.push(I(B))
		return T.join('')
	}
	function N(m) {
		for (var E, b = m.length, B = b % 3, T = [], S = 16383, O = 0, U = b - B; O < U; O += S)
			T.push(_(m, O, O + S > U ? U : O + S))
		return (
			B === 1
				? ((E = m[b - 1]), T.push(c[E >> 2] + c[(E << 4) & 63] + '=='))
				: B === 2 &&
					((E = (m[b - 2] << 8) + m[b - 1]),
					T.push(c[E >> 10] + c[(E >> 4) & 63] + c[(E << 2) & 63] + '=')),
			T.join('')
		)
	}
	return se
}
var le = {},
	Ue = !1
function Ye() {
	if (Ue) return le
	Ue = !0
	return (
		(le.read = function (c, r, d, u, a) {
			var h,
				o,
				p = a * 8 - u - 1,
				y = (1 << p) - 1,
				w = y >> 1,
				I = -7,
				_ = d ? a - 1 : 0,
				N = d ? -1 : 1,
				m = c[r + _]
			for (
				_ += N, h = m & ((1 << -I) - 1), m >>= -I, I += p;
				I > 0;
				h = h * 256 + c[r + _], _ += N, I -= 8
			);
			for (
				o = h & ((1 << -I) - 1), h >>= -I, I += u;
				I > 0;
				o = o * 256 + c[r + _], _ += N, I -= 8
			);
			if (h === 0) h = 1 - w
			else {
				if (h === y) return o ? NaN : (m ? -1 : 1) * (1 / 0)
				;(o = o + Math.pow(2, u)), (h = h - w)
			}
			return (m ? -1 : 1) * o * Math.pow(2, h - u)
		}),
		(le.write = function (c, r, d, u, a, h) {
			var o,
				p,
				y,
				w = h * 8 - a - 1,
				I = (1 << w) - 1,
				_ = I >> 1,
				N = a === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
				m = u ? 0 : h - 1,
				E = u ? 1 : -1,
				b = r < 0 || (r === 0 && 1 / r < 0) ? 1 : 0
			for (
				r = Math.abs(r),
					isNaN(r) || r === 1 / 0
						? ((p = isNaN(r) ? 1 : 0), (o = I))
						: ((o = Math.floor(Math.log(r) / Math.LN2)),
							r * (y = Math.pow(2, -o)) < 1 && (o--, (y *= 2)),
							o + _ >= 1 ? (r += N / y) : (r += N * Math.pow(2, 1 - _)),
							r * y >= 2 && (o++, (y /= 2)),
							o + _ >= I
								? ((p = 0), (o = I))
								: o + _ >= 1
									? ((p = (r * y - 1) * Math.pow(2, a)), (o = o + _))
									: ((p = r * Math.pow(2, _ - 1) * Math.pow(2, a)), (o = 0)));
				a >= 8;
				c[d + m] = p & 255, m += E, p /= 256, a -= 8
			);
			for (o = (o << a) | p, w += a; w > 0; c[d + m] = o & 255, m += E, o /= 256, w -= 8);
			c[d + m - E] |= b * 128
		}),
		le
	)
}
var X = {},
	Le = !1
function We() {
	if (Le) return X
	Le = !0
	let c = Ge(),
		r = Ye(),
		d =
			typeof Symbol == 'function' && typeof Symbol.for == 'function'
				? Symbol.for('nodejs.util.inspect.custom')
				: null
	;(X.Buffer = o), (X.SlowBuffer = T), (X.INSPECT_MAX_BYTES = 50)
	let u = 2147483647
	;(X.kMaxLength = u),
		(o.TYPED_ARRAY_SUPPORT = a()),
		!o.TYPED_ARRAY_SUPPORT &&
			typeof console < 'u' &&
			typeof console.error == 'function' &&
			console.error(
				'This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
			)
	function a() {
		try {
			let i = new Uint8Array(1),
				e = {
					foo: function () {
						return 42
					}
				}
			return (
				Object.setPrototypeOf(e, Uint8Array.prototype),
				Object.setPrototypeOf(i, e),
				i.foo() === 42
			)
		} catch {
			return !1
		}
	}
	Object.defineProperty(o.prototype, 'parent', {
		enumerable: !0,
		get: function () {
			if (o.isBuffer(this)) return this.buffer
		}
	}),
		Object.defineProperty(o.prototype, 'offset', {
			enumerable: !0,
			get: function () {
				if (o.isBuffer(this)) return this.byteOffset
			}
		})
	function h(i) {
		if (i > u) throw new RangeError('The value "' + i + '" is invalid for option "size"')
		let e = new Uint8Array(i)
		return Object.setPrototypeOf(e, o.prototype), e
	}
	function o(i, e, t) {
		if (typeof i == 'number') {
			if (typeof e == 'string')
				throw new TypeError(
					'The "string" argument must be of type string. Received type number'
				)
			return I(i)
		}
		return p(i, e, t)
	}
	o.poolSize = 8192
	function p(i, e, t) {
		if (typeof i == 'string') return _(i, e)
		if (ArrayBuffer.isView(i)) return m(i)
		if (i == null)
			throw new TypeError(
				'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
					typeof i
			)
		if (
			H(i, ArrayBuffer) ||
			(i && H(i.buffer, ArrayBuffer)) ||
			(typeof SharedArrayBuffer < 'u' &&
				(H(i, SharedArrayBuffer) || (i && H(i.buffer, SharedArrayBuffer))))
		)
			return E(i, e, t)
		if (typeof i == 'number')
			throw new TypeError(
				'The "value" argument must not be of type number. Received type number'
			)
		let n = i.valueOf && i.valueOf()
		if (n != null && n !== i) return o.from(n, e, t)
		let s = b(i)
		if (s) return s
		if (
			typeof Symbol < 'u' &&
			Symbol.toPrimitive != null &&
			typeof i[Symbol.toPrimitive] == 'function'
		)
			return o.from(i[Symbol.toPrimitive]('string'), e, t)
		throw new TypeError(
			'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
				typeof i
		)
	}
	;(o.from = function (i, e, t) {
		return p(i, e, t)
	}),
		Object.setPrototypeOf(o.prototype, Uint8Array.prototype),
		Object.setPrototypeOf(o, Uint8Array)
	function y(i) {
		if (typeof i != 'number') throw new TypeError('"size" argument must be of type number')
		if (i < 0) throw new RangeError('The value "' + i + '" is invalid for option "size"')
	}
	function w(i, e, t) {
		return (
			y(i),
			i <= 0
				? h(i)
				: e !== void 0
					? typeof t == 'string'
						? h(i).fill(e, t)
						: h(i).fill(e)
					: h(i)
		)
	}
	o.alloc = function (i, e, t) {
		return w(i, e, t)
	}
	function I(i) {
		return y(i), h(i < 0 ? 0 : B(i) | 0)
	}
	;(o.allocUnsafe = function (i) {
		return I(i)
	}),
		(o.allocUnsafeSlow = function (i) {
			return I(i)
		})
	function _(i, e) {
		if (((typeof e != 'string' || e === '') && (e = 'utf8'), !o.isEncoding(e)))
			throw new TypeError('Unknown encoding: ' + e)
		let t = S(i, e) | 0,
			n = h(t),
			s = n.write(i, e)
		return s !== t && (n = n.slice(0, s)), n
	}
	function N(i) {
		let e = i.length < 0 ? 0 : B(i.length) | 0,
			t = h(e)
		for (let n = 0; n < e; n += 1) t[n] = i[n] & 255
		return t
	}
	function m(i) {
		if (H(i, Uint8Array)) {
			let e = new Uint8Array(i)
			return E(e.buffer, e.byteOffset, e.byteLength)
		}
		return N(i)
	}
	function E(i, e, t) {
		if (e < 0 || i.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds')
		if (i.byteLength < e + (t || 0))
			throw new RangeError('"length" is outside of buffer bounds')
		let n
		return (
			e === void 0 && t === void 0
				? (n = new Uint8Array(i))
				: t === void 0
					? (n = new Uint8Array(i, e))
					: (n = new Uint8Array(i, e, t)),
			Object.setPrototypeOf(n, o.prototype),
			n
		)
	}
	function b(i) {
		if (o.isBuffer(i)) {
			let e = B(i.length) | 0,
				t = h(e)
			return t.length === 0 || i.copy(t, 0, 0, e), t
		}
		if (i.length !== void 0) return typeof i.length != 'number' || ye(i.length) ? h(0) : N(i)
		if (i.type === 'Buffer' && Array.isArray(i.data)) return N(i.data)
	}
	function B(i) {
		if (i >= u)
			throw new RangeError(
				'Attempt to allocate Buffer larger than maximum size: 0x' +
					u.toString(16) +
					' bytes'
			)
		return i | 0
	}
	function T(i) {
		return +i != i && (i = 0), o.alloc(+i)
	}
	;(o.isBuffer = function (e) {
		return e != null && e._isBuffer === !0 && e !== o.prototype
	}),
		(o.compare = function (e, t) {
			if (
				(H(e, Uint8Array) && (e = o.from(e, e.offset, e.byteLength)),
				H(t, Uint8Array) && (t = o.from(t, t.offset, t.byteLength)),
				!o.isBuffer(e) || !o.isBuffer(t))
			)
				throw new TypeError(
					'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
				)
			if (e === t) return 0
			let n = e.length,
				s = t.length
			for (let l = 0, f = Math.min(n, s); l < f; ++l)
				if (e[l] !== t[l]) {
					;(n = e[l]), (s = t[l])
					break
				}
			return n < s ? -1 : s < n ? 1 : 0
		}),
		(o.isEncoding = function (e) {
			switch (String(e).toLowerCase()) {
				case 'hex':
				case 'utf8':
				case 'utf-8':
				case 'ascii':
				case 'latin1':
				case 'binary':
				case 'base64':
				case 'ucs2':
				case 'ucs-2':
				case 'utf16le':
				case 'utf-16le':
					return !0
				default:
					return !1
			}
		}),
		(o.concat = function (e, t) {
			if (!Array.isArray(e))
				throw new TypeError('"list" argument must be an Array of Buffers')
			if (e.length === 0) return o.alloc(0)
			let n
			if (t === void 0) for (t = 0, n = 0; n < e.length; ++n) t += e[n].length
			let s = o.allocUnsafe(t),
				l = 0
			for (n = 0; n < e.length; ++n) {
				let f = e[n]
				if (H(f, Uint8Array))
					l + f.length > s.length
						? (o.isBuffer(f) || (f = o.from(f)), f.copy(s, l))
						: Uint8Array.prototype.set.call(s, f, l)
				else if (o.isBuffer(f)) f.copy(s, l)
				else throw new TypeError('"list" argument must be an Array of Buffers')
				l += f.length
			}
			return s
		})
	function S(i, e) {
		if (o.isBuffer(i)) return i.length
		if (ArrayBuffer.isView(i) || H(i, ArrayBuffer)) return i.byteLength
		if (typeof i != 'string')
			throw new TypeError(
				'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
					typeof i
			)
		let t = i.length,
			n = arguments.length > 2 && arguments[2] === !0
		if (!n && t === 0) return 0
		let s = !1
		for (;;)
			switch (e) {
				case 'ascii':
				case 'latin1':
				case 'binary':
					return t
				case 'utf8':
				case 'utf-8':
					return ge(i).length
				case 'ucs2':
				case 'ucs-2':
				case 'utf16le':
				case 'utf-16le':
					return t * 2
				case 'hex':
					return t >>> 1
				case 'base64':
					return Ce(i).length
				default:
					if (s) return n ? -1 : ge(i).length
					;(e = ('' + e).toLowerCase()), (s = !0)
			}
	}
	o.byteLength = S
	function O(i, e, t) {
		let n = !1
		if (
			((e === void 0 || e < 0) && (e = 0),
			e > this.length ||
				((t === void 0 || t > this.length) && (t = this.length), t <= 0) ||
				((t >>>= 0), (e >>>= 0), t <= e))
		)
			return ''
		for (i || (i = 'utf8'); ; )
			switch (i) {
				case 'hex':
					return W(this, e, t)
				case 'utf8':
				case 'utf-8':
					return x(this, e, t)
				case 'ascii':
					return me(this, e, t)
				case 'latin1':
				case 'binary':
					return F(this, e, t)
				case 'base64':
					return ne(this, e, t)
				case 'ucs2':
				case 'ucs-2':
				case 'utf16le':
				case 'utf-16le':
					return z(this, e, t)
				default:
					if (n) throw new TypeError('Unknown encoding: ' + i)
					;(i = (i + '').toLowerCase()), (n = !0)
			}
	}
	o.prototype._isBuffer = !0
	function U(i, e, t) {
		let n = i[e]
		;(i[e] = i[t]), (i[t] = n)
	}
	;(o.prototype.swap16 = function () {
		let e = this.length
		if (e % 2 !== 0) throw new RangeError('Buffer size must be a multiple of 16-bits')
		for (let t = 0; t < e; t += 2) U(this, t, t + 1)
		return this
	}),
		(o.prototype.swap32 = function () {
			let e = this.length
			if (e % 4 !== 0) throw new RangeError('Buffer size must be a multiple of 32-bits')
			for (let t = 0; t < e; t += 4) U(this, t, t + 3), U(this, t + 1, t + 2)
			return this
		}),
		(o.prototype.swap64 = function () {
			let e = this.length
			if (e % 8 !== 0) throw new RangeError('Buffer size must be a multiple of 64-bits')
			for (let t = 0; t < e; t += 8)
				U(this, t, t + 7),
					U(this, t + 1, t + 6),
					U(this, t + 2, t + 5),
					U(this, t + 3, t + 4)
			return this
		}),
		(o.prototype.toString = function () {
			let e = this.length
			return e === 0 ? '' : arguments.length === 0 ? x(this, 0, e) : O.apply(this, arguments)
		}),
		(o.prototype.toLocaleString = o.prototype.toString),
		(o.prototype.equals = function (e) {
			if (!o.isBuffer(e)) throw new TypeError('Argument must be a Buffer')
			return this === e ? !0 : o.compare(this, e) === 0
		}),
		(o.prototype.inspect = function () {
			let e = '',
				t = X.INSPECT_MAX_BYTES
			return (
				(e = this.toString('hex', 0, t)
					.replace(/(.{2})/g, '$1 ')
					.trim()),
				this.length > t && (e += ' ... '),
				'<Buffer ' + e + '>'
			)
		}),
		d && (o.prototype[d] = o.prototype.inspect),
		(o.prototype.compare = function (e, t, n, s, l) {
			if ((H(e, Uint8Array) && (e = o.from(e, e.offset, e.byteLength)), !o.isBuffer(e)))
				throw new TypeError(
					'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
						typeof e
				)
			if (
				(t === void 0 && (t = 0),
				n === void 0 && (n = e ? e.length : 0),
				s === void 0 && (s = 0),
				l === void 0 && (l = this.length),
				t < 0 || n > e.length || s < 0 || l > this.length)
			)
				throw new RangeError('out of range index')
			if (s >= l && t >= n) return 0
			if (s >= l) return -1
			if (t >= n) return 1
			if (((t >>>= 0), (n >>>= 0), (s >>>= 0), (l >>>= 0), this === e)) return 0
			let f = l - s,
				A = n - t,
				P = Math.min(f, A),
				M = this.slice(s, l),
				q = e.slice(t, n)
			for (let $ = 0; $ < P; ++$)
				if (M[$] !== q[$]) {
					;(f = M[$]), (A = q[$])
					break
				}
			return f < A ? -1 : A < f ? 1 : 0
		})
	function L(i, e, t, n, s) {
		if (i.length === 0) return -1
		if (
			(typeof t == 'string'
				? ((n = t), (t = 0))
				: t > 2147483647
					? (t = 2147483647)
					: t < -2147483648 && (t = -2147483648),
			(t = +t),
			ye(t) && (t = s ? 0 : i.length - 1),
			t < 0 && (t = i.length + t),
			t >= i.length)
		) {
			if (s) return -1
			t = i.length - 1
		} else if (t < 0)
			if (s) t = 0
			else return -1
		if ((typeof e == 'string' && (e = o.from(e, n)), o.isBuffer(e)))
			return e.length === 0 ? -1 : K(i, e, t, n, s)
		if (typeof e == 'number')
			return (
				(e = e & 255),
				typeof Uint8Array.prototype.indexOf == 'function'
					? s
						? Uint8Array.prototype.indexOf.call(i, e, t)
						: Uint8Array.prototype.lastIndexOf.call(i, e, t)
					: K(i, [e], t, n, s)
			)
		throw new TypeError('val must be string, number or Buffer')
	}
	function K(i, e, t, n, s) {
		let l = 1,
			f = i.length,
			A = e.length
		if (
			n !== void 0 &&
			((n = String(n).toLowerCase()),
			n === 'ucs2' || n === 'ucs-2' || n === 'utf16le' || n === 'utf-16le')
		) {
			if (i.length < 2 || e.length < 2) return -1
			;(l = 2), (f /= 2), (A /= 2), (t /= 2)
		}
		function P(q, $) {
			return l === 1 ? q[$] : q.readUInt16BE($ * l)
		}
		let M
		if (s) {
			let q = -1
			for (M = t; M < f; M++)
				if (P(i, M) === P(e, q === -1 ? 0 : M - q)) {
					if ((q === -1 && (q = M), M - q + 1 === A)) return q * l
				} else q !== -1 && (M -= M - q), (q = -1)
		} else
			for (t + A > f && (t = f - A), M = t; M >= 0; M--) {
				let q = !0
				for (let $ = 0; $ < A; $++)
					if (P(i, M + $) !== P(e, $)) {
						q = !1
						break
					}
				if (q) return M
			}
		return -1
	}
	;(o.prototype.includes = function (e, t, n) {
		return this.indexOf(e, t, n) !== -1
	}),
		(o.prototype.indexOf = function (e, t, n) {
			return L(this, e, t, n, !0)
		}),
		(o.prototype.lastIndexOf = function (e, t, n) {
			return L(this, e, t, n, !1)
		})
	function he(i, e, t, n) {
		t = Number(t) || 0
		let s = i.length - t
		n ? ((n = Number(n)), n > s && (n = s)) : (n = s)
		let l = e.length
		n > l / 2 && (n = l / 2)
		let f
		for (f = 0; f < n; ++f) {
			let A = parseInt(e.substr(f * 2, 2), 16)
			if (ye(A)) return f
			i[t + f] = A
		}
		return f
	}
	function ee(i, e, t, n) {
		return ue(ge(e, i.length - t), i, t, n)
	}
	function de(i, e, t, n) {
		return ue(je(e), i, t, n)
	}
	function pe(i, e, t, n) {
		return ue(Ce(e), i, t, n)
	}
	function R(i, e, t, n) {
		return ue(He(e, i.length - t), i, t, n)
	}
	;(o.prototype.write = function (e, t, n, s) {
		if (t === void 0) (s = 'utf8'), (n = this.length), (t = 0)
		else if (n === void 0 && typeof t == 'string') (s = t), (n = this.length), (t = 0)
		else if (isFinite(t))
			(t = t >>> 0),
				isFinite(n)
					? ((n = n >>> 0), s === void 0 && (s = 'utf8'))
					: ((s = n), (n = void 0))
		else
			throw new Error(
				'Buffer.write(string, encoding, offset[, length]) is no longer supported'
			)
		let l = this.length - t
		if (
			((n === void 0 || n > l) && (n = l),
			(e.length > 0 && (n < 0 || t < 0)) || t > this.length)
		)
			throw new RangeError('Attempt to write outside buffer bounds')
		s || (s = 'utf8')
		let f = !1
		for (;;)
			switch (s) {
				case 'hex':
					return he(this, e, t, n)
				case 'utf8':
				case 'utf-8':
					return ee(this, e, t, n)
				case 'ascii':
				case 'latin1':
				case 'binary':
					return de(this, e, t, n)
				case 'base64':
					return pe(this, e, t, n)
				case 'ucs2':
				case 'ucs-2':
				case 'utf16le':
				case 'utf-16le':
					return R(this, e, t, n)
				default:
					if (f) throw new TypeError('Unknown encoding: ' + s)
					;(s = ('' + s).toLowerCase()), (f = !0)
			}
	}),
		(o.prototype.toJSON = function () {
			return { type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0) }
		})
	function ne(i, e, t) {
		return e === 0 && t === i.length ? c.fromByteArray(i) : c.fromByteArray(i.slice(e, t))
	}
	function x(i, e, t) {
		t = Math.min(i.length, t)
		let n = [],
			s = e
		for (; s < t; ) {
			let l = i[s],
				f = null,
				A = l > 239 ? 4 : l > 223 ? 3 : l > 191 ? 2 : 1
			if (s + A <= t) {
				let P, M, q, $
				switch (A) {
					case 1:
						l < 128 && (f = l)
						break
					case 2:
						;(P = i[s + 1]),
							(P & 192) === 128 &&
								(($ = ((l & 31) << 6) | (P & 63)), $ > 127 && (f = $))
						break
					case 3:
						;(P = i[s + 1]),
							(M = i[s + 2]),
							(P & 192) === 128 &&
								(M & 192) === 128 &&
								(($ = ((l & 15) << 12) | ((P & 63) << 6) | (M & 63)),
								$ > 2047 && ($ < 55296 || $ > 57343) && (f = $))
						break
					case 4:
						;(P = i[s + 1]),
							(M = i[s + 2]),
							(q = i[s + 3]),
							(P & 192) === 128 &&
								(M & 192) === 128 &&
								(q & 192) === 128 &&
								(($ =
									((l & 15) << 18) |
									((P & 63) << 12) |
									((M & 63) << 6) |
									(q & 63)),
								$ > 65535 && $ < 1114112 && (f = $))
				}
			}
			f === null
				? ((f = 65533), (A = 1))
				: f > 65535 &&
					((f -= 65536), n.push(((f >>> 10) & 1023) | 55296), (f = 56320 | (f & 1023))),
				n.push(f),
				(s += A)
		}
		return j(n)
	}
	let k = 4096
	function j(i) {
		let e = i.length
		if (e <= k) return String.fromCharCode.apply(String, i)
		let t = '',
			n = 0
		for (; n < e; ) t += String.fromCharCode.apply(String, i.slice(n, (n += k)))
		return t
	}
	function me(i, e, t) {
		let n = ''
		t = Math.min(i.length, t)
		for (let s = e; s < t; ++s) n += String.fromCharCode(i[s] & 127)
		return n
	}
	function F(i, e, t) {
		let n = ''
		t = Math.min(i.length, t)
		for (let s = e; s < t; ++s) n += String.fromCharCode(i[s])
		return n
	}
	function W(i, e, t) {
		let n = i.length
		;(!e || e < 0) && (e = 0), (!t || t < 0 || t > n) && (t = n)
		let s = ''
		for (let l = e; l < t; ++l) s += ze[i[l]]
		return s
	}
	function z(i, e, t) {
		let n = i.slice(e, t),
			s = ''
		for (let l = 0; l < n.length - 1; l += 2) s += String.fromCharCode(n[l] + n[l + 1] * 256)
		return s
	}
	o.prototype.slice = function (e, t) {
		let n = this.length
		;(e = ~~e),
			(t = t === void 0 ? n : ~~t),
			e < 0 ? ((e += n), e < 0 && (e = 0)) : e > n && (e = n),
			t < 0 ? ((t += n), t < 0 && (t = 0)) : t > n && (t = n),
			t < e && (t = e)
		let s = this.subarray(e, t)
		return Object.setPrototypeOf(s, o.prototype), s
	}
	function D(i, e, t) {
		if (i % 1 !== 0 || i < 0) throw new RangeError('offset is not uint')
		if (i + e > t) throw new RangeError('Trying to access beyond buffer length')
	}
	;(o.prototype.readUintLE = o.prototype.readUIntLE =
		function (e, t, n) {
			;(e = e >>> 0), (t = t >>> 0), n || D(e, t, this.length)
			let s = this[e],
				l = 1,
				f = 0
			for (; ++f < t && (l *= 256); ) s += this[e + f] * l
			return s
		}),
		(o.prototype.readUintBE = o.prototype.readUIntBE =
			function (e, t, n) {
				;(e = e >>> 0), (t = t >>> 0), n || D(e, t, this.length)
				let s = this[e + --t],
					l = 1
				for (; t > 0 && (l *= 256); ) s += this[e + --t] * l
				return s
			}),
		(o.prototype.readUint8 = o.prototype.readUInt8 =
			function (e, t) {
				return (e = e >>> 0), t || D(e, 1, this.length), this[e]
			}),
		(o.prototype.readUint16LE = o.prototype.readUInt16LE =
			function (e, t) {
				return (e = e >>> 0), t || D(e, 2, this.length), this[e] | (this[e + 1] << 8)
			}),
		(o.prototype.readUint16BE = o.prototype.readUInt16BE =
			function (e, t) {
				return (e = e >>> 0), t || D(e, 2, this.length), (this[e] << 8) | this[e + 1]
			}),
		(o.prototype.readUint32LE = o.prototype.readUInt32LE =
			function (e, t) {
				return (
					(e = e >>> 0),
					t || D(e, 4, this.length),
					(this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) + this[e + 3] * 16777216
				)
			}),
		(o.prototype.readUint32BE = o.prototype.readUInt32BE =
			function (e, t) {
				return (
					(e = e >>> 0),
					t || D(e, 4, this.length),
					this[e] * 16777216 + ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
				)
			}),
		(o.prototype.readBigUInt64LE = G(function (e) {
			;(e = e >>> 0), re(e, 'offset')
			let t = this[e],
				n = this[e + 7]
			;(t === void 0 || n === void 0) && oe(e, this.length - 8)
			let s = t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24,
				l = this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + n * 2 ** 24
			return BigInt(s) + (BigInt(l) << BigInt(32))
		})),
		(o.prototype.readBigUInt64BE = G(function (e) {
			;(e = e >>> 0), re(e, 'offset')
			let t = this[e],
				n = this[e + 7]
			;(t === void 0 || n === void 0) && oe(e, this.length - 8)
			let s = t * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e],
				l = this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n
			return (BigInt(s) << BigInt(32)) + BigInt(l)
		})),
		(o.prototype.readIntLE = function (e, t, n) {
			;(e = e >>> 0), (t = t >>> 0), n || D(e, t, this.length)
			let s = this[e],
				l = 1,
				f = 0
			for (; ++f < t && (l *= 256); ) s += this[e + f] * l
			return (l *= 128), s >= l && (s -= Math.pow(2, 8 * t)), s
		}),
		(o.prototype.readIntBE = function (e, t, n) {
			;(e = e >>> 0), (t = t >>> 0), n || D(e, t, this.length)
			let s = t,
				l = 1,
				f = this[e + --s]
			for (; s > 0 && (l *= 256); ) f += this[e + --s] * l
			return (l *= 128), f >= l && (f -= Math.pow(2, 8 * t)), f
		}),
		(o.prototype.readInt8 = function (e, t) {
			return (
				(e = e >>> 0),
				t || D(e, 1, this.length),
				this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e]
			)
		}),
		(o.prototype.readInt16LE = function (e, t) {
			;(e = e >>> 0), t || D(e, 2, this.length)
			let n = this[e] | (this[e + 1] << 8)
			return n & 32768 ? n | 4294901760 : n
		}),
		(o.prototype.readInt16BE = function (e, t) {
			;(e = e >>> 0), t || D(e, 2, this.length)
			let n = this[e + 1] | (this[e] << 8)
			return n & 32768 ? n | 4294901760 : n
		}),
		(o.prototype.readInt32LE = function (e, t) {
			return (
				(e = e >>> 0),
				t || D(e, 4, this.length),
				this[e] | (this[e + 1] << 8) | (this[e + 2] << 16) | (this[e + 3] << 24)
			)
		}),
		(o.prototype.readInt32BE = function (e, t) {
			return (
				(e = e >>> 0),
				t || D(e, 4, this.length),
				(this[e] << 24) | (this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3]
			)
		}),
		(o.prototype.readBigInt64LE = G(function (e) {
			;(e = e >>> 0), re(e, 'offset')
			let t = this[e],
				n = this[e + 7]
			;(t === void 0 || n === void 0) && oe(e, this.length - 8)
			let s = this[e + 4] + this[e + 5] * 2 ** 8 + this[e + 6] * 2 ** 16 + (n << 24)
			return (
				(BigInt(s) << BigInt(32)) +
				BigInt(t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24)
			)
		})),
		(o.prototype.readBigInt64BE = G(function (e) {
			;(e = e >>> 0), re(e, 'offset')
			let t = this[e],
				n = this[e + 7]
			;(t === void 0 || n === void 0) && oe(e, this.length - 8)
			let s = (t << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e]
			return (
				(BigInt(s) << BigInt(32)) +
				BigInt(this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n)
			)
		})),
		(o.prototype.readFloatLE = function (e, t) {
			return (e = e >>> 0), t || D(e, 4, this.length), r.read(this, e, !0, 23, 4)
		}),
		(o.prototype.readFloatBE = function (e, t) {
			return (e = e >>> 0), t || D(e, 4, this.length), r.read(this, e, !1, 23, 4)
		}),
		(o.prototype.readDoubleLE = function (e, t) {
			return (e = e >>> 0), t || D(e, 8, this.length), r.read(this, e, !0, 52, 8)
		}),
		(o.prototype.readDoubleBE = function (e, t) {
			return (e = e >>> 0), t || D(e, 8, this.length), r.read(this, e, !1, 52, 8)
		})
	function V(i, e, t, n, s, l) {
		if (!o.isBuffer(i)) throw new TypeError('"buffer" argument must be a Buffer instance')
		if (e > s || e < l) throw new RangeError('"value" argument is out of bounds')
		if (t + n > i.length) throw new RangeError('Index out of range')
	}
	;(o.prototype.writeUintLE = o.prototype.writeUIntLE =
		function (e, t, n, s) {
			if (((e = +e), (t = t >>> 0), (n = n >>> 0), !s)) {
				let A = Math.pow(2, 8 * n) - 1
				V(this, e, t, n, A, 0)
			}
			let l = 1,
				f = 0
			for (this[t] = e & 255; ++f < n && (l *= 256); ) this[t + f] = (e / l) & 255
			return t + n
		}),
		(o.prototype.writeUintBE = o.prototype.writeUIntBE =
			function (e, t, n, s) {
				if (((e = +e), (t = t >>> 0), (n = n >>> 0), !s)) {
					let A = Math.pow(2, 8 * n) - 1
					V(this, e, t, n, A, 0)
				}
				let l = n - 1,
					f = 1
				for (this[t + l] = e & 255; --l >= 0 && (f *= 256); ) this[t + l] = (e / f) & 255
				return t + n
			}),
		(o.prototype.writeUint8 = o.prototype.writeUInt8 =
			function (e, t, n) {
				return (
					(e = +e),
					(t = t >>> 0),
					n || V(this, e, t, 1, 255, 0),
					(this[t] = e & 255),
					t + 1
				)
			}),
		(o.prototype.writeUint16LE = o.prototype.writeUInt16LE =
			function (e, t, n) {
				return (
					(e = +e),
					(t = t >>> 0),
					n || V(this, e, t, 2, 65535, 0),
					(this[t] = e & 255),
					(this[t + 1] = e >>> 8),
					t + 2
				)
			}),
		(o.prototype.writeUint16BE = o.prototype.writeUInt16BE =
			function (e, t, n) {
				return (
					(e = +e),
					(t = t >>> 0),
					n || V(this, e, t, 2, 65535, 0),
					(this[t] = e >>> 8),
					(this[t + 1] = e & 255),
					t + 2
				)
			}),
		(o.prototype.writeUint32LE = o.prototype.writeUInt32LE =
			function (e, t, n) {
				return (
					(e = +e),
					(t = t >>> 0),
					n || V(this, e, t, 4, 4294967295, 0),
					(this[t + 3] = e >>> 24),
					(this[t + 2] = e >>> 16),
					(this[t + 1] = e >>> 8),
					(this[t] = e & 255),
					t + 4
				)
			}),
		(o.prototype.writeUint32BE = o.prototype.writeUInt32BE =
			function (e, t, n) {
				return (
					(e = +e),
					(t = t >>> 0),
					n || V(this, e, t, 4, 4294967295, 0),
					(this[t] = e >>> 24),
					(this[t + 1] = e >>> 16),
					(this[t + 2] = e >>> 8),
					(this[t + 3] = e & 255),
					t + 4
				)
			})
	function Q(i, e, t, n, s) {
		Te(e, n, s, i, t, 7)
		let l = Number(e & BigInt(4294967295))
		;(i[t++] = l),
			(l = l >> 8),
			(i[t++] = l),
			(l = l >> 8),
			(i[t++] = l),
			(l = l >> 8),
			(i[t++] = l)
		let f = Number((e >> BigInt(32)) & BigInt(4294967295))
		return (
			(i[t++] = f),
			(f = f >> 8),
			(i[t++] = f),
			(f = f >> 8),
			(i[t++] = f),
			(f = f >> 8),
			(i[t++] = f),
			t
		)
	}
	function Se(i, e, t, n, s) {
		Te(e, n, s, i, t, 7)
		let l = Number(e & BigInt(4294967295))
		;(i[t + 7] = l),
			(l = l >> 8),
			(i[t + 6] = l),
			(l = l >> 8),
			(i[t + 5] = l),
			(l = l >> 8),
			(i[t + 4] = l)
		let f = Number((e >> BigInt(32)) & BigInt(4294967295))
		return (
			(i[t + 3] = f),
			(f = f >> 8),
			(i[t + 2] = f),
			(f = f >> 8),
			(i[t + 1] = f),
			(f = f >> 8),
			(i[t] = f),
			t + 8
		)
	}
	;(o.prototype.writeBigUInt64LE = G(function (e, t = 0) {
		return Q(this, e, t, BigInt(0), BigInt('0xffffffffffffffff'))
	})),
		(o.prototype.writeBigUInt64BE = G(function (e, t = 0) {
			return Se(this, e, t, BigInt(0), BigInt('0xffffffffffffffff'))
		})),
		(o.prototype.writeIntLE = function (e, t, n, s) {
			if (((e = +e), (t = t >>> 0), !s)) {
				let P = Math.pow(2, 8 * n - 1)
				V(this, e, t, n, P - 1, -P)
			}
			let l = 0,
				f = 1,
				A = 0
			for (this[t] = e & 255; ++l < n && (f *= 256); )
				e < 0 && A === 0 && this[t + l - 1] !== 0 && (A = 1),
					(this[t + l] = (((e / f) >> 0) - A) & 255)
			return t + n
		}),
		(o.prototype.writeIntBE = function (e, t, n, s) {
			if (((e = +e), (t = t >>> 0), !s)) {
				let P = Math.pow(2, 8 * n - 1)
				V(this, e, t, n, P - 1, -P)
			}
			let l = n - 1,
				f = 1,
				A = 0
			for (this[t + l] = e & 255; --l >= 0 && (f *= 256); )
				e < 0 && A === 0 && this[t + l + 1] !== 0 && (A = 1),
					(this[t + l] = (((e / f) >> 0) - A) & 255)
			return t + n
		}),
		(o.prototype.writeInt8 = function (e, t, n) {
			return (
				(e = +e),
				(t = t >>> 0),
				n || V(this, e, t, 1, 127, -128),
				e < 0 && (e = 255 + e + 1),
				(this[t] = e & 255),
				t + 1
			)
		}),
		(o.prototype.writeInt16LE = function (e, t, n) {
			return (
				(e = +e),
				(t = t >>> 0),
				n || V(this, e, t, 2, 32767, -32768),
				(this[t] = e & 255),
				(this[t + 1] = e >>> 8),
				t + 2
			)
		}),
		(o.prototype.writeInt16BE = function (e, t, n) {
			return (
				(e = +e),
				(t = t >>> 0),
				n || V(this, e, t, 2, 32767, -32768),
				(this[t] = e >>> 8),
				(this[t + 1] = e & 255),
				t + 2
			)
		}),
		(o.prototype.writeInt32LE = function (e, t, n) {
			return (
				(e = +e),
				(t = t >>> 0),
				n || V(this, e, t, 4, 2147483647, -2147483648),
				(this[t] = e & 255),
				(this[t + 1] = e >>> 8),
				(this[t + 2] = e >>> 16),
				(this[t + 3] = e >>> 24),
				t + 4
			)
		}),
		(o.prototype.writeInt32BE = function (e, t, n) {
			return (
				(e = +e),
				(t = t >>> 0),
				n || V(this, e, t, 4, 2147483647, -2147483648),
				e < 0 && (e = 4294967295 + e + 1),
				(this[t] = e >>> 24),
				(this[t + 1] = e >>> 16),
				(this[t + 2] = e >>> 8),
				(this[t + 3] = e & 255),
				t + 4
			)
		}),
		(o.prototype.writeBigInt64LE = G(function (e, t = 0) {
			return Q(this, e, t, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
		})),
		(o.prototype.writeBigInt64BE = G(function (e, t = 0) {
			return Se(this, e, t, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
		}))
	function Oe(i, e, t, n, s, l) {
		if (t + n > i.length) throw new RangeError('Index out of range')
		if (t < 0) throw new RangeError('Index out of range')
	}
	function xe(i, e, t, n, s) {
		return (e = +e), (t = t >>> 0), s || Oe(i, e, t, 4), r.write(i, e, t, n, 23, 4), t + 4
	}
	;(o.prototype.writeFloatLE = function (e, t, n) {
		return xe(this, e, t, !0, n)
	}),
		(o.prototype.writeFloatBE = function (e, t, n) {
			return xe(this, e, t, !1, n)
		})
	function Ne(i, e, t, n, s) {
		return (e = +e), (t = t >>> 0), s || Oe(i, e, t, 8), r.write(i, e, t, n, 52, 8), t + 8
	}
	;(o.prototype.writeDoubleLE = function (e, t, n) {
		return Ne(this, e, t, !0, n)
	}),
		(o.prototype.writeDoubleBE = function (e, t, n) {
			return Ne(this, e, t, !1, n)
		}),
		(o.prototype.copy = function (e, t, n, s) {
			if (!o.isBuffer(e)) throw new TypeError('argument should be a Buffer')
			if (
				(n || (n = 0),
				!s && s !== 0 && (s = this.length),
				t >= e.length && (t = e.length),
				t || (t = 0),
				s > 0 && s < n && (s = n),
				s === n || e.length === 0 || this.length === 0)
			)
				return 0
			if (t < 0) throw new RangeError('targetStart out of bounds')
			if (n < 0 || n >= this.length) throw new RangeError('Index out of range')
			if (s < 0) throw new RangeError('sourceEnd out of bounds')
			s > this.length && (s = this.length), e.length - t < s - n && (s = e.length - t + n)
			let l = s - n
			return (
				this === e && typeof Uint8Array.prototype.copyWithin == 'function'
					? this.copyWithin(t, n, s)
					: Uint8Array.prototype.set.call(e, this.subarray(n, s), t),
				l
			)
		}),
		(o.prototype.fill = function (e, t, n, s) {
			if (typeof e == 'string') {
				if (
					(typeof t == 'string'
						? ((s = t), (t = 0), (n = this.length))
						: typeof n == 'string' && ((s = n), (n = this.length)),
					s !== void 0 && typeof s != 'string')
				)
					throw new TypeError('encoding must be a string')
				if (typeof s == 'string' && !o.isEncoding(s))
					throw new TypeError('Unknown encoding: ' + s)
				if (e.length === 1) {
					let f = e.charCodeAt(0)
					;((s === 'utf8' && f < 128) || s === 'latin1') && (e = f)
				}
			} else typeof e == 'number' ? (e = e & 255) : typeof e == 'boolean' && (e = Number(e))
			if (t < 0 || this.length < t || this.length < n)
				throw new RangeError('Out of range index')
			if (n <= t) return this
			;(t = t >>> 0), (n = n === void 0 ? this.length : n >>> 0), e || (e = 0)
			let l
			if (typeof e == 'number') for (l = t; l < n; ++l) this[l] = e
			else {
				let f = o.isBuffer(e) ? e : o.from(e, s),
					A = f.length
				if (A === 0)
					throw new TypeError('The value "' + e + '" is invalid for argument "value"')
				for (l = 0; l < n - t; ++l) this[l + t] = f[l % A]
			}
			return this
		})
	let te = {}
	function _e(i, e, t) {
		te[i] = class extends t {
			constructor() {
				super(),
					Object.defineProperty(this, 'message', {
						value: e.apply(this, arguments),
						writable: !0,
						configurable: !0
					}),
					(this.name = `${this.name} [${i}]`),
					this.stack,
					delete this.name
			}
			get code() {
				return i
			}
			set code(s) {
				Object.defineProperty(this, 'code', {
					configurable: !0,
					enumerable: !0,
					value: s,
					writable: !0
				})
			}
			toString() {
				return `${this.name} [${i}]: ${this.message}`
			}
		}
	}
	_e(
		'ERR_BUFFER_OUT_OF_BOUNDS',
		function (i) {
			return i
				? `${i} is outside of buffer bounds`
				: 'Attempt to access memory outside buffer bounds'
		},
		RangeError
	),
		_e(
			'ERR_INVALID_ARG_TYPE',
			function (i, e) {
				return `The "${i}" argument must be of type number. Received type ${typeof e}`
			},
			TypeError
		),
		_e(
			'ERR_OUT_OF_RANGE',
			function (i, e, t) {
				let n = `The value of "${i}" is out of range.`,
					s = t
				return (
					Number.isInteger(t) && Math.abs(t) > 2 ** 32
						? (s = Ae(String(t)))
						: typeof t == 'bigint' &&
							((s = String(t)),
							(t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) &&
								(s = Ae(s)),
							(s += 'n')),
					(n += ` It must be ${e}. Received ${s}`),
					n
				)
			},
			RangeError
		)
	function Ae(i) {
		let e = '',
			t = i.length,
			n = i[0] === '-' ? 1 : 0
		for (; t >= n + 4; t -= 3) e = `_${i.slice(t - 3, t)}${e}`
		return `${i.slice(0, t)}${e}`
	}
	function Fe(i, e, t) {
		re(e, 'offset'), (i[e] === void 0 || i[e + t] === void 0) && oe(e, i.length - (t + 1))
	}
	function Te(i, e, t, n, s, l) {
		if (i > t || i < e) {
			let f = typeof e == 'bigint' ? 'n' : '',
				A
			throw (
				(l > 3
					? e === 0 || e === BigInt(0)
						? (A = `>= 0${f} and < 2${f} ** ${(l + 1) * 8}${f}`)
						: (A = `>= -(2${f} ** ${(l + 1) * 8 - 1}${f}) and < 2 ** ${
								(l + 1) * 8 - 1
							}${f}`)
					: (A = `>= ${e}${f} and <= ${t}${f}`),
				new te.ERR_OUT_OF_RANGE('value', A, i))
			)
		}
		Fe(n, s, l)
	}
	function re(i, e) {
		if (typeof i != 'number') throw new te.ERR_INVALID_ARG_TYPE(e, 'number', i)
	}
	function oe(i, e, t) {
		throw Math.floor(i) !== i
			? (re(i, t), new te.ERR_OUT_OF_RANGE(t || 'offset', 'an integer', i))
			: e < 0
				? new te.ERR_BUFFER_OUT_OF_BOUNDS()
				: new te.ERR_OUT_OF_RANGE(t || 'offset', `>= ${t ? 1 : 0} and <= ${e}`, i)
	}
	let ve = /[^+/0-9A-Za-z-_]/g
	function Je(i) {
		if (((i = i.split('=')[0]), (i = i.trim().replace(ve, '')), i.length < 2)) return ''
		for (; i.length % 4 !== 0; ) i = i + '='
		return i
	}
	function ge(i, e) {
		e = e || 1 / 0
		let t,
			n = i.length,
			s = null,
			l = []
		for (let f = 0; f < n; ++f) {
			if (((t = i.charCodeAt(f)), t > 55295 && t < 57344)) {
				if (!s) {
					if (t > 56319) {
						;(e -= 3) > -1 && l.push(239, 191, 189)
						continue
					} else if (f + 1 === n) {
						;(e -= 3) > -1 && l.push(239, 191, 189)
						continue
					}
					s = t
					continue
				}
				if (t < 56320) {
					;(e -= 3) > -1 && l.push(239, 191, 189), (s = t)
					continue
				}
				t = (((s - 55296) << 10) | (t - 56320)) + 65536
			} else s && (e -= 3) > -1 && l.push(239, 191, 189)
			if (((s = null), t < 128)) {
				if ((e -= 1) < 0) break
				l.push(t)
			} else if (t < 2048) {
				if ((e -= 2) < 0) break
				l.push((t >> 6) | 192, (t & 63) | 128)
			} else if (t < 65536) {
				if ((e -= 3) < 0) break
				l.push((t >> 12) | 224, ((t >> 6) & 63) | 128, (t & 63) | 128)
			} else if (t < 1114112) {
				if ((e -= 4) < 0) break
				l.push(
					(t >> 18) | 240,
					((t >> 12) & 63) | 128,
					((t >> 6) & 63) | 128,
					(t & 63) | 128
				)
			} else throw new Error('Invalid code point')
		}
		return l
	}
	function je(i) {
		let e = []
		for (let t = 0; t < i.length; ++t) e.push(i.charCodeAt(t) & 255)
		return e
	}
	function He(i, e) {
		let t,
			n,
			s,
			l = []
		for (let f = 0; f < i.length && !((e -= 2) < 0); ++f)
			(t = i.charCodeAt(f)), (n = t >> 8), (s = t % 256), l.push(s), l.push(n)
		return l
	}
	function Ce(i) {
		return c.toByteArray(Je(i))
	}
	function ue(i, e, t, n) {
		let s
		for (s = 0; s < n && !(s + t >= e.length || s >= i.length); ++s) e[s + t] = i[s]
		return s
	}
	function H(i, e) {
		return (
			i instanceof e ||
			(i != null &&
				i.constructor != null &&
				i.constructor.name != null &&
				i.constructor.name === e.name)
		)
	}
	function ye(i) {
		return i !== i
	}
	let ze = (function () {
		let i = '0123456789abcdef',
			e = new Array(256)
		for (let t = 0; t < 16; ++t) {
			let n = t * 16
			for (let s = 0; s < 16; ++s) e[n + s] = i[t] + i[s]
		}
		return e
	})()
	function G(i) {
		return typeof BigInt > 'u' ? Qe : i
	}
	function Qe() {
		throw new Error('BigInt not supported')
	}
	return X
}
var Z = We()
Z.Buffer
Z.SlowBuffer
Z.INSPECT_MAX_BYTES
Z.kMaxLength
var g = Z.Buffer,
	ct = Z.INSPECT_MAX_BYTES,
	ht = Z.kMaxLength
var C = class c extends Error {
	constructor(r, d, u, ...a) {
		Array.isArray(d) && (d = d.join(' ').trim()),
			super(d),
			Error.captureStackTrace !== void 0 && Error.captureStackTrace(this, c),
			(this.code = r)
		for (let h of a)
			for (let o in h) {
				let p = h[o]
				this[o] = g.isBuffer(p)
					? p.toString(u.encoding)
					: p == null
						? p
						: JSON.parse(JSON.stringify(p))
			}
	}
}
var De = function (c) {
	return typeof c == 'object' && c !== null && !Array.isArray(c)
}
var ae = function (c) {
	let r = []
	for (let d = 0, u = c.length; d < u; d++) {
		let a = c[d]
		if (a == null || a === !1) r[d] = { disabled: !0 }
		else if (typeof a == 'string') r[d] = { name: a }
		else if (De(a)) {
			if (typeof a.name != 'string')
				throw new C('CSV_OPTION_COLUMNS_MISSING_NAME', [
					'Option columns missing name:',
					`property "name" is required at position ${d}`,
					'when column is an object literal'
				])
			r[d] = a
		} else
			throw new C('CSV_INVALID_COLUMN_DEFINITION', [
				'Invalid column definition:',
				'expect a string or a literal object,',
				`got ${JSON.stringify(a)} at position ${d}`
			])
	}
	return r
}
var we = class {
		constructor(r = 100) {
			;(this.size = r), (this.length = 0), (this.buf = g.allocUnsafe(r))
		}
		prepend(r) {
			if (g.isBuffer(r)) {
				let d = this.length + r.length
				if (d >= this.size && (this.resize(), d >= this.size))
					throw Error('INVALID_BUFFER_STATE')
				let u = this.buf
				;(this.buf = g.allocUnsafe(this.size)),
					r.copy(this.buf, 0),
					u.copy(this.buf, r.length),
					(this.length += r.length)
			} else {
				let d = this.length++
				d === this.size && this.resize()
				let u = this.clone()
				;(this.buf[0] = r), u.copy(this.buf, 1, 0, d)
			}
		}
		append(r) {
			let d = this.length++
			d === this.size && this.resize(), (this.buf[d] = r)
		}
		clone() {
			return g.from(this.buf.slice(0, this.length))
		}
		resize() {
			let r = this.length
			this.size = this.size * 2
			let d = g.allocUnsafe(this.size)
			this.buf.copy(d, 0, 0, r), (this.buf = d)
		}
		toString(r) {
			return r
				? this.buf.slice(0, this.length).toString(r)
				: Uint8Array.prototype.slice.call(this.buf.slice(0, this.length))
		}
		toJSON() {
			return this.toString('utf8')
		}
		reset() {
			this.length = 0
		}
	},
	Ie = we
var Xe = 12,
	Ze = 13,
	Ke = 10,
	et = 32,
	tt = 9,
	$e = function (c) {
		return {
			bomSkipped: !1,
			bufBytesStart: 0,
			castField: c.cast_function,
			commenting: !1,
			error: void 0,
			enabled: c.from_line === 1,
			escaping: !1,
			escapeIsQuote:
				g.isBuffer(c.escape) && g.isBuffer(c.quote) && g.compare(c.escape, c.quote) === 0,
			expectedRecordLength: Array.isArray(c.columns) ? c.columns.length : void 0,
			field: new Ie(20),
			firstLineToHeaders: c.cast_first_line_to_header,
			needMoreDataSize: Math.max(
				c.comment !== null ? c.comment.length : 0,
				...c.delimiter.map((r) => r.length),
				c.quote !== null ? c.quote.length : 0
			),
			previousBuf: void 0,
			quoting: !1,
			stop: !1,
			rawBuffer: new Ie(100),
			record: [],
			recordHasError: !1,
			record_length: 0,
			recordDelimiterMaxLength:
				c.record_delimiter.length === 0
					? 0
					: Math.max(...c.record_delimiter.map((r) => r.length)),
			trimChars: [g.from(' ', c.encoding)[0], g.from('	', c.encoding)[0]],
			wasQuoting: !1,
			wasRowDelimiter: !1,
			timchars: [
				g.from(g.from([Ze], 'utf8').toString(), c.encoding),
				g.from(g.from([Ke], 'utf8').toString(), c.encoding),
				g.from(g.from([Xe], 'utf8').toString(), c.encoding),
				g.from(g.from([et], 'utf8').toString(), c.encoding),
				g.from(g.from([tt], 'utf8').toString(), c.encoding)
			]
		}
	}
var Me = function (c) {
	return c.replace(/([A-Z])/g, function (r, d) {
		return '_' + d.toLowerCase()
	})
}
var be = function (c) {
	let r = {}
	for (let u in c) r[Me(u)] = c[u]
	if (r.encoding === void 0 || r.encoding === !0) r.encoding = 'utf8'
	else if (r.encoding === null || r.encoding === !1) r.encoding = null
	else if (typeof r.encoding != 'string' && r.encoding !== null)
		throw new C(
			'CSV_INVALID_OPTION_ENCODING',
			[
				'Invalid option encoding:',
				'encoding must be a string or null to return a buffer,',
				`got ${JSON.stringify(r.encoding)}`
			],
			r
		)
	if (r.bom === void 0 || r.bom === null || r.bom === !1) r.bom = !1
	else if (r.bom !== !0)
		throw new C(
			'CSV_INVALID_OPTION_BOM',
			['Invalid option bom:', 'bom must be true,', `got ${JSON.stringify(r.bom)}`],
			r
		)
	if (
		((r.cast_function = null),
		r.cast === void 0 || r.cast === null || r.cast === !1 || r.cast === '')
	)
		r.cast = void 0
	else if (typeof r.cast == 'function') (r.cast_function = r.cast), (r.cast = !0)
	else if (r.cast !== !0)
		throw new C(
			'CSV_INVALID_OPTION_CAST',
			[
				'Invalid option cast:',
				'cast must be true or a function,',
				`got ${JSON.stringify(r.cast)}`
			],
			r
		)
	if (r.cast_date === void 0 || r.cast_date === null || r.cast_date === !1 || r.cast_date === '')
		r.cast_date = !1
	else if (r.cast_date === !0)
		r.cast_date = function (u) {
			let a = Date.parse(u)
			return isNaN(a) ? u : new Date(a)
		}
	else if (typeof r.cast_date != 'function')
		throw new C(
			'CSV_INVALID_OPTION_CAST_DATE',
			[
				'Invalid option cast_date:',
				'cast_date must be true or a function,',
				`got ${JSON.stringify(r.cast_date)}`
			],
			r
		)
	if (((r.cast_first_line_to_header = null), r.columns === !0))
		r.cast_first_line_to_header = void 0
	else if (typeof r.columns == 'function')
		(r.cast_first_line_to_header = r.columns), (r.columns = !0)
	else if (Array.isArray(r.columns)) r.columns = ae(r.columns)
	else if (r.columns === void 0 || r.columns === null || r.columns === !1) r.columns = !1
	else
		throw new C(
			'CSV_INVALID_OPTION_COLUMNS',
			[
				'Invalid option columns:',
				'expect an array, a function or true,',
				`got ${JSON.stringify(r.columns)}`
			],
			r
		)
	if (
		r.group_columns_by_name === void 0 ||
		r.group_columns_by_name === null ||
		r.group_columns_by_name === !1
	)
		r.group_columns_by_name = !1
	else {
		if (r.group_columns_by_name !== !0)
			throw new C(
				'CSV_INVALID_OPTION_GROUP_COLUMNS_BY_NAME',
				[
					'Invalid option group_columns_by_name:',
					'expect an boolean,',
					`got ${JSON.stringify(r.group_columns_by_name)}`
				],
				r
			)
		if (r.columns === !1)
			throw new C(
				'CSV_INVALID_OPTION_GROUP_COLUMNS_BY_NAME',
				['Invalid option group_columns_by_name:', 'the `columns` mode must be activated.'],
				r
			)
	}
	if (r.comment === void 0 || r.comment === null || r.comment === !1 || r.comment === '')
		r.comment = null
	else if (
		(typeof r.comment == 'string' && (r.comment = g.from(r.comment, r.encoding)),
		!g.isBuffer(r.comment))
	)
		throw new C(
			'CSV_INVALID_OPTION_COMMENT',
			[
				'Invalid option comment:',
				'comment must be a buffer or a string,',
				`got ${JSON.stringify(r.comment)}`
			],
			r
		)
	if (r.comment_no_infix === void 0 || r.comment_no_infix === null || r.comment_no_infix === !1)
		r.comment_no_infix = !1
	else if (r.comment_no_infix !== !0)
		throw new C(
			'CSV_INVALID_OPTION_COMMENT',
			[
				'Invalid option comment_no_infix:',
				'value must be a boolean,',
				`got ${JSON.stringify(r.comment_no_infix)}`
			],
			r
		)
	let d = JSON.stringify(r.delimiter)
	if ((Array.isArray(r.delimiter) || (r.delimiter = [r.delimiter]), r.delimiter.length === 0))
		throw new C(
			'CSV_INVALID_OPTION_DELIMITER',
			[
				'Invalid option delimiter:',
				'delimiter must be a non empty string or buffer or array of string|buffer,',
				`got ${d}`
			],
			r
		)
	if (
		((r.delimiter = r.delimiter.map(function (u) {
			if (u == null || u === !1) return g.from(',', r.encoding)
			if (
				(typeof u == 'string' && (u = g.from(u, r.encoding)),
				!g.isBuffer(u) || u.length === 0)
			)
				throw new C(
					'CSV_INVALID_OPTION_DELIMITER',
					[
						'Invalid option delimiter:',
						'delimiter must be a non empty string or buffer or array of string|buffer,',
						`got ${d}`
					],
					r
				)
			return u
		})),
		r.escape === void 0 || r.escape === !0
			? (r.escape = g.from('"', r.encoding))
			: typeof r.escape == 'string'
				? (r.escape = g.from(r.escape, r.encoding))
				: (r.escape === null || r.escape === !1) && (r.escape = null),
		r.escape !== null && !g.isBuffer(r.escape))
	)
		throw new Error(
			`Invalid Option: escape must be a buffer, a string or a boolean, got ${JSON.stringify(
				r.escape
			)}`
		)
	if (r.from === void 0 || r.from === null) r.from = 1
	else if (
		(typeof r.from == 'string' && /\d+/.test(r.from) && (r.from = parseInt(r.from)),
		Number.isInteger(r.from))
	) {
		if (r.from < 0)
			throw new Error(
				`Invalid Option: from must be a positive integer, got ${JSON.stringify(c.from)}`
			)
	} else throw new Error(`Invalid Option: from must be an integer, got ${JSON.stringify(r.from)}`)
	if (r.from_line === void 0 || r.from_line === null) r.from_line = 1
	else if (
		(typeof r.from_line == 'string' &&
			/\d+/.test(r.from_line) &&
			(r.from_line = parseInt(r.from_line)),
		Number.isInteger(r.from_line))
	) {
		if (r.from_line <= 0)
			throw new Error(
				`Invalid Option: from_line must be a positive integer greater than 0, got ${JSON.stringify(
					c.from_line
				)}`
			)
	} else
		throw new Error(
			`Invalid Option: from_line must be an integer, got ${JSON.stringify(c.from_line)}`
		)
	if (r.ignore_last_delimiters === void 0 || r.ignore_last_delimiters === null)
		r.ignore_last_delimiters = !1
	else if (typeof r.ignore_last_delimiters == 'number')
		(r.ignore_last_delimiters = Math.floor(r.ignore_last_delimiters)),
			r.ignore_last_delimiters === 0 && (r.ignore_last_delimiters = !1)
	else if (typeof r.ignore_last_delimiters != 'boolean')
		throw new C(
			'CSV_INVALID_OPTION_IGNORE_LAST_DELIMITERS',
			[
				'Invalid option `ignore_last_delimiters`:',
				'the value must be a boolean value or an integer,',
				`got ${JSON.stringify(r.ignore_last_delimiters)}`
			],
			r
		)
	if (r.ignore_last_delimiters === !0 && r.columns === !1)
		throw new C(
			'CSV_IGNORE_LAST_DELIMITERS_REQUIRES_COLUMNS',
			[
				'The option `ignore_last_delimiters`',
				'requires the activation of the `columns` option'
			],
			r
		)
	if (r.info === void 0 || r.info === null || r.info === !1) r.info = !1
	else if (r.info !== !0)
		throw new Error(`Invalid Option: info must be true, got ${JSON.stringify(r.info)}`)
	if (r.max_record_size === void 0 || r.max_record_size === null || r.max_record_size === !1)
		r.max_record_size = 0
	else if (!(Number.isInteger(r.max_record_size) && r.max_record_size >= 0))
		if (typeof r.max_record_size == 'string' && /\d+/.test(r.max_record_size))
			r.max_record_size = parseInt(r.max_record_size)
		else
			throw new Error(
				`Invalid Option: max_record_size must be a positive integer, got ${JSON.stringify(
					r.max_record_size
				)}`
			)
	if (r.objname === void 0 || r.objname === null || r.objname === !1) r.objname = void 0
	else if (g.isBuffer(r.objname)) {
		if (r.objname.length === 0)
			throw new Error('Invalid Option: objname must be a non empty buffer')
		r.encoding === null || (r.objname = r.objname.toString(r.encoding))
	} else if (typeof r.objname == 'string') {
		if (r.objname.length === 0)
			throw new Error('Invalid Option: objname must be a non empty string')
	} else if (typeof r.objname != 'number')
		throw new Error(`Invalid Option: objname must be a string or a buffer, got ${r.objname}`)
	if (r.objname !== void 0) {
		if (typeof r.objname == 'number') {
			if (r.columns !== !1)
				throw Error(
					'Invalid Option: objname index cannot be combined with columns or be defined as a field'
				)
		} else if (r.columns === !1)
			throw Error(
				'Invalid Option: objname field must be combined with columns or be defined as an index'
			)
	}
	if (r.on_record === void 0 || r.on_record === null) r.on_record = void 0
	else if (typeof r.on_record != 'function')
		throw new C(
			'CSV_INVALID_OPTION_ON_RECORD',
			[
				'Invalid option `on_record`:',
				'expect a function,',
				`got ${JSON.stringify(r.on_record)}`
			],
			r
		)
	if (r.quote === null || r.quote === !1 || r.quote === '') r.quote = null
	else if (
		(r.quote === void 0 || r.quote === !0
			? (r.quote = g.from('"', r.encoding))
			: typeof r.quote == 'string' && (r.quote = g.from(r.quote, r.encoding)),
		!g.isBuffer(r.quote))
	)
		throw new Error(
			`Invalid Option: quote must be a buffer or a string, got ${JSON.stringify(r.quote)}`
		)
	if (r.raw === void 0 || r.raw === null || r.raw === !1) r.raw = !1
	else if (r.raw !== !0)
		throw new Error(`Invalid Option: raw must be true, got ${JSON.stringify(r.raw)}`)
	if (r.record_delimiter === void 0) r.record_delimiter = []
	else if (typeof r.record_delimiter == 'string' || g.isBuffer(r.record_delimiter)) {
		if (r.record_delimiter.length === 0)
			throw new C(
				'CSV_INVALID_OPTION_RECORD_DELIMITER',
				[
					'Invalid option `record_delimiter`:',
					'value must be a non empty string or buffer,',
					`got ${JSON.stringify(r.record_delimiter)}`
				],
				r
			)
		r.record_delimiter = [r.record_delimiter]
	} else if (!Array.isArray(r.record_delimiter))
		throw new C(
			'CSV_INVALID_OPTION_RECORD_DELIMITER',
			[
				'Invalid option `record_delimiter`:',
				'value must be a string, a buffer or array of string|buffer,',
				`got ${JSON.stringify(r.record_delimiter)}`
			],
			r
		)
	if (
		((r.record_delimiter = r.record_delimiter.map(function (u, a) {
			if (typeof u != 'string' && !g.isBuffer(u))
				throw new C(
					'CSV_INVALID_OPTION_RECORD_DELIMITER',
					[
						'Invalid option `record_delimiter`:',
						'value must be a string, a buffer or array of string|buffer',
						`at index ${a},`,
						`got ${JSON.stringify(u)}`
					],
					r
				)
			if (u.length === 0)
				throw new C(
					'CSV_INVALID_OPTION_RECORD_DELIMITER',
					[
						'Invalid option `record_delimiter`:',
						'value must be a non empty string or buffer',
						`at index ${a},`,
						`got ${JSON.stringify(u)}`
					],
					r
				)
			return typeof u == 'string' && (u = g.from(u, r.encoding)), u
		})),
		typeof r.relax_column_count != 'boolean')
	)
		if (r.relax_column_count === void 0 || r.relax_column_count === null)
			r.relax_column_count = !1
		else
			throw new Error(
				`Invalid Option: relax_column_count must be a boolean, got ${JSON.stringify(
					r.relax_column_count
				)}`
			)
	if (typeof r.relax_column_count_less != 'boolean')
		if (r.relax_column_count_less === void 0 || r.relax_column_count_less === null)
			r.relax_column_count_less = !1
		else
			throw new Error(
				`Invalid Option: relax_column_count_less must be a boolean, got ${JSON.stringify(
					r.relax_column_count_less
				)}`
			)
	if (typeof r.relax_column_count_more != 'boolean')
		if (r.relax_column_count_more === void 0 || r.relax_column_count_more === null)
			r.relax_column_count_more = !1
		else
			throw new Error(
				`Invalid Option: relax_column_count_more must be a boolean, got ${JSON.stringify(
					r.relax_column_count_more
				)}`
			)
	if (typeof r.relax_quotes != 'boolean')
		if (r.relax_quotes === void 0 || r.relax_quotes === null) r.relax_quotes = !1
		else
			throw new Error(
				`Invalid Option: relax_quotes must be a boolean, got ${JSON.stringify(
					r.relax_quotes
				)}`
			)
	if (typeof r.skip_empty_lines != 'boolean')
		if (r.skip_empty_lines === void 0 || r.skip_empty_lines === null) r.skip_empty_lines = !1
		else
			throw new Error(
				`Invalid Option: skip_empty_lines must be a boolean, got ${JSON.stringify(
					r.skip_empty_lines
				)}`
			)
	if (typeof r.skip_records_with_empty_values != 'boolean')
		if (
			r.skip_records_with_empty_values === void 0 ||
			r.skip_records_with_empty_values === null
		)
			r.skip_records_with_empty_values = !1
		else
			throw new Error(
				`Invalid Option: skip_records_with_empty_values must be a boolean, got ${JSON.stringify(
					r.skip_records_with_empty_values
				)}`
			)
	if (typeof r.skip_records_with_error != 'boolean')
		if (r.skip_records_with_error === void 0 || r.skip_records_with_error === null)
			r.skip_records_with_error = !1
		else
			throw new Error(
				`Invalid Option: skip_records_with_error must be a boolean, got ${JSON.stringify(
					r.skip_records_with_error
				)}`
			)
	if (r.rtrim === void 0 || r.rtrim === null || r.rtrim === !1) r.rtrim = !1
	else if (r.rtrim !== !0)
		throw new Error(`Invalid Option: rtrim must be a boolean, got ${JSON.stringify(r.rtrim)}`)
	if (r.ltrim === void 0 || r.ltrim === null || r.ltrim === !1) r.ltrim = !1
	else if (r.ltrim !== !0)
		throw new Error(`Invalid Option: ltrim must be a boolean, got ${JSON.stringify(r.ltrim)}`)
	if (r.trim === void 0 || r.trim === null || r.trim === !1) r.trim = !1
	else if (r.trim !== !0)
		throw new Error(`Invalid Option: trim must be a boolean, got ${JSON.stringify(r.trim)}`)
	if (
		(r.trim === !0 && c.ltrim !== !1 ? (r.ltrim = !0) : r.ltrim !== !0 && (r.ltrim = !1),
		r.trim === !0 && c.rtrim !== !1 ? (r.rtrim = !0) : r.rtrim !== !0 && (r.rtrim = !1),
		r.to === void 0 || r.to === null)
	)
		r.to = -1
	else if (
		(typeof r.to == 'string' && /\d+/.test(r.to) && (r.to = parseInt(r.to)),
		Number.isInteger(r.to))
	) {
		if (r.to <= 0)
			throw new Error(
				`Invalid Option: to must be a positive integer greater than 0, got ${JSON.stringify(
					c.to
				)}`
			)
	} else throw new Error(`Invalid Option: to must be an integer, got ${JSON.stringify(c.to)}`)
	if (r.to_line === void 0 || r.to_line === null) r.to_line = -1
	else if (
		(typeof r.to_line == 'string' && /\d+/.test(r.to_line) && (r.to_line = parseInt(r.to_line)),
		Number.isInteger(r.to_line))
	) {
		if (r.to_line <= 0)
			throw new Error(
				`Invalid Option: to_line must be a positive integer greater than 0, got ${JSON.stringify(
					c.to_line
				)}`
			)
	} else
		throw new Error(
			`Invalid Option: to_line must be an integer, got ${JSON.stringify(c.to_line)}`
		)
	return r
}
var ke = function (c) {
		return c.every((r) => r == null || (r.toString && r.toString().trim() === ''))
	},
	rt = 13,
	it = 10,
	ie = { utf8: g.from([239, 187, 191]), utf16le: g.from([255, 254]) },
	Pe = function (c = {}) {
		let r = {
				bytes: 0,
				comment_lines: 0,
				empty_lines: 0,
				invalid_field_length: 0,
				lines: 1,
				records: 0
			},
			d = be(c)
		return {
			info: r,
			original_options: c,
			options: d,
			state: $e(d),
			__needMoreData: function (u, a, h) {
				if (h) return !1
				let { encoding: o, escape: p, quote: y } = this.options,
					{ quoting: w, needMoreDataSize: I, recordDelimiterMaxLength: _ } = this.state,
					N = a - u - 1,
					m = Math.max(
						I,
						_ === 0
							? g.from(
									`\r
`,
									o
								).length
							: _,
						w ? (p === null ? 0 : p.length) + y.length : 0,
						w ? y.length + _ : 0
					)
				return N < m
			},
			parse: function (u, a, h, o) {
				let {
						bom: p,
						comment_no_infix: y,
						encoding: w,
						from_line: I,
						ltrim: _,
						max_record_size: N,
						raw: m,
						relax_quotes: E,
						rtrim: b,
						skip_empty_lines: B,
						to: T,
						to_line: S
					} = this.options,
					{ comment: O, escape: U, quote: L, record_delimiter: K } = this.options,
					{
						bomSkipped: he,
						previousBuf: ee,
						rawBuffer: de,
						escapeIsQuote: pe
					} = this.state,
					R
				if (ee === void 0)
					if (u === void 0) {
						o()
						return
					} else R = u
				else ee !== void 0 && u === void 0 ? (R = ee) : (R = g.concat([ee, u]))
				if (he === !1)
					if (p === !1) this.state.bomSkipped = !0
					else if (R.length < 3) {
						if (a === !1) {
							this.state.previousBuf = R
							return
						}
					} else {
						for (let k in ie)
							if (ie[k].compare(R, 0, ie[k].length) === 0) {
								let j = ie[k].length
								;(this.state.bufBytesStart += j),
									(R = R.slice(j)),
									(this.options = be({ ...this.original_options, encoding: k })),
									({ comment: O, escape: U, quote: L } = this.options)
								break
							}
						this.state.bomSkipped = !0
					}
				let ne = R.length,
					x
				for (x = 0; x < ne && !this.__needMoreData(x, ne, a); x++) {
					if (
						(this.state.wasRowDelimiter === !0 &&
							(this.info.lines++, (this.state.wasRowDelimiter = !1)),
						S !== -1 && this.info.lines > S)
					) {
						;(this.state.stop = !0), o()
						return
					}
					this.state.quoting === !1 &&
						K.length === 0 &&
						this.__autoDiscoverRecordDelimiter(R, x) &&
						(K = this.options.record_delimiter)
					let k = R[x]
					if (
						(m === !0 && de.append(k),
						(k === rt || k === it) &&
							this.state.wasRowDelimiter === !1 &&
							(this.state.wasRowDelimiter = !0),
						this.state.escaping === !0)
					)
						this.state.escaping = !1
					else {
						if (
							U !== null &&
							this.state.quoting === !0 &&
							this.__isEscape(R, x, k) &&
							x + U.length < ne
						)
							if (pe) {
								if (this.__isQuote(R, x + U.length)) {
									;(this.state.escaping = !0), (x += U.length - 1)
									continue
								}
							} else {
								;(this.state.escaping = !0), (x += U.length - 1)
								continue
							}
						if (this.state.commenting === !1 && this.__isQuote(R, x))
							if (this.state.quoting === !0) {
								let F = R[x + L.length],
									W = b && this.__isCharTrimable(R, x + L.length),
									z = O !== null && this.__compareBytes(O, R, x + L.length, F),
									D = this.__isDelimiter(R, x + L.length, F),
									V =
										K.length === 0
											? this.__autoDiscoverRecordDelimiter(R, x + L.length)
											: this.__isRecordDelimiter(F, R, x + L.length)
								if (
									U !== null &&
									this.__isEscape(R, x, k) &&
									this.__isQuote(R, x + U.length)
								)
									x += U.length - 1
								else if (!F || D || V || z || W) {
									;(this.state.quoting = !1),
										(this.state.wasQuoting = !0),
										(x += L.length - 1)
									continue
								} else if (E === !1) {
									let Q = this.__error(
										new C(
											'CSV_INVALID_CLOSING_QUOTE',
											[
												'Invalid Closing Quote:',
												`got "${String.fromCharCode(F)}"`,
												`at line ${this.info.lines}`,
												'instead of delimiter, record delimiter, trimable character',
												'(if activated) or comment'
											],
											this.options,
											this.__infoField()
										)
									)
									if (Q !== void 0) return Q
								} else
									(this.state.quoting = !1),
										(this.state.wasQuoting = !0),
										this.state.field.prepend(L),
										(x += L.length - 1)
							} else if (this.state.field.length !== 0) {
								if (E === !1) {
									let F = this.__infoField(),
										W = Object.keys(ie)
											.map((D) =>
												ie[D].equals(this.state.field.toString()) ? D : !1
											)
											.filter(Boolean)[0],
										z = this.__error(
											new C(
												'INVALID_OPENING_QUOTE',
												[
													'Invalid Opening Quote:',
													`a quote is found on field ${JSON.stringify(
														F.column
													)} at line ${
														F.lines
													}, value is ${JSON.stringify(
														this.state.field.toString(w)
													)}`,
													W ? `(${W} bom)` : void 0
												],
												this.options,
												F,
												{ field: this.state.field }
											)
										)
									if (z !== void 0) return z
								}
							} else {
								;(this.state.quoting = !0), (x += L.length - 1)
								continue
							}
						if (this.state.quoting === !1) {
							let F = this.__isRecordDelimiter(k, R, x)
							if (F !== 0) {
								if (
									this.state.commenting &&
									this.state.wasQuoting === !1 &&
									this.state.record.length === 0 &&
									this.state.field.length === 0
								)
									this.info.comment_lines++
								else {
									if (
										this.state.enabled === !1 &&
										this.info.lines +
											(this.state.wasRowDelimiter === !0 ? 1 : 0) >=
											I
									) {
										;(this.state.enabled = !0),
											this.__resetField(),
											this.__resetRecord(),
											(x += F - 1)
										continue
									}
									if (
										B === !0 &&
										this.state.wasQuoting === !1 &&
										this.state.record.length === 0 &&
										this.state.field.length === 0
									) {
										this.info.empty_lines++, (x += F - 1)
										continue
									}
									this.info.bytes = this.state.bufBytesStart + x
									let V = this.__onField()
									if (V !== void 0) return V
									this.info.bytes = this.state.bufBytesStart + x + F
									let Q = this.__onRecord(h)
									if (Q !== void 0) return Q
									if (T !== -1 && this.info.records >= T) {
										;(this.state.stop = !0), o()
										return
									}
								}
								;(this.state.commenting = !1), (x += F - 1)
								continue
							}
							if (this.state.commenting) continue
							if (
								(O === null ? 0 : this.__compareBytes(O, R, x, k)) !== 0 &&
								(y === !1 || this.state.field.length === 0)
							) {
								this.state.commenting = !0
								continue
							}
							let z = this.__isDelimiter(R, x, k)
							if (z !== 0) {
								this.info.bytes = this.state.bufBytesStart + x
								let D = this.__onField()
								if (D !== void 0) return D
								x += z - 1
								continue
							}
						}
					}
					if (
						this.state.commenting === !1 &&
						N !== 0 &&
						this.state.record_length + this.state.field.length > N
					)
						return this.__error(
							new C(
								'CSV_MAX_RECORD_SIZE',
								[
									'Max Record Size:',
									'record exceed the maximum number of tolerated bytes',
									`of ${N}`,
									`at line ${this.info.lines}`
								],
								this.options,
								this.__infoField()
							)
						)
					let j =
							_ === !1 ||
							this.state.quoting === !0 ||
							this.state.field.length !== 0 ||
							!this.__isCharTrimable(R, x),
						me = b === !1 || this.state.wasQuoting === !1
					if (j === !0 && me === !0) this.state.field.append(k)
					else {
						if (b === !0 && !this.__isCharTrimable(R, x))
							return this.__error(
								new C(
									'CSV_NON_TRIMABLE_CHAR_AFTER_CLOSING_QUOTE',
									[
										'Invalid Closing Quote:',
										'found non trimable byte after quote',
										`at line ${this.info.lines}`
									],
									this.options,
									this.__infoField()
								)
							)
						j === !1 && (x += this.__isCharTrimable(R, x) - 1)
						continue
					}
				}
				if (a === !0)
					if (this.state.quoting === !0) {
						let k = this.__error(
							new C(
								'CSV_QUOTE_NOT_CLOSED',
								[
									'Quote Not Closed:',
									`the parsing is finished with an opening quote at line ${this.info.lines}`
								],
								this.options,
								this.__infoField()
							)
						)
						if (k !== void 0) return k
					} else if (
						this.state.wasQuoting === !0 ||
						this.state.record.length !== 0 ||
						this.state.field.length !== 0
					) {
						this.info.bytes = this.state.bufBytesStart + x
						let k = this.__onField()
						if (k !== void 0) return k
						let j = this.__onRecord(h)
						if (j !== void 0) return j
					} else
						this.state.wasRowDelimiter === !0
							? this.info.empty_lines++
							: this.state.commenting === !0 && this.info.comment_lines++
				else (this.state.bufBytesStart += x), (this.state.previousBuf = R.slice(x))
				this.state.wasRowDelimiter === !0 &&
					(this.info.lines++, (this.state.wasRowDelimiter = !1))
			},
			__onRecord: function (u) {
				let {
						columns: a,
						group_columns_by_name: h,
						encoding: o,
						info: p,
						from: y,
						relax_column_count: w,
						relax_column_count_less: I,
						relax_column_count_more: _,
						raw: N,
						skip_records_with_empty_values: m
					} = this.options,
					{ enabled: E, record: b } = this.state
				if (E === !1) return this.__resetRecord()
				let B = b.length
				if (a === !0) {
					if (m === !0 && ke(b)) {
						this.__resetRecord()
						return
					}
					return this.__firstLineToColumns(b)
				}
				if (
					(a === !1 && this.info.records === 0 && (this.state.expectedRecordLength = B),
					B !== this.state.expectedRecordLength)
				) {
					let T =
						a === !1
							? new C(
									'CSV_RECORD_INCONSISTENT_FIELDS_LENGTH',
									[
										'Invalid Record Length:',
										`expect ${this.state.expectedRecordLength},`,
										`got ${B} on line ${this.info.lines}`
									],
									this.options,
									this.__infoField(),
									{ record: b }
								)
							: new C(
									'CSV_RECORD_INCONSISTENT_COLUMNS',
									[
										'Invalid Record Length:',
										`columns length is ${a.length},`,
										`got ${B} on line ${this.info.lines}`
									],
									this.options,
									this.__infoField(),
									{ record: b }
								)
					if (
						w === !0 ||
						(I === !0 && B < this.state.expectedRecordLength) ||
						(_ === !0 && B > this.state.expectedRecordLength)
					)
						this.info.invalid_field_length++, (this.state.error = T)
					else {
						let S = this.__error(T)
						if (S) return S
					}
				}
				if (m === !0 && ke(b)) {
					this.__resetRecord()
					return
				}
				if (this.state.recordHasError === !0) {
					this.__resetRecord(), (this.state.recordHasError = !1)
					return
				}
				if ((this.info.records++, y === 1 || this.info.records >= y)) {
					let { objname: T } = this.options
					if (a !== !1) {
						let S = {}
						for (let O = 0, U = b.length; O < U; O++)
							a[O] === void 0 ||
								a[O].disabled ||
								(h === !0 && S[a[O].name] !== void 0
									? Array.isArray(S[a[O].name])
										? (S[a[O].name] = S[a[O].name].concat(b[O]))
										: (S[a[O].name] = [S[a[O].name], b[O]])
									: (S[a[O].name] = b[O]))
						if (N === !0 || p === !0) {
							let O = Object.assign(
									{ record: S },
									N === !0 ? { raw: this.state.rawBuffer.toString(o) } : {},
									p === !0 ? { info: this.__infoRecord() } : {}
								),
								U = this.__push(T === void 0 ? O : [S[T], O], u)
							if (U) return U
						} else {
							let O = this.__push(T === void 0 ? S : [S[T], S], u)
							if (O) return O
						}
					} else if (N === !0 || p === !0) {
						let S = Object.assign(
								{ record: b },
								N === !0 ? { raw: this.state.rawBuffer.toString(o) } : {},
								p === !0 ? { info: this.__infoRecord() } : {}
							),
							O = this.__push(T === void 0 ? S : [b[T], S], u)
						if (O) return O
					} else {
						let S = this.__push(T === void 0 ? b : [b[T], b], u)
						if (S) return S
					}
				}
				this.__resetRecord()
			},
			__firstLineToColumns: function (u) {
				let { firstLineToHeaders: a } = this.state
				try {
					let h = a === void 0 ? u : a.call(null, u)
					if (!Array.isArray(h))
						return this.__error(
							new C(
								'CSV_INVALID_COLUMN_MAPPING',
								[
									'Invalid Column Mapping:',
									'expect an array from column function,',
									`got ${JSON.stringify(h)}`
								],
								this.options,
								this.__infoField(),
								{ headers: h }
							)
						)
					let o = ae(h)
					;(this.state.expectedRecordLength = o.length),
						(this.options.columns = o),
						this.__resetRecord()
					return
				} catch (h) {
					return h
				}
			},
			__resetRecord: function () {
				this.options.raw === !0 && this.state.rawBuffer.reset(),
					(this.state.error = void 0),
					(this.state.record = []),
					(this.state.record_length = 0)
			},
			__onField: function () {
				let { cast: u, encoding: a, rtrim: h, max_record_size: o } = this.options,
					{ enabled: p, wasQuoting: y } = this.state
				if (p === !1) return this.__resetField()
				let w = this.state.field.toString(a)
				if ((h === !0 && y === !1 && (w = w.trimRight()), u === !0)) {
					let [I, _] = this.__cast(w)
					if (I !== void 0) return I
					w = _
				}
				this.state.record.push(w),
					o !== 0 && typeof w == 'string' && (this.state.record_length += w.length),
					this.__resetField()
			},
			__resetField: function () {
				this.state.field.reset(), (this.state.wasQuoting = !1)
			},
			__push: function (u, a) {
				let { on_record: h } = this.options
				if (h !== void 0) {
					let o = this.__infoRecord()
					try {
						u = h.call(null, u, o)
					} catch (p) {
						return p
					}
					if (u == null) return
				}
				a(u)
			},
			__cast: function (u) {
				let { columns: a, relax_column_count: h } = this.options
				if (
					Array.isArray(a) === !0 &&
					h &&
					this.options.columns.length <= this.state.record.length
				)
					return [void 0, void 0]
				if (this.state.castField !== null)
					try {
						let p = this.__infoField()
						return [void 0, this.state.castField.call(null, u, p)]
					} catch (p) {
						return [p]
					}
				if (this.__isFloat(u)) return [void 0, parseFloat(u)]
				if (this.options.cast_date !== !1) {
					let p = this.__infoField()
					return [void 0, this.options.cast_date.call(null, u, p)]
				}
				return [void 0, u]
			},
			__isCharTrimable: function (u, a) {
				return ((o, p) => {
					let { timchars: y } = this.state
					e: for (let w = 0; w < y.length; w++) {
						let I = y[w]
						for (let _ = 0; _ < I.length; _++) if (I[_] !== o[p + _]) continue e
						return I.length
					}
					return 0
				})(u, a)
			},
			__isFloat: function (u) {
				return u - parseFloat(u) + 1 >= 0
			},
			__compareBytes: function (u, a, h, o) {
				if (u[0] !== o) return 0
				let p = u.length
				for (let y = 1; y < p; y++) if (u[y] !== a[h + y]) return 0
				return p
			},
			__isDelimiter: function (u, a, h) {
				let { delimiter: o, ignore_last_delimiters: p } = this.options
				if (p === !0 && this.state.record.length === this.options.columns.length - 1)
					return 0
				if (p !== !1 && typeof p == 'number' && this.state.record.length === p - 1) return 0
				e: for (let y = 0; y < o.length; y++) {
					let w = o[y]
					if (w[0] === h) {
						for (let I = 1; I < w.length; I++) if (w[I] !== u[a + I]) continue e
						return w.length
					}
				}
				return 0
			},
			__isRecordDelimiter: function (u, a, h) {
				let { record_delimiter: o } = this.options,
					p = o.length
				e: for (let y = 0; y < p; y++) {
					let w = o[y],
						I = w.length
					if (w[0] === u) {
						for (let _ = 1; _ < I; _++) if (w[_] !== a[h + _]) continue e
						return w.length
					}
				}
				return 0
			},
			__isEscape: function (u, a, h) {
				let { escape: o } = this.options
				if (o === null) return !1
				let p = o.length
				if (o[0] === h) {
					for (let y = 0; y < p; y++) if (o[y] !== u[a + y]) return !1
					return !0
				}
				return !1
			},
			__isQuote: function (u, a) {
				let { quote: h } = this.options
				if (h === null) return !1
				let o = h.length
				for (let p = 0; p < o; p++) if (h[p] !== u[a + p]) return !1
				return !0
			},
			__autoDiscoverRecordDelimiter: function (u, a) {
				let { encoding: h } = this.options,
					o = [
						g.from(
							`\r
`,
							h
						),
						g.from(
							`
`,
							h
						),
						g.from('\r', h)
					]
				e: for (let p = 0; p < o.length; p++) {
					let y = o[p].length
					for (let w = 0; w < y; w++) if (o[p][w] !== u[a + w]) continue e
					return (
						this.options.record_delimiter.push(o[p]),
						(this.state.recordDelimiterMaxLength = o[p].length),
						o[p].length
					)
				}
				return 0
			},
			__error: function (u) {
				let { encoding: a, raw: h, skip_records_with_error: o } = this.options,
					p = typeof u == 'string' ? new Error(u) : u
				if (o) {
					;(this.state.recordHasError = !0),
						this.options.on_skip !== void 0 &&
							this.options.on_skip(p, h ? this.state.rawBuffer.toString(a) : void 0)
					return
				} else return p
			},
			__infoDataSet: function () {
				return { ...this.info, columns: this.options.columns }
			},
			__infoRecord: function () {
				let { columns: u, raw: a, encoding: h } = this.options
				return {
					...this.__infoDataSet(),
					error: this.state.error,
					header: u === !0,
					index: this.state.record.length,
					raw: a ? this.state.rawBuffer.toString(h) : void 0
				}
			},
			__infoField: function () {
				let { columns: u } = this.options,
					a = Array.isArray(u)
				return {
					...this.__infoRecord(),
					column:
						a === !0
							? u.length > this.state.record.length
								? u[this.state.record.length].name
								: null
							: this.state.record.length,
					quoting: this.state.wasQuoting
				}
			}
		}
	}
var fe = function (c, r = {}) {
	typeof c == 'string' && (c = g.from(c))
	let d = r && r.objname ? {} : [],
		u = Pe(r),
		a = (y) => {
			u.options.objname === void 0 ? d.push(y) : (d[y[0]] = y[1])
		},
		h = () => {},
		o = u.parse(c, !1, a, h)
	if (o !== void 0) throw o
	let p = u.parse(void 0, !0, a, h)
	if (p !== void 0) throw p
	return d
}
var Y = {
		uniqueHeaderProbalility: 1,
		headerTypesProbability: 5,
		headerFrequencyProbability: 5,
		dataTypesDifference: 5
	},
	Ee = (c) => {
		if (!c || c === '') return 'undefined'
		if (typeof c == 'number') return 'number'
		if (typeof c != 'string') return 'string'
		try {
			let r = c
				.trim()
				.replace(/\s/g, '')
				.replace(/,/g, '.')
				.replace(/^[−–—]/, '-')
				.replace(/[\u2012\u2013\u2014\u2015]/g, '-')
			return isNaN(Number(r)) ? 'string' : 'number'
		} catch {
			return 'string'
		}
	},
	nt = (c, r = ',') =>
		fe(c, {
			delimiter: r,
			skip_empty_lines: !0,
			columns: !1,
			comment: '#',
			relax_column_count: !0,
			skip_records_with_error: !0,
			trim: !0
		}),
	ot = (c) => {
		if (c.length === 0) return 0
		let r = c.flat(),
			d = new Set(r.filter(Boolean)),
			u = r.length
		return (d.size / u) * 100
	},
	st = (c) => {
		let r = c.filter((d) => d && d === 'string')
		return r.length === 0 ? 0 : (r.length / c.length) * 100
	},
	ut = (c, r) => {
		let d = c.map((h, o) => (h.filter((y) => y === r[o]).length / h.length) * 100)
		return 100 - (d.filter((h) => h > 0).length / d.length) * 100
	},
	lt = (c, r) => {
		let d = 0
		for (let u of c) r.length === u.length && r.join(',') !== u.join(',') && d++
		return (d / c.length) * 100
	},
	at = (c, r) => {
		let d = r.length > 0 ? c.map((u) => u.filter((a, h) => !r.includes(h))) : c
		return d.map((u, a) =>
			u.map((h, o) => {
				let p = Ee(h)
				return p === 'undefined' && a > 0 ? Ee(d[a - 1][o]) : p
			})
		)
	},
	qe = (c, r = ',') => {
		let d = nt(c, r)
		if (d.length < 2) return 0
		let u = d.shift()
		if (!u) return 0
		let a = []
		for (let B = 0; B < u.length; B++) u[B] || a.push(B)
		let h = u.filter((B) => B && B !== null && B !== ''),
			o = [],
			p = 0,
			y = ot(h)
		o.push(y * (Y.uniqueHeaderProbalility | 1)), (p += Y.uniqueHeaderProbalility | 1)
		let w = h.map((B) => Ee(B)),
			I = w.filter((B) => B !== 'undefined'),
			_ = st(I.length > 0 ? I : w)
		o.push(_ * (Y.headerTypesProbability | 1)), (p += Y.headerTypesProbability | 1)
		let N = d[0].map((B, T) => d.map((S) => S[T])),
			m = ut(N, u)
		o.push(m * (Y.headerFrequencyProbability | 1)), (p += Y.headerFrequencyProbability | 1)
		let E = at(d, a),
			b = lt(E, w)
		return (
			o.push(b * (Y.dataTypesDifference | 1)),
			(p += Y.dataTypesDifference | 1),
			o.reduce((B, T) => B + T) / p / 100
		)
	}
var Ve = (c) => {
	let r = c
	;(r = r.replace(/\\./g, '')),
		(r = r.replace(/".*?"/gs, '0')),
		(r = r.replace(/^\s*[\r\n]/gm, ''))
	let d = r.split(/[\r\n]/)
	d.at(-1) === '' && d.pop()
	let u = ['	', ';', ',', '|', '^', '~', ':', ' ', '`'],
		a = {},
		h = {}
	d.forEach((_) => {
		u.forEach((N) => {
			let m = _.split(N).length
			m !== 1 && (a[N] || ((a[N] = 0), (h[N] = [])), (a[N] += m - 1), h[N].push(m - 1))
		})
	})
	let o = Object.keys(a)
	if (o.length === 1) return o[0]
	let p = (_) => _.reduce((m, E) => m + E) / _.length,
		y = (_) => {
			let N = p(_),
				m = _.map((b) => {
					let B = b - N
					return B * B
				})
			return p(m)
		},
		w = (_) => Math.sqrt(_),
		I = Object.keys(h)
			.map((_) => {
				let N = h[_],
					m = y(N),
					E = w(m)
				return { delimiter: _, value: E }
			})
			.filter((_) => _.value < 0.1)
			.sort((_) => _.value)
	if (I.length === 1) return I[0].delimiter
	if (I.length > 1) {
		let _ = I.map((N) => N.delimiter)
		u.forEach((N) => {
			if (_.includes(N)) return N
		})
	}
	return ','
}
var ce = class {
	_data = null
	_headers = null
	_autoheader = !0
	_isHeader = !0
	_hasHeader = !1
	_emptyColumnPrefix = 'Column'
	_probabilityVariable = 0.5
	parserOptions = { encoding: 'utf-8' }
	meta = { name: 'csvParser' }
	get hasHeader() {
		return this._isHeader
	}
	get data() {
		return this._data
	}
	get delimiter() {
		return this.parserOptions.delimiter?.toString() || ','
	}
	get api() {
		return { hasHeader: this.hasHeader, delimiter: this.delimiter, data: this.data }
	}
	get hooks() {
		return (
			(this._headers = null),
			(this._autoheader = !0),
			(this._isHeader = !0),
			(this._hasHeader = !1),
			(this._emptyColumnPrefix = 'Column'),
			(this.parserOptions = { encoding: 'utf-8' }),
			{
				setAnimParams: Object.assign(
					async (r, d) => {
						if (!Array.isArray(r.target)) {
							d()
							return
						}
						for (let { target: u } of r.target) {
							if (
								!u ||
								!('data' in u) ||
								!u.data ||
								!('csv' in u.data) ||
								!u.data.csv
							)
								continue
							let a = u.data.csv
							if (!('url' in a) && !('content' in a)) continue
							'options' in a && a.options && this._setOptions(a.options)
							let h = await this.parse(a.url || a.content || '')
							if (!h || !('series' in h) || !h.series) throw new Error('Invalid data')
							if (!this._isHeader && !this._autoheader)
								throw new Error('CSV file has no header')
							;(h.series = h.series.map(
								(o) => (
									'values' in o &&
										o.values &&
										o.values.every((p) => !isNaN(Number(p))) &&
										(o.values = o.values.map((p) => Number(p))),
									o
								)
							)),
								(u.data = h)
						}
						d()
					},
					{ priority: 0.999 }
				)
			}
		)
	}
	_setOptions(r) {
		'delimiter' in r && r.delimiter && (this.parserOptions.delimiter = r.delimiter),
			'encoding' in r && r.encoding && (this.parserOptions.encoding = r.encoding),
			'hasHeader' in r &&
				r.hasHeader &&
				((this._hasHeader = r.hasHeader), (this._isHeader = !0)),
			'headers' in r && r.headers && Array.isArray(r.headers) && (this._headers = r.headers),
			'autoheader' in r && r.autoheader && (this._autoheader = r.autoheader),
			'emptyColumnPrefix' in r &&
				r.emptyColumnPrefix &&
				(this._emptyColumnPrefix = r.emptyColumnPrefix)
	}
	async parse(r, d = {}) {
		return r
			? (d && (this.parserOptions = { ...this.parserOptions, ...d }),
				await this.setSource(r),
				this.data)
			: null
	}
	async setSource(r) {
		r.startsWith('http') && (r = await this.fetchData(r))
		let d = this.getDelimiter(r)
		if (
			((this.parserOptions.delimiter = d),
			(this._isHeader = !0),
			!this._hasHeader && !Array.isArray(this._headers))
		) {
			let u = qe(r, d)
			u < this._probabilityVariable &&
				(console.error('CSV file has no header', u), (this._isHeader = !1))
		}
		try {
			let u = fe(r, {
				skip_empty_lines: !0,
				comment: '#',
				relax_column_count: !0,
				skip_records_with_error: !0,
				...this.parserOptions
			})
			this._data = this._buildData(u)
		} catch (u) {
			u instanceof Error && console.error(u.message), (this._data = null)
			return
		}
	}
	async fetchData(r) {
		let d = await fetch(r)
		return d.ok ? await d.text() : (console.error(`Error fetching data from ${r}`), '')
	}
	getDelimiter(r) {
		return this.parserOptions.delimiter?.toString() || Ve(r)
	}
	_buildData(r) {
		if (r.length === 0) return null
		let d = Array.isArray(this._headers) ? this._headers : this._getHeader(r),
			u = []
		for (let a = 0; a < r[0].length; a++) {
			let h = (d[a].length > 0 && d[a]) || this._emptyColumnPrefix + (a + 1)
			u.push({ name: h.trim(), values: r.map((o) => o[a] || '') })
		}
		return { series: u }
	}
	_getHeader(r) {
		let d = []
		return this._isHeader &&
			r.length > 0 &&
			r[0].length > 0 &&
			((d = r.shift() ?? []), d.length > 0)
			? d.map((u, a) => (u.length === 0 ? this._emptyColumnPrefix + (a + 1) : u))
			: Object.keys(r[0]).map((u) => this._emptyColumnPrefix + (parseInt(u) + 1))
	}
}
var Be = class extends ce {},
	Cr = Be
export { Be as CSVParser, Cr as default }
/*! Bundled license information:

@jspm/core/nodelibs/browser/buffer.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
