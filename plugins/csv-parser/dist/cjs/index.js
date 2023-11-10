'use strict'
var de = Object.defineProperty,
	it = Object.defineProperties,
	nt = Object.getOwnPropertyDescriptor,
	ot = Object.getOwnPropertyDescriptors,
	st = Object.getOwnPropertyNames,
	Me = Object.getOwnPropertySymbols
var qe = Object.prototype.hasOwnProperty,
	ut = Object.prototype.propertyIsEnumerable
var P = Math.pow,
	Ae = (f, r, c) =>
		r in f ? de(f, r, { enumerable: !0, configurable: !0, writable: !0, value: c }) : (f[r] = c),
	Y = (f, r) => {
		for (var c in r || (r = {})) qe.call(r, c) && Ae(f, c, r[c])
		if (Me) for (var c of Me(r)) ut.call(r, c) && Ae(f, c, r[c])
		return f
	},
	le = (f, r) => it(f, ot(r))
var at = (f, r) => {
		for (var c in r) de(f, c, { get: r[c], enumerable: !0 })
	},
	lt = (f, r, c, u) => {
		if ((r && typeof r == 'object') || typeof r == 'function')
			for (let l of st(r))
				!qe.call(f, l) &&
					l !== c &&
					de(f, l, { get: () => r[l], enumerable: !(u = nt(r, l)) || u.enumerable })
		return f
	}
var ft = (f) => lt(de({}, '__esModule', { value: !0 }), f)
var z = (f, r, c) => (Ae(f, typeof r != 'symbol' ? r + '' : r, c), c)
var fe = (f, r, c) =>
	new Promise((u, l) => {
		var d = (m) => {
				try {
					p(c.next(m))
				} catch (w) {
					l(w)
				}
			},
			o = (m) => {
				try {
					p(c.throw(m))
				} catch (w) {
					l(w)
				}
			},
			p = (m) => (m.done ? u(m.value) : Promise.resolve(m.value).then(d, o))
		p((c = c.apply(f, r)).next())
	})
var Ct = {}
at(Ct, { CSVParser: () => ye, default: () => Nt })
module.exports = ft(Ct)
var ce = {},
	ve = !1
function ct() {
	if (ve) return ce
	;(ve = !0), (ce.byteLength = p), (ce.toByteArray = w), (ce.fromByteArray = x)
	for (
		var f = [],
			r = [],
			c = typeof Uint8Array != 'undefined' ? Uint8Array : Array,
			u = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
			l = 0,
			d = u.length;
		l < d;
		++l
	)
		(f[l] = u[l]), (r[u.charCodeAt(l)] = l)
	;(r['-'.charCodeAt(0)] = 62), (r['_'.charCodeAt(0)] = 63)
	function o(_) {
		var E = _.length
		if (E % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4')
		var I = _.indexOf('=')
		I === -1 && (I = E)
		var B = I === E ? 0 : 4 - (I % 4)
		return [I, B]
	}
	function p(_) {
		var E = o(_),
			I = E[0],
			B = E[1]
		return ((I + B) * 3) / 4 - B
	}
	function m(_, E, I) {
		return ((E + I) * 3) / 4 - I
	}
	function w(_) {
		var E,
			I = o(_),
			B = I[0],
			C = I[1],
			S = new c(m(_, B, C)),
			O = 0,
			D = C > 0 ? B - 4 : B,
			U
		for (U = 0; U < D; U += 4)
			(E =
				(r[_.charCodeAt(U)] << 18) |
				(r[_.charCodeAt(U + 1)] << 12) |
				(r[_.charCodeAt(U + 2)] << 6) |
				r[_.charCodeAt(U + 3)]),
				(S[O++] = (E >> 16) & 255),
				(S[O++] = (E >> 8) & 255),
				(S[O++] = E & 255)
		return (
			C === 2 &&
				((E = (r[_.charCodeAt(U)] << 2) | (r[_.charCodeAt(U + 1)] >> 4)), (S[O++] = E & 255)),
			C === 1 &&
				((E =
					(r[_.charCodeAt(U)] << 10) |
					(r[_.charCodeAt(U + 1)] << 4) |
					(r[_.charCodeAt(U + 2)] >> 2)),
				(S[O++] = (E >> 8) & 255),
				(S[O++] = E & 255)),
			S
		)
	}
	function b(_) {
		return f[(_ >> 18) & 63] + f[(_ >> 12) & 63] + f[(_ >> 6) & 63] + f[_ & 63]
	}
	function g(_, E, I) {
		for (var B, C = [], S = E; S < I; S += 3)
			(B = ((_[S] << 16) & 16711680) + ((_[S + 1] << 8) & 65280) + (_[S + 2] & 255)), C.push(b(B))
		return C.join('')
	}
	function x(_) {
		for (var E, I = _.length, B = I % 3, C = [], S = 16383, O = 0, D = I - B; O < D; O += S)
			C.push(g(_, O, O + S > D ? D : O + S))
		return (
			B === 1
				? ((E = _[I - 1]), C.push(f[E >> 2] + f[(E << 4) & 63] + '=='))
				: B === 2 &&
				  ((E = (_[I - 2] << 8) + _[I - 1]),
				  C.push(f[E >> 10] + f[(E >> 4) & 63] + f[(E << 2) & 63] + '=')),
			C.join('')
		)
	}
	return ce
}
var pe = {},
	Ve = !1
function ht() {
	if (Ve) return pe
	Ve = !0
	return (
		(pe.read = function (f, r, c, u, l) {
			var d,
				o,
				p = l * 8 - u - 1,
				m = (1 << p) - 1,
				w = m >> 1,
				b = -7,
				g = c ? l - 1 : 0,
				x = c ? -1 : 1,
				_ = f[r + g]
			for (
				g += x, d = _ & ((1 << -b) - 1), _ >>= -b, b += p;
				b > 0;
				d = d * 256 + f[r + g], g += x, b -= 8
			);
			for (
				o = d & ((1 << -b) - 1), d >>= -b, b += u;
				b > 0;
				o = o * 256 + f[r + g], g += x, b -= 8
			);
			if (d === 0) d = 1 - w
			else {
				if (d === m) return o ? NaN : (_ ? -1 : 1) * (1 / 0)
				;(o = o + Math.pow(2, u)), (d = d - w)
			}
			return (_ ? -1 : 1) * o * Math.pow(2, d - u)
		}),
		(pe.write = function (f, r, c, u, l, d) {
			var o,
				p,
				m,
				w = d * 8 - l - 1,
				b = (1 << w) - 1,
				g = b >> 1,
				x = l === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
				_ = u ? 0 : d - 1,
				E = u ? 1 : -1,
				I = r < 0 || (r === 0 && 1 / r < 0) ? 1 : 0
			for (
				r = Math.abs(r),
					isNaN(r) || r === 1 / 0
						? ((p = isNaN(r) ? 1 : 0), (o = b))
						: ((o = Math.floor(Math.log(r) / Math.LN2)),
						  r * (m = Math.pow(2, -o)) < 1 && (o--, (m *= 2)),
						  o + g >= 1 ? (r += x / m) : (r += x * Math.pow(2, 1 - g)),
						  r * m >= 2 && (o++, (m /= 2)),
						  o + g >= b
								? ((p = 0), (o = b))
								: o + g >= 1
								? ((p = (r * m - 1) * Math.pow(2, l)), (o = o + g))
								: ((p = r * Math.pow(2, g - 1) * Math.pow(2, l)), (o = 0)));
				l >= 8;
				f[c + _] = p & 255, _ += E, p /= 256, l -= 8
			);
			for (o = (o << l) | p, w += l; w > 0; f[c + _] = o & 255, _ += E, o /= 256, w -= 8);
			f[c + _ - E] |= I * 128
		}),
		pe
	)
}
var ee = {},
	Fe = !1
function dt() {
	if (Fe) return ee
	Fe = !0
	let f = ct(),
		r = ht(),
		c =
			typeof Symbol == 'function' && typeof Symbol.for == 'function'
				? Symbol.for('nodejs.util.inspect.custom')
				: null
	;(ee.Buffer = o), (ee.SlowBuffer = C), (ee.INSPECT_MAX_BYTES = 50)
	let u = 2147483647
	;(ee.kMaxLength = u),
		(o.TYPED_ARRAY_SUPPORT = l()),
		!o.TYPED_ARRAY_SUPPORT &&
			typeof console != 'undefined' &&
			typeof console.error == 'function' &&
			console.error(
				'This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
			)
	function l() {
		try {
			let i = new Uint8Array(1),
				e = {
					foo: function () {
						return 42
					}
				}
			return (
				Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(i, e), i.foo() === 42
			)
		} catch (i) {
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
	function d(i) {
		if (i > u) throw new RangeError('The value "' + i + '" is invalid for option "size"')
		let e = new Uint8Array(i)
		return Object.setPrototypeOf(e, o.prototype), e
	}
	function o(i, e, t) {
		if (typeof i == 'number') {
			if (typeof e == 'string')
				throw new TypeError('The "string" argument must be of type string. Received type number')
			return b(i)
		}
		return p(i, e, t)
	}
	o.poolSize = 8192
	function p(i, e, t) {
		if (typeof i == 'string') return g(i, e)
		if (ArrayBuffer.isView(i)) return _(i)
		if (i == null)
			throw new TypeError(
				'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
					typeof i
			)
		if (
			Q(i, ArrayBuffer) ||
			(i && Q(i.buffer, ArrayBuffer)) ||
			(typeof SharedArrayBuffer != 'undefined' &&
				(Q(i, SharedArrayBuffer) || (i && Q(i.buffer, SharedArrayBuffer))))
		)
			return E(i, e, t)
		if (typeof i == 'number')
			throw new TypeError('The "value" argument must not be of type number. Received type number')
		let n = i.valueOf && i.valueOf()
		if (n != null && n !== i) return o.from(n, e, t)
		let s = I(i)
		if (s) return s
		if (
			typeof Symbol != 'undefined' &&
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
	function m(i) {
		if (typeof i != 'number') throw new TypeError('"size" argument must be of type number')
		if (i < 0) throw new RangeError('The value "' + i + '" is invalid for option "size"')
	}
	function w(i, e, t) {
		return (
			m(i),
			i <= 0 ? d(i) : e !== void 0 ? (typeof t == 'string' ? d(i).fill(e, t) : d(i).fill(e)) : d(i)
		)
	}
	o.alloc = function (i, e, t) {
		return w(i, e, t)
	}
	function b(i) {
		return m(i), d(i < 0 ? 0 : B(i) | 0)
	}
	;(o.allocUnsafe = function (i) {
		return b(i)
	}),
		(o.allocUnsafeSlow = function (i) {
			return b(i)
		})
	function g(i, e) {
		if (((typeof e != 'string' || e === '') && (e = 'utf8'), !o.isEncoding(e)))
			throw new TypeError('Unknown encoding: ' + e)
		let t = S(i, e) | 0,
			n = d(t),
			s = n.write(i, e)
		return s !== t && (n = n.slice(0, s)), n
	}
	function x(i) {
		let e = i.length < 0 ? 0 : B(i.length) | 0,
			t = d(e)
		for (let n = 0; n < e; n += 1) t[n] = i[n] & 255
		return t
	}
	function _(i) {
		if (Q(i, Uint8Array)) {
			let e = new Uint8Array(i)
			return E(e.buffer, e.byteOffset, e.byteLength)
		}
		return x(i)
	}
	function E(i, e, t) {
		if (e < 0 || i.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds')
		if (i.byteLength < e + (t || 0)) throw new RangeError('"length" is outside of buffer bounds')
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
	function I(i) {
		if (o.isBuffer(i)) {
			let e = B(i.length) | 0,
				t = d(e)
			return t.length === 0 || i.copy(t, 0, 0, e), t
		}
		if (i.length !== void 0) return typeof i.length != 'number' || Oe(i.length) ? d(0) : x(i)
		if (i.type === 'Buffer' && Array.isArray(i.data)) return x(i.data)
	}
	function B(i) {
		if (i >= u)
			throw new RangeError(
				'Attempt to allocate Buffer larger than maximum size: 0x' + u.toString(16) + ' bytes'
			)
		return i | 0
	}
	function C(i) {
		return +i != i && (i = 0), o.alloc(+i)
	}
	;(o.isBuffer = function (e) {
		return e != null && e._isBuffer === !0 && e !== o.prototype
	}),
		(o.compare = function (e, t) {
			if (
				(Q(e, Uint8Array) && (e = o.from(e, e.offset, e.byteLength)),
				Q(t, Uint8Array) && (t = o.from(t, t.offset, t.byteLength)),
				!o.isBuffer(e) || !o.isBuffer(t))
			)
				throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array')
			if (e === t) return 0
			let n = e.length,
				s = t.length
			for (let a = 0, h = Math.min(n, s); a < h; ++a)
				if (e[a] !== t[a]) {
					;(n = e[a]), (s = t[a])
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
			if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers')
			if (e.length === 0) return o.alloc(0)
			let n
			if (t === void 0) for (t = 0, n = 0; n < e.length; ++n) t += e[n].length
			let s = o.allocUnsafe(t),
				a = 0
			for (n = 0; n < e.length; ++n) {
				let h = e[n]
				if (Q(h, Uint8Array))
					a + h.length > s.length
						? (o.isBuffer(h) || (h = o.from(h)), h.copy(s, a))
						: Uint8Array.prototype.set.call(s, h, a)
				else if (o.isBuffer(h)) h.copy(s, a)
				else throw new TypeError('"list" argument must be an Array of Buffers')
				a += h.length
			}
			return s
		})
	function S(i, e) {
		if (o.isBuffer(i)) return i.length
		if (ArrayBuffer.isView(i) || Q(i, ArrayBuffer)) return i.byteLength
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
					return Se(i).length
				case 'ucs2':
				case 'ucs-2':
				case 'utf16le':
				case 'utf-16le':
					return t * 2
				case 'hex':
					return t >>> 1
				case 'base64':
					return ke(i).length
				default:
					if (s) return n ? -1 : Se(i).length
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
					return Z(this, e, t)
				case 'utf8':
				case 'utf-8':
					return A(this, e, t)
				case 'ascii':
					return Ee(this, e, t)
				case 'latin1':
				case 'binary':
					return F(this, e, t)
				case 'base64':
					return ue(this, e, t)
				case 'ucs2':
				case 'ucs-2':
				case 'utf16le':
				case 'utf-16le':
					return G(this, e, t)
				default:
					if (n) throw new TypeError('Unknown encoding: ' + i)
					;(i = (i + '').toLowerCase()), (n = !0)
			}
	}
	o.prototype._isBuffer = !0
	function D(i, e, t) {
		let n = i[e]
		;(i[e] = i[t]), (i[t] = n)
	}
	;(o.prototype.swap16 = function () {
		let e = this.length
		if (e % 2 !== 0) throw new RangeError('Buffer size must be a multiple of 16-bits')
		for (let t = 0; t < e; t += 2) D(this, t, t + 1)
		return this
	}),
		(o.prototype.swap32 = function () {
			let e = this.length
			if (e % 4 !== 0) throw new RangeError('Buffer size must be a multiple of 32-bits')
			for (let t = 0; t < e; t += 4) D(this, t, t + 3), D(this, t + 1, t + 2)
			return this
		}),
		(o.prototype.swap64 = function () {
			let e = this.length
			if (e % 8 !== 0) throw new RangeError('Buffer size must be a multiple of 64-bits')
			for (let t = 0; t < e; t += 8)
				D(this, t, t + 7), D(this, t + 1, t + 6), D(this, t + 2, t + 5), D(this, t + 3, t + 4)
			return this
		}),
		(o.prototype.toString = function () {
			let e = this.length
			return e === 0 ? '' : arguments.length === 0 ? A(this, 0, e) : O.apply(this, arguments)
		}),
		(o.prototype.toLocaleString = o.prototype.toString),
		(o.prototype.equals = function (e) {
			if (!o.isBuffer(e)) throw new TypeError('Argument must be a Buffer')
			return this === e ? !0 : o.compare(this, e) === 0
		}),
		(o.prototype.inspect = function () {
			let e = '',
				t = ee.INSPECT_MAX_BYTES
			return (
				(e = this.toString('hex', 0, t)
					.replace(/(.{2})/g, '$1 ')
					.trim()),
				this.length > t && (e += ' ... '),
				'<Buffer ' + e + '>'
			)
		}),
		c && (o.prototype[c] = o.prototype.inspect),
		(o.prototype.compare = function (e, t, n, s, a) {
			if ((Q(e, Uint8Array) && (e = o.from(e, e.offset, e.byteLength)), !o.isBuffer(e)))
				throw new TypeError(
					'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
						typeof e
				)
			if (
				(t === void 0 && (t = 0),
				n === void 0 && (n = e ? e.length : 0),
				s === void 0 && (s = 0),
				a === void 0 && (a = this.length),
				t < 0 || n > e.length || s < 0 || a > this.length)
			)
				throw new RangeError('out of range index')
			if (s >= a && t >= n) return 0
			if (s >= a) return -1
			if (t >= n) return 1
			if (((t >>>= 0), (n >>>= 0), (s >>>= 0), (a >>>= 0), this === e)) return 0
			let h = a - s,
				N = n - t,
				q = Math.min(h, N),
				k = this.slice(s, a),
				v = e.slice(t, n)
			for (let $ = 0; $ < q; ++$)
				if (k[$] !== v[$]) {
					;(h = k[$]), (N = v[$])
					break
				}
			return h < N ? -1 : N < h ? 1 : 0
		})
	function U(i, e, t, n, s) {
		if (i.length === 0) return -1
		if (
			(typeof t == 'string'
				? ((n = t), (t = 0))
				: t > 2147483647
				? (t = 2147483647)
				: t < -2147483648 && (t = -2147483648),
			(t = +t),
			Oe(t) && (t = s ? 0 : i.length - 1),
			t < 0 && (t = i.length + t),
			t >= i.length)
		) {
			if (s) return -1
			t = i.length - 1
		} else if (t < 0)
			if (s) t = 0
			else return -1
		if ((typeof e == 'string' && (e = o.from(e, n)), o.isBuffer(e)))
			return e.length === 0 ? -1 : re(i, e, t, n, s)
		if (typeof e == 'number')
			return (
				(e = e & 255),
				typeof Uint8Array.prototype.indexOf == 'function'
					? s
						? Uint8Array.prototype.indexOf.call(i, e, t)
						: Uint8Array.prototype.lastIndexOf.call(i, e, t)
					: re(i, [e], t, n, s)
			)
		throw new TypeError('val must be string, number or Buffer')
	}
	function re(i, e, t, n, s) {
		let a = 1,
			h = i.length,
			N = e.length
		if (
			n !== void 0 &&
			((n = String(n).toLowerCase()),
			n === 'ucs2' || n === 'ucs-2' || n === 'utf16le' || n === 'utf-16le')
		) {
			if (i.length < 2 || e.length < 2) return -1
			;(a = 2), (h /= 2), (N /= 2), (t /= 2)
		}
		function q(v, $) {
			return a === 1 ? v[$] : v.readUInt16BE($ * a)
		}
		let k
		if (s) {
			let v = -1
			for (k = t; k < h; k++)
				if (q(i, k) === q(e, v === -1 ? 0 : k - v)) {
					if ((v === -1 && (v = k), k - v + 1 === N)) return v * a
				} else v !== -1 && (k -= k - v), (v = -1)
		} else
			for (t + N > h && (t = h - N), k = t; k >= 0; k--) {
				let v = !0
				for (let $ = 0; $ < N; $++)
					if (q(i, k + $) !== q(e, $)) {
						v = !1
						break
					}
				if (v) return k
			}
		return -1
	}
	;(o.prototype.includes = function (e, t, n) {
		return this.indexOf(e, t, n) !== -1
	}),
		(o.prototype.indexOf = function (e, t, n) {
			return U(this, e, t, n, !0)
		}),
		(o.prototype.lastIndexOf = function (e, t, n) {
			return U(this, e, t, n, !1)
		})
	function we(i, e, t, n) {
		t = Number(t) || 0
		let s = i.length - t
		n ? ((n = Number(n)), n > s && (n = s)) : (n = s)
		let a = e.length
		n > a / 2 && (n = a / 2)
		let h
		for (h = 0; h < n; ++h) {
			let N = parseInt(e.substr(h * 2, 2), 16)
			if (Oe(N)) return h
			i[t + h] = N
		}
		return h
	}
	function ie(i, e, t, n) {
		return he(Se(e, i.length - t), i, t, n)
	}
	function be(i, e, t, n) {
		return he(Ze(e), i, t, n)
	}
	function Ie(i, e, t, n) {
		return he(ke(e), i, t, n)
	}
	function R(i, e, t, n) {
		return he(et(e, i.length - t), i, t, n)
	}
	;(o.prototype.write = function (e, t, n, s) {
		if (t === void 0) (s = 'utf8'), (n = this.length), (t = 0)
		else if (n === void 0 && typeof t == 'string') (s = t), (n = this.length), (t = 0)
		else if (isFinite(t))
			(t = t >>> 0),
				isFinite(n) ? ((n = n >>> 0), s === void 0 && (s = 'utf8')) : ((s = n), (n = void 0))
		else throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported')
		let a = this.length - t
		if (((n === void 0 || n > a) && (n = a), (e.length > 0 && (n < 0 || t < 0)) || t > this.length))
			throw new RangeError('Attempt to write outside buffer bounds')
		s || (s = 'utf8')
		let h = !1
		for (;;)
			switch (s) {
				case 'hex':
					return we(this, e, t, n)
				case 'utf8':
				case 'utf-8':
					return ie(this, e, t, n)
				case 'ascii':
				case 'latin1':
				case 'binary':
					return be(this, e, t, n)
				case 'base64':
					return Ie(this, e, t, n)
				case 'ucs2':
				case 'ucs-2':
				case 'utf16le':
				case 'utf-16le':
					return R(this, e, t, n)
				default:
					if (h) throw new TypeError('Unknown encoding: ' + s)
					;(s = ('' + s).toLowerCase()), (h = !0)
			}
	}),
		(o.prototype.toJSON = function () {
			return { type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0) }
		})
	function ue(i, e, t) {
		return e === 0 && t === i.length ? f.fromByteArray(i) : f.fromByteArray(i.slice(e, t))
	}
	function A(i, e, t) {
		t = Math.min(i.length, t)
		let n = [],
			s = e
		for (; s < t; ) {
			let a = i[s],
				h = null,
				N = a > 239 ? 4 : a > 223 ? 3 : a > 191 ? 2 : 1
			if (s + N <= t) {
				let q, k, v, $
				switch (N) {
					case 1:
						a < 128 && (h = a)
						break
					case 2:
						;(q = i[s + 1]),
							(q & 192) === 128 && (($ = ((a & 31) << 6) | (q & 63)), $ > 127 && (h = $))
						break
					case 3:
						;(q = i[s + 1]),
							(k = i[s + 2]),
							(q & 192) === 128 &&
								(k & 192) === 128 &&
								(($ = ((a & 15) << 12) | ((q & 63) << 6) | (k & 63)),
								$ > 2047 && ($ < 55296 || $ > 57343) && (h = $))
						break
					case 4:
						;(q = i[s + 1]),
							(k = i[s + 2]),
							(v = i[s + 3]),
							(q & 192) === 128 &&
								(k & 192) === 128 &&
								(v & 192) === 128 &&
								(($ = ((a & 15) << 18) | ((q & 63) << 12) | ((k & 63) << 6) | (v & 63)),
								$ > 65535 && $ < 1114112 && (h = $))
				}
			}
			h === null
				? ((h = 65533), (N = 1))
				: h > 65535 &&
				  ((h -= 65536), n.push(((h >>> 10) & 1023) | 55296), (h = 56320 | (h & 1023))),
				n.push(h),
				(s += N)
		}
		return H(n)
	}
	let M = 4096
	function H(i) {
		let e = i.length
		if (e <= M) return String.fromCharCode.apply(String, i)
		let t = '',
			n = 0
		for (; n < e; ) t += String.fromCharCode.apply(String, i.slice(n, (n += M)))
		return t
	}
	function Ee(i, e, t) {
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
	function Z(i, e, t) {
		let n = i.length
		;(!e || e < 0) && (e = 0), (!t || t < 0 || t > n) && (t = n)
		let s = ''
		for (let a = e; a < t; ++a) s += tt[i[a]]
		return s
	}
	function G(i, e, t) {
		let n = i.slice(e, t),
			s = ''
		for (let a = 0; a < n.length - 1; a += 2) s += String.fromCharCode(n[a] + n[a + 1] * 256)
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
	function L(i, e, t) {
		if (i % 1 !== 0 || i < 0) throw new RangeError('offset is not uint')
		if (i + e > t) throw new RangeError('Trying to access beyond buffer length')
	}
	;(o.prototype.readUintLE = o.prototype.readUIntLE =
		function (e, t, n) {
			;(e = e >>> 0), (t = t >>> 0), n || L(e, t, this.length)
			let s = this[e],
				a = 1,
				h = 0
			for (; ++h < t && (a *= 256); ) s += this[e + h] * a
			return s
		}),
		(o.prototype.readUintBE = o.prototype.readUIntBE =
			function (e, t, n) {
				;(e = e >>> 0), (t = t >>> 0), n || L(e, t, this.length)
				let s = this[e + --t],
					a = 1
				for (; t > 0 && (a *= 256); ) s += this[e + --t] * a
				return s
			}),
		(o.prototype.readUint8 = o.prototype.readUInt8 =
			function (e, t) {
				return (e = e >>> 0), t || L(e, 1, this.length), this[e]
			}),
		(o.prototype.readUint16LE = o.prototype.readUInt16LE =
			function (e, t) {
				return (e = e >>> 0), t || L(e, 2, this.length), this[e] | (this[e + 1] << 8)
			}),
		(o.prototype.readUint16BE = o.prototype.readUInt16BE =
			function (e, t) {
				return (e = e >>> 0), t || L(e, 2, this.length), (this[e] << 8) | this[e + 1]
			}),
		(o.prototype.readUint32LE = o.prototype.readUInt32LE =
			function (e, t) {
				return (
					(e = e >>> 0),
					t || L(e, 4, this.length),
					(this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) + this[e + 3] * 16777216
				)
			}),
		(o.prototype.readUint32BE = o.prototype.readUInt32BE =
			function (e, t) {
				return (
					(e = e >>> 0),
					t || L(e, 4, this.length),
					this[e] * 16777216 + ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
				)
			}),
		(o.prototype.readBigUInt64LE = X(function (e) {
			;(e = e >>> 0), oe(e, 'offset')
			let t = this[e],
				n = this[e + 7]
			;(t === void 0 || n === void 0) && ae(e, this.length - 8)
			let s = t + this[++e] * P(2, 8) + this[++e] * P(2, 16) + this[++e] * P(2, 24),
				a = this[++e] + this[++e] * P(2, 8) + this[++e] * P(2, 16) + n * P(2, 24)
			return BigInt(s) + (BigInt(a) << BigInt(32))
		})),
		(o.prototype.readBigUInt64BE = X(function (e) {
			;(e = e >>> 0), oe(e, 'offset')
			let t = this[e],
				n = this[e + 7]
			;(t === void 0 || n === void 0) && ae(e, this.length - 8)
			let s = t * P(2, 24) + this[++e] * P(2, 16) + this[++e] * P(2, 8) + this[++e],
				a = this[++e] * P(2, 24) + this[++e] * P(2, 16) + this[++e] * P(2, 8) + n
			return (BigInt(s) << BigInt(32)) + BigInt(a)
		})),
		(o.prototype.readIntLE = function (e, t, n) {
			;(e = e >>> 0), (t = t >>> 0), n || L(e, t, this.length)
			let s = this[e],
				a = 1,
				h = 0
			for (; ++h < t && (a *= 256); ) s += this[e + h] * a
			return (a *= 128), s >= a && (s -= Math.pow(2, 8 * t)), s
		}),
		(o.prototype.readIntBE = function (e, t, n) {
			;(e = e >>> 0), (t = t >>> 0), n || L(e, t, this.length)
			let s = t,
				a = 1,
				h = this[e + --s]
			for (; s > 0 && (a *= 256); ) h += this[e + --s] * a
			return (a *= 128), h >= a && (h -= Math.pow(2, 8 * t)), h
		}),
		(o.prototype.readInt8 = function (e, t) {
			return (
				(e = e >>> 0), t || L(e, 1, this.length), this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e]
			)
		}),
		(o.prototype.readInt16LE = function (e, t) {
			;(e = e >>> 0), t || L(e, 2, this.length)
			let n = this[e] | (this[e + 1] << 8)
			return n & 32768 ? n | 4294901760 : n
		}),
		(o.prototype.readInt16BE = function (e, t) {
			;(e = e >>> 0), t || L(e, 2, this.length)
			let n = this[e + 1] | (this[e] << 8)
			return n & 32768 ? n | 4294901760 : n
		}),
		(o.prototype.readInt32LE = function (e, t) {
			return (
				(e = e >>> 0),
				t || L(e, 4, this.length),
				this[e] | (this[e + 1] << 8) | (this[e + 2] << 16) | (this[e + 3] << 24)
			)
		}),
		(o.prototype.readInt32BE = function (e, t) {
			return (
				(e = e >>> 0),
				t || L(e, 4, this.length),
				(this[e] << 24) | (this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3]
			)
		}),
		(o.prototype.readBigInt64LE = X(function (e) {
			;(e = e >>> 0), oe(e, 'offset')
			let t = this[e],
				n = this[e + 7]
			;(t === void 0 || n === void 0) && ae(e, this.length - 8)
			let s = this[e + 4] + this[e + 5] * P(2, 8) + this[e + 6] * P(2, 16) + (n << 24)
			return (
				(BigInt(s) << BigInt(32)) +
				BigInt(t + this[++e] * P(2, 8) + this[++e] * P(2, 16) + this[++e] * P(2, 24))
			)
		})),
		(o.prototype.readBigInt64BE = X(function (e) {
			;(e = e >>> 0), oe(e, 'offset')
			let t = this[e],
				n = this[e + 7]
			;(t === void 0 || n === void 0) && ae(e, this.length - 8)
			let s = (t << 24) + this[++e] * P(2, 16) + this[++e] * P(2, 8) + this[++e]
			return (
				(BigInt(s) << BigInt(32)) +
				BigInt(this[++e] * P(2, 24) + this[++e] * P(2, 16) + this[++e] * P(2, 8) + n)
			)
		})),
		(o.prototype.readFloatLE = function (e, t) {
			return (e = e >>> 0), t || L(e, 4, this.length), r.read(this, e, !0, 23, 4)
		}),
		(o.prototype.readFloatBE = function (e, t) {
			return (e = e >>> 0), t || L(e, 4, this.length), r.read(this, e, !1, 23, 4)
		}),
		(o.prototype.readDoubleLE = function (e, t) {
			return (e = e >>> 0), t || L(e, 8, this.length), r.read(this, e, !0, 52, 8)
		}),
		(o.prototype.readDoubleBE = function (e, t) {
			return (e = e >>> 0), t || L(e, 8, this.length), r.read(this, e, !1, 52, 8)
		})
	function V(i, e, t, n, s, a) {
		if (!o.isBuffer(i)) throw new TypeError('"buffer" argument must be a Buffer instance')
		if (e > s || e < a) throw new RangeError('"value" argument is out of bounds')
		if (t + n > i.length) throw new RangeError('Index out of range')
	}
	;(o.prototype.writeUintLE = o.prototype.writeUIntLE =
		function (e, t, n, s) {
			if (((e = +e), (t = t >>> 0), (n = n >>> 0), !s)) {
				let N = Math.pow(2, 8 * n) - 1
				V(this, e, t, n, N, 0)
			}
			let a = 1,
				h = 0
			for (this[t] = e & 255; ++h < n && (a *= 256); ) this[t + h] = (e / a) & 255
			return t + n
		}),
		(o.prototype.writeUintBE = o.prototype.writeUIntBE =
			function (e, t, n, s) {
				if (((e = +e), (t = t >>> 0), (n = n >>> 0), !s)) {
					let N = Math.pow(2, 8 * n) - 1
					V(this, e, t, n, N, 0)
				}
				let a = n - 1,
					h = 1
				for (this[t + a] = e & 255; --a >= 0 && (h *= 256); ) this[t + a] = (e / h) & 255
				return t + n
			}),
		(o.prototype.writeUint8 = o.prototype.writeUInt8 =
			function (e, t, n) {
				return (e = +e), (t = t >>> 0), n || V(this, e, t, 1, 255, 0), (this[t] = e & 255), t + 1
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
	function W(i, e, t, n, s) {
		Pe(e, n, s, i, t, 7)
		let a = Number(e & BigInt(4294967295))
		;(i[t++] = a),
			(a = a >> 8),
			(i[t++] = a),
			(a = a >> 8),
			(i[t++] = a),
			(a = a >> 8),
			(i[t++] = a)
		let h = Number((e >> BigInt(32)) & BigInt(4294967295))
		return (
			(i[t++] = h),
			(h = h >> 8),
			(i[t++] = h),
			(h = h >> 8),
			(i[t++] = h),
			(h = h >> 8),
			(i[t++] = h),
			t
		)
	}
	function Re(i, e, t, n, s) {
		Pe(e, n, s, i, t, 7)
		let a = Number(e & BigInt(4294967295))
		;(i[t + 7] = a),
			(a = a >> 8),
			(i[t + 6] = a),
			(a = a >> 8),
			(i[t + 5] = a),
			(a = a >> 8),
			(i[t + 4] = a)
		let h = Number((e >> BigInt(32)) & BigInt(4294967295))
		return (
			(i[t + 3] = h),
			(h = h >> 8),
			(i[t + 2] = h),
			(h = h >> 8),
			(i[t + 1] = h),
			(h = h >> 8),
			(i[t] = h),
			t + 8
		)
	}
	;(o.prototype.writeBigUInt64LE = X(function (e, t = 0) {
		return W(this, e, t, BigInt(0), BigInt('0xffffffffffffffff'))
	})),
		(o.prototype.writeBigUInt64BE = X(function (e, t = 0) {
			return Re(this, e, t, BigInt(0), BigInt('0xffffffffffffffff'))
		})),
		(o.prototype.writeIntLE = function (e, t, n, s) {
			if (((e = +e), (t = t >>> 0), !s)) {
				let q = Math.pow(2, 8 * n - 1)
				V(this, e, t, n, q - 1, -q)
			}
			let a = 0,
				h = 1,
				N = 0
			for (this[t] = e & 255; ++a < n && (h *= 256); )
				e < 0 && N === 0 && this[t + a - 1] !== 0 && (N = 1),
					(this[t + a] = (((e / h) >> 0) - N) & 255)
			return t + n
		}),
		(o.prototype.writeIntBE = function (e, t, n, s) {
			if (((e = +e), (t = t >>> 0), !s)) {
				let q = Math.pow(2, 8 * n - 1)
				V(this, e, t, n, q - 1, -q)
			}
			let a = n - 1,
				h = 1,
				N = 0
			for (this[t + a] = e & 255; --a >= 0 && (h *= 256); )
				e < 0 && N === 0 && this[t + a + 1] !== 0 && (N = 1),
					(this[t + a] = (((e / h) >> 0) - N) & 255)
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
		(o.prototype.writeBigInt64LE = X(function (e, t = 0) {
			return W(this, e, t, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
		})),
		(o.prototype.writeBigInt64BE = X(function (e, t = 0) {
			return Re(this, e, t, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
		}))
	function De(i, e, t, n, s, a) {
		if (t + n > i.length) throw new RangeError('Index out of range')
		if (t < 0) throw new RangeError('Index out of range')
	}
	function Ue(i, e, t, n, s) {
		return (e = +e), (t = t >>> 0), s || De(i, e, t, 4), r.write(i, e, t, n, 23, 4), t + 4
	}
	;(o.prototype.writeFloatLE = function (e, t, n) {
		return Ue(this, e, t, !0, n)
	}),
		(o.prototype.writeFloatBE = function (e, t, n) {
			return Ue(this, e, t, !1, n)
		})
	function Le(i, e, t, n, s) {
		return (e = +e), (t = t >>> 0), s || De(i, e, t, 8), r.write(i, e, t, n, 52, 8), t + 8
	}
	;(o.prototype.writeDoubleLE = function (e, t, n) {
		return Le(this, e, t, !0, n)
	}),
		(o.prototype.writeDoubleBE = function (e, t, n) {
			return Le(this, e, t, !1, n)
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
			let a = s - n
			return (
				this === e && typeof Uint8Array.prototype.copyWithin == 'function'
					? this.copyWithin(t, n, s)
					: Uint8Array.prototype.set.call(e, this.subarray(n, s), t),
				a
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
				if (typeof s == 'string' && !o.isEncoding(s)) throw new TypeError('Unknown encoding: ' + s)
				if (e.length === 1) {
					let h = e.charCodeAt(0)
					;((s === 'utf8' && h < 128) || s === 'latin1') && (e = h)
				}
			} else typeof e == 'number' ? (e = e & 255) : typeof e == 'boolean' && (e = Number(e))
			if (t < 0 || this.length < t || this.length < n) throw new RangeError('Out of range index')
			if (n <= t) return this
			;(t = t >>> 0), (n = n === void 0 ? this.length : n >>> 0), e || (e = 0)
			let a
			if (typeof e == 'number') for (a = t; a < n; ++a) this[a] = e
			else {
				let h = o.isBuffer(e) ? e : o.from(e, s),
					N = h.length
				if (N === 0) throw new TypeError('The value "' + e + '" is invalid for argument "value"')
				for (a = 0; a < n - t; ++a) this[a + t] = h[a % N]
			}
			return this
		})
	let ne = {}
	function Be(i, e, t) {
		ne[i] = class extends t {
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
	Be(
		'ERR_BUFFER_OUT_OF_BOUNDS',
		function (i) {
			return i
				? `${i} is outside of buffer bounds`
				: 'Attempt to access memory outside buffer bounds'
		},
		RangeError
	),
		Be(
			'ERR_INVALID_ARG_TYPE',
			function (i, e) {
				return `The "${i}" argument must be of type number. Received type ${typeof e}`
			},
			TypeError
		),
		Be(
			'ERR_OUT_OF_RANGE',
			function (i, e, t) {
				let n = `The value of "${i}" is out of range.`,
					s = t
				return (
					Number.isInteger(t) && Math.abs(t) > P(2, 32)
						? (s = $e(String(t)))
						: typeof t == 'bigint' &&
						  ((s = String(t)),
						  (t > P(BigInt(2), BigInt(32)) || t < -P(BigInt(2), BigInt(32))) && (s = $e(s)),
						  (s += 'n')),
					(n += ` It must be ${e}. Received ${s}`),
					n
				)
			},
			RangeError
		)
	function $e(i) {
		let e = '',
			t = i.length,
			n = i[0] === '-' ? 1 : 0
		for (; t >= n + 4; t -= 3) e = `_${i.slice(t - 3, t)}${e}`
		return `${i.slice(0, t)}${e}`
	}
	function We(i, e, t) {
		oe(e, 'offset'), (i[e] === void 0 || i[e + t] === void 0) && ae(e, i.length - (t + 1))
	}
	function Pe(i, e, t, n, s, a) {
		if (i > t || i < e) {
			let h = typeof e == 'bigint' ? 'n' : '',
				N
			throw (
				(a > 3
					? e === 0 || e === BigInt(0)
						? (N = `>= 0${h} and < 2${h} ** ${(a + 1) * 8}${h}`)
						: (N = `>= -(2${h} ** ${(a + 1) * 8 - 1}${h}) and < 2 ** ${(a + 1) * 8 - 1}${h}`)
					: (N = `>= ${e}${h} and <= ${t}${h}`),
				new ne.ERR_OUT_OF_RANGE('value', N, i))
			)
		}
		We(n, s, a)
	}
	function oe(i, e) {
		if (typeof i != 'number') throw new ne.ERR_INVALID_ARG_TYPE(e, 'number', i)
	}
	function ae(i, e, t) {
		throw Math.floor(i) !== i
			? (oe(i, t), new ne.ERR_OUT_OF_RANGE(t || 'offset', 'an integer', i))
			: e < 0
			? new ne.ERR_BUFFER_OUT_OF_BOUNDS()
			: new ne.ERR_OUT_OF_RANGE(t || 'offset', `>= ${t ? 1 : 0} and <= ${e}`, i)
	}
	let Xe = /[^+/0-9A-Za-z-_]/g
	function Ke(i) {
		if (((i = i.split('=')[0]), (i = i.trim().replace(Xe, '')), i.length < 2)) return ''
		for (; i.length % 4 !== 0; ) i = i + '='
		return i
	}
	function Se(i, e) {
		e = e || 1 / 0
		let t,
			n = i.length,
			s = null,
			a = []
		for (let h = 0; h < n; ++h) {
			if (((t = i.charCodeAt(h)), t > 55295 && t < 57344)) {
				if (!s) {
					if (t > 56319) {
						;(e -= 3) > -1 && a.push(239, 191, 189)
						continue
					} else if (h + 1 === n) {
						;(e -= 3) > -1 && a.push(239, 191, 189)
						continue
					}
					s = t
					continue
				}
				if (t < 56320) {
					;(e -= 3) > -1 && a.push(239, 191, 189), (s = t)
					continue
				}
				t = (((s - 55296) << 10) | (t - 56320)) + 65536
			} else s && (e -= 3) > -1 && a.push(239, 191, 189)
			if (((s = null), t < 128)) {
				if ((e -= 1) < 0) break
				a.push(t)
			} else if (t < 2048) {
				if ((e -= 2) < 0) break
				a.push((t >> 6) | 192, (t & 63) | 128)
			} else if (t < 65536) {
				if ((e -= 3) < 0) break
				a.push((t >> 12) | 224, ((t >> 6) & 63) | 128, (t & 63) | 128)
			} else if (t < 1114112) {
				if ((e -= 4) < 0) break
				a.push((t >> 18) | 240, ((t >> 12) & 63) | 128, ((t >> 6) & 63) | 128, (t & 63) | 128)
			} else throw new Error('Invalid code point')
		}
		return a
	}
	function Ze(i) {
		let e = []
		for (let t = 0; t < i.length; ++t) e.push(i.charCodeAt(t) & 255)
		return e
	}
	function et(i, e) {
		let t,
			n,
			s,
			a = []
		for (let h = 0; h < i.length && !((e -= 2) < 0); ++h)
			(t = i.charCodeAt(h)), (n = t >> 8), (s = t % 256), a.push(s), a.push(n)
		return a
	}
	function ke(i) {
		return f.toByteArray(Ke(i))
	}
	function he(i, e, t, n) {
		let s
		for (s = 0; s < n && !(s + t >= e.length || s >= i.length); ++s) e[s + t] = i[s]
		return s
	}
	function Q(i, e) {
		return (
			i instanceof e ||
			(i != null &&
				i.constructor != null &&
				i.constructor.name != null &&
				i.constructor.name === e.name)
		)
	}
	function Oe(i) {
		return i !== i
	}
	let tt = (function () {
		let i = '0123456789abcdef',
			e = new Array(256)
		for (let t = 0; t < 16; ++t) {
			let n = t * 16
			for (let s = 0; s < 16; ++s) e[n + s] = i[t] + i[s]
		}
		return e
	})()
	function X(i) {
		return typeof BigInt == 'undefined' ? rt : i
	}
	function rt() {
		throw new Error('BigInt not supported')
	}
	return ee
}
var te = dt()
te.Buffer
te.SlowBuffer
te.INSPECT_MAX_BYTES
te.kMaxLength
var y = te.Buffer,
	Dt = te.INSPECT_MAX_BYTES,
	Ut = te.kMaxLength
var T = class f extends Error {
	constructor(r, c, u, ...l) {
		Array.isArray(c) && (c = c.join(' ').trim()),
			super(c),
			Error.captureStackTrace !== void 0 && Error.captureStackTrace(this, f),
			(this.code = r)
		for (let d of l)
			for (let o in d) {
				let p = d[o]
				this[o] = y.isBuffer(p)
					? p.toString(u.encoding)
					: p == null
					? p
					: JSON.parse(JSON.stringify(p))
			}
	}
}
var Je = function (f) {
	return typeof f == 'object' && f !== null && !Array.isArray(f)
}
var me = function (f) {
	let r = []
	for (let c = 0, u = f.length; c < u; c++) {
		let l = f[c]
		if (l == null || l === !1) r[c] = { disabled: !0 }
		else if (typeof l == 'string') r[c] = { name: l }
		else if (Je(l)) {
			if (typeof l.name != 'string')
				throw new T('CSV_OPTION_COLUMNS_MISSING_NAME', [
					'Option columns missing name:',
					`property "name" is required at position ${c}`,
					'when column is an object literal'
				])
			r[c] = l
		} else
			throw new T('CSV_INVALID_COLUMN_DEFINITION', [
				'Invalid column definition:',
				'expect a string or a literal object,',
				`got ${JSON.stringify(l)} at position ${c}`
			])
	}
	return r
}
var xe = class {
		constructor(r = 100) {
			;(this.size = r), (this.length = 0), (this.buf = y.allocUnsafe(r))
		}
		prepend(r) {
			if (y.isBuffer(r)) {
				let c = this.length + r.length
				if (c >= this.size && (this.resize(), c >= this.size)) throw Error('INVALID_BUFFER_STATE')
				let u = this.buf
				;(this.buf = y.allocUnsafe(this.size)),
					r.copy(this.buf, 0),
					u.copy(this.buf, r.length),
					(this.length += r.length)
			} else {
				let c = this.length++
				c === this.size && this.resize()
				let u = this.clone()
				;(this.buf[0] = r), u.copy(this.buf, 1, 0, c)
			}
		}
		append(r) {
			let c = this.length++
			c === this.size && this.resize(), (this.buf[c] = r)
		}
		clone() {
			return y.from(this.buf.slice(0, this.length))
		}
		resize() {
			let r = this.length
			this.size = this.size * 2
			let c = y.allocUnsafe(this.size)
			this.buf.copy(c, 0, 0, r), (this.buf = c)
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
	Ne = xe
var pt = 12,
	mt = 13,
	_t = 10,
	gt = 32,
	yt = 9,
	je = function (f) {
		return {
			bomSkipped: !1,
			bufBytesStart: 0,
			castField: f.cast_function,
			commenting: !1,
			error: void 0,
			enabled: f.from_line === 1,
			escaping: !1,
			escapeIsQuote:
				y.isBuffer(f.escape) && y.isBuffer(f.quote) && y.compare(f.escape, f.quote) === 0,
			expectedRecordLength: Array.isArray(f.columns) ? f.columns.length : void 0,
			field: new Ne(20),
			firstLineToHeaders: f.cast_first_line_to_header,
			needMoreDataSize: Math.max(
				f.comment !== null ? f.comment.length : 0,
				...f.delimiter.map((r) => r.length),
				f.quote !== null ? f.quote.length : 0
			),
			previousBuf: void 0,
			quoting: !1,
			stop: !1,
			rawBuffer: new Ne(100),
			record: [],
			recordHasError: !1,
			record_length: 0,
			recordDelimiterMaxLength:
				f.record_delimiter.length === 0 ? 0 : Math.max(...f.record_delimiter.map((r) => r.length)),
			trimChars: [y.from(' ', f.encoding)[0], y.from('	', f.encoding)[0]],
			wasQuoting: !1,
			wasRowDelimiter: !1,
			timchars: [
				y.from(y.from([mt], 'utf8').toString(), f.encoding),
				y.from(y.from([_t], 'utf8').toString(), f.encoding),
				y.from(y.from([pt], 'utf8').toString(), f.encoding),
				y.from(y.from([gt], 'utf8').toString(), f.encoding),
				y.from(y.from([yt], 'utf8').toString(), f.encoding)
			]
		}
	}
var ze = function (f) {
	return f.replace(/([A-Z])/g, function (r, c) {
		return '_' + c.toLowerCase()
	})
}
var Ce = function (f) {
	let r = {}
	for (let u in f) r[ze(u)] = f[u]
	if (r.encoding === void 0 || r.encoding === !0) r.encoding = 'utf8'
	else if (r.encoding === null || r.encoding === !1) r.encoding = null
	else if (typeof r.encoding != 'string' && r.encoding !== null)
		throw new T(
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
		throw new T(
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
		throw new T(
			'CSV_INVALID_OPTION_CAST',
			['Invalid option cast:', 'cast must be true or a function,', `got ${JSON.stringify(r.cast)}`],
			r
		)
	if (r.cast_date === void 0 || r.cast_date === null || r.cast_date === !1 || r.cast_date === '')
		r.cast_date = !1
	else if (r.cast_date === !0)
		r.cast_date = function (u) {
			let l = Date.parse(u)
			return isNaN(l) ? u : new Date(l)
		}
	else if (typeof r.cast_date != 'function')
		throw new T(
			'CSV_INVALID_OPTION_CAST_DATE',
			[
				'Invalid option cast_date:',
				'cast_date must be true or a function,',
				`got ${JSON.stringify(r.cast_date)}`
			],
			r
		)
	if (((r.cast_first_line_to_header = null), r.columns === !0)) r.cast_first_line_to_header = void 0
	else if (typeof r.columns == 'function')
		(r.cast_first_line_to_header = r.columns), (r.columns = !0)
	else if (Array.isArray(r.columns)) r.columns = me(r.columns)
	else if (r.columns === void 0 || r.columns === null || r.columns === !1) r.columns = !1
	else
		throw new T(
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
			throw new T(
				'CSV_INVALID_OPTION_GROUP_COLUMNS_BY_NAME',
				[
					'Invalid option group_columns_by_name:',
					'expect an boolean,',
					`got ${JSON.stringify(r.group_columns_by_name)}`
				],
				r
			)
		if (r.columns === !1)
			throw new T(
				'CSV_INVALID_OPTION_GROUP_COLUMNS_BY_NAME',
				['Invalid option group_columns_by_name:', 'the `columns` mode must be activated.'],
				r
			)
	}
	if (r.comment === void 0 || r.comment === null || r.comment === !1 || r.comment === '')
		r.comment = null
	else if (
		(typeof r.comment == 'string' && (r.comment = y.from(r.comment, r.encoding)),
		!y.isBuffer(r.comment))
	)
		throw new T(
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
		throw new T(
			'CSV_INVALID_OPTION_COMMENT',
			[
				'Invalid option comment_no_infix:',
				'value must be a boolean,',
				`got ${JSON.stringify(r.comment_no_infix)}`
			],
			r
		)
	let c = JSON.stringify(r.delimiter)
	if ((Array.isArray(r.delimiter) || (r.delimiter = [r.delimiter]), r.delimiter.length === 0))
		throw new T(
			'CSV_INVALID_OPTION_DELIMITER',
			[
				'Invalid option delimiter:',
				'delimiter must be a non empty string or buffer or array of string|buffer,',
				`got ${c}`
			],
			r
		)
	if (
		((r.delimiter = r.delimiter.map(function (u) {
			if (u == null || u === !1) return y.from(',', r.encoding)
			if ((typeof u == 'string' && (u = y.from(u, r.encoding)), !y.isBuffer(u) || u.length === 0))
				throw new T(
					'CSV_INVALID_OPTION_DELIMITER',
					[
						'Invalid option delimiter:',
						'delimiter must be a non empty string or buffer or array of string|buffer,',
						`got ${c}`
					],
					r
				)
			return u
		})),
		r.escape === void 0 || r.escape === !0
			? (r.escape = y.from('"', r.encoding))
			: typeof r.escape == 'string'
			? (r.escape = y.from(r.escape, r.encoding))
			: (r.escape === null || r.escape === !1) && (r.escape = null),
		r.escape !== null && !y.isBuffer(r.escape))
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
				`Invalid Option: from must be a positive integer, got ${JSON.stringify(f.from)}`
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
					f.from_line
				)}`
			)
	} else
		throw new Error(
			`Invalid Option: from_line must be an integer, got ${JSON.stringify(f.from_line)}`
		)
	if (r.ignore_last_delimiters === void 0 || r.ignore_last_delimiters === null)
		r.ignore_last_delimiters = !1
	else if (typeof r.ignore_last_delimiters == 'number')
		(r.ignore_last_delimiters = Math.floor(r.ignore_last_delimiters)),
			r.ignore_last_delimiters === 0 && (r.ignore_last_delimiters = !1)
	else if (typeof r.ignore_last_delimiters != 'boolean')
		throw new T(
			'CSV_INVALID_OPTION_IGNORE_LAST_DELIMITERS',
			[
				'Invalid option `ignore_last_delimiters`:',
				'the value must be a boolean value or an integer,',
				`got ${JSON.stringify(r.ignore_last_delimiters)}`
			],
			r
		)
	if (r.ignore_last_delimiters === !0 && r.columns === !1)
		throw new T(
			'CSV_IGNORE_LAST_DELIMITERS_REQUIRES_COLUMNS',
			['The option `ignore_last_delimiters`', 'requires the activation of the `columns` option'],
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
	else if (y.isBuffer(r.objname)) {
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
		throw new T(
			'CSV_INVALID_OPTION_ON_RECORD',
			['Invalid option `on_record`:', 'expect a function,', `got ${JSON.stringify(r.on_record)}`],
			r
		)
	if (r.quote === null || r.quote === !1 || r.quote === '') r.quote = null
	else if (
		(r.quote === void 0 || r.quote === !0
			? (r.quote = y.from('"', r.encoding))
			: typeof r.quote == 'string' && (r.quote = y.from(r.quote, r.encoding)),
		!y.isBuffer(r.quote))
	)
		throw new Error(
			`Invalid Option: quote must be a buffer or a string, got ${JSON.stringify(r.quote)}`
		)
	if (r.raw === void 0 || r.raw === null || r.raw === !1) r.raw = !1
	else if (r.raw !== !0)
		throw new Error(`Invalid Option: raw must be true, got ${JSON.stringify(r.raw)}`)
	if (r.record_delimiter === void 0) r.record_delimiter = []
	else if (typeof r.record_delimiter == 'string' || y.isBuffer(r.record_delimiter)) {
		if (r.record_delimiter.length === 0)
			throw new T(
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
		throw new T(
			'CSV_INVALID_OPTION_RECORD_DELIMITER',
			[
				'Invalid option `record_delimiter`:',
				'value must be a string, a buffer or array of string|buffer,',
				`got ${JSON.stringify(r.record_delimiter)}`
			],
			r
		)
	if (
		((r.record_delimiter = r.record_delimiter.map(function (u, l) {
			if (typeof u != 'string' && !y.isBuffer(u))
				throw new T(
					'CSV_INVALID_OPTION_RECORD_DELIMITER',
					[
						'Invalid option `record_delimiter`:',
						'value must be a string, a buffer or array of string|buffer',
						`at index ${l},`,
						`got ${JSON.stringify(u)}`
					],
					r
				)
			if (u.length === 0)
				throw new T(
					'CSV_INVALID_OPTION_RECORD_DELIMITER',
					[
						'Invalid option `record_delimiter`:',
						'value must be a non empty string or buffer',
						`at index ${l},`,
						`got ${JSON.stringify(u)}`
					],
					r
				)
			return typeof u == 'string' && (u = y.from(u, r.encoding)), u
		})),
		typeof r.relax_column_count != 'boolean')
	)
		if (r.relax_column_count === void 0 || r.relax_column_count === null) r.relax_column_count = !1
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
				`Invalid Option: relax_quotes must be a boolean, got ${JSON.stringify(r.relax_quotes)}`
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
		if (r.skip_records_with_empty_values === void 0 || r.skip_records_with_empty_values === null)
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
		(r.trim === !0 && f.ltrim !== !1 ? (r.ltrim = !0) : r.ltrim !== !0 && (r.ltrim = !1),
		r.trim === !0 && f.rtrim !== !1 ? (r.rtrim = !0) : r.rtrim !== !0 && (r.rtrim = !1),
		r.to === void 0 || r.to === null)
	)
		r.to = -1
	else if (
		(typeof r.to == 'string' && /\d+/.test(r.to) && (r.to = parseInt(r.to)), Number.isInteger(r.to))
	) {
		if (r.to <= 0)
			throw new Error(
				`Invalid Option: to must be a positive integer greater than 0, got ${JSON.stringify(f.to)}`
			)
	} else throw new Error(`Invalid Option: to must be an integer, got ${JSON.stringify(f.to)}`)
	if (r.to_line === void 0 || r.to_line === null) r.to_line = -1
	else if (
		(typeof r.to_line == 'string' && /\d+/.test(r.to_line) && (r.to_line = parseInt(r.to_line)),
		Number.isInteger(r.to_line))
	) {
		if (r.to_line <= 0)
			throw new Error(
				`Invalid Option: to_line must be a positive integer greater than 0, got ${JSON.stringify(
					f.to_line
				)}`
			)
	} else
		throw new Error(`Invalid Option: to_line must be an integer, got ${JSON.stringify(f.to_line)}`)
	return r
}
var He = function (f) {
		return f.every((r) => r == null || (r.toString && r.toString().trim() === ''))
	},
	wt = 13,
	bt = 10,
	se = { utf8: y.from([239, 187, 191]), utf16le: y.from([255, 254]) },
	Qe = function (f = {}) {
		let r = {
				bytes: 0,
				comment_lines: 0,
				empty_lines: 0,
				invalid_field_length: 0,
				lines: 1,
				records: 0
			},
			c = Ce(f)
		return {
			info: r,
			original_options: f,
			options: c,
			state: je(c),
			__needMoreData: function (u, l, d) {
				if (d) return !1
				let { encoding: o, escape: p, quote: m } = this.options,
					{ quoting: w, needMoreDataSize: b, recordDelimiterMaxLength: g } = this.state,
					x = l - u - 1,
					_ = Math.max(
						b,
						g === 0
							? y.from(
									`\r
`,
									o
							  ).length
							: g,
						w ? (p === null ? 0 : p.length) + m.length : 0,
						w ? m.length + g : 0
					)
				return x < _
			},
			parse: function (u, l, d, o) {
				let {
						bom: p,
						comment_no_infix: m,
						encoding: w,
						from_line: b,
						ltrim: g,
						max_record_size: x,
						raw: _,
						relax_quotes: E,
						rtrim: I,
						skip_empty_lines: B,
						to: C,
						to_line: S
					} = this.options,
					{ comment: O, escape: D, quote: U, record_delimiter: re } = this.options,
					{ bomSkipped: we, previousBuf: ie, rawBuffer: be, escapeIsQuote: Ie } = this.state,
					R
				if (ie === void 0)
					if (u === void 0) {
						o()
						return
					} else R = u
				else ie !== void 0 && u === void 0 ? (R = ie) : (R = y.concat([ie, u]))
				if (we === !1)
					if (p === !1) this.state.bomSkipped = !0
					else if (R.length < 3) {
						if (l === !1) {
							this.state.previousBuf = R
							return
						}
					} else {
						for (let M in se)
							if (se[M].compare(R, 0, se[M].length) === 0) {
								let H = se[M].length
								;(this.state.bufBytesStart += H),
									(R = R.slice(H)),
									(this.options = Ce(le(Y({}, this.original_options), { encoding: M }))),
									({ comment: O, escape: D, quote: U } = this.options)
								break
							}
						this.state.bomSkipped = !0
					}
				let ue = R.length,
					A
				for (A = 0; A < ue && !this.__needMoreData(A, ue, l); A++) {
					if (
						(this.state.wasRowDelimiter === !0 &&
							(this.info.lines++, (this.state.wasRowDelimiter = !1)),
						S !== -1 && this.info.lines > S)
					) {
						;(this.state.stop = !0), o()
						return
					}
					this.state.quoting === !1 &&
						re.length === 0 &&
						this.__autoDiscoverRecordDelimiter(R, A) &&
						(re = this.options.record_delimiter)
					let M = R[A]
					if (
						(_ === !0 && be.append(M),
						(M === wt || M === bt) &&
							this.state.wasRowDelimiter === !1 &&
							(this.state.wasRowDelimiter = !0),
						this.state.escaping === !0)
					)
						this.state.escaping = !1
					else {
						if (
							D !== null &&
							this.state.quoting === !0 &&
							this.__isEscape(R, A, M) &&
							A + D.length < ue
						)
							if (Ie) {
								if (this.__isQuote(R, A + D.length)) {
									;(this.state.escaping = !0), (A += D.length - 1)
									continue
								}
							} else {
								;(this.state.escaping = !0), (A += D.length - 1)
								continue
							}
						if (this.state.commenting === !1 && this.__isQuote(R, A))
							if (this.state.quoting === !0) {
								let F = R[A + U.length],
									Z = I && this.__isCharTrimable(R, A + U.length),
									G = O !== null && this.__compareBytes(O, R, A + U.length, F),
									L = this.__isDelimiter(R, A + U.length, F),
									V =
										re.length === 0
											? this.__autoDiscoverRecordDelimiter(R, A + U.length)
											: this.__isRecordDelimiter(F, R, A + U.length)
								if (D !== null && this.__isEscape(R, A, M) && this.__isQuote(R, A + D.length))
									A += D.length - 1
								else if (!F || L || V || G || Z) {
									;(this.state.quoting = !1), (this.state.wasQuoting = !0), (A += U.length - 1)
									continue
								} else if (E === !1) {
									let W = this.__error(
										new T(
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
									if (W !== void 0) return W
								} else
									(this.state.quoting = !1),
										(this.state.wasQuoting = !0),
										this.state.field.prepend(U),
										(A += U.length - 1)
							} else if (this.state.field.length !== 0) {
								if (E === !1) {
									let F = this.__infoField(),
										Z = Object.keys(se)
											.map((L) => (se[L].equals(this.state.field.toString()) ? L : !1))
											.filter(Boolean)[0],
										G = this.__error(
											new T(
												'INVALID_OPENING_QUOTE',
												[
													'Invalid Opening Quote:',
													`a quote is found on field ${JSON.stringify(F.column)} at line ${
														F.lines
													}, value is ${JSON.stringify(this.state.field.toString(w))}`,
													Z ? `(${Z} bom)` : void 0
												],
												this.options,
												F,
												{ field: this.state.field }
											)
										)
									if (G !== void 0) return G
								}
							} else {
								;(this.state.quoting = !0), (A += U.length - 1)
								continue
							}
						if (this.state.quoting === !1) {
							let F = this.__isRecordDelimiter(M, R, A)
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
										this.info.lines + (this.state.wasRowDelimiter === !0 ? 1 : 0) >= b
									) {
										;(this.state.enabled = !0),
											this.__resetField(),
											this.__resetRecord(),
											(A += F - 1)
										continue
									}
									if (
										B === !0 &&
										this.state.wasQuoting === !1 &&
										this.state.record.length === 0 &&
										this.state.field.length === 0
									) {
										this.info.empty_lines++, (A += F - 1)
										continue
									}
									this.info.bytes = this.state.bufBytesStart + A
									let V = this.__onField()
									if (V !== void 0) return V
									this.info.bytes = this.state.bufBytesStart + A + F
									let W = this.__onRecord(d)
									if (W !== void 0) return W
									if (C !== -1 && this.info.records >= C) {
										;(this.state.stop = !0), o()
										return
									}
								}
								;(this.state.commenting = !1), (A += F - 1)
								continue
							}
							if (this.state.commenting) continue
							if (
								(O === null ? 0 : this.__compareBytes(O, R, A, M)) !== 0 &&
								(m === !1 || this.state.field.length === 0)
							) {
								this.state.commenting = !0
								continue
							}
							let G = this.__isDelimiter(R, A, M)
							if (G !== 0) {
								this.info.bytes = this.state.bufBytesStart + A
								let L = this.__onField()
								if (L !== void 0) return L
								A += G - 1
								continue
							}
						}
					}
					if (
						this.state.commenting === !1 &&
						x !== 0 &&
						this.state.record_length + this.state.field.length > x
					)
						return this.__error(
							new T(
								'CSV_MAX_RECORD_SIZE',
								[
									'Max Record Size:',
									'record exceed the maximum number of tolerated bytes',
									`of ${x}`,
									`at line ${this.info.lines}`
								],
								this.options,
								this.__infoField()
							)
						)
					let H =
							g === !1 ||
							this.state.quoting === !0 ||
							this.state.field.length !== 0 ||
							!this.__isCharTrimable(R, A),
						Ee = I === !1 || this.state.wasQuoting === !1
					if (H === !0 && Ee === !0) this.state.field.append(M)
					else {
						if (I === !0 && !this.__isCharTrimable(R, A))
							return this.__error(
								new T(
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
						H === !1 && (A += this.__isCharTrimable(R, A) - 1)
						continue
					}
				}
				if (l === !0)
					if (this.state.quoting === !0) {
						let M = this.__error(
							new T(
								'CSV_QUOTE_NOT_CLOSED',
								[
									'Quote Not Closed:',
									`the parsing is finished with an opening quote at line ${this.info.lines}`
								],
								this.options,
								this.__infoField()
							)
						)
						if (M !== void 0) return M
					} else if (
						this.state.wasQuoting === !0 ||
						this.state.record.length !== 0 ||
						this.state.field.length !== 0
					) {
						this.info.bytes = this.state.bufBytesStart + A
						let M = this.__onField()
						if (M !== void 0) return M
						let H = this.__onRecord(d)
						if (H !== void 0) return H
					} else
						this.state.wasRowDelimiter === !0
							? this.info.empty_lines++
							: this.state.commenting === !0 && this.info.comment_lines++
				else (this.state.bufBytesStart += A), (this.state.previousBuf = R.slice(A))
				this.state.wasRowDelimiter === !0 && (this.info.lines++, (this.state.wasRowDelimiter = !1))
			},
			__onRecord: function (u) {
				let {
						columns: l,
						group_columns_by_name: d,
						encoding: o,
						info: p,
						from: m,
						relax_column_count: w,
						relax_column_count_less: b,
						relax_column_count_more: g,
						raw: x,
						skip_records_with_empty_values: _
					} = this.options,
					{ enabled: E, record: I } = this.state
				if (E === !1) return this.__resetRecord()
				let B = I.length
				if (l === !0) {
					if (_ === !0 && He(I)) {
						this.__resetRecord()
						return
					}
					return this.__firstLineToColumns(I)
				}
				if (
					(l === !1 && this.info.records === 0 && (this.state.expectedRecordLength = B),
					B !== this.state.expectedRecordLength)
				) {
					let C =
						l === !1
							? new T(
									'CSV_RECORD_INCONSISTENT_FIELDS_LENGTH',
									[
										'Invalid Record Length:',
										`expect ${this.state.expectedRecordLength},`,
										`got ${B} on line ${this.info.lines}`
									],
									this.options,
									this.__infoField(),
									{ record: I }
							  )
							: new T(
									'CSV_RECORD_INCONSISTENT_COLUMNS',
									[
										'Invalid Record Length:',
										`columns length is ${l.length},`,
										`got ${B} on line ${this.info.lines}`
									],
									this.options,
									this.__infoField(),
									{ record: I }
							  )
					if (
						w === !0 ||
						(b === !0 && B < this.state.expectedRecordLength) ||
						(g === !0 && B > this.state.expectedRecordLength)
					)
						this.info.invalid_field_length++, (this.state.error = C)
					else {
						let S = this.__error(C)
						if (S) return S
					}
				}
				if (_ === !0 && He(I)) {
					this.__resetRecord()
					return
				}
				if (this.state.recordHasError === !0) {
					this.__resetRecord(), (this.state.recordHasError = !1)
					return
				}
				if ((this.info.records++, m === 1 || this.info.records >= m)) {
					let { objname: C } = this.options
					if (l !== !1) {
						let S = {}
						for (let O = 0, D = I.length; O < D; O++)
							l[O] === void 0 ||
								l[O].disabled ||
								(d === !0 && S[l[O].name] !== void 0
									? Array.isArray(S[l[O].name])
										? (S[l[O].name] = S[l[O].name].concat(I[O]))
										: (S[l[O].name] = [S[l[O].name], I[O]])
									: (S[l[O].name] = I[O]))
						if (x === !0 || p === !0) {
							let O = Object.assign(
									{ record: S },
									x === !0 ? { raw: this.state.rawBuffer.toString(o) } : {},
									p === !0 ? { info: this.__infoRecord() } : {}
								),
								D = this.__push(C === void 0 ? O : [S[C], O], u)
							if (D) return D
						} else {
							let O = this.__push(C === void 0 ? S : [S[C], S], u)
							if (O) return O
						}
					} else if (x === !0 || p === !0) {
						let S = Object.assign(
								{ record: I },
								x === !0 ? { raw: this.state.rawBuffer.toString(o) } : {},
								p === !0 ? { info: this.__infoRecord() } : {}
							),
							O = this.__push(C === void 0 ? S : [I[C], S], u)
						if (O) return O
					} else {
						let S = this.__push(C === void 0 ? I : [I[C], I], u)
						if (S) return S
					}
				}
				this.__resetRecord()
			},
			__firstLineToColumns: function (u) {
				let { firstLineToHeaders: l } = this.state
				try {
					let d = l === void 0 ? u : l.call(null, u)
					if (!Array.isArray(d))
						return this.__error(
							new T(
								'CSV_INVALID_COLUMN_MAPPING',
								[
									'Invalid Column Mapping:',
									'expect an array from column function,',
									`got ${JSON.stringify(d)}`
								],
								this.options,
								this.__infoField(),
								{ headers: d }
							)
						)
					let o = me(d)
					;(this.state.expectedRecordLength = o.length),
						(this.options.columns = o),
						this.__resetRecord()
					return
				} catch (d) {
					return d
				}
			},
			__resetRecord: function () {
				this.options.raw === !0 && this.state.rawBuffer.reset(),
					(this.state.error = void 0),
					(this.state.record = []),
					(this.state.record_length = 0)
			},
			__onField: function () {
				let { cast: u, encoding: l, rtrim: d, max_record_size: o } = this.options,
					{ enabled: p, wasQuoting: m } = this.state
				if (p === !1) return this.__resetField()
				let w = this.state.field.toString(l)
				if ((d === !0 && m === !1 && (w = w.trimRight()), u === !0)) {
					let [b, g] = this.__cast(w)
					if (b !== void 0) return b
					w = g
				}
				this.state.record.push(w),
					o !== 0 && typeof w == 'string' && (this.state.record_length += w.length),
					this.__resetField()
			},
			__resetField: function () {
				this.state.field.reset(), (this.state.wasQuoting = !1)
			},
			__push: function (u, l) {
				let { on_record: d } = this.options
				if (d !== void 0) {
					let o = this.__infoRecord()
					try {
						u = d.call(null, u, o)
					} catch (p) {
						return p
					}
					if (u == null) return
				}
				l(u)
			},
			__cast: function (u) {
				let { columns: l, relax_column_count: d } = this.options
				if (Array.isArray(l) === !0 && d && this.options.columns.length <= this.state.record.length)
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
			__isCharTrimable: function (u, l) {
				return ((o, p) => {
					let { timchars: m } = this.state
					e: for (let w = 0; w < m.length; w++) {
						let b = m[w]
						for (let g = 0; g < b.length; g++) if (b[g] !== o[p + g]) continue e
						return b.length
					}
					return 0
				})(u, l)
			},
			__isFloat: function (u) {
				return u - parseFloat(u) + 1 >= 0
			},
			__compareBytes: function (u, l, d, o) {
				if (u[0] !== o) return 0
				let p = u.length
				for (let m = 1; m < p; m++) if (u[m] !== l[d + m]) return 0
				return p
			},
			__isDelimiter: function (u, l, d) {
				let { delimiter: o, ignore_last_delimiters: p } = this.options
				if (p === !0 && this.state.record.length === this.options.columns.length - 1) return 0
				if (p !== !1 && typeof p == 'number' && this.state.record.length === p - 1) return 0
				e: for (let m = 0; m < o.length; m++) {
					let w = o[m]
					if (w[0] === d) {
						for (let b = 1; b < w.length; b++) if (w[b] !== u[l + b]) continue e
						return w.length
					}
				}
				return 0
			},
			__isRecordDelimiter: function (u, l, d) {
				let { record_delimiter: o } = this.options,
					p = o.length
				e: for (let m = 0; m < p; m++) {
					let w = o[m],
						b = w.length
					if (w[0] === u) {
						for (let g = 1; g < b; g++) if (w[g] !== l[d + g]) continue e
						return w.length
					}
				}
				return 0
			},
			__isEscape: function (u, l, d) {
				let { escape: o } = this.options
				if (o === null) return !1
				let p = o.length
				if (o[0] === d) {
					for (let m = 0; m < p; m++) if (o[m] !== u[l + m]) return !1
					return !0
				}
				return !1
			},
			__isQuote: function (u, l) {
				let { quote: d } = this.options
				if (d === null) return !1
				let o = d.length
				for (let p = 0; p < o; p++) if (d[p] !== u[l + p]) return !1
				return !0
			},
			__autoDiscoverRecordDelimiter: function (u, l) {
				let { encoding: d } = this.options,
					o = [
						y.from(
							`\r
`,
							d
						),
						y.from(
							`
`,
							d
						),
						y.from('\r', d)
					]
				e: for (let p = 0; p < o.length; p++) {
					let m = o[p].length
					for (let w = 0; w < m; w++) if (o[p][w] !== u[l + w]) continue e
					return (
						this.options.record_delimiter.push(o[p]),
						(this.state.recordDelimiterMaxLength = o[p].length),
						o[p].length
					)
				}
				return 0
			},
			__error: function (u) {
				let { encoding: l, raw: d, skip_records_with_error: o } = this.options,
					p = typeof u == 'string' ? new Error(u) : u
				if (o) {
					;(this.state.recordHasError = !0),
						this.options.on_skip !== void 0 &&
							this.options.on_skip(p, d ? this.state.rawBuffer.toString(l) : void 0)
					return
				} else return p
			},
			__infoDataSet: function () {
				return le(Y({}, this.info), { columns: this.options.columns })
			},
			__infoRecord: function () {
				let { columns: u, raw: l, encoding: d } = this.options
				return le(Y({}, this.__infoDataSet()), {
					error: this.state.error,
					header: u === !0,
					index: this.state.record.length,
					raw: l ? this.state.rawBuffer.toString(d) : void 0
				})
			},
			__infoField: function () {
				let { columns: u } = this.options,
					l = Array.isArray(u)
				return le(Y({}, this.__infoRecord()), {
					column:
						l === !0
							? u.length > this.state.record.length
								? u[this.state.record.length].name
								: null
							: this.state.record.length,
					quoting: this.state.wasQuoting
				})
			}
		}
	}
var _e = function (f, r = {}) {
	typeof f == 'string' && (f = y.from(f))
	let c = r && r.objname ? {} : [],
		u = Qe(r),
		l = (m) => {
			u.options.objname === void 0 ? c.push(m) : (c[m[0]] = m[1])
		},
		d = () => {},
		o = u.parse(f, !1, l, d)
	if (o !== void 0) throw o
	let p = u.parse(void 0, !0, l, d)
	if (p !== void 0) throw p
	return c
}
var K = {
		uniqueHeaderProbalility: 1,
		headerTypesProbability: 5,
		headerFrequencyProbability: 5,
		dataTypesDifference: 5
	},
	Te = (f) => {
		if (!f || f === '') return 'undefined'
		if (typeof f == 'number') return 'number'
		if (typeof f != 'string') return 'string'
		try {
			let r = f
				.trim()
				.replace(/\s/g, '')
				.replace(/,/g, '.')
				.replace(/^[−–—]/, '-')
				.replace(/[\u2012\u2013\u2014\u2015]/g, '-')
			return isNaN(Number(r)) ? 'string' : 'number'
		} catch (r) {
			return 'string'
		}
	},
	It = (f, r = ',') =>
		_e(f, {
			delimiter: r,
			skip_empty_lines: !0,
			columns: !1,
			comment: '#',
			relax_column_count: !0,
			skip_records_with_error: !0,
			trim: !0
		}),
	Et = (f) => {
		if (f.length === 0) return 0
		let r = f.flat(),
			c = new Set(r.filter(Boolean)),
			u = r.length
		return (c.size / u) * 100
	},
	Bt = (f) => {
		let r = f.filter((c) => c && c === 'string')
		return r.length === 0 ? 0 : (r.length / f.length) * 100
	},
	St = (f, r) => {
		let c = f.map((d, o) => (d.filter((m) => m === r[o]).length / d.length) * 100)
		return 100 - (c.filter((d) => d > 0).length / c.length) * 100
	},
	Ot = (f, r) => {
		let c = 0
		for (let u of f) r.length === u.length && r.join(',') !== u.join(',') && c++
		return (c / f.length) * 100
	},
	At = (f, r) => {
		let c = r.length > 0 ? f.map((u) => u.filter((l, d) => !r.includes(d))) : f
		return c.map((u, l) =>
			u.map((d, o) => {
				let p = Te(d)
				return p === 'undefined' && l > 0 ? Te(c[l - 1][o]) : p
			})
		)
	},
	Ge = (f, r = ',') => {
		let c = It(f, r)
		if (c.length < 2) return 0
		let u = c.shift()
		if (!u) return 0
		let l = []
		for (let B = 0; B < u.length; B++) u[B] || l.push(B)
		let d = u.filter((B) => B && B !== null && B !== ''),
			o = [],
			p = 0,
			m = Et(d)
		o.push(m * (K.uniqueHeaderProbalility | 1)), (p += K.uniqueHeaderProbalility | 1)
		let w = d.map((B) => Te(B)),
			b = w.filter((B) => B !== 'undefined'),
			g = Bt(b.length > 0 ? b : w)
		o.push(g * (K.headerTypesProbability | 1)), (p += K.headerTypesProbability | 1)
		let x = c[0].map((B, C) => c.map((S) => S[C])),
			_ = St(x, u)
		o.push(_ * (K.headerFrequencyProbability | 1)), (p += K.headerFrequencyProbability | 1)
		let E = At(c, l),
			I = Ot(E, w)
		return (
			o.push(I * (K.dataTypesDifference | 1)),
			(p += K.dataTypesDifference | 1),
			o.reduce((B, C) => B + C) / p / 100
		)
	}
var Ye = (f) => {
	let r = f
	;(r = r.replace(/\\./g, '')),
		(r = r.replace(new RegExp('".*?"', 'gs'), '0')),
		(r = r.replace(/^\s*[\r\n]/gm, ''))
	let c = r.split(/[\r\n]/)
	c.at(-1) === '' && c.pop()
	let u = ['	', ';', ',', '|', '^', '~', ':', ' ', '`'],
		l = {},
		d = {}
	c.forEach((g) => {
		u.forEach((x) => {
			let _ = g.split(x).length
			_ !== 1 && (l[x] || ((l[x] = 0), (d[x] = [])), (l[x] += _ - 1), d[x].push(_ - 1))
		})
	})
	let o = Object.keys(l)
	if (o.length === 1) return o[0]
	let p = (g) => g.reduce((_, E) => _ + E) / g.length,
		m = (g) => {
			let x = p(g),
				_ = g.map((I) => {
					let B = I - x
					return B * B
				})
			return p(_)
		},
		w = (g) => Math.sqrt(g),
		b = Object.keys(d)
			.map((g) => {
				let x = d[g],
					_ = m(x),
					E = w(_)
				return { delimiter: g, value: E }
			})
			.filter((g) => g.value < 0.1)
			.sort((g) => g.value)
	if (b.length === 1) return b[0].delimiter
	if (b.length > 1) {
		let g = b.map((x) => x.delimiter)
		u.forEach((x) => {
			if (g.includes(x)) return x
		})
	}
	return ','
}
var xt = [
		'%cVIZZU%CSV-PARSER%c',
		'background: #e2ae30; color: #3a60bf; font-weight: bold',
		'background: #3a60bf; color: #e2ae30;'
	],
	ge = class {
		constructor(r = !1) {
			z(this, '_data', null)
			z(this, '_headers', null)
			z(this, '_autoheader', !0)
			z(this, '_isHeader', !0)
			z(this, '_hasHeader', !1)
			z(this, '_emptyColumnPrefix', 'Column')
			z(this, '_probabilityVariable', 0.5)
			z(this, '_detectedDelimiter', ',')
			z(this, '_debug', !1)
			z(this, 'parserOptions', { encoding: 'utf-8' })
			z(this, 'meta', { name: 'csvParser' })
			this._debug = r
		}
		get hasHeader() {
			return this._isHeader
		}
		get data() {
			return this._data
		}
		get delimiter() {
			var r
			return ((r = this.parserOptions.delimiter) == null ? void 0 : r.toString()) || ','
		}
		get detectedDelimiter() {
			return this._detectedDelimiter
		}
		get api() {
			return {
				hasHeader: this.hasHeader,
				delimiter: this.delimiter,
				detectedDelimiter: this.detectedDelimiter,
				data: this.data
			}
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
					prepareAnimation: Object.assign(
						(r, c) =>
							fe(this, null, function* () {
								if (!Array.isArray(r.target)) {
									c()
									return
								}
								for (let { target: u } of r.target) {
									if (!u || !('data' in u) || !u.data || !('csv' in u.data) || !u.data.csv) continue
									let l = u.data.csv
									if (!(!('url' in l) && !('content' in l))) {
										'options' in l && l.options && this._setOptions(l.options)
										try {
											let d = yield this.parse(l.url || l.content || '')
											if (!d || !('series' in d) || !d.series) throw new Error('Invalid data')
											if (!this._isHeader && !this._autoheader)
												throw new Error('CSV file has no header')
											u.data = d
										} catch (d) {
											d instanceof Error && console.error(d.message)
											continue
										}
									}
								}
								c()
							}),
						{ priority: 0.999 }
					)
				}
			)
		}
		_setOptions(r) {
			this._log(['setOptions', r]),
				'delimiter' in r && r.delimiter && (this.parserOptions.delimiter = r.delimiter),
				'encoding' in r && r.encoding && (this.parserOptions.encoding = r.encoding),
				'hasHeader' in r && r.hasHeader && ((this._hasHeader = r.hasHeader), (this._isHeader = !0)),
				'headers' in r && r.headers && Array.isArray(r.headers) && (this._headers = r.headers),
				'autoheader' in r && r.autoheader && (this._autoheader = r.autoheader),
				'emptyColumnPrefix' in r &&
					r.emptyColumnPrefix &&
					(this._emptyColumnPrefix = r.emptyColumnPrefix)
		}
		convertNumbers(r) {
			return (
				!r ||
					!('series' in r) ||
					!r.series ||
					(r.series = r.series.map(
						(c) => (
							'values' in c &&
								c.values &&
								c.values.every((u) => !isNaN(Number(u))) &&
								(c.values = c.values.map((u) => Number(u))),
							c
						)
					)),
				r
			)
		}
		parse(l) {
			return fe(this, arguments, function* (r, c = {}, u = !0) {
				return !r ||
					(c && (this.parserOptions = Y(Y({}, this.parserOptions), c)),
					yield this.setSource(r),
					!this.data)
					? null
					: u
					? this.convertNumbers(this.data)
					: this.data
			})
		}
		setSource(r) {
			return fe(this, null, function* () {
				r.startsWith('http') && (r = yield this.fetchData(r))
				let c = this.getDelimiter(r)
				if (
					((this.parserOptions.delimiter = c),
					(this._isHeader = !0),
					!this._hasHeader && !Array.isArray(this._headers))
				) {
					let u = Ge(r, c)
					this._log(['headerProbability', u]),
						u < this._probabilityVariable &&
							(console.error('CSV file has no header', u), (this._isHeader = !1))
				}
				try {
					this._log(['parser options', this.parserOptions])
					let u = _e(
						r,
						Y(
							{
								skip_empty_lines: !0,
								comment: '#',
								relax_column_count: !0,
								skip_records_with_error: !0
							},
							this.parserOptions
						)
					)
					this._data = this._buildData(u)
				} catch (u) {
					u instanceof Error && console.error(u.message), (this._data = null)
					return
				}
			})
		}
		fetchData(r) {
			return fe(this, null, function* () {
				let c = yield fetch(r)
				return c.ok ? yield c.text() : (console.error(`Error fetching data from ${r}`), '')
			})
		}
		getDelimiter(r) {
			var c
			return (
				(this._detectedDelimiter = Ye(r)),
				this._log(['detected delimiter:', this._detectedDelimiter]),
				((c = this.parserOptions.delimiter) == null ? void 0 : c.toString()) ||
					this._detectedDelimiter
			)
		}
		_buildData(r) {
			if (r.length === 0) return null
			let c = Array.isArray(this._headers) ? this._headers : this._getHeader(r)
			this._log(['header', c])
			let u = []
			for (let l = 0; l < r[0].length; l++) {
				let d = c[l] && c[l].length > 0 ? c[l] : this._emptyColumnPrefix + (l + 1)
				u.push({ name: d.trim(), values: r.map((o) => o[l] || '') })
			}
			return { series: u }
		}
		_getHeader(r) {
			var u
			let c = []
			return this._isHeader &&
				r.length > 0 &&
				r[0].length > 0 &&
				((c = (u = r.shift()) != null ? u : []), c.length > 0)
				? c.map((l, d) => (l.length === 0 ? this._emptyColumnPrefix + (d + 1) : l))
				: Object.keys(r[0]).map((l) => this._emptyColumnPrefix + (parseInt(l) + 1))
		}
		_log(...r) {
			this._debug && console.log(...xt, ...r)
		}
	}
var ye = class extends ge {},
	Nt = ye
/*! Bundled license information:

@jspm/core/nodelibs/browser/buffer.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
//# sourceMappingURL=index.js.map
