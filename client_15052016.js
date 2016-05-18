window.exposeInit();
(function (n) {
	function za(a) {
		var b = h.sockets[a];
		b.onopen = b.onclose = b.onmessage = b.onerror = function () {};
		for (var d = 0; d < b.events.length; ++d)
			y(b.events[d][1]);
		b.events = null;
		try {
			b.close()
		} catch (c) {}

		h.sockets[a] = null
	}
	function Aa(a) {
		ma || 0 > a.timeRemaining() || (Ba = a, ib(), n.requestIdleCallback(Aa))
	}
	function P(a) {
		var b = 4 * a.length + 1,
		d = z(b);
		Ca(a, d, b);
		return d
	}
	function Da() {
		ma || (jb(), setTimeout(Da, 1E3))
	}
	function kb(a) {
		eval.call(null, a)
	}
	function u(a, b) {
		a || K("Assertion failed: " + b)
	}
	function Ea(a) {
		var b = c["_" + a];
		if (!b)
			try {
				b = eval("_" + a)
			} catch (d) {}

		u(b, "Cannot call unknown function " + a + " (perhaps LLVM optimizations or closure removed it?)");
		return b
	}
	function Fa(a, b, d) {
		d = d || "i8";
		"*" === d.charAt(d.length - 1) && (d = "i32");
		switch (d) {
		case "i1":
			t[a >> 0] = b;
			break;
		case "i8":
			t[a >> 0] = b;
			break;
		case "i16":
			L[a >> 1] = b;
			break;
		case "i32":
			p[a >> 2] = b;
			break;
		case "i64":
			na = [b >>> 0, (Q = b, 1 <= +oa(Q) ? 0 < Q ? (lb(+pa(Q / 4294967296), 4294967295) | 0) >>> 0 : ~~+qa((Q -  + (~~Q >>> 0)) / 4294967296) >>> 0 : 0)];
			p[a >> 2] = na[0];
			p[a + 4 >> 2] = na[1];
			break;
		case "float":
			ba[a >> 2] = b;
			break;
		case "double":
			ca[a >>
				3] = b;
			break;
		default:
			K("invalid type for setValue: " + d)
		}
	}
	function Ga(a, b) {
		b = b || "i8";
		"*" === b.charAt(b.length - 1) && (b = "i32");
		switch (b) {
		case "i1":
			return t[a >> 0];
		case "i8":
			return t[a >> 0];
		case "i16":
			return L[a >> 1];
		case "i32":
			return p[a >> 2];
		case "i64":
			return p[a >> 2];
		case "float":
			return ba[a >> 2];
		case "double":
			return ca[a >> 3];
		default:
			K("invalid type for setValue: " + b)
		}
		return null
	}
	function E(a, b, d, c) {
		var g,
		e;
		"number" === typeof a ? (g = !0, e = a) : (g = !1, e = a.length);
		var l = "string" === typeof b ? b : null;
		d = 4 == d ? c : [z, k.ba, k.Da, k.D][void 0 === d ? 2 : d](Math.max(e, l ? 1 : b.length));
		if (g) {
			c = d;
			u(0 == (d & 3));
			for (a = d + (e & -4); c < a; c += 4)
				p[c >> 2] = 0;
			for (a = d + e; c < a; )
				t[c++ >> 0] = 0;
			return d
		}
		if ("i8" === l)
			return a.subarray || a.slice ? v.set(a, d) : v.set(new Uint8Array(a), d), d;
		c = 0;
		for (var q, f; c < e; ) {
			var h = a[c];
			"function" === typeof h && (h = k.Gb(h));
			g = l || b[c];
			0 === g ? c++ : ("i64" == g && (g = "i32"), Fa(d + c, h, g), f !== g && (q = k.ya(g), f = g), c += q)
		}
		return d
	}
	function C(a, b) {
		if (0 === b || !a)
			return "";
		for (var d = 0, r, g = 0; ; ) {
			r = v[a + g >> 0];
			d |= r;
			if (0 == r && !b)
				break;
			g++;
			if (b && g == b)
				break
		}
		b || (b = g);
		r = "";
		if (128 > d) {
			for (; 0 < b; )
				d = String.fromCharCode.apply(String, v.subarray(a, a + Math.min(b, 1024))), r = r ? r + d : d, a += 1024, b -= 1024;
			return r
		}
		return c.UTF8ToString(a)
	}
	function Ha(a, b) {
		for (var d, c, g, e, l, q, f = ""; ; ) {
			d = a[b++];
			if (!d)
				return f;
			d & 128 ? (c = a[b++] & 63, 192 == (d & 224) ? f += String.fromCharCode((d & 31) << 6 | c) : (g = a[b++] & 63, 224 == (d & 240) ? d = (d & 15) << 12 | c << 6 | g : (e = a[b++] & 63, 240 == (d & 248) ? d = (d & 7) << 18 | c << 12 | g << 6 | e : (l = a[b++] & 63, 248 == (d & 252) ? d = (d & 3) << 24 | c << 18 | g << 12 | e << 6 | l : (q = a[b++] & 63, d = (d & 1) << 30 | c << 24 | g << 18 | e << 12 | l << 6 | q))), 65536 > d ? f += String.fromCharCode(d) : (d -= 65536, f += String.fromCharCode(55296 | d >> 10, 56320 | d & 1023)))) : f += String.fromCharCode(d)
		}
	}
	function G(a) {
		return Ha(v, a)
	}
	function ra(a, b, d, c) {
		if (!(0 < c))
			return 0;
		var g = d;
		c = d + c - 1;
		for (var e = 0; e < a.length; ++e) {
			var l = a.charCodeAt(e);
			55296 <= l && 57343 >= l && (l = 65536 + ((l & 1023) << 10) | a.charCodeAt(++e) & 1023);
			if (127 >= l) {
				if (d >= c)
					break;
				b[d++] = l
			} else {
				if (2047 >= l) {
					if (d + 1 >= c)
						break;
					b[d++] = 192 | l >> 6
				} else {
					if (65535 >= l) {
						if (d + 2 >= c)
							break;
						b[d++] = 224 | l >> 12
					} else {
						if (2097151 >= l) {
							if (d + 3 >= c)
								break;
							b[d++] = 240 | l >> 18
						} else {
							if (67108863 >= l) {
								if (d + 4 >= c)
									break;
								b[d++] = 248 | l >> 24
							} else {
								if (d + 5 >= c)
									break;
								b[d++] = 252 | l >> 30;
								b[d++] = 128 | l >> 24 & 63
							}
							b[d++] = 128 | l >> 18 & 63
						}
						b[d++] = 128 | l >> 12 & 63
					}
					b[d++] = 128 | l >> 6 & 63
				}
				b[d++] = 128 | l & 63
			}
		}
		b[d] = 0;
		return d - g
	}
	function Ca(a, b, d) {
		return ra(a, v, b, d)
	}
	function Ia(a) {
		for (var b = 0, d = 0; d < a.length; ++d) {
			var c = a.charCodeAt(d);
			55296 <= c && 57343 >= c && (c = 65536 + ((c & 1023) << 10) | a.charCodeAt(++d) & 1023);
			127 >= c ? ++b : b = 2047 >= c ? b + 2 : 65535 >= c ? b + 3 : 2097151 >= c ? b + 4 : 67108863 >= c ? b + 5 : b + 6
		}
		return b
	}
	function mb(a) {
		function b(d, c, r) {
			c = c || Infinity;
			var g = "",
			e = [],
			l;
			if ("N" === a[q]) {
				q++;
				"K" === a[q] && q++;
				for (l = []; "E" !== a[q]; )
					if ("S" === a[q]) {
						q++;
						var m = a.indexOf("_", q);
						l.push(h[a.substring(q, m) || 0] || "?");
						q = m + 1
					} else if ("C" === a[q])
						l.push(l[l.length - 1]), q += 2;
					else {
						var m = parseInt(a.substr(q)),
						k = m.toString().length;
						if (!m || !k) {
							q--;
							break
						}
						var p = a.substr(q + k, m);
						l.push(p);
						h.push(p);
						q += k + m
					}
				q++;
				l = l.join("::");
				c--;
				if (0 === c)
					return d ? [l] : l
			} else if (("K" === a[q] || n && "L" === a[q]) && q++, m = parseInt(a.substr(q)))
				k = m.toString().length, l = a.substr(q + k, m), q += k + m;
			n = !1;
			"I" === a[q] ? (q++, m = b(!0), k = b(!0, 1, !0), g += k[0] + " " + l + "<" + m.join(", ") + ">") : g = l;
			a : for (; q < a.length && 0 < c--; )
				if (l = a[q++], l in f)
					e.push(f[l]);
				else
					switch (l) {
					case "P":
						e.push(b(!0, 1, !0)[0] + "*");
						break;
					case "R":
						e.push(b(!0, 1, !0)[0] + "&");
						break;
					case "L":
						q++;
						m = a.indexOf("E", q) - q;
						e.push(a.substr(q, m));
						q += m + 2;
						break;
					case "A":
						m = parseInt(a.substr(q));
						q += m.toString().length;
						if ("_" !== a[q])
							throw "?";
						q++;
						e.push(b(!0, 1, !0)[0] + " [" + m + "]");
						break;
					case "E":
						break a;
					default:
						g += "?" + l;
						break a
					}
			r || 1 !== e.length || "void" !== e[0] || (e = []);
			return d ? (g && e.push(g + "?"), e) : g + ("(" + e.join(", ") + ")")
		}
		var d = !!c._11edffd;
		if (d)
			try {
				var r = z(a.length);
				sa(a.substr(1), r);
				var g = z(4),
				e = c._11edffd(r, 0, 0, g);
				if (0 === Ga(g, "i32") && e)
					return C(e)
			} catch (l) {}

		finally {
			r && y(r),
			g && y(g),
			e && y(e)
		}
		var q = 3,
		f = {
			v : "void",
			b : "bool",
			c : "char",
			s : "short",
			i : "int",
			l : "long",
			f : "float",
			d : "double",
			w : "wchar_t",
			a : "signed char",
			h : "unsigned char",
			t : "unsigned short",
			j : "unsigned int",
			m : "unsigned long",
			x : "long long",
			y : "unsigned long long",
			z : "..."
		},
		h = [],
		n = !0,
		r = a;
		try {
			if ("Object._72a8556b" == a || "_72a8556b" == a)
				return "main()";
			"number" === typeof a && (a = C(a));
			if ("_" !== a[0] || "_" !== a[1] || "Z" !== a[2])
				return a;
			switch (a[3]) {
			case "n":
				return "operator new()";
			case "d":
				return "operator delete()"
			}
			r = b()
		} catch (p) {
			r += "?"
		}
		0 <= r.indexOf("?") && !d && k.K("warning: a problem occurred in builtin C++ name demangling; build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");
		return r
	}
	function nb(a) {
		return a.replace(/_347eef08[\w\d_]+/g, function (a) {
			var d = mb(a);
			return a === d ? a : a + " [" + d + "]"
		})
	}
	function ta() {
		var a = nb,
		b;
		a : {
			b = Error();
			if (!b.stack) {
				try {
					throw Error(0);
				} catch (d) {
					b = d
				}
				if (!b.stack) {
					b = "(no stack trace available)";
					break a
				}
			}
			b = b.stack.toString()
		}
		return a(b)
	}
	function ob(a) {
		0 < a % 4096 && (a += 4096 - a % 4096);
		return a
	}
	function R(a) {
		for (; 0 < a.length; ) {
			var b = a.shift();
			if ("function" == typeof b)
				b();
			else {
				var d = b.n;
				"number" === typeof d ? void 0 === b.A ? k.C("v", d) : k.C("vi", d, [b.A]) : d(void 0 === b.A ? null : b.A)
			}
		}
	}
	function Ka(a) {
		ua.unshift(a)
	}
	function La(a) {
		Ma.unshift(a)
	}
	function T(a, b, d) {
		d = Array(0 < d ? d : Ia(a) + 1);
		a = ra(a, d, 0, d.length);
		b && (d.length = a);
		return d
	}
	function sa(a, b, d) {
		a = T(a, d);
		for (d = 0; d < a.length; )
			t[b + d >> 0] = a[d], d += 1
	}
	function da(a, b) {
		for (var d = 0; d < a.length; d++)
			t[b++ >> 0] = a[d]
	}
	function Na(a, b, d) {
		for (var c = 0; c < a.length; ++c)
			t[b++ >> 0] = a.charCodeAt(c);
		d || (t[b >> 0] = 0)
	}
	function Oa() {
		H++;
		c.monitorRunDependencies && c.monitorRunDependencies(H)
	}
	function Pa() {
		H--;
		c.monitorRunDependencies && c.monitorRunDependencies(H);
		if (0 == H && (null !== va && (clearInterval(va), va = null), U)) {
			var a = U;
			U = null;
			a()
		}
	}
	function V() {
		return !!V.o
	}
	function W() {
		var a = w.X;
		if (!a)
			return (f.setTempRet0(0), 0) | 0;
		var b = w.p[a],
		d = b.type;
		if (!d)
			return (f.setTempRet0(0), a) | 0;
		var r = Array.prototype.slice.call(arguments);
		c._f30b51e(d);
		W.buffer || (W.buffer = z(4));
		p[W.buffer >> 2] = a;
		for (var a = W.buffer, g = 0; g < r.length; g++)
			if (r[g] && c._5674df60(r[g], d, a))
				return a = p[a >> 2], b.sa = a, (f.setTempRet0(r[g]), a) | 0;
		a = p[a >> 2];
		return (f.setTempRet0(d), a) | 0
	}
	function X(a) {
		return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400)
	}
	function ea(a, b) {
		for (var d = 0, c = 0; c <= b; d += a[c++]);
		return d
	}
	function Y(a, b) {
		for (var d = new Date(a.getTime()); 0 < b; ) {
			var c = d.getMonth(),
			g = (X(d.getFullYear()) ? fa : ga)[c];
			if (b > g - d.getDate())
				b -= g - d.getDate() + 1, d.setDate(1), 11 > c ? d.setMonth(c + 1) : (d.setMonth(0), d.setFullYear(d.getFullYear() + 1));
			else {
				d.setDate(d.getDate() + b);
				break
			}
		}
		return d
	}
	function Qa(a, b, d, c) {
		function g(a, b, d) {
			for (a = "number" === typeof a ? a.toString() : a || ""; a.length < b; )
				a = d[0] + a;
			return a
		}
		function e(a, b) {
			return g(a, b, "0")
		}
		function l(a, b) {
			function d(a) {
				return 0 > a ? -1 : 0 < a ? 1 : 0
			}
			var c;
			0 === (c = d(a.getFullYear() - b.getFullYear())) && 0 === (c = d(a.getMonth() - b.getMonth())) && (c = d(a.getDate() - b.getDate()));
			return c
		}
		function q(a) {
			switch (a.getDay()) {
			case 0:
				return new Date(a.getFullYear() - 1, 11, 29);
			case 1:
				return a;
			case 2:
				return new Date(a.getFullYear(), 0, 3);
			case 3:
				return new Date(a.getFullYear(), 0, 2);
			case 4:
				return new Date(a.getFullYear(), 0, 1);
			case 5:
				return new Date(a.getFullYear() - 1, 11, 31);
			case 6:
				return new Date(a.getFullYear() - 1, 11, 30)
			}
		}
		function f(a) {
			a = Y(new Date(a.k + 1900, 0, 1), a.fa);
			var b = q(new Date(a.getFullYear() + 1, 0, 4));
			return 0 >= l(q(new Date(a.getFullYear(), 0, 4)), a) ? 0 >= l(b, a) ? a.getFullYear() + 1 : a.getFullYear() : a.getFullYear() - 1
		}
		var h = p[c + 40 >> 2];
		c = {
			ib : p[c >> 2],
			hb : p[c + 4 >> 2],
			J : p[c + 8 >> 2],
			B : p[c + 12 >> 2],
			r : p[c + 16 >> 2],
			k : p[c + 20 >> 2],
			Ea : p[c + 24 >> 2],
			fa : p[c + 28 >> 2],
			Vb : p[c + 32 >> 2],
			gb : p[c + 36 >> 2],
			jb : h ? C(h) : ""
		};
		d = C(d);
		var h = {
			"%c" : "%a %b %d %H:%M:%S %Y",
			"%D" : "%m/%d/%y",
			"%F" : "%Y-%m-%d",
			"%h" : "%b",
			"%r" : "%I:%M:%S %p",
			"%R" : "%H:%M",
			"%T" : "%H:%M:%S",
			"%x" : "%m/%d/%y",
			"%X" : "%H:%M:%S"
		},
		k;
		for (k in h)
			d = d.replace(new RegExp(k, "g"), h[k]);
		var n = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
		Ja = "January February March April May June July August September October November December".split(" "),
		h = {
			"%a" : function (a) {
				return n[a.Ea].substring(0, 3)
			},
			"%A" : function (a) {
				return n[a.Ea]
			},
			"%b" : function (a) {
				return Ja[a.r].substring(0, 3)
			},
			"%B" : function (a) {
				return Ja[a.r]
			},
			"%C" : function (a) {
				return e((a.k + 1900) / 100 | 0, 2)
			},
			"%d" : function (a) {
				return e(a.B, 2)
			},
			"%e" : function (a) {
				return g(a.B, 2, " ")
			},
			"%g" : function (a) {
				return f(a).toString().substring(2)
			},
			"%G" : function (a) {
				return f(a)
			},
			"%H" : function (a) {
				return e(a.J, 2)
			},
			"%I" : function (a) {
				return e(13 > a.J ? a.J : a.J - 12, 2)
			},
			"%j" : function (a) {
				return e(a.B + ea(X(a.k + 1900) ? fa : ga, a.r - 1), 3)
			},
			"%m" : function (a) {
				return e(a.r + 1, 2)
			},
			"%M" : function (a) {
				return e(a.hb, 2)
			},
			"%n" : function () {
				return "\n"
			},
			"%p" : function (a) {
				return 0 < a.J && 13 > a.J ? "AM" : "PM"
			},
			"%S" : function (a) {
				return e(a.ib, 2)
			},
			"%t" : function () {
				return "\t"
			},
			"%u" : function (a) {
				return (new Date(a.k + 1900, a.r + 1, a.B, 0, 0, 0, 0)).getDay() || 7
			},
			"%U" : function (a) {
				var b = new Date(a.k + 1900, 0, 1),
				d = 0 === b.getDay() ? b : Y(b, 7 - b.getDay());
				a = new Date(a.k + 1900, a.r, a.B);
				return 0 > l(d, a) ? e(Math.ceil((31 - d.getDate() + (ea(X(a.getFullYear()) ? fa : ga, a.getMonth() - 1) - 31) + a.getDate()) / 7), 2) : 0 === l(d, b) ? "01" : "00"
			},
			"%V" : function (a) {
				var b = q(new Date(a.k + 1900, 0, 4)),
				d = q(new Date(a.k + 1901, 0, 4)),
				c = Y(new Date(a.k + 1900, 0, 1), a.fa);
				return 0 > l(c, b) ? "53" : 0 >= l(d, c) ? "01" : e(Math.ceil((b.getFullYear() < a.k + 1900 ? a.fa + 32 - b.getDate() : a.fa + 1 - b.getDate()) / 7), 2)
			},
			"%w" : function (a) {
				return (new Date(a.k + 1900, a.r + 1, a.B, 0, 0, 0, 0)).getDay()
			},
			"%W" : function (a) {
				var b = new Date(a.k, 0, 1),
				d = 1 === b.getDay() ? b :
					Y(b, 0 === b.getDay() ? 1 : 7 - b.getDay() + 1);
				a = new Date(a.k + 1900, a.r, a.B);
				return 0 > l(d, a) ? e(Math.ceil((31 - d.getDate() + (ea(X(a.getFullYear()) ? fa : ga, a.getMonth() - 1) - 31) + a.getDate()) / 7), 2) : 0 === l(d, b) ? "01" : "00"
			},
			"%y" : function (a) {
				return (a.k + 1900).toString().substring(2)
			},
			"%Y" : function (a) {
				return a.k + 1900
			},
			"%z" : function (a) {
				a = a.gb;
				var b = 0 <= a;
				a = Math.abs(a) / 60;
				return (b ? "+" : "-") + String("0000" + (a / 60 * 100 + a % 60)).slice(-4)
			},
			"%Z" : function (a) {
				return a.jb
			},
			"%%" : function () {
				return "%"
			}
		};
		for (k in h)
			0 <= d.indexOf(k) && (d = d.replace(new RegExp(k, "g"), h[k](c)));
		k = T(d, !1);
		if (k.length > b)
			return 0;
		da(k, a);
		return k.length - 1
	}
	function ha(a, b) {
		e.g.qa = a;
		e.g.ea = b;
		if (!e.g.n)
			return 1;
		if (0 == a)
			e.g.q = function () {
				setTimeout(e.g.aa, b)
			},
		e.g.method = "timeout";
		else if (1 == a)
			e.g.q = function () {
				e.requestAnimationFrame(e.g.aa)
			},
		e.g.method = "rAF";
		else if (2 == a) {
			if (!n.setImmediate) {
				var d = [];
				n.addEventListener("message", function (a) {
					a.source === n && "_ec57933" === a.data && (a.stopPropagation(), d.shift()())
				}, !0);
				n.setImmediate = function (a) {
					d.push(a);
					n.postMessage("_ec57933", "*")
				}
			}
			e.g.q = function () {
				n.setImmediate(e.g.aa)
			};
			e.g.method = "immediate"
		}
		return 0
	}
	function Ra(a, b, d, r, g) {
		c.noExitRuntime = !0;
		u(!e.g.n, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
		e.g.n = a;
		e.g.A = r;
		var m = e.g.M;
		e.g.aa = function () {
			if (!A)
				if (0 < e.g.Ca.length) {
					var b = Date.now(),
					d = e.g.Ca.shift();
					d.n(d.A);
					if (e.g.Z) {
						var g = e.g.Z,
						f = 0 == g % 1 ? g - 1 : Math.floor(g);
						e.g.Z = d.xb ? f : (8 * g + (f + .5)) / 9
					}
					console.log('main loop blocker "' +
						d.name + '" took ' + (Date.now() - b) + " ms");
					e.g.kb();
					setTimeout(e.g.aa, 0)
				} else
					m < e.g.M || (e.g.ja = e.g.ja + 1 | 0, 1 == e.g.qa && 1 < e.g.ea && 0 != e.g.ja % e.g.ea ? e.g.q() : ("timeout" === e.g.method && c.ia && (c.P("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!"), e.g.method = ""), e.g.$a(function () {
								"undefined" !== typeof r ? k.C("vi", a, [r]) : k.C("v", a)
							}), m < e.g.M || ("object" === typeof SDL && SDL.audio && SDL.audio.Xa && SDL.audio.Xa(), e.g.q())))
		};
		g || (b && 0 < b ? ha(0, 1E3 / b) : ha(1, 1), e.g.q());
		if (d)
			throw "SimulateInfiniteLoop";
	}
	function M() {
		M.actual || ("undefined" !== typeof dateNow ? M.actual = dateNow : "object" === typeof self && self.performance && "function" === typeof self.performance.now ? M.actual = function () {
			return self.performance.now()
		}
			 : "object" === typeof performance && "function" === typeof performance.now ? M.actual = function () {
			return performance.now()
		}
			 : M.actual = Date.now);
		return M.actual()
	}
	function z(a) {
		return k.D(a + 8) + 8 & 4294967288
	}
	function Sa(a) {
		c._175061b4 && (p[c._175061b4() >> 2] = a);
		return a
	}
	function ia(a) {
		var b = ia;
		b.o || (B = ob(B), b.o = !0, u(k.D), b.Ma = k.D, k.D = function () {
			K("cannot dynamically allocate, sbrk now has control")
		});
		var d = B;
		return 0 == a || b.Ma(a) ? d : 4294967295
	}
	function S(a) {
		this.name = "ExitStatus";
		this.message = "Program terminated with exit(" + a + ")";
		this.status = a
	}
	function wa(a) {
		function b() {
			if (!c.calledRun && (c.calledRun = !0, !A)) {
				Z || (Z = !0, R(ja));
				R(Ta);
				if (c.onRuntimeInitialized)
					c.onRuntimeInitialized();
				c._72a8556b && Ua && c.callMain(a);
				if (c.postRun)
					for ("function" == typeof c.postRun && (c.postRun = [c.postRun]); c.postRun.length; )
						La(c.postRun.shift());
				R(Ma)
			}
		}
		a = a || c.arguments;
		null === Va && (Va = Date.now());
		if (!(0 < H)) {
			if (c.preRun)
				for ("function" == typeof c.preRun && (c.preRun = [c.preRun]); c.preRun.length; )
					Ka(c.preRun.shift());
			R(ua);
			0 < H || c.calledRun || (c.setStatus ? (c.setStatus("Running..."), setTimeout(function () {
						setTimeout(function () {
							c.setStatus("")
						}, 1);
						b()
					}, 1)) : b())
		}
	}
	function Wa(a, b) {
		if (!b || !c.noExitRuntime) {
			if (!c.noExitRuntime && (A = !0, D = pb, R(Xa), c.onExit))
				c.onExit(a);
			throw new S(a);
		}
	}
	function K(a) {
		void 0 !== a ? (c.print(a), c.P(a), a = JSON.stringify(a)) : a = "";
		A = !0;
		var b = "abort(" + a + ") at " + ta() + "\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";
		Ya && Ya.forEach(function (d) {
			b = d(b, a)
		});
		throw b;
	}
	arguments = [];
	var h = window.agar.h = {
		e : [],
		images : [],
		sockets : []
	},
	ma = !1,
	qb = function () {
		function a() {
			if (!b) {
				b = !0;
				var a = document.body,
				d = document.body.firstChild,
				e = document.getElementById("fontdetectHelper") || document.createElement("div");
				e.id = "fontdetectHelper";
				c = document.createElement("span");
				c.innerText = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
				e.appendChild(c);
				a.insertBefore(e, d);
				e.style.position = "absolute";
				e.style.visibility = "hidden";
				e.style.top = "-200px";
				e.style.left = "-100000px";
				e.style.width = "100000px";
				e.style.height = "200px";
				e.style.fontSize = "100px"
			}
		}
		var b = !1,
		d = ["serif", "sans-serif", "monospace", "cursive", "fantasy"],
		c = null;
		return {
			Nb : function (d, c, e, r) {
				if (d) {
					var f = r && r.Va ? r.Va : 100,
					h = r && r.Wa ? r.Wa : 2E3;
					if (c || e) {
						if (b || a(), this.W(d))
							return void(c && c(d));
						var k = this,
						n = (new Date).getTime(),
						p = setInterval(function () {
								if (k.W(d))
									return clearInterval(p), void c(d);
								(new Date).getTime() - n > h && (clearInterval(p), e && e(d))
							}, f)
					}
				}
			},
			W : function (e) {
				var m = 0,
				l = 0;
				b || a();
				for (var q = 0; q < d.length; ++q) {
					if (c.style.fontFamily = '"' + e + '",' + d[q], m = c.offsetWidth, 0 < q && m != l)
						return !1;
					l = m
				}
				return !0
			},
			$b : function (a) {
				a = (a instanceof Element ? n.getComputedStyle(a).getPropertyValue("font-family") : n.o ? $(a).yb("font-family") : "").split(",");
				for (var b = a.shift(); b; ) {
					for (var b = b.replace(/^\s*['"]?\s*([^'"]*)\s*['"]?\s*$/, "$1"), c = 0; c < d.length; c++)
						if (b == d[c])
							return b;
					if (this.W(b))
						return b;
					b = a.shift()
				}
				return null
			}
		}
	}
	(),
	xa = !1,
	Ba = null;
	"undefined" == typeof c && (c = {});
	c.postRun = c.preRun || [];
	c.postRun.push(function () {
		"requestIdleCallback" in n && n.requestIdleCallback(Aa)
	});
	var c = c || {};
	c.postRun = c.postRun || [];
	c.postRun.push(function () {
		console.log("postRun");
		n.core = {
			connect : function (a) {
				a = P(a);
				rb(a);
				y(a)
			},
			sendNick : function (a) {
				a = P(a);
				sb(a);
				y(a)
			},
			sendSpectate : function () {
				tb()
			},
			setTarget : function (a, b) {
				ub(a, b)
			},
			playerZoom : function (a) {
				vb(a)
			},
			split : function () {
				wb()
			},
			eject : function () {
				xb()
			},
			specialOn : function () {
				yb()
			},
			specialOff : function () {
				zb()
			},
			registerSkin : function (a, b, d, c, e) {
				a = a ? P(a.toLowerCase()) : 0;
				b = b ? P(b) : 0;
				d = P(d);
				Ab(a, b, d, c, e | 0);
				y(a);
				y(b);
				y(d)
			},
			proxyMobileData : function (a) {
				var b = z(a.length);
				v.set(a, b);
				Bb(b, a.length);
				y(b)
			},
			setFadeout : function (a) {
				Cb(a)
			},
			setShowMass : function (a) {
				Db(a)
			},
			setDarkTheme : function (a) {
				Eb(a)
			},
			setNames : function (a) {
				Fb(a)
			},
			setColors : function (a) {
				Gb(!a)
			},
			setSkins : function (a) {
				Hb(a)
			},
			setAcid : function (a) {
				Ib(a)
			},
			sendCaptchaResponse : function (a) {
				a = P(a);
				Jb(a);
				y(a)
			},
			destroy : function () {
				delete n.core;
				ma = !0;
				try {
					Kb()
				} catch (a) {}

				for (var b = 0; b < h.sockets.length; ++b)
					null != h.sockets[b] && za(b)
			}
		};
		setTimeout(Da, 1E3);
		if (n.MC && n.MC.onAgarioCoreLoaded)
			n.MC.onAgarioCoreLoaded()
	});
	c.noExitRuntime = !0;
	c.print = function (a) {
		console.log(a)
	};
	c.printErr = function (a) {
		console.error(a)
	};
	c.setStatus = function (a) {
		console.log(a)
	};
	c.totalDependencies = 0;
	c.monitorRunDependencies = function (a) {
		console.log(a + " dependencies left")
	};
	c.setStatus("Downloading agario.core.js...");
	c || (c = eval("(function() { try { return Module || {} } catch(e) { return {} } })()"));
	var ka = {},
	I;
	for (I in c)
		c.hasOwnProperty(I) && (ka[I] = c[I]);
	c.read = function (a) {
		var b = new XMLHttpRequest;
		b.open("GET", a, !1);
		b.send(null);
		return b.responseText
	};
	"undefined" != typeof arguments && (c.arguments = arguments);
	"undefined" !== typeof console ? (c.print || (c.print = function (a) {
			console.log(a)
		}), c.printErr || (c.printErr = function (a) {
			console.log(a)
		})) : c.print || (c.print = function () {});
	"undefined" === typeof c.setWindowTitle && (c.setWindowTitle = function (a) {
		document.title = a
	});
	!c.load && c.read && (c.load = function (a) {
		kb(c.read(a))
	});
	c.print || (c.print = function () {});
	c.printErr || (c.printErr = c.print);
	c.arguments || (c.arguments = []);
	c.thisProgram || (c.thisProgram = "./this.program");
	c.print = c.print;
	c.P = c.printErr;
	c.preRun = [];
	c.postRun = [];
	for (I in ka)
		ka.hasOwnProperty(I) && (c[I] = ka[I]);
	var k = {
		eb : function (a) {
			Za = a
		},
		Qa : function () {
			return Za
		},
		pa : function () {
			return D
		},
		da : function (a) {
			D = a
		},
		ya : function (a) {
			switch (a) {
			case "i1":
			case "i8":
				return 1;
			case "i16":
				return 2;
			case "i32":
				return 4;
			case "i64":
				return 8;
			case "float":
				return 4;
			case "double":
				return 8;
			default:
				return "*" === a[a.length - 1] ? k.u : "i" === a[0] ? (a = parseInt(a.substr(1)), u(0 === a % 8), a / 8) : 0
			}
		},
		Pa : function (a) {
			return Math.max(k.ya(a), k.u)
		},
		ob : 16,
		Pb : function (a, b) {
			"double" === b || "i64" === b ? a & 7 && (u(4 === (a & 7)), a += 4) : u(0 === (a & 3));
			return a
		},
		Db : function (a, b, d) {
			return d || "i64" != a && "double" != a ? a ? Math.min(b || (a ? k.Pa(a) : 0), k.u) : Math.min(b, 8) : 8
		},
		C : function (a, b, d) {
			return d && d.length ? (d.splice || (d = Array.prototype.slice.call(d)), d.splice(0, 0, b), c["dynCall_" + a].apply(null, d)) : c["dynCall_" + a].call(null, b)
		},
		T : [],
		Ha : function (a) {
			for (var b = 0; b < k.T.length; b++)
				if (!k.T[b])
					return k.T[b] = a, 2 * (1 + b);
			throw "Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.";
		},
		Ya : function (a) {
			k.T[(a - 2) / 2] = null
		},
		K : function (a) {
			k.K.o || (k.K.o = {});
			k.K.o[a] || (k.K.o[a] = 1, c.P(a))
		},
		ka : {},
		Fb : function (a, b) {
			u(b);
			k.ka[b] || (k.ka[b] = {});
			var d = k.ka[b];
			d[a] || (d[a] = function () {
				return k.C(b, a, arguments)
			});
			return d[a]
		},
		Eb : function () {
			throw "You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work";
		},
		ba : function (a) {
			var b = D;
			D = D + a | 0;
			D = D + 15 & -16;
			return b
		},
		Da : function (a) {
			var b = N;
			N = N + a | 0;
			N = N + 15 & -16;
			return b
		},
		D : function (a) {
			var b = B;
			B = B + a | 0;
			B = B + 15 & -16;
			if (a = B >= O)
				K("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + O + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which adjusts the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 "), a = !0;
			return a ? (B = b, 0) : b
		},
		ha : function (a, b) {
			return Math.ceil(a / (b ? b : 16)) * (b ? b : 16)
		},
		Kb : function (a, b, d) {
			return d ?  + (a >>> 0) + 4294967296 *  + (b >>> 0) :  + (a >>> 0) + 4294967296 *  + (b | 0)
		},
		ga : 8,
		u : 4,
		pb : 0
	};
	c.Runtime = k;
	k.addFunction = k.Ha;
	k.removeFunction = k.Ya;
	var A = !1,
	Q,
	na,
	Za,
	$a,
	ab;
	(function () {
		function a(a) {
			a = a.toString().match(c).slice(1);
			return {
				arguments : a[0],
				body : a[1],
				returnValue : a[2]
			}
		}
		var b = {
			stackSave : function () {
				k.pa()
			},
			stackRestore : function () {
				k.da()
			},
			arrayToC : function (a) {
				var b = k.ba(a.length);
				da(a, b);
				return b
			},
			stringToC : function (a) {
				var b = 0;
				null !== a && void 0 !== a && 0 !== a && (b = k.ba((a.length << 2) + 1), sa(a, b));
				return b
			}
		},
		d = {
			string : b.stringToC,
			array : b.arrayToC
		};
		ab = function (a, b, c, e, r) {
			a = Ea(a);
			var g = [],
			m = 0;
			if (e)
				for (var f = 0; f < e.length; f++) {
					var h = d[c[f]];
					h ? (0 === m && (m = k.pa()), g[f] = h(e[f])) : g[f] = e[f]
				}
			c = a.apply(null, g);
			"string" === b && (c = C(c));
			if (0 !== m) {
				if (r && r.async) {
					EmterpreterAsync.rb.push(function () {
						k.da(m)
					});
					return
				}
				k.da(m)
			}
			return c
		};
		var c = /^function\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/,
		e = {},
		m;
		for (m in b)
			b.hasOwnProperty(m) && (e[m] = a(b[m]));
		$a = function (b, d, c) {
			c = c || [];
			var r = Ea(b);
			b = c.every(function (a) {
					return "number" === a
				});
			var m = "string" !== d;
			if (m && b)
				return r;
			var f = c.map(function (a, b) {
					return "$" + b
				});
			d = "(function(" + f.join(",") + ") {";
			var h = c.length;
			if (!b) {
				d += "var stack = " + e.stackSave.body + ";";
				for (var k = 0; k < h; k++) {
					var n = f[k],
					p = c[k];
					"number" !== p && (p = e[p + "ToC"], d += "var " + p.arguments + " = " + n + ";", d += p.body + ";", d += n + "=" + p.returnValue + ";")
				}
			}
			c = a(function () {
					return r
				}).returnValue;
			d += "var ret = " + c + "(" + f.join(",") + ");";
			m || (c = a(function () {
						return C
					}).returnValue, d += "ret = " + c + "(ret);");
			b || (d += e.stackRestore.body.replace("()", "(stack)") + ";");
			return eval(d + "return ret})")
		}
	})();
	c.ccall = ab;
	c.cwrap = $a;
	c.setValue = Fa;
	c.getValue = Ga;
	c.ALLOC_NORMAL = 0;
	c.ALLOC_STACK = 1;
	c.ALLOC_STATIC = 2;
	c.ALLOC_DYNAMIC = 3;
	c.ALLOC_NONE = 4;
	c.allocate = E;
	c.getMemory = function (a) {
		return bb ? "undefined" !== typeof ia && !ia.o || !Z ? k.D(a) : z(a) : k.Da(a)
	};
	c.Pointer_stringify = C;
	c.AsciiToString = function (a) {
		for (var b = ""; ; ) {
			var d = t[a++ >> 0];
			if (!d)
				return b;
			b += String.fromCharCode(d)
		}
	};
	c.stringToAscii = function (a, b) {
		return Na(a, b, !1)
	};
	c.UTF8ArrayToString = Ha;
	c.UTF8ToString = G;
	c.stringToUTF8Array = ra;
	c.stringToUTF8 = Ca;
	c.lengthBytesUTF8 = Ia;
	c.UTF16ToString = function (a) {
		for (var b = 0, d = ""; ; ) {
			var c = L[a + 2 * b >> 1];
			if (0 == c)
				return d;
			++b;
			d += String.fromCharCode(c)
		}
	};
	c.stringToUTF16 = function (a, b, d) {
		void 0 === d && (d = 2147483647);
		if (2 > d)
			return 0;
		d -= 2;
		var c = b;
		d = d < 2 * a.length ? d / 2 : a.length;
		for (var e = 0; e < d; ++e)
			L[b >> 1] = a.charCodeAt(e), b += 2;
		L[b >> 1] = 0;
		return b - c
	};
	c.lengthBytesUTF16 = function (a) {
		return 2 * a.length
	};
	c.UTF32ToString = function (a) {
		for (var b = 0, d = ""; ; ) {
			var c = p[a + 4 * b >> 2];
			if (0 == c)
				return d;
			++b;
			65536 <= c ? (c = c - 65536, d += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023)) : d += String.fromCharCode(c)
		}
	};
	c.stringToUTF32 = function (a, b, d) {
		void 0 === d && (d = 2147483647);
		if (4 > d)
			return 0;
		var c = b;
		d = c + d - 4;
		for (var e = 0; e < a.length; ++e) {
			var m = a.charCodeAt(e);
			if (55296 <= m && 57343 >= m)
				var l = a.charCodeAt(++e), m = 65536 + ((m & 1023) << 10) | l & 1023;
			p[b >> 2] = m;
			b += 4;
			if (b + 4 > d)
				break
		}
		p[b >> 2] = 0;
		return b - c
	};
	c.lengthBytesUTF32 = function (a) {
		for (var b = 0, c = 0; c < a.length; ++c) {
			var e = a.charCodeAt(c);
			55296 <= e && 57343 >= e && ++c;
			b += 4
		}
		return b
	};
	c.stackTrace = ta;
	for (var t, v, L, cb, p, aa, ba, ca, db = 0, N = 0, bb = !1, eb = 0, D = 0, ya = 0, fb = 0, B = 0, gb = c.TOTAL_STACK || 5242880, O = c.TOTAL_MEMORY || 67108864, F = 65536; F < O || F < 2 * gb; )
		F = 16777216 > F ? 2 * F : F + 16777216;
	F !== O && (O = F);
	u("undefined" !== typeof Int32Array && "undefined" !== typeof Float64Array && !!(new Int32Array(1)).subarray && !!(new Int32Array(1)).set, "JS engine does not provide full typed array support");
	var x;
	x = window.agar.buffer = new ArrayBuffer(O);
	t = new Int8Array(x);
	L = new Int16Array(x);
	p = new Int32Array(x);
	v = new Uint8Array(x);
	cb = new Uint16Array(x);
	aa = new Uint32Array(x);
	ba = new Float32Array(x);
	ca = new Float64Array(x);
	p[0] = 255;
	u(255 === v[0] && 0 === v[3], "Typed arrays 2 must be run on a little-endian system");
	c.HEAP = void 0;
	c.buffer = x;
	c.HEAP8 = t;
	c.HEAP16 = L;
	c.HEAP32 = p;
	c.HEAPU8 = v;
	c.HEAPU16 = cb;
	c.HEAPU32 = aa;
	c.HEAPF32 = ba;
	c.HEAPF64 = ca;
	var ua = [],
	ja = [],
	Ta = [],
	Xa = [],
	Ma = [],
	Z = !1;
	c.addOnPreRun = Ka;
	c.addOnInit = function (a) {
		ja.unshift(a)
	};
	c.addOnPreMain = function (a) {
		Ta.unshift(a)
	};
	c.addOnExit = function (a) {
		Xa.unshift(a)
	};
	c.addOnPostRun = La;
	c.intArrayFromString = T;
	c.intArrayToString = function (a) {
		for (var b = [], c = 0; c < a.length; c++) {
			var e = a[c];
			255 < e && (e &= 255);
			b.push(String.fromCharCode(e))
		}
		return b.join("")
	};
	c.writeStringToMemory = sa;
	c.writeArrayToMemory = da;
	c.writeAsciiToMemory = Na;
	Math.imul && -5 === Math.imul(4294967295, 5) || (Math.imul = function (a, b) {
		var c = a & 65535,
		e = b & 65535;
		return c * e + ((a >>> 16) * e + c * (b >>> 16) << 16) | 0
	});
	Math.Jb = Math.imul;
	Math.clz32 || (Math.clz32 = function (a) {
		a = a >>> 0;
		for (var b = 0; 32 > b; b++)
			if (a & 1 << 31 - b)
				return b;
		return 32
	});
	Math.wb = Math.clz32;
	var oa = Math.abs,
	Lb = Math.cos,
	Mb = Math.sin,
	Nb = Math.atan2,
	qa = Math.ceil,
	pa = Math.floor,
	Ob = Math.pow,
	lb = Math.min,
	H = 0,
	va = null,
	U = null;
	c.addRunDependency = Oa;
	c.removeRunDependency = Pa;
	c.preloadedImages = {};
	c.preloadedAudios = {};
	var J = window.agar.functions = [function (a) {
				h.e[a] = null
			}, function () {
				for (var a = document.createElement("canvas").getContext("2d"), b = 0; b < h.e.length; ++b)
					if (null == h.e[b])
						return h.e[b] = a, b;
				h.e.push(a);
				return h.e.length - 1
			}, function (a, b, c) {
				a = h.e[a].canvas;
				a.width = b;
				a.height = c
			}, function (a, b, c) {
				a = h.e[a].canvas;
				p[b >> 2] = a.width;
				p[c >> 2] = a.height
			}, function (a) {
				h.e[a].save()
			}, function (a) {
				h.e[a].restore()
			}, function (a) {
				h.e[a].fill()
			}, function (a) {
				h.e[a].stroke()
			}, function (a) {
				h.e[a].clip()
			}, function (a) {
				h.e[a].beginPath()
			}, function (a) {
				h.e[a].closePath()
			}, function (a, b, c, e, g) {
				h.e[a].clearRect(b, c, e, g)
			}, function (a, b, c, e, g) {
				h.e[a].fillRect(b, c, e, g)
			}, function (a, b, c, e) {
				h.e[a].fillStyle = "rgb(" + b + "," + c + "," + e + ")"
			}, function (a, b, c, e) {
				h.e[a].strokeStyle = "rgb(" + b + "," + c + "," + e + ")"
			}, function (a, b) {
				h.e[a].globalAlpha = b
			}, function (a, b, c) {
				h.e[a].moveTo(b, c)
			}, function (a, b, c) {
				h.e[a].lineTo(b, c)
			}, function (a, b, c, e, g, m, l) {
				h.e[a].arc(b, c, e, g, m, l)
			}, function (a, b, c) {
				h.e[a].scale(b, c)
			}, function (a, b, c) {
				h.e[a].translate(b, c)
			}, function (a, b) {
				h.e[a].lineWidth = b
			}, function (a, b, c, e) {
				h.e[a].drawImage(h.e[b].canvas, c, e)
			}, function (a, b, c, e, g, m) {
				b = h.e[b].canvas;
				h.e[a].drawImage(b, 0, 0, b.width, b.height, c, e, g, m)
			}, function (a, b, c, e, g, m) {
				b = h.images[b];
				b.complete && h.e[a].drawImage(b, 0, 0, b.width, b.height, c, e, g, m)
			}, function (a, b, c, e) {
				h.e[a].fillText(G(b), c, e)
			}, function (a, b, c, e) {
				h.e[a].strokeText(G(b), c, e)
			}, function (a, b) {
				return h.e[a].measureText(G(b)).width
			}, function (a, b) {
				h.e[a].font = ~~b + "px Ubuntu"
			}, function (a) {
				h.e[a].lineCap = "butt"
			}, function (a) {
				h.e[a].lineCap = "round"
			}, function (a) {
				h.e[a].lineCap = "square"
			}, function (a) {
				h.e[a].lineJoin = "round"
			}, function (a) {
				h.e[a].lineJoin = "bevel"
			}, function (a) {
				h.e[a].lineJoin = "miter"
			}, function (a) {
				h.e[a].textBaseline = "top"
			}, function (a) {
				h.e[a].textBaseline = "hanging"
			}, function (a) {
				h.e[a].textBaseline = "middle"
			}, function (a) {
				h.e[a].textBaseline = "alphabetic"
			}, function (a) {
				h.e[a].textBaseline = "ideographic"
			}, function (a) {
				h.e[a].textBaseline = "bottom"
			}, function (a) {
				a = document.getElementById(G(a));
				if (null == a)
					return -1;
				a = a.getContext("2d");
				for (var b = 0; b < h.e.length; ++b)
					if (null == h.e[b])
						return h.e[b] = a, b;
				h.e.push(a);
				return h.e.length - 1
			}, function () {
				xa || (xa = qb.W("Ubuntu"));
				return xa
			}, function (a) {
				var b = new Image;
				b.src = G(a);
				for (a = 0; a < h.images.length; ++a)
					if (null == h.images[a])
						return h.images[a] = b, a;
				h.images.push(b);
				return h.images.length - 1
			}, function (a, b, c, e) {
				a = h.images[a];
				v[b >> 0] = (a.complete && 0 < a.width) | 0;
				p[c >> 2] = a.width;
				p[e >> 2] = a.height
			}, function (a) {
				var b = new WebSocket(G(a));
				b.binaryType = "arraybuffer";
				b.events = [];
				b.onopen = function () {
					b.events.push([2, 0, 0]);
					la()
				};
				b.onerror = function () {
					b.events.push([3, 0, 0]);
					la()
				};
				b.onclose = function () {
					b.events.push([4, 0, 0]);
					la()
				};
				b.onmessage = function (a) {
					a = new Uint8Array(a.data);
					var c = z(a.length);
					da(a, c);
					b.events.push([1, c, a.length]);
					la()
				};
				for (a = 0; a < h.sockets.length; ++a)
					if (null == h.sockets[a])
						return h.sockets[a] = b, a;
				h.sockets.push(b);
				return h.sockets.length - 1
			}, function (a) {
				za(a)
			}, function (a, b, c) {
				a = h.sockets[a];
				if (1 != a.readyState)
					return 0;
				a.send(t.subarray(b, b + c));
				return 1
			}, function (a, b, c) {
				a = h.sockets[a];
				if (0 == a.events.length)
					return 0;
				a = a.events.shift();
				aa[b >> 2] = a[1];
				p[c >> 2] = a[2];
				return a[0]
			}, function () {
				return 2 <= Ba.timeRemaining()
			}, function () {
				return Math.random()
			}, function () {
				if (n.MC && n.MC.onDisconnect)
					n.MC.onDisconnect()
			}, function () {
				n.MC && n.MC.doLogin && n.MC.doLogin()
			}, function () {
				n.MC && n.MC.corePendingReload && n.MC.corePendingReload()
			}, function () {
				n.logout && n.logout()
			}, function (a, b) {
				var c = v.subarray(a, a + b);
				if (n.MC && n.MC.onMobileData)
					n.MC.onMobileData(c)
			}, function (a) {
				n.MC && n.MC.updateServerVersion && n.MC.updateServerVersion(G(a))
			}, function (a, b) {
				return a % b
			}, function () {
				if (n.MC && n.MC.onPlayerSpawn)
					n.MC.onPlayerSpawn()
			}, function (a, b, c, e, g, m) {
				if (n.MC && n.MC.onPlayerDeath)
					n.MC.onPlayerDeath(a, b, c, e, g, m)
			}
		],
	db = 8,
	N = db + 24352;
	ja.push({
		n : function () {
			Pb()
		}
	}, {
		n : function () {
			Qb()
		}
	}, {
		n : function () {
			Rb()
		}
	}, {
		n : function () {
			Sb()
		}
	}, {
		n : function () {
			Tb()
		}
	});
	E([0, 0, 0, 0, 0, 0, 240, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 188, 14, 0, 0, 220, 73, 0, 0, 240, 2, 0, 0, 0, 0, 0, 0, 148, 14, 0, 0, 233, 73, 0, 0, 148, 14, 0, 0, 246, 73, 0, 0, 188, 14, 0, 0, 3, 74, 0, 0, 248, 2, 0, 0, 0, 0, 0, 0, 188, 14, 0, 0, 36, 74, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 188, 14, 0, 0, 70, 74, 0, 0, 16, 3, 0, 0, 0, 0, 0, 0, 188, 14, 0, 0, 107, 74, 0, 0, 16, 3, 0, 0, 0, 0, 0, 0, 148, 14, 0, 0, 27, 86, 0, 0, 148, 14, 0, 0, 45, 86, 0, 0, 188, 14, 0, 0, 127, 86, 0, 0, 64, 10, 0, 0, 0, 0, 0, 0, 228, 14, 0, 0, 149, 86, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 112, 9, 0, 0, 2, 0, 0, 0, 228, 14, 0, 0, 167, 86, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 120, 9, 0, 0, 2, 0, 0, 0, 228, 14, 0, 0, 201, 86, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 120, 9, 0, 0, 2, 0, 0, 0, 228, 14, 0, 0, 236, 86, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 120, 9, 0, 0, 2, 0, 0, 0, 188, 14, 0, 0, 15, 87, 0, 0, 192, 3, 0, 0, 0, 0, 0, 0, 188, 14, 0, 0, 49, 87, 0, 0, 192, 3, 0, 0, 0, 0, 0, 0, 228, 14, 0, 0, 84, 87, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 120, 9, 0, 0, 2, 0, 0, 0, 188, 14, 0, 0, 118, 87, 0, 0, 80, 3, 0, 0, 0, 0, 0, 0, 188, 14, 0, 0, 140, 87, 0, 0, 80, 3, 0, 0, 0, 0, 0, 0, 188, 14, 0, 0, 160, 87, 0, 0, 80, 3, 0, 0, 0, 0, 0, 0, 228, 14, 0, 0, 180, 87, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 112, 9, 0, 0, 2, 0, 0, 0, 188, 14, 0, 0, 198, 87, 0, 0, 80, 3, 0, 0, 0, 0, 0, 0, 188, 14, 0, 0, 219, 87, 0, 0, 80, 3, 0, 0, 0, 0, 0, 0, 228, 14, 0, 0, 240, 87, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 128, 9, 0, 0, 0, 0, 0, 0, 228, 14, 0, 0, 52, 88, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 152, 9, 0, 0, 0, 0, 0, 0, 228, 14, 0, 0, 120, 88, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 176, 9, 0, 0, 0, 0, 0, 0, 228, 14, 0, 0, 188, 88, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 200, 9, 0, 0, 0, 0, 0, 0, 228, 14, 0, 0, 0, 89, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 224, 9, 0, 0, 2, 0, 0, 0, 232, 9, 0, 0, 0, 8, 0, 0, 228, 14, 0, 0, 69, 89, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 224, 9, 0, 0, 2, 0, 0, 0, 240, 9, 0, 0, 0, 8, 0, 0, 228, 14, 0, 0, 138, 89, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 248, 9, 0, 0, 0, 8, 0, 0, 228, 14, 0, 0, 207, 89, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 248, 9, 0, 0, 0, 8, 0, 0, 228, 14, 0, 0, 20, 90, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 0, 10, 0, 0, 2, 0, 0, 0, 228, 14, 0, 0, 48, 90, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 0, 10, 0, 0, 2, 0, 0, 0, 228, 14, 0, 0, 76, 90, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 0, 10, 0, 0, 2, 0, 0, 0, 228, 14, 0, 0, 104, 90, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 0, 10, 0, 0, 2, 0, 0, 0, 228, 14, 0, 0, 132, 90, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 8, 10, 0, 0, 0, 0, 0, 0, 228, 14, 0, 0, 202, 90, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 16, 10, 0, 0, 0, 0, 0, 0, 228, 14, 0, 0, 16, 91, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 24, 10, 0, 0, 0, 0, 0, 0, 228, 14, 0, 0, 86, 91, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 32, 10, 0, 0, 0, 0, 0, 0, 228, 14, 0, 0, 156, 91, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 40, 10, 0, 0, 2, 0, 0, 0, 228, 14, 0, 0, 177, 91, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 80, 3, 0, 0, 2, 0, 0, 0, 40, 10, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 148, 14, 0, 0, 232, 94, 0, 0, 148, 14, 0, 0, 209, 94, 0, 0, 228, 14, 0, 0, 187, 94, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 56, 10, 0, 0, 0, 0, 0, 0, 228, 14, 0, 0, 140, 94, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 56, 10, 0, 0, 0, 0, 0, 0, 228, 14, 0, 0, 118, 94, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 48, 10, 0, 0, 0, 0, 0, 0, 228, 14, 0, 0, 71, 94, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 48, 10, 0, 0, 0, 0, 0, 0, 148, 14, 0, 0, 52, 94, 0, 0, 148, 14, 0, 0, 18, 94, 0, 0, 148, 14, 0, 0, 240, 93, 0, 0, 148, 14, 0, 0, 219, 93, 0, 0, 148, 14, 0, 0, 198, 93, 0, 0, 148, 14, 0, 0, 173, 93, 0, 0, 148, 14, 0, 0, 148, 93, 0, 0, 148, 14, 0, 0, 123, 93, 0, 0, 148, 14, 0, 0, 98, 93, 0, 0, 148, 14, 0, 0, 74, 93, 0, 0, 148, 14, 0, 0, 93, 94, 0, 0, 148, 14, 0, 0, 162, 94, 0, 0, 148, 14, 0, 0, 253, 94, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 6, 0, 0, 0, 7, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 8, 0, 0, 0, 3, 0, 0, 0, 5, 0, 0, 0, 9, 0, 0, 0, 10, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 11, 0, 0, 0, 4, 0, 0, 0, 7, 0, 0, 0, 12, 0, 0, 0, 13, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 14, 0, 0, 0, 5, 0, 0, 0, 9, 0, 0, 0, 15, 0, 0, 0, 16, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 17, 0, 0, 0, 6, 0, 0, 0, 11, 0, 0, 0, 18, 0, 0, 0, 19, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 20, 0, 0, 0, 7, 0, 0, 0, 13, 0, 0, 0, 21, 0, 0, 0, 22, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 23, 0, 0, 0, 8, 0, 0, 0, 15, 0, 0, 0, 24, 0, 0, 0, 25, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 26, 0, 0, 0, 9, 0, 0, 0, 17, 0, 0, 0, 27, 0, 0, 0, 28, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 29, 0, 0, 0, 10, 0, 0, 0, 19, 0, 0, 0, 30, 0, 0, 0, 31, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 32, 0, 0, 0, 11, 0, 0, 0, 21, 0, 0, 0, 33, 0, 0, 0, 34, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 35, 0, 0, 0, 12, 0, 0, 0, 23, 0, 0, 0, 36, 0, 0, 0, 37, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 38, 0, 0, 0, 13, 0, 0, 0, 25, 0, 0, 0, 39, 0, 0, 0, 40, 0, 0, 0, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 41, 0, 0, 0, 14, 0, 0, 0, 27, 0, 0, 0, 42, 0, 0, 0, 43, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 44, 0, 0, 0, 15, 0, 0, 0, 29, 0, 0, 0, 45, 0, 0, 0, 46, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 47, 0, 0, 0, 48, 0, 0, 0, 56, 0, 0, 0, 248, 255, 255, 255, 0, 0, 0, 0, 49, 0, 0, 0, 50, 0, 0, 0, 192, 255, 255, 255, 192, 255, 255, 255, 0, 0, 0, 0, 51, 0, 0, 0, 52, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 53, 0, 0, 0, 54, 0, 0, 0, 192, 255, 255, 255, 192, 255, 255, 255, 0, 0, 0, 0, 55, 0, 0, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 57, 0, 0, 0, 58, 0, 0, 0, 31, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 16, 0, 0, 0, 17, 0, 0, 0, 2, 0, 0, 0, 18, 0, 0, 0, 19, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 184, 12, 0, 0, 132, 13, 0, 0, 244, 12, 0, 0, 8, 13, 0, 0, 192, 13, 0, 0, 212, 13, 0, 0, 172, 13, 0, 0, 152, 13, 0, 0, 224, 12, 0, 0, 204, 12, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 59, 0, 0, 0, 60, 0, 0, 0, 56, 0, 0, 0, 248, 255, 255, 255, 0, 0, 0, 0, 61, 0, 0, 0, 62, 0, 0, 0, 192, 255, 255, 255, 192, 255, 255, 255, 0, 0, 0, 0, 63, 0, 0, 0, 64, 0, 0, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 66, 0, 0, 0, 200, 255, 255, 255, 200, 255, 255, 255, 0, 0, 0, 0, 67, 0, 0, 0, 68, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1, 35, 69, 103, 137, 171, 205, 239, 254, 220, 186, 152, 118, 84, 50, 16, 240, 225, 210, 195, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 0, 0, 0, 70, 0, 0, 0, 20, 0, 0, 0, 32, 0, 0, 0, 71, 0, 0, 0, 72, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 224, 2, 0, 0, 73, 0, 0, 0, 74, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 3, 0, 0, 75, 0, 0, 0, 76, 0, 0, 0, 77, 0, 0, 0, 78, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 32, 3, 0, 0, 75, 0, 0, 0, 79, 0, 0, 0, 77, 0, 0, 0, 78, 0, 0, 0, 4, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 48, 3, 0, 0, 75, 0, 0, 0, 80, 0, 0, 0, 77, 0, 0, 0, 78, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 192, 3, 0, 0, 192, 4, 0, 0, 192, 5, 0, 0, 192, 6, 0, 0, 192, 7, 0, 0, 192, 8, 0, 0, 192, 9, 0, 0, 192, 10, 0, 0, 192, 11, 0, 0, 192, 12, 0, 0, 192, 13, 0, 0, 192, 14, 0, 0, 192, 15, 0, 0, 192, 16, 0, 0, 192, 17, 0, 0, 192, 18, 0, 0, 192, 19, 0, 0, 192, 20, 0, 0, 192, 21, 0, 0, 192, 22, 0, 0, 192, 23, 0, 0, 192, 24, 0, 0, 192, 25, 0, 0, 192, 26, 0, 0, 192, 27, 0, 0, 192, 28, 0, 0, 192, 29, 0, 0, 192, 30, 0, 0, 192, 31, 0, 0, 192, 0, 0, 0, 179, 1, 0, 0, 195, 2, 0, 0, 195, 3, 0, 0, 195, 4, 0, 0, 195, 5, 0, 0, 195, 6, 0, 0, 195, 7, 0, 0, 195, 8, 0, 0, 195, 9, 0, 0, 195, 10, 0, 0, 195, 11, 0, 0, 195, 12, 0, 0, 195, 13, 0, 0, 211, 14, 0, 0, 195, 15, 0, 0, 195, 0, 0, 12, 187, 1, 0, 12, 195, 2, 0, 12, 195, 3, 0, 12, 195, 4, 0, 12, 211, 144, 51, 0, 0, 120, 24, 0, 0, 120, 18, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 100, 0, 0, 0, 232, 3, 0, 0, 16, 39, 0, 0, 160, 134, 1, 0, 64, 66, 15, 0, 128, 150, 152, 0, 0, 225, 245, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 6, 0, 0, 0, 7, 0, 0, 0, 8, 0, 0, 0, 9, 0, 0, 0, 10, 0, 0, 0, 11, 0, 0, 0, 12, 0, 0, 0, 13, 0, 0, 0, 14, 0, 0, 0, 15, 0, 0, 0, 16, 0, 0, 0, 17, 0, 0, 0, 18, 0, 0, 0, 19, 0, 0, 0, 20, 0, 0, 0, 21, 0, 0, 0, 22, 0, 0, 0, 23, 0, 0, 0, 24, 0, 0, 0, 25, 0, 0, 0, 26, 0, 0, 0, 27, 0, 0, 0, 28, 0, 0, 0, 29, 0, 0, 0, 30, 0, 0, 0, 31, 0, 0, 0, 32, 0, 0, 0, 33, 0, 0, 0, 34, 0, 0, 0, 35, 0, 0, 0, 36, 0, 0, 0, 37, 0, 0, 0, 38, 0, 0, 0, 39, 0, 0, 0, 40, 0, 0, 0, 41, 0, 0, 0, 42, 0, 0, 0, 43, 0, 0, 0, 44, 0, 0, 0, 45, 0, 0, 0, 46, 0, 0, 0, 47, 0, 0, 0, 48, 0, 0, 0, 49, 0, 0, 0, 50, 0, 0, 0, 51, 0, 0, 0, 52, 0, 0, 0, 53, 0, 0, 0, 54, 0, 0, 0, 55, 0, 0, 0, 56, 0, 0, 0, 57, 0, 0, 0, 58, 0, 0, 0, 59, 0, 0, 0, 60, 0, 0, 0, 61, 0, 0, 0, 62, 0, 0, 0, 63, 0, 0, 0, 64, 0, 0, 0, 65, 0, 0, 0, 66, 0, 0, 0, 67, 0, 0, 0, 68, 0, 0, 0, 69, 0, 0, 0, 70, 0, 0, 0, 71, 0, 0, 0, 72, 0, 0, 0, 73, 0, 0, 0, 74, 0, 0, 0, 75, 0, 0, 0, 76, 0, 0, 0, 77, 0, 0, 0, 78, 0, 0, 0, 79, 0, 0, 0, 80, 0, 0, 0, 81, 0, 0, 0, 82, 0, 0, 0, 83, 0, 0, 0, 84, 0, 0, 0, 85, 0, 0, 0, 86, 0, 0, 0, 87, 0, 0, 0, 88, 0, 0, 0, 89, 0, 0, 0, 90, 0, 0, 0, 91, 0, 0, 0, 92, 0, 0, 0, 93, 0, 0, 0, 94, 0, 0, 0, 95, 0, 0, 0, 96, 0, 0, 0, 65, 0, 0, 0, 66, 0, 0, 0, 67, 0, 0, 0, 68, 0, 0, 0, 69, 0, 0, 0, 70, 0, 0, 0, 71, 0, 0, 0, 72, 0, 0, 0, 73, 0, 0, 0, 74, 0, 0, 0, 75, 0, 0, 0, 76, 0, 0, 0, 77, 0, 0, 0, 78, 0, 0, 0, 79, 0, 0, 0, 80, 0, 0, 0, 81, 0, 0, 0, 82, 0, 0, 0, 83, 0, 0, 0, 84, 0, 0, 0, 85, 0, 0, 0, 86, 0, 0, 0, 87, 0, 0, 0, 88, 0, 0, 0, 89, 0, 0, 0, 90, 0, 0, 0, 123, 0, 0, 0, 124, 0, 0, 0, 125, 0, 0, 0, 126, 0, 0, 0, 127], "i8", 4, k.ga);
	E([1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 6, 0, 0, 0, 7, 0, 0, 0, 8, 0, 0, 0, 9, 0, 0, 0, 10, 0, 0, 0, 11, 0, 0, 0, 12, 0, 0, 0, 13, 0, 0, 0, 14, 0, 0, 0, 15, 0, 0, 0, 16, 0, 0, 0, 17, 0, 0, 0, 18, 0, 0, 0, 19, 0, 0, 0, 20, 0, 0, 0, 21, 0, 0, 0, 22, 0, 0, 0, 23, 0, 0, 0, 24, 0, 0, 0, 25, 0, 0, 0, 26, 0, 0, 0, 27, 0, 0, 0, 28, 0, 0, 0, 29, 0, 0, 0, 30, 0, 0, 0, 31, 0, 0, 0, 32, 0, 0, 0, 33, 0, 0, 0, 34, 0, 0, 0, 35, 0, 0, 0, 36, 0, 0, 0, 37, 0, 0, 0, 38, 0, 0, 0, 39, 0, 0, 0, 40, 0, 0, 0, 41, 0, 0, 0, 42, 0, 0, 0, 43, 0, 0, 0, 44, 0, 0, 0, 45, 0, 0, 0, 46, 0, 0, 0, 47, 0, 0, 0, 48, 0, 0, 0, 49, 0, 0, 0, 50, 0, 0, 0, 51, 0, 0, 0, 52, 0, 0, 0, 53, 0, 0, 0, 54, 0, 0, 0, 55, 0, 0, 0, 56, 0, 0, 0, 57, 0, 0, 0, 58, 0, 0, 0, 59, 0, 0, 0, 60, 0, 0, 0, 61, 0, 0, 0, 62, 0, 0, 0, 63, 0, 0, 0, 64, 0, 0, 0, 97, 0, 0, 0, 98, 0, 0, 0, 99, 0, 0, 0, 100, 0, 0, 0, 101, 0, 0, 0, 102, 0, 0, 0, 103, 0, 0, 0, 104, 0, 0, 0, 105, 0, 0, 0, 106, 0, 0, 0, 107, 0, 0, 0, 108, 0, 0, 0, 109, 0, 0, 0, 110, 0, 0, 0, 111, 0, 0, 0, 112, 0, 0, 0, 113, 0, 0, 0, 114, 0, 0, 0, 115, 0, 0, 0, 116, 0, 0, 0, 117, 0, 0, 0, 118, 0, 0, 0, 119, 0, 0, 0, 120, 0, 0, 0, 121, 0, 0, 0, 122, 0, 0, 0, 91, 0, 0, 0, 92, 0, 0, 0, 93, 0, 0, 0, 94, 0, 0, 0, 95, 0, 0, 0, 96, 0, 0, 0, 97, 0, 0, 0, 98, 0, 0, 0, 99, 0, 0, 0, 100, 0, 0, 0, 101, 0, 0, 0, 102, 0, 0, 0, 103, 0, 0, 0, 104, 0, 0, 0, 105, 0, 0, 0, 106, 0, 0, 0, 107, 0, 0, 0, 108, 0, 0, 0, 109, 0, 0, 0, 110, 0, 0, 0, 111, 0, 0, 0, 112, 0, 0, 0, 113, 0, 0, 0, 114, 0, 0, 0, 115, 0, 0, 0, 116, 0, 0, 0, 117, 0, 0, 0, 118, 0, 0, 0, 119, 0, 0, 0, 120, 0, 0, 0, 121, 0, 0, 0, 122, 0, 0, 0, 123, 0, 0, 0, 124, 0, 0, 0, 125, 0, 0, 0, 126, 0, 0, 0, 127, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 5, 0, 0, 0, 7, 0, 0, 0, 11, 0, 0, 0, 13, 0, 0, 0, 17, 0, 0, 0, 19, 0, 0, 0, 23, 0, 0, 0, 29, 0, 0, 0, 31, 0, 0, 0, 37, 0, 0, 0, 41, 0, 0, 0, 43, 0, 0, 0, 47, 0, 0, 0, 53, 0, 0, 0, 59, 0, 0, 0, 61, 0, 0, 0, 67, 0, 0, 0, 71, 0, 0, 0, 73, 0, 0, 0, 79, 0, 0, 0, 83, 0, 0, 0, 89, 0, 0, 0, 97, 0, 0, 0, 101, 0, 0, 0, 103, 0, 0, 0, 107, 0, 0, 0, 109, 0, 0, 0, 113, 0, 0, 0, 127, 0, 0, 0, 131, 0, 0, 0, 137, 0, 0, 0, 139, 0, 0, 0, 149, 0, 0, 0, 151, 0, 0, 0, 157, 0, 0, 0, 163, 0, 0, 0, 167, 0, 0, 0, 173, 0, 0, 0, 179, 0, 0, 0, 181, 0, 0, 0, 191, 0, 0, 0, 193, 0, 0, 0, 197, 0, 0, 0, 199, 0, 0, 0, 211, 0, 0, 0, 1, 0, 0, 0, 11, 0, 0, 0, 13, 0, 0, 0, 17, 0, 0, 0, 19, 0, 0, 0, 23, 0, 0, 0, 29, 0, 0, 0, 31, 0, 0, 0, 37, 0, 0, 0, 41, 0, 0, 0, 43, 0, 0, 0, 47, 0, 0, 0, 53, 0, 0, 0, 59, 0, 0, 0, 61, 0, 0, 0, 67, 0, 0, 0, 71, 0, 0, 0, 73, 0, 0, 0, 79, 0, 0, 0, 83, 0, 0, 0, 89, 0, 0, 0, 97, 0, 0, 0, 101, 0, 0, 0, 103, 0, 0, 0, 107, 0, 0, 0, 109, 0, 0, 0, 113, 0, 0, 0, 121, 0, 0, 0, 127, 0, 0, 0, 131, 0, 0, 0, 137, 0, 0, 0, 139, 0, 0, 0, 143, 0, 0, 0, 149, 0, 0, 0, 151, 0, 0, 0, 157, 0, 0, 0, 163, 0, 0, 0, 167, 0, 0, 0, 169, 0, 0, 0, 173, 0, 0, 0, 179, 0, 0, 0, 181, 0, 0, 0, 187, 0, 0, 0, 191, 0, 0, 0, 193, 0, 0, 0, 197, 0, 0, 0, 199, 0, 0, 0, 209, 0, 0, 0, 0, 0, 0, 0, 72, 3, 0, 0, 81, 0, 0, 0, 82, 0, 0, 0, 31, 0, 0, 0, 1, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 16, 0, 0, 0, 17, 0, 0, 0, 2, 0, 0, 0, 22, 0, 0, 0, 19, 0, 0, 0, 4, 0, 0, 0, 3, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 64, 3, 0, 0, 83, 0, 0, 0, 84, 0, 0, 0, 0, 0, 0, 0, 48, 4, 0, 0, 85, 0, 0, 0, 86, 0, 0, 0, 87, 0, 0, 0, 1, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 4, 0, 0, 88, 0, 0, 0, 89, 0, 0, 0, 87, 0, 0, 0, 2, 0, 0, 0, 7, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 144, 4, 0, 0, 90, 0, 0, 0, 91, 0, 0, 0, 87, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 6, 0, 0, 0, 7, 0, 0, 0, 8, 0, 0, 0, 9, 0, 0, 0, 10, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 176, 4, 0, 0, 92, 0, 0, 0, 93, 0, 0, 0, 87, 0, 0, 0, 12, 0, 0, 0, 13, 0, 0, 0, 14, 0, 0, 0, 15, 0, 0, 0, 16, 0, 0, 0, 17, 0, 0, 0, 18, 0, 0, 0, 19, 0, 0, 0, 20, 0, 0, 0, 21, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 208, 4, 0, 0, 94, 0, 0, 0, 95, 0, 0, 0, 87, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 23, 0, 0, 0, 5, 0, 0, 0, 24, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 240, 4, 0, 0, 96, 0, 0, 0, 97, 0, 0, 0, 87, 0, 0, 0, 7, 0, 0, 0, 8, 0, 0, 0, 25, 0, 0, 0, 9, 0, 0, 0, 26, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 5, 0, 0, 98, 0, 0, 0, 99, 0, 0, 0, 87, 0, 0, 0, 23, 0, 0, 0, 27, 0, 0, 0, 28, 0, 0, 0, 29, 0, 0, 0, 30, 0, 0, 0, 31, 0, 0, 0, 1, 0, 0, 0, 248, 255, 255, 255, 16, 5, 0, 0, 24, 0, 0, 0, 25, 0, 0, 0, 26, 0, 0, 0, 27, 0, 0, 0, 28, 0, 0, 0, 29, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 5, 0, 0, 100, 0, 0, 0, 101, 0, 0, 0, 87, 0, 0, 0, 31, 0, 0, 0, 32, 0, 0, 0, 33, 0, 0, 0, 34, 0, 0, 0, 35, 0, 0, 0, 36, 0, 0, 0, 2, 0, 0, 0, 248, 255, 255, 255, 56, 5, 0, 0, 32, 0, 0, 0, 33, 0, 0, 0, 34, 0, 0, 0, 35, 0, 0, 0, 36, 0, 0, 0, 37, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 5, 0, 0, 102, 0, 0, 0, 103, 0, 0, 0, 87, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 5, 0, 0, 104, 0, 0, 0, 105, 0, 0, 0, 87, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 160, 5, 0, 0, 106, 0, 0, 0, 107, 0, 0, 0, 87, 0, 0, 0, 39, 0, 0, 0, 40, 0, 0, 0, 33, 0, 0, 0, 34, 0, 0, 0, 35, 0, 0, 0, 36, 0, 0, 0, 41, 0, 0, 0, 37, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 192, 5, 0, 0, 108, 0, 0, 0, 109, 0, 0, 0, 87, 0, 0, 0, 42, 0, 0, 0, 43, 0, 0, 0, 39, 0, 0, 0, 40, 0, 0, 0, 41, 0, 0, 0, 42, 0, 0, 0, 44, 0, 0, 0, 43, 0, 0, 0, 44, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 224, 5, 0, 0, 110, 0, 0, 0, 111, 0, 0, 0, 87, 0, 0, 0, 45, 0, 0, 0, 46, 0, 0, 0, 45, 0, 0, 0, 46, 0, 0, 0, 47, 0, 0, 0, 48, 0, 0, 0, 47, 0, 0, 0, 49, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 112, 0, 0, 0, 113, 0, 0, 0, 87, 0, 0, 0, 48, 0, 0, 0, 49, 0, 0, 0, 51, 0, 0, 0, 52, 0, 0, 0, 53, 0, 0, 0, 54, 0, 0, 0, 50, 0, 0, 0, 55, 0, 0, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 6, 0, 0, 114, 0, 0, 0, 115, 0, 0, 0, 87, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 6, 0, 0, 116, 0, 0, 0, 117, 0, 0, 0, 87, 0, 0, 0, 5, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 6, 0, 0, 118, 0, 0, 0, 119, 0, 0, 0, 87, 0, 0, 0, 1, 0, 0, 0, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 6, 0, 0, 120, 0, 0, 0, 121, 0, 0, 0, 87, 0, 0, 0, 2, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 160, 6, 0, 0, 122, 0, 0, 0, 123, 0, 0, 0, 87, 0, 0, 0, 8, 0, 0, 0, 6, 0, 0, 0, 57, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 192, 6, 0, 0, 124, 0, 0, 0, 125, 0, 0, 0, 87, 0, 0, 0, 9, 0, 0, 0, 7, 0, 0, 0, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 4, 0, 0, 126, 0, 0, 0, 127, 0, 0, 0, 87, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 4, 0, 0, 128, 0, 0, 0, 129, 0, 0, 0, 87, 0, 0, 0, 6, 0, 0, 0, 10, 0, 0, 0, 7, 0, 0, 0, 11, 0, 0, 0, 8, 0, 0, 0, 1, 0, 0, 0, 12, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 130, 0, 0, 0, 131, 0, 0, 0, 87, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 12, 0, 0, 0, 51, 0, 0, 0, 52, 0, 0, 0, 13, 0, 0, 0, 53, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 4, 0, 0, 132, 0, 0, 0, 133, 0, 0, 0, 87, 0, 0, 0, 54, 0, 0, 0, 55, 0, 0, 0, 59, 0, 0, 0, 60, 0, 0, 0, 61, 0, 0, 0, 0, 0, 0, 0, 128, 4, 0, 0, 134, 0, 0, 0, 135, 0, 0, 0, 87, 0, 0, 0, 56, 0, 0, 0, 57, 0, 0, 0, 62, 0, 0, 0, 63, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 80, 3, 0, 0, 136, 0, 0, 0, 137, 0, 0, 0, 87, 0, 0, 0, 0, 0, 0, 0, 96, 3, 0, 0, 136, 0, 0, 0, 138, 0, 0, 0, 87, 0, 0, 0, 13, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 9, 0, 0, 0, 14, 0, 0, 0, 10, 0, 0, 0, 15, 0, 0, 0, 11, 0, 0, 0, 5, 0, 0, 0, 16, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 128, 3, 0, 0, 136, 0, 0, 0, 139, 0, 0, 0, 87, 0, 0, 0, 5, 0, 0, 0, 6, 0, 0, 0, 15, 0, 0, 0, 58, 0, 0, 0, 59, 0, 0, 0, 16, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 160, 3, 0, 0, 136, 0, 0, 0, 140, 0, 0, 0, 87, 0, 0, 0, 7, 0, 0, 0, 8, 0, 0, 0, 17, 0, 0, 0, 61, 0, 0, 0, 62, 0, 0, 0, 18, 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 192, 3, 0, 0, 136, 0, 0, 0, 141, 0, 0, 0, 87, 0, 0, 0, 9, 0, 0, 0, 10, 0, 0, 0, 19, 0, 0, 0, 64, 0, 0, 0, 65, 0, 0, 0, 20, 0, 0, 0, 66, 0, 0, 0, 0, 0, 0, 0, 224, 3, 0, 0, 136, 0, 0, 0, 142, 0, 0, 0, 87, 0, 0, 0, 9, 0, 0, 0, 10, 0, 0, 0, 19, 0, 0, 0, 64, 0, 0, 0, 65, 0, 0, 0, 20, 0, 0, 0, 66, 0, 0, 0, 0, 0, 0, 0, 240, 3, 0, 0, 136, 0, 0, 0, 143, 0, 0, 0, 87, 0, 0, 0, 9, 0, 0, 0, 10, 0, 0, 0, 19, 0, 0, 0, 64, 0, 0, 0, 65, 0, 0, 0, 20, 0, 0, 0, 66, 0, 0, 0, 0, 0, 0, 0, 37, 0, 0, 0, 72, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 77, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 83, 0, 0, 0, 37, 0, 0, 0, 109, 0, 0, 0, 47, 0, 0, 0, 37, 0, 0, 0, 100, 0, 0, 0, 47, 0, 0, 0, 37, 0, 0, 0, 121, 0, 0, 0, 37, 0, 0, 0, 89, 0, 0, 0, 45, 0, 0, 0, 37, 0, 0, 0, 109, 0, 0, 0, 45, 0, 0, 0, 37, 0, 0, 0, 100, 0, 0, 0, 37, 0, 0, 0, 73, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 77, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 83, 0, 0, 0, 32, 0, 0, 0, 37, 0, 0, 0, 112, 0, 0, 0, 37, 0, 0, 0, 72, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 77, 0, 0, 0, 37, 0, 0, 0, 72, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 77, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 116, 0, 0, 0, 114, 0, 0, 0, 117, 0, 0, 0, 101, 0, 0, 0, 0, 0, 0, 0, 102, 0, 0, 0, 97, 0, 0, 0, 108, 0, 0, 0, 115, 0, 0, 0, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 0, 0, 0, 117, 0, 0, 0, 110, 0, 0, 0, 100, 0, 0, 0, 97, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 77, 0, 0, 0, 111, 0, 0, 0, 110, 0, 0, 0, 100, 0, 0, 0, 97, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 84, 0, 0, 0, 117, 0, 0, 0, 101, 0, 0, 0, 115, 0, 0, 0, 100, 0, 0, 0, 97, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0, 101, 0, 0, 0, 100, 0, 0, 0, 110, 0, 0, 0, 101, 0, 0, 0, 115, 0, 0, 0, 100, 0, 0, 0, 97, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 84, 0, 0, 0, 104, 0, 0, 0, 117, 0, 0, 0, 114, 0, 0, 0, 115, 0, 0, 0, 100, 0, 0, 0, 97, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 70, 0, 0, 0, 114, 0, 0, 0, 105, 0, 0, 0, 100, 0, 0, 0, 97, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 83, 0, 0, 0, 97, 0, 0, 0, 116, 0, 0, 0, 117, 0, 0, 0, 114, 0, 0, 0, 100, 0, 0, 0, 97, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 83, 0, 0, 0, 117, 0, 0, 0, 110, 0, 0, 0, 0, 0, 0, 0, 77, 0, 0, 0, 111, 0, 0, 0, 110, 0, 0, 0, 0, 0, 0, 0, 84, 0, 0, 0, 117, 0, 0, 0, 101, 0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0, 101, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 84, 0, 0, 0, 104, 0, 0, 0, 117, 0, 0, 0, 0, 0, 0, 0, 70, 0, 0, 0, 114, 0, 0, 0, 105, 0, 0, 0, 0, 0, 0, 0, 83, 0, 0, 0, 97, 0, 0, 0, 116, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 74, 0, 0, 0, 97, 0, 0, 0, 110, 0, 0, 0, 117, 0, 0, 0, 97, 0, 0, 0, 114, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 70, 0, 0, 0, 101, 0, 0, 0, 98, 0, 0, 0, 114, 0, 0, 0, 117, 0, 0, 0, 97, 0, 0, 0, 114, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 77, 0, 0, 0, 97, 0, 0, 0, 114, 0, 0, 0, 99, 0, 0, 0, 104, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 112, 0, 0, 0, 114, 0, 0, 0, 105, 0, 0, 0, 108, 0, 0, 0, 0, 0, 0, 0, 77, 0, 0, 0, 97, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 74, 0, 0, 0, 117, 0, 0, 0, 110, 0, 0, 0, 101, 0, 0, 0, 0, 0, 0, 0, 74, 0, 0, 0, 117, 0, 0, 0, 108, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 117, 0, 0, 0, 103, 0, 0, 0, 117, 0, 0, 0, 115, 0, 0, 0, 116, 0, 0, 0, 0, 0, 0, 0, 83, 0, 0, 0, 101, 0, 0, 0, 112, 0, 0, 0, 116, 0, 0, 0, 101, 0, 0, 0, 109, 0, 0, 0, 98, 0, 0, 0, 101, 0, 0, 0, 114, 0, 0, 0, 0, 0, 0, 0, 79, 0, 0, 0, 99, 0, 0, 0, 116, 0, 0, 0, 111, 0, 0, 0, 98, 0, 0, 0, 101, 0, 0, 0, 114, 0, 0, 0, 0, 0, 0, 0, 78, 0, 0, 0, 111, 0, 0, 0, 118, 0, 0, 0, 101, 0, 0, 0, 109, 0, 0, 0, 98, 0, 0, 0, 101, 0, 0, 0, 114, 0, 0, 0, 0, 0, 0, 0, 68, 0, 0, 0, 101, 0, 0, 0, 99, 0, 0, 0, 101, 0, 0, 0, 109, 0, 0, 0, 98, 0, 0, 0, 101, 0, 0, 0, 114, 0, 0, 0, 0, 0, 0, 0, 74, 0, 0, 0, 97, 0, 0, 0, 110, 0, 0, 0, 0, 0, 0, 0, 70, 0, 0, 0, 101, 0, 0, 0, 98, 0, 0, 0, 0, 0, 0, 0, 77, 0, 0, 0, 97, 0, 0, 0, 114, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 112, 0, 0, 0, 114, 0, 0, 0, 0, 0, 0, 0, 74, 0, 0, 0, 117, 0, 0, 0, 110, 0, 0, 0, 0, 0, 0, 0, 74, 0, 0, 0, 117, 0, 0, 0, 108, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 117, 0, 0, 0, 103, 0, 0, 0, 0, 0, 0, 0, 83, 0, 0, 0, 101, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0, 79, 0, 0, 0, 99, 0, 0, 0, 116, 0, 0, 0, 0, 0, 0, 0, 78, 0, 0, 0, 111, 0, 0, 0, 118, 0, 0, 0, 0, 0, 0, 0, 68, 0, 0, 0, 101, 0, 0, 0, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 77, 0, 0, 0, 0, 0, 0, 0, 80, 0, 0, 0, 77, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 0, 0, 0, 109, 0, 0, 0, 47, 0, 0, 0, 37, 0, 0, 0, 100, 0, 0, 0, 47, 0, 0, 0, 37, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 0, 0, 0, 72, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 77, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 0, 0, 0, 97, 0, 0, 0, 32, 0, 0, 0, 37, 0, 0, 0, 98, 0, 0, 0, 32, 0, 0, 0, 37, 0, 0, 0, 100, 0, 0, 0, 32, 0, 0, 0, 37, 0, 0, 0, 72, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 77, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 83, 0, 0, 0, 32, 0, 0, 0, 37, 0, 0, 0, 89, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 0, 0, 0, 73, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 77, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 83, 0, 0, 0, 32, 0, 0, 0, 37, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 3, 32, 2, 32, 2, 32, 2, 32, 2, 32, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 96, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 8, 216, 8, 216, 8, 216, 8, 216, 8, 216, 8, 216, 8, 216, 8, 216, 8, 216, 8, 216, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 8, 213, 8, 213, 8, 213, 8, 213, 8, 213, 8, 213, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 8, 214, 8, 214, 8, 214, 8, 214, 8, 214, 8, 214, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 4, 192, 4, 192, 4, 192, 4, 192, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 32, 61, 32, 110, 117, 108, 108, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 99, 116, 120, 32, 61, 32, 100, 111, 99, 117, 109, 101, 110, 116, 46, 99, 114, 101, 97, 116, 101, 69, 108, 101, 109, 101, 110, 116, 40, 39, 99, 97, 110, 118, 97, 115, 39, 41, 46, 103, 101, 116, 67, 111, 110, 116, 101, 120, 116, 40, 39, 50, 100, 39, 41, 59, 32, 102, 111, 114, 40, 118, 97, 114, 32, 105, 32, 61, 32, 48, 59, 32, 105, 32, 60, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 46, 108, 101, 110, 103, 116, 104, 59, 32, 43, 43, 105, 41, 123, 32, 105, 102, 40, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 105, 93, 32, 33, 61, 32, 110, 117, 108, 108, 41, 32, 99, 111, 110, 116, 105, 110, 117, 101, 59, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 105, 93, 32, 61, 32, 99, 116, 120, 59, 32, 114, 101, 116, 117, 114, 110, 32, 105, 59, 32, 125, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 46, 112, 117, 115, 104, 40, 99, 116, 120, 41, 59, 32, 114, 101, 116, 117, 114, 110, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 46, 108, 101, 110, 103, 116, 104, 32, 45, 32, 49, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 99, 97, 110, 118, 97, 115, 32, 61, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 99, 97, 110, 118, 97, 115, 59, 32, 99, 97, 110, 118, 97, 115, 46, 119, 105, 100, 116, 104, 32, 61, 32, 36, 49, 59, 32, 99, 97, 110, 118, 97, 115, 46, 104, 101, 105, 103, 104, 116, 32, 61, 32, 36, 50, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 99, 97, 110, 118, 97, 115, 32, 61, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 99, 97, 110, 118, 97, 115, 59, 32, 72, 69, 65, 80, 51, 50, 91, 36, 49, 32, 62, 62, 32, 50, 93, 32, 61, 32, 99, 97, 110, 118, 97, 115, 46, 119, 105, 100, 116, 104, 59, 32, 72, 69, 65, 80, 51, 50, 91, 36, 50, 32, 62, 62, 32, 50, 93, 32, 61, 32, 99, 97, 110, 118, 97, 115, 46, 104, 101, 105, 103, 104, 116, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 115, 97, 118, 101, 40, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 114, 101, 115, 116, 111, 114, 101, 40, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 102, 105, 108, 108, 40, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 115, 116, 114, 111, 107, 101, 40, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 99, 108, 105, 112, 40, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 98, 101, 103, 105, 110, 80, 97, 116, 104, 40, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 99, 108, 111, 115, 101, 80, 97, 116, 104, 40, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 99, 108, 101, 97, 114, 82, 101, 99, 116, 40, 36, 49, 44, 32, 36, 50, 44, 32, 36, 51, 44, 32, 36, 52, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 102, 105, 108, 108, 82, 101, 99, 116, 40, 36, 49, 44, 32, 36, 50, 44, 32, 36, 51, 44, 32, 36, 52, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 102, 105, 108, 108, 83, 116, 121, 108, 101, 32, 61, 32, 39, 114, 103, 98, 40, 39, 32, 43, 32, 36, 49, 32, 43, 32, 39, 44, 39, 32, 43, 32, 36, 50, 32, 43, 32, 39, 44, 39, 32, 43, 32, 36, 51, 32, 43, 32, 39, 41, 39, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 115, 116, 114, 111, 107, 101, 83, 116, 121, 108, 101, 32, 61, 32, 39, 114, 103, 98, 40, 39, 32, 43, 32, 36, 49, 32, 43, 32, 39, 44, 39, 32, 43, 32, 36, 50, 32, 43, 32, 39, 44, 39, 32, 43, 32, 36, 51, 32, 43, 32, 39, 41, 39, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 103, 108, 111, 98, 97, 108, 65, 108, 112, 104, 97, 32, 61, 32, 36, 49, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 109, 111, 118, 101, 84, 111, 40, 36, 49, 44, 32, 36, 50, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 108, 105, 110, 101, 84, 111, 40, 36, 49, 44, 32, 36, 50, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 97, 114, 99, 40, 36, 49, 44, 32, 36, 50, 44, 32, 36, 51, 44, 32, 36, 52, 44, 32, 36, 53, 44, 32, 36, 54, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 115, 99, 97, 108, 101, 40, 36, 49, 44, 32, 36, 50, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 116, 114, 97, 110, 115, 108, 97, 116, 101, 40, 36, 49, 44, 32, 36, 50, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 108, 105, 110, 101, 87, 105, 100, 116, 104, 32, 61, 32, 36, 49, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 100, 114, 97, 119, 73, 109, 97, 103, 101, 40, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 49, 93, 46, 99, 97, 110, 118, 97, 115, 44, 32, 36, 50, 44, 32, 36, 51, 41, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 99, 97, 110, 118, 97, 115, 32, 61, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 49, 93, 46, 99, 97, 110, 118, 97, 115, 59, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 100, 114, 97, 119, 73, 109, 97, 103, 101, 40, 99, 97, 110, 118, 97, 115, 44, 32, 48, 44, 32, 48, 44, 32, 99, 97, 110, 118, 97, 115, 46, 119, 105, 100, 116, 104, 44, 32, 99, 97, 110, 118, 97, 115, 46, 104, 101, 105, 103, 104, 116, 44, 32, 36, 50, 44, 32, 36, 51, 44, 32, 36, 52, 44, 32, 36, 53, 41, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 105, 109, 103, 32, 61, 32, 99, 112, 53, 46, 105, 109, 97, 103, 101, 115, 91, 36, 49, 93, 59, 32, 105, 102, 40, 33, 105, 109, 103, 46, 99, 111, 109, 112, 108, 101, 116, 101, 41, 32, 114, 101, 116, 117, 114, 110, 59, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 100, 114, 97, 119, 73, 109, 97, 103, 101, 40, 105, 109, 103, 44, 32, 48, 44, 32, 48, 44, 32, 105, 109, 103, 46, 119, 105, 100, 116, 104, 44, 32, 105, 109, 103, 46, 104, 101, 105, 103, 104, 116, 44, 32, 36, 50, 44, 32, 36, 51, 44, 32, 36, 52, 44, 32, 36, 53, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 102, 105, 108, 108, 84, 101, 120, 116, 40, 85, 84, 70, 56, 84, 111, 83, 116, 114, 105, 110, 103, 40, 36, 49, 41, 44, 32, 36, 50, 44, 32, 36, 51, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 115, 116, 114, 111, 107, 101, 84, 101, 120, 116, 40, 85, 84, 70, 56, 84, 111, 83, 116, 114, 105, 110, 103, 40, 36, 49, 41, 44, 32, 36, 50, 44, 32, 36, 51, 41, 59, 32, 125, 0, 123, 32, 114, 101, 116, 117, 114, 110, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 109, 101, 97, 115, 117, 114, 101, 84, 101, 120, 116, 40, 85, 84, 70, 56, 84, 111, 83, 116, 114, 105, 110, 103, 40, 36, 49, 41, 41, 46, 119, 105, 100, 116, 104, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 102, 111, 110, 116, 32, 61, 32, 126, 126, 40, 36, 49, 41, 32, 43, 32, 34, 112, 120, 32, 85, 98, 117, 110, 116, 117, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 108, 105, 110, 101, 67, 97, 112, 32, 61, 32, 34, 98, 117, 116, 116, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 108, 105, 110, 101, 67, 97, 112, 32, 61, 32, 34, 114, 111, 117, 110, 100, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 108, 105, 110, 101, 67, 97, 112, 32, 61, 32, 34, 115, 113, 117, 97, 114, 101, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 108, 105, 110, 101, 74, 111, 105, 110, 32, 61, 32, 34, 114, 111, 117, 110, 100, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 108, 105, 110, 101, 74, 111, 105, 110, 32, 61, 32, 34, 98, 101, 118, 101, 108, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 108, 105, 110, 101, 74, 111, 105, 110, 32, 61, 32, 34, 109, 105, 116, 101, 114, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 116, 101, 120, 116, 66, 97, 115, 101, 108, 105, 110, 101, 32, 61, 32, 34, 116, 111, 112, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 116, 101, 120, 116, 66, 97, 115, 101, 108, 105, 110, 101, 32, 61, 32, 34, 104, 97, 110, 103, 105, 110, 103, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 116, 101, 120, 116, 66, 97, 115, 101, 108, 105, 110, 101, 32, 61, 32, 34, 109, 105, 100, 100, 108, 101, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 116, 101, 120, 116, 66, 97, 115, 101, 108, 105, 110, 101, 32, 61, 32, 34, 97, 108, 112, 104, 97, 98, 101, 116, 105, 99, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 116, 101, 120, 116, 66, 97, 115, 101, 108, 105, 110, 101, 32, 61, 32, 34, 105, 100, 101, 111, 103, 114, 97, 112, 104, 105, 99, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 116, 101, 120, 116, 66, 97, 115, 101, 108, 105, 110, 101, 32, 61, 32, 34, 98, 111, 116, 116, 111, 109, 34, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 101, 108, 101, 109, 32, 61, 32, 100, 111, 99, 117, 109, 101, 110, 116, 46, 103, 101, 116, 69, 108, 101, 109, 101, 110, 116, 66, 121, 73, 100, 40, 85, 84, 70, 56, 84, 111, 83, 116, 114, 105, 110, 103, 40, 36, 48, 41, 41, 59, 32, 105, 102, 40, 101, 108, 101, 109, 32, 61, 61, 32, 110, 117, 108, 108, 41, 32, 114, 101, 116, 117, 114, 110, 32, 45, 49, 59, 32, 118, 97, 114, 32, 99, 116, 120, 32, 61, 32, 101, 108, 101, 109, 46, 103, 101, 116, 67, 111, 110, 116, 101, 120, 116, 40, 39, 50, 100, 39, 41, 59, 32, 102, 111, 114, 40, 118, 97, 114, 32, 105, 32, 61, 32, 48, 59, 32, 105, 32, 60, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 46, 108, 101, 110, 103, 116, 104, 59, 32, 43, 43, 105, 41, 123, 32, 105, 102, 40, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 105, 93, 32, 33, 61, 32, 110, 117, 108, 108, 41, 32, 99, 111, 110, 116, 105, 110, 117, 101, 59, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 105, 93, 32, 61, 32, 99, 116, 120, 59, 32, 114, 101, 116, 117, 114, 110, 32, 105, 59, 32, 125, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 46, 112, 117, 115, 104, 40, 99, 116, 120, 41, 59, 32, 114, 101, 116, 117, 114, 110, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 46, 108, 101, 110, 103, 116, 104, 32, 45, 32, 49, 59, 32, 125, 0, 123, 32, 105, 102, 40, 33, 104, 97, 118, 101, 70, 111, 110, 116, 115, 76, 111, 97, 100, 101, 100, 41, 32, 104, 97, 118, 101, 70, 111, 110, 116, 115, 76, 111, 97, 100, 101, 100, 32, 61, 32, 70, 111, 110, 116, 68, 101, 116, 101, 99, 116, 46, 105, 115, 70, 111, 110, 116, 76, 111, 97, 100, 101, 100, 40, 34, 85, 98, 117, 110, 116, 117, 34, 41, 59, 32, 114, 101, 116, 117, 114, 110, 32, 104, 97, 118, 101, 70, 111, 110, 116, 115, 76, 111, 97, 100, 101, 100, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 105, 109, 103, 32, 61, 32, 110, 101, 119, 32, 73, 109, 97, 103, 101, 40, 41, 59, 32, 105, 109, 103, 46, 115, 114, 99, 32, 61, 32, 85, 84, 70, 56, 84, 111, 83, 116, 114, 105, 110, 103, 40, 36, 48, 41, 59, 32, 102, 111, 114, 40, 118, 97, 114, 32, 105, 32, 61, 32, 48, 59, 32, 105, 32, 60, 32, 99, 112, 53, 46, 105, 109, 97, 103, 101, 115, 46, 108, 101, 110, 103, 116, 104, 59, 32, 43, 43, 105, 41, 123, 32, 105, 102, 40, 99, 112, 53, 46, 105, 109, 97, 103, 101, 115, 91, 105, 93, 32, 33, 61, 32, 110, 117], "i8", 4, k.ga + 6260);
	E([108, 108, 41, 32, 99, 111, 110, 116, 105, 110, 117, 101, 59, 32, 99, 112, 53, 46, 105, 109, 97, 103, 101, 115, 91, 105, 93, 32, 61, 32, 105, 109, 103, 59, 32, 114, 101, 116, 117, 114, 110, 32, 105, 59, 32, 125, 32, 99, 112, 53, 46, 105, 109, 97, 103, 101, 115, 46, 112, 117, 115, 104, 40, 105, 109, 103, 41, 59, 32, 114, 101, 116, 117, 114, 110, 32, 99, 112, 53, 46, 105, 109, 97, 103, 101, 115, 46, 108, 101, 110, 103, 116, 104, 32, 45, 32, 49, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 105, 32, 61, 32, 99, 112, 53, 46, 105, 109, 97, 103, 101, 115, 91, 36, 48, 93, 59, 32, 72, 69, 65, 80, 85, 56, 91, 36, 49, 32, 62, 62, 32, 48, 93, 32, 61, 32, 40, 105, 46, 99, 111, 109, 112, 108, 101, 116, 101, 32, 38, 38, 32, 105, 46, 119, 105, 100, 116, 104, 32, 62, 32, 48, 41, 124, 48, 59, 32, 72, 69, 65, 80, 51, 50, 91, 36, 50, 32, 62, 62, 32, 50, 93, 32, 61, 32, 105, 46, 119, 105, 100, 116, 104, 59, 32, 72, 69, 65, 80, 51, 50, 91, 36, 51, 32, 62, 62, 32, 50, 93, 32, 61, 32, 105, 46, 104, 101, 105, 103, 104, 116, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 119, 115, 32, 61, 32, 110, 101, 119, 32, 87, 101, 98, 83, 111, 99, 107, 101, 116, 40, 85, 84, 70, 56, 84, 111, 83, 116, 114, 105, 110, 103, 40, 36, 48, 41, 41, 59, 32, 119, 115, 46, 98, 105, 110, 97, 114, 121, 84, 121, 112, 101, 32, 61, 32, 34, 97, 114, 114, 97, 121, 98, 117, 102, 102, 101, 114, 34, 59, 32, 119, 115, 46, 101, 118, 101, 110, 116, 115, 32, 61, 32, 91, 93, 59, 32, 119, 115, 46, 111, 110, 111, 112, 101, 110, 32, 61, 32, 102, 117, 110, 99, 116, 105, 111, 110, 40, 41, 123, 32, 119, 115, 46, 101, 118, 101, 110, 116, 115, 46, 112, 117, 115, 104, 40, 91, 50, 44, 32, 48, 44, 32, 48, 93, 41, 59, 32, 95, 99, 112, 53, 95, 99, 104, 101, 99, 107, 95, 119, 115, 40, 41, 59, 32, 125, 59, 32, 119, 115, 46, 111, 110, 101, 114, 114, 111, 114, 32, 61, 32, 102, 117, 110, 99, 116, 105, 111, 110, 40, 41, 123, 32, 119, 115, 46, 101, 118, 101, 110, 116, 115, 46, 112, 117, 115, 104, 40, 91, 51, 44, 32, 48, 44, 32, 48, 93, 41, 59, 32, 95, 99, 112, 53, 95, 99, 104, 101, 99, 107, 95, 119, 115, 40, 41, 59, 32, 125, 59, 32, 119, 115, 46, 111, 110, 99, 108, 111, 115, 101, 32, 61, 32, 102, 117, 110, 99, 116, 105, 111, 110, 40, 41, 123, 32, 119, 115, 46, 101, 118, 101, 110, 116, 115, 46, 112, 117, 115, 104, 40, 91, 52, 44, 32, 48, 44, 32, 48, 93, 41, 59, 32, 95, 99, 112, 53, 95, 99, 104, 101, 99, 107, 95, 119, 115, 40, 41, 59, 32, 125, 59, 32, 119, 115, 46, 111, 110, 109, 101, 115, 115, 97, 103, 101, 32, 61, 32, 102, 117, 110, 99, 116, 105, 111, 110, 40, 101, 41, 123, 32, 118, 97, 114, 32, 118, 105, 101, 119, 32, 61, 32, 110, 101, 119, 32, 85, 105, 110, 116, 56, 65, 114, 114, 97, 121, 40, 101, 46, 100, 97, 116, 97, 41, 59, 32, 118, 97, 114, 32, 112, 116, 114, 32, 61, 32, 95, 109, 97, 108, 108, 111, 99, 40, 118, 105, 101, 119, 46, 108, 101, 110, 103, 116, 104, 41, 59, 32, 119, 114, 105, 116, 101, 65, 114, 114, 97, 121, 84, 111, 77, 101, 109, 111, 114, 121, 40, 118, 105, 101, 119, 44, 32, 112, 116, 114, 41, 59, 32, 119, 115, 46, 101, 118, 101, 110, 116, 115, 46, 112, 117, 115, 104, 40, 91, 49, 44, 32, 112, 116, 114, 44, 32, 118, 105, 101, 119, 46, 108, 101, 110, 103, 116, 104, 93, 41, 59, 32, 95, 99, 112, 53, 95, 99, 104, 101, 99, 107, 95, 119, 115, 40, 41, 59, 32, 125, 59, 32, 102, 111, 114, 40, 118, 97, 114, 32, 105, 32, 61, 32, 48, 59, 32, 105, 32, 60, 32, 99, 112, 53, 46, 115, 111, 99, 107, 101, 116, 115, 46, 108, 101, 110, 103, 116, 104, 59, 32, 43, 43, 105, 41, 123, 32, 105, 102, 40, 99, 112, 53, 46, 115, 111, 99, 107, 101, 116, 115, 91, 105, 93, 32, 33, 61, 32, 110, 117, 108, 108, 41, 32, 99, 111, 110, 116, 105, 110, 117, 101, 59, 32, 99, 112, 53, 46, 115, 111, 99, 107, 101, 116, 115, 91, 105, 93, 32, 61, 32, 119, 115, 59, 32, 114, 101, 116, 117, 114, 110, 32, 105, 59, 32, 125, 32, 99, 112, 53, 46, 115, 111, 99, 107, 101, 116, 115, 46, 112, 117, 115, 104, 40, 119, 115, 41, 59, 32, 114, 101, 116, 117, 114, 110, 32, 99, 112, 53, 46, 115, 111, 99, 107, 101, 116, 115, 46, 108, 101, 110, 103, 116, 104, 32, 45, 32, 49, 59, 32, 125, 0, 123, 32, 99, 112, 53, 95, 100, 101, 115, 116, 114, 111, 121, 95, 119, 115, 40, 36, 48, 41, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 119, 32, 61, 32, 99, 112, 53, 46, 115, 111, 99, 107, 101, 116, 115, 91, 36, 48, 93, 59, 32, 105, 102, 40, 119, 46, 114, 101, 97, 100, 121, 83, 116, 97, 116, 101, 32, 33, 61, 32, 49, 41, 32, 114, 101, 116, 117, 114, 110, 32, 48, 59, 32, 119, 46, 115, 101, 110, 100, 40, 72, 69, 65, 80, 56, 46, 115, 117, 98, 97, 114, 114, 97, 121, 40, 36, 49, 44, 32, 36, 49, 32, 43, 32, 36, 50, 41, 41, 59, 32, 114, 101, 116, 117, 114, 110, 32, 49, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 119, 32, 61, 32, 99, 112, 53, 46, 115, 111, 99, 107, 101, 116, 115, 91, 36, 48, 93, 59, 32, 105, 102, 40, 119, 46, 101, 118, 101, 110, 116, 115, 46, 108, 101, 110, 103, 116, 104, 32, 61, 61, 32, 48, 41, 32, 114, 101, 116, 117, 114, 110, 32, 48, 59, 32, 118, 97, 114, 32, 101, 32, 61, 32, 119, 46, 101, 118, 101, 110, 116, 115, 46, 115, 104, 105, 102, 116, 40, 41, 59, 32, 72, 69, 65, 80, 85, 51, 50, 91, 36, 49, 32, 62, 62, 32, 50, 93, 32, 61, 32, 101, 91, 49, 93, 59, 32, 72, 69, 65, 80, 51, 50, 91, 36, 50, 32, 62, 62, 32, 50, 93, 32, 61, 32, 101, 91, 50, 93, 59, 32, 114, 101, 116, 117, 114, 110, 32, 101, 91, 48, 93, 59, 32, 125, 0, 123, 32, 114, 101, 116, 117, 114, 110, 32, 105, 100, 108, 101, 68, 101, 97, 100, 108, 105, 110, 101, 91, 39, 116, 105, 109, 101, 82, 101, 109, 97, 105, 110, 105, 110, 103, 39, 93, 40, 41, 32, 62, 61, 32, 50, 59, 32, 125, 0, 123, 32, 114, 101, 116, 117, 114, 110, 32, 77, 97, 116, 104, 46, 114, 97, 110, 100, 111, 109, 40, 41, 59, 32, 125, 0, 49, 50, 57, 57, 101, 49, 55, 97, 50, 52, 48, 55, 56, 100, 101, 52, 97, 97, 99, 99, 49, 54, 53, 55, 52, 99, 51, 98, 102, 102, 52, 99, 0, 58, 0, 123, 32, 105, 102, 40, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 32, 38, 38, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 111, 110, 68, 105, 115, 99, 111, 110, 110, 101, 99, 116, 39, 93, 41, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 111, 110, 68, 105, 115, 99, 111, 110, 110, 101, 99, 116, 39, 93, 40, 41, 59, 32, 125, 0, 123, 32, 105, 102, 40, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 32, 38, 38, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 100, 111, 76, 111, 103, 105, 110, 39, 93, 41, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 100, 111, 76, 111, 103, 105, 110, 39, 93, 40, 41, 59, 32, 125, 0, 123, 32, 105, 102, 40, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 32, 38, 38, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 99, 111, 114, 101, 80, 101, 110, 100, 105, 110, 103, 82, 101, 108, 111, 97, 100, 39, 93, 41, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 99, 111, 114, 101, 80, 101, 110, 100, 105, 110, 103, 82, 101, 108, 111, 97, 100, 39, 93, 40, 41, 59, 32, 125, 0, 123, 32, 105, 102, 40, 119, 105, 110, 100, 111, 119, 91, 39, 108, 111, 103, 111, 117, 116, 39, 93, 41, 32, 119, 105, 110, 100, 111, 119, 91, 39, 108, 111, 103, 111, 117, 116, 39, 93, 40, 41, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 98, 117, 102, 102, 101, 114, 32, 61, 32, 72, 69, 65, 80, 85, 56, 46, 115, 117, 98, 97, 114, 114, 97, 121, 40, 36, 48, 44, 32, 36, 48, 32, 43, 32, 36, 49, 41, 59, 32, 105, 102, 40, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 32, 38, 38, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 111, 110, 77, 111, 98, 105, 108, 101, 68, 97, 116, 97, 39, 93, 41, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 111, 110, 77, 111, 98, 105, 108, 101, 68, 97, 116, 97, 39, 93, 40, 98, 117, 102, 102, 101, 114, 41, 59, 32, 125, 0, 123, 32, 105, 102, 40, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 32, 38, 38, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 117, 112, 100, 97, 116, 101, 83, 101, 114, 118, 101, 114, 86, 101, 114, 115, 105, 111, 110, 39, 93, 41, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 117, 112, 100, 97, 116, 101, 83, 101, 114, 118, 101, 114, 86, 101, 114, 115, 105, 111, 110, 39, 93, 40, 85, 84, 70, 56, 84, 111, 83, 116, 114, 105, 110, 103, 40, 36, 48, 41, 41, 59, 32, 125, 0, 83, 99, 111, 114, 101, 58, 32, 37, 100, 0, 89, 111, 117, 114, 32, 99, 111, 109, 112, 117, 116, 101, 114, 32, 105, 115, 32, 114, 117, 110, 110, 105, 110, 103, 32, 115, 108, 111, 119, 0, 112, 108, 101, 97, 115, 101, 32, 99, 108, 111, 115, 101, 32, 111, 116, 104, 101, 114, 32, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 115, 32, 111, 114, 32, 116, 97, 98, 115, 32, 105, 110, 32, 121, 111, 117, 114, 32, 98, 114, 111, 119, 115, 101, 114, 32, 116, 111, 32, 105, 109, 112, 114, 111, 118, 101, 32, 103, 97, 109, 101, 32, 112, 101, 114, 102, 111, 114, 109, 97, 110, 99, 101, 46, 0, 1, 1, 0, 67, 111, 110, 110, 101, 99, 116, 105, 110, 103, 0, 73, 102, 32, 121, 111, 117, 32, 99, 97, 110, 110, 111, 116, 32, 99, 111, 110, 110, 101, 99, 116, 32, 116, 111, 32, 116, 104, 101, 32, 115, 101, 114, 118, 101, 114, 115, 44, 32, 99, 104, 101, 99, 107, 32, 105, 102, 32, 121, 111, 117, 32, 104, 97, 118, 101, 0, 115, 111, 109, 101, 32, 97, 110, 116, 105, 32, 118, 105, 114, 117, 115, 32, 111, 114, 32, 102, 105, 114, 101, 119, 97, 108, 108, 32, 98, 108, 111, 99, 107, 105, 110, 103, 32, 116, 104, 101, 32, 99, 111, 110, 110, 101, 99, 116, 105, 111, 110, 46, 0, 76, 101, 97, 100, 101, 114, 98, 111, 97, 114, 100, 0, 46, 32, 0, 65, 110, 32, 117, 110, 110, 97, 109, 101, 100, 32, 99, 101, 108, 108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 105, 109, 103, 47, 98, 97, 99, 107, 103, 114, 111, 117, 110, 100, 46, 112, 110, 103, 0, 99, 97, 110, 118, 97, 115, 0, 115, 116, 97, 116, 115, 71, 114, 97, 112, 104, 0, 123, 32, 114, 101, 116, 117, 114, 110, 32, 36, 48, 32, 37, 32, 36, 49, 59, 32, 125, 0, 37, 100, 0, 0, 0, 1, 0, 0, 1, 123, 32, 105, 102, 40, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 32, 38, 38, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 111, 110, 80, 108, 97, 121, 101, 114, 83, 112, 97, 119, 110, 39, 93, 41, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 111, 110, 80, 108, 97, 121, 101, 114, 83, 112, 97, 119, 110, 39, 93, 40, 41, 59, 32, 125, 0, 123, 32, 105, 102, 40, 33, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 32, 124, 124, 32, 33, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 111, 110, 80, 108, 97, 121, 101, 114, 68, 101, 97, 116, 104, 39, 93, 41, 32, 114, 101, 116, 117, 114, 110, 59, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 111, 110, 80, 108, 97, 121, 101, 114, 68, 101, 97, 116, 104, 39, 93, 40, 36, 48, 44, 32, 36, 49, 44, 32, 36, 50, 44, 32, 36, 51, 44, 32, 36, 52, 44, 32, 36, 53, 41, 59, 32, 125, 0, 83, 116, 57, 98, 97, 100, 95, 97, 108, 108, 111, 99, 0, 83, 116, 57, 101, 120, 99, 101, 112, 116, 105, 111, 110, 0, 83, 116, 57, 116, 121, 112, 101, 95, 105, 110, 102, 111, 0, 78, 49, 48, 95, 95, 99, 120, 120, 97, 98, 105, 118, 49, 49, 54, 95, 95, 115, 104, 105, 109, 95, 116, 121, 112, 101, 95, 105, 110, 102, 111, 69, 0, 78, 49, 48, 95, 95, 99, 120, 120, 97, 98, 105, 118, 49, 49, 55, 95, 95, 99, 108, 97, 115, 115, 95, 116, 121, 112, 101, 95, 105, 110, 102, 111, 69, 0, 78, 49, 48, 95, 95, 99, 120, 120, 97, 98, 105, 118, 49, 50, 48, 95, 95, 115, 105, 95, 99, 108, 97, 115, 115, 95, 116, 121, 112, 101, 95, 105, 110, 102, 111, 69, 0, 78, 49, 48, 95, 95, 99, 120, 120, 97, 98, 105, 118, 49, 50, 49, 95, 95, 118, 109, 105, 95, 99, 108, 97, 115, 115, 95, 116, 121, 112, 101, 95, 105, 110, 102, 111, 69, 0, 33, 34, 98, 97, 115, 105, 99, 95, 115, 116, 114, 105, 110, 103, 32, 108, 101, 110, 103, 116, 104, 95, 101, 114, 114, 111, 114, 34, 0, 47, 85, 115, 101, 114, 115, 47, 98, 111, 98, 47, 115, 114, 99, 47, 101, 109, 115, 100, 107, 95, 112, 111, 114, 116, 97, 98, 108, 101, 47, 101, 109, 115, 99, 114, 105, 112, 116, 101, 110, 47, 49, 46, 51, 53, 46, 48, 47, 115, 121, 115, 116, 101, 109, 47, 105, 110, 99, 108, 117, 100, 101, 47, 108, 105, 98, 99, 120, 120, 47, 115, 116, 114, 105, 110, 103, 0, 95, 95, 116, 104, 114, 111, 119, 95, 108, 101, 110, 103, 116, 104, 95, 101, 114, 114, 111, 114, 0, 33, 34, 118, 101, 99, 116, 111, 114, 32, 108, 101, 110, 103, 116, 104, 95, 101, 114, 114, 111, 114, 34, 0, 47, 85, 115, 101, 114, 115, 47, 98, 111, 98, 47, 115, 114, 99, 47, 101, 109, 115, 100, 107, 95, 112, 111, 114, 116, 97, 98, 108, 101, 47, 101, 109, 115, 99, 114, 105, 112, 116, 101, 110, 47, 49, 46, 51, 53, 46, 48, 47, 115, 121, 115, 116, 101, 109, 47, 105, 110, 99, 108, 117, 100, 101, 47, 108, 105, 98, 99, 120, 120, 47, 118, 101, 99, 116, 111, 114, 0, 115, 116, 100, 58, 58, 98, 97, 100, 95, 97, 108, 108, 111, 99, 0, 84, 33, 34, 25, 13, 1, 2, 3, 17, 75, 28, 12, 16, 4, 11, 29, 18, 30, 39, 104, 110, 111, 112, 113, 98, 32, 5, 6, 15, 19, 20, 21, 26, 8, 22, 7, 40, 36, 23, 24, 9, 10, 14, 27, 31, 37, 35, 131, 130, 125, 38, 42, 43, 60, 61, 62, 63, 67, 71, 74, 77, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 99, 100, 101, 102, 103, 105, 106, 107, 108, 114, 115, 116, 121, 122, 123, 124, 0, 73, 108, 108, 101, 103, 97, 108, 32, 98, 121, 116, 101, 32, 115, 101, 113, 117, 101, 110, 99, 101, 0, 68, 111, 109, 97, 105, 110, 32, 101, 114, 114, 111, 114, 0, 82, 101, 115, 117, 108, 116, 32, 110, 111, 116, 32, 114, 101, 112, 114, 101, 115, 101, 110, 116, 97, 98, 108, 101, 0, 78, 111, 116, 32, 97, 32, 116, 116, 121, 0, 80, 101, 114, 109, 105, 115, 115, 105, 111, 110, 32, 100, 101, 110, 105, 101, 100, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 110, 111, 116, 32, 112, 101, 114, 109, 105, 116, 116, 101, 100, 0, 78, 111, 32, 115, 117, 99, 104, 32, 102, 105, 108, 101, 32, 111, 114, 32, 100, 105, 114, 101, 99, 116, 111, 114, 121, 0, 78, 111, 32, 115, 117, 99, 104, 32, 112, 114, 111, 99, 101, 115, 115, 0, 70, 105, 108, 101, 32, 101, 120, 105, 115, 116, 115, 0, 86, 97, 108, 117, 101, 32, 116, 111, 111, 32, 108, 97, 114, 103, 101, 32, 102, 111, 114, 32, 100, 97, 116, 97, 32, 116, 121, 112, 101, 0, 78, 111, 32, 115, 112, 97, 99, 101, 32, 108, 101, 102, 116, 32, 111, 110, 32, 100, 101, 118, 105, 99, 101, 0, 79, 117, 116, 32, 111, 102, 32, 109, 101, 109, 111, 114, 121, 0, 82, 101, 115, 111, 117, 114, 99, 101, 32, 98, 117, 115, 121, 0, 73, 110, 116, 101, 114, 114, 117, 112, 116, 101, 100, 32, 115, 121, 115, 116, 101, 109, 32, 99, 97, 108, 108, 0, 82, 101, 115, 111, 117, 114, 99, 101, 32, 116, 101, 109, 112, 111, 114, 97, 114, 105, 108, 121, 32, 117, 110, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 73, 110, 118, 97, 108, 105, 100, 32, 115, 101, 101, 107, 0, 67, 114, 111, 115, 115, 45, 100, 101, 118, 105, 99, 101, 32, 108, 105, 110, 107, 0, 82, 101, 97, 100, 45, 111, 110, 108, 121, 32, 102, 105, 108, 101, 32, 115, 121, 115, 116, 101, 109, 0, 68, 105, 114, 101, 99, 116, 111, 114, 121, 32, 110, 111, 116, 32, 101, 109, 112, 116, 121, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 114, 101, 115, 101, 116, 32, 98, 121, 32, 112, 101, 101, 114, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 116, 105, 109, 101, 100, 32, 111, 117, 116, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 114, 101, 102, 117, 115, 101, 100, 0, 72, 111, 115, 116, 32, 105, 115, 32, 100, 111, 119, 110, 0, 72, 111, 115, 116, 32, 105, 115, 32, 117, 110, 114, 101, 97, 99, 104, 97, 98, 108, 101, 0, 65, 100, 100, 114, 101, 115, 115, 32, 105, 110, 32, 117, 115, 101, 0, 66, 114, 111, 107, 101, 110, 32, 112, 105, 112, 101, 0, 73, 47, 79, 32, 101, 114, 114, 111, 114, 0, 78, 111, 32, 115, 117, 99, 104, 32, 100, 101, 118, 105, 99, 101, 32, 111, 114, 32, 97, 100, 100, 114, 101, 115, 115, 0, 66, 108, 111, 99, 107, 32, 100, 101, 118, 105, 99, 101, 32, 114, 101, 113, 117, 105, 114, 101, 100, 0, 78, 111, 32, 115, 117, 99, 104, 32, 100, 101, 118, 105, 99, 101, 0, 78, 111, 116, 32, 97, 32, 100, 105, 114, 101, 99, 116, 111, 114, 121, 0, 73, 115, 32, 97, 32, 100, 105, 114, 101, 99, 116, 111, 114, 121, 0, 84, 101, 120, 116, 32, 102, 105, 108, 101, 32, 98, 117, 115, 121, 0, 69, 120, 101, 99, 32, 102, 111, 114, 109, 97, 116, 32, 101, 114, 114, 111, 114, 0, 73, 110, 118, 97, 108, 105, 100, 32, 97, 114, 103, 117, 109, 101, 110, 116, 0, 65, 114, 103, 117, 109, 101, 110, 116, 32, 108, 105, 115, 116, 32, 116, 111, 111, 32, 108, 111, 110, 103, 0, 83, 121, 109, 98, 111, 108, 105, 99, 32, 108, 105, 110, 107, 32, 108, 111, 111, 112, 0, 70, 105, 108, 101, 110, 97, 109, 101, 32, 116, 111, 111, 32, 108, 111, 110, 103, 0, 84, 111, 111, 32, 109, 97, 110, 121, 32, 111, 112, 101, 110, 32, 102, 105, 108, 101, 115, 32, 105, 110, 32, 115, 121, 115, 116, 101, 109, 0, 78, 111, 32, 102, 105, 108, 101, 32, 100, 101, 115, 99, 114, 105, 112, 116, 111, 114, 115, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 66, 97, 100, 32, 102, 105, 108, 101, 32, 100, 101, 115, 99, 114, 105, 112, 116, 111, 114, 0, 78, 111, 32, 99, 104, 105, 108, 100, 32, 112, 114, 111, 99, 101, 115, 115, 0, 66, 97, 100, 32, 97, 100, 100, 114, 101, 115, 115, 0, 70, 105, 108, 101, 32, 116, 111, 111, 32, 108, 97, 114, 103, 101, 0, 84, 111, 111, 32, 109, 97, 110, 121, 32, 108, 105, 110, 107, 115, 0, 78, 111, 32, 108, 111, 99, 107, 115, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 82, 101, 115, 111, 117, 114, 99, 101, 32, 100, 101, 97, 100, 108, 111, 99, 107, 32, 119, 111, 117, 108, 100, 32, 111, 99, 99, 117, 114, 0, 83, 116, 97, 116, 101, 32, 110, 111, 116, 32, 114, 101, 99, 111, 118, 101, 114, 97, 98, 108, 101, 0, 80, 114, 101, 118, 105, 111, 117, 115, 32, 111, 119, 110, 101, 114, 32, 100, 105, 101, 100, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 99, 97, 110, 99, 101, 108, 101, 100, 0, 70, 117, 110, 99, 116, 105, 111, 110, 32, 110, 111, 116, 32, 105, 109, 112, 108, 101, 109, 101, 110, 116, 101, 100, 0, 78, 111, 32, 109, 101, 115, 115, 97, 103, 101, 32, 111, 102, 32, 100, 101, 115, 105, 114, 101, 100, 32, 116, 121, 112, 101, 0, 73, 100, 101, 110, 116, 105, 102, 105, 101, 114, 32, 114, 101, 109, 111, 118, 101, 100, 0, 68, 101, 118, 105, 99, 101, 32, 110, 111, 116, 32, 97, 32, 115, 116, 114, 101, 97, 109, 0, 78, 111, 32, 100, 97, 116, 97, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 68, 101, 118, 105, 99, 101, 32, 116, 105, 109, 101, 111, 117, 116, 0, 79, 117, 116, 32, 111, 102, 32, 115, 116, 114, 101, 97, 109, 115, 32, 114, 101, 115, 111, 117, 114, 99, 101, 115, 0, 76, 105, 110, 107, 32, 104, 97, 115, 32, 98, 101, 101, 110, 32, 115, 101, 118, 101, 114, 101, 100, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 101, 114, 114, 111, 114, 0, 66, 97, 100, 32, 109, 101, 115, 115, 97, 103, 101, 0, 70, 105, 108, 101, 32, 100, 101, 115, 99, 114, 105, 112, 116, 111, 114, 32, 105, 110, 32, 98, 97, 100, 32, 115, 116, 97, 116, 101, 0, 78, 111, 116, 32, 97, 32, 115, 111, 99, 107, 101, 116, 0, 68, 101, 115, 116, 105, 110, 97, 116, 105, 111, 110, 32, 97, 100, 100, 114, 101, 115, 115, 32, 114, 101, 113, 117, 105, 114, 101, 100, 0, 77, 101, 115, 115, 97, 103, 101, 32, 116, 111, 111, 32, 108, 97, 114, 103, 101, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 119, 114, 111, 110, 103, 32, 116, 121, 112, 101, 32, 102, 111, 114, 32, 115, 111, 99, 107, 101, 116, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 110, 111, 116, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 83, 111, 99, 107, 101, 116, 32, 116, 121, 112, 101, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 78, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 102, 97, 109, 105, 108, 121, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 65, 100, 100, 114, 101, 115, 115, 32, 102, 97, 109, 105, 108, 121, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 32, 98, 121, 32, 112, 114, 111, 116, 111, 99, 111, 108, 0, 65, 100, 100, 114, 101, 115, 115, 32, 110, 111, 116, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 78, 101, 116, 119, 111, 114, 107, 32, 105, 115, 32, 100, 111, 119, 110, 0, 78, 101, 116, 119, 111, 114, 107, 32, 117, 110, 114, 101, 97, 99, 104, 97, 98, 108, 101, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 114, 101, 115, 101, 116, 32, 98, 121, 32, 110, 101, 116, 119, 111, 114, 107, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 97, 98, 111, 114, 116, 101, 100, 0, 78, 111, 32, 98, 117, 102, 102, 101, 114, 32, 115, 112, 97, 99, 101, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 83, 111, 99, 107, 101, 116, 32, 105, 115, 32, 99, 111, 110, 110, 101, 99, 116, 101, 100, 0, 83, 111, 99, 107, 101, 116, 32, 110, 111, 116, 32, 99, 111, 110, 110, 101, 99, 116, 101, 100, 0, 67, 97, 110, 110, 111, 116, 32, 115, 101, 110, 100, 32, 97, 102, 116, 101, 114, 32, 115, 111, 99, 107, 101, 116, 32, 115, 104, 117, 116, 100, 111, 119, 110, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 97, 108, 114, 101, 97, 100, 121, 32, 105, 110, 32, 112, 114, 111, 103, 114, 101, 115, 115, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 105, 110, 32, 112, 114, 111, 103, 114, 101, 115, 115, 0, 83, 116, 97, 108, 101, 32, 102, 105, 108, 101, 32, 104, 97, 110, 100, 108, 101, 0, 82, 101, 109, 111, 116, 101, 32, 73, 47, 79, 32, 101, 114, 114, 111, 114, 0, 81, 117, 111, 116, 97, 32, 101, 120, 99, 101, 101, 100, 101, 100, 0, 78, 111, 32, 109, 101, 100, 105, 117, 109, 32, 102, 111, 117, 110, 100, 0, 87, 114, 111, 110, 103, 32, 109, 101, 100, 105, 117, 109, 32, 116, 121, 112, 101, 0, 78, 111, 32, 101, 114, 114, 111, 114, 32, 105, 110, 102, 111, 114, 109, 97, 116, 105, 111, 110, 0, 0, 105, 110, 102, 105, 110, 105, 116, 121, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 255, 255, 255, 255, 255, 255, 255, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 255, 255, 255, 255, 255, 255, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 1, 2, 4, 7, 3, 6, 5, 0, 80, 79, 83, 73, 88, 0, 17, 0, 10, 0, 17, 17, 17, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 15, 10, 17, 17, 17, 3, 10, 7, 0, 1, 19, 9, 11, 11, 0, 0, 9, 6, 11, 0, 0, 11, 0, 6, 17, 0, 0, 0, 17, 17, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 10, 10, 17, 17, 17, 0, 10, 0, 0, 2, 0, 9, 11, 0, 0, 0, 9, 0, 11, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 12, 0, 0, 0, 0, 9, 12, 0, 0, 0, 0, 0, 12, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 4, 13, 0, 0, 0, 0, 9, 14, 0, 0, 0, 0, 0, 14, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 15, 0, 0, 0, 0, 9, 16, 0, 0, 0, 0, 0, 16, 0, 0, 16, 0, 0, 18, 0, 0, 0, 18, 18, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 18, 18, 18, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 9, 11, 0, 0, 0, 0, 0, 11, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 12, 0, 0, 0, 0, 9, 12, 0, 0, 0, 0, 0, 12, 0, 0, 12, 0, 0, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 45, 43, 32, 32, 32, 48, 88, 48, 120, 0, 40, 110, 117, 108, 108, 41, 0, 45, 48, 88, 43, 48, 88, 32, 48, 88, 45, 48, 120, 43, 48, 120, 32, 48, 120, 0, 105, 110, 102, 0, 73, 78, 70, 0, 110, 97, 110, 0, 78, 65, 78, 0, 46, 0, 37, 108, 108, 117, 0, 78, 83, 116, 51, 95, 95, 49, 56, 105, 111, 115, 95, 98, 97, 115, 101, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 53, 98, 97, 115, 105, 99, 95, 115, 116, 114, 101, 97, 109, 98, 117, 102, 73, 99, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 99, 69, 69, 69, 69, 0, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102, 65, 66, 67, 68, 69, 70, 120, 88, 43, 45, 112, 80, 105, 73, 110, 78, 0, 78, 83, 116, 51, 95, 95, 49, 54, 108, 111, 99, 97, 108, 101, 53, 102, 97, 99, 101, 116, 69, 0, 78, 83, 116, 51, 95, 95, 49, 53, 99, 116, 121, 112, 101, 73, 119, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 55, 99, 111, 100, 101, 99, 118, 116, 73, 99, 99, 49, 49, 95, 95, 109, 98, 115, 116, 97, 116, 101, 95, 116, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 55, 99, 111, 100, 101, 99, 118, 116, 73, 68, 115, 99, 49, 49, 95, 95, 109, 98, 115, 116, 97, 116, 101, 95, 116, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 55, 99, 111, 100, 101, 99, 118, 116, 73, 68, 105, 99, 49, 49, 95, 95, 109, 98, 115, 116, 97, 116, 101, 95, 116, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 54, 95, 95, 110, 97, 114, 114, 111, 119, 95, 116, 111, 95, 117, 116, 102, 56, 73, 76, 106, 51, 50, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 55, 95, 95, 119, 105, 100, 101, 110, 95, 102, 114, 111, 109, 95, 117, 116, 102, 56, 73, 76, 106, 51, 50, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 55, 99, 111, 100, 101, 99, 118, 116, 73, 119, 99, 49, 49, 95, 95, 109, 98, 115, 116, 97, 116, 101, 95, 116, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 54, 108, 111, 99, 97, 108, 101, 53, 95, 95, 105, 109, 112, 69, 0, 78, 83, 116, 51, 95, 95, 49, 55, 99, 111, 108, 108, 97, 116, 101, 73, 99, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 55, 99, 111, 108, 108, 97, 116, 101, 73, 119, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 53, 99, 116, 121, 112, 101, 73, 99, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 56, 110, 117, 109, 112, 117, 110, 99, 116, 73, 99, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 56, 110, 117, 109, 112, 117, 110, 99, 116, 73, 119, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 55, 110, 117, 109, 95, 103, 101, 116, 73, 99, 78, 83, 95, 49, 57, 105, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 99, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 99, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 55, 110, 117, 109, 95, 103, 101, 116, 73, 119, 78, 83, 95, 49, 57, 105, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 119, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 119, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 55, 110, 117, 109, 95, 112, 117, 116, 73, 99, 78, 83, 95, 49, 57, 111, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 99, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 99, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 55, 110, 117, 109, 95, 112, 117, 116, 73, 119, 78, 83, 95, 49, 57, 111, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 119, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 119, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 56, 116, 105, 109, 101, 95, 103, 101, 116, 73, 99, 78, 83, 95, 49, 57, 105, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 99, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 99, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 56, 116, 105, 109, 101, 95, 103, 101, 116, 73, 119, 78, 83, 95, 49, 57, 105, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 119, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 119, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 56, 116, 105, 109, 101, 95, 112, 117, 116, 73, 99, 78, 83, 95, 49, 57, 111, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 99, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 99, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 56, 116, 105, 109, 101, 95, 112, 117, 116, 73, 119, 78, 83, 95, 49, 57, 111, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 119, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 119, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 48, 109, 111, 110, 101, 121, 112, 117, 110, 99, 116, 73, 99, 76, 98, 48, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 48, 109, 111, 110, 101, 121, 112, 117, 110, 99, 116, 73, 99, 76, 98, 49, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 48, 109, 111, 110, 101, 121, 112, 117, 110, 99, 116, 73, 119, 76, 98, 48, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 48, 109, 111, 110, 101, 121, 112, 117, 110, 99, 116, 73, 119, 76, 98, 49, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 57, 109, 111, 110, 101, 121, 95, 103, 101, 116, 73, 99, 78, 83, 95, 49, 57, 105, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 99, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 99, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 57, 109, 111, 110, 101, 121, 95, 103, 101, 116, 73, 119, 78, 83, 95, 49, 57, 105, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 119, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 119, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 57, 109, 111, 110, 101, 121, 95, 112, 117, 116, 73, 99, 78, 83, 95, 49, 57, 111, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 99, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 99, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 57, 109, 111, 110, 101, 121, 95, 112, 117, 116, 73, 119, 78, 83, 95, 49, 57, 111, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 119, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 119, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 56, 109, 101, 115, 115, 97, 103, 101, 115, 73, 99, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 56, 109, 101, 115, 115, 97, 103, 101, 115, 73, 119, 69, 69, 0, 37, 112, 0, 67, 0, 37, 0, 0, 0, 0, 0, 108, 0, 108, 108, 0, 0, 76, 0, 37, 112, 0, 0, 0, 0, 37, 72, 58, 37, 77, 58, 37, 83, 37, 109, 47, 37, 100, 47, 37, 121, 37, 89, 45, 37, 109, 45, 37, 100, 37, 73, 58, 37, 77, 58, 37, 83, 32, 37, 112, 37, 72, 58, 37, 77, 37, 72, 58, 37, 77, 58, 37, 83, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0, 37, 76, 102, 0, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0, 37, 46, 48, 76, 102, 0, 116, 114, 117, 101, 0, 102, 97, 108, 115, 101, 0, 83, 117, 110, 100, 97, 121, 0, 77, 111, 110, 100, 97, 121, 0, 84, 117, 101, 115, 100, 97, 121, 0, 87, 101, 100, 110, 101, 115, 100, 97, 121, 0, 84, 104, 117, 114, 115, 100, 97, 121, 0, 70, 114, 105, 100, 97, 121, 0, 83, 97, 116, 117, 114, 100, 97, 121, 0, 83, 117, 110, 0, 77, 111, 110, 0, 84, 117, 101, 0, 87, 101, 100, 0, 84, 104, 117, 0, 70, 114, 105, 0, 83, 97, 116, 0, 74, 97, 110, 117, 97, 114, 121, 0, 70, 101, 98, 114, 117, 97, 114, 121, 0, 77, 97, 114, 99, 104, 0, 65, 112, 114, 105, 108, 0, 77, 97, 121, 0, 74, 117, 110, 101, 0, 74, 117, 108, 121, 0, 65, 117, 103, 117, 115, 116, 0, 83, 101, 112, 116, 101, 109, 98, 101, 114, 0, 79, 99, 116, 111, 98, 101, 114, 0, 78, 111, 118, 101, 109, 98, 101, 114, 0, 68, 101, 99, 101, 109, 98, 101, 114, 0, 74, 97, 110, 0, 70, 101, 98, 0, 77, 97, 114, 0, 65, 112, 114, 0, 74, 117, 110, 0, 74, 117, 108, 0, 65, 117, 103, 0, 83, 101, 112, 0, 79, 99, 116, 0, 78, 111, 118, 0, 68, 101, 99, 0, 65, 77, 0, 80, 77, 0, 37, 109, 47, 37, 100, 47, 37, 121, 0, 37, 72, 58, 37, 77, 58, 37, 83, 0, 37, 97, 32, 37, 98, 32, 37, 100, 32, 37, 72, 58, 37, 77, 58, 37, 83, 32, 37, 89, 0, 37, 73, 58, 37, 77, 58, 37, 83, 32, 37, 112, 0, 78, 83, 116, 51, 95, 95, 49, 49, 51, 109, 101, 115, 115, 97, 103, 101, 115, 95, 98, 97, 115, 101, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 49, 95, 95, 109, 111, 110, 101, 121, 95, 112, 117, 116, 73, 119, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 49, 95, 95, 109, 111, 110, 101, 121, 95, 112, 117, 116, 73, 99, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 49, 95, 95, 109, 111, 110, 101, 121, 95, 103, 101, 116, 73, 119, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 49, 95, 95, 109, 111, 110, 101, 121, 95, 103, 101, 116, 73, 99, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 48, 109, 111, 110, 101, 121, 95, 98, 97, 115, 101, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 48, 95, 95, 116, 105, 109, 101, 95, 112, 117, 116, 69, 0, 78, 83, 116, 51, 95, 95, 49, 50, 48, 95, 95, 116, 105, 109, 101, 95, 103, 101, 116, 95, 99, 95, 115, 116, 111, 114, 97, 103, 101, 73, 119, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 50, 48, 95, 95, 116, 105, 109, 101, 95, 103, 101, 116, 95, 99, 95, 115, 116, 111, 114, 97, 103, 101, 73, 99, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 57, 116, 105, 109, 101, 95, 98, 97, 115, 101, 69, 0, 78, 83, 116, 51, 95, 95, 49, 57, 95, 95, 110, 117, 109, 95, 112, 117, 116, 73, 119, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 52, 95, 95, 110, 117, 109, 95, 112, 117, 116, 95, 98, 97, 115, 101, 69, 0, 78, 83, 116, 51, 95, 95, 49, 57, 95, 95, 110, 117, 109, 95, 112, 117, 116, 73, 99, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 57, 95, 95, 110, 117, 109, 95, 103, 101, 116, 73, 119, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 52, 95, 95, 110, 117, 109, 95, 103, 101, 116, 95, 98, 97, 115, 101, 69, 0, 78, 83, 116, 51, 95, 95, 49, 57, 95, 95, 110, 117, 109, 95, 103, 101, 116, 73, 99, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 50, 99, 111, 100, 101, 99, 118, 116, 95, 98, 97, 115, 101, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 48, 99, 116, 121, 112, 101, 95, 98, 97, 115, 101, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 52, 95, 95, 115, 104, 97, 114, 101, 100, 95, 99, 111, 117, 110, 116, 69, 0], "i8", 4, k.ga + 16500);
	var hb = k.ha(E(12, "i8", 2), 8);
	u(0 == hb % 8);
	c._16da5007 = Ub;
	var Vb = oa,
	Wb = pa,
	w = {
		X : 0,
		vb : [],
		p : {},
		La : function (a) {
			if (!a || w.p[a])
				return a;
			for (var b in w.p)
				if (w.p[b].sa === a)
					return b;
			return a
		},
		qb : function (a) {
			a && w.p[a].R++
		},
		zb : function (a) {
			if (a) {
				var b = w.p[a];
				u(0 < b.R);
				b.R--;
				0 === b.R && (b.ua && k.C("vi", b.ua, [a]), delete w.p[a], _516269a3(a))
			}
		},
		Ka : function (a) {
			a && (w.p[a].R = 0)
		}
	};
	c._62c81d47 = Xb;
	var Yb = qa,
	fa = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	ga = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	Zb = oa,
	$b = pa,
	e = {
		g : {
			q : null,
			method : "",
			M : 0,
			n : null,
			A : 0,
			qa : 0,
			ea : 0,
			ja : 0,
			Ca : [],
			pause : function () {
				e.g.q = null;
				e.g.M++
			},
			resume : function () {
				e.g.M++;
				var a = e.g.qa,
				b = e.g.ea,
				c = e.g.n;
				e.g.n = null;
				Ra(c, 0, !1, e.g.A, !0);
				ha(a, b);
				e.g.q()
			},
			kb : function () {
				if (c.setStatus) {
					var a = c.statusMessage || "Please wait...",
					b = e.g.Z,
					d = e.g.Cb;
					b ? b < d ? c.setStatus(a + " (" + (d - b) + "/" + d + ")") : c.setStatus(a) : c.setStatus("")
				}
			},
			$a : function (a) {
				if (!(A || c.preMainLoop && !1 === c.preMainLoop())) {
					try {
						a()
					} catch (b) {
						if (b instanceof S)
							return;
						b && "object" === typeof b && b.stack && c.P("exception thrown: " + [b, b.stack]);
						throw b;
					}
					c.postMainLoop && c.postMainLoop()
				}
			}
		},
		ma : !1,
		na : !1,
		Ua : [],
		workers : [],
		Sa : function () {
			function a() {
				e.na = document.pointerLockElement === d || document.mozPointerLockElement === d || document.webkitPointerLockElement === d || document.msPointerLockElement === d
			}
			c.preloadPlugins || (c.preloadPlugins = []);
			if (!e.Ta) {
				e.Ta = !0;
				try {
					e.V = !0
				} catch (b) {
					e.V = !1,
					console.log("warning: no blob constructor, cannot create blobs with mimetypes")
				}
				e.BlobBuilder = "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : e.V ? null : console.log("warning: no BlobBuilder");
				e.S = "undefined" != typeof n ? n.URL ? n.URL : n.webkitURL : void 0;
				c.Ba || "undefined" !== typeof e.S || (console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."), c.Ba = !0);
				c.preloadPlugins.push({
					canHandle : function (a) {
						return !c.Ba && /\.(jpg|jpeg|png|bmp)$/i.test(a)
					},
					handle : function (a, b, d, l) {
						var f = null;
						if (e.V)
							try {
								f = new Blob([a], {
										type : e.la(b)
									}),
								f.size !== a.length && (f = new Blob([(new Uint8Array(a)).buffer], {
											type : e.la(b)
										}))
							} catch (h) {
								k.K("Blob constructor present but fails: " + h + "; falling back to blob builder")
							}
						f || (f = new e.BlobBuilder, f.append((new Uint8Array(a)).buffer), f = f.getBlob());
						var n = e.S.createObjectURL(f),
						p = new Image;
						p.onload = function () {
							u(p.complete, "Image " + b + " could not be decoded");
							var f = document.createElement("canvas");
							f.width = p.width;
							f.height = p.height;
							f.getContext("2d").drawImage(p, 0, 0);
							c.preloadedImages[b] = f;
							e.S.revokeObjectURL(n);
							d && d(a)
						};
						p.onerror = function () {
							console.log("Image " + n + " could not be decoded");
							l && l()
						};
						p.src = n
					}
				});
				c.preloadPlugins.push({
					canHandle : function (a) {
						return !c.Mb && a.substr(-4)in {
							".ogg" : 1,
							".wav" : 1,
							".mp3" : 1
						}
					},
					handle : function (a, b, d, f) {
						function h(e) {
							n || (n = !0, c.preloadedAudios[b] = e, d && d(a))
						}
						function k() {
							n || (n = !0, c.preloadedAudios[b] = new Audio, f && f())
						}
						var n = !1;
						if (e.V) {
							try {
								var p = new Blob([a], {
										type : e.la(b)
									})
							} catch (u) {
								return k()
							}
							var p = e.S.createObjectURL(p),
							t = new Audio;
							t.addEventListener("canplaythrough", function () {
								h(t)
							}, !1);
							t.onerror = function () {
								if (!n) {
									console.log("warning: browser could not fully decode audio " + b + ", trying slower base64 approach");
									for (var c = "", d = 0, e = 0, f = 0; f < a.length; f++)
										for (d = d << 8 | a[f], e += 8; 6 <= e; )
											var l = d >> e - 6 & 63, e = e - 6, c = c + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l];
									2 == e ? (c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(d & 3) << 4], c += "==") : 4 == e && (c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(d & 15) << 2], c += "=");
									t.src = "data:audio/x-" + b.substr(-3) + ";base64," + c;
									h(t)
								}
							};
							t.src = p;
							e.ab(function () {
								h(t)
							}, 1E4)
						} else
							return k()
					}
				});
				var d = c.canvas;
				d && (d.oa = d.requestPointerLock || d.mozRequestPointerLock || d.webkitRequestPointerLock || d.msRequestPointerLock || function () {}, d.va = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock || document.msExitPointerLock || function () {}, d.va = d.va.bind(document), document.addEventListener("pointerlockchange", a, !1), document.addEventListener("mozpointerlockchange", a, !1), document.addEventListener("webkitpointerlockchange", a, !1), document.addEventListener("mspointerlockchange", a, !1), c.elementPointerLock && d.addEventListener("click", function (a) {
						!e.na && d.oa && (d.oa(), a.preventDefault())
					}, !1))
			}
		},
		createContext : function (a, b, d, f) {
			if (b && c.ia && a == c.canvas)
				return c.ia;
			var g,
			m;
			if (b) {
				m = {
					antialias : !1,
					alpha : !1
				};
				if (f)
					for (var l in f)
						m[l] = f[l];
				if (m = GL.createContext(a, m))
					g = GL.getContext(m).nb;
				a.style.backgroundColor = "black"
			} else
				g = a.getContext("2d");
			if (!g)
				return null;
			d && (b || u("undefined" === typeof GLctx, "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"), c.ia = g, b && GL.Lb(m), c.Xb = b, e.Ua.forEach(function (a) {
					a()
				}), e.Sa());
			return g
		},
		Ab : function () {},
		xa : !1,
		Y : void 0,
		I : void 0,
		$ : function (a, b, d) {
			function f() {
				e.ma = !1;
				var a = g.parentNode;
				(document.webkitFullScreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.mozFullscreenElement || document.fullScreenElement || document.fullscreenElement || document.msFullScreenElement || document.msFullscreenElement || document.webkitCurrentFullScreenElement) === a ? (g.ta = document.cancelFullScreen || document.mozCancelFullScreen || document.webkitCancelFullScreen || document.msExitFullscreen || document.exitFullscreen || function () {}, g.ta = g.ta.bind(document), e.Y && g.oa(), e.ma = !0, e.I && e.cb()) : (a.parentNode.insertBefore(g, a), a.parentNode.removeChild(a), e.I && e.fb());
				if (c.onFullScreen)
					c.onFullScreen(e.ma);
				e.Fa(g)
			}
			e.Y = a;
			e.I = b;
			e.Ga = d;
			"undefined" === typeof e.Y && (e.Y = !0);
			"undefined" === typeof e.I && (e.I = !1);
			"undefined" === typeof e.Ga && (e.Ga = null);
			var g = c.canvas;
			e.xa || (e.xa = !0, document.addEventListener("fullscreenchange", f, !1), document.addEventListener("mozfullscreenchange", f, !1), document.addEventListener("webkitfullscreenchange", f, !1), document.addEventListener("MSFullscreenChange", f, !1));
			var m = document.createElement("div");
			g.parentNode.insertBefore(m, g);
			m.appendChild(g);
			m.$ = m.requestFullScreen || m.mozRequestFullScreen || m.msRequestFullscreen || (m.webkitRequestFullScreen ? function () {
					m.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
				}
					 : null);
			d ? m.$({
				Yb : d
			}) : m.$()
		},
		H : 0,
		wa : function (a) {
			var b = Date.now();
			if (0 === e.H)
				e.H = b + 1E3 / 60;
			else
				for (; b + 2 >= e.H; )
					e.H += 1E3 / 60;
			b = Math.max(e.H - b, 0);
			setTimeout(a, b)
		},
		requestAnimationFrame : function (a) {
			"undefined" === typeof n ? e.wa(a) : (n.requestAnimationFrame || (n.requestAnimationFrame = n.requestAnimationFrame || n.mozRequestAnimationFrame || n.webkitRequestAnimationFrame || n.msRequestAnimationFrame || n.oRequestAnimationFrame || e.wa), n.requestAnimationFrame(a))
		},
		Sb : function (a) {
			return function () {
				if (!A)
					return a.apply(null, arguments)
			}
		},
		L : !0,
		Q : [],
		Ob : function () {
			e.L = !1
		},
		Rb : function () {
			e.L = !0;
			if (0 < e.Q.length) {
				var a = e.Q;
				e.Q = [];
				a.forEach(function (a) {
					a()
				})
			}
		},
		Tb : function (a) {
			return e.requestAnimationFrame(function () {
				A || (e.L ? a() : e.Q.push(a))
			})
		},
		ab : function (a, b) {
			c.noExitRuntime = !0;
			return setTimeout(function () {
				A || (e.L ? a() : e.Q.push(a))
			}, b)
		},
		Ub : function (a, b) {
			c.noExitRuntime = !0;
			return setInterval(function () {
				A || e.L && a()
			}, b)
		},
		la : function (a) {
			return {
				jpg : "image/jpeg",
				jpeg : "image/jpeg",
				png : "image/png",
				bmp : "image/bmp",
				ogg : "audio/ogg",
				wav : "audio/wav",
				mp3 : "audio/mpeg"
			}
			[a.substr(a.lastIndexOf(".") + 1)]
		},
		U : function (a) {
			n.U || (n.U = navigator.getUserMedia || navigator.mozGetUserMedia);
			n.U(a)
		},
		Na : function (a) {
			return a.movementX || a.mozMovementX || a.webkitMovementX || 0
		},
		Oa : function (a) {
			return a.movementY || a.mozMovementY || a.webkitMovementY || 0
		},
		Hb : function (a) {
			var b = 0;
			switch (a.type) {
			case "DOMMouseScroll":
				b = a.detail;
				break;
			case "mousewheel":
				b = a.wheelDelta;
				break;
			case "wheel":
				b = a.deltaY;
				break;
			default:
				throw "unrecognized mouse wheel event: " + a.type;
			}
			return b
		},
		F : 0,
		G : 0,
		N : 0,
		O : 0,
		touches : {},
		za : {},
		tb : function (a) {
			if (e.na)
				"mousemove" != a.type && "mozMovementX" in a ? e.N = e.O = 0 : (e.N = e.Na(a), e.O = e.Oa(a)), "undefined" != typeof SDL ? (e.F = SDL.F + e.N, e.G = SDL.G + e.O) : (e.F += e.N, e.G += e.O);
			else {
				var b = c.canvas.getBoundingClientRect(),
				d = c.canvas.width,
				f = c.canvas.height,
				g = "undefined" !== typeof n.scrollX ? n.scrollX : n.pageXOffset,
				m = "undefined" !== typeof n.scrollY ? n.scrollY : n.pageYOffset;
				if ("touchstart" === a.type || "touchend" === a.type || "touchmove" === a.type) {
					var l = a.Wb;
					if (void 0 !== l)
						if (g = l.pageX - (g + b.left), m = l.pageY - (m + b.top), g *= d / b.width, m *= f / b.height, b = {
								x : g,
								y : m
							}, "touchstart" === a.type)
							e.za[l.identifier] = b, e.touches[l.identifier] = b;
						else if ("touchend" === a.type || "touchmove" === a.type)
							(a = e.touches[l.identifier]) || (a = b), e.za[l.identifier] = a, e.touches[l.identifier] = b
				} else
					l = a.pageX - (g + b.left), a = a.pageY - (m + b.top), l *= d / b.width, a *= f / b.height, e.N = l - e.F, e.O = a - e.G, e.F = l, e.G = a
			}
		},
		mb : function (a, b, c) {
			var e = new XMLHttpRequest;
			e.open("GET", a, !0);
			e.responseType = "arraybuffer";
			e.onload = function () {
				200 == e.status || 0 == e.status && e.response ? b(e.response) : c()
			};
			e.onerror = c;
			e.send(null)
		},
		sb : function (a, b, c, f) {
			e.mb(a, function (c) {
				u(c, 'Loading data file "' + a + '" failed (no arrayBuffer).');
				b(new Uint8Array(c));
				f || Pa()
			}, function () {
				if (c)
					c();
				else
					throw 'Loading data file "' + a + '" failed.';
			});
			f || Oa()
		},
		Za : [],
		ra : function () {
			var a = c.canvas;
			e.Za.forEach(function (b) {
				b(a.width, a.height)
			})
		},
		bb : function (a, b, d) {
			e.Fa(c.canvas, a, b);
			d || e.ra()
		},
		bc : 0,
		ac : 0,
		cb : function () {
			if ("undefined" != typeof SDL) {
				var a = aa[SDL.screen + 0 * k.u >> 2];
				p[SDL.screen + 0 * k.u >> 2] = a | 8388608
			}
			e.ra()
		},
		fb : function () {
			if ("undefined" != typeof SDL) {
				var a = aa[SDL.screen + 0 * k.u >> 2];
				p[SDL.screen + 0 * k.u >> 2] = a & -8388609
			}
			e.ra()
		},
		Fa : function (a, b, d) {
			b && d ? (a.lb = b, a.Ra = d) : (b = a.lb, d = a.Ra);
			var f = b,
			g = d;
			c.forcedAspectRatio && 0 < c.forcedAspectRatio && (f / g < c.forcedAspectRatio ? f = Math.round(g * c.forcedAspectRatio) : g = Math.round(f / c.forcedAspectRatio));
			if ((document.webkitFullScreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.mozFullscreenElement || document.fullScreenElement || document.fullscreenElement || document.msFullScreenElement || document.msFullscreenElement || document.webkitCurrentFullScreenElement) === a.parentNode && "undefined" != typeof screen)
				var m = Math.min(screen.width / f, screen.height / g), f = Math.round(f * m), g = Math.round(g * m);
			e.I ? (a.width != f && (a.width = f), a.height != g && (a.height = g), "undefined" != typeof a.style && (a.style.removeProperty("width"), a.style.removeProperty("height"))) : (a.width != b && (a.width = b), a.height != d && (a.height = d), "undefined" != typeof a.style && (f != b || g != d ? (a.style.setProperty("width", f + "px", "important"), a.style.setProperty("height", g + "px", "important")) : (a.style.removeProperty("width"), a.style.removeProperty("height"))))
		},
		Zb : {},
		Aa : 0,
		Ib : function () {
			var a = e.Aa;
			e.Aa++;
			return a
		}
	};
	c._dd408a = z;
	var ac = Mb;
	c._16d1de1b = bc;
	var cc = qa;
	c._123698b5 = dc;
	c._66e232c9 = ec;
	var fc = Lb,
	gc = Ob;
	c._409ea582 = hc;
	c._35425847 = ic;
	var jc = Nb;
	c.requestFullScreen = function (a, b, c) {
		e.$(a, b, c)
	};
	c.requestAnimationFrame = function (a) {
		e.requestAnimationFrame(a)
	};
	c.setCanvasSize = function (a, b, c) {
		e.bb(a, b, c)
	};
	c.pauseMainLoop = function () {
		e.g.pause()
	};
	c.resumeMainLoop = function () {
		e.g.resume()
	};
	c.getUserMedia = function () {
		e.U()
	};
	c.createContext = function (a, b, c, f) {
		return e.createContext(a, b, c, f)
	};
	eb = D = k.ha(N);
	bb = !0;
	ya = eb + gb;
	fb = B = k.ha(ya);
	u(fb < O, "TOTAL_MEMORY not big enough for stack");
	var kc = E([8, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 7, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0], "i8", 3);
	c.Ia = {
		Math : Math,
		Int8Array : Int8Array,
		Int16Array : Int16Array,
		Int32Array : Int32Array,
		Uint8Array : Uint8Array,
		Uint16Array : Uint16Array,
		Uint32Array : Uint32Array,
		Float32Array : Float32Array,
		Float64Array : Float64Array,
		NaN : NaN,
		Infinity : Infinity
	};
	c.Ja = {
		abort : K,
		assert : u,
		invoke_iiiiiiii : function (a, b, d, e, g, m, l, h) {
			try {
				return c.dynCall_iiiiiiii(a, b, d, e, g, m, l, h)
			} catch (k) {
				if ("number" !== typeof k && "longjmp" !== k)
					throw k;
				f.setThrew(1, 0)
			}
		},
		invoke_iiii : function (a, b, d, e) {
			try {
				return c.dynCall_iiii(a, b, d, e)
			} catch (g) {
				if ("number" !== typeof g && "longjmp" !== g)
					throw g;
				f.setThrew(1, 0)
			}
		},
		invoke_viiiii : function (a, b, d, e, g, m) {
			try {
				c.dynCall_viiiii(a, b, d, e, g, m)
			} catch (l) {
				if ("number" !== typeof l && "longjmp" !== l)
					throw l;
				f.setThrew(1, 0)
			}
		},
		invoke_iiiiiid : function (a, b, d, e, g, m, l) {
			try {
				return c.dynCall_iiiiiid(a, b, d, e, g, m, l)
			} catch (h) {
				if ("number" !== typeof h && "longjmp" !== h)
					throw h;
				f.setThrew(1, 0)
			}
		},
		invoke_vi : function (a, b) {
			try {
				c.dynCall_vi(a, b)
			} catch (d) {
				if ("number" !== typeof d && "longjmp" !== d)
					throw d;
				f.setThrew(1, 0)
			}
		},
		invoke_vii : function (a, b, d) {
			try {
				c.dynCall_vii(a, b, d)
			} catch (e) {
				if ("number" !== typeof e && "longjmp" !== e)
					throw e;
				f.setThrew(1, 0)
			}
		},
		invoke_iiiiiii : function (a, b, d, e, g, m, l) {
			try {
				return c.dynCall_iiiiiii(a, b, d, e, g, m, l)
			} catch (h) {
				if ("number" !== typeof h && "longjmp" !== h)
					throw h;
				f.setThrew(1, 0)
			}
		},
		invoke_iiiiid : function (a, b, d, e, g, m) {
			try {
				return c.dynCall_iiiiid(a, b, d, e, g, m)
			} catch (l) {
				if ("number" !== typeof l && "longjmp" !== l)
					throw l;
				f.setThrew(1, 0)
			}
		},
		invoke_ii : function (a, b) {
			try {
				return c.dynCall_ii(a, b)
			} catch (d) {
				if ("number" !== typeof d && "longjmp" !== d)
					throw d;
				f.setThrew(1, 0)
			}
		},
		invoke_viii : function (a, b, d, e) {
			try {
				c.dynCall_viii(a, b, d, e)
			} catch (g) {
				if ("number" !== typeof g && "longjmp" !== g)
					throw g;
				f.setThrew(1, 0)
			}
		},
		invoke_v : function (a) {
			try {
				c.dynCall_v(a)
			} catch (b) {
				if ("number" !== typeof b && "longjmp" !== b)
					throw b;
				f.setThrew(1, 0)
			}
		},
		invoke_iiiiiiiii : function (a, b, d, e, g, m, l, h, k) {
			try {
				return c.dynCall_iiiiiiiii(a, b, d, e, g, m, l, h, k)
			} catch (n) {
				if ("number" !== typeof n && "longjmp" !== n)
					throw n;
				f.setThrew(1, 0)
			}
		},
		invoke_iiiii : function (a, b, d, e, g) {
			try {
				return c.dynCall_iiiii(a, b, d, e, g)
			} catch (m) {
				if ("number" !== typeof m && "longjmp" !== m)
					throw m;
				f.setThrew(1, 0)
			}
		},
		invoke_viiiiii : function (a, b, d, e, g, m, l) {
			try {
				c.dynCall_viiiiii(a, b, d, e, g, m, l)
			} catch (h) {
				if ("number" !== typeof h && "longjmp" !== h)
					throw h;
				f.setThrew(1, 0)
			}
		},
		invoke_iii : function (a, b, d) {
			try {
				return c.dynCall_iii(a, b, d)
			} catch (e) {
				if ("number" !== typeof e && "longjmp" !== e)
					throw e;
				f.setThrew(1, 0)
			}
		},
		invoke_iiiiii : function (a, b, d, e, g, m) {
			try {
				return c.dynCall_iiiiii(a, b, d, e, g, m)
			} catch (h) {
				if ("number" !== typeof h && "longjmp" !== h)
					throw h;
				f.setThrew(1, 0)
			}
		},
		invoke_viiii : function (a, b, d, e, g) {
			try {
				c.dynCall_viiii(a, b, d, e, g)
			} catch (h) {
				if ("number" !== typeof h && "longjmp" !== h)
					throw h;
				f.setThrew(1, 0)
			}
		},
		_7477ef93 : Zb,
		_2fb1511f : function () {
			return 0
		},
		_14370490 : ac,
		_5f101861 : gc,
		_7331d8db : function (a) {
			return t[a >> 0] ? 0 : t[a >> 0] = 1
		},
		_64179ecb : jc,
		_b04b510 : ha,
		_415aeceb : function (a, b, c, e) {
			A = !0;
			throw "Assertion failed: " + C(a) + ", at: " + [b ? C(b) : "unknown filename", c, e ? C(e) : "unknown function"] + " at " + ta();
		},
		_6457d547 : function (a) {
			return z(a)
		},
		_7e60d112 : V,
		_4a53b0bb : $b,
		_6cc9147d : X,
		_553d0f2b : function () {},
		_60e8a9e4 : Y,
		_236b257e : function (a, b, c, e) {
			return Qa(a, b, c, e)
		},
		_53c5eb36 : Sa,
		_38ccf25 : Vb,
		_31a442a9 : Yb,
		_624d7520 : function (a, b, c) {
			v.set(v.subarray(b, b + c), a);
			return a
		},
		_66e0f9cb : function (a) {
			w.X || (w.X = a);
			w.Ka(w.La(a));
			throw a + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
		},
		_2ddadfda : W,
		_7b6c0f4e : function (a) {
			switch (a) {
			case 30:
				return 4096;
			case 85:
				return F / 4096;
			case 132:
			case 133:
			case 12:
			case 137:
			case 138:
			case 15:
			case 235:
			case 16:
			case 17:
			case 18:
			case 19:
			case 20:
			case 149:
			case 13:
			case 10:
			case 236:
			case 153:
			case 9:
			case 21:
			case 22:
			case 159:
			case 154:
			case 14:
			case 77:
			case 78:
			case 139:
			case 80:
			case 81:
			case 82:
			case 68:
			case 67:
			case 164:
			case 11:
			case 29:
			case 47:
			case 48:
			case 95:
			case 52:
			case 51:
			case 46:
				return 200809;
			case 79:
				return 0;
			case 27:
			case 246:
			case 127:
			case 128:
			case 23:
			case 24:
			case 160:
			case 161:
			case 181:
			case 182:
			case 242:
			case 183:
			case 184:
			case 243:
			case 244:
			case 245:
			case 165:
			case 178:
			case 179:
			case 49:
			case 50:
			case 168:
			case 169:
			case 175:
			case 170:
			case 171:
			case 172:
			case 97:
			case 76:
			case 32:
			case 173:
			case 35:
				return -1;
			case 176:
			case 177:
			case 7:
			case 155:
			case 8:
			case 157:
			case 125:
			case 126:
			case 92:
			case 93:
			case 129:
			case 130:
			case 131:
			case 94:
			case 91:
				return 1;
			case 74:
			case 60:
			case 69:
			case 70:
			case 4:
				return 1024;
			case 31:
			case 42:
			case 72:
				return 32;
			case 87:
			case 26:
			case 33:
				return 2147483647;
			case 34:
			case 1:
				return 47839;
			case 38:
			case 36:
				return 99;
			case 43:
			case 37:
				return 2048;
			case 0:
				return 2097152;
			case 3:
				return 65536;
			case 28:
				return 32768;
			case 44:
				return 32767;
			case 75:
				return 16384;
			case 39:
				return 1E3;
			case 89:
				return 700;
			case 71:
				return 256;
			case 40:
				return 255;
			case 2:
				return 100;
			case 180:
				return 64;
			case 25:
				return 20;
			case 5:
				return 16;
			case 6:
				return 6;
			case 73:
				return 4;
			case 84:
				return "object" === typeof navigator ? navigator.hardwareConcurrency || 1 : 1
			}
			Sa(22);
			return -1
		},
		_51276355 : Qa,
		_43470ef1 : ea,
		_3c0be589 : function (a) {
			c.noExitRuntime = !1;
			c.exit(a)
		},
		_1c272683 : fc,
		_2862305d : function () {
			return 0
		},
		_650ac815 : function () {},
		_77a8f351 : Wb,
		_76514484 : ia,
		_64ebb3d8 : function () {
			c.noExitRuntime = !0;
			throw "SimulateInfiniteLoop";
		},
		_18f4d5a5 : function () {
			return 0
		},
		_39ae03d9 : Ra,
		_60d43094 : M,
		_53cbc56 : function (a, b, c) {
			w.p[a] = {
				Qb : a,
				sa : a,
				type : b,
				ua : c,
				R : 0
			};
			w.X = a;
			"uncaught_exception" in V ? V.o++ : V.o = 1;
			throw a + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
		},
		_104dc0eb : function () {
			c.abort()
		},
		_7c37c73a : function (a) {
			var b = Date.now() / 1E3 | 0;
			a && (p[a >> 2] = b);
			return b
		},
		_36339b6b : function () {},
		_242652bf : cc,
		_4c4fb319 : function (a, b, c, e, f, h, l, k) {
			return J[a](b, c, e, f, h, l, k)
		},
		_35437995 : function (a, b, c, e, f, h, l) {
			return J[a](b, c, e, f, h, l)
		},
		_557febc0 : function (a, b, c, e, f, h) {
			return J[a](b, c, e, f, h)
		},
		_63e0ff58 : function (a, b, c, e, f) {
			return J[a](b, c, e, f)
		},
		_1d345641 : function (a, b, c, e) {
			return J[a](b, c, e)
		},
		_729efcf1 : function (a, b, c) {
			return J[a](b, c)
		},
		_162b8d22 : function (a, b) {
			return J[a](b)
		},
		_192ed844 : function (a) {
			return J[a]()
		},
		STACKTOP : D,
		STACK_MAX : ya,
		tempDoublePtr : hb,
		ABORT : A,
		cttz_i8 : kc
	};
	var f = (function (global, env, buffer) {
		"use asm";
		var a = new global.Int8Array(buffer);
		var b = new global.Int16Array(buffer);
		var c = new global.Int32Array(buffer);
		var d = new global.Uint8Array(buffer);
		var e = new global.Uint16Array(buffer);
		var f = new global.Uint32Array(buffer);
		var g = new global.Float32Array(buffer);
		var h = new global.Float64Array(buffer);
		var i = env.STACKTOP | 0;
		var j = env.STACK_MAX | 0;
		var k = env.tempDoublePtr | 0;
		var l = env.ABORT | 0;
		var m = env.cttz_i8 | 0;
		var n = 0;
		var o = 0;
		var p = 0;
		var q = 0;
		var r = global.NaN,
		s = global.Infinity;
		var t = 0,
		u = 0,
		v = 0,
		w = 0,
		x = 0.0,
		y = 0,
		z = 0,
		A = 0,
		B = 0.0;
		var C = 0;
		var D = 0;
		var E = 0;
		var F = 0;
		var G = 0;
		var H = 0;
		var I = 0;
		var J = 0;
		var K = 0;
		var L = 0;
		var M = global.Math.floor;
		var N = global.Math.abs;
		var O = global.Math.sqrt;
		var P = global.Math.pow;
		var Q = global.Math.cos;
		var R = global.Math.sin;
		var S = global.Math.tan;
		var T = global.Math.acos;
		var U = global.Math.asin;
		var V = global.Math.atan;
		var W = global.Math.atan2;
		var X = global.Math.exp;
		var Y = global.Math.log;
		var Z = global.Math.ceil;
		var _ = global.Math.imul;
		var $ = global.Math.min;
		var aa = global.Math.clz32;
		var ba = env.abort;
		var ca = env.assert;
		var da = env.invoke_iiiiiiii;
		var ea = env.invoke_iiii;
		var fa = env.invoke_viiiii;
		var ga = env.invoke_iiiiiid;
		var ha = env.invoke_vi;
		var ia = env.invoke_vii;
		var ja = env.invoke_iiiiiii;
		var ka = env.invoke_iiiiid;
		var la = env.invoke_ii;
		var ma = env.invoke_viii;
		var na = env.invoke_v;
		var oa = env.invoke_iiiiiiiii;
		var pa = env.invoke_iiiii;
		var qa = env.invoke_viiiiii;
		var ra = env.invoke_iii;
		var sa = env.invoke_iiiiii;
		var ta = env.invoke_viiii;
		var ua = env._7477ef93;
		var va = env._2fb1511f;
		var wa = env._14370490;
		var xa = env._5f101861;
		var ya = env._7331d8db;
		var za = env._64179ecb;
		var Aa = env._b04b510;
		var Ba = env._415aeceb;
		var Ca = env._6457d547;
		var Da = env._7e60d112;
		var Ea = env._4a53b0bb;
		var Fa = env._6cc9147d;
		var Ga = env._553d0f2b;
		var Ha = env._60e8a9e4;
		var Ia = env._236b257e;
		var Ja = env._53c5eb36;
		var Ka = env._38ccf25;
		var La = env._31a442a9;
		var Ma = env._624d7520;
		var Na = env._66e0f9cb;
		var Oa = env._2ddadfda;
		var Pa = env._7b6c0f4e;
		var Qa = env._51276355;
		var Ra = env._43470ef1;
		var Sa = env._3c0be589;
		var Ta = env._1c272683;
		var Ua = env._2862305d;
		var Va = env._650ac815;
		var Wa = env._77a8f351;
		var Xa = env._76514484;
		var Ya = env._64ebb3d8;
		var Za = env._18f4d5a5;
		var _a = env._39ae03d9;
		var $a = env._60d43094;
		var ab = env._53cbc56;
		var bb = env._104dc0eb;
		var cb = env._7c37c73a;
		var db = env._36339b6b;
		var eb = env._242652bf;
		var fb = env._4c4fb319;
		var gb = env._35437995;
		var hb = env._557febc0;
		var ib = env._63e0ff58;
		var jb = env._1d345641;
		var kb = env._729efcf1;
		var lb = env._162b8d22;
		var mb = env._192ed844;
		var nb = 0.0;
		function Fb(a) {
			a = a | 0;
			var b = 0;
			b = i;
			i = i + a | 0;
			i = i + 15 & -16;
			return b | 0
		}
		function Gb() {
			return i | 0
		}
		function Hb(a) {
			a = a | 0;
			i = a
		}
		function Ib(a, b) {
			a = a | 0;
			b = b | 0;
			i = a;
			j = b
		}
		function Jb(a, b) {
			a = a | 0;
			b = b | 0;
			if (!n) {
				n = a;
				o = b
			}
		}
		function Kb(b) {
			b = b | 0;
			a[k >> 0] = a[b >> 0];
			a[k + 1 >> 0] = a[b + 1 >> 0];
			a[k + 2 >> 0] = a[b + 2 >> 0];
			a[k + 3 >> 0] = a[b + 3 >> 0]
		}
		function Lb(b) {
			b = b | 0;
			a[k >> 0] = a[b >> 0];
			a[k + 1 >> 0] = a[b + 1 >> 0];
			a[k + 2 >> 0] = a[b + 2 >> 0];
			a[k + 3 >> 0] = a[b + 3 >> 0];
			a[k + 4 >> 0] = a[b + 4 >> 0];
			a[k + 5 >> 0] = a[b + 5 >> 0];
			a[k + 6 >> 0] = a[b + 6 >> 0];
			a[k + 7 >> 0] = a[b + 7 >> 0]
		}
		function Mb(a) {
			a = a | 0;
			C = a
		}
		function Nb() {
			return C | 0
		}
		function Ob(a) {
			a = a | 0;
			var b = 0;
			b = c[a >> 2] | 0;
			return  + ( + ((c[a + 4 >> 2] | 0) - ((c[887] | 0) / 2 | 0) | 0) / +h[b + 144 >> 3] + +h[b + 128 >> 3])
		}
		function Pb(a) {
			a = a | 0;
			var b = 0;
			b = c[a >> 2] | 0;
			return  + ( + ((c[a + 8 >> 2] | 0) - ((c[888] | 0) / 2 | 0) | 0) / +h[b + 144 >> 3] + +h[b + 136 >> 3])
		}
		function Qb(a) {
			a = a | 0;
			var b = 0;
			b = c[a >> 2] | 0;
			if ((b | 0) != -1) {
				lb(0, b | 0) | 0;
				c[658] = (c[658] | 0) + -1;
				c[a >> 2] = -1
			}
			c[a >> 2] = mb(1) | 0;
			c[658] = (c[658] | 0) + 1;
			return
		}
		function Rb(a) {
			a = a | 0;
			var b = 0;
			b = c[a >> 2] | 0;
			if ((b | 0) == -1)
				return;
			lb(0, b | 0) | 0;
			c[658] = (c[658] | 0) + -1;
			c[a >> 2] = -1;
			return
		}
		function Sb(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			jb(2, c[a >> 2] | 0, b | 0, d | 0) | 0;
			return
		}
		function Tb(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			jb(3, c[a >> 2] | 0, b | 0, d | 0) | 0;
			return
		}
		function Ub(a) {
			a = a | 0;
			lb(4, c[a >> 2] | 0) | 0;
			return
		}
		function Vb(a) {
			a = a | 0;
			lb(5, c[a >> 2] | 0) | 0;
			return
		}
		function Wb(a) {
			a = a | 0;
			lb(6, c[a >> 2] | 0) | 0;
			return
		}
		function Xb(a) {
			a = a | 0;
			lb(7, c[a >> 2] | 0) | 0;
			return
		}
		function Yb(a) {
			a = a | 0;
			lb(8, c[a >> 2] | 0) | 0;
			return
		}
		function Zb(a) {
			a = a | 0;
			lb(9, c[a >> 2] | 0) | 0;
			return
		}
		function _b(a) {
			a = a | 0;
			lb(10, c[a >> 2] | 0) | 0;
			return
		}
		function $b(a, b, d, e, f) {
			a = a | 0;
			b = +b;
			d = +d;
			e = +e;
			f = +f;
			hb(11, c[a >> 2] | 0, +b, +d, +e, +f) | 0;
			return
		}
		function ac(a, b, d, e, f) {
			a = a | 0;
			b = +b;
			d = +d;
			e = +e;
			f = +f;
			hb(12, c[a >> 2] | 0, +b, +d, +e, +f) | 0;
			return
		}
		function bc(a, b) {
			a = a | 0;
			b = b | 0;
			ib(13, c[a >> 2] | 0, d[b >> 0] | 0 | 0, d[b + 1 >> 0] | 0 | 0, d[b + 2 >> 0] | 0 | 0) | 0;
			return
		}
		function cc(a, b) {
			a = a | 0;
			b = b | 0;
			ib(14, c[a >> 2] | 0, d[b >> 0] | 0 | 0, d[b + 1 >> 0] | 0 | 0, d[b + 2 >> 0] | 0 | 0) | 0;
			return
		}
		function dc(a, b) {
			a = a | 0;
			b = +b;
			kb(15, c[a >> 2] | 0, +b) | 0;
			return
		}
		function ec(a, b, d) {
			a = a | 0;
			b = +b;
			d = +d;
			jb(16, c[a >> 2] | 0, +b, +d) | 0;
			return
		}
		function fc(a, b, d) {
			a = a | 0;
			b = +b;
			d = +d;
			jb(17, c[a >> 2] | 0, +b, +d) | 0;
			return
		}
		function gc(a, b, d, e, f, g, h) {
			a = a | 0;
			b = +b;
			d = +d;
			e = +e;
			f = +f;
			g = +g;
			h = h | 0;
			fb(18, c[a >> 2] | 0, +b, +d, +e, +f, +g, h & 1 | 0) | 0;
			return
		}
		function hc(a, b, d) {
			a = a | 0;
			b = +b;
			d = +d;
			jb(19, c[a >> 2] | 0, +b, +d) | 0;
			return
		}
		function ic(a, b, d) {
			a = a | 0;
			b = +b;
			d = +d;
			jb(20, c[a >> 2] | 0, +b, +d) | 0;
			return
		}
		function jc(a, b) {
			a = a | 0;
			b = +b;
			kb(21, c[a >> 2] | 0, +b) | 0;
			return
		}
		function kc(a, b, d, e) {
			a = a | 0;
			b = b | 0;
			d = +d;
			e = +e;
			b = c[b >> 2] | 0;
			if ((b | 0) == -1)
				return;
			ib(22, c[a >> 2] | 0, b | 0, +d, +e) | 0;
			return
		}
		function lc(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = +d;
			e = +e;
			f = +f;
			g = +g;
			b = c[b >> 2] | 0;
			if ((b | 0) == -1)
				return;
			gb(23, c[a >> 2] | 0, b | 0, +d, +e, +f, +g) | 0;
			return
		}
		function mc(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = +d;
			e = +e;
			f = +f;
			g = +g;
			gb(24, c[a >> 2] | 0, c[b >> 2] | 0, +d, +e, +f, +g) | 0;
			return
		}
		function nc(a, b, d, e) {
			a = a | 0;
			b = b | 0;
			d = +d;
			e = +e;
			ib(25, c[a >> 2] | 0, b | 0, +d, +e) | 0;
			return
		}
		function oc(a, b, d, e) {
			a = a | 0;
			b = b | 0;
			d = +d;
			e = +e;
			ib(26, c[a >> 2] | 0, b | 0, +d, +e) | 0;
			return
		}
		function pc(a, b) {
			a = a | 0;
			b = b | 0;
			return  + (+kb(27, c[a >> 2] | 0, b | 0))
		}
		function qc(a, b) {
			a = a | 0;
			b = +b;
			kb(28, c[a >> 2] | 0, +b) | 0;
			return
		}
		function rc(a, b) {
			a = a | 0;
			b = b | 0;
			switch (b | 0) {
			case 0: {
					lb(29, c[a >> 2] | 0) | 0;
					return
				}
			case 1: {
					lb(30, c[a >> 2] | 0) | 0;
					return
				}
			case 2: {
					lb(31, c[a >> 2] | 0) | 0;
					return
				}
			default:
				return
			}
		}
		function sc(a, b) {
			a = a | 0;
			b = b | 0;
			switch (b | 0) {
			case 0: {
					lb(32, c[a >> 2] | 0) | 0;
					return
				}
			case 1: {
					lb(33, c[a >> 2] | 0) | 0;
					return
				}
			case 2: {
					lb(34, c[a >> 2] | 0) | 0;
					return
				}
			default:
				return
			}
		}
		function tc(a, b) {
			a = a | 0;
			b = b | 0;
			switch (b | 0) {
			case 0: {
					lb(35, c[a >> 2] | 0) | 0;
					return
				}
			case 1: {
					lb(36, c[a >> 2] | 0) | 0;
					return
				}
			case 2: {
					lb(37, c[a >> 2] | 0) | 0;
					return
				}
			case 3: {
					lb(38, c[a >> 2] | 0) | 0;
					return
				}
			case 4: {
					lb(39, c[a >> 2] | 0) | 0;
					return
				}
			case 5: {
					lb(40, c[a >> 2] | 0) | 0;
					return
				}
			default:
				return
			}
		}
		function uc(a) {
			a = a | 0;
			var b = 0;
			b = gh(4) | 0;
			c[b >> 2] = lb(41, a | 0) | 0;
			return b | 0
		}
		function vc() {
			return (mb(42) | 0) != 0 | 0
		}
		function wc(b, d) {
			b = b | 0;
			d = d | 0;
			a[b + 4 >> 0] = 0;
			c[b + 8 >> 2] = 0;
			c[b + 12 >> 2] = 0;
			c[b >> 2] = lb(43, d | 0) | 0;
			c[659] = (c[659] | 0) + 1;
			return
		}
		function xc(a) {
			a = a | 0;
			ib(44, c[a >> 2] | 0, a + 4 | 0, a + 8 | 0, a + 12 | 0) | 0;
			return
		}
		function yc(b) {
			b = b | 0;
			var d = 0,
			e = 0.0,
			f = 0.0,
			g = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0.0,
			r = 0.0;
			d = b + 47 | 0;
			if (!(a[d >> 0] | 0))
				return b | 0;
			if (!(vc() | 0))
				return b | 0;
			a[d >> 0] = 0;
			d = b + 48 | 0;
			if (!(a[d >> 0] | 0)) {
				a[d >> 0] = 1;
				Qb(b);
				d = b
			} else
				d = b;
			n = b + 16 | 0;
			qc(d, +h[n >> 3]);
			m = b + 32 | 0;
			q = +h[n >> 3];
			e = +h[m >> 3] * q * 2.0;
			g = b + 4 | 0;
			i = b + 12 | 0;
			j = g + 1 | 0;
			r = +pc(d, (a[g >> 0] & 1) == 0 ? j : c[i >> 2] | 0) + e * 2.0;
			l = b + 24 | 0;
			f = +h[l >> 3];
			p = ~~(r * f);
			c[b + 52 >> 2] = p;
			o = ~~(( + (~~(q * .4) | 0) + +h[n >> 3]) * f);
			k = b + 56 | 0;
			c[k >> 2] = o;
			Sb(d, p, o);
			tc(d, 2);
			qc(d, +h[n >> 3] * +h[l >> 3]);
			dc(d, 1.0);
			jc(d, +h[n >> 3] * +h[m >> 3] * +h[l >> 3]);
			cc(d, b + 43 | 0);
			bc(d, b + 40 | 0);
			e =  + (~~(e * +h[l >> 3]) | 0);
			f =  + ((c[k >> 2] | 0) / 2 | 0 | 0);
			if (a[b + 46 >> 0] | 0)
				oc(d, (a[g >> 0] & 1) == 0 ? j : c[i >> 2] | 0, e, f);
			nc(d, (a[g >> 0] & 1) == 0 ? j : c[i >> 2] | 0, e, f);
			return b | 0
		}
		function zc(a, b) {
			a = a | 0;
			b = b | 0;
			c[a >> 2] = lb(45, b | 0) | 0;
			return
		}
		function Ac(a) {
			a = a | 0;
			lb(46, c[a >> 2] | 0) | 0;
			return
		}
		function Bc(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			jb(47, c[a >> 2] | 0, b | 0, d | 0) | 0;
			return
		}
		function Cc(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			return jb(48, c[a >> 2] | 0, b | 0, d | 0) | 0
		}
		function Dc(a) {
			a = a | 0;
			c[660] = a;
			return
		}
		function Ec() {
			var a = 0;
			a = c[660] | 0;
			if (!a)
				return;
			yb[a & 3]();
			return
		}
		function Fc() {
			return (mb(49) | 0) != 0 | 0
		}
		function Gc() {
			return  + (+mb(50))
		}
		function Hc(a) {
			a = a | 0;
			c[661] = a;
			return
		}
		function Ic() {
			var a = 0;
			a = c[661] | 0;
			if (!a)
				return;
			yb[a & 3]();
			return
		}
		function Jc() {
			Sa(0);
			return
		}
		function Kc(a, b, c) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0;
			c = c^b;
			if ((b | 0) > 3) {
				f = b + -4 | 0;
				g = f & -4;
				h = g + 4 | 0;
				e = a;
				while (1) {
					j = _(d[e >> 0] | d[e + 1 >> 0] << 8 | d[e + 2 >> 0] << 16 | d[e + 3 >> 0] << 24, 1540483477) | 0;
					c = (_(j >>> 24^j, 1540483477) | 0)^(_(c, 1540483477) | 0);
					b = b + -4 | 0;
					if ((b | 0) <= 3)
						break;
					else
						e = e + 4 | 0
				}
				b = f - g | 0;
				a = a + h | 0
			}
			switch (b | 0) {
			case 3: {
					c = (d[a + 2 >> 0] | 0) << 16^c;
					i = 7;
					break
				}
			case 2: {
					i = 7;
					break
				}
			case 1:
				break;
			default: {
					j = c;
					i = j >>> 13;
					j = i^j;
					j = _(j, 1540483477) | 0;
					i = j >>> 15;
					j = i^j;
					return j | 0
				}
			}
			if ((i | 0) == 7)
				c = (d[a + 1 >> 0] | 0) << 8^c;
			j = _((d[a >> 0] | 0)^c, 1540483477) | 0;
			i = j >>> 13;
			j = i^j;
			j = _(j, 1540483477) | 0;
			i = j >>> 15;
			j = i^j;
			return j | 0
		}
		function Lc(b) {
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0;
			f = a[b >> 0] | 0;
			d = (f & 1) == 0;
			if (d)
				e = (f & 255) >>> 1;
			else
				e = c[b + 4 >> 2] | 0;
			if (!e) {
				b = 0;
				return b | 0
			}
			if (d) {
				e = b + 1 | 0;
				f = ((f & 255) >>> 1) + (b + 1) | 0;
				d = b + 1 | 0
			} else {
				d = c[b + 8 >> 2] | 0;
				e = d;
				f = d + (c[b + 4 >> 2] | 0) | 0
			}
			if ((e | 0) != (f | 0))
				while (1) {
					g = a[e >> 0] | 0;
					a[d >> 0] = (g + -65 & 255) < 26 ? (g & 255) + 32 & 255 : g;
					e = e + 1 | 0;
					if ((e | 0) == (f | 0))
						break;
					else
						d = d + 1 | 0
				}
			d = Oc(2648, b) | 0;
			if (!d) {
				g = 0;
				return g | 0
			}
			g = c[d + 20 >> 2] | 0;
			return g | 0
		}
		function Mc(b) {
			b = b | 0;
			var d = 0;
			d = a[b >> 0] | 0;
			if (!(((d & 1) == 0 ? (d & 255) >>> 1 : c[b + 4 >> 2] | 0) | 0)) {
				d = 0;
				return d | 0
			}
			b = Oc(2668, b) | 0;
			if (!b) {
				d = 0;
				return d | 0
			}
			d = c[b + 20 >> 2] | 0;
			return d | 0
		}
		function Nc(b, d, e, f, g) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			m = i;
			i = i + 32 | 0;
			j = m + 24 | 0;
			h = m + 12 | 0;
			k = m;
			l = gh(24) | 0;
			oj(l, e, Ti(e) | 0);
			c[l + 12 >> 2] = f;
			c[l + 16 >> 2] = 0;
			a[l + 20 >> 0] = g >>> 16;
			a[l + 21 >> 0] = g >>> 8;
			a[l + 22 >> 0] = g;
			if (b) {
				oj(h, b, Ti(b) | 0);
				g = Oc(2648, h) | 0;
				if (!g) {
					g = gh(24) | 0;
					b = g + 8 | 0;
					c[b >> 2] = c[h >> 2];
					c[b + 4 >> 2] = c[h + 4 >> 2];
					c[b + 8 >> 2] = c[h + 8 >> 2];
					c[h >> 2] = 0;
					c[h + 4 >> 2] = 0;
					c[h + 8 >> 2] = 0;
					c[g + 20 >> 2] = 0;
					Pc(j, 2648, g);
					g = c[j >> 2] | 0
				}
				c[g + 20 >> 2] = l;
				qj(h)
			}
			if (!d) {
				i = m;
				return
			}
			oj(k, d, Ti(d) | 0);
			g = Oc(2668, k) | 0;
			if (!g) {
				g = gh(24) | 0;
				d = g + 8 | 0;
				c[d >> 2] = c[k >> 2];
				c[d + 4 >> 2] = c[k + 4 >> 2];
				c[d + 8 >> 2] = c[k + 8 >> 2];
				c[k >> 2] = 0;
				c[k + 4 >> 2] = 0;
				c[k + 8 >> 2] = 0;
				c[g + 20 >> 2] = 0;
				Pc(j, 2668, g);
				g = c[j >> 2] | 0
			}
			c[g + 20 >> 2] = l;
			qj(k);
			i = m;
			return
		}
		function Oc(b, e) {
			b = b | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0;
			m = a[e >> 0] | 0;
			l = (m & 1) == 0;
			n = l ? e + 1 | 0 : c[e + 8 >> 2] | 0;
			m = l ? (m & 255) >>> 1 : c[e + 4 >> 2] | 0;
			if (m >>> 0 > 3) {
				f = m;
				g = n;
				e = m;
				while (1) {
					l = _(d[g >> 0] | d[g + 1 >> 0] << 8 | d[g + 2 >> 0] << 16 | d[g + 3 >> 0] << 24, 1540483477) | 0;
					e = (_(l >>> 24^l, 1540483477) | 0)^(_(e, 1540483477) | 0);
					f = f + -4 | 0;
					if (f >>> 0 <= 3)
						break;
					else
						g = g + 4 | 0
				}
				f = m + -4 | 0;
				g = f & -4;
				f = f - g | 0;
				g = n + (g + 4) | 0
			} else {
				f = m;
				g = n;
				e = m
			}
			switch (f | 0) {
			case 3: {
					j = d[g + 2 >> 0] << 16^e;
					k = 6;
					break
				}
			case 2: {
					j = e;
					k = 6;
					break
				}
			case 1: {
					h = e;
					k = 7;
					break
				}
			default:
				i = e
			}
			if ((k | 0) == 6) {
				h = d[g + 1 >> 0] << 8^j;
				k = 7
			}
			if ((k | 0) == 7)
				i = _(d[g >> 0]^h, 1540483477) | 0;
			e = _(i >>> 13^i, 1540483477) | 0;
			e = e >>> 15^e;
			i = c[b + 4 >> 2] | 0;
			if (!i) {
				n = 0;
				return n | 0
			}
			j = i + -1 | 0;
			f = (j & i | 0) == 0;
			if (f)
				l = e & j;
			else
				l = (e >>> 0) % (i >>> 0) | 0;
			e = c[(c[b >> 2] | 0) + (l << 2) >> 2] | 0;
			if (!e) {
				n = 0;
				return n | 0
			}
			e = c[e >> 2] | 0;
			if (!e) {
				n = 0;
				return n | 0
			}
			k = (m | 0) == 0;
			if (f) {
				a : while (1) {
					if ((c[e + 4 >> 2] & j | 0) != (l | 0)) {
						e = 0;
						k = 31;
						break
					}
					f = e + 8 | 0;
					b = a[f >> 0] | 0;
					g = (b & 1) == 0;
					b : do
						if (((g ? (b & 255) >>> 1 : c[e + 12 >> 2] | 0) | 0) == (m | 0)) {
							f = g ? f + 1 | 0 : c[e + 16 >> 2] | 0;
							if (!g)
								if (!(Ri(f, n, m) | 0)) {
									k = 31;
									break a
								} else
									break;
							if (k) {
								k = 31;
								break a
							} else {
								h = m;
								g = n
							}
							while (1) {
								if ((a[f >> 0] | 0) != (a[g >> 0] | 0))
									break b;
								h = h + -1 | 0;
								if (!h) {
									k = 31;
									break a
								} else {
									f = f + 1 | 0;
									g = g + 1 | 0
								}
							}
						}
					while (0);
					e = c[e >> 2] | 0;
					if (!e) {
						e = 0;
						k = 31;
						break
					}
				}
				if ((k | 0) == 31)
					return e | 0
			} else {
				c : while (1) {
					if ((((c[e + 4 >> 2] | 0) >>> 0) % (i >>> 0) | 0 | 0) != (l | 0)) {
						e = 0;
						k = 31;
						break
					}
					f = e + 8 | 0;
					b = a[f >> 0] | 0;
					g = (b & 1) == 0;
					d : do
						if (((g ? (b & 255) >>> 1 : c[e + 12 >> 2] | 0) | 0) == (m | 0)) {
							f = g ? f + 1 | 0 : c[e + 16 >> 2] | 0;
							if (!g)
								if (!(Ri(f, n, m) | 0)) {
									k = 31;
									break c
								} else
									break;
							if (k) {
								k = 31;
								break c
							} else {
								h = m;
								g = n
							}
							while (1) {
								if ((a[f >> 0] | 0) != (a[g >> 0] | 0))
									break d;
								h = h + -1 | 0;
								if (!h) {
									k = 31;
									break c
								} else {
									f = f + 1 | 0;
									g = g + 1 | 0
								}
							}
						}
					while (0);
					e = c[e >> 2] | 0;
					if (!e) {
						e = 0;
						k = 31;
						break
					}
				}
				if ((k | 0) == 31)
					return e | 0
			}
			return 0
		}
		function Pc(b, e, f) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			var h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0.0,
			m = 0.0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0;
			w = f + 8 | 0;
			v = a[w >> 0] | 0;
			u = (v & 1) == 0;
			w = u ? w + 1 | 0 : c[f + 16 >> 2] | 0;
			v = u ? (v & 255) >>> 1 : c[f + 12 >> 2] | 0;
			if (v >>> 0 > 3) {
				j = v;
				k = w;
				i = v;
				while (1) {
					u = _(d[k >> 0] | d[k + 1 >> 0] << 8 | d[k + 2 >> 0] << 16 | d[k + 3 >> 0] << 24, 1540483477) | 0;
					i = (_(u >>> 24^u, 1540483477) | 0)^(_(i, 1540483477) | 0);
					j = j + -4 | 0;
					if (j >>> 0 <= 3)
						break;
					else
						k = k + 4 | 0
				}
				j = v + -4 | 0;
				k = j & -4;
				j = j - k | 0;
				k = w + (k + 4) | 0
			} else {
				j = v;
				k = w;
				i = v
			}
			switch (j | 0) {
			case 3: {
					i = d[k + 2 >> 0] << 16^i;
					n = 6;
					break
				}
			case 2: {
					n = 6;
					break
				}
			case 1: {
					n = 7;
					break
				}
			default: {}

			}
			if ((n | 0) == 6) {
				i = d[k + 1 >> 0] << 8^i;
				n = 7
			}
			if ((n | 0) == 7)
				i = _(d[k >> 0]^i, 1540483477) | 0;
			i = _(i >>> 13^i, 1540483477) | 0;
			i = i >>> 15^i;
			u = f + 4 | 0;
			c[u >> 2] = i;
			t = e + 4 | 0;
			k = c[t >> 2] | 0;
			s = (k | 0) == 0;
			a : do
				if (!s) {
					q = k + -1 | 0;
					r = (q & k | 0) == 0;
					if (r)
						i = i & q;
					else
						i = (i >>> 0) % (k >>> 0) | 0;
					j = c[(c[e >> 2] | 0) + (i << 2) >> 2] | 0;
					if ((j | 0) != 0 ? (h = c[j >> 2] | 0, (h | 0) != 0) : 0) {
						p = (v | 0) == 0;
						b : while (1) {
							j = c[h + 4 >> 2] | 0;
							if (r)
								j = j & q;
							else
								j = (j >>> 0) % (k >>> 0) | 0;
							if ((j | 0) != (i | 0))
								break a;
							j = h + 8 | 0;
							o = a[j >> 0] | 0;
							n = (o & 1) == 0;
							c : do
								if (((n ? (o & 255) >>> 1 : c[h + 12 >> 2] | 0) | 0) == (v | 0)) {
									j = n ? j + 1 | 0 : c[h + 16 >> 2] | 0;
									if (!n)
										if (!(Ri(j, w, v) | 0)) {
											i = 0;
											n = 40;
											break b
										} else
											break;
									if (p) {
										i = 0;
										n = 40;
										break b
									} else {
										o = v;
										n = w
									}
									while (1) {
										if ((a[j >> 0] | 0) != (a[n >> 0] | 0))
											break c;
										o = o + -1 | 0;
										if (!o) {
											i = 0;
											n = 40;
											break b
										} else {
											j = j + 1 | 0;
											n = n + 1 | 0
										}
									}
								}
							while (0);
							h = c[h >> 2] | 0;
							if (!h)
								break a
						}
						if ((n | 0) == 40) {
							e = h;
							c[b >> 2] = e;
							b = b + 4 | 0;
							a[b >> 0] = i;
							return
						}
					}
				} else
					i = 0;
			while (0);
			n = e + 12 | 0;
			l =  + (((c[n >> 2] | 0) + 1 | 0) >>> 0);
			m = +g[e + 16 >> 2];
			do
				if (s | l >  + (k >>> 0) * m) {
					if (k >>> 0 > 2)
						h = (k + -1 & k | 0) == 0;
					else
						h = 0;
					j = (h & 1 | k << 1)^1;
					h = ~~+Z( + (l / m)) >>> 0;
					Qc(e, j >>> 0 < h >>> 0 ? h : j);
					j = c[t >> 2] | 0;
					h = c[u >> 2] | 0;
					i = j + -1 | 0;
					if (!(i & j)) {
						k = j;
						i = i & h;
						break
					} else {
						k = j;
						i = (h >>> 0) % (j >>> 0) | 0;
						break
					}
				}
			while (0);
			h = c[(c[e >> 2] | 0) + (i << 2) >> 2] | 0;
			if (!h) {
				h = e + 8 | 0;
				c[f >> 2] = c[h >> 2];
				c[h >> 2] = f;
				c[(c[e >> 2] | 0) + (i << 2) >> 2] = h;
				h = c[f >> 2] | 0;
				if (h) {
					h = c[h + 4 >> 2] | 0;
					i = k + -1 | 0;
					if (!(i & k))
						h = h & i;
					else
						h = (h >>> 0) % (k >>> 0) | 0;
					c[(c[e >> 2] | 0) + (h << 2) >> 2] = f
				}
			} else {
				c[f >> 2] = c[h >> 2];
				c[h >> 2] = f
			}
			c[n >> 2] = (c[n >> 2] | 0) + 1;
			e = 1;
			c[b >> 2] = f;
			b = b + 4 | 0;
			a[b >> 0] = e;
			return
		}
		function Qc(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0;
			if ((b | 0) != 1) {
				if (b + -1 & b)
					b = lj(b) | 0
			} else
				b = 2;
			f = c[a + 4 >> 2] | 0;
			if (b >>> 0 > f >>> 0) {
				Rc(a, b);
				return
			}
			if (b >>> 0 >= f >>> 0)
				return;
			if (f >>> 0 > 2)
				e = (f + -1 & f | 0) == 0;
			else
				e = 0;
			d = ~~+Z( + ( + ((c[a + 12 >> 2] | 0) >>> 0) / +g[a + 16 >> 2])) >>> 0;
			if (e)
				d = 1 << 32 - (aa(d + -1 | 0) | 0);
			else
				d = lj(d) | 0;
			b = b >>> 0 < d >>> 0 ? d : b;
			if (b >>> 0 >= f >>> 0)
				return;
			Rc(a, b);
			return
		}
		function Rc(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0;
			f = b + 4 | 0;
			if (!d) {
				e = c[b >> 2] | 0;
				c[b >> 2] = 0;
				if (e)
					ih(e);
				c[f >> 2] = 0;
				return
			}
			t = gh(d << 2) | 0;
			e = c[b >> 2] | 0;
			c[b >> 2] = t;
			if (e)
				ih(e);
			c[f >> 2] = d;
			e = 0;
			do {
				c[(c[b >> 2] | 0) + (e << 2) >> 2] = 0;
				e = e + 1 | 0
			} while ((e | 0) != (d | 0));
			f = b + 8 | 0;
			h = c[f >> 2] | 0;
			if (!h)
				return;
			e = c[h + 4 >> 2] | 0;
			s = d + -1 | 0;
			t = (s & d | 0) == 0;
			if (t)
				g = e & s;
			else
				g = (e >>> 0) % (d >>> 0) | 0;
			c[(c[b >> 2] | 0) + (g << 2) >> 2] = f;
			e = c[h >> 2] | 0;
			if (!e)
				return;
			else {
				i = h;
				f = h
			}
			a : while (1) {
				r = f;
				b : while (1) {
					while (1) {
						f = c[e + 4 >> 2] | 0;
						if (t)
							q = f & s;
						else
							q = (f >>> 0) % (d >>> 0) | 0;
						if ((q | 0) == (g | 0)) {
							f = e;
							break
						}
						f = (c[b >> 2] | 0) + (q << 2) | 0;
						if (!(c[f >> 2] | 0)) {
							g = q;
							h = e;
							e = r;
							break b
						}
						f = c[e >> 2] | 0;
						c : do
							if (!f)
								f = e;
							else {
								n = e + 8 | 0;
								p = a[n >> 0] | 0;
								m = (p & 1) == 0;
								p = m ? (p & 255) >>> 1 : c[e + 12 >> 2] | 0;
								l = e + 16 | 0;
								n = n + 1 | 0;
								o = (p | 0) == 0;
								if (m)
									l = e;
								else {
									k = e;
									while (1) {
										h = f + 8 | 0;
										o = a[h >> 0] | 0;
										j = (o & 1) == 0;
										if ((p | 0) != ((j ? (o & 255) >>> 1 : c[f + 12 >> 2] | 0) | 0)) {
											f = k;
											break c
										}
										if (Ri(c[l >> 2] | 0, j ? h + 1 | 0 : c[f + 16 >> 2] | 0, p) | 0) {
											f = k;
											break c
										}
										h = c[f >> 2] | 0;
										if (!h)
											break c;
										else {
											k = f;
											f = h
										}
									}
								}
								while (1) {
									h = f + 8 | 0;
									m = a[h >> 0] | 0;
									j = (m & 1) == 0;
									if ((p | 0) != ((j ? (m & 255) >>> 1 : c[f + 12 >> 2] | 0) | 0)) {
										f = l;
										break c
									}
									if (!o) {
										k = p;
										m = n;
										h = j ? h + 1 | 0 : c[f + 16 >> 2] | 0;
										while (1) {
											if ((a[m >> 0] | 0) != (a[h >> 0] | 0)) {
												f = l;
												break c
											}
											k = k + -1 | 0;
											if (!k)
												break;
											else {
												m = m + 1 | 0;
												h = h + 1 | 0
											}
										}
									}
									h = c[f >> 2] | 0;
									if (!h)
										break;
									else {
										l = f;
										f = h
									}
								}
							}
						while (0);
						c[r >> 2] = c[f >> 2];
						c[f >> 2] = c[c[(c[b >> 2] | 0) + (q << 2) >> 2] >> 2];
						c[c[(c[b >> 2] | 0) + (q << 2) >> 2] >> 2] = e;
						e = c[i >> 2] | 0;
						if (!e) {
							e = 35;
							break a
						}
					}
					e = c[f >> 2] | 0;
					if (!e) {
						e = 35;
						break a
					} else {
						i = f;
						r = f
					}
				}
				c[f >> 2] = e;
				e = c[h >> 2] | 0;
				if (!e) {
					e = 35;
					break
				} else {
					i = h;
					f = h
				}
			}
			if ((e | 0) == 35)
				return
		}
		function Sc(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			j = 0,
			k = 0,
			l = 0;
			l = i;
			i = i + 32 | 0;
			k = l;
			c[a >> 2] = b;
			c[a + 4 >> 2] = 0;
			h[a + 8 >> 3] = 0.0;
			c[a + 16 >> 2] = 673720360;
			j = a + 60 | 0;
			g = a + 64 | 0;
			b = a + 20 | 0;
			d = b + 48 | 0;
			do {
				c[b >> 2] = 0;
				b = b + 4 | 0
			} while ((b | 0) < (d | 0));
			f = gh(6144) | 0;
			c[g >> 2] = f;
			c[j >> 2] = f;
			e = f + 6144 | 0;
			c[a + 68 >> 2] = e;
			b = 256;
			d = f;
			while (1) {
				c[d + 16 >> 2] = 0;
				b = b + -1 | 0;
				if (!b)
					break;
				else
					d = d + 24 | 0
			}
			c[g >> 2] = e;
			b = k + 16 | 0;
			c[b >> 2] = k;
			c[k >> 2] = 2696;
			c[k + 4 >> 2] = a;
			cd(k, f + 384 | 0);
			b = c[b >> 2] | 0;
			if ((b | 0) != (k | 0)) {
				if (b)
					sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
			} else
				sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
			g = (c[j >> 2] | 0) + 408 | 0;
			b = k + 16 | 0;
			c[b >> 2] = k;
			c[k >> 2] = 2732;
			c[k + 4 >> 2] = a;
			cd(k, g);
			b = c[b >> 2] | 0;
			if ((b | 0) != (k | 0)) {
				if (b)
					sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
			} else
				sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
			g = (c[j >> 2] | 0) + 432 | 0;
			b = k + 16 | 0;
			c[b >> 2] = k;
			c[k >> 2] = 2768;
			c[k + 4 >> 2] = a;
			cd(k, g);
			b = c[b >> 2] | 0;
			if ((b | 0) != (k | 0)) {
				if (b)
					sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
			} else
				sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
			g = (c[j >> 2] | 0) + 480 | 0;
			b = k + 16 | 0;
			c[b >> 2] = k;
			c[k >> 2] = 2804;
			c[k + 4 >> 2] = a;
			cd(k, g);
			b = c[b >> 2] | 0;
			if ((b | 0) != (k | 0)) {
				if (b)
					sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
			} else
				sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
			g = (c[j >> 2] | 0) + 768 | 0;
			b = k + 16 | 0;
			c[b >> 2] = k;
			c[k >> 2] = 2840;
			c[k + 4 >> 2] = a;
			cd(k, g);
			b = c[b >> 2] | 0;
			if ((b | 0) != (k | 0)) {
				if (b)
					sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
			} else
				sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
			g = (c[j >> 2] | 0) + 1176 | 0;
			b = k + 16 | 0;
			c[b >> 2] = k;
			c[k >> 2] = 2876;
			c[k + 4 >> 2] = a;
			cd(k, g);
			b = c[b >> 2] | 0;
			if ((b | 0) != (k | 0)) {
				if (b)
					sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
			} else
				sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
			g = (c[j >> 2] | 0) + 1200 | 0;
			b = k + 16 | 0;
			c[b >> 2] = k;
			c[k >> 2] = 2912;
			c[k + 4 >> 2] = a;
			cd(k, g);
			b = c[b >> 2] | 0;
			if ((b | 0) != (k | 0)) {
				if (b)
					sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
			} else
				sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
			g = (c[j >> 2] | 0) + 1536 | 0;
			b = k + 16 | 0;
			c[b >> 2] = k;
			c[k >> 2] = 2948;
			c[k + 4 >> 2] = a;
			cd(k, g);
			b = c[b >> 2] | 0;
			if ((b | 0) != (k | 0)) {
				if (b)
					sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
			} else
				sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
			g = (c[j >> 2] | 0) + 2448 | 0;
			b = k + 16 | 0;
			c[b >> 2] = k;
			c[k >> 2] = 2984;
			cd(k, g);
			b = c[b >> 2] | 0;
			if ((b | 0) != (k | 0)) {
				if (b)
					sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
			} else
				sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
			g = (c[j >> 2] | 0) + 2472 | 0;
			b = k + 16 | 0;
			c[b >> 2] = k;
			c[k >> 2] = 3020;
			cd(k, g);
			b = c[b >> 2] | 0;
			if ((b | 0) != (k | 0)) {
				if (b)
					sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
			} else
				sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
			g = (c[j >> 2] | 0) + 2496 | 0;
			b = k + 16 | 0;
			c[b >> 2] = k;
			c[k >> 2] = 3056;
			cd(k, g);
			b = c[b >> 2] | 0;
			if ((b | 0) != (k | 0)) {
				if (b)
					sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
			} else
				sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
			g = (c[j >> 2] | 0) + 5784 | 0;
			b = k + 16 | 0;
			c[b >> 2] = k;
			c[k >> 2] = 3092;
			c[k + 4 >> 2] = a;
			cd(k, g);
			b = c[b >> 2] | 0;
			if ((b | 0) != (k | 0)) {
				if (b)
					sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
			} else
				sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
			g = (c[j >> 2] | 0) + 6120 | 0;
			b = k + 16 | 0;
			c[b >> 2] = k;
			c[k >> 2] = 3128;
			c[k + 4 >> 2] = a;
			cd(k, g);
			b = c[b >> 2] | 0;
			if ((b | 0) != (k | 0)) {
				if (b)
					sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
			} else
				sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
			g = (c[j >> 2] | 0) + 2688 | 0;
			b = k + 16 | 0;
			c[b >> 2] = k;
			c[k >> 2] = 3164;
			c[k + 4 >> 2] = a;
			cd(k, g);
			b = c[b >> 2] | 0;
			if ((b | 0) != (k | 0)) {
				if (b)
					sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
			} else
				sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
			j = (c[j >> 2] | 0) + 3072 | 0;
			b = k + 16 | 0;
			c[b >> 2] = k;
			c[k >> 2] = 3200;
			cd(k, j);
			b = c[b >> 2] | 0;
			if ((b | 0) == (k | 0)) {
				sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
				i = l;
				return
			}
			if (!b) {
				i = l;
				return
			}
			sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b);
			i = l;
			return
		}
		function Tc(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0;
			l = i;
			i = i + 80 | 0;
			k = l + 36 | 0;
			j = l + 24 | 0;
			f = l + 12 | 0;
			g = l;
			h = l + 48 | 0;
			if (!(a[e >> 0] & 1))
				d = e + 1 | 0;
			else
				d = c[e + 8 >> 2] | 0;
			m = Oi(d, 0, 10) | 0;
			e = C;
			d = dd() | 0;
			oj(k, 17761, 32);
			c[f >> 2] = 0;
			c[f + 4 >> 2] = 0;
			c[f + 8 >> 2] = 0;
			n = a[k >> 0] | 0;
			o = (n & 1) == 0;
			n = o ? (n & 255) >>> 1 : c[k + 4 >> 2] | 0;
			Cj(f, o ? k + 1 | 0 : c[k + 8 >> 2] | 0, n, n + 1 | 0);
			zj(f, 17794, 1) | 0;
			Mj(g, d^m, ~d^e);
			e = a[g >> 0] | 0;
			d = (e & 1) == 0;
			e = zj(f, d ? g + 1 | 0 : c[g + 8 >> 2] | 0, d ? (e & 255) >>> 1 : c[g + 4 >> 2] | 0) | 0;
			c[j >> 2] = c[e >> 2];
			c[j + 4 >> 2] = c[e + 4 >> 2];
			c[j + 8 >> 2] = c[e + 8 >> 2];
			c[e >> 2] = 0;
			c[e + 4 >> 2] = 0;
			c[e + 8 >> 2] = 0;
			qj(g);
			qj(f);
			e = a[j >> 0] | 0;
			g = (e & 1) == 0;
			ig(g ? j + 1 | 0 : c[j + 8 >> 2] | 0, g ? (e & 255) >>> 1 : c[j + 4 >> 2] | 0, h);
			e = gh(32) | 0;
			c[b + 8 >> 2] = e;
			c[b >> 2] = 33;
			c[b + 4 >> 2] = 20;
			a[e >> 0] = a[h >> 0] | 0;
			a[e + 1 >> 0] = a[h + 1 >> 0] | 0;
			a[e + 2 >> 0] = a[h + 2 >> 0] | 0;
			a[e + 3 >> 0] = a[h + 3 >> 0] | 0;
			a[e + 4 >> 0] = a[h + 4 >> 0] | 0;
			a[e + 5 >> 0] = a[h + 5 >> 0] | 0;
			a[e + 6 >> 0] = a[h + 6 >> 0] | 0;
			a[e + 7 >> 0] = a[h + 7 >> 0] | 0;
			a[e + 8 >> 0] = a[h + 8 >> 0] | 0;
			a[e + 9 >> 0] = a[h + 9 >> 0] | 0;
			a[e + 10 >> 0] = a[h + 10 >> 0] | 0;
			a[e + 11 >> 0] = a[h + 11 >> 0] | 0;
			a[e + 12 >> 0] = a[h + 12 >> 0] | 0;
			a[e + 13 >> 0] = a[h + 13 >> 0] | 0;
			a[e + 14 >> 0] = a[h + 14 >> 0] | 0;
			a[e + 15 >> 0] = a[h + 15 >> 0] | 0;
			a[e + 16 >> 0] = a[h + 16 >> 0] | 0;
			a[e + 17 >> 0] = a[h + 17 >> 0] | 0;
			a[e + 18 >> 0] = a[h + 18 >> 0] | 0;
			a[e + 19 >> 0] = a[h + 19 >> 0] | 0;
			a[e + 20 >> 0] = 0;
			qj(j);
			qj(k);
			i = l;
			return
		}
		function Uc(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0;
			t = i;
			i = i + 16 | 0;
			r = t;
			c[r >> 2] = 0;
			c[r + 4 >> 2] = 0;
			c[r + 8 >> 2] = 0;
			o = r + 4 | 0;
			s = r + 8 | 0;
			p = r + 12 | 0;
			n = gh(1) | 0;
			j = n + 1 | 0;
			a[n >> 0] = 105;
			c[o >> 2] = n;
			c[s >> 2] = j;
			c[p >> 2] = j;
			j = n;
			k = c[s >> 2] | 0;
			l = k - j | 0;
			m = gh(2) | 0;
			a[m + l >> 0] = 1;
			j = k - j | 0;
			k = m + (l - j) | 0;
			js(k | 0, n | 0, j | 0) | 0;
			c[o >> 2] = k;
			c[s >> 2] = m + (l + 1);
			c[p >> 2] = m + 2;
			ih(n);
			while (1) {
				k = a[d >> 0] | 0;
				e = c[s >> 2] | 0;
				if ((e | 0) == (c[p >> 2] | 0)) {
					l = c[o >> 2] | 0;
					m = l;
					f = e - m + 1 | 0;
					if ((f | 0) < 0) {
						q = 5;
						break
					}
					n = l;
					e = e - n | 0;
					if (e >>> 0 < 1073741823) {
						e = e << 1;
						e = e >>> 0 < f >>> 0 ? f : e;
						g = c[s >> 2] | 0;
						f = g - n | 0;
						if (!e) {
							j = 0;
							h = 0;
							e = g
						} else
							q = 9
					} else {
						f = c[s >> 2] | 0;
						e = 2147483647;
						g = f;
						f = f - n | 0;
						q = 9
					}
					if ((q | 0) == 9) {
						q = 0;
						j = e;
						h = gh(e) | 0;
						e = g
					}
					a[h + f >> 0] = k;
					k = e - n | 0;
					n = h + (f - k) | 0;
					js(n | 0, l | 0, k | 0) | 0;
					c[o >> 2] = n;
					c[s >> 2] = h + (f + 1);
					c[p >> 2] = h + j;
					if (m)
						ih(m)
				} else {
					a[e >> 0] = k;
					c[s >> 2] = (c[s >> 2] | 0) + 1
				}
				if (!(a[d >> 0] | 0))
					break;
				else
					d = d + 1 | 0
			}
			if ((q | 0) == 5)
				fh(o);
			e = c[b + 4 >> 2] | 0;
			d = r + 4 | 0;
			if (e) {
				r = c[d >> 2] | 0;
				Bc(e, r, (c[s >> 2] | 0) - r | 0)
			}
			d = c[d >> 2] | 0;
			if (!d) {
				i = t;
				return
			}
			if ((c[s >> 2] | 0) != (d | 0))
				c[s >> 2] = d;
			ih(d);
			i = t;
			return
		}
		function Vc(a) {
			a = a | 0;
			var b = 0.0,
			d = 0;
			b = +h[(c[a >> 2] | 0) + 688 >> 3];
			d = a + 8 | 0;
			if (!(b - +h[d >> 3] > 15.0))
				return;
			h[d >> 3] = b;
			Wc(a);
			return
		}
		function Wc(b) {
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			j = 0.0,
			k = 0.0,
			l = 0.0,
			m = 0.0,
			n = 0;
			f = i;
			i = i + 16 | 0;
			g = f;
			l = +Ob((c[b >> 2] | 0) + 588 | 0);
			j = +Pb((c[b >> 2] | 0) + 588 | 0);
			e = c[b >> 2] | 0;
			m = +h[e + 96 >> 3];
			l = l < m ? m : l;
			m = +h[e + 104 >> 3];
			j = j < m ? m : j;
			m = +h[e + 112 >> 3];
			k = +h[e + 120 >> 3];
			c[g >> 2] = 0;
			c[g + 4 >> 2] = 0;
			c[g + 8 >> 2] = 0;
			e = g + 8 | 0;
			n = gh(1) | 0;
			d = n + 1 | 0;
			a[n >> 0] = 16;
			c[g + 4 >> 2] = n;
			c[e >> 2] = d;
			c[g + 12 >> 2] = d;
			ed(g, ~~(m < l ? m : l));
			ed(g, ~~(k < j ? k : j));
			ed(g, c[b + 16 >> 2] | 0);
			d = c[b + 4 >> 2] | 0;
			b = g + 4 | 0;
			if (d) {
				n = c[b >> 2] | 0;
				Bc(d, n, (c[e >> 2] | 0) - n | 0)
			}
			b = c[b >> 2] | 0;
			if (!b) {
				i = f;
				return
			}
			if ((c[e >> 2] | 0) != (b | 0))
				c[e >> 2] = b;
			ih(b);
			i = f;
			return
		}
		function Xc(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0;
			d = a + 4 | 0;
			if (c[d >> 2] | 0)
				return;
			e = gh(4) | 0;
			zc(e, b);
			a = c[d >> 2] | 0;
			c[d >> 2] = e;
			if (!a)
				return;
			Ac(a);
			ih(a);
			return
		}
		function Yc(a) {
			a = a | 0;
			var b = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0;
			o = i;
			i = i + 32 | 0;
			n = o + 8 | 0;
			l = o + 4 | 0;
			m = o;
			f = a + 4 | 0;
			b = c[f >> 2] | 0;
			if (!b) {
				n = 0;
				i = o;
				return n | 0
			}
			h = n + 4 | 0;
			j = n + 8 | 0;
			k = a + 60 | 0;
			a : while (1) {
				switch (Cc(b, l, m) | 0) {
				case 3: {
						e = 5;
						break a
					}
				case 4: {
						e = 6;
						break a
					}
				case 0: {
						b = 0;
						e = 12;
						break a
					}
				case 2: {
						Zc(a);
						break
					}
				case 1: {
						b = c[l >> 2] | 0;
						e = c[m >> 2] | 0;
						if ((e | 0) != 0 ? (c[n >> 2] = b, c[h >> 2] = e, c[j >> 2] = 1, g = c[(c[k >> 2] | 0) + ((d[b >> 0] | 0) * 24 | 0) + 16 >> 2] | 0, (g | 0) != 0) : 0) {
							tb[c[(c[g >> 2] | 0) + 24 >> 2] & 127](g, n);
							b = c[l >> 2] | 0
						}
						gj(b);
						break
					}
				default: {}

				}
				b = c[f >> 2] | 0
			}
			if ((e | 0) == 5) {
				mb(51);
				n = 1;
				i = o;
				return n | 0
			} else if ((e | 0) == 6) {
				mb(51);
				n = 1;
				i = o;
				return n | 0
			} else if ((e | 0) == 12) {
				i = o;
				return b | 0
			}
			return 0
		}
		function Zc(b) {
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			j = 0;
			h = i;
			i = i + 32 | 0;
			j = h + 16 | 0;
			g = h;
			c[j >> 2] = 0;
			c[j + 4 >> 2] = 0;
			c[j + 8 >> 2] = 0;
			e = j + 8 | 0;
			d = gh(1) | 0;
			f = d + 1 | 0;
			a[d >> 0] = -2;
			c[j + 4 >> 2] = d;
			c[e >> 2] = f;
			c[j + 12 >> 2] = f;
			ed(j, 6);
			f = b + 4 | 0;
			d = c[f >> 2] | 0;
			b = j + 4 | 0;
			if (d) {
				j = c[b >> 2] | 0;
				Bc(d, j, (c[e >> 2] | 0) - j | 0)
			}
			b = c[b >> 2] | 0;
			if (b) {
				if ((c[e >> 2] | 0) != (b | 0))
					c[e >> 2] = b;
				ih(b)
			};
			c[g >> 2] = 0;
			c[g + 4 >> 2] = 0;
			c[g + 8 >> 2] = 0;
			e = g + 8 | 0;
			b = gh(1) | 0;
			d = b + 1 | 0;
			a[b >> 0] = -1;
			c[g + 4 >> 2] = b;
			c[e >> 2] = d;
			c[g + 12 >> 2] = d;
			ed(g, dd() | 0);
			d = c[f >> 2] | 0;
			b = g + 4 | 0;
			if (d) {
				j = c[b >> 2] | 0;
				Bc(d, j, (c[e >> 2] | 0) - j | 0)
			}
			b = c[b >> 2] | 0;
			if (!b) {
				mb(52);
				i = h;
				return
			}
			if ((c[e >> 2] | 0) != (b | 0))
				c[e >> 2] = b;
			ih(b);
			mb(52);
			i = h;
			return
		}
		function _c(b, e) {
			b = b | 0;
			e = e | 0;
			var f = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0.0,
			s = 0,
			t = 0.0,
			u = 0.0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0,
			E = 0,
			F = 0,
			G = 0,
			H = 0,
			I = 0,
			J = 0,
			K = 0,
			L = 0,
			M = 0,
			N = 0,
			O = 0,
			P = 0,
			S = 0,
			T = 0,
			U = 0,
			V = 0,
			X = 0.0;
			V = i;
			i = i + 80 | 0;
			H = V + 64 | 0;
			I = V + 60 | 0;
			O = V + 72 | 0;
			S = V + 48 | 0;
			J = V + 36 | 0;
			P = V + 24 | 0;
			K = V + 12 | 0;
			L = V;
			f = c[b >> 2] | 0;
			h[f + 688 >> 3] = +$a();
			f = b + 33 | 0;
			if (!(a[f >> 0] | 0)) {
				a[f >> 0] = 1;
				f = b + 32 | 0;
				if ((a[f >> 0] | 0) != 0 ? (a[f >> 0] = 0, a[b + 34 >> 0] = 1, a[H >> 0] = 1, j = c[b + 4 >> 2] | 0, (j | 0) != 0) : 0)
					Bc(j, H, 1);
				f = b + 35 | 0;
				if (a[f >> 0] | 0) {
					j = b + 20 | 0;
					ad(b, j);
					if (!(a[j >> 0] & 1)) {
						a[j + 1 >> 0] = 0;
						a[j >> 0] = 0
					} else {
						a[c[b + 28 >> 2] >> 0] = 0;
						c[b + 24 >> 2] = 0
					}
					a[f >> 0] = 0
				}
				Ug(c[b >> 2] | 0)
			}
			U = e + 8 | 0;
			f = c[U >> 2] | 0;
			G = f + 1 | 0;
			c[U >> 2] = G;
			j = c[e >> 2] | 0;
			y = a[j + f >> 0] | 0;
			f = f + 2 | 0;
			c[U >> 2] = f;
			y = d[j + G >> 0] << 8 | y & 255;
			a : do
				if (!y)
					f = 0;
				else {
					w = f;
					k = 0;
					f = 0;
					while (1) {
						x = c[b >> 2] | 0;
						p = w + 1 | 0;
						c[U >> 2] = p;
						s = d[j + w >> 0] | 0;
						v = w + 2 | 0;
						c[U >> 2] = v;
						s = d[j + p >> 0] << 8 | s;
						p = w + 3 | 0;
						c[U >> 2] = p;
						v = s | d[j + v >> 0] << 16;
						s = w + 4 | 0;
						c[U >> 2] = s;
						p = v | d[j + p >> 0] << 24;
						v = x + 568 | 0;
						n = c[v >> 2] | 0;
						b : do
							if (n) {
								o = n + -1 | 0;
								m = (o & n | 0) == 0;
								if (m)
									q = p & o;
								else
									q = (p >>> 0) % (n >>> 0) | 0;
								l = c[(c[x + 564 >> 2] | 0) + (q << 2) >> 2] | 0;
								if (l) {
									if (m)
										do {
											l = c[l >> 2] | 0;
											if (!l) {
												q = 0;
												break b
											}
											if ((c[l + 4 >> 2] & o | 0) != (q | 0)) {
												q = 0;
												break b
											}
										} while ((c[l + 8 >> 2] | 0) != (p | 0));
									else
										do {
											l = c[l >> 2] | 0;
											if (!l) {
												q = 0;
												break b
											}
											if ((((c[l + 4 >> 2] | 0) >>> 0) % (n >>> 0) | 0 | 0) != (q | 0)) {
												q = 0;
												break b
											}
										} while ((c[l + 8 >> 2] | 0) != (p | 0));
									q = c[l + 12 >> 2] | 0
								} else
									q = 0
							} else
								q = 0;
						while (0);
						p = w + 5 | 0;
						c[U >> 2] = p;
						G = d[j + s >> 0] | 0;
						m = w + 6 | 0;
						c[U >> 2] = m;
						G = d[j + p >> 0] << 8 | G;
						p = w + 7 | 0;
						c[U >> 2] = p;
						m = G | d[j + m >> 0] << 16;
						c[U >> 2] = w + 8;
						p = m | d[j + p >> 0] << 24;
						m = c[v >> 2] | 0;
						c : do
							if (m) {
								n = m + -1 | 0;
								l = (n & m | 0) == 0;
								if (l)
									o = p & n;
								else
									o = (p >>> 0) % (m >>> 0) | 0;
								j = c[(c[x + 564 >> 2] | 0) + (o << 2) >> 2] | 0;
								if (j) {
									if (l)
										do {
											j = c[j >> 2] | 0;
											if (!j)
												break c;
											if ((c[j + 4 >> 2] & n | 0) != (o | 0))
												break c
										} while ((c[j + 8 >> 2] | 0) != (p | 0));
									else
										do {
											j = c[j >> 2] | 0;
											if (!j)
												break c;
											if ((((c[j + 4 >> 2] | 0) >>> 0) % (m >>> 0) | 0 | 0) != (o | 0))
												break c
										} while ((c[j + 8 >> 2] | 0) != (p | 0));
									m = c[j + 12 >> 2] | 0;
									if (!((q | 0) == 0 | (m | 0) == 0)) {
										j = c[x + 528 >> 2] | 0;
										l = c[x + 532 >> 2] | 0;
										d : do
											if ((j | 0) != (l | 0))
												while (1) {
													if ((c[j >> 2] | 0) == (m | 0))
														break d;
													j = j + 4 | 0;
													if ((j | 0) == (l | 0)) {
														j = l;
														break
													}
												}
										while (0);
										r = +g[q + 12 >> 2];
										X = +g[q + 8 >> 2];
										t = +W( + (+g[m + 12 >> 2] - r),  + (+g[m + 8 >> 2] - X));
										u = +g[q + 16 >> 2] - +g[m + 16 >> 2] * .5;
										Ag(m, X + +Q(+t) * u, r + +R(+t) * u, 5.0);
										Xg(c[b >> 2] | 0, q, m);
										f = f | (j | 0) != (l | 0)
									}
								}
							}
						while (0);
						k = k + 1 | 0;
						if ((k | 0) >= (y | 0))
							break a;
						w = c[U >> 2] | 0;
						j = c[e >> 2] | 0
					}
				}
			while (0);
			x = O + 1 | 0;
			y = O + 2 | 0;
			z = P + 4 | 0;
			A = S + 4 | 0;
			B = b + 34 | 0;
			C = e + 4 | 0;
			D = P + 1 | 0;
			E = P + 8 | 0;
			F = S + 1 | 0;
			G = S + 8 | 0;
			while (1) {
				k = c[U >> 2] | 0;
				w = k + 1 | 0;
				c[U >> 2] = w;
				m = c[e >> 2] | 0;
				j = d[m + k >> 0] | 0;
				l = k + 2 | 0;
				c[U >> 2] = l;
				j = d[m + w >> 0] << 8 | j;
				w = k + 3 | 0;
				c[U >> 2] = w;
				l = j | d[m + l >> 0] << 16;
				j = k + 4 | 0;
				c[U >> 2] = j;
				w = l | d[m + w >> 0] << 24;
				l = k + 5 | 0;
				c[U >> 2] = l;
				j = a[m + j >> 0] | 0;
				if (!w)
					break;
				q = k + 6 | 0;
				c[U >> 2] = q;
				s = d[m + l >> 0] << 8 | j & 255;
				o = k + 7 | 0;
				c[U >> 2] = o;
				q = s | d[m + q >> 0] << 16;
				s = k + 8 | 0;
				c[U >> 2] = s;
				o = q | d[m + o >> 0] << 24;
				q = k + 9 | 0;
				c[U >> 2] = q;
				s = d[m + s >> 0] | 0;
				j = k + 10 | 0;
				c[U >> 2] = j;
				s = d[m + q >> 0] << 8 | s;
				q = k + 11 | 0;
				c[U >> 2] = q;
				j = s | d[m + j >> 0] << 16;
				s = k + 12 | 0;
				c[U >> 2] = s;
				q = j | d[m + q >> 0] << 24;
				j = k + 13 | 0;
				c[U >> 2] = j;
				s = a[m + s >> 0] | 0;
				v = k + 14 | 0;
				c[U >> 2] = v;
				s = (d[m + j >> 0] << 8 | s & 255) & 65535;
				j = k + 15 | 0;
				c[U >> 2] = j;
				v = d[m + v >> 0] | 0;
				if (v & 128) {
					j = k + 16 | 0;
					c[U >> 2] = j
				}
				p = (v & 2 | 0) != 0;
				k = (v & 8 | 0) == 0;
				a[O >> 0] = 0;
				a[x >> 0] = 0;
				a[y >> 0] = 0;
				if (p) {
					l = j + 1 | 0;
					c[U >> 2] = l;
					a[O >> 0] = a[m + j >> 0] | 0;
					n = j + 2 | 0;
					c[U >> 2] = n;
					a[x >> 0] = a[m + l >> 0] | 0;
					j = j + 3 | 0;
					c[U >> 2] = j;
					a[y >> 0] = a[m + n >> 0] | 0
				};
				c[S >> 2] = 0;
				c[S + 4 >> 2] = 0;
				c[S + 8 >> 2] = 0;
				if (v & 4) {
					c[J >> 2] = 0;
					c[J + 4 >> 2] = 0;
					c[J + 8 >> 2] = 0;
					if ((j | 0) < (c[C >> 2] | 0)) {
						c[U >> 2] = j + 1;
						j = a[m + j >> 0] | 0;
						e : do
							if (j << 24 >> 24)
								do {
									yj(J, j);
									j = c[U >> 2] | 0;
									if ((j | 0) >= (c[C >> 2] | 0))
										break e;
									n = c[e >> 2] | 0;
									c[U >> 2] = j + 1;
									j = a[n + j >> 0] | 0
								} while (j << 24 >> 24 != 0);
						while (0);
						if (a[S >> 0] & 1) {
							a[c[G >> 2] >> 0] = 0;
							c[A >> 2] = 0
						} else
							T = 58
					} else
						T = 58;
					if ((T | 0) == 58) {
						T = 0;
						a[F >> 0] = 0;
						a[S >> 0] = 0
					}
					wj(S, 0);
					c[S >> 2] = c[J >> 2];
					c[S + 4 >> 2] = c[J + 4 >> 2];
					c[S + 8 >> 2] = c[J + 8 >> 2];
					c[J >> 2] = 0;
					c[J + 4 >> 2] = 0;
					c[J + 8 >> 2] = 0;
					qj(J)
				};
				c[P >> 2] = 0;
				c[P + 4 >> 2] = 0;
				c[P + 8 >> 2] = 0;
				if (!k) {
					c[K >> 2] = 0;
					c[K + 4 >> 2] = 0;
					c[K + 8 >> 2] = 0;
					j = c[U >> 2] | 0;
					if ((j | 0) < (c[C >> 2] | 0)) {
						do {
							c[U >> 2] = j + 1;
							j = a[(c[e >> 2] | 0) + j >> 0] | 0;
							if (!(j << 24 >> 24))
								break;
							yj(K, j);
							j = c[U >> 2] | 0
						} while ((j | 0) < (c[C >> 2] | 0));
						if (a[P >> 0] & 1) {
							a[c[E >> 2] >> 0] = 0;
							c[z >> 2] = 0
						} else
							T = 66
					} else
						T = 66;
					if ((T | 0) == 66) {
						T = 0;
						a[D >> 0] = 0;
						a[P >> 0] = 0
					}
					wj(P, 0);
					c[P >> 2] = c[K >> 2];
					c[P + 4 >> 2] = c[K + 4 >> 2];
					c[P + 8 >> 2] = c[K + 8 >> 2];
					c[K >> 2] = 0;
					c[K + 4 >> 2] = 0;
					c[K + 8 >> 2] = 0;
					qj(K)
				}
				j = c[b >> 2] | 0;
				l = c[j + 568 >> 2] | 0;
				f : do
					if (l) {
						m = l + -1 | 0;
						k = (m & l | 0) == 0;
						if (k)
							n = m & w;
						else
							n = (w >>> 0) % (l >>> 0) | 0;
						j = c[(c[j + 564 >> 2] | 0) + (n << 2) >> 2] | 0;
						if (j) {
							if (k)
								do {
									j = c[j >> 2] | 0;
									if (!j) {
										T = 80;
										break f
									}
									if ((c[j + 4 >> 2] & m | 0) != (n | 0)) {
										T = 80;
										break f
									}
								} while ((c[j + 8 >> 2] | 0) != (w | 0));
							else
								do {
									j = c[j >> 2] | 0;
									if (!j) {
										T = 80;
										break f
									}
									if ((((c[j + 4 >> 2] | 0) >>> 0) % (l >>> 0) | 0 | 0) != (n | 0)) {
										T = 80;
										break f
									}
								} while ((c[j + 8 >> 2] | 0) != (w | 0));
							j = c[j + 12 >> 2] | 0;
							u =  + (o | 0);
							t =  + (q | 0);
							r =  + (s << 16 >> 16);
							if (j) {
								Ag(j, u, t, r);
								if (p) {
									q = j + 80 | 0;
									a[q >> 0] = a[O >> 0] | 0;
									a[q + 1 >> 0] = a[O + 1 >> 0] | 0;
									a[q + 2 >> 0] = a[O + 2 >> 0] | 0;
									q = j
								} else
									q = j
							} else
								T = 82
						} else
							T = 80
					} else
						T = 80;
				while (0);
				if ((T | 0) == 80) {
					u =  + (o | 0);
					t =  + (q | 0);
					r =  + (s << 16 >> 16);
					T = 82
				}
				if ((T | 0) == 82) {
					T = 0;
					q = qg(w, u, t, r, O) | 0;
					l = c[b >> 2] | 0;
					c[I >> 2] = q;
					j = l + 544 | 0;
					k = c[j >> 2] | 0;
					if ((k | 0) == (c[l + 548 >> 2] | 0))
						fd(l + 540 | 0, I);
					else {
						c[k >> 2] = q;
						c[j >> 2] = (c[j >> 2] | 0) + 4
					}
					o = l + 564 | 0;
					p = c[q >> 2] | 0;
					l = c[l + 568 >> 2] | 0;
					g : do
						if (l) {
							m = l + -1 | 0;
							k = (m & l | 0) == 0;
							if (k)
								n = m & p;
							else
								n = (p >>> 0) % (l >>> 0) | 0;
							j = c[(c[o >> 2] | 0) + (n << 2) >> 2] | 0;
							if (j)
								if (k)
									do {
										j = c[j >> 2] | 0;
										if (!j) {
											T = 97;
											break g
										}
										if ((c[j + 4 >> 2] & m | 0) != (n | 0)) {
											T = 97;
											break g
										}
									} while ((c[j + 8 >> 2] | 0) != (p | 0));
								else
									do {
										j = c[j >> 2] | 0;
										if (!j) {
											T = 97;
											break g
										}
										if ((((c[j + 4 >> 2] | 0) >>> 0) % (l >>> 0) | 0 | 0) != (n | 0)) {
											T = 97;
											break g
										}
									} while ((c[j + 8 >> 2] | 0) != (p | 0));
							else
								T = 97
						} else
							T = 97;
					while (0);
					if ((T | 0) == 97) {
						T = 0;
						j = gh(16) | 0;
						c[j + 8 >> 2] = p;
						c[j + 12 >> 2] = 0;
						gd(H, o, j);
						j = c[H >> 2] | 0
					}
					c[j + 12 >> 2] = q
				}
				a[q + 224 >> 0] = v & 1;
				a[q + 225 >> 0] = v >>> 4 & 1;
				j = a[P >> 0] | 0;
				k = c[z >> 2] | 0;
				if (((j & 1) == 0 ? (j & 255) >>> 1 : k) | 0) {
					hd(q, P);
					j = a[P >> 0] | 0;
					k = c[z >> 2] | 0
				}
				if (!((((j & 1) == 0 ? (j & 255) >>> 1 : k) | 0) == 0 ? (v = a[S >> 0] | 0, (((v & 1) == 0 ? (v & 255) >>> 1 : c[A >> 2] | 0) | 0) == 0) : 0))
					T = 105;
				do
					if ((T | 0) == 105) {
						T = 0;
						nj(L, P);
						j = Lc(L) | 0;
						qj(L);
						if (!j) {
							j = Mc(S) | 0;
							if (!j)
								break
						}
						c[q + 76 >> 2] = j
					}
				while (0);
				n = c[b >> 2] | 0;
				j = c[n + 516 >> 2] | 0;
				k = c[n + 520 >> 2] | 0;
				h : do
					if ((j | 0) == (k | 0)) {
						M = j;
						T = 111
					} else
						do {
							if ((c[j >> 2] | 0) == (w | 0)) {
								M = j;
								T = 111;
								break h
							}
							j = j + 4 | 0
						} while ((j | 0) != (k | 0));
				while (0);
				do
					if ((T | 0) == 111 ? (T = 0, (M | 0) != (k | 0)) : 0) {
						j = c[n + 528 >> 2] | 0;
						k = n + 532 | 0;
						l = c[k >> 2] | 0;
						m = (j | 0) == (l | 0);
						i : do
							if (m) {
								N = j;
								T = 115
							} else
								do {
									if ((c[j >> 2] | 0) == (q | 0)) {
										N = j;
										T = 115;
										break i
									}
									j = j + 4 | 0
								} while ((j | 0) != (l | 0));
						while (0);
						if ((T | 0) == 115 ? (T = 0, (N | 0) != (l | 0)) : 0)
							break;
						c[H >> 2] = q;
						if (m) {
							w = n + 584 | 0;
							v = q + 80 | 0;
							a[w >> 0] = a[v >> 0] | 0;
							a[w + 1 >> 0] = a[v + 1 >> 0] | 0;
							a[w + 2 >> 0] = a[v + 2 >> 0] | 0
						}
						if ((l | 0) == (c[n + 536 >> 2] | 0))
							fd(n + 528 | 0, H);
						else {
							c[l >> 2] = q;
							c[k >> 2] = (c[k >> 2] | 0) + 4
						}
						if (m) {
							X = +g[q + 12 >> 2];
							w = c[b >> 2] | 0;
							h[w + 128 >> 3] = 0.0;
							h[w + 136 >> 3] = X;
							h[w + 144 >> 3] = 1.0;
							a[B >> 0] = 0;
							Vg(c[b >> 2] | 0)
						}
					}
				while (0);
				qj(P);
				qj(S)
			}
			k = k + 6 | 0;
			c[U >> 2] = k;
			s = d[m + l >> 0] << 8 | j & 255;
			j : do
				if (s) {
					l = m;
					q = 0;
					while (1) {
						n = k + 1 | 0;
						c[U >> 2] = n;
						T = d[l + k >> 0] | 0;
						p = k + 2 | 0;
						c[U >> 2] = p;
						T = d[l + n >> 0] << 8 | T;
						n = k + 3 | 0;
						c[U >> 2] = n;
						p = T | d[l + p >> 0] << 16;
						c[U >> 2] = k + 4;
						n = p | d[l + n >> 0] << 24;
						p = c[b >> 2] | 0;
						l = c[p + 568 >> 2] | 0;
						k : do
							if (l) {
								m = l + -1 | 0;
								k = (m & l | 0) == 0;
								if (k)
									o = m & n;
								else
									o = (n >>> 0) % (l >>> 0) | 0;
								j = c[(c[p + 564 >> 2] | 0) + (o << 2) >> 2] | 0;
								if (j) {
									if (k)
										do {
											j = c[j >> 2] | 0;
											if (!j)
												break k;
											if ((c[j + 4 >> 2] & m | 0) != (o | 0))
												break k
										} while ((c[j + 8 >> 2] | 0) != (n | 0));
									else
										do {
											j = c[j >> 2] | 0;
											if (!j)
												break k;
											if ((((c[j + 4 >> 2] | 0) >>> 0) % (l >>> 0) | 0 | 0) != (o | 0))
												break k
										} while ((c[j + 8 >> 2] | 0) != (n | 0));
									l = c[j + 12 >> 2] | 0;
									if (l) {
										j = c[p + 528 >> 2] | 0;
										k = c[p + 532 >> 2] | 0;
										l : do
											if ((j | 0) != (k | 0))
												while (1) {
													if ((c[j >> 2] | 0) == (l | 0))
														break l;
													j = j + 4 | 0;
													if ((j | 0) == (k | 0)) {
														j = k;
														break
													}
												}
										while (0);
										sg(l);
										f = f | (j | 0) != (k | 0)
									}
								}
							}
						while (0);
						j = q + 1 | 0;
						if ((j | 0) >= (s | 0))
							break j;
						k = c[U >> 2] | 0;
						l = c[e >> 2] | 0;
						q = j
					}
				}
			while (0);
			if (!f) {
				i = V;
				return
			}
			f = c[b >> 2] | 0;
			if ((c[f + 528 >> 2] | 0) != (c[f + 532 >> 2] | 0)) {
				i = V;
				return
			}
			Wg(f);
			i = V;
			return
		}
		function $c(b) {
			b = b | 0;
			var d = 0,
			e = 0;
			e = i;
			i = i + 16 | 0;
			d = e;
			if (!(a[b + 33 >> 0] | 0)) {
				a[b + 32 >> 0] = 1;
				i = e;
				return
			}
			a[b + 34 >> 0] = 1;
			a[d >> 0] = 1;
			b = c[b + 4 >> 2] | 0;
			if (b)
				Bc(b, d, 1);
			i = e;
			return
		}
		function ad(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			j = 0;
			g = i;
			i = i + 16 | 0;
			e = g;
			if (!(a[b + 33 >> 0] | 0)) {
				rj(b + 20 | 0, d) | 0;
				a[b + 35 >> 0] = 1;
				i = g;
				return
			};
			c[e >> 2] = 0;
			c[e + 4 >> 2] = 0;
			c[e + 8 >> 2] = 0;
			f = e + 8 | 0;
			j = gh(1) | 0;
			h = j + 1 | 0;
			a[j >> 0] = 0;
			c[e + 4 >> 2] = j;
			c[f >> 2] = h;
			c[e + 12 >> 2] = h;
			id(e, d);
			b = c[b + 4 >> 2] | 0;
			d = e + 4 | 0;
			if (b) {
				j = c[d >> 2] | 0;
				Bc(b, j, (c[f >> 2] | 0) - j | 0)
			}
			d = c[d >> 2] | 0;
			if (!d) {
				i = g;
				return
			}
			if ((c[f >> 2] | 0) != (d | 0))
				c[f >> 2] = d;
			ih(d);
			i = g;
			return
		}
		function bd(a, b) {
			a = a | 0;
			b = b | 0;
			return
		}
		function cd(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0;
			l = i;
			i = i + 16 | 0;
			k = l;
			e = a + 16 | 0;
			f = c[e >> 2] | 0;
			d = f;
			g = b + 16 | 0;
			h = c[g >> 2] | 0;
			j = (h | 0) == (b | 0);
			if ((f | 0) == (a | 0)) {
				d = c[(c[f >> 2] | 0) + 12 >> 2] | 0;
				if (j) {
					tb[d & 127](f, k);
					j = c[e >> 2] | 0;
					sb[c[(c[j >> 2] | 0) + 16 >> 2] & 255](j);
					c[e >> 2] = 0;
					j = c[g >> 2] | 0;
					tb[c[(c[j >> 2] | 0) + 12 >> 2] & 127](j, f);
					j = c[g >> 2] | 0;
					sb[c[(c[j >> 2] | 0) + 16 >> 2] & 255](j);
					c[g >> 2] = 0;
					c[e >> 2] = a;
					tb[c[(c[k >> 2] | 0) + 12 >> 2] & 127](k, h);
					sb[c[(c[k >> 2] | 0) + 16 >> 2] & 255](k);
					c[g >> 2] = b;
					i = l;
					return
				} else {
					tb[d & 127](f, b);
					a = c[e >> 2] | 0;
					sb[c[(c[a >> 2] | 0) + 16 >> 2] & 255](a);
					a = b + 16 | 0;
					c[e >> 2] = c[a >> 2];
					c[a >> 2] = b;
					i = l;
					return
				}
			} else if (j) {
				tb[c[(c[b >> 2] | 0) + 12 >> 2] & 127](b, a);
				b = c[g >> 2] | 0;
				sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
				c[g >> 2] = c[e >> 2];
				c[e >> 2] = a;
				i = l;
				return
			} else {
				c[e >> 2] = h;
				c[g >> 2] = d;
				i = l;
				return
			}
		}
		function dd() {
			var a = 0,
			b = 0,
			d = 0;
			d = i;
			i = i + 16 | 0;
			b = d;
			c[b >> 2] = -856972603;
			a = ld() | 0;
			i = d;
			return c[b >> 2]^a | 0
		}
		function ed(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0;
			n = b + 4 | 0;
			j = d & 255;
			o = b + 8 | 0;
			e = c[o >> 2] | 0;
			m = b + 12 | 0;
			b = c[m >> 2] | 0;
			if (e >>> 0 >= b >>> 0) {
				l = c[n >> 2] | 0;
				k = l;
				e = e - k + 1 | 0;
				if ((e | 0) < 0)
					fh(n);
				i = l;
				b = b - i | 0;
				if (b >>> 0 < 1073741823) {
					b = b << 1;
					b = b >>> 0 < e >>> 0 ? e : b;
					f = c[o >> 2] | 0;
					e = f - i | 0;
					if (!b) {
						h = 0;
						g = 0
					} else
						p = 8
				} else {
					e = c[o >> 2] | 0;
					b = 2147483647;
					f = e;
					e = e - i | 0;
					p = 8
				}
				if ((p | 0) == 8) {
					h = b;
					g = gh(b) | 0
				}
				a[g + e >> 0] = j;
				b = g + (e + 1) | 0;
				i = f - i | 0;
				j = g + (e - i) | 0;
				js(j | 0, l | 0, i | 0) | 0;
				c[n >> 2] = j;
				c[o >> 2] = b;
				c[m >> 2] = g + h;
				if (k) {
					ih(k);
					b = c[o >> 2] | 0
				}
			} else {
				a[e >> 0] = j;
				b = (c[o >> 2] | 0) + 1 | 0;
				c[o >> 2] = b
			}
			i = d >>> 8 & 255;
			e = c[m >> 2] | 0;
			if (b >>> 0 >= e >>> 0) {
				k = c[n >> 2] | 0;
				l = k;
				f = b - l + 1 | 0;
				if ((f | 0) < 0)
					fh(n);
				j = k;
				b = e - j | 0;
				if (b >>> 0 < 1073741823) {
					b = b << 1;
					b = b >>> 0 < f >>> 0 ? f : b;
					f = c[o >> 2] | 0;
					e = f - j | 0;
					if (!b) {
						h = 0;
						g = 0
					} else
						p = 18
				} else {
					e = c[o >> 2] | 0;
					b = 2147483647;
					f = e;
					e = e - j | 0;
					p = 18
				}
				if ((p | 0) == 18) {
					h = b;
					g = gh(b) | 0
				}
				a[g + e >> 0] = i;
				b = g + (e + 1) | 0;
				i = f - j | 0;
				j = g + (e - i) | 0;
				js(j | 0, k | 0, i | 0) | 0;
				c[n >> 2] = j;
				c[o >> 2] = b;
				c[m >> 2] = g + h;
				if (l) {
					ih(l);
					b = c[o >> 2] | 0
				}
			} else {
				a[b >> 0] = i;
				b = (c[o >> 2] | 0) + 1 | 0;
				c[o >> 2] = b
			}
			j = d >>> 16 & 255;
			e = c[m >> 2] | 0;
			if (b >>> 0 >= e >>> 0) {
				k = c[n >> 2] | 0;
				l = k;
				f = b - l + 1 | 0;
				if ((f | 0) < 0)
					fh(n);
				i = k;
				b = e - i | 0;
				if (b >>> 0 < 1073741823) {
					b = b << 1;
					b = b >>> 0 < f >>> 0 ? f : b;
					e = c[o >> 2] | 0;
					f = e - i | 0;
					if (!b) {
						h = 0;
						g = 0
					} else
						p = 28
				} else {
					f = c[o >> 2] | 0;
					b = 2147483647;
					e = f;
					f = f - i | 0;
					p = 28
				}
				if ((p | 0) == 28) {
					h = b;
					g = gh(b) | 0
				}
				a[g + f >> 0] = j;
				b = g + (f + 1) | 0;
				i = e - i | 0;
				j = g + (f - i) | 0;
				js(j | 0, k | 0, i | 0) | 0;
				c[n >> 2] = j;
				c[o >> 2] = b;
				c[m >> 2] = g + h;
				if (l) {
					ih(l);
					b = c[o >> 2] | 0
				}
			} else {
				a[b >> 0] = j;
				b = (c[o >> 2] | 0) + 1 | 0;
				c[o >> 2] = b
			}
			j = d >>> 24 & 255;
			e = c[m >> 2] | 0;
			if (b >>> 0 < e >>> 0) {
				a[b >> 0] = j;
				c[o >> 2] = (c[o >> 2] | 0) + 1;
				return
			}
			k = c[n >> 2] | 0;
			l = k;
			f = b - l + 1 | 0;
			if ((f | 0) < 0)
				fh(n);
			i = k;
			b = e - i | 0;
			if (b >>> 0 < 1073741823) {
				b = b << 1;
				b = b >>> 0 < f >>> 0 ? f : b;
				f = c[o >> 2] | 0;
				e = f - i | 0;
				if (!b) {
					h = 0;
					g = 0;
					b = f
				} else
					p = 38
			} else {
				e = c[o >> 2] | 0;
				b = 2147483647;
				f = e;
				e = e - i | 0;
				p = 38
			}
			if ((p | 0) == 38) {
				h = b;
				g = gh(b) | 0;
				b = f
			}
			a[g + e >> 0] = j;
			d = b - i | 0;
			p = g + (e - d) | 0;
			js(p | 0, k | 0, d | 0) | 0;
			c[n >> 2] = p;
			c[o >> 2] = g + (e + 1);
			c[m >> 2] = g + h;
			if (!l)
				return;
			ih(l);
			return
		}
		function fd(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			i = a + 4 | 0;
			j = c[a >> 2] | 0;
			k = j;
			e = ((c[i >> 2] | 0) - k >> 2) + 1 | 0;
			if (e >>> 0 > 1073741823)
				fh(a);
			l = a + 8 | 0;
			f = j;
			d = (c[l >> 2] | 0) - f | 0;
			if (d >> 2 >>> 0 < 536870911) {
				d = d >> 1;
				d = d >>> 0 < e >>> 0 ? e : d;
				f = (c[i >> 2] | 0) - f | 0;
				e = f >> 2;
				if (!d) {
					h = 0;
					g = 0;
					d = f
				} else
					m = 6
			} else {
				f = (c[i >> 2] | 0) - f | 0;
				d = 1073741823;
				e = f >> 2;
				m = 6
			}
			if ((m | 0) == 6) {
				h = d;
				g = gh(d << 2) | 0;
				d = f
			}
			c[g + (e << 2) >> 2] = c[b >> 2];
			js(g | 0, j | 0, d | 0) | 0;
			c[a >> 2] = g;
			c[i >> 2] = g + (e + 1 << 2);
			c[l >> 2] = g + (h << 2);
			if (!k)
				return;
			ih(k);
			return
		}
		function gd(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			h = 0,
			i = 0,
			j = 0.0,
			k = 0.0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0;
			m = c[e + 8 >> 2] | 0;
			q = e + 4 | 0;
			c[q >> 2] = m;
			o = d + 4 | 0;
			p = c[o >> 2] | 0;
			n = (p | 0) == 0;
			a : do
				if (!n) {
					l = p + -1 | 0;
					i = (l & p | 0) == 0;
					if (i)
						h = l & m;
					else
						h = (m >>> 0) % (p >>> 0) | 0;
					f = c[(c[d >> 2] | 0) + (h << 2) >> 2] | 0;
					if (f)
						if (i) {
							while (1) {
								f = c[f >> 2] | 0;
								if (!f)
									break a;
								if ((c[f + 4 >> 2] & l | 0) != (h | 0))
									break a;
								if ((c[f + 8 >> 2] | 0) == (m | 0)) {
									h = 0;
									break
								}
							}
							d = f;
							c[b >> 2] = d;
							b = b + 4 | 0;
							a[b >> 0] = h;
							return
						} else {
							while (1) {
								f = c[f >> 2] | 0;
								if (!f)
									break a;
								if ((((c[f + 4 >> 2] | 0) >>> 0) % (p >>> 0) | 0 | 0) != (h | 0))
									break a;
								if ((c[f + 8 >> 2] | 0) == (m | 0)) {
									h = 0;
									break
								}
							}
							d = f;
							c[b >> 2] = d;
							b = b + 4 | 0;
							a[b >> 0] = h;
							return
						}
				} else
					h = 0;
			while (0);
			m = d + 12 | 0;
			j =  + (((c[m >> 2] | 0) + 1 | 0) >>> 0);
			k = +g[d + 16 >> 2];
			do
				if (n | j >  + (p >>> 0) * k) {
					if (p >>> 0 > 2)
						f = (p + -1 & p | 0) == 0;
					else
						f = 0;
					i = (f & 1 | p << 1)^1;
					f = ~~+Z( + (j / k)) >>> 0;
					jd(d, i >>> 0 < f >>> 0 ? f : i);
					i = c[o >> 2] | 0;
					f = c[q >> 2] | 0;
					h = i + -1 | 0;
					if (!(h & i)) {
						l = i;
						h = h & f;
						break
					} else {
						l = i;
						h = (f >>> 0) % (i >>> 0) | 0;
						break
					}
				} else
					l = p;
			while (0);
			f = c[(c[d >> 2] | 0) + (h << 2) >> 2] | 0;
			if (!f) {
				f = d + 8 | 0;
				c[e >> 2] = c[f >> 2];
				c[f >> 2] = e;
				c[(c[d >> 2] | 0) + (h << 2) >> 2] = f;
				f = c[e >> 2] | 0;
				if (f) {
					f = c[f + 4 >> 2] | 0;
					h = l + -1 | 0;
					if (!(h & l))
						f = f & h;
					else
						f = (f >>> 0) % (l >>> 0) | 0;
					c[(c[d >> 2] | 0) + (f << 2) >> 2] = e
				}
			} else {
				c[e >> 2] = c[f >> 2];
				c[f >> 2] = e
			}
			c[m >> 2] = (c[m >> 2] | 0) + 1;
			d = 1;
			c[b >> 2] = e;
			b = b + 4 | 0;
			a[b >> 0] = d;
			return
		}
		function hd(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0;
			rj(b + 84 | 0, d) | 0;
			i = b + 100 | 0;
			h = a[d >> 0] | 0;
			g = (h & 1) == 0;
			h = g ? (h & 255) >>> 1 : c[d + 4 >> 2] | 0;
			f = a[i >> 0] | 0;
			e = (f & 1) == 0;
			a : do
				if ((h | 0) == ((e ? (f & 255) >>> 1 : c[b + 104 >> 2] | 0) | 0)) {
					f = g ? d + 1 | 0 : c[d + 8 >> 2] | 0;
					e = e ? i + 1 | 0 : c[b + 108 >> 2] | 0;
					if (!g) {
						if (Ri(f, e, h) | 0)
							break;
						return
					}
					if (!h)
						return;
					while (1) {
						if ((a[f >> 0] | 0) != (a[e >> 0] | 0))
							break a;
						h = h + -1 | 0;
						if (!h)
							break;
						else {
							f = f + 1 | 0;
							e = e + 1 | 0
						}
					}
					return
				}
			while (0);
			a[b + 143 >> 0] = 1;
			rj(i, d) | 0;
			return
		}
		function id(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0;
			m = a[d >> 0] | 0;
			n = (m & 1) == 0;
			e = n ? d + 1 | 0 : c[d + 8 >> 2] | 0;
			m = n ? (m & 255) >>> 1 : c[d + 4 >> 2] | 0;
			n = e + m | 0;
			o = b + 4 | 0;
			p = b + 8 | 0;
			q = b + 12 | 0;
			a : do
				if (m) {
					b : while (1) {
						j = a[e >> 0] | 0;
						do
							if (j << 24 >> 24) {
								d = c[p >> 2] | 0;
								if ((d | 0) != (c[q >> 2] | 0)) {
									a[d >> 0] = j;
									c[p >> 2] = (c[p >> 2] | 0) + 1;
									break
								}
								k = c[o >> 2] | 0;
								l = k;
								f = d - l + 1 | 0;
								if ((f | 0) < 0)
									break b;
								m = k;
								d = d - m | 0;
								if (d >>> 0 < 1073741823) {
									d = d << 1;
									d = d >>> 0 < f >>> 0 ? f : d;
									g = c[p >> 2] | 0;
									f = g - m | 0;
									if (!d) {
										i = 0;
										h = 0;
										d = g
									} else
										r = 11
								} else {
									f = c[p >> 2] | 0;
									d = 2147483647;
									g = f;
									f = f - m | 0;
									r = 11
								}
								if ((r | 0) == 11) {
									r = 0;
									i = d;
									h = gh(d) | 0;
									d = g
								}
								a[h + f >> 0] = j;
								j = d - m | 0;
								m = h + (f - j) | 0;
								js(m | 0, k | 0, j | 0) | 0;
								c[o >> 2] = m;
								c[p >> 2] = h + (f + 1);
								c[q >> 2] = h + i;
								if (l)
									ih(l)
							}
						while (0);
						e = e + 1 | 0;
						if ((e | 0) == (n | 0))
							break a
					}
					fh(o)
				}
			while (0);
			d = c[p >> 2] | 0;
			if ((d | 0) != (c[q >> 2] | 0)) {
				a[d >> 0] = 0;
				c[p >> 2] = (c[p >> 2] | 0) + 1;
				return
			}
			i = c[b + 4 >> 2] | 0;
			j = i;
			e = d - j + 1 | 0;
			if ((e | 0) < 0)
				fh(o);
			k = i;
			d = d - k | 0;
			if (d >>> 0 < 1073741823) {
				d = d << 1;
				d = d >>> 0 < e >>> 0 ? e : d;
				f = c[p >> 2] | 0;
				e = f - k | 0;
				if (!d) {
					h = 0;
					g = 0;
					d = f
				} else
					r = 22
			} else {
				e = c[p >> 2] | 0;
				d = 2147483647;
				f = e;
				e = e - k | 0;
				r = 22
			}
			if ((r | 0) == 22) {
				h = d;
				g = gh(d) | 0;
				d = f
			}
			a[g + e >> 0] = 0;
			b = d - k | 0;
			r = g + (e - b) | 0;
			js(r | 0, i | 0, b | 0) | 0;
			c[o >> 2] = r;
			c[p >> 2] = g + (e + 1);
			c[q >> 2] = g + h;
			if (!j)
				return;
			ih(j);
			return
		}
		function jd(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0;
			if ((b | 0) != 1) {
				if (b + -1 & b)
					b = lj(b) | 0
			} else
				b = 2;
			f = c[a + 4 >> 2] | 0;
			if (b >>> 0 > f >>> 0) {
				kd(a, b);
				return
			}
			if (b >>> 0 >= f >>> 0)
				return;
			if (f >>> 0 > 2)
				e = (f + -1 & f | 0) == 0;
			else
				e = 0;
			d = ~~+Z( + ( + ((c[a + 12 >> 2] | 0) >>> 0) / +g[a + 16 >> 2])) >>> 0;
			if (e)
				d = 1 << 32 - (aa(d + -1 | 0) | 0);
			else
				d = lj(d) | 0;
			b = b >>> 0 < d >>> 0 ? d : b;
			if (b >>> 0 >= f >>> 0)
				return;
			kd(a, b);
			return
		}
		function kd(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			e = a + 4 | 0;
			if (!b) {
				d = c[a >> 2] | 0;
				c[a >> 2] = 0;
				if (d)
					ih(d);
				c[e >> 2] = 0;
				return
			}
			m = gh(b << 2) | 0;
			d = c[a >> 2] | 0;
			c[a >> 2] = m;
			if (d)
				ih(d);
			c[e >> 2] = b;
			d = 0;
			do {
				c[(c[a >> 2] | 0) + (d << 2) >> 2] = 0;
				d = d + 1 | 0
			} while ((d | 0) != (b | 0));
			e = a + 8 | 0;
			g = c[e >> 2] | 0;
			if (!g)
				return;
			d = c[g + 4 >> 2] | 0;
			l = b + -1 | 0;
			m = (l & b | 0) == 0;
			if (m)
				f = d & l;
			else
				f = (d >>> 0) % (b >>> 0) | 0;
			c[(c[a >> 2] | 0) + (f << 2) >> 2] = e;
			d = c[g >> 2] | 0;
			if (!d)
				return;
			else {
				h = g;
				e = d;
				d = g
			}
			a : while (1) {
				k = h;
				b : while (1) {
					c : do
						if (m) {
							j = e;
							while (1) {
								i = c[j + 4 >> 2] & l;
								if ((i | 0) == (f | 0)) {
									d = j;
									break c
								}
								e = (c[a >> 2] | 0) + (i << 2) | 0;
								if (!(c[e >> 2] | 0)) {
									f = i;
									g = j;
									break b
								}
								h = j + 8 | 0;
								e = j;
								while (1) {
									g = c[e >> 2] | 0;
									if (!g)
										break;
									if ((c[h >> 2] | 0) == (c[g + 8 >> 2] | 0))
										e = g;
									else
										break
								}
								c[d >> 2] = g;
								c[e >> 2] = c[c[(c[a >> 2] | 0) + (i << 2) >> 2] >> 2];
								c[c[(c[a >> 2] | 0) + (i << 2) >> 2] >> 2] = j;
								j = c[k >> 2] | 0;
								if (!j) {
									d = 30;
									break a
								}
							}
						} else {
							j = e;
							while (1) {
								i = ((c[j + 4 >> 2] | 0) >>> 0) % (b >>> 0) | 0;
								if ((i | 0) == (f | 0)) {
									d = j;
									break c
								}
								e = (c[a >> 2] | 0) + (i << 2) | 0;
								if (!(c[e >> 2] | 0)) {
									f = i;
									g = j;
									break b
								}
								h = j + 8 | 0;
								e = j;
								while (1) {
									g = c[e >> 2] | 0;
									if (!g)
										break;
									if ((c[h >> 2] | 0) == (c[g + 8 >> 2] | 0))
										e = g;
									else
										break
								}
								c[d >> 2] = g;
								c[e >> 2] = c[c[(c[a >> 2] | 0) + (i << 2) >> 2] >> 2];
								c[c[(c[a >> 2] | 0) + (i << 2) >> 2] >> 2] = j;
								j = c[k >> 2] | 0;
								if (!j) {
									d = 30;
									break a
								}
							}
						}
					while (0);
					e = c[d >> 2] | 0;
					if (!e) {
						d = 30;
						break a
					} else
						k = d
				}
				c[e >> 2] = d;
				e = c[g >> 2] | 0;
				if (!e) {
					d = 30;
					break
				} else {
					h = g;
					d = g
				}
			}
			if ((d | 0) == 30)
				return
		}
		function ld() {
			var a = 0,
			b = 0,
			d = 0;
			d = i;
			i = i + 16 | 0;
			b = d;
			c[b >> 2] = 2060580979;
			a = md() | 0;
			i = d;
			return c[b >> 2]^a | 0
		}
		function md() {
			var a = 0,
			b = 0,
			d = 0;
			d = i;
			i = i + 16 | 0;
			b = d;
			c[b >> 2] = -958902482;
			a = nd() | 0;
			i = d;
			return c[b >> 2]^a | 0
		}
		function nd() {
			var a = 0,
			b = 0,
			d = 0;
			d = i;
			i = i + 16 | 0;
			b = d;
			c[b >> 2] = -2138133776;
			a = od() | 0;
			i = d;
			return c[b >> 2]^a | 0
		}
		function od() {
			var a = 0,
			b = 0;
			b = i;
			i = i + 16 | 0;
			a = b;
			c[a >> 2] = 152957883;
			i = b;
			return c[a >> 2]^-32450546 | 0
		}
		function pd(a) {
			a = a | 0;
			return
		}
		function qd(a) {
			a = a | 0;
			ih(a);
			return
		}
		function rd(a) {
			a = a | 0;
			a = gh(8) | 0;
			c[a >> 2] = 3200;
			return a | 0
		}
		function sd(a, b) {
			a = a | 0;
			b = b | 0;
			c[b >> 2] = 3200;
			return
		}
		function td(a) {
			a = a | 0;
			return
		}
		function ud(a) {
			a = a | 0;
			ih(a);
			return
		}
		function vd(a, b) {
			a = a | 0;
			b = b | 0;
			mb(53);
			return
		}
		function wd(a) {
			a = a | 0;
			ih(a);
			return
		}
		function xd(a) {
			a = a | 0;
			var b = 0;
			b = gh(8) | 0;
			c[b >> 2] = 3164;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return b | 0
		}
		function yd(a, b) {
			a = a | 0;
			b = b | 0;
			c[b >> 2] = 3164;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return
		}
		function zd(a) {
			a = a | 0;
			return
		}
		function Ad(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Bd(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			m = i;
			i = i + 64 | 0;
			l = m + 40 | 0;
			k = m + 28 | 0;
			h = m + 16 | 0;
			j = m;
			g = c[b + 4 >> 2] | 0;
			c[l >> 2] = 0;
			c[l + 4 >> 2] = 0;
			c[l + 8 >> 2] = 0;
			e = d + 8 | 0;
			b = c[e >> 2] | 0;
			f = d + 4 | 0;
			a : do
				if ((b | 0) < (c[f >> 2] | 0))
					do {
						c[e >> 2] = b + 1;
						b = a[(c[d >> 2] | 0) + b >> 0] | 0;
						if (!(b << 24 >> 24))
							break a;
						yj(l, b);
						b = c[e >> 2] | 0
					} while ((b | 0) < (c[f >> 2] | 0));
			while (0);
			nj(h, l);
			Tc(k, 0, h);
			qj(h);
			f = j;
			c[f >> 2] = 0;
			c[f + 4 >> 2] = 0;
			f = j + 8 | 0;
			b = gh(1) | 0;
			e = b + 1 | 0;
			a[b >> 0] = 113;
			c[j + 4 >> 2] = b;
			c[f >> 2] = e;
			c[j + 12 >> 2] = e;
			e = a[k >> 0] | 0;
			b = (e & 1) == 0;
			Cd(j, b ? k + 1 | 0 : c[k + 8 >> 2] | 0, b ? (e & 255) >>> 1 : c[k + 4 >> 2] | 0);
			e = c[g + 4 >> 2] | 0;
			b = j + 4 | 0;
			if (e) {
				j = c[b >> 2] | 0;
				Bc(e, j, (c[f >> 2] | 0) - j | 0)
			}
			b = c[b >> 2] | 0;
			if (!b) {
				qj(k);
				qj(l);
				i = m;
				return
			}
			if ((c[f >> 2] | 0) != (b | 0))
				c[f >> 2] = b;
			ih(b);
			qj(k);
			qj(l);
			i = m;
			return
		}
		function Cd(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0;
			if ((e | 0) <= 0)
				return;
			p = b + 4 | 0;
			q = b + 8 | 0;
			m = b + 12 | 0;
			o = 0;
			while (1) {
				n = d + o | 0;
				b = c[q >> 2] | 0;
				if ((b | 0) == (c[m >> 2] | 0)) {
					j = c[p >> 2] | 0;
					k = j;
					f = b - k + 1 | 0;
					if ((f | 0) < 0) {
						r = 6;
						break
					}
					l = j;
					b = b - l | 0;
					if (b >>> 0 < 1073741823) {
						b = b << 1;
						b = b >>> 0 < f >>> 0 ? f : b;
						g = c[q >> 2] | 0;
						f = g - l | 0;
						if (!b) {
							i = 0;
							h = 0;
							b = g
						} else
							r = 10
					} else {
						f = c[q >> 2] | 0;
						b = 2147483647;
						g = f;
						f = f - l | 0;
						r = 10
					}
					if ((r | 0) == 10) {
						r = 0;
						i = b;
						h = gh(b) | 0;
						b = g
					}
					a[h + f >> 0] = a[n >> 0] | 0;
					l = b - l | 0;
					n = h + (f - l) | 0;
					js(n | 0, j | 0, l | 0) | 0;
					c[p >> 2] = n;
					c[q >> 2] = h + (f + 1);
					c[m >> 2] = h + i;
					if (k)
						ih(k)
				} else {
					a[b >> 0] = a[n >> 0] | 0;
					c[q >> 2] = (c[q >> 2] | 0) + 1
				}
				o = o + 1 | 0;
				if ((o | 0) == (e | 0)) {
					r = 14;
					break
				}
			}
			if ((r | 0) == 6)
				fh(p);
			else if ((r | 0) == 14)
				return
		}
		function Dd(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Ed(a) {
			a = a | 0;
			var b = 0;
			b = gh(8) | 0;
			c[b >> 2] = 3128;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return b | 0
		}
		function Fd(a, b) {
			a = a | 0;
			b = b | 0;
			c[b >> 2] = 3128;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return
		}
		function Gd(a) {
			a = a | 0;
			return
		}
		function Hd(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Id(a, b) {
			a = a | 0;
			b = b | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0;
			j = i;
			i = i + 16 | 0;
			h = j;
			e = c[a + 4 >> 2] | 0;
			m = b + 8 | 0;
			k = c[m >> 2] | 0;
			a = k + 1 | 0;
			c[m >> 2] = a;
			l = c[b >> 2] | 0;
			n = d[l + k >> 0] | 0;
			f = k + 2 | 0;
			c[m >> 2] = f;
			n = (d[l + a >> 0] | 0) << 8 | n;
			a = k + 3 | 0;
			c[m >> 2] = a;
			f = n | (d[l + f >> 0] | 0) << 16;
			k = k + 4 | 0;
			c[m >> 2] = k;
			a = f | (d[l + a >> 0] | 0) << 24;
			f = hh(a) | 0;
			a = dg(l + k | 0, f, (c[b + 4 >> 2] | 0) - k | 0, a) | 0;
			if ((a | 0) < 0) {
				jh(f);
				i = j;
				return
			}
			if ((a | 0) != 0 ? (c[h >> 2] = f, c[h + 4 >> 2] = a, c[h + 8 >> 2] = 1, g = c[(c[e + 60 >> 2] | 0) + ((d[f >> 0] | 0) * 24 | 0) + 16 >> 2] | 0, (g | 0) != 0) : 0)
				tb[c[(c[g >> 2] | 0) + 24 >> 2] & 127](g, h);
			jh(f);
			i = j;
			return
		}
		function Jd(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Kd(a) {
			a = a | 0;
			var b = 0;
			b = gh(8) | 0;
			c[b >> 2] = 3092;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return b | 0
		}
		function Ld(a, b) {
			a = a | 0;
			b = b | 0;
			c[b >> 2] = 3092;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return
		}
		function Md(a) {
			a = a | 0;
			return
		}
		function Nd(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Od(a, b) {
			a = a | 0;
			b = b | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0;
			a = c[a + 4 >> 2] | 0;
			g = b + 8 | 0;
			h = c[g >> 2] | 0;
			j = h + 1 | 0;
			c[g >> 2] = j;
			e = c[b >> 2] | 0;
			i = d[e + h >> 0] | 0;
			f = h + 2 | 0;
			c[g >> 2] = f;
			i = (d[e + j >> 0] | 0) << 8 | i;
			b = h + 3 | 0;
			c[g >> 2] = b;
			f = i | (d[e + f >> 0] | 0) << 16;
			c[g >> 2] = h + 4;
			c[a + 16 >> 2] = f | (d[e + b >> 0] | 0) << 24;
			return
		}
		function Pd(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Qd(a) {
			a = a | 0;
			a = gh(8) | 0;
			c[a >> 2] = 3056;
			return a | 0
		}
		function Rd(a, b) {
			a = a | 0;
			b = b | 0;
			c[b >> 2] = 3056;
			return
		}
		function Sd(a) {
			a = a | 0;
			return
		}
		function Td(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Ud(a, b) {
			a = a | 0;
			b = b | 0;
			mb(54);
			return
		}
		function Vd(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Wd(a) {
			a = a | 0;
			a = gh(8) | 0;
			c[a >> 2] = 3020;
			return a | 0
		}
		function Xd(a, b) {
			a = a | 0;
			b = b | 0;
			c[b >> 2] = 3020;
			return
		}
		function Yd(a) {
			a = a | 0;
			return
		}
		function Zd(a) {
			a = a | 0;
			ih(a);
			return
		}
		function _d(a, b) {
			a = a | 0;
			b = b | 0;
			return
		}
		function $d(a) {
			a = a | 0;
			ih(a);
			return
		}
		function ae(a) {
			a = a | 0;
			a = gh(8) | 0;
			c[a >> 2] = 2984;
			return a | 0
		}
		function be(a, b) {
			a = a | 0;
			b = b | 0;
			c[b >> 2] = 2984;
			return
		}
		function ce(a) {
			a = a | 0;
			return
		}
		function de(a) {
			a = a | 0;
			ih(a);
			return
		}
		function ee(a, b) {
			a = a | 0;
			b = b | 0;
			a = c[b + 8 >> 2] | 0;
			kb(55, (c[b >> 2] | 0) + a | 0, (c[b + 4 >> 2] | 0) - a | 0) | 0;
			return
		}
		function fe(a) {
			a = a | 0;
			ih(a);
			return
		}
		function ge(a) {
			a = a | 0;
			var b = 0;
			b = gh(8) | 0;
			c[b >> 2] = 2948;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return b | 0
		}
		function he(a, b) {
			a = a | 0;
			b = b | 0;
			c[b >> 2] = 2948;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return
		}
		function ie(a) {
			a = a | 0;
			return
		}
		function je(a) {
			a = a | 0;
			ih(a);
			return
		}
		function ke(b, e) {
			b = b | 0;
			e = e | 0;
			var f = 0,
			g = 0.0,
			j = 0.0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0.0,
			r = 0.0,
			s = 0.0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			D = 0,
			E = 0;
			p = i;
			i = i + 16 | 0;
			o = p;
			m = c[b + 4 >> 2] | 0;
			n = e + 8 | 0;
			D = c[n >> 2] | 0;
			l = D + 1 | 0;
			c[n >> 2] = l;
			w = c[e >> 2] | 0;
			t = d[w + D >> 0] | 0;
			E = D + 2 | 0;
			c[n >> 2] = E;
			l = ks(d[w + l >> 0] | 0 | 0, 0, 8) | 0;
			f = C;
			v = D + 3 | 0;
			c[n >> 2] = v;
			E = ks(d[w + E >> 0] | 0 | 0, 0, 16) | 0;
			f = f | C;
			y = D + 4 | 0;
			c[n >> 2] = y;
			v = ks(d[w + v >> 0] | 0 | 0, 0, 24) | 0;
			f = f | C;
			z = D + 5 | 0;
			c[n >> 2] = z;
			y = d[w + y >> 0] | 0;
			x = D + 6 | 0;
			c[n >> 2] = x;
			z = ks(d[w + z >> 0] | 0 | 0, 0, 40) | 0;
			B = C;
			b = D + 7 | 0;
			c[n >> 2] = b;
			x = ks(d[w + x >> 0] | 0 | 0, 0, 48) | 0;
			A = C;
			u = D + 8 | 0;
			c[n >> 2] = u;
			b = ks(d[w + b >> 0] | 0 | 0, 0, 56) | 0;
			A = f | y | B | A | C;
			c[k >> 2] = l | t | E | v | z | x | b;
			c[k + 4 >> 2] = A;
			q = +h[k >> 3];
			A = D + 9 | 0;
			c[n >> 2] = A;
			u = d[w + u >> 0] | 0;
			b = D + 10 | 0;
			c[n >> 2] = b;
			A = ks(d[w + A >> 0] | 0 | 0, 0, 8) | 0;
			x = C;
			z = D + 11 | 0;
			c[n >> 2] = z;
			b = ks(d[w + b >> 0] | 0 | 0, 0, 16) | 0;
			x = x | C;
			v = D + 12 | 0;
			c[n >> 2] = v;
			z = ks(d[w + z >> 0] | 0 | 0, 0, 24) | 0;
			x = x | C;
			E = D + 13 | 0;
			c[n >> 2] = E;
			v = d[w + v >> 0] | 0;
			t = D + 14 | 0;
			c[n >> 2] = t;
			E = ks(d[w + E >> 0] | 0 | 0, 0, 40) | 0;
			l = C;
			B = D + 15 | 0;
			c[n >> 2] = B;
			t = ks(d[w + t >> 0] | 0 | 0, 0, 48) | 0;
			y = C;
			f = D + 16 | 0;
			c[n >> 2] = f;
			B = ks(d[w + B >> 0] | 0 | 0, 0, 56) | 0;
			y = x | v | l | y | C;
			c[k >> 2] = A | u | b | z | E | t | B;
			c[k + 4 >> 2] = y;
			s = +h[k >> 3];
			y = D + 17 | 0;
			c[n >> 2] = y;
			B = c[e >> 2] | 0;
			f = d[B + f >> 0] | 0;
			t = D + 18 | 0;
			c[n >> 2] = t;
			y = ks(d[B + y >> 0] | 0 | 0, 0, 8) | 0;
			E = C;
			z = D + 19 | 0;
			c[n >> 2] = z;
			t = ks(d[B + t >> 0] | 0 | 0, 0, 16) | 0;
			E = E | C;
			b = D + 20 | 0;
			c[n >> 2] = b;
			z = ks(d[B + z >> 0] | 0 | 0, 0, 24) | 0;
			E = E | C;
			u = D + 21 | 0;
			c[n >> 2] = u;
			b = d[B + b >> 0] | 0;
			A = D + 22 | 0;
			c[n >> 2] = A;
			u = ks(d[B + u >> 0] | 0 | 0, 0, 40) | 0;
			l = C;
			v = D + 23 | 0;
			c[n >> 2] = v;
			A = ks(d[B + A >> 0] | 0 | 0, 0, 48) | 0;
			x = C;
			w = D + 24 | 0;
			c[n >> 2] = w;
			v = ks(d[B + v >> 0] | 0 | 0, 0, 56) | 0;
			x = E | b | l | x | C;
			c[k >> 2] = y | f | t | z | u | A | v;
			c[k + 4 >> 2] = x;
			g = +h[k >> 3];
			x = D + 25 | 0;
			c[n >> 2] = x;
			w = d[B + w >> 0] | 0;
			v = D + 26 | 0;
			c[n >> 2] = v;
			x = ks(d[B + x >> 0] | 0 | 0, 0, 8) | 0;
			A = C;
			u = D + 27 | 0;
			c[n >> 2] = u;
			v = ks(d[B + v >> 0] | 0 | 0, 0, 16) | 0;
			A = A | C;
			z = D + 28 | 0;
			c[n >> 2] = z;
			u = ks(d[B + u >> 0] | 0 | 0, 0, 24) | 0;
			A = A | C;
			t = D + 29 | 0;
			c[n >> 2] = t;
			z = d[B + z >> 0] | 0;
			f = D + 30 | 0;
			c[n >> 2] = f;
			t = ks(d[B + t >> 0] | 0 | 0, 0, 40) | 0;
			y = C;
			l = D + 31 | 0;
			c[n >> 2] = l;
			f = ks(d[B + f >> 0] | 0 | 0, 0, 48) | 0;
			b = C;
			c[n >> 2] = D + 32;
			l = ks(d[B + l >> 0] | 0 | 0, 0, 56) | 0;
			b = A | z | y | b | C;
			c[k >> 2] = x | w | v | u | t | f | l;
			c[k + 4 >> 2] = b;
			j = +h[k >> 3];
			b = q > g;
			r = b ? g : q;
			g = b ? q : g;
			b = s > j;
			q = b ? j : s;
			j = b ? s : j;
			b = c[m >> 2] | 0;
			h[b + 96 >> 3] = r;
			h[b + 104 >> 3] = q;
			h[b + 112 >> 3] = g;
			h[b + 120 >> 3] = j;
			g = (r + g) * .5;
			j = (q + j) * .5;
			h[b + 152 >> 3] = g;
			h[b + 160 >> 3] = j;
			h[b + 168 >> 3] = 1.0;
			b = c[m >> 2] | 0;
			if ((c[b + 528 >> 2] | 0) == (c[b + 532 >> 2] | 0)) {
				h[b + 128 >> 3] = g;
				h[b + 136 >> 3] = j;
				h[b + 144 >> 3] = 1.0
			}
			l = e + 4 | 0;
			f = c[l >> 2] | 0;
			b = c[n >> 2] | 0;
			if ((f | 0) <= (b | 0)) {
				i = p;
				return
			}
			c[n >> 2] = b + 1;
			D = d[(c[e >> 2] | 0) + b >> 0] | 0;
			b = b + 4 | 0;
			c[n >> 2] = b;
			E = c[m >> 2] | 0;
			a[E + 600 >> 0] = D & 1;
			a[E + 601 >> 0] = D >>> 2 & 1;
			a[E + 602 >> 0] = D >>> 3 & 1;
			c[o >> 2] = 0;
			c[o + 4 >> 2] = 0;
			c[o + 8 >> 2] = 0;
			if ((b | 0) < (f | 0)) {
				do {
					c[n >> 2] = b + 1;
					b = a[(c[e >> 2] | 0) + b >> 0] | 0;
					if (!(b << 24 >> 24))
						break;
					yj(o, b);
					b = c[n >> 2] | 0
				} while ((b | 0) < (c[l >> 2] | 0));
				b = (a[o >> 0] & 1) == 0;
				f = c[o + 8 >> 2] | 0
			} else {
				b = 1;
				f = 0
			}
			lb(56, (b ? o + 1 | 0 : f) | 0) | 0;
			qj(o);
			i = p;
			return
		}
		function le(a) {
			a = a | 0;
			ih(a);
			return
		}
		function me(a) {
			a = a | 0;
			var b = 0;
			b = gh(8) | 0;
			c[b >> 2] = 2912;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return b | 0
		}
		function ne(a, b) {
			a = a | 0;
			b = b | 0;
			c[b >> 2] = 2912;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return
		}
		function oe(a) {
			a = a | 0;
			return
		}
		function pe(a) {
			a = a | 0;
			ih(a);
			return
		}
		function qe(a, b) {
			a = a | 0;
			b = b | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0;
			q = i;
			i = i + 16 | 0;
			p = q;
			k = c[a + 4 >> 2] | 0;
			l = b + 8 | 0;
			f = c[l >> 2] | 0;
			m = f + 1 | 0;
			c[l >> 2] = m;
			g = c[b >> 2] | 0;
			a = d[g + f >> 0] | 0;
			n = f + 2 | 0;
			c[l >> 2] = n;
			a = (d[g + m >> 0] | 0) << 8 | a;
			m = f + 3 | 0;
			c[l >> 2] = m;
			n = a | (d[g + n >> 0] | 0) << 16;
			f = f + 4 | 0;
			c[l >> 2] = f;
			m = n | (d[g + m >> 0] | 0) << 24;
			n = k + 48 | 0;
			a = c[n >> 2] | 0;
			o = k + 52 | 0;
			e = c[o >> 2] | 0;
			if ((e | 0) != (a | 0)) {
				a = e + (~((e + -4 - a | 0) >>> 2) << 2) | 0;
				c[o >> 2] = a
			}
			if ((m | 0) <= 0) {
				b = c[k >> 2] | 0;
				b = b + 608 | 0;
				fg(b);
				b = c[k >> 2] | 0;
				b = b + 72 | 0;
				of(b);
				i = q;
				return
			}
			j = k + 56 | 0;
			h = g;
			g = 0;
			while (1) {
				e = f + 1 | 0;
				c[l >> 2] = e;
				s = d[h + f >> 0] | 0;
				r = f + 2 | 0;
				c[l >> 2] = r;
				s = (d[h + e >> 0] | 0) << 8 | s;
				e = f + 3 | 0;
				c[l >> 2] = e;
				r = s | (d[h + r >> 0] | 0) << 16;
				c[l >> 2] = f + 4;
				e = r | (d[h + e >> 0] | 0) << 24;
				c[p >> 2] = e;
				if (a >>> 0 < (c[j >> 2] | 0) >>> 0) {
					c[a >> 2] = e;
					c[o >> 2] = a + 4
				} else
					re(n, p);
				e = g + 1 | 0;
				if ((e | 0) == (m | 0))
					break;
				f = c[l >> 2] | 0;
				h = c[b >> 2] | 0;
				a = c[o >> 2] | 0;
				g = e
			}
			s = c[k >> 2] | 0;
			s = s + 608 | 0;
			fg(s);
			s = c[k >> 2] | 0;
			s = s + 72 | 0;
			of(s);
			i = q;
			return
		}
		function re(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			i = a + 4 | 0;
			j = c[a >> 2] | 0;
			k = j;
			e = ((c[i >> 2] | 0) - k >> 2) + 1 | 0;
			if (e >>> 0 > 1073741823)
				fh(a);
			l = a + 8 | 0;
			f = j;
			d = (c[l >> 2] | 0) - f | 0;
			if (d >> 2 >>> 0 < 536870911) {
				d = d >> 1;
				d = d >>> 0 < e >>> 0 ? e : d;
				f = (c[i >> 2] | 0) - f | 0;
				e = f >> 2;
				if (!d) {
					h = 0;
					g = 0;
					d = f
				} else
					m = 6
			} else {
				f = (c[i >> 2] | 0) - f | 0;
				d = 1073741823;
				e = f >> 2;
				m = 6
			}
			if ((m | 0) == 6) {
				h = d;
				g = gh(d << 2) | 0;
				d = f
			}
			c[g + (e << 2) >> 2] = c[b >> 2];
			js(g | 0, j | 0, d | 0) | 0;
			c[a >> 2] = g;
			c[i >> 2] = g + (e + 1 << 2);
			c[l >> 2] = g + (h << 2);
			if (!k)
				return;
			ih(k);
			return
		}
		function se(a) {
			a = a | 0;
			ih(a);
			return
		}
		function te(a) {
			a = a | 0;
			var b = 0;
			b = gh(8) | 0;
			c[b >> 2] = 2876;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return b | 0
		}
		function ue(a, b) {
			a = a | 0;
			b = b | 0;
			c[b >> 2] = 2876;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return
		}
		function ve(a) {
			a = a | 0;
			return
		}
		function we(a) {
			a = a | 0;
			ih(a);
			return
		}
		function xe(b, e) {
			b = b | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0;
			t = i;
			i = i + 16 | 0;
			r = t;
			m = c[b + 4 >> 2] | 0;
			if (a[(c[m >> 2] | 0) + 600 >> 0] | 0) {
				i = t;
				return
			}
			q = e + 8 | 0;
			p = c[q >> 2] | 0;
			n = p + 1 | 0;
			c[q >> 2] = n;
			o = c[e >> 2] | 0;
			b = d[o + p >> 0] | 0;
			f = p + 2 | 0;
			c[q >> 2] = f;
			b = d[o + n >> 0] << 8 | b;
			n = p + 3 | 0;
			c[q >> 2] = n;
			f = b | d[o + f >> 0] << 16;
			c[q >> 2] = p + 4;
			n = f | d[o + n >> 0] << 24;
			o = m + 36 | 0;
			f = c[o >> 2] | 0;
			p = m + 40 | 0;
			b = c[p >> 2] | 0;
			if ((b | 0) != (f | 0))
				do {
					c[p >> 2] = b + -16;
					qj(b + -12 | 0);
					b = c[p >> 2] | 0
				} while ((b | 0) != (f | 0));
			if ((n | 0) > 0) {
				h = r + 4 | 0;
				j = e + 4 | 0;
				k = m + 44 | 0;
				l = 0;
				do {
					b = c[q >> 2] | 0;
					u = b + 1 | 0;
					c[q >> 2] = u;
					f = c[e >> 2] | 0;
					g = d[f + b >> 0] | 0;
					v = b + 2 | 0;
					c[q >> 2] = v;
					g = d[f + u >> 0] << 8 | g;
					u = b + 3 | 0;
					c[q >> 2] = u;
					v = g | d[f + v >> 0] << 16;
					g = b + 4 | 0;
					c[q >> 2] = g;
					c[r >> 2] = v | d[f + u >> 0] << 24;
					c[h >> 2] = 0;
					c[h + 4 >> 2] = 0;
					c[h + 8 >> 2] = 0;
					a : do
						if ((g | 0) < (c[j >> 2] | 0) ? (c[q >> 2] = b + 5, s = a[f + g >> 0] | 0, s << 24 >> 24 != 0) : 0) {
							b = s;
							do {
								yj(h, b);
								b = c[q >> 2] | 0;
								if ((b | 0) >= (c[j >> 2] | 0))
									break a;
								v = c[e >> 2] | 0;
								c[q >> 2] = b + 1;
								b = a[v + b >> 0] | 0
							} while (b << 24 >> 24 != 0)
						}
					while (0);
					b = c[p >> 2] | 0;
					if (b >>> 0 < (c[k >> 2] | 0) >>> 0) {
						c[b >> 2] = c[r >> 2];
						v = b + 4 | 0;
						c[v >> 2] = c[h >> 2];
						c[v + 4 >> 2] = c[h + 4 >> 2];
						c[v + 8 >> 2] = c[h + 8 >> 2];
						c[h >> 2] = 0;
						c[h + 4 >> 2] = 0;
						c[h + 8 >> 2] = 0;
						c[b >> 2] = c[r >> 2];
						c[p >> 2] = (c[p >> 2] | 0) + 16
					} else
						ye(o, r);
					qj(h);
					l = l + 1 | 0
				} while ((l | 0) != (n | 0))
			}
			fg((c[m >> 2] | 0) + 608 | 0);
			of((c[m >> 2] | 0) + 72 | 0);
			i = t;
			return
		}
		function ye(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			k = a + 4 | 0;
			d = c[a >> 2] | 0;
			f = ((c[k >> 2] | 0) - d >> 4) + 1 | 0;
			if (f >>> 0 > 268435455)
				fh(a);
			l = a + 8 | 0;
			e = (c[l >> 2] | 0) - d | 0;
			if (e >> 4 >>> 0 < 134217727) {
				e = e >> 3;
				e = e >>> 0 < f >>> 0 ? f : e;
				d = (c[k >> 2] | 0) - d >> 4;
				if (!e) {
					g = 0;
					h = 0
				} else
					i = 6
			} else {
				e = 268435455;
				d = (c[k >> 2] | 0) - d >> 4;
				i = 6
			}
			if ((i | 0) == 6) {
				g = e;
				h = gh(e << 4) | 0
			}
			f = h + (d << 4) | 0;
			e = f;
			j = h + (g << 4) | 0;
			i = c[b >> 2] | 0;
			g = h + (d << 4) + 4 | 0;
			b = b + 4 | 0;
			c[g >> 2] = c[b >> 2];
			c[g + 4 >> 2] = c[b + 4 >> 2];
			c[g + 8 >> 2] = c[b + 8 >> 2];
			c[b >> 2] = 0;
			c[b + 4 >> 2] = 0;
			c[b + 8 >> 2] = 0;
			c[f >> 2] = i;
			b = h + (d + 1 << 4) | 0;
			i = c[a >> 2] | 0;
			d = c[k >> 2] | 0;
			if ((d | 0) == (i | 0)) {
				g = a;
				h = k;
				f = i
			} else {
				do {
					g = d;
					d = d + -16 | 0;
					h = f + -16 | 0;
					c[h >> 2] = c[d >> 2];
					m = f + -12 | 0;
					g = g + -12 | 0;
					c[m >> 2] = c[g >> 2];
					c[m + 4 >> 2] = c[g + 4 >> 2];
					c[m + 8 >> 2] = c[g + 8 >> 2];
					c[g >> 2] = 0;
					c[g + 4 >> 2] = 0;
					c[g + 8 >> 2] = 0;
					c[h >> 2] = c[d >> 2];
					f = e + -16 | 0;
					e = f
				} while ((d | 0) != (i | 0));
				d = e;
				g = a;
				h = k;
				e = d;
				f = c[a >> 2] | 0;
				d = c[k >> 2] | 0
			}
			c[g >> 2] = e;
			c[h >> 2] = b;
			c[l >> 2] = j;
			e = f;
			if ((d | 0) != (e | 0))
				do {
					qj(d + -12 | 0);
					d = d + -16 | 0
				} while ((d | 0) != (e | 0));
			if (!f)
				return;
			ih(f);
			return
		}
		function ze(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Ae(a) {
			a = a | 0;
			var b = 0;
			b = gh(8) | 0;
			c[b >> 2] = 2840;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return b | 0
		}
		function Be(a, b) {
			a = a | 0;
			b = b | 0;
			c[b >> 2] = 2840;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return
		}
		function Ce(a) {
			a = a | 0;
			return
		}
		function De(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Ee(a, b) {
			a = a | 0;
			b = b | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0;
			h = i;
			i = i + 16 | 0;
			g = h;
			f = c[c[a + 4 >> 2] >> 2] | 0;
			j = b + 8 | 0;
			k = c[j >> 2] | 0;
			a = k + 1 | 0;
			c[j >> 2] = a;
			b = c[b >> 2] | 0;
			l = d[b + k >> 0] | 0;
			e = k + 2 | 0;
			c[j >> 2] = e;
			l = (d[b + a >> 0] | 0) << 8 | l;
			a = k + 3 | 0;
			c[j >> 2] = a;
			e = l | (d[b + e >> 0] | 0) << 16;
			c[j >> 2] = k + 4;
			a = e | (d[b + a >> 0] | 0) << 24;
			c[g >> 2] = a;
			b = f + 520 | 0;
			e = c[b >> 2] | 0;
			if ((e | 0) == (c[f + 524 >> 2] | 0)) {
				Fe(f + 516 | 0, g);
				i = h;
				return
			} else {
				c[e >> 2] = a;
				c[b >> 2] = e + 4;
				i = h;
				return
			}
		}
		function Fe(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			i = a + 4 | 0;
			j = c[a >> 2] | 0;
			k = j;
			e = ((c[i >> 2] | 0) - k >> 2) + 1 | 0;
			if (e >>> 0 > 1073741823)
				fh(a);
			l = a + 8 | 0;
			f = j;
			d = (c[l >> 2] | 0) - f | 0;
			if (d >> 2 >>> 0 < 536870911) {
				d = d >> 1;
				d = d >>> 0 < e >>> 0 ? e : d;
				f = (c[i >> 2] | 0) - f | 0;
				e = f >> 2;
				if (!d) {
					h = 0;
					g = 0;
					d = f
				} else
					m = 6
			} else {
				f = (c[i >> 2] | 0) - f | 0;
				d = 1073741823;
				e = f >> 2;
				m = 6
			}
			if ((m | 0) == 6) {
				h = d;
				g = gh(d << 2) | 0;
				d = f
			}
			c[g + (e << 2) >> 2] = c[b >> 2];
			js(g | 0, j | 0, d | 0) | 0;
			c[a >> 2] = g;
			c[i >> 2] = g + (e + 1 << 2);
			c[l >> 2] = g + (h << 2);
			if (!k)
				return;
			ih(k);
			return
		}
		function Ge(a) {
			a = a | 0;
			ih(a);
			return
		}
		function He(a) {
			a = a | 0;
			var b = 0;
			b = gh(8) | 0;
			c[b >> 2] = 2804;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return b | 0
		}
		function Ie(a, b) {
			a = a | 0;
			b = b | 0;
			c[b >> 2] = 2804;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return
		}
		function Je(a) {
			a = a | 0;
			return
		}
		function Ke(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Le(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0;
			e = c[c[a + 4 >> 2] >> 2] | 0;
			b = c[e + 528 >> 2] | 0;
			a = e + 532 | 0;
			d = c[a >> 2] | 0;
			if ((d | 0) != (b | 0))
				c[a >> 2] = d + (~((d + -4 - b | 0) >>> 2) << 2);
			d = c[e + 516 >> 2] | 0;
			b = e + 520 | 0;
			a = c[b >> 2] | 0;
			if ((a | 0) == (d | 0))
				return;
			c[b >> 2] = a + (~((a + -4 - d | 0) >>> 2) << 2);
			return
		}
		function Me(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Ne(a) {
			a = a | 0;
			var b = 0;
			b = gh(8) | 0;
			c[b >> 2] = 2768;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return b | 0
		}
		function Oe(a, b) {
			a = a | 0;
			b = b | 0;
			c[b >> 2] = 2768;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return
		}
		function Pe(a) {
			a = a | 0;
			return
		}
		function Qe(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Re(a, b) {
			a = a | 0;
			b = b | 0;
			a = c[a + 4 >> 2] | 0;
			og((c[a >> 2] | 0) + 512 | 0);
			a = a + 16 | 0;
			c[a >> 2] = Kc(a, 4, 255) | 0;
			return
		}
		function Se(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Te(a) {
			a = a | 0;
			var b = 0;
			b = gh(8) | 0;
			c[b >> 2] = 2732;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return b | 0
		}
		function Ue(a, b) {
			a = a | 0;
			b = b | 0;
			c[b >> 2] = 2732;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return
		}
		function Ve(a) {
			a = a | 0;
			return
		}
		function We(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Xe(a, b) {
			a = a | 0;
			b = b | 0;
			var e = 0.0,
			f = 0.0,
			i = 0.0,
			j = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0;
			a = c[c[a + 4 >> 2] >> 2] | 0;
			m = b + 8 | 0;
			n = c[m >> 2] | 0;
			p = n + 1 | 0;
			c[m >> 2] = p;
			j = c[b >> 2] | 0;
			o = d[j + n >> 0] | 0;
			l = n + 2 | 0;
			c[m >> 2] = l;
			o = (d[j + p >> 0] | 0) << 8 | o;
			b = n + 3 | 0;
			c[m >> 2] = b;
			l = o | (d[j + l >> 0] | 0) << 16;
			o = n + 4 | 0;
			c[m >> 2] = o;
			i = (c[k >> 2] = l | (d[j + b >> 0] | 0) << 24, +g[k >> 2]);
			b = n + 5 | 0;
			c[m >> 2] = b;
			o = d[j + o >> 0] | 0;
			l = n + 6 | 0;
			c[m >> 2] = l;
			o = (d[j + b >> 0] | 0) << 8 | o;
			b = n + 7 | 0;
			c[m >> 2] = b;
			l = o | (d[j + l >> 0] | 0) << 16;
			o = n + 8 | 0;
			c[m >> 2] = o;
			f = (c[k >> 2] = l | (d[j + b >> 0] | 0) << 24, +g[k >> 2]);
			b = n + 9 | 0;
			c[m >> 2] = b;
			o = d[j + o >> 0] | 0;
			l = n + 10 | 0;
			c[m >> 2] = l;
			o = (d[j + b >> 0] | 0) << 8 | o;
			b = n + 11 | 0;
			c[m >> 2] = b;
			l = o | (d[j + l >> 0] | 0) << 16;
			c[m >> 2] = n + 12;
			e = (c[k >> 2] = l | (d[j + b >> 0] | 0) << 24, +g[k >> 2]);
			h[a + 152 >> 3] = i;
			h[a + 160 >> 3] = f;
			h[a + 168 >> 3] = e;
			return
		}
		function Ye(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Ze(a) {
			a = a | 0;
			var b = 0;
			b = gh(8) | 0;
			c[b >> 2] = 2696;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return b | 0
		}
		function _e(a, b) {
			a = a | 0;
			b = b | 0;
			c[b >> 2] = 2696;
			c[b + 4 >> 2] = c[a + 4 >> 2];
			return
		}
		function $e(a) {
			a = a | 0;
			return
		}
		function af(a) {
			a = a | 0;
			ih(a);
			return
		}
		function bf(a, b) {
			a = a | 0;
			b = b | 0;
			_c(c[a + 4 >> 2] | 0, b);
			return
		}
		function cf(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0.0,
			n = 0.0;
			l = i;
			i = i + 16 | 0;
			k = l + 4 | 0;
			j = l;
			e = l + 8 | 0;
			g = b + 4 | 0;
			c[g >> 2] = (c[g >> 2] | 0) + 1;
			g = b + 8 | 0;
			c[g >> 2] = (c[g >> 2] | 0) + 1;
			df(b);
			ef(b);
			if (!(a[18700] | 0))
				ff(b, d);
			else {
				g = (a[18697] | 0) == 0;
				a[e >> 0] = g ? -14 : 17;
				a[e + 1 >> 0] = g ? -5 : 17;
				a[e + 2 >> 0] = g ? -1 : 17;
				bc(d, e);
				dc(d, .05);
				ac(d, 0.0, 0.0,  + (c[887] | 0),  + (c[888] | 0));
				dc(d, 1.0)
			}
			Ub(d);
			ic(d,  + ((c[887] | 0) / 2 | 0 | 0),  + ((c[888] | 0) / 2 | 0 | 0));
			m = +h[b + 72 >> 3];
			hc(d, m, m);
			ic(d,  - +h[b + 56 >> 3],  - +h[b + 64 >> 3]);
			g = c[b >> 2] | 0;
			e = c[g + 552 >> 2] | 0;
			f = c[g + 556 >> 2] | 0;
			if ((e | 0) != (f | 0))
				do {
					yg(c[e >> 2] | 0, d);
					e = e + 4 | 0
				} while ((e | 0) != (f | 0));
			e = c[g + 540 >> 2] | 0;
			f = c[g + 544 >> 2] | 0;
			if ((e | 0) != (f | 0))
				do {
					yg(c[e >> 2] | 0, d);
					e = e + 4 | 0
				} while ((e | 0) != (f | 0));
			Vb(d);
			do
				if (a[b + 160 >> 0] | 0) {
					if ((a[18698] | 0) == 0 ? (a[(c[b >> 2] | 0) + 600 >> 0] | 0) == 0 : 0)
						break;
					f = b + 172 | 0;
					Tb(f, k, j);
					g = c[887] | 0;
					m =  + (g | 0) / 1920.0;
					n =  + (c[888] | 0) / 1080.0;
					j = ~~((n < m ? n : m) * 15.0);
					kc(d, f,  + (g - (c[k >> 2] | 0) - j | 0),  + (j | 0))
				}
			while (0);
			gf(b, d);
			hf(b, d);
			jf(b, d);
			kf(b, d);
			a[b + 17 >> 0] = 1;
			i = l;
			return
		}
		function df(b) {
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0;
			d = b + 17 | 0;
			if (!(a[d >> 0] | 0))
				return;
			a[d >> 0] = 0;
			tf(b + 132 | 0, +h[b + 24 >> 3], +h[b + 32 >> 3], +h[b + 40 >> 3], +h[b + 48 >> 3]);
			c[b + 128 >> 2] = 0;
			f = c[b >> 2] | 0;
			d = c[f + 552 >> 2] | 0;
			e = c[f + 556 >> 2] | 0;
			if ((d | 0) != (e | 0))
				do {
					uf(b, c[d >> 2] | 0);
					d = d + 4 | 0
				} while ((d | 0) != (e | 0));
			d = c[f + 540 >> 2] | 0;
			e = c[f + 544 >> 2] | 0;
			if ((d | 0) != (e | 0))
				do {
					uf(b, c[d >> 2] | 0);
					d = d + 4 | 0
				} while ((d | 0) != (e | 0));
			b = c[b >> 2] | 0;
			d = c[b + 552 >> 2] | 0;
			f = c[b + 556 >> 2] | 0;
			if ((d | 0) != (f | 0))
				do {
					e = c[d >> 2] | 0;
					if (ug(e) | 0 ? (a[e + 226 >> 0] | 0) == 0 : 0)
						tg(e);
					d = d + 4 | 0
				} while ((d | 0) != (f | 0));
			d = c[b + 540 >> 2] | 0;
			f = c[b + 544 >> 2] | 0;
			if ((d | 0) == (f | 0))
				return;
			do {
				e = c[d >> 2] | 0;
				if (ug(e) | 0 ? (a[e + 226 >> 0] | 0) == 0 : 0)
					tg(e);
				d = d + 4 | 0
			} while ((d | 0) != (f | 0));
			return
		}
		function ef(b) {
			b = b | 0;
			var d = 0.0,
			e = 0.0,
			f = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0.0,
			o = 0.0;
			i = c[b >> 2] | 0;
			k = c[i + 528 >> 2] | 0;
			m = c[i + 532 >> 2] | 0;
			l = (k | 0) == (m | 0);
			if (l)
				d = +h[b + 96 >> 3] * +h[b + 112 >> 3];
			else {
				f = k;
				d = 0.0;
				do {
					d = d + +g[(c[f >> 2] | 0) + 16 >> 2];
					f = f + 4 | 0
				} while ((f | 0) != (m | 0));
				d = 64.0 / d;
				d = +P( + (d > 1.0 ? 1.0 : d), .4);
				d = d * +h[b + 112 >> 3]
			}
			if (a[18700] | 0)
				d = d * (+R( + (+h[i + 688 >> 3] * 3.141592653589793 / 3.0e3)) * .05 + 1.05);
			h[b + 120 >> 3] = d;
			f = b + 16 | 0;
			if (!(a[f >> 0] | 0)) {
				j = b + 104 | 0;
				d = (d + +h[j >> 3] * 9.0) / 10.0;
				h[j >> 3] = d;
				f = b + 72 | 0
			} else {
				a[f >> 0] = 0;
				j = b + 104 | 0;
				h[j >> 3] = d;
				f = b + 72 | 0;
				h[f >> 3] = d;
				h[b + 96 >> 3] = d
			}
			e =  + (c[888] | 0) / 1080.0;
			n =  + (c[887] | 0) / 1920.0;
			i = b + 56 | 0;
			h[f >> 3] = d * (e < n ? n : e);
			if (l) {
				h[i >> 3] = (+h[i >> 3] * 29.0 + +h[b + 80 >> 3]) / 30.0;
				m = b + 64 | 0;
				h[m >> 3] = (+h[m >> 3] * 29.0 + +h[b + 88 >> 3]) / 30.0;
				return
			} else {
				f = k;
				e = 0.0;
				d = 0.0
			}
			do {
				l = c[f >> 2] | 0;
				wg(l);
				e = e + +g[l + 8 >> 2];
				d = d + +g[l + 12 >> 2];
				f = f + 4 | 0
			} while ((f | 0) != (m | 0));
			m = c[b >> 2] | 0;
			n = +h[j >> 3];
			o =  + ((c[m + 532 >> 2] | 0) - (c[m + 528 >> 2] | 0) >> 2 >>> 0);
			h[i >> 3] = (e / o + +h[i >> 3] * 2.0) / 3.0;
			m = b + 64 | 0;
			h[m >> 3] = (d / o + +h[m >> 3] * 2.0) / 3.0;
			m = b + 80 | 0;
			c[m >> 2] = c[i >> 2];
			c[m + 4 >> 2] = c[i + 4 >> 2];
			c[m + 8 >> 2] = c[i + 8 >> 2];
			c[m + 12 >> 2] = c[i + 12 >> 2];
			h[b + 96 >> 3] = n * 1.1;
			return
		}
		function ff(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0.0,
			j = 0,
			k = 0,
			l = 0,
			m = 0.0,
			n = 0.0;
			l = i;
			i = i + 16 | 0;
			e = l + 3 | 0;
			f = l;
			k = b + 72 | 0;
			g = +h[k >> 3] * .2;
			if (g < .01) {
				i = l;
				return
			}
			Ub(d);
			j = (a[18697] | 0) == 0;
			a[e >> 0] = j ? -14 : 17;
			a[e + 1 >> 0] = j ? -5 : 17;
			a[e + 2 >> 0] = j ? -1 : 17;
			bc(d, e);
			ac(d, 0.0, 0.0,  + (c[887] | 0),  + (c[888] | 0));
			j = (a[18697] | 0) == 0 ? 0 : -86;
			a[f >> 0] = j;
			a[f + 1 >> 0] = j;
			a[f + 2 >> 0] = j;
			cc(d, f);
			dc(d, g);
			g = +h[k >> 3];
			f = ~~( + (c[887] | 0) / g);
			j = ~~( + (c[888] | 0) / g);
			Zb(d);
			e = (~~( + ((f | 0) / 2 | 0 | 0) - +h[b + 56 >> 3]) | 0) % 50 | 0;
			if ((e | 0) < (f | 0)) {
				g =  + (j | 0);
				do {
					n =  + (e | 0);
					ec(d, n * +h[k >> 3] +  - .5, 0.0);
					m = +h[k >> 3];
					fc(d, n * m +  - .5, g * m);
					e = e + 50 | 0
				} while ((e | 0) < (f | 0))
			}
			e = (~~( + ((j | 0) / 2 | 0 | 0) - +h[b + 64 >> 3]) | 0) % 50 | 0;
			if ((e | 0) < (j | 0)) {
				g =  + (f | 0);
				do {
					m =  + (e | 0);
					ec(d, 0.0, m * +h[k >> 3] +  - .5);
					n = +h[k >> 3];
					fc(d, g * n, m * n +  - .5);
					e = e + 50 | 0
				} while ((e | 0) < (j | 0))
			}
			Xb(d);
			Vb(d);
			i = l;
			return
		}
		function gf(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0.0,
			g = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0.0;
			p = i;
			i = i + 160 | 0;
			g = p;
			k = p + 24 | 0;
			j = p + 16 | 0;
			n = p + 4 | 0;
			m = c[b >> 2] | 0;
			e = ~~+h[m + 632 >> 3];
			if ((a[m + 34 >> 0] | 0) != 0 | (e | 0) == 0) {
				i = p;
				return
			}
			c[g >> 2] = e;
			Gi(k, 128, 18345, g) | 0;
			f =  + (c[887] | 0) / 1920.0;
			q =  + (c[888] | 0) / 1080.0;
			e = ~~((q < f ? q : f) * 34.0);
			m = b + 184 | 0;
			yc(m) | 0;
			l = c[b + 236 >> 2] | 0;
			dc(d, .3);
			a[j >> 0] = 0;
			a[j + 1 >> 0] = 0;
			a[j + 2 >> 0] = 0;
			bc(d, j);
			f =  + (c[887] | 0) / 1920.0;
			j = c[888] | 0;
			q =  + (j | 0) / 1080.0;
			f = q < f ? q : f;
			ac(d,  + (~~(f * 10.0) | 0),  + (j - e - ~~(f * 5.0) | 0),  + (~~(f * 2.0) + l | 0),  + (e | 0));
			dc(d, 1.0);
			f =  + (c[887] | 0) / 1920.0;
			q =  + (c[888] | 0) / 1080.0;
			f =  + (~~((q < f ? q : f) * 24.0) | 0);
			e = b + 200 | 0;
			if (!(+h[e >> 3] == f)) {
				a[b + 231 >> 0] = 1;
				h[e >> 3] = f
			}
			oj(n, k, Ti(k) | 0);
			l = b + 188 | 0;
			k = a[n >> 0] | 0;
			j = (k & 1) == 0;
			k = j ? (k & 255) >>> 1 : c[n + 4 >> 2] | 0;
			g = a[l >> 0] | 0;
			e = (g & 1) == 0;
			a : do
				if ((k | 0) == ((e ? (g & 255) >>> 1 : c[b + 192 >> 2] | 0) | 0)) {
					g = j ? n + 1 | 0 : c[n + 8 >> 2] | 0;
					e = e ? l + 1 | 0 : c[b + 196 >> 2] | 0;
					if (!j)
						if (!(Ri(g, e, k) | 0))
							break;
						else {
							o = 10;
							break
						}
					if (k)
						while (1) {
							if ((a[g >> 0] | 0) != (a[e >> 0] | 0)) {
								o = 10;
								break a
							}
							k = k + -1 | 0;
							if (!k)
								break;
							else {
								g = g + 1 | 0;
								e = e + 1 | 0
							}
						}
				} else
					o = 10;
			while (0);
			if ((o | 0) == 10) {
				a[b + 231 >> 0] = 1;
				rj(l, n) | 0
			}
			qj(n);
			e = b + 230 | 0;
			if (a[e >> 0] | 0) {
				a[b + 231 >> 0] = 1;
				a[e >> 0] = 0
			}
			o = yc(m) | 0;
			q =  + (c[887] | 0) / 1920.0;
			b = c[888] | 0;
			f =  + (b | 0) / 1080.0;
			q = f < q ? f : q;
			kc(d, o,  + (~~(q * 10.0) | 0),  + (b - ~~(q * 40.0) | 0));
			i = p;
			return
		}
		function hf(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0.0,
			n = 0.0,
			o = 0;
			l = i;
			i = i + 48 | 0;
			e = l + 35 | 0;
			f = l + 32 | 0;
			j = l + 20 | 0;
			k = l + 8 | 0;
			h = l + 4 | 0;
			g = l;
			if (!(a[b + 161 >> 0] | 0)) {
				i = l;
				return
			}
			o = b + 176 | 0;
			m =  + (c[887] | 0) * .6 / 200.0;
			Sb(o, ~~(m * 200.0), ~~(m * 20.0));
			hc(o, m, m);
			dc(o, .4);
			a[e >> 0] = 0;
			a[e + 1 >> 0] = 0;
			a[e + 2 >> 0] = 0;
			bc(o, e);
			ac(o, 0.0, 0.0, 200.0, 20.0);
			dc(o, 1.0);
			a[f >> 0] = -1;
			a[f + 1 >> 0] = -1;
			a[f + 2 >> 0] = -1;
			bc(o, f);
			oj(j, 18355, 29);
			qc(o, 4.0);
			b = j + 8 | 0;
			f = j + 1 | 0;
			m =  + (~~(100.0 - +pc(o, (a[j >> 0] & 1) == 0 ? f : c[b >> 2] | 0) * .5) | 0);
			nc(o, (a[j >> 0] & 1) == 0 ? f : c[b >> 2] | 0, m, 7.0);
			oj(k, 18385, 84);
			qc(o, 4.0);
			b = k + 8 | 0;
			f = k + 1 | 0;
			m =  + (~~(100.0 - +pc(o, (a[k >> 0] & 1) == 0 ? f : c[b >> 2] | 0) * .5) | 0);
			nc(o, (a[k >> 0] & 1) == 0 ? f : c[b >> 2] | 0, m, 14.0);
			qj(k);
			qj(j);
			Tb(o, h, g);
			k = c[887] | 0;
			b = c[888] | 0;
			m =  + (k | 0) / 1920.0;
			n =  + (b | 0) / 1080.0;
			kc(d, o,  + ((k - (c[h >> 2] | 0) | 0) / 2 | 0 | 0),  + (b - (c[g >> 2] | 0) - ~~((n < m ? n : m) * 20.0) | 0));
			i = l;
			return
		}
		function jf(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0.0,
			f = 0,
			g = 0,
			j = 0.0,
			k = 0.0,
			l = 0.0,
			m = 0,
			n = 0;
			n = i;
			i = i + 16 | 0;
			m = n;
			do
				if ((a[18470] | 0) == 0 ? (f = c[b >> 2] | 0, (a[f + 33 >> 0] | 0) != 0) : 0) {
					if ((c[f + 528 >> 2] | 0) == (c[f + 532 >> 2] | 0) ? (a[f + 34 >> 0] | 0) == 0 : 0) {
						g = 6;
						break
					}
					a[18471] = 0;
					l = +h[1] +  - .05;
					h[1] = l;
					if (l < 0.0) {
						h[1] = 0.0;
						a[18472] = 0
					}
				} else
					g = 6;
			while (0);
			do
				if ((g | 0) == 6) {
					e = +h[1] + ((a[18472] | 0) != 0 ? .016666666666666666 : .05);
					h[1] = e;
					if (e > 1.0) {
						h[1] = 1.0;
						a[18472] = 0;
						e = 1.0
					}
					if (a[18471] | 0) {
						if (!(a[3232] | 0)) {
							xc(3228);
							if (!(a[3232] | 0))
								break;
							e = +h[1]
						}
						dc(d, e);
						f = a[3232] | 0;
						if (!(f << 24 >> 24)) {
							xc(3228);
							f = a[3232] | 0;
							e =  + (c[809] | 0);
							if (!(f << 24 >> 24)) {
								xc(3228);
								f = a[3232] | 0
							}
						} else
							e =  + (c[809] | 0);
						j =  + (c[810] | 0);
						l =  + (c[887] | 0);
						b = c[888] | 0;
						k =  + (b | 0);
						f = f << 24 >> 24 == 0;
						if (e / j < l / k) {
							if (f) {
								xc(3228);
								e =  + (c[810] | 0) *  + (c[887] | 0);
								if (!(a[3232] | 0))
									xc(3228)
							} else
								e = j * l;
							b = c[888] | 0;
							j = e /  + (c[809] | 0);
							e = l
						} else {
							if (f) {
								xc(3228);
								f = c[888] | 0;
								e =  + (c[809] | 0) *  + (f | 0);
								if (!(a[3232] | 0)) {
									xc(3228);
									f = c[888] | 0
								}
							} else {
								e =  + (c[809] | 0) * k;
								f = b
							}
							b = f;
							j =  + (f | 0);
							e = e /  + (c[810] | 0)
						}
						mc(d, 3228, ( + (c[887] | 0) - e) * .5, ( + (b | 0) - j) * .5, e, j)
					}
				}
			while (0);
			dc(d, +h[1] * .5);
			a[m >> 0] = 0;
			a[m + 1 >> 0] = 0;
			a[m + 2 >> 0] = 0;
			bc(d, m);
			ac(d, 0.0, 0.0,  + (c[887] | 0),  + (c[888] | 0));
			dc(d, 1.0);
			i = n;
			return
		}
		function kf(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0.0,
			f = 0,
			g = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0.0;
			v = i;
			i = i + 48 | 0;
			t = v + 24 | 0;
			r = v + 12 | 0;
			s = v;
			if (a[(c[b >> 2] | 0) + 33 >> 0] | 0) {
				i = v;
				return
			}
			oj(t, 18473, 10);
			p = b + 248 | 0;
			e =  + (c[887] | 0) / 1920.0;
			w =  + (c[888] | 0) / 1080.0;
			e =  + (~~((w < e ? w : e) * 72.0) | 0);
			f = b + 264 | 0;
			if (!(+h[f >> 3] == e)) {
				a[b + 295 >> 0] = 1;
				h[f >> 3] = e
			}
			o = b + 252 | 0;
			k = a[t >> 0] | 0;
			j = (k & 1) == 0;
			m = t + 4 | 0;
			k = j ? (k & 255) >>> 1 : c[m >> 2] | 0;
			q = a[o >> 0] | 0;
			f = (q & 1) == 0;
			n = b + 256 | 0;
			a : do
				if ((k | 0) == ((f ? (q & 255) >>> 1 : c[n >> 2] | 0) | 0)) {
					g = j ? t + 1 | 0 : c[t + 8 >> 2] | 0;
					f = f ? o + 1 | 0 : c[b + 260 >> 2] | 0;
					if (!j)
						if (!(Ri(g, f, k) | 0))
							break;
						else {
							u = 10;
							break
						}
					if (k)
						while (1) {
							if ((a[g >> 0] | 0) != (a[f >> 0] | 0)) {
								u = 10;
								break a
							}
							k = k + -1 | 0;
							if (!k)
								break;
							else {
								g = g + 1 | 0;
								f = f + 1 | 0
							}
						}
				} else
					u = 10;
			while (0);
			if ((u | 0) == 10) {
				a[b + 295 >> 0] = 1;
				rj(o, t) | 0
			}
			yc(p) | 0;
			l = c[b + 300 >> 2] | 0;
			yc(p) | 0;
			q = c[b + 304 >> 2] | 0;
			f = (~~(+h[(c[b >> 2] | 0) + 688 >> 3] / 300.0) | 0) % 6 | 0;
			f = (f | 0) > 3 ? 6 - f | 0 : f;
			if ((f | 0) > 0) {
				g = 0;
				do {
					xj(t, 22036) | 0;
					g = g + 1 | 0
				} while ((g | 0) != (f | 0))
			}
			j = a[t >> 0] | 0;
			k = (j & 1) == 0;
			j = k ? (j & 255) >>> 1 : c[m >> 2] | 0;
			m = a[o >> 0] | 0;
			f = (m & 1) == 0;
			b : do
				if ((j | 0) == ((f ? (m & 255) >>> 1 : c[n >> 2] | 0) | 0)) {
					g = k ? t + 1 | 0 : c[t + 8 >> 2] | 0;
					f = f ? o + 1 | 0 : c[b + 260 >> 2] | 0;
					if (!k)
						if (!(Ri(g, f, j) | 0))
							break;
						else {
							u = 19;
							break
						}
					if (j)
						while (1) {
							if ((a[g >> 0] | 0) != (a[f >> 0] | 0)) {
								u = 19;
								break b
							}
							j = j + -1 | 0;
							if (!j)
								break;
							else {
								g = g + 1 | 0;
								f = f + 1 | 0
							}
						}
				} else
					u = 19;
			while (0);
			if ((u | 0) == 19) {
				a[b + 295 >> 0] = 1;
				rj(o, t) | 0
			}
			n = yc(p) | 0;
			kc(d, n,  + (((c[887] | 0) - l | 0) / 2 | 0 | 0),  + (((c[888] | 0) - q | 0) / 2 | 0 | 0));
			n = b + 312 | 0;
			e =  + (c[887] | 0) / 1920.0;
			w =  + (c[888] | 0) / 1080.0;
			e =  + (~~((w < e ? w : e) * 16.0) | 0);
			f = b + 328 | 0;
			if (!(+h[f >> 3] == e)) {
				a[b + 359 >> 0] = 1;
				h[f >> 3] = e
			}
			m = b + 376 | 0;
			f = b + 392 | 0;
			if (!(+h[f >> 3] == e)) {
				a[b + 423 >> 0] = 1;
				h[f >> 3] = e
			}
			oj(r, 18484, 55);
			l = b + 316 | 0;
			k = a[r >> 0] | 0;
			j = (k & 1) == 0;
			k = j ? (k & 255) >>> 1 : c[r + 4 >> 2] | 0;
			p = a[l >> 0] | 0;
			f = (p & 1) == 0;
			c : do
				if ((k | 0) == ((f ? (p & 255) >>> 1 : c[b + 320 >> 2] | 0) | 0)) {
					g = j ? r + 1 | 0 : c[r + 8 >> 2] | 0;
					f = f ? l + 1 | 0 : c[b + 324 >> 2] | 0;
					if (!j)
						if (!(Ri(g, f, k) | 0))
							break;
						else {
							u = 30;
							break
						}
					if (k)
						while (1) {
							if ((a[g >> 0] | 0) != (a[f >> 0] | 0)) {
								u = 30;
								break c
							}
							k = k + -1 | 0;
							if (!k)
								break;
							else {
								g = g + 1 | 0;
								f = f + 1 | 0
							}
						}
				} else
					u = 30;
			while (0);
			if ((u | 0) == 30) {
				a[b + 359 >> 0] = 1;
				rj(l, r) | 0
			}
			qj(r);
			oj(s, 18540, 52);
			l = b + 380 | 0;
			k = a[s >> 0] | 0;
			j = (k & 1) == 0;
			k = j ? (k & 255) >>> 1 : c[s + 4 >> 2] | 0;
			r = a[l >> 0] | 0;
			f = (r & 1) == 0;
			d : do
				if ((k | 0) == ((f ? (r & 255) >>> 1 : c[b + 384 >> 2] | 0) | 0)) {
					g = j ? s + 1 | 0 : c[s + 8 >> 2] | 0;
					f = f ? l + 1 | 0 : c[b + 388 >> 2] | 0;
					if (!j)
						if (!(Ri(g, f, k) | 0))
							break;
						else {
							u = 37;
							break
						}
					if (k)
						while (1) {
							if ((a[g >> 0] | 0) != (a[f >> 0] | 0)) {
								u = 37;
								break d
							}
							k = k + -1 | 0;
							if (!k)
								break;
							else {
								g = g + 1 | 0;
								f = f + 1 | 0
							}
						}
				} else
					u = 37;
			while (0);
			if ((u | 0) == 37) {
				a[b + 423 >> 0] = 1;
				rj(l, s) | 0
			}
			qj(s);
			u = yc(n) | 0;
			s = c[887] | 0;
			yc(n) | 0;
			r = c[888] | 0;
			w =  + (c[887] | 0) / 1920.0;
			e =  + (r | 0) / 1080.0;
			kc(d, u,  + ((s - (c[b + 364 >> 2] | 0) | 0) / 2 | 0 | 0),  + (~~((e < w ? e : w) * 88.0) + ((r - q | 0) / 2 | 0) | 0));
			r = yc(m) | 0;
			s = c[887] | 0;
			yc(m) | 0;
			u = c[888] | 0;
			w =  + (c[887] | 0) / 1920.0;
			e =  + (u | 0) / 1080.0;
			kc(d, r,  + ((s - (c[b + 428 >> 2] | 0) | 0) / 2 | 0 | 0),  + (~~((e < w ? e : w) * 108.0) + ((u - q | 0) / 2 | 0) | 0));
			qj(t);
			i = v;
			return
		}
		function lf(b) {
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0;
			f = b + 8 | 0;
			d = c[f >> 2] | 0;
			c[b + 12 >> 2] = d;
			c[f >> 2] = 0;
			if (!(a[(c[b >> 2] | 0) + 704 >> 0] | 0))
				return;
			f = b + 164 | 0;
			if ((d | 0) < 20) {
				e = c[f >> 2] | 0;
				c[f >> 2] = e + 1;
				if ((e | 0) > 4 ? (c[b + 168 >> 2] | 0) == 0 : 0)
					a[b + 161 >> 0] = 1
			} else
				c[f >> 2] = 0;
			e = b + 161 | 0;
			if (!(a[e >> 0] | 0))
				return;
			d = b + 168 | 0;
			b = c[d >> 2] | 0;
			c[d >> 2] = b + 1;
			if ((b | 0) <= 9)
				return;
			a[e >> 0] = 0;
			c[d >> 2] = -1;
			c[f >> 2] = 0;
			return
		}
		function mf(a) {
			a = a | 0;
			var b = 0,
			d = 0,
			e = 0;
			if (!(Fc() | 0))
				return;
			df(a);
			if (!(Fc() | 0))
				return;
			d = c[a >> 2] | 0;
			a = c[d + 552 >> 2] | 0;
			b = c[d + 556 >> 2] | 0;
			if ((a | 0) != (b | 0))
				do {
					e = c[a >> 2] | 0;
					wg(e);
					zg(e, 0);
					Fc() | 0;
					a = a + 4 | 0
				} while ((a | 0) != (b | 0));
			a = c[d + 540 >> 2] | 0;
			b = c[d + 544 >> 2] | 0;
			if ((a | 0) == (b | 0))
				return;
			do {
				e = c[a >> 2] | 0;
				wg(e);
				zg(e, 0);
				Fc() | 0;
				a = a + 4 | 0
			} while ((a | 0) != (b | 0));
			return
		}
		function nf(a) {
			a = a | 0;
			of(a);
			return
		}
		function of(b) {
			b = b | 0;
			var d = 0,
			e = 0.0,
			f = 0.0,
			h = 0,
			j = 0.0,
			k = 0.0,
			l = 0.0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0,
			E = 0,
			F = 0,
			G = 0,
			H = 0,
			I = 0,
			J = 0,
			K = 0,
			L = 0,
			M = 0,
			N = 0,
			O = 0,
			P = 0,
			Q = 0,
			R = 0,
			S = 0,
			T = 0,
			U = 0,
			V = 0;
			U = i;
			i = i + 224 | 0;
			K = U + 192 | 0;
			d = U + 213 | 0;
			h = U + 210 | 0;
			m = U + 36 | 0;
			Q = U + 24 | 0;
			N = U + 207 | 0;
			O = U + 204 | 0;
			R = U + 48 | 0;
			P = U + 12 | 0;
			S = U;
			if (!(vc() | 0)) {
				i = U;
				return
			}
			o = b + 160 | 0;
			a[o >> 0] = 1;
			T = b + 172 | 0;
			f =  + (c[887] | 0);
			j = f / 1920.0;
			l =  + (c[888] | 0) / 1080.0;
			j = l < j ? l : j;
			L = ~~(j * 200.0);
			n = c[b >> 2] | 0;
			M = n + 36 | 0;
			p = n + 48 | 0;
			q = n + 52 | 0;
			if ((c[p >> 2] | 0) == (c[q >> 2] | 0))
				e =  + ((((c[n + 40 >> 2] | 0) - (c[M >> 2] | 0) >> 4) * 24 | 0) >>> 0);
			else
				e = 180.0;
			k =  + (~~(f * j) | 0) * .12;
			k = k < 1.2 ? k : 1.2;
			k = k > 1.0 ? k : 1.0;
			l =  + (L | 0);
			j =  + (~~(j * e) + ~~(j * 60.0) | 0);
			Sb(T, ~~(l * k), ~~(j * k));
			hc(T, k, k);
			dc(T, .4);
			a[d >> 0] = 0;
			a[d + 1 >> 0] = 0;
			a[d + 2 >> 0] = 0;
			bc(T, d);
			ac(T, 0.0, 0.0, l, j);
			dc(T, 1.0);
			a[h >> 0] = -1;
			a[h + 1 >> 0] = -1;
			a[h + 2 >> 0] = -1;
			bc(T, h);
			oj(m, 18593, 11);
			j =  + (c[887] | 0) / 1920.0;
			l =  + (c[888] | 0) / 1080.0;
			qc(T,  + (~~((l < j ? l : j) * 30.0) | 0));
			d = m + 8 | 0;
			J = m + 1 | 0;
			j =  + (~~( + ((L | 0) / 2 | 0 | 0) - +pc(T, (a[m >> 0] & 1) == 0 ? J : c[d >> 2] | 0) * .5) | 0);
			l =  + (c[887] | 0) / 1920.0;
			k =  + (c[888] | 0) / 1080.0;
			nc(T, (a[m >> 0] & 1) == 0 ? J : c[d >> 2] | 0, j,  + (~~((k < l ? k : l) * 40.0) | 0));
			qj(m);
			d = c[p >> 2] | 0;
			if ((d | 0) != (c[q >> 2] | 0)) {
				l =  + (c[887] | 0) / 1920.0;
				j =  + (c[888] | 0) / 1080.0;
				l = j < l ? j : l;
				j =  + (~~(l * 80.0) | 0);
				k =  + (~~(l * 100.0) | 0);
				l =  + (~~(l * 140.0) | 0);
				e = 0.0;
				h = 0;
				do {
					f = e;
					e = e + +g[d + (h << 2) >> 2] * 3.141592653589793 * 2.0;
					if ((a[16] | 0) == 0 ? (ya(16) | 0) != 0 : 0) {
						a[18624] = 51;
						a[18625] = 51;
						a[18626] = 51;
						a[18627] = -1;
						a[18628] = 51;
						a[18629] = 51;
						a[18630] = 51;
						a[18631] = -1;
						a[18632] = 51;
						a[18633] = 51;
						a[18634] = 51;
						a[18635] = -1;
						Ga(16)
					}
					h = h + 1 | 0;
					bc(T, 18624 + (h * 3 | 0) | 0);
					Zb(T);
					ec(T, k, l);
					gc(T, k, l, j, f, e, 0);
					Wb(T);
					d = c[p >> 2] | 0
				} while (h >>> 0 < (c[q >> 2] | 0) - d >> 2 >>> 0);
				i = U;
				return
			}
			J = n + 40 | 0;
			if ((c[M >> 2] | 0) == (c[J >> 2] | 0)) {
				a[o >> 0] = 0;
				i = U;
				return
			}
			l =  + (c[887] | 0) / 1920.0;
			k =  + (c[888] | 0) / 1080.0;
			qc(T,  + (~~((k < l ? k : l) * 20.0) | 0));
			d = c[M >> 2] | 0;
			if ((c[J >> 2] | 0) == (d | 0)) {
				i = U;
				return
			}
			n = O + 1 | 0;
			o = O + 2 | 0;
			p = R + 64 | 0;
			q = R + 8 | 0;
			r = R + 12 | 0;
			s = R + 64 | 0;
			t = R + 4 | 0;
			u = R + 64 | 0;
			v = R + 136 | 0;
			w = R + 140 | 0;
			x = R + 44 | 0;
			y = R + 60 | 0;
			z = R + 8 | 0;
			A = Q + 4 | 0;
			B = P + 8 | 0;
			C = P + 1 | 0;
			D = P + 4 | 0;
			E = S + 8 | 0;
			F = S + 1 | 0;
			G = L + -5 | 0;
			H = N + 1 | 0;
			I = N + 2 | 0;
			m = 0;
			do {
				nj(Q, d + (m << 4) + 4 | 0);
				if (!(c[(c[M >> 2] | 0) + (m << 4) >> 2] & 1)) {
					a[O >> 0] = -1;
					a[n >> 0] = -1;
					a[o >> 0] = -1;
					bc(T, O)
				} else {
					h = c[b >> 2] | 0;
					d = c[h + 528 >> 2] | 0;
					if ((d | 0) != (c[h + 532 >> 2] | 0))
						rj(Q, (c[d >> 2] | 0) + 84 | 0) | 0;
					a[N >> 0] = -1;
					a[H >> 0] = -86;
					a[I >> 0] = -86;
					bc(T, N)
				}
				c[q >> 2] = 3276;
				c[R >> 2] = 3316;
				c[s >> 2] = 3336;
				c[t >> 2] = 0;
				Uj(u, r);
				c[v >> 2] = 0;
				c[w >> 2] = -1;
				c[R >> 2] = 3256;
				c[p >> 2] = 3296;
				c[q >> 2] = 3276;
				Xj(r);
				c[r >> 2] = 3352;
				c[x >> 2] = 0;
				c[x + 4 >> 2] = 0;
				c[x + 8 >> 2] = 0;
				c[x + 12 >> 2] = 0;
				c[y >> 2] = 24;
				c[K >> 2] = 0;
				c[K + 4 >> 2] = 0;
				c[K + 8 >> 2] = 0;
				vf(r, K);
				qj(K);
				d = m;
				m = m + 1 | 0;
				wf(tk(z, m) | 0, 18605, 2) | 0;
				h = a[Q >> 0] | 0;
				if ((a[18698] | 0) == 0 ? 1 : (((h & 1) == 0 ? (h & 255) >>> 1 : c[A >> 2] | 0) | 0) == 0)
					oj(P, 18608, 15);
				else
					nj(P, Q);
				h = a[P >> 0] | 0;
				V = (h & 1) == 0;
				wf(z, V ? C : c[B >> 2] | 0, V ? (h & 255) >>> 1 : c[D >> 2] | 0) | 0;
				qj(P);
				xf(S, r);
				h = ~~+pc(T, (a[S >> 0] & 1) == 0 ? F : c[E >> 2] | 0);
				e =  + (c[887] | 0) / 1920.0;
				l =  + (c[888] | 0) / 1080.0;
				e = l < e ? l : e;
				d = ~~( + ((d * 24 | 0) + 70 | 0) * e);
				if ((h | 0) > (G | 0))
					nc(T, (a[S >> 0] & 1) == 0 ? F : c[E >> 2] | 0,  + (~~(e * 10.0) | 0),  + (d | 0));
				else
					nc(T, (a[S >> 0] & 1) == 0 ? F : c[E >> 2] | 0,  + ((L - h | 0) / 2 | 0 | 0),  + (d | 0));
				qj(S);
				c[R >> 2] = 3256;
				c[s >> 2] = 3296;
				c[z >> 2] = 3276;
				c[r >> 2] = 3352;
				qj(x);
				Vj(r);
				Qj(s);
				qj(Q);
				d = c[M >> 2] | 0
			} while (m >>> 0 < (c[J >> 2] | 0) - d >> 4 >>> 0);
			i = U;
			return
		}
		function pf(a, b) {
			a = a | 0;
			b = +b;
			var c = 0,
			d = 0.0;
			c = a + 112 | 0;
			d = +h[c >> 3] * +P(.9, +b);
			d = d < 1.0 ? 1.0 : d;
			h[c >> 3] = d;
			b = 4.0 / +h[a + 72 >> 3];
			if (!(d > b))
				return;
			h[c >> 3] = b;
			return
		}
		function qf(b) {
			b = b | 0;
			a[18470] = b & 1;
			return
		}
		function rf(b) {
			b = b | 0;
			a[18472] = 1;
			return
		}
		function sf() {
			wc(3228, 18636);
			return
		}
		function tf(a, b, d, e, f) {
			a = a | 0;
			b = +b;
			d = +d;
			e = +e;
			f = +f;
			var h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0;
			g[a >> 2] = b;
			g[a + 4 >> 2] = d;
			n = ~~((e - b) / 50.0) >>> 0;
			c[a + 8 >> 2] = n;
			p = ~~((f - d) / 50.0) >>> 0;
			c[a + 12 >> 2] = p;
			p = _(n, p) | 0;
			n = a + 16 | 0;
			o = a + 20 | 0;
			i = c[o >> 2] | 0;
			h = c[n >> 2] | 0;
			if (((i - h | 0) / 12 | 0) >>> 0 > p >>> 0) {
				h = i;
				while (1) {
					i = h + -12 | 0;
					do {
						j = h + -12 | 0;
						c[o >> 2] = j;
						k = c[j >> 2] | 0;
						l = k;
						if (!k)
							h = j;
						else {
							h = h + -8 | 0;
							j = c[h >> 2] | 0;
							if ((j | 0) != (k | 0))
								c[h >> 2] = j + (~((j + -4 - l | 0) >>> 2) << 2);
							ih(k);
							h = c[o >> 2] | 0
						}
					} while ((h | 0) != (i | 0));
					h = c[n >> 2] | 0;
					if (((i - h | 0) / 12 | 0) >>> 0 > p >>> 0)
						h = i;
					else
						break
				}
			}
			if ((h | 0) != (i | 0)) {
				k = h;
				do {
					j = c[k >> 2] | 0;
					l = k + 4 | 0;
					m = c[l >> 2] | 0;
					if ((m | 0) != (j | 0))
						c[l >> 2] = m + (~((m + -4 - j | 0) >>> 2) << 2);
					k = k + 12 | 0
				} while ((k | 0) != (i | 0))
			}
			if (((i - h | 0) / 12 | 0) >>> 0 >= p >>> 0)
				return;
			j = a + 24 | 0;
			do
				if (i >>> 0 < (c[j >> 2] | 0) >>> 0) {
					c[i >> 2] = 0;
					c[i + 4 >> 2] = 0;
					c[i + 8 >> 2] = 0;
					i = i + 12 | 0;
					c[o >> 2] = i
				} else {
					Nf(n);
					i = c[o >> 2] | 0;
					h = c[n >> 2] | 0
				}
			while (((i - h | 0) / 12 | 0) >>> 0 < p >>> 0);
			return
		}
		function uf(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0.0,
			h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0;
			u = i;
			i = i + 16 | 0;
			s = u;
			pg(d);
			xg(d);
			if (!(ug(d) | 0)) {
				i = u;
				return
			}
			if (a[d + 226 >> 0] | 0) {
				i = u;
				return
			}
			t = d + 228 | 0;
			h = c[t >> 2] | 0;
			q = d + 232 | 0;
			r = c[q >> 2] | 0;
			if ((h | 0) == (r | 0)) {
				e = h;
				d = h
			} else {
				l = b + 132 | 0;
				m = b + 140 | 0;
				n = b + 136 | 0;
				o = b + 144 | 0;
				p = b + 148 | 0;
				do {
					c[s >> 2] = h;
					f = (+g[h + 4 >> 2] - +g[l >> 2]) / 50.0;
					if (!(f <= 0.0)) {
						k = ~~f >>> 0;
						e = c[m >> 2] | 0;
						e = k >>> 0 < e >>> 0 ? k : e + -1 | 0
					} else
						e = 0;
					f = (+g[h + 8 >> 2] - +g[n >> 2]) / 50.0;
					if (!(f <= 0.0)) {
						k = ~~f >>> 0;
						d = c[o >> 2] | 0;
						d = k >>> 0 < d >>> 0 ? k : d + -1 | 0
					} else
						d = 0;
					d = (_(c[m >> 2] | 0, d) | 0) + e | 0;
					e = c[p >> 2] | 0;
					j = e + (d * 12 | 0) + 4 | 0;
					k = c[j >> 2] | 0;
					if ((k | 0) == (c[e + (d * 12 | 0) + 8 >> 2] | 0))
						Mf(e + (d * 12 | 0) | 0, s);
					else {
						c[k >> 2] = h;
						c[j >> 2] = (c[j >> 2] | 0) + 4
					}
					h = h + 28 | 0
				} while ((h | 0) != (r | 0));
				e = c[q >> 2] | 0;
				d = c[t >> 2] | 0
			}
			b = b + 128 | 0;
			c[b >> 2] = (c[b >> 2] | 0) + ((e - d | 0) / 28 | 0);
			i = u;
			return
		}
		function vf(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0;
			i = b + 32 | 0;
			rj(i, d) | 0;
			h = b + 44 | 0;
			c[h >> 2] = 0;
			j = b + 48 | 0;
			g = c[j >> 2] | 0;
			if (g & 8) {
				d = a[i >> 0] | 0;
				if (!(d & 1)) {
					d = ((d & 255) >>> 1) + (i + 1) | 0;
					c[h >> 2] = d;
					e = i + 1 | 0;
					f = i + 1 | 0
				} else {
					d = (c[b + 40 >> 2] | 0) + (c[b + 36 >> 2] | 0) | 0;
					c[h >> 2] = d;
					f = c[b + 40 >> 2] | 0;
					e = f
				}
				c[b + 8 >> 2] = e;
				c[b + 12 >> 2] = f;
				c[b + 16 >> 2] = d
			}
			if (!(g & 16))
				return;
			d = a[i >> 0] | 0;
			if (!(d & 1)) {
				g = (d & 255) >>> 1;
				c[h >> 2] = i + 1 + g;
				d = 10;
				h = g
			} else {
				g = c[b + 36 >> 2] | 0;
				c[h >> 2] = (c[b + 40 >> 2] | 0) + g;
				d = (c[i >> 2] & -2) + -1 | 0;
				h = g
			}
			uj(i, d, 0);
			d = a[i >> 0] | 0;
			if (!(d & 1)) {
				g = i + 1 | 0;
				f = (d & 255) >>> 1;
				e = i + 1 | 0
			} else {
				e = c[b + 40 >> 2] | 0;
				g = e;
				f = c[b + 36 >> 2] | 0
			}
			d = b + 24 | 0;
			c[d >> 2] = e;
			c[b + 20 >> 2] = e;
			c[b + 28 >> 2] = g + f;
			if (!(c[j >> 2] & 3))
				return;
			c[d >> 2] = e + h;
			return
		}
		function wf(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0;
			n = i;
			i = i + 32 | 0;
			j = n + 16 | 0;
			m = n + 8 | 0;
			k = n;
			rk(m, b);
			if (!(a[m >> 0] | 0)) {
				sk(m);
				i = n;
				return b | 0
			}
			f = c[(c[b >> 2] | 0) + -12 >> 2] | 0;
			c[k >> 2] = c[b + (f + 24) >> 2];
			l = b + f | 0;
			g = d + e | 0;
			h = (c[b + (f + 4) >> 2] & 176 | 0) == 32 ? g : d;
			f = b + (f + 76) | 0;
			e = c[f >> 2] | 0;
			if ((e | 0) == -1) {
				c[j >> 2] = Tj(l) | 0;
				e = Mo(j, 9352) | 0;
				e = Cb[c[(c[e >> 2] | 0) + 28 >> 2] & 15](e, 32) | 0;
				Ko(j);
				e = e << 24 >> 24;
				c[f >> 2] = e
			}
			c[j >> 2] = c[k >> 2];
			if (yf(j, d, h, g, l, e & 255) | 0) {
				sk(m);
				i = n;
				return b | 0
			}
			d = c[(c[b >> 2] | 0) + -12 >> 2] | 0;
			Pj(b + d | 0, c[b + (d + 16) >> 2] | 5);
			sk(m);
			i = n;
			return b | 0
		}
		function xf(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0;
			e = c[d + 48 >> 2] | 0;
			if (e & 16) {
				e = d + 44 | 0;
				f = c[e >> 2] | 0;
				g = c[d + 24 >> 2] | 0;
				if (f >>> 0 < g >>> 0)
					c[e >> 2] = g;
				else
					g = f;
				f = c[d + 20 >> 2] | 0;
				h = g - f | 0;
				if (h >>> 0 > 4294967279)
					eh(b);
				if (h >>> 0 < 11) {
					a[b >> 0] = h << 1;
					e = b + 1 | 0
				} else {
					d = h + 16 & -16;
					e = gh(d) | 0;
					c[b + 8 >> 2] = e;
					c[b >> 2] = d | 1;
					c[b + 4 >> 2] = h
				}
				if ((f | 0) != (g | 0)) {
					d = e;
					while (1) {
						a[d >> 0] = a[f >> 0] | 0;
						f = f + 1 | 0;
						if ((f | 0) == (g | 0))
							break;
						else
							d = d + 1 | 0
					}
					e = e + h | 0
				}
				a[e >> 0] = 0;
				return
			}
			if (!(e & 8)) {
				c[b >> 2] = 0;
				c[b + 4 >> 2] = 0;
				c[b + 8 >> 2] = 0;
				return
			}
			f = c[d + 8 >> 2] | 0;
			d = c[d + 16 >> 2] | 0;
			h = d - f | 0;
			if (h >>> 0 > 4294967279)
				eh(b);
			if (h >>> 0 < 11) {
				a[b >> 0] = h << 1;
				e = b + 1 | 0
			} else {
				g = h + 16 & -16;
				e = gh(g) | 0;
				c[b + 8 >> 2] = e;
				c[b >> 2] = g | 1;
				c[b + 4 >> 2] = h
			}
			if ((f | 0) != (d | 0)) {
				g = e;
				while (1) {
					a[g >> 0] = a[f >> 0] | 0;
					f = f + 1 | 0;
					if ((f | 0) == (d | 0))
						break;
					else
						g = g + 1 | 0
				}
				e = e + h | 0
			}
			a[e >> 0] = 0;
			return
		}
		function yf(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0;
			o = i;
			i = i + 16 | 0;
			m = o;
			n = c[b >> 2] | 0;
			if (!n) {
				b = 0;
				i = o;
				return b | 0
			}
			p = d;
			k = f - p | 0;
			l = g + 12 | 0;
			j = c[l >> 2] | 0;
			k = (j | 0) > (k | 0) ? j - k | 0 : 0;
			j = e;
			g = j - p | 0;
			if ((g | 0) > 0 ? (pb[c[(c[n >> 2] | 0) + 48 >> 2] & 31](n, d, g) | 0) != (g | 0) : 0) {
				c[b >> 2] = 0;
				p = 0;
				i = o;
				return p | 0
			}
			do
				if ((k | 0) > 0) {
					pj(m, k, h);
					if ((pb[c[(c[n >> 2] | 0) + 48 >> 2] & 31](n, (a[m >> 0] & 1) == 0 ? m + 1 | 0 : c[m + 8 >> 2] | 0, k) | 0) == (k | 0)) {
						qj(m);
						break
					}
					c[b >> 2] = 0;
					qj(m);
					p = 0;
					i = o;
					return p | 0
				}
			while (0);
			f = f - j | 0;
			if ((f | 0) > 0 ? (pb[c[(c[n >> 2] | 0) + 48 >> 2] & 31](n, e, f) | 0) != (f | 0) : 0) {
				c[b >> 2] = 0;
				p = 0;
				i = o;
				return p | 0
			}
			c[l >> 2] = 0;
			p = n;
			i = o;
			return p | 0
		}
		function zf(a) {
			a = a | 0;
			c[a >> 2] = 3352;
			qj(a + 32 | 0);
			Vj(a);
			return
		}
		function Af(a) {
			a = a | 0;
			c[a >> 2] = 3352;
			qj(a + 32 | 0);
			Vj(a);
			ih(a);
			return
		}
		function Bf(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			i = d + 44 | 0;
			j = c[i >> 2] | 0;
			l = d + 24 | 0;
			m = c[l >> 2] | 0;
			if (j >>> 0 < m >>> 0) {
				c[i >> 2] = m;
				j = m
			}
			k = j;
			i = h & 24;
			if (!i) {
				d = b;
				c[d >> 2] = 0;
				c[d + 4 >> 2] = 0;
				d = b + 8 | 0;
				c[d >> 2] = -1;
				c[d + 4 >> 2] = -1;
				return
			}
			if ((g | 0) == 1 & (i | 0) == 24) {
				d = b;
				c[d >> 2] = 0;
				c[d + 4 >> 2] = 0;
				d = b + 8 | 0;
				c[d >> 2] = -1;
				c[d + 4 >> 2] = -1;
				return
			}
			a : do
				switch (g | 0) {
				case 0: {
						i = 0;
						g = 0;
						break
					}
				case 1:
					if (!(h & 8)) {
						g = m - (c[d + 20 >> 2] | 0) | 0;
						i = g;
						g = ((g | 0) < 0) << 31 >> 31;
						break a
					} else {
						g = (c[d + 12 >> 2] | 0) - (c[d + 8 >> 2] | 0) | 0;
						i = g;
						g = ((g | 0) < 0) << 31 >> 31;
						break a
					}
				case 2: {
						i = d + 32 | 0;
						if (!(a[i >> 0] & 1))
							i = i + 1 | 0;
						else
							i = c[d + 40 >> 2] | 0;
						g = j - i | 0;
						i = g;
						g = ((g | 0) < 0) << 31 >> 31;
						break
					}
				default: {
						d = b;
						c[d >> 2] = 0;
						c[d + 4 >> 2] = 0;
						d = b + 8 | 0;
						c[d >> 2] = -1;
						c[d + 4 >> 2] = -1;
						return
					}
				}
			while (0);
			g = is(i | 0, g | 0, e | 0, f | 0) | 0;
			e = C;
			if ((e | 0) >= 0) {
				i = d + 32 | 0;
				if (!(a[i >> 0] & 1))
					i = i + 1 | 0;
				else
					i = c[d + 40 >> 2] | 0;
				f = j - i | 0;
				j = ((f | 0) < 0) << 31 >> 31;
				if (!((j | 0) < (e | 0) | (j | 0) == (e | 0) & f >>> 0 < g >>> 0)) {
					i = h & 8;
					if (!((g | 0) == 0 & (e | 0) == 0)) {
						if ((i | 0) != 0 ? (c[d + 12 >> 2] | 0) == 0 : 0) {
							d = b;
							c[d >> 2] = 0;
							c[d + 4 >> 2] = 0;
							d = b + 8 | 0;
							c[d >> 2] = -1;
							c[d + 4 >> 2] = -1;
							return
						}
						if ((h & 16 | 0) != 0 & (m | 0) == 0) {
							d = b;
							c[d >> 2] = 0;
							c[d + 4 >> 2] = 0;
							d = b + 8 | 0;
							c[d >> 2] = -1;
							c[d + 4 >> 2] = -1;
							return
						}
					}
					if (i) {
						c[d + 12 >> 2] = (c[d + 8 >> 2] | 0) + g;
						c[d + 16 >> 2] = k
					}
					if (h & 16)
						c[l >> 2] = (c[d + 20 >> 2] | 0) + g;
					d = b;
					c[d >> 2] = 0;
					c[d + 4 >> 2] = 0;
					d = b + 8 | 0;
					c[d >> 2] = g;
					c[d + 4 >> 2] = e;
					return
				}
			}
			d = b;
			c[d >> 2] = 0;
			c[d + 4 >> 2] = 0;
			d = b + 8 | 0;
			c[d >> 2] = -1;
			c[d + 4 >> 2] = -1;
			return
		}
		function Cf(a, b, d, e) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			d = d + 8 | 0;
			Bb[c[(c[b >> 2] | 0) + 16 >> 2] & 7](a, b, c[d >> 2] | 0, c[d + 4 >> 2] | 0, 0, e);
			return
		}
		function Df(a) {
			a = a | 0;
			var b = 0,
			e = 0,
			f = 0,
			g = 0;
			b = a + 44 | 0;
			e = c[b >> 2] | 0;
			f = c[a + 24 >> 2] | 0;
			if (e >>> 0 < f >>> 0) {
				c[b >> 2] = f;
				e = f
			}
			if (!(c[a + 48 >> 2] & 8)) {
				a = -1;
				return a | 0
			}
			g = a + 16 | 0;
			b = c[g >> 2] | 0;
			f = a + 12 | 0;
			if (b >>> 0 < e >>> 0) {
				f = c[f >> 2] | 0;
				c[g >> 2] = e;
				b = e
			} else
				f = c[f >> 2] | 0;
			if (f >>> 0 >= b >>> 0) {
				a = -1;
				return a | 0
			}
			a = d[f >> 0] | 0;
			return a | 0
		}
		function Ef(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0;
			f = b + 44 | 0;
			e = c[f >> 2] | 0;
			g = c[b + 24 >> 2] | 0;
			if (e >>> 0 < g >>> 0) {
				c[f >> 2] = g;
				e = g
			}
			j = b + 8 | 0;
			f = c[j >> 2] | 0;
			k = b + 12 | 0;
			h = c[k >> 2] | 0;
			i = f;
			if (f >>> 0 >= h >>> 0) {
				b = -1;
				return b | 0
			}
			if ((d | 0) == -1) {
				c[j >> 2] = f;
				c[k >> 2] = h + -1;
				c[b + 16 >> 2] = e;
				b = 0;
				return b | 0
			}
			if (!(c[b + 48 >> 2] & 16)) {
				g = d & 255;
				f = h + -1 | 0;
				if (g << 24 >> 24 != (a[f >> 0] | 0)) {
					b = -1;
					return b | 0
				}
			} else {
				g = d & 255;
				f = h + -1 | 0
			}
			c[j >> 2] = i;
			c[k >> 2] = f;
			c[b + 16 >> 2] = e;
			a[f >> 0] = g;
			b = d;
			return b | 0
		}
		function Ff(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0;
			t = i;
			i = i + 16 | 0;
			o = t;
			if ((d | 0) == -1) {
				b = 0;
				i = t;
				return b | 0
			}
			p = b + 12 | 0;
			q = b + 8 | 0;
			r = (c[p >> 2] | 0) - (c[q >> 2] | 0) | 0;
			s = b + 24 | 0;
			l = c[s >> 2] | 0;
			n = b + 28 | 0;
			e = c[n >> 2] | 0;
			if ((l | 0) == (e | 0)) {
				k = b + 48 | 0;
				if (!(c[k >> 2] & 16)) {
					b = -1;
					i = t;
					return b | 0
				}
				h = b + 20 | 0;
				j = c[h >> 2] | 0;
				g = b + 44 | 0;
				m = (c[g >> 2] | 0) - j | 0;
				f = b + 32 | 0;
				yj(f, 0);
				if (!(a[f >> 0] & 1))
					e = 10;
				else
					e = (c[f >> 2] & -2) + -1 | 0;
				uj(f, e, 0);
				e = a[f >> 0] | 0;
				if (!(e & 1)) {
					f = f + 1 | 0;
					e = (e & 255) >>> 1
				} else {
					f = c[b + 40 >> 2] | 0;
					e = c[b + 36 >> 2] | 0
				}
				e = f + e | 0;
				c[h >> 2] = f;
				c[n >> 2] = e;
				l = f + (l - j) | 0;
				c[s >> 2] = l;
				f = f + m | 0;
				c[g >> 2] = f;
				j = e
			} else {
				f = b + 44 | 0;
				k = b + 48 | 0;
				g = f;
				f = c[f >> 2] | 0;
				j = e
			}
			h = l + 1 | 0;
			c[o >> 2] = h;
			f = c[(h >>> 0 < f >>> 0 ? g : o) >> 2] | 0;
			c[g >> 2] = f;
			if (c[k >> 2] & 8) {
				e = b + 32 | 0;
				if (!(a[e >> 0] & 1))
					e = e + 1 | 0;
				else
					e = c[b + 40 >> 2] | 0;
				c[q >> 2] = e;
				c[p >> 2] = e + r;
				c[b + 16 >> 2] = f
			}
			if ((l | 0) == (j | 0)) {
				b = Cb[c[(c[b >> 2] | 0) + 52 >> 2] & 15](b, d & 255) | 0;
				i = t;
				return b | 0
			} else {
				c[s >> 2] = h;
				a[l >> 0] = d;
				b = d & 255;
				i = t;
				return b | 0
			}
			return 0
		}
		function Gf(a) {
			a = a | 0;
			var b = 0,
			d = 0;
			c[a >> 2] = 3256;
			b = a + 64 | 0;
			c[b >> 2] = 3296;
			c[a + 8 >> 2] = 3276;
			d = a + 12 | 0;
			c[d >> 2] = 3352;
			qj(a + 44 | 0);
			Vj(d);
			Qj(b);
			return
		}
		function Hf(a) {
			a = a | 0;
			var b = 0,
			d = 0;
			c[a >> 2] = 3256;
			b = a + 64 | 0;
			c[b >> 2] = 3296;
			c[a + 8 >> 2] = 3276;
			d = a + 12 | 0;
			c[d >> 2] = 3352;
			qj(a + 44 | 0);
			Vj(d);
			Qj(b);
			ih(a);
			return
		}
		function If(a) {
			a = a | 0;
			var b = 0,
			d = 0;
			d = a + -8 | 0;
			c[d >> 2] = 3256;
			a = d + 64 | 0;
			c[a >> 2] = 3296;
			c[d + 8 >> 2] = 3276;
			b = d + 12 | 0;
			c[b >> 2] = 3352;
			qj(d + 44 | 0);
			Vj(b);
			Qj(a);
			return
		}
		function Jf(a) {
			a = a | 0;
			var b = 0,
			d = 0;
			a = a + -8 | 0;
			c[a >> 2] = 3256;
			b = a + 64 | 0;
			c[b >> 2] = 3296;
			c[a + 8 >> 2] = 3276;
			d = a + 12 | 0;
			c[d >> 2] = 3352;
			qj(a + 44 | 0);
			Vj(d);
			Qj(b);
			ih(a);
			return
		}
		function Kf(a) {
			a = a | 0;
			var b = 0,
			d = 0,
			e = 0;
			e = c[(c[a >> 2] | 0) + -12 >> 2] | 0;
			c[a + e >> 2] = 3256;
			b = a + (e + 64) | 0;
			c[b >> 2] = 3296;
			c[a + (e + 8) >> 2] = 3276;
			d = a + (e + 12) | 0;
			c[d >> 2] = 3352;
			qj(a + (e + 44) | 0);
			Vj(d);
			Qj(b);
			return
		}
		function Lf(a) {
			a = a | 0;
			var b = 0,
			d = 0,
			e = 0,
			f = 0;
			f = c[(c[a >> 2] | 0) + -12 >> 2] | 0;
			b = a + f | 0;
			c[b >> 2] = 3256;
			d = a + (f + 64) | 0;
			c[d >> 2] = 3296;
			c[a + (f + 8) >> 2] = 3276;
			e = a + (f + 12) | 0;
			c[e >> 2] = 3352;
			qj(a + (f + 44) | 0);
			Vj(e);
			Qj(d);
			ih(b);
			return
		}
		function Mf(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			i = a + 4 | 0;
			j = c[a >> 2] | 0;
			k = j;
			e = ((c[i >> 2] | 0) - k >> 2) + 1 | 0;
			if (e >>> 0 > 1073741823)
				fh(a);
			l = a + 8 | 0;
			f = j;
			d = (c[l >> 2] | 0) - f | 0;
			if (d >> 2 >>> 0 < 536870911) {
				d = d >> 1;
				d = d >>> 0 < e >>> 0 ? e : d;
				f = (c[i >> 2] | 0) - f | 0;
				e = f >> 2;
				if (!d) {
					h = 0;
					g = 0;
					d = f
				} else
					m = 6
			} else {
				f = (c[i >> 2] | 0) - f | 0;
				d = 1073741823;
				e = f >> 2;
				m = 6
			}
			if ((m | 0) == 6) {
				h = d;
				g = gh(d << 2) | 0;
				d = f
			}
			c[g + (e << 2) >> 2] = c[b >> 2];
			js(g | 0, j | 0, d | 0) | 0;
			c[a >> 2] = g;
			c[i >> 2] = g + (e + 1 << 2);
			c[l >> 2] = g + (h << 2);
			if (!k)
				return;
			ih(k);
			return
		}
		function Nf(a) {
			a = a | 0;
			var b = 0,
			d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0;
			m = a + 4 | 0;
			l = c[a >> 2] | 0;
			d = (((c[m >> 2] | 0) - l | 0) / 12 | 0) + 1 | 0;
			if (d >>> 0 > 357913941)
				fh(a);
			n = a + 8 | 0;
			i = l;
			b = ((c[n >> 2] | 0) - i | 0) / 12 | 0;
			if (b >>> 0 < 178956970) {
				e = b << 1;
				d = e >>> 0 < d >>> 0 ? d : e;
				e = c[m >> 2] | 0;
				b = e;
				f = (b - i | 0) / 12 | 0;
				if (!d) {
					h = 0;
					j = 0
				} else
					g = 6
			} else {
				e = c[m >> 2] | 0;
				b = e;
				d = 357913941;
				f = (b - i | 0) / 12 | 0;
				g = 6
			}
			if ((g | 0) == 6) {
				h = d;
				j = gh(d * 12 | 0) | 0
			}
			d = j + (f * 12 | 0) | 0;
			g = d;
			k = j + (h * 12 | 0) | 0;
			c[d >> 2] = 0;
			c[j + (f * 12 | 0) + 4 >> 2] = 0;
			c[j + (f * 12 | 0) + 8 >> 2] = 0;
			h = j + ((f + 1 | 0) * 12 | 0) | 0;
			if ((e | 0) == (l | 0)) {
				e = a;
				f = m;
				d = g
			} else {
				b = g;
				do {
					j = d + -12 | 0;
					i = e;
					e = e + -12 | 0;
					c[j >> 2] = 0;
					g = d + -8 | 0;
					c[g >> 2] = 0;
					c[d + -4 >> 2] = 0;
					c[j >> 2] = c[e >> 2];
					j = i + -8 | 0;
					c[g >> 2] = c[j >> 2];
					i = i + -4 | 0;
					c[d + -4 >> 2] = c[i >> 2];
					c[i >> 2] = 0;
					c[j >> 2] = 0;
					c[e >> 2] = 0;
					d = b + -12 | 0;
					b = d
				} while ((e | 0) != (l | 0));
				e = a;
				f = m;
				d = b;
				i = c[a >> 2] | 0;
				b = c[m >> 2] | 0
			}
			c[e >> 2] = d;
			c[f >> 2] = h;
			c[n >> 2] = k;
			h = i;
			if ((b | 0) != (h | 0))
				do {
					d = b;
					b = b + -12 | 0;
					f = c[b >> 2] | 0;
					g = f;
					if (f) {
						d = d + -8 | 0;
						e = c[d >> 2] | 0;
						if ((e | 0) != (f | 0))
							c[d >> 2] = e + (~((e + -4 - g | 0) >>> 2) << 2);
						ih(f)
					}
				} while ((b | 0) != (h | 0));
			if (!i)
				return;
			ih(i);
			return
		}
		function Of() {
			var b = 0,
			d = 0,
			e = 0;
			e = i;
			i = i + 16 | 0;
			b = e + 4 | 0;
			d = e;
			Tb(c[889] | 0, b, d);
			b = c[b >> 2] | 0;
			d = c[d >> 2] | 0;
			if (!((b | 0) == (c[887] | 0) & (d | 0) == (c[888] | 0))) {
				c[887] = b;
				c[888] = d;
				nf(96)
			}
			if (a[18700] | 0) {
				d = c[889] | 0;
				Tg(24, d);
				i = e;
				return
			}
			$b(c[889] | 0, 0.0, 0.0,  + (c[887] | 0),  + (c[888] | 0));
			d = c[889] | 0;
			Tg(24, d);
			i = e;
			return
		}
		function Pf() {
			mf(96);
			mg(536);
			return
		}
		function Qf() {
			if (!(Yc(24) | 0))
				return;
			Sg();
			return
		}
		function Rf() {
			_a(1, 0, 0);
			Hc(2);
			Dc(3);
			Ya();
			return 0
		}
		function Sf(a) {
			a = a | 0;
			Sg();
			Xc(24, a);
			return
		}
		function Tf(a) {
			a = a | 0;
			var b = 0,
			c = 0;
			b = i;
			i = i + 16 | 0;
			c = b;
			oj(c, a, Ti(a) | 0);
			ad(24, c);
			qj(c);
			i = b;
			return
		}
		function Uf(a, b) {
			a = a | 0;
			b = b | 0;
			c[154] = a;
			c[155] = b;
			return
		}
		function Vf() {
			var b = 0,
			d = 0,
			e = 0;
			e = i;
			i = i + 16 | 0;
			b = e;
			Wc(24);
			a[b >> 0] = 17;
			bd(24, 1);
			d = c[7] | 0;
			if (!d) {
				i = e;
				return
			}
			Bc(d, b, 1);
			i = e;
			return
		}
		function Wf() {
			var b = 0,
			d = 0,
			e = 0;
			e = i;
			i = i + 16 | 0;
			b = e;
			Wc(24);
			a[b >> 0] = 21;
			bd(24, 1);
			d = c[7] | 0;
			if (!d) {
				i = e;
				return
			}
			Bc(d, b, 1);
			i = e;
			return
		}
		function Xf() {
			var b = 0,
			d = 0,
			e = 0;
			e = i;
			i = i + 16 | 0;
			b = e;
			a[b >> 0] = 18;
			bd(24, 1);
			d = c[7] | 0;
			if (!d) {
				i = e;
				return
			}
			Bc(d, b, 1);
			i = e;
			return
		}
		function Yf() {
			var b = 0,
			d = 0,
			e = 0;
			e = i;
			i = i + 16 | 0;
			b = e;
			a[b >> 0] = 19;
			bd(24, 1);
			d = c[7] | 0;
			if (!d) {
				i = e;
				return
			}
			Bc(d, b, 1);
			i = e;
			return
		}
		function Zf(a) {
			a = +a;
			pf(96, a);
			return
		}
		function _f() {
			$c(24);
			return
		}
		function $f(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0;
			e = d + 1 | 0;
			f = hh((d | 0) < -1 ? -1 : e) | 0;
			a[f >> 0] = 102;
			js(f + 1 | 0, b | 0, d | 0) | 0;
			bd(24, e);
			b = c[7] | 0;
			if (!b) {
				jh(f);
				return
			}
			Bc(b, f, e);
			jh(f);
			return
		}
		function ag() {
			lf(96);
			kg(536);
			return
		}
		function bg(a) {
			a = a | 0;
			Uc(24, a);
			return
		}
		function cg() {
			c[889] = uc(18655) | 0;
			return
		}
		function dg(b, e, f, g) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0;
			x = b + f | 0;
			y = e + g | 0;
			if (!g) {
				if ((f | 0) == 1)
					g = (a[b >> 0] | 0) != 0;
				else
					g = 1;
				z = g << 31 >> 31;
				return z | 0
			}
			u = e + (g + -12) | 0;
			v = b + (f + -8) | 0;
			w = e + (g + -8) | 0;
			r = e + (g + -5) | 0;
			s = w;
			t = b + (f + -5) | 0;
			q = b + (f + -15) | 0;
			g = b;
			f = e;
			a : while (1) {
				i = g + 1 | 0;
				o = d[g >> 0] | 0;
				h = o >>> 4;
				if ((h | 0) == 15) {
					h = 15;
					while (1) {
						j = i + 1 | 0;
						p = a[i >> 0] | 0;
						h = (p & 255) + h | 0;
						if (p << 24 >> 24 == -1 & j >>> 0 < q >>> 0) {
							g = i;
							i = j
						} else
							break
					}
					if ((h | 0) < 0) {
						g = j;
						break
					}
					if ((g + (h + 2) | 0) >>> 0 < j >>> 0) {
						g = j;
						break
					} else {
						g = i;
						k = j
					}
				} else
					k = i;
				j = f + h | 0;
				p = h + 1 | 0;
				i = g + p | 0;
				if (j >>> 0 > u >>> 0 | i >>> 0 > v >>> 0) {
					g = k;
					z = 11;
					break
				} else
					l = f;
				while (1) {
					m = k;
					B = m;
					B = d[B >> 0] | d[B + 1 >> 0] << 8 | d[B + 2 >> 0] << 16 | d[B + 3 >> 0] << 24;
					m = m + 4 | 0;
					m = d[m >> 0] | d[m + 1 >> 0] << 8 | d[m + 2 >> 0] << 16 | d[m + 3 >> 0] << 24;
					n = l;
					A = n;
					a[A >> 0] = B;
					a[A + 1 >> 0] = B >> 8;
					a[A + 2 >> 0] = B >> 16;
					a[A + 3 >> 0] = B >> 24;
					n = n + 4 | 0;
					a[n >> 0] = m;
					a[n + 1 >> 0] = m >> 8;
					a[n + 2 >> 0] = m >> 16;
					a[n + 3 >> 0] = m >> 24;
					l = l + 8 | 0;
					if (l >>> 0 >= j >>> 0)
						break;
					else
						k = k + 8 | 0
				}
				l = h - ((d[i >> 0] | d[i + 1 >> 0] << 8) & 65535) | 0;
				n = f + l | 0;
				m = h + 3 | 0;
				g = g + m | 0;
				if (n >>> 0 < e >>> 0)
					break;
				i = o & 15;
				if ((i | 0) == 15) {
					k = g;
					i = 15;
					while (1) {
						if (k >>> 0 > t >>> 0) {
							g = k;
							break a
						}
						g = k + 1 | 0;
						B = a[k >> 0] | 0;
						i = (B & 255) + i | 0;
						if (B << 24 >> 24 == -1)
							k = g;
						else
							break
					}
					if ((i + h | 0) < (h | 0))
						break
				}
				k = h + 4 | 0;
				o = f + (k + i) | 0;
				i = j - n | 0;
				if ((i | 0) < 8) {
					B = c[3560 + (i << 2) >> 2] | 0;
					a[j >> 0] = a[n >> 0] | 0;
					a[f + p >> 0] = a[f + (l + 1) >> 0] | 0;
					a[f + (h + 2) >> 0] = a[f + (l + 2) >> 0] | 0;
					a[f + m >> 0] = a[f + (l + 3) >> 0] | 0;
					A = (c[3592 + (i << 2) >> 2] | 0) + l | 0;
					p = f + A | 0;
					k = f + k | 0;
					p = d[p >> 0] | d[p + 1 >> 0] << 8 | d[p + 2 >> 0] << 16 | d[p + 3 >> 0] << 24;
					a[k >> 0] = p;
					a[k + 1 >> 0] = p >> 8;
					a[k + 2 >> 0] = p >> 16;
					a[k + 3 >> 0] = p >> 24;
					k = A - B | 0
				} else {
					B = n;
					p = B;
					p = d[p >> 0] | d[p + 1 >> 0] << 8 | d[p + 2 >> 0] << 16 | d[p + 3 >> 0] << 24;
					B = B + 4 | 0;
					B = d[B >> 0] | d[B + 1 >> 0] << 8 | d[B + 2 >> 0] << 16 | d[B + 3 >> 0] << 24;
					k = j;
					A = k;
					a[A >> 0] = p;
					a[A + 1 >> 0] = p >> 8;
					a[A + 2 >> 0] = p >> 16;
					a[A + 3 >> 0] = p >> 24;
					k = k + 4 | 0;
					a[k >> 0] = B;
					a[k + 1 >> 0] = B >> 8;
					a[k + 2 >> 0] = B >> 16;
					a[k + 3 >> 0] = B >> 24;
					k = l + 8 | 0
				}
				i = f + k | 0;
				h = f + (h + 8) | 0;
				if (o >>> 0 <= u >>> 0) {
					f = h;
					h = i;
					while (1) {
						A = h;
						n = A;
						n = d[n >> 0] | d[n + 1 >> 0] << 8 | d[n + 2 >> 0] << 16 | d[n + 3 >> 0] << 24;
						A = A + 4 | 0;
						A = d[A >> 0] | d[A + 1 >> 0] << 8 | d[A + 2 >> 0] << 16 | d[A + 3 >> 0] << 24;
						B = f;
						p = B;
						a[p >> 0] = n;
						a[p + 1 >> 0] = n >> 8;
						a[p + 2 >> 0] = n >> 16;
						a[p + 3 >> 0] = n >> 24;
						B = B + 4 | 0;
						a[B >> 0] = A;
						a[B + 1 >> 0] = A >> 8;
						a[B + 2 >> 0] = A >> 16;
						a[B + 3 >> 0] = A >> 24;
						f = f + 8 | 0;
						if (f >>> 0 < o >>> 0)
							h = h + 8 | 0;
						else {
							f = o;
							continue a
						}
					}
				}
				if (o >>> 0 > r >>> 0)
					break;
				if (h >>> 0 < w >>> 0) {
					j = h;
					while (1) {
						A = i;
						n = A;
						n = d[n >> 0] | d[n + 1 >> 0] << 8 | d[n + 2 >> 0] << 16 | d[n + 3 >> 0] << 24;
						A = A + 4 | 0;
						A = d[A >> 0] | d[A + 1 >> 0] << 8 | d[A + 2 >> 0] << 16 | d[A + 3 >> 0] << 24;
						B = j;
						p = B;
						a[p >> 0] = n;
						a[p + 1 >> 0] = n >> 8;
						a[p + 2 >> 0] = n >> 16;
						a[p + 3 >> 0] = n >> 24;
						B = B + 4 | 0;
						a[B >> 0] = A;
						a[B + 1 >> 0] = A >> 8;
						a[B + 2 >> 0] = A >> 16;
						a[B + 3 >> 0] = A >> 24;
						j = j + 8 | 0;
						if (j >>> 0 >= w >>> 0)
							break;
						else
							i = i + 8 | 0
					}
					f = f + (s - h + k) | 0;
					h = w
				} else
					f = i;
				if (h >>> 0 < o >>> 0)
					i = f;
				else {
					f = o;
					continue
				}
				while (1) {
					f = h + 1 | 0;
					a[h >> 0] = a[i >> 0] | 0;
					if ((f | 0) == (o | 0)) {
						f = o;
						continue a
					} else {
						i = i + 1 | 0;
						h = f
					}
				}
			}
			if ((z | 0) == 11)
				if (!(j >>> 0 > y >>> 0 | (i | 0) != (x | 0))) {
					js(f | 0, g | 0, h | 0) | 0;
					B = j - e | 0;
					return B | 0
				}
			B = b + -1 - g | 0;
			return B | 0
		}
		function eg(b, d) {
			b = b | 0;
			d = +d;
			var e = 0,
			f = 0.0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			m = i;
			i = i + 16 | 0;
			l = m;
			e = c[b + 48 >> 2] | 0;
			if (a[e + 34 >> 0] | 0) {
				i = m;
				return
			}
			j = c[e + 528 >> 2] | 0;
			k = c[e + 532 >> 2] | 0;
			if ((j | 0) == (k | 0)) {
				i = m;
				return
			}
			if (!(a[b + 52 >> 0] | 0)) {
				e = j;
				d = 0.0
			} else {
				e = b + 32 | 0;
				h[e >> 3] = +h[e >> 3] + d;
				e = j;
				d = 0.0
			}
			do {
				f = +g[(c[e >> 2] | 0) + 40 >> 2];
				d = d +  + (~~+M( + (f * f / 100.0)) | 0);
				e = e + 4 | 0
			} while ((e | 0) != (k | 0));
			f = d;
			g[l >> 2] = f;
			e = b + 60 | 0;
			j = c[e >> 2] | 0;
			if (j >>> 0 < (c[b + 64 >> 2] | 0) >>> 0) {
				g[j >> 2] = f;
				c[e >> 2] = j + 4
			} else
				re(b + 56 | 0, l);
			b = b + 24 | 0;
			f = +h[b >> 3];
			h[b >> 3] = d < f ? f : d;
			i = m;
			return
		}
		function fg(b) {
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0;
			g = b + 52 | 0;
			a[g >> 0] = 0;
			e = c[b + 48 >> 2] | 0;
			d = c[e + 36 >> 2] | 0;
			e = c[e + 40 >> 2] | 0;
			if ((d | 0) == (e | 0))
				return;
			else
				f = 0;
			while (1) {
				f = f + 1 | 0;
				i = d;
				d = d + 16 | 0;
				if (c[i >> 2] & 1)
					break;
				if ((d | 0) == (e | 0)) {
					h = 8;
					break
				}
			}
			if ((h | 0) == 8)
				return;
			if (!f)
				return;
			a[g >> 0] = 1;
			d = b + 44 | 0;
			e = c[d >> 2] | 0;
			if (!e) {
				c[d >> 2] = f;
				return
			} else {
				c[d >> 2] = (f | 0) < (e | 0) ? f : e;
				return
			}
		}
		function gg(a) {
			a = a | 0;
			var b = 0,
			d = 0.0,
			e = 0.0,
			f = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0.0;
			r = i;
			i = i + 16 | 0;
			q = r + 4 | 0;
			p = r;
			m = c[906] | 0;
			if ((c[m >> 2] | 0) == -1) {
				i = r;
				return
			}
			Tb(m, q, p);
			$b(m, 0.0, 0.0,  + (c[q >> 2] | 0),  + (c[p >> 2] | 0));
			n = a + 60 | 0;
			f = c[n >> 2] | 0;
			o = a + 56 | 0;
			b = c[o >> 2] | 0;
			if (f - b >> 2 >>> 0 < 2) {
				i = r;
				return
			}
			if ((b | 0) == (f | 0))
				d = 200.0;
			else {
				d = 200.0;
				do {
					e = +g[b >> 2];
					d = e < d ? d : e;
					b = b + 4 | 0
				} while ((b | 0) != (f | 0))
			}
			jc(m, 3.0);
			rc(m, 1);
			sc(m, 0);
			f = a + 48 | 0;
			cc(m, (c[f >> 2] | 0) + 584 | 0);
			bc(m, (c[f >> 2] | 0) + 584 | 0);
			Zb(m);
			e =  + (c[p >> 2] | 0);
			ec(m, 0.0, e - +g[c[o >> 2] >> 2] / d * (e + -10.0) + 10.0);
			f = c[n >> 2] | 0;
			a = c[o >> 2] | 0;
			b = f - a | 0;
			if ((b | 0) > 4) {
				h = c[q >> 2] | 0;
				b = b >> 2;
				l = 1;
				do {
					k = (_(h, l) | 0) / (b + -1 | 0) | 0;
					h = f - a >> 2;
					b = 0;
					j = -20;
					e = 0.0;
					do {
						f = j + l | 0;
						if ((f | 0) > -1 & (f | 0) < (h | 0)) {
							b = b + 1 | 0;
							e = e + +g[a + (f << 2) >> 2]
						}
						j = j + 1 | 0
					} while ((j | 0) != 21);
					s =  + (c[p >> 2] | 0);
					fc(m,  + (k | 0), s - e /  + (b | 0) / d * (s + -10.0) + 10.0);
					f = c[n >> 2] | 0;
					a = c[o >> 2] | 0;
					b = f - a >> 2;
					h = c[q >> 2] | 0;
					k = (b >>> 0) / (h >>> 0) | 0;
					l = ((k | 0) < 1 ? 1 : k) + l | 0
				} while ((l | 0) < (b | 0))
			}
			Xb(m);
			dc(m, .5);
			fc(m,  + (c[q >> 2] | 0),  + (c[p >> 2] | 0));
			fc(m, 0.0,  + (c[p >> 2] | 0));
			Wb(m);
			dc(m, 1.0);
			i = r;
			return
		}
		function hg() {
			c[906] = uc(18662) | 0;
			return
		}
		function ig(b, e, f) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0;
			o = i;
			i = i + 352 | 0;
			n = o;
			m = o + 24 | 0;
			c[n >> 2] = c[907];
			c[n + 4 >> 2] = c[908];
			c[n + 8 >> 2] = c[909];
			c[n + 12 >> 2] = c[910];
			c[n + 16 >> 2] = c[911];
			k = e + -64 | 0;
			if ((e | 0) < 64) {
				l = m;
				g = 0
			} else {
				g = 0;
				do {
					h = g;
					j = 0;
					while (1) {
						c[m + (j << 2) >> 2] = (d[b + (h | 2) >> 0] | 0) << 8 | (d[b + (h | 3) >> 0] | 0) | (d[b + (h | 1) >> 0] | 0) << 16 | (d[b + h >> 0] | 0) << 24;
						j = j + 1 | 0;
						if ((j | 0) == 16)
							break;
						else
							h = h + 4 | 0
					}
					g = g + 64 | 0;
					jg(n, m)
				} while ((g | 0) <= (k | 0));
				l = m
			}
			k = e - g | 0;
			h = m;
			j = h + 64 | 0;
			do {
				c[h >> 2] = 0;
				h = h + 4 | 0
			} while ((h | 0) < (j | 0));
			if ((k | 0) > 0) {
				h = 0;
				do {
					j = m + (h >> 2 << 2) | 0;
					c[j >> 2] = (d[b + (h + g) >> 0] | 0) << (h << 3 & 24^24) | c[j >> 2];
					h = h + 1 | 0
				} while ((h | 0) != (k | 0));
				g = k
			} else
				g = 0;
			b = m + (g >> 2 << 2) | 0;
			c[b >> 2] = c[b >> 2] | 128 << (g << 3 & 24^24);
			if ((k | 0) > 55) {
				jg(n, l);
				h = m;
				j = h + 64 | 0;
				do {
					c[h >> 2] = 0;
					h = h + 4 | 0
				} while ((h | 0) < (j | 0))
			}
			c[m + 60 >> 2] = e << 3;
			jg(n, l);
			g = 19;
			h = 20;
			while (1) {
				a[f + g >> 0] = (c[n + (g >> 2 << 2) >> 2] | 0) >>> (0 - h << 3 & 24);
				if ((g | 0) > 0) {
					h = g;
					g = g + -1 | 0
				} else
					break
			}
			i = o;
			return
		}
		function jg(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0;
			k = a + 4 | 0;
			l = a + 8 | 0;
			m = a + 12 | 0;
			n = a + 16 | 0;
			h = c[a >> 2] | 0;
			g = c[k >> 2] | 0;
			e = c[l >> 2] | 0;
			d = c[m >> 2] | 0;
			f = c[n >> 2] | 0;
			i = 0;
			while (1) {
				f = f + 1518500249 + (g & e | d & ~g) + (h >>> 27 | h << 5) + (c[b + (i << 2) >> 2] | 0) | 0;
				g = g >>> 2 | g << 30;
				i = i + 1 | 0;
				if ((i | 0) == 16)
					break;
				else {
					o = e;
					j = h;
					h = f;
					e = g;
					f = d;
					d = o;
					g = j
				}
			}
			j = c[b + 32 >> 2]^c[b + 52 >> 2]^c[b + 8 >> 2]^c[b >> 2];
			j = j >>> 31 | j << 1;
			c[b + 64 >> 2] = j;
			j = d + 1518500249 + (h & g | e & ~h) + (f >>> 27 | f << 5) + j | 0;
			o = h >>> 2 | h << 30;
			i = c[b + 36 >> 2]^c[b + 56 >> 2]^c[b + 12 >> 2]^c[b + 4 >> 2];
			i = i >>> 31 | i << 1;
			c[b + 68 >> 2] = i;
			i = e + 1518500249 + (f & o | g & ~f) + (j >>> 27 | j << 5) + i | 0;
			d = f >>> 2 | f << 30;
			h = c[b + 40 >> 2]^c[b + 60 >> 2]^c[b + 16 >> 2]^c[b + 8 >> 2];
			h = h >>> 31 | h << 1;
			c[b + 72 >> 2] = h;
			h = g + 1518500249 + (j & d | o & ~j) + (i >>> 27 | i << 5) + h | 0;
			e = j >>> 2 | j << 30;
			j = c[b + 44 >> 2]^c[b + 64 >> 2]^c[b + 20 >> 2]^c[b + 12 >> 2];
			j = j >>> 31 | j << 1;
			c[b + 76 >> 2] = j;
			j = o + 1518500249 + (i & e | d & ~i) + (h >>> 27 | h << 5) + j | 0;
			g = i >>> 2 | i << 30;
			i = 20;
			while (1) {
				f = c[b + (i + -8 << 2) >> 2]^c[b + (i + -3 << 2) >> 2]^c[b + (i + -14 << 2) >> 2]^c[b + (i + -16 << 2) >> 2];
				f = f >>> 31 | f << 1;
				c[b + (i << 2) >> 2] = f;
				f = d + 1859775393 + (g^e^h) + (j >>> 27 | j << 5) + f | 0;
				d = h >>> 2 | h << 30;
				i = i + 1 | 0;
				if ((i | 0) == 40) {
					i = f;
					h = 40;
					break
				} else {
					o = g;
					h = j;
					j = f;
					g = d;
					d = e;
					e = o
				}
			}
			while (1) {
				f = c[b + (h + -8 << 2) >> 2]^c[b + (h + -3 << 2) >> 2]^c[b + (h + -14 << 2) >> 2]^c[b + (h + -16 << 2) >> 2];
				f = f >>> 31 | f << 1;
				c[b + (h << 2) >> 2] = f;
				f = e + -1894007588 + (j & (d | g) | d & g) + (i >>> 27 | i << 5) + f | 0;
				e = j >>> 2 | j << 30;
				h = h + 1 | 0;
				if ((h | 0) == 60) {
					j = i;
					i = 60;
					break
				} else {
					o = d;
					j = i;
					i = f;
					d = e;
					e = g;
					g = o
				}
			}
			while (1) {
				h = c[b + (i + -8 << 2) >> 2]^c[b + (i + -3 << 2) >> 2]^c[b + (i + -14 << 2) >> 2]^c[b + (i + -16 << 2) >> 2];
				h = h >>> 31 | h << 1;
				c[b + (i << 2) >> 2] = h;
				h = g + -899497514 + (e^d^j) + (f >>> 27 | f << 5) + h | 0;
				g = j >>> 2 | j << 30;
				i = i + 1 | 0;
				if ((i | 0) == 80)
					break;
				else {
					o = e;
					j = f;
					f = h;
					e = g;
					g = d;
					d = o
				}
			}
			c[a >> 2] = (c[a >> 2] | 0) + h;
			c[k >> 2] = (c[k >> 2] | 0) + f;
			c[l >> 2] = (c[l >> 2] | 0) + g;
			c[m >> 2] = (c[m >> 2] | 0) + e;
			c[n >> 2] = (c[n >> 2] | 0) + d;
			return
		}
		function kg(b) {
			b = b | 0;
			if (a[b >> 0] | 0)
				lg(b);
			a[b >> 0] = 1;
			return
		}
		function lg(b) {
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0;
			a[b >> 0] = 0;
			f = b + 32 | 0;
			g = b + 28 | 0;
			d = c[g >> 2] | 0;
			if ((c[f >> 2] | 0) != (d | 0)) {
				e = 0;
				do {
					d = c[d + (e << 2) >> 2] | 0;
					if ((a[d + 4 >> 0] | 0) != 0 ? +vg(d) >= 1.0 : 0) {
						ng(b, d);
						rg(d);
						d = e + -1 | 0
					} else
						d = e;
					e = d + 1 | 0;
					d = c[g >> 2] | 0
				} while (e >>> 0 < (c[f >> 2] | 0) - d >> 2 >>> 0)
			}
			f = b + 44 | 0;
			g = b + 40 | 0;
			d = c[g >> 2] | 0;
			if ((c[f >> 2] | 0) == (d | 0))
				return;
			else
				e = 0;
			do {
				d = c[d + (e << 2) >> 2] | 0;
				if ((a[d + 4 >> 0] | 0) != 0 ? +vg(d) >= 1.0 : 0) {
					ng(b, d);
					rg(d);
					d = e + -1 | 0
				} else
					d = e;
				e = d + 1 | 0;
				d = c[g >> 2] | 0
			} while (e >>> 0 < (c[f >> 2] | 0) - d >> 2 >>> 0);
			return
		}
		function mg(b) {
			b = b | 0;
			if (!(a[b >> 0] | 0))
				return;
			lg(b);
			return
		}
		function ng(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0;
			d = c[a + 28 >> 2] | 0;
			f = a + 32 | 0;
			g = c[f >> 2] | 0;
			a : do
				if ((d | 0) == (g | 0)) {
					e = d;
					n = 4
				} else
					do {
						if ((c[d >> 2] | 0) == (b | 0)) {
							e = d;
							n = 4;
							break a
						}
						d = d + 4 | 0
					} while ((d | 0) != (g | 0));
			while (0);
			if ((n | 0) == 4 ? (e | 0) != (g | 0) : 0) {
				m = g + -4 | 0;
				l = c[e >> 2] | 0;
				c[e >> 2] = c[m >> 2];
				c[m >> 2] = l;
				c[f >> 2] = (c[f >> 2] | 0) + -4
			}
			d = c[a + 40 >> 2] | 0;
			e = a + 44 | 0;
			f = c[e >> 2] | 0;
			b : do
				if ((d | 0) == (f | 0)) {
					h = d;
					n = 9
				} else
					do {
						if ((c[d >> 2] | 0) == (b | 0)) {
							h = d;
							n = 9;
							break b
						}
						d = d + 4 | 0
					} while ((d | 0) != (f | 0));
			while (0);
			if ((n | 0) == 9 ? (h | 0) != (f | 0) : 0) {
				m = f + -4 | 0;
				l = c[h >> 2] | 0;
				c[h >> 2] = c[m >> 2];
				c[m >> 2] = l;
				c[e >> 2] = (c[e >> 2] | 0) + -4
			}
			m = a + 52 | 0;
			g = c[b >> 2] | 0;
			l = c[a + 56 >> 2] | 0;
			c : do
				if (l) {
					f = l + -1 | 0;
					e = (f & l | 0) == 0;
					if (e)
						h = f & g;
					else
						h = (g >>> 0) % (l >>> 0) | 0;
					d = c[(c[m >> 2] | 0) + (h << 2) >> 2] | 0;
					if (d) {
						if (e)
							while (1) {
								d = c[d >> 2] | 0;
								if (!d)
									break c;
								if ((c[d + 4 >> 2] & f | 0) != (h | 0))
									break c;
								if ((c[d + 8 >> 2] | 0) == (g | 0)) {
									k = d;
									break
								}
							}
						else
							while (1) {
								d = c[d >> 2] | 0;
								if (!d)
									break c;
								if ((((c[d + 4 >> 2] | 0) >>> 0) % (l >>> 0) | 0 | 0) != (h | 0))
									break c;
								if ((c[d + 8 >> 2] | 0) == (g | 0)) {
									k = d;
									break
								}
							}
						if ((c[k + 12 >> 2] | 0) == (b | 0)) {
							d = c[k + 4 >> 2] | 0;
							h = l + -1 | 0;
							i = (h & l | 0) == 0;
							if (i)
								j = h & d;
							else
								j = (d >>> 0) % (l >>> 0) | 0;
							f = (c[m >> 2] | 0) + (j << 2) | 0;
							e = c[f >> 2] | 0;
							while (1) {
								d = c[e >> 2] | 0;
								if ((d | 0) == (k | 0)) {
									g = e;
									break
								} else
									e = d
							}
							if ((g | 0) != (a + 60 | 0)) {
								d = c[g + 4 >> 2] | 0;
								if (i)
									d = d & h;
								else
									d = (d >>> 0) % (l >>> 0) | 0;
								if ((d | 0) == (j | 0))
									f = k;
								else
									n = 35
							} else
								n = 35;
							do
								if ((n | 0) == 35) {
									d = c[k >> 2] | 0;
									if (d) {
										d = c[d + 4 >> 2] | 0;
										if (i)
											d = d & h;
										else
											d = (d >>> 0) % (l >>> 0) | 0;
										if ((d | 0) == (j | 0)) {
											f = k;
											break
										}
									}
									c[f >> 2] = 0;
									f = k
								}
							while (0);
							e = c[f >> 2] | 0;
							d = e;
							if (e) {
								e = c[e + 4 >> 2] | 0;
								if (i)
									e = e & h;
								else
									e = (e >>> 0) % (l >>> 0) | 0;
								if ((e | 0) != (j | 0)) {
									c[(c[m >> 2] | 0) + (e << 2) >> 2] = g;
									d = c[k >> 2] | 0
								}
							}
							c[g >> 2] = d;
							c[f >> 2] = 0;
							n = a + 64 | 0;
							c[n >> 2] = (c[n >> 2] | 0) + -1;
							ih(k)
						}
					}
				}
			while (0);
			f = c[a + 16 >> 2] | 0;
			h = a + 20 | 0;
			g = c[h >> 2] | 0;
			e = (f | 0) == (g | 0);
			d : do
				if (e)
					d = f;
				else {
					d = f;
					do {
						if ((c[d >> 2] | 0) == (b | 0))
							break d;
						d = d + 4 | 0
					} while ((d | 0) != (g | 0));
					return
				}
			while (0);
			if ((d | 0) == (g | 0))
				return;
			e : do
				if (e)
					d = f;
				else {
					d = f;
					while (1) {
						if ((c[d >> 2] | 0) == (b | 0))
							break e;
						d = d + 4 | 0;
						if ((d | 0) == (g | 0)) {
							d = g;
							break
						}
					}
				}
			while (0);
			n = f + ((d - f >> 2) + 1 << 2) | 0;
			e = g - n | 0;
			ls(d | 0, n | 0, e | 0) | 0;
			d = d + (e >> 2 << 2) | 0;
			e = c[h >> 2] | 0;
			if ((e | 0) != (d | 0))
				c[h >> 2] = e + (~((e + -4 - d | 0) >>> 2) << 2);
			g = c[a + 4 >> 2] | 0;
			h = a + 8 | 0;
			f = c[h >> 2] | 0;
			e = c[b >> 2] | 0;
			f : do
				if ((g | 0) == (f | 0))
					d = g;
				else {
					d = g;
					while (1) {
						if ((c[d >> 2] | 0) == (e | 0))
							break f;
						d = d + 4 | 0;
						if ((d | 0) == (f | 0)) {
							d = f;
							break
						}
					}
				}
			while (0);
			b = g + ((d - g >> 2) + 1 << 2) | 0;
			e = f - b | 0;
			ls(d | 0, b | 0, e | 0) | 0;
			d = d + (e >> 2 << 2) | 0;
			e = c[h >> 2] | 0;
			if ((e | 0) == (d | 0))
				return;
			c[h >> 2] = e + (~((e + -4 - d | 0) >>> 2) << 2);
			return
		}
		function og(a) {
			a = a | 0;
			var b = 0,
			d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0;
			e = a + 28 | 0;
			b = c[e >> 2] | 0;
			f = a + 32 | 0;
			d = c[f >> 2] | 0;
			if ((b | 0) != (d | 0))
				do {
					rg(c[b >> 2] | 0);
					b = b + 4 | 0
				} while ((b | 0) != (d | 0));
			g = a + 40 | 0;
			b = c[g >> 2] | 0;
			h = a + 44 | 0;
			d = c[h >> 2] | 0;
			if ((b | 0) != (d | 0))
				do {
					rg(c[b >> 2] | 0);
					b = b + 4 | 0
				} while ((b | 0) != (d | 0));
			b = c[e >> 2] | 0;
			d = c[f >> 2] | 0;
			if ((d | 0) != (b | 0))
				c[f >> 2] = d + (~((d + -4 - b | 0) >>> 2) << 2);
			f = a + 64 | 0;
			if (c[f >> 2] | 0) {
				d = a + 60 | 0;
				b = c[d >> 2] | 0;
				if (b)
					do {
						e = b;
						b = c[b >> 2] | 0;
						ih(e)
					} while ((b | 0) != 0);
				c[d >> 2] = 0;
				b = c[a + 56 >> 2] | 0;
				if (b) {
					d = a + 52 | 0;
					e = 0;
					do {
						c[(c[d >> 2] | 0) + (e << 2) >> 2] = 0;
						e = e + 1 | 0
					} while ((e | 0) != (b | 0))
				}
				c[f >> 2] = 0
			}
			b = c[a + 16 >> 2] | 0;
			d = a + 20 | 0;
			e = c[d >> 2] | 0;
			if ((e | 0) != (b | 0))
				c[d >> 2] = e + (~((e + -4 - b | 0) >>> 2) << 2);
			e = c[a + 4 >> 2] | 0;
			b = a + 8 | 0;
			d = c[b >> 2] | 0;
			if ((d | 0) != (e | 0))
				c[b >> 2] = d + (~((d + -4 - e | 0) >>> 2) << 2);
			b = c[g >> 2] | 0;
			d = c[h >> 2] | 0;
			if ((d | 0) == (b | 0))
				return;
			c[h >> 2] = d + (~((d + -4 - b | 0) >>> 2) << 2);
			return
		}
		function pg(b) {
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			j = 0.0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0.0,
			q = 0.0;
			o = i;
			i = i + 32 | 0;
			k = o;
			j = +g[b + 16 >> 2];
			d = ~~+M(+j);
			if (!(a[b + 224 >> 0] | 0)) {
				p =  + (c[888] | 0) / 1080.0;
				q =  + (c[887] | 0) / 1920.0;
				p = +h[27] * (p < q ? q : p);
				q = +h[21];
				p = q < p ? q : p;
				d = ~~( + (d | 0) * (p > 1.0 ? 1.0 : p));
				e = j <= 20.0 ? 5 : 10
			} else
				e = 30;
			l = (d | 0) < (e | 0) ? e : d;
			m = b + 228 | 0;
			n = b + 232 | 0;
			d = c[n >> 2] | 0;
			f = c[m >> 2] | 0;
			e = f;
			if (((d - e | 0) / 28 | 0) >>> 0 > l >>> 0) {
				do
					d = d + -28 | 0;
				while (((d - e | 0) / 28 | 0) >>> 0 > l >>> 0);
				c[n >> 2] = d
			}
			do
				if ((d | 0) == (f | 0)) {
					c[k >> 2] = c[b >> 2];
					c[k + 4 >> 2] = c[b + 8 >> 2];
					c[k + 8 >> 2] = c[b + 12 >> 2];
					g[k + 12 >> 2] = 0.0;
					g[k + 16 >> 2] = 0.0;
					g[k + 20 >> 2] = j;
					g[k + 24 >> 2] = +Gc() +  - .5;
					d = c[n >> 2] | 0;
					if (d >>> 0 < (c[b + 236 >> 2] | 0) >>> 0) {
						c[d >> 2] = c[k >> 2];
						c[d + 4 >> 2] = c[k + 4 >> 2];
						c[d + 8 >> 2] = c[k + 8 >> 2];
						c[d + 12 >> 2] = c[k + 12 >> 2];
						c[d + 16 >> 2] = c[k + 16 >> 2];
						c[d + 20 >> 2] = c[k + 20 >> 2];
						c[d + 24 >> 2] = c[k + 24 >> 2];
						d = (c[n >> 2] | 0) + 28 | 0;
						c[n >> 2] = d;
						break
					} else {
						Cg(m, k);
						d = c[n >> 2] | 0;
						break
					}
				}
			while (0);
			if (((d - (c[m >> 2] | 0) | 0) / 28 | 0) >>> 0 >= l >>> 0) {
				i = o;
				return
			}
			f = b + 236 | 0;
			do {
				e = d + -28 | 0;
				if ((d | 0) == (c[f >> 2] | 0)) {
					Dg(m, e);
					d = c[n >> 2] | 0
				} else {
					c[d >> 2] = c[e >> 2];
					c[d + 4 >> 2] = c[e + 4 >> 2];
					c[d + 8 >> 2] = c[e + 8 >> 2];
					c[d + 12 >> 2] = c[e + 12 >> 2];
					c[d + 16 >> 2] = c[e + 16 >> 2];
					c[d + 20 >> 2] = c[e + 20 >> 2];
					c[d + 24 >> 2] = c[e + 24 >> 2];
					d = (c[n >> 2] | 0) + 28 | 0;
					c[n >> 2] = d
				}
			} while (((d - (c[m >> 2] | 0) | 0) / 28 | 0) >>> 0 < l >>> 0);
			i = o;
			return
		}
		function qg(b, d, e, f, i) {
			b = b | 0;
			d = +d;
			e = +e;
			f = +f;
			i = i | 0;
			var j = 0,
			k = 0;
			j = c[914] | 0;
			if ((c[913] | 0) == (j | 0)) {
				c[912] = (c[912] | 0) + 1;
				k = gh(240) | 0;
				c[k >> 2] = b;
				a[k + 4 >> 0] = 0;
				g[k + 8 >> 2] = d;
				g[k + 12 >> 2] = e;
				g[k + 16 >> 2] = f;
				g[k + 20 >> 2] = d;
				g[k + 24 >> 2] = e;
				g[k + 28 >> 2] = f;
				g[k + 32 >> 2] = d;
				g[k + 36 >> 2] = e;
				g[k + 40 >> 2] = f;
				g[k + 44 >> 2] = 0.0;
				g[k + 48 >> 2] = 0.0;
				b = k + 56 | 0;
				j = k + 80 | 0;
				c[b >> 2] = 0;
				c[b + 4 >> 2] = 0;
				c[b + 8 >> 2] = 0;
				c[b + 12 >> 2] = 0;
				c[b + 16 >> 2] = 0;
				c[b + 20 >> 2] = 0;
				a[j >> 0] = a[i >> 0] | 0;
				a[j + 1 >> 0] = a[i + 1 >> 0] | 0;
				a[j + 2 >> 0] = a[i + 2 >> 0] | 0;
				j = k + 84 | 0;
				c[j >> 2] = 0;
				c[j + 4 >> 2] = 0;
				c[j + 8 >> 2] = 0;
				c[k + 96 >> 2] = -1;
				j = k + 100 | 0;
				c[j >> 2] = 0;
				c[j + 4 >> 2] = 0;
				c[j + 8 >> 2] = 0;
				c[j + 12 >> 2] = 0;
				c[j + 16 >> 2] = 0;
				h[k + 120 >> 3] = 1.0;
				h[k + 128 >> 3] = .1;
				a[k + 136 >> 0] = -1;
				a[k + 137 >> 0] = -1;
				a[k + 138 >> 0] = -1;
				a[k + 139 >> 0] = 0;
				a[k + 140 >> 0] = 0;
				a[k + 141 >> 0] = 0;
				a[k + 142 >> 0] = 1;
				a[k + 143 >> 0] = 1;
				a[k + 144 >> 0] = 0;
				c[k + 148 >> 2] = 0;
				c[k + 152 >> 2] = 0;
				c[k + 160 >> 2] = -1;
				j = k + 164 | 0;
				c[j >> 2] = 0;
				c[j + 4 >> 2] = 0;
				c[j + 8 >> 2] = 0;
				c[j + 12 >> 2] = 0;
				c[j + 16 >> 2] = 0;
				h[k + 184 >> 3] = 1.0;
				h[k + 192 >> 3] = .1;
				a[k + 200 >> 0] = -1;
				a[k + 201 >> 0] = -1;
				a[k + 202 >> 0] = -1;
				a[k + 203 >> 0] = 0;
				a[k + 204 >> 0] = 0;
				a[k + 205 >> 0] = 0;
				a[k + 206 >> 0] = 1;
				a[k + 207 >> 0] = 1;
				a[k + 208 >> 0] = 0;
				c[k + 212 >> 2] = 0;
				c[k + 216 >> 2] = 0;
				a[k + 224 >> 0] = 0;
				a[k + 225 >> 0] = 0;
				a[k + 226 >> 0] = 1;
				j = k + 227 | 0;
				i = j + 13 | 0;
				do {
					a[j >> 0] = 0;
					j = j + 1 | 0
				} while ((j | 0) < (i | 0));
				pg(k);
				b = k;
				return b | 0
			} else {
				j = j + -4 | 0;
				k = c[j >> 2] | 0;
				c[914] = j;
				c[k >> 2] = b;
				a[k + 4 >> 0] = 0;
				g[k + 8 >> 2] = d;
				g[k + 12 >> 2] = e;
				g[k + 16 >> 2] = f;
				g[k + 20 >> 2] = d;
				g[k + 24 >> 2] = e;
				g[k + 28 >> 2] = f;
				g[k + 32 >> 2] = d;
				g[k + 36 >> 2] = e;
				g[k + 40 >> 2] = f;
				g[k + 44 >> 2] = 0.0;
				g[k + 48 >> 2] = 0.0;
				b = k + 56 | 0;
				j = k + 80 | 0;
				c[b >> 2] = 0;
				c[b + 4 >> 2] = 0;
				c[b + 8 >> 2] = 0;
				c[b + 12 >> 2] = 0;
				c[b + 16 >> 2] = 0;
				c[b + 20 >> 2] = 0;
				a[j >> 0] = a[i >> 0] | 0;
				a[j + 1 >> 0] = a[i + 1 >> 0] | 0;
				a[j + 2 >> 0] = a[i + 2 >> 0] | 0;
				j = k + 84 | 0;
				c[j >> 2] = 0;
				c[j + 4 >> 2] = 0;
				c[j + 8 >> 2] = 0;
				c[k + 96 >> 2] = -1;
				j = k + 100 | 0;
				c[j >> 2] = 0;
				c[j + 4 >> 2] = 0;
				c[j + 8 >> 2] = 0;
				c[j + 12 >> 2] = 0;
				c[j + 16 >> 2] = 0;
				h[k + 120 >> 3] = 1.0;
				h[k + 128 >> 3] = .1;
				a[k + 136 >> 0] = -1;
				a[k + 137 >> 0] = -1;
				a[k + 138 >> 0] = -1;
				a[k + 139 >> 0] = 0;
				a[k + 140 >> 0] = 0;
				a[k + 141 >> 0] = 0;
				a[k + 142 >> 0] = 1;
				a[k + 143 >> 0] = 1;
				a[k + 144 >> 0] = 0;
				c[k + 148 >> 2] = 0;
				c[k + 152 >> 2] = 0;
				c[k + 160 >> 2] = -1;
				j = k + 164 | 0;
				c[j >> 2] = 0;
				c[j + 4 >> 2] = 0;
				c[j + 8 >> 2] = 0;
				c[j + 12 >> 2] = 0;
				c[j + 16 >> 2] = 0;
				h[k + 184 >> 3] = 1.0;
				h[k + 192 >> 3] = .1;
				a[k + 200 >> 0] = -1;
				a[k + 201 >> 0] = -1;
				a[k + 202 >> 0] = -1;
				a[k + 203 >> 0] = 0;
				a[k + 204 >> 0] = 0;
				a[k + 205 >> 0] = 0;
				a[k + 206 >> 0] = 1;
				a[k + 207 >> 0] = 1;
				a[k + 208 >> 0] = 0;
				c[k + 212 >> 2] = 0;
				c[k + 216 >> 2] = 0;
				a[k + 224 >> 0] = 0;
				a[k + 225 >> 0] = 0;
				a[k + 226 >> 0] = 1;
				j = k + 227 | 0;
				i = j + 13 | 0;
				do {
					a[j >> 0] = 0;
					j = j + 1 | 0
				} while ((j | 0) < (i | 0));
				pg(k);
				b = k;
				return b | 0
			}
			return 0
		}
		function rg(a) {
			a = a | 0;
			var b = 0,
			d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			j = 0;
			j = i;
			i = i + 16 | 0;
			g = j;
			c[g >> 2] = a;
			h = a;
			if ((c[914] | 0) - (c[913] | 0) >> 2 >>> 0 > 500) {
				c[912] = (c[912] | 0) + -1;
				if (!a) {
					i = j;
					return
				}
				b = c[a + 228 >> 2] | 0;
				d = b;
				if (b) {
					e = a + 232 | 0;
					f = c[e >> 2] | 0;
					if ((f | 0) != (b | 0))
						c[e >> 2] = f + (~(((f + -28 - d | 0) >>> 0) / 28 | 0) * 28 | 0);
					ih(b)
				}
				qj(a + 164 | 0);
				Rb(a + 160 | 0);
				qj(a + 100 | 0);
				Rb(a + 96 | 0);
				qj(a + 84 | 0);
				ih(a);
				i = j;
				return
			}
			b = c[a + 228 >> 2] | 0;
			d = b;
			if (b) {
				e = a + 232 | 0;
				f = c[e >> 2] | 0;
				if ((f | 0) != (b | 0))
					c[e >> 2] = f + (~(((f + -28 - d | 0) >>> 0) / 28 | 0) * 28 | 0);
				ih(b)
			}
			qj(a + 164 | 0);
			Rb(a + 160 | 0);
			qj(a + 100 | 0);
			Rb(a + 96 | 0);
			qj(a + 84 | 0);
			b = c[914] | 0;
			if ((b | 0) == (c[915] | 0)) {
				fd(3652, g);
				i = j;
				return
			} else {
				c[b >> 2] = h;
				c[914] = (c[914] | 0) + 4;
				i = j;
				return
			}
		}
		function sg(b) {
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0;
			f = i;
			i = i + 16 | 0;
			e = f;
			d = b + 4 | 0;
			if (a[d >> 0] | 0) {
				i = f;
				return
			}
			a[d >> 0] = 1;
			c[e >> 2] = b;
			ng(536, b);
			d = c[145] | 0;
			if ((d | 0) == (c[146] | 0))
				fd(576, e);
			else {
				c[d >> 2] = b;
				c[145] = (c[145] | 0) + 4
			}
			i = f;
			return
		}
		function tg(b) {
			b = b | 0;
			var d = 0.0,
			e = 0,
			f = 0.0,
			j = 0.0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0.0,
			q = 0.0,
			r = 0,
			s = 0.0,
			t = 0,
			u = 0,
			v = 0,
			w = 0.0,
			x = 0,
			y = 0,
			z = 0.0,
			A = 0,
			B = 0,
			C = 0,
			D = 0,
			E = 0,
			F = 0,
			G = 0.0;
			F = i;
			i = i + 48 | 0;
			C = F + 40 | 0;
			D = F + 32 | 0;
			E = F + 24 | 0;
			y = F;
			A = b + 228 | 0;
			e = c[A >> 2] | 0;
			o = (c[b + 232 >> 2] | 0) - e | 0;
			B = (o | 0) / 28 | 0;
			o = (o | 0) > 0;
			if (o) {
				m = B + -1 | 0;
				n = b + 225 | 0;
				l = 0;
				do {
					f = +g[e + (((m + l | 0) % (B | 0) | 0) * 28 | 0) + 24 >> 2];
					k = l;
					l = l + 1 | 0;
					j = +g[e + (((l | 0) % (B | 0) | 0) * 28 | 0) + 24 >> 2];
					d = +Gc() +  - .5;
					e = c[A >> 2] | 0;
					k = e + (k * 28 | 0) + 24 | 0;
					d = (+g[k >> 2] + d * ((a[n >> 0] | 0) != 0 ? 3.0 : 1.0)) * .7;
					if (!(d > 10.0)) {
						if (d < -10.0)
							d = -10.0
					} else
						d = 10.0;
					g[k >> 2] = (f + j + d * 8.0) / 10.0
				} while ((l | 0) < (B | 0))
			}
			x = b + 224 | 0;
			if (!(a[x >> 0] | 0))
				w = +kb(57,  + ( + ((c[b >> 2] | 0) >>> 0) / 1.0e3 + +h[89] / 1.0e4), 6.283185307179586);
			else
				w = 0.0;
			if (!o) {
				z = 0.0;
				b = b + 44 | 0;
				g[b >> 2] = z;
				i = F;
				return
			}
			m = B + -1 | 0;
			n = b + 16 | 0;
			o = y + 16 | 0;
			r = b + 225 | 0;
			s = 6.283185307179586 /  + (B | 0);
			t = b + 8 | 0;
			u = b + 12 | 0;
			e = c[A >> 2] | 0;
			f = +g[n >> 2];
			v = 0;
			d = 0.0;
			while (1) {
				j = +g[e + (v * 28 | 0) + 20 >> 2];
				p = +g[e + (((m + v | 0) % (B | 0) | 0) * 28 | 0) + 20 >> 2];
				l = v;
				v = v + 1 | 0;
				q = +g[e + (((v | 0) % (B | 0) | 0) * 28 | 0) + 20 >> 2];
				do
					if (!(f <= 20.0) ? f * +h[21] > 20.0 : 0) {
						h[C >> 3] = 5.0;
						G = +g[e + (l * 28 | 0) + 4 >> 2];
						h[D >> 3] = G;
						f = +g[e + (l * 28 | 0) + 8 >> 2];
						h[E >> 3] = f;
						e = gh(20) | 0;
						c[e >> 2] = 3672;
						c[e + 4 >> 2] = b;
						c[e + 8 >> 2] = D;
						c[e + 12 >> 2] = E;
						c[e + 16 >> 2] = C;
						c[o >> 2] = e;
						e = Eg(228, G, f, 10.0, 10.0, y) | 0;
						k = c[o >> 2] | 0;
						if ((k | 0) != (y | 0)) {
							if (k)
								sb[c[(c[k >> 2] | 0) + 20 >> 2] & 255](k)
						} else
							sb[c[(c[y >> 2] | 0) + 16 >> 2] & 255](y);
						if ((!e ? (z = +h[D >> 3], !(z < +h[15])) : 0) ? (G = +h[E >> 3], !(G < +h[16] | z > +h[17] | G > +h[18])) : 0) {
							e = c[A >> 2] | 0;
							break
						}
						e = c[A >> 2] | 0;
						k = e + (l * 28 | 0) + 24 | 0;
						f = +g[k >> 2];
						if (f > 0.0) {
							g[k >> 2] = 0.0;
							f = 0.0
						}
						g[k >> 2] = f + -1.0
					}
				while (0);
				f = j + +g[e + (l * 28 | 0) + 24 >> 2];
				f = f < 0.0 ? 0.0 : f;
				if (!(a[r >> 0] | 0)) {
					G = +g[n >> 2];
					j = G;
					f = (f * 12.0 + G) / 13.0
				} else {
					G = +g[n >> 2];
					j = G;
					f = (f * 19.0 + G) / 20.0
				}
				G = (p + q + f * 8.0) / 10.0;
				g[e + (l * 28 | 0) + 20 >> 2] = G;
				G = (l & 1 | 0) == 0 & (a[x >> 0] | 0) != 0 ? G + 5.0 : G;
				p = w +  + (l | 0) * s;
				f = +Q(+p);
				p = +R(+p);
				g[e + (l * 28 | 0) + 12 >> 2] = f;
				g[e + (l * 28 | 0) + 16 >> 2] = p;
				q = G;
				g[e + (l * 28 | 0) + 4 >> 2] = f * q + +g[t >> 2];
				g[e + (l * 28 | 0) + 8 >> 2] = p * q + +g[u >> 2];
				d = d < G ? G : d;
				if ((v | 0) >= (B | 0))
					break;
				else
					f = j
			}
			b = b + 44 | 0;
			g[b >> 2] = d;
			i = F;
			return
		}
		function ug(a) {
			a = a | 0;
			var b = 0.0,
			d = 0.0,
			e = 0.0,
			f = 0.0,
			i = 0.0,
			j = 0.0,
			k = 0.0;
			f = +g[a + 8 >> 2];
			j = +g[a + 16 >> 2];
			k = +h[19];
			b = +h[21];
			i =  + ((c[887] | 0) / 2 | 0 | 0) / b;
			if (f + j + 40.0 < k - i) {
				a = 0;
				return a | 0
			}
			d = +g[a + 12 >> 2];
			e = +h[20];
			b =  + ((c[888] | 0) / 2 | 0 | 0) / b;
			if (j + d + 40.0 < e - b) {
				a = 0;
				return a | 0
			}
			if (f - j + -40.0 > k + i) {
				a = 0;
				return a | 0
			}
			a = !(d - j + -40.0 > e + b);
			return a | 0
		}
		function vg(a) {
			a = a | 0;
			var b = 0.0;
			b = (+h[89] - +h[a + 64 >> 3]) / 100.0;
			return  + (b < 0.0 ? 0.0 : b > 1.0 ? 1.0 : b)
		}
		function wg(a) {
			a = a | 0;
			var b = 0.0,
			c = 0.0,
			d = 0,
			e = 0.0;
			e = (+h[89] - +h[a + 64 >> 3]) / 100.0;
			e = e < 0.0 ? 0.0 : e > 1.0 ? 1.0 : e;
			c = +g[a + 20 >> 2];
			g[a + 8 >> 2] = c + e * (+g[a + 32 >> 2] - c);
			c = +g[a + 24 >> 2];
			g[a + 12 >> 2] = c + e * (+g[a + 36 >> 2] - c);
			c = +g[a + 40 >> 2];
			b = +g[a + 28 >> 2];
			b = b + e * (c - b);
			d = +N( + (b - c)) < .01;
			g[a + 16 >> 2] = d ? c : b;
			return
		}
		function xg(b) {
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			i = 0.0,
			j = 0.0,
			k = 0.0,
			l = 0.0,
			m = 0,
			n = 0,
			o = 0.0,
			p = 0.0;
			f = c[b + 232 >> 2] | 0;
			m = c[b + 228 >> 2] | 0;
			n = (f - m | 0) / 28 | 0;
			if (n >>> 0 < 6) {
				m = 1;
				n = b + 226 | 0;
				m = m & 1;
				a[n >> 0] = m;
				return
			}
			if ((a[b + 224 >> 0] | 0) == 0 ? (a[b + 225 >> 0] | 0) == 0 : 0)
				e = +h[21] < .4;
			else
				e = 0;
			d = b + 226 | 0;
			if (e | (a[d >> 0] | 0) == 0) {
				m = e;
				n = d;
				m = m & 1;
				a[n >> 0] = m;
				return
			}
			if ((f | 0) == (m | 0)) {
				m = 0;
				n = d;
				m = m & 1;
				a[n >> 0] = m;
				return
			}
			j =  + (n >>> 0);
			k = +g[b + 16 >> 2];
			l = +g[b + 8 >> 2];
			i = +g[b + 12 >> 2];
			e = 0;
			do {
				o =  + (e >>> 0) * 6.283185307179586 / j;
				p = +Q(+o);
				g[m + (e * 28 | 0) + 12 >> 2] = p;
				o = +R(+o);
				g[m + (e * 28 | 0) + 16 >> 2] = o;
				g[m + (e * 28 | 0) + 20 >> 2] = k;
				g[m + (e * 28 | 0) + 4 >> 2] = l + k * p;
				g[m + (e * 28 | 0) + 8 >> 2] = i + o * k;
				g[m + (e * 28 | 0) + 24 >> 2] = 0.0;
				e = e + 1 | 0
			} while (e >>> 0 < n >>> 0);
			e = 0;
			n = e & 1;
			a[d >> 0] = n;
			return
		}
		function yg(b, e) {
			b = b | 0;
			e = e | 0;
			var f = 0,
			j = 0,
			k = 0,
			l = 0.0,
			m = 0.0,
			n = 0,
			o = 0.0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0;
			y = i;
			i = i + 16 | 0;
			t = y + 3 | 0;
			q = y;
			j = b + 72 | 0;
			c[j >> 2] = (c[j >> 2] | 0) + 1;
			j = b + 64 | 0;
			l = (+h[89] - +h[j >> 3]) / 100.0;
			l = l < 0.0 ? 0.0 : l > 1.0 ? 1.0 : l;
			m = +g[b + 20 >> 2];
			w = b + 8 | 0;
			g[w >> 2] = m + l * (+g[b + 32 >> 2] - m);
			m = +g[b + 24 >> 2];
			x = b + 12 | 0;
			g[x >> 2] = m + l * (+g[b + 36 >> 2] - m);
			m = +g[b + 40 >> 2];
			o = +g[b + 28 >> 2];
			o = o + l * (m - o);
			f = b + 16 | 0;
			u = +N( + (o - m)) < .01;
			g[f >> 2] = u ? m : o;
			u = (a[b + 226 >> 0] | 0) != 0;
			if ((a[18701] | 0) != 0 ? (a[624] | a[b + 225 >> 0]) << 24 >> 24 == 0 : 0)
				v = c[b + 76 >> 2] | 0;
			else
				v = 0;
			Ub(e);
			l = +h[89];
			h[b + 56 >> 3] = l;
			if (a[b + 4 >> 0] | 0) {
				o = (l - +h[j >> 3]) / 100.0;
				dc(e, o < 0.0 ? 1.0 : o > 1.0 ? 0.0 : 1.0 - o)
			}
			jc(e, 10.0);
			rc(e, 1);
			s = b + 224 | 0;
			sc(e, (a[s >> 0] | 0) != 0 ? 2 : 0);
			if (!(a[18699] | 0)) {
				if ((v | 0) != 0 ? (c[v + 12 >> 2] & 2 | 0) != 0 : 0) {
					ls(t | 0, v + 20 | 0, 3) | 0;
					j = t
				} else {
					j = b + 80 | 0;
					a[t >> 0] = a[j >> 0] | 0;
					a[t + 1 >> 0] = a[j + 1 >> 0] | 0;
					a[t + 2 >> 0] = a[j + 2 >> 0] | 0;
					j = t
				}
				p = ~~( + (d[t + 1 >> 0] | 0) * .9) & 255;
				r = ~~( + (d[t + 2 >> 0] | 0) * .9) & 255;
				a[q >> 0] = ~~( + (d[j >> 0] | 0) * .9);
				a[q + 1 >> 0] = p;
				a[q + 2 >> 0] = r
			} else {
				a[t >> 0] = -1;
				a[t + 1 >> 0] = -1;
				a[t + 2 >> 0] = -1;
				a[q >> 0] = -86;
				a[q + 1 >> 0] = -86;
				a[q + 2 >> 0] = -86
			}
			do
				if (u) {
					s = !(+g[f >> 2] <= 20.0);
					Zb(e);
					gc(e, +g[w >> 2], +g[x >> 2], +g[f >> 2] + 5.0, 0.0, 6.283185307179586, 0);
					_b(e);
					if (s) {
						bc(e, q);
						Wb(e);
						Zb(e);
						gc(e, +g[w >> 2], +g[x >> 2], +g[f >> 2] - ((v | 0) != 0 ? 0.0 : 5.0), 0.0, 6.283185307179586, 0);
						_b(e);
						bc(e, t);
						Wb(e);
						break
					} else {
						bc(e, t);
						Wb(e);
						break
					}
				} else {
					Zb(e);
					p = b + 232 | 0;
					r = b + 228 | 0;
					j = c[r >> 2] | 0;
					k = (c[p >> 2] | 0) - j | 0;
					n = (k | 0) / 28 | 0;
					a : do
						if ((k | 0) >= 0) {
							k = 0;
							while (1) {
								z = (k | 0) % (n | 0) | 0;
								l = +g[j + (z * 28 | 0) + 20 >> 2] + 5.0;
								l = (k & 1 | 0) == 0 & (a[s >> 0] | 0) != 0 ? l + 5.0 : l;
								m = +g[w >> 2] + +g[j + (z * 28 | 0) + 12 >> 2] * l;
								l = +g[j + (z * 28 | 0) + 16 >> 2] * l + +g[x >> 2];
								if (!k)
									ec(e, m, l);
								else
									fc(e, m, l);
								if ((k | 0) >= (n | 0))
									break a;
								j = c[r >> 2] | 0;
								k = k + 1 | 0
							}
						}
					while (0);
					_b(e);
					bc(e, +g[f >> 2] <= 20.0 & (a[18699] | 0) == 0 ? t : q);
					Wb(e);
					if (!(+g[f >> 2] <= 20.0)) {
						Zb(e);
						j = c[r >> 2] | 0;
						z = (c[p >> 2] | 0) - j | 0;
						n = (z | 0) / 28 | 0;
						b : do
							if ((z | 0) >= 0) {
								o = (v | 0) != 0 ? 0.0 : 5.0;
								k = 0;
								while (1) {
									z = (k | 0) % (n | 0) | 0;
									l = +g[j + (z * 28 | 0) + 20 >> 2] - o;
									l = (k & 1 | 0) == 0 & (a[s >> 0] | 0) != 0 ? l + 5.0 : l;
									m = +g[w >> 2] + +g[j + (z * 28 | 0) + 12 >> 2] * l;
									l = +g[x >> 2] + +g[j + (z * 28 | 0) + 16 >> 2] * l;
									if (!k)
										ec(e, m, l);
									else
										fc(e, m, l);
									if ((k | 0) >= (n | 0))
										break b;
									j = c[r >> 2] | 0;
									k = k + 1 | 0
								}
							}
						while (0);
						_b(e);
						bc(e, t);
						Wb(e)
					}
				}
			while (0);
			do
				if (v) {
					n = v + 16 | 0;
					j = c[n >> 2] | 0;
					if (!j) {
						j = gh(16) | 0;
						if (!(a[v >> 0] & 1))
							k = v + 1 | 0;
						else
							k = c[v + 8 >> 2] | 0;
						wc(j, k);
						c[n >> 2] = j
					}
					k = j + 4 | 0;
					if ((a[k >> 0] | 0) == 0 ? (xc(j), (a[k >> 0] | 0) == 0) : 0)
						break;
					Ub(e);
					Yb(e);
					if (!u) {
						z = b + 44 | 0;
						f = +g[f >> 2] < +g[z >> 2] ? z : f
					}
					l = +g[f >> 2];
					f = c[n >> 2] | 0;
					if (!f) {
						f = gh(16) | 0;
						if (!(a[v >> 0] & 1))
							j = v + 1 | 0;
						else
							j = c[v + 8 >> 2] | 0;
						wc(f, j);
						c[n >> 2] = f
					}
					o = l * 2.0 + 10.0;
					mc(e, f, +g[w >> 2] - l + -5.0, +g[x >> 2] - l + -5.0, o, o);
					Vb(e)
				}
			while (0);
			if ((a[b + 227 >> 0] | 0) == 0 ? ((((c[b >> 2] | 0) + (c[25] | 0) | 0) >>> 0) % 10 | 0 | 0) != 0 : 0) {
				Vb(e);
				i = y;
				return
			}
			zg(b, e);
			Vb(e);
			i = y;
			return
		}
		function zg(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			j = 0.0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0.0,
			t = 0,
			u = 0,
			v = 0;
			v = i;
			i = i + 48 | 0;
			q = v;
			r = v + 16 | 0;
			t = v + 4 | 0;
			a[b + 227 >> 0] = 1;
			p = b + 225 | 0;
			if ((a[18701] | 0) != 0 ? (a[624] | a[p >> 0]) << 24 >> 24 == 0 : 0)
				l = c[b + 76 >> 2] | 0;
			else
				l = 0;
			f = c[b >> 2] | 0;
			e = c[135] | 0;
			k = c[136] | 0;
			a : do
				if ((e | 0) != (k | 0))
					while (1) {
						if ((c[e >> 2] | 0) == (f | 0))
							break a;
						e = e + 4 | 0;
						if ((e | 0) == (k | 0)) {
							e = k;
							break
						}
					}
			while (0);
			n = (e | 0) != (k | 0);
			m = ~~+g[b + 12 >> 2];
			s =  + (c[888] | 0) / 1080.0;
			j =  + (c[887] | 0) / 1920.0;
			s = +Z( + (+h[27] * (s < j ? j : s) * 10.0)) / 10.0;
			g[b + 48 >> 2] = s;
			do
				if (n | (a[18698] | 0) != 0) {
					e = a[b + 84 >> 0] | 0;
					if (!(e & 1))
						e = (e & 255) >>> 1;
					else
						e = c[b + 88 >> 2] | 0;
					if (e) {
						if ((l | 0) != 0 ? (c[l + 12 >> 2] & 1 | 0) != 0 : 0) {
							o = m;
							break
						}
						k = b + 96 | 0;
						e = ~~(+g[b + 16 >> 2] * .3);
						j = (e | 0) < 24 ? 24.0 :  + (e | 0);
						e = b + 112 | 0;
						if (!(+h[e >> 3] == j)) {
							a[b + 143 >> 0] = 1;
							h[e >> 3] = j
						}
						e = b + 120 | 0;
						if (!(+h[e >> 3] == s)) {
							a[b + 143 >> 0] = 1;
							h[e >> 3] = s
						}
						yc(k) | 0;
						e = ~~( + (c[b + 148 >> 2] | 0) / s);
						yc(k) | 0;
						f = ~~( + (c[b + 152 >> 2] | 0) / s);
						if (!d)
							e = (f | 0) / 2 | 0;
						else {
							l = yc(k) | 0;
							o = (f | 0) / 2 | 0;
							lc(d, l, +M( + (+g[b + 8 >> 2] -  + ((e | 0) / 2 | 0 | 0))), +M( + ( + (m - o | 0))),  + (e | 0),  + (f | 0));
							e = o
						}
						o = m + 5 + e | 0
					} else
						o = m
				} else
					o = m;
			while (0);
			if (!(a[18696] | 0)) {
				i = v;
				return
			}
			e = b + 16 | 0;
			if (+g[e >> 2] <= 20.0) {
				i = v;
				return
			}
			if (!n) {
				if ((c[138] | 0) != (c[139] | 0)) {
					i = v;
					return
				}
				if ((a[b + 224 >> 0] | 0) != 0 ? (a[p >> 0] | 0) == 0 : 0) {
					i = v;
					return
				}
			}
			j = +g[b + 40 >> 2];
			c[q >> 2] = ~~+M( + (j * j / 100.0));
			Gi(r, 32, 18693, q) | 0;
			n = b + 160 | 0;
			e = ~~(+g[e >> 2] * .3);
			j = (e | 0) < 24 ? 12.0 :  + ((e | 0) / 2 | 0 | 0);
			e = b + 176 | 0;
			if (!(+h[e >> 3] == j)) {
				a[b + 207 >> 0] = 1;
				h[e >> 3] = j
			}
			oj(t, r, Ti(r) | 0);
			m = b + 164 | 0;
			l = a[t >> 0] | 0;
			k = (l & 1) == 0;
			l = k ? (l & 255) >>> 1 : c[t + 4 >> 2] | 0;
			r = a[m >> 0] | 0;
			e = (r & 1) == 0;
			b : do
				if ((l | 0) == ((e ? (r & 255) >>> 1 : c[b + 168 >> 2] | 0) | 0)) {
					f = k ? t + 1 | 0 : c[t + 8 >> 2] | 0;
					e = e ? m + 1 | 0 : c[b + 172 >> 2] | 0;
					if (!k)
						if (!(Ri(f, e, l) | 0))
							break;
						else {
							u = 35;
							break
						}
					if (l)
						while (1) {
							if ((a[f >> 0] | 0) != (a[e >> 0] | 0)) {
								u = 35;
								break b
							}
							l = l + -1 | 0;
							if (!l)
								break;
							else {
								f = f + 1 | 0;
								e = e + 1 | 0
							}
						}
				} else
					u = 35;
			while (0);
			if ((u | 0) == 35) {
				a[b + 207 >> 0] = 1;
				rj(m, t) | 0
			}
			qj(t);
			e = b + 184 | 0;
			if (!(+h[e >> 3] == s)) {
				a[b + 207 >> 0] = 1;
				h[e >> 3] = s
			}
			yc(n) | 0;
			f = ~~( + (c[b + 212 >> 2] | 0) / s);
			yc(n) | 0;
			e = ~~( + (c[b + 216 >> 2] | 0) / s);
			if (!d) {
				i = v;
				return
			}
			u = yc(n) | 0;
			lc(d, u, +M( + (+g[b + 8 >> 2] -  + ((f | 0) / 2 | 0 | 0))), +M( + ( + (o - ((e | 0) / 2 | 0) | 0))),  + (f | 0),  + (e | 0));
			i = v;
			return
		}
		function Ag(a, b, c, d) {
			a = a | 0;
			b = +b;
			c = +c;
			d = +d;
			var e = 0,
			f = 0.0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0.0,
			n = 0,
			o = 0.0,
			p = 0,
			q = 0.0,
			r = 0.0,
			s = 0,
			t = 0.0;
			f = +h[89];
			e = a + 64 | 0;
			t = (f - +h[e >> 3]) / 100.0;
			t = t < 0.0 ? 0.0 : t > 1.0 ? 1.0 : t;
			k = a + 32 | 0;
			p = a + 20 | 0;
			q = +g[p >> 2];
			q = q + t * (+g[k >> 2] - q);
			g[a + 8 >> 2] = q;
			j = a + 36 | 0;
			n = a + 24 | 0;
			o = +g[n >> 2];
			o = o + t * (+g[j >> 2] - o);
			g[a + 12 >> 2] = o;
			i = a + 40 | 0;
			r = +g[i >> 2];
			l = a + 28 | 0;
			m = +g[l >> 2];
			m = m + t * (r - m);
			s = +N( + (m - r)) < .01;
			m = s ? r : m;
			g[a + 16 >> 2] = m;
			g[p >> 2] = q;
			g[n >> 2] = o;
			g[l >> 2] = m;
			g[k >> 2] = b;
			g[j >> 2] = c;
			g[i >> 2] = d;
			h[e >> 3] = f;
			return
		}
		function Bg() {
			c[913] = 0;
			c[914] = 0;
			c[915] = 0;
			return
		}
		function Cg(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			i = a + 4 | 0;
			j = c[a >> 2] | 0;
			k = j;
			e = (((c[i >> 2] | 0) - k | 0) / 28 | 0) + 1 | 0;
			if (e >>> 0 > 153391689)
				fh(a);
			l = a + 8 | 0;
			f = j;
			d = ((c[l >> 2] | 0) - f | 0) / 28 | 0;
			if (d >>> 0 < 76695844) {
				d = d << 1;
				d = d >>> 0 < e >>> 0 ? e : d;
				f = (c[i >> 2] | 0) - f | 0;
				e = (f | 0) / 28 | 0;
				if (!d) {
					h = 0;
					g = 0;
					d = f
				} else
					m = 6
			} else {
				f = (c[i >> 2] | 0) - f | 0;
				d = 153391689;
				e = (f | 0) / 28 | 0;
				m = 6
			}
			if ((m | 0) == 6) {
				h = d;
				g = gh(d * 28 | 0) | 0;
				d = f
			}
			m = g + (e * 28 | 0) | 0;
			c[m >> 2] = c[b >> 2];
			c[m + 4 >> 2] = c[b + 4 >> 2];
			c[m + 8 >> 2] = c[b + 8 >> 2];
			c[m + 12 >> 2] = c[b + 12 >> 2];
			c[m + 16 >> 2] = c[b + 16 >> 2];
			c[m + 20 >> 2] = c[b + 20 >> 2];
			c[m + 24 >> 2] = c[b + 24 >> 2];
			m = g + ((((d | 0) / -28 | 0) + e | 0) * 28 | 0) | 0;
			js(m | 0, j | 0, d | 0) | 0;
			c[a >> 2] = m;
			c[i >> 2] = g + ((e + 1 | 0) * 28 | 0);
			c[l >> 2] = g + (h * 28 | 0);
			if (!k)
				return;
			ih(k);
			return
		}
		function Dg(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			i = a + 4 | 0;
			j = c[a >> 2] | 0;
			k = j;
			e = (((c[i >> 2] | 0) - k | 0) / 28 | 0) + 1 | 0;
			if (e >>> 0 > 153391689)
				fh(a);
			l = a + 8 | 0;
			f = j;
			d = ((c[l >> 2] | 0) - f | 0) / 28 | 0;
			if (d >>> 0 < 76695844) {
				d = d << 1;
				d = d >>> 0 < e >>> 0 ? e : d;
				f = (c[i >> 2] | 0) - f | 0;
				e = (f | 0) / 28 | 0;
				if (!d) {
					h = 0;
					g = 0;
					d = f
				} else
					m = 6
			} else {
				f = (c[i >> 2] | 0) - f | 0;
				d = 153391689;
				e = (f | 0) / 28 | 0;
				m = 6
			}
			if ((m | 0) == 6) {
				h = d;
				g = gh(d * 28 | 0) | 0;
				d = f
			}
			m = g + (e * 28 | 0) | 0;
			c[m >> 2] = c[b >> 2];
			c[m + 4 >> 2] = c[b + 4 >> 2];
			c[m + 8 >> 2] = c[b + 8 >> 2];
			c[m + 12 >> 2] = c[b + 12 >> 2];
			c[m + 16 >> 2] = c[b + 16 >> 2];
			c[m + 20 >> 2] = c[b + 20 >> 2];
			c[m + 24 >> 2] = c[b + 24 >> 2];
			m = g + ((((d | 0) / -28 | 0) + e | 0) * 28 | 0) | 0;
			js(m | 0, j | 0, d | 0) | 0;
			c[a >> 2] = m;
			c[i >> 2] = g + ((e + 1 | 0) * 28 | 0);
			c[l >> 2] = g + (h * 28 | 0);
			if (!k)
				return;
			ih(k);
			return
		}
		function Eg(a, b, d, e, f, h) {
			a = a | 0;
			b = +b;
			d = +d;
			e = +e;
			f = +f;
			h = h | 0;
			var j = 0,
			k = 0.0,
			l = 0,
			m = 0.0,
			n = 0,
			o = 0.0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0;
			v = i;
			i = i + 16 | 0;
			u = v;
			m = +g[a >> 2];
			k = (b - m) / 50.0;
			if (!(k <= 0.0)) {
				t = ~~k >>> 0;
				j = c[a + 8 >> 2] | 0;
				j = t >>> 0 < j >>> 0 ? t : j + -1 | 0
			} else
				j = 0;
			o = +g[a + 4 >> 2];
			k = (d - o) / 50.0;
			if (!(k <= 0.0)) {
				s = ~~k >>> 0;
				t = c[a + 12 >> 2] | 0;
				t = s >>> 0 < t >>> 0 ? s : t + -1 | 0
			} else
				t = 0;
			k = (b + e - m) / 50.0;
			if (!(k <= 0.0)) {
				r = ~~k >>> 0;
				s = c[a + 8 >> 2] | 0;
				s = r >>> 0 < s >>> 0 ? r : s + -1 | 0
			} else
				s = 0;
			k = (d + f - o) / 50.0;
			if (!(k <= 0.0)) {
				r = ~~k >>> 0;
				q = c[a + 12 >> 2] | 0;
				q = r >>> 0 < q >>> 0 ? r : q + -1 | 0
			} else
				q = 0;
			if (j >>> 0 > s >>> 0) {
				u = 0;
				i = v;
				return u | 0
			}
			r = a + 8 | 0;
			p = a + 16 | 0;
			n = h + 16 | 0;
			if (t >>> 0 > q >>> 0) {
				do
					j = j + 1 | 0;
				while (j >>> 0 <= s >>> 0);
				j = 0;
				i = v;
				return j | 0
			}
			a : while (1) {
				l = t;
				do {
					h = (_(c[r >> 2] | 0, l) | 0) + j | 0;
					w = c[p >> 2] | 0;
					a = c[w + (h * 12 | 0) >> 2] | 0;
					h = c[w + (h * 12 | 0) + 4 >> 2] | 0;
					if ((a | 0) != (h | 0))
						do {
							c[u >> 2] = c[a >> 2];
							w = c[n >> 2] | 0;
							a = a + 4 | 0;
							if (Cb[c[(c[w >> 2] | 0) + 24 >> 2] & 15](w, u) | 0) {
								j = 1;
								a = 18;
								break a
							}
						} while ((a | 0) != (h | 0));
					l = l + 1 | 0
				} while (l >>> 0 <= q >>> 0);
				j = j + 1 | 0;
				if (j >>> 0 > s >>> 0) {
					j = 0;
					a = 18;
					break
				}
			}
			if ((a | 0) == 18) {
				i = v;
				return j | 0
			}
			return 0
		}
		function Fg(a) {
			a = a | 0;
			return
		}
		function Gg(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Hg(a) {
			a = a | 0;
			var b = 0,
			d = 0;
			b = gh(20) | 0;
			d = a + 4 | 0;
			c[b >> 2] = 3672;
			a = b + 4 | 0;
			c[a >> 2] = c[d >> 2];
			c[a + 4 >> 2] = c[d + 4 >> 2];
			c[a + 8 >> 2] = c[d + 8 >> 2];
			c[a + 12 >> 2] = c[d + 12 >> 2];
			return b | 0
		}
		function Ig(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0;
			d = a + 4 | 0;
			c[b >> 2] = 3672;
			a = b + 4 | 0;
			c[a >> 2] = c[d >> 2];
			c[a + 4 >> 2] = c[d + 4 >> 2];
			c[a + 8 >> 2] = c[d + 8 >> 2];
			c[a + 12 >> 2] = c[d + 12 >> 2];
			return
		}
		function Jg(a) {
			a = a | 0;
			return
		}
		function Kg(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Lg(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0.0,
			e = 0.0;
			b = c[b >> 2] | 0;
			if ((c[b >> 2] | 0) != (c[c[a + 4 >> 2] >> 2] | 0) ? (e = +h[c[a + 8 >> 2] >> 3] - +g[b + 4 >> 2], d = +h[c[a + 12 >> 2] >> 3] - +g[b + 8 >> 2], e * e + d * d < 25.0) : 0) {
				a = 1;
				return a | 0
			}
			a = 0;
			return a | 0
		}
		function Mg(b) {
			b = b | 0;
			a[18696] = b & 1;
			return
		}
		function Ng(b) {
			b = b | 0;
			a[18697] = b & 1;
			return
		}
		function Og(b) {
			b = b | 0;
			a[18698] = b & 1;
			return
		}
		function Pg(b) {
			b = b | 0;
			a[18699] = b & 1;
			return
		}
		function Qg(b) {
			b = b | 0;
			a[18701] = b & 1;
			return
		}
		function Rg(b) {
			b = b | 0;
			a[18700] = b & 1;
			return
		}
		function Sg() {
			var d = 0,
			e = 0,
			f = 0,
			i = 0.0;
			if (!(c[7] | 0))
				return;
			d = c[172] | 0;
			e = d;
			if (d) {
				f = c[173] | 0;
				if ((f | 0) != (d | 0))
					c[173] = f + (~((f + -4 - e | 0) >>> 2) << 2);
				ih(d)
			}
			_g(536);
			$g(96);
			ah(24);
			Sc(24, 24);
			Zg(96, 24);
			a[536] = 1;
			d = 540;
			e = d + 64 | 0;
			do {
				c[d >> 2] = 0;
				d = d + 4 | 0
			} while ((d | 0) < (e | 0));
			g[151] = 1.0;
			c[153] = 24;
			c[158] = 0;
			c[159] = 0;
			c[160] = 0;
			c[161] = 0;
			c[162] = 0;
			c[164] = 0;
			c[165] = 0;
			c[166] = 0;
			c[167] = 0;
			c[168] = 0;
			c[169] = 0;
			c[154] = 0;
			c[155] = 0;
			b[312] = 0;
			a[626] = 0;
			c[170] = 24;
			a[684] = 0;
			c[172] = 0;
			c[173] = 0;
			c[174] = 0;
			h[88] = +$a();
			h[89] = 0.0;
			a[728] = 0;
			i = +$a();
			h[89] = i;
			h[90] = i;
			return
		}
		function Tg(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0.0,
			f = 0,
			g = 0.0;
			d = i;
			i = i + 16 | 0;
			g = +$a();
			h[a + 688 >> 3] = g;
			f = a + 696 | 0;
			e = g - +h[f >> 3];
			h[f >> 3] = g;
			bh(c[a + 540 >> 2] | 0, c[a + 544 >> 2] | 0, d);
			Vc(a);
			cf(a + 72 | 0, b);
			kg(a + 512 | 0);
			eg(a + 608 | 0, e);
			i = d;
			return
		}
		function Ug(a) {
			a = a | 0;
			return
		}
		function Vg(b) {
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			i = 0,
			j = 0;
			e = b + 608 | 0;
			f = b + 664 | 0;
			g = c[f >> 2] | 0;
			i = g;
			d = b + 668 | 0;
			if (g) {
				j = c[d >> 2] | 0;
				if ((j | 0) != (g | 0))
					c[d >> 2] = j + (~((j + -4 - i | 0) >>> 2) << 2);
				ih(g)
			}
			j = b + 632 | 0;
			c[e >> 2] = 0;
			c[e + 4 >> 2] = 0;
			c[e + 8 >> 2] = 0;
			c[e + 12 >> 2] = 0;
			c[e + 16 >> 2] = 0;
			c[j >> 2] = 0;
			c[j + 4 >> 2] = 0;
			c[j + 8 >> 2] = 0;
			c[j + 12 >> 2] = 0;
			c[j + 16 >> 2] = 0;
			c[j + 20 >> 2] = 0;
			c[b + 656 >> 2] = b;
			a[b + 660 >> 0] = 0;
			c[f >> 2] = 0;
			c[d >> 2] = 0;
			c[b + 672 >> 2] = 0;
			h[e >> 3] = +h[b + 688 >> 3];
			a[b + 704 >> 0] = 1;
			mb(58);
			return
		}
		function Wg(b) {
			b = b | 0;
			var d = 0,
			e = 0.0;
			rf(b + 72 | 0);
			d = b + 608 | 0;
			gg(d);
			e = +h[b + 688 >> 3];
			h[b + 616 >> 3] = e;
			a[b + 704 >> 0] = 0;
			gb(59, c[b + 624 >> 2] | 0,  + (+h[b + 632 >> 3]),  + (e - +h[d >> 3]),  + (+h[b + 640 >> 3]), c[b + 648 >> 2] | 0, c[b + 652 >> 2] | 0) | 0;
			return
		}
		function Xg(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0;
			e = c[a + 528 >> 2] | 0;
			j = c[a + 532 >> 2] | 0;
			h = (e | 0) == (j | 0);
			a : do
				if (h)
					f = e;
				else {
					f = e;
					do {
						if ((c[f >> 2] | 0) == (b | 0))
							break a;
						f = f + 4 | 0
					} while ((f | 0) != (j | 0));
					return
				}
			while (0);
			if ((f | 0) == (j | 0))
				return;
			b : do
				if (h) {
					i = e;
					k = 8
				} else
					do {
						if ((c[e >> 2] | 0) == (d | 0)) {
							i = e;
							k = 8;
							break b
						}
						e = e + 4 | 0
					} while ((e | 0) != (j | 0));
			while (0);
			if ((k | 0) == 8 ? (i | 0) != (j | 0) : 0)
				return;
			if (!(+g[d + 16 >> 2] <= 20.0)) {
				k = a + 648 | 0;
				c[k >> 2] = (c[k >> 2] | 0) + 1;
				return
			} else {
				k = a + 624 | 0;
				c[k >> 2] = (c[k >> 2] | 0) + 1;
				return
			}
		}
		function Yg() {
			var d = 0,
			e = 0,
			f = 0.0;
			Sc(24, 24);
			Zg(96, 24);
			a[536] = 1;
			d = 540;
			e = d + 64 | 0;
			do {
				c[d >> 2] = 0;
				d = d + 4 | 0
			} while ((d | 0) < (e | 0));
			g[151] = 1.0;
			c[153] = 24;
			c[158] = 0;
			c[159] = 0;
			c[160] = 0;
			c[161] = 0;
			c[162] = 0;
			c[164] = 0;
			c[165] = 0;
			c[166] = 0;
			c[167] = 0;
			c[168] = 0;
			c[169] = 0;
			c[154] = 0;
			c[155] = 0;
			b[312] = 0;
			a[626] = 0;
			c[170] = 24;
			a[684] = 0;
			c[172] = 0;
			c[173] = 0;
			c[174] = 0;
			h[88] = +$a();
			h[89] = 0.0;
			a[728] = 0;
			f = +$a();
			h[89] = f;
			h[90] = f;
			return
		}
		function Zg(d, e) {
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0;
			c[d >> 2] = e;
			c[d + 4 >> 2] = 0;
			c[d + 8 >> 2] = 0;
			c[d + 12 >> 2] = 0;
			a[d + 16 >> 0] = 1;
			a[d + 17 >> 0] = 1;
			e = d + 72 | 0;
			f = d + 24 | 0;
			g = f + 48 | 0;
			do {
				c[f >> 2] = 0;
				f = f + 4 | 0
			} while ((f | 0) < (g | 0));
			h[e >> 3] = 1.0;
			f = d + 80 | 0;
			c[f >> 2] = 0;
			c[f + 4 >> 2] = 0;
			c[f + 8 >> 2] = 0;
			c[f + 12 >> 2] = 0;
			h[d + 96 >> 3] = 1.0;
			h[d + 104 >> 3] = 1.0;
			h[d + 112 >> 3] = 1.0;
			h[d + 120 >> 3] = 1.0;
			c[d + 128 >> 2] = 0;
			f = d + 148 | 0;
			c[d + 164 >> 2] = 0;
			c[d + 168 >> 2] = 0;
			g = d + 172 | 0;
			c[f >> 2] = 0;
			c[f + 4 >> 2] = 0;
			c[f + 8 >> 2] = 0;
			b[f + 12 >> 1] = 0;
			c[g >> 2] = -1;
			Qb(g);
			g = d + 176 | 0;
			c[g >> 2] = -1;
			Qb(g);
			c[d + 184 >> 2] = -1;
			g = d + 188 | 0;
			c[g >> 2] = 0;
			c[g + 4 >> 2] = 0;
			c[g + 8 >> 2] = 0;
			c[g + 12 >> 2] = 0;
			c[g + 16 >> 2] = 0;
			h[d + 208 >> 3] = 1.0;
			h[d + 216 >> 3] = .2;
			a[d + 224 >> 0] = -1;
			a[d + 225 >> 0] = -1;
			a[d + 226 >> 0] = -1;
			a[d + 227 >> 0] = 0;
			a[d + 228 >> 0] = 0;
			a[d + 229 >> 0] = 0;
			a[d + 230 >> 0] = 1;
			a[d + 231 >> 0] = 1;
			a[d + 232 >> 0] = 0;
			c[d + 236 >> 2] = 0;
			c[d + 240 >> 2] = 0;
			c[d + 248 >> 2] = -1;
			g = d + 252 | 0;
			c[g >> 2] = 0;
			c[g + 4 >> 2] = 0;
			c[g + 8 >> 2] = 0;
			c[g + 12 >> 2] = 0;
			c[g + 16 >> 2] = 0;
			h[d + 272 >> 3] = 1.0;
			h[d + 280 >> 3] = .2;
			a[d + 288 >> 0] = -1;
			a[d + 289 >> 0] = -1;
			a[d + 290 >> 0] = -1;
			a[d + 291 >> 0] = 0;
			a[d + 292 >> 0] = 0;
			a[d + 293 >> 0] = 0;
			a[d + 294 >> 0] = 1;
			a[d + 295 >> 0] = 1;
			a[d + 296 >> 0] = 0;
			c[d + 300 >> 2] = 0;
			c[d + 304 >> 2] = 0;
			c[d + 312 >> 2] = -1;
			g = d + 316 | 0;
			c[g >> 2] = 0;
			c[g + 4 >> 2] = 0;
			c[g + 8 >> 2] = 0;
			c[g + 12 >> 2] = 0;
			c[g + 16 >> 2] = 0;
			h[d + 336 >> 3] = 1.0;
			h[d + 344 >> 3] = .2;
			a[d + 352 >> 0] = -1;
			a[d + 353 >> 0] = -1;
			a[d + 354 >> 0] = -1;
			a[d + 355 >> 0] = 0;
			a[d + 356 >> 0] = 0;
			a[d + 357 >> 0] = 0;
			a[d + 358 >> 0] = 1;
			a[d + 359 >> 0] = 1;
			a[d + 360 >> 0] = 0;
			c[d + 364 >> 2] = 0;
			c[d + 368 >> 2] = 0;
			c[d + 376 >> 2] = -1;
			g = d + 380 | 0;
			c[g >> 2] = 0;
			c[g + 4 >> 2] = 0;
			c[g + 8 >> 2] = 0;
			c[g + 12 >> 2] = 0;
			c[g + 16 >> 2] = 0;
			h[d + 400 >> 3] = 1.0;
			h[d + 408 >> 3] = .2;
			a[d + 416 >> 0] = -1;
			a[d + 417 >> 0] = -1;
			a[d + 418 >> 0] = -1;
			a[d + 419 >> 0] = 0;
			a[d + 420 >> 0] = 0;
			a[d + 421 >> 0] = 0;
			a[d + 422 >> 0] = 1;
			a[d + 423 >> 0] = 1;
			a[d + 424 >> 0] = 0;
			c[d + 428 >> 2] = 0;
			c[d + 432 >> 2] = 0;
			return
		}
		function _g(a) {
			a = a | 0;
			var b = 0,
			d = 0,
			e = 0,
			f = 0;
			og(a);
			b = c[a + 60 >> 2] | 0;
			if (b)
				do {
					f = b;
					b = c[b >> 2] | 0;
					ih(f)
				} while ((b | 0) != 0);
			f = a + 52 | 0;
			b = c[f >> 2] | 0;
			c[f >> 2] = 0;
			if (b)
				ih(b);
			f = c[a + 40 >> 2] | 0;
			b = f;
			if (f) {
				d = a + 44 | 0;
				e = c[d >> 2] | 0;
				if ((e | 0) != (f | 0))
					c[d >> 2] = e + (~((e + -4 - b | 0) >>> 2) << 2);
				ih(f)
			}
			b = c[a + 28 >> 2] | 0;
			d = b;
			if (b) {
				e = a + 32 | 0;
				f = c[e >> 2] | 0;
				if ((f | 0) != (b | 0))
					c[e >> 2] = f + (~((f + -4 - d | 0) >>> 2) << 2);
				ih(b)
			}
			b = c[a + 16 >> 2] | 0;
			d = b;
			if (b) {
				e = a + 20 | 0;
				f = c[e >> 2] | 0;
				if ((f | 0) != (b | 0))
					c[e >> 2] = f + (~((f + -4 - d | 0) >>> 2) << 2);
				ih(b)
			}
			e = c[a + 4 >> 2] | 0;
			if (!e)
				return;
			b = a + 8 | 0;
			d = c[b >> 2] | 0;
			if ((d | 0) != (e | 0))
				c[b >> 2] = d + (~((d + -4 - e | 0) >>> 2) << 2);
			ih(e);
			return
		}
		function $g(a) {
			a = a | 0;
			var b = 0,
			d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0;
			qj(a + 380 | 0);
			Rb(a + 376 | 0);
			qj(a + 316 | 0);
			Rb(a + 312 | 0);
			qj(a + 252 | 0);
			Rb(a + 248 | 0);
			qj(a + 188 | 0);
			Rb(a + 184 | 0);
			Rb(a + 176 | 0);
			Rb(a + 172 | 0);
			h = a + 148 | 0;
			b = c[h >> 2] | 0;
			if (!b)
				return;
			g = a + 152 | 0;
			a = c[g >> 2] | 0;
			if ((a | 0) != (b | 0)) {
				do {
					d = a + -12 | 0;
					c[g >> 2] = d;
					e = c[d >> 2] | 0;
					f = e;
					if (!e)
						a = d;
					else {
						a = a + -8 | 0;
						d = c[a >> 2] | 0;
						if ((d | 0) != (e | 0))
							c[a >> 2] = d + (~((d + -4 - f | 0) >>> 2) << 2);
						ih(e);
						a = c[g >> 2] | 0
					}
				} while ((a | 0) != (b | 0));
				b = c[h >> 2] | 0
			}
			ih(b);
			return
		}
		function ah(a) {
			a = a | 0;
			var b = 0,
			d = 0,
			e = 0,
			f = 0,
			g = 0;
			e = a + 60 | 0;
			b = c[e >> 2] | 0;
			if (b) {
				f = a + 64 | 0;
				d = c[f >> 2] | 0;
				if ((d | 0) != (b | 0)) {
					do {
						g = d + -24 | 0;
						c[f >> 2] = g;
						d = c[d + -8 >> 2] | 0;
						if ((d | 0) != (g | 0)) {
							if (d)
								sb[c[(c[d >> 2] | 0) + 20 >> 2] & 255](d)
						} else
							sb[c[(c[d >> 2] | 0) + 16 >> 2] & 255](d);
						d = c[f >> 2] | 0
					} while ((d | 0) != (b | 0));
					b = c[e >> 2] | 0
				}
				ih(b)
			}
			b = c[a + 48 >> 2] | 0;
			d = b;
			if (b) {
				e = a + 52 | 0;
				f = c[e >> 2] | 0;
				if ((f | 0) != (b | 0))
					c[e >> 2] = f + (~((f + -4 - d | 0) >>> 2) << 2);
				ih(b)
			}
			e = a + 36 | 0;
			b = c[e >> 2] | 0;
			if (b) {
				f = a + 40 | 0;
				d = c[f >> 2] | 0;
				if ((d | 0) != (b | 0)) {
					do {
						c[f >> 2] = d + -16;
						qj(d + -12 | 0);
						d = c[f >> 2] | 0
					} while ((d | 0) != (b | 0));
					b = c[e >> 2] | 0
				}
				ih(b)
			}
			qj(a + 20 | 0);
			g = a + 4 | 0;
			b = c[g >> 2] | 0;
			c[g >> 2] = 0;
			if (!b)
				return;
			Ac(b);
			ih(b);
			return
		}
		function bh(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			h = 0.0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0.0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0.0;
			p = b;
			a : while (1) {
				r = p;
				b = p + -4 | 0;
				b : while (1) {
					q = a;
					f = r - q | 0;
					i = f >> 2;
					switch (i | 0) {
					case 2: {
							f = a;
							a = b;
							e = b;
							u = 4;
							break a
						}
					case 3: {
							l = a;
							i = b;
							j = b;
							u = 6;
							break a
						}
					case 4: {
							n = b;
							o = b;
							u = 14;
							break a
						}
					case 5: {
							u = 26;
							break a
						}
					case 1:
					case 0: {
							u = 86;
							break a
						}
					default: {}

					}
					if ((f | 0) < 124) {
						u = 28;
						break a
					}
					e = (i | 0) / 2 | 0;
					o = a + (e << 2) | 0;
					do
						if ((f | 0) <= 3996) {
							f = c[o >> 2] | 0;
							j = c[a >> 2] | 0;
							m = +g[f + 16 >> 2];
							h = +g[j + 16 >> 2];
							i = c[b >> 2] | 0;
							e = +g[i + 16 >> 2] < m;
							if (!(m < h)) {
								if (!e) {
									e = 0;
									break
								}
								c[o >> 2] = i;
								c[b >> 2] = f;
								e = c[o >> 2] | 0;
								f = c[a >> 2] | 0;
								if (!(+g[e + 16 >> 2] < +g[f + 16 >> 2])) {
									e = 1;
									break
								}
								c[a >> 2] = e;
								c[o >> 2] = f;
								e = 2;
								break
							}
							if (e) {
								c[a >> 2] = i;
								c[b >> 2] = j;
								e = 1;
								break
							}
							c[a >> 2] = f;
							c[o >> 2] = j;
							e = c[b >> 2] | 0;
							if (+g[e + 16 >> 2] < h) {
								c[o >> 2] = e;
								c[b >> 2] = j;
								e = 2
							} else
								e = 1
						} else {
							n = (i | 0) / 4 | 0;
							e = ch(a, a + (n << 2) | 0, o, a + (n + e << 2) | 0, b, d) | 0
						}
					while (0);
					j = c[a >> 2] | 0;
					m = +g[j + 16 >> 2];
					h = +g[(c[o >> 2] | 0) + 16 >> 2];
					do
						if (m < h)
							i = b;
						else {
							i = b;
							while (1) {
								i = i + -4 | 0;
								if ((a | 0) == (i | 0))
									break;
								f = c[i >> 2] | 0;
								if (+g[f + 16 >> 2] < h) {
									u = 68;
									break
								}
							}
							if ((u | 0) == 68) {
								u = 0;
								c[a >> 2] = f;
								c[i >> 2] = j;
								e = e + 1 | 0;
								break
							}
							e = a + 4 | 0;
							q = c[b >> 2] | 0;
							j = q;
							if (!(m < +g[q + 16 >> 2])) {
								if ((e | 0) == (b | 0)) {
									u = 86;
									break a
								} else
									i = a;
								while (1) {
									f = c[e >> 2] | 0;
									if (m < +g[f + 16 >> 2])
										break;
									f = e + 4 | 0;
									if ((f | 0) == (b | 0)) {
										u = 86;
										break a
									} else {
										i = e;
										e = f
									}
								}
								c[e >> 2] = j;
								c[b >> 2] = f;
								e = i + 8 | 0
							}
							if ((e | 0) == (b | 0)) {
								u = 86;
								break a
							} else
								i = b;
							while (1) {
								h = +g[(c[a >> 2] | 0) + 16 >> 2];
								j = e;
								while (1) {
									f = c[j >> 2] | 0;
									e = j + 4 | 0;
									if (h < +g[f + 16 >> 2])
										break;
									else
										j = e
								}
								k = f;
								f = i;
								while (1) {
									i = f + -4 | 0;
									f = c[i >> 2] | 0;
									if (h < +g[f + 16 >> 2])
										f = i;
									else
										break
								}
								if (j >>> 0 >= i >>> 0) {
									a = j;
									continue b
								}
								c[j >> 2] = f;
								c[i >> 2] = k
							}
						}
					while (0);
					f = a + 4 | 0;
					c : do
						if (f >>> 0 < i >>> 0)
							while (1) {
								h = +g[(c[o >> 2] | 0) + 16 >> 2];
								k = f;
								while (1) {
									j = c[k >> 2] | 0;
									f = k + 4 | 0;
									if (+g[j + 16 >> 2] < h)
										k = f;
									else {
										n = k;
										break
									}
								}
								do {
									i = i + -4 | 0;
									k = c[i >> 2] | 0
								} while (!(+g[k + 16 >> 2] < h));
								l = i;
								i = k;
								if (n >>> 0 > l >>> 0) {
									i = n;
									f = o;
									break c
								}
								c[n >> 2] = i;
								c[l >> 2] = j;
								i = l;
								o = (o | 0) == (n | 0) ? l : o;
								e = e + 1 | 0
							}
						else {
							i = f;
							f = o
						}
					while (0);
					if ((i | 0) != (f | 0) ? (s = c[f >> 2] | 0, t = c[i >> 2] | 0, +g[s + 16 >> 2] < +g[t + 16 >> 2]) : 0) {
						c[i >> 2] = s;
						c[f >> 2] = t;
						e = e + 1 | 0
					}
					if (!e) {
						e = dh(a, i, d) | 0;
						f = i + 4 | 0;
						if (dh(f, p, d) | 0) {
							u = 81;
							break
						}
						if (e) {
							a = f;
							continue
						}
					}
					o = i;
					if ((o - q | 0) >= (r - o | 0)) {
						b = i;
						u = 85;
						break
					}
					bh(a, i, d);
					a = i + 4 | 0
				}
				if ((u | 0) == 81) {
					u = 0;
					if (e) {
						u = 86;
						break
					} else {
						p = i;
						continue
					}
				} else if ((u | 0) == 85) {
					u = 0;
					bh(b + 4 | 0, p, d);
					p = b;
					continue
				}
			}
			if ((u | 0) == 4) {
				b = c[a >> 2] | 0;
				a = c[f >> 2] | 0;
				if (!(+g[b + 16 >> 2] < +g[a + 16 >> 2]))
					return;
				c[f >> 2] = b;
				c[e >> 2] = a;
				return
			} else if ((u | 0) == 6) {
				k = l + 4 | 0;
				a = c[k >> 2] | 0;
				f = c[l >> 2] | 0;
				m = +g[a + 16 >> 2];
				h = +g[f + 16 >> 2];
				e = c[i >> 2] | 0;
				b = +g[e + 16 >> 2] < m;
				if (!(m < h)) {
					if (!b)
						return;
					c[k >> 2] = e;
					c[j >> 2] = a;
					b = c[k >> 2] | 0;
					a = c[l >> 2] | 0;
					if (!(+g[b + 16 >> 2] < +g[a + 16 >> 2]))
						return;
					c[l >> 2] = b;
					c[k >> 2] = a;
					return
				}
				if (b) {
					c[l >> 2] = e;
					c[j >> 2] = f;
					return
				}
				c[l >> 2] = a;
				c[k >> 2] = f;
				b = c[i >> 2] | 0;
				if (!(+g[b + 16 >> 2] < h))
					return;
				c[k >> 2] = b;
				c[j >> 2] = f;
				return
			} else if ((u | 0) == 14) {
				q = a + 4 | 0;
				p = a + 8 | 0;
				j = c[q >> 2] | 0;
				f = c[a >> 2] | 0;
				v = +g[j + 16 >> 2];
				h = +g[f + 16 >> 2];
				b = c[p >> 2] | 0;
				m = +g[b + 16 >> 2];
				i = m < v;
				e = j;
				k = b;
				l = f;
				do
					if (v < h) {
						if (i) {
							c[a >> 2] = k;
							c[p >> 2] = l;
							e = l;
							break
						}
						c[a >> 2] = e;
						c[q >> 2] = l;
						if (m < h) {
							c[q >> 2] = k;
							c[p >> 2] = l;
							e = l
						} else {
							f = b;
							e = k
						}
					} else if (i) {
						c[q >> 2] = k;
						c[p >> 2] = e;
						if (+g[b + 16 >> 2] < h) {
							c[a >> 2] = b;
							c[q >> 2] = l;
							f = j;
							e = j
						} else
							f = j
					} else {
						f = b;
						e = k
					}
				while (0);
				b = c[n >> 2] | 0;
				if (!(+g[b + 16 >> 2] < +g[f + 16 >> 2]))
					return;
				c[p >> 2] = b;
				c[o >> 2] = e;
				e = c[p >> 2] | 0;
				b = c[q >> 2] | 0;
				if (!(+g[e + 16 >> 2] < +g[b + 16 >> 2]))
					return;
				c[q >> 2] = e;
				c[p >> 2] = b;
				b = c[a >> 2] | 0;
				if (!(+g[e + 16 >> 2] < +g[b + 16 >> 2]))
					return;
				c[a >> 2] = e;
				c[q >> 2] = b;
				return
			} else if ((u | 0) == 26) {
				ch(a, a + 4 | 0, a + 8 | 0, a + 12 | 0, b, d) | 0;
				return
			} else if ((u | 0) == 28) {
				b = a + 8 | 0;
				l = a + 4 | 0;
				n = c[l >> 2] | 0;
				o = c[a >> 2] | 0;
				v = +g[n + 16 >> 2];
				h = +g[o + 16 >> 2];
				e = c[b >> 2] | 0;
				m = +g[e + 16 >> 2];
				f = m < v;
				i = n;
				j = e;
				k = o;
				do
					if (v < h) {
						if (f) {
							c[a >> 2] = j;
							c[b >> 2] = k;
							e = o;
							break
						}
						c[a >> 2] = i;
						c[l >> 2] = k;
						if (m < h) {
							c[l >> 2] = j;
							c[b >> 2] = k;
							e = o
						}
					} else if (f) {
						c[l >> 2] = j;
						c[b >> 2] = i;
						if (m < h) {
							c[a >> 2] = j;
							c[l >> 2] = k;
							e = n
						} else
							e = n
					}
				while (0);
				f = a + 12 | 0;
				if ((f | 0) == (p | 0))
					return;
				while (1) {
					i = c[f >> 2] | 0;
					h = +g[i + 16 >> 2];
					if (h < +g[e + 16 >> 2]) {
						e = f;
						while (1) {
							c[e >> 2] = c[b >> 2];
							if ((b | 0) == (a | 0))
								break;
							e = b + -4 | 0;
							if (h < +g[(c[e >> 2] | 0) + 16 >> 2]) {
								u = b;
								b = e;
								e = u
							} else
								break
						}
						c[b >> 2] = i
					}
					b = f + 4 | 0;
					if ((b | 0) == (p | 0))
						break;
					u = f;
					e = c[f >> 2] | 0;
					f = b;
					b = u
				}
				return
			} else if ((u | 0) == 86)
				return
		}
		function ch(a, b, d, e, f, h) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			h = h | 0;
			var i = 0,
			j = 0,
			k = 0,
			l = 0.0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0.0;
			j = c[b >> 2] | 0;
			m = c[a >> 2] | 0;
			q = +g[j + 16 >> 2];
			l = +g[m + 16 >> 2];
			k = c[d >> 2] | 0;
			h = +g[k + 16 >> 2] < q;
			n = j;
			i = k;
			o = m;
			do
				if (q < l) {
					if (h) {
						c[a >> 2] = i;
						c[d >> 2] = o;
						p = 1;
						j = m;
						i = o;
						break
					}
					c[a >> 2] = n;
					c[b >> 2] = o;
					h = c[d >> 2] | 0;
					i = h;
					if (+g[h + 16 >> 2] < l) {
						c[b >> 2] = i;
						c[d >> 2] = o;
						p = 2;
						j = m;
						i = o
					} else {
						p = 1;
						j = h
					}
				} else if (h) {
					c[b >> 2] = i;
					c[d >> 2] = n;
					h = c[b >> 2] | 0;
					i = c[a >> 2] | 0;
					if (+g[h + 16 >> 2] < +g[i + 16 >> 2]) {
						c[a >> 2] = h;
						c[b >> 2] = i;
						i = c[d >> 2] | 0;
						p = 2;
						j = i
					} else {
						p = 1;
						i = n
					}
				} else {
					p = 0;
					j = k
				}
			while (0);
			h = c[e >> 2] | 0;
			if (+g[h + 16 >> 2] < +g[j + 16 >> 2]) {
				c[d >> 2] = h;
				c[e >> 2] = i;
				h = p + 1 | 0;
				i = c[d >> 2] | 0;
				j = c[b >> 2] | 0;
				if (+g[i + 16 >> 2] < +g[j + 16 >> 2]) {
					c[b >> 2] = i;
					c[d >> 2] = j;
					h = c[b >> 2] | 0;
					i = c[a >> 2] | 0;
					if (+g[h + 16 >> 2] < +g[i + 16 >> 2]) {
						c[a >> 2] = h;
						c[b >> 2] = i;
						j = p + 3 | 0
					} else
						j = p + 2 | 0
				} else
					j = h
			} else
				j = p;
			h = c[f >> 2] | 0;
			i = c[e >> 2] | 0;
			if (!(+g[h + 16 >> 2] < +g[i + 16 >> 2])) {
				a = j;
				return a | 0
			}
			c[e >> 2] = h;
			c[f >> 2] = i;
			h = c[e >> 2] | 0;
			i = c[d >> 2] | 0;
			if (!(+g[h + 16 >> 2] < +g[i + 16 >> 2])) {
				a = j + 1 | 0;
				return a | 0
			}
			c[d >> 2] = h;
			c[e >> 2] = i;
			h = c[d >> 2] | 0;
			i = c[b >> 2] | 0;
			if (!(+g[h + 16 >> 2] < +g[i + 16 >> 2])) {
				a = j + 2 | 0;
				return a | 0
			}
			c[b >> 2] = h;
			c[d >> 2] = i;
			h = c[b >> 2] | 0;
			i = c[a >> 2] | 0;
			if (!(+g[h + 16 >> 2] < +g[i + 16 >> 2])) {
				a = j + 3 | 0;
				return a | 0
			}
			c[a >> 2] = h;
			c[b >> 2] = i;
			a = j + 4 | 0;
			return a | 0
		}
		function dh(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			h = 0,
			i = 0.0,
			j = 0,
			k = 0,
			l = 0.0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0.0;
			switch (b - a >> 2 | 0) {
			case 2: {
					d = b + -4 | 0;
					e = c[d >> 2] | 0;
					f = c[a >> 2] | 0;
					if (!(+g[e + 16 >> 2] < +g[f + 16 >> 2])) {
						a = 1;
						return a | 0
					}
					c[a >> 2] = e;
					c[d >> 2] = f;
					a = 1;
					return a | 0
				}
			case 3: {
					k = a + 4 | 0;
					h = b + -4 | 0;
					e = c[k >> 2] | 0;
					j = c[a >> 2] | 0;
					l = +g[e + 16 >> 2];
					i = +g[j + 16 >> 2];
					f = c[h >> 2] | 0;
					d = +g[f + 16 >> 2] < l;
					if (!(l < i)) {
						if (!d) {
							a = 1;
							return a | 0
						}
						c[k >> 2] = f;
						c[h >> 2] = e;
						d = c[k >> 2] | 0;
						e = c[a >> 2] | 0;
						if (!(+g[d + 16 >> 2] < +g[e + 16 >> 2])) {
							a = 1;
							return a | 0
						}
						c[a >> 2] = d;
						c[k >> 2] = e;
						a = 1;
						return a | 0
					}
					if (d) {
						c[a >> 2] = f;
						c[h >> 2] = j;
						a = 1;
						return a | 0
					}
					c[a >> 2] = e;
					c[k >> 2] = j;
					d = c[h >> 2] | 0;
					if (!(+g[d + 16 >> 2] < i)) {
						a = 1;
						return a | 0
					}
					c[k >> 2] = d;
					c[h >> 2] = j;
					a = 1;
					return a | 0
				}
			case 4: {
					p = a + 4 | 0;
					o = a + 8 | 0;
					n = b + -4 | 0;
					j = c[p >> 2] | 0;
					f = c[a >> 2] | 0;
					q = +g[j + 16 >> 2];
					i = +g[f + 16 >> 2];
					d = c[o >> 2] | 0;
					l = +g[d + 16 >> 2];
					h = l < q;
					e = j;
					k = d;
					m = f;
					do
						if (q < i) {
							if (h) {
								c[a >> 2] = k;
								c[o >> 2] = m;
								e = m;
								break
							}
							c[a >> 2] = e;
							c[p >> 2] = m;
							if (l < i) {
								c[p >> 2] = k;
								c[o >> 2] = m;
								e = m
							} else {
								f = d;
								e = k
							}
						} else if (h) {
							c[p >> 2] = k;
							c[o >> 2] = e;
							if (+g[d + 16 >> 2] < i) {
								c[a >> 2] = d;
								c[p >> 2] = m;
								f = j;
								e = j
							} else
								f = j
						} else {
							f = d;
							e = k
						}
					while (0);
					d = c[n >> 2] | 0;
					if (!(+g[d + 16 >> 2] < +g[f + 16 >> 2])) {
						a = 1;
						return a | 0
					}
					c[o >> 2] = d;
					c[n >> 2] = e;
					e = c[o >> 2] | 0;
					d = c[p >> 2] | 0;
					if (!(+g[e + 16 >> 2] < +g[d + 16 >> 2])) {
						a = 1;
						return a | 0
					}
					c[p >> 2] = e;
					c[o >> 2] = d;
					d = c[a >> 2] | 0;
					if (!(+g[e + 16 >> 2] < +g[d + 16 >> 2])) {
						a = 1;
						return a | 0
					}
					c[a >> 2] = e;
					c[p >> 2] = d;
					a = 1;
					return a | 0
				}
			case 5: {
					ch(a, a + 4 | 0, a + 8 | 0, a + 12 | 0, b + -4 | 0, d) | 0;
					a = 1;
					return a | 0
				}
			case 1:
			case 0: {
					a = 1;
					return a | 0
				}
			default: {
					f = a + 8 | 0;
					n = a + 4 | 0;
					o = c[n >> 2] | 0;
					e = c[a >> 2] | 0;
					q = +g[o + 16 >> 2];
					i = +g[e + 16 >> 2];
					d = c[f >> 2] | 0;
					l = +g[d + 16 >> 2];
					h = l < q;
					j = o;
					k = d;
					m = e;
					do
						if (q < i) {
							if (h) {
								c[a >> 2] = k;
								c[f >> 2] = m;
								break
							}
							c[a >> 2] = j;
							c[n >> 2] = m;
							if (l < i) {
								c[n >> 2] = k;
								c[f >> 2] = m
							} else
								e = d
						} else if (h) {
							c[n >> 2] = k;
							c[f >> 2] = j;
							if (+g[d + 16 >> 2] < i) {
								c[a >> 2] = d;
								c[n >> 2] = m;
								e = o
							} else
								e = o
						} else
							e = d;
					while (0);
					d = a + 12 | 0;
					if ((d | 0) == (b | 0)) {
						a = 1;
						return a | 0
					} else {
						j = e;
						e = 0
					}
					while (1) {
						h = c[d >> 2] | 0;
						k = h;
						if (+g[h + 16 >> 2] < +g[j + 16 >> 2]) {
							j = h + 16 | 0;
							h = d;
							while (1) {
								c[h >> 2] = c[f >> 2];
								if ((f | 0) == (a | 0))
									break;
								h = f + -4 | 0;
								if (+g[j >> 2] < +g[(c[h >> 2] | 0) + 16 >> 2]) {
									o = f;
									f = h;
									h = o
								} else
									break
							}
							c[f >> 2] = k;
							e = e + 1 | 0;
							if ((e | 0) == 8)
								break
						}
						f = d + 4 | 0;
						if ((f | 0) == (b | 0)) {
							d = 1;
							p = 42;
							break
						}
						o = d;
						j = c[d >> 2] | 0;
						d = f;
						f = o
					}
					if ((p | 0) == 42)
						return d | 0;
					a = (d + 4 | 0) == (b | 0);
					return a | 0
				}
			}
			return 0
		}
		function eh(a) {
			a = a | 0;
			Ba(19089, 19118, 1164, 19195)
		}
		function fh(a) {
			a = a | 0;
			Ba(19216, 19239, 303, 19195)
		}
		function gh(a) {
			a = a | 0;
			var b = 0,
			d = 0;
			b = (a | 0) == 0 ? 1 : a;
			a = fj(b) | 0;
			a : do
				if (!a) {
					while (1) {
						a = oh() | 0;
						if (!a)
							break;
						yb[a & 3]();
						a = fj(b) | 0;
						if (a) {
							d = a;
							break a
						}
					}
					b = Ca(4) | 0;
					c[b >> 2] = 3708;
					ab(b | 0, 736, 73)
				} else
					d = a;
			while (0);
			return d | 0
		}
		function hh(a) {
			a = a | 0;
			return gh(a) | 0
		}
		function ih(a) {
			a = a | 0;
			gj(a);
			return
		}
		function jh(a) {
			a = a | 0;
			ih(a);
			return
		}
		function kh(a) {
			a = a | 0;
			c[a >> 2] = 3708;
			return
		}
		function lh(a) {
			a = a | 0;
			return
		}
		function mh(a) {
			a = a | 0;
			ih(a);
			return
		}
		function nh(a) {
			a = a | 0;
			return 19316
		}
		function oh() {
			var a = 0;
			a = c[930] | 0;
			c[930] = a + 0;
			return a | 0
		}
		function ph(a) {
			a = a | 0;
			return
		}
		function qh(a) {
			a = a | 0;
			return
		}
		function rh(a) {
			a = a | 0;
			return
		}
		function sh(a) {
			a = a | 0;
			return
		}
		function th(a) {
			a = a | 0;
			return
		}
		function uh(a) {
			a = a | 0;
			ih(a);
			return
		}
		function vh(a) {
			a = a | 0;
			ih(a);
			return
		}
		function wh(a) {
			a = a | 0;
			ih(a);
			return
		}
		function xh(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0;
			h = i;
			i = i + 64 | 0;
			g = h;
			if ((a | 0) != (b | 0))
				if ((b | 0) != 0 ? (f = Dh(b, 768, 784, 0) | 0, (f | 0) != 0) : 0) {
					b = g;
					e = b + 56 | 0;
					do {
						c[b >> 2] = 0;
						b = b + 4 | 0
					} while ((b | 0) < (e | 0));
					c[g >> 2] = f;
					c[g + 8 >> 2] = a;
					c[g + 12 >> 2] = -1;
					c[g + 48 >> 2] = 1;
					Eb[c[(c[f >> 2] | 0) + 28 >> 2] & 7](f, g, c[d >> 2] | 0, 1);
					if ((c[g + 24 >> 2] | 0) == 1) {
						c[d >> 2] = c[g + 16 >> 2];
						b = 1
					} else
						b = 0
				} else
					b = 0;
			else
				b = 1;
			i = h;
			return b | 0
		}
		function yh(b, d, e, f) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0;
			b = d + 16 | 0;
			g = c[b >> 2] | 0;
			do
				if (g) {
					if ((g | 0) != (e | 0)) {
						f = d + 36 | 0;
						c[f >> 2] = (c[f >> 2] | 0) + 1;
						c[d + 24 >> 2] = 2;
						a[d + 54 >> 0] = 1;
						break
					}
					b = d + 24 | 0;
					if ((c[b >> 2] | 0) == 2)
						c[b >> 2] = f
				} else {
					c[b >> 2] = e;
					c[d + 24 >> 2] = f;
					c[d + 36 >> 2] = 1
				}
			while (0);
			return
		}
		function zh(a, b, d, e) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			if ((a | 0) == (c[b + 8 >> 2] | 0))
				yh(0, b, d, e);
			return
		}
		function Ah(a, b, d, e) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			if ((a | 0) == (c[b + 8 >> 2] | 0))
				yh(0, b, d, e);
			else {
				a = c[a + 8 >> 2] | 0;
				Eb[c[(c[a >> 2] | 0) + 28 >> 2] & 7](a, b, d, e)
			}
			return
		}
		function Bh(a, b, d, e) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0;
			g = c[a + 4 >> 2] | 0;
			f = g >> 8;
			if (g & 1)
				f = c[(c[d >> 2] | 0) + f >> 2] | 0;
			a = c[a >> 2] | 0;
			Eb[c[(c[a >> 2] | 0) + 28 >> 2] & 7](a, b, d + f | 0, (g & 2 | 0) != 0 ? e : 2);
			return
		}
		function Ch(b, d, e, f) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0;
			a : do
				if ((b | 0) != (c[d + 8 >> 2] | 0)) {
					h = c[b + 12 >> 2] | 0;
					g = b + 16 + (h << 3) | 0;
					Bh(b + 16 | 0, d, e, f);
					if ((h | 0) > 1) {
						h = d + 54 | 0;
						b = b + 24 | 0;
						do {
							Bh(b, d, e, f);
							if (a[h >> 0] | 0)
								break a;
							b = b + 8 | 0
						} while (b >>> 0 < g >>> 0)
					}
				} else
					yh(0, d, e, f);
			while (0);
			return
		}
		function Dh(d, e, f, g) {
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0;
			r = i;
			i = i + 64 | 0;
			q = r;
			p = c[d >> 2] | 0;
			o = d + (c[p + -8 >> 2] | 0) | 0;
			p = c[p + -4 >> 2] | 0;
			c[q >> 2] = f;
			c[q + 4 >> 2] = d;
			c[q + 8 >> 2] = e;
			c[q + 12 >> 2] = g;
			g = q + 16 | 0;
			d = q + 20 | 0;
			e = q + 24 | 0;
			h = q + 28 | 0;
			j = q + 32 | 0;
			k = q + 40 | 0;
			l = (p | 0) == (f | 0);
			m = g;
			n = m + 36 | 0;
			do {
				c[m >> 2] = 0;
				m = m + 4 | 0
			} while ((m | 0) < (n | 0));
			b[g + 36 >> 1] = 0;
			a[g + 38 >> 0] = 0;
			a : do
				if (l) {
					c[q + 48 >> 2] = 1;
					Bb[c[(c[f >> 2] | 0) + 20 >> 2] & 7](f, q, o, o, 1, 0);
					g = (c[e >> 2] | 0) == 1 ? o : 0
				} else {
					qb[c[(c[p >> 2] | 0) + 24 >> 2] & 3](p, q, o, 1, 0);
					switch (c[q + 36 >> 2] | 0) {
					case 0: {
							g = (c[k >> 2] | 0) == 1 & (c[h >> 2] | 0) == 1 & (c[j >> 2] | 0) == 1 ? c[d >> 2] | 0 : 0;
							break a
						}
					case 1:
						break;
					default: {
							g = 0;
							break a
						}
					}
					if ((c[e >> 2] | 0) != 1 ? !((c[k >> 2] | 0) == 0 & (c[h >> 2] | 0) == 1 & (c[j >> 2] | 0) == 1) : 0) {
						g = 0;
						break
					}
					g = c[g >> 2] | 0
				}
			while (0);
			i = r;
			return g | 0
		}
		function Eh(b, d, e, f, g) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			a[d + 53 >> 0] = 1;
			do
				if ((c[d + 4 >> 2] | 0) == (f | 0)) {
					a[d + 52 >> 0] = 1;
					f = d + 16 | 0;
					b = c[f >> 2] | 0;
					if (!b) {
						c[f >> 2] = e;
						c[d + 24 >> 2] = g;
						c[d + 36 >> 2] = 1;
						if (!((g | 0) == 1 ? (c[d + 48 >> 2] | 0) == 1 : 0))
							break;
						a[d + 54 >> 0] = 1;
						break
					}
					if ((b | 0) != (e | 0)) {
						g = d + 36 | 0;
						c[g >> 2] = (c[g >> 2] | 0) + 1;
						a[d + 54 >> 0] = 1;
						break
					}
					b = d + 24 | 0;
					f = c[b >> 2] | 0;
					if ((f | 0) == 2) {
						c[b >> 2] = g;
						f = g
					}
					if ((f | 0) == 1 ? (c[d + 48 >> 2] | 0) == 1 : 0)
						a[d + 54 >> 0] = 1
				}
			while (0);
			return
		}
		function Fh(b, d, e, f, g) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0;
			a : do
				if ((b | 0) == (c[d + 8 >> 2] | 0)) {
					if ((c[d + 4 >> 2] | 0) == (e | 0) ? (h = d + 28 | 0, (c[h >> 2] | 0) != 1) : 0)
						c[h >> 2] = f
				} else {
					if ((b | 0) != (c[d >> 2] | 0)) {
						q = c[b + 12 >> 2] | 0;
						j = b + 16 + (q << 3) | 0;
						Hh(b + 16 | 0, d, e, f, g);
						h = b + 24 | 0;
						if ((q | 0) <= 1)
							break;
						i = c[b + 8 >> 2] | 0;
						if ((i & 2 | 0) == 0 ? (k = d + 36 | 0, (c[k >> 2] | 0) != 1) : 0) {
							if (!(i & 1)) {
								i = d + 54 | 0;
								while (1) {
									if (a[i >> 0] | 0)
										break a;
									if ((c[k >> 2] | 0) == 1)
										break a;
									Hh(h, d, e, f, g);
									h = h + 8 | 0;
									if (h >>> 0 >= j >>> 0)
										break a
								}
							}
							i = d + 24 | 0;
							b = d + 54 | 0;
							while (1) {
								if (a[b >> 0] | 0)
									break a;
								if ((c[k >> 2] | 0) == 1 ? (c[i >> 2] | 0) == 1 : 0)
									break a;
								Hh(h, d, e, f, g);
								h = h + 8 | 0;
								if (h >>> 0 >= j >>> 0)
									break a
							}
						}
						i = d + 54 | 0;
						while (1) {
							if (a[i >> 0] | 0)
								break a;
							Hh(h, d, e, f, g);
							h = h + 8 | 0;
							if (h >>> 0 >= j >>> 0)
								break a
						}
					}
					if ((c[d + 16 >> 2] | 0) != (e | 0) ? (p = d + 20 | 0, (c[p >> 2] | 0) != (e | 0)) : 0) {
						c[d + 32 >> 2] = f;
						m = d + 44 | 0;
						if ((c[m >> 2] | 0) == 4)
							break;
						i = c[b + 12 >> 2] | 0;
						j = b + 16 + (i << 3) | 0;
						k = d + 52 | 0;
						f = d + 53 | 0;
						n = d + 54 | 0;
						l = b + 8 | 0;
						o = d + 24 | 0;
						b : do
							if ((i | 0) > 0) {
								i = 0;
								h = 0;
								b = b + 16 | 0;
								while (1) {
									a[k >> 0] = 0;
									a[f >> 0] = 0;
									Gh(b, d, e, e, 1, g);
									if (a[n >> 0] | 0) {
										q = 20;
										break b
									}
									do
										if (a[f >> 0] | 0) {
											if (!(a[k >> 0] | 0))
												if (!(c[l >> 2] & 1)) {
													h = 1;
													q = 20;
													break b
												} else {
													h = 1;
													break
												}
											if ((c[o >> 2] | 0) == 1)
												break b;
											if (!(c[l >> 2] & 2))
												break b;
											else {
												i = 1;
												h = 1
											}
										}
									while (0);
									b = b + 8 | 0;
									if (b >>> 0 >= j >>> 0) {
										q = 20;
										break
									}
								}
							} else {
								i = 0;
								h = 0;
								q = 20
							}
						while (0);
						do
							if ((q | 0) == 20) {
								if ((!i ? (c[p >> 2] = e, e = d + 40 | 0, c[e >> 2] = (c[e >> 2] | 0) + 1, (c[d + 36 >> 2] | 0) == 1) : 0) ? (c[o >> 2] | 0) == 2 : 0) {
									a[n >> 0] = 1;
									if (h)
										break
								} else
									q = 24;
								if ((q | 0) == 24 ? h : 0)
									break;
								c[m >> 2] = 4;
								break a
							}
						while (0);
						c[m >> 2] = 3;
						break
					}
					if ((f | 0) == 1)
						c[d + 32 >> 2] = 1
				}
			while (0);
			return
		}
		function Gh(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			i = 0;
			i = c[a + 4 >> 2] | 0;
			h = i >> 8;
			if (i & 1)
				h = c[(c[e >> 2] | 0) + h >> 2] | 0;
			a = c[a >> 2] | 0;
			Bb[c[(c[a >> 2] | 0) + 20 >> 2] & 7](a, b, d, e + h | 0, (i & 2 | 0) != 0 ? f : 2, g);
			return
		}
		function Hh(a, b, d, e, f) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0;
			h = c[a + 4 >> 2] | 0;
			g = h >> 8;
			if (h & 1)
				g = c[(c[d >> 2] | 0) + g >> 2] | 0;
			a = c[a >> 2] | 0;
			qb[c[(c[a >> 2] | 0) + 24 >> 2] & 3](a, b, d + g | 0, (h & 2 | 0) != 0 ? e : 2, f);
			return
		}
		function Ih(b, d, e, f, g) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			i = 0,
			j = 0,
			k = 0;
			a : do
				if ((b | 0) == (c[d + 8 >> 2] | 0)) {
					if ((c[d + 4 >> 2] | 0) == (e | 0) ? (h = d + 28 | 0, (c[h >> 2] | 0) != 1) : 0)
						c[h >> 2] = f
				} else {
					if ((b | 0) != (c[d >> 2] | 0)) {
						j = c[b + 8 >> 2] | 0;
						qb[c[(c[j >> 2] | 0) + 24 >> 2] & 3](j, d, e, f, g);
						break
					}
					if ((c[d + 16 >> 2] | 0) != (e | 0) ? (i = d + 20 | 0, (c[i >> 2] | 0) != (e | 0)) : 0) {
						c[d + 32 >> 2] = f;
						f = d + 44 | 0;
						if ((c[f >> 2] | 0) == 4)
							break;
						h = d + 52 | 0;
						a[h >> 0] = 0;
						k = d + 53 | 0;
						a[k >> 0] = 0;
						b = c[b + 8 >> 2] | 0;
						Bb[c[(c[b >> 2] | 0) + 20 >> 2] & 7](b, d, e, e, 1, g);
						if (a[k >> 0] | 0) {
							if (!(a[h >> 0] | 0)) {
								h = 1;
								j = 13
							}
						} else {
							h = 0;
							j = 13
						}
						do
							if ((j | 0) == 13) {
								c[i >> 2] = e;
								k = d + 40 | 0;
								c[k >> 2] = (c[k >> 2] | 0) + 1;
								if ((c[d + 36 >> 2] | 0) == 1 ? (c[d + 24 >> 2] | 0) == 2 : 0) {
									a[d + 54 >> 0] = 1;
									if (h)
										break
								} else
									j = 16;
								if ((j | 0) == 16 ? h : 0)
									break;
								c[f >> 2] = 4;
								break a
							}
						while (0);
						c[f >> 2] = 3;
						break
					}
					if ((f | 0) == 1)
						c[d + 32 >> 2] = 1
				}
			while (0);
			return
		}
		function Jh(b, d, e, f, g) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			i = 0;
			do
				if ((b | 0) == (c[d + 8 >> 2] | 0)) {
					if ((c[d + 4 >> 2] | 0) == (e | 0) ? (i = d + 28 | 0, (c[i >> 2] | 0) != 1) : 0)
						c[i >> 2] = f
				} else if ((b | 0) == (c[d >> 2] | 0)) {
					if ((c[d + 16 >> 2] | 0) != (e | 0) ? (h = d + 20 | 0, (c[h >> 2] | 0) != (e | 0)) : 0) {
						c[d + 32 >> 2] = f;
						c[h >> 2] = e;
						g = d + 40 | 0;
						c[g >> 2] = (c[g >> 2] | 0) + 1;
						if ((c[d + 36 >> 2] | 0) == 1 ? (c[d + 24 >> 2] | 0) == 2 : 0)
							a[d + 54 >> 0] = 1;
						c[d + 44 >> 2] = 4;
						break
					}
					if ((f | 0) == 1)
						c[d + 32 >> 2] = 1
				}
			while (0);
			return
		}
		function Kh(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0;
			if ((b | 0) == (c[d + 8 >> 2] | 0))
				Eh(0, d, e, f, g);
			else {
				m = d + 52 | 0;
				n = a[m >> 0] | 0;
				o = d + 53 | 0;
				p = a[o >> 0] | 0;
				l = c[b + 12 >> 2] | 0;
				i = b + 16 + (l << 3) | 0;
				a[m >> 0] = 0;
				a[o >> 0] = 0;
				Gh(b + 16 | 0, d, e, f, g, h);
				a : do
					if ((l | 0) > 1) {
						j = d + 24 | 0;
						k = b + 8 | 0;
						l = d + 54 | 0;
						b = b + 24 | 0;
						do {
							if (a[l >> 0] | 0)
								break a;
							if (!(a[m >> 0] | 0)) {
								if ((a[o >> 0] | 0) != 0 ? (c[k >> 2] & 1 | 0) == 0 : 0)
									break a
							} else {
								if ((c[j >> 2] | 0) == 1)
									break a;
								if (!(c[k >> 2] & 2))
									break a
							}
							a[m >> 0] = 0;
							a[o >> 0] = 0;
							Gh(b, d, e, f, g, h);
							b = b + 8 | 0
						} while (b >>> 0 < i >>> 0)
					}
				while (0);
				a[m >> 0] = n;
				a[o >> 0] = p
			}
			return
		}
		function Lh(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			if ((a | 0) == (c[b + 8 >> 2] | 0))
				Eh(0, b, d, e, f);
			else {
				a = c[a + 8 >> 2] | 0;
				Bb[c[(c[a >> 2] | 0) + 20 >> 2] & 7](a, b, d, e, f, g)
			}
			return
		}
		function Mh(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			if ((a | 0) == (c[b + 8 >> 2] | 0))
				Eh(0, b, d, e, f);
			return
		}
		function Nh() {
			var a = 0;
			a = Ca(4) | 0;
			kh(a);
			ab(a | 0, 736, 73)
		}
		function Oh(a, b, c, d) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			a = Oi(a, b, c) | 0;
			return a | 0
		}
		function Ph(a, b, c, d) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			a = Pi(a, b, c) | 0;
			return a | 0
		}
		function Qh() {
			return 4048
		}
		function Rh() {
			return 4052
		}
		function Sh() {
			return 4056
		}
		function Th(a) {
			a = a | 0;
			return ((a | 0) == 32 | (a + -9 | 0) >>> 0 < 5) & 1 | 0
		}
		function Uh(a) {
			a = a | 0;
			if ((a + -48 | 0) >>> 0 < 10)
				a = 1;
			else
				a = ((a | 32) + -97 | 0) >>> 0 < 6;
			return a & 1 | 0
		}
		function Vh() {
			var a = 0;
			if (!0)
				a = 4060;
			else
				a = c[(Ua() | 0) + 60 >> 2] | 0;
			return a | 0
		}
		function Wh(b) {
			b = b | 0;
			var c = 0,
			e = 0;
			c = 0;
			while (1) {
				if ((d[19331 + c >> 0] | 0) == (b | 0)) {
					e = 2;
					break
				}
				c = c + 1 | 0;
				if ((c | 0) == 87) {
					c = 87;
					b = 19419;
					e = 5;
					break
				}
			}
			if ((e | 0) == 2)
				if (!c)
					b = 19419;
				else {
					b = 19419;
					e = 5
				}
			if ((e | 0) == 5)
				while (1) {
					e = b;
					while (1) {
						b = e + 1 | 0;
						if (!(a[e >> 0] | 0))
							break;
						else
							e = b
					}
					c = c + -1 | 0;
					if (!c)
						break;
					else
						e = 5
				}
			return b | 0
		}
		function ml(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0;
			y = i;
			i = i + 320 | 0;
			v = y;
			o = y + 208 | 0;
			x = y + 32 | 0;
			s = y + 28 | 0;
			w = y + 16 | 0;
			u = y + 12 | 0;
			q = y + 48 | 0;
			r = y + 8 | 0;
			p = y + 4 | 0;
			c[x >> 2] = 0;
			c[x + 4 >> 2] = 0;
			c[x + 8 >> 2] = 0;
			t = Tj(f) | 0;
			c[s >> 2] = t;
			s = Mo(s, 9344) | 0;
			Ab[c[(c[s >> 2] | 0) + 48 >> 2] & 7](s, 22110, 22136, o) | 0;
			cs(t) | 0;
			c[w >> 2] = 0;
			c[w + 4 >> 2] = 0;
			c[w + 8 >> 2] = 0;
			if (!(a[w >> 0] & 1))
				b = 10;
			else
				b = (c[w >> 2] & -2) + -1 | 0;
			uj(w, b, 0);
			s = w + 8 | 0;
			t = w + 1 | 0;
			b = (a[w >> 0] & 1) == 0 ? t : c[s >> 2] | 0;
			c[u >> 2] = b;
			c[r >> 2] = q;
			c[p >> 2] = 0;
			n = w + 4 | 0;
			j = c[d >> 2] | 0;
			a : while (1) {
				if (j) {
					f = c[j + 12 >> 2] | 0;
					if ((f | 0) == (c[j + 16 >> 2] | 0))
						f = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
					else
						f = c[f >> 2] | 0;
					if ((f | 0) == -1) {
						c[d >> 2] = 0;
						f = 0;
						l = 1
					} else {
						f = j;
						l = 0
					}
				} else {
					f = 0;
					l = 1
				}
				j = c[e >> 2] | 0;
				do
					if (j) {
						k = c[j + 12 >> 2] | 0;
						if ((k | 0) == (c[j + 16 >> 2] | 0))
							k = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
						else
							k = c[k >> 2] | 0;
						if ((k | 0) != -1)
							if (l)
								break;
							else
								break a;
						else {
							c[e >> 2] = 0;
							z = 16;
							break
						}
					} else
						z = 16;
				while (0);
				if ((z | 0) == 16) {
					z = 0;
					if (l) {
						j = 0;
						break
					} else
						j = 0
				}
				k = a[w >> 0] | 0;
				k = (k & 1) == 0 ? (k & 255) >>> 1 : c[n >> 2] | 0;
				if ((c[u >> 2] | 0) == (b + k | 0)) {
					uj(w, k << 1, 0);
					if (!(a[w >> 0] & 1))
						b = 10;
					else
						b = (c[w >> 2] & -2) + -1 | 0;
					uj(w, b, 0);
					b = (a[w >> 0] & 1) == 0 ? t : c[s >> 2] | 0;
					c[u >> 2] = b + k
				}
				l = f + 12 | 0;
				k = c[l >> 2] | 0;
				m = f + 16 | 0;
				if ((k | 0) == (c[m >> 2] | 0))
					k = wb[c[(c[f >> 2] | 0) + 36 >> 2] & 127](f) | 0;
				else
					k = c[k >> 2] | 0;
				if (nl(k, 16, b, u, p, 0, x, q, r, o) | 0)
					break;
				j = c[l >> 2] | 0;
				if ((j | 0) == (c[m >> 2] | 0)) {
					wb[c[(c[f >> 2] | 0) + 40 >> 2] & 127](f) | 0;
					j = f;
					continue
				} else {
					c[l >> 2] = j + 4;
					j = f;
					continue
				}
			}
			uj(w, (c[u >> 2] | 0) - b | 0, 0);
			t = (a[w >> 0] & 1) == 0 ? t : c[s >> 2] | 0;
			u = $k() | 0;
			c[v >> 2] = h;
			if ((Iq(t, u, 23494, v) | 0) != 1)
				c[g >> 2] = 4;
			if (f) {
				b = c[f + 12 >> 2] | 0;
				if ((b | 0) == (c[f + 16 >> 2] | 0))
					b = wb[c[(c[f >> 2] | 0) + 36 >> 2] & 127](f) | 0;
				else
					b = c[b >> 2] | 0;
				if ((b | 0) == -1) {
					c[d >> 2] = 0;
					f = 1
				} else
					f = 0
			} else
				f = 1;
			do
				if (j) {
					b = c[j + 12 >> 2] | 0;
					if ((b | 0) == (c[j + 16 >> 2] | 0))
						b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
					else
						b = c[b >> 2] | 0;
					if ((b | 0) != -1)
						if (f)
							break;
						else {
							z = 45;
							break
						}
					else {
						c[e >> 2] = 0;
						z = 43;
						break
					}
				} else
					z = 43;
			while (0);
			if ((z | 0) == 43 ? f : 0)
				z = 45;
			if ((z | 0) == 45)
				c[g >> 2] = c[g >> 2] | 2;
			z = c[d >> 2] | 0;
			qj(w);
			qj(x);
			i = y;
			return z | 0
		}
		function nl(b, d, e, f, g, h, i, j, k, l) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			i = i | 0;
			j = j | 0;
			k = k | 0;
			l = l | 0;
			var m = 0,
			n = 0,
			o = 0,
			p = 0;
			o = c[f >> 2] | 0;
			p = (o | 0) == (e | 0);
			do
				if (p) {
					m = (c[l + 96 >> 2] | 0) == (b | 0);
					if (!m ? (c[l + 100 >> 2] | 0) != (b | 0) : 0) {
						n = 5;
						break
					}
					c[f >> 2] = e + 1;
					a[e >> 0] = m ? 43 : 45;
					c[g >> 2] = 0;
					m = 0
				} else
					n = 5;
			while (0);
			a : do
				if ((n | 0) == 5) {
					n = a[i >> 0] | 0;
					if ((b | 0) == (h | 0) ? (((n & 1) == 0 ? (n & 255) >>> 1 : c[i + 4 >> 2] | 0) | 0) != 0 : 0) {
						m = c[k >> 2] | 0;
						if ((m - j | 0) >= 160) {
							m = 0;
							break
						}
						d = c[g >> 2] | 0;
						c[k >> 2] = m + 4;
						c[m >> 2] = d;
						c[g >> 2] = 0;
						m = 0;
						break
					}
					h = l + 104 | 0;
					m = l;
					while (1) {
						if ((c[m >> 2] | 0) == (b | 0))
							break;
						m = m + 4 | 0;
						if ((m | 0) == (h | 0)) {
							m = h;
							break
						}
					}
					m = m - l | 0;
					h = m >> 2;
					if ((m | 0) > 92)
						m = -1;
					else {
						switch (d | 0) {
						case 10:
						case 8: {
								if ((h | 0) >= (d | 0)) {
									m = -1;
									break a
								}
								break
							}
						case 16: {
								if ((m | 0) >= 88) {
									if (p) {
										m = -1;
										break a
									}
									if ((o - e | 0) >= 3) {
										m = -1;
										break a
									}
									if ((a[o + -1 >> 0] | 0) != 48) {
										m = -1;
										break a
									}
									c[g >> 2] = 0;
									m = a[22110 + h >> 0] | 0;
									c[f >> 2] = o + 1;
									a[o >> 0] = m;
									m = 0;
									break a
								}
								break
							}
						default: {}

						}
						m = a[22110 + h >> 0] | 0;
						c[f >> 2] = o + 1;
						a[o >> 0] = m;
						c[g >> 2] = (c[g >> 2] | 0) + 1;
						m = 0
					}
				}
			while (0);
			return m | 0
		}
		function ol(b, d, e, f) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			j = 0;
			g = i;
			i = i + 16 | 0;
			h = g;
			d = Tj(d) | 0;
			c[h >> 2] = d;
			j = Mo(h, 9352) | 0;
			Ab[c[(c[j >> 2] | 0) + 32 >> 2] & 7](j, 22110, 22136, e) | 0;
			e = Mo(h, 9492) | 0;
			a[f >> 0] = wb[c[(c[e >> 2] | 0) + 16 >> 2] & 127](e) | 0;
			tb[c[(c[e >> 2] | 0) + 20 >> 2] & 127](b, e);
			cs(d) | 0;
			i = g;
			return
		}
		function pl(b, d, e, f, g) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0;
			h = i;
			i = i + 16 | 0;
			j = h;
			d = Tj(d) | 0;
			c[j >> 2] = d;
			k = Mo(j, 9352) | 0;
			Ab[c[(c[k >> 2] | 0) + 32 >> 2] & 7](k, 22110, 22142, e) | 0;
			e = Mo(j, 9492) | 0;
			a[f >> 0] = wb[c[(c[e >> 2] | 0) + 12 >> 2] & 127](e) | 0;
			a[g >> 0] = wb[c[(c[e >> 2] | 0) + 16 >> 2] & 127](e) | 0;
			tb[c[(c[e >> 2] | 0) + 20 >> 2] & 127](b, e);
			cs(d) | 0;
			i = h;
			return
		}
		function ql(b, e, f, g, h, i, j, k, l, m, n, o) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			i = i | 0;
			j = j | 0;
			k = k | 0;
			l = l | 0;
			m = m | 0;
			n = n | 0;
			o = o | 0;
			var p = 0,
			q = 0;
			a : do
				if (b << 24 >> 24 == i << 24 >> 24)
					if (a[e >> 0] | 0) {
						a[e >> 0] = 0;
						f = c[h >> 2] | 0;
						c[h >> 2] = f + 1;
						a[f >> 0] = 46;
						f = a[k >> 0] | 0;
						if ((((f & 1) == 0 ? (f & 255) >>> 1 : c[k + 4 >> 2] | 0) | 0) != 0 ? (p = c[m >> 2] | 0, (p - l | 0) < 160) : 0) {
							l = c[n >> 2] | 0;
							c[m >> 2] = p + 4;
							c[p >> 2] = l;
							p = 0
						} else
							p = 0
					} else
						p = -1;
				else {
					if (b << 24 >> 24 == j << 24 >> 24 ? (i = a[k >> 0] | 0, (((i & 1) == 0 ? (i & 255) >>> 1 : c[k + 4 >> 2] | 0) | 0) != 0) : 0) {
						if (!(a[e >> 0] | 0)) {
							p = -1;
							break
						}
						p = c[m >> 2] | 0;
						if ((p - l | 0) >= 160) {
							p = 0;
							break
						}
						l = c[n >> 2] | 0;
						c[m >> 2] = p + 4;
						c[p >> 2] = l;
						c[n >> 2] = 0;
						p = 0;
						break
					}
					j = o + 32 | 0;
					p = o;
					while (1) {
						if ((a[p >> 0] | 0) == b << 24 >> 24)
							break;
						p = p + 1 | 0;
						if ((p | 0) == (j | 0)) {
							p = j;
							break
						}
					}
					j = p - o | 0;
					if ((j | 0) > 31)
						p = -1;
					else {
						i = a[22110 + j >> 0] | 0;
						switch (j | 0) {
						case 24:
						case 25: {
								p = c[h >> 2] | 0;
								if ((p | 0) != (g | 0) ? (d[p + -1 >> 0] & 95 | 0) != (d[f >> 0] & 127 | 0) : 0) {
									p = -1;
									break a
								}
								c[h >> 2] = p + 1;
								a[p >> 0] = i;
								p = 0;
								break a
							}
						case 23:
						case 22: {
								a[f >> 0] = 80;
								p = c[h >> 2] | 0;
								c[h >> 2] = p + 1;
								a[p >> 0] = i;
								p = 0;
								break a
							}
						default: {
								p = i & 95;
								if ((((p | 0) == (a[f >> 0] | 0) ? (a[f >> 0] = p | 128, (a[e >> 0] | 0) != 0) : 0) ? (a[e >> 0] = 0, f = a[k >> 0] | 0, (((f & 1) == 0 ? (f & 255) >>> 1 : c[k + 4 >> 2] | 0) | 0) != 0) : 0) ? (q = c[m >> 2] | 0, (q - l | 0) < 160) : 0) {
									l = c[n >> 2] | 0;
									c[m >> 2] = q + 4;
									c[q >> 2] = l
								}
								m = c[h >> 2] | 0;
								c[h >> 2] = m + 1;
								a[m >> 0] = i;
								if ((j | 0) > 21) {
									p = 0;
									break a
								}
								c[n >> 2] = (c[n >> 2] | 0) + 1;
								p = 0;
								break a
							}
						}
					}
				}
			while (0);
			return p | 0
		}
		function rl(a, b, d, e) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0;
			f = i;
			i = i + 16 | 0;
			g = f;
			b = Tj(b) | 0;
			c[g >> 2] = b;
			h = Mo(g, 9344) | 0;
			Ab[c[(c[h >> 2] | 0) + 48 >> 2] & 7](h, 22110, 22136, d) | 0;
			d = Mo(g, 9500) | 0;
			c[e >> 2] = wb[c[(c[d >> 2] | 0) + 16 >> 2] & 127](d) | 0;
			tb[c[(c[d >> 2] | 0) + 20 >> 2] & 127](a, d);
			cs(b) | 0;
			i = f;
			return
		}
		function sl(a, b, d, e, f) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			j = 0;
			g = i;
			i = i + 16 | 0;
			h = g;
			b = Tj(b) | 0;
			c[h >> 2] = b;
			j = Mo(h, 9344) | 0;
			Ab[c[(c[j >> 2] | 0) + 48 >> 2] & 7](j, 22110, 22142, d) | 0;
			d = Mo(h, 9500) | 0;
			c[e >> 2] = wb[c[(c[d >> 2] | 0) + 12 >> 2] & 127](d) | 0;
			c[f >> 2] = wb[c[(c[d >> 2] | 0) + 16 >> 2] & 127](d) | 0;
			tb[c[(c[d >> 2] | 0) + 20 >> 2] & 127](a, d);
			cs(b) | 0;
			i = g;
			return
		}
		function tl(b, e, f, g, h, i, j, k, l, m, n, o) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			i = i | 0;
			j = j | 0;
			k = k | 0;
			l = l | 0;
			m = m | 0;
			n = n | 0;
			o = o | 0;
			var p = 0,
			q = 0;
			a : do
				if ((b | 0) == (i | 0))
					if (a[e >> 0] | 0) {
						a[e >> 0] = 0;
						f = c[h >> 2] | 0;
						c[h >> 2] = f + 1;
						a[f >> 0] = 46;
						f = a[k >> 0] | 0;
						if ((((f & 1) == 0 ? (f & 255) >>> 1 : c[k + 4 >> 2] | 0) | 0) != 0 ? (p = c[m >> 2] | 0, (p - l | 0) < 160) : 0) {
							l = c[n >> 2] | 0;
							c[m >> 2] = p + 4;
							c[p >> 2] = l;
							p = 0
						} else
							p = 0
					} else
						p = -1;
				else {
					if ((b | 0) == (j | 0) ? (i = a[k >> 0] | 0, (((i & 1) == 0 ? (i & 255) >>> 1 : c[k + 4 >> 2] | 0) | 0) != 0) : 0) {
						if (!(a[e >> 0] | 0)) {
							p = -1;
							break
						}
						p = c[m >> 2] | 0;
						if ((p - l | 0) >= 160) {
							p = 0;
							break
						}
						l = c[n >> 2] | 0;
						c[m >> 2] = p + 4;
						c[p >> 2] = l;
						c[n >> 2] = 0;
						p = 0;
						break
					}
					j = o + 128 | 0;
					p = o;
					while (1) {
						if ((c[p >> 2] | 0) == (b | 0))
							break;
						p = p + 4 | 0;
						if ((p | 0) == (j | 0)) {
							p = j;
							break
						}
					}
					j = p - o | 0;
					p = j >> 2;
					if ((j | 0) <= 124) {
						i = a[22110 + p >> 0] | 0;
						switch (p | 0) {
						case 24:
						case 25: {
								p = c[h >> 2] | 0;
								if ((p | 0) != (g | 0) ? (d[p + -1 >> 0] & 95 | 0) != (d[f >> 0] & 127 | 0) : 0) {
									p = -1;
									break a
								}
								c[h >> 2] = p + 1;
								a[p >> 0] = i;
								p = 0;
								break a
							}
						case 23:
						case 22: {
								a[f >> 0] = 80;
								break
							}
						default: {
								p = i & 95;
								if ((((p | 0) == (a[f >> 0] | 0) ? (a[f >> 0] = p | 128, (a[e >> 0] | 0) != 0) : 0) ? (a[e >> 0] = 0, f = a[k >> 0] | 0, (((f & 1) == 0 ? (f & 255) >>> 1 : c[k + 4 >> 2] | 0) | 0) != 0) : 0) ? (q = c[m >> 2] | 0, (q - l | 0) < 160) : 0) {
									l = c[n >> 2] | 0;
									c[m >> 2] = q + 4;
									c[q >> 2] = l
								}
							}
						}
						m = c[h >> 2] | 0;
						c[h >> 2] = m + 1;
						a[m >> 0] = i;
						if ((j | 0) > 84)
							p = 0;
						else {
							c[n >> 2] = (c[n >> 2] | 0) + 1;
							p = 0
						}
					} else
						p = -1
				}
			while (0);
			return p | 0
		}
		function ul(a) {
			a = a | 0;
			return
		}
		function vl(a) {
			a = a | 0;
			ih(a);
			return
		}
		function wl(b, d, e, f, g) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0;
			n = i;
			i = i + 32 | 0;
			h = n + 20 | 0;
			j = n + 16 | 0;
			k = n + 12 | 0;
			m = n;
			if (!(c[e + 4 >> 2] & 1)) {
				m = c[(c[b >> 2] | 0) + 24 >> 2] | 0;
				c[j >> 2] = c[d >> 2];
				c[h >> 2] = c[j >> 2];
				h = Db[m & 31](b, h, e, f, g & 1) | 0
			} else {
				j = Tj(e) | 0;
				c[k >> 2] = j;
				h = Mo(k, 9492) | 0;
				cs(j) | 0;
				j = c[h >> 2] | 0;
				if (g)
					tb[c[j + 24 >> 2] & 127](m, h);
				else
					tb[c[j + 28 >> 2] & 127](m, h);
				f = a[m >> 0] | 0;
				l = (f & 1) == 0;
				h = m + 1 | 0;
				g = m + 8 | 0;
				b = l ? h : m + 1 | 0;
				h = l ? h : c[m + 8 >> 2] | 0;
				l = m + 4 | 0;
				e = (f & 1) == 0;
				if ((h | 0) != ((e ? b : c[g >> 2] | 0) + (e ? (f & 255) >>> 1 : c[l >> 2] | 0) | 0))
					do {
						j = a[h >> 0] | 0;
						k = c[d >> 2] | 0;
						do
							if (k) {
								e = k + 24 | 0;
								f = c[e >> 2] | 0;
								if ((f | 0) != (c[k + 28 >> 2] | 0)) {
									c[e >> 2] = f + 1;
									a[f >> 0] = j;
									break
								}
								if ((Cb[c[(c[k >> 2] | 0) + 52 >> 2] & 15](k, j & 255) | 0) == -1)
									c[d >> 2] = 0
							}
						while (0);
						h = h + 1 | 0;
						f = a[m >> 0] | 0;
						e = (f & 1) == 0
					} while ((h | 0) != ((e ? b : c[g >> 2] | 0) + (e ? (f & 255) >>> 1 : c[l >> 2] | 0) | 0));
				h = c[d >> 2] | 0;
				qj(m)
			}
			i = n;
			return h | 0
		}
		function xl(b, d, e, f, g) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0;
			h = i;
			i = i + 64 | 0;
			k = h;
			o = h + 56 | 0;
			q = h + 44 | 0;
			j = h + 20 | 0;
			m = h + 16 | 0;
			b = h + 12 | 0;
			n = h + 8 | 0;
			l = h + 4 | 0;
			a[o >> 0] = a[23499] | 0;
			a[o + 1 >> 0] = a[23500] | 0;
			a[o + 2 >> 0] = a[23501] | 0;
			a[o + 3 >> 0] = a[23502] | 0;
			a[o + 4 >> 0] = a[23503] | 0;
			a[o + 5 >> 0] = a[23504] | 0;
			yl(o + 1 | 0, 23505, 1, c[e + 4 >> 2] | 0);
			p = $k() | 0;
			c[k >> 2] = g;
			o = q + (Tq(q, 12, p, o, k) | 0) | 0;
			p = zl(q, o, e) | 0;
			g = Tj(e) | 0;
			c[n >> 2] = g;
			Al(q, p, o, j, m, b, n);
			cs(g) | 0;
			c[l >> 2] = c[d >> 2];
			d = c[m >> 2] | 0;
			b = c[b >> 2] | 0;
			c[k >> 2] = c[l >> 2];
			b = yf(k, j, d, b, e, f) | 0;
			i = h;
			return b | 0
		}
		function yl(b, c, d, e) {
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0;
			if (e & 2048) {
				a[b >> 0] = 43;
				b = b + 1 | 0
			}
			if (e & 512) {
				a[b >> 0] = 35;
				b = b + 1 | 0
			}
			f = a[c >> 0] | 0;
			if (f << 24 >> 24) {
				g = c;
				while (1) {
					g = g + 1 | 0;
					c = b + 1 | 0;
					a[b >> 0] = f;
					f = a[g >> 0] | 0;
					if (!(f << 24 >> 24)) {
						b = c;
						break
					} else
						b = c
				}
			}
			a : do
				switch (e & 74 | 0) {
				case 64: {
						a[b >> 0] = 111;
						break
					}
				case 8:
					if (!(e & 16384)) {
						a[b >> 0] = 120;
						break a
					} else {
						a[b >> 0] = 88;
						break a
					}
				default:
					if (d) {
						a[b >> 0] = 100;
						break a
					} else {
						a[b >> 0] = 117;
						break a
					}
				}
			while (0);
			return
		}
		function zl(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0;
			a : do
				switch (c[e + 4 >> 2] & 176 | 0) {
				case 16: {
						e = a[b >> 0] | 0;
						switch (e << 24 >> 24) {
						case 43:
						case 45: {
								d = b + 1 | 0;
								break a
							}
						default: {}

						}
						if ((d - b | 0) > 1 & e << 24 >> 24 == 48) {
							switch (a[b + 1 >> 0] | 0) {
							case 88:
							case 120:
								break;
							default: {
									f = 7;
									break a
								}
							}
							d = b + 2 | 0
						} else
							f = 7;
						break
					}
				case 32:
					break;
				default:
					f = 7
				}
			while (0);
			if ((f | 0) == 7)
				d = b;
			return d | 0
		}
		function Al(b, d, e, f, g, h, j) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0;
			t = i;
			i = i + 16 | 0;
			s = t;
			r = Mo(j, 9352) | 0;
			m = Mo(j, 9492) | 0;
			tb[c[(c[m >> 2] | 0) + 20 >> 2] & 127](s, m);
			p = a[s >> 0] | 0;
			q = s + 4 | 0;
			if (((p & 1) == 0 ? (p & 255) >>> 1 : c[q >> 2] | 0) | 0) {
				c[h >> 2] = f;
				j = a[b >> 0] | 0;
				switch (j << 24 >> 24) {
				case 43:
				case 45: {
						p = Cb[c[(c[r >> 2] | 0) + 28 >> 2] & 15](r, j) | 0;
						k = c[h >> 2] | 0;
						c[h >> 2] = k + 1;
						a[k >> 0] = p;
						k = b + 1 | 0;
						break
					}
				default:
					k = b
				}
				a : do
					if ((e - k | 0) > 1 ? (a[k >> 0] | 0) == 48 : 0) {
						j = k + 1 | 0;
						switch (a[j >> 0] | 0) {
						case 88:
						case 120:
							break;
						default:
							break a
						}
						p = Cb[c[(c[r >> 2] | 0) + 28 >> 2] & 15](r, 48) | 0;
						o = c[h >> 2] | 0;
						c[h >> 2] = o + 1;
						a[o >> 0] = p;
						o = Cb[c[(c[r >> 2] | 0) + 28 >> 2] & 15](r, a[j >> 0] | 0) | 0;
						p = c[h >> 2] | 0;
						c[h >> 2] = p + 1;
						a[p >> 0] = o;
						k = k + 2 | 0
					}
				while (0);
				if ((k | 0) != (e | 0) ? (n = e + -1 | 0, k >>> 0 < n >>> 0) : 0) {
					l = k;
					j = n;
					do {
						p = a[l >> 0] | 0;
						a[l >> 0] = a[j >> 0] | 0;
						a[j >> 0] = p;
						l = l + 1 | 0;
						j = j + -1 | 0
					} while (l >>> 0 < j >>> 0)
				}
				m = wb[c[(c[m >> 2] | 0) + 16 >> 2] & 127](m) | 0;
				n = s + 8 | 0;
				o = s + 1 | 0;
				if (k >>> 0 < e >>> 0) {
					l = 0;
					j = 0;
					p = k;
					while (1) {
						u = a[((a[s >> 0] & 1) == 0 ? o : c[n >> 2] | 0) + j >> 0] | 0;
						if (u << 24 >> 24 != 0 & (l | 0) == (u << 24 >> 24 | 0)) {
							u = c[h >> 2] | 0;
							c[h >> 2] = u + 1;
							a[u >> 0] = m;
							u = a[s >> 0] | 0;
							l = 0;
							j = (j >>> 0 < (((u & 1) == 0 ? (u & 255) >>> 1 : c[q >> 2] | 0) + -1 | 0) >>> 0 & 1) + j | 0
						}
						v = Cb[c[(c[r >> 2] | 0) + 28 >> 2] & 15](r, a[p >> 0] | 0) | 0;
						u = c[h >> 2] | 0;
						c[h >> 2] = u + 1;
						a[u >> 0] = v;
						p = p + 1 | 0;
						if (p >>> 0 >= e >>> 0)
							break;
						else
							l = l + 1 | 0
					}
				}
				j = f + (k - b) | 0;
				k = c[h >> 2] | 0;
				if ((j | 0) != (k | 0)) {
					k = k + -1 | 0;
					if (j >>> 0 < k >>> 0)
						do {
							v = a[j >> 0] | 0;
							a[j >> 0] = a[k >> 0] | 0;
							a[k >> 0] = v;
							j = j + 1 | 0;
							k = k + -1 | 0
						} while (j >>> 0 < k >>> 0);
					j = c[h >> 2] | 0
				}
			} else {
				Ab[c[(c[r >> 2] | 0) + 32 >> 2] & 7](r, b, e, f) | 0;
				j = f + (e - b) | 0;
				c[h >> 2] = j
			}
			c[g >> 2] = (d | 0) == (e | 0) ? j : f + (d - b) | 0;
			qj(s);
			i = t;
			return
		}
		function Bl(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0;
			h = i;
			i = i + 96 | 0;
			k = h + 8 | 0;
			o = h;
			p = h + 74 | 0;
			j = h + 32 | 0;
			m = h + 28 | 0;
			a = h + 24 | 0;
			n = h + 20 | 0;
			l = h + 16 | 0;
			q = o;
			c[q >> 2] = 37;
			c[q + 4 >> 2] = 0;
			yl(o + 1 | 0, 23507, 1, c[d + 4 >> 2] | 0);
			q = $k() | 0;
			r = k;
			c[r >> 2] = f;
			c[r + 4 >> 2] = g;
			f = p + (Tq(p, 22, q, o, k) | 0) | 0;
			o = zl(p, f, d) | 0;
			g = Tj(d) | 0;
			c[n >> 2] = g;
			Al(p, o, f, j, m, a, n);
			cs(g) | 0;
			c[l >> 2] = c[b >> 2];
			b = c[m >> 2] | 0;
			a = c[a >> 2] | 0;
			c[k >> 2] = c[l >> 2];
			a = yf(k, j, b, a, d, e) | 0;
			i = h;
			return a | 0
		}
		function Cl(b, d, e, f, g) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0;
			h = i;
			i = i + 64 | 0;
			k = h;
			o = h + 56 | 0;
			q = h + 44 | 0;
			j = h + 20 | 0;
			m = h + 16 | 0;
			b = h + 12 | 0;
			n = h + 8 | 0;
			l = h + 4 | 0;
			a[o >> 0] = a[23499] | 0;
			a[o + 1 >> 0] = a[23500] | 0;
			a[o + 2 >> 0] = a[23501] | 0;
			a[o + 3 >> 0] = a[23502] | 0;
			a[o + 4 >> 0] = a[23503] | 0;
			a[o + 5 >> 0] = a[23504] | 0;
			yl(o + 1 | 0, 23505, 0, c[e + 4 >> 2] | 0);
			p = $k() | 0;
			c[k >> 2] = g;
			o = q + (Tq(q, 12, p, o, k) | 0) | 0;
			p = zl(q, o, e) | 0;
			g = Tj(e) | 0;
			c[n >> 2] = g;
			Al(q, p, o, j, m, b, n);
			cs(g) | 0;
			c[l >> 2] = c[d >> 2];
			d = c[m >> 2] | 0;
			b = c[b >> 2] | 0;
			c[k >> 2] = c[l >> 2];
			b = yf(k, j, d, b, e, f) | 0;
			i = h;
			return b | 0
		}
		function Dl(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0;
			h = i;
			i = i + 112 | 0;
			k = h + 8 | 0;
			o = h;
			p = h + 75 | 0;
			j = h + 32 | 0;
			m = h + 28 | 0;
			a = h + 24 | 0;
			n = h + 20 | 0;
			l = h + 16 | 0;
			q = o;
			c[q >> 2] = 37;
			c[q + 4 >> 2] = 0;
			yl(o + 1 | 0, 23507, 0, c[d + 4 >> 2] | 0);
			q = $k() | 0;
			r = k;
			c[r >> 2] = f;
			c[r + 4 >> 2] = g;
			f = p + (Tq(p, 23, q, o, k) | 0) | 0;
			o = zl(p, f, d) | 0;
			g = Tj(d) | 0;
			c[n >> 2] = g;
			Al(p, o, f, j, m, a, n);
			cs(g) | 0;
			c[l >> 2] = c[b >> 2];
			b = c[m >> 2] | 0;
			a = c[a >> 2] | 0;
			c[k >> 2] = c[l >> 2];
			a = yf(k, j, b, a, d, e) | 0;
			i = h;
			return a | 0
		}
		function El(a, b, d, e, f) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = +f;
			var g = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0;
			v = i;
			i = i + 160 | 0;
			p = v + 68 | 0;
			l = v + 32 | 0;
			j = v + 24 | 0;
			g = v + 8 | 0;
			k = v;
			n = v + 72 | 0;
			m = v + 64 | 0;
			o = v + 102 | 0;
			s = v + 60 | 0;
			u = v + 56 | 0;
			q = v + 52 | 0;
			r = v + 48 | 0;
			B = k;
			c[B >> 2] = 37;
			c[B + 4 >> 2] = 0;
			B = Fl(k + 1 | 0, 23510, c[d + 4 >> 2] | 0) | 0;
			c[m >> 2] = n;
			a = $k() | 0;
			if (B) {
				c[g >> 2] = c[d + 8 >> 2];
				h[g + 8 >> 3] = f;
				a = Tq(n, 30, a, k, g) | 0
			} else {
				h[j >> 3] = f;
				a = Tq(n, 30, a, k, j) | 0
			}
			if ((a | 0) > 29) {
				g = $k() | 0;
				c[l >> 2] = c[d + 8 >> 2];
				h[l + 8 >> 3] = f;
				g = Uq(m, g, k, l) | 0;
				a = c[m >> 2] | 0;
				if (!a)
					Nh();
				else {
					w = a;
					z = a;
					t = g
				}
			} else {
				w = c[m >> 2] | 0;
				z = 0;
				t = a
			}
			g = w + t | 0;
			j = zl(w, g, d) | 0;
			if ((w | 0) != (n | 0)) {
				a = fj(t << 1) | 0;
				if (!a)
					Nh();
				else {
					x = w;
					y = a;
					A = a
				}
			} else {
				x = n;
				y = 0;
				A = o
			}
			B = Tj(d) | 0;
			c[q >> 2] = B;
			Gl(x, j, g, A, s, u, q);
			cs(B) | 0;
			c[r >> 2] = c[b >> 2];
			b = c[s >> 2] | 0;
			B = c[u >> 2] | 0;
			c[p >> 2] = c[r >> 2];
			B = yf(p, A, b, B, d, e) | 0;
			gj(y);
			gj(z);
			i = v;
			return B | 0
		}
		function Fl(b, c, d) {
			b = b | 0;
			c = c | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0;
			if (d & 2048) {
				a[b >> 0] = 43;
				b = b + 1 | 0
			}
			if (d & 1024) {
				a[b >> 0] = 35;
				b = b + 1 | 0
			}
			h = d & 260;
			f = d >>> 14;
			i = (h | 0) == 260;
			if (i)
				g = 0;
			else {
				a[b >> 0] = 46;
				a[b + 1 >> 0] = 42;
				b = b + 2 | 0;
				g = 1
			}
			d = a[c >> 0] | 0;
			if (d << 24 >> 24) {
				e = b;
				while (1) {
					c = c + 1 | 0;
					b = e + 1 | 0;
					a[e >> 0] = d;
					d = a[c >> 0] | 0;
					if (!(d << 24 >> 24))
						break;
					else
						e = b
				}
			}
			a : do
				switch (h | 0) {
				case 4:
					if (!(f & 1)) {
						a[b >> 0] = 102;
						break a
					} else {
						a[b >> 0] = 70;
						break a
					}
				case 256:
					if (!(f & 1)) {
						a[b >> 0] = 101;
						break a
					} else {
						a[b >> 0] = 69;
						break a
					}
				default: {
						d = (f & 1 | 0) != 0;
						if (i)
							if (d) {
								a[b >> 0] = 65;
								break a
							} else {
								a[b >> 0] = 97;
								break a
							}
						else if (d) {
							a[b >> 0] = 71;
							break a
						} else {
							a[b >> 0] = 103;
							break a
						}
					}
				}
			while (0);
			return g | 0
		}
		function Gl(b, d, e, f, g, h, j) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0;
			x = i;
			i = i + 16 | 0;
			w = x;
			v = Mo(j, 9352) | 0;
			t = Mo(j, 9492) | 0;
			tb[c[(c[t >> 2] | 0) + 20 >> 2] & 127](w, t);
			c[h >> 2] = f;
			j = a[b >> 0] | 0;
			switch (j << 24 >> 24) {
			case 43:
			case 45: {
					u = Cb[c[(c[v >> 2] | 0) + 28 >> 2] & 15](v, j) | 0;
					m = c[h >> 2] | 0;
					c[h >> 2] = m + 1;
					a[m >> 0] = u;
					m = b + 1 | 0;
					break
				}
			default:
				m = b
			}
			u = e;
			a : do
				if ((u - m | 0) > 1 ? (a[m >> 0] | 0) == 48 : 0) {
					j = m + 1 | 0;
					switch (a[j >> 0] | 0) {
					case 88:
					case 120:
						break;
					default: {
							n = 4;
							break a
						}
					}
					s = Cb[c[(c[v >> 2] | 0) + 28 >> 2] & 15](v, 48) | 0;
					r = c[h >> 2] | 0;
					c[h >> 2] = r + 1;
					a[r >> 0] = s;
					m = m + 2 | 0;
					r = Cb[c[(c[v >> 2] | 0) + 28 >> 2] & 15](v, a[j >> 0] | 0) | 0;
					s = c[h >> 2] | 0;
					c[h >> 2] = s + 1;
					a[s >> 0] = r;
					if (m >>> 0 < e >>> 0) {
						j = m;
						while (1) {
							s = a[j >> 0] | 0;
							if (!(ei(s, $k() | 0) | 0)) {
								s = m;
								break a
							}
							j = j + 1 | 0;
							if (j >>> 0 >= e >>> 0) {
								s = m;
								break
							}
						}
					} else {
						s = m;
						j = m
					}
				} else
					n = 4;
			while (0);
			b : do
				if ((n | 0) == 4)
					if (m >>> 0 < e >>> 0) {
						j = m;
						while (1) {
							s = a[j >> 0] | 0;
							if (!(di(s, $k() | 0) | 0)) {
								s = m;
								break b
							}
							j = j + 1 | 0;
							if (j >>> 0 >= e >>> 0) {
								s = m;
								break
							}
						}
					} else {
						s = m;
						j = m
					}
			while (0);
			q = a[w >> 0] | 0;
			r = w + 4 | 0;
			if (((q & 1) == 0 ? (q & 255) >>> 1 : c[r >> 2] | 0) | 0) {
				if ((s | 0) != (j | 0) ? (l = j + -1 | 0, s >>> 0 < l >>> 0) : 0) {
					m = s;
					do {
						q = a[m >> 0] | 0;
						a[m >> 0] = a[l >> 0] | 0;
						a[l >> 0] = q;
						m = m + 1 | 0;
						l = l + -1 | 0
					} while (m >>> 0 < l >>> 0)
				}
				n = wb[c[(c[t >> 2] | 0) + 16 >> 2] & 127](t) | 0;
				o = w + 8 | 0;
				p = w + 1 | 0;
				if (s >>> 0 < j >>> 0) {
					l = 0;
					m = 0;
					q = s;
					while (1) {
						y = a[((a[w >> 0] & 1) == 0 ? p : c[o >> 2] | 0) + m >> 0] | 0;
						if (y << 24 >> 24 > 0 & (l | 0) == (y << 24 >> 24 | 0)) {
							y = c[h >> 2] | 0;
							c[h >> 2] = y + 1;
							a[y >> 0] = n;
							y = a[w >> 0] | 0;
							l = 0;
							m = (m >>> 0 < (((y & 1) == 0 ? (y & 255) >>> 1 : c[r >> 2] | 0) + -1 | 0) >>> 0 & 1) + m | 0
						}
						z = Cb[c[(c[v >> 2] | 0) + 28 >> 2] & 15](v, a[q >> 0] | 0) | 0;
						y = c[h >> 2] | 0;
						c[h >> 2] = y + 1;
						a[y >> 0] = z;
						q = q + 1 | 0;
						if (q >>> 0 >= j >>> 0)
							break;
						else
							l = l + 1 | 0
					}
				}
				l = f + (s - b) | 0;
				m = c[h >> 2] | 0;
				if ((l | 0) != (m | 0) ? (k = m + -1 | 0, l >>> 0 < k >>> 0) : 0) {
					do {
						z = a[l >> 0] | 0;
						a[l >> 0] = a[k >> 0] | 0;
						a[k >> 0] = z;
						l = l + 1 | 0;
						k = k + -1 | 0
					} while (l >>> 0 < k >>> 0);
					l = v
				} else
					l = v
			} else {
				Ab[c[(c[v >> 2] | 0) + 32 >> 2] & 7](v, s, j, c[h >> 2] | 0) | 0;
				c[h >> 2] = (c[h >> 2] | 0) + (j - s);
				l = v
			}
			c : do
				if (j >>> 0 < e >>> 0) {
					while (1) {
						k = a[j >> 0] | 0;
						if (k << 24 >> 24 == 46)
							break;
						y = Cb[c[(c[l >> 2] | 0) + 28 >> 2] & 15](v, k) | 0;
						z = c[h >> 2] | 0;
						c[h >> 2] = z + 1;
						a[z >> 0] = y;
						j = j + 1 | 0;
						if (j >>> 0 >= e >>> 0)
							break c
					}
					y = wb[c[(c[t >> 2] | 0) + 12 >> 2] & 127](t) | 0;
					z = c[h >> 2] | 0;
					c[h >> 2] = z + 1;
					a[z >> 0] = y;
					j = j + 1 | 0
				}
			while (0);
			Ab[c[(c[v >> 2] | 0) + 32 >> 2] & 7](v, j, e, c[h >> 2] | 0) | 0;
			z = (c[h >> 2] | 0) + (u - j) | 0;
			c[h >> 2] = z;
			c[g >> 2] = (d | 0) == (e | 0) ? z : f + (d - b) | 0;
			qj(w);
			i = x;
			return
		}
		function Hl(a, b, d, e, f) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = +f;
			var g = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0;
			x = i;
			i = i + 176 | 0;
			r = x + 76 | 0;
			n = x + 48 | 0;
			m = x + 32 | 0;
			j = x + 24 | 0;
			g = x + 8 | 0;
			l = x;
			p = x + 80 | 0;
			o = x + 72 | 0;
			q = x + 110 | 0;
			u = x + 68 | 0;
			w = x + 64 | 0;
			s = x + 60 | 0;
			t = x + 56 | 0;
			k = l;
			c[k >> 2] = 37;
			c[k + 4 >> 2] = 0;
			k = Fl(l + 1 | 0, 23511, c[d + 4 >> 2] | 0) | 0;
			c[o >> 2] = p;
			a = $k() | 0;
			if (k) {
				c[g >> 2] = c[d + 8 >> 2];
				h[g + 8 >> 3] = f;
				a = Tq(p, 30, a, l, g) | 0
			} else {
				h[j >> 3] = f;
				a = Tq(p, 30, a, l, j) | 0
			}
			if ((a | 0) > 29) {
				a = $k() | 0;
				if (k) {
					c[m >> 2] = c[d + 8 >> 2];
					h[m + 8 >> 3] = f;
					g = Uq(o, a, l, m) | 0
				} else {
					h[n >> 3] = f;
					g = Uq(o, a, l, n) | 0
				}
				a = c[o >> 2] | 0;
				if (!a)
					Nh();
				else {
					y = a;
					B = a;
					v = g
				}
			} else {
				y = c[o >> 2] | 0;
				B = 0;
				v = a
			}
			g = y + v | 0;
			j = zl(y, g, d) | 0;
			if ((y | 0) != (p | 0)) {
				a = fj(v << 1) | 0;
				if (!a)
					Nh();
				else {
					z = y;
					A = a;
					C = a
				}
			} else {
				z = p;
				A = 0;
				C = q
			}
			y = Tj(d) | 0;
			c[s >> 2] = y;
			Gl(z, j, g, C, u, w, s);
			cs(y) | 0;
			c[t >> 2] = c[b >> 2];
			z = c[u >> 2] | 0;
			b = c[w >> 2] | 0;
			c[r >> 2] = c[t >> 2];
			b = yf(r, C, z, b, d, e) | 0;
			gj(A);
			gj(B);
			i = x;
			return b | 0
		}
		function Il(b, d, e, f, g) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0;
			h = i;
			i = i + 80 | 0;
			m = h;
			b = h + 70 | 0;
			j = h + 12 | 0;
			k = h + 32 | 0;
			o = h + 8 | 0;
			n = h + 4 | 0;
			a[b >> 0] = a[23513] | 0;
			a[b + 1 >> 0] = a[23514] | 0;
			a[b + 2 >> 0] = a[23515] | 0;
			a[b + 3 >> 0] = a[23516] | 0;
			a[b + 4 >> 0] = a[23517] | 0;
			a[b + 5 >> 0] = a[23518] | 0;
			l = $k() | 0;
			c[m >> 2] = g;
			b = Tq(j, 20, l, b, m) | 0;
			l = j + b | 0;
			g = zl(j, l, e) | 0;
			p = Tj(e) | 0;
			c[o >> 2] = p;
			o = Mo(o, 9352) | 0;
			cs(p) | 0;
			Ab[c[(c[o >> 2] | 0) + 32 >> 2] & 7](o, j, l, k) | 0;
			b = k + b | 0;
			c[n >> 2] = c[d >> 2];
			c[m >> 2] = c[n >> 2];
			b = yf(m, k, (g | 0) == (l | 0) ? b : k + (g - j) | 0, b, e, f) | 0;
			i = h;
			return b | 0
		}
		function Jl(a) {
			a = a | 0;
			return
		}
		function Kl(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Ll(b, d, e, f, g) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			m = i;
			i = i + 32 | 0;
			h = m + 20 | 0;
			j = m + 16 | 0;
			k = m + 12 | 0;
			l = m;
			if (!(c[e + 4 >> 2] & 1)) {
				l = c[(c[b >> 2] | 0) + 24 >> 2] | 0;
				c[j >> 2] = c[d >> 2];
				c[h >> 2] = c[j >> 2];
				h = Db[l & 31](b, h, e, f, g & 1) | 0
			} else {
				j = Tj(e) | 0;
				c[k >> 2] = j;
				h = Mo(k, 9500) | 0;
				cs(j) | 0;
				j = c[h >> 2] | 0;
				if (g)
					tb[c[j + 24 >> 2] & 127](l, h);
				else
					tb[c[j + 28 >> 2] & 127](l, h);
				f = a[l >> 0] | 0;
				e = (f & 1) == 0;
				h = l + 4 | 0;
				g = l + 8 | 0;
				b = e ? h : l + 4 | 0;
				h = e ? h : c[l + 8 >> 2] | 0;
				e = (f & 1) == 0;
				if ((h | 0) != ((e ? b : c[g >> 2] | 0) + ((e ? (f & 255) >>> 1 : c[b >> 2] | 0) << 2) | 0))
					do {
						j = c[h >> 2] | 0;
						k = c[d >> 2] | 0;
						if (k) {
							e = k + 24 | 0;
							f = c[e >> 2] | 0;
							if ((f | 0) == (c[k + 28 >> 2] | 0))
								j = Cb[c[(c[k >> 2] | 0) + 52 >> 2] & 15](k, j) | 0;
							else {
								c[e >> 2] = f + 4;
								c[f >> 2] = j
							}
							if ((j | 0) == -1)
								c[d >> 2] = 0
						}
						h = h + 4 | 0;
						f = a[l >> 0] | 0;
						e = (f & 1) == 0
					} while ((h | 0) != ((e ? b : c[g >> 2] | 0) + ((e ? (f & 255) >>> 1 : c[b >> 2] | 0) << 2) | 0));
				h = c[d >> 2] | 0;
				Fj(l)
			}
			i = m;
			return h | 0
		}
		function Ml(b, d, e, f, g) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0;
			h = i;
			i = i + 128 | 0;
			k = h;
			o = h + 116 | 0;
			q = h + 104 | 0;
			j = h + 20 | 0;
			m = h + 16 | 0;
			b = h + 12 | 0;
			n = h + 8 | 0;
			l = h + 4 | 0;
			a[o >> 0] = a[23499] | 0;
			a[o + 1 >> 0] = a[23500] | 0;
			a[o + 2 >> 0] = a[23501] | 0;
			a[o + 3 >> 0] = a[23502] | 0;
			a[o + 4 >> 0] = a[23503] | 0;
			a[o + 5 >> 0] = a[23504] | 0;
			yl(o + 1 | 0, 23505, 1, c[e + 4 >> 2] | 0);
			p = $k() | 0;
			c[k >> 2] = g;
			o = q + (Tq(q, 12, p, o, k) | 0) | 0;
			p = zl(q, o, e) | 0;
			g = Tj(e) | 0;
			c[n >> 2] = g;
			Nl(q, p, o, j, m, b, n);
			cs(g) | 0;
			c[l >> 2] = c[d >> 2];
			d = c[m >> 2] | 0;
			b = c[b >> 2] | 0;
			c[k >> 2] = c[l >> 2];
			b = Vq(k, j, d, b, e, f) | 0;
			i = h;
			return b | 0
		}
		function Nl(b, d, e, f, g, h, j) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0;
			t = i;
			i = i + 16 | 0;
			s = t;
			r = Mo(j, 9344) | 0;
			m = Mo(j, 9500) | 0;
			tb[c[(c[m >> 2] | 0) + 20 >> 2] & 127](s, m);
			p = a[s >> 0] | 0;
			q = s + 4 | 0;
			if (((p & 1) == 0 ? (p & 255) >>> 1 : c[q >> 2] | 0) | 0) {
				c[h >> 2] = f;
				j = a[b >> 0] | 0;
				switch (j << 24 >> 24) {
				case 43:
				case 45: {
						p = Cb[c[(c[r >> 2] | 0) + 44 >> 2] & 15](r, j) | 0;
						k = c[h >> 2] | 0;
						c[h >> 2] = k + 4;
						c[k >> 2] = p;
						k = b + 1 | 0;
						break
					}
				default:
					k = b
				}
				a : do
					if ((e - k | 0) > 1 ? (a[k >> 0] | 0) == 48 : 0) {
						j = k + 1 | 0;
						switch (a[j >> 0] | 0) {
						case 88:
						case 120:
							break;
						default:
							break a
						}
						p = Cb[c[(c[r >> 2] | 0) + 44 >> 2] & 15](r, 48) | 0;
						o = c[h >> 2] | 0;
						c[h >> 2] = o + 4;
						c[o >> 2] = p;
						o = Cb[c[(c[r >> 2] | 0) + 44 >> 2] & 15](r, a[j >> 0] | 0) | 0;
						p = c[h >> 2] | 0;
						c[h >> 2] = p + 4;
						c[p >> 2] = o;
						k = k + 2 | 0
					}
				while (0);
				if ((k | 0) != (e | 0) ? (n = e + -1 | 0, k >>> 0 < n >>> 0) : 0) {
					l = k;
					j = n;
					do {
						p = a[l >> 0] | 0;
						a[l >> 0] = a[j >> 0] | 0;
						a[j >> 0] = p;
						l = l + 1 | 0;
						j = j + -1 | 0
					} while (l >>> 0 < j >>> 0)
				}
				m = wb[c[(c[m >> 2] | 0) + 16 >> 2] & 127](m) | 0;
				n = s + 8 | 0;
				o = s + 1 | 0;
				if (k >>> 0 < e >>> 0) {
					l = 0;
					j = 0;
					p = k;
					while (1) {
						u = a[((a[s >> 0] & 1) == 0 ? o : c[n >> 2] | 0) + j >> 0] | 0;
						if (u << 24 >> 24 != 0 & (l | 0) == (u << 24 >> 24 | 0)) {
							u = c[h >> 2] | 0;
							c[h >> 2] = u + 4;
							c[u >> 2] = m;
							u = a[s >> 0] | 0;
							l = 0;
							j = (j >>> 0 < (((u & 1) == 0 ? (u & 255) >>> 1 : c[q >> 2] | 0) + -1 | 0) >>> 0 & 1) + j | 0
						}
						v = Cb[c[(c[r >> 2] | 0) + 44 >> 2] & 15](r, a[p >> 0] | 0) | 0;
						u = c[h >> 2] | 0;
						c[h >> 2] = u + 4;
						c[u >> 2] = v;
						p = p + 1 | 0;
						if (p >>> 0 >= e >>> 0)
							break;
						else
							l = l + 1 | 0
					}
				}
				j = f + (k - b << 2) | 0;
				l = c[h >> 2] | 0;
				if ((j | 0) != (l | 0)) {
					k = l + -4 | 0;
					if (j >>> 0 < k >>> 0) {
						do {
							v = c[j >> 2] | 0;
							c[j >> 2] = c[k >> 2];
							c[k >> 2] = v;
							j = j + 4 | 0;
							k = k + -4 | 0
						} while (j >>> 0 < k >>> 0);
						j = l
					} else
						j = l
				}
			} else {
				Ab[c[(c[r >> 2] | 0) + 48 >> 2] & 7](r, b, e, f) | 0;
				j = f + (e - b << 2) | 0;
				c[h >> 2] = j
			}
			c[g >> 2] = (d | 0) == (e | 0) ? j : f + (d - b << 2) | 0;
			qj(s);
			i = t;
			return
		}
		function Ol(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0;
			h = i;
			i = i + 224 | 0;
			k = h + 8 | 0;
			o = h;
			p = h + 196 | 0;
			j = h + 32 | 0;
			m = h + 28 | 0;
			a = h + 24 | 0;
			n = h + 20 | 0;
			l = h + 16 | 0;
			q = o;
			c[q >> 2] = 37;
			c[q + 4 >> 2] = 0;
			yl(o + 1 | 0, 23507, 1, c[d + 4 >> 2] | 0);
			q = $k() | 0;
			r = k;
			c[r >> 2] = f;
			c[r + 4 >> 2] = g;
			f = p + (Tq(p, 22, q, o, k) | 0) | 0;
			o = zl(p, f, d) | 0;
			g = Tj(d) | 0;
			c[n >> 2] = g;
			Nl(p, o, f, j, m, a, n);
			cs(g) | 0;
			c[l >> 2] = c[b >> 2];
			b = c[m >> 2] | 0;
			a = c[a >> 2] | 0;
			c[k >> 2] = c[l >> 2];
			a = Vq(k, j, b, a, d, e) | 0;
			i = h;
			return a | 0
		}
		function Pl(b, d, e, f, g) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0;
			h = i;
			i = i + 128 | 0;
			k = h;
			o = h + 116 | 0;
			q = h + 104 | 0;
			j = h + 20 | 0;
			m = h + 16 | 0;
			b = h + 12 | 0;
			n = h + 8 | 0;
			l = h + 4 | 0;
			a[o >> 0] = a[23499] | 0;
			a[o + 1 >> 0] = a[23500] | 0;
			a[o + 2 >> 0] = a[23501] | 0;
			a[o + 3 >> 0] = a[23502] | 0;
			a[o + 4 >> 0] = a[23503] | 0;
			a[o + 5 >> 0] = a[23504] | 0;
			yl(o + 1 | 0, 23505, 0, c[e + 4 >> 2] | 0);
			p = $k() | 0;
			c[k >> 2] = g;
			o = q + (Tq(q, 12, p, o, k) | 0) | 0;
			p = zl(q, o, e) | 0;
			g = Tj(e) | 0;
			c[n >> 2] = g;
			Nl(q, p, o, j, m, b, n);
			cs(g) | 0;
			c[l >> 2] = c[d >> 2];
			d = c[m >> 2] | 0;
			b = c[b >> 2] | 0;
			c[k >> 2] = c[l >> 2];
			b = Vq(k, j, d, b, e, f) | 0;
			i = h;
			return b | 0
		}
		function Ql(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0;
			h = i;
			i = i + 240 | 0;
			k = h + 8 | 0;
			o = h;
			p = h + 204 | 0;
			j = h + 32 | 0;
			m = h + 28 | 0;
			a = h + 24 | 0;
			n = h + 20 | 0;
			l = h + 16 | 0;
			q = o;
			c[q >> 2] = 37;
			c[q + 4 >> 2] = 0;
			yl(o + 1 | 0, 23507, 0, c[d + 4 >> 2] | 0);
			q = $k() | 0;
			r = k;
			c[r >> 2] = f;
			c[r + 4 >> 2] = g;
			f = p + (Tq(p, 23, q, o, k) | 0) | 0;
			o = zl(p, f, d) | 0;
			g = Tj(d) | 0;
			c[n >> 2] = g;
			Nl(p, o, f, j, m, a, n);
			cs(g) | 0;
			c[l >> 2] = c[b >> 2];
			b = c[m >> 2] | 0;
			a = c[a >> 2] | 0;
			c[k >> 2] = c[l >> 2];
			a = Vq(k, j, b, a, d, e) | 0;
			i = h;
			return a | 0
		}
		function Rl(a, b, d, e, f) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = +f;
			var g = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0;
			y = i;
			i = i + 336 | 0;
			p = y + 296 | 0;
			l = y + 32 | 0;
			j = y + 24 | 0;
			g = y + 8 | 0;
			k = y;
			n = y + 300 | 0;
			m = y + 64 | 0;
			o = y + 68 | 0;
			s = y + 60 | 0;
			u = y + 56 | 0;
			q = y + 52 | 0;
			r = y + 48 | 0;
			B = k;
			c[B >> 2] = 37;
			c[B + 4 >> 2] = 0;
			B = Fl(k + 1 | 0, 23510, c[d + 4 >> 2] | 0) | 0;
			c[m >> 2] = n;
			a = $k() | 0;
			if (B) {
				c[g >> 2] = c[d + 8 >> 2];
				h[g + 8 >> 3] = f;
				a = Tq(n, 30, a, k, g) | 0
			} else {
				h[j >> 3] = f;
				a = Tq(n, 30, a, k, j) | 0
			}
			if ((a | 0) > 29) {
				g = $k() | 0;
				c[l >> 2] = c[d + 8 >> 2];
				h[l + 8 >> 3] = f;
				g = Uq(m, g, k, l) | 0;
				a = c[m >> 2] | 0;
				if (!a)
					Nh();
				else {
					v = a;
					A = a;
					t = g
				}
			} else {
				v = c[m >> 2] | 0;
				A = 0;
				t = a
			}
			g = v + t | 0;
			j = zl(v, g, d) | 0;
			if ((v | 0) != (n | 0)) {
				a = fj(t << 3) | 0;
				if (!a)
					Nh();
				else {
					w = v;
					z = a;
					x = a
				}
			} else {
				w = n;
				z = 0;
				x = o
			}
			B = Tj(d) | 0;
			c[q >> 2] = B;
			Sl(w, j, g, x, s, u, q);
			cs(B) | 0;
			c[r >> 2] = c[b >> 2];
			B = c[s >> 2] | 0;
			a = c[u >> 2] | 0;
			c[p >> 2] = c[r >> 2];
			a = Vq(p, x, B, a, d, e) | 0;
			c[b >> 2] = a;
			if (z)
				gj(z);
			gj(A);
			i = y;
			return a | 0
		}
		function Sl(b, d, e, f, g, h, j) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0;
			w = i;
			i = i + 16 | 0;
			v = w;
			u = Mo(j, 9344) | 0;
			s = Mo(j, 9500) | 0;
			tb[c[(c[s >> 2] | 0) + 20 >> 2] & 127](v, s);
			c[h >> 2] = f;
			j = a[b >> 0] | 0;
			switch (j << 24 >> 24) {
			case 43:
			case 45: {
					t = Cb[c[(c[u >> 2] | 0) + 44 >> 2] & 15](u, j) | 0;
					l = c[h >> 2] | 0;
					c[h >> 2] = l + 4;
					c[l >> 2] = t;
					l = b + 1 | 0;
					break
				}
			default:
				l = b
			}
			t = e;
			a : do
				if ((t - l | 0) > 1 ? (a[l >> 0] | 0) == 48 : 0) {
					j = l + 1 | 0;
					switch (a[j >> 0] | 0) {
					case 88:
					case 120:
						break;
					default: {
							m = 4;
							break a
						}
					}
					r = Cb[c[(c[u >> 2] | 0) + 44 >> 2] & 15](u, 48) | 0;
					q = c[h >> 2] | 0;
					c[h >> 2] = q + 4;
					c[q >> 2] = r;
					l = l + 2 | 0;
					q = Cb[c[(c[u >> 2] | 0) + 44 >> 2] & 15](u, a[j >> 0] | 0) | 0;
					r = c[h >> 2] | 0;
					c[h >> 2] = r + 4;
					c[r >> 2] = q;
					if (l >>> 0 < e >>> 0) {
						j = l;
						while (1) {
							r = a[j >> 0] | 0;
							if (!(ei(r, $k() | 0) | 0)) {
								r = l;
								break a
							}
							j = j + 1 | 0;
							if (j >>> 0 >= e >>> 0) {
								r = l;
								break
							}
						}
					} else {
						r = l;
						j = l
					}
				} else
					m = 4;
			while (0);
			b : do
				if ((m | 0) == 4)
					if (l >>> 0 < e >>> 0) {
						j = l;
						while (1) {
							r = a[j >> 0] | 0;
							if (!(di(r, $k() | 0) | 0)) {
								r = l;
								break b
							}
							j = j + 1 | 0;
							if (j >>> 0 >= e >>> 0) {
								r = l;
								break
							}
						}
					} else {
						r = l;
						j = l
					}
			while (0);
			p = a[v >> 0] | 0;
			q = v + 4 | 0;
			if (((p & 1) == 0 ? (p & 255) >>> 1 : c[q >> 2] | 0) | 0) {
				if ((r | 0) != (j | 0) ? (k = j + -1 | 0, r >>> 0 < k >>> 0) : 0) {
					l = r;
					do {
						p = a[l >> 0] | 0;
						a[l >> 0] = a[k >> 0] | 0;
						a[k >> 0] = p;
						l = l + 1 | 0;
						k = k + -1 | 0
					} while (l >>> 0 < k >>> 0)
				}
				m = wb[c[(c[s >> 2] | 0) + 16 >> 2] & 127](s) | 0;
				n = v + 8 | 0;
				o = v + 1 | 0;
				if (r >>> 0 < j >>> 0) {
					l = 0;
					k = 0;
					p = r;
					while (1) {
						x = a[((a[v >> 0] & 1) == 0 ? o : c[n >> 2] | 0) + k >> 0] | 0;
						if (x << 24 >> 24 > 0 & (l | 0) == (x << 24 >> 24 | 0)) {
							x = c[h >> 2] | 0;
							c[h >> 2] = x + 4;
							c[x >> 2] = m;
							x = a[v >> 0] | 0;
							l = 0;
							k = (k >>> 0 < (((x & 1) == 0 ? (x & 255) >>> 1 : c[q >> 2] | 0) + -1 | 0) >>> 0 & 1) + k | 0
						}
						y = Cb[c[(c[u >> 2] | 0) + 44 >> 2] & 15](u, a[p >> 0] | 0) | 0;
						x = c[h >> 2] | 0;
						c[h >> 2] = x + 4;
						c[x >> 2] = y;
						p = p + 1 | 0;
						if (p >>> 0 >= j >>> 0)
							break;
						else
							l = l + 1 | 0
					}
				}
				k = f + (r - b << 2) | 0;
				m = c[h >> 2] | 0;
				if ((k | 0) != (m | 0)) {
					l = m + -4 | 0;
					if (k >>> 0 < l >>> 0) {
						do {
							y = c[k >> 2] | 0;
							c[k >> 2] = c[l >> 2];
							c[l >> 2] = y;
							k = k + 4 | 0;
							l = l + -4 | 0
						} while (k >>> 0 < l >>> 0);
						l = u;
						k = m
					} else {
						l = u;
						k = m
					}
				} else
					l = u
			} else {
				Ab[c[(c[u >> 2] | 0) + 48 >> 2] & 7](u, r, j, c[h >> 2] | 0) | 0;
				k = (c[h >> 2] | 0) + (j - r << 2) | 0;
				c[h >> 2] = k;
				l = u
			}
			c : do
				if (j >>> 0 < e >>> 0) {
					while (1) {
						k = a[j >> 0] | 0;
						if (k << 24 >> 24 == 46)
							break;
						x = Cb[c[(c[l >> 2] | 0) + 44 >> 2] & 15](u, k) | 0;
						y = c[h >> 2] | 0;
						k = y + 4 | 0;
						c[h >> 2] = k;
						c[y >> 2] = x;
						j = j + 1 | 0;
						if (j >>> 0 >= e >>> 0)
							break c
					}
					x = wb[c[(c[s >> 2] | 0) + 12 >> 2] & 127](s) | 0;
					y = c[h >> 2] | 0;
					k = y + 4 | 0;
					c[h >> 2] = k;
					c[y >> 2] = x;
					j = j + 1 | 0
				}
			while (0);
			Ab[c[(c[u >> 2] | 0) + 48 >> 2] & 7](u, j, e, k) | 0;
			y = (c[h >> 2] | 0) + (t - j << 2) | 0;
			c[h >> 2] = y;
			c[g >> 2] = (d | 0) == (e | 0) ? y : f + (d - b << 2) | 0;
			qj(v);
			i = w;
			return
		}
		function Tl(a, b, d, e, f) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = +f;
			var g = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0;
			A = i;
			i = i + 352 | 0;
			r = A + 304 | 0;
			n = A + 48 | 0;
			m = A + 32 | 0;
			j = A + 24 | 0;
			g = A + 8 | 0;
			l = A;
			p = A + 308 | 0;
			o = A + 72 | 0;
			q = A + 76 | 0;
			u = A + 68 | 0;
			w = A + 64 | 0;
			s = A + 60 | 0;
			t = A + 56 | 0;
			k = l;
			c[k >> 2] = 37;
			c[k + 4 >> 2] = 0;
			k = Fl(l + 1 | 0, 23511, c[d + 4 >> 2] | 0) | 0;
			c[o >> 2] = p;
			a = $k() | 0;
			if (k) {
				c[g >> 2] = c[d + 8 >> 2];
				h[g + 8 >> 3] = f;
				a = Tq(p, 30, a, l, g) | 0
			} else {
				h[j >> 3] = f;
				a = Tq(p, 30, a, l, j) | 0
			}
			if ((a | 0) > 29) {
				a = $k() | 0;
				if (k) {
					c[m >> 2] = c[d + 8 >> 2];
					h[m + 8 >> 3] = f;
					g = Uq(o, a, l, m) | 0
				} else {
					h[n >> 3] = f;
					g = Uq(o, a, l, n) | 0
				}
				a = c[o >> 2] | 0;
				if (!a)
					Nh();
				else {
					x = a;
					C = a;
					v = g
				}
			} else {
				x = c[o >> 2] | 0;
				C = 0;
				v = a
			}
			g = x + v | 0;
			j = zl(x, g, d) | 0;
			if ((x | 0) != (p | 0)) {
				a = fj(v << 3) | 0;
				if (!a)
					Nh();
				else {
					y = x;
					B = a;
					z = a
				}
			} else {
				y = p;
				B = 0;
				z = q
			}
			a = Tj(d) | 0;
			c[s >> 2] = a;
			Sl(y, j, g, z, u, w, s);
			cs(a) | 0;
			c[t >> 2] = c[b >> 2];
			y = c[u >> 2] | 0;
			a = c[w >> 2] | 0;
			c[r >> 2] = c[t >> 2];
			a = Vq(r, z, y, a, d, e) | 0;
			c[b >> 2] = a;
			if (B)
				gj(B);
			gj(C);
			i = A;
			return a | 0
		}
		function Ul(b, d, e, f, g) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0;
			h = i;
			i = i + 192 | 0;
			m = h;
			b = h + 180 | 0;
			j = h + 160 | 0;
			k = h + 12 | 0;
			o = h + 8 | 0;
			n = h + 4 | 0;
			a[b >> 0] = a[23513] | 0;
			a[b + 1 >> 0] = a[23514] | 0;
			a[b + 2 >> 0] = a[23515] | 0;
			a[b + 3 >> 0] = a[23516] | 0;
			a[b + 4 >> 0] = a[23517] | 0;
			a[b + 5 >> 0] = a[23518] | 0;
			l = $k() | 0;
			c[m >> 2] = g;
			b = Tq(j, 20, l, b, m) | 0;
			l = j + b | 0;
			g = zl(j, l, e) | 0;
			p = Tj(e) | 0;
			c[o >> 2] = p;
			o = Mo(o, 9344) | 0;
			cs(p) | 0;
			Ab[c[(c[o >> 2] | 0) + 48 >> 2] & 7](o, j, l, k) | 0;
			b = k + (b << 2) | 0;
			c[n >> 2] = c[d >> 2];
			c[m >> 2] = c[n >> 2];
			b = Vq(m, k, (g | 0) == (l | 0) ? b : k + (g - j << 2) | 0, b, e, f) | 0;
			i = h;
			return b | 0
		}
		function Vl(e, f, g, h, j, k, l, m) {
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			k = k | 0;
			l = l | 0;
			m = m | 0;
			var n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0;
			B = i;
			i = i + 32 | 0;
			u = B + 16 | 0;
			t = B + 12 | 0;
			x = B + 8 | 0;
			v = B + 4 | 0;
			w = B;
			y = Tj(h) | 0;
			c[x >> 2] = y;
			x = Mo(x, 9352) | 0;
			cs(y) | 0;
			c[j >> 2] = 0;
			y = x + 8 | 0;
			n = c[f >> 2] | 0;
			a : do
				if ((l | 0) != (m | 0)) {
					b : while (1) {
						o = n;
						if (n) {
							if ((c[n + 12 >> 2] | 0) == (c[n + 16 >> 2] | 0) ? (wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](n) | 0) == -1 : 0) {
								c[f >> 2] = 0;
								n = 0;
								o = 0
							}
						} else
							n = 0;
						r = (n | 0) == 0;
						q = c[g >> 2] | 0;
						p = q;
						do
							if (q) {
								if ((c[q + 12 >> 2] | 0) == (c[q + 16 >> 2] | 0) ? (wb[c[(c[q >> 2] | 0) + 36 >> 2] & 127](q) | 0) == -1 : 0) {
									c[g >> 2] = 0;
									p = 0;
									A = 11;
									break
								}
								if (!r) {
									A = 12;
									break b
								}
							} else
								A = 11;
						while (0);
						if ((A | 0) == 11) {
							A = 0;
							if (r) {
								A = 12;
								break
							} else
								q = 0
						}
						c : do
							if ((pb[c[(c[x >> 2] | 0) + 36 >> 2] & 31](x, a[l >> 0] | 0, 0) | 0) << 24 >> 24 == 37) {
								q = l + 1 | 0;
								if ((q | 0) == (m | 0)) {
									A = 15;
									break b
								}
								s = pb[c[(c[x >> 2] | 0) + 36 >> 2] & 31](x, a[q >> 0] | 0, 0) | 0;
								switch (s << 24 >> 24) {
								case 48:
								case 69: {
										r = l + 2 | 0;
										if ((r | 0) == (m | 0)) {
											A = 18;
											break b
										}
										l = q;
										q = pb[c[(c[x >> 2] | 0) + 36 >> 2] & 31](x, a[r >> 0] | 0, 0) | 0;
										n = s;
										break
									}
								default: {
										q = s;
										n = 0
									}
								}
								s = c[(c[e >> 2] | 0) + 36 >> 2] | 0;
								c[v >> 2] = o;
								c[w >> 2] = p;
								c[t >> 2] = c[v >> 2];
								c[u >> 2] = c[w >> 2];
								c[f >> 2] = zb[s & 15](e, t, u, h, j, k, q, n) | 0;
								l = l + 2 | 0
							} else {
								o = a[l >> 0] | 0;
								if (o << 24 >> 24 > -1 ? (z = c[y >> 2] | 0, (b[z + (o << 24 >> 24 << 1) >> 1] & 8192) != 0) : 0) {
									do {
										l = l + 1 | 0;
										if ((l | 0) == (m | 0)) {
											l = m;
											break
										}
										o = a[l >> 0] | 0;
										if (o << 24 >> 24 <= -1)
											break
									} while ((b[z + (o << 24 >> 24 << 1) >> 1] & 8192) != 0);
									o = q;
									while (1) {
										if (n) {
											if ((c[n + 12 >> 2] | 0) == (c[n + 16 >> 2] | 0) ? (wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](n) | 0) == -1 : 0) {
												c[f >> 2] = 0;
												n = 0
											}
										} else
											n = 0;
										p = (n | 0) == 0;
										do
											if (q) {
												if ((c[q + 12 >> 2] | 0) != (c[q + 16 >> 2] | 0))
													if (p) {
														s = o;
														break
													} else
														break c;
												if ((wb[c[(c[q >> 2] | 0) + 36 >> 2] & 127](q) | 0) != -1)
													if (p^(o | 0) == 0) {
														s = o;
														q = o;
														break
													} else
														break c;
												else {
													c[g >> 2] = 0;
													o = 0;
													A = 37;
													break
												}
											} else
												A = 37;
										while (0);
										if ((A | 0) == 37) {
											A = 0;
											if (p)
												break c;
											else {
												s = o;
												q = 0
											}
										}
										p = n + 12 | 0;
										o = c[p >> 2] | 0;
										r = n + 16 | 0;
										if ((o | 0) == (c[r >> 2] | 0))
											o = wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](n) | 0;
										else
											o = d[o >> 0] | 0;
										if ((o & 255) << 24 >> 24 <= -1)
											break c;
										if (!(b[(c[y >> 2] | 0) + (o << 24 >> 24 << 1) >> 1] & 8192))
											break c;
										o = c[p >> 2] | 0;
										if ((o | 0) == (c[r >> 2] | 0)) {
											wb[c[(c[n >> 2] | 0) + 40 >> 2] & 127](n) | 0;
											o = s;
											continue
										} else {
											c[p >> 2] = o + 1;
											o = s;
											continue
										}
									}
								}
								p = n + 12 | 0;
								o = c[p >> 2] | 0;
								q = n + 16 | 0;
								if ((o | 0) == (c[q >> 2] | 0))
									o = wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](n) | 0;
								else
									o = d[o >> 0] | 0;
								s = Cb[c[(c[x >> 2] | 0) + 12 >> 2] & 15](x, o & 255) | 0;
								if (s << 24 >> 24 != (Cb[c[(c[x >> 2] | 0) + 12 >> 2] & 15](x, a[l >> 0] | 0) | 0) << 24 >> 24) {
									A = 55;
									break b
								}
								o = c[p >> 2] | 0;
								if ((o | 0) == (c[q >> 2] | 0))
									wb[c[(c[n >> 2] | 0) + 40 >> 2] & 127](n) | 0;
								else
									c[p >> 2] = o + 1;
								l = l + 1 | 0
							}
						while (0);
						n = c[f >> 2] | 0;
						if (!((l | 0) != (m | 0) & (c[j >> 2] | 0) == 0))
							break a
					}
					if ((A | 0) == 12) {
						c[j >> 2] = 4;
						break
					} else if ((A | 0) == 15) {
						c[j >> 2] = 4;
						break
					} else if ((A | 0) == 18) {
						c[j >> 2] = 4;
						break
					} else if ((A | 0) == 55) {
						c[j >> 2] = 4;
						n = c[f >> 2] | 0;
						break
					}
				}
			while (0);
			if (n) {
				if ((c[n + 12 >> 2] | 0) == (c[n + 16 >> 2] | 0) ? (wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](n) | 0) == -1 : 0) {
					c[f >> 2] = 0;
					n = 0
				}
			} else
				n = 0;
			l = (n | 0) == 0;
			o = c[g >> 2] | 0;
			do
				if (o) {
					if ((c[o + 12 >> 2] | 0) == (c[o + 16 >> 2] | 0) ? (wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0) == -1 : 0) {
						c[g >> 2] = 0;
						A = 65;
						break
					}
					if (!l)
						A = 66
				} else
					A = 65;
			while (0);
			if ((A | 0) == 65 ? l : 0)
				A = 66;
			if ((A | 0) == 66)
				c[j >> 2] = c[j >> 2] | 2;
			i = B;
			return n | 0
		}
		function Wl(a) {
			a = a | 0;
			return
		}
		function Xl(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Yl(a) {
			a = a | 0;
			return 2
		}
		function Zl(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 12 | 0;
			k = h + 8 | 0;
			m = h + 4 | 0;
			l = h;
			c[m >> 2] = c[b >> 2];
			c[l >> 2] = c[d >> 2];
			c[k >> 2] = c[m >> 2];
			c[j >> 2] = c[l >> 2];
			a = Vl(a, k, j, e, f, g, 23519, 23527) | 0;
			i = h;
			return a | 0
		}
		function _l(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0;
			j = i;
			i = i + 16 | 0;
			k = j + 12 | 0;
			l = j + 8 | 0;
			n = j + 4 | 0;
			m = j;
			o = b + 8 | 0;
			o = wb[c[(c[o >> 2] | 0) + 20 >> 2] & 127](o) | 0;
			c[n >> 2] = c[d >> 2];
			c[m >> 2] = c[e >> 2];
			d = a[o >> 0] | 0;
			p = (d & 1) == 0;
			e = p ? o + 1 | 0 : c[o + 8 >> 2] | 0;
			d = e + (p ? (d & 255) >>> 1 : c[o + 4 >> 2] | 0) | 0;
			c[l >> 2] = c[n >> 2];
			c[k >> 2] = c[m >> 2];
			b = Vl(b, l, k, f, g, h, e, d) | 0;
			i = j;
			return b | 0
		}
		function $l(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 8 | 0;
			m = h + 4 | 0;
			k = h;
			l = Tj(e) | 0;
			c[m >> 2] = l;
			e = Mo(m, 9352) | 0;
			cs(l) | 0;
			c[k >> 2] = c[d >> 2];
			c[j >> 2] = c[k >> 2];
			am(a, g + 24 | 0, b, j, f, e);
			i = h;
			return c[b >> 2] | 0
		}
		function am(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 4 | 0;
			k = h;
			a = a + 8 | 0;
			a = wb[c[c[a >> 2] >> 2] & 127](a) | 0;
			c[k >> 2] = c[e >> 2];
			c[j >> 2] = c[k >> 2];
			e = (yq(d, j, a, a + 168 | 0, g, f, 0) | 0) - a | 0;
			if ((e | 0) < 168)
				c[b >> 2] = ((e | 0) / 12 | 0 | 0) % 7 | 0;
			i = h;
			return
		}
		function bm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 8 | 0;
			m = h + 4 | 0;
			k = h;
			l = Tj(e) | 0;
			c[m >> 2] = l;
			e = Mo(m, 9352) | 0;
			cs(l) | 0;
			c[k >> 2] = c[d >> 2];
			c[j >> 2] = c[k >> 2];
			cm(a, g + 16 | 0, b, j, f, e);
			i = h;
			return c[b >> 2] | 0
		}
		function cm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 4 | 0;
			k = h;
			a = a + 8 | 0;
			a = wb[c[(c[a >> 2] | 0) + 4 >> 2] & 127](a) | 0;
			c[k >> 2] = c[e >> 2];
			c[j >> 2] = c[k >> 2];
			e = (yq(d, j, a, a + 288 | 0, g, f, 0) | 0) - a | 0;
			if ((e | 0) < 288)
				c[b >> 2] = ((e | 0) / 12 | 0 | 0) % 12 | 0;
			i = h;
			return
		}
		function dm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 8 | 0;
			m = h + 4 | 0;
			k = h;
			l = Tj(e) | 0;
			c[m >> 2] = l;
			e = Mo(m, 9352) | 0;
			cs(l) | 0;
			c[k >> 2] = c[d >> 2];
			c[j >> 2] = c[k >> 2];
			em(a, g + 20 | 0, b, j, f, e);
			i = h;
			return c[b >> 2] | 0
		}
		function em(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			h = i;
			i = i + 16 | 0;
			a = h + 4 | 0;
			j = h;
			c[j >> 2] = c[e >> 2];
			c[a >> 2] = c[j >> 2];
			a = Wq(d, a, f, g, 4) | 0;
			if (!(c[f >> 2] & 4)) {
				if ((a | 0) < 69)
					a = a + 2e3 | 0;
				else
					a = (a + -69 | 0) >>> 0 < 31 ? a + 1900 | 0 : a;
				c[b >> 2] = a + -1900
			}
			i = h;
			return
		}
		function fm(b, d, e, f, g, h, j, k) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			k = k | 0;
			var l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0,
			E = 0,
			F = 0,
			G = 0,
			H = 0,
			I = 0,
			J = 0,
			K = 0,
			L = 0,
			M = 0,
			N = 0,
			O = 0,
			P = 0,
			Q = 0,
			R = 0,
			S = 0,
			T = 0,
			U = 0;
			S = i;
			i = i + 144 | 0;
			l = S + 132 | 0;
			k = S + 116 | 0;
			L = S + 128 | 0;
			w = S + 124 | 0;
			H = S + 120 | 0;
			M = S + 112 | 0;
			N = S + 108 | 0;
			O = S + 104 | 0;
			P = S + 100 | 0;
			Q = S + 96 | 0;
			R = S + 92 | 0;
			m = S + 88 | 0;
			n = S + 84 | 0;
			o = S + 80 | 0;
			p = S + 76 | 0;
			q = S + 72 | 0;
			r = S + 68 | 0;
			s = S + 64 | 0;
			t = S + 60 | 0;
			u = S + 56 | 0;
			v = S + 52 | 0;
			x = S + 48 | 0;
			y = S + 44 | 0;
			z = S + 40 | 0;
			A = S + 36 | 0;
			B = S + 32 | 0;
			C = S + 28 | 0;
			D = S + 24 | 0;
			E = S + 20 | 0;
			F = S + 16 | 0;
			G = S + 12 | 0;
			I = S + 8 | 0;
			J = S + 4 | 0;
			K = S;
			c[g >> 2] = 0;
			U = Tj(f) | 0;
			c[L >> 2] = U;
			L = Mo(L, 9352) | 0;
			cs(U) | 0;
			do
				switch (j << 24 >> 24 | 0) {
				case 65:
				case 97: {
						c[w >> 2] = c[e >> 2];
						c[l >> 2] = c[w >> 2];
						am(b, h + 24 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 104:
				case 66:
				case 98: {
						c[H >> 2] = c[e >> 2];
						c[l >> 2] = c[H >> 2];
						cm(b, h + 16 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 99: {
						T = b + 8 | 0;
						T = wb[c[(c[T >> 2] | 0) + 12 >> 2] & 127](T) | 0;
						c[M >> 2] = c[d >> 2];
						c[N >> 2] = c[e >> 2];
						j = a[T >> 0] | 0;
						e = (j & 1) == 0;
						U = e ? T + 1 | 0 : c[T + 8 >> 2] | 0;
						T = U + (e ? (j & 255) >>> 1 : c[T + 4 >> 2] | 0) | 0;
						c[k >> 2] = c[M >> 2];
						c[l >> 2] = c[N >> 2];
						c[d >> 2] = Vl(b, k, l, f, g, h, U, T) | 0;
						T = 26;
						break
					}
				case 101:
				case 100: {
						c[O >> 2] = c[e >> 2];
						c[l >> 2] = c[O >> 2];
						gm(b, h + 12 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 68: {
						c[P >> 2] = c[d >> 2];
						c[Q >> 2] = c[e >> 2];
						c[k >> 2] = c[P >> 2];
						c[l >> 2] = c[Q >> 2];
						c[d >> 2] = Vl(b, k, l, f, g, h, 23527, 23535) | 0;
						T = 26;
						break
					}
				case 70: {
						c[R >> 2] = c[d >> 2];
						c[m >> 2] = c[e >> 2];
						c[k >> 2] = c[R >> 2];
						c[l >> 2] = c[m >> 2];
						c[d >> 2] = Vl(b, k, l, f, g, h, 23535, 23543) | 0;
						T = 26;
						break
					}
				case 72: {
						c[n >> 2] = c[e >> 2];
						c[l >> 2] = c[n >> 2];
						hm(b, h + 8 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 73: {
						c[o >> 2] = c[e >> 2];
						c[l >> 2] = c[o >> 2];
						im(b, h + 8 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 106: {
						c[p >> 2] = c[e >> 2];
						c[l >> 2] = c[p >> 2];
						jm(b, h + 28 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 109: {
						c[q >> 2] = c[e >> 2];
						c[l >> 2] = c[q >> 2];
						km(b, h + 16 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 77: {
						c[r >> 2] = c[e >> 2];
						c[l >> 2] = c[r >> 2];
						lm(b, h + 4 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 116:
				case 110: {
						c[s >> 2] = c[e >> 2];
						c[l >> 2] = c[s >> 2];
						mm(b, d, l, g, L);
						T = 26;
						break
					}
				case 112: {
						c[t >> 2] = c[e >> 2];
						c[l >> 2] = c[t >> 2];
						nm(b, h + 8 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 114: {
						c[u >> 2] = c[d >> 2];
						c[v >> 2] = c[e >> 2];
						c[k >> 2] = c[u >> 2];
						c[l >> 2] = c[v >> 2];
						c[d >> 2] = Vl(b, k, l, f, g, h, 23543, 23554) | 0;
						T = 26;
						break
					}
				case 82: {
						c[x >> 2] = c[d >> 2];
						c[y >> 2] = c[e >> 2];
						c[k >> 2] = c[x >> 2];
						c[l >> 2] = c[y >> 2];
						c[d >> 2] = Vl(b, k, l, f, g, h, 23554, 23559) | 0;
						T = 26;
						break
					}
				case 83: {
						c[z >> 2] = c[e >> 2];
						c[l >> 2] = c[z >> 2];
						om(b, h, d, l, g, L);
						T = 26;
						break
					}
				case 84: {
						c[A >> 2] = c[d >> 2];
						c[B >> 2] = c[e >> 2];
						c[k >> 2] = c[A >> 2];
						c[l >> 2] = c[B >> 2];
						c[d >> 2] = Vl(b, k, l, f, g, h, 23559, 23567) | 0;
						T = 26;
						break
					}
				case 119: {
						c[C >> 2] = c[e >> 2];
						c[l >> 2] = c[C >> 2];
						pm(b, h + 24 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 120: {
						U = c[(c[b >> 2] | 0) + 20 >> 2] | 0;
						c[D >> 2] = c[d >> 2];
						c[E >> 2] = c[e >> 2];
						c[k >> 2] = c[D >> 2];
						c[l >> 2] = c[E >> 2];
						k = ub[U & 63](b, k, l, f, g, h) | 0;
						break
					}
				case 88: {
						T = b + 8 | 0;
						T = wb[c[(c[T >> 2] | 0) + 24 >> 2] & 127](T) | 0;
						c[F >> 2] = c[d >> 2];
						c[G >> 2] = c[e >> 2];
						j = a[T >> 0] | 0;
						e = (j & 1) == 0;
						U = e ? T + 1 | 0 : c[T + 8 >> 2] | 0;
						T = U + (e ? (j & 255) >>> 1 : c[T + 4 >> 2] | 0) | 0;
						c[k >> 2] = c[F >> 2];
						c[l >> 2] = c[G >> 2];
						c[d >> 2] = Vl(b, k, l, f, g, h, U, T) | 0;
						T = 26;
						break
					}
				case 121: {
						c[I >> 2] = c[e >> 2];
						c[l >> 2] = c[I >> 2];
						em(b, h + 20 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 89: {
						c[J >> 2] = c[e >> 2];
						c[l >> 2] = c[J >> 2];
						qm(b, h + 20 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 37: {
						c[K >> 2] = c[e >> 2];
						c[l >> 2] = c[K >> 2];
						rm(b, d, l, g, L);
						T = 26;
						break
					}
				default: {
						c[g >> 2] = c[g >> 2] | 4;
						T = 26
					}
				}
			while (0);
			if ((T | 0) == 26)
				k = c[d >> 2] | 0;
			i = S;
			return k | 0
		}
		function gm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			h = i;
			i = i + 16 | 0;
			a = h + 4 | 0;
			j = h;
			c[j >> 2] = c[e >> 2];
			c[a >> 2] = c[j >> 2];
			a = Wq(d, a, f, g, 2) | 0;
			e = c[f >> 2] | 0;
			if ((a + -1 | 0) >>> 0 < 31 & (e & 4 | 0) == 0)
				c[b >> 2] = a;
			else
				c[f >> 2] = e | 4;
			i = h;
			return
		}
		function hm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			h = i;
			i = i + 16 | 0;
			a = h + 4 | 0;
			j = h;
			c[j >> 2] = c[e >> 2];
			c[a >> 2] = c[j >> 2];
			a = Wq(d, a, f, g, 2) | 0;
			e = c[f >> 2] | 0;
			if ((a | 0) < 24 & (e & 4 | 0) == 0)
				c[b >> 2] = a;
			else
				c[f >> 2] = e | 4;
			i = h;
			return
		}
		function im(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			h = i;
			i = i + 16 | 0;
			a = h + 4 | 0;
			j = h;
			c[j >> 2] = c[e >> 2];
			c[a >> 2] = c[j >> 2];
			a = Wq(d, a, f, g, 2) | 0;
			e = c[f >> 2] | 0;
			if ((a + -1 | 0) >>> 0 < 12 & (e & 4 | 0) == 0)
				c[b >> 2] = a;
			else
				c[f >> 2] = e | 4;
			i = h;
			return
		}
		function jm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			h = i;
			i = i + 16 | 0;
			a = h + 4 | 0;
			j = h;
			c[j >> 2] = c[e >> 2];
			c[a >> 2] = c[j >> 2];
			a = Wq(d, a, f, g, 3) | 0;
			e = c[f >> 2] | 0;
			if ((a | 0) < 366 & (e & 4 | 0) == 0)
				c[b >> 2] = a;
			else
				c[f >> 2] = e | 4;
			i = h;
			return
		}
		function km(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			h = i;
			i = i + 16 | 0;
			a = h + 4 | 0;
			j = h;
			c[j >> 2] = c[e >> 2];
			c[a >> 2] = c[j >> 2];
			a = Wq(d, a, f, g, 2) | 0;
			e = c[f >> 2] | 0;
			if ((a | 0) < 13 & (e & 4 | 0) == 0)
				c[b >> 2] = a + -1;
			else
				c[f >> 2] = e | 4;
			i = h;
			return
		}
		function lm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			h = i;
			i = i + 16 | 0;
			a = h + 4 | 0;
			j = h;
			c[j >> 2] = c[e >> 2];
			c[a >> 2] = c[j >> 2];
			a = Wq(d, a, f, g, 2) | 0;
			e = c[f >> 2] | 0;
			if ((a | 0) < 60 & (e & 4 | 0) == 0)
				c[b >> 2] = a;
			else
				c[f >> 2] = e | 4;
			i = h;
			return
		}
		function mm(a, e, f, g, h) {
			a = a | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var i = 0,
			j = 0,
			k = 0;
			j = h + 8 | 0;
			a : while (1) {
				h = c[e >> 2] | 0;
				do
					if (h) {
						if ((c[h + 12 >> 2] | 0) == (c[h + 16 >> 2] | 0))
							if ((wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0) == -1) {
								c[e >> 2] = 0;
								h = 0;
								break
							} else {
								h = c[e >> 2] | 0;
								break
							}
					} else
						h = 0;
				while (0);
				h = (h | 0) == 0;
				a = c[f >> 2] | 0;
				do
					if (a) {
						if ((c[a + 12 >> 2] | 0) != (c[a + 16 >> 2] | 0))
							if (h)
								break;
							else
								break a;
						if ((wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0) != -1)
							if (h)
								break;
							else
								break a;
						else {
							c[f >> 2] = 0;
							k = 12;
							break
						}
					} else
						k = 12;
				while (0);
				if ((k | 0) == 12) {
					k = 0;
					if (h) {
						a = 0;
						break
					} else
						a = 0
				}
				h = c[e >> 2] | 0;
				i = c[h + 12 >> 2] | 0;
				if ((i | 0) == (c[h + 16 >> 2] | 0))
					h = wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0;
				else
					h = d[i >> 0] | 0;
				if ((h & 255) << 24 >> 24 <= -1)
					break;
				if (!(b[(c[j >> 2] | 0) + (h << 24 >> 24 << 1) >> 1] & 8192))
					break;
				h = c[e >> 2] | 0;
				a = h + 12 | 0;
				i = c[a >> 2] | 0;
				if ((i | 0) == (c[h + 16 >> 2] | 0)) {
					wb[c[(c[h >> 2] | 0) + 40 >> 2] & 127](h) | 0;
					continue
				} else {
					c[a >> 2] = i + 1;
					continue
				}
			}
			h = c[e >> 2] | 0;
			do
				if (h) {
					if ((c[h + 12 >> 2] | 0) == (c[h + 16 >> 2] | 0))
						if ((wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0) == -1) {
							c[e >> 2] = 0;
							h = 0;
							break
						} else {
							h = c[e >> 2] | 0;
							break
						}
				} else
					h = 0;
			while (0);
			h = (h | 0) == 0;
			do
				if (a) {
					if ((c[a + 12 >> 2] | 0) == (c[a + 16 >> 2] | 0) ? (wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0) == -1 : 0) {
						c[f >> 2] = 0;
						k = 32;
						break
					}
					if (!h)
						k = 33
				} else
					k = 32;
			while (0);
			if ((k | 0) == 32 ? h : 0)
				k = 33;
			if ((k | 0) == 33)
				c[g >> 2] = c[g >> 2] | 2;
			return
		}
		function nm(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0;
			n = i;
			i = i + 16 | 0;
			k = n + 4 | 0;
			l = n;
			m = b + 8 | 0;
			m = wb[c[(c[m >> 2] | 0) + 8 >> 2] & 127](m) | 0;
			b = a[m >> 0] | 0;
			if (!(b & 1))
				j = (b & 255) >>> 1;
			else
				j = c[m + 4 >> 2] | 0;
			b = a[m + 12 >> 0] | 0;
			if (!(b & 1))
				b = (b & 255) >>> 1;
			else
				b = c[m + 16 >> 2] | 0;
			do
				if ((j | 0) != (0 - b | 0)) {
					c[l >> 2] = c[f >> 2];
					c[k >> 2] = c[l >> 2];
					b = yq(e, k, m, m + 24 | 0, h, g, 0) | 0;
					j = c[d >> 2] | 0;
					if ((b | 0) == (m | 0) & (j | 0) == 12) {
						c[d >> 2] = 0;
						break
					}
					if ((j | 0) < 12 & (b - m | 0) == 12)
						c[d >> 2] = j + 12
				} else
					c[g >> 2] = c[g >> 2] | 4;
			while (0);
			i = n;
			return
		}
		function om(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			h = i;
			i = i + 16 | 0;
			a = h + 4 | 0;
			j = h;
			c[j >> 2] = c[e >> 2];
			c[a >> 2] = c[j >> 2];
			a = Wq(d, a, f, g, 2) | 0;
			e = c[f >> 2] | 0;
			if ((a | 0) < 61 & (e & 4 | 0) == 0)
				c[b >> 2] = a;
			else
				c[f >> 2] = e | 4;
			i = h;
			return
		}
		function pm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			h = i;
			i = i + 16 | 0;
			a = h + 4 | 0;
			j = h;
			c[j >> 2] = c[e >> 2];
			c[a >> 2] = c[j >> 2];
			a = Wq(d, a, f, g, 1) | 0;
			e = c[f >> 2] | 0;
			if ((a | 0) < 7 & (e & 4 | 0) == 0)
				c[b >> 2] = a;
			else
				c[f >> 2] = e | 4;
			i = h;
			return
		}
		function qm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			h = i;
			i = i + 16 | 0;
			a = h + 4 | 0;
			j = h;
			c[j >> 2] = c[e >> 2];
			c[a >> 2] = c[j >> 2];
			a = Wq(d, a, f, g, 4) | 0;
			if (!(c[f >> 2] & 4))
				c[b >> 2] = a + -1900;
			i = h;
			return
		}
		function rm(a, b, e, f, g) {
			a = a | 0;
			b = b | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			i = 0,
			j = 0;
			a = c[b >> 2] | 0;
			do
				if (a) {
					if ((c[a + 12 >> 2] | 0) == (c[a + 16 >> 2] | 0))
						if ((wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0) == -1) {
							c[b >> 2] = 0;
							a = 0;
							break
						} else {
							a = c[b >> 2] | 0;
							break
						}
				} else
					a = 0;
			while (0);
			h = (a | 0) == 0;
			a = c[e >> 2] | 0;
			do
				if (a) {
					if ((c[a + 12 >> 2] | 0) == (c[a + 16 >> 2] | 0) ? (wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0) == -1 : 0) {
						c[e >> 2] = 0;
						j = 11;
						break
					}
					if (h) {
						i = a;
						j = 13
					} else
						j = 12
				} else
					j = 11;
			while (0);
			if ((j | 0) == 11)
				if (h)
					j = 12;
				else {
					i = 0;
					j = 13
				}
			a : do
				if ((j | 0) == 12)
					c[f >> 2] = c[f >> 2] | 6;
				else if ((j | 0) == 13) {
					a = c[b >> 2] | 0;
					h = c[a + 12 >> 2] | 0;
					if ((h | 0) == (c[a + 16 >> 2] | 0))
						a = wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0;
					else
						a = d[h >> 0] | 0;
					if ((pb[c[(c[g >> 2] | 0) + 36 >> 2] & 31](g, a & 255, 0) | 0) << 24 >> 24 != 37) {
						c[f >> 2] = c[f >> 2] | 4;
						break
					}
					a = c[b >> 2] | 0;
					h = a + 12 | 0;
					g = c[h >> 2] | 0;
					if ((g | 0) == (c[a + 16 >> 2] | 0)) {
						wb[c[(c[a >> 2] | 0) + 40 >> 2] & 127](a) | 0;
						a = c[b >> 2] | 0;
						if (!a)
							a = 0;
						else
							j = 21
					} else {
						c[h >> 2] = g + 1;
						j = 21
					}
					do
						if ((j | 0) == 21)
							if ((c[a + 12 >> 2] | 0) == (c[a + 16 >> 2] | 0))
								if ((wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0) == -1) {
									c[b >> 2] = 0;
									a = 0;
									break
								} else {
									a = c[b >> 2] | 0;
									break
								}
					while (0);
					a = (a | 0) == 0;
					do
						if (i) {
							if ((c[i + 12 >> 2] | 0) == (c[i + 16 >> 2] | 0) ? (wb[c[(c[i >> 2] | 0) + 36 >> 2] & 127](i) | 0) == -1 : 0) {
								c[e >> 2] = 0;
								j = 30;
								break
							}
							if (a)
								break a
						} else
							j = 30;
					while (0);
					if ((j | 0) == 30 ? !a : 0)
						break;
					c[f >> 2] = c[f >> 2] | 2
				}
			while (0);
			return
		}
		function sm(a, b, d, e, f, g, h, j) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0;
			w = i;
			i = i + 32 | 0;
			r = w + 16 | 0;
			q = w + 12 | 0;
			u = w + 8 | 0;
			s = w + 4 | 0;
			t = w;
			k = Tj(e) | 0;
			c[u >> 2] = k;
			u = Mo(u, 9344) | 0;
			cs(k) | 0;
			c[f >> 2] = 0;
			k = c[b >> 2] | 0;
			a : do
				if ((h | 0) != (j | 0)) {
					b : while (1) {
						m = k;
						if (k) {
							l = c[k + 12 >> 2] | 0;
							if ((l | 0) == (c[k + 16 >> 2] | 0))
								l = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
							else
								l = c[l >> 2] | 0;
							if ((l | 0) == -1) {
								c[b >> 2] = 0;
								k = 0;
								o = 1;
								p = 0
							} else {
								o = 0;
								p = m
							}
						} else {
							k = 0;
							o = 1;
							p = m
						}
						n = c[d >> 2] | 0;
						l = n;
						do
							if (n) {
								m = c[n + 12 >> 2] | 0;
								if ((m | 0) == (c[n + 16 >> 2] | 0))
									m = wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](n) | 0;
								else
									m = c[m >> 2] | 0;
								if ((m | 0) != -1)
									if (o)
										break;
									else {
										v = 16;
										break b
									}
								else {
									c[d >> 2] = 0;
									l = 0;
									v = 14;
									break
								}
							} else
								v = 14;
						while (0);
						if ((v | 0) == 14) {
							v = 0;
							if (o) {
								v = 16;
								break
							} else
								n = 0
						}
						c : do
							if ((pb[c[(c[u >> 2] | 0) + 52 >> 2] & 31](u, c[h >> 2] | 0, 0) | 0) << 24 >> 24 == 37) {
								m = h + 4 | 0;
								if ((m | 0) == (j | 0)) {
									v = 19;
									break b
								}
								o = pb[c[(c[u >> 2] | 0) + 52 >> 2] & 31](u, c[m >> 2] | 0, 0) | 0;
								switch (o << 24 >> 24) {
								case 48:
								case 69: {
										n = h + 8 | 0;
										if ((n | 0) == (j | 0)) {
											v = 22;
											break b
										}
										h = m;
										m = pb[c[(c[u >> 2] | 0) + 52 >> 2] & 31](u, c[n >> 2] | 0, 0) | 0;
										k = o;
										break
									}
								default: {
										m = o;
										k = 0
									}
								}
								o = c[(c[a >> 2] | 0) + 36 >> 2] | 0;
								c[s >> 2] = p;
								c[t >> 2] = l;
								c[q >> 2] = c[s >> 2];
								c[r >> 2] = c[t >> 2];
								c[b >> 2] = zb[o & 15](a, q, r, e, f, g, m, k) | 0;
								h = h + 8 | 0
							} else {
								if (!(pb[c[(c[u >> 2] | 0) + 12 >> 2] & 31](u, 8192, c[h >> 2] | 0) | 0)) {
									m = k + 12 | 0;
									l = c[m >> 2] | 0;
									n = k + 16 | 0;
									if ((l | 0) == (c[n >> 2] | 0))
										l = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
									else
										l = c[l >> 2] | 0;
									p = Cb[c[(c[u >> 2] | 0) + 28 >> 2] & 15](u, l) | 0;
									if ((p | 0) != (Cb[c[(c[u >> 2] | 0) + 28 >> 2] & 15](u, c[h >> 2] | 0) | 0)) {
										v = 59;
										break b
									}
									l = c[m >> 2] | 0;
									if ((l | 0) == (c[n >> 2] | 0))
										wb[c[(c[k >> 2] | 0) + 40 >> 2] & 127](k) | 0;
									else
										c[m >> 2] = l + 4;
									h = h + 4 | 0;
									break
								}
								do {
									h = h + 4 | 0;
									if ((h | 0) == (j | 0)) {
										h = j;
										break
									}
								} while (pb[c[(c[u >> 2] | 0) + 12 >> 2] & 31](u, 8192, c[h >> 2] | 0) | 0);
								l = n;
								o = n;
								while (1) {
									if (k) {
										m = c[k + 12 >> 2] | 0;
										if ((m | 0) == (c[k + 16 >> 2] | 0))
											m = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
										else
											m = c[m >> 2] | 0;
										if ((m | 0) == -1) {
											c[b >> 2] = 0;
											n = 1;
											k = 0
										} else
											n = 0
									} else {
										n = 1;
										k = 0
									}
									do
										if (o) {
											m = c[o + 12 >> 2] | 0;
											if ((m | 0) == (c[o + 16 >> 2] | 0))
												m = wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0;
											else
												m = c[m >> 2] | 0;
											if ((m | 0) != -1)
												if (n^(l | 0) == 0) {
													p = l;
													o = l;
													break
												} else
													break c;
											else {
												c[d >> 2] = 0;
												l = 0;
												v = 42;
												break
											}
										} else
											v = 42;
									while (0);
									if ((v | 0) == 42) {
										v = 0;
										if (n)
											break c;
										else {
											p = l;
											o = 0
										}
									}
									m = k + 12 | 0;
									l = c[m >> 2] | 0;
									n = k + 16 | 0;
									if ((l | 0) == (c[n >> 2] | 0))
										l = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
									else
										l = c[l >> 2] | 0;
									if (!(pb[c[(c[u >> 2] | 0) + 12 >> 2] & 31](u, 8192, l) | 0))
										break c;
									l = c[m >> 2] | 0;
									if ((l | 0) == (c[n >> 2] | 0)) {
										wb[c[(c[k >> 2] | 0) + 40 >> 2] & 127](k) | 0;
										l = p;
										continue
									} else {
										c[m >> 2] = l + 4;
										l = p;
										continue
									}
								}
							}
						while (0);
						k = c[b >> 2] | 0;
						if (!((h | 0) != (j | 0) & (c[f >> 2] | 0) == 0))
							break a
					}
					if ((v | 0) == 16) {
						c[f >> 2] = 4;
						break
					} else if ((v | 0) == 19) {
						c[f >> 2] = 4;
						break
					} else if ((v | 0) == 22) {
						c[f >> 2] = 4;
						break
					} else if ((v | 0) == 59) {
						c[f >> 2] = 4;
						k = c[b >> 2] | 0;
						break
					}
				}
			while (0);
			if (k) {
				h = c[k + 12 >> 2] | 0;
				if ((h | 0) == (c[k + 16 >> 2] | 0))
					h = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
				else
					h = c[h >> 2] | 0;
				if ((h | 0) == -1) {
					c[b >> 2] = 0;
					k = 0;
					m = 1
				} else
					m = 0
			} else {
				k = 0;
				m = 1
			}
			h = c[d >> 2] | 0;
			do
				if (h) {
					l = c[h + 12 >> 2] | 0;
					if ((l | 0) == (c[h + 16 >> 2] | 0))
						h = wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0;
					else
						h = c[l >> 2] | 0;
					if ((h | 0) != -1)
						if (m)
							break;
						else {
							v = 74;
							break
						}
					else {
						c[d >> 2] = 0;
						v = 72;
						break
					}
				} else
					v = 72;
			while (0);
			if ((v | 0) == 72 ? m : 0)
				v = 74;
			if ((v | 0) == 74)
				c[f >> 2] = c[f >> 2] | 2;
			i = w;
			return k | 0
		}
		function tm(a) {
			a = a | 0;
			return
		}
		function um(a) {
			a = a | 0;
			ih(a);
			return
		}
		function vm(a) {
			a = a | 0;
			return 2
		}
		function wm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 12 | 0;
			k = h + 8 | 0;
			m = h + 4 | 0;
			l = h;
			c[m >> 2] = c[b >> 2];
			c[l >> 2] = c[d >> 2];
			c[k >> 2] = c[m >> 2];
			c[j >> 2] = c[l >> 2];
			a = sm(a, k, j, e, f, g, 9920, 9952) | 0;
			i = h;
			return a | 0
		}
		function xm(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0;
			j = i;
			i = i + 16 | 0;
			k = j + 12 | 0;
			l = j + 8 | 0;
			n = j + 4 | 0;
			m = j;
			q = b + 8 | 0;
			q = wb[c[(c[q >> 2] | 0) + 20 >> 2] & 127](q) | 0;
			c[n >> 2] = c[d >> 2];
			c[m >> 2] = c[e >> 2];
			o = a[q >> 0] | 0;
			p = (o & 1) == 0;
			d = q + 4 | 0;
			e = p ? d : c[q + 8 >> 2] | 0;
			d = e + ((p ? (o & 255) >>> 1 : c[d >> 2] | 0) << 2) | 0;
			c[l >> 2] = c[n >> 2];
			c[k >> 2] = c[m >> 2];
			b = sm(b, l, k, f, g, h, e, d) | 0;
			i = j;
			return b | 0
		}
		function ym(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 8 | 0;
			m = h + 4 | 0;
			k = h;
			l = Tj(e) | 0;
			c[m >> 2] = l;
			e = Mo(m, 9344) | 0;
			cs(l) | 0;
			c[k >> 2] = c[d >> 2];
			c[j >> 2] = c[k >> 2];
			zm(a, g + 24 | 0, b, j, f, e);
			i = h;
			return c[b >> 2] | 0
		}
		function zm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 4 | 0;
			k = h;
			a = a + 8 | 0;
			a = wb[c[c[a >> 2] >> 2] & 127](a) | 0;
			c[k >> 2] = c[e >> 2];
			c[j >> 2] = c[k >> 2];
			e = (Jq(d, j, a, a + 168 | 0, g, f, 0) | 0) - a | 0;
			if ((e | 0) < 168)
				c[b >> 2] = ((e | 0) / 12 | 0 | 0) % 7 | 0;
			i = h;
			return
		}
		function Am(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 8 | 0;
			m = h + 4 | 0;
			k = h;
			l = Tj(e) | 0;
			c[m >> 2] = l;
			e = Mo(m, 9344) | 0;
			cs(l) | 0;
			c[k >> 2] = c[d >> 2];
			c[j >> 2] = c[k >> 2];
			Bm(a, g + 16 | 0, b, j, f, e);
			i = h;
			return c[b >> 2] | 0
		}
		function Bm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 4 | 0;
			k = h;
			a = a + 8 | 0;
			a = wb[c[(c[a >> 2] | 0) + 4 >> 2] & 127](a) | 0;
			c[k >> 2] = c[e >> 2];
			c[j >> 2] = c[k >> 2];
			e = (Jq(d, j, a, a + 288 | 0, g, f, 0) | 0) - a | 0;
			if ((e | 0) < 288)
				c[b >> 2] = ((e | 0) / 12 | 0 | 0) % 12 | 0;
			i = h;
			return
		}
		function Cm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 8 | 0;
			m = h + 4 | 0;
			k = h;
			l = Tj(e) | 0;
			c[m >> 2] = l;
			e = Mo(m, 9344) | 0;
			cs(l) | 0;
			c[k >> 2] = c[d >> 2];
			c[j >> 2] = c[k >> 2];
			Dm(a, g + 20 | 0, b, j, f, e);
			i = h;
			return c[b >> 2] | 0
		}
		function Dm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			h = i;
			i = i + 16 | 0;
			a = h + 4 | 0;
			j = h;
			c[j >> 2] = c[e >> 2];
			c[a >> 2] = c[j >> 2];
			a = Xq(d, a, f, g, 4) | 0;
			if (!(c[f >> 2] & 4)) {
				if ((a | 0) < 69)
					a = a + 2e3 | 0;
				else
					a = (a + -69 | 0) >>> 0 < 31 ? a + 1900 | 0 : a;
				c[b >> 2] = a + -1900
			}
			i = h;
			return
		}
		function Em(b, d, e, f, g, h, j, k) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			k = k | 0;
			var l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0,
			E = 0,
			F = 0,
			G = 0,
			H = 0,
			I = 0,
			J = 0,
			K = 0,
			L = 0,
			M = 0,
			N = 0,
			O = 0,
			P = 0,
			Q = 0,
			R = 0,
			S = 0,
			T = 0,
			U = 0;
			S = i;
			i = i + 144 | 0;
			l = S + 132 | 0;
			k = S + 116 | 0;
			L = S + 128 | 0;
			w = S + 124 | 0;
			H = S + 120 | 0;
			M = S + 112 | 0;
			N = S + 108 | 0;
			O = S + 104 | 0;
			P = S + 100 | 0;
			Q = S + 96 | 0;
			R = S + 92 | 0;
			m = S + 88 | 0;
			n = S + 84 | 0;
			o = S + 80 | 0;
			p = S + 76 | 0;
			q = S + 72 | 0;
			r = S + 68 | 0;
			s = S + 64 | 0;
			t = S + 60 | 0;
			u = S + 56 | 0;
			v = S + 52 | 0;
			x = S + 48 | 0;
			y = S + 44 | 0;
			z = S + 40 | 0;
			A = S + 36 | 0;
			B = S + 32 | 0;
			C = S + 28 | 0;
			D = S + 24 | 0;
			E = S + 20 | 0;
			F = S + 16 | 0;
			G = S + 12 | 0;
			I = S + 8 | 0;
			J = S + 4 | 0;
			K = S;
			c[g >> 2] = 0;
			U = Tj(f) | 0;
			c[L >> 2] = U;
			L = Mo(L, 9344) | 0;
			cs(U) | 0;
			do
				switch (j << 24 >> 24 | 0) {
				case 65:
				case 97: {
						c[w >> 2] = c[e >> 2];
						c[l >> 2] = c[w >> 2];
						zm(b, h + 24 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 104:
				case 66:
				case 98: {
						c[H >> 2] = c[e >> 2];
						c[l >> 2] = c[H >> 2];
						Bm(b, h + 16 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 99: {
						U = b + 8 | 0;
						U = wb[c[(c[U >> 2] | 0) + 12 >> 2] & 127](U) | 0;
						c[M >> 2] = c[d >> 2];
						c[N >> 2] = c[e >> 2];
						j = a[U >> 0] | 0;
						e = (j & 1) == 0;
						T = U + 4 | 0;
						U = e ? T : c[U + 8 >> 2] | 0;
						T = U + ((e ? (j & 255) >>> 1 : c[T >> 2] | 0) << 2) | 0;
						c[k >> 2] = c[M >> 2];
						c[l >> 2] = c[N >> 2];
						c[d >> 2] = sm(b, k, l, f, g, h, U, T) | 0;
						T = 26;
						break
					}
				case 101:
				case 100: {
						c[O >> 2] = c[e >> 2];
						c[l >> 2] = c[O >> 2];
						Fm(b, h + 12 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 68: {
						c[P >> 2] = c[d >> 2];
						c[Q >> 2] = c[e >> 2];
						c[k >> 2] = c[P >> 2];
						c[l >> 2] = c[Q >> 2];
						c[d >> 2] = sm(b, k, l, f, g, h, 9952, 9984) | 0;
						T = 26;
						break
					}
				case 70: {
						c[R >> 2] = c[d >> 2];
						c[m >> 2] = c[e >> 2];
						c[k >> 2] = c[R >> 2];
						c[l >> 2] = c[m >> 2];
						c[d >> 2] = sm(b, k, l, f, g, h, 9984, 10016) | 0;
						T = 26;
						break
					}
				case 72: {
						c[n >> 2] = c[e >> 2];
						c[l >> 2] = c[n >> 2];
						Gm(b, h + 8 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 73: {
						c[o >> 2] = c[e >> 2];
						c[l >> 2] = c[o >> 2];
						Hm(b, h + 8 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 106: {
						c[p >> 2] = c[e >> 2];
						c[l >> 2] = c[p >> 2];
						Im(b, h + 28 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 109: {
						c[q >> 2] = c[e >> 2];
						c[l >> 2] = c[q >> 2];
						Jm(b, h + 16 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 77: {
						c[r >> 2] = c[e >> 2];
						c[l >> 2] = c[r >> 2];
						Km(b, h + 4 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 116:
				case 110: {
						c[s >> 2] = c[e >> 2];
						c[l >> 2] = c[s >> 2];
						Lm(b, d, l, g, L);
						T = 26;
						break
					}
				case 112: {
						c[t >> 2] = c[e >> 2];
						c[l >> 2] = c[t >> 2];
						Mm(b, h + 8 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 114: {
						c[u >> 2] = c[d >> 2];
						c[v >> 2] = c[e >> 2];
						c[k >> 2] = c[u >> 2];
						c[l >> 2] = c[v >> 2];
						c[d >> 2] = sm(b, k, l, f, g, h, 10016, 10060) | 0;
						T = 26;
						break
					}
				case 82: {
						c[x >> 2] = c[d >> 2];
						c[y >> 2] = c[e >> 2];
						c[k >> 2] = c[x >> 2];
						c[l >> 2] = c[y >> 2];
						c[d >> 2] = sm(b, k, l, f, g, h, 10060, 10080) | 0;
						T = 26;
						break
					}
				case 83: {
						c[z >> 2] = c[e >> 2];
						c[l >> 2] = c[z >> 2];
						Nm(b, h, d, l, g, L);
						T = 26;
						break
					}
				case 84: {
						c[A >> 2] = c[d >> 2];
						c[B >> 2] = c[e >> 2];
						c[k >> 2] = c[A >> 2];
						c[l >> 2] = c[B >> 2];
						c[d >> 2] = sm(b, k, l, f, g, h, 10080, 10112) | 0;
						T = 26;
						break
					}
				case 119: {
						c[C >> 2] = c[e >> 2];
						c[l >> 2] = c[C >> 2];
						Om(b, h + 24 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 120: {
						U = c[(c[b >> 2] | 0) + 20 >> 2] | 0;
						c[D >> 2] = c[d >> 2];
						c[E >> 2] = c[e >> 2];
						c[k >> 2] = c[D >> 2];
						c[l >> 2] = c[E >> 2];
						k = ub[U & 63](b, k, l, f, g, h) | 0;
						break
					}
				case 88: {
						U = b + 8 | 0;
						U = wb[c[(c[U >> 2] | 0) + 24 >> 2] & 127](U) | 0;
						c[F >> 2] = c[d >> 2];
						c[G >> 2] = c[e >> 2];
						j = a[U >> 0] | 0;
						e = (j & 1) == 0;
						T = U + 4 | 0;
						U = e ? T : c[U + 8 >> 2] | 0;
						T = U + ((e ? (j & 255) >>> 1 : c[T >> 2] | 0) << 2) | 0;
						c[k >> 2] = c[F >> 2];
						c[l >> 2] = c[G >> 2];
						c[d >> 2] = sm(b, k, l, f, g, h, U, T) | 0;
						T = 26;
						break
					}
				case 121: {
						c[I >> 2] = c[e >> 2];
						c[l >> 2] = c[I >> 2];
						Dm(b, h + 20 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 89: {
						c[J >> 2] = c[e >> 2];
						c[l >> 2] = c[J >> 2];
						Pm(b, h + 20 | 0, d, l, g, L);
						T = 26;
						break
					}
				case 37: {
						c[K >> 2] = c[e >> 2];
						c[l >> 2] = c[K >> 2];
						Qm(b, d, l, g, L);
						T = 26;
						break
					}
				default: {
						c[g >> 2] = c[g >> 2] | 4;
						T = 26
					}
				}
			while (0);
			if ((T | 0) == 26)
				k = c[d >> 2] | 0;
			i = S;
			return k | 0
		}
		function Fm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			h = i;
			i = i + 16 | 0;
			a = h + 4 | 0;
			j = h;
			c[j >> 2] = c[e >> 2];
			c[a >> 2] = c[j >> 2];
			a = Xq(d, a, f, g, 2) | 0;
			e = c[f >> 2] | 0;
			if ((a + -1 | 0) >>> 0 < 31 & (e & 4 | 0) == 0)
				c[b >> 2] = a;
			else
				c[f >> 2] = e | 4;
			i = h;
			return
		}
		function Gm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			h = i;
			i = i + 16 | 0;
			a = h + 4 | 0;
			j = h;
			c[j >> 2] = c[e >> 2];
			c[a >> 2] = c[j >> 2];
			a = Xq(d, a, f, g, 2) | 0;
			e = c[f >> 2] | 0;
			if ((a | 0) < 24 & (e & 4 | 0) == 0)
				c[b >> 2] = a;
			else
				c[f >> 2] = e | 4;
			i = h;
			return
		}
		function Hm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			h = i;
			i = i + 16 | 0;
			a = h + 4 | 0;
			j = h;
			c[j >> 2] = c[e >> 2];
			c[a >> 2] = c[j >> 2];
			a = Xq(d, a, f, g, 2) | 0;
			e = c[f >> 2] | 0;
			if ((a + -1 | 0) >>> 0 < 12 & (e & 4 | 0) == 0)
				c[b >> 2] = a;
			else
				c[f >> 2] = e | 4;
			i = h;
			return
		}
		function Im(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			h = i;
			i = i + 16 | 0;
			a = h + 4 | 0;
			j = h;
			c[j >> 2] = c[e >> 2];
			c[a >> 2] = c[j >> 2];
			a = Xq(d, a, f, g, 3) | 0;
			e = c[f >> 2] | 0;
			if ((a | 0) < 366 & (e & 4 | 0) == 0)
				c[b >> 2] = a;
			else
				c[f >> 2] = e | 4;
			i = h;
			return
		}
		function Jm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			h = i;
			i = i + 16 | 0;
			a = h + 4 | 0;
			j = h;
			c[j >> 2] = c[e >> 2];
			c[a >> 2] = c[j >> 2];
			a = Xq(d, a, f, g, 2) | 0;
			e = c[f >> 2] | 0;
			if ((a | 0) < 13 & (e & 4 | 0) == 0)
				c[b >> 2] = a + -1;
			else
				c[f >> 2] = e | 4;
			i = h;
			return
		}
		function Km(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			h = i;
			i = i + 16 | 0;
			a = h + 4 | 0;
			j = h;
			c[j >> 2] = c[e >> 2];
			c[a >> 2] = c[j >> 2];
			a = Xq(d, a, f, g, 2) | 0;
			e = c[f >> 2] | 0;
			if ((a | 0) < 60 & (e & 4 | 0) == 0)
				c[b >> 2] = a;
			else
				c[f >> 2] = e | 4;
			i = h;
			return
		}
		function Lm(a, b, d, e, f) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			i = 0;
			a : while (1) {
				a = c[b >> 2] | 0;
				do
					if (a) {
						g = c[a + 12 >> 2] | 0;
						if ((g | 0) == (c[a + 16 >> 2] | 0))
							a = wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0;
						else
							a = c[g >> 2] | 0;
						if ((a | 0) == -1) {
							c[b >> 2] = 0;
							h = 1;
							break
						} else {
							h = (c[b >> 2] | 0) == 0;
							break
						}
					} else
						h = 1;
				while (0);
				g = c[d >> 2] | 0;
				do
					if (g) {
						a = c[g + 12 >> 2] | 0;
						if ((a | 0) == (c[g + 16 >> 2] | 0))
							a = wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0;
						else
							a = c[a >> 2] | 0;
						if ((a | 0) != -1)
							if (h) {
								h = g;
								break
							} else {
								h = g;
								break a
							}
						else {
							c[d >> 2] = 0;
							i = 15;
							break
						}
					} else
						i = 15;
				while (0);
				if ((i | 0) == 15) {
					i = 0;
					if (h) {
						h = 0;
						break
					} else
						h = 0
				}
				a = c[b >> 2] | 0;
				g = c[a + 12 >> 2] | 0;
				if ((g | 0) == (c[a + 16 >> 2] | 0))
					a = wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0;
				else
					a = c[g >> 2] | 0;
				if (!(pb[c[(c[f >> 2] | 0) + 12 >> 2] & 31](f, 8192, a) | 0))
					break;
				a = c[b >> 2] | 0;
				g = a + 12 | 0;
				h = c[g >> 2] | 0;
				if ((h | 0) == (c[a + 16 >> 2] | 0)) {
					wb[c[(c[a >> 2] | 0) + 40 >> 2] & 127](a) | 0;
					continue
				} else {
					c[g >> 2] = h + 4;
					continue
				}
			}
			a = c[b >> 2] | 0;
			do
				if (a) {
					g = c[a + 12 >> 2] | 0;
					if ((g | 0) == (c[a + 16 >> 2] | 0))
						a = wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0;
					else
						a = c[g >> 2] | 0;
					if ((a | 0) == -1) {
						c[b >> 2] = 0;
						g = 1;
						break
					} else {
						g = (c[b >> 2] | 0) == 0;
						break
					}
				} else
					g = 1;
			while (0);
			do
				if (h) {
					a = c[h + 12 >> 2] | 0;
					if ((a | 0) == (c[h + 16 >> 2] | 0))
						a = wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0;
					else
						a = c[a >> 2] | 0;
					if ((a | 0) != -1)
						if (g)
							break;
						else {
							i = 39;
							break
						}
					else {
						c[d >> 2] = 0;
						i = 37;
						break
					}
				} else
					i = 37;
			while (0);
			if ((i | 0) == 37 ? g : 0)
				i = 39;
			if ((i | 0) == 39)
				c[e >> 2] = c[e >> 2] | 2;
			return
		}
		function Mm(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0;
			n = i;
			i = i + 16 | 0;
			k = n + 4 | 0;
			l = n;
			m = b + 8 | 0;
			m = wb[c[(c[m >> 2] | 0) + 8 >> 2] & 127](m) | 0;
			b = a[m >> 0] | 0;
			if (!(b & 1))
				j = (b & 255) >>> 1;
			else
				j = c[m + 4 >> 2] | 0;
			b = a[m + 12 >> 0] | 0;
			if (!(b & 1))
				b = (b & 255) >>> 1;
			else
				b = c[m + 16 >> 2] | 0;
			do
				if ((j | 0) != (0 - b | 0)) {
					c[l >> 2] = c[f >> 2];
					c[k >> 2] = c[l >> 2];
					b = Jq(e, k, m, m + 24 | 0, h, g, 0) | 0;
					j = c[d >> 2] | 0;
					if ((b | 0) == (m | 0) & (j | 0) == 12) {
						c[d >> 2] = 0;
						break
					}
					if ((j | 0) < 12 & (b - m | 0) == 12)
						c[d >> 2] = j + 12
				} else
					c[g >> 2] = c[g >> 2] | 4;
			while (0);
			i = n;
			return
		}
		function Nm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			h = i;
			i = i + 16 | 0;
			a = h + 4 | 0;
			j = h;
			c[j >> 2] = c[e >> 2];
			c[a >> 2] = c[j >> 2];
			a = Xq(d, a, f, g, 2) | 0;
			e = c[f >> 2] | 0;
			if ((a | 0) < 61 & (e & 4 | 0) == 0)
				c[b >> 2] = a;
			else
				c[f >> 2] = e | 4;
			i = h;
			return
		}
		function Om(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			h = i;
			i = i + 16 | 0;
			a = h + 4 | 0;
			j = h;
			c[j >> 2] = c[e >> 2];
			c[a >> 2] = c[j >> 2];
			a = Xq(d, a, f, g, 1) | 0;
			e = c[f >> 2] | 0;
			if ((a | 0) < 7 & (e & 4 | 0) == 0)
				c[b >> 2] = a;
			else
				c[f >> 2] = e | 4;
			i = h;
			return
		}
		function Pm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			h = i;
			i = i + 16 | 0;
			a = h + 4 | 0;
			j = h;
			c[j >> 2] = c[e >> 2];
			c[a >> 2] = c[j >> 2];
			a = Xq(d, a, f, g, 4) | 0;
			if (!(c[f >> 2] & 4))
				c[b >> 2] = a + -1900;
			i = h;
			return
		}
		function Qm(a, b, d, e, f) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			i = 0,
			j = 0;
			a = c[b >> 2] | 0;
			do
				if (a) {
					g = c[a + 12 >> 2] | 0;
					if ((g | 0) == (c[a + 16 >> 2] | 0))
						a = wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0;
					else
						a = c[g >> 2] | 0;
					if ((a | 0) == -1) {
						c[b >> 2] = 0;
						h = 1;
						break
					} else {
						h = (c[b >> 2] | 0) == 0;
						break
					}
				} else
					h = 1;
			while (0);
			g = c[d >> 2] | 0;
			do
				if (g) {
					a = c[g + 12 >> 2] | 0;
					if ((a | 0) == (c[g + 16 >> 2] | 0))
						a = wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0;
					else
						a = c[a >> 2] | 0;
					if ((a | 0) != -1)
						if (h) {
							i = g;
							j = 17;
							break
						} else {
							j = 16;
							break
						}
					else {
						c[d >> 2] = 0;
						j = 14;
						break
					}
				} else
					j = 14;
			while (0);
			if ((j | 0) == 14)
				if (h)
					j = 16;
				else {
					i = 0;
					j = 17
				}
			a : do
				if ((j | 0) == 16)
					c[e >> 2] = c[e >> 2] | 6;
				else if ((j | 0) == 17) {
					a = c[b >> 2] | 0;
					g = c[a + 12 >> 2] | 0;
					if ((g | 0) == (c[a + 16 >> 2] | 0))
						a = wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0;
					else
						a = c[g >> 2] | 0;
					if ((pb[c[(c[f >> 2] | 0) + 52 >> 2] & 31](f, a, 0) | 0) << 24 >> 24 != 37) {
						c[e >> 2] = c[e >> 2] | 4;
						break
					}
					a = c[b >> 2] | 0;
					g = a + 12 | 0;
					h = c[g >> 2] | 0;
					if ((h | 0) == (c[a + 16 >> 2] | 0)) {
						wb[c[(c[a >> 2] | 0) + 40 >> 2] & 127](a) | 0;
						a = c[b >> 2] | 0;
						if (!a)
							g = 1;
						else
							j = 25
					} else {
						c[g >> 2] = h + 4;
						j = 25
					}
					do
						if ((j | 0) == 25) {
							g = c[a + 12 >> 2] | 0;
							if ((g | 0) == (c[a + 16 >> 2] | 0))
								a = wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0;
							else
								a = c[g >> 2] | 0;
							if ((a | 0) == -1) {
								c[b >> 2] = 0;
								g = 1;
								break
							} else {
								g = (c[b >> 2] | 0) == 0;
								break
							}
						}
					while (0);
					do
						if (i) {
							a = c[i + 12 >> 2] | 0;
							if ((a | 0) == (c[i + 16 >> 2] | 0))
								a = wb[c[(c[i >> 2] | 0) + 36 >> 2] & 127](i) | 0;
							else
								a = c[a >> 2] | 0;
							if ((a | 0) != -1)
								if (g)
									break a;
								else
									break;
							else {
								c[d >> 2] = 0;
								j = 37;
								break
							}
						} else
							j = 37;
					while (0);
					if ((j | 0) == 37 ? !g : 0)
						break;
					c[e >> 2] = c[e >> 2] | 2
				}
			while (0);
			return
		}
		function Rm(a) {
			a = a | 0;
			Sm(a + 8 | 0);
			return
		}
		function Sm(a) {
			a = a | 0;
			var b = 0;
			b = c[a >> 2] | 0;
			if ((b | 0) != ($k() | 0))
				ci(c[a >> 2] | 0);
			return
		}
		function Tm(a) {
			a = a | 0;
			Sm(a + 8 | 0);
			ih(a);
			return
		}
		function Um(b, d, e, f, g, h, j) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0,
			l = 0;
			l = i;
			i = i + 112 | 0;
			k = l + 4 | 0;
			e = l;
			c[e >> 2] = k + 100;
			Vm(b + 8 | 0, k, e, g, h, j);
			h = c[e >> 2] | 0;
			e = c[d >> 2] | 0;
			if ((k | 0) != (h | 0))
				do {
					j = a[k >> 0] | 0;
					do
						if (e) {
							f = e + 24 | 0;
							g = c[f >> 2] | 0;
							if ((g | 0) == (c[e + 28 >> 2] | 0)) {
								d = (Cb[c[(c[e >> 2] | 0) + 52 >> 2] & 15](e, j & 255) | 0) == -1;
								e = d ? 0 : e;
								break
							} else {
								c[f >> 2] = g + 1;
								a[g >> 0] = j;
								break
							}
						} else
							e = 0;
					while (0);
					k = k + 1 | 0
				} while ((k | 0) != (h | 0));
			i = l;
			return e | 0
		}
		function Vm(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var j = 0,
			k = 0,
			l = 0,
			m = 0;
			m = i;
			i = i + 16 | 0;
			l = m;
			a[l >> 0] = 37;
			j = l + 1 | 0;
			a[j >> 0] = g;
			k = l + 2 | 0;
			a[k >> 0] = h;
			a[l + 3 >> 0] = 0;
			if (h << 24 >> 24) {
				a[j >> 0] = h;
				a[k >> 0] = g
			}
			c[e >> 2] = d + (Ia(d | 0, (c[e >> 2] | 0) - d | 0, l | 0, f | 0, c[b >> 2] | 0) | 0);
			i = m;
			return
		}
		function Wm(a) {
			a = a | 0;
			Sm(a + 8 | 0);
			return
		}
		function Xm(a) {
			a = a | 0;
			Sm(a + 8 | 0);
			ih(a);
			return
		}
		function Ym(a, b, d, e, f, g, h) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var j = 0;
			j = i;
			i = i + 416 | 0;
			e = j + 8 | 0;
			d = j;
			c[d >> 2] = e + 400;
			Zm(a + 8 | 0, e, d, f, g, h);
			a = c[d >> 2] | 0;
			d = c[b >> 2] | 0;
			if ((e | 0) != (a | 0)) {
				g = e;
				do {
					e = c[g >> 2] | 0;
					if (!d)
						d = 0;
					else {
						f = d + 24 | 0;
						h = c[f >> 2] | 0;
						if ((h | 0) == (c[d + 28 >> 2] | 0))
							e = Cb[c[(c[d >> 2] | 0) + 52 >> 2] & 15](d, e) | 0;
						else {
							c[f >> 2] = h + 4;
							c[h >> 2] = e
						}
						d = (e | 0) == -1 ? 0 : d
					}
					g = g + 4 | 0
				} while ((g | 0) != (a | 0))
			}
			i = j;
			return d | 0
		}
		function Zm(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 128 | 0;
			l = h + 16 | 0;
			m = h + 12 | 0;
			j = h;
			k = h + 8 | 0;
			c[m >> 2] = l + 100;
			Vm(a, l, m, e, f, g);
			g = j;
			c[g >> 2] = 0;
			c[g + 4 >> 2] = 0;
			c[k >> 2] = l;
			g = (c[d >> 2] | 0) - b >> 2;
			e = gi(c[a >> 2] | 0) | 0;
			g = ti(b, k, g, j) | 0;
			if (e)
				gi(e) | 0;
			c[d >> 2] = b + (g << 2);
			i = h;
			return
		}
		function _m(a) {
			a = a | 0;
			return
		}
		function $m(a) {
			a = a | 0;
			ih(a);
			return
		}
		function an(a) {
			a = a | 0;
			return 127
		}
		function bn(a) {
			a = a | 0;
			return 127
		}
		function cn(a, b) {
			a = a | 0;
			b = b | 0;
			c[a >> 2] = 0;
			c[a + 4 >> 2] = 0;
			c[a + 8 >> 2] = 0;
			return
		}
		function dn(a, b) {
			a = a | 0;
			b = b | 0;
			c[a >> 2] = 0;
			c[a + 4 >> 2] = 0;
			c[a + 8 >> 2] = 0;
			return
		}
		function en(a, b) {
			a = a | 0;
			b = b | 0;
			c[a >> 2] = 0;
			c[a + 4 >> 2] = 0;
			c[a + 8 >> 2] = 0;
			return
		}
		function fn(a, b) {
			a = a | 0;
			b = b | 0;
			pj(a, 1, 45);
			return
		}
		function gn(a) {
			a = a | 0;
			return 0
		}
		function hn(b, c) {
			b = b | 0;
			c = c | 0;
			a[b >> 0] = 2;
			a[b + 1 >> 0] = 3;
			a[b + 2 >> 0] = 0;
			a[b + 3 >> 0] = 4;
			return
		}
		function jn(b, c) {
			b = b | 0;
			c = c | 0;
			a[b >> 0] = 2;
			a[b + 1 >> 0] = 3;
			a[b + 2 >> 0] = 0;
			a[b + 3 >> 0] = 4;
			return
		}
		function kn(a) {
			a = a | 0;
			return
		}
		function ln(a) {
			a = a | 0;
			ih(a);
			return
		}
		function mn(a) {
			a = a | 0;
			return 127
		}
		function nn(a) {
			a = a | 0;
			return 127
		}
		function on(a, b) {
			a = a | 0;
			b = b | 0;
			c[a >> 2] = 0;
			c[a + 4 >> 2] = 0;
			c[a + 8 >> 2] = 0;
			return
		}
		function pn(a, b) {
			a = a | 0;
			b = b | 0;
			c[a >> 2] = 0;
			c[a + 4 >> 2] = 0;
			c[a + 8 >> 2] = 0;
			return
		}
		function qn(a, b) {
			a = a | 0;
			b = b | 0;
			c[a >> 2] = 0;
			c[a + 4 >> 2] = 0;
			c[a + 8 >> 2] = 0;
			return
		}
		function rn(a, b) {
			a = a | 0;
			b = b | 0;
			pj(a, 1, 45);
			return
		}
		function sn(a) {
			a = a | 0;
			return 0
		}
		function tn(b, c) {
			b = b | 0;
			c = c | 0;
			a[b >> 0] = 2;
			a[b + 1 >> 0] = 3;
			a[b + 2 >> 0] = 0;
			a[b + 3 >> 0] = 4;
			return
		}
		function un(b, c) {
			b = b | 0;
			c = c | 0;
			a[b >> 0] = 2;
			a[b + 1 >> 0] = 3;
			a[b + 2 >> 0] = 0;
			a[b + 3 >> 0] = 4;
			return
		}
		function vn(a) {
			a = a | 0;
			return
		}
		function wn(a) {
			a = a | 0;
			ih(a);
			return
		}
		function xn(a) {
			a = a | 0;
			return 2147483647
		}
		function yn(a) {
			a = a | 0;
			return 2147483647
		}
		function zn(a, b) {
			a = a | 0;
			b = b | 0;
			c[a >> 2] = 0;
			c[a + 4 >> 2] = 0;
			c[a + 8 >> 2] = 0;
			return
		}
		function An(a, b) {
			a = a | 0;
			b = b | 0;
			c[a >> 2] = 0;
			c[a + 4 >> 2] = 0;
			c[a + 8 >> 2] = 0;
			return
		}
		function Bn(a, b) {
			a = a | 0;
			b = b | 0;
			c[a >> 2] = 0;
			c[a + 4 >> 2] = 0;
			c[a + 8 >> 2] = 0;
			return
		}
		function Cn(a, b) {
			a = a | 0;
			b = b | 0;
			Ej(a, 1, 45);
			return
		}
		function Dn(a) {
			a = a | 0;
			return 0
		}
		function En(b, c) {
			b = b | 0;
			c = c | 0;
			a[b >> 0] = 2;
			a[b + 1 >> 0] = 3;
			a[b + 2 >> 0] = 0;
			a[b + 3 >> 0] = 4;
			return
		}
		function Fn(b, c) {
			b = b | 0;
			c = c | 0;
			a[b >> 0] = 2;
			a[b + 1 >> 0] = 3;
			a[b + 2 >> 0] = 0;
			a[b + 3 >> 0] = 4;
			return
		}
		function Gn(a) {
			a = a | 0;
			return
		}
		function Hn(a) {
			a = a | 0;
			ih(a);
			return
		}
		function In(a) {
			a = a | 0;
			return 2147483647
		}
		function Jn(a) {
			a = a | 0;
			return 2147483647
		}
		function Kn(a, b) {
			a = a | 0;
			b = b | 0;
			c[a >> 2] = 0;
			c[a + 4 >> 2] = 0;
			c[a + 8 >> 2] = 0;
			return
		}
		function Ln(a, b) {
			a = a | 0;
			b = b | 0;
			c[a >> 2] = 0;
			c[a + 4 >> 2] = 0;
			c[a + 8 >> 2] = 0;
			return
		}
		function Mn(a, b) {
			a = a | 0;
			b = b | 0;
			c[a >> 2] = 0;
			c[a + 4 >> 2] = 0;
			c[a + 8 >> 2] = 0;
			return
		}
		function Nn(a, b) {
			a = a | 0;
			b = b | 0;
			Ej(a, 1, 45);
			return
		}
		function On(a) {
			a = a | 0;
			return 0
		}
		function Pn(b, c) {
			b = b | 0;
			c = c | 0;
			a[b >> 0] = 2;
			a[b + 1 >> 0] = 3;
			a[b + 2 >> 0] = 0;
			a[b + 3 >> 0] = 4;
			return
		}
		function Qn(b, c) {
			b = b | 0;
			c = c | 0;
			a[b >> 0] = 2;
			a[b + 1 >> 0] = 3;
			a[b + 2 >> 0] = 0;
			a[b + 3 >> 0] = 4;
			return
		}
		function Rn(a) {
			a = a | 0;
			return
		}
		function Sn(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Tn(b, d, e, f, g, h, j) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0,
			E = 0;
			E = i;
			i = i + 240 | 0;
			x = E + 24 | 0;
			y = E;
			u = E + 136 | 0;
			D = E + 16 | 0;
			v = E + 12 | 0;
			A = E + 8 | 0;
			k = E + 134 | 0;
			s = E + 4 | 0;
			w = E + 124 | 0;
			c[D >> 2] = u;
			C = D + 4 | 0;
			c[C >> 2] = 144;
			c[A >> 2] = Tj(g) | 0;
			b = Mo(A, 9352) | 0;
			a[k >> 0] = 0;
			c[s >> 2] = c[e >> 2];
			t = c[g + 4 >> 2] | 0;
			c[x >> 2] = c[s >> 2];
			if (Vn(d, x, f, A, t, h, k, b, D, v, u + 100 | 0) | 0) {
				Ab[c[(c[b >> 2] | 0) + 32 >> 2] & 7](b, 23567, 23577, w) | 0;
				f = c[v >> 2] | 0;
				g = c[D >> 2] | 0;
				b = f - g | 0;
				if ((b | 0) > 98) {
					b = fj(b + 2 | 0) | 0;
					if (!b)
						Nh();
					else {
						z = b;
						l = b
					}
				} else {
					z = 0;
					l = x
				}
				if (!(a[k >> 0] | 0))
					b = l;
				else {
					a[l >> 0] = 45;
					b = l + 1 | 0
				}
				t = w + 10 | 0;
				u = w;
				if (g >>> 0 < f >>> 0) {
					k = w + 1 | 0;
					l = k + 1 | 0;
					m = l + 1 | 0;
					n = m + 1 | 0;
					o = n + 1 | 0;
					p = o + 1 | 0;
					q = p + 1 | 0;
					r = q + 1 | 0;
					s = r + 1 | 0;
					do {
						f = a[g >> 0] | 0;
						if ((a[w >> 0] | 0) != f << 24 >> 24)
							if ((a[k >> 0] | 0) != f << 24 >> 24)
								if ((a[l >> 0] | 0) != f << 24 >> 24)
									if ((a[m >> 0] | 0) != f << 24 >> 24)
										if ((a[n >> 0] | 0) != f << 24 >> 24)
											if ((a[o >> 0] | 0) != f << 24 >> 24)
												if ((a[p >> 0] | 0) != f << 24 >> 24)
													if ((a[q >> 0] | 0) != f << 24 >> 24)
														if ((a[r >> 0] | 0) == f << 24 >> 24)
															f = r;
														else
															f = (a[s >> 0] | 0) == f << 24 >> 24 ? s : t;
													else
														f = q;
												else
													f = p;
											else
												f = o;
										else
											f = n;
									else
										f = m;
								else
									f = l;
							else
								f = k;
						else
							f = w;
						a[b >> 0] = a[23567 + (f - u) >> 0] | 0;
						g = g + 1 | 0;
						b = b + 1 | 0
					} while (g >>> 0 < (c[v >> 2] | 0) >>> 0)
				}
				a[b >> 0] = 0;
				c[y >> 2] = j;
				Hi(x, 23578, y) | 0;
				if (z)
					gj(z)
			}
			b = c[d >> 2] | 0;
			do
				if (b) {
					if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0))
						if ((wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1) {
							c[d >> 2] = 0;
							b = 0;
							break
						} else {
							b = c[d >> 2] | 0;
							break
						}
				} else
					b = 0;
			while (0);
			b = (b | 0) == 0;
			f = c[e >> 2] | 0;
			do
				if (f) {
					if ((c[f + 12 >> 2] | 0) == (c[f + 16 >> 2] | 0) ? (wb[c[(c[f >> 2] | 0) + 36 >> 2] & 127](f) | 0) == -1 : 0) {
						c[e >> 2] = 0;
						B = 25;
						break
					}
					if (!b)
						B = 26
				} else
					B = 25;
			while (0);
			if ((B | 0) == 25 ? b : 0)
				B = 26;
			if ((B | 0) == 26)
				c[h >> 2] = c[h >> 2] | 2;
			f = c[d >> 2] | 0;
			cs(c[A >> 2] | 0) | 0;
			b = c[D >> 2] | 0;
			c[D >> 2] = 0;
			if (b)
				sb[c[C >> 2] & 255](b);
			i = E;
			return f | 0
		}
		function Un(a) {
			a = a | 0;
			return
		}
		function Vn(e, f, g, h, j, k, l, m, n, o, p) {
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			k = k | 0;
			l = l | 0;
			m = m | 0;
			n = n | 0;
			o = o | 0;
			p = p | 0;
			var q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0,
			E = 0,
			F = 0,
			G = 0,
			H = 0,
			I = 0,
			J = 0,
			K = 0,
			L = 0,
			M = 0,
			N = 0,
			O = 0,
			P = 0,
			Q = 0,
			R = 0,
			S = 0,
			T = 0,
			U = 0,
			V = 0,
			W = 0,
			X = 0,
			Y = 0,
			Z = 0,
			_ = 0,
			$ = 0,
			aa = 0,
			ba = 0,
			ca = 0;
			ca = i;
			i = i + 512 | 0;
			O = ca + 88 | 0;
			t = ca + 96 | 0;
			ba = ca + 80 | 0;
			Q = ca + 72 | 0;
			U = ca + 68 | 0;
			T = ca + 500 | 0;
			S = ca + 497 | 0;
			R = ca + 496 | 0;
			$ = ca + 56 | 0;
			Z = ca + 44 | 0;
			Y = ca + 32 | 0;
			aa = ca + 20 | 0;
			_ = ca + 8 | 0;
			P = ca + 4 | 0;
			W = ca;
			c[O >> 2] = p;
			c[ba >> 2] = t;
			X = ba + 4 | 0;
			c[X >> 2] = 144;
			c[Q >> 2] = t;
			c[U >> 2] = t + 400;
			c[$ >> 2] = 0;
			c[$ + 4 >> 2] = 0;
			c[$ + 8 >> 2] = 0;
			c[Z >> 2] = 0;
			c[Z + 4 >> 2] = 0;
			c[Z + 8 >> 2] = 0;
			c[Y >> 2] = 0;
			c[Y + 4 >> 2] = 0;
			c[Y + 8 >> 2] = 0;
			c[aa >> 2] = 0;
			c[aa + 4 >> 2] = 0;
			c[aa + 8 >> 2] = 0;
			c[_ >> 2] = 0;
			c[_ + 4 >> 2] = 0;
			c[_ + 8 >> 2] = 0;
			Xn(g, h, T, S, R, $, Z, Y, aa, P);
			c[o >> 2] = c[n >> 2];
			H = m + 8 | 0;
			I = Y + 4 | 0;
			J = aa + 4 | 0;
			K = aa + 8 | 0;
			L = aa + 1 | 0;
			M = Y + 8 | 0;
			N = Y + 1 | 0;
			x = (j & 512 | 0) != 0;
			y = Z + 8 | 0;
			z = Z + 1 | 0;
			A = Z + 4 | 0;
			B = _ + 4 | 0;
			C = _ + 8 | 0;
			D = _ + 1 | 0;
			E = T + 3 | 0;
			F = $ + 4 | 0;
			G = 0;
			s = 0;
			a : while (1) {
				p = c[e >> 2] | 0;
				do
					if (p) {
						if ((c[p + 12 >> 2] | 0) == (c[p + 16 >> 2] | 0))
							if ((wb[c[(c[p >> 2] | 0) + 36 >> 2] & 127](p) | 0) == -1) {
								c[e >> 2] = 0;
								p = 0;
								break
							} else {
								p = c[e >> 2] | 0;
								break
							}
					} else
						p = 0;
				while (0);
				p = (p | 0) == 0;
				g = c[f >> 2] | 0;
				do
					if (g) {
						if ((c[g + 12 >> 2] | 0) != (c[g + 16 >> 2] | 0))
							if (p)
								break;
							else {
								V = 202;
								break a
							}
						if ((wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0) != -1)
							if (p)
								break;
							else {
								V = 202;
								break a
							}
						else {
							c[f >> 2] = 0;
							V = 12;
							break
						}
					} else
						V = 12;
				while (0);
				if ((V | 0) == 12) {
					V = 0;
					if (p) {
						V = 202;
						break
					} else
						g = 0
				}
				b : do
					switch (a[T + G >> 0] | 0) {
					case 1: {
							if ((G | 0) != 3) {
								p = c[e >> 2] | 0;
								h = c[p + 12 >> 2] | 0;
								if ((h | 0) == (c[p + 16 >> 2] | 0))
									p = wb[c[(c[p >> 2] | 0) + 36 >> 2] & 127](p) | 0;
								else
									p = d[h >> 0] | 0;
								if ((p & 255) << 24 >> 24 <= -1) {
									V = 26;
									break a
								}
								if (!(b[(c[H >> 2] | 0) + (p << 24 >> 24 << 1) >> 1] & 8192)) {
									V = 26;
									break a
								}
								p = c[e >> 2] | 0;
								h = p + 12 | 0;
								m = c[h >> 2] | 0;
								if ((m | 0) == (c[p + 16 >> 2] | 0))
									p = wb[c[(c[p >> 2] | 0) + 40 >> 2] & 127](p) | 0;
								else {
									c[h >> 2] = m + 1;
									p = d[m >> 0] | 0
								}
								yj(_, p & 255);
								p = g;
								h = g;
								V = 28
							}
							break
						}
					case 0: {
							if ((G | 0) != 3) {
								p = g;
								h = g;
								V = 28
							}
							break
						}
					case 3: {
							m = a[Y >> 0] | 0;
							p = (m & 1) == 0 ? (m & 255) >>> 1 : c[I >> 2] | 0;
							h = a[aa >> 0] | 0;
							h = (h & 1) == 0 ? (h & 255) >>> 1 : c[J >> 2] | 0;
							if ((p | 0) != (0 - h | 0)) {
								j = (p | 0) == 0;
								q = c[e >> 2] | 0;
								r = c[q + 12 >> 2] | 0;
								p = c[q + 16 >> 2] | 0;
								g = (r | 0) == (p | 0);
								if (j | (h | 0) == 0) {
									if (g)
										p = wb[c[(c[q >> 2] | 0) + 36 >> 2] & 127](q) | 0;
									else
										p = d[r >> 0] | 0;
									p = p & 255;
									if (j) {
										if (p << 24 >> 24 != (a[((a[aa >> 0] & 1) == 0 ? L : c[K >> 2] | 0) >> 0] | 0))
											break b;
										p = c[e >> 2] | 0;
										g = p + 12 | 0;
										h = c[g >> 2] | 0;
										if ((h | 0) == (c[p + 16 >> 2] | 0))
											wb[c[(c[p >> 2] | 0) + 40 >> 2] & 127](p) | 0;
										else
											c[g >> 2] = h + 1;
										a[l >> 0] = 1;
										w = a[aa >> 0] | 0;
										s = ((w & 1) == 0 ? (w & 255) >>> 1 : c[J >> 2] | 0) >>> 0 > 1 ? aa : s;
										break b
									}
									if (p << 24 >> 24 != (a[((a[Y >> 0] & 1) == 0 ? N : c[M >> 2] | 0) >> 0] | 0)) {
										a[l >> 0] = 1;
										break b
									}
									p = c[e >> 2] | 0;
									g = p + 12 | 0;
									h = c[g >> 2] | 0;
									if ((h | 0) == (c[p + 16 >> 2] | 0))
										wb[c[(c[p >> 2] | 0) + 40 >> 2] & 127](p) | 0;
									else
										c[g >> 2] = h + 1;
									w = a[Y >> 0] | 0;
									s = ((w & 1) == 0 ? (w & 255) >>> 1 : c[I >> 2] | 0) >>> 0 > 1 ? Y : s;
									break b
								}
								if (g) {
									j = wb[c[(c[q >> 2] | 0) + 36 >> 2] & 127](q) | 0;
									p = c[e >> 2] | 0;
									m = a[Y >> 0] | 0;
									q = p;
									h = c[p + 12 >> 2] | 0;
									p = c[p + 16 >> 2] | 0
								} else {
									j = d[r >> 0] | 0;
									h = r
								}
								g = q + 12 | 0;
								p = (h | 0) == (p | 0);
								if ((j & 255) << 24 >> 24 == (a[((m & 1) == 0 ? N : c[M >> 2] | 0) >> 0] | 0)) {
									if (p)
										wb[c[(c[q >> 2] | 0) + 40 >> 2] & 127](q) | 0;
									else
										c[g >> 2] = h + 1;
									w = a[Y >> 0] | 0;
									s = ((w & 1) == 0 ? (w & 255) >>> 1 : c[I >> 2] | 0) >>> 0 > 1 ? Y : s;
									break b
								}
								if (p)
									p = wb[c[(c[q >> 2] | 0) + 36 >> 2] & 127](q) | 0;
								else
									p = d[h >> 0] | 0;
								if ((p & 255) << 24 >> 24 != (a[((a[aa >> 0] & 1) == 0 ? L : c[K >> 2] | 0) >> 0] | 0)) {
									V = 82;
									break a
								}
								p = c[e >> 2] | 0;
								g = p + 12 | 0;
								h = c[g >> 2] | 0;
								if ((h | 0) == (c[p + 16 >> 2] | 0))
									wb[c[(c[p >> 2] | 0) + 40 >> 2] & 127](p) | 0;
								else
									c[g >> 2] = h + 1;
								a[l >> 0] = 1;
								w = a[aa >> 0] | 0;
								s = ((w & 1) == 0 ? (w & 255) >>> 1 : c[J >> 2] | 0) >>> 0 > 1 ? aa : s
							}
							break
						}
					case 2: {
							if (!(G >>> 0 < 2 | (s | 0) != 0) ? !(x | (G | 0) == 2 & (a[E >> 0] | 0) != 0) : 0) {
								s = 0;
								break b
							}
							v = a[Z >> 0] | 0;
							p = (v & 1) == 0;
							w = c[y >> 2] | 0;
							m = p ? z : w;
							u = m;
							c : do
								if ((G | 0) != 0 ? (d[T + (G + -1) >> 0] | 0) < 2 : 0) {
									r = p ? (v & 255) >>> 1 : c[A >> 2] | 0;
									j = m + r | 0;
									q = c[H >> 2] | 0;
									d : do
										if (!r)
											h = u;
										else {
											r = m;
											h = u;
											do {
												p = a[r >> 0] | 0;
												if (p << 24 >> 24 <= -1)
													break d;
												if (!(b[q + (p << 24 >> 24 << 1) >> 1] & 8192))
													break d;
												r = r + 1 | 0;
												h = r
											} while ((r | 0) != (j | 0))
										}
									while (0);
									j = h - u | 0;
									q = a[_ >> 0] | 0;
									p = (q & 1) == 0;
									q = p ? (q & 255) >>> 1 : c[B >> 2] | 0;
									if (q >>> 0 >= j >>> 0) {
										p = p ? D : c[C >> 2] | 0;
										r = p + q | 0;
										if ((h | 0) != (u | 0)) {
											p = p + (q - j) | 0;
											while (1) {
												if ((a[p >> 0] | 0) != (a[m >> 0] | 0)) {
													h = u;
													break c
												}
												p = p + 1 | 0;
												if ((p | 0) == (r | 0))
													break;
												else
													m = m + 1 | 0
											}
										}
									} else
										h = u
								} else
									h = u;
							while (0);
							p = (v & 1) == 0;
							p = (p ? z : w) + (p ? (v & 255) >>> 1 : c[A >> 2] | 0) | 0;
							e : do
								if ((h | 0) != (p | 0)) {
									j = g;
									m = g;
									p = h;
									while (1) {
										g = c[e >> 2] | 0;
										do
											if (g) {
												if ((c[g + 12 >> 2] | 0) == (c[g + 16 >> 2] | 0))
													if ((wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0) == -1) {
														c[e >> 2] = 0;
														g = 0;
														break
													} else {
														g = c[e >> 2] | 0;
														break
													}
											} else
												g = 0;
										while (0);
										h = (g | 0) == 0;
										do
											if (m) {
												if ((c[m + 12 >> 2] | 0) != (c[m + 16 >> 2] | 0))
													if (h) {
														g = j;
														q = m;
														break
													} else
														break e;
												if ((wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) != -1)
													if (h^(j | 0) == 0) {
														g = j;
														q = j;
														break
													} else
														break e;
												else {
													c[f >> 2] = 0;
													g = 0;
													V = 107;
													break
												}
											} else {
												g = j;
												V = 107
											}
										while (0);
										if ((V | 0) == 107) {
											V = 0;
											if (h)
												break e;
											else
												q = 0
										}
										h = c[e >> 2] | 0;
										m = c[h + 12 >> 2] | 0;
										if ((m | 0) == (c[h + 16 >> 2] | 0))
											h = wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0;
										else
											h = d[m >> 0] | 0;
										if ((h & 255) << 24 >> 24 != (a[p >> 0] | 0))
											break e;
										h = c[e >> 2] | 0;
										m = h + 12 | 0;
										j = c[m >> 2] | 0;
										if ((j | 0) == (c[h + 16 >> 2] | 0))
											wb[c[(c[h >> 2] | 0) + 40 >> 2] & 127](h) | 0;
										else
											c[m >> 2] = j + 1;
										p = p + 1 | 0;
										h = a[Z >> 0] | 0;
										w = (h & 1) == 0;
										h = (w ? z : c[y >> 2] | 0) + (w ? (h & 255) >>> 1 : c[A >> 2] | 0) | 0;
										if ((p | 0) == (h | 0)) {
											p = h;
											break
										} else {
											j = g;
											m = q
										}
									}
								}
							while (0);
							if (x ? (w = a[Z >> 0] | 0, v = (w & 1) == 0, (p | 0) != ((v ? z : c[y >> 2] | 0) + (v ? (w & 255) >>> 1 : c[A >> 2] | 0) | 0)) : 0) {
								V = 119;
								break a
							}
							break
						}
					case 4: {
							r = a[R >> 0] | 0;
							j = g;
							m = g;
							p = 0;
							f : while (1) {
								g = c[e >> 2] | 0;
								do
									if (g) {
										if ((c[g + 12 >> 2] | 0) == (c[g + 16 >> 2] | 0))
											if ((wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0) == -1) {
												c[e >> 2] = 0;
												g = 0;
												break
											} else {
												g = c[e >> 2] | 0;
												break
											}
									} else
										g = 0;
								while (0);
								h = (g | 0) == 0;
								do
									if (m) {
										if ((c[m + 12 >> 2] | 0) != (c[m + 16 >> 2] | 0))
											if (h) {
												g = j;
												q = m;
												break
											} else {
												g = j;
												break f
											}
										if ((wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) != -1)
											if (h^(j | 0) == 0) {
												g = j;
												q = j;
												break
											} else {
												g = j;
												break f
											}
										else {
											c[f >> 2] = 0;
											g = 0;
											V = 130;
											break
										}
									} else {
										g = j;
										V = 130
									}
								while (0);
								if ((V | 0) == 130) {
									V = 0;
									if (h)
										break;
									else
										q = 0
								}
								h = c[e >> 2] | 0;
								m = c[h + 12 >> 2] | 0;
								if ((m | 0) == (c[h + 16 >> 2] | 0))
									h = wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0;
								else
									h = d[m >> 0] | 0;
								m = h & 255;
								if (m << 24 >> 24 > -1 ? (b[(c[H >> 2] | 0) + (h << 24 >> 24 << 1) >> 1] & 2048) != 0 : 0) {
									h = c[o >> 2] | 0;
									if ((h | 0) == (c[O >> 2] | 0)) {
										Yq(n, o, O);
										h = c[o >> 2] | 0
									}
									c[o >> 2] = h + 1;
									a[h >> 0] = m;
									p = p + 1 | 0
								} else {
									w = a[$ >> 0] | 0;
									if (!(m << 24 >> 24 == r << 24 >> 24 & ((p | 0) != 0 ? (((w & 1) == 0 ? (w & 255) >>> 1 : c[F >> 2] | 0) | 0) != 0 : 0)))
										break;
									if ((t | 0) == (c[U >> 2] | 0)) {
										Zq(ba, Q, U);
										t = c[Q >> 2] | 0
									}
									w = t + 4 | 0;
									c[Q >> 2] = w;
									c[t >> 2] = p;
									t = w;
									p = 0
								}
								h = c[e >> 2] | 0;
								m = h + 12 | 0;
								j = c[m >> 2] | 0;
								if ((j | 0) == (c[h + 16 >> 2] | 0)) {
									wb[c[(c[h >> 2] | 0) + 40 >> 2] & 127](h) | 0;
									j = g;
									m = q;
									continue
								} else {
									c[m >> 2] = j + 1;
									j = g;
									m = q;
									continue
								}
							}
							if ((p | 0) != 0 ? (c[ba >> 2] | 0) != (t | 0) : 0) {
								if ((t | 0) == (c[U >> 2] | 0)) {
									Zq(ba, Q, U);
									t = c[Q >> 2] | 0
								}
								w = t + 4 | 0;
								c[Q >> 2] = w;
								c[t >> 2] = p;
								t = w
							}
							q = c[P >> 2] | 0;
							if ((q | 0) > 0) {
								p = c[e >> 2] | 0;
								do
									if (p) {
										if ((c[p + 12 >> 2] | 0) == (c[p + 16 >> 2] | 0))
											if ((wb[c[(c[p >> 2] | 0) + 36 >> 2] & 127](p) | 0) == -1) {
												c[e >> 2] = 0;
												p = 0;
												break
											} else {
												p = c[e >> 2] | 0;
												break
											}
									} else
										p = 0;
								while (0);
								p = (p | 0) == 0;
								do
									if (g) {
										if ((c[g + 12 >> 2] | 0) == (c[g + 16 >> 2] | 0) ? (wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0) == -1 : 0) {
											c[f >> 2] = 0;
											V = 162;
											break
										}
										if (p)
											m = g;
										else {
											V = 167;
											break a
										}
									} else
										V = 162;
								while (0);
								if ((V | 0) == 162) {
									V = 0;
									if (p) {
										V = 167;
										break a
									} else
										m = 0
								}
								p = c[e >> 2] | 0;
								g = c[p + 12 >> 2] | 0;
								if ((g | 0) == (c[p + 16 >> 2] | 0))
									p = wb[c[(c[p >> 2] | 0) + 36 >> 2] & 127](p) | 0;
								else
									p = d[g >> 0] | 0;
								if ((p & 255) << 24 >> 24 != (a[S >> 0] | 0)) {
									V = 167;
									break a
								}
								p = c[e >> 2] | 0;
								g = p + 12 | 0;
								h = c[g >> 2] | 0;
								if ((h | 0) == (c[p + 16 >> 2] | 0))
									wb[c[(c[p >> 2] | 0) + 40 >> 2] & 127](p) | 0;
								else
									c[g >> 2] = h + 1;
								if ((q | 0) > 0) {
									j = m;
									h = m;
									while (1) {
										p = c[e >> 2] | 0;
										do
											if (p) {
												if ((c[p + 12 >> 2] | 0) == (c[p + 16 >> 2] | 0))
													if ((wb[c[(c[p >> 2] | 0) + 36 >> 2] & 127](p) | 0) == -1) {
														c[e >> 2] = 0;
														p = 0;
														break
													} else {
														p = c[e >> 2] | 0;
														break
													}
											} else
												p = 0;
										while (0);
										g = (p | 0) == 0;
										do
											if (h) {
												if ((c[h + 12 >> 2] | 0) != (c[h + 16 >> 2] | 0))
													if (g) {
														p = j;
														r = h;
														break
													} else {
														V = 189;
														break a
													}
												if ((wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0) != -1)
													if (g^(j | 0) == 0) {
														p = j;
														r = j;
														break
													} else {
														V = 189;
														break a
													}
												else {
													c[f >> 2] = 0;
													p = 0;
													V = 182;
													break
												}
											} else {
												p = j;
												V = 182
											}
										while (0);
										if ((V | 0) == 182) {
											V = 0;
											if (g) {
												V = 189;
												break a
											} else
												r = 0
										}
										g = c[e >> 2] | 0;
										h = c[g + 12 >> 2] | 0;
										if ((h | 0) == (c[g + 16 >> 2] | 0))
											g = wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0;
										else
											g = d[h >> 0] | 0;
										if ((g & 255) << 24 >> 24 <= -1) {
											V = 189;
											break a
										}
										if (!(b[(c[H >> 2] | 0) + (g << 24 >> 24 << 1) >> 1] & 2048)) {
											V = 189;
											break a
										}
										if ((c[o >> 2] | 0) == (c[O >> 2] | 0))
											Yq(n, o, O);
										g = c[e >> 2] | 0;
										h = c[g + 12 >> 2] | 0;
										if ((h | 0) == (c[g + 16 >> 2] | 0))
											g = wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0;
										else
											g = d[h >> 0] | 0;
										h = c[o >> 2] | 0;
										c[o >> 2] = h + 1;
										a[h >> 0] = g;
										g = q;
										q = q + -1 | 0;
										c[P >> 2] = q;
										h = c[e >> 2] | 0;
										m = h + 12 | 0;
										j = c[m >> 2] | 0;
										if ((j | 0) == (c[h + 16 >> 2] | 0))
											wb[c[(c[h >> 2] | 0) + 40 >> 2] & 127](h) | 0;
										else
											c[m >> 2] = j + 1;
										if ((g | 0) <= 1)
											break;
										else {
											j = p;
											h = r
										}
									}
								}
							}
							if ((c[o >> 2] | 0) == (c[n >> 2] | 0)) {
								V = 200;
								break a
							}
							break
						}
					default: {}

					}
				while (0);
				g : do
					if ((V | 0) == 28)
						while (1) {
							V = 0;
							g = c[e >> 2] | 0;
							do
								if (g) {
									if ((c[g + 12 >> 2] | 0) == (c[g + 16 >> 2] | 0))
										if ((wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0) == -1) {
											c[e >> 2] = 0;
											g = 0;
											break
										} else {
											g = c[e >> 2] | 0;
											break
										}
								} else
									g = 0;
							while (0);
							g = (g | 0) == 0;
							do
								if (h) {
									if ((c[h + 12 >> 2] | 0) != (c[h + 16 >> 2] | 0))
										if (g) {
											j = p;
											m = h;
											break
										} else
											break g;
									if ((wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0) != -1)
										if (g^(p | 0) == 0) {
											j = p;
											m = p;
											break
										} else
											break g;
									else {
										c[f >> 2] = 0;
										p = 0;
										V = 38;
										break
									}
								} else
									V = 38;
							while (0);
							if ((V | 0) == 38) {
								V = 0;
								if (g)
									break g;
								else {
									j = p;
									m = 0
								}
							}
							p = c[e >> 2] | 0;
							g = c[p + 12 >> 2] | 0;
							if ((g | 0) == (c[p + 16 >> 2] | 0))
								p = wb[c[(c[p >> 2] | 0) + 36 >> 2] & 127](p) | 0;
							else
								p = d[g >> 0] | 0;
							if ((p & 255) << 24 >> 24 <= -1)
								break g;
							if (!(b[(c[H >> 2] | 0) + (p << 24 >> 24 << 1) >> 1] & 8192))
								break g;
							p = c[e >> 2] | 0;
							g = p + 12 | 0;
							h = c[g >> 2] | 0;
							if ((h | 0) == (c[p + 16 >> 2] | 0))
								p = wb[c[(c[p >> 2] | 0) + 40 >> 2] & 127](p) | 0;
							else {
								c[g >> 2] = h + 1;
								p = d[h >> 0] | 0
							}
							yj(_, p & 255);
							p = j;
							h = m;
							V = 28
						}
				while (0);
				G = G + 1 | 0;
				if (G >>> 0 >= 4) {
					V = 202;
					break
				}
			}
			h : do
				if ((V | 0) == 26) {
					c[k >> 2] = c[k >> 2] | 4;
					g = 0
				} else if ((V | 0) == 82) {
					c[k >> 2] = c[k >> 2] | 4;
					g = 0
				} else if ((V | 0) == 119) {
					c[k >> 2] = c[k >> 2] | 4;
					g = 0
				} else if ((V | 0) == 167) {
					c[k >> 2] = c[k >> 2] | 4;
					g = 0
				} else if ((V | 0) == 189) {
					c[k >> 2] = c[k >> 2] | 4;
					g = 0
				} else if ((V | 0) == 200) {
					c[k >> 2] = c[k >> 2] | 4;
					g = 0
				} else if ((V | 0) == 202) {
					i : do
						if (s) {
							j = s + 1 | 0;
							q = s + 8 | 0;
							r = s + 4 | 0;
							h = 1;
							j : while (1) {
								p = a[s >> 0] | 0;
								if (!(p & 1))
									p = (p & 255) >>> 1;
								else
									p = c[r >> 2] | 0;
								if (h >>> 0 >= p >>> 0)
									break i;
								p = c[e >> 2] | 0;
								do
									if (p) {
										if ((c[p + 12 >> 2] | 0) == (c[p + 16 >> 2] | 0))
											if ((wb[c[(c[p >> 2] | 0) + 36 >> 2] & 127](p) | 0) == -1) {
												c[e >> 2] = 0;
												p = 0;
												break
											} else {
												p = c[e >> 2] | 0;
												break
											}
									} else
										p = 0;
								while (0);
								p = (p | 0) == 0;
								g = c[f >> 2] | 0;
								do
									if (g) {
										if ((c[g + 12 >> 2] | 0) == (c[g + 16 >> 2] | 0) ? (wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0) == -1 : 0) {
											c[f >> 2] = 0;
											V = 218;
											break
										}
										if (!p)
											break j
									} else
										V = 218;
								while (0);
								if ((V | 0) == 218 ? (V = 0, p) : 0)
									break;
								p = c[e >> 2] | 0;
								g = c[p + 12 >> 2] | 0;
								if ((g | 0) == (c[p + 16 >> 2] | 0))
									p = wb[c[(c[p >> 2] | 0) + 36 >> 2] & 127](p) | 0;
								else
									p = d[g >> 0] | 0;
								if (!(a[s >> 0] & 1))
									g = j;
								else
									g = c[q >> 2] | 0;
								if ((p & 255) << 24 >> 24 != (a[g + h >> 0] | 0))
									break;
								p = h + 1 | 0;
								g = c[e >> 2] | 0;
								h = g + 12 | 0;
								m = c[h >> 2] | 0;
								if ((m | 0) == (c[g + 16 >> 2] | 0)) {
									wb[c[(c[g >> 2] | 0) + 40 >> 2] & 127](g) | 0;
									h = p;
									continue
								} else {
									c[h >> 2] = m + 1;
									h = p;
									continue
								}
							}
							c[k >> 2] = c[k >> 2] | 4;
							g = 0;
							break h
						}
					while (0);
					p = c[ba >> 2] | 0;
					if ((p | 0) != (t | 0) ? (c[W >> 2] = 0, Yn($, p, t, W), (c[W >> 2] | 0) != 0) : 0) {
						c[k >> 2] = c[k >> 2] | 4;
						g = 0
					} else
						g = 1
				}
			while (0);
			qj(_);
			qj(aa);
			qj(Y);
			qj(Z);
			qj($);
			p = c[ba >> 2] | 0;
			c[ba >> 2] = 0;
			if (p)
				sb[c[X >> 2] & 255](p);
			i = ca;
			return g | 0
		}
		function Wn(b, d, e, f, g, h, j) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0;
			s = i;
			i = i + 144 | 0;
			v = s + 24 | 0;
			t = s + 32 | 0;
			r = s + 16 | 0;
			l = s + 8 | 0;
			u = s + 4 | 0;
			k = s + 28 | 0;
			m = s;
			c[r >> 2] = t;
			q = r + 4 | 0;
			c[q >> 2] = 144;
			o = Tj(g) | 0;
			c[u >> 2] = o;
			b = Mo(u, 9352) | 0;
			a[k >> 0] = 0;
			n = c[e >> 2] | 0;
			c[m >> 2] = n;
			g = c[g + 4 >> 2] | 0;
			c[v >> 2] = c[m >> 2];
			m = n;
			if (Vn(d, v, f, u, g, h, k, b, r, l, t + 100 | 0) | 0) {
				if (!(a[j >> 0] & 1)) {
					a[j + 1 >> 0] = 0;
					a[j >> 0] = 0
				} else {
					a[c[j + 8 >> 2] >> 0] = 0;
					c[j + 4 >> 2] = 0
				}
				if (a[k >> 0] | 0)
					yj(j, Cb[c[(c[b >> 2] | 0) + 28 >> 2] & 15](b, 45) | 0);
				g = Cb[c[(c[b >> 2] | 0) + 28 >> 2] & 15](b, 48) | 0;
				b = c[r >> 2] | 0;
				f = c[l >> 2] | 0;
				k = f + -1 | 0;
				a : do
					if (b >>> 0 < k >>> 0)
						do {
							if ((a[b >> 0] | 0) != g << 24 >> 24)
								break a;
							b = b + 1 | 0
						} while (b >>> 0 < k >>> 0);
				while (0);
				_q(j, b, f) | 0
			}
			b = c[d >> 2] | 0;
			do
				if (b) {
					if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0))
						if ((wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1) {
							c[d >> 2] = 0;
							b = 0;
							break
						} else {
							b = c[d >> 2] | 0;
							break
						}
				} else
					b = 0;
			while (0);
			b = (b | 0) == 0;
			do
				if (n) {
					if ((c[m + 12 >> 2] | 0) == (c[m + 16 >> 2] | 0) ? (wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](m) | 0) == -1 : 0) {
						c[e >> 2] = 0;
						p = 21;
						break
					}
					if (!b)
						p = 22
				} else
					p = 21;
			while (0);
			if ((p | 0) == 21 ? b : 0)
				p = 22;
			if ((p | 0) == 22)
				c[h >> 2] = c[h >> 2] | 2;
			k = c[d >> 2] | 0;
			cs(o) | 0;
			b = c[r >> 2] | 0;
			c[r >> 2] = 0;
			if (b)
				sb[c[q >> 2] & 255](b);
			i = s;
			return k | 0
		}
		function Xn(b, d, e, f, g, h, j, k, l, m) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			k = k | 0;
			l = l | 0;
			m = m | 0;
			var n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0;
			x = i;
			i = i + 112 | 0;
			n = x + 100 | 0;
			o = x + 88 | 0;
			p = x + 76 | 0;
			q = x + 64 | 0;
			r = x + 52 | 0;
			s = x + 48 | 0;
			t = x + 36 | 0;
			u = x + 24 | 0;
			v = x + 12 | 0;
			w = x;
			if (b) {
				b = Mo(d, 8960) | 0;
				tb[c[(c[b >> 2] | 0) + 44 >> 2] & 127](n, b);
				w = c[n >> 2] | 0;
				a[e >> 0] = w;
				a[e + 1 >> 0] = w >> 8;
				a[e + 2 >> 0] = w >> 16;
				a[e + 3 >> 0] = w >> 24;
				tb[c[(c[b >> 2] | 0) + 32 >> 2] & 127](o, b);
				if (!(a[l >> 0] & 1)) {
					a[l + 1 >> 0] = 0;
					a[l >> 0] = 0
				} else {
					a[c[l + 8 >> 2] >> 0] = 0;
					c[l + 4 >> 2] = 0
				}
				wj(l, 0);
				c[l >> 2] = c[o >> 2];
				c[l + 4 >> 2] = c[o + 4 >> 2];
				c[l + 8 >> 2] = c[o + 8 >> 2];
				c[o >> 2] = 0;
				c[o + 4 >> 2] = 0;
				c[o + 8 >> 2] = 0;
				qj(o);
				tb[c[(c[b >> 2] | 0) + 28 >> 2] & 127](p, b);
				if (!(a[k >> 0] & 1)) {
					a[k + 1 >> 0] = 0;
					a[k >> 0] = 0
				} else {
					a[c[k + 8 >> 2] >> 0] = 0;
					c[k + 4 >> 2] = 0
				}
				wj(k, 0);
				c[k >> 2] = c[p >> 2];
				c[k + 4 >> 2] = c[p + 4 >> 2];
				c[k + 8 >> 2] = c[p + 8 >> 2];
				c[p >> 2] = 0;
				c[p + 4 >> 2] = 0;
				c[p + 8 >> 2] = 0;
				qj(p);
				a[f >> 0] = wb[c[(c[b >> 2] | 0) + 12 >> 2] & 127](b) | 0;
				a[g >> 0] = wb[c[(c[b >> 2] | 0) + 16 >> 2] & 127](b) | 0;
				tb[c[(c[b >> 2] | 0) + 20 >> 2] & 127](q, b);
				if (!(a[h >> 0] & 1)) {
					a[h + 1 >> 0] = 0;
					a[h >> 0] = 0
				} else {
					a[c[h + 8 >> 2] >> 0] = 0;
					c[h + 4 >> 2] = 0
				}
				wj(h, 0);
				c[h >> 2] = c[q >> 2];
				c[h + 4 >> 2] = c[q + 4 >> 2];
				c[h + 8 >> 2] = c[q + 8 >> 2];
				c[q >> 2] = 0;
				c[q + 4 >> 2] = 0;
				c[q + 8 >> 2] = 0;
				qj(q);
				tb[c[(c[b >> 2] | 0) + 24 >> 2] & 127](r, b);
				if (!(a[j >> 0] & 1)) {
					a[j + 1 >> 0] = 0;
					a[j >> 0] = 0
				} else {
					a[c[j + 8 >> 2] >> 0] = 0;
					c[j + 4 >> 2] = 0
				}
				wj(j, 0);
				c[j >> 2] = c[r >> 2];
				c[j + 4 >> 2] = c[r + 4 >> 2];
				c[j + 8 >> 2] = c[r + 8 >> 2];
				c[r >> 2] = 0;
				c[r + 4 >> 2] = 0;
				c[r + 8 >> 2] = 0;
				qj(r);
				b = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0
			} else {
				b = Mo(d, 8896) | 0;
				tb[c[(c[b >> 2] | 0) + 44 >> 2] & 127](s, b);
				s = c[s >> 2] | 0;
				a[e >> 0] = s;
				a[e + 1 >> 0] = s >> 8;
				a[e + 2 >> 0] = s >> 16;
				a[e + 3 >> 0] = s >> 24;
				tb[c[(c[b >> 2] | 0) + 32 >> 2] & 127](t, b);
				if (!(a[l >> 0] & 1)) {
					a[l + 1 >> 0] = 0;
					a[l >> 0] = 0
				} else {
					a[c[l + 8 >> 2] >> 0] = 0;
					c[l + 4 >> 2] = 0
				}
				wj(l, 0);
				c[l >> 2] = c[t >> 2];
				c[l + 4 >> 2] = c[t + 4 >> 2];
				c[l + 8 >> 2] = c[t + 8 >> 2];
				c[t >> 2] = 0;
				c[t + 4 >> 2] = 0;
				c[t + 8 >> 2] = 0;
				qj(t);
				tb[c[(c[b >> 2] | 0) + 28 >> 2] & 127](u, b);
				if (!(a[k >> 0] & 1)) {
					a[k + 1 >> 0] = 0;
					a[k >> 0] = 0
				} else {
					a[c[k + 8 >> 2] >> 0] = 0;
					c[k + 4 >> 2] = 0
				}
				wj(k, 0);
				c[k >> 2] = c[u >> 2];
				c[k + 4 >> 2] = c[u + 4 >> 2];
				c[k + 8 >> 2] = c[u + 8 >> 2];
				c[u >> 2] = 0;
				c[u + 4 >> 2] = 0;
				c[u + 8 >> 2] = 0;
				qj(u);
				a[f >> 0] = wb[c[(c[b >> 2] | 0) + 12 >> 2] & 127](b) | 0;
				a[g >> 0] = wb[c[(c[b >> 2] | 0) + 16 >> 2] & 127](b) | 0;
				tb[c[(c[b >> 2] | 0) + 20 >> 2] & 127](v, b);
				if (!(a[h >> 0] & 1)) {
					a[h + 1 >> 0] = 0;
					a[h >> 0] = 0
				} else {
					a[c[h + 8 >> 2] >> 0] = 0;
					c[h + 4 >> 2] = 0
				}
				wj(h, 0);
				c[h >> 2] = c[v >> 2];
				c[h + 4 >> 2] = c[v + 4 >> 2];
				c[h + 8 >> 2] = c[v + 8 >> 2];
				c[v >> 2] = 0;
				c[v + 4 >> 2] = 0;
				c[v + 8 >> 2] = 0;
				qj(v);
				tb[c[(c[b >> 2] | 0) + 24 >> 2] & 127](w, b);
				if (!(a[j >> 0] & 1)) {
					a[j + 1 >> 0] = 0;
					a[j >> 0] = 0
				} else {
					a[c[j + 8 >> 2] >> 0] = 0;
					c[j + 4 >> 2] = 0
				}
				wj(j, 0);
				c[j >> 2] = c[w >> 2];
				c[j + 4 >> 2] = c[w + 4 >> 2];
				c[j + 8 >> 2] = c[w + 8 >> 2];
				c[w >> 2] = 0;
				c[w + 4 >> 2] = 0;
				c[w + 8 >> 2] = 0;
				qj(w);
				b = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0
			}
			c[m >> 2] = b;
			i = x;
			return
		}
		function Yn(b, d, e, f) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			i = 0,
			j = 0;
			g = a[b >> 0] | 0;
			i = b + 4 | 0;
			h = c[i >> 2] | 0;
			a : do
				if (((g & 1) == 0 ? (g & 255) >>> 1 : h) | 0) {
					if ((d | 0) != (e | 0)) {
						g = e + -4 | 0;
						if (g >>> 0 > d >>> 0) {
							h = d;
							do {
								j = c[h >> 2] | 0;
								c[h >> 2] = c[g >> 2];
								c[g >> 2] = j;
								h = h + 4 | 0;
								g = g + -4 | 0
							} while (h >>> 0 < g >>> 0)
						}
						g = a[b >> 0] | 0;
						h = c[i >> 2] | 0
					}
					j = (g & 1) == 0;
					i = j ? b + 1 | 0 : c[b + 8 >> 2] | 0;
					e = e + -4 | 0;
					b = i + (j ? (g & 255) >>> 1 : h) | 0;
					h = a[i >> 0] | 0;
					g = h << 24 >> 24 < 1 | h << 24 >> 24 == 127;
					b : do
						if (e >>> 0 > d >>> 0) {
							while (1) {
								if (!g ? (h << 24 >> 24 | 0) != (c[d >> 2] | 0) : 0)
									break;
								i = (b - i | 0) > 1 ? i + 1 | 0 : i;
								d = d + 4 | 0;
								h = a[i >> 0] | 0;
								g = h << 24 >> 24 < 1 | h << 24 >> 24 == 127;
								if (d >>> 0 >= e >>> 0)
									break b
							}
							c[f >> 2] = 4;
							break a
						}
					while (0);
					if (!g ? ((c[e >> 2] | 0) + -1 | 0) >>> 0 >= h << 24 >> 24 >>> 0 : 0)
						c[f >> 2] = 4
				}
			while (0);
			return
		}
		function Zn(a) {
			a = a | 0;
			return
		}
		function _n(a) {
			a = a | 0;
			ih(a);
			return
		}
		function $n(b, d, e, f, g, h, j) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0,
			E = 0;
			E = i;
			i = i + 576 | 0;
			v = E + 424 | 0;
			y = E;
			u = E + 24 | 0;
			D = E + 16 | 0;
			w = E + 12 | 0;
			A = E + 8 | 0;
			k = E + 464 | 0;
			s = E + 4 | 0;
			x = E + 468 | 0;
			c[D >> 2] = u;
			C = D + 4 | 0;
			c[C >> 2] = 144;
			c[A >> 2] = Tj(g) | 0;
			b = Mo(A, 9344) | 0;
			a[k >> 0] = 0;
			c[s >> 2] = c[e >> 2];
			t = c[g + 4 >> 2] | 0;
			c[v >> 2] = c[s >> 2];
			if (ao(d, v, f, A, t, h, k, b, D, w, u + 400 | 0) | 0) {
				Ab[c[(c[b >> 2] | 0) + 48 >> 2] & 7](b, 23582, 23592, v) | 0;
				f = c[w >> 2] | 0;
				g = c[D >> 2] | 0;
				b = f - g | 0;
				if ((b | 0) > 392) {
					b = fj((b >> 2) + 2 | 0) | 0;
					if (!b)
						Nh();
					else {
						z = b;
						l = b
					}
				} else {
					z = 0;
					l = x
				}
				if (!(a[k >> 0] | 0))
					b = l;
				else {
					a[l >> 0] = 45;
					b = l + 1 | 0
				}
				t = v + 40 | 0;
				u = v;
				if (g >>> 0 < f >>> 0) {
					k = v + 4 | 0;
					l = k + 4 | 0;
					m = l + 4 | 0;
					n = m + 4 | 0;
					o = n + 4 | 0;
					p = o + 4 | 0;
					q = p + 4 | 0;
					r = q + 4 | 0;
					s = r + 4 | 0;
					do {
						f = c[g >> 2] | 0;
						if ((c[v >> 2] | 0) != (f | 0))
							if ((c[k >> 2] | 0) != (f | 0))
								if ((c[l >> 2] | 0) != (f | 0))
									if ((c[m >> 2] | 0) != (f | 0))
										if ((c[n >> 2] | 0) != (f | 0))
											if ((c[o >> 2] | 0) != (f | 0))
												if ((c[p >> 2] | 0) != (f | 0))
													if ((c[q >> 2] | 0) != (f | 0))
														if ((c[r >> 2] | 0) == (f | 0))
															f = r;
														else
															f = (c[s >> 2] | 0) == (f | 0) ? s : t;
													else
														f = q;
												else
													f = p;
											else
												f = o;
										else
											f = n;
									else
										f = m;
								else
									f = l;
							else
								f = k;
						else
							f = v;
						a[b >> 0] = a[23582 + (f - u >> 2) >> 0] | 0;
						g = g + 4 | 0;
						b = b + 1 | 0
					} while (g >>> 0 < (c[w >> 2] | 0) >>> 0)
				}
				a[b >> 0] = 0;
				c[y >> 2] = j;
				Hi(x, 23578, y) | 0;
				if (z)
					gj(z)
			}
			b = c[d >> 2] | 0;
			do
				if (b) {
					f = c[b + 12 >> 2] | 0;
					if ((f | 0) == (c[b + 16 >> 2] | 0))
						b = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
					else
						b = c[f >> 2] | 0;
					if ((b | 0) == -1) {
						c[d >> 2] = 0;
						g = 1;
						break
					} else {
						g = (c[d >> 2] | 0) == 0;
						break
					}
				} else
					g = 1;
			while (0);
			b = c[e >> 2] | 0;
			do
				if (b) {
					f = c[b + 12 >> 2] | 0;
					if ((f | 0) == (c[b + 16 >> 2] | 0))
						b = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
					else
						b = c[f >> 2] | 0;
					if ((b | 0) != -1)
						if (g)
							break;
						else {
							B = 30;
							break
						}
					else {
						c[e >> 2] = 0;
						B = 28;
						break
					}
				} else
					B = 28;
			while (0);
			if ((B | 0) == 28 ? g : 0)
				B = 30;
			if ((B | 0) == 30)
				c[h >> 2] = c[h >> 2] | 2;
			f = c[d >> 2] | 0;
			cs(c[A >> 2] | 0) | 0;
			b = c[D >> 2] | 0;
			c[D >> 2] = 0;
			if (b)
				sb[c[C >> 2] & 255](b);
			i = E;
			return f | 0
		}
		function ao(b, e, f, g, h, j, k, l, m, n, o) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			k = k | 0;
			l = l | 0;
			m = m | 0;
			n = n | 0;
			o = o | 0;
			var p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0,
			E = 0,
			F = 0,
			G = 0,
			H = 0,
			I = 0,
			J = 0,
			K = 0,
			L = 0,
			M = 0,
			N = 0,
			O = 0,
			P = 0,
			Q = 0,
			R = 0,
			S = 0,
			T = 0,
			U = 0,
			V = 0,
			W = 0,
			X = 0,
			Y = 0,
			Z = 0;
			Z = i;
			i = i + 512 | 0;
			J = Z + 96 | 0;
			s = Z + 104 | 0;
			Y = Z + 88 | 0;
			L = Z + 80 | 0;
			P = Z + 76 | 0;
			O = Z + 504 | 0;
			N = Z + 72 | 0;
			M = Z + 68 | 0;
			W = Z + 56 | 0;
			U = Z + 44 | 0;
			T = Z + 32 | 0;
			X = Z + 20 | 0;
			V = Z + 8 | 0;
			K = Z + 4 | 0;
			R = Z;
			c[J >> 2] = o;
			c[Y >> 2] = s;
			S = Y + 4 | 0;
			c[S >> 2] = 144;
			c[L >> 2] = s;
			c[P >> 2] = s + 400;
			c[W >> 2] = 0;
			c[W + 4 >> 2] = 0;
			c[W + 8 >> 2] = 0;
			c[U >> 2] = 0;
			c[U + 4 >> 2] = 0;
			c[U + 8 >> 2] = 0;
			c[T >> 2] = 0;
			c[T + 4 >> 2] = 0;
			c[T + 8 >> 2] = 0;
			c[X >> 2] = 0;
			c[X + 4 >> 2] = 0;
			c[X + 8 >> 2] = 0;
			c[V >> 2] = 0;
			c[V + 4 >> 2] = 0;
			c[V + 8 >> 2] = 0;
			co(f, g, O, N, M, W, U, T, X, K);
			c[n >> 2] = c[m >> 2];
			F = T + 4 | 0;
			G = X + 4 | 0;
			H = X + 8 | 0;
			I = T + 8 | 0;
			x = (h & 512 | 0) != 0;
			y = U + 8 | 0;
			z = U + 4 | 0;
			A = V + 4 | 0;
			B = V + 8 | 0;
			C = O + 3 | 0;
			D = W + 4 | 0;
			E = 0;
			r = 0;
			a : while (1) {
				o = c[b >> 2] | 0;
				do
					if (o) {
						f = c[o + 12 >> 2] | 0;
						if ((f | 0) == (c[o + 16 >> 2] | 0))
							o = wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0;
						else
							o = c[f >> 2] | 0;
						if ((o | 0) == -1) {
							c[b >> 2] = 0;
							g = 1;
							break
						} else {
							g = (c[b >> 2] | 0) == 0;
							break
						}
					} else
						g = 1;
				while (0);
				f = c[e >> 2] | 0;
				do
					if (f) {
						o = c[f + 12 >> 2] | 0;
						if ((o | 0) == (c[f + 16 >> 2] | 0))
							o = wb[c[(c[f >> 2] | 0) + 36 >> 2] & 127](f) | 0;
						else
							o = c[o >> 2] | 0;
						if ((o | 0) != -1)
							if (g) {
								w = f;
								break
							} else {
								Q = 217;
								break a
							}
						else {
							c[e >> 2] = 0;
							Q = 15;
							break
						}
					} else
						Q = 15;
				while (0);
				if ((Q | 0) == 15) {
					Q = 0;
					if (g) {
						Q = 217;
						break
					} else
						w = 0
				}
				b : do
					switch (a[O + E >> 0] | 0) {
					case 1: {
							if ((E | 0) != 3) {
								o = c[b >> 2] | 0;
								f = c[o + 12 >> 2] | 0;
								if ((f | 0) == (c[o + 16 >> 2] | 0))
									o = wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0;
								else
									o = c[f >> 2] | 0;
								if (!(pb[c[(c[l >> 2] | 0) + 12 >> 2] & 31](l, 8192, o) | 0)) {
									Q = 28;
									break a
								}
								o = c[b >> 2] | 0;
								f = o + 12 | 0;
								g = c[f >> 2] | 0;
								if ((g | 0) == (c[o + 16 >> 2] | 0))
									o = wb[c[(c[o >> 2] | 0) + 40 >> 2] & 127](o) | 0;
								else {
									c[f >> 2] = g + 4;
									o = c[g >> 2] | 0
								}
								Jj(V, o);
								o = w;
								h = w;
								Q = 30
							}
							break
						}
					case 0: {
							if ((E | 0) != 3) {
								o = w;
								h = w;
								Q = 30
							}
							break
						}
					case 3: {
							p = a[T >> 0] | 0;
							o = (p & 1) == 0 ? (p & 255) >>> 1 : c[F >> 2] | 0;
							g = a[X >> 0] | 0;
							g = (g & 1) == 0 ? (g & 255) >>> 1 : c[G >> 2] | 0;
							if ((o | 0) != (0 - g | 0)) {
								h = (o | 0) == 0;
								q = c[b >> 2] | 0;
								t = c[q + 12 >> 2] | 0;
								o = c[q + 16 >> 2] | 0;
								f = (t | 0) == (o | 0);
								if (h | (g | 0) == 0) {
									if (f)
										o = wb[c[(c[q >> 2] | 0) + 36 >> 2] & 127](q) | 0;
									else
										o = c[t >> 2] | 0;
									if (h) {
										if ((o | 0) != (c[((a[X >> 0] & 1) == 0 ? G : c[H >> 2] | 0) >> 2] | 0))
											break b;
										o = c[b >> 2] | 0;
										f = o + 12 | 0;
										g = c[f >> 2] | 0;
										if ((g | 0) == (c[o + 16 >> 2] | 0))
											wb[c[(c[o >> 2] | 0) + 40 >> 2] & 127](o) | 0;
										else
											c[f >> 2] = g + 4;
										a[k >> 0] = 1;
										w = a[X >> 0] | 0;
										r = ((w & 1) == 0 ? (w & 255) >>> 1 : c[G >> 2] | 0) >>> 0 > 1 ? X : r;
										break b
									}
									if ((o | 0) != (c[((a[T >> 0] & 1) == 0 ? F : c[I >> 2] | 0) >> 2] | 0)) {
										a[k >> 0] = 1;
										break b
									}
									o = c[b >> 2] | 0;
									f = o + 12 | 0;
									g = c[f >> 2] | 0;
									if ((g | 0) == (c[o + 16 >> 2] | 0))
										wb[c[(c[o >> 2] | 0) + 40 >> 2] & 127](o) | 0;
									else
										c[f >> 2] = g + 4;
									w = a[T >> 0] | 0;
									r = ((w & 1) == 0 ? (w & 255) >>> 1 : c[F >> 2] | 0) >>> 0 > 1 ? T : r;
									break b
								}
								if (f) {
									h = wb[c[(c[q >> 2] | 0) + 36 >> 2] & 127](q) | 0;
									o = c[b >> 2] | 0;
									p = a[T >> 0] | 0;
									q = o;
									g = c[o + 12 >> 2] | 0;
									o = c[o + 16 >> 2] | 0
								} else {
									h = c[t >> 2] | 0;
									g = t
								}
								f = q + 12 | 0;
								o = (g | 0) == (o | 0);
								if ((h | 0) == (c[((p & 1) == 0 ? F : c[I >> 2] | 0) >> 2] | 0)) {
									if (o)
										wb[c[(c[q >> 2] | 0) + 40 >> 2] & 127](q) | 0;
									else
										c[f >> 2] = g + 4;
									w = a[T >> 0] | 0;
									r = ((w & 1) == 0 ? (w & 255) >>> 1 : c[F >> 2] | 0) >>> 0 > 1 ? T : r;
									break b
								}
								if (o)
									o = wb[c[(c[q >> 2] | 0) + 36 >> 2] & 127](q) | 0;
								else
									o = c[g >> 2] | 0;
								if ((o | 0) != (c[((a[X >> 0] & 1) == 0 ? G : c[H >> 2] | 0) >> 2] | 0)) {
									Q = 86;
									break a
								}
								o = c[b >> 2] | 0;
								f = o + 12 | 0;
								g = c[f >> 2] | 0;
								if ((g | 0) == (c[o + 16 >> 2] | 0))
									wb[c[(c[o >> 2] | 0) + 40 >> 2] & 127](o) | 0;
								else
									c[f >> 2] = g + 4;
								a[k >> 0] = 1;
								w = a[X >> 0] | 0;
								r = ((w & 1) == 0 ? (w & 255) >>> 1 : c[G >> 2] | 0) >>> 0 > 1 ? X : r
							}
							break
						}
					case 2: {
							if (!(E >>> 0 < 2 | (r | 0) != 0) ? !(x | (E | 0) == 2 & (a[C >> 0] | 0) != 0) : 0) {
								r = 0;
								break b
							}
							h = a[U >> 0] | 0;
							g = c[y >> 2] | 0;
							f = (h & 1) == 0 ? z : g;
							o = f;
							c : do
								if ((E | 0) != 0 ? (d[O + (E + -1) >> 0] | 0) < 2 : 0) {
									v = (h & 1) == 0;
									d : do
										if ((f | 0) != ((v ? z : g) + ((v ? (h & 255) >>> 1 : c[z >> 2] | 0) << 2) | 0)) {
											h = f;
											while (1) {
												if (!(pb[c[(c[l >> 2] | 0) + 12 >> 2] & 31](l, 8192, c[h >> 2] | 0) | 0))
													break;
												h = h + 4 | 0;
												o = h;
												f = a[U >> 0] | 0;
												g = c[y >> 2] | 0;
												v = (f & 1) == 0;
												if ((h | 0) == ((v ? z : g) + ((v ? (f & 255) >>> 1 : c[z >> 2] | 0) << 2) | 0)) {
													h = f;
													break d
												}
											}
											h = a[U >> 0] | 0;
											g = c[y >> 2] | 0
										}
									while (0);
									q = (h & 1) == 0 ? z : g;
									f = q;
									t = o - f >> 2;
									u = a[V >> 0] | 0;
									p = (u & 1) == 0;
									u = p ? (u & 255) >>> 1 : c[A >> 2] | 0;
									if (u >>> 0 >= t >>> 0) {
										p = p ? A : c[B >> 2] | 0;
										v = p + (u << 2) | 0;
										if (!t)
											f = o;
										else {
											p = p + (u - t << 2) | 0;
											while (1) {
												if ((c[p >> 2] | 0) != (c[q >> 2] | 0))
													break c;
												p = p + 4 | 0;
												if ((p | 0) == (v | 0)) {
													f = o;
													break
												} else
													q = q + 4 | 0
											}
										}
									}
								} else
									f = o;
							while (0);
							o = (h & 1) == 0;
							o = (o ? z : g) + ((o ? (h & 255) >>> 1 : c[z >> 2] | 0) << 2) | 0;
							e : do
								if ((f | 0) != (o | 0)) {
									p = w;
									h = w;
									o = f;
									while (1) {
										f = c[b >> 2] | 0;
										do
											if (f) {
												g = c[f + 12 >> 2] | 0;
												if ((g | 0) == (c[f + 16 >> 2] | 0))
													f = wb[c[(c[f >> 2] | 0) + 36 >> 2] & 127](f) | 0;
												else
													f = c[g >> 2] | 0;
												if ((f | 0) == -1) {
													c[b >> 2] = 0;
													g = 1;
													break
												} else {
													g = (c[b >> 2] | 0) == 0;
													break
												}
											} else
												g = 1;
										while (0);
										do
											if (h) {
												f = c[h + 12 >> 2] | 0;
												if ((f | 0) == (c[h + 16 >> 2] | 0))
													f = wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0;
												else
													f = c[f >> 2] | 0;
												if ((f | 0) != -1)
													if (g^(p | 0) == 0) {
														f = p;
														q = p;
														break
													} else
														break e;
												else {
													c[e >> 2] = 0;
													f = 0;
													Q = 114;
													break
												}
											} else {
												f = p;
												Q = 114
											}
										while (0);
										if ((Q | 0) == 114) {
											Q = 0;
											if (g)
												break e;
											else
												q = 0
										}
										g = c[b >> 2] | 0;
										h = c[g + 12 >> 2] | 0;
										if ((h | 0) == (c[g + 16 >> 2] | 0))
											g = wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0;
										else
											g = c[h >> 2] | 0;
										if ((g | 0) != (c[o >> 2] | 0))
											break e;
										g = c[b >> 2] | 0;
										h = g + 12 | 0;
										p = c[h >> 2] | 0;
										if ((p | 0) == (c[g + 16 >> 2] | 0))
											wb[c[(c[g >> 2] | 0) + 40 >> 2] & 127](g) | 0;
										else
											c[h >> 2] = p + 4;
										o = o + 4 | 0;
										g = a[U >> 0] | 0;
										w = (g & 1) == 0;
										g = (w ? z : c[y >> 2] | 0) + ((w ? (g & 255) >>> 1 : c[z >> 2] | 0) << 2) | 0;
										if ((o | 0) == (g | 0)) {
											o = g;
											break
										} else {
											p = f;
											h = q
										}
									}
								}
							while (0);
							if (x ? (w = a[U >> 0] | 0, v = (w & 1) == 0, (o | 0) != ((v ? z : c[y >> 2] | 0) + ((v ? (w & 255) >>> 1 : c[z >> 2] | 0) << 2) | 0)) : 0) {
								Q = 126;
								break a
							}
							break
						}
					case 4: {
							t = c[M >> 2] | 0;
							h = w;
							p = w;
							o = 0;
							f : while (1) {
								f = c[b >> 2] | 0;
								do
									if (f) {
										g = c[f + 12 >> 2] | 0;
										if ((g | 0) == (c[f + 16 >> 2] | 0))
											f = wb[c[(c[f >> 2] | 0) + 36 >> 2] & 127](f) | 0;
										else
											f = c[g >> 2] | 0;
										if ((f | 0) == -1) {
											c[b >> 2] = 0;
											g = 1;
											break
										} else {
											g = (c[b >> 2] | 0) == 0;
											break
										}
									} else
										g = 1;
								while (0);
								do
									if (p) {
										f = c[p + 12 >> 2] | 0;
										if ((f | 0) == (c[p + 16 >> 2] | 0))
											f = wb[c[(c[p >> 2] | 0) + 36 >> 2] & 127](p) | 0;
										else
											f = c[f >> 2] | 0;
										if ((f | 0) != -1)
											if (g^(h | 0) == 0) {
												f = h;
												q = h;
												break
											} else
												break f;
										else {
											c[e >> 2] = 0;
											f = 0;
											Q = 140;
											break
										}
									} else {
										f = h;
										Q = 140
									}
								while (0);
								if ((Q | 0) == 140) {
									Q = 0;
									if (g) {
										h = f;
										break
									} else
										q = 0
								}
								g = c[b >> 2] | 0;
								h = c[g + 12 >> 2] | 0;
								if ((h | 0) == (c[g + 16 >> 2] | 0))
									h = wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0;
								else
									h = c[h >> 2] | 0;
								if (pb[c[(c[l >> 2] | 0) + 12 >> 2] & 31](l, 2048, h) | 0) {
									g = c[n >> 2] | 0;
									if ((g | 0) == (c[J >> 2] | 0)) {
										$q(m, n, J);
										g = c[n >> 2] | 0
									}
									c[n >> 2] = g + 4;
									c[g >> 2] = h;
									o = o + 1 | 0
								} else {
									w = a[W >> 0] | 0;
									if (!((h | 0) == (t | 0) & ((o | 0) != 0 ? (((w & 1) == 0 ? (w & 255) >>> 1 : c[D >> 2] | 0) | 0) != 0 : 0))) {
										h = f;
										break
									}
									if ((s | 0) == (c[P >> 2] | 0)) {
										Zq(Y, L, P);
										s = c[L >> 2] | 0
									}
									w = s + 4 | 0;
									c[L >> 2] = w;
									c[s >> 2] = o;
									s = w;
									o = 0
								}
								g = c[b >> 2] | 0;
								h = g + 12 | 0;
								p = c[h >> 2] | 0;
								if ((p | 0) == (c[g + 16 >> 2] | 0)) {
									wb[c[(c[g >> 2] | 0) + 40 >> 2] & 127](g) | 0;
									h = f;
									p = q;
									continue
								} else {
									c[h >> 2] = p + 4;
									h = f;
									p = q;
									continue
								}
							}
							if ((o | 0) != 0 ? (c[Y >> 2] | 0) != (s | 0) : 0) {
								if ((s | 0) == (c[P >> 2] | 0)) {
									Zq(Y, L, P);
									s = c[L >> 2] | 0
								}
								w = s + 4 | 0;
								c[L >> 2] = w;
								c[s >> 2] = o;
								s = w
							}
							q = c[K >> 2] | 0;
							if ((q | 0) > 0) {
								o = c[b >> 2] | 0;
								do
									if (o) {
										f = c[o + 12 >> 2] | 0;
										if ((f | 0) == (c[o + 16 >> 2] | 0))
											o = wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0;
										else
											o = c[f >> 2] | 0;
										if ((o | 0) == -1) {
											c[b >> 2] = 0;
											f = 1;
											break
										} else {
											f = (c[b >> 2] | 0) == 0;
											break
										}
									} else
										f = 1;
								while (0);
								do
									if (h) {
										o = c[h + 12 >> 2] | 0;
										if ((o | 0) == (c[h + 16 >> 2] | 0))
											o = wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0;
										else
											o = c[o >> 2] | 0;
										if ((o | 0) != -1)
											if (f)
												break;
											else {
												Q = 180;
												break a
											}
										else {
											c[e >> 2] = 0;
											Q = 174;
											break
										}
									} else
										Q = 174;
								while (0);
								if ((Q | 0) == 174) {
									Q = 0;
									if (f) {
										Q = 180;
										break a
									} else
										h = 0
								}
								o = c[b >> 2] | 0;
								f = c[o + 12 >> 2] | 0;
								if ((f | 0) == (c[o + 16 >> 2] | 0))
									o = wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0;
								else
									o = c[f >> 2] | 0;
								if ((o | 0) != (c[N >> 2] | 0)) {
									Q = 180;
									break a
								}
								o = c[b >> 2] | 0;
								f = o + 12 | 0;
								g = c[f >> 2] | 0;
								if ((g | 0) == (c[o + 16 >> 2] | 0))
									wb[c[(c[o >> 2] | 0) + 40 >> 2] & 127](o) | 0;
								else
									c[f >> 2] = g + 4;
								if ((q | 0) > 0) {
									p = h;
									g = h;
									t = q;
									while (1) {
										o = c[b >> 2] | 0;
										do
											if (o) {
												f = c[o + 12 >> 2] | 0;
												if ((f | 0) == (c[o + 16 >> 2] | 0))
													o = wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0;
												else
													o = c[f >> 2] | 0;
												if ((o | 0) == -1) {
													c[b >> 2] = 0;
													f = 1;
													break
												} else {
													f = (c[b >> 2] | 0) == 0;
													break
												}
											} else
												f = 1;
										while (0);
										do
											if (g) {
												o = c[g + 12 >> 2] | 0;
												if ((o | 0) == (c[g + 16 >> 2] | 0))
													o = wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0;
												else
													o = c[o >> 2] | 0;
												if ((o | 0) != -1)
													if (f^(p | 0) == 0) {
														o = p;
														q = p;
														break
													} else {
														Q = 204;
														break a
													}
												else {
													c[e >> 2] = 0;
													o = 0;
													Q = 198;
													break
												}
											} else {
												o = p;
												Q = 198
											}
										while (0);
										if ((Q | 0) == 198) {
											Q = 0;
											if (f) {
												Q = 204;
												break a
											} else
												q = 0
										}
										f = c[b >> 2] | 0;
										g = c[f + 12 >> 2] | 0;
										if ((g | 0) == (c[f + 16 >> 2] | 0))
											f = wb[c[(c[f >> 2] | 0) + 36 >> 2] & 127](f) | 0;
										else
											f = c[g >> 2] | 0;
										if (!(pb[c[(c[l >> 2] | 0) + 12 >> 2] & 31](l, 2048, f) | 0)) {
											Q = 204;
											break a
										}
										if ((c[n >> 2] | 0) == (c[J >> 2] | 0))
											$q(m, n, J);
										f = c[b >> 2] | 0;
										g = c[f + 12 >> 2] | 0;
										if ((g | 0) == (c[f + 16 >> 2] | 0))
											f = wb[c[(c[f >> 2] | 0) + 36 >> 2] & 127](f) | 0;
										else
											f = c[g >> 2] | 0;
										g = c[n >> 2] | 0;
										c[n >> 2] = g + 4;
										c[g >> 2] = f;
										f = t;
										t = t + -1 | 0;
										c[K >> 2] = t;
										g = c[b >> 2] | 0;
										h = g + 12 | 0;
										p = c[h >> 2] | 0;
										if ((p | 0) == (c[g + 16 >> 2] | 0))
											wb[c[(c[g >> 2] | 0) + 40 >> 2] & 127](g) | 0;
										else
											c[h >> 2] = p + 4;
										if ((f | 0) <= 1)
											break;
										else {
											p = o;
											g = q
										}
									}
								}
							}
							if ((c[n >> 2] | 0) == (c[m >> 2] | 0)) {
								Q = 215;
								break a
							}
							break
						}
					default: {}

					}
				while (0);
				g : do
					if ((Q | 0) == 30)
						while (1) {
							Q = 0;
							f = c[b >> 2] | 0;
							do
								if (f) {
									g = c[f + 12 >> 2] | 0;
									if ((g | 0) == (c[f + 16 >> 2] | 0))
										f = wb[c[(c[f >> 2] | 0) + 36 >> 2] & 127](f) | 0;
									else
										f = c[g >> 2] | 0;
									if ((f | 0) == -1) {
										c[b >> 2] = 0;
										g = 1;
										break
									} else {
										g = (c[b >> 2] | 0) == 0;
										break
									}
								} else
									g = 1;
							while (0);
							do
								if (h) {
									f = c[h + 12 >> 2] | 0;
									if ((f | 0) == (c[h + 16 >> 2] | 0))
										f = wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0;
									else
										f = c[f >> 2] | 0;
									if ((f | 0) != -1)
										if (g^(o | 0) == 0) {
											p = o;
											h = o;
											break
										} else
											break g;
									else {
										c[e >> 2] = 0;
										o = 0;
										Q = 43;
										break
									}
								} else
									Q = 43;
							while (0);
							if ((Q | 0) == 43) {
								Q = 0;
								if (g)
									break g;
								else {
									p = o;
									h = 0
								}
							}
							o = c[b >> 2] | 0;
							f = c[o + 12 >> 2] | 0;
							if ((f | 0) == (c[o + 16 >> 2] | 0))
								o = wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0;
							else
								o = c[f >> 2] | 0;
							if (!(pb[c[(c[l >> 2] | 0) + 12 >> 2] & 31](l, 8192, o) | 0))
								break g;
							o = c[b >> 2] | 0;
							f = o + 12 | 0;
							g = c[f >> 2] | 0;
							if ((g | 0) == (c[o + 16 >> 2] | 0))
								o = wb[c[(c[o >> 2] | 0) + 40 >> 2] & 127](o) | 0;
							else {
								c[f >> 2] = g + 4;
								o = c[g >> 2] | 0
							}
							Jj(V, o);
							o = p;
							Q = 30
						}
				while (0);
				E = E + 1 | 0;
				if (E >>> 0 >= 4) {
					Q = 217;
					break
				}
			}
			h : do
				if ((Q | 0) == 28) {
					c[j >> 2] = c[j >> 2] | 4;
					f = 0
				} else if ((Q | 0) == 86) {
					c[j >> 2] = c[j >> 2] | 4;
					f = 0
				} else if ((Q | 0) == 126) {
					c[j >> 2] = c[j >> 2] | 4;
					f = 0
				} else if ((Q | 0) == 180) {
					c[j >> 2] = c[j >> 2] | 4;
					f = 0
				} else if ((Q | 0) == 204) {
					c[j >> 2] = c[j >> 2] | 4;
					f = 0
				} else if ((Q | 0) == 215) {
					c[j >> 2] = c[j >> 2] | 4;
					f = 0
				} else if ((Q | 0) == 217) {
					i : do
						if (r) {
							p = r + 4 | 0;
							q = r + 8 | 0;
							h = 1;
							j : while (1) {
								o = a[r >> 0] | 0;
								if (!(o & 1))
									o = (o & 255) >>> 1;
								else
									o = c[p >> 2] | 0;
								if (h >>> 0 >= o >>> 0)
									break i;
								o = c[b >> 2] | 0;
								do
									if (o) {
										f = c[o + 12 >> 2] | 0;
										if ((f | 0) == (c[o + 16 >> 2] | 0))
											o = wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0;
										else
											o = c[f >> 2] | 0;
										if ((o | 0) == -1) {
											c[b >> 2] = 0;
											g = 1;
											break
										} else {
											g = (c[b >> 2] | 0) == 0;
											break
										}
									} else
										g = 1;
								while (0);
								o = c[e >> 2] | 0;
								do
									if (o) {
										f = c[o + 12 >> 2] | 0;
										if ((f | 0) == (c[o + 16 >> 2] | 0))
											o = wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0;
										else
											o = c[f >> 2] | 0;
										if ((o | 0) != -1)
											if (g)
												break;
											else
												break j;
										else {
											c[e >> 2] = 0;
											Q = 236;
											break
										}
									} else
										Q = 236;
								while (0);
								if ((Q | 0) == 236 ? (Q = 0, g) : 0)
									break;
								o = c[b >> 2] | 0;
								f = c[o + 12 >> 2] | 0;
								if ((f | 0) == (c[o + 16 >> 2] | 0))
									o = wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0;
								else
									o = c[f >> 2] | 0;
								if (!(a[r >> 0] & 1))
									f = p;
								else
									f = c[q >> 2] | 0;
								if ((o | 0) != (c[f + (h << 2) >> 2] | 0))
									break;
								o = h + 1 | 0;
								f = c[b >> 2] | 0;
								g = f + 12 | 0;
								h = c[g >> 2] | 0;
								if ((h | 0) == (c[f + 16 >> 2] | 0)) {
									wb[c[(c[f >> 2] | 0) + 40 >> 2] & 127](f) | 0;
									h = o;
									continue
								} else {
									c[g >> 2] = h + 4;
									h = o;
									continue
								}
							}
							c[j >> 2] = c[j >> 2] | 4;
							f = 0;
							break h
						}
					while (0);
					o = c[Y >> 2] | 0;
					if ((o | 0) != (s | 0) ? (c[R >> 2] = 0, Yn(W, o, s, R), (c[R >> 2] | 0) != 0) : 0) {
						c[j >> 2] = c[j >> 2] | 4;
						f = 0
					} else
						f = 1
				}
			while (0);
			Fj(V);
			Fj(X);
			Fj(T);
			Fj(U);
			qj(W);
			o = c[Y >> 2] | 0;
			c[Y >> 2] = 0;
			if (o)
				sb[c[S >> 2] & 255](o);
			i = Z;
			return f | 0
		}
		function bo(b, d, e, f, g, h, j) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0;
			s = i;
			i = i + 432 | 0;
			v = s + 424 | 0;
			t = s + 24 | 0;
			r = s + 16 | 0;
			l = s + 8 | 0;
			u = s + 4 | 0;
			k = s + 428 | 0;
			m = s;
			c[r >> 2] = t;
			q = r + 4 | 0;
			c[q >> 2] = 144;
			o = Tj(g) | 0;
			c[u >> 2] = o;
			b = Mo(u, 9344) | 0;
			a[k >> 0] = 0;
			n = c[e >> 2] | 0;
			c[m >> 2] = n;
			g = c[g + 4 >> 2] | 0;
			c[v >> 2] = c[m >> 2];
			m = n;
			if (ao(d, v, f, u, g, h, k, b, r, l, t + 400 | 0) | 0) {
				if (!(a[j >> 0] & 1))
					a[j >> 0] = 0;
				else
					c[c[j + 8 >> 2] >> 2] = 0;
				c[j + 4 >> 2] = 0;
				if (a[k >> 0] | 0)
					Jj(j, Cb[c[(c[b >> 2] | 0) + 44 >> 2] & 15](b, 45) | 0);
				g = Cb[c[(c[b >> 2] | 0) + 44 >> 2] & 15](b, 48) | 0;
				b = c[r >> 2] | 0;
				f = c[l >> 2] | 0;
				k = f + -4 | 0;
				a : do
					if (b >>> 0 < k >>> 0)
						do {
							if ((c[b >> 2] | 0) != (g | 0))
								break a;
							b = b + 4 | 0
						} while (b >>> 0 < k >>> 0);
				while (0);
				ar(j, b, f) | 0
			}
			b = c[d >> 2] | 0;
			do
				if (b) {
					k = c[b + 12 >> 2] | 0;
					if ((k | 0) == (c[b + 16 >> 2] | 0))
						b = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
					else
						b = c[k >> 2] | 0;
					if ((b | 0) == -1) {
						c[d >> 2] = 0;
						k = 1;
						break
					} else {
						k = (c[d >> 2] | 0) == 0;
						break
					}
				} else
					k = 1;
			while (0);
			do
				if (n) {
					b = c[m + 12 >> 2] | 0;
					if ((b | 0) == (c[m + 16 >> 2] | 0))
						b = wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](m) | 0;
					else
						b = c[b >> 2] | 0;
					if ((b | 0) != -1)
						if (k)
							break;
						else {
							p = 26;
							break
						}
					else {
						c[e >> 2] = 0;
						p = 24;
						break
					}
				} else
					p = 24;
			while (0);
			if ((p | 0) == 24 ? k : 0)
				p = 26;
			if ((p | 0) == 26)
				c[h >> 2] = c[h >> 2] | 2;
			k = c[d >> 2] | 0;
			cs(o) | 0;
			b = c[r >> 2] | 0;
			c[r >> 2] = 0;
			if (b)
				sb[c[q >> 2] & 255](b);
			i = s;
			return k | 0
		}
		function co(b, d, e, f, g, h, j, k, l, m) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			k = k | 0;
			l = l | 0;
			m = m | 0;
			var n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0;
			x = i;
			i = i + 112 | 0;
			n = x + 100 | 0;
			o = x + 88 | 0;
			p = x + 76 | 0;
			q = x + 64 | 0;
			r = x + 52 | 0;
			s = x + 48 | 0;
			t = x + 36 | 0;
			u = x + 24 | 0;
			v = x + 12 | 0;
			w = x;
			if (b) {
				b = Mo(d, 9088) | 0;
				tb[c[(c[b >> 2] | 0) + 44 >> 2] & 127](n, b);
				w = c[n >> 2] | 0;
				a[e >> 0] = w;
				a[e + 1 >> 0] = w >> 8;
				a[e + 2 >> 0] = w >> 16;
				a[e + 3 >> 0] = w >> 24;
				tb[c[(c[b >> 2] | 0) + 32 >> 2] & 127](o, b);
				if (!(a[l >> 0] & 1))
					a[l >> 0] = 0;
				else
					c[c[l + 8 >> 2] >> 2] = 0;
				c[l + 4 >> 2] = 0;
				Ij(l, 0);
				c[l >> 2] = c[o >> 2];
				c[l + 4 >> 2] = c[o + 4 >> 2];
				c[l + 8 >> 2] = c[o + 8 >> 2];
				c[o >> 2] = 0;
				c[o + 4 >> 2] = 0;
				c[o + 8 >> 2] = 0;
				Fj(o);
				tb[c[(c[b >> 2] | 0) + 28 >> 2] & 127](p, b);
				if (!(a[k >> 0] & 1))
					a[k >> 0] = 0;
				else
					c[c[k + 8 >> 2] >> 2] = 0;
				c[k + 4 >> 2] = 0;
				Ij(k, 0);
				c[k >> 2] = c[p >> 2];
				c[k + 4 >> 2] = c[p + 4 >> 2];
				c[k + 8 >> 2] = c[p + 8 >> 2];
				c[p >> 2] = 0;
				c[p + 4 >> 2] = 0;
				c[p + 8 >> 2] = 0;
				Fj(p);
				c[f >> 2] = wb[c[(c[b >> 2] | 0) + 12 >> 2] & 127](b) | 0;
				c[g >> 2] = wb[c[(c[b >> 2] | 0) + 16 >> 2] & 127](b) | 0;
				tb[c[(c[b >> 2] | 0) + 20 >> 2] & 127](q, b);
				if (!(a[h >> 0] & 1)) {
					a[h + 1 >> 0] = 0;
					a[h >> 0] = 0
				} else {
					a[c[h + 8 >> 2] >> 0] = 0;
					c[h + 4 >> 2] = 0
				}
				wj(h, 0);
				c[h >> 2] = c[q >> 2];
				c[h + 4 >> 2] = c[q + 4 >> 2];
				c[h + 8 >> 2] = c[q + 8 >> 2];
				c[q >> 2] = 0;
				c[q + 4 >> 2] = 0;
				c[q + 8 >> 2] = 0;
				qj(q);
				tb[c[(c[b >> 2] | 0) + 24 >> 2] & 127](r, b);
				if (!(a[j >> 0] & 1))
					a[j >> 0] = 0;
				else
					c[c[j + 8 >> 2] >> 2] = 0;
				c[j + 4 >> 2] = 0;
				Ij(j, 0);
				c[j >> 2] = c[r >> 2];
				c[j + 4 >> 2] = c[r + 4 >> 2];
				c[j + 8 >> 2] = c[r + 8 >> 2];
				c[r >> 2] = 0;
				c[r + 4 >> 2] = 0;
				c[r + 8 >> 2] = 0;
				Fj(r);
				b = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0
			} else {
				b = Mo(d, 9024) | 0;
				tb[c[(c[b >> 2] | 0) + 44 >> 2] & 127](s, b);
				s = c[s >> 2] | 0;
				a[e >> 0] = s;
				a[e + 1 >> 0] = s >> 8;
				a[e + 2 >> 0] = s >> 16;
				a[e + 3 >> 0] = s >> 24;
				tb[c[(c[b >> 2] | 0) + 32 >> 2] & 127](t, b);
				if (!(a[l >> 0] & 1))
					a[l >> 0] = 0;
				else
					c[c[l + 8 >> 2] >> 2] = 0;
				c[l + 4 >> 2] = 0;
				Ij(l, 0);
				c[l >> 2] = c[t >> 2];
				c[l + 4 >> 2] = c[t + 4 >> 2];
				c[l + 8 >> 2] = c[t + 8 >> 2];
				c[t >> 2] = 0;
				c[t + 4 >> 2] = 0;
				c[t + 8 >> 2] = 0;
				Fj(t);
				tb[c[(c[b >> 2] | 0) + 28 >> 2] & 127](u, b);
				if (!(a[k >> 0] & 1))
					a[k >> 0] = 0;
				else
					c[c[k + 8 >> 2] >> 2] = 0;
				c[k + 4 >> 2] = 0;
				Ij(k, 0);
				c[k >> 2] = c[u >> 2];
				c[k + 4 >> 2] = c[u + 4 >> 2];
				c[k + 8 >> 2] = c[u + 8 >> 2];
				c[u >> 2] = 0;
				c[u + 4 >> 2] = 0;
				c[u + 8 >> 2] = 0;
				Fj(u);
				c[f >> 2] = wb[c[(c[b >> 2] | 0) + 12 >> 2] & 127](b) | 0;
				c[g >> 2] = wb[c[(c[b >> 2] | 0) + 16 >> 2] & 127](b) | 0;
				tb[c[(c[b >> 2] | 0) + 20 >> 2] & 127](v, b);
				if (!(a[h >> 0] & 1)) {
					a[h + 1 >> 0] = 0;
					a[h >> 0] = 0
				} else {
					a[c[h + 8 >> 2] >> 0] = 0;
					c[h + 4 >> 2] = 0
				}
				wj(h, 0);
				c[h >> 2] = c[v >> 2];
				c[h + 4 >> 2] = c[v + 4 >> 2];
				c[h + 8 >> 2] = c[v + 8 >> 2];
				c[v >> 2] = 0;
				c[v + 4 >> 2] = 0;
				c[v + 8 >> 2] = 0;
				qj(v);
				tb[c[(c[b >> 2] | 0) + 24 >> 2] & 127](w, b);
				if (!(a[j >> 0] & 1))
					a[j >> 0] = 0;
				else
					c[c[j + 8 >> 2] >> 2] = 0;
				c[j + 4 >> 2] = 0;
				Ij(j, 0);
				c[j >> 2] = c[w >> 2];
				c[j + 4 >> 2] = c[w + 4 >> 2];
				c[j + 8 >> 2] = c[w + 8 >> 2];
				c[w >> 2] = 0;
				c[w + 4 >> 2] = 0;
				c[w + 8 >> 2] = 0;
				Fj(w);
				b = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0
			}
			c[m >> 2] = b;
			i = x;
			return
		}
		function eo(a) {
			a = a | 0;
			return
		}
		function fo(a) {
			a = a | 0;
			ih(a);
			return
		}
		function go(b, d, e, f, g, j) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			j = +j;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0,
			E = 0,
			F = 0,
			G = 0,
			H = 0;
			F = i;
			i = i + 384 | 0;
			q = F + 8 | 0;
			l = F;
			b = F + 284 | 0;
			m = F + 72 | 0;
			k = F + 184 | 0;
			A = F + 68 | 0;
			w = F + 80 | 0;
			v = F + 77 | 0;
			t = F + 76 | 0;
			E = F + 56 | 0;
			D = F + 44 | 0;
			C = F + 32 | 0;
			o = F + 28 | 0;
			p = F + 84 | 0;
			s = F + 24 | 0;
			u = F + 20 | 0;
			r = F + 16 | 0;
			c[m >> 2] = b;
			h[q >> 3] = j;
			b = Gi(b, 100, 23593, q) | 0;
			if (b >>> 0 > 99) {
				b = $k() | 0;
				h[l >> 3] = j;
				b = Uq(m, b, 23593, l) | 0;
				k = c[m >> 2] | 0;
				if (!k)
					Nh();
				l = fj(b) | 0;
				if (!l)
					Nh();
				else {
					G = l;
					H = k;
					y = l;
					z = b
				}
			} else {
				G = 0;
				H = 0;
				y = k;
				z = b
			}
			b = Tj(f) | 0;
			c[A >> 2] = b;
			n = Mo(A, 9352) | 0;
			l = c[m >> 2] | 0;
			Ab[c[(c[n >> 2] | 0) + 32 >> 2] & 7](n, l, l + z | 0, y) | 0;
			if (!z)
				m = 0;
			else
				m = (a[c[m >> 2] >> 0] | 0) == 45;
			c[E >> 2] = 0;
			c[E + 4 >> 2] = 0;
			c[E + 8 >> 2] = 0;
			c[D >> 2] = 0;
			c[D + 4 >> 2] = 0;
			c[D + 8 >> 2] = 0;
			c[C >> 2] = 0;
			c[C + 4 >> 2] = 0;
			c[C + 8 >> 2] = 0;
			ho(e, m, A, w, v, t, E, D, C, o);
			l = c[o >> 2] | 0;
			if ((z | 0) > (l | 0)) {
				e = a[C >> 0] | 0;
				k = a[D >> 0] | 0;
				k = (z - l << 1 | 1) + l + ((e & 1) == 0 ? (e & 255) >>> 1 : c[C + 4 >> 2] | 0) + ((k & 1) == 0 ? (k & 255) >>> 1 : c[D + 4 >> 2] | 0) | 0
			} else {
				e = a[C >> 0] | 0;
				k = a[D >> 0] | 0;
				k = l + 2 + ((e & 1) == 0 ? (e & 255) >>> 1 : c[C + 4 >> 2] | 0) + ((k & 1) == 0 ? (k & 255) >>> 1 : c[D + 4 >> 2] | 0) | 0
			}
			if (k >>> 0 > 100) {
				k = fj(k) | 0;
				if (!k)
					Nh();
				else {
					B = k;
					x = k
				}
			} else {
				B = 0;
				x = p
			}
			io(x, s, u, c[f + 4 >> 2] | 0, y, y + z | 0, n, m, w, a[v >> 0] | 0, a[t >> 0] | 0, E, D, C, l);
			c[r >> 2] = c[d >> 2];
			d = c[s >> 2] | 0;
			k = c[u >> 2] | 0;
			c[q >> 2] = c[r >> 2];
			k = yf(q, x, d, k, f, g) | 0;
			if (B) {
				gj(B);
				b = c[A >> 2] | 0
			}
			qj(C);
			qj(D);
			qj(E);
			cs(b) | 0;
			if (G)
				gj(G);
			if (H)
				gj(H);
			i = F;
			return k | 0
		}
		function ho(b, d, e, f, g, h, j, k, l, m) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			k = k | 0;
			l = l | 0;
			m = m | 0;
			var n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0;
			z = i;
			i = i + 112 | 0;
			n = z + 108 | 0;
			o = z + 96 | 0;
			p = z + 92 | 0;
			q = z + 80 | 0;
			x = z + 68 | 0;
			y = z + 56 | 0;
			r = z + 52 | 0;
			s = z + 40 | 0;
			t = z + 36 | 0;
			u = z + 24 | 0;
			v = z + 12 | 0;
			w = z;
			if (b) {
				e = Mo(e, 8960) | 0;
				b = c[e >> 2] | 0;
				if (d) {
					tb[c[b + 44 >> 2] & 127](n, e);
					d = c[n >> 2] | 0;
					a[f >> 0] = d;
					a[f + 1 >> 0] = d >> 8;
					a[f + 2 >> 0] = d >> 16;
					a[f + 3 >> 0] = d >> 24;
					tb[c[(c[e >> 2] | 0) + 32 >> 2] & 127](o, e);
					if (!(a[l >> 0] & 1)) {
						a[l + 1 >> 0] = 0;
						a[l >> 0] = 0
					} else {
						a[c[l + 8 >> 2] >> 0] = 0;
						c[l + 4 >> 2] = 0
					}
					wj(l, 0);
					c[l >> 2] = c[o >> 2];
					c[l + 4 >> 2] = c[o + 4 >> 2];
					c[l + 8 >> 2] = c[o + 8 >> 2];
					c[o >> 2] = 0;
					c[o + 4 >> 2] = 0;
					c[o + 8 >> 2] = 0;
					qj(o);
					b = e
				} else {
					tb[c[b + 40 >> 2] & 127](p, e);
					d = c[p >> 2] | 0;
					a[f >> 0] = d;
					a[f + 1 >> 0] = d >> 8;
					a[f + 2 >> 0] = d >> 16;
					a[f + 3 >> 0] = d >> 24;
					tb[c[(c[e >> 2] | 0) + 28 >> 2] & 127](q, e);
					if (!(a[l >> 0] & 1)) {
						a[l + 1 >> 0] = 0;
						a[l >> 0] = 0
					} else {
						a[c[l + 8 >> 2] >> 0] = 0;
						c[l + 4 >> 2] = 0
					}
					wj(l, 0);
					c[l >> 2] = c[q >> 2];
					c[l + 4 >> 2] = c[q + 4 >> 2];
					c[l + 8 >> 2] = c[q + 8 >> 2];
					c[q >> 2] = 0;
					c[q + 4 >> 2] = 0;
					c[q + 8 >> 2] = 0;
					qj(q);
					b = e
				}
				a[g >> 0] = wb[c[(c[e >> 2] | 0) + 12 >> 2] & 127](e) | 0;
				a[h >> 0] = wb[c[(c[e >> 2] | 0) + 16 >> 2] & 127](e) | 0;
				tb[c[(c[b >> 2] | 0) + 20 >> 2] & 127](x, e);
				if (!(a[j >> 0] & 1)) {
					a[j + 1 >> 0] = 0;
					a[j >> 0] = 0
				} else {
					a[c[j + 8 >> 2] >> 0] = 0;
					c[j + 4 >> 2] = 0
				}
				wj(j, 0);
				c[j >> 2] = c[x >> 2];
				c[j + 4 >> 2] = c[x + 4 >> 2];
				c[j + 8 >> 2] = c[x + 8 >> 2];
				c[x >> 2] = 0;
				c[x + 4 >> 2] = 0;
				c[x + 8 >> 2] = 0;
				qj(x);
				tb[c[(c[b >> 2] | 0) + 24 >> 2] & 127](y, e);
				if (!(a[k >> 0] & 1)) {
					a[k + 1 >> 0] = 0;
					a[k >> 0] = 0
				} else {
					a[c[k + 8 >> 2] >> 0] = 0;
					c[k + 4 >> 2] = 0
				}
				wj(k, 0);
				c[k >> 2] = c[y >> 2];
				c[k + 4 >> 2] = c[y + 4 >> 2];
				c[k + 8 >> 2] = c[y + 8 >> 2];
				c[y >> 2] = 0;
				c[y + 4 >> 2] = 0;
				c[y + 8 >> 2] = 0;
				qj(y);
				b = wb[c[(c[e >> 2] | 0) + 36 >> 2] & 127](e) | 0
			} else {
				e = Mo(e, 8896) | 0;
				b = c[e >> 2] | 0;
				if (d) {
					tb[c[b + 44 >> 2] & 127](r, e);
					d = c[r >> 2] | 0;
					a[f >> 0] = d;
					a[f + 1 >> 0] = d >> 8;
					a[f + 2 >> 0] = d >> 16;
					a[f + 3 >> 0] = d >> 24;
					tb[c[(c[e >> 2] | 0) + 32 >> 2] & 127](s, e);
					if (!(a[l >> 0] & 1)) {
						a[l + 1 >> 0] = 0;
						a[l >> 0] = 0
					} else {
						a[c[l + 8 >> 2] >> 0] = 0;
						c[l + 4 >> 2] = 0
					}
					wj(l, 0);
					c[l >> 2] = c[s >> 2];
					c[l + 4 >> 2] = c[s + 4 >> 2];
					c[l + 8 >> 2] = c[s + 8 >> 2];
					c[s >> 2] = 0;
					c[s + 4 >> 2] = 0;
					c[s + 8 >> 2] = 0;
					qj(s);
					b = e
				} else {
					tb[c[b + 40 >> 2] & 127](t, e);
					d = c[t >> 2] | 0;
					a[f >> 0] = d;
					a[f + 1 >> 0] = d >> 8;
					a[f + 2 >> 0] = d >> 16;
					a[f + 3 >> 0] = d >> 24;
					tb[c[(c[e >> 2] | 0) + 28 >> 2] & 127](u, e);
					if (!(a[l >> 0] & 1)) {
						a[l + 1 >> 0] = 0;
						a[l >> 0] = 0
					} else {
						a[c[l + 8 >> 2] >> 0] = 0;
						c[l + 4 >> 2] = 0
					}
					wj(l, 0);
					c[l >> 2] = c[u >> 2];
					c[l + 4 >> 2] = c[u + 4 >> 2];
					c[l + 8 >> 2] = c[u + 8 >> 2];
					c[u >> 2] = 0;
					c[u + 4 >> 2] = 0;
					c[u + 8 >> 2] = 0;
					qj(u);
					b = e
				}
				a[g >> 0] = wb[c[(c[e >> 2] | 0) + 12 >> 2] & 127](e) | 0;
				a[h >> 0] = wb[c[(c[e >> 2] | 0) + 16 >> 2] & 127](e) | 0;
				tb[c[(c[b >> 2] | 0) + 20 >> 2] & 127](v, e);
				if (!(a[j >> 0] & 1)) {
					a[j + 1 >> 0] = 0;
					a[j >> 0] = 0
				} else {
					a[c[j + 8 >> 2] >> 0] = 0;
					c[j + 4 >> 2] = 0
				}
				wj(j, 0);
				c[j >> 2] = c[v >> 2];
				c[j + 4 >> 2] = c[v + 4 >> 2];
				c[j + 8 >> 2] = c[v + 8 >> 2];
				c[v >> 2] = 0;
				c[v + 4 >> 2] = 0;
				c[v + 8 >> 2] = 0;
				qj(v);
				tb[c[(c[b >> 2] | 0) + 24 >> 2] & 127](w, e);
				if (!(a[k >> 0] & 1)) {
					a[k + 1 >> 0] = 0;
					a[k >> 0] = 0
				} else {
					a[c[k + 8 >> 2] >> 0] = 0;
					c[k + 4 >> 2] = 0
				}
				wj(k, 0);
				c[k >> 2] = c[w >> 2];
				c[k + 4 >> 2] = c[w + 4 >> 2];
				c[k + 8 >> 2] = c[w + 8 >> 2];
				c[w >> 2] = 0;
				c[w + 4 >> 2] = 0;
				c[w + 8 >> 2] = 0;
				qj(w);
				b = wb[c[(c[e >> 2] | 0) + 36 >> 2] & 127](e) | 0
			}
			c[m >> 2] = b;
			i = z;
			return
		}
		function io(d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			i = i | 0;
			j = j | 0;
			k = k | 0;
			l = l | 0;
			m = m | 0;
			n = n | 0;
			o = o | 0;
			p = p | 0;
			q = q | 0;
			r = r | 0;
			var s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0,
			E = 0,
			F = 0,
			G = 0,
			H = 0,
			I = 0,
			J = 0,
			K = 0,
			L = 0,
			M = 0,
			N = 0,
			O = 0,
			P = 0;
			c[f >> 2] = d;
			N = q + 4 | 0;
			O = q + 8 | 0;
			P = q + 1 | 0;
			H = p + 4 | 0;
			I = (g & 512 | 0) == 0;
			J = p + 8 | 0;
			K = p + 1 | 0;
			L = j + 8 | 0;
			M = (r | 0) > 0;
			A = o + 4 | 0;
			B = o + 8 | 0;
			C = o + 1 | 0;
			D = r + 1 | 0;
			F = -2 - r - ((r | 0) < 0 ? ~r : -1) | 0;
			G = (r | 0) > 0;
			z = 0;
			do {
				switch (a[l + z >> 0] | 0) {
				case 0: {
						c[e >> 2] = c[f >> 2];
						break
					}
				case 1: {
						c[e >> 2] = c[f >> 2];
						x = Cb[c[(c[j >> 2] | 0) + 28 >> 2] & 15](j, 32) | 0;
						y = c[f >> 2] | 0;
						c[f >> 2] = y + 1;
						a[y >> 0] = x;
						break
					}
				case 3: {
						y = a[q >> 0] | 0;
						s = (y & 1) == 0;
						if ((s ? (y & 255) >>> 1 : c[N >> 2] | 0) | 0) {
							x = a[(s ? P : c[O >> 2] | 0) >> 0] | 0;
							y = c[f >> 2] | 0;
							c[f >> 2] = y + 1;
							a[y >> 0] = x
						}
						break
					}
				case 2: {
						u = a[p >> 0] | 0;
						s = (u & 1) == 0;
						u = s ? (u & 255) >>> 1 : c[H >> 2] | 0;
						if (!(I | (u | 0) == 0)) {
							t = s ? K : c[J >> 2] | 0;
							v = t + u | 0;
							s = c[f >> 2] | 0;
							if (u)
								do {
									a[s >> 0] = a[t >> 0] | 0;
									t = t + 1 | 0;
									s = s + 1 | 0
								} while ((t | 0) != (v | 0));
							c[f >> 2] = s
						}
						break
					}
				case 4: {
						s = c[f >> 2] | 0;
						h = k ? h + 1 | 0 : h;
						w = h;
						v = c[L >> 2] | 0;
						a : do
							if (h >>> 0 < i >>> 0) {
								t = h;
								do {
									u = a[t >> 0] | 0;
									if (u << 24 >> 24 <= -1)
										break a;
									if (!(b[v + (u << 24 >> 24 << 1) >> 1] & 2048))
										break a;
									t = t + 1 | 0
								} while (t >>> 0 < i >>> 0)
							} else
								t = h;
						while (0);
						u = t;
						if (M) {
							x = -2 - u - ~(u >>> 0 > w >>> 0 ? w : u) | 0;
							x = F >>> 0 > x >>> 0 ? F : x;
							if (t >>> 0 > h >>> 0 & G) {
								u = t;
								w = r;
								while (1) {
									u = u + -1 | 0;
									y = a[u >> 0] | 0;
									v = c[f >> 2] | 0;
									c[f >> 2] = v + 1;
									a[v >> 0] = y;
									v = (w | 0) > 1;
									if (!(u >>> 0 > h >>> 0 & v))
										break;
									else
										w = w + -1 | 0
								}
							} else
								v = G;
							y = D + x | 0;
							u = t + (x + 1) | 0;
							if (v)
								w = Cb[c[(c[j >> 2] | 0) + 28 >> 2] & 15](j, 48) | 0;
							else
								w = 0;
							t = c[f >> 2] | 0;
							c[f >> 2] = t + 1;
							if ((y | 0) > 0) {
								v = y;
								while (1) {
									a[t >> 0] = w;
									t = c[f >> 2] | 0;
									c[f >> 2] = t + 1;
									if ((v | 0) > 1)
										v = v + -1 | 0;
									else
										break
								}
							}
							a[t >> 0] = m
						} else
							u = t;
						if ((u | 0) != (h | 0)) {
							y = a[o >> 0] | 0;
							t = (y & 1) == 0;
							if (!((t ? (y & 255) >>> 1 : c[A >> 2] | 0) | 0))
								t = -1;
							else
								t = a[(t ? C : c[B >> 2] | 0) >> 0] | 0;
							if ((u | 0) != (h | 0)) {
								v = 0;
								w = 0;
								while (1) {
									if ((w | 0) == (t | 0)) {
										y = c[f >> 2] | 0;
										c[f >> 2] = y + 1;
										a[y >> 0] = n;
										v = v + 1 | 0;
										y = a[o >> 0] | 0;
										t = (y & 1) == 0;
										if (v >>> 0 < (t ? (y & 255) >>> 1 : c[A >> 2] | 0) >>> 0) {
											t = a[(t ? C : c[B >> 2] | 0) + v >> 0] | 0;
											t = t << 24 >> 24 == 127 ? -1 : t << 24 >> 24;
											w = 0
										} else {
											t = w;
											w = 0
										}
									}
									u = u + -1 | 0;
									x = a[u >> 0] | 0;
									y = c[f >> 2] | 0;
									c[f >> 2] = y + 1;
									a[y >> 0] = x;
									if ((u | 0) == (h | 0))
										break;
									else
										w = w + 1 | 0
								}
							}
						} else {
							x = Cb[c[(c[j >> 2] | 0) + 28 >> 2] & 15](j, 48) | 0;
							y = c[f >> 2] | 0;
							c[f >> 2] = y + 1;
							a[y >> 0] = x
						}
						t = c[f >> 2] | 0;
						if ((s | 0) != (t | 0) ? (E = t + -1 | 0, s >>> 0 < E >>> 0) : 0) {
							t = E;
							do {
								y = a[s >> 0] | 0;
								a[s >> 0] = a[t >> 0] | 0;
								a[t >> 0] = y;
								s = s + 1 | 0;
								t = t + -1 | 0
							} while (s >>> 0 < t >>> 0)
						}
						break
					}
				default: {}

				}
				z = z + 1 | 0
			} while ((z | 0) != 4);
			t = a[q >> 0] | 0;
			h = (t & 1) == 0;
			t = h ? (t & 255) >>> 1 : c[N >> 2] | 0;
			if (t >>> 0 > 1) {
				s = h ? P : c[O >> 2] | 0;
				u = s + t | 0;
				h = c[f >> 2] | 0;
				if ((t | 0) != 1) {
					s = s + 1 | 0;
					do {
						a[h >> 0] = a[s >> 0] | 0;
						h = h + 1 | 0;
						s = s + 1 | 0
					} while ((s | 0) != (u | 0))
				}
				c[f >> 2] = h
			}
			switch (g & 176 | 0) {
			case 32: {
					c[e >> 2] = c[f >> 2];
					break
				}
			case 16:
				break;
			default:
				c[e >> 2] = d
			}
			return
		}
		function jo(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0,
			E = 0;
			D = i;
			i = i + 176 | 0;
			p = D + 56 | 0;
			y = D + 52 | 0;
			w = D + 64 | 0;
			v = D + 61 | 0;
			t = D + 60 | 0;
			C = D + 40 | 0;
			B = D + 28 | 0;
			A = D + 16 | 0;
			l = D + 12 | 0;
			o = D + 68 | 0;
			s = D + 8 | 0;
			u = D + 4 | 0;
			q = D;
			b = Tj(f) | 0;
			c[y >> 2] = b;
			r = Mo(y, 9352) | 0;
			n = a[h >> 0] | 0;
			j = (n & 1) == 0;
			k = h + 4 | 0;
			if (!((j ? (n & 255) >>> 1 : c[k >> 2] | 0) | 0))
				n = 0;
			else {
				n = a[(j ? h + 1 | 0 : c[h + 8 >> 2] | 0) >> 0] | 0;
				n = n << 24 >> 24 == (Cb[c[(c[r >> 2] | 0) + 28 >> 2] & 15](r, 45) | 0) << 24 >> 24
			}
			c[C >> 2] = 0;
			c[C + 4 >> 2] = 0;
			c[C + 8 >> 2] = 0;
			c[B >> 2] = 0;
			c[B + 4 >> 2] = 0;
			c[B + 8 >> 2] = 0;
			c[A >> 2] = 0;
			c[A + 4 >> 2] = 0;
			c[A + 8 >> 2] = 0;
			ho(e, n, y, w, v, t, C, B, A, l);
			m = a[h >> 0] | 0;
			e = c[k >> 2] | 0;
			j = (m & 1) == 0 ? (m & 255) >>> 1 : e;
			k = c[l >> 2] | 0;
			if ((j | 0) > (k | 0)) {
				E = a[A >> 0] | 0;
				l = a[B >> 0] | 0;
				j = (j - k << 1 | 1) + k + ((E & 1) == 0 ? (E & 255) >>> 1 : c[A + 4 >> 2] | 0) + ((l & 1) == 0 ? (l & 255) >>> 1 : c[B + 4 >> 2] | 0) | 0
			} else {
				E = a[A >> 0] | 0;
				j = a[B >> 0] | 0;
				j = k + 2 + ((E & 1) == 0 ? (E & 255) >>> 1 : c[A + 4 >> 2] | 0) + ((j & 1) == 0 ? (j & 255) >>> 1 : c[B + 4 >> 2] | 0) | 0
			}
			if (j >>> 0 > 100) {
				j = fj(j) | 0;
				if (!j)
					Nh();
				else {
					z = j;
					x = j
				}
			} else {
				z = 0;
				x = o
			}
			E = (m & 1) == 0;
			j = E ? h + 1 | 0 : c[h + 8 >> 2] | 0;
			io(x, s, u, c[f + 4 >> 2] | 0, j, j + (E ? (m & 255) >>> 1 : e) | 0, r, n, w, a[v >> 0] | 0, a[t >> 0] | 0, C, B, A, k);
			c[q >> 2] = c[d >> 2];
			E = c[s >> 2] | 0;
			j = c[u >> 2] | 0;
			c[p >> 2] = c[q >> 2];
			j = yf(p, x, E, j, f, g) | 0;
			if (z) {
				gj(z);
				b = c[y >> 2] | 0
			}
			qj(A);
			qj(B);
			qj(C);
			cs(b) | 0;
			i = D;
			return j | 0
		}
		function ko(a) {
			a = a | 0;
			return
		}
		function lo(a) {
			a = a | 0;
			ih(a);
			return
		}
		function mo(b, d, e, f, g, j) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			j = +j;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0,
			E = 0,
			F = 0,
			G = 0,
			H = 0;
			F = i;
			i = i + 992 | 0;
			q = F + 8 | 0;
			l = F;
			b = F + 888 | 0;
			m = F + 880 | 0;
			k = F + 480 | 0;
			A = F + 76 | 0;
			w = F + 884 | 0;
			v = F + 72 | 0;
			t = F + 68 | 0;
			E = F + 56 | 0;
			D = F + 44 | 0;
			C = F + 32 | 0;
			o = F + 28 | 0;
			p = F + 80 | 0;
			s = F + 24 | 0;
			u = F + 20 | 0;
			r = F + 16 | 0;
			c[m >> 2] = b;
			h[q >> 3] = j;
			b = Gi(b, 100, 23593, q) | 0;
			if (b >>> 0 > 99) {
				b = $k() | 0;
				h[l >> 3] = j;
				b = Uq(m, b, 23593, l) | 0;
				k = c[m >> 2] | 0;
				if (!k)
					Nh();
				l = fj(b << 2) | 0;
				if (!l)
					Nh();
				else {
					G = l;
					H = k;
					y = l;
					z = b
				}
			} else {
				G = 0;
				H = 0;
				y = k;
				z = b
			}
			b = Tj(f) | 0;
			c[A >> 2] = b;
			n = Mo(A, 9344) | 0;
			l = c[m >> 2] | 0;
			Ab[c[(c[n >> 2] | 0) + 48 >> 2] & 7](n, l, l + z | 0, y) | 0;
			if (!z)
				m = 0;
			else
				m = (a[c[m >> 2] >> 0] | 0) == 45;
			c[E >> 2] = 0;
			c[E + 4 >> 2] = 0;
			c[E + 8 >> 2] = 0;
			c[D >> 2] = 0;
			c[D + 4 >> 2] = 0;
			c[D + 8 >> 2] = 0;
			c[C >> 2] = 0;
			c[C + 4 >> 2] = 0;
			c[C + 8 >> 2] = 0;
			no(e, m, A, w, v, t, E, D, C, o);
			l = c[o >> 2] | 0;
			if ((z | 0) > (l | 0)) {
				e = a[C >> 0] | 0;
				k = a[D >> 0] | 0;
				k = (z - l << 1 | 1) + l + ((e & 1) == 0 ? (e & 255) >>> 1 : c[C + 4 >> 2] | 0) + ((k & 1) == 0 ? (k & 255) >>> 1 : c[D + 4 >> 2] | 0) | 0
			} else {
				e = a[C >> 0] | 0;
				k = a[D >> 0] | 0;
				k = l + 2 + ((e & 1) == 0 ? (e & 255) >>> 1 : c[C + 4 >> 2] | 0) + ((k & 1) == 0 ? (k & 255) >>> 1 : c[D + 4 >> 2] | 0) | 0
			}
			if (k >>> 0 > 100) {
				k = fj(k << 2) | 0;
				if (!k)
					Nh();
				else {
					B = k;
					x = k
				}
			} else {
				B = 0;
				x = p
			}
			oo(x, s, u, c[f + 4 >> 2] | 0, y, y + (z << 2) | 0, n, m, w, c[v >> 2] | 0, c[t >> 2] | 0, E, D, C, l);
			c[r >> 2] = c[d >> 2];
			d = c[s >> 2] | 0;
			k = c[u >> 2] | 0;
			c[q >> 2] = c[r >> 2];
			k = Vq(q, x, d, k, f, g) | 0;
			if (B) {
				gj(B);
				b = c[A >> 2] | 0
			}
			Fj(C);
			Fj(D);
			qj(E);
			cs(b) | 0;
			if (G)
				gj(G);
			if (H)
				gj(H);
			i = F;
			return k | 0
		}
		function no(b, d, e, f, g, h, j, k, l, m) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			k = k | 0;
			l = l | 0;
			m = m | 0;
			var n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0;
			z = i;
			i = i + 112 | 0;
			n = z + 108 | 0;
			o = z + 96 | 0;
			r = z + 92 | 0;
			s = z + 80 | 0;
			t = z + 68 | 0;
			u = z + 56 | 0;
			v = z + 52 | 0;
			w = z + 40 | 0;
			x = z + 36 | 0;
			y = z + 24 | 0;
			p = z + 12 | 0;
			q = z;
			if (b) {
				b = Mo(e, 9088) | 0;
				e = c[b >> 2] | 0;
				if (d) {
					tb[c[e + 44 >> 2] & 127](n, b);
					d = c[n >> 2] | 0;
					a[f >> 0] = d;
					a[f + 1 >> 0] = d >> 8;
					a[f + 2 >> 0] = d >> 16;
					a[f + 3 >> 0] = d >> 24;
					tb[c[(c[b >> 2] | 0) + 32 >> 2] & 127](o, b);
					if (!(a[l >> 0] & 1))
						a[l >> 0] = 0;
					else
						c[c[l + 8 >> 2] >> 2] = 0;
					c[l + 4 >> 2] = 0;
					Ij(l, 0);
					c[l >> 2] = c[o >> 2];
					c[l + 4 >> 2] = c[o + 4 >> 2];
					c[l + 8 >> 2] = c[o + 8 >> 2];
					c[o >> 2] = 0;
					c[o + 4 >> 2] = 0;
					c[o + 8 >> 2] = 0;
					Fj(o)
				} else {
					tb[c[e + 40 >> 2] & 127](r, b);
					d = c[r >> 2] | 0;
					a[f >> 0] = d;
					a[f + 1 >> 0] = d >> 8;
					a[f + 2 >> 0] = d >> 16;
					a[f + 3 >> 0] = d >> 24;
					tb[c[(c[b >> 2] | 0) + 28 >> 2] & 127](s, b);
					if (!(a[l >> 0] & 1))
						a[l >> 0] = 0;
					else
						c[c[l + 8 >> 2] >> 2] = 0;
					c[l + 4 >> 2] = 0;
					Ij(l, 0);
					c[l >> 2] = c[s >> 2];
					c[l + 4 >> 2] = c[s + 4 >> 2];
					c[l + 8 >> 2] = c[s + 8 >> 2];
					c[s >> 2] = 0;
					c[s + 4 >> 2] = 0;
					c[s + 8 >> 2] = 0;
					Fj(s)
				}
				c[g >> 2] = wb[c[(c[b >> 2] | 0) + 12 >> 2] & 127](b) | 0;
				c[h >> 2] = wb[c[(c[b >> 2] | 0) + 16 >> 2] & 127](b) | 0;
				tb[c[(c[b >> 2] | 0) + 20 >> 2] & 127](t, b);
				if (!(a[j >> 0] & 1)) {
					a[j + 1 >> 0] = 0;
					a[j >> 0] = 0
				} else {
					a[c[j + 8 >> 2] >> 0] = 0;
					c[j + 4 >> 2] = 0
				}
				wj(j, 0);
				c[j >> 2] = c[t >> 2];
				c[j + 4 >> 2] = c[t + 4 >> 2];
				c[j + 8 >> 2] = c[t + 8 >> 2];
				c[t >> 2] = 0;
				c[t + 4 >> 2] = 0;
				c[t + 8 >> 2] = 0;
				qj(t);
				tb[c[(c[b >> 2] | 0) + 24 >> 2] & 127](u, b);
				if (!(a[k >> 0] & 1))
					a[k >> 0] = 0;
				else
					c[c[k + 8 >> 2] >> 2] = 0;
				c[k + 4 >> 2] = 0;
				Ij(k, 0);
				c[k >> 2] = c[u >> 2];
				c[k + 4 >> 2] = c[u + 4 >> 2];
				c[k + 8 >> 2] = c[u + 8 >> 2];
				c[u >> 2] = 0;
				c[u + 4 >> 2] = 0;
				c[u + 8 >> 2] = 0;
				Fj(u);
				b = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0
			} else {
				b = Mo(e, 9024) | 0;
				e = c[b >> 2] | 0;
				if (d) {
					tb[c[e + 44 >> 2] & 127](v, b);
					d = c[v >> 2] | 0;
					a[f >> 0] = d;
					a[f + 1 >> 0] = d >> 8;
					a[f + 2 >> 0] = d >> 16;
					a[f + 3 >> 0] = d >> 24;
					tb[c[(c[b >> 2] | 0) + 32 >> 2] & 127](w, b);
					if (!(a[l >> 0] & 1))
						a[l >> 0] = 0;
					else
						c[c[l + 8 >> 2] >> 2] = 0;
					c[l + 4 >> 2] = 0;
					Ij(l, 0);
					c[l >> 2] = c[w >> 2];
					c[l + 4 >> 2] = c[w + 4 >> 2];
					c[l + 8 >> 2] = c[w + 8 >> 2];
					c[w >> 2] = 0;
					c[w + 4 >> 2] = 0;
					c[w + 8 >> 2] = 0;
					Fj(w)
				} else {
					tb[c[e + 40 >> 2] & 127](x, b);
					d = c[x >> 2] | 0;
					a[f >> 0] = d;
					a[f + 1 >> 0] = d >> 8;
					a[f + 2 >> 0] = d >> 16;
					a[f + 3 >> 0] = d >> 24;
					tb[c[(c[b >> 2] | 0) + 28 >> 2] & 127](y, b);
					if (!(a[l >> 0] & 1))
						a[l >> 0] = 0;
					else
						c[c[l + 8 >> 2] >> 2] = 0;
					c[l + 4 >> 2] = 0;
					Ij(l, 0);
					c[l >> 2] = c[y >> 2];
					c[l + 4 >> 2] = c[y + 4 >> 2];
					c[l + 8 >> 2] = c[y + 8 >> 2];
					c[y >> 2] = 0;
					c[y + 4 >> 2] = 0;
					c[y + 8 >> 2] = 0;
					Fj(y)
				}
				c[g >> 2] = wb[c[(c[b >> 2] | 0) + 12 >> 2] & 127](b) | 0;
				c[h >> 2] = wb[c[(c[b >> 2] | 0) + 16 >> 2] & 127](b) | 0;
				tb[c[(c[b >> 2] | 0) + 20 >> 2] & 127](p, b);
				if (!(a[j >> 0] & 1)) {
					a[j + 1 >> 0] = 0;
					a[j >> 0] = 0
				} else {
					a[c[j + 8 >> 2] >> 0] = 0;
					c[j + 4 >> 2] = 0
				}
				wj(j, 0);
				c[j >> 2] = c[p >> 2];
				c[j + 4 >> 2] = c[p + 4 >> 2];
				c[j + 8 >> 2] = c[p + 8 >> 2];
				c[p >> 2] = 0;
				c[p + 4 >> 2] = 0;
				c[p + 8 >> 2] = 0;
				qj(p);
				tb[c[(c[b >> 2] | 0) + 24 >> 2] & 127](q, b);
				if (!(a[k >> 0] & 1))
					a[k >> 0] = 0;
				else
					c[c[k + 8 >> 2] >> 2] = 0;
				c[k + 4 >> 2] = 0;
				Ij(k, 0);
				c[k >> 2] = c[q >> 2];
				c[k + 4 >> 2] = c[q + 4 >> 2];
				c[k + 8 >> 2] = c[q + 8 >> 2];
				c[q >> 2] = 0;
				c[q + 4 >> 2] = 0;
				c[q + 8 >> 2] = 0;
				Fj(q);
				b = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0
			}
			c[m >> 2] = b;
			i = z;
			return
		}
		function oo(b, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			i = i | 0;
			j = j | 0;
			k = k | 0;
			l = l | 0;
			m = m | 0;
			n = n | 0;
			o = o | 0;
			p = p | 0;
			q = q | 0;
			var r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0,
			E = 0,
			F = 0,
			G = 0,
			H = 0,
			I = 0,
			J = 0,
			K = 0;
			c[e >> 2] = b;
			J = p + 4 | 0;
			K = p + 8 | 0;
			C = o + 4 | 0;
			D = (f & 512 | 0) == 0;
			E = o + 8 | 0;
			F = (q | 0) > 0;
			G = n + 4 | 0;
			H = n + 8 | 0;
			I = n + 1 | 0;
			A = (q | 0) > 0;
			z = 0;
			do {
				switch (a[k + z >> 0] | 0) {
				case 0: {
						c[d >> 2] = c[e >> 2];
						break
					}
				case 1: {
						c[d >> 2] = c[e >> 2];
						x = Cb[c[(c[i >> 2] | 0) + 44 >> 2] & 15](i, 32) | 0;
						y = c[e >> 2] | 0;
						c[e >> 2] = y + 4;
						c[y >> 2] = x;
						break
					}
				case 3: {
						y = a[p >> 0] | 0;
						r = (y & 1) == 0;
						if ((r ? (y & 255) >>> 1 : c[J >> 2] | 0) | 0) {
							x = c[(r ? J : c[K >> 2] | 0) >> 2] | 0;
							y = c[e >> 2] | 0;
							c[e >> 2] = y + 4;
							c[y >> 2] = x
						}
						break
					}
				case 2: {
						v = a[o >> 0] | 0;
						r = (v & 1) == 0;
						v = r ? (v & 255) >>> 1 : c[C >> 2] | 0;
						if (!(D | (v | 0) == 0)) {
							r = r ? C : c[E >> 2] | 0;
							t = r + (v << 2) | 0;
							u = c[e >> 2] | 0;
							if (v) {
								s = u;
								while (1) {
									c[s >> 2] = c[r >> 2];
									r = r + 4 | 0;
									if ((r | 0) == (t | 0))
										break;
									else
										s = s + 4 | 0
								}
							}
							c[e >> 2] = u + (v << 2)
						}
						break
					}
				case 4: {
						r = c[e >> 2] | 0;
						g = j ? g + 4 | 0 : g;
						a : do
							if (g >>> 0 < h >>> 0) {
								s = g;
								do {
									if (!(pb[c[(c[i >> 2] | 0) + 12 >> 2] & 31](i, 2048, c[s >> 2] | 0) | 0))
										break a;
									s = s + 4 | 0
								} while (s >>> 0 < h >>> 0)
							} else
								s = g;
						while (0);
						if (F) {
							if (s >>> 0 > g >>> 0 & A) {
								v = c[e >> 2] | 0;
								u = q;
								while (1) {
									s = s + -4 | 0;
									t = v + 4 | 0;
									c[v >> 2] = c[s >> 2];
									w = u + -1 | 0;
									u = (u | 0) > 1;
									if (s >>> 0 > g >>> 0 & u) {
										v = t;
										u = w
									} else {
										v = w;
										break
									}
								}
								c[e >> 2] = t;
								t = v
							} else {
								u = A;
								t = q
							}
							if (u)
								w = Cb[c[(c[i >> 2] | 0) + 44 >> 2] & 15](i, 48) | 0;
							else
								w = 0;
							x = c[e >> 2] | 0;
							u = t + ((t | 0) < 0 ? ~t : -1) | 0;
							if ((t | 0) > 0) {
								v = x;
								while (1) {
									c[v >> 2] = w;
									if ((t | 0) > 1) {
										v = v + 4 | 0;
										t = t + -1 | 0
									} else
										break
								}
							}
							c[e >> 2] = x + (u + 2 << 2);
							c[x + (u + 1 << 2) >> 2] = l
						}
						if ((s | 0) == (g | 0)) {
							x = Cb[c[(c[i >> 2] | 0) + 44 >> 2] & 15](i, 48) | 0;
							y = c[e >> 2] | 0;
							s = y + 4 | 0;
							c[e >> 2] = s;
							c[y >> 2] = x
						} else {
							x = a[n >> 0] | 0;
							t = (x & 1) == 0;
							y = c[G >> 2] | 0;
							if (!((t ? (x & 255) >>> 1 : y) | 0))
								t = -1;
							else
								t = a[(t ? I : c[H >> 2] | 0) >> 0] | 0;
							if ((s | 0) != (g | 0)) {
								w = 0;
								x = 0;
								while (1) {
									u = c[e >> 2] | 0;
									if ((x | 0) == (t | 0)) {
										v = u + 4 | 0;
										c[e >> 2] = v;
										c[u >> 2] = m;
										w = w + 1 | 0;
										u = a[n >> 0] | 0;
										t = (u & 1) == 0;
										if (w >>> 0 < (t ? (u & 255) >>> 1 : y) >>> 0) {
											t = a[(t ? I : c[H >> 2] | 0) + w >> 0] | 0;
											u = v;
											t = t << 24 >> 24 == 127 ? -1 : t << 24 >> 24;
											v = 0
										} else {
											u = v;
											t = x;
											v = 0
										}
									} else
										v = x;
									s = s + -4 | 0;
									x = c[s >> 2] | 0;
									c[e >> 2] = u + 4;
									c[u >> 2] = x;
									if ((s | 0) == (g | 0))
										break;
									else
										x = v + 1 | 0
								}
							}
							s = c[e >> 2] | 0
						}
						if ((r | 0) != (s | 0) ? (B = s + -4 | 0, r >>> 0 < B >>> 0) : 0) {
							s = B;
							do {
								y = c[r >> 2] | 0;
								c[r >> 2] = c[s >> 2];
								c[s >> 2] = y;
								r = r + 4 | 0;
								s = s + -4 | 0
							} while (r >>> 0 < s >>> 0)
						}
						break
					}
				default: {}

				}
				z = z + 1 | 0
			} while ((z | 0) != 4);
			r = a[p >> 0] | 0;
			g = (r & 1) == 0;
			r = g ? (r & 255) >>> 1 : c[J >> 2] | 0;
			if (r >>> 0 > 1) {
				s = g ? J : c[K >> 2] | 0;
				g = s + 4 | 0;
				s = s + (r << 2) | 0;
				t = c[e >> 2] | 0;
				u = s - g | 0;
				if ((r | 0) != 1) {
					r = t;
					while (1) {
						c[r >> 2] = c[g >> 2];
						g = g + 4 | 0;
						if ((g | 0) == (s | 0))
							break;
						else
							r = r + 4 | 0
					}
				}
				c[e >> 2] = t + (u >>> 2 << 2)
			}
			switch (f & 176 | 0) {
			case 32: {
					c[d >> 2] = c[e >> 2];
					break
				}
			case 16:
				break;
			default:
				c[d >> 2] = b
			}
			return
		}
		function po(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0,
			E = 0,
			F = 0;
			E = i;
			i = i + 480 | 0;
			p = E + 468 | 0;
			z = E + 464 | 0;
			x = E + 472 | 0;
			w = E + 56 | 0;
			u = E + 52 | 0;
			D = E + 40 | 0;
			C = E + 28 | 0;
			B = E + 16 | 0;
			k = E + 12 | 0;
			o = E + 64 | 0;
			t = E + 8 | 0;
			v = E + 4 | 0;
			q = E;
			b = Tj(f) | 0;
			c[z >> 2] = b;
			r = Mo(z, 9344) | 0;
			n = a[h >> 0] | 0;
			j = (n & 1) == 0;
			s = h + 4 | 0;
			if (!((j ? (n & 255) >>> 1 : c[s >> 2] | 0) | 0))
				n = 0;
			else {
				n = c[(j ? s : c[h + 8 >> 2] | 0) >> 2] | 0;
				n = (n | 0) == (Cb[c[(c[r >> 2] | 0) + 44 >> 2] & 15](r, 45) | 0)
			}
			c[D >> 2] = 0;
			c[D + 4 >> 2] = 0;
			c[D + 8 >> 2] = 0;
			c[C >> 2] = 0;
			c[C + 4 >> 2] = 0;
			c[C + 8 >> 2] = 0;
			c[B >> 2] = 0;
			c[B + 4 >> 2] = 0;
			c[B + 8 >> 2] = 0;
			no(e, n, z, x, w, u, D, C, B, k);
			l = a[h >> 0] | 0;
			m = c[s >> 2] | 0;
			j = (l & 1) == 0 ? (l & 255) >>> 1 : m;
			e = c[k >> 2] | 0;
			if ((j | 0) > (e | 0)) {
				F = a[B >> 0] | 0;
				k = a[C >> 0] | 0;
				j = (j - e << 1 | 1) + e + ((F & 1) == 0 ? (F & 255) >>> 1 : c[B + 4 >> 2] | 0) + ((k & 1) == 0 ? (k & 255) >>> 1 : c[C + 4 >> 2] | 0) | 0
			} else {
				F = a[B >> 0] | 0;
				j = a[C >> 0] | 0;
				j = e + 2 + ((F & 1) == 0 ? (F & 255) >>> 1 : c[B + 4 >> 2] | 0) + ((j & 1) == 0 ? (j & 255) >>> 1 : c[C + 4 >> 2] | 0) | 0
			}
			if (j >>> 0 > 100) {
				j = fj(j << 2) | 0;
				if (!j)
					Nh();
				else {
					A = j;
					y = j
				}
			} else {
				A = 0;
				y = o
			}
			F = (l & 1) == 0;
			j = F ? s : c[h + 8 >> 2] | 0;
			oo(y, t, v, c[f + 4 >> 2] | 0, j, j + ((F ? (l & 255) >>> 1 : m) << 2) | 0, r, n, x, c[w >> 2] | 0, c[u >> 2] | 0, D, C, B, e);
			c[q >> 2] = c[d >> 2];
			F = c[t >> 2] | 0;
			j = c[v >> 2] | 0;
			c[p >> 2] = c[q >> 2];
			j = Vq(p, y, F, j, f, g) | 0;
			if (A) {
				gj(A);
				b = c[z >> 2] | 0
			}
			Fj(B);
			Fj(C);
			qj(D);
			cs(b) | 0;
			i = E;
			return j | 0
		}
		function qo(a) {
			a = a | 0;
			return
		}
		function ro(a) {
			a = a | 0;
			ih(a);
			return
		}
		function so(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			b = bi((a[d >> 0] & 1) == 0 ? d + 1 | 0 : c[d + 8 >> 2] | 0, 1) | 0;
			return b >>> ((b | 0) != (-1 | 0) & 1) | 0
		}
		function to(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var j = 0,
			k = 0,
			l = 0,
			m = 0;
			k = i;
			i = i + 16 | 0;
			j = k;
			c[j >> 2] = 0;
			c[j + 4 >> 2] = 0;
			c[j + 8 >> 2] = 0;
			l = a[h >> 0] | 0;
			m = (l & 1) == 0;
			d = m ? h + 1 | 0 : c[h + 8 >> 2] | 0;
			l = m ? (l & 255) >>> 1 : c[h + 4 >> 2] | 0;
			h = d + l | 0;
			if ((l | 0) > 0)
				do {
					yj(j, a[d >> 0] | 0);
					d = d + 1 | 0
				} while (d >>> 0 < h >>> 0);
			d = ai((e | 0) == -1 ? -1 : e << 1, f, g, (a[j >> 0] & 1) == 0 ? j + 1 | 0 : c[j + 8 >> 2] | 0) | 0;
			c[b >> 2] = 0;
			c[b + 4 >> 2] = 0;
			c[b + 8 >> 2] = 0;
			m = Ti(d) | 0;
			h = d + m | 0;
			if ((m | 0) > 0)
				do {
					yj(b, a[d >> 0] | 0);
					d = d + 1 | 0
				} while (d >>> 0 < h >>> 0);
			qj(j);
			i = k;
			return
		}
		function uo(a, b) {
			a = a | 0;
			b = b | 0;
			return
		}
		function vo(a) {
			a = a | 0;
			return
		}
		function wo(a) {
			a = a | 0;
			ih(a);
			return
		}
		function xo(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			b = bi((a[d >> 0] & 1) == 0 ? d + 1 | 0 : c[d + 8 >> 2] | 0, 1) | 0;
			return b >>> ((b | 0) != (-1 | 0) & 1) | 0
		}
		function yo(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0;
			s = i;
			i = i + 176 | 0;
			r = s + 168 | 0;
			q = s + 40 | 0;
			n = s + 32 | 0;
			p = s + 28 | 0;
			o = s + 16 | 0;
			l = s + 8 | 0;
			m = s;
			c[o >> 2] = 0;
			c[o + 4 >> 2] = 0;
			c[o + 8 >> 2] = 0;
			c[l + 4 >> 2] = 0;
			c[l >> 2] = 9828;
			k = a[h >> 0] | 0;
			t = (k & 1) == 0;
			j = h + 4 | 0;
			d = t ? j : c[h + 8 >> 2] | 0;
			h = t ? (k & 255) >>> 1 : c[j >> 2] | 0;
			j = d + (h << 2) | 0;
			k = q + 32 | 0;
			if ((h | 0) > 0)
				do {
					c[p >> 2] = d;
					h = zb[c[(c[l >> 2] | 0) + 12 >> 2] & 15](l, r, d, j, p, q, k, n) | 0;
					if (q >>> 0 < (c[n >> 2] | 0) >>> 0) {
						d = q;
						do {
							yj(o, a[d >> 0] | 0);
							d = d + 1 | 0
						} while (d >>> 0 < (c[n >> 2] | 0) >>> 0)
					}
					d = c[p >> 2] | 0
				} while ((h | 0) != 2 & d >>> 0 < j >>> 0);
			d = ai((e | 0) == -1 ? -1 : e << 1, f, g, (a[o >> 0] & 1) == 0 ? o + 1 | 0 : c[o + 8 >> 2] | 0) | 0;
			c[b >> 2] = 0;
			c[b + 4 >> 2] = 0;
			c[b + 8 >> 2] = 0;
			c[m + 4 >> 2] = 0;
			c[m >> 2] = 9876;
			t = Ti(d) | 0;
			j = d + t | 0;
			k = j;
			l = q + 128 | 0;
			if ((t | 0) > 0)
				do {
					c[p >> 2] = d;
					h = zb[c[(c[m >> 2] | 0) + 16 >> 2] & 15](m, r, d, (k - d | 0) > 32 ? d + 32 | 0 : j, p, q, l, n) | 0;
					if (q >>> 0 < (c[n >> 2] | 0) >>> 0) {
						d = q;
						do {
							Jj(b, c[d >> 2] | 0);
							d = d + 4 | 0
						} while (d >>> 0 < (c[n >> 2] | 0) >>> 0)
					}
					d = c[p >> 2] | 0
				} while ((h | 0) != 2 & d >>> 0 < j >>> 0);
			qj(o);
			i = s;
			return
		}
		function zo(a, b) {
			a = a | 0;
			b = b | 0;
			return
		}
		function Ao(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0;
			c[a + 4 >> 2] = b + -1;
			c[a >> 2] = 9328;
			d = a + 8 | 0;
			br(d, 28);
			oj(a + 144 | 0, 23497, 1);
			d = c[d >> 2] | 0;
			e = a + 12 | 0;
			b = c[e >> 2] | 0;
			if ((b | 0) != (d | 0)) {
				do
					b = b + -4 | 0;
				while ((b | 0) != (d | 0));
				c[e >> 2] = b
			}
			c[443] = 0;
			c[442] = 8256;
			cr(a, 1768);
			c[445] = 0;
			c[444] = 8296;
			dr(a, 1776);
			bp(1784, 0, 0, 1);
			er(a, 1784);
			c[451] = 0;
			c[450] = 9616;
			fr(a, 1800);
			c[453] = 0;
			c[452] = 9684;
			gr(a, 1808);
			c[455] = 0;
			c[454] = 9436;
			c[456] = $k() | 0;
			hr(a, 1816);
			c[459] = 0;
			c[458] = 9732;
			ir(a, 1832);
			c[461] = 0;
			c[460] = 9780;
			jr(a, 1840);
			Up(1848, 1);
			kr(a, 1848);
			Vp(1872, 1);
			lr(a, 1872);
			c[477] = 0;
			c[476] = 8336;
			mr(a, 1904);
			c[479] = 0;
			c[478] = 8408;
			nr(a, 1912);
			c[481] = 0;
			c[480] = 8480;
			or(a, 1920);
			c[483] = 0;
			c[482] = 8540;
			pr(a, 1928);
			c[485] = 0;
			c[484] = 8848;
			qr(a, 1936);
			c[487] = 0;
			c[486] = 8912;
			rr(a, 1944);
			c[489] = 0;
			c[488] = 8976;
			sr(a, 1952);
			c[491] = 0;
			c[490] = 9040;
			tr(a, 1960);
			c[493] = 0;
			c[492] = 9104;
			ur(a, 1968);
			c[495] = 0;
			c[494] = 9140;
			vr(a, 1976);
			c[497] = 0;
			c[496] = 9176;
			wr(a, 1984);
			c[499] = 0;
			c[498] = 9212;
			xr(a, 1992);
			c[501] = 0;
			c[500] = 8600;
			c[502] = 8648;
			yr(a, 2e3);
			c[505] = 0;
			c[504] = 8692;
			c[506] = 8740;
			zr(a, 2016);
			c[509] = 0;
			c[508] = 9596;
			c[510] = $k() | 0;
			c[508] = 8784;
			Ar(a, 2032);
			c[513] = 0;
			c[512] = 9596;
			c[514] = $k() | 0;
			c[512] = 8816;
			Br(a, 2048);
			c[517] = 0;
			c[516] = 9248;
			Cr(a, 2064);
			c[519] = 0;
			c[518] = 9288;
			Dr(a, 2072);
			return
		}
		function Bo() {
			if ((a[2080] | 0) == 0 ? (ya(2080) | 0) != 0 : 0) {
				Fo() | 0;
				c[2529] = 10112;
				Ga(2080)
			}
			return c[2529] | 0
		}
		function Co(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0;
			bs(b);
			f = a + 8 | 0;
			e = c[f >> 2] | 0;
			if ((c[a + 12 >> 2] | 0) - e >> 2 >>> 0 <= d >>> 0) {
				Er(f, d + 1 | 0);
				e = c[f >> 2] | 0
			}
			a = c[e + (d << 2) >> 2] | 0;
			if (a) {
				cs(a) | 0;
				e = c[f >> 2] | 0
			}
			c[e + (d << 2) >> 2] = b;
			return
		}
		function Do(a) {
			a = a | 0;
			var b = 0,
			d = 0,
			e = 0,
			f = 0;
			c[a >> 2] = 9328;
			e = a + 8 | 0;
			f = a + 12 | 0;
			b = c[e >> 2] | 0;
			if ((c[f >> 2] | 0) != (b | 0)) {
				d = 0;
				do {
					b = c[b + (d << 2) >> 2] | 0;
					if (b)
						cs(b) | 0;
					d = d + 1 | 0;
					b = c[e >> 2] | 0
				} while (d >>> 0 < (c[f >> 2] | 0) - b >> 2 >>> 0)
			}
			qj(a + 144 | 0);
			Fr(e);
			return
		}
		function Eo(a) {
			a = a | 0;
			Do(a);
			ih(a);
			return
		}
		function Fo() {
			Ao(2088, 1);
			c[2528] = 2088;
			return 10112
		}
		function Go() {
			var a = 0;
			a = c[(Bo() | 0) >> 2] | 0;
			c[2530] = a;
			bs(a);
			return 10120
		}
		function Ho() {
			if ((a[2248] | 0) == 0 ? (ya(2248) | 0) != 0 : 0) {
				Go() | 0;
				c[2531] = 10120;
				Ga(2248)
			}
			return c[2531] | 0
		}
		function Io(a) {
			a = a | 0;
			var b = 0;
			b = c[(Ho() | 0) >> 2] | 0;
			c[a >> 2] = b;
			bs(b);
			return
		}
		function Jo(a, b) {
			a = a | 0;
			b = b | 0;
			b = c[b >> 2] | 0;
			c[a >> 2] = b;
			bs(b);
			return
		}
		function Ko(a) {
			a = a | 0;
			cs(c[a >> 2] | 0) | 0;
			return
		}
		function Lo(a) {
			a = a | 0;
			var b = 0,
			d = 0;
			d = i;
			i = i + 16 | 0;
			b = d;
			if ((c[a >> 2] | 0) != -1) {
				c[b >> 2] = a;
				c[b + 4 >> 2] = 145;
				c[b + 8 >> 2] = 0;
				ds(a, b, 146)
			}
			i = d;
			return (c[a + 4 >> 2] | 0) + -1 | 0
		}
		function Mo(a, b) {
			a = a | 0;
			b = b | 0;
			a = c[a >> 2] | 0;
			b = Lo(b) | 0;
			return c[(c[a + 8 >> 2] | 0) + (b << 2) >> 2] | 0
		}
		function No(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Oo(a) {
			a = a | 0;
			if (a)
				sb[c[(c[a >> 2] | 0) + 4 >> 2] & 255](a);
			return
		}
		function Po(a) {
			a = a | 0;
			var b = 0;
			b = c[2335] | 0;
			c[2335] = b + 1;
			c[a + 4 >> 2] = b + 1;
			return
		}
		function Qo(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Ro(a, d, e) {
			a = a | 0;
			d = d | 0;
			e = e | 0;
			if (e >>> 0 < 128)
				e = (b[(c[(Qh() | 0) >> 2] | 0) + (e << 1) >> 1] & d) << 16 >> 16 != 0;
			else
				e = 0;
			return e | 0
		}
		function So(a, d, f, g) {
			a = a | 0;
			d = d | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			i = 0;
			i = (f - d | 0) >>> 2;
			if ((d | 0) != (f | 0)) {
				h = d;
				while (1) {
					a = c[h >> 2] | 0;
					if (a >>> 0 < 128)
						a = e[(c[(Qh() | 0) >> 2] | 0) + (a << 1) >> 1] | 0;
					else
						a = 0;
					b[g >> 1] = a;
					h = h + 4 | 0;
					if ((h | 0) == (f | 0))
						break;
					else
						g = g + 2 | 0
				}
			}
			return d + (i << 2) | 0
		}
		function To(a, d, e, f) {
			a = a | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			a : do
				if ((e | 0) == (f | 0))
					e = f;
				else
					while (1) {
						a = c[e >> 2] | 0;
						if (a >>> 0 < 128 ? (b[(c[(Qh() | 0) >> 2] | 0) + (a << 1) >> 1] & d) << 16 >> 16 != 0 : 0)
							break a;
						e = e + 4 | 0;
						if ((e | 0) == (f | 0)) {
							e = f;
							break
						}
					}
			while (0);
			return e | 0
		}
		function Uo(a, d, e, f) {
			a = a | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			a : do
				if ((e | 0) == (f | 0))
					e = f;
				else
					while (1) {
						a = c[e >> 2] | 0;
						if (a >>> 0 >= 128)
							break a;
						if (!((b[(c[(Qh() | 0) >> 2] | 0) + (a << 1) >> 1] & d) << 16 >> 16))
							break a;
						e = e + 4 | 0;
						if ((e | 0) == (f | 0)) {
							e = f;
							break
						}
					}
			while (0);
			return e | 0
		}
		function Vo(a, b) {
			a = a | 0;
			b = b | 0;
			if (b >>> 0 < 128)
				b = c[(c[(Sh() | 0) >> 2] | 0) + (b << 2) >> 2] | 0;
			return b | 0
		}
		function Wo(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0;
			f = (d - b | 0) >>> 2;
			if ((b | 0) != (d | 0)) {
				e = b;
				do {
					a = c[e >> 2] | 0;
					if (a >>> 0 < 128)
						a = c[(c[(Sh() | 0) >> 2] | 0) + (a << 2) >> 2] | 0;
					c[e >> 2] = a;
					e = e + 4 | 0
				} while ((e | 0) != (d | 0))
			}
			return b + (f << 2) | 0
		}
		function Xo(a, b) {
			a = a | 0;
			b = b | 0;
			if (b >>> 0 < 128)
				b = c[(c[(Rh() | 0) >> 2] | 0) + (b << 2) >> 2] | 0;
			return b | 0
		}
		function Yo(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0;
			f = (d - b | 0) >>> 2;
			if ((b | 0) != (d | 0)) {
				e = b;
				do {
					a = c[e >> 2] | 0;
					if (a >>> 0 < 128)
						a = c[(c[(Rh() | 0) >> 2] | 0) + (a << 2) >> 2] | 0;
					c[e >> 2] = a;
					e = e + 4 | 0
				} while ((e | 0) != (d | 0))
			}
			return b + (f << 2) | 0
		}
		function Zo(a, b) {
			a = a | 0;
			b = b | 0;
			return b << 24 >> 24 | 0
		}
		function _o(b, d, e, f) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			if ((d | 0) != (e | 0))
				while (1) {
					c[f >> 2] = a[d >> 0];
					d = d + 1 | 0;
					if ((d | 0) == (e | 0))
						break;
					else
						f = f + 4 | 0
				}
			return e | 0
		}
		function $o(a, b, c) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			return (b >>> 0 < 128 ? b & 255 : c) | 0
		}
		function ap(b, d, e, f, g) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			i = 0;
			i = (e - d | 0) >>> 2;
			if ((d | 0) != (e | 0)) {
				h = d;
				b = g;
				while (1) {
					g = c[h >> 2] | 0;
					a[b >> 0] = g >>> 0 < 128 ? g & 255 : f;
					h = h + 4 | 0;
					if ((h | 0) == (e | 0))
						break;
					else
						b = b + 1 | 0
				}
			}
			return d + (i << 2) | 0
		}
		function bp(b, d, e, f) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			c[b + 4 >> 2] = f + -1;
			c[b >> 2] = 9368;
			f = b + 8 | 0;
			c[f >> 2] = d;
			a[b + 12 >> 0] = e & 1;
			if (!d)
				c[f >> 2] = c[(Qh() | 0) >> 2];
			return
		}
		function cp(b) {
			b = b | 0;
			var d = 0;
			c[b >> 2] = 9368;
			d = c[b + 8 >> 2] | 0;
			if ((d | 0) != 0 ? (a[b + 12 >> 0] | 0) != 0 : 0)
				jh(d);
			return
		}
		function dp(a) {
			a = a | 0;
			cp(a);
			ih(a);
			return
		}
		function ep(a, b) {
			a = a | 0;
			b = b | 0;
			if (b << 24 >> 24 > -1)
				b = c[(c[(Sh() | 0) >> 2] | 0) + ((b & 255) << 2) >> 2] & 255;
			return b | 0
		}
		function fp(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			if ((d | 0) != (e | 0)) {
				b = d;
				do {
					d = a[b >> 0] | 0;
					if (d << 24 >> 24 > -1)
						d = c[(c[(Sh() | 0) >> 2] | 0) + (d << 24 >> 24 << 2) >> 2] & 255;
					a[b >> 0] = d;
					b = b + 1 | 0
				} while ((b | 0) != (e | 0))
			}
			return e | 0
		}
		function gp(a, b) {
			a = a | 0;
			b = b | 0;
			if (b << 24 >> 24 > -1)
				b = c[(c[(Rh() | 0) >> 2] | 0) + (b << 24 >> 24 << 2) >> 2] & 255;
			return b | 0
		}
		function hp(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			if ((d | 0) != (e | 0)) {
				b = d;
				do {
					d = a[b >> 0] | 0;
					if (d << 24 >> 24 > -1)
						d = c[(c[(Rh() | 0) >> 2] | 0) + (d << 24 >> 24 << 2) >> 2] & 255;
					a[b >> 0] = d;
					b = b + 1 | 0
				} while ((b | 0) != (e | 0))
			}
			return e | 0
		}
		function ip(a, b) {
			a = a | 0;
			b = b | 0;
			return b | 0
		}
		function jp(b, c, d, e) {
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			if ((c | 0) != (d | 0))
				while (1) {
					a[e >> 0] = a[c >> 0] | 0;
					c = c + 1 | 0;
					if ((c | 0) == (d | 0))
						break;
					else
						e = e + 1 | 0
				}
			return d | 0
		}
		function kp(a, b, c) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			return (b << 24 >> 24 > -1 ? b : c) | 0
		}
		function lp(b, c, d, e, f) {
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			if ((c | 0) != (d | 0))
				while (1) {
					b = a[c >> 0] | 0;
					a[f >> 0] = b << 24 >> 24 > -1 ? b : e;
					c = c + 1 | 0;
					if ((c | 0) == (d | 0))
						break;
					else
						f = f + 1 | 0
				}
			return d | 0
		}
		function mp(a) {
			a = a | 0;
			ih(a);
			return
		}
		function np(a, b, d, e, f, g, h, i) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			i = i | 0;
			c[f >> 2] = d;
			c[i >> 2] = g;
			return 3
		}
		function op(a, b, d, e, f, g, h, i) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			i = i | 0;
			c[f >> 2] = d;
			c[i >> 2] = g;
			return 3
		}
		function pp(a, b, d, e, f) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			c[f >> 2] = d;
			return 3
		}
		function qp(a) {
			a = a | 0;
			return 1
		}
		function rp(a) {
			a = a | 0;
			return 1
		}
		function sp(a, b, c, d, e) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			a = d - c | 0;
			return (a >>> 0 < e >>> 0 ? a : e) | 0
		}
		function tp(a) {
			a = a | 0;
			return 1
		}
		function up(a) {
			a = a | 0;
			xq(a);
			ih(a);
			return
		}
		function vp(b, d, e, f, g, h, j, k) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			k = k | 0;
			var l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0;
			s = i;
			i = i + 16 | 0;
			q = s;
			o = s + 8 | 0;
			a : do
				if ((e | 0) == (f | 0))
					l = f;
				else {
					l = e;
					while (1) {
						if (!(c[l >> 2] | 0))
							break a;
						l = l + 4 | 0;
						if ((l | 0) == (f | 0)) {
							l = f;
							break
						}
					}
				}
			while (0);
			c[k >> 2] = h;
			c[g >> 2] = e;
			n = j;
			p = b + 8 | 0;
			b : do
				if ((h | 0) == (j | 0) | (e | 0) == (f | 0))
					r = 29;
				else {
					c : while (1) {
						t = d;
						m = c[t + 4 >> 2] | 0;
						b = q;
						c[b >> 2] = c[t >> 2];
						c[b + 4 >> 2] = m;
						b = gi(c[p >> 2] | 0) | 0;
						m = wi(h, g, l - e >> 2, n - h | 0, d) | 0;
						if (b)
							gi(b) | 0;
						switch (m | 0) {
						case 0: {
								e = 1;
								break b
							}
						case -1:
							break c;
						default: {}

						}
						h = (c[k >> 2] | 0) + m | 0;
						c[k >> 2] = h;
						if ((h | 0) == (j | 0)) {
							r = 15;
							break
						}
						if ((l | 0) == (f | 0)) {
							e = c[g >> 2] | 0;
							l = f
						} else {
							e = gi(c[p >> 2] | 0) | 0;
							h = vi(o, 0, d) | 0;
							if (e)
								gi(e) | 0;
							if ((h | 0) == -1) {
								e = 2;
								break b
							}
							if (h >>> 0 > (n - (c[k >> 2] | 0) | 0) >>> 0) {
								e = 1;
								break b
							}
							if (h) {
								e = o;
								while (1) {
									m = a[e >> 0] | 0;
									t = c[k >> 2] | 0;
									c[k >> 2] = t + 1;
									a[t >> 0] = m;
									h = h + -1 | 0;
									if (!h)
										break;
									else
										e = e + 1 | 0
								}
							}
							e = (c[g >> 2] | 0) + 4 | 0;
							c[g >> 2] = e;
							d : do
								if ((e | 0) == (f | 0))
									l = f;
								else {
									l = e;
									while (1) {
										if (!(c[l >> 2] | 0))
											break d;
										l = l + 4 | 0;
										if ((l | 0) == (f | 0)) {
											l = f;
											break
										}
									}
								}
							while (0);
							h = c[k >> 2] | 0
						}
						if ((h | 0) == (j | 0) | (e | 0) == (f | 0)) {
							r = 29;
							break b
						}
					}
					if ((r | 0) == 15) {
						e = c[g >> 2] | 0;
						r = 29;
						break
					}
					c[k >> 2] = h;
					e : do
						if ((e | 0) != (c[g >> 2] | 0))
							do {
								t = c[e >> 2] | 0;
								l = gi(c[p >> 2] | 0) | 0;
								h = vi(h, t, q) | 0;
								if (l)
									gi(l) | 0;
								if ((h | 0) == -1)
									break e;
								h = (c[k >> 2] | 0) + h | 0;
								c[k >> 2] = h;
								e = e + 4 | 0
							} while ((e | 0) != (c[g >> 2] | 0));
					while (0);
					c[g >> 2] = e;
					e = 2
				}
			while (0);
			if ((r | 0) == 29)
				e = (e | 0) != (f | 0) & 1;
			i = s;
			return e | 0
		}
		function wp(b, d, e, f, g, h, j, k) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			k = k | 0;
			var l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0;
			s = i;
			i = i + 16 | 0;
			q = s;
			a : do
				if ((e | 0) == (f | 0))
					l = f;
				else {
					l = e;
					while (1) {
						if (!(a[l >> 0] | 0))
							break a;
						l = l + 1 | 0;
						if ((l | 0) == (f | 0)) {
							l = f;
							break
						}
					}
				}
			while (0);
			c[k >> 2] = h;
			c[g >> 2] = e;
			o = j;
			p = b + 8 | 0;
			b : do
				if ((h | 0) == (j | 0) | (e | 0) == (f | 0))
					r = 29;
				else {
					c : while (1) {
						n = d;
						m = c[n + 4 >> 2] | 0;
						b = q;
						c[b >> 2] = c[n >> 2];
						c[b + 4 >> 2] = m;
						b = l;
						m = gi(c[p >> 2] | 0) | 0;
						n = si(h, g, b - e | 0, o - h >> 2, d) | 0;
						if (m)
							gi(m) | 0;
						switch (n | 0) {
						case 0: {
								e = 2;
								break b
							}
						case -1:
							break c;
						default: {}

						}
						h = (c[k >> 2] | 0) + (n << 2) | 0;
						c[k >> 2] = h;
						if ((h | 0) == (j | 0)) {
							r = 19;
							break
						}
						e = c[g >> 2] | 0;
						if ((l | 0) == (f | 0))
							l = f;
						else {
							l = gi(c[p >> 2] | 0) | 0;
							e = qi(h, e, 1, d) | 0;
							if (l)
								gi(l) | 0;
							if (e) {
								e = 2;
								break b
							}
							c[k >> 2] = (c[k >> 2] | 0) + 4;
							e = (c[g >> 2] | 0) + 1 | 0;
							c[g >> 2] = e;
							d : do
								if ((e | 0) == (f | 0))
									l = f;
								else {
									l = e;
									while (1) {
										if (!(a[l >> 0] | 0))
											break d;
										l = l + 1 | 0;
										if ((l | 0) == (f | 0)) {
											l = f;
											break
										}
									}
								}
							while (0);
							h = c[k >> 2] | 0
						}
						if ((h | 0) == (j | 0) | (e | 0) == (f | 0)) {
							r = 29;
							break b
						}
					}
					if ((r | 0) == 19) {
						e = c[g >> 2] | 0;
						r = 29;
						break
					}
					c[k >> 2] = h;
					e : do
						if ((e | 0) != (c[g >> 2] | 0)) {
							f : while (1) {
								l = gi(c[p >> 2] | 0) | 0;
								h = qi(h, e, b - e | 0, q) | 0;
								if (l)
									gi(l) | 0;
								switch (h | 0) {
								case -1: {
										r = 13;
										break f
									}
								case -2: {
										r = 14;
										break f
									}
								case 0: {
										e = e + 1 | 0;
										break
									}
								default:
									e = e + h | 0
								}
								h = (c[k >> 2] | 0) + 4 | 0;
								c[k >> 2] = h;
								if ((e | 0) == (c[g >> 2] | 0))
									break e
							}
							if ((r | 0) == 13) {
								c[g >> 2] = e;
								e = 2;
								break b
							} else if ((r | 0) == 14) {
								c[g >> 2] = e;
								e = 1;
								break b
							}
						}
					while (0);
					c[g >> 2] = e;
					e = (e | 0) != (f | 0) & 1
				}
			while (0);
			if ((r | 0) == 29)
				e = (e | 0) != (f | 0) & 1;
			i = s;
			return e | 0
		}
		function xp(b, d, e, f, g) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0;
			j = i;
			i = i + 16 | 0;
			h = j;
			c[g >> 2] = e;
			e = gi(c[b + 8 >> 2] | 0) | 0;
			b = vi(h, 0, d) | 0;
			if (e)
				gi(e) | 0;
			switch (b | 0) {
			case 0:
			case -1: {
					h = 2;
					break
				}
			default: {
					b = b + -1 | 0;
					if (b >>> 0 <= (f - (c[g >> 2] | 0) | 0) >>> 0)
						if (!b)
							h = 0;
						else
							while (1) {
								d = a[h >> 0] | 0;
								f = c[g >> 2] | 0;
								c[g >> 2] = f + 1;
								a[f >> 0] = d;
								b = b + -1 | 0;
								if (!b) {
									h = 0;
									break
								} else
									h = h + 1 | 0
							}
					else
						h = 1
				}
			}
			i = j;
			return h | 0
		}
		function yp(a) {
			a = a | 0;
			var b = 0,
			d = 0;
			a = a + 8 | 0;
			b = gi(c[a >> 2] | 0) | 0;
			d = ui(0, 0, 4) | 0;
			if (b)
				gi(b) | 0;
			if (!d) {
				a = c[a >> 2] | 0;
				if (a) {
					a = gi(a) | 0;
					if (!a)
						a = 0;
					else {
						gi(a) | 0;
						a = 0
					}
				} else
					a = 1
			} else
				a = -1;
			return a | 0
		}
		function zp(a) {
			a = a | 0;
			return 0
		}
		function Ap(a, b, d, e, f) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0;
			k = e;
			j = a + 8 | 0;
			a : do
				if ((d | 0) == (e | 0) | (f | 0) == 0)
					a = 0;
				else {
					a = 0;
					i = 0;
					while (1) {
						h = gi(c[j >> 2] | 0) | 0;
						g = pi(d, k - d | 0, b) | 0;
						if (h)
							gi(h) | 0;
						switch (g | 0) {
						case -2:
						case -1:
							break a;
						case 0: {
								d = d + 1 | 0;
								g = 1;
								break
							}
						default:
							d = d + g | 0
						}
						a = g + a | 0;
						i = i + 1 | 0;
						if ((d | 0) == (e | 0) | i >>> 0 >= f >>> 0)
							break a
					}
				}
			while (0);
			return a | 0
		}
		function Bp(a) {
			a = a | 0;
			a = c[a + 8 >> 2] | 0;
			if (a) {
				a = gi(a) | 0;
				if (!a)
					a = 4;
				else {
					gi(a) | 0;
					a = 4
				}
			} else
				a = 1;
			return a | 0
		}
		function Cp(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Dp(a, b, d, e, f, g, h, j) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0;
			a = i;
			i = i + 16 | 0;
			k = a + 4 | 0;
			b = a;
			c[k >> 2] = d;
			c[b >> 2] = g;
			h = Hr(d, e, k, g, h, b, 1114111, 0) | 0;
			c[f >> 2] = c[k >> 2];
			c[j >> 2] = c[b >> 2];
			i = a;
			return h | 0
		}
		function Ep(a, b, d, e, f, g, h, j) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0;
			a = i;
			i = i + 16 | 0;
			k = a + 4 | 0;
			b = a;
			c[k >> 2] = d;
			c[b >> 2] = g;
			h = Ir(d, e, k, g, h, b, 1114111, 0) | 0;
			c[f >> 2] = c[k >> 2];
			c[j >> 2] = c[b >> 2];
			i = a;
			return h | 0
		}
		function Fp(a, b, d, e, f) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			c[f >> 2] = d;
			return 3
		}
		function Gp(a) {
			a = a | 0;
			return 0
		}
		function Hp(a) {
			a = a | 0;
			return 0
		}
		function Ip(a, b, c, d, e) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			return Jr(c, d, e, 1114111, 0) | 0
		}
		function Jp(a) {
			a = a | 0;
			return 4
		}
		function Kp(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Lp(a, b, d, e, f, g, h, j) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0;
			a = i;
			i = i + 16 | 0;
			k = a + 4 | 0;
			b = a;
			c[k >> 2] = d;
			c[b >> 2] = g;
			h = Kr(d, e, k, g, h, b, 1114111, 0) | 0;
			c[f >> 2] = c[k >> 2];
			c[j >> 2] = c[b >> 2];
			i = a;
			return h | 0
		}
		function Mp(a, b, d, e, f, g, h, j) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0;
			a = i;
			i = i + 16 | 0;
			k = a + 4 | 0;
			b = a;
			c[k >> 2] = d;
			c[b >> 2] = g;
			h = Lr(d, e, k, g, h, b, 1114111, 0) | 0;
			c[f >> 2] = c[k >> 2];
			c[j >> 2] = c[b >> 2];
			i = a;
			return h | 0
		}
		function Np(a, b, d, e, f) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			c[f >> 2] = d;
			return 3
		}
		function Op(a) {
			a = a | 0;
			return 0
		}
		function Pp(a) {
			a = a | 0;
			return 0
		}
		function Qp(a, b, c, d, e) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			return Mr(c, d, e, 1114111, 0) | 0
		}
		function Rp(a) {
			a = a | 0;
			return 4
		}
		function Sp(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Tp(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Up(b, d) {
			b = b | 0;
			d = d | 0;
			c[b + 4 >> 2] = d + -1;
			c[b >> 2] = 9516;
			a[b + 8 >> 0] = 46;
			a[b + 9 >> 0] = 44;
			b = b + 12 | 0;
			c[b >> 2] = 0;
			c[b + 4 >> 2] = 0;
			c[b + 8 >> 2] = 0;
			return
		}
		function Vp(a, b) {
			a = a | 0;
			b = b | 0;
			c[a + 4 >> 2] = b + -1;
			c[a >> 2] = 9556;
			c[a + 8 >> 2] = 46;
			c[a + 12 >> 2] = 44;
			a = a + 16 | 0;
			c[a >> 2] = 0;
			c[a + 4 >> 2] = 0;
			c[a + 8 >> 2] = 0;
			return
		}
		function Wp(a) {
			a = a | 0;
			c[a >> 2] = 9516;
			qj(a + 12 | 0);
			return
		}
		function Xp(a) {
			a = a | 0;
			Wp(a);
			ih(a);
			return
		}
		function Yp(a) {
			a = a | 0;
			c[a >> 2] = 9556;
			qj(a + 16 | 0);
			return
		}
		function Zp(a) {
			a = a | 0;
			Yp(a);
			ih(a);
			return
		}
		function _p(b) {
			b = b | 0;
			return a[b + 8 >> 0] | 0
		}
		function $p(a) {
			a = a | 0;
			return c[a + 8 >> 2] | 0
		}
		function aq(b) {
			b = b | 0;
			return a[b + 9 >> 0] | 0
		}
		function bq(a) {
			a = a | 0;
			return c[a + 12 >> 2] | 0
		}
		function cq(a, b) {
			a = a | 0;
			b = b | 0;
			nj(a, b + 12 | 0);
			return
		}
		function dq(a, b) {
			a = a | 0;
			b = b | 0;
			nj(a, b + 16 | 0);
			return
		}
		function eq(a, b) {
			a = a | 0;
			b = b | 0;
			oj(a, 23599, 4);
			return
		}
		function fq(a, b) {
			a = a | 0;
			b = b | 0;
			Dj(a, 10128, Ui(10128) | 0);
			return
		}
		function gq(a, b) {
			a = a | 0;
			b = b | 0;
			oj(a, 23604, 5);
			return
		}
		function hq(a, b) {
			a = a | 0;
			b = b | 0;
			Dj(a, 10148, Ui(10148) | 0);
			return
		}
		function iq(a) {
			a = a | 0;
			switch (c[a + 4 >> 2] & 74 | 0) {
			case 64: {
					a = 8;
					break
				}
			case 8: {
					a = 16;
					break
				}
			case 0: {
					a = 0;
					break
				}
			default:
				a = 10
			}
			return a | 0
		}
		function jq(b) {
			b = b | 0;
			if ((a[2256] | 0) == 0 ? (ya(2256) | 0) != 0 : 0) {
				if ((a[2264] | 0) == 0 ? (ya(2264) | 0) != 0 : 0) {
					b = 10172;
					do {
						c[b >> 2] = 0;
						c[b + 4 >> 2] = 0;
						c[b + 8 >> 2] = 0;
						b = b + 12 | 0
					} while ((b | 0) != 10340);
					Ga(2264)
				}
				sj(10172, 23610) | 0;
				sj(10184, 23617) | 0;
				sj(10196, 23624) | 0;
				sj(10208, 23632) | 0;
				sj(10220, 23642) | 0;
				sj(10232, 23651) | 0;
				sj(10244, 23658) | 0;
				sj(10256, 23667) | 0;
				sj(10268, 23671) | 0;
				sj(10280, 23675) | 0;
				sj(10292, 23679) | 0;
				sj(10304, 23683) | 0;
				sj(10316, 23687) | 0;
				sj(10328, 23691) | 0;
				c[2585] = 10172;
				Ga(2256)
			}
			return c[2585] | 0
		}
		function kq(b) {
			b = b | 0;
			if ((a[2272] | 0) == 0 ? (ya(2272) | 0) != 0 : 0) {
				if ((a[2280] | 0) == 0 ? (ya(2280) | 0) != 0 : 0) {
					b = 10344;
					do {
						c[b >> 2] = 0;
						c[b + 4 >> 2] = 0;
						c[b + 8 >> 2] = 0;
						b = b + 12 | 0
					} while ((b | 0) != 10512);
					Ga(2280)
				}
				Gj(10344, 10512) | 0;
				Gj(10356, 10540) | 0;
				Gj(10368, 10568) | 0;
				Gj(10380, 10600) | 0;
				Gj(10392, 10640) | 0;
				Gj(10404, 10676) | 0;
				Gj(10416, 10704) | 0;
				Gj(10428, 10740) | 0;
				Gj(10440, 10756) | 0;
				Gj(10452, 10772) | 0;
				Gj(10464, 10788) | 0;
				Gj(10476, 10804) | 0;
				Gj(10488, 10820) | 0;
				Gj(10500, 10836) | 0;
				c[2713] = 10344;
				Ga(2272)
			}
			return c[2713] | 0
		}
		function lq(b) {
			b = b | 0;
			if ((a[2288] | 0) == 0 ? (ya(2288) | 0) != 0 : 0) {
				if ((a[2296] | 0) == 0 ? (ya(2296) | 0) != 0 : 0) {
					b = 10856;
					do {
						c[b >> 2] = 0;
						c[b + 4 >> 2] = 0;
						c[b + 8 >> 2] = 0;
						b = b + 12 | 0
					} while ((b | 0) != 11144);
					Ga(2296)
				}
				sj(10856, 23695) | 0;
				sj(10868, 23703) | 0;
				sj(10880, 23712) | 0;
				sj(10892, 23718) | 0;
				sj(10904, 23724) | 0;
				sj(10916, 23728) | 0;
				sj(10928, 23733) | 0;
				sj(10940, 23738) | 0;
				sj(10952, 23745) | 0;
				sj(10964, 23755) | 0;
				sj(10976, 23763) | 0;
				sj(10988, 23772) | 0;
				sj(11e3, 23781) | 0;
				sj(11012, 23785) | 0;
				sj(11024, 23789) | 0;
				sj(11036, 23793) | 0;
				sj(11048, 23724) | 0;
				sj(11060, 23797) | 0;
				sj(11072, 23801) | 0;
				sj(11084, 23805) | 0;
				sj(11096, 23809) | 0;
				sj(11108, 23813) | 0;
				sj(11120, 23817) | 0;
				sj(11132, 23821) | 0;
				c[2786] = 10856;
				Ga(2288)
			}
			return c[2786] | 0
		}
		function mq(b) {
			b = b | 0;
			if ((a[2304] | 0) == 0 ? (ya(2304) | 0) != 0 : 0) {
				if ((a[2312] | 0) == 0 ? (ya(2312) | 0) != 0 : 0) {
					b = 11148;
					do {
						c[b >> 2] = 0;
						c[b + 4 >> 2] = 0;
						c[b + 8 >> 2] = 0;
						b = b + 12 | 0
					} while ((b | 0) != 11436);
					Ga(2312)
				}
				Gj(11148, 11436) | 0;
				Gj(11160, 11468) | 0;
				Gj(11172, 11504) | 0;
				Gj(11184, 11528) | 0;
				Gj(11196, 11552) | 0;
				Gj(11208, 11568) | 0;
				Gj(11220, 11588) | 0;
				Gj(11232, 11608) | 0;
				Gj(11244, 11636) | 0;
				Gj(11256, 11676) | 0;
				Gj(11268, 11708) | 0;
				Gj(11280, 11744) | 0;
				Gj(11292, 11780) | 0;
				Gj(11304, 11796) | 0;
				Gj(11316, 11812) | 0;
				Gj(11328, 11828) | 0;
				Gj(11340, 11552) | 0;
				Gj(11352, 11844) | 0;
				Gj(11364, 11860) | 0;
				Gj(11376, 11876) | 0;
				Gj(11388, 11892) | 0;
				Gj(11400, 11908) | 0;
				Gj(11412, 11924) | 0;
				Gj(11424, 11940) | 0;
				c[2989] = 11148;
				Ga(2304)
			}
			return c[2989] | 0
		}
		function nq(b) {
			b = b | 0;
			if ((a[2320] | 0) == 0 ? (ya(2320) | 0) != 0 : 0) {
				if ((a[2328] | 0) == 0 ? (ya(2328) | 0) != 0 : 0) {
					b = 11960;
					do {
						c[b >> 2] = 0;
						c[b + 4 >> 2] = 0;
						c[b + 8 >> 2] = 0;
						b = b + 12 | 0
					} while ((b | 0) != 12248);
					Ga(2328)
				}
				sj(11960, 23825) | 0;
				sj(11972, 23828) | 0;
				c[3062] = 11960;
				Ga(2320)
			}
			return c[3062] | 0
		}
		function oq(b) {
			b = b | 0;
			if ((a[2336] | 0) == 0 ? (ya(2336) | 0) != 0 : 0) {
				if ((a[2344] | 0) == 0 ? (ya(2344) | 0) != 0 : 0) {
					b = 12252;
					do {
						c[b >> 2] = 0;
						c[b + 4 >> 2] = 0;
						c[b + 8 >> 2] = 0;
						b = b + 12 | 0
					} while ((b | 0) != 12540);
					Ga(2344)
				}
				Gj(12252, 12540) | 0;
				Gj(12264, 12552) | 0;
				c[3141] = 12252;
				Ga(2336)
			}
			return c[3141] | 0
		}
		function pq(b) {
			b = b | 0;
			if ((a[2352] | 0) == 0 ? (ya(2352) | 0) != 0 : 0) {
				oj(12568, 23831, 8);
				Ga(2352)
			}
			return 12568
		}
		function qq(b) {
			b = b | 0;
			if ((a[2360] | 0) == 0 ? (ya(2360) | 0) != 0 : 0) {
				Dj(12616, 12580, Ui(12580) | 0);
				Ga(2360)
			}
			return 12616
		}
		function rq(b) {
			b = b | 0;
			if ((a[2368] | 0) == 0 ? (ya(2368) | 0) != 0 : 0) {
				oj(12628, 23840, 8);
				Ga(2368)
			}
			return 12628
		}
		function sq(b) {
			b = b | 0;
			if ((a[2376] | 0) == 0 ? (ya(2376) | 0) != 0 : 0) {
				Dj(12676, 12640, Ui(12640) | 0);
				Ga(2376)
			}
			return 12676
		}
		function tq(b) {
			b = b | 0;
			if ((a[2384] | 0) == 0 ? (ya(2384) | 0) != 0 : 0) {
				oj(12688, 23849, 20);
				Ga(2384)
			}
			return 12688
		}
		function uq(b) {
			b = b | 0;
			if ((a[2392] | 0) == 0 ? (ya(2392) | 0) != 0 : 0) {
				Dj(12784, 12700, Ui(12700) | 0);
				Ga(2392)
			}
			return 12784
		}
		function vq(b) {
			b = b | 0;
			if ((a[2400] | 0) == 0 ? (ya(2400) | 0) != 0 : 0) {
				oj(12796, 23870, 11);
				Ga(2400)
			}
			return 12796
		}
		function wq(b) {
			b = b | 0;
			if ((a[2408] | 0) == 0 ? (ya(2408) | 0) != 0 : 0) {
				Dj(12856, 12808, Ui(12808) | 0);
				Ga(2408)
			}
			return 12856
		}
		function xq(a) {
			a = a | 0;
			var b = 0;
			c[a >> 2] = 9436;
			a = a + 8 | 0;
			b = c[a >> 2] | 0;
			if ((b | 0) != ($k() | 0))
				ci(c[a >> 2] | 0);
			return
		}
		function Xh(b, e, f) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			var g = 0.0,
			h = 0,
			j = 0.0,
			k = 0,
			l = 0,
			m = 0.0,
			n = 0,
			o = 0,
			p = 0,
			q = 0.0,
			t = 0.0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			D = 0,
			E = 0,
			F = 0,
			G = 0,
			H = 0,
			I = 0,
			J = 0,
			K = 0,
			L = 0,
			M = 0.0;
			L = i;
			i = i + 512 | 0;
			H = L;
			switch (e | 0) {
			case 0: {
					K = 24;
					J = -149;
					A = 4;
					break
				}
			case 1: {
					K = 53;
					J = -1074;
					A = 4;
					break
				}
			case 2: {
					K = 53;
					J = -1074;
					A = 4;
					break
				}
			default:
				g = 0.0
			}
			a : do
				if ((A | 0) == 4) {
					E = b + 4 | 0;
					D = b + 100 | 0;
					do {
						e = c[E >> 2] | 0;
						if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
							c[E >> 2] = e + 1;
							e = d[e >> 0] | 0
						} else
							e = _h(b) | 0
					} while ((Th(e) | 0) != 0);
					b : do
						switch (e | 0) {
						case 43:
						case 45: {
								h = 1 - (((e | 0) == 45 & 1) << 1) | 0;
								e = c[E >> 2] | 0;
								if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
									c[E >> 2] = e + 1;
									e = d[e >> 0] | 0;
									I = h;
									break b
								} else {
									e = _h(b) | 0;
									I = h;
									break b
								}
							}
						default:
							I = 1
						}
					while (0);
					h = e;
					e = 0;
					do {
						if ((h | 32 | 0) != (a[21223 + e >> 0] | 0))
							break;
						do
							if (e >>> 0 < 7) {
								h = c[E >> 2] | 0;
								if (h >>> 0 < (c[D >> 2] | 0) >>> 0) {
									c[E >> 2] = h + 1;
									h = d[h >> 0] | 0;
									break
								} else {
									h = _h(b) | 0;
									break
								}
							}
						while (0);
						e = e + 1 | 0
					} while (e >>> 0 < 8);
					c : do
						switch (e | 0) {
						case 8:
							break;
						case 3: {
								A = 23;
								break
							}
						default: {
								k = (f | 0) != 0;
								if (k & e >>> 0 > 3)
									if ((e | 0) == 8)
										break c;
									else {
										A = 23;
										break c
									}
								d : do
									if (!e) {
										e = 0;
										do {
											if ((h | 32 | 0) != (a[22028 + e >> 0] | 0))
												break d;
											do
												if (e >>> 0 < 2) {
													h = c[E >> 2] | 0;
													if (h >>> 0 < (c[D >> 2] | 0) >>> 0) {
														c[E >> 2] = h + 1;
														h = d[h >> 0] | 0;
														break
													} else {
														h = _h(b) | 0;
														break
													}
												}
											while (0);
											e = e + 1 | 0
										} while (e >>> 0 < 3)
									}
								while (0);
								switch (e | 0) {
								case 3: {
										e = c[E >> 2] | 0;
										if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
											c[E >> 2] = e + 1;
											e = d[e >> 0] | 0
										} else
											e = _h(b) | 0;
										if ((e | 0) == 40)
											e = 1;
										else {
											if (!(c[D >> 2] | 0)) {
												g = r;
												break a
											}
											c[E >> 2] = (c[E >> 2] | 0) + -1;
											g = r;
											break a
										}
										while (1) {
											h = c[E >> 2] | 0;
											if (h >>> 0 < (c[D >> 2] | 0) >>> 0) {
												c[E >> 2] = h + 1;
												h = d[h >> 0] | 0
											} else
												h = _h(b) | 0;
											if (!((h + -48 | 0) >>> 0 < 10 | (h + -65 | 0) >>> 0 < 26) ? !((h | 0) == 95 | (h + -97 | 0) >>> 0 < 26) : 0)
												break;
											e = e + 1 | 0
										}
										if ((h | 0) == 41) {
											g = r;
											break a
										}
										h = (c[D >> 2] | 0) == 0;
										if (!h)
											c[E >> 2] = (c[E >> 2] | 0) + -1;
										if (!k) {
											c[(Vh() | 0) >> 2] = 22;
											Zh(b, 0);
											g = 0.0;
											break a
										}
										if (!e) {
											g = r;
											break a
										}
										while (1) {
											e = e + -1 | 0;
											if (!h)
												c[E >> 2] = (c[E >> 2] | 0) + -1;
											if (!e) {
												g = r;
												break a
											}
										}
									}
								case 0: {
										do
											if ((h | 0) == 48) {
												e = c[E >> 2] | 0;
												if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
													c[E >> 2] = e + 1;
													e = d[e >> 0] | 0
												} else
													e = _h(b) | 0;
												if ((e | 32 | 0) != 120) {
													if (!(c[D >> 2] | 0)) {
														e = 48;
														break
													}
													c[E >> 2] = (c[E >> 2] | 0) + -1;
													e = 48;
													break
												}
												e = c[E >> 2] | 0;
												if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
													c[E >> 2] = e + 1;
													e = d[e >> 0] | 0;
													k = 0
												} else {
													e = _h(b) | 0;
													k = 0
												}
												e : while (1) {
													switch (e | 0) {
													case 46: {
															A = 74;
															break e
														}
													case 48:
														break;
													default: {
															y = 0;
															l = 0;
															x = 0;
															h = 0;
															n = k;
															o = 0;
															w = 0;
															m = 1.0;
															k = 0;
															g = 0.0;
															break e
														}
													}
													e = c[E >> 2] | 0;
													if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
														c[E >> 2] = e + 1;
														e = d[e >> 0] | 0;
														k = 1;
														continue
													} else {
														e = _h(b) | 0;
														k = 1;
														continue
													}
												}
												if ((A | 0) == 74) {
													e = c[E >> 2] | 0;
													if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
														c[E >> 2] = e + 1;
														e = d[e >> 0] | 0
													} else
														e = _h(b) | 0;
													if ((e | 0) == 48) {
														k = 0;
														h = 0;
														do {
															e = c[E >> 2] | 0;
															if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
																c[E >> 2] = e + 1;
																e = d[e >> 0] | 0
															} else
																e = _h(b) | 0;
															k = is(k | 0, h | 0, -1, -1) | 0;
															h = C
														} while ((e | 0) == 48);
														y = 0;
														l = 0;
														x = k;
														n = 1;
														o = 1;
														w = 0;
														m = 1.0;
														k = 0;
														g = 0.0
													} else {
														y = 0;
														l = 0;
														x = 0;
														h = 0;
														n = k;
														o = 1;
														w = 0;
														m = 1.0;
														k = 0;
														g = 0.0
													}
												}
												while (1) {
													u = e + -48 | 0;
													p = e | 32;
													if (u >>> 0 >= 10) {
														v = (e | 0) == 46;
														if (!(v | (p + -97 | 0) >>> 0 < 6)) {
															p = x;
															u = y;
															break
														}
														if (v)
															if (!o) {
																v = l;
																h = y;
																u = y;
																o = 1;
																p = w;
																j = m
															} else {
																p = x;
																u = y;
																e = 46;
																break
															}
														else
															A = 86
													} else
														A = 86;
													if ((A | 0) == 86) {
														A = 0;
														e = (e | 0) > 57 ? p + -87 | 0 : u;
														do
															if (!((y | 0) < 0 | (y | 0) == 0 & l >>> 0 < 8)) {
																if ((y | 0) < 0 | (y | 0) == 0 & l >>> 0 < 14) {
																	t = m * .0625;
																	p = w;
																	j = t;
																	g = g + t *  + (e | 0);
																	break
																}
																if ((w | 0) != 0 | (e | 0) == 0) {
																	p = w;
																	j = m
																} else {
																	p = 1;
																	j = m;
																	g = g + m * .5
																}
															} else {
																p = w;
																j = m;
																k = e + (k << 4) | 0
															}
														while (0);
														l = is(l | 0, y | 0, 1, 0) | 0;
														v = x;
														u = C;
														n = 1
													}
													e = c[E >> 2] | 0;
													if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
														c[E >> 2] = e + 1;
														y = u;
														x = v;
														e = d[e >> 0] | 0;
														w = p;
														m = j;
														continue
													} else {
														y = u;
														x = v;
														e = _h(b) | 0;
														w = p;
														m = j;
														continue
													}
												}
												if (!n) {
													e = (c[D >> 2] | 0) == 0;
													if (!e)
														c[E >> 2] = (c[E >> 2] | 0) + -1;
													if (f) {
														if (!e ? (z = c[E >> 2] | 0, c[E >> 2] = z + -1, (o | 0) != 0) : 0)
															c[E >> 2] = z + -2
													} else
														Zh(b, 0);
													g =  + (I | 0) * 0.0;
													break a
												}
												n = (o | 0) == 0;
												o = n ? l : p;
												n = n ? u : h;
												if ((u | 0) < 0 | (u | 0) == 0 & l >>> 0 < 8) {
													h = u;
													do {
														k = k << 4;
														l = is(l | 0, h | 0, 1, 0) | 0;
														h = C
													} while ((h | 0) < 0 | (h | 0) == 0 & l >>> 0 < 8)
												}
												if ((e | 32 | 0) == 112) {
													h = Yi(b, f) | 0;
													e = C;
													if ((h | 0) == 0 & (e | 0) == -2147483648) {
														if (!f) {
															Zh(b, 0);
															g = 0.0;
															break a
														}
														if (!(c[D >> 2] | 0)) {
															h = 0;
															e = 0
														} else {
															c[E >> 2] = (c[E >> 2] | 0) + -1;
															h = 0;
															e = 0
														}
													}
												} else if (!(c[D >> 2] | 0)) {
													h = 0;
													e = 0
												} else {
													c[E >> 2] = (c[E >> 2] | 0) + -1;
													h = 0;
													e = 0
												}
												H = ks(o | 0, n | 0, 2) | 0;
												H = is(H | 0, C | 0, -32, -1) | 0;
												e = is(H | 0, C | 0, h | 0, e | 0) | 0;
												h = C;
												if (!k) {
													g =  + (I | 0) * 0.0;
													break a
												}
												if ((h | 0) > 0 | (h | 0) == 0 & e >>> 0 > (0 - J | 0) >>> 0) {
													c[(Vh() | 0) >> 2] = 34;
													g =  + (I | 0) * 1797693134862315708145274.0e284 * 1797693134862315708145274.0e284;
													break a
												}
												H = J + -106 | 0;
												G = ((H | 0) < 0) << 31 >> 31;
												if ((h | 0) < (G | 0) | (h | 0) == (G | 0) & e >>> 0 < H >>> 0) {
													c[(Vh() | 0) >> 2] = 34;
													g =  + (I | 0) * 2.2250738585072014e-308 * 2.2250738585072014e-308;
													break a
												}
												if ((k | 0) > -1) {
													do {
														G = !(g >= .5);
														H = G & 1 | k << 1;
														k = H^1;
														g = g + (G ? g : g + -1.0);
														e = is(e | 0, h | 0, -1, -1) | 0;
														h = C
													} while ((H | 0) > -1);
													l = e;
													m = g
												} else {
													l = e;
													m = g
												}
												e = fs(32, 0, J | 0, ((J | 0) < 0) << 31 >> 31 | 0) | 0;
												e = is(l | 0, h | 0, e | 0, C | 0) | 0;
												J = C;
												if (0 > (J | 0) | 0 == (J | 0) & K >>> 0 > e >>> 0)
													if ((e | 0) < 0) {
														e = 0;
														A = 127
													} else
														A = 125;
												else {
													e = K;
													A = 125
												}
												if ((A | 0) == 125)
													if ((e | 0) < 53)
														A = 127;
													else {
														h = e;
														j =  + (I | 0);
														g = 0.0
													}
												if ((A | 0) == 127) {
													g =  + (I | 0);
													h = e;
													j = g;
													g = +ii(+ni(1.0, 84 - e | 0), g)
												}
												K = (k & 1 | 0) == 0 & (m != 0.0 & (h | 0) < 32);
												g = j * (K ? 0.0 : m) + (g + j *  + (((K & 1) + k | 0) >>> 0)) - g;
												if (!(g != 0.0))
													c[(Vh() | 0) >> 2] = 34;
												g = +oi(g, l);
												break a
											} else
												e = h;
										while (0);
										F = J + K | 0;
										G = 0 - F | 0;
										k = 0;
										f : while (1) {
											switch (e | 0) {
											case 46: {
													A = 138;
													break f
												}
											case 48:
												break;
											default: {
													h = 0;
													p = 0;
													o = 0;
													break f
												}
											}
											e = c[E >> 2] | 0;
											if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
												c[E >> 2] = e + 1;
												e = d[e >> 0] | 0;
												k = 1;
												continue
											} else {
												e = _h(b) | 0;
												k = 1;
												continue
											}
										}
										if ((A | 0) == 138) {
											e = c[E >> 2] | 0;
											if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
												c[E >> 2] = e + 1;
												e = d[e >> 0] | 0
											} else
												e = _h(b) | 0;
											if ((e | 0) == 48) {
												h = 0;
												e = 0;
												while (1) {
													h = is(h | 0, e | 0, -1, -1) | 0;
													k = C;
													e = c[E >> 2] | 0;
													if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
														c[E >> 2] = e + 1;
														e = d[e >> 0] | 0
													} else
														e = _h(b) | 0;
													if ((e | 0) == 48)
														e = k;
													else {
														p = k;
														k = 1;
														o = 1;
														break
													}
												}
											} else {
												h = 0;
												p = 0;
												o = 1
											}
										}
										c[H >> 2] = 0;
										n = e + -48 | 0;
										l = (e | 0) == 46;
										g : do
											if (l | n >>> 0 < 10) {
												B = H + 496 | 0;
												y = 0;
												v = 0;
												w = l;
												A = p;
												u = k;
												z = o;
												k = 0;
												l = 0;
												o = 0;
												h : while (1) {
													do
														if (w)
															if (!z) {
																h = y;
																p = v;
																z = 1
															} else {
																p = A;
																e = y;
																n = v;
																break h
															}
														else {
															w = is(y | 0, v | 0, 1, 0) | 0;
															v = C;
															x = (e | 0) != 48;
															if ((l | 0) >= 125) {
																if (!x) {
																	p = A;
																	y = w;
																	break
																}
																c[B >> 2] = c[B >> 2] | 1;
																p = A;
																y = w;
																break
															}
															p = H + (l << 2) | 0;
															if (k)
																n = e + -48 + ((c[p >> 2] | 0) * 10 | 0) | 0;
															c[p >> 2] = n;
															k = k + 1 | 0;
															n = (k | 0) == 9;
															p = A;
															y = w;
															u = 1;
															k = n ? 0 : k;
															l = (n & 1) + l | 0;
															o = x ? w : o
														}
													while (0);
													e = c[E >> 2] | 0;
													if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
														c[E >> 2] = e + 1;
														e = d[e >> 0] | 0
													} else
														e = _h(b) | 0;
													n = e + -48 | 0;
													w = (e | 0) == 46;
													if (!(w | n >>> 0 < 10)) {
														n = z;
														A = 161;
														break g
													} else
														A = p
												}
												u = (u | 0) != 0;
												A = 169
											} else {
												y = 0;
												v = 0;
												u = k;
												n = o;
												k = 0;
												l = 0;
												o = 0;
												A = 161
											}
										while (0);
										do
											if ((A | 0) == 161) {
												B = (n | 0) == 0;
												h = B ? y : h;
												p = B ? v : p;
												u = (u | 0) != 0;
												if (!((e | 32 | 0) == 101 & u))
													if ((e | 0) > -1) {
														e = y;
														n = v;
														A = 169;
														break
													} else {
														e = y;
														n = v;
														A = 171;
														break
													}
												n = Yi(b, f) | 0;
												e = C;
												if ((n | 0) == 0 & (e | 0) == -2147483648) {
													if (!f) {
														Zh(b, 0);
														g = 0.0;
														break
													}
													if (!(c[D >> 2] | 0)) {
														n = 0;
														e = 0
													} else {
														c[E >> 2] = (c[E >> 2] | 0) + -1;
														n = 0;
														e = 0
													}
												}
												h = is(n | 0, e | 0, h | 0, p | 0) | 0;
												u = y;
												p = C;
												n = v;
												A = 173
											}
										while (0);
										if ((A | 0) == 169)
											if (c[D >> 2] | 0) {
												c[E >> 2] = (c[E >> 2] | 0) + -1;
												if (u) {
													u = e;
													A = 173
												} else
													A = 172
											} else
												A = 171;
										if ((A | 0) == 171)
											if (u) {
												u = e;
												A = 173
											} else
												A = 172;
										do
											if ((A | 0) == 172) {
												c[(Vh() | 0) >> 2] = 22;
												Zh(b, 0);
												g = 0.0
											} else if ((A | 0) == 173) {
												e = c[H >> 2] | 0;
												if (!e) {
													g =  + (I | 0) * 0.0;
													break
												}
												if (((n | 0) < 0 | (n | 0) == 0 & u >>> 0 < 10) & ((h | 0) == (u | 0) & (p | 0) == (n | 0)) ? K >>> 0 > 30 | (e >>> K | 0) == 0 : 0) {
													g =  + (I | 0) *  + (e >>> 0);
													break
												}
												b = (J | 0) / -2 | 0;
												E = ((b | 0) < 0) << 31 >> 31;
												if ((p | 0) > (E | 0) | (p | 0) == (E | 0) & h >>> 0 > b >>> 0) {
													c[(Vh() | 0) >> 2] = 34;
													g =  + (I | 0) * 1797693134862315708145274.0e284 * 1797693134862315708145274.0e284;
													break
												}
												b = J + -106 | 0;
												E = ((b | 0) < 0) << 31 >> 31;
												if ((p | 0) < (E | 0) | (p | 0) == (E | 0) & h >>> 0 < b >>> 0) {
													c[(Vh() | 0) >> 2] = 34;
													g =  + (I | 0) * 2.2250738585072014e-308 * 2.2250738585072014e-308;
													break
												}
												if (k) {
													if ((k | 0) < 9) {
														n = H + (l << 2) | 0;
														e = c[n >> 2] | 0;
														do {
															e = e * 10 | 0;
															k = k + 1 | 0
														} while ((k | 0) != 9);
														c[n >> 2] = e
													}
													l = l + 1 | 0
												}
												if ((o | 0) < 9 ? (o | 0) <= (h | 0) & (h | 0) < 18 : 0) {
													if ((h | 0) == 9) {
														g =  + (I | 0) *  + ((c[H >> 2] | 0) >>> 0);
														break
													}
													if ((h | 0) < 9) {
														g =  + (I | 0) *  + ((c[H >> 2] | 0) >>> 0) /  + (c[4064 + (8 - h << 2) >> 2] | 0);
														break
													}
													b = K + 27 + (_(h, -3) | 0) | 0;
													e = c[H >> 2] | 0;
													if ((b | 0) > 30 | (e >>> b | 0) == 0) {
														g =  + (I | 0) *  + (e >>> 0) *  + (c[4064 + (h + -10 << 2) >> 2] | 0);
														break
													}
												}
												e = (h | 0) % 9 | 0;
												if (!e) {
													k = 0;
													e = 0
												} else {
													u = (h | 0) > -1 ? e : e + 9 | 0;
													n = c[4064 + (8 - u << 2) >> 2] | 0;
													if (l) {
														o = 1e9 / (n | 0) | 0;
														k = 0;
														e = 0;
														p = 0;
														do {
															D = H + (p << 2) | 0;
															E = c[D >> 2] | 0;
															b = ((E >>> 0) / (n >>> 0) | 0) + e | 0;
															c[D >> 2] = b;
															e = _((E >>> 0) % (n >>> 0) | 0, o) | 0;
															b = (p | 0) == (k | 0) & (b | 0) == 0;
															p = p + 1 | 0;
															h = b ? h + -9 | 0 : h;
															k = b ? p & 127 : k
														} while ((p | 0) != (l | 0));
														if (e) {
															c[H + (l << 2) >> 2] = e;
															l = l + 1 | 0
														}
													} else {
														k = 0;
														l = 0
													}
													e = 0;
													h = 9 - u + h | 0
												}
												i : while (1) {
													v = (h | 0) < 18;
													w = (h | 0) == 18;
													x = H + (k << 2) | 0;
													do {
														if (!v) {
															if (!w)
																break i;
															if ((c[x >> 2] | 0) >>> 0 >= 9007199) {
																h = 18;
																break i
															}
														}
														n = 0;
														o = l + 127 | 0;
														while (1) {
															u = o & 127;
															p = H + (u << 2) | 0;
															o = ks(c[p >> 2] | 0, 0, 29) | 0;
															o = is(o | 0, C | 0, n | 0, 0) | 0;
															n = C;
															if (n >>> 0 > 0 | (n | 0) == 0 & o >>> 0 > 1e9) {
																b = ss(o | 0, n | 0, 1e9, 0) | 0;
																o = ts(o | 0, n | 0, 1e9, 0) | 0;
																n = b
															} else
																n = 0;
															c[p >> 2] = o;
															b = (u | 0) == (k | 0);
															l = (u | 0) != (l + 127 & 127 | 0) | b ? l : (o | 0) == 0 ? u : l;
															if (b)
																break;
															else
																o = u + -1 | 0
														}
														e = e + -29 | 0
													} while ((n | 0) == 0);
													k = k + 127 & 127;
													if ((k | 0) == (l | 0)) {
														b = l + 127 & 127;
														l = H + ((l + 126 & 127) << 2) | 0;
														c[l >> 2] = c[l >> 2] | c[H + (b << 2) >> 2];
														l = b
													}
													c[H + (k << 2) >> 2] = n;
													h = h + 9 | 0
												}
												j : while (1) {
													y = l + 1 & 127;
													x = H + ((l + 127 & 127) << 2) | 0;
													while (1) {
														v = (h | 0) == 18;
														w = (h | 0) > 27 ? 9 : 1;
														u = v^1;
														while (1) {
															o = k & 127;
															p = (o | 0) == (l | 0);
															do
																if (!p) {
																	n = c[H + (o << 2) >> 2] | 0;
																	if (n >>> 0 < 9007199) {
																		A = 219;
																		break
																	}
																	if (n >>> 0 > 9007199)
																		break;
																	n = k + 1 & 127;
																	if ((n | 0) == (l | 0)) {
																		A = 219;
																		break
																	}
																	n = c[H + (n << 2) >> 2] | 0;
																	if (n >>> 0 < 254740991) {
																		A = 219;
																		break
																	}
																	if (!(n >>> 0 > 254740991 | u)) {
																		h = o;
																		break j
																	}
																} else
																	A = 219;
															while (0);
															if ((A | 0) == 219 ? (A = 0, v) : 0) {
																A = 220;
																break j
															}
															e = e + w | 0;
															if ((k | 0) == (l | 0))
																k = l;
															else
																break
														}
														u = (1 << w) + -1 | 0;
														v = 1e9 >>> w;
														o = k;
														n = 0;
														p = k;
														while (1) {
															E = H + (p << 2) | 0;
															b = c[E >> 2] | 0;
															k = (b >>> w) + n | 0;
															c[E >> 2] = k;
															n = _(b & u, v) | 0;
															k = (p | 0) == (o | 0) & (k | 0) == 0;
															p = p + 1 & 127;
															h = k ? h + -9 | 0 : h;
															k = k ? p : o;
															if ((p | 0) == (l | 0))
																break;
															else
																o = k
														}
														if (!n)
															continue;
														if ((y | 0) != (k | 0))
															break;
														c[x >> 2] = c[x >> 2] | 1
													}
													c[H + (l << 2) >> 2] = n;
													l = y
												}
												if ((A | 0) == 220)
													if (p) {
														c[H + (y + -1 << 2) >> 2] = 0;
														h = l;
														l = y
													} else
														h = o;
												g =  + ((c[H + (h << 2) >> 2] | 0) >>> 0);
												h = k + 1 & 127;
												if ((h | 0) == (l | 0)) {
													l = k + 2 & 127;
													c[H + (l + -1 << 2) >> 2] = 0
												}
												t =  + (I | 0);
												j = t * (g * 1.0e9 +  + ((c[H + (h << 2) >> 2] | 0) >>> 0));
												v = e + 53 | 0;
												p = v - J | 0;
												u = (p | 0) < (K | 0);
												h = u & 1;
												o = u ? ((p | 0) < 0 ? 0 : p) : K;
												if ((o | 0) < 53) {
													M = +ii(+ni(1.0, 105 - o | 0), j);
													m = +ki(j, +ni(1.0, 53 - o | 0));
													q = M;
													g = m;
													m = M + (j - m)
												} else {
													q = 0.0;
													g = 0.0;
													m = j
												}
												n = k + 2 & 127;
												do
													if ((n | 0) == (l | 0))
														j = g;
													else {
														n = c[H + (n << 2) >> 2] | 0;
														do
															if (n >>> 0 >= 5e8) {
																if (n >>> 0 > 5e8) {
																	g = t * .75 + g;
																	break
																}
																if ((k + 3 & 127 | 0) == (l | 0)) {
																	g = t * .5 + g;
																	break
																} else {
																	g = t * .75 + g;
																	break
																}
															} else {
																if ((n | 0) == 0 ? (k + 3 & 127 | 0) == (l | 0) : 0)
																	break;
																g = t * .25 + g
															}
														while (0);
														if ((53 - o | 0) <= 1) {
															j = g;
															break
														}
														if (+ki(g, 1.0) != 0.0) {
															j = g;
															break
														}
														j = g + 1.0
													}
												while (0);
												g = m + j - q;
												do
													if ((v & 2147483647 | 0) > (-2 - F | 0)) {
														if (+N(+g) >= 9007199254740992.0) {
															h = u & (o | 0) == (p | 0) ? 0 : h;
															e = e + 1 | 0;
															g = g * .5
														}
														if ((e + 50 | 0) <= (G | 0) ? !(j != 0.0 & (h | 0) != 0) : 0)
															break;
														c[(Vh() | 0) >> 2] = 34
													}
												while (0);
												g = +oi(g, e)
											}
										while (0);
										break a
									}
								default: {
										if (c[D >> 2] | 0)
											c[E >> 2] = (c[E >> 2] | 0) + -1;
										c[(Vh() | 0) >> 2] = 22;
										Zh(b, 0);
										g = 0.0;
										break a
									}
								}
							}
						}
					while (0);
					if ((A | 0) == 23) {
						h = (c[D >> 2] | 0) == 0;
						if (!h)
							c[E >> 2] = (c[E >> 2] | 0) + -1;
						if ((f | 0) != 0 & e >>> 0 > 3)
							do {
								if (!h)
									c[E >> 2] = (c[E >> 2] | 0) + -1;
								e = e + -1 | 0
							} while (e >>> 0 > 3)
					}
					g =  + (I | 0) * s
				}
			while (0);
			i = L;
			return +g
		}
		function Yh(b, e, f, g, h) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0;
			a : do
				if (e >>> 0 > 36) {
					c[(Vh() | 0) >> 2] = 22;
					h = 0;
					g = 0
				} else {
					r = b + 4 | 0;
					q = b + 100 | 0;
					do {
						i = c[r >> 2] | 0;
						if (i >>> 0 < (c[q >> 2] | 0) >>> 0) {
							c[r >> 2] = i + 1;
							i = d[i >> 0] | 0
						} else
							i = _h(b) | 0
					} while ((Th(i) | 0) != 0);
					b : do
						switch (i | 0) {
						case 43:
						case 45: {
								j = ((i | 0) == 45) << 31 >> 31;
								i = c[r >> 2] | 0;
								if (i >>> 0 < (c[q >> 2] | 0) >>> 0) {
									c[r >> 2] = i + 1;
									i = d[i >> 0] | 0;
									p = j;
									break b
								} else {
									i = _h(b) | 0;
									p = j;
									break b
								}
							}
						default:
							p = 0
						}
					while (0);
					j = (e | 0) == 0;
					do
						if ((e & -17 | 0) == 0 & (i | 0) == 48) {
							i = c[r >> 2] | 0;
							if (i >>> 0 < (c[q >> 2] | 0) >>> 0) {
								c[r >> 2] = i + 1;
								i = d[i >> 0] | 0
							} else
								i = _h(b) | 0;
							if ((i | 32 | 0) != 120)
								if (j) {
									e = 8;
									n = 46;
									break
								} else {
									n = 32;
									break
								}
							e = c[r >> 2] | 0;
							if (e >>> 0 < (c[q >> 2] | 0) >>> 0) {
								c[r >> 2] = e + 1;
								i = d[e >> 0] | 0
							} else
								i = _h(b) | 0;
							if ((d[21232 + (i + 1) >> 0] | 0) > 15) {
								g = (c[q >> 2] | 0) == 0;
								if (!g)
									c[r >> 2] = (c[r >> 2] | 0) + -1;
								if (!f) {
									Zh(b, 0);
									h = 0;
									g = 0;
									break a
								}
								if (g) {
									h = 0;
									g = 0;
									break a
								}
								c[r >> 2] = (c[r >> 2] | 0) + -1;
								h = 0;
								g = 0;
								break a
							} else {
								e = 16;
								n = 46
							}
						} else {
							e = j ? 10 : e;
							if ((d[21232 + (i + 1) >> 0] | 0) >>> 0 < e >>> 0)
								n = 32;
							else {
								if (c[q >> 2] | 0)
									c[r >> 2] = (c[r >> 2] | 0) + -1;
								Zh(b, 0);
								c[(Vh() | 0) >> 2] = 22;
								h = 0;
								g = 0;
								break a
							}
						}
					while (0);
					if ((n | 0) == 32)
						if ((e | 0) == 10) {
							e = i + -48 | 0;
							if (e >>> 0 < 10) {
								i = 0;
								while (1) {
									j = (i * 10 | 0) + e | 0;
									e = c[r >> 2] | 0;
									if (e >>> 0 < (c[q >> 2] | 0) >>> 0) {
										c[r >> 2] = e + 1;
										i = d[e >> 0] | 0
									} else
										i = _h(b) | 0;
									e = i + -48 | 0;
									if (!(e >>> 0 < 10 & j >>> 0 < 429496729)) {
										e = j;
										break
									} else
										i = j
								}
								j = 0
							} else {
								e = 0;
								j = 0
							}
							f = i + -48 | 0;
							if (f >>> 0 < 10) {
								while (1) {
									k = rs(e | 0, j | 0, 10, 0) | 0;
									l = C;
									m = ((f | 0) < 0) << 31 >> 31;
									o = ~m;
									if (l >>> 0 > o >>> 0 | (l | 0) == (o | 0) & k >>> 0 > ~f >>> 0) {
										k = e;
										break
									}
									e = is(k | 0, l | 0, f | 0, m | 0) | 0;
									j = C;
									i = c[r >> 2] | 0;
									if (i >>> 0 < (c[q >> 2] | 0) >>> 0) {
										c[r >> 2] = i + 1;
										i = d[i >> 0] | 0
									} else
										i = _h(b) | 0;
									f = i + -48 | 0;
									if (!(f >>> 0 < 10 & (j >>> 0 < 429496729 | (j | 0) == 429496729 & e >>> 0 < 2576980378))) {
										k = e;
										break
									}
								}
								if (f >>> 0 > 9) {
									i = k;
									e = p
								} else {
									e = 10;
									n = 72
								}
							} else {
								i = e;
								e = p
							}
						} else
							n = 46;
					c : do
						if ((n | 0) == 46) {
							if (!(e + -1 & e)) {
								n = a[21489 + ((e * 23 | 0) >>> 5 & 7) >> 0] | 0;
								j = a[21232 + (i + 1) >> 0] | 0;
								f = j & 255;
								if (f >>> 0 < e >>> 0) {
									i = 0;
									while (1) {
										k = f | i << n;
										i = c[r >> 2] | 0;
										if (i >>> 0 < (c[q >> 2] | 0) >>> 0) {
											c[r >> 2] = i + 1;
											i = d[i >> 0] | 0
										} else
											i = _h(b) | 0;
										j = a[21232 + (i + 1) >> 0] | 0;
										f = j & 255;
										if (!(k >>> 0 < 134217728 & f >>> 0 < e >>> 0))
											break;
										else
											i = k
									}
									f = 0
								} else {
									f = 0;
									k = 0
								}
								l = hs(-1, -1, n | 0) | 0;
								m = C;
								if ((j & 255) >>> 0 >= e >>> 0 | (f >>> 0 > m >>> 0 | (f | 0) == (m | 0) & k >>> 0 > l >>> 0)) {
									j = f;
									n = 72;
									break
								} else
									i = f;
								while (1) {
									k = ks(k | 0, i | 0, n | 0) | 0;
									f = C;
									k = j & 255 | k;
									i = c[r >> 2] | 0;
									if (i >>> 0 < (c[q >> 2] | 0) >>> 0) {
										c[r >> 2] = i + 1;
										i = d[i >> 0] | 0
									} else
										i = _h(b) | 0;
									j = a[21232 + (i + 1) >> 0] | 0;
									if ((j & 255) >>> 0 >= e >>> 0 | (f >>> 0 > m >>> 0 | (f | 0) == (m | 0) & k >>> 0 > l >>> 0)) {
										j = f;
										n = 72;
										break c
									} else
										i = f
								}
							}
							j = a[21232 + (i + 1) >> 0] | 0;
							f = j & 255;
							if (f >>> 0 < e >>> 0) {
								i = 0;
								while (1) {
									k = f + (_(i, e) | 0) | 0;
									i = c[r >> 2] | 0;
									if (i >>> 0 < (c[q >> 2] | 0) >>> 0) {
										c[r >> 2] = i + 1;
										i = d[i >> 0] | 0
									} else
										i = _h(b) | 0;
									j = a[21232 + (i + 1) >> 0] | 0;
									f = j & 255;
									if (!(k >>> 0 < 119304647 & f >>> 0 < e >>> 0))
										break;
									else
										i = k
								}
								f = 0
							} else {
								k = 0;
								f = 0
							}
							if ((j & 255) >>> 0 < e >>> 0) {
								n = ss(-1, -1, e | 0, 0) | 0;
								o = C;
								m = f;
								while (1) {
									if (m >>> 0 > o >>> 0 | (m | 0) == (o | 0) & k >>> 0 > n >>> 0) {
										j = m;
										n = 72;
										break c
									}
									f = rs(k | 0, m | 0, e | 0, 0) | 0;
									l = C;
									j = j & 255;
									if (l >>> 0 > 4294967295 | (l | 0) == -1 & f >>> 0 > ~j >>> 0) {
										j = m;
										n = 72;
										break c
									}
									k = is(j | 0, 0, f | 0, l | 0) | 0;
									f = C;
									i = c[r >> 2] | 0;
									if (i >>> 0 < (c[q >> 2] | 0) >>> 0) {
										c[r >> 2] = i + 1;
										i = d[i >> 0] | 0
									} else
										i = _h(b) | 0;
									j = a[21232 + (i + 1) >> 0] | 0;
									if ((j & 255) >>> 0 >= e >>> 0) {
										j = f;
										n = 72;
										break
									} else
										m = f
								}
							} else {
								j = f;
								n = 72
							}
						}
					while (0);
					if ((n | 0) == 72)
						if ((d[21232 + (i + 1) >> 0] | 0) >>> 0 < e >>> 0) {
							do {
								i = c[r >> 2] | 0;
								if (i >>> 0 < (c[q >> 2] | 0) >>> 0) {
									c[r >> 2] = i + 1;
									i = d[i >> 0] | 0
								} else
									i = _h(b) | 0
							} while ((d[21232 + (i + 1) >> 0] | 0) >>> 0 < e >>> 0);
							c[(Vh() | 0) >> 2] = 34;
							j = h;
							i = g;
							e = (g & 1 | 0) == 0 & 0 == 0 ? p : 0
						} else {
							i = k;
							e = p
						}
					if (c[q >> 2] | 0)
						c[r >> 2] = (c[r >> 2] | 0) + -1;
					if (!(j >>> 0 < h >>> 0 | (j | 0) == (h | 0) & i >>> 0 < g >>> 0)) {
						if (!((g & 1 | 0) != 0 | 0 != 0 | (e | 0) != 0)) {
							c[(Vh() | 0) >> 2] = 34;
							g = is(g | 0, h | 0, -1, -1) | 0;
							h = C;
							break
						}
						if (j >>> 0 > h >>> 0 | (j | 0) == (h | 0) & i >>> 0 > g >>> 0) {
							c[(Vh() | 0) >> 2] = 34;
							break
						}
					}
					g = ((e | 0) < 0) << 31 >> 31;
					g = fs(i^e | 0, j^g | 0, e | 0, g | 0) | 0;
					h = C
				}
			while (0);
			C = h;
			return g | 0
		}
		function Zh(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0;
			c[a + 104 >> 2] = b;
			d = c[a + 4 >> 2] | 0;
			e = c[a + 8 >> 2] | 0;
			f = e - d | 0;
			c[a + 108 >> 2] = f;
			if ((b | 0) != 0 & (f | 0) > (b | 0))
				c[a + 100 >> 2] = d + b;
			else
				c[a + 100 >> 2] = e;
			return
		}
		function _h(b) {
			b = b | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0;
			f = b + 104 | 0;
			i = c[f >> 2] | 0;
			if ((i | 0) != 0 ? (c[b + 108 >> 2] | 0) >= (i | 0) : 0)
				j = 4;
			else {
				e = Ei(b) | 0;
				if ((e | 0) >= 0) {
					h = c[f >> 2] | 0;
					f = b + 8 | 0;
					if (h) {
						g = c[f >> 2] | 0;
						i = c[b + 4 >> 2] | 0;
						f = g;
						h = h - (c[b + 108 >> 2] | 0) + -1 | 0;
						if ((f - i | 0) > (h | 0))
							c[b + 100 >> 2] = i + h;
						else
							j = 9
					} else {
						g = c[f >> 2] | 0;
						f = g;
						j = 9
					}
					if ((j | 0) == 9)
						c[b + 100 >> 2] = f;
					f = c[b + 4 >> 2] | 0;
					if (g) {
						b = b + 108 | 0;
						c[b >> 2] = g + 1 - f + (c[b >> 2] | 0)
					}
					f = f + -1 | 0;
					if ((d[f >> 0] | 0 | 0) != (e | 0))
						a[f >> 0] = e
				} else
					j = 4
			}
			if ((j | 0) == 4) {
				c[b + 100 >> 2] = 0;
				e = -1
			}
			return e | 0
		}
		function $h(a) {
			a = a | 0;
			return 0
		}
		function ai(a, b, c, d) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			return d | 0
		}
		function bi(a, b) {
			a = a | 0;
			b = b | 0;
			return -1 | 0
		}
		function ci(a) {
			a = a | 0;
			gj(a);
			return
		}
		function di(a, b) {
			a = a | 0;
			b = b | 0;
			return (a + -48 | 0) >>> 0 < 10 | 0
		}
		function ei(a, b) {
			a = a | 0;
			b = b | 0;
			return Uh(a) | 0
		}
		function fi(b, c, d) {
			b = b | 0;
			c = c | 0;
			d = d | 0;
			if (((a[c >> 0] | 0) != 0 ? (Si(c, 23497) | 0) != 0 : 0) ? (Si(c, 21498) | 0) != 0 : 0)
				d = 0;
			else if (!d)
				d = hj(1, 4) | 0;
			return d | 0
		}
		function gi(a) {
			a = a | 0;
			var b = 0,
			d = 0;
			b = (Ua() | 0) + 176 | 0;
			d = c[b >> 2] | 0;
			if (a)
				c[b >> 2] = a;
			return d | 0
		}
		function hi(a, b) {
			a = +a;
			b = +b;
			var d = 0,
			e = 0;
			h[k >> 3] = a;
			e = c[k >> 2] | 0;
			d = c[k + 4 >> 2] | 0;
			h[k >> 3] = b;
			d = c[k + 4 >> 2] & -2147483648 | d & 2147483647;
			c[k >> 2] = e;
			c[k + 4 >> 2] = d;
			return  + (+h[k >> 3])
		}
		function ii(a, b) {
			a = +a;
			b = +b;
			return  + (+hi(a, b))
		}
		function ji(a, b) {
			a = +a;
			b = +b;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			i = 0,
			j = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0;
			h[k >> 3] = a;
			d = c[k >> 2] | 0;
			m = c[k + 4 >> 2] | 0;
			h[k >> 3] = b;
			n = c[k >> 2] | 0;
			o = c[k + 4 >> 2] | 0;
			e = hs(d | 0, m | 0, 52) | 0;
			e = e & 2047;
			j = hs(n | 0, o | 0, 52) | 0;
			j = j & 2047;
			p = m & -2147483648;
			i = ks(n | 0, o | 0, 1) | 0;
			l = C;
			a : do
				if (!((i | 0) == 0 & (l | 0) == 0) ? (g = o & 2147483647, !(g >>> 0 > 2146435072 | (g | 0) == 2146435072 & n >>> 0 > 0 | (e | 0) == 2047)) : 0) {
					f = ks(d | 0, m | 0, 1) | 0;
					g = C;
					if (!(g >>> 0 > l >>> 0 | (g | 0) == (l | 0) & f >>> 0 > i >>> 0))
						return  + ((f | 0) == (i | 0) & (g | 0) == (l | 0) ? a * 0.0 : a);
					if (!e) {
						e = ks(d | 0, m | 0, 12) | 0;
						f = C;
						if ((f | 0) > -1 | (f | 0) == -1 & e >>> 0 > 4294967295) {
							g = e;
							e = 0;
							do {
								e = e + -1 | 0;
								g = ks(g | 0, f | 0, 1) | 0;
								f = C
							} while ((f | 0) > -1 | (f | 0) == -1 & g >>> 0 > 4294967295)
						} else
							e = 0;
						d = ks(d | 0, m | 0, 1 - e | 0) | 0;
						f = C
					} else
						f = m & 1048575 | 1048576;
					if (!j) {
						g = ks(n | 0, o | 0, 12) | 0;
						i = C;
						if ((i | 0) > -1 | (i | 0) == -1 & g >>> 0 > 4294967295) {
							j = 0;
							do {
								j = j + -1 | 0;
								g = ks(g | 0, i | 0, 1) | 0;
								i = C
							} while ((i | 0) > -1 | (i | 0) == -1 & g >>> 0 > 4294967295)
						} else
							j = 0;
						n = ks(n | 0, o | 0, 1 - j | 0) | 0;
						m = C
					} else
						m = o & 1048575 | 1048576;
					l = fs(d | 0, f | 0, n | 0, m | 0) | 0;
					i = C;
					g = (i | 0) > -1 | (i | 0) == -1 & l >>> 0 > 4294967295;
					b : do
						if ((e | 0) > (j | 0)) {
							while (1) {
								if (g)
									if ((d | 0) == (n | 0) & (f | 0) == (m | 0))
										break;
									else {
										d = l;
										f = i
									}
								d = ks(d | 0, f | 0, 1) | 0;
								f = C;
								e = e + -1 | 0;
								l = fs(d | 0, f | 0, n | 0, m | 0) | 0;
								i = C;
								g = (i | 0) > -1 | (i | 0) == -1 & l >>> 0 > 4294967295;
								if ((e | 0) <= (j | 0))
									break b
							}
							b = a * 0.0;
							break a
						}
					while (0);
					if (g)
						if ((d | 0) == (n | 0) & (f | 0) == (m | 0)) {
							b = a * 0.0;
							break
						} else {
							f = i;
							d = l
						}
					if (f >>> 0 < 1048576 | (f | 0) == 1048576 & d >>> 0 < 0)
						do {
							d = ks(d | 0, f | 0, 1) | 0;
							f = C;
							e = e + -1 | 0
						} while (f >>> 0 < 1048576 | (f | 0) == 1048576 & d >>> 0 < 0);
					if ((e | 0) > 0) {
						o = is(d | 0, f | 0, 0, -1048576) | 0;
						d = C;
						e = ks(e | 0, 0, 52) | 0;
						d = d | C;
						e = o | e
					} else {
						e = hs(d | 0, f | 0, 1 - e | 0) | 0;
						d = C
					}
					c[k >> 2] = e;
					c[k + 4 >> 2] = d | p;
					b = +h[k >> 3]
				} else
					q = 3;
			while (0);
			if ((q | 0) == 3) {
				b = a * b;
				b = b / b
			}
			return +b
		}
		function ki(a, b) {
			a = +a;
			b = +b;
			return  + (+ji(a, b))
		}
		function li(a, b) {
			a = +a;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0;
			h[k >> 3] = a;
			d = c[k >> 2] | 0;
			e = c[k + 4 >> 2] | 0;
			f = hs(d | 0, e | 0, 52) | 0;
			f = f & 2047;
			switch (f | 0) {
			case 0: {
					if (a != 0.0) {
						a = +li(a * 18446744073709551616.0, b);
						d = (c[b >> 2] | 0) + -64 | 0
					} else
						d = 0;
					c[b >> 2] = d;
					break
				}
			case 2047:
				break;
			default: {
					c[b >> 2] = f + -1022;
					c[k >> 2] = d;
					c[k + 4 >> 2] = e & -2146435073 | 1071644672;
					a = +h[k >> 3]
				}
			}
			return +a
		}
		function mi(a, b) {
			a = +a;
			b = b | 0;
			return  + (+li(a, b))
		}
		function ni(a, b) {
			a = +a;
			b = b | 0;
			var d = 0;
			if ((b | 0) > 1023) {
				a = a * 8988465674311579538646525.0e283;
				d = b + -1023 | 0;
				if ((d | 0) > 1023) {
					d = b + -2046 | 0;
					d = (d | 0) > 1023 ? 1023 : d;
					a = a * 8988465674311579538646525.0e283
				}
			} else if ((b | 0) < -1022) {
				a = a * 2.2250738585072014e-308;
				d = b + 1022 | 0;
				if ((d | 0) < -1022) {
					d = b + 2044 | 0;
					d = (d | 0) < -1022 ? -1022 : d;
					a = a * 2.2250738585072014e-308
				}
			} else
				d = b;
			d = ks(d + 1023 | 0, 0, 52) | 0;
			b = C;
			c[k >> 2] = d;
			c[k + 4 >> 2] = b;
			return  + (a * +h[k >> 3])
		}
		function oi(a, b) {
			a = +a;
			b = b | 0;
			return  + (+ni(a, b))
		}
		function pi(a, b, c) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			return qi(0, a, b, (c | 0) != 0 ? c : 4096) | 0
		}
		function qi(b, d, e, f) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			l = i;
			i = i + 16 | 0;
			g = l;
			j = (f | 0) == 0 ? 4100 : f;
			f = c[j >> 2] | 0;
			a : do
				if (!d)
					if (!f)
						f = 0;
					else
						k = 15;
				else {
					h = (b | 0) == 0 ? g : b;
					if (!e)
						f = -2;
					else {
						if (!f) {
							f = a[d >> 0] | 0;
							g = f & 255;
							if (f << 24 >> 24 > -1) {
								c[h >> 2] = g;
								f = f << 24 >> 24 != 0 & 1;
								break
							}
							f = g + -194 | 0;
							if (f >>> 0 > 50) {
								k = 15;
								break
							}
							f = c[3844 + (f << 2) >> 2] | 0;
							g = e + -1 | 0;
							if (g) {
								d = d + 1 | 0;
								k = 9
							}
						} else {
							g = e;
							k = 9
						}
						b : do
							if ((k | 0) == 9) {
								b = a[d >> 0] | 0;
								m = (b & 255) >>> 3;
								if ((m + -16 | m + (f >> 26)) >>> 0 > 7) {
									k = 15;
									break a
								}
								while (1) {
									d = d + 1 | 0;
									f = (b & 255) + -128 | f << 6;
									g = g + -1 | 0;
									if ((f | 0) >= 0)
										break;
									if (!g)
										break b;
									b = a[d >> 0] | 0;
									if ((b & -64) << 24 >> 24 != -128) {
										k = 15;
										break a
									}
								}
								c[j >> 2] = 0;
								c[h >> 2] = f;
								f = e - g | 0;
								break a
							}
						while (0);
						c[j >> 2] = f;
						f = -2
					}
				}
			while (0);
			if ((k | 0) == 15) {
				c[j >> 2] = 0;
				c[(Vh() | 0) >> 2] = 84;
				f = -1
			}
			i = l;
			return f | 0
		}
		function ri(a) {
			a = a | 0;
			if (!a)
				a = 1;
			else
				a = (c[a >> 2] | 0) == 0;
			return a & 1 | 0
		}
		function si(a, b, d, e, f) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0;
			o = i;
			i = i + 1040 | 0;
			l = o + 8 | 0;
			n = o;
			k = c[b >> 2] | 0;
			c[n >> 2] = k;
			m = (a | 0) != 0;
			e = m ? e : 256;
			a = m ? a : l;
			g = k;
			a : do
				if ((e | 0) != 0 & (k | 0) != 0) {
					j = e;
					k = g;
					e = 0;
					while (1) {
						g = d >>> 2;
						h = g >>> 0 >= j >>> 0;
						if (!(d >>> 0 > 131 | h)) {
							g = k;
							break a
						}
						g = h ? j : g;
						d = d - g | 0;
						g = ti(a, n, g, f) | 0;
						if ((g | 0) == -1) {
							e = d;
							break
						}
						p = (a | 0) == (l | 0);
						k = p ? 0 : g;
						h = j - k | 0;
						a = p ? a : a + (g << 2) | 0;
						e = g + e | 0;
						g = c[n >> 2] | 0;
						if ((j | 0) != (k | 0) & (g | 0) != 0) {
							j = h;
							k = g
						} else {
							j = h;
							break a
						}
					}
					d = e;
					j = 0;
					g = c[n >> 2] | 0;
					e = -1
				} else {
					j = e;
					e = 0
				}
			while (0);
			b : do
				if ((g | 0) != 0 ? (j | 0) != 0 & (d | 0) != 0 : 0) {
					h = g;
					g = a;
					while (1) {
						a = qi(g, h, d, f) | 0;
						if ((a + 2 | 0) >>> 0 < 3)
							break;
						h = (c[n >> 2] | 0) + a | 0;
						c[n >> 2] = h;
						j = j + -1 | 0;
						e = e + 1 | 0;
						if (!((j | 0) != 0 & (d | 0) != (a | 0)))
							break b;
						else {
							d = d - a | 0;
							g = g + 4 | 0
						}
					}
					switch (a | 0) {
					case -1: {
							e = -1;
							break b
						}
					case 0: {
							c[n >> 2] = 0;
							break b
						}
					default: {
							c[f >> 2] = 0;
							break b
						}
					}
				}
			while (0);
			if (m)
				c[b >> 2] = c[n >> 2];
			i = o;
			return e | 0
		}
		function ti(b, e, f, g) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = c[e >> 2] | 0;
			if ((g | 0) != 0 ? (i = c[g >> 2] | 0, (i | 0) != 0) : 0)
				if (!b) {
					g = f;
					j = h;
					m = 16
				} else {
					c[g >> 2] = 0;
					l = b;
					g = f;
					k = i;
					m = 37
				}
			else if (!b) {
				g = f;
				m = 7
			} else {
				i = b;
				g = f;
				m = 6
			}
			a : while (1)
				if ((m | 0) == 6) {
					if (!g) {
						m = 26;
						break
					} else
						b = i;
					while (1) {
						i = a[h >> 0] | 0;
						do
							if (((i & 255) + -1 | 0) >>> 0 < 127 ? g >>> 0 > 4 & (h & 3 | 0) == 0 : 0) {
								j = h;
								while (1) {
									h = c[j >> 2] | 0;
									if ((h + -16843009 | h) & -2139062144) {
										i = h;
										h = j;
										m = 32;
										break
									}
									c[b >> 2] = h & 255;
									c[b + 4 >> 2] = d[j + 1 >> 0];
									c[b + 8 >> 2] = d[j + 2 >> 0];
									h = j + 4 | 0;
									i = b + 16 | 0;
									c[b + 12 >> 2] = d[j + 3 >> 0];
									g = g + -4 | 0;
									if (g >>> 0 > 4) {
										b = i;
										j = h
									} else {
										m = 31;
										break
									}
								}
								if ((m | 0) == 31) {
									b = i;
									i = a[h >> 0] | 0;
									break
								} else if ((m | 0) == 32) {
									i = i & 255;
									break
								}
							}
						while (0);
						i = i & 255;
						if ((i + -1 | 0) >>> 0 >= 127)
							break;
						h = h + 1 | 0;
						c[b >> 2] = i;
						g = g + -1 | 0;
						if (!g) {
							m = 26;
							break a
						} else
							b = b + 4 | 0
					}
					i = i + -194 | 0;
					if (i >>> 0 > 50) {
						m = 48;
						break
					}
					l = b;
					k = c[3844 + (i << 2) >> 2] | 0;
					h = h + 1 | 0;
					m = 37;
					continue
				} else if ((m | 0) == 7) {
					i = a[h >> 0] | 0;
					if (((i & 255) + -1 | 0) >>> 0 < 127 ? (h & 3 | 0) == 0 : 0) {
						i = c[h >> 2] | 0;
						if (!((i + -16843009 | i) & -2139062144))
							do {
								h = h + 4 | 0;
								g = g + -4 | 0;
								i = c[h >> 2] | 0
							} while (((i + -16843009 | i) & -2139062144 | 0) == 0);
						i = i & 255
					}
					i = i & 255;
					if ((i + -1 | 0) >>> 0 < 127) {
						g = g + -1 | 0;
						h = h + 1 | 0;
						m = 7;
						continue
					}
					i = i + -194 | 0;
					if (i >>> 0 > 50) {
						m = 48;
						break
					}
					i = c[3844 + (i << 2) >> 2] | 0;
					j = h + 1 | 0;
					m = 16;
					continue
				} else if ((m | 0) == 16) {
					m = (d[j >> 0] | 0) >>> 3;
					if ((m + -16 | m + (i >> 26)) >>> 0 > 7) {
						m = 17;
						break
					}
					h = j + 1 | 0;
					if (i & 33554432) {
						if ((a[h >> 0] & -64) << 24 >> 24 != -128) {
							m = 20;
							break
						}
						h = j + 2 | 0;
						if (i & 524288) {
							if ((a[h >> 0] & -64) << 24 >> 24 != -128) {
								m = 23;
								break
							}
							h = j + 3 | 0
						}
					}
					g = g + -1 | 0;
					m = 7;
					continue
				} else if ((m | 0) == 37) {
					i = d[h >> 0] | 0;
					m = i >>> 3;
					if ((m + -16 | m + (k >> 26)) >>> 0 > 7) {
						m = 38;
						break
					}
					j = h + 1 | 0;
					b = i + -128 | k << 6;
					if ((b | 0) < 0) {
						i = d[j >> 0] | 0;
						if ((i & 192 | 0) != 128) {
							m = 41;
							break
						}
						j = h + 2 | 0;
						b = i + -128 | b << 6;
						if ((b | 0) < 0) {
							i = d[j >> 0] | 0;
							if ((i & 192 | 0) != 128) {
								m = 44;
								break
							}
							b = i + -128 | b << 6;
							h = h + 3 | 0
						} else
							h = j
					} else
						h = j;
					c[l >> 2] = b;
					i = l + 4 | 0;
					g = g + -1 | 0;
					m = 6;
					continue
				}
			if ((m | 0) == 17) {
				h = j + -1 | 0;
				m = 47
			} else if ((m | 0) == 20) {
				h = j + -1 | 0;
				m = 47
			} else if ((m | 0) == 23) {
				h = j + -1 | 0;
				m = 47
			} else if ((m | 0) == 26)
				c[e >> 2] = h;
			else if ((m | 0) == 38) {
				b = l;
				i = k;
				h = h + -1 | 0;
				m = 47
			} else if ((m | 0) == 41) {
				g = l;
				f = h + -1 | 0;
				m = 52
			} else if ((m | 0) == 44) {
				g = l;
				f = h + -1 | 0;
				m = 52
			}
			if ((m | 0) == 47)
				if (!i)
					m = 48;
				else {
					g = b;
					f = h;
					m = 52
				}
			if ((m | 0) == 48)
				if (!(a[h >> 0] | 0)) {
					if (b) {
						c[b >> 2] = 0;
						c[e >> 2] = 0
					}
					f = f - g | 0
				} else {
					g = b;
					f = h;
					m = 52
				}
			if ((m | 0) == 52) {
				c[(Vh() | 0) >> 2] = 84;
				if (!g)
					f = -1;
				else {
					c[e >> 2] = f;
					f = -1
				}
			}
			return f | 0
		}
		function ui(b, e, f) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			j = 0,
			k = 0;
			k = i;
			i = i + 16 | 0;
			g = k;
			a : do
				if (!e)
					g = 0;
				else {
					do
						if (f) {
							j = (b | 0) == 0 ? g : b;
							g = a[e >> 0] | 0;
							b = g & 255;
							if (g << 24 >> 24 > -1) {
								c[j >> 2] = b;
								g = g << 24 >> 24 != 0 & 1;
								break a
							}
							g = b + -194 | 0;
							if (g >>> 0 <= 50) {
								b = e + 1 | 0;
								h = c[3844 + (g << 2) >> 2] | 0;
								if (f >>> 0 < 4 ? (h & -2147483648 >>> ((f * 6 | 0) + -6 | 0) | 0) != 0 : 0)
									break;
								g = d[b >> 0] | 0;
								f = g >>> 3;
								if ((f + -16 | f + (h >> 26)) >>> 0 <= 7) {
									g = g + -128 | h << 6;
									if ((g | 0) >= 0) {
										c[j >> 2] = g;
										g = 2;
										break a
									}
									b = d[e + 2 >> 0] | 0;
									if ((b & 192 | 0) == 128) {
										b = b + -128 | g << 6;
										if ((b | 0) >= 0) {
											c[j >> 2] = b;
											g = 3;
											break a
										}
										g = d[e + 3 >> 0] | 0;
										if ((g & 192 | 0) == 128) {
											c[j >> 2] = g + -128 | b << 6;
											g = 4;
											break a
										}
									}
								}
							}
						}
					while (0);
					c[(Vh() | 0) >> 2] = 84;
					g = -1
				}
			while (0);
			i = k;
			return g | 0
		}
		function vi(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			do
				if (b) {
					if (d >>> 0 < 128) {
						a[b >> 0] = d;
						b = 1;
						break
					}
					if (d >>> 0 < 2048) {
						a[b >> 0] = d >>> 6 | 192;
						a[b + 1 >> 0] = d & 63 | 128;
						b = 2;
						break
					}
					if (d >>> 0 < 55296 | (d & -8192 | 0) == 57344) {
						a[b >> 0] = d >>> 12 | 224;
						a[b + 1 >> 0] = d >>> 6 & 63 | 128;
						a[b + 2 >> 0] = d & 63 | 128;
						b = 3;
						break
					}
					if ((d + -65536 | 0) >>> 0 < 1048576) {
						a[b >> 0] = d >>> 18 | 240;
						a[b + 1 >> 0] = d >>> 12 & 63 | 128;
						a[b + 2 >> 0] = d >>> 6 & 63 | 128;
						a[b + 3 >> 0] = d & 63 | 128;
						b = 4;
						break
					} else {
						c[(Vh() | 0) >> 2] = 84;
						b = -1;
						break
					}
				} else
					b = 1;
			while (0);
			return b | 0
		}
		function wi(a, b, d, e, f) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0;
			m = i;
			i = i + 272 | 0;
			j = m + 8 | 0;
			l = m;
			h = c[b >> 2] | 0;
			c[l >> 2] = h;
			k = (a | 0) != 0;
			f = k ? e : 256;
			e = k ? a : j;
			a = h;
			a : do
				if ((f | 0) != 0 & (h | 0) != 0) {
					h = f;
					g = a;
					f = 0;
					while (1) {
						a = d >>> 0 >= h >>> 0;
						if (!(a | d >>> 0 > 32)) {
							a = g;
							break a
						}
						a = a ? h : d;
						d = d - a | 0;
						a = xi(e, l, a, 0) | 0;
						if ((a | 0) == -1) {
							f = d;
							break
						}
						o = (e | 0) == (j | 0);
						n = o ? 0 : a;
						g = h - n | 0;
						e = o ? e : e + a | 0;
						f = a + f | 0;
						a = c[l >> 2] | 0;
						if ((h | 0) != (n | 0) & (a | 0) != 0) {
							h = g;
							g = a
						} else {
							h = g;
							break a
						}
					}
					d = f;
					h = 0;
					a = c[l >> 2] | 0;
					f = -1
				} else {
					h = f;
					f = 0
				}
			while (0);
			b : do
				if ((a | 0) != 0 ? (h | 0) != 0 & (d | 0) != 0 : 0) {
					g = a;
					a = e;
					while (1) {
						e = vi(a, c[g >> 2] | 0, 0) | 0;
						if ((e + 1 | 0) >>> 0 < 2)
							break;
						g = (c[l >> 2] | 0) + 4 | 0;
						c[l >> 2] = g;
						d = d + -1 | 0;
						f = f + 1 | 0;
						if (!((h | 0) != (e | 0) & (d | 0) != 0))
							break b;
						else {
							h = h - e | 0;
							a = a + e | 0
						}
					}
					if (!e)
						c[l >> 2] = 0;
					else
						f = -1
				}
			while (0);
			if (k)
				c[b >> 2] = c[l >> 2];
			i = m;
			return f | 0
		}
		function xi(b, d, e, f) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			j = 0,
			k = 0;
			k = i;
			i = i + 16 | 0;
			j = k;
			a : do
				if (!b) {
					b = c[d >> 2] | 0;
					f = c[b >> 2] | 0;
					if (!f)
						e = 0;
					else {
						e = 0;
						do {
							if (f >>> 0 > 127) {
								f = vi(j, f, 0) | 0;
								if ((f | 0) == -1) {
									e = -1;
									break a
								}
							} else
								f = 1;
							e = f + e | 0;
							b = b + 4 | 0;
							f = c[b >> 2] | 0
						} while ((f | 0) != 0)
					}
				} else {
					b : do
						if (e >>> 0 > 3) {
							f = e;
							g = c[d >> 2] | 0;
							while (1) {
								h = c[g >> 2] | 0;
								if ((h + -1 | 0) >>> 0 > 126) {
									if (!h)
										break;
									h = vi(b, h, 0) | 0;
									if ((h | 0) == -1) {
										e = -1;
										break a
									}
									b = b + h | 0;
									f = f - h | 0
								} else {
									a[b >> 0] = h;
									b = b + 1 | 0;
									f = f + -1 | 0;
									g = c[d >> 2] | 0
								}
								g = g + 4 | 0;
								c[d >> 2] = g;
								if (f >>> 0 <= 3)
									break b
							}
							a[b >> 0] = 0;
							c[d >> 2] = 0;
							e = e - f | 0;
							break a
						} else
							f = e;
					while (0);
					if (f) {
						g = c[d >> 2] | 0;
						while (1) {
							h = c[g >> 2] | 0;
							if ((h + -1 | 0) >>> 0 > 126) {
								if (!h) {
									g = 19;
									break
								}
								h = vi(j, h, 0) | 0;
								if ((h | 0) == -1) {
									e = -1;
									break a
								}
								if (f >>> 0 < h >>> 0) {
									g = 22;
									break
								}
								vi(b, c[g >> 2] | 0, 0) | 0;
								b = b + h | 0;
								f = f - h | 0
							} else {
								a[b >> 0] = h;
								b = b + 1 | 0;
								f = f + -1 | 0;
								g = c[d >> 2] | 0
							}
							g = g + 4 | 0;
							c[d >> 2] = g;
							if (!f)
								break a
						}
						if ((g | 0) == 19) {
							a[b >> 0] = 0;
							c[d >> 2] = 0;
							e = e - f | 0;
							break
						} else if ((g | 0) == 22) {
							e = e - f | 0;
							break
						}
					}
				}
			while (0);
			i = k;
			return e | 0
		}
		function yi(a, b) {
			a = a | 0;
			b = b | 0;
			if (!a)
				a = 0;
			else
				a = vi(a, b, 0) | 0;
			return a | 0
		}
		function zi(a) {
			a = a | 0;
			return 0
		}
		function Ai(a) {
			a = a | 0;
			return
		}
		function Bi(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0;
			e = a + 84 | 0;
			g = c[e >> 2] | 0;
			h = d + 256 | 0;
			f = Qi(g, 0, h) | 0;
			f = (f | 0) == 0 ? h : f - g | 0;
			d = f >>> 0 < d >>> 0 ? f : d;
			js(b | 0, g | 0, d | 0) | 0;
			c[a + 4 >> 2] = g + d;
			b = g + f | 0;
			c[a + 8 >> 2] = b;
			c[e >> 2] = b;
			return d | 0
		}
		function Ci(b) {
			b = b | 0;
			var d = 0,
			e = 0;
			d = b + 74 | 0;
			e = a[d >> 0] | 0;
			a[d >> 0] = e + 255 | e;
			d = b + 20 | 0;
			e = b + 44 | 0;
			if ((c[d >> 2] | 0) >>> 0 > (c[e >> 2] | 0) >>> 0)
				pb[c[b + 36 >> 2] & 31](b, 0, 0) | 0;
			c[b + 16 >> 2] = 0;
			c[b + 28 >> 2] = 0;
			c[d >> 2] = 0;
			d = c[b >> 2] | 0;
			if (d & 20)
				if (!(d & 4))
					d = -1;
				else {
					c[b >> 2] = d | 32;
					d = -1
				}
			else {
				d = c[e >> 2] | 0;
				c[b + 8 >> 2] = d;
				c[b + 4 >> 2] = d;
				d = 0
			}
			return d | 0
		}
		function Di(b) {
			b = b | 0;
			var d = 0,
			e = 0;
			d = b + 74 | 0;
			e = a[d >> 0] | 0;
			a[d >> 0] = e + 255 | e;
			d = c[b >> 2] | 0;
			if (!(d & 8)) {
				c[b + 8 >> 2] = 0;
				c[b + 4 >> 2] = 0;
				d = c[b + 44 >> 2] | 0;
				c[b + 28 >> 2] = d;
				c[b + 20 >> 2] = d;
				c[b + 16 >> 2] = d + (c[b + 48 >> 2] | 0);
				d = 0
			} else {
				c[b >> 2] = d | 32;
				d = -1
			}
			return d | 0
		}
		function Ei(a) {
			a = a | 0;
			var b = 0,
			e = 0;
			e = i;
			i = i + 16 | 0;
			b = e;
			if ((c[a + 8 >> 2] | 0) == 0 ? (Ci(a) | 0) != 0 : 0)
				b = -1;
			else if ((pb[c[a + 32 >> 2] & 31](a, b, 1) | 0) == 1)
				b = d[b >> 0] | 0;
			else
				b = -1;
			i = e;
			return b | 0
		}
		function Fi(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0,
			i = 0;
			f = e + 16 | 0;
			g = c[f >> 2] | 0;
			if (!g)
				if (!(Di(e) | 0)) {
					g = c[f >> 2] | 0;
					h = 4
				} else
					f = 0;
			else
				h = 4;
			a : do
				if ((h | 0) == 4) {
					i = e + 20 | 0;
					h = c[i >> 2] | 0;
					if ((g - h | 0) >>> 0 < d >>> 0) {
						f = pb[c[e + 36 >> 2] & 31](e, b, d) | 0;
						break
					}
					b : do
						if ((a[e + 75 >> 0] | 0) > -1) {
							f = d;
							while (1) {
								if (!f) {
									g = h;
									f = 0;
									break b
								}
								g = f + -1 | 0;
								if ((a[b + g >> 0] | 0) == 10)
									break;
								else
									f = g
							}
							if ((pb[c[e + 36 >> 2] & 31](e, b, f) | 0) >>> 0 < f >>> 0)
								break a;
							d = d - f | 0;
							b = b + f | 0;
							g = c[i >> 2] | 0
						} else {
							g = h;
							f = 0
						}
					while (0);
					js(g | 0, b | 0, d | 0) | 0;
					c[i >> 2] = (c[i >> 2] | 0) + d;
					f = f + d | 0
				}
			while (0);
			return f | 0
		}
		function Gi(a, b, d, e) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0;
			f = i;
			i = i + 16 | 0;
			g = f;
			c[g >> 2] = e;
			e = Li(a, b, d, g) | 0;
			i = f;
			return e | 0
		}
		function Hi(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0;
			e = i;
			i = i + 16 | 0;
			f = e;
			c[f >> 2] = d;
			d = Mi(a, b, f) | 0;
			i = e;
			return d | 0
		}
		function Ii(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			j = 0;
			j = i;
			i = i + 16 | 0;
			e = j;
			f = fj(240) | 0;
			do
				if (f) {
					c[e >> 2] = c[d >> 2];
					e = Li(f, 240, b, e) | 0;
					if (e >>> 0 < 240) {
						b = ij(f, e + 1 | 0) | 0;
						c[a >> 2] = (b | 0) != 0 ? b : f;
						break
					}
					gj(f);
					if ((e | 0) >= 0 ? (h = e + 1 | 0, g = fj(h) | 0, c[a >> 2] = g, (g | 0) != 0) : 0)
						e = Li(g, h, b, d) | 0;
					else
						e = -1
				} else
					e = -1;
			while (0);
			i = j;
			return e | 0
		}
		function Ji(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0;
			s = i;
			i = i + 224 | 0;
			o = s + 80 | 0;
			r = s + 96 | 0;
			q = s;
			p = s + 136 | 0;
			f = r;
			g = f + 40 | 0;
			do {
				c[f >> 2] = 0;
				f = f + 4 | 0
			} while ((f | 0) < (g | 0));
			c[o >> 2] = c[e >> 2];
			if ((Zi(0, d, o, q, r) | 0) < 0)
				e = -1;
			else {
				if ((c[b + 76 >> 2] | 0) > -1)
					m = zi(b) | 0;
				else
					m = 0;
				e = c[b >> 2] | 0;
				n = e & 32;
				if ((a[b + 74 >> 0] | 0) < 1)
					c[b >> 2] = e & -33;
				e = b + 48 | 0;
				if (!(c[e >> 2] | 0)) {
					g = b + 44 | 0;
					h = c[g >> 2] | 0;
					c[g >> 2] = p;
					j = b + 28 | 0;
					c[j >> 2] = p;
					k = b + 20 | 0;
					c[k >> 2] = p;
					c[e >> 2] = 80;
					l = b + 16 | 0;
					c[l >> 2] = p + 80;
					f = Zi(b, d, o, q, r) | 0;
					if (h) {
						pb[c[b + 36 >> 2] & 31](b, 0, 0) | 0;
						f = (c[k >> 2] | 0) == 0 ? -1 : f;
						c[g >> 2] = h;
						c[e >> 2] = 0;
						c[l >> 2] = 0;
						c[j >> 2] = 0;
						c[k >> 2] = 0
					}
				} else
					f = Zi(b, d, o, q, r) | 0;
				e = c[b >> 2] | 0;
				c[b >> 2] = e | n;
				if (m)
					Ai(b);
				e = (e & 32 | 0) == 0 ? f : -1
			}
			i = s;
			return e | 0
		}
		function Ki(e, f, j) {
			e = e | 0;
			f = f | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0.0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			D = 0,
			E = 0,
			F = 0,
			G = 0,
			H = 0,
			I = 0,
			J = 0,
			K = 0,
			L = 0,
			M = 0,
			N = 0,
			O = 0,
			P = 0,
			Q = 0;
			P = i;
			i = i + 304 | 0;
			H = P + 16 | 0;
			J = P + 8 | 0;
			I = P + 33 | 0;
			K = P;
			y = P + 32 | 0;
			if ((c[e + 76 >> 2] | 0) > -1)
				O = zi(e) | 0;
			else
				O = 0;
			k = a[f >> 0] | 0;
			a : do
				if (k << 24 >> 24) {
					L = e + 4 | 0;
					M = e + 100 | 0;
					G = e + 108 | 0;
					z = e + 8 | 0;
					A = I + 10 | 0;
					B = I + 33 | 0;
					D = J + 4 | 0;
					E = I + 46 | 0;
					F = I + 94 | 0;
					m = k;
					k = 0;
					n = f;
					s = 0;
					l = 0;
					f = 0;
					b : while (1) {
						c : do
							if (!(Th(m & 255) | 0)) {
								m = (a[n >> 0] | 0) == 37;
								d : do
									if (m) {
										q = n + 1 | 0;
										o = a[q >> 0] | 0;
										e : do
											switch (o << 24 >> 24) {
											case 37:
												break d;
											case 42: {
													x = 0;
													o = n + 2 | 0;
													break
												}
											default: {
													o = (o & 255) + -48 | 0;
													if (o >>> 0 < 10 ? (a[n + 2 >> 0] | 0) == 36 : 0) {
														c[H >> 2] = c[j >> 2];
														while (1) {
															x = (c[H >> 2] | 0) + (4 - 1) & ~(4 - 1);
															m = c[x >> 2] | 0;
															c[H >> 2] = x + 4;
															if (o >>> 0 > 1)
																o = o + -1 | 0;
															else
																break
														}
														x = m;
														o = n + 3 | 0;
														break e
													}
													o = (c[j >> 2] | 0) + (4 - 1) & ~(4 - 1);
													x = c[o >> 2] | 0;
													c[j >> 2] = o + 4;
													o = q
												}
											}
										while (0);
										m = a[o >> 0] | 0;
										n = m & 255;
										if ((n + -48 | 0) >>> 0 < 10) {
											m = 0;
											while (1) {
												q = (m * 10 | 0) + -48 + n | 0;
												o = o + 1 | 0;
												m = a[o >> 0] | 0;
												n = m & 255;
												if ((n + -48 | 0) >>> 0 >= 10)
													break;
												else
													m = q
											}
										} else
											q = 0;
										if (m << 24 >> 24 == 109) {
											o = o + 1 | 0;
											r = a[o >> 0] | 0;
											m = (x | 0) != 0 & 1;
											l = 0;
											f = 0
										} else {
											r = m;
											m = 0
										}
										n = o + 1 | 0;
										switch (r & 255 | 0) {
										case 104: {
												w = (a[n >> 0] | 0) == 104;
												n = w ? o + 2 | 0 : n;
												o = w ? -2 : -1;
												break
											}
										case 108: {
												w = (a[n >> 0] | 0) == 108;
												n = w ? o + 2 | 0 : n;
												o = w ? 3 : 1;
												break
											}
										case 106: {
												o = 3;
												break
											}
										case 116:
										case 122: {
												o = 1;
												break
											}
										case 76: {
												o = 2;
												break
											}
										case 110:
										case 112:
										case 67:
										case 83:
										case 91:
										case 99:
										case 115:
										case 88:
										case 71:
										case 70:
										case 69:
										case 65:
										case 103:
										case 102:
										case 101:
										case 97:
										case 120:
										case 117:
										case 111:
										case 105:
										case 100: {
												n = o;
												o = 0;
												break
											}
										default: {
												N = 152;
												break b
											}
										}
										r = d[n >> 0] | 0;
										t = (r & 47 | 0) == 3;
										r = t ? r | 32 : r;
										t = t ? 1 : o;
										switch (r | 0) {
										case 99: {
												w = s;
												v = (q | 0) < 1 ? 1 : q;
												break
											}
										case 91: {
												w = s;
												v = q;
												break
											}
										case 110: {
												if (!x) {
													o = s;
													break c
												}
												switch (t | 0) {
												case -2: {
														a[x >> 0] = s;
														o = s;
														break c
													}
												case -1: {
														b[x >> 1] = s;
														o = s;
														break c
													}
												case 0: {
														c[x >> 2] = s;
														o = s;
														break c
													}
												case 1: {
														c[x >> 2] = s;
														o = s;
														break c
													}
												case 3: {
														o = x;
														c[o >> 2] = s;
														c[o + 4 >> 2] = ((s | 0) < 0) << 31 >> 31;
														o = s;
														break c
													}
												default: {
														o = s;
														break c
													}
												}
											}
										default: {
												Zh(e, 0);
												do {
													o = c[L >> 2] | 0;
													if (o >>> 0 < (c[M >> 2] | 0) >>> 0) {
														c[L >> 2] = o + 1;
														o = d[o >> 0] | 0
													} else
														o = _h(e) | 0
												} while ((Th(o) | 0) != 0);
												o = c[L >> 2] | 0;
												if (c[M >> 2] | 0) {
													o = o + -1 | 0;
													c[L >> 2] = o
												}
												w = (c[G >> 2] | 0) + s + o - (c[z >> 2] | 0) | 0;
												v = q
											}
										}
										Zh(e, v);
										o = c[L >> 2] | 0;
										q = c[M >> 2] | 0;
										if (o >>> 0 < q >>> 0)
											c[L >> 2] = o + 1;
										else {
											if ((_h(e) | 0) < 0) {
												N = 152;
												break b
											}
											q = c[M >> 2] | 0
										}
										if (q)
											c[L >> 2] = (c[L >> 2] | 0) + -1;
										f : do
											switch (r | 0) {
											case 91:
											case 99:
											case 115: {
													u = (r | 0) == 99;
													g : do
														if ((r & 239 | 0) == 99) {
															gs(I | 0, -1, 257) | 0;
															a[I >> 0] = 0;
															if ((r | 0) == 115) {
																a[B >> 0] = 0;
																a[A >> 0] = 0;
																a[A + 1 >> 0] = 0;
																a[A + 2 >> 0] = 0;
																a[A + 3 >> 0] = 0;
																a[A + 4 >> 0] = 0
															}
														} else {
															Q = n + 1 | 0;
															s = (a[Q >> 0] | 0) == 94;
															o = s & 1;
															r = s ? Q : n;
															n = s ? n + 2 | 0 : Q;
															gs(I | 0, s & 1 | 0, 257) | 0;
															a[I >> 0] = 0;
															switch (a[n >> 0] | 0) {
															case 45: {
																	s = (o^1) & 255;
																	a[E >> 0] = s;
																	n = r + 2 | 0;
																	break
																}
															case 93: {
																	s = (o^1) & 255;
																	a[F >> 0] = s;
																	n = r + 2 | 0;
																	break
																}
															default:
																s = (o^1) & 255
															}
															while (1) {
																o = a[n >> 0] | 0;
																h : do
																	switch (o << 24 >> 24) {
																	case 0: {
																			N = 152;
																			break b
																		}
																	case 93:
																		break g;
																	case 45: {
																			r = n + 1 | 0;
																			o = a[r >> 0] | 0;
																			switch (o << 24 >> 24) {
																			case 93:
																			case 0: {
																					o = 45;
																					break h
																				}
																			default: {}

																			}
																			n = a[n + -1 >> 0] | 0;
																			if ((n & 255) < (o & 255)) {
																				n = n & 255;
																				do {
																					n = n + 1 | 0;
																					a[I + n >> 0] = s;
																					o = a[r >> 0] | 0
																				} while ((n | 0) < (o & 255 | 0));
																				n = r
																			} else
																				n = r;
																			break
																		}
																	default: {}

																	}
																while (0);
																a[I + ((o & 255) + 1) >> 0] = s;
																n = n + 1 | 0
															}
														}
													while (0);
													r = u ? v + 1 | 0 : 31;
													s = (t | 0) == 1;
													t = (m | 0) != 0;
													i : do
														if (s) {
															if (t) {
																f = fj(r << 2) | 0;
																if (!f) {
																	l = 0;
																	N = 152;
																	break b
																}
															} else
																f = x;
															c[J >> 2] = 0;
															c[D >> 2] = 0;
															l = 0;
															j : while (1) {
																q = (f | 0) == 0;
																do {
																	k : while (1) {
																		o = c[L >> 2] | 0;
																		if (o >>> 0 < (c[M >> 2] | 0) >>> 0) {
																			c[L >> 2] = o + 1;
																			o = d[o >> 0] | 0
																		} else
																			o = _h(e) | 0;
																		if (!(a[I + (o + 1) >> 0] | 0))
																			break j;
																		a[y >> 0] = o;
																		switch (qi(K, y, 1, J) | 0) {
																		case -1: {
																				l = 0;
																				N = 152;
																				break b
																			}
																		case -2:
																			break;
																		default:
																			break k
																		}
																	}
																	if (!q) {
																		c[f + (l << 2) >> 2] = c[K >> 2];
																		l = l + 1 | 0
																	}
																} while (!(t & (l | 0) == (r | 0)));
																l = r << 1 | 1;
																o = ij(f, l << 2) | 0;
																if (!o) {
																	l = 0;
																	N = 152;
																	break b
																}
																Q = r;
																r = l;
																f = o;
																l = Q
															}
															if (!(ri(J) | 0)) {
																l = 0;
																N = 152;
																break b
															} else {
																q = l;
																l = 0
															}
														} else {
															if (t) {
																l = fj(r) | 0;
																if (!l) {
																	l = 0;
																	f = 0;
																	N = 152;
																	break b
																} else
																	o = 0;
																while (1) {
																	do {
																		f = c[L >> 2] | 0;
																		if (f >>> 0 < (c[M >> 2] | 0) >>> 0) {
																			c[L >> 2] = f + 1;
																			f = d[f >> 0] | 0
																		} else
																			f = _h(e) | 0;
																		if (!(a[I + (f + 1) >> 0] | 0)) {
																			q = o;
																			f = 0;
																			break i
																		}
																		a[l + o >> 0] = f;
																		o = o + 1 | 0
																	} while ((o | 0) != (r | 0));
																	f = r << 1 | 1;
																	o = ij(l, f) | 0;
																	if (!o) {
																		f = 0;
																		N = 152;
																		break b
																	} else {
																		Q = r;
																		r = f;
																		l = o;
																		o = Q
																	}
																}
															}
															if (!x) {
																l = q;
																while (1) {
																	f = c[L >> 2] | 0;
																	if (f >>> 0 < l >>> 0) {
																		c[L >> 2] = f + 1;
																		f = d[f >> 0] | 0
																	} else
																		f = _h(e) | 0;
																	if (!(a[I + (f + 1) >> 0] | 0)) {
																		q = 0;
																		l = 0;
																		f = 0;
																		break i
																	}
																	l = c[M >> 2] | 0
																}
															} else {
																l = 0;
																while (1) {
																	f = c[L >> 2] | 0;
																	if (f >>> 0 < q >>> 0) {
																		c[L >> 2] = f + 1;
																		f = d[f >> 0] | 0
																	} else
																		f = _h(e) | 0;
																	if (!(a[I + (f + 1) >> 0] | 0)) {
																		q = l;
																		l = x;
																		f = 0;
																		break i
																	}
																	a[x + l >> 0] = f;
																	q = c[M >> 2] | 0;
																	l = l + 1 | 0
																}
															}
														}
													while (0);
													o = c[L >> 2] | 0;
													if (c[M >> 2] | 0) {
														o = o + -1 | 0;
														c[L >> 2] = o
													}
													o = o - (c[z >> 2] | 0) + (c[G >> 2] | 0) | 0;
													if (!o)
														break b;
													if (!((o | 0) == (v | 0) | u^1))
														break b;
													do
														if (t)
															if (s) {
																c[x >> 2] = f;
																break
															} else {
																c[x >> 2] = l;
																break
															}
													while (0);
													if (!u) {
														if (f)
															c[f + (q << 2) >> 2] = 0;
														if (!l) {
															l = 0;
															break f
														}
														a[l + q >> 0] = 0
													}
													break
												}
											case 120:
											case 88:
											case 112: {
													o = 16;
													N = 134;
													break
												}
											case 111: {
													o = 8;
													N = 134;
													break
												}
											case 117:
											case 100: {
													o = 10;
													N = 134;
													break
												}
											case 105: {
													o = 0;
													N = 134;
													break
												}
											case 71:
											case 103:
											case 70:
											case 102:
											case 69:
											case 101:
											case 65:
											case 97: {
													p = +Xh(e, t, 0);
													if ((c[G >> 2] | 0) == ((c[z >> 2] | 0) - (c[L >> 2] | 0) | 0))
														break b;
													if (x)
														switch (t | 0) {
														case 0: {
																g[x >> 2] = p;
																break f
															}
														case 1: {
																h[x >> 3] = p;
																break f
															}
														case 2: {
																h[x >> 3] = p;
																break f
															}
														default:
															break f
														}
													break
												}
											default: {}

											}
										while (0);
										l : do
											if ((N | 0) == 134) {
												N = 0;
												o = Yh(e, o, 0, -1, -1) | 0;
												if ((c[G >> 2] | 0) == ((c[z >> 2] | 0) - (c[L >> 2] | 0) | 0))
													break b;
												if ((x | 0) != 0 & (r | 0) == 112) {
													c[x >> 2] = o;
													break
												}
												if (x)
													switch (t | 0) {
													case -2: {
															a[x >> 0] = o;
															break l
														}
													case -1: {
															b[x >> 1] = o;
															break l
														}
													case 0: {
															c[x >> 2] = o;
															break l
														}
													case 1: {
															c[x >> 2] = o;
															break l
														}
													case 3: {
															Q = x;
															c[Q >> 2] = o;
															c[Q + 4 >> 2] = C;
															break l
														}
													default:
														break l
													}
											}
										while (0);
										k = ((x | 0) != 0 & 1) + k | 0;
										o = (c[G >> 2] | 0) + w + (c[L >> 2] | 0) - (c[z >> 2] | 0) | 0;
										break c
									}
								while (0);
								n = n + (m & 1) | 0;
								Zh(e, 0);
								m = c[L >> 2] | 0;
								if (m >>> 0 < (c[M >> 2] | 0) >>> 0) {
									c[L >> 2] = m + 1;
									m = d[m >> 0] | 0
								} else
									m = _h(e) | 0;
								if ((m | 0) != (d[n >> 0] | 0)) {
									N = 21;
									break b
								}
								o = s + 1 | 0
							} else {
								while (1) {
									m = n + 1 | 0;
									if (!(Th(d[m >> 0] | 0) | 0))
										break;
									else
										n = m
								}
								Zh(e, 0);
								do {
									m = c[L >> 2] | 0;
									if (m >>> 0 < (c[M >> 2] | 0) >>> 0) {
										c[L >> 2] = m + 1;
										m = d[m >> 0] | 0
									} else
										m = _h(e) | 0
								} while ((Th(m) | 0) != 0);
								m = c[L >> 2] | 0;
								if (c[M >> 2] | 0) {
									m = m + -1 | 0;
									c[L >> 2] = m
								}
								o = (c[G >> 2] | 0) + s + m - (c[z >> 2] | 0) | 0
							}
						while (0);
						n = n + 1 | 0;
						m = a[n >> 0] | 0;
						if (!(m << 24 >> 24))
							break a;
						else
							s = o
					}
					if ((N | 0) == 21) {
						if (c[M >> 2] | 0)
							c[L >> 2] = (c[L >> 2] | 0) + -1;
						if ((k | 0) != 0 | (m | 0) > -1)
							break;
						else {
							k = 0;
							N = 153
						}
					} else if ((N | 0) == 152)
						if (!k) {
							k = m;
							N = 153
						}
					if ((N | 0) == 153) {
						m = k;
						k = -1
					}
					if (m) {
						gj(l);
						gj(f)
					}
				} else
					k = 0;
			while (0);
			if (O)
				Ai(e);
			i = P;
			return k | 0
		}
		function Li(b, d, e, f) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0;
			n = i;
			i = i + 128 | 0;
			g = n + 112 | 0;
			m = n;
			h = m;
			j = 4104;
			k = h + 112 | 0;
			do {
				c[h >> 2] = c[j >> 2];
				h = h + 4 | 0;
				j = j + 4 | 0
			} while ((h | 0) < (k | 0));
			if ((d + -1 | 0) >>> 0 > 2147483646)
				if (!d) {
					d = 1;
					l = 4
				} else {
					c[(Vh() | 0) >> 2] = 75;
					d = -1
				}
			else {
				g = b;
				l = 4
			}
			if ((l | 0) == 4) {
				l = -2 - g | 0;
				l = d >>> 0 > l >>> 0 ? l : d;
				c[m + 48 >> 2] = l;
				b = m + 20 | 0;
				c[b >> 2] = g;
				c[m + 44 >> 2] = g;
				d = g + l | 0;
				g = m + 16 | 0;
				c[g >> 2] = d;
				c[m + 28 >> 2] = d;
				d = Ji(m, e, f) | 0;
				if (l) {
					e = c[b >> 2] | 0;
					a[e + (((e | 0) == (c[g >> 2] | 0)) << 31 >> 31) >> 0] = 0
				}
			}
			i = n;
			return d | 0
		}
		function Mi(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0;
			g = i;
			i = i + 112 | 0;
			e = g;
			f = e;
			h = f + 112 | 0;
			do {
				c[f >> 2] = 0;
				f = f + 4 | 0
			} while ((f | 0) < (h | 0));
			c[e + 32 >> 2] = 17;
			c[e + 44 >> 2] = a;
			c[e + 76 >> 2] = -1;
			c[e + 84 >> 2] = a;
			h = Ki(e, b, d) | 0;
			i = g;
			return h | 0
		}
		function Ni(a, b, c) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			return  + (+$i(a, b, 2))
		}
		function Oi(a, b, c) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			a = aj(a, b, c, -1, -1) | 0;
			return a | 0
		}
		function Pi(a, b, c) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			a = aj(a, b, c, 0, -2147483648) | 0;
			return a | 0
		}
		function Qi(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0,
			i = 0;
			h = d & 255;
			f = (e | 0) != 0;
			a : do
				if (f & (b & 3 | 0) != 0) {
					g = d & 255;
					while (1) {
						if ((a[b >> 0] | 0) == g << 24 >> 24) {
							i = 6;
							break a
						}
						b = b + 1 | 0;
						e = e + -1 | 0;
						f = (e | 0) != 0;
						if (!(f & (b & 3 | 0) != 0)) {
							i = 5;
							break
						}
					}
				} else
					i = 5;
			while (0);
			if ((i | 0) == 5)
				if (f)
					i = 6;
				else
					e = 0;
			b : do
				if ((i | 0) == 6) {
					g = d & 255;
					if ((a[b >> 0] | 0) != g << 24 >> 24) {
						f = _(h, 16843009) | 0;
						c : do
							if (e >>> 0 > 3)
								while (1) {
									h = c[b >> 2]^f;
									if ((h & -2139062144^-2139062144) & h + -16843009)
										break;
									b = b + 4 | 0;
									e = e + -4 | 0;
									if (e >>> 0 <= 3) {
										i = 11;
										break c
									}
								}
							else
								i = 11;
						while (0);
						if ((i | 0) == 11)
							if (!e) {
								e = 0;
								break
							}
						while (1) {
							if ((a[b >> 0] | 0) == g << 24 >> 24)
								break b;
							b = b + 1 | 0;
							e = e + -1 | 0;
							if (!e) {
								e = 0;
								break
							}
						}
					}
				}
			while (0);
			return ((e | 0) != 0 ? b : 0) | 0
		}
		function Ri(b, c, d) {
			b = b | 0;
			c = c | 0;
			d = d | 0;
			var e = 0,
			f = 0;
			a : do
				if (!d)
					d = 0;
				else {
					f = d;
					e = b;
					while (1) {
						b = a[e >> 0] | 0;
						d = a[c >> 0] | 0;
						if (b << 24 >> 24 != d << 24 >> 24)
							break;
						f = f + -1 | 0;
						if (!f) {
							d = 0;
							break a
						} else {
							e = e + 1 | 0;
							c = c + 1 | 0
						}
					}
					d = (b & 255) - (d & 255) | 0
				}
			while (0);
			return d | 0
		}
		function Si(b, c) {
			b = b | 0;
			c = c | 0;
			var d = 0,
			e = 0;
			e = a[b >> 0] | 0;
			d = a[c >> 0] | 0;
			if (e << 24 >> 24 == 0 ? 1 : e << 24 >> 24 != d << 24 >> 24)
				c = e;
			else {
				do {
					b = b + 1 | 0;
					c = c + 1 | 0;
					e = a[b >> 0] | 0;
					d = a[c >> 0] | 0
				} while (!(e << 24 >> 24 == 0 ? 1 : e << 24 >> 24 != d << 24 >> 24));
				c = e
			}
			return (c & 255) - (d & 255) | 0
		}
		function Ti(b) {
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0;
			f = b;
			a : do
				if (!(f & 3))
					e = 4;
				else {
					d = b;
					b = f;
					while (1) {
						if (!(a[d >> 0] | 0))
							break a;
						d = d + 1 | 0;
						b = d;
						if (!(b & 3)) {
							b = d;
							e = 4;
							break
						}
					}
				}
			while (0);
			if ((e | 0) == 4) {
				while (1) {
					d = c[b >> 2] | 0;
					if (!((d & -2139062144^-2139062144) & d + -16843009))
						b = b + 4 | 0;
					else
						break
				}
				if ((d & 255) << 24 >> 24)
					do
						b = b + 1 | 0;
					while ((a[b >> 0] | 0) != 0)
			}
			return b - f | 0
		}
		function Ui(a) {
			a = a | 0;
			var b = 0;
			b = a;
			while (1)
				if (!(c[b >> 2] | 0))
					break;
				else
					b = b + 4 | 0;
			return b - a >> 2 | 0
		}
		function Vi(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0;
			if (d) {
				e = a;
				while (1) {
					d = d + -1 | 0;
					c[e >> 2] = c[b >> 2];
					if (!d)
						break;
					else {
						b = b + 4 | 0;
						e = e + 4 | 0
					}
				}
			}
			return a | 0
		}
		function Wi(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0;
			e = (d | 0) == 0;
			if (a - b >> 2 >>> 0 < d >>> 0) {
				if (!e)
					do {
						d = d + -1 | 0;
						c[a + (d << 2) >> 2] = c[b + (d << 2) >> 2]
					} while ((d | 0) != 0)
			} else if (!e) {
				e = b;
				b = a;
				while (1) {
					d = d + -1 | 0;
					c[b >> 2] = c[e >> 2];
					if (!d)
						break;
					else {
						e = e + 4 | 0;
						b = b + 4 | 0
					}
				}
			}
			return a | 0
		}
		function Xi(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0;
			if (d) {
				e = a;
				while (1) {
					d = d + -1 | 0;
					c[e >> 2] = b;
					if (!d)
						break;
					else
						e = e + 4 | 0
				}
			}
			return a | 0
		}
		function Yi(a, b) {
			a = a | 0;
			b = b | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0;
			i = a + 4 | 0;
			e = c[i >> 2] | 0;
			j = a + 100 | 0;
			if (e >>> 0 < (c[j >> 2] | 0) >>> 0) {
				c[i >> 2] = e + 1;
				e = d[e >> 0] | 0
			} else
				e = _h(a) | 0;
			switch (e | 0) {
			case 43:
			case 45: {
					f = (e | 0) == 45 & 1;
					e = c[i >> 2] | 0;
					if (e >>> 0 < (c[j >> 2] | 0) >>> 0) {
						c[i >> 2] = e + 1;
						e = d[e >> 0] | 0
					} else
						e = _h(a) | 0;
					if ((b | 0) != 0 & (e + -48 | 0) >>> 0 > 9 ? (c[j >> 2] | 0) != 0 : 0) {
						c[i >> 2] = (c[i >> 2] | 0) + -1;
						h = f
					} else
						h = f;
					break
				}
			default:
				h = 0
			}
			if ((e + -48 | 0) >>> 0 > 9)
				if (!(c[j >> 2] | 0)) {
					f = -2147483648;
					e = 0
				} else {
					c[i >> 2] = (c[i >> 2] | 0) + -1;
					f = -2147483648;
					e = 0
				}
			else {
				f = 0;
				do {
					f = e + -48 + (f * 10 | 0) | 0;
					e = c[i >> 2] | 0;
					if (e >>> 0 < (c[j >> 2] | 0) >>> 0) {
						c[i >> 2] = e + 1;
						e = d[e >> 0] | 0
					} else
						e = _h(a) | 0
				} while ((e + -48 | 0) >>> 0 < 10 & (f | 0) < 214748364);
				b = ((f | 0) < 0) << 31 >> 31;
				if ((e + -48 | 0) >>> 0 < 10) {
					do {
						b = rs(f | 0, b | 0, 10, 0) | 0;
						f = C;
						e = is(e | 0, ((e | 0) < 0) << 31 >> 31 | 0, -48, -1) | 0;
						f = is(e | 0, C | 0, b | 0, f | 0) | 0;
						b = C;
						e = c[i >> 2] | 0;
						if (e >>> 0 < (c[j >> 2] | 0) >>> 0) {
							c[i >> 2] = e + 1;
							e = d[e >> 0] | 0
						} else
							e = _h(a) | 0
					} while ((e + -48 | 0) >>> 0 < 10 & ((b | 0) < 21474836 | (b | 0) == 21474836 & f >>> 0 < 2061584302));
					g = f
				} else
					g = f;
				if ((e + -48 | 0) >>> 0 < 10)
					do {
						e = c[i >> 2] | 0;
						if (e >>> 0 < (c[j >> 2] | 0) >>> 0) {
							c[i >> 2] = e + 1;
							e = d[e >> 0] | 0
						} else
							e = _h(a) | 0
					} while ((e + -48 | 0) >>> 0 < 10);
				if (c[j >> 2] | 0)
					c[i >> 2] = (c[i >> 2] | 0) + -1;
				a = (h | 0) != 0;
				e = fs(0, 0, g | 0, b | 0) | 0;
				f = a ? C : b;
				e = a ? e : g
			}
			C = f;
			return e | 0
		}
		function Zi(e, f, g, j, l) {
			e = e | 0;
			f = f | 0;
			g = g | 0;
			j = j | 0;
			l = l | 0;
			var m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0.0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0.0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			D = 0,
			E = 0,
			F = 0,
			G = 0,
			H = 0,
			I = 0,
			J = 0,
			K = 0,
			L = 0,
			M = 0,
			N = 0,
			O = 0,
			P = 0,
			Q = 0,
			R = 0,
			S = 0,
			T = 0,
			U = 0,
			V = 0,
			W = 0,
			X = 0,
			Y = 0,
			Z = 0,
			$ = 0,
			aa = 0,
			ba = 0,
			ca = 0,
			da = 0,
			ea = 0,
			fa = 0,
			ga = 0,
			ha = 0;
			ha = i;
			i = i + 624 | 0;
			ca = ha + 24 | 0;
			ea = ha + 16 | 0;
			da = ha + 588 | 0;
			Y = ha + 576 | 0;
			ba = ha;
			V = ha + 536 | 0;
			ga = ha + 8 | 0;
			fa = ha + 528 | 0;
			M = (e | 0) != 0;
			N = V + 40 | 0;
			U = N;
			V = V + 39 | 0;
			W = ga + 4 | 0;
			X = Y + 12 | 0;
			Y = Y + 11 | 0;
			Z = da;
			$ = X;
			aa = $ - Z | 0;
			O = -2 - Z | 0;
			P = $ + 2 | 0;
			Q = ca + 288 | 0;
			R = da + 9 | 0;
			S = R;
			T = da + 8 | 0;
			m = 0;
			w = f;
			n = 0;
			f = 0;
			a : while (1) {
				do
					if ((m | 0) > -1)
						if ((n | 0) > (2147483647 - m | 0)) {
							c[(Vh() | 0) >> 2] = 75;
							m = -1;
							break
						} else {
							m = n + m | 0;
							break
						}
				while (0);
				n = a[w >> 0] | 0;
				if (!(n << 24 >> 24)) {
					L = 245;
					break
				} else
					o = w;
				b : while (1) {
					switch (n << 24 >> 24) {
					case 37: {
							n = o;
							L = 9;
							break b
						}
					case 0: {
							n = o;
							break b
						}
					default: {}

					}
					K = o + 1 | 0;
					n = a[K >> 0] | 0;
					o = K
				}
				c : do
					if ((L | 0) == 9)
						while (1) {
							L = 0;
							if ((a[n + 1 >> 0] | 0) != 37)
								break c;
							o = o + 1 | 0;
							n = n + 2 | 0;
							if ((a[n >> 0] | 0) == 37)
								L = 9;
							else
								break
						}
				while (0);
				y = o - w | 0;
				if (M ? (c[e >> 2] & 32 | 0) == 0 : 0)
					Fi(w, y, e) | 0;
				if ((o | 0) != (w | 0)) {
					w = n;
					n = y;
					continue
				}
				r = n + 1 | 0;
				o = a[r >> 0] | 0;
				p = (o << 24 >> 24) + -48 | 0;
				if (p >>> 0 < 10) {
					K = (a[n + 2 >> 0] | 0) == 36;
					r = K ? n + 3 | 0 : r;
					o = a[r >> 0] | 0;
					u = K ? p : -1;
					f = K ? 1 : f
				} else
					u = -1;
				n = o << 24 >> 24;
				d : do
					if ((n & -32 | 0) == 32) {
						p = 0;
						while (1) {
							if (!(1 << n + -32 & 75913)) {
								s = p;
								n = r;
								break d
							}
							p = 1 << (o << 24 >> 24) + -32 | p;
							r = r + 1 | 0;
							o = a[r >> 0] | 0;
							n = o << 24 >> 24;
							if ((n & -32 | 0) != 32) {
								s = p;
								n = r;
								break
							}
						}
					} else {
						s = 0;
						n = r
					}
				while (0);
				do
					if (o << 24 >> 24 == 42) {
						p = n + 1 | 0;
						o = (a[p >> 0] | 0) + -48 | 0;
						if (o >>> 0 < 10 ? (a[n + 2 >> 0] | 0) == 36 : 0) {
							c[l + (o << 2) >> 2] = 10;
							f = 1;
							n = n + 3 | 0;
							o = c[j + ((a[p >> 0] | 0) + -48 << 3) >> 2] | 0
						} else {
							if (f) {
								m = -1;
								break a
							}
							if (!M) {
								x = s;
								n = p;
								f = 0;
								K = 0;
								break
							}
							f = (c[g >> 2] | 0) + (4 - 1) & ~(4 - 1);
							o = c[f >> 2] | 0;
							c[g >> 2] = f + 4;
							f = 0;
							n = p
						}
						if ((o | 0) < 0) {
							x = s | 8192;
							K = 0 - o | 0
						} else {
							x = s;
							K = o
						}
					} else {
						p = (o << 24 >> 24) + -48 | 0;
						if (p >>> 0 < 10) {
							o = 0;
							do {
								o = (o * 10 | 0) + p | 0;
								n = n + 1 | 0;
								p = (a[n >> 0] | 0) + -48 | 0
							} while (p >>> 0 < 10);
							if ((o | 0) < 0) {
								m = -1;
								break a
							} else {
								x = s;
								K = o
							}
						} else {
							x = s;
							K = 0
						}
					}
				while (0);
				e : do
					if ((a[n >> 0] | 0) == 46) {
						p = n + 1 | 0;
						o = a[p >> 0] | 0;
						if (o << 24 >> 24 != 42) {
							r = (o << 24 >> 24) + -48 | 0;
							if (r >>> 0 < 10) {
								n = p;
								o = 0
							} else {
								n = p;
								r = 0;
								break
							}
							while (1) {
								o = (o * 10 | 0) + r | 0;
								n = n + 1 | 0;
								r = (a[n >> 0] | 0) + -48 | 0;
								if (r >>> 0 >= 10) {
									r = o;
									break e
								}
							}
						}
						p = n + 2 | 0;
						o = (a[p >> 0] | 0) + -48 | 0;
						if (o >>> 0 < 10 ? (a[n + 3 >> 0] | 0) == 36 : 0) {
							c[l + (o << 2) >> 2] = 10;
							n = n + 4 | 0;
							r = c[j + ((a[p >> 0] | 0) + -48 << 3) >> 2] | 0;
							break
						}
						if (f) {
							m = -1;
							break a
						}
						if (M) {
							n = (c[g >> 2] | 0) + (4 - 1) & ~(4 - 1);
							r = c[n >> 2] | 0;
							c[g >> 2] = n + 4;
							n = p
						} else {
							n = p;
							r = 0
						}
					} else
						r = -1;
				while (0);
				t = 0;
				while (1) {
					o = (a[n >> 0] | 0) + -65 | 0;
					if (o >>> 0 > 57) {
						m = -1;
						break a
					}
					p = n + 1 | 0;
					o = a[21504 + (t * 58 | 0) + o >> 0] | 0;
					s = o & 255;
					if ((s + -1 | 0) >>> 0 < 8) {
						n = p;
						t = s
					} else {
						J = p;
						break
					}
				}
				if (!(o << 24 >> 24)) {
					m = -1;
					break
				}
				p = (u | 0) > -1;
				do
					if (o << 24 >> 24 == 19)
						if (p) {
							m = -1;
							break a
						} else
							L = 52;
					else {
						if (p) {
							c[l + (u << 2) >> 2] = s;
							H = j + (u << 3) | 0;
							I = c[H + 4 >> 2] | 0;
							L = ba;
							c[L >> 2] = c[H >> 2];
							c[L + 4 >> 2] = I;
							L = 52;
							break
						}
						if (!M) {
							m = 0;
							break a
						}
						cj(ba, s, g)
					}
				while (0);
				if ((L | 0) == 52 ? (L = 0, !M) : 0) {
					w = J;
					n = y;
					continue
				}
				u = a[n >> 0] | 0;
				u = (t | 0) != 0 & (u & 15 | 0) == 3 ? u & -33 : u;
				p = x & -65537;
				I = (x & 8192 | 0) == 0 ? x : p;
				f : do
					switch (u | 0) {
					case 110:
						switch (t | 0) {
						case 0: {
								c[c[ba >> 2] >> 2] = m;
								w = J;
								n = y;
								continue a
							}
						case 1: {
								c[c[ba >> 2] >> 2] = m;
								w = J;
								n = y;
								continue a
							}
						case 2: {
								w = c[ba >> 2] | 0;
								c[w >> 2] = m;
								c[w + 4 >> 2] = ((m | 0) < 0) << 31 >> 31;
								w = J;
								n = y;
								continue a
							}
						case 3: {
								b[c[ba >> 2] >> 1] = m;
								w = J;
								n = y;
								continue a
							}
						case 4: {
								a[c[ba >> 2] >> 0] = m;
								w = J;
								n = y;
								continue a
							}
						case 6: {
								c[c[ba >> 2] >> 2] = m;
								w = J;
								n = y;
								continue a
							}
						case 7: {
								w = c[ba >> 2] | 0;
								c[w >> 2] = m;
								c[w + 4 >> 2] = ((m | 0) < 0) << 31 >> 31;
								w = J;
								n = y;
								continue a
							}
						default: {
								w = J;
								n = y;
								continue a
							}
						}
					case 112: {
							t = I | 8;
							r = r >>> 0 > 8 ? r : 8;
							u = 120;
							L = 64;
							break
						}
					case 88:
					case 120: {
							t = I;
							L = 64;
							break
						}
					case 111: {
							p = ba;
							o = c[p >> 2] | 0;
							p = c[p + 4 >> 2] | 0;
							if ((o | 0) == 0 & (p | 0) == 0)
								n = N;
							else {
								n = N;
								do {
									n = n + -1 | 0;
									a[n >> 0] = o & 7 | 48;
									o = hs(o | 0, p | 0, 3) | 0;
									p = C
								} while (!((o | 0) == 0 & (p | 0) == 0))
							}
							if (!(I & 8)) {
								o = I;
								t = 0;
								s = 21984;
								L = 77
							} else {
								t = U - n + 1 | 0;
								o = I;
								r = (r | 0) < (t | 0) ? t : r;
								t = 0;
								s = 21984;
								L = 77
							}
							break
						}
					case 105:
					case 100: {
							o = ba;
							n = c[o >> 2] | 0;
							o = c[o + 4 >> 2] | 0;
							if ((o | 0) < 0) {
								n = fs(0, 0, n | 0, o | 0) | 0;
								o = C;
								p = ba;
								c[p >> 2] = n;
								c[p + 4 >> 2] = o;
								p = 1;
								s = 21984;
								L = 76;
								break f
							}
							if (!(I & 2048)) {
								s = I & 1;
								p = s;
								s = (s | 0) == 0 ? 21984 : 21986;
								L = 76
							} else {
								p = 1;
								s = 21985;
								L = 76
							}
							break
						}
					case 117: {
							o = ba;
							n = c[o >> 2] | 0;
							o = c[o + 4 >> 2] | 0;
							p = 0;
							s = 21984;
							L = 76;
							break
						}
					case 99: {
							a[V >> 0] = c[ba >> 2];
							w = V;
							o = 1;
							t = 0;
							u = 21984;
							n = N;
							break
						}
					case 109: {
							n = Wh(c[(Vh() | 0) >> 2] | 0) | 0;
							L = 82;
							break
						}
					case 115: {
							n = c[ba >> 2] | 0;
							n = (n | 0) != 0 ? n : 21994;
							L = 82;
							break
						}
					case 67: {
							c[ga >> 2] = c[ba >> 2];
							c[W >> 2] = 0;
							c[ba >> 2] = ga;
							r = -1;
							L = 86;
							break
						}
					case 83: {
							if (!r) {
								ej(e, 32, K, 0, I);
								n = 0;
								L = 98
							} else
								L = 86;
							break
						}
					case 65:
					case 71:
					case 70:
					case 69:
					case 97:
					case 103:
					case 102:
					case 101: {
							q = +h[ba >> 3];
							c[ea >> 2] = 0;
							h[k >> 3] = q;
							if ((c[k + 4 >> 2] | 0) >= 0)
								if (!(I & 2048)) {
									H = I & 1;
									G = H;
									H = (H | 0) == 0 ? 22002 : 22007
								} else {
									G = 1;
									H = 22004
								}
							else {
								q = -q;
								G = 1;
								H = 22001
							}
							h[k >> 3] = q;
							F = c[k + 4 >> 2] & 2146435072;
							do
								if (F >>> 0 < 2146435072 | (F | 0) == 2146435072 & 0 < 0) {
									v = +mi(q, ea) * 2.0;
									o = v != 0.0;
									if (o)
										c[ea >> 2] = (c[ea >> 2] | 0) + -1;
									D = u | 32;
									if ((D | 0) == 97) {
										w = u & 32;
										y = (w | 0) == 0 ? H : H + 9 | 0;
										x = G | 2;
										n = 12 - r | 0;
										do
											if (!(r >>> 0 > 11 | (n | 0) == 0)) {
												q = 8.0;
												do {
													n = n + -1 | 0;
													q = q * 16.0
												} while ((n | 0) != 0);
												if ((a[y >> 0] | 0) == 45) {
													q =  - (q + (-v - q));
													break
												} else {
													q = v + q - q;
													break
												}
											} else
												q = v;
										while (0);
										o = c[ea >> 2] | 0;
										n = (o | 0) < 0 ? 0 - o | 0 : o;
										n = dj(n, ((n | 0) < 0) << 31 >> 31, X) | 0;
										if ((n | 0) == (X | 0)) {
											a[Y >> 0] = 48;
											n = Y
										}
										a[n + -1 >> 0] = (o >> 31 & 2) + 43;
										t = n + -2 | 0;
										a[t >> 0] = u + 15;
										s = (r | 0) < 1;
										p = (I & 8 | 0) == 0;
										o = da;
										while (1) {
											H = ~~q;
											n = o + 1 | 0;
											a[o >> 0] = d[21968 + H >> 0] | w;
											q = (q -  + (H | 0)) * 16.0;
											do
												if ((n - Z | 0) == 1) {
													if (p & (s & q == 0.0))
														break;
													a[n >> 0] = 46;
													n = o + 2 | 0
												}
											while (0);
											if (!(q != 0.0))
												break;
											else
												o = n
										}
										r = (r | 0) != 0 & (O + n | 0) < (r | 0) ? P + r - t | 0 : aa - t + n | 0;
										p = r + x | 0;
										ej(e, 32, K, p, I);
										if (!(c[e >> 2] & 32))
											Fi(y, x, e) | 0;
										ej(e, 48, K, p, I^65536);
										n = n - Z | 0;
										if (!(c[e >> 2] & 32))
											Fi(da, n, e) | 0;
										o = $ - t | 0;
										ej(e, 48, r - (n + o) | 0, 0, 0);
										if (!(c[e >> 2] & 32))
											Fi(t, o, e) | 0;
										ej(e, 32, K, p, I^8192);
										n = (p | 0) < (K | 0) ? K : p;
										break
									}
									n = (r | 0) < 0 ? 6 : r;
									if (o) {
										o = (c[ea >> 2] | 0) + -28 | 0;
										c[ea >> 2] = o;
										q = v * 268435456.0
									} else {
										q = v;
										o = c[ea >> 2] | 0
									}
									F = (o | 0) < 0 ? ca : Q;
									E = F;
									o = F;
									do {
										B = ~~q >>> 0;
										c[o >> 2] = B;
										o = o + 4 | 0;
										q = (q -  + (B >>> 0)) * 1.0e9
									} while (q != 0.0);
									p = o;
									o = c[ea >> 2] | 0;
									if ((o | 0) > 0) {
										s = F;
										while (1) {
											t = (o | 0) > 29 ? 29 : o;
											r = p + -4 | 0;
											do
												if (r >>> 0 < s >>> 0)
													r = s;
												else {
													o = 0;
													do {
														B = ks(c[r >> 2] | 0, 0, t | 0) | 0;
														B = is(B | 0, C | 0, o | 0, 0) | 0;
														o = C;
														A = ts(B | 0, o | 0, 1e9, 0) | 0;
														c[r >> 2] = A;
														o = ss(B | 0, o | 0, 1e9, 0) | 0;
														r = r + -4 | 0
													} while (r >>> 0 >= s >>> 0);
													if (!o) {
														r = s;
														break
													}
													r = s + -4 | 0;
													c[r >> 2] = o
												}
											while (0);
											while (1) {
												if (p >>> 0 <= r >>> 0)
													break;
												o = p + -4 | 0;
												if (!(c[o >> 2] | 0))
													p = o;
												else
													break
											}
											o = (c[ea >> 2] | 0) - t | 0;
											c[ea >> 2] = o;
											if ((o | 0) > 0)
												s = r;
											else
												break
										}
									} else
										r = F;
									if ((o | 0) < 0) {
										y = ((n + 25 | 0) / 9 | 0) + 1 | 0;
										z = (D | 0) == 102;
										w = r;
										while (1) {
											x = 0 - o | 0;
											x = (x | 0) > 9 ? 9 : x;
											do
												if (w >>> 0 < p >>> 0) {
													o = (1 << x) + -1 | 0;
													s = 1e9 >>> x;
													r = 0;
													t = w;
													do {
														B = c[t >> 2] | 0;
														c[t >> 2] = (B >>> x) + r;
														r = _(B & o, s) | 0;
														t = t + 4 | 0
													} while (t >>> 0 < p >>> 0);
													o = (c[w >> 2] | 0) == 0 ? w + 4 | 0 : w;
													if (!r) {
														r = o;
														break
													}
													c[p >> 2] = r;
													r = o;
													p = p + 4 | 0
												} else
													r = (c[w >> 2] | 0) == 0 ? w + 4 | 0 : w;
											while (0);
											o = z ? F : r;
											p = (p - o >> 2 | 0) > (y | 0) ? o + (y << 2) | 0 : p;
											o = (c[ea >> 2] | 0) + x | 0;
											c[ea >> 2] = o;
											if ((o | 0) >= 0) {
												w = r;
												break
											} else
												w = r
										}
									} else
										w = r;
									do
										if (w >>> 0 < p >>> 0) {
											o = (E - w >> 2) * 9 | 0;
											s = c[w >> 2] | 0;
											if (s >>> 0 < 10)
												break;
											else
												r = 10;
											do {
												r = r * 10 | 0;
												o = o + 1 | 0
											} while (s >>> 0 >= r >>> 0)
										} else
											o = 0;
									while (0);
									A = (D | 0) == 103;
									B = (n | 0) != 0;
									r = n - ((D | 0) != 102 ? o : 0) + ((B & A) << 31 >> 31) | 0;
									if ((r | 0) < (((p - E >> 2) * 9 | 0) + -9 | 0)) {
										t = r + 9216 | 0;
										z = (t | 0) / 9 | 0;
										r = F + (z + -1023 << 2) | 0;
										t = ((t | 0) % 9 | 0) + 1 | 0;
										if ((t | 0) < 9) {
											s = 10;
											do {
												s = s * 10 | 0;
												t = t + 1 | 0
											} while ((t | 0) != 9)
										} else
											s = 10;
										x = c[r >> 2] | 0;
										y = (x >>> 0) % (s >>> 0) | 0;
										if ((y | 0) == 0 ? (F + (z + -1022 << 2) | 0) == (p | 0) : 0)
											s = w;
										else
											L = 163;
										do
											if ((L | 0) == 163) {
												L = 0;
												v = (((x >>> 0) / (s >>> 0) | 0) & 1 | 0) == 0 ? 9007199254740992.0 : 9007199254740994.0;
												t = (s | 0) / 2 | 0;
												do
													if (y >>> 0 < t >>> 0)
														q = .5;
													else {
														if ((y | 0) == (t | 0) ? (F + (z + -1022 << 2) | 0) == (p | 0) : 0) {
															q = 1.0;
															break
														}
														q = 1.5
													}
												while (0);
												do
													if (G) {
														if ((a[H >> 0] | 0) != 45)
															break;
														v = -v;
														q = -q
													}
												while (0);
												t = x - y | 0;
												c[r >> 2] = t;
												if (!(v + q != v)) {
													s = w;
													break
												}
												D = t + s | 0;
												c[r >> 2] = D;
												if (D >>> 0 > 999999999) {
													o = w;
													while (1) {
														s = r + -4 | 0;
														c[r >> 2] = 0;
														if (s >>> 0 < o >>> 0) {
															o = o + -4 | 0;
															c[o >> 2] = 0
														}
														D = (c[s >> 2] | 0) + 1 | 0;
														c[s >> 2] = D;
														if (D >>> 0 > 999999999)
															r = s;
														else {
															w = o;
															r = s;
															break
														}
													}
												}
												o = (E - w >> 2) * 9 | 0;
												t = c[w >> 2] | 0;
												if (t >>> 0 < 10) {
													s = w;
													break
												} else
													s = 10;
												do {
													s = s * 10 | 0;
													o = o + 1 | 0
												} while (t >>> 0 >= s >>> 0);
												s = w
											}
										while (0);
										D = r + 4 | 0;
										w = s;
										p = p >>> 0 > D >>> 0 ? D : p
									}
									y = 0 - o | 0;
									while (1) {
										if (p >>> 0 <= w >>> 0) {
											z = 0;
											D = p;
											break
										}
										r = p + -4 | 0;
										if (!(c[r >> 2] | 0))
											p = r;
										else {
											z = 1;
											D = p;
											break
										}
									}
									do
										if (A) {
											n = (B & 1^1) + n | 0;
											if ((n | 0) > (o | 0) & (o | 0) > -5) {
												u = u + -1 | 0;
												n = n + -1 - o | 0
											} else {
												u = u + -2 | 0;
												n = n + -1 | 0
											}
											p = I & 8;
											if (p)
												break;
											do
												if (z) {
													p = c[D + -4 >> 2] | 0;
													if (!p) {
														r = 9;
														break
													}
													if (!((p >>> 0) % 10 | 0)) {
														s = 10;
														r = 0
													} else {
														r = 0;
														break
													}
													do {
														s = s * 10 | 0;
														r = r + 1 | 0
													} while (((p >>> 0) % (s >>> 0) | 0 | 0) == 0)
												} else
													r = 9;
											while (0);
											p = ((D - E >> 2) * 9 | 0) + -9 | 0;
											if ((u | 32 | 0) == 102) {
												p = p - r | 0;
												p = (p | 0) < 0 ? 0 : p;
												n = (n | 0) < (p | 0) ? n : p;
												p = 0;
												break
											} else {
												p = p + o - r | 0;
												p = (p | 0) < 0 ? 0 : p;
												n = (n | 0) < (p | 0) ? n : p;
												p = 0;
												break
											}
										} else
											p = I & 8;
									while (0);
									x = n | p;
									s = (x | 0) != 0 & 1;
									t = (u | 32 | 0) == 102;
									if (t) {
										o = (o | 0) > 0 ? o : 0;
										u = 0
									} else {
										r = (o | 0) < 0 ? y : o;
										r = dj(r, ((r | 0) < 0) << 31 >> 31, X) | 0;
										if (($ - r | 0) < 2)
											do {
												r = r + -1 | 0;
												a[r >> 0] = 48
											} while (($ - r | 0) < 2);
										a[r + -1 >> 0] = (o >> 31 & 2) + 43;
										E = r + -2 | 0;
										a[E >> 0] = u;
										o = $ - E | 0;
										u = E
									}
									y = G + 1 + n + s + o | 0;
									ej(e, 32, K, y, I);
									if (!(c[e >> 2] & 32))
										Fi(H, G, e) | 0;
									ej(e, 48, K, y, I^65536);
									do
										if (t) {
											r = w >>> 0 > F >>> 0 ? F : w;
											o = r;
											do {
												p = dj(c[o >> 2] | 0, 0, R) | 0;
												do
													if ((o | 0) == (r | 0)) {
														if ((p | 0) != (R | 0))
															break;
														a[T >> 0] = 48;
														p = T
													} else {
														if (p >>> 0 <= da >>> 0)
															break;
														do {
															p = p + -1 | 0;
															a[p >> 0] = 48
														} while (p >>> 0 > da >>> 0)
													}
												while (0);
												if (!(c[e >> 2] & 32))
													Fi(p, S - p | 0, e) | 0;
												o = o + 4 | 0
											} while (o >>> 0 <= F >>> 0);
											do
												if (x) {
													if (c[e >> 2] & 32)
														break;
													Fi(22036, 1, e) | 0
												}
											while (0);
											if ((n | 0) > 0 & o >>> 0 < D >>> 0) {
												p = o;
												while (1) {
													o = dj(c[p >> 2] | 0, 0, R) | 0;
													if (o >>> 0 > da >>> 0)
														do {
															o = o + -1 | 0;
															a[o >> 0] = 48
														} while (o >>> 0 > da >>> 0);
													if (!(c[e >> 2] & 32))
														Fi(o, (n | 0) > 9 ? 9 : n, e) | 0;
													p = p + 4 | 0;
													o = n + -9 | 0;
													if (!((n | 0) > 9 & p >>> 0 < D >>> 0)) {
														n = o;
														break
													} else
														n = o
												}
											}
											ej(e, 48, n + 9 | 0, 9, 0)
										} else {
											t = z ? D : w + 4 | 0;
											if ((n | 0) > -1) {
												s = (p | 0) == 0;
												r = w;
												do {
													o = dj(c[r >> 2] | 0, 0, R) | 0;
													if ((o | 0) == (R | 0)) {
														a[T >> 0] = 48;
														o = T
													}
													do
														if ((r | 0) == (w | 0)) {
															p = o + 1 | 0;
															if (!(c[e >> 2] & 32))
																Fi(o, 1, e) | 0;
															if (s & (n | 0) < 1) {
																o = p;
																break
															}
															if (c[e >> 2] & 32) {
																o = p;
																break
															}
															Fi(22036, 1, e) | 0;
															o = p
														} else {
															if (o >>> 0 <= da >>> 0)
																break;
															do {
																o = o + -1 | 0;
																a[o >> 0] = 48
															} while (o >>> 0 > da >>> 0)
														}
													while (0);
													p = S - o | 0;
													if (!(c[e >> 2] & 32))
														Fi(o, (n | 0) > (p | 0) ? p : n, e) | 0;
													n = n - p | 0;
													r = r + 4 | 0
												} while (r >>> 0 < t >>> 0 & (n | 0) > -1)
											}
											ej(e, 48, n + 18 | 0, 18, 0);
											if (c[e >> 2] & 32)
												break;
											Fi(u, $ - u | 0, e) | 0
										}
									while (0);
									ej(e, 32, K, y, I^8192);
									n = (y | 0) < (K | 0) ? K : y
								} else {
									t = (u & 32 | 0) != 0;
									s = q != q | 0.0 != 0.0;
									o = s ? 0 : G;
									r = o + 3 | 0;
									ej(e, 32, K, r, p);
									n = c[e >> 2] | 0;
									if (!(n & 32)) {
										Fi(H, o, e) | 0;
										n = c[e >> 2] | 0
									}
									if (!(n & 32))
										Fi(s ? (t ? 22028 : 22032) : t ? 22020 : 22024, 3, e) | 0;
									ej(e, 32, K, r, I^8192);
									n = (r | 0) < (K | 0) ? K : r
								}
							while (0);
							w = J;
							continue a
						}
					default: {
							p = I;
							o = r;
							t = 0;
							u = 21984;
							n = N
						}
					}
				while (0);
				g : do
					if ((L | 0) == 64) {
						p = ba;
						o = c[p >> 2] | 0;
						p = c[p + 4 >> 2] | 0;
						s = u & 32;
						if (!((o | 0) == 0 & (p | 0) == 0)) {
							n = N;
							do {
								n = n + -1 | 0;
								a[n >> 0] = d[21968 + (o & 15) >> 0] | s;
								o = hs(o | 0, p | 0, 4) | 0;
								p = C
							} while (!((o | 0) == 0 & (p | 0) == 0));
							L = ba;
							if ((t & 8 | 0) == 0 | (c[L >> 2] | 0) == 0 & (c[L + 4 >> 2] | 0) == 0) {
								o = t;
								t = 0;
								s = 21984;
								L = 77
							} else {
								o = t;
								t = 2;
								s = 21984 + (u >> 4) | 0;
								L = 77
							}
						} else {
							n = N;
							o = t;
							t = 0;
							s = 21984;
							L = 77
						}
					} else if ((L | 0) == 76) {
						n = dj(n, o, N) | 0;
						o = I;
						t = p;
						L = 77
					} else if ((L | 0) == 82) {
						L = 0;
						I = Qi(n, 0, r) | 0;
						H = (I | 0) == 0;
						w = n;
						o = H ? r : I - n | 0;
						t = 0;
						u = 21984;
						n = H ? n + r | 0 : I
					} else if ((L | 0) == 86) {
						L = 0;
						o = 0;
						n = 0;
						s = c[ba >> 2] | 0;
						while (1) {
							p = c[s >> 2] | 0;
							if (!p)
								break;
							n = yi(fa, p) | 0;
							if ((n | 0) < 0 | n >>> 0 > (r - o | 0) >>> 0)
								break;
							o = n + o | 0;
							if (r >>> 0 > o >>> 0)
								s = s + 4 | 0;
							else
								break
						}
						if ((n | 0) < 0) {
							m = -1;
							break a
						}
						ej(e, 32, K, o, I);
						if (!o) {
							n = 0;
							L = 98
						} else {
							p = 0;
							r = c[ba >> 2] | 0;
							while (1) {
								n = c[r >> 2] | 0;
								if (!n) {
									n = o;
									L = 98;
									break g
								}
								n = yi(fa, n) | 0;
								p = n + p | 0;
								if ((p | 0) > (o | 0)) {
									n = o;
									L = 98;
									break g
								}
								if (!(c[e >> 2] & 32))
									Fi(fa, n, e) | 0;
								if (p >>> 0 >= o >>> 0) {
									n = o;
									L = 98;
									break
								} else
									r = r + 4 | 0
							}
						}
					}
				while (0);
				if ((L | 0) == 98) {
					L = 0;
					ej(e, 32, K, n, I^8192);
					w = J;
					n = (K | 0) > (n | 0) ? K : n;
					continue
				}
				if ((L | 0) == 77) {
					L = 0;
					p = (r | 0) > -1 ? o & -65537 : o;
					o = ba;
					o = (c[o >> 2] | 0) != 0 | (c[o + 4 >> 2] | 0) != 0;
					if ((r | 0) != 0 | o) {
						o = (o & 1^1) + (U - n) | 0;
						w = n;
						o = (r | 0) > (o | 0) ? r : o;
						u = s;
						n = N
					} else {
						w = N;
						o = 0;
						u = s;
						n = N
					}
				}
				s = n - w | 0;
				o = (o | 0) < (s | 0) ? s : o;
				r = t + o | 0;
				n = (K | 0) < (r | 0) ? r : K;
				ej(e, 32, n, r, p);
				if (!(c[e >> 2] & 32))
					Fi(u, t, e) | 0;
				ej(e, 48, n, r, p^65536);
				ej(e, 48, o, s, 0);
				if (!(c[e >> 2] & 32))
					Fi(w, s, e) | 0;
				ej(e, 32, n, r, p^8192);
				w = J
			}
			h : do
				if ((L | 0) == 245)
					if (!e)
						if (f) {
							m = 1;
							while (1) {
								f = c[l + (m << 2) >> 2] | 0;
								if (!f)
									break;
								cj(j + (m << 3) | 0, f, g);
								m = m + 1 | 0;
								if ((m | 0) >= 10) {
									m = 1;
									break h
								}
							}
							if ((m | 0) < 10)
								while (1) {
									if (c[l + (m << 2) >> 2] | 0) {
										m = -1;
										break h
									}
									m = m + 1 | 0;
									if ((m | 0) >= 10) {
										m = 1;
										break
									}
								}
							else
								m = 1
						} else
							m = 0;
			while (0);
			i = ha;
			return m | 0
		}
		function _i(a, b, c) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			return Bi(a, b, c) | 0
		}
		function $i(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0.0,
			f = 0,
			g = 0,
			h = 0,
			j = 0;
			j = i;
			i = i + 112 | 0;
			h = j;
			f = h;
			g = f + 112 | 0;
			do {
				c[f >> 2] = 0;
				f = f + 4 | 0
			} while ((f | 0) < (g | 0));
			f = h + 4 | 0;
			c[f >> 2] = a;
			g = h + 8 | 0;
			c[g >> 2] = -1;
			c[h + 44 >> 2] = a;
			c[h + 76 >> 2] = -1;
			Zh(h, 0);
			e = +Xh(h, d, 1);
			d = (c[f >> 2] | 0) - (c[g >> 2] | 0) + (c[h + 108 >> 2] | 0) | 0;
			if (b)
				c[b >> 2] = (d | 0) != 0 ? a + d | 0 : a;
			i = j;
			return +e
		}
		function aj(a, b, d, e, f) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			j = 0,
			k = 0;
			k = i;
			i = i + 112 | 0;
			j = k;
			c[j >> 2] = 0;
			g = j + 4 | 0;
			c[g >> 2] = a;
			c[j + 44 >> 2] = a;
			h = j + 8 | 0;
			c[h >> 2] = (a | 0) < 0 ? -1 : a + 2147483647 | 0;
			c[j + 76 >> 2] = -1;
			Zh(j, 0);
			e = Yh(j, d, 1, e, f) | 0;
			if (b)
				c[b >> 2] = a + ((c[g >> 2] | 0) + (c[j + 108 >> 2] | 0) - (c[h >> 2] | 0));
			i = k;
			return e | 0
		}
		function bj(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0;
			e = a + 20 | 0;
			f = c[e >> 2] | 0;
			a = (c[a + 16 >> 2] | 0) - f | 0;
			a = a >>> 0 > d >>> 0 ? d : a;
			js(f | 0, b | 0, a | 0) | 0;
			c[e >> 2] = (c[e >> 2] | 0) + a;
			return d | 0
		}
		function cj(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0.0;
			a : do
				if (b >>> 0 <= 20)
					do
						switch (b | 0) {
						case 9: {
								e = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
								b = c[e >> 2] | 0;
								c[d >> 2] = e + 4;
								c[a >> 2] = b;
								break a
							}
						case 10: {
								e = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
								b = c[e >> 2] | 0;
								c[d >> 2] = e + 4;
								e = a;
								c[e >> 2] = b;
								c[e + 4 >> 2] = ((b | 0) < 0) << 31 >> 31;
								break a
							}
						case 11: {
								e = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
								b = c[e >> 2] | 0;
								c[d >> 2] = e + 4;
								e = a;
								c[e >> 2] = b;
								c[e + 4 >> 2] = 0;
								break a
							}
						case 12: {
								e = (c[d >> 2] | 0) + (8 - 1) & ~(8 - 1);
								b = e;
								f = c[b >> 2] | 0;
								b = c[b + 4 >> 2] | 0;
								c[d >> 2] = e + 8;
								e = a;
								c[e >> 2] = f;
								c[e + 4 >> 2] = b;
								break a
							}
						case 13: {
								f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
								e = c[f >> 2] | 0;
								c[d >> 2] = f + 4;
								e = (e & 65535) << 16 >> 16;
								f = a;
								c[f >> 2] = e;
								c[f + 4 >> 2] = ((e | 0) < 0) << 31 >> 31;
								break a
							}
						case 14: {
								f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
								e = c[f >> 2] | 0;
								c[d >> 2] = f + 4;
								f = a;
								c[f >> 2] = e & 65535;
								c[f + 4 >> 2] = 0;
								break a
							}
						case 15: {
								f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
								e = c[f >> 2] | 0;
								c[d >> 2] = f + 4;
								e = (e & 255) << 24 >> 24;
								f = a;
								c[f >> 2] = e;
								c[f + 4 >> 2] = ((e | 0) < 0) << 31 >> 31;
								break a
							}
						case 16: {
								f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
								e = c[f >> 2] | 0;
								c[d >> 2] = f + 4;
								f = a;
								c[f >> 2] = e & 255;
								c[f + 4 >> 2] = 0;
								break a
							}
						case 17: {
								f = (c[d >> 2] | 0) + (8 - 1) & ~(8 - 1);
								g = +h[f >> 3];
								c[d >> 2] = f + 8;
								h[a >> 3] = g;
								break a
							}
						case 18: {
								f = (c[d >> 2] | 0) + (8 - 1) & ~(8 - 1);
								g = +h[f >> 3];
								c[d >> 2] = f + 8;
								h[a >> 3] = g;
								break a
							}
						default:
							break a
						}
					while (0);
			while (0);
			return
		}
		function dj(b, c, d) {
			b = b | 0;
			c = c | 0;
			d = d | 0;
			var e = 0;
			if (c >>> 0 > 0 | (c | 0) == 0 & b >>> 0 > 4294967295)
				while (1) {
					e = ts(b | 0, c | 0, 10, 0) | 0;
					d = d + -1 | 0;
					a[d >> 0] = e | 48;
					e = ss(b | 0, c | 0, 10, 0) | 0;
					if (c >>> 0 > 9 | (c | 0) == 9 & b >>> 0 > 4294967295) {
						b = e;
						c = C
					} else {
						b = e;
						break
					}
				}
			if (b)
				while (1) {
					d = d + -1 | 0;
					a[d >> 0] = (b >>> 0) % 10 | 0 | 48;
					if (b >>> 0 < 10)
						break;
					else
						b = (b >>> 0) / 10 | 0
				}
			return d | 0
		}
		function ej(a, b, d, e, f) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			j = 0;
			j = i;
			i = i + 256 | 0;
			h = j;
			do
				if ((d | 0) > (e | 0) & (f & 73728 | 0) == 0) {
					f = d - e | 0;
					gs(h | 0, b | 0, (f >>> 0 > 256 ? 256 : f) | 0) | 0;
					b = c[a >> 2] | 0;
					g = (b & 32 | 0) == 0;
					if (f >>> 0 > 255) {
						e = d - e | 0;
						do {
							if (g) {
								Fi(h, 256, a) | 0;
								b = c[a >> 2] | 0
							}
							f = f + -256 | 0;
							g = (b & 32 | 0) == 0
						} while (f >>> 0 > 255);
						if (g)
							f = e & 255;
						else
							break
					} else if (!g)
						break;
					Fi(h, f, a) | 0
				}
			while (0);
			i = j;
			return
		}
		function fj(a) {
			a = a | 0;
			var b = 0,
			d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0,
			E = 0,
			F = 0,
			G = 0,
			H = 0,
			I = 0,
			J = 0,
			K = 0,
			L = 0,
			M = 0;
			do
				if (a >>> 0 < 245) {
					o = a >>> 0 < 11 ? 16 : a + 11 & -8;
					a = o >>> 3;
					i = c[1822] | 0;
					d = i >>> a;
					if (d & 3) {
						a = (d & 1^1) + a | 0;
						e = a << 1;
						d = 7328 + (e << 2) | 0;
						e = 7328 + (e + 2 << 2) | 0;
						f = c[e >> 2] | 0;
						g = f + 8 | 0;
						h = c[g >> 2] | 0;
						do
							if ((d | 0) != (h | 0)) {
								if (h >>> 0 < (c[1826] | 0) >>> 0)
									bb();
								b = h + 12 | 0;
								if ((c[b >> 2] | 0) == (f | 0)) {
									c[b >> 2] = d;
									c[e >> 2] = h;
									break
								} else
									bb()
							} else
								c[1822] = i & ~(1 << a);
						while (0);
						M = a << 3;
						c[f + 4 >> 2] = M | 3;
						M = f + (M | 4) | 0;
						c[M >> 2] = c[M >> 2] | 1;
						M = g;
						return M | 0
					}
					h = c[1824] | 0;
					if (o >>> 0 > h >>> 0) {
						if (d) {
							e = 2 << a;
							e = d << a & (e | 0 - e);
							e = (e & 0 - e) + -1 | 0;
							j = e >>> 12 & 16;
							e = e >>> j;
							f = e >>> 5 & 8;
							e = e >>> f;
							g = e >>> 2 & 4;
							e = e >>> g;
							d = e >>> 1 & 2;
							e = e >>> d;
							a = e >>> 1 & 1;
							a = (f | j | g | d | a) + (e >>> a) | 0;
							e = a << 1;
							d = 7328 + (e << 2) | 0;
							e = 7328 + (e + 2 << 2) | 0;
							g = c[e >> 2] | 0;
							j = g + 8 | 0;
							f = c[j >> 2] | 0;
							do
								if ((d | 0) != (f | 0)) {
									if (f >>> 0 < (c[1826] | 0) >>> 0)
										bb();
									b = f + 12 | 0;
									if ((c[b >> 2] | 0) == (g | 0)) {
										c[b >> 2] = d;
										c[e >> 2] = f;
										k = c[1824] | 0;
										break
									} else
										bb()
								} else {
									c[1822] = i & ~(1 << a);
									k = h
								}
							while (0);
							M = a << 3;
							h = M - o | 0;
							c[g + 4 >> 2] = o | 3;
							i = g + o | 0;
							c[g + (o | 4) >> 2] = h | 1;
							c[g + M >> 2] = h;
							if (k) {
								f = c[1827] | 0;
								d = k >>> 3;
								b = d << 1;
								e = 7328 + (b << 2) | 0;
								a = c[1822] | 0;
								d = 1 << d;
								if (a & d) {
									a = 7328 + (b + 2 << 2) | 0;
									b = c[a >> 2] | 0;
									if (b >>> 0 < (c[1826] | 0) >>> 0)
										bb();
									else {
										l = a;
										m = b
									}
								} else {
									c[1822] = a | d;
									l = 7328 + (b + 2 << 2) | 0;
									m = e
								}
								c[l >> 2] = f;
								c[m + 12 >> 2] = f;
								c[f + 8 >> 2] = m;
								c[f + 12 >> 2] = e
							}
							c[1824] = h;
							c[1827] = i;
							M = j;
							return M | 0
						}
						a = c[1823] | 0;
						if (a) {
							d = (a & 0 - a) + -1 | 0;
							L = d >>> 12 & 16;
							d = d >>> L;
							K = d >>> 5 & 8;
							d = d >>> K;
							M = d >>> 2 & 4;
							d = d >>> M;
							a = d >>> 1 & 2;
							d = d >>> a;
							e = d >>> 1 & 1;
							e = c[7592 + ((K | L | M | a | e) + (d >>> e) << 2) >> 2] | 0;
							d = (c[e + 4 >> 2] & -8) - o | 0;
							a = e;
							while (1) {
								b = c[a + 16 >> 2] | 0;
								if (!b) {
									b = c[a + 20 >> 2] | 0;
									if (!b) {
										j = d;
										break
									}
								}
								a = (c[b + 4 >> 2] & -8) - o | 0;
								M = a >>> 0 < d >>> 0;
								d = M ? a : d;
								a = b;
								e = M ? b : e
							}
							g = c[1826] | 0;
							if (e >>> 0 < g >>> 0)
								bb();
							i = e + o | 0;
							if (e >>> 0 >= i >>> 0)
								bb();
							h = c[e + 24 >> 2] | 0;
							d = c[e + 12 >> 2] | 0;
							do
								if ((d | 0) == (e | 0)) {
									a = e + 20 | 0;
									b = c[a >> 2] | 0;
									if (!b) {
										a = e + 16 | 0;
										b = c[a >> 2] | 0;
										if (!b) {
											n = 0;
											break
										}
									}
									while (1) {
										d = b + 20 | 0;
										f = c[d >> 2] | 0;
										if (f) {
											b = f;
											a = d;
											continue
										}
										d = b + 16 | 0;
										f = c[d >> 2] | 0;
										if (!f)
											break;
										else {
											b = f;
											a = d
										}
									}
									if (a >>> 0 < g >>> 0)
										bb();
									else {
										c[a >> 2] = 0;
										n = b;
										break
									}
								} else {
									f = c[e + 8 >> 2] | 0;
									if (f >>> 0 < g >>> 0)
										bb();
									b = f + 12 | 0;
									if ((c[b >> 2] | 0) != (e | 0))
										bb();
									a = d + 8 | 0;
									if ((c[a >> 2] | 0) == (e | 0)) {
										c[b >> 2] = d;
										c[a >> 2] = f;
										n = d;
										break
									} else
										bb()
								}
							while (0);
							do
								if (h) {
									b = c[e + 28 >> 2] | 0;
									a = 7592 + (b << 2) | 0;
									if ((e | 0) == (c[a >> 2] | 0)) {
										c[a >> 2] = n;
										if (!n) {
											c[1823] = c[1823] & ~(1 << b);
											break
										}
									} else {
										if (h >>> 0 < (c[1826] | 0) >>> 0)
											bb();
										b = h + 16 | 0;
										if ((c[b >> 2] | 0) == (e | 0))
											c[b >> 2] = n;
										else
											c[h + 20 >> 2] = n;
										if (!n)
											break
									}
									a = c[1826] | 0;
									if (n >>> 0 < a >>> 0)
										bb();
									c[n + 24 >> 2] = h;
									b = c[e + 16 >> 2] | 0;
									do
										if (b)
											if (b >>> 0 < a >>> 0)
												bb();
											else {
												c[n + 16 >> 2] = b;
												c[b + 24 >> 2] = n;
												break
											}
									while (0);
									b = c[e + 20 >> 2] | 0;
									if (b)
										if (b >>> 0 < (c[1826] | 0) >>> 0)
											bb();
										else {
											c[n + 20 >> 2] = b;
											c[b + 24 >> 2] = n;
											break
										}
								}
							while (0);
							if (j >>> 0 < 16) {
								M = j + o | 0;
								c[e + 4 >> 2] = M | 3;
								M = e + (M + 4) | 0;
								c[M >> 2] = c[M >> 2] | 1
							} else {
								c[e + 4 >> 2] = o | 3;
								c[e + (o | 4) >> 2] = j | 1;
								c[e + (j + o) >> 2] = j;
								b = c[1824] | 0;
								if (b) {
									g = c[1827] | 0;
									d = b >>> 3;
									b = d << 1;
									f = 7328 + (b << 2) | 0;
									a = c[1822] | 0;
									d = 1 << d;
									if (a & d) {
										b = 7328 + (b + 2 << 2) | 0;
										a = c[b >> 2] | 0;
										if (a >>> 0 < (c[1826] | 0) >>> 0)
											bb();
										else {
											p = b;
											q = a
										}
									} else {
										c[1822] = a | d;
										p = 7328 + (b + 2 << 2) | 0;
										q = f
									}
									c[p >> 2] = g;
									c[q + 12 >> 2] = g;
									c[g + 8 >> 2] = q;
									c[g + 12 >> 2] = f
								}
								c[1824] = j;
								c[1827] = i
							}
							M = e + 8 | 0;
							return M | 0
						} else
							q = o
					} else
						q = o
				} else if (a >>> 0 <= 4294967231) {
					a = a + 11 | 0;
					m = a & -8;
					l = c[1823] | 0;
					if (l) {
						d = 0 - m | 0;
						a = a >>> 8;
						if (a)
							if (m >>> 0 > 16777215)
								k = 31;
							else {
								q = (a + 1048320 | 0) >>> 16 & 8;
								v = a << q;
								p = (v + 520192 | 0) >>> 16 & 4;
								v = v << p;
								k = (v + 245760 | 0) >>> 16 & 2;
								k = 14 - (p | q | k) + (v << k >>> 15) | 0;
								k = m >>> (k + 7 | 0) & 1 | k << 1
							}
						else
							k = 0;
						a = c[7592 + (k << 2) >> 2] | 0;
						a : do
							if (!a) {
								f = 0;
								a = 0;
								v = 86
							} else {
								h = d;
								f = 0;
								i = m << ((k | 0) == 31 ? 0 : 25 - (k >>> 1) | 0);
								j = a;
								a = 0;
								while (1) {
									g = c[j + 4 >> 2] & -8;
									d = g - m | 0;
									if (d >>> 0 < h >>> 0)
										if ((g | 0) == (m | 0)) {
											g = j;
											a = j;
											v = 90;
											break a
										} else
											a = j;
									else
										d = h;
									v = c[j + 20 >> 2] | 0;
									j = c[j + 16 + (i >>> 31 << 2) >> 2] | 0;
									f = (v | 0) == 0 | (v | 0) == (j | 0) ? f : v;
									if (!j) {
										v = 86;
										break
									} else {
										h = d;
										i = i << 1
									}
								}
							}
						while (0);
						if ((v | 0) == 86) {
							if ((f | 0) == 0 & (a | 0) == 0) {
								a = 2 << k;
								a = l & (a | 0 - a);
								if (!a) {
									q = m;
									break
								}
								a = (a & 0 - a) + -1 | 0;
								n = a >>> 12 & 16;
								a = a >>> n;
								l = a >>> 5 & 8;
								a = a >>> l;
								p = a >>> 2 & 4;
								a = a >>> p;
								q = a >>> 1 & 2;
								a = a >>> q;
								f = a >>> 1 & 1;
								f = c[7592 + ((l | n | p | q | f) + (a >>> f) << 2) >> 2] | 0;
								a = 0
							}
							if (!f) {
								i = d;
								j = a
							} else {
								g = f;
								v = 90
							}
						}
						if ((v | 0) == 90)
							while (1) {
								v = 0;
								q = (c[g + 4 >> 2] & -8) - m | 0;
								f = q >>> 0 < d >>> 0;
								d = f ? q : d;
								a = f ? g : a;
								f = c[g + 16 >> 2] | 0;
								if (f) {
									g = f;
									v = 90;
									continue
								}
								g = c[g + 20 >> 2] | 0;
								if (!g) {
									i = d;
									j = a;
									break
								} else
									v = 90
							}
						if ((j | 0) != 0 ? i >>> 0 < ((c[1824] | 0) - m | 0) >>> 0 : 0) {
							f = c[1826] | 0;
							if (j >>> 0 < f >>> 0)
								bb();
							h = j + m | 0;
							if (j >>> 0 >= h >>> 0)
								bb();
							g = c[j + 24 >> 2] | 0;
							d = c[j + 12 >> 2] | 0;
							do
								if ((d | 0) == (j | 0)) {
									a = j + 20 | 0;
									b = c[a >> 2] | 0;
									if (!b) {
										a = j + 16 | 0;
										b = c[a >> 2] | 0;
										if (!b) {
											o = 0;
											break
										}
									}
									while (1) {
										d = b + 20 | 0;
										e = c[d >> 2] | 0;
										if (e) {
											b = e;
											a = d;
											continue
										}
										d = b + 16 | 0;
										e = c[d >> 2] | 0;
										if (!e)
											break;
										else {
											b = e;
											a = d
										}
									}
									if (a >>> 0 < f >>> 0)
										bb();
									else {
										c[a >> 2] = 0;
										o = b;
										break
									}
								} else {
									e = c[j + 8 >> 2] | 0;
									if (e >>> 0 < f >>> 0)
										bb();
									b = e + 12 | 0;
									if ((c[b >> 2] | 0) != (j | 0))
										bb();
									a = d + 8 | 0;
									if ((c[a >> 2] | 0) == (j | 0)) {
										c[b >> 2] = d;
										c[a >> 2] = e;
										o = d;
										break
									} else
										bb()
								}
							while (0);
							do
								if (g) {
									b = c[j + 28 >> 2] | 0;
									a = 7592 + (b << 2) | 0;
									if ((j | 0) == (c[a >> 2] | 0)) {
										c[a >> 2] = o;
										if (!o) {
											c[1823] = c[1823] & ~(1 << b);
											break
										}
									} else {
										if (g >>> 0 < (c[1826] | 0) >>> 0)
											bb();
										b = g + 16 | 0;
										if ((c[b >> 2] | 0) == (j | 0))
											c[b >> 2] = o;
										else
											c[g + 20 >> 2] = o;
										if (!o)
											break
									}
									a = c[1826] | 0;
									if (o >>> 0 < a >>> 0)
										bb();
									c[o + 24 >> 2] = g;
									b = c[j + 16 >> 2] | 0;
									do
										if (b)
											if (b >>> 0 < a >>> 0)
												bb();
											else {
												c[o + 16 >> 2] = b;
												c[b + 24 >> 2] = o;
												break
											}
									while (0);
									b = c[j + 20 >> 2] | 0;
									if (b)
										if (b >>> 0 < (c[1826] | 0) >>> 0)
											bb();
										else {
											c[o + 20 >> 2] = b;
											c[b + 24 >> 2] = o;
											break
										}
								}
							while (0);
							b : do
								if (i >>> 0 >= 16) {
									c[j + 4 >> 2] = m | 3;
									c[j + (m | 4) >> 2] = i | 1;
									c[j + (i + m) >> 2] = i;
									b = i >>> 3;
									if (i >>> 0 < 256) {
										a = b << 1;
										e = 7328 + (a << 2) | 0;
										d = c[1822] | 0;
										b = 1 << b;
										if (d & b) {
											b = 7328 + (a + 2 << 2) | 0;
											a = c[b >> 2] | 0;
											if (a >>> 0 < (c[1826] | 0) >>> 0)
												bb();
											else {
												s = b;
												t = a
											}
										} else {
											c[1822] = d | b;
											s = 7328 + (a + 2 << 2) | 0;
											t = e
										}
										c[s >> 2] = h;
										c[t + 12 >> 2] = h;
										c[j + (m + 8) >> 2] = t;
										c[j + (m + 12) >> 2] = e;
										break
									}
									b = i >>> 8;
									if (b)
										if (i >>> 0 > 16777215)
											e = 31;
										else {
											L = (b + 1048320 | 0) >>> 16 & 8;
											M = b << L;
											K = (M + 520192 | 0) >>> 16 & 4;
											M = M << K;
											e = (M + 245760 | 0) >>> 16 & 2;
											e = 14 - (K | L | e) + (M << e >>> 15) | 0;
											e = i >>> (e + 7 | 0) & 1 | e << 1
										}
									else
										e = 0;
									b = 7592 + (e << 2) | 0;
									c[j + (m + 28) >> 2] = e;
									c[j + (m + 20) >> 2] = 0;
									c[j + (m + 16) >> 2] = 0;
									a = c[1823] | 0;
									d = 1 << e;
									if (!(a & d)) {
										c[1823] = a | d;
										c[b >> 2] = h;
										c[j + (m + 24) >> 2] = b;
										c[j + (m + 12) >> 2] = h;
										c[j + (m + 8) >> 2] = h;
										break
									}
									b = c[b >> 2] | 0;
									c : do
										if ((c[b + 4 >> 2] & -8 | 0) != (i | 0)) {
											e = i << ((e | 0) == 31 ? 0 : 25 - (e >>> 1) | 0);
											while (1) {
												a = b + 16 + (e >>> 31 << 2) | 0;
												d = c[a >> 2] | 0;
												if (!d)
													break;
												if ((c[d + 4 >> 2] & -8 | 0) == (i | 0)) {
													y = d;
													break c
												} else {
													e = e << 1;
													b = d
												}
											}
											if (a >>> 0 < (c[1826] | 0) >>> 0)
												bb();
											else {
												c[a >> 2] = h;
												c[j + (m + 24) >> 2] = b;
												c[j + (m + 12) >> 2] = h;
												c[j + (m + 8) >> 2] = h;
												break b
											}
										} else
											y = b;
									while (0);
									b = y + 8 | 0;
									a = c[b >> 2] | 0;
									M = c[1826] | 0;
									if (a >>> 0 >= M >>> 0 & y >>> 0 >= M >>> 0) {
										c[a + 12 >> 2] = h;
										c[b >> 2] = h;
										c[j + (m + 8) >> 2] = a;
										c[j + (m + 12) >> 2] = y;
										c[j + (m + 24) >> 2] = 0;
										break
									} else
										bb()
								} else {
									M = i + m | 0;
									c[j + 4 >> 2] = M | 3;
									M = j + (M + 4) | 0;
									c[M >> 2] = c[M >> 2] | 1
								}
							while (0);
							M = j + 8 | 0;
							return M | 0
						} else
							q = m
					} else
						q = m
				} else
					q = -1;
			while (0);
			d = c[1824] | 0;
			if (d >>> 0 >= q >>> 0) {
				b = d - q | 0;
				a = c[1827] | 0;
				if (b >>> 0 > 15) {
					c[1827] = a + q;
					c[1824] = b;
					c[a + (q + 4) >> 2] = b | 1;
					c[a + d >> 2] = b;
					c[a + 4 >> 2] = q | 3
				} else {
					c[1824] = 0;
					c[1827] = 0;
					c[a + 4 >> 2] = d | 3;
					M = a + (d + 4) | 0;
					c[M >> 2] = c[M >> 2] | 1
				}
				M = a + 8 | 0;
				return M | 0
			}
			a = c[1825] | 0;
			if (a >>> 0 > q >>> 0) {
				L = a - q | 0;
				c[1825] = L;
				M = c[1828] | 0;
				c[1828] = M + q;
				c[M + (q + 4) >> 2] = L | 1;
				c[M + 4 >> 2] = q | 3;
				M = M + 8 | 0;
				return M | 0
			}
			do
				if (!(c[1940] | 0)) {
					a = Pa(30) | 0;
					if (!(a + -1 & a)) {
						c[1942] = a;
						c[1941] = a;
						c[1943] = -1;
						c[1944] = -1;
						c[1945] = 0;
						c[1933] = 0;
						c[1940] = (cb(0) | 0) & -16^1431655768;
						break
					} else
						bb()
				}
			while (0);
			j = q + 48 | 0;
			i = c[1942] | 0;
			k = q + 47 | 0;
			h = i + k | 0;
			i = 0 - i | 0;
			l = h & i;
			if (l >>> 0 <= q >>> 0) {
				M = 0;
				return M | 0
			}
			a = c[1932] | 0;
			if ((a | 0) != 0 ? (t = c[1930] | 0, y = t + l | 0, y >>> 0 <= t >>> 0 | y >>> 0 > a >>> 0) : 0) {
				M = 0;
				return M | 0
			}
			d : do
				if (!(c[1933] & 4)) {
					a = c[1828] | 0;
					e : do
						if (a) {
							f = 7736;
							while (1) {
								d = c[f >> 2] | 0;
								if (d >>> 0 <= a >>> 0 ? (r = f + 4 | 0, (d + (c[r >> 2] | 0) | 0) >>> 0 > a >>> 0) : 0) {
									g = f;
									a = r;
									break
								}
								f = c[f + 8 >> 2] | 0;
								if (!f) {
									v = 174;
									break e
								}
							}
							d = h - (c[1825] | 0) & i;
							if (d >>> 0 < 2147483647) {
								f = Xa(d | 0) | 0;
								y = (f | 0) == ((c[g >> 2] | 0) + (c[a >> 2] | 0) | 0);
								a = y ? d : 0;
								if (y) {
									if ((f | 0) != (-1 | 0)) {
										w = f;
										p = a;
										v = 194;
										break d
									}
								} else
									v = 184
							} else
								a = 0
						} else
							v = 174;
					while (0);
					do
						if ((v | 0) == 174) {
							g = Xa(0) | 0;
							if ((g | 0) != (-1 | 0)) {
								a = g;
								d = c[1941] | 0;
								f = d + -1 | 0;
								if (!(f & a))
									d = l;
								else
									d = l - a + (f + a & 0 - d) | 0;
								a = c[1930] | 0;
								f = a + d | 0;
								if (d >>> 0 > q >>> 0 & d >>> 0 < 2147483647) {
									y = c[1932] | 0;
									if ((y | 0) != 0 ? f >>> 0 <= a >>> 0 | f >>> 0 > y >>> 0 : 0) {
										a = 0;
										break
									}
									f = Xa(d | 0) | 0;
									y = (f | 0) == (g | 0);
									a = y ? d : 0;
									if (y) {
										w = g;
										p = a;
										v = 194;
										break d
									} else
										v = 184
								} else
									a = 0
							} else
								a = 0
						}
					while (0);
					f : do
						if ((v | 0) == 184) {
							g = 0 - d | 0;
							do
								if (j >>> 0 > d >>> 0 & (d >>> 0 < 2147483647 & (f | 0) != (-1 | 0)) ? (u = c[1942] | 0, u = k - d + u & 0 - u, u >>> 0 < 2147483647) : 0)
									if ((Xa(u | 0) | 0) == (-1 | 0)) {
										Xa(g | 0) | 0;
										break f
									} else {
										d = u + d | 0;
										break
									}
							while (0);
							if ((f | 0) != (-1 | 0)) {
								w = f;
								p = d;
								v = 194;
								break d
							}
						}
					while (0);
					c[1933] = c[1933] | 4;
					v = 191
				} else {
					a = 0;
					v = 191
				}
			while (0);
			if ((((v | 0) == 191 ? l >>> 0 < 2147483647 : 0) ? (w = Xa(l | 0) | 0, x = Xa(0) | 0, w >>> 0 < x >>> 0 & ((w | 0) != (-1 | 0) & (x | 0) != (-1 | 0))) : 0) ? (z = x - w | 0, A = z >>> 0 > (q + 40 | 0) >>> 0, A) : 0) {
				p = A ? z : a;
				v = 194
			}
			if ((v | 0) == 194) {
				a = (c[1930] | 0) + p | 0;
				c[1930] = a;
				if (a >>> 0 > (c[1931] | 0) >>> 0)
					c[1931] = a;
				h = c[1828] | 0;
				g : do
					if (h) {
						g = 7736;
						do {
							a = c[g >> 2] | 0;
							d = g + 4 | 0;
							f = c[d >> 2] | 0;
							if ((w | 0) == (a + f | 0)) {
								B = a;
								C = d;
								D = f;
								E = g;
								v = 204;
								break
							}
							g = c[g + 8 >> 2] | 0
						} while ((g | 0) != 0);
						if (((v | 0) == 204 ? (c[E + 12 >> 2] & 8 | 0) == 0 : 0) ? h >>> 0 < w >>> 0 & h >>> 0 >= B >>> 0 : 0) {
							c[C >> 2] = D + p;
							M = (c[1825] | 0) + p | 0;
							L = h + 8 | 0;
							L = (L & 7 | 0) == 0 ? 0 : 0 - L & 7;
							K = M - L | 0;
							c[1828] = h + L;
							c[1825] = K;
							c[h + (L + 4) >> 2] = K | 1;
							c[h + (M + 4) >> 2] = 40;
							c[1829] = c[1944];
							break
						}
						a = c[1826] | 0;
						if (w >>> 0 < a >>> 0) {
							c[1826] = w;
							a = w
						}
						d = w + p | 0;
						g = 7736;
						while (1) {
							if ((c[g >> 2] | 0) == (d | 0)) {
								f = g;
								d = g;
								v = 212;
								break
							}
							g = c[g + 8 >> 2] | 0;
							if (!g) {
								d = 7736;
								break
							}
						}
						if ((v | 0) == 212)
							if (!(c[d + 12 >> 2] & 8)) {
								c[f >> 2] = w;
								n = d + 4 | 0;
								c[n >> 2] = (c[n >> 2] | 0) + p;
								n = w + 8 | 0;
								n = (n & 7 | 0) == 0 ? 0 : 0 - n & 7;
								k = w + (p + 8) | 0;
								k = (k & 7 | 0) == 0 ? 0 : 0 - k & 7;
								b = w + (k + p) | 0;
								m = n + q | 0;
								o = w + m | 0;
								l = b - (w + n) - q | 0;
								c[w + (n + 4) >> 2] = q | 3;
								h : do
									if ((b | 0) != (h | 0)) {
										if ((b | 0) == (c[1827] | 0)) {
											M = (c[1824] | 0) + l | 0;
											c[1824] = M;
											c[1827] = o;
											c[w + (m + 4) >> 2] = M | 1;
											c[w + (M + m) >> 2] = M;
											break
										}
										i = p + 4 | 0;
										d = c[w + (i + k) >> 2] | 0;
										if ((d & 3 | 0) == 1) {
											j = d & -8;
											g = d >>> 3;
											i : do
												if (d >>> 0 >= 256) {
													h = c[w + ((k | 24) + p) >> 2] | 0;
													e = c[w + (p + 12 + k) >> 2] | 0;
													do
														if ((e | 0) == (b | 0)) {
															f = k | 16;
															e = w + (i + f) | 0;
															d = c[e >> 2] | 0;
															if (!d) {
																e = w + (f + p) | 0;
																d = c[e >> 2] | 0;
																if (!d) {
																	J = 0;
																	break
																}
															}
															while (1) {
																f = d + 20 | 0;
																g = c[f >> 2] | 0;
																if (g) {
																	d = g;
																	e = f;
																	continue
																}
																f = d + 16 | 0;
																g = c[f >> 2] | 0;
																if (!g)
																	break;
																else {
																	d = g;
																	e = f
																}
															}
															if (e >>> 0 < a >>> 0)
																bb();
															else {
																c[e >> 2] = 0;
																J = d;
																break
															}
														} else {
															f = c[w + ((k | 8) + p) >> 2] | 0;
															if (f >>> 0 < a >>> 0)
																bb();
															a = f + 12 | 0;
															if ((c[a >> 2] | 0) != (b | 0))
																bb();
															d = e + 8 | 0;
															if ((c[d >> 2] | 0) == (b | 0)) {
																c[a >> 2] = e;
																c[d >> 2] = f;
																J = e;
																break
															} else
																bb()
														}
													while (0);
													if (!h)
														break;
													a = c[w + (p + 28 + k) >> 2] | 0;
													d = 7592 + (a << 2) | 0;
													do
														if ((b | 0) != (c[d >> 2] | 0)) {
															if (h >>> 0 < (c[1826] | 0) >>> 0)
																bb();
															a = h + 16 | 0;
															if ((c[a >> 2] | 0) == (b | 0))
																c[a >> 2] = J;
															else
																c[h + 20 >> 2] = J;
															if (!J)
																break i
														} else {
															c[d >> 2] = J;
															if (J)
																break;
															c[1823] = c[1823] & ~(1 << a);
															break i
														}
													while (0);
													d = c[1826] | 0;
													if (J >>> 0 < d >>> 0)
														bb();
													c[J + 24 >> 2] = h;
													b = k | 16;
													a = c[w + (b + p) >> 2] | 0;
													do
														if (a)
															if (a >>> 0 < d >>> 0)
																bb();
															else {
																c[J + 16 >> 2] = a;
																c[a + 24 >> 2] = J;
																break
															}
													while (0);
													b = c[w + (i + b) >> 2] | 0;
													if (!b)
														break;
													if (b >>> 0 < (c[1826] | 0) >>> 0)
														bb();
													else {
														c[J + 20 >> 2] = b;
														c[b + 24 >> 2] = J;
														break
													}
												} else {
													e = c[w + ((k | 8) + p) >> 2] | 0;
													f = c[w + (p + 12 + k) >> 2] | 0;
													d = 7328 + (g << 1 << 2) | 0;
													do
														if ((e | 0) != (d | 0)) {
															if (e >>> 0 < a >>> 0)
																bb();
															if ((c[e + 12 >> 2] | 0) == (b | 0))
																break;
															bb()
														}
													while (0);
													if ((f | 0) == (e | 0)) {
														c[1822] = c[1822] & ~(1 << g);
														break
													}
													do
														if ((f | 0) == (d | 0))
															F = f + 8 | 0;
														else {
															if (f >>> 0 < a >>> 0)
																bb();
															a = f + 8 | 0;
															if ((c[a >> 2] | 0) == (b | 0)) {
																F = a;
																break
															}
															bb()
														}
													while (0);
													c[e + 12 >> 2] = f;
													c[F >> 2] = e
												}
											while (0);
											b = w + ((j | k) + p) | 0;
											f = j + l | 0
										} else
											f = l;
										b = b + 4 | 0;
										c[b >> 2] = c[b >> 2] & -2;
										c[w + (m + 4) >> 2] = f | 1;
										c[w + (f + m) >> 2] = f;
										b = f >>> 3;
										if (f >>> 0 < 256) {
											a = b << 1;
											e = 7328 + (a << 2) | 0;
											d = c[1822] | 0;
											b = 1 << b;
											do
												if (!(d & b)) {
													c[1822] = d | b;
													K = 7328 + (a + 2 << 2) | 0;
													L = e
												} else {
													b = 7328 + (a + 2 << 2) | 0;
													a = c[b >> 2] | 0;
													if (a >>> 0 >= (c[1826] | 0) >>> 0) {
														K = b;
														L = a;
														break
													}
													bb()
												}
											while (0);
											c[K >> 2] = o;
											c[L + 12 >> 2] = o;
											c[w + (m + 8) >> 2] = L;
											c[w + (m + 12) >> 2] = e;
											break
										}
										b = f >>> 8;
										do
											if (!b)
												e = 0;
											else {
												if (f >>> 0 > 16777215) {
													e = 31;
													break
												}
												K = (b + 1048320 | 0) >>> 16 & 8;
												L = b << K;
												J = (L + 520192 | 0) >>> 16 & 4;
												L = L << J;
												e = (L + 245760 | 0) >>> 16 & 2;
												e = 14 - (J | K | e) + (L << e >>> 15) | 0;
												e = f >>> (e + 7 | 0) & 1 | e << 1
											}
										while (0);
										b = 7592 + (e << 2) | 0;
										c[w + (m + 28) >> 2] = e;
										c[w + (m + 20) >> 2] = 0;
										c[w + (m + 16) >> 2] = 0;
										a = c[1823] | 0;
										d = 1 << e;
										if (!(a & d)) {
											c[1823] = a | d;
											c[b >> 2] = o;
											c[w + (m + 24) >> 2] = b;
											c[w + (m + 12) >> 2] = o;
											c[w + (m + 8) >> 2] = o;
											break
										}
										b = c[b >> 2] | 0;
										j : do
											if ((c[b + 4 >> 2] & -8 | 0) != (f | 0)) {
												e = f << ((e | 0) == 31 ? 0 : 25 - (e >>> 1) | 0);
												while (1) {
													a = b + 16 + (e >>> 31 << 2) | 0;
													d = c[a >> 2] | 0;
													if (!d)
														break;
													if ((c[d + 4 >> 2] & -8 | 0) == (f | 0)) {
														M = d;
														break j
													} else {
														e = e << 1;
														b = d
													}
												}
												if (a >>> 0 < (c[1826] | 0) >>> 0)
													bb();
												else {
													c[a >> 2] = o;
													c[w + (m + 24) >> 2] = b;
													c[w + (m + 12) >> 2] = o;
													c[w + (m + 8) >> 2] = o;
													break h
												}
											} else
												M = b;
										while (0);
										b = M + 8 | 0;
										a = c[b >> 2] | 0;
										L = c[1826] | 0;
										if (a >>> 0 >= L >>> 0 & M >>> 0 >= L >>> 0) {
											c[a + 12 >> 2] = o;
											c[b >> 2] = o;
											c[w + (m + 8) >> 2] = a;
											c[w + (m + 12) >> 2] = M;
											c[w + (m + 24) >> 2] = 0;
											break
										} else
											bb()
									} else {
										M = (c[1825] | 0) + l | 0;
										c[1825] = M;
										c[1828] = o;
										c[w + (m + 4) >> 2] = M | 1
									}
								while (0);
								M = w + (n | 8) | 0;
								return M | 0
							} else
								d = 7736;
						while (1) {
							a = c[d >> 2] | 0;
							if (a >>> 0 <= h >>> 0 ? (b = c[d + 4 >> 2] | 0, e = a + b | 0, e >>> 0 > h >>> 0) : 0)
								break;
							d = c[d + 8 >> 2] | 0
						}
						f = a + (b + -39) | 0;
						a = a + (b + -47 + ((f & 7 | 0) == 0 ? 0 : 0 - f & 7)) | 0;
						f = h + 16 | 0;
						a = a >>> 0 < f >>> 0 ? h : a;
						b = a + 8 | 0;
						d = w + 8 | 0;
						d = (d & 7 | 0) == 0 ? 0 : 0 - d & 7;
						M = p + -40 - d | 0;
						c[1828] = w + d;
						c[1825] = M;
						c[w + (d + 4) >> 2] = M | 1;
						c[w + (p + -36) >> 2] = 40;
						c[1829] = c[1944];
						d = a + 4 | 0;
						c[d >> 2] = 27;
						c[b >> 2] = c[1934];
						c[b + 4 >> 2] = c[1935];
						c[b + 8 >> 2] = c[1936];
						c[b + 12 >> 2] = c[1937];
						c[1934] = w;
						c[1935] = p;
						c[1937] = 0;
						c[1936] = b;
						b = a + 28 | 0;
						c[b >> 2] = 7;
						if ((a + 32 | 0) >>> 0 < e >>> 0)
							do {
								M = b;
								b = b + 4 | 0;
								c[b >> 2] = 7
							} while ((M + 8 | 0) >>> 0 < e >>> 0);
						if ((a | 0) != (h | 0)) {
							g = a - h | 0;
							c[d >> 2] = c[d >> 2] & -2;
							c[h + 4 >> 2] = g | 1;
							c[a >> 2] = g;
							b = g >>> 3;
							if (g >>> 0 < 256) {
								a = b << 1;
								e = 7328 + (a << 2) | 0;
								d = c[1822] | 0;
								b = 1 << b;
								if (d & b) {
									b = 7328 + (a + 2 << 2) | 0;
									a = c[b >> 2] | 0;
									if (a >>> 0 < (c[1826] | 0) >>> 0)
										bb();
									else {
										G = b;
										H = a
									}
								} else {
									c[1822] = d | b;
									G = 7328 + (a + 2 << 2) | 0;
									H = e
								}
								c[G >> 2] = h;
								c[H + 12 >> 2] = h;
								c[h + 8 >> 2] = H;
								c[h + 12 >> 2] = e;
								break
							}
							b = g >>> 8;
							if (b)
								if (g >>> 0 > 16777215)
									e = 31;
								else {
									L = (b + 1048320 | 0) >>> 16 & 8;
									M = b << L;
									K = (M + 520192 | 0) >>> 16 & 4;
									M = M << K;
									e = (M + 245760 | 0) >>> 16 & 2;
									e = 14 - (K | L | e) + (M << e >>> 15) | 0;
									e = g >>> (e + 7 | 0) & 1 | e << 1
								}
							else
								e = 0;
							d = 7592 + (e << 2) | 0;
							c[h + 28 >> 2] = e;
							c[h + 20 >> 2] = 0;
							c[f >> 2] = 0;
							b = c[1823] | 0;
							a = 1 << e;
							if (!(b & a)) {
								c[1823] = b | a;
								c[d >> 2] = h;
								c[h + 24 >> 2] = d;
								c[h + 12 >> 2] = h;
								c[h + 8 >> 2] = h;
								break
							}
							b = c[d >> 2] | 0;
							k : do
								if ((c[b + 4 >> 2] & -8 | 0) != (g | 0)) {
									e = g << ((e | 0) == 31 ? 0 : 25 - (e >>> 1) | 0);
									while (1) {
										a = b + 16 + (e >>> 31 << 2) | 0;
										d = c[a >> 2] | 0;
										if (!d)
											break;
										if ((c[d + 4 >> 2] & -8 | 0) == (g | 0)) {
											I = d;
											break k
										} else {
											e = e << 1;
											b = d
										}
									}
									if (a >>> 0 < (c[1826] | 0) >>> 0)
										bb();
									else {
										c[a >> 2] = h;
										c[h + 24 >> 2] = b;
										c[h + 12 >> 2] = h;
										c[h + 8 >> 2] = h;
										break g
									}
								} else
									I = b;
							while (0);
							b = I + 8 | 0;
							a = c[b >> 2] | 0;
							M = c[1826] | 0;
							if (a >>> 0 >= M >>> 0 & I >>> 0 >= M >>> 0) {
								c[a + 12 >> 2] = h;
								c[b >> 2] = h;
								c[h + 8 >> 2] = a;
								c[h + 12 >> 2] = I;
								c[h + 24 >> 2] = 0;
								break
							} else
								bb()
						}
					} else {
						M = c[1826] | 0;
						if ((M | 0) == 0 | w >>> 0 < M >>> 0)
							c[1826] = w;
						c[1934] = w;
						c[1935] = p;
						c[1937] = 0;
						c[1831] = c[1940];
						c[1830] = -1;
						b = 0;
						do {
							M = b << 1;
							L = 7328 + (M << 2) | 0;
							c[7328 + (M + 3 << 2) >> 2] = L;
							c[7328 + (M + 2 << 2) >> 2] = L;
							b = b + 1 | 0
						} while ((b | 0) != 32);
						M = w + 8 | 0;
						M = (M & 7 | 0) == 0 ? 0 : 0 - M & 7;
						L = p + -40 - M | 0;
						c[1828] = w + M;
						c[1825] = L;
						c[w + (M + 4) >> 2] = L | 1;
						c[w + (p + -36) >> 2] = 40;
						c[1829] = c[1944]
					}
				while (0);
				b = c[1825] | 0;
				if (b >>> 0 > q >>> 0) {
					L = b - q | 0;
					c[1825] = L;
					M = c[1828] | 0;
					c[1828] = M + q;
					c[M + (q + 4) >> 2] = L | 1;
					c[M + 4 >> 2] = q | 3;
					M = M + 8 | 0;
					return M | 0
				}
			}
			c[(Vh() | 0) >> 2] = 12;
			M = 0;
			return M | 0
		}
		function gj(a) {
			a = a | 0;
			var b = 0,
			d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0;
			if (!a)
				return;
			b = a + -8 | 0;
			i = c[1826] | 0;
			if (b >>> 0 < i >>> 0)
				bb();
			d = c[a + -4 >> 2] | 0;
			e = d & 3;
			if ((e | 0) == 1)
				bb();
			o = d & -8;
			q = a + (o + -8) | 0;
			do
				if (!(d & 1)) {
					b = c[b >> 2] | 0;
					if (!e)
						return;
					j = -8 - b | 0;
					l = a + j | 0;
					m = b + o | 0;
					if (l >>> 0 < i >>> 0)
						bb();
					if ((l | 0) == (c[1827] | 0)) {
						b = a + (o + -4) | 0;
						d = c[b >> 2] | 0;
						if ((d & 3 | 0) != 3) {
							u = l;
							g = m;
							break
						}
						c[1824] = m;
						c[b >> 2] = d & -2;
						c[a + (j + 4) >> 2] = m | 1;
						c[q >> 2] = m;
						return
					}
					f = b >>> 3;
					if (b >>> 0 < 256) {
						e = c[a + (j + 8) >> 2] | 0;
						d = c[a + (j + 12) >> 2] | 0;
						b = 7328 + (f << 1 << 2) | 0;
						if ((e | 0) != (b | 0)) {
							if (e >>> 0 < i >>> 0)
								bb();
							if ((c[e + 12 >> 2] | 0) != (l | 0))
								bb()
						}
						if ((d | 0) == (e | 0)) {
							c[1822] = c[1822] & ~(1 << f);
							u = l;
							g = m;
							break
						}
						if ((d | 0) != (b | 0)) {
							if (d >>> 0 < i >>> 0)
								bb();
							b = d + 8 | 0;
							if ((c[b >> 2] | 0) == (l | 0))
								h = b;
							else
								bb()
						} else
							h = d + 8 | 0;
						c[e + 12 >> 2] = d;
						c[h >> 2] = e;
						u = l;
						g = m;
						break
					}
					h = c[a + (j + 24) >> 2] | 0;
					e = c[a + (j + 12) >> 2] | 0;
					do
						if ((e | 0) == (l | 0)) {
							d = a + (j + 20) | 0;
							b = c[d >> 2] | 0;
							if (!b) {
								d = a + (j + 16) | 0;
								b = c[d >> 2] | 0;
								if (!b) {
									k = 0;
									break
								}
							}
							while (1) {
								e = b + 20 | 0;
								f = c[e >> 2] | 0;
								if (f) {
									b = f;
									d = e;
									continue
								}
								e = b + 16 | 0;
								f = c[e >> 2] | 0;
								if (!f)
									break;
								else {
									b = f;
									d = e
								}
							}
							if (d >>> 0 < i >>> 0)
								bb();
							else {
								c[d >> 2] = 0;
								k = b;
								break
							}
						} else {
							f = c[a + (j + 8) >> 2] | 0;
							if (f >>> 0 < i >>> 0)
								bb();
							b = f + 12 | 0;
							if ((c[b >> 2] | 0) != (l | 0))
								bb();
							d = e + 8 | 0;
							if ((c[d >> 2] | 0) == (l | 0)) {
								c[b >> 2] = e;
								c[d >> 2] = f;
								k = e;
								break
							} else
								bb()
						}
					while (0);
					if (h) {
						b = c[a + (j + 28) >> 2] | 0;
						d = 7592 + (b << 2) | 0;
						if ((l | 0) == (c[d >> 2] | 0)) {
							c[d >> 2] = k;
							if (!k) {
								c[1823] = c[1823] & ~(1 << b);
								u = l;
								g = m;
								break
							}
						} else {
							if (h >>> 0 < (c[1826] | 0) >>> 0)
								bb();
							b = h + 16 | 0;
							if ((c[b >> 2] | 0) == (l | 0))
								c[b >> 2] = k;
							else
								c[h + 20 >> 2] = k;
							if (!k) {
								u = l;
								g = m;
								break
							}
						}
						d = c[1826] | 0;
						if (k >>> 0 < d >>> 0)
							bb();
						c[k + 24 >> 2] = h;
						b = c[a + (j + 16) >> 2] | 0;
						do
							if (b)
								if (b >>> 0 < d >>> 0)
									bb();
								else {
									c[k + 16 >> 2] = b;
									c[b + 24 >> 2] = k;
									break
								}
						while (0);
						b = c[a + (j + 20) >> 2] | 0;
						if (b)
							if (b >>> 0 < (c[1826] | 0) >>> 0)
								bb();
							else {
								c[k + 20 >> 2] = b;
								c[b + 24 >> 2] = k;
								u = l;
								g = m;
								break
							}
						else {
							u = l;
							g = m
						}
					} else {
						u = l;
						g = m
					}
				} else {
					u = b;
					g = o
				}
			while (0);
			if (u >>> 0 >= q >>> 0)
				bb();
			b = a + (o + -4) | 0;
			d = c[b >> 2] | 0;
			if (!(d & 1))
				bb();
			if (!(d & 2)) {
				if ((q | 0) == (c[1828] | 0)) {
					t = (c[1825] | 0) + g | 0;
					c[1825] = t;
					c[1828] = u;
					c[u + 4 >> 2] = t | 1;
					if ((u | 0) != (c[1827] | 0))
						return;
					c[1827] = 0;
					c[1824] = 0;
					return
				}
				if ((q | 0) == (c[1827] | 0)) {
					t = (c[1824] | 0) + g | 0;
					c[1824] = t;
					c[1827] = u;
					c[u + 4 >> 2] = t | 1;
					c[u + t >> 2] = t;
					return
				}
				g = (d & -8) + g | 0;
				f = d >>> 3;
				do
					if (d >>> 0 >= 256) {
						h = c[a + (o + 16) >> 2] | 0;
						b = c[a + (o | 4) >> 2] | 0;
						do
							if ((b | 0) == (q | 0)) {
								d = a + (o + 12) | 0;
								b = c[d >> 2] | 0;
								if (!b) {
									d = a + (o + 8) | 0;
									b = c[d >> 2] | 0;
									if (!b) {
										p = 0;
										break
									}
								}
								while (1) {
									e = b + 20 | 0;
									f = c[e >> 2] | 0;
									if (f) {
										b = f;
										d = e;
										continue
									}
									e = b + 16 | 0;
									f = c[e >> 2] | 0;
									if (!f)
										break;
									else {
										b = f;
										d = e
									}
								}
								if (d >>> 0 < (c[1826] | 0) >>> 0)
									bb();
								else {
									c[d >> 2] = 0;
									p = b;
									break
								}
							} else {
								d = c[a + o >> 2] | 0;
								if (d >>> 0 < (c[1826] | 0) >>> 0)
									bb();
								e = d + 12 | 0;
								if ((c[e >> 2] | 0) != (q | 0))
									bb();
								f = b + 8 | 0;
								if ((c[f >> 2] | 0) == (q | 0)) {
									c[e >> 2] = b;
									c[f >> 2] = d;
									p = b;
									break
								} else
									bb()
							}
						while (0);
						if (h) {
							b = c[a + (o + 20) >> 2] | 0;
							d = 7592 + (b << 2) | 0;
							if ((q | 0) == (c[d >> 2] | 0)) {
								c[d >> 2] = p;
								if (!p) {
									c[1823] = c[1823] & ~(1 << b);
									break
								}
							} else {
								if (h >>> 0 < (c[1826] | 0) >>> 0)
									bb();
								b = h + 16 | 0;
								if ((c[b >> 2] | 0) == (q | 0))
									c[b >> 2] = p;
								else
									c[h + 20 >> 2] = p;
								if (!p)
									break
							}
							d = c[1826] | 0;
							if (p >>> 0 < d >>> 0)
								bb();
							c[p + 24 >> 2] = h;
							b = c[a + (o + 8) >> 2] | 0;
							do
								if (b)
									if (b >>> 0 < d >>> 0)
										bb();
									else {
										c[p + 16 >> 2] = b;
										c[b + 24 >> 2] = p;
										break
									}
							while (0);
							b = c[a + (o + 12) >> 2] | 0;
							if (b)
								if (b >>> 0 < (c[1826] | 0) >>> 0)
									bb();
								else {
									c[p + 20 >> 2] = b;
									c[b + 24 >> 2] = p;
									break
								}
						}
					} else {
						e = c[a + o >> 2] | 0;
						d = c[a + (o | 4) >> 2] | 0;
						b = 7328 + (f << 1 << 2) | 0;
						if ((e | 0) != (b | 0)) {
							if (e >>> 0 < (c[1826] | 0) >>> 0)
								bb();
							if ((c[e + 12 >> 2] | 0) != (q | 0))
								bb()
						}
						if ((d | 0) == (e | 0)) {
							c[1822] = c[1822] & ~(1 << f);
							break
						}
						if ((d | 0) != (b | 0)) {
							if (d >>> 0 < (c[1826] | 0) >>> 0)
								bb();
							b = d + 8 | 0;
							if ((c[b >> 2] | 0) == (q | 0))
								n = b;
							else
								bb()
						} else
							n = d + 8 | 0;
						c[e + 12 >> 2] = d;
						c[n >> 2] = e
					}
				while (0);
				c[u + 4 >> 2] = g | 1;
				c[u + g >> 2] = g;
				if ((u | 0) == (c[1827] | 0)) {
					c[1824] = g;
					return
				}
			} else {
				c[b >> 2] = d & -2;
				c[u + 4 >> 2] = g | 1;
				c[u + g >> 2] = g
			}
			b = g >>> 3;
			if (g >>> 0 < 256) {
				d = b << 1;
				f = 7328 + (d << 2) | 0;
				e = c[1822] | 0;
				b = 1 << b;
				if (e & b) {
					b = 7328 + (d + 2 << 2) | 0;
					d = c[b >> 2] | 0;
					if (d >>> 0 < (c[1826] | 0) >>> 0)
						bb();
					else {
						r = b;
						s = d
					}
				} else {
					c[1822] = e | b;
					r = 7328 + (d + 2 << 2) | 0;
					s = f
				}
				c[r >> 2] = u;
				c[s + 12 >> 2] = u;
				c[u + 8 >> 2] = s;
				c[u + 12 >> 2] = f;
				return
			}
			b = g >>> 8;
			if (b)
				if (g >>> 0 > 16777215)
					f = 31;
				else {
					r = (b + 1048320 | 0) >>> 16 & 8;
					s = b << r;
					q = (s + 520192 | 0) >>> 16 & 4;
					s = s << q;
					f = (s + 245760 | 0) >>> 16 & 2;
					f = 14 - (q | r | f) + (s << f >>> 15) | 0;
					f = g >>> (f + 7 | 0) & 1 | f << 1
				}
			else
				f = 0;
			b = 7592 + (f << 2) | 0;
			c[u + 28 >> 2] = f;
			c[u + 20 >> 2] = 0;
			c[u + 16 >> 2] = 0;
			d = c[1823] | 0;
			e = 1 << f;
			a : do
				if (d & e) {
					b = c[b >> 2] | 0;
					b : do
						if ((c[b + 4 >> 2] & -8 | 0) != (g | 0)) {
							f = g << ((f | 0) == 31 ? 0 : 25 - (f >>> 1) | 0);
							while (1) {
								d = b + 16 + (f >>> 31 << 2) | 0;
								e = c[d >> 2] | 0;
								if (!e)
									break;
								if ((c[e + 4 >> 2] & -8 | 0) == (g | 0)) {
									t = e;
									break b
								} else {
									f = f << 1;
									b = e
								}
							}
							if (d >>> 0 < (c[1826] | 0) >>> 0)
								bb();
							else {
								c[d >> 2] = u;
								c[u + 24 >> 2] = b;
								c[u + 12 >> 2] = u;
								c[u + 8 >> 2] = u;
								break a
							}
						} else
							t = b;
					while (0);
					b = t + 8 | 0;
					d = c[b >> 2] | 0;
					s = c[1826] | 0;
					if (d >>> 0 >= s >>> 0 & t >>> 0 >= s >>> 0) {
						c[d + 12 >> 2] = u;
						c[b >> 2] = u;
						c[u + 8 >> 2] = d;
						c[u + 12 >> 2] = t;
						c[u + 24 >> 2] = 0;
						break
					} else
						bb()
				} else {
					c[1823] = d | e;
					c[b >> 2] = u;
					c[u + 24 >> 2] = b;
					c[u + 12 >> 2] = u;
					c[u + 8 >> 2] = u
				}
			while (0);
			u = (c[1830] | 0) + -1 | 0;
			c[1830] = u;
			if (!u)
				b = 7744;
			else
				return;
			while (1) {
				b = c[b >> 2] | 0;
				if (!b)
					break;
				else
					b = b + 8 | 0
			}
			c[1830] = -1;
			return
		}
		function hj(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0;
			if (a) {
				d = _(b, a) | 0;
				if ((b | a) >>> 0 > 65535)
					d = ((d >>> 0) / (a >>> 0) | 0 | 0) == (b | 0) ? d : -1
			} else
				d = 0;
			b = fj(d) | 0;
			if (!b)
				return b | 0;
			if (!(c[b + -4 >> 2] & 3))
				return b | 0;
			gs(b | 0, 0, d | 0) | 0;
			return b | 0
		}
		function ij(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0;
			if (!a) {
				a = fj(b) | 0;
				return a | 0
			}
			if (b >>> 0 > 4294967231) {
				c[(Vh() | 0) >> 2] = 12;
				a = 0;
				return a | 0
			}
			d = jj(a + -8 | 0, b >>> 0 < 11 ? 16 : b + 11 & -8) | 0;
			if (d) {
				a = d + 8 | 0;
				return a | 0
			}
			d = fj(b) | 0;
			if (!d) {
				a = 0;
				return a | 0
			}
			e = c[a + -4 >> 2] | 0;
			e = (e & -8) - ((e & 3 | 0) == 0 ? 8 : 4) | 0;
			js(d | 0, a | 0, (e >>> 0 < b >>> 0 ? e : b) | 0) | 0;
			gj(a);
			a = d;
			return a | 0
		}
		function jj(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0;
			o = a + 4 | 0;
			p = c[o >> 2] | 0;
			j = p & -8;
			l = a + j | 0;
			i = c[1826] | 0;
			d = p & 3;
			if (!((d | 0) != 1 & a >>> 0 >= i >>> 0 & a >>> 0 < l >>> 0))
				bb();
			e = a + (j | 4) | 0;
			f = c[e >> 2] | 0;
			if (!(f & 1))
				bb();
			if (!d) {
				if (b >>> 0 < 256) {
					a = 0;
					return a | 0
				}
				if (j >>> 0 >= (b + 4 | 0) >>> 0 ? (j - b | 0) >>> 0 <= c[1942] << 1 >>> 0 : 0)
					return a | 0;
				a = 0;
				return a | 0
			}
			if (j >>> 0 >= b >>> 0) {
				d = j - b | 0;
				if (d >>> 0 <= 15)
					return a | 0;
				c[o >> 2] = p & 1 | b | 2;
				c[a + (b + 4) >> 2] = d | 3;
				c[e >> 2] = c[e >> 2] | 1;
				kj(a + b | 0, d);
				return a | 0
			}
			if ((l | 0) == (c[1828] | 0)) {
				d = (c[1825] | 0) + j | 0;
				if (d >>> 0 <= b >>> 0) {
					a = 0;
					return a | 0
				}
				n = d - b | 0;
				c[o >> 2] = p & 1 | b | 2;
				c[a + (b + 4) >> 2] = n | 1;
				c[1828] = a + b;
				c[1825] = n;
				return a | 0
			}
			if ((l | 0) == (c[1827] | 0)) {
				e = (c[1824] | 0) + j | 0;
				if (e >>> 0 < b >>> 0) {
					a = 0;
					return a | 0
				}
				d = e - b | 0;
				if (d >>> 0 > 15) {
					c[o >> 2] = p & 1 | b | 2;
					c[a + (b + 4) >> 2] = d | 1;
					c[a + e >> 2] = d;
					e = a + (e + 4) | 0;
					c[e >> 2] = c[e >> 2] & -2;
					e = a + b | 0
				} else {
					c[o >> 2] = p & 1 | e | 2;
					e = a + (e + 4) | 0;
					c[e >> 2] = c[e >> 2] | 1;
					e = 0;
					d = 0
				}
				c[1824] = d;
				c[1827] = e;
				return a | 0
			}
			if (f & 2) {
				a = 0;
				return a | 0
			}
			m = (f & -8) + j | 0;
			if (m >>> 0 < b >>> 0) {
				a = 0;
				return a | 0
			}
			n = m - b | 0;
			g = f >>> 3;
			do
				if (f >>> 0 >= 256) {
					h = c[a + (j + 24) >> 2] | 0;
					g = c[a + (j + 12) >> 2] | 0;
					do
						if ((g | 0) == (l | 0)) {
							e = a + (j + 20) | 0;
							d = c[e >> 2] | 0;
							if (!d) {
								e = a + (j + 16) | 0;
								d = c[e >> 2] | 0;
								if (!d) {
									k = 0;
									break
								}
							}
							while (1) {
								f = d + 20 | 0;
								g = c[f >> 2] | 0;
								if (g) {
									d = g;
									e = f;
									continue
								}
								f = d + 16 | 0;
								g = c[f >> 2] | 0;
								if (!g)
									break;
								else {
									d = g;
									e = f
								}
							}
							if (e >>> 0 < i >>> 0)
								bb();
							else {
								c[e >> 2] = 0;
								k = d;
								break
							}
						} else {
							f = c[a + (j + 8) >> 2] | 0;
							if (f >>> 0 < i >>> 0)
								bb();
							d = f + 12 | 0;
							if ((c[d >> 2] | 0) != (l | 0))
								bb();
							e = g + 8 | 0;
							if ((c[e >> 2] | 0) == (l | 0)) {
								c[d >> 2] = g;
								c[e >> 2] = f;
								k = g;
								break
							} else
								bb()
						}
					while (0);
					if (h) {
						d = c[a + (j + 28) >> 2] | 0;
						e = 7592 + (d << 2) | 0;
						if ((l | 0) == (c[e >> 2] | 0)) {
							c[e >> 2] = k;
							if (!k) {
								c[1823] = c[1823] & ~(1 << d);
								break
							}
						} else {
							if (h >>> 0 < (c[1826] | 0) >>> 0)
								bb();
							d = h + 16 | 0;
							if ((c[d >> 2] | 0) == (l | 0))
								c[d >> 2] = k;
							else
								c[h + 20 >> 2] = k;
							if (!k)
								break
						}
						e = c[1826] | 0;
						if (k >>> 0 < e >>> 0)
							bb();
						c[k + 24 >> 2] = h;
						d = c[a + (j + 16) >> 2] | 0;
						do
							if (d)
								if (d >>> 0 < e >>> 0)
									bb();
								else {
									c[k + 16 >> 2] = d;
									c[d + 24 >> 2] = k;
									break
								}
						while (0);
						d = c[a + (j + 20) >> 2] | 0;
						if (d)
							if (d >>> 0 < (c[1826] | 0) >>> 0)
								bb();
							else {
								c[k + 20 >> 2] = d;
								c[d + 24 >> 2] = k;
								break
							}
					}
				} else {
					f = c[a + (j + 8) >> 2] | 0;
					e = c[a + (j + 12) >> 2] | 0;
					d = 7328 + (g << 1 << 2) | 0;
					if ((f | 0) != (d | 0)) {
						if (f >>> 0 < i >>> 0)
							bb();
						if ((c[f + 12 >> 2] | 0) != (l | 0))
							bb()
					}
					if ((e | 0) == (f | 0)) {
						c[1822] = c[1822] & ~(1 << g);
						break
					}
					if ((e | 0) != (d | 0)) {
						if (e >>> 0 < i >>> 0)
							bb();
						d = e + 8 | 0;
						if ((c[d >> 2] | 0) == (l | 0))
							h = d;
						else
							bb()
					} else
						h = e + 8 | 0;
					c[f + 12 >> 2] = e;
					c[h >> 2] = f
				}
			while (0);
			if (n >>> 0 < 16) {
				c[o >> 2] = m | p & 1 | 2;
				b = a + (m | 4) | 0;
				c[b >> 2] = c[b >> 2] | 1;
				return a | 0
			} else {
				c[o >> 2] = p & 1 | b | 2;
				c[a + (b + 4) >> 2] = n | 3;
				p = a + (m | 4) | 0;
				c[p >> 2] = c[p >> 2] | 1;
				kj(a + b | 0, n);
				return a | 0
			}
			return 0
		}
		function kj(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0;
			q = a + b | 0;
			d = c[a + 4 >> 2] | 0;
			do
				if (!(d & 1)) {
					k = c[a >> 2] | 0;
					if (!(d & 3))
						return;
					n = a + (0 - k) | 0;
					m = k + b | 0;
					j = c[1826] | 0;
					if (n >>> 0 < j >>> 0)
						bb();
					if ((n | 0) == (c[1827] | 0)) {
						e = a + (b + 4) | 0;
						d = c[e >> 2] | 0;
						if ((d & 3 | 0) != 3) {
							t = n;
							h = m;
							break
						}
						c[1824] = m;
						c[e >> 2] = d & -2;
						c[a + (4 - k) >> 2] = m | 1;
						c[q >> 2] = m;
						return
					}
					g = k >>> 3;
					if (k >>> 0 < 256) {
						f = c[a + (8 - k) >> 2] | 0;
						e = c[a + (12 - k) >> 2] | 0;
						d = 7328 + (g << 1 << 2) | 0;
						if ((f | 0) != (d | 0)) {
							if (f >>> 0 < j >>> 0)
								bb();
							if ((c[f + 12 >> 2] | 0) != (n | 0))
								bb()
						}
						if ((e | 0) == (f | 0)) {
							c[1822] = c[1822] & ~(1 << g);
							t = n;
							h = m;
							break
						}
						if ((e | 0) != (d | 0)) {
							if (e >>> 0 < j >>> 0)
								bb();
							d = e + 8 | 0;
							if ((c[d >> 2] | 0) == (n | 0))
								i = d;
							else
								bb()
						} else
							i = e + 8 | 0;
						c[f + 12 >> 2] = e;
						c[i >> 2] = f;
						t = n;
						h = m;
						break
					}
					i = c[a + (24 - k) >> 2] | 0;
					f = c[a + (12 - k) >> 2] | 0;
					do
						if ((f | 0) == (n | 0)) {
							f = 16 - k | 0;
							e = a + (f + 4) | 0;
							d = c[e >> 2] | 0;
							if (!d) {
								e = a + f | 0;
								d = c[e >> 2] | 0;
								if (!d) {
									l = 0;
									break
								}
							}
							while (1) {
								f = d + 20 | 0;
								g = c[f >> 2] | 0;
								if (g) {
									d = g;
									e = f;
									continue
								}
								f = d + 16 | 0;
								g = c[f >> 2] | 0;
								if (!g)
									break;
								else {
									d = g;
									e = f
								}
							}
							if (e >>> 0 < j >>> 0)
								bb();
							else {
								c[e >> 2] = 0;
								l = d;
								break
							}
						} else {
							g = c[a + (8 - k) >> 2] | 0;
							if (g >>> 0 < j >>> 0)
								bb();
							d = g + 12 | 0;
							if ((c[d >> 2] | 0) != (n | 0))
								bb();
							e = f + 8 | 0;
							if ((c[e >> 2] | 0) == (n | 0)) {
								c[d >> 2] = f;
								c[e >> 2] = g;
								l = f;
								break
							} else
								bb()
						}
					while (0);
					if (i) {
						d = c[a + (28 - k) >> 2] | 0;
						e = 7592 + (d << 2) | 0;
						if ((n | 0) == (c[e >> 2] | 0)) {
							c[e >> 2] = l;
							if (!l) {
								c[1823] = c[1823] & ~(1 << d);
								t = n;
								h = m;
								break
							}
						} else {
							if (i >>> 0 < (c[1826] | 0) >>> 0)
								bb();
							d = i + 16 | 0;
							if ((c[d >> 2] | 0) == (n | 0))
								c[d >> 2] = l;
							else
								c[i + 20 >> 2] = l;
							if (!l) {
								t = n;
								h = m;
								break
							}
						}
						f = c[1826] | 0;
						if (l >>> 0 < f >>> 0)
							bb();
						c[l + 24 >> 2] = i;
						d = 16 - k | 0;
						e = c[a + d >> 2] | 0;
						do
							if (e)
								if (e >>> 0 < f >>> 0)
									bb();
								else {
									c[l + 16 >> 2] = e;
									c[e + 24 >> 2] = l;
									break
								}
						while (0);
						d = c[a + (d + 4) >> 2] | 0;
						if (d)
							if (d >>> 0 < (c[1826] | 0) >>> 0)
								bb();
							else {
								c[l + 20 >> 2] = d;
								c[d + 24 >> 2] = l;
								t = n;
								h = m;
								break
							}
						else {
							t = n;
							h = m
						}
					} else {
						t = n;
						h = m
					}
				} else {
					t = a;
					h = b
				}
			while (0);
			j = c[1826] | 0;
			if (q >>> 0 < j >>> 0)
				bb();
			d = a + (b + 4) | 0;
			e = c[d >> 2] | 0;
			if (!(e & 2)) {
				if ((q | 0) == (c[1828] | 0)) {
					s = (c[1825] | 0) + h | 0;
					c[1825] = s;
					c[1828] = t;
					c[t + 4 >> 2] = s | 1;
					if ((t | 0) != (c[1827] | 0))
						return;
					c[1827] = 0;
					c[1824] = 0;
					return
				}
				if ((q | 0) == (c[1827] | 0)) {
					s = (c[1824] | 0) + h | 0;
					c[1824] = s;
					c[1827] = t;
					c[t + 4 >> 2] = s | 1;
					c[t + s >> 2] = s;
					return
				}
				h = (e & -8) + h | 0;
				g = e >>> 3;
				do
					if (e >>> 0 >= 256) {
						i = c[a + (b + 24) >> 2] | 0;
						f = c[a + (b + 12) >> 2] | 0;
						do
							if ((f | 0) == (q | 0)) {
								e = a + (b + 20) | 0;
								d = c[e >> 2] | 0;
								if (!d) {
									e = a + (b + 16) | 0;
									d = c[e >> 2] | 0;
									if (!d) {
										p = 0;
										break
									}
								}
								while (1) {
									f = d + 20 | 0;
									g = c[f >> 2] | 0;
									if (g) {
										d = g;
										e = f;
										continue
									}
									f = d + 16 | 0;
									g = c[f >> 2] | 0;
									if (!g)
										break;
									else {
										d = g;
										e = f
									}
								}
								if (e >>> 0 < j >>> 0)
									bb();
								else {
									c[e >> 2] = 0;
									p = d;
									break
								}
							} else {
								g = c[a + (b + 8) >> 2] | 0;
								if (g >>> 0 < j >>> 0)
									bb();
								d = g + 12 | 0;
								if ((c[d >> 2] | 0) != (q | 0))
									bb();
								e = f + 8 | 0;
								if ((c[e >> 2] | 0) == (q | 0)) {
									c[d >> 2] = f;
									c[e >> 2] = g;
									p = f;
									break
								} else
									bb()
							}
						while (0);
						if (i) {
							d = c[a + (b + 28) >> 2] | 0;
							e = 7592 + (d << 2) | 0;
							if ((q | 0) == (c[e >> 2] | 0)) {
								c[e >> 2] = p;
								if (!p) {
									c[1823] = c[1823] & ~(1 << d);
									break
								}
							} else {
								if (i >>> 0 < (c[1826] | 0) >>> 0)
									bb();
								d = i + 16 | 0;
								if ((c[d >> 2] | 0) == (q | 0))
									c[d >> 2] = p;
								else
									c[i + 20 >> 2] = p;
								if (!p)
									break
							}
							e = c[1826] | 0;
							if (p >>> 0 < e >>> 0)
								bb();
							c[p + 24 >> 2] = i;
							d = c[a + (b + 16) >> 2] | 0;
							do
								if (d)
									if (d >>> 0 < e >>> 0)
										bb();
									else {
										c[p + 16 >> 2] = d;
										c[d + 24 >> 2] = p;
										break
									}
							while (0);
							d = c[a + (b + 20) >> 2] | 0;
							if (d)
								if (d >>> 0 < (c[1826] | 0) >>> 0)
									bb();
								else {
									c[p + 20 >> 2] = d;
									c[d + 24 >> 2] = p;
									break
								}
						}
					} else {
						f = c[a + (b + 8) >> 2] | 0;
						e = c[a + (b + 12) >> 2] | 0;
						d = 7328 + (g << 1 << 2) | 0;
						if ((f | 0) != (d | 0)) {
							if (f >>> 0 < j >>> 0)
								bb();
							if ((c[f + 12 >> 2] | 0) != (q | 0))
								bb()
						}
						if ((e | 0) == (f | 0)) {
							c[1822] = c[1822] & ~(1 << g);
							break
						}
						if ((e | 0) != (d | 0)) {
							if (e >>> 0 < j >>> 0)
								bb();
							d = e + 8 | 0;
							if ((c[d >> 2] | 0) == (q | 0))
								o = d;
							else
								bb()
						} else
							o = e + 8 | 0;
						c[f + 12 >> 2] = e;
						c[o >> 2] = f
					}
				while (0);
				c[t + 4 >> 2] = h | 1;
				c[t + h >> 2] = h;
				if ((t | 0) == (c[1827] | 0)) {
					c[1824] = h;
					return
				}
			} else {
				c[d >> 2] = e & -2;
				c[t + 4 >> 2] = h | 1;
				c[t + h >> 2] = h
			}
			d = h >>> 3;
			if (h >>> 0 < 256) {
				e = d << 1;
				g = 7328 + (e << 2) | 0;
				f = c[1822] | 0;
				d = 1 << d;
				if (f & d) {
					d = 7328 + (e + 2 << 2) | 0;
					e = c[d >> 2] | 0;
					if (e >>> 0 < (c[1826] | 0) >>> 0)
						bb();
					else {
						r = d;
						s = e
					}
				} else {
					c[1822] = f | d;
					r = 7328 + (e + 2 << 2) | 0;
					s = g
				}
				c[r >> 2] = t;
				c[s + 12 >> 2] = t;
				c[t + 8 >> 2] = s;
				c[t + 12 >> 2] = g;
				return
			}
			d = h >>> 8;
			if (d)
				if (h >>> 0 > 16777215)
					g = 31;
				else {
					r = (d + 1048320 | 0) >>> 16 & 8;
					s = d << r;
					q = (s + 520192 | 0) >>> 16 & 4;
					s = s << q;
					g = (s + 245760 | 0) >>> 16 & 2;
					g = 14 - (q | r | g) + (s << g >>> 15) | 0;
					g = h >>> (g + 7 | 0) & 1 | g << 1
				}
			else
				g = 0;
			d = 7592 + (g << 2) | 0;
			c[t + 28 >> 2] = g;
			c[t + 20 >> 2] = 0;
			c[t + 16 >> 2] = 0;
			e = c[1823] | 0;
			f = 1 << g;
			if (!(e & f)) {
				c[1823] = e | f;
				c[d >> 2] = t;
				c[t + 24 >> 2] = d;
				c[t + 12 >> 2] = t;
				c[t + 8 >> 2] = t;
				return
			}
			d = c[d >> 2] | 0;
			a : do
				if ((c[d + 4 >> 2] & -8 | 0) != (h | 0)) {
					g = h << ((g | 0) == 31 ? 0 : 25 - (g >>> 1) | 0);
					while (1) {
						e = d + 16 + (g >>> 31 << 2) | 0;
						f = c[e >> 2] | 0;
						if (!f)
							break;
						if ((c[f + 4 >> 2] & -8 | 0) == (h | 0)) {
							d = f;
							break a
						} else {
							g = g << 1;
							d = f
						}
					}
					if (e >>> 0 < (c[1826] | 0) >>> 0)
						bb();
					c[e >> 2] = t;
					c[t + 24 >> 2] = d;
					c[t + 12 >> 2] = t;
					c[t + 8 >> 2] = t;
					return
				}
			while (0);
			e = d + 8 | 0;
			f = c[e >> 2] | 0;
			s = c[1826] | 0;
			if (!(f >>> 0 >= s >>> 0 & d >>> 0 >= s >>> 0))
				bb();
			c[f + 12 >> 2] = t;
			c[e >> 2] = t;
			c[t + 8 >> 2] = f;
			c[t + 12 >> 2] = d;
			c[t + 24 >> 2] = 0;
			return
		}
		function lj(a) {
			a = a | 0;
			var b = 0,
			d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			j = 0,
			k = 0;
			k = i;
			i = i + 16 | 0;
			b = k + 8 | 0;
			h = k + 4 | 0;
			d = k;
			c[h >> 2] = a;
			do
				if (a >>> 0 >= 212) {
					g = (a >>> 0) / 210 | 0;
					e = g * 210 | 0;
					c[d >> 2] = a - e;
					b = (mj(7976, 8168, d, b) | 0) - 7976 >> 2;
					f = b;
					b = (c[7976 + (b << 2) >> 2] | 0) + e | 0;
					a : while (1) {
						e = 5;
						while (1) {
							if (e >>> 0 >= 47) {
								e = 211;
								j = 8;
								break
							}
							d = c[7784 + (e << 2) >> 2] | 0;
							a = (b >>> 0) / (d >>> 0) | 0;
							if (a >>> 0 < d >>> 0) {
								j = 106;
								break a
							}
							if ((b | 0) == (_(a, d) | 0))
								break;
							else
								e = e + 1 | 0
						}
						b : do
							if ((j | 0) == 8)
								while (1) {
									j = 0;
									d = (b >>> 0) / (e >>> 0) | 0;
									if (d >>> 0 < e >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(d, e) | 0))
										break b;
									d = e + 10 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 12 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 16 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 18 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 22 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 28 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 30 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 36 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 40 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 42 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 46 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 52 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 58 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 60 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 66 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 70 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 72 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 78 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 82 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 88 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 96 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 100 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 102 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 106 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 108 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 112 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 120 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 126 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 130 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 136 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 138 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 142 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 148 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 150 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 156 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 162 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 166 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 168 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 172 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 178 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 180 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 186 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 190 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 192 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 196 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 198 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break b;
									d = e + 208 | 0;
									a = (b >>> 0) / (d >>> 0) | 0;
									if (a >>> 0 < d >>> 0) {
										j = 105;
										break a
									}
									if ((b | 0) == (_(a, d) | 0))
										break;
									else {
										e = e + 210 | 0;
										j = 8
									}
								}
						while (0);
						e = f + 1 | 0;
						b = (e | 0) == 48;
						e = b ? 0 : e;
						b = (b & 1) + g | 0;
						f = e;
						g = b;
						b = (c[7976 + (e << 2) >> 2] | 0) + (b * 210 | 0) | 0
					}
					if ((j | 0) == 105) {
						c[h >> 2] = b;
						break
					} else if ((j | 0) == 106) {
						c[h >> 2] = b;
						break
					}
				} else
					b = c[(mj(7784, 7976, h, b) | 0) >> 2] | 0;
			while (0);
			i = k;
			return b | 0
		}
		function mj(a, b, d, e) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0;
			f = c[d >> 2] | 0;
			e = a;
			d = b - a >> 2;
			a : while (1) {
				while (1) {
					if (!d)
						break a;
					a = (d | 0) / 2 | 0;
					if ((c[e + (a << 2) >> 2] | 0) >>> 0 < f >>> 0)
						break;
					else
						d = a
				}
				e = e + (a + 1 << 2) | 0;
				d = d + -1 - a | 0
			}
			return e | 0
		}
		function nj(b, d) {
			b = b | 0;
			d = d | 0;
			if (!(a[d >> 0] & 1)) {
				c[b >> 2] = c[d >> 2];
				c[b + 4 >> 2] = c[d + 4 >> 2];
				c[b + 8 >> 2] = c[d + 8 >> 2]
			} else
				oj(b, c[d + 8 >> 2] | 0, c[d + 4 >> 2] | 0);
			return
		}
		function oj(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0;
			if (e >>> 0 > 4294967279)
				eh(b);
			if (e >>> 0 < 11) {
				a[b >> 0] = e << 1;
				b = b + 1 | 0
			} else {
				g = e + 16 & -16;
				f = gh(g) | 0;
				c[b + 8 >> 2] = f;
				c[b >> 2] = g | 1;
				c[b + 4 >> 2] = e;
				b = f
			}
			js(b | 0, d | 0, e | 0) | 0;
			a[b + e >> 0] = 0;
			return
		}
		function pj(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0;
			if (d >>> 0 > 4294967279)
				eh(b);
			if (d >>> 0 < 11) {
				a[b >> 0] = d << 1;
				b = b + 1 | 0
			} else {
				g = d + 16 & -16;
				f = gh(g) | 0;
				c[b + 8 >> 2] = f;
				c[b >> 2] = g | 1;
				c[b + 4 >> 2] = d;
				b = f
			}
			gs(b | 0, e | 0, d | 0) | 0;
			a[b + d >> 0] = 0;
			return
		}
		function qj(b) {
			b = b | 0;
			if (a[b >> 0] & 1)
				ih(c[b + 8 >> 2] | 0);
			return
		}
		function rj(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0;
			if ((b | 0) != (d | 0)) {
				e = a[d >> 0] | 0;
				f = (e & 1) == 0;
				tj(b, f ? d + 1 | 0 : c[d + 8 >> 2] | 0, f ? (e & 255) >>> 1 : c[d + 4 >> 2] | 0) | 0
			}
			return b | 0
		}
		function sj(a, b) {
			a = a | 0;
			b = b | 0;
			return tj(a, b, Ti(b) | 0) | 0
		}
		function tj(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0;
			f = a[b >> 0] | 0;
			if (!(f & 1))
				h = 10;
			else {
				f = c[b >> 2] | 0;
				h = (f & -2) + -1 | 0;
				f = f & 255
			}
			g = (f & 1) == 0;
			do
				if (h >>> 0 >= e >>> 0) {
					if (g)
						f = b + 1 | 0;
					else
						f = c[b + 8 >> 2] | 0;
					ls(f | 0, d | 0, e | 0) | 0;
					a[f + e >> 0] = 0;
					if (!(a[b >> 0] & 1)) {
						a[b >> 0] = e << 1;
						break
					} else {
						c[b + 4 >> 2] = e;
						break
					}
				} else {
					if (g)
						f = (f & 255) >>> 1;
					else
						f = c[b + 4 >> 2] | 0;
					Aj(b, h, e - h | 0, f, 0, f, e, d)
				}
			while (0);
			return b | 0
		}
		function uj(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0;
			f = a[b >> 0] | 0;
			g = (f & 1) == 0;
			if (g)
				f = (f & 255) >>> 1;
			else
				f = c[b + 4 >> 2] | 0;
			do
				if (f >>> 0 >= d >>> 0)
					if (g) {
						a[b + 1 + d >> 0] = 0;
						a[b >> 0] = d << 1;
						break
					} else {
						a[(c[b + 8 >> 2] | 0) + d >> 0] = 0;
						c[b + 4 >> 2] = d;
						break
					}
				else
					vj(b, d - f | 0, e) | 0;
			while (0);
			return
		}
		function vj(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0;
			if (d) {
				f = a[b >> 0] | 0;
				if (!(f & 1))
					g = 10;
				else {
					f = c[b >> 2] | 0;
					g = (f & -2) + -1 | 0;
					f = f & 255
				}
				if (!(f & 1))
					h = (f & 255) >>> 1;
				else
					h = c[b + 4 >> 2] | 0;
				if ((g - h | 0) >>> 0 < d >>> 0) {
					Bj(b, g, d - g + h | 0, h, h, 0, 0);
					f = a[b >> 0] | 0
				}
				if (!(f & 1))
					g = b + 1 | 0;
				else
					g = c[b + 8 >> 2] | 0;
				gs(g + h | 0, e | 0, d | 0) | 0;
				f = h + d | 0;
				if (!(a[b >> 0] & 1))
					a[b >> 0] = f << 1;
				else
					c[b + 4 >> 2] = f;
				a[g + f >> 0] = 0
			}
			return b | 0
		}
		function wj(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0;
			if (d >>> 0 > 4294967279)
				eh(b);
			e = a[b >> 0] | 0;
			if (!(e & 1))
				f = 10;
			else {
				e = c[b >> 2] | 0;
				f = (e & -2) + -1 | 0;
				e = e & 255
			}
			if (!(e & 1))
				j = (e & 255) >>> 1;
			else
				j = c[b + 4 >> 2] | 0;
			d = j >>> 0 > d >>> 0 ? j : d;
			if (d >>> 0 < 11)
				i = 10;
			else
				i = (d + 16 & -16) + -1 | 0;
			do
				if ((i | 0) != (f | 0)) {
					do
						if ((i | 0) != 10) {
							d = gh(i + 1 | 0) | 0;
							if (!(e & 1)) {
								f = 1;
								h = b + 1 | 0;
								g = 0;
								break
							} else {
								f = 1;
								h = c[b + 8 >> 2] | 0;
								g = 1;
								break
							}
						} else {
							d = b + 1 | 0;
							f = 0;
							h = c[b + 8 >> 2] | 0;
							g = 1
						}
					while (0);
					if (!(e & 1))
						e = (e & 255) >>> 1;
					else
						e = c[b + 4 >> 2] | 0;
					js(d | 0, h | 0, e + 1 | 0) | 0;
					if (g)
						ih(h);
					if (f) {
						c[b >> 2] = i + 1 | 1;
						c[b + 4 >> 2] = j;
						c[b + 8 >> 2] = d;
						break
					} else {
						a[b >> 0] = j << 1;
						break
					}
				}
			while (0);
			return
		}
		function xj(a, b) {
			a = a | 0;
			b = b | 0;
			return zj(a, b, Ti(b) | 0) | 0
		}
		function yj(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0;
			e = a[b >> 0] | 0;
			f = (e & 1) != 0;
			if (f) {
				g = (c[b >> 2] & -2) + -1 | 0;
				h = c[b + 4 >> 2] | 0
			} else {
				g = 10;
				h = (e & 255) >>> 1
			}
			if ((h | 0) == (g | 0)) {
				Bj(b, g, 1, g, g, 0, 0);
				if (!(a[b >> 0] & 1))
					g = 7;
				else
					g = 8
			} else if (f)
				g = 8;
			else
				g = 7;
			if ((g | 0) == 7) {
				a[b >> 0] = (h << 1) + 2;
				e = b + 1 | 0;
				f = h + 1 | 0
			} else if ((g | 0) == 8) {
				e = c[b + 8 >> 2] | 0;
				f = h + 1 | 0;
				c[b + 4 >> 2] = f
			}
			a[e + h >> 0] = d;
			a[e + f >> 0] = 0;
			return
		}
		function zj(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0;
			f = a[b >> 0] | 0;
			if (!(f & 1))
				g = 10;
			else {
				f = c[b >> 2] | 0;
				g = (f & -2) + -1 | 0;
				f = f & 255
			}
			if (!(f & 1))
				h = (f & 255) >>> 1;
			else
				h = c[b + 4 >> 2] | 0;
			if ((g - h | 0) >>> 0 >= e >>> 0) {
				if (e) {
					if (!(f & 1))
						g = b + 1 | 0;
					else
						g = c[b + 8 >> 2] | 0;
					js(g + h | 0, d | 0, e | 0) | 0;
					f = h + e | 0;
					if (!(a[b >> 0] & 1))
						a[b >> 0] = f << 1;
					else
						c[b + 4 >> 2] = f;
					a[g + f >> 0] = 0
				}
			} else
				Aj(b, g, e - g + h | 0, h, h, 0, e, d);
			return b | 0
		}
		function Aj(b, d, e, f, g, h, i, j) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			i = i | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0;
			if ((-18 - d | 0) >>> 0 < e >>> 0)
				eh(b);
			if (!(a[b >> 0] & 1))
				m = b + 1 | 0;
			else
				m = c[b + 8 >> 2] | 0;
			if (d >>> 0 < 2147483623) {
				k = e + d | 0;
				l = d << 1;
				k = k >>> 0 < l >>> 0 ? l : k;
				k = k >>> 0 < 11 ? 11 : k + 16 & -16
			} else
				k = -17;
			l = gh(k) | 0;
			if (g)
				js(l | 0, m | 0, g | 0) | 0;
			if (i)
				js(l + g | 0, j | 0, i | 0) | 0;
			e = f - h | 0;
			if ((e | 0) != (g | 0))
				js(l + (i + g) | 0, m + (h + g) | 0, e - g | 0) | 0;
			if ((d | 0) != 10)
				ih(m);
			c[b + 8 >> 2] = l;
			c[b >> 2] = k | 1;
			g = e + i | 0;
			c[b + 4 >> 2] = g;
			a[l + g >> 0] = 0;
			return
		}
		function Bj(b, d, e, f, g, h, i) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			i = i | 0;
			var j = 0,
			k = 0,
			l = 0;
			if ((-17 - d | 0) >>> 0 < e >>> 0)
				eh(b);
			if (!(a[b >> 0] & 1))
				l = b + 1 | 0;
			else
				l = c[b + 8 >> 2] | 0;
			if (d >>> 0 < 2147483623) {
				j = e + d | 0;
				k = d << 1;
				j = j >>> 0 < k >>> 0 ? k : j;
				j = j >>> 0 < 11 ? 11 : j + 16 & -16
			} else
				j = -17;
			k = gh(j) | 0;
			if (g)
				js(k | 0, l | 0, g | 0) | 0;
			e = f - h | 0;
			if ((e | 0) != (g | 0))
				js(k + (i + g) | 0, l + (h + g) | 0, e - g | 0) | 0;
			if ((d | 0) != 10)
				ih(l);
			c[b + 8 >> 2] = k;
			c[b >> 2] = j | 1;
			return
		}
		function Cj(b, d, e, f) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0;
			if (f >>> 0 > 4294967279)
				eh(b);
			if (f >>> 0 < 11) {
				a[b >> 0] = e << 1;
				f = b + 1 | 0
			} else {
				g = f + 16 & -16;
				f = gh(g) | 0;
				c[b + 8 >> 2] = f;
				c[b >> 2] = g | 1;
				c[b + 4 >> 2] = e
			}
			js(f | 0, d | 0, e | 0) | 0;
			a[f + e >> 0] = 0;
			return
		}
		function Dj(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0;
			if (e >>> 0 > 1073741807)
				eh(b);
			if (e >>> 0 < 2) {
				a[b >> 0] = e << 1;
				b = b + 4 | 0
			} else {
				g = e + 4 & -4;
				f = gh(g << 2) | 0;
				c[b + 8 >> 2] = f;
				c[b >> 2] = g | 1;
				c[b + 4 >> 2] = e;
				b = f
			}
			Vi(b, d, e) | 0;
			c[b + (e << 2) >> 2] = 0;
			return
		}
		function Ej(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0;
			if (d >>> 0 > 1073741807)
				eh(b);
			if (d >>> 0 < 2) {
				a[b >> 0] = d << 1;
				b = b + 4 | 0
			} else {
				g = d + 4 & -4;
				f = gh(g << 2) | 0;
				c[b + 8 >> 2] = f;
				c[b >> 2] = g | 1;
				c[b + 4 >> 2] = d;
				b = f
			}
			Xi(b, e, d) | 0;
			c[b + (d << 2) >> 2] = 0;
			return
		}
		function Fj(b) {
			b = b | 0;
			if (a[b >> 0] & 1)
				ih(c[b + 8 >> 2] | 0);
			return
		}
		function Gj(a, b) {
			a = a | 0;
			b = b | 0;
			return Hj(a, b, Ui(b) | 0) | 0
		}
		function Hj(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0;
			f = a[b >> 0] | 0;
			if (!(f & 1))
				h = 1;
			else {
				f = c[b >> 2] | 0;
				h = (f & -2) + -1 | 0;
				f = f & 255
			}
			g = (f & 1) == 0;
			do
				if (h >>> 0 >= e >>> 0) {
					if (g)
						f = b + 4 | 0;
					else
						f = c[b + 8 >> 2] | 0;
					Wi(f, d, e) | 0;
					c[f + (e << 2) >> 2] = 0;
					if (!(a[b >> 0] & 1)) {
						a[b >> 0] = e << 1;
						break
					} else {
						c[b + 4 >> 2] = e;
						break
					}
				} else {
					if (g)
						f = (f & 255) >>> 1;
					else
						f = c[b + 4 >> 2] | 0;
					Kj(b, h, e - h | 0, f, 0, f, e, d)
				}
			while (0);
			return b | 0
		}
		function Ij(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0;
			if (d >>> 0 > 1073741807)
				eh(b);
			e = a[b >> 0] | 0;
			if (!(e & 1))
				f = 1;
			else {
				e = c[b >> 2] | 0;
				f = (e & -2) + -1 | 0;
				e = e & 255
			}
			if (!(e & 1))
				j = (e & 255) >>> 1;
			else
				j = c[b + 4 >> 2] | 0;
			d = j >>> 0 > d >>> 0 ? j : d;
			if (d >>> 0 < 2)
				i = 1;
			else
				i = (d + 4 & -4) + -1 | 0;
			do
				if ((i | 0) != (f | 0)) {
					do
						if ((i | 0) != 1) {
							d = gh((i << 2) + 4 | 0) | 0;
							if (!(e & 1)) {
								f = 1;
								h = b + 4 | 0;
								g = 0;
								break
							} else {
								f = 1;
								h = c[b + 8 >> 2] | 0;
								g = 1;
								break
							}
						} else {
							d = b + 4 | 0;
							f = 0;
							h = c[b + 8 >> 2] | 0;
							g = 1
						}
					while (0);
					if (!(e & 1))
						e = (e & 255) >>> 1;
					else
						e = c[b + 4 >> 2] | 0;
					Vi(d, h, e + 1 | 0) | 0;
					if (g)
						ih(h);
					if (f) {
						c[b >> 2] = i + 1 | 1;
						c[b + 4 >> 2] = j;
						c[b + 8 >> 2] = d;
						break
					} else {
						a[b >> 0] = j << 1;
						break
					}
				}
			while (0);
			return
		}
		function Jj(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0;
			e = a[b >> 0] | 0;
			f = (e & 1) != 0;
			if (f) {
				g = (c[b >> 2] & -2) + -1 | 0;
				h = c[b + 4 >> 2] | 0
			} else {
				g = 1;
				h = (e & 255) >>> 1
			}
			if ((h | 0) == (g | 0)) {
				Lj(b, g, 1, g, g, 0, 0);
				if (!(a[b >> 0] & 1))
					g = 7;
				else
					g = 8
			} else if (f)
				g = 8;
			else
				g = 7;
			if ((g | 0) == 7) {
				a[b >> 0] = (h << 1) + 2;
				e = b + 4 | 0;
				f = h + 1 | 0
			} else if ((g | 0) == 8) {
				e = c[b + 8 >> 2] | 0;
				f = h + 1 | 0;
				c[b + 4 >> 2] = f
			}
			c[e + (h << 2) >> 2] = d;
			c[e + (f << 2) >> 2] = 0;
			return
		}
		function Kj(b, d, e, f, g, h, i, j) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			i = i | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0;
			if ((1073741806 - d | 0) >>> 0 < e >>> 0)
				eh(b);
			if (!(a[b >> 0] & 1))
				m = b + 4 | 0;
			else
				m = c[b + 8 >> 2] | 0;
			if (d >>> 0 < 536870887) {
				k = e + d | 0;
				l = d << 1;
				k = k >>> 0 < l >>> 0 ? l : k;
				k = k >>> 0 < 2 ? 2 : k + 4 & -4
			} else
				k = 1073741807;
			l = gh(k << 2) | 0;
			if (g)
				Vi(l, m, g) | 0;
			if (i)
				Vi(l + (g << 2) | 0, j, i) | 0;
			e = f - h | 0;
			if ((e | 0) != (g | 0))
				Vi(l + (i + g << 2) | 0, m + (h + g << 2) | 0, e - g | 0) | 0;
			if ((d | 0) != 1)
				ih(m);
			c[b + 8 >> 2] = l;
			c[b >> 2] = k | 1;
			g = e + i | 0;
			c[b + 4 >> 2] = g;
			c[l + (g << 2) >> 2] = 0;
			return
		}
		function Lj(b, d, e, f, g, h, i) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			i = i | 0;
			var j = 0,
			k = 0,
			l = 0;
			if ((1073741807 - d | 0) >>> 0 < e >>> 0)
				eh(b);
			if (!(a[b >> 0] & 1))
				l = b + 4 | 0;
			else
				l = c[b + 8 >> 2] | 0;
			if (d >>> 0 < 536870887) {
				j = e + d | 0;
				k = d << 1;
				j = j >>> 0 < k >>> 0 ? k : j;
				j = j >>> 0 < 2 ? 2 : j + 4 & -4
			} else
				j = 1073741807;
			k = gh(j << 2) | 0;
			if (g)
				Vi(k, l, g) | 0;
			e = f - h | 0;
			if ((e | 0) != (g | 0))
				Vi(k + (i + g << 2) | 0, l + (h + g << 2) | 0, e - g | 0) | 0;
			if ((d | 0) != 1)
				ih(l);
			c[b + 8 >> 2] = k;
			c[b >> 2] = j | 1;
			return
		}
		function Mj(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0;
			n = i;
			i = i + 32 | 0;
			l = n;
			m = n + 8 | 0;
			c[m >> 2] = 0;
			c[m + 4 >> 2] = 0;
			c[m + 8 >> 2] = 0;
			if (!(a[m >> 0] & 1))
				f = 10;
			else
				f = (c[m >> 2] & -2) + -1 | 0;
			uj(m, f, 0);
			h = a[m >> 0] | 0;
			j = m + 1 | 0;
			k = m + 8 | 0;
			g = h;
			h = (h & 1) == 0 ? (h & 255) >>> 1 : c[m + 4 >> 2] | 0;
			while (1) {
				f = (g & 1) == 0 ? j : c[k >> 2] | 0;
				g = l;
				c[g >> 2] = d;
				c[g + 4 >> 2] = e;
				f = Gi(f, h + 1 | 0, 22038, l) | 0;
				if ((f | 0) > -1) {
					if (f >>> 0 <= h >>> 0)
						break
				} else
					f = h << 1 | 1;
				uj(m, f, 0);
				g = a[m >> 0] | 0;
				h = f
			}
			uj(m, f, 0);
			c[b >> 2] = c[m >> 2];
			c[b + 4 >> 2] = c[m + 4 >> 2];
			c[b + 8 >> 2] = c[m + 8 >> 2];
			c[m >> 2] = 0;
			c[m + 4 >> 2] = 0;
			c[m + 8 >> 2] = 0;
			qj(m);
			i = n;
			return
		}
		function Nj(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0,
			i = 0;
			g = d;
			f = e - g | 0;
			if (f >>> 0 > 4294967279)
				eh(b);
			if (f >>> 0 < 11) {
				a[b >> 0] = f << 1;
				h = b + 1 | 0
			} else {
				i = f + 16 & -16;
				h = gh(i) | 0;
				c[b + 8 >> 2] = h;
				c[b >> 2] = i | 1;
				c[b + 4 >> 2] = f
			}
			b = e - g | 0;
			if ((d | 0) != (e | 0)) {
				f = h;
				while (1) {
					a[f >> 0] = a[d >> 0] | 0;
					d = d + 1 | 0;
					if ((d | 0) == (e | 0))
						break;
					else
						f = f + 1 | 0
				}
			}
			a[h + b >> 0] = 0;
			return
		}
		function Oj(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0,
			i = 0;
			h = d;
			f = e - h | 0;
			g = f >> 2;
			if (g >>> 0 > 1073741807)
				eh(b);
			if (g >>> 0 < 2) {
				a[b >> 0] = f >>> 1;
				b = b + 4 | 0
			} else {
				i = g + 4 & -4;
				f = gh(i << 2) | 0;
				c[b + 8 >> 2] = f;
				c[b >> 2] = i | 1;
				c[b + 4 >> 2] = g;
				b = f
			}
			g = (e - h | 0) >>> 2;
			if ((d | 0) != (e | 0)) {
				f = b;
				while (1) {
					c[f >> 2] = c[d >> 2];
					d = d + 4 | 0;
					if ((d | 0) == (e | 0))
						break;
					else
						f = f + 4 | 0
				}
			}
			c[b + (g << 2) >> 2] = 0;
			return
		}
		function Pj(a, b) {
			a = a | 0;
			b = b | 0;
			c[a + 16 >> 2] = (c[a + 24 >> 2] | 0) == 0 | b;
			return
		}
		function Qj(a) {
			a = a | 0;
			Rj(a);
			return
		}
		function Rj(a) {
			a = a | 0;
			c[a >> 2] = 8240;
			Sj(a, 0);
			Ko(a + 28 | 0);
			gj(c[a + 32 >> 2] | 0);
			gj(c[a + 36 >> 2] | 0);
			gj(c[a + 48 >> 2] | 0);
			gj(c[a + 60 >> 2] | 0);
			return
		}
		function Sj(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0;
			d = c[a + 40 >> 2] | 0;
			e = a + 32 | 0;
			f = a + 36 | 0;
			if (d)
				do {
					d = d + -1 | 0;
					xb[c[(c[e >> 2] | 0) + (d << 2) >> 2] & 0](b, a, c[(c[f >> 2] | 0) + (d << 2) >> 2] | 0)
				} while ((d | 0) != 0);
			return
		}
		function Tj(a) {
			a = a | 0;
			var b = 0,
			d = 0;
			d = i;
			i = i + 16 | 0;
			b = d;
			Jo(b, a + 28 | 0);
			i = d;
			return c[b >> 2] | 0
		}
		function Uj(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0;
			c[a + 24 >> 2] = b;
			c[a + 16 >> 2] = (b | 0) == 0 & 1;
			c[a + 20 >> 2] = 0;
			c[a + 4 >> 2] = 4098;
			c[a + 12 >> 2] = 0;
			c[a + 8 >> 2] = 6;
			d = a + 28 | 0;
			b = a + 32 | 0;
			a = b + 40 | 0;
			do {
				c[b >> 2] = 0;
				b = b + 4 | 0
			} while ((b | 0) < (a | 0));
			Io(d);
			return
		}
		function Vj(a) {
			a = a | 0;
			c[a >> 2] = 8176;
			Ko(a + 4 | 0);
			return
		}
		function Wj(a) {
			a = a | 0;
			c[a >> 2] = 8176;
			Ko(a + 4 | 0);
			ih(a);
			return
		}
		function Xj(a) {
			a = a | 0;
			c[a >> 2] = 8176;
			Io(a + 4 | 0);
			a = a + 8 | 0;
			c[a >> 2] = 0;
			c[a + 4 >> 2] = 0;
			c[a + 8 >> 2] = 0;
			c[a + 12 >> 2] = 0;
			c[a + 16 >> 2] = 0;
			c[a + 20 >> 2] = 0;
			return
		}
		function Yj(a, b) {
			a = a | 0;
			b = b | 0;
			return
		}
		function Zj(a, b, c) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			return a | 0
		}
		function _j(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			b = a;
			c[b >> 2] = 0;
			c[b + 4 >> 2] = 0;
			b = a + 8 | 0;
			c[b >> 2] = -1;
			c[b + 4 >> 2] = -1;
			return
		}
		function $j(a, b, d, e) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			b = a;
			c[b >> 2] = 0;
			c[b + 4 >> 2] = 0;
			b = a + 8 | 0;
			c[b >> 2] = -1;
			c[b + 4 >> 2] = -1;
			return
		}
		function ak(a) {
			a = a | 0;
			return 0
		}
		function bk(a) {
			a = a | 0;
			return 0
		}
		function ck(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0,
			i = 0;
			h = b + 12 | 0;
			i = b + 16 | 0;
			a : do
				if ((e | 0) > 0) {
					g = d;
					d = 0;
					while (1) {
						f = c[h >> 2] | 0;
						if (f >>> 0 < (c[i >> 2] | 0) >>> 0) {
							c[h >> 2] = f + 1;
							f = a[f >> 0] | 0
						} else {
							f = wb[c[(c[b >> 2] | 0) + 40 >> 2] & 127](b) | 0;
							if ((f | 0) == -1)
								break a;
							f = f & 255
						}
						a[g >> 0] = f;
						d = d + 1 | 0;
						if ((d | 0) < (e | 0))
							g = g + 1 | 0;
						else
							break
					}
				} else
					d = 0;
			while (0);
			return d | 0
		}
		function dk(a) {
			a = a | 0;
			return -1
		}
		function ek(a) {
			a = a | 0;
			var b = 0;
			if ((wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0) == -1)
				a = -1;
			else {
				b = a + 12 | 0;
				a = c[b >> 2] | 0;
				c[b >> 2] = a + 1;
				a = d[a >> 0] | 0
			}
			return a | 0
		}
		function fk(a, b) {
			a = a | 0;
			b = b | 0;
			return -1
		}
		function gk(b, e, f) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0;
			i = b + 24 | 0;
			j = b + 28 | 0;
			a : do
				if ((f | 0) > 0) {
					h = e;
					e = 0;
					while (1) {
						g = c[i >> 2] | 0;
						if (g >>> 0 >= (c[j >> 2] | 0) >>> 0) {
							if ((Cb[c[(c[b >> 2] | 0) + 52 >> 2] & 15](b, d[h >> 0] | 0) | 0) == -1)
								break a
						} else {
							k = a[h >> 0] | 0;
							c[i >> 2] = g + 1;
							a[g >> 0] = k
						}
						e = e + 1 | 0;
						if ((e | 0) < (f | 0))
							h = h + 1 | 0;
						else
							break
					}
				} else
					e = 0;
			while (0);
			return e | 0
		}
		function hk(a, b) {
			a = a | 0;
			b = b | 0;
			return -1
		}
		function ik(a) {
			a = a | 0;
			Rj(a + 8 | 0);
			return
		}
		function jk(a) {
			a = a | 0;
			Rj(a + ((c[(c[a >> 2] | 0) + -12 >> 2] | 0) + 8) | 0);
			return
		}
		function kk(a) {
			a = a | 0;
			Rj(a + 8 | 0);
			ih(a);
			return
		}
		function lk(a) {
			a = a | 0;
			kk(a + (c[(c[a >> 2] | 0) + -12 >> 2] | 0) | 0);
			return
		}
		function mk(b) {
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0;
			e = i;
			i = i + 16 | 0;
			d = e;
			if (c[b + ((c[(c[b >> 2] | 0) + -12 >> 2] | 0) + 24) >> 2] | 0) {
				rk(d, b);
				if ((a[d >> 0] | 0) != 0 ? (f = c[b + ((c[(c[b >> 2] | 0) + -12 >> 2] | 0) + 24) >> 2] | 0, (wb[c[(c[f >> 2] | 0) + 24 >> 2] & 127](f) | 0) == -1) : 0) {
					f = b + ((c[(c[b >> 2] | 0) + -12 >> 2] | 0) + 16) | 0;
					c[f >> 2] = c[f >> 2] | 1
				}
				sk(d)
			}
			i = e;
			return b | 0
		}
		function nk(a) {
			a = a | 0;
			Rj(a + 4 | 0);
			return
		}
		function ok(a) {
			a = a | 0;
			Rj(a + ((c[(c[a >> 2] | 0) + -12 >> 2] | 0) + 4) | 0);
			return
		}
		function pk(a) {
			a = a | 0;
			Rj(a + 4 | 0);
			ih(a);
			return
		}
		function qk(a) {
			a = a | 0;
			pk(a + (c[(c[a >> 2] | 0) + -12 >> 2] | 0) | 0);
			return
		}
		function rk(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0;
			a[b >> 0] = 0;
			c[b + 4 >> 2] = d;
			e = c[(c[d >> 2] | 0) + -12 >> 2] | 0;
			if (!(c[d + (e + 16) >> 2] | 0)) {
				e = c[d + (e + 72) >> 2] | 0;
				if (e)
					mk(e) | 0;
				a[b >> 0] = 1
			}
			return
		}
		function sk(a) {
			a = a | 0;
			var b = 0,
			d = 0;
			a = a + 4 | 0;
			d = c[a >> 2] | 0;
			b = c[(c[d >> 2] | 0) + -12 >> 2] | 0;
			if (((((c[d + (b + 24) >> 2] | 0) != 0 ? (c[d + (b + 16) >> 2] | 0) == 0 : 0) ? (c[d + (b + 4) >> 2] & 8192 | 0) != 0 : 0) ? !(Da() | 0) : 0) ? (d = c[a >> 2] | 0, d = c[d + ((c[(c[d >> 2] | 0) + -12 >> 2] | 0) + 24) >> 2] | 0, (wb[c[(c[d >> 2] | 0) + 24 >> 2] & 127](d) | 0) == -1) : 0) {
				d = c[a >> 2] | 0;
				d = d + ((c[(c[d >> 2] | 0) + -12 >> 2] | 0) + 16) | 0;
				c[d >> 2] = c[d >> 2] | 1
			}
			return
		}
		function tk(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0;
			n = i;
			i = i + 32 | 0;
			j = n + 16 | 0;
			k = n + 4 | 0;
			m = n + 8 | 0;
			e = n;
			rk(m, b);
			if (a[m >> 0] | 0) {
				c[e >> 2] = Tj(b + (c[(c[b >> 2] | 0) + -12 >> 2] | 0) | 0) | 0;
				l = Mo(e, 8524) | 0;
				Ko(e);
				f = c[(c[b >> 2] | 0) + -12 >> 2] | 0;
				g = c[b + (f + 24) >> 2] | 0;
				h = b + f | 0;
				f = b + (f + 76) | 0;
				e = c[f >> 2] | 0;
				if ((e | 0) == -1) {
					c[j >> 2] = Tj(h) | 0;
					e = Mo(j, 9352) | 0;
					e = Cb[c[(c[e >> 2] | 0) + 28 >> 2] & 15](e, 32) | 0;
					Ko(j);
					e = e << 24 >> 24;
					c[f >> 2] = e
				}
				f = c[(c[l >> 2] | 0) + 24 >> 2] | 0;
				c[k >> 2] = g;
				c[j >> 2] = c[k >> 2];
				if (!(Db[f & 31](l, j, h, e & 255, d) | 0)) {
					d = b + ((c[(c[b >> 2] | 0) + -12 >> 2] | 0) + 16) | 0;
					c[d >> 2] = c[d >> 2] | 5
				}
			}
			sk(m);
			i = n;
			return b | 0
		}
		function uk(a, b) {
			a = a | 0;
			b = b | 0;
			return
		}
		function vk(a) {
			a = a | 0;
			Rj(a + 12 | 0);
			return
		}
		function wk(a) {
			a = a | 0;
			Rj(a + -8 + 12 | 0);
			return
		}
		function xk(a) {
			a = a | 0;
			Rj(a + ((c[(c[a >> 2] | 0) + -12 >> 2] | 0) + 12) | 0);
			return
		}
		function yk(a) {
			a = a | 0;
			Rj(a + 12 | 0);
			ih(a);
			return
		}
		function zk(a) {
			a = a | 0;
			yk(a + -8 | 0);
			return
		}
		function Ak(a) {
			a = a | 0;
			yk(a + (c[(c[a >> 2] | 0) + -12 >> 2] | 0) | 0);
			return
		}
		function Bk(a) {
			a = a | 0;
			Rj(a);
			ih(a);
			return
		}
		function Ck(a) {
			a = a | 0;
			return
		}
		function Dk(a) {
			a = a | 0;
			return
		}
		function Ek(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Fk(b, c, d, e, f) {
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0;
			a : do
				if ((e | 0) == (f | 0))
					h = 6;
				else
					while (1) {
						if ((c | 0) == (d | 0)) {
							c = -1;
							break a
						}
						b = a[c >> 0] | 0;
						g = a[e >> 0] | 0;
						if (b << 24 >> 24 < g << 24 >> 24) {
							c = -1;
							break a
						}
						if (g << 24 >> 24 < b << 24 >> 24) {
							c = 1;
							break a
						}
						c = c + 1 | 0;
						e = e + 1 | 0;
						if ((e | 0) == (f | 0)) {
							h = 6;
							break
						}
					}
			while (0);
			if ((h | 0) == 6)
				c = (c | 0) != (d | 0) & 1;
			return c | 0
		}
		function Gk(a, b, c, d) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			Nj(a, c, d);
			return
		}
		function Hk(b, c, d) {
			b = b | 0;
			c = c | 0;
			d = d | 0;
			var e = 0;
			if ((c | 0) == (d | 0))
				b = 0;
			else {
				b = 0;
				do {
					b = (a[c >> 0] | 0) + (b << 4) | 0;
					e = b & -268435456;
					b = (e >>> 24 | e)^b;
					c = c + 1 | 0
				} while ((c | 0) != (d | 0))
			}
			return b | 0
		}
		function Ik(a) {
			a = a | 0;
			return
		}
		function Jk(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Kk(a, b, d, e, f) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0;
			a : do
				if ((e | 0) == (f | 0))
					h = 6;
				else
					while (1) {
						if ((b | 0) == (d | 0)) {
							b = -1;
							break a
						}
						a = c[b >> 2] | 0;
						g = c[e >> 2] | 0;
						if ((a | 0) < (g | 0)) {
							b = -1;
							break a
						}
						if ((g | 0) < (a | 0)) {
							b = 1;
							break a
						}
						b = b + 4 | 0;
						e = e + 4 | 0;
						if ((e | 0) == (f | 0)) {
							h = 6;
							break
						}
					}
			while (0);
			if ((h | 0) == 6)
				b = (b | 0) != (d | 0) & 1;
			return b | 0
		}
		function Lk(a, b, c, d) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			Oj(a, c, d);
			return
		}
		function Mk(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0;
			if ((b | 0) == (d | 0))
				a = 0;
			else {
				a = 0;
				do {
					a = (c[b >> 2] | 0) + (a << 4) | 0;
					e = a & -268435456;
					a = (e >>> 24 | e)^a;
					b = b + 4 | 0
				} while ((b | 0) != (d | 0))
			}
			return a | 0
		}
		function Nk(a) {
			a = a | 0;
			return
		}
		function Ok(a) {
			a = a | 0;
			ih(a);
			return
		}
		function Pk(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0;
			s = i;
			i = i + 64 | 0;
			k = s + 56 | 0;
			j = s + 52 | 0;
			r = s + 48 | 0;
			l = s + 44 | 0;
			m = s + 40 | 0;
			n = s + 36 | 0;
			o = s + 32 | 0;
			q = s + 8 | 0;
			p = s;
			a : do
				if (!(c[f + 4 >> 2] & 1)) {
					c[r >> 2] = -1;
					q = c[(c[b >> 2] | 0) + 16 >> 2] | 0;
					c[l >> 2] = c[d >> 2];
					c[m >> 2] = c[e >> 2];
					c[j >> 2] = c[l >> 2];
					c[k >> 2] = c[m >> 2];
					j = ub[q & 63](b, j, k, f, g, r) | 0;
					c[d >> 2] = j;
					switch (c[r >> 2] | 0) {
					case 0: {
							a[h >> 0] = 0;
							break a
						}
					case 1: {
							a[h >> 0] = 1;
							break a
						}
					default: {
							a[h >> 0] = 1;
							c[g >> 2] = 4;
							break a
						}
					}
				} else {
					b = Tj(f) | 0;
					c[n >> 2] = b;
					j = Mo(n, 9352) | 0;
					cs(b) | 0;
					b = Tj(f) | 0;
					c[o >> 2] = b;
					r = Mo(o, 9492) | 0;
					cs(b) | 0;
					tb[c[(c[r >> 2] | 0) + 24 >> 2] & 127](q, r);
					tb[c[(c[r >> 2] | 0) + 28 >> 2] & 127](q + 12 | 0, r);
					c[p >> 2] = c[e >> 2];
					c[k >> 2] = c[p >> 2];
					a[h >> 0] = (yq(d, k, q, q + 24 | 0, j, g, 1) | 0) == (q | 0) & 1;
					j = c[d >> 2] | 0;
					qj(q + 12 | 0);
					qj(q)
				}
			while (0);
			i = s;
			return j | 0
		}
		function Qk(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 12 | 0;
			k = h + 8 | 0;
			m = h + 4 | 0;
			l = h;
			c[m >> 2] = c[b >> 2];
			c[l >> 2] = c[d >> 2];
			c[k >> 2] = c[m >> 2];
			c[j >> 2] = c[l >> 2];
			a = zq(a, k, j, e, f, g) | 0;
			i = h;
			return a | 0
		}
		function Rk(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 12 | 0;
			k = h + 8 | 0;
			m = h + 4 | 0;
			l = h;
			c[m >> 2] = c[b >> 2];
			c[l >> 2] = c[d >> 2];
			c[k >> 2] = c[m >> 2];
			c[j >> 2] = c[l >> 2];
			a = Aq(a, k, j, e, f, g) | 0;
			i = h;
			return a | 0
		}
		function Sk(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 12 | 0;
			k = h + 8 | 0;
			m = h + 4 | 0;
			l = h;
			c[m >> 2] = c[b >> 2];
			c[l >> 2] = c[d >> 2];
			c[k >> 2] = c[m >> 2];
			c[j >> 2] = c[l >> 2];
			a = Bq(a, k, j, e, f, g) | 0;
			i = h;
			return a | 0
		}
		function Tk(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 12 | 0;
			k = h + 8 | 0;
			m = h + 4 | 0;
			l = h;
			c[m >> 2] = c[b >> 2];
			c[l >> 2] = c[d >> 2];
			c[k >> 2] = c[m >> 2];
			c[j >> 2] = c[l >> 2];
			a = Cq(a, k, j, e, f, g) | 0;
			i = h;
			return a | 0
		}
		function Uk(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 12 | 0;
			k = h + 8 | 0;
			m = h + 4 | 0;
			l = h;
			c[m >> 2] = c[b >> 2];
			c[l >> 2] = c[d >> 2];
			c[k >> 2] = c[m >> 2];
			c[j >> 2] = c[l >> 2];
			a = Dq(a, k, j, e, f, g) | 0;
			i = h;
			return a | 0
		}
		function Vk(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 12 | 0;
			k = h + 8 | 0;
			m = h + 4 | 0;
			l = h;
			c[m >> 2] = c[b >> 2];
			c[l >> 2] = c[d >> 2];
			c[k >> 2] = c[m >> 2];
			c[j >> 2] = c[l >> 2];
			a = Eq(a, k, j, e, f, g) | 0;
			i = h;
			return a | 0
		}
		function Wk(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 12 | 0;
			k = h + 8 | 0;
			m = h + 4 | 0;
			l = h;
			c[m >> 2] = c[b >> 2];
			c[l >> 2] = c[d >> 2];
			c[k >> 2] = c[m >> 2];
			c[j >> 2] = c[l >> 2];
			a = Fq(a, k, j, e, f, g) | 0;
			i = h;
			return a | 0
		}
		function Xk(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 12 | 0;
			k = h + 8 | 0;
			m = h + 4 | 0;
			l = h;
			c[m >> 2] = c[b >> 2];
			c[l >> 2] = c[d >> 2];
			c[k >> 2] = c[m >> 2];
			c[j >> 2] = c[l >> 2];
			a = Gq(a, k, j, e, f, g) | 0;
			i = h;
			return a | 0
		}
		function Yk(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 12 | 0;
			k = h + 8 | 0;
			m = h + 4 | 0;
			l = h;
			c[m >> 2] = c[b >> 2];
			c[l >> 2] = c[d >> 2];
			c[k >> 2] = c[m >> 2];
			c[j >> 2] = c[l >> 2];
			a = Hq(a, k, j, e, f, g) | 0;
			i = h;
			return a | 0
		}
		function Zk(b, e, f, g, h, j) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0;
			z = i;
			i = i + 240 | 0;
			w = z;
			p = z + 208 | 0;
			y = z + 32 | 0;
			t = z + 28 | 0;
			x = z + 16 | 0;
			v = z + 12 | 0;
			r = z + 48 | 0;
			s = z + 8 | 0;
			q = z + 4 | 0;
			c[y >> 2] = 0;
			c[y + 4 >> 2] = 0;
			c[y + 8 >> 2] = 0;
			u = Tj(g) | 0;
			c[t >> 2] = u;
			t = Mo(t, 9352) | 0;
			Ab[c[(c[t >> 2] | 0) + 32 >> 2] & 7](t, 22110, 22136, p) | 0;
			cs(u) | 0;
			c[x >> 2] = 0;
			c[x + 4 >> 2] = 0;
			c[x + 8 >> 2] = 0;
			if (!(a[x >> 0] & 1))
				b = 10;
			else
				b = (c[x >> 2] & -2) + -1 | 0;
			uj(x, b, 0);
			t = x + 8 | 0;
			u = x + 1 | 0;
			g = (a[x >> 0] & 1) == 0 ? u : c[t >> 2] | 0;
			c[v >> 2] = g;
			c[s >> 2] = r;
			c[q >> 2] = 0;
			o = x + 4 | 0;
			b = c[e >> 2] | 0;
			a : while (1) {
				if (b) {
					if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
						c[e >> 2] = 0;
						b = 0
					}
				} else
					b = 0;
				l = (b | 0) == 0;
				k = c[f >> 2] | 0;
				do
					if (k) {
						if ((c[k + 12 >> 2] | 0) != (c[k + 16 >> 2] | 0))
							if (l)
								break;
							else
								break a;
						if ((wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0) != -1)
							if (l)
								break;
							else
								break a;
						else {
							c[f >> 2] = 0;
							A = 13;
							break
						}
					} else
						A = 13;
				while (0);
				if ((A | 0) == 13) {
					A = 0;
					if (l) {
						k = 0;
						break
					} else
						k = 0
				}
				l = a[x >> 0] | 0;
				l = (l & 1) == 0 ? (l & 255) >>> 1 : c[o >> 2] | 0;
				if ((c[v >> 2] | 0) == (g + l | 0)) {
					uj(x, l << 1, 0);
					if (!(a[x >> 0] & 1))
						g = 10;
					else
						g = (c[x >> 2] & -2) + -1 | 0;
					uj(x, g, 0);
					g = (a[x >> 0] & 1) == 0 ? u : c[t >> 2] | 0;
					c[v >> 2] = g + l
				}
				m = b + 12 | 0;
				l = c[m >> 2] | 0;
				n = b + 16 | 0;
				if ((l | 0) == (c[n >> 2] | 0))
					l = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
				else
					l = d[l >> 0] | 0;
				if (_k(l & 255, 16, g, v, q, 0, y, r, s, p) | 0)
					break;
				k = c[m >> 2] | 0;
				if ((k | 0) == (c[n >> 2] | 0)) {
					wb[c[(c[b >> 2] | 0) + 40 >> 2] & 127](b) | 0;
					continue
				} else {
					c[m >> 2] = k + 1;
					continue
				}
			}
			uj(x, (c[v >> 2] | 0) - g | 0, 0);
			u = (a[x >> 0] & 1) == 0 ? u : c[t >> 2] | 0;
			v = $k() | 0;
			c[w >> 2] = j;
			if ((Iq(u, v, 23494, w) | 0) != 1)
				c[h >> 2] = 4;
			if (b) {
				if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
					c[e >> 2] = 0;
					b = 0
				}
			} else
				b = 0;
			b = (b | 0) == 0;
			do
				if (k) {
					if ((c[k + 12 >> 2] | 0) == (c[k + 16 >> 2] | 0) ? (wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0) == -1 : 0) {
						c[f >> 2] = 0;
						A = 37;
						break
					}
					if (!b)
						A = 38
				} else
					A = 37;
			while (0);
			if ((A | 0) == 37 ? b : 0)
				A = 38;
			if ((A | 0) == 38)
				c[h >> 2] = c[h >> 2] | 2;
			A = c[e >> 2] | 0;
			qj(x);
			qj(y);
			i = z;
			return A | 0
		}
		function _k(b, d, e, f, g, h, i, j, k, l) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			i = i | 0;
			j = j | 0;
			k = k | 0;
			l = l | 0;
			var m = 0,
			n = 0,
			o = 0,
			p = 0;
			o = c[f >> 2] | 0;
			p = (o | 0) == (e | 0);
			do
				if (p) {
					m = (a[l + 24 >> 0] | 0) == b << 24 >> 24;
					if (!m ? (a[l + 25 >> 0] | 0) != b << 24 >> 24 : 0) {
						n = 5;
						break
					}
					c[f >> 2] = e + 1;
					a[e >> 0] = m ? 43 : 45;
					c[g >> 2] = 0;
					m = 0
				} else
					n = 5;
			while (0);
			a : do
				if ((n | 0) == 5) {
					n = a[i >> 0] | 0;
					if (b << 24 >> 24 == h << 24 >> 24 ? (((n & 1) == 0 ? (n & 255) >>> 1 : c[i + 4 >> 2] | 0) | 0) != 0 : 0) {
						m = c[k >> 2] | 0;
						if ((m - j | 0) >= 160) {
							m = 0;
							break
						}
						d = c[g >> 2] | 0;
						c[k >> 2] = m + 4;
						c[m >> 2] = d;
						c[g >> 2] = 0;
						m = 0;
						break
					}
					h = l + 26 | 0;
					m = l;
					while (1) {
						if ((a[m >> 0] | 0) == b << 24 >> 24)
							break;
						m = m + 1 | 0;
						if ((m | 0) == (h | 0)) {
							m = h;
							break
						}
					}
					m = m - l | 0;
					if ((m | 0) > 23)
						m = -1;
					else {
						switch (d | 0) {
						case 10:
						case 8: {
								if ((m | 0) >= (d | 0)) {
									m = -1;
									break a
								}
								break
							}
						case 16: {
								if ((m | 0) >= 22) {
									if (p) {
										m = -1;
										break a
									}
									if ((o - e | 0) >= 3) {
										m = -1;
										break a
									}
									if ((a[o + -1 >> 0] | 0) != 48) {
										m = -1;
										break a
									}
									c[g >> 2] = 0;
									m = a[22110 + m >> 0] | 0;
									c[f >> 2] = o + 1;
									a[o >> 0] = m;
									m = 0;
									break a
								}
								break
							}
						default: {}

						}
						m = a[22110 + m >> 0] | 0;
						c[f >> 2] = o + 1;
						a[o >> 0] = m;
						c[g >> 2] = (c[g >> 2] | 0) + 1;
						m = 0
					}
				}
			while (0);
			return m | 0
		}
		function $k() {
			if ((a[1760] | 0) == 0 ? (ya(1760) | 0) != 0 : 0) {
				c[2479] = fi(2147483647, 23497, 0) | 0;
				Ga(1760)
			}
			return c[2479] | 0
		}
		function al(a) {
			a = a | 0;
			return
		}
		function bl(a) {
			a = a | 0;
			ih(a);
			return
		}
		function cl(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0;
			s = i;
			i = i + 64 | 0;
			k = s + 56 | 0;
			j = s + 52 | 0;
			r = s + 48 | 0;
			l = s + 44 | 0;
			m = s + 40 | 0;
			n = s + 36 | 0;
			o = s + 32 | 0;
			q = s + 8 | 0;
			p = s;
			a : do
				if (!(c[f + 4 >> 2] & 1)) {
					c[r >> 2] = -1;
					q = c[(c[b >> 2] | 0) + 16 >> 2] | 0;
					c[l >> 2] = c[d >> 2];
					c[m >> 2] = c[e >> 2];
					c[j >> 2] = c[l >> 2];
					c[k >> 2] = c[m >> 2];
					j = ub[q & 63](b, j, k, f, g, r) | 0;
					c[d >> 2] = j;
					switch (c[r >> 2] | 0) {
					case 0: {
							a[h >> 0] = 0;
							break a
						}
					case 1: {
							a[h >> 0] = 1;
							break a
						}
					default: {
							a[h >> 0] = 1;
							c[g >> 2] = 4;
							break a
						}
					}
				} else {
					b = Tj(f) | 0;
					c[n >> 2] = b;
					j = Mo(n, 9344) | 0;
					cs(b) | 0;
					b = Tj(f) | 0;
					c[o >> 2] = b;
					r = Mo(o, 9500) | 0;
					cs(b) | 0;
					tb[c[(c[r >> 2] | 0) + 24 >> 2] & 127](q, r);
					tb[c[(c[r >> 2] | 0) + 28 >> 2] & 127](q + 12 | 0, r);
					c[p >> 2] = c[e >> 2];
					c[k >> 2] = c[p >> 2];
					a[h >> 0] = (Jq(d, k, q, q + 24 | 0, j, g, 1) | 0) == (q | 0) & 1;
					j = c[d >> 2] | 0;
					Fj(q + 12 | 0);
					Fj(q)
				}
			while (0);
			i = s;
			return j | 0
		}
		function dl(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 12 | 0;
			k = h + 8 | 0;
			m = h + 4 | 0;
			l = h;
			c[m >> 2] = c[b >> 2];
			c[l >> 2] = c[d >> 2];
			c[k >> 2] = c[m >> 2];
			c[j >> 2] = c[l >> 2];
			a = Kq(a, k, j, e, f, g) | 0;
			i = h;
			return a | 0
		}
		function el(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 12 | 0;
			k = h + 8 | 0;
			m = h + 4 | 0;
			l = h;
			c[m >> 2] = c[b >> 2];
			c[l >> 2] = c[d >> 2];
			c[k >> 2] = c[m >> 2];
			c[j >> 2] = c[l >> 2];
			a = Lq(a, k, j, e, f, g) | 0;
			i = h;
			return a | 0
		}
		function fl(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 12 | 0;
			k = h + 8 | 0;
			m = h + 4 | 0;
			l = h;
			c[m >> 2] = c[b >> 2];
			c[l >> 2] = c[d >> 2];
			c[k >> 2] = c[m >> 2];
			c[j >> 2] = c[l >> 2];
			a = Mq(a, k, j, e, f, g) | 0;
			i = h;
			return a | 0
		}
		function gl(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 12 | 0;
			k = h + 8 | 0;
			m = h + 4 | 0;
			l = h;
			c[m >> 2] = c[b >> 2];
			c[l >> 2] = c[d >> 2];
			c[k >> 2] = c[m >> 2];
			c[j >> 2] = c[l >> 2];
			a = Nq(a, k, j, e, f, g) | 0;
			i = h;
			return a | 0
		}
		function hl(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 12 | 0;
			k = h + 8 | 0;
			m = h + 4 | 0;
			l = h;
			c[m >> 2] = c[b >> 2];
			c[l >> 2] = c[d >> 2];
			c[k >> 2] = c[m >> 2];
			c[j >> 2] = c[l >> 2];
			a = Oq(a, k, j, e, f, g) | 0;
			i = h;
			return a | 0
		}
		function il(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 12 | 0;
			k = h + 8 | 0;
			m = h + 4 | 0;
			l = h;
			c[m >> 2] = c[b >> 2];
			c[l >> 2] = c[d >> 2];
			c[k >> 2] = c[m >> 2];
			c[j >> 2] = c[l >> 2];
			a = Pq(a, k, j, e, f, g) | 0;
			i = h;
			return a | 0
		}
		function jl(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 12 | 0;
			k = h + 8 | 0;
			m = h + 4 | 0;
			l = h;
			c[m >> 2] = c[b >> 2];
			c[l >> 2] = c[d >> 2];
			c[k >> 2] = c[m >> 2];
			c[j >> 2] = c[l >> 2];
			a = Qq(a, k, j, e, f, g) | 0;
			i = h;
			return a | 0
		}
		function kl(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 12 | 0;
			k = h + 8 | 0;
			m = h + 4 | 0;
			l = h;
			c[m >> 2] = c[b >> 2];
			c[l >> 2] = c[d >> 2];
			c[k >> 2] = c[m >> 2];
			c[j >> 2] = c[l >> 2];
			a = Rq(a, k, j, e, f, g) | 0;
			i = h;
			return a | 0
		}
		function ll(a, b, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0;
			h = i;
			i = i + 16 | 0;
			j = h + 12 | 0;
			k = h + 8 | 0;
			m = h + 4 | 0;
			l = h;
			c[m >> 2] = c[b >> 2];
			c[l >> 2] = c[d >> 2];
			c[k >> 2] = c[m >> 2];
			c[j >> 2] = c[l >> 2];
			a = Sq(a, k, j, e, f, g) | 0;
			i = h;
			return a | 0
		}
		function yq(b, e, f, g, h, j, k) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			k = k | 0;
			var l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0;
			A = i;
			i = i + 112 | 0;
			m = A;
			n = (g - f | 0) / 12 | 0;
			if (n >>> 0 > 100) {
				m = fj(n) | 0;
				if (!m)
					Nh();
				else {
					y = m;
					l = m
				}
			} else {
				y = 0;
				l = m
			}
			if ((f | 0) == (g | 0))
				m = 0;
			else {
				q = f;
				o = 0;
				p = l;
				while (1) {
					m = a[q >> 0] | 0;
					if (!(m & 1))
						m = (m & 255) >>> 1;
					else
						m = c[q + 4 >> 2] | 0;
					if (!m) {
						a[p >> 0] = 2;
						m = o + 1 | 0;
						n = n + -1 | 0
					} else {
						a[p >> 0] = 1;
						m = o
					}
					q = q + 12 | 0;
					if ((q | 0) == (g | 0))
						break;
					else {
						o = m;
						p = p + 1 | 0
					}
				}
			}
			w = (f | 0) == (g | 0);
			x = (f | 0) == (g | 0);
			v = 0;
			t = m;
			r = n;
			a : while (1) {
				m = c[b >> 2] | 0;
				do
					if (m) {
						if ((c[m + 12 >> 2] | 0) == (c[m + 16 >> 2] | 0))
							if ((wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) == -1) {
								c[b >> 2] = 0;
								m = 0;
								break
							} else {
								m = c[b >> 2] | 0;
								break
							}
					} else
						m = 0;
				while (0);
				p = (m | 0) == 0;
				n = c[e >> 2] | 0;
				if (n) {
					if ((c[n + 12 >> 2] | 0) == (c[n + 16 >> 2] | 0) ? (wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](n) | 0) == -1 : 0) {
						c[e >> 2] = 0;
						n = 0
					}
				} else
					n = 0;
				o = (n | 0) == 0;
				m = c[b >> 2] | 0;
				if (!((r | 0) != 0 & (p^o)))
					break;
				n = c[m + 12 >> 2] | 0;
				if ((n | 0) == (c[m + 16 >> 2] | 0))
					m = wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0;
				else
					m = d[n >> 0] | 0;
				m = m & 255;
				if (!k)
					m = Cb[c[(c[h >> 2] | 0) + 12 >> 2] & 15](h, m) | 0;
				u = v + 1 | 0;
				if (w) {
					m = 0;
					p = t;
					q = r
				} else {
					q = 0;
					s = f;
					p = t;
					o = r;
					r = l;
					while (1) {
						do
							if ((a[r >> 0] | 0) == 1) {
								if (!(a[s >> 0] & 1))
									n = s + 1 | 0;
								else
									n = c[s + 8 >> 2] | 0;
								n = a[n + v >> 0] | 0;
								if (!k)
									n = Cb[c[(c[h >> 2] | 0) + 12 >> 2] & 15](h, n) | 0;
								if (m << 24 >> 24 != n << 24 >> 24) {
									a[r >> 0] = 0;
									n = q;
									o = o + -1 | 0;
									break
								}
								n = a[s >> 0] | 0;
								if (!(n & 1))
									n = (n & 255) >>> 1;
								else
									n = c[s + 4 >> 2] | 0;
								if ((n | 0) == (u | 0)) {
									a[r >> 0] = 2;
									n = 1;
									p = p + 1 | 0;
									o = o + -1 | 0
								} else
									n = 1
							} else
								n = q;
						while (0);
						s = s + 12 | 0;
						if ((s | 0) == (g | 0)) {
							m = n;
							q = o;
							break
						} else {
							q = n;
							r = r + 1 | 0
						}
					}
				}
				if (!m) {
					v = u;
					t = p;
					r = q;
					continue
				}
				m = c[b >> 2] | 0;
				n = m + 12 | 0;
				o = c[n >> 2] | 0;
				if ((o | 0) == (c[m + 16 >> 2] | 0))
					wb[c[(c[m >> 2] | 0) + 40 >> 2] & 127](m) | 0;
				else
					c[n >> 2] = o + 1;
				if ((p + q | 0) >>> 0 < 2 | x) {
					v = u;
					t = p;
					r = q;
					continue
				} else {
					m = f;
					o = p;
					p = l
				}
				while (1) {
					if ((a[p >> 0] | 0) == 2) {
						n = a[m >> 0] | 0;
						if (!(n & 1))
							n = (n & 255) >>> 1;
						else
							n = c[m + 4 >> 2] | 0;
						if ((n | 0) != (u | 0)) {
							a[p >> 0] = 0;
							n = o + -1 | 0
						} else
							n = o
					} else
						n = o;
					m = m + 12 | 0;
					if ((m | 0) == (g | 0)) {
						v = u;
						t = n;
						r = q;
						continue a
					} else {
						o = n;
						p = p + 1 | 0
					}
				}
			}
			do
				if (m) {
					if ((c[m + 12 >> 2] | 0) == (c[m + 16 >> 2] | 0))
						if ((wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) == -1) {
							c[b >> 2] = 0;
							m = 0;
							break
						} else {
							m = c[b >> 2] | 0;
							break
						}
				} else
					m = 0;
			while (0);
			m = (m | 0) == 0;
			do
				if (!o) {
					if ((c[n + 12 >> 2] | 0) == (c[n + 16 >> 2] | 0) ? (wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](n) | 0) == -1 : 0) {
						c[e >> 2] = 0;
						z = 65;
						break
					}
					if (!m)
						z = 66
				} else
					z = 65;
			while (0);
			if ((z | 0) == 65 ? m : 0)
				z = 66;
			if ((z | 0) == 66)
				c[j >> 2] = c[j >> 2] | 2;
			b : do
				if ((f | 0) == (g | 0))
					z = 70;
				else
					while (1) {
						if ((a[l >> 0] | 0) == 2)
							break b;
						f = f + 12 | 0;
						if ((f | 0) == (g | 0)) {
							z = 70;
							break
						} else
							l = l + 1 | 0
					}
			while (0);
			if ((z | 0) == 70) {
				c[j >> 2] = c[j >> 2] | 4;
				f = g
			}
			gj(y);
			i = A;
			return f | 0
		}
		function zq(b, e, f, g, h, j) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0;
			A = i;
			i = i + 240 | 0;
			s = A + 202 | 0;
			k = A + 200 | 0;
			z = A + 24 | 0;
			y = A + 12 | 0;
			w = A + 8 | 0;
			x = A + 40 | 0;
			u = A + 4 | 0;
			t = A;
			v = iq(g) | 0;
			ol(z, g, s, k);
			c[y >> 2] = 0;
			c[y + 4 >> 2] = 0;
			c[y + 8 >> 2] = 0;
			if (!(a[y >> 0] & 1))
				b = 10;
			else
				b = (c[y >> 2] & -2) + -1 | 0;
			uj(y, b, 0);
			p = y + 8 | 0;
			q = y + 1 | 0;
			n = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
			c[w >> 2] = n;
			c[u >> 2] = x;
			c[t >> 2] = 0;
			r = y + 4 | 0;
			o = a[k >> 0] | 0;
			b = c[e >> 2] | 0;
			k = n;
			a : while (1) {
				if (b) {
					if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
						c[e >> 2] = 0;
						b = 0
					}
				} else
					b = 0;
				g = (b | 0) == 0;
				l = c[f >> 2] | 0;
				do
					if (l) {
						if ((c[l + 12 >> 2] | 0) != (c[l + 16 >> 2] | 0))
							if (g)
								break;
							else
								break a;
						if ((wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0) != -1)
							if (g)
								break;
							else
								break a;
						else {
							c[f >> 2] = 0;
							B = 13;
							break
						}
					} else
						B = 13;
				while (0);
				if ((B | 0) == 13) {
					B = 0;
					if (g) {
						l = 0;
						break
					} else
						l = 0
				}
				m = a[y >> 0] | 0;
				m = (m & 1) == 0 ? (m & 255) >>> 1 : c[r >> 2] | 0;
				if ((c[w >> 2] | 0) == (k + m | 0)) {
					uj(y, m << 1, 0);
					if (!(a[y >> 0] & 1))
						g = 10;
					else
						g = (c[y >> 2] & -2) + -1 | 0;
					uj(y, g, 0);
					k = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
					c[w >> 2] = k + m
				}
				m = b + 12 | 0;
				g = c[m >> 2] | 0;
				n = b + 16 | 0;
				if ((g | 0) == (c[n >> 2] | 0))
					g = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
				else
					g = d[g >> 0] | 0;
				if (_k(g & 255, v, k, w, t, o, z, x, u, s) | 0)
					break;
				g = c[m >> 2] | 0;
				if ((g | 0) == (c[n >> 2] | 0)) {
					wb[c[(c[b >> 2] | 0) + 40 >> 2] & 127](b) | 0;
					continue
				} else {
					c[m >> 2] = g + 1;
					continue
				}
			}
			s = a[z >> 0] | 0;
			g = c[u >> 2] | 0;
			if ((((s & 1) == 0 ? (s & 255) >>> 1 : c[z + 4 >> 2] | 0) | 0) != 0 ? (g - x | 0) < 160 : 0) {
				s = c[t >> 2] | 0;
				t = g + 4 | 0;
				c[u >> 2] = t;
				c[g >> 2] = s;
				g = t
			}
			c[j >> 2] = $r(k, c[w >> 2] | 0, h, v) | 0;
			Yn(z, x, g, h);
			if (b) {
				if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
					c[e >> 2] = 0;
					b = 0
				}
			} else
				b = 0;
			b = (b | 0) == 0;
			do
				if (l) {
					if ((c[l + 12 >> 2] | 0) == (c[l + 16 >> 2] | 0) ? (wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0) == -1 : 0) {
						c[f >> 2] = 0;
						B = 38;
						break
					}
					if (!b)
						B = 39
				} else
					B = 38;
			while (0);
			if ((B | 0) == 38 ? b : 0)
				B = 39;
			if ((B | 0) == 39)
				c[h >> 2] = c[h >> 2] | 2;
			B = c[e >> 2] | 0;
			qj(y);
			qj(z);
			i = A;
			return B | 0
		}
		function Aq(b, e, f, g, h, j) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0;
			A = i;
			i = i + 240 | 0;
			s = A + 202 | 0;
			k = A + 200 | 0;
			z = A + 24 | 0;
			y = A + 12 | 0;
			w = A + 8 | 0;
			x = A + 40 | 0;
			u = A + 4 | 0;
			t = A;
			v = iq(g) | 0;
			ol(z, g, s, k);
			c[y >> 2] = 0;
			c[y + 4 >> 2] = 0;
			c[y + 8 >> 2] = 0;
			if (!(a[y >> 0] & 1))
				b = 10;
			else
				b = (c[y >> 2] & -2) + -1 | 0;
			uj(y, b, 0);
			p = y + 8 | 0;
			q = y + 1 | 0;
			n = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
			c[w >> 2] = n;
			c[u >> 2] = x;
			c[t >> 2] = 0;
			r = y + 4 | 0;
			o = a[k >> 0] | 0;
			b = c[e >> 2] | 0;
			k = n;
			a : while (1) {
				if (b) {
					if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
						c[e >> 2] = 0;
						b = 0
					}
				} else
					b = 0;
				g = (b | 0) == 0;
				l = c[f >> 2] | 0;
				do
					if (l) {
						if ((c[l + 12 >> 2] | 0) != (c[l + 16 >> 2] | 0))
							if (g)
								break;
							else
								break a;
						if ((wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0) != -1)
							if (g)
								break;
							else
								break a;
						else {
							c[f >> 2] = 0;
							B = 13;
							break
						}
					} else
						B = 13;
				while (0);
				if ((B | 0) == 13) {
					B = 0;
					if (g) {
						l = 0;
						break
					} else
						l = 0
				}
				m = a[y >> 0] | 0;
				m = (m & 1) == 0 ? (m & 255) >>> 1 : c[r >> 2] | 0;
				if ((c[w >> 2] | 0) == (k + m | 0)) {
					uj(y, m << 1, 0);
					if (!(a[y >> 0] & 1))
						g = 10;
					else
						g = (c[y >> 2] & -2) + -1 | 0;
					uj(y, g, 0);
					k = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
					c[w >> 2] = k + m
				}
				m = b + 12 | 0;
				g = c[m >> 2] | 0;
				n = b + 16 | 0;
				if ((g | 0) == (c[n >> 2] | 0))
					g = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
				else
					g = d[g >> 0] | 0;
				if (_k(g & 255, v, k, w, t, o, z, x, u, s) | 0)
					break;
				g = c[m >> 2] | 0;
				if ((g | 0) == (c[n >> 2] | 0)) {
					wb[c[(c[b >> 2] | 0) + 40 >> 2] & 127](b) | 0;
					continue
				} else {
					c[m >> 2] = g + 1;
					continue
				}
			}
			s = a[z >> 0] | 0;
			g = c[u >> 2] | 0;
			if ((((s & 1) == 0 ? (s & 255) >>> 1 : c[z + 4 >> 2] | 0) | 0) != 0 ? (g - x | 0) < 160 : 0) {
				s = c[t >> 2] | 0;
				t = g + 4 | 0;
				c[u >> 2] = t;
				c[g >> 2] = s;
				g = t
			}
			w = _r(k, c[w >> 2] | 0, h, v) | 0;
			c[j >> 2] = w;
			c[j + 4 >> 2] = C;
			Yn(z, x, g, h);
			if (b) {
				if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
					c[e >> 2] = 0;
					b = 0
				}
			} else
				b = 0;
			b = (b | 0) == 0;
			do
				if (l) {
					if ((c[l + 12 >> 2] | 0) == (c[l + 16 >> 2] | 0) ? (wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0) == -1 : 0) {
						c[f >> 2] = 0;
						B = 38;
						break
					}
					if (!b)
						B = 39
				} else
					B = 38;
			while (0);
			if ((B | 0) == 38 ? b : 0)
				B = 39;
			if ((B | 0) == 39)
				c[h >> 2] = c[h >> 2] | 2;
			B = c[e >> 2] | 0;
			qj(y);
			qj(z);
			i = A;
			return B | 0
		}
		function Bq(e, f, g, h, j, k) {
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			k = k | 0;
			var l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0;
			B = i;
			i = i + 240 | 0;
			t = B + 202 | 0;
			l = B + 200 | 0;
			A = B + 24 | 0;
			z = B + 12 | 0;
			x = B + 8 | 0;
			y = B + 40 | 0;
			v = B + 4 | 0;
			u = B;
			w = iq(h) | 0;
			ol(A, h, t, l);
			c[z >> 2] = 0;
			c[z + 4 >> 2] = 0;
			c[z + 8 >> 2] = 0;
			if (!(a[z >> 0] & 1))
				e = 10;
			else
				e = (c[z >> 2] & -2) + -1 | 0;
			uj(z, e, 0);
			q = z + 8 | 0;
			r = z + 1 | 0;
			o = (a[z >> 0] & 1) == 0 ? r : c[q >> 2] | 0;
			c[x >> 2] = o;
			c[v >> 2] = y;
			c[u >> 2] = 0;
			s = z + 4 | 0;
			p = a[l >> 0] | 0;
			e = c[f >> 2] | 0;
			l = o;
			a : while (1) {
				if (e) {
					if ((c[e + 12 >> 2] | 0) == (c[e + 16 >> 2] | 0) ? (wb[c[(c[e >> 2] | 0) + 36 >> 2] & 127](e) | 0) == -1 : 0) {
						c[f >> 2] = 0;
						e = 0
					}
				} else
					e = 0;
				h = (e | 0) == 0;
				m = c[g >> 2] | 0;
				do
					if (m) {
						if ((c[m + 12 >> 2] | 0) != (c[m + 16 >> 2] | 0))
							if (h)
								break;
							else
								break a;
						if ((wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) != -1)
							if (h)
								break;
							else
								break a;
						else {
							c[g >> 2] = 0;
							C = 13;
							break
						}
					} else
						C = 13;
				while (0);
				if ((C | 0) == 13) {
					C = 0;
					if (h) {
						m = 0;
						break
					} else
						m = 0
				}
				n = a[z >> 0] | 0;
				n = (n & 1) == 0 ? (n & 255) >>> 1 : c[s >> 2] | 0;
				if ((c[x >> 2] | 0) == (l + n | 0)) {
					uj(z, n << 1, 0);
					if (!(a[z >> 0] & 1))
						h = 10;
					else
						h = (c[z >> 2] & -2) + -1 | 0;
					uj(z, h, 0);
					l = (a[z >> 0] & 1) == 0 ? r : c[q >> 2] | 0;
					c[x >> 2] = l + n
				}
				n = e + 12 | 0;
				h = c[n >> 2] | 0;
				o = e + 16 | 0;
				if ((h | 0) == (c[o >> 2] | 0))
					h = wb[c[(c[e >> 2] | 0) + 36 >> 2] & 127](e) | 0;
				else
					h = d[h >> 0] | 0;
				if (_k(h & 255, w, l, x, u, p, A, y, v, t) | 0)
					break;
				h = c[n >> 2] | 0;
				if ((h | 0) == (c[o >> 2] | 0)) {
					wb[c[(c[e >> 2] | 0) + 40 >> 2] & 127](e) | 0;
					continue
				} else {
					c[n >> 2] = h + 1;
					continue
				}
			}
			t = a[A >> 0] | 0;
			h = c[v >> 2] | 0;
			if ((((t & 1) == 0 ? (t & 255) >>> 1 : c[A + 4 >> 2] | 0) | 0) != 0 ? (h - y | 0) < 160 : 0) {
				t = c[u >> 2] | 0;
				u = h + 4 | 0;
				c[v >> 2] = u;
				c[h >> 2] = t;
				h = u
			}
			b[k >> 1] = Zr(l, c[x >> 2] | 0, j, w) | 0;
			Yn(A, y, h, j);
			if (e) {
				if ((c[e + 12 >> 2] | 0) == (c[e + 16 >> 2] | 0) ? (wb[c[(c[e >> 2] | 0) + 36 >> 2] & 127](e) | 0) == -1 : 0) {
					c[f >> 2] = 0;
					e = 0
				}
			} else
				e = 0;
			e = (e | 0) == 0;
			do
				if (m) {
					if ((c[m + 12 >> 2] | 0) == (c[m + 16 >> 2] | 0) ? (wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) == -1 : 0) {
						c[g >> 2] = 0;
						C = 38;
						break
					}
					if (!e)
						C = 39
				} else
					C = 38;
			while (0);
			if ((C | 0) == 38 ? e : 0)
				C = 39;
			if ((C | 0) == 39)
				c[j >> 2] = c[j >> 2] | 2;
			C = c[f >> 2] | 0;
			qj(z);
			qj(A);
			i = B;
			return C | 0
		}
		function Cq(b, e, f, g, h, j) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0;
			A = i;
			i = i + 240 | 0;
			s = A + 202 | 0;
			k = A + 200 | 0;
			z = A + 24 | 0;
			y = A + 12 | 0;
			w = A + 8 | 0;
			x = A + 40 | 0;
			u = A + 4 | 0;
			t = A;
			v = iq(g) | 0;
			ol(z, g, s, k);
			c[y >> 2] = 0;
			c[y + 4 >> 2] = 0;
			c[y + 8 >> 2] = 0;
			if (!(a[y >> 0] & 1))
				b = 10;
			else
				b = (c[y >> 2] & -2) + -1 | 0;
			uj(y, b, 0);
			p = y + 8 | 0;
			q = y + 1 | 0;
			n = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
			c[w >> 2] = n;
			c[u >> 2] = x;
			c[t >> 2] = 0;
			r = y + 4 | 0;
			o = a[k >> 0] | 0;
			b = c[e >> 2] | 0;
			k = n;
			a : while (1) {
				if (b) {
					if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
						c[e >> 2] = 0;
						b = 0
					}
				} else
					b = 0;
				g = (b | 0) == 0;
				l = c[f >> 2] | 0;
				do
					if (l) {
						if ((c[l + 12 >> 2] | 0) != (c[l + 16 >> 2] | 0))
							if (g)
								break;
							else
								break a;
						if ((wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0) != -1)
							if (g)
								break;
							else
								break a;
						else {
							c[f >> 2] = 0;
							B = 13;
							break
						}
					} else
						B = 13;
				while (0);
				if ((B | 0) == 13) {
					B = 0;
					if (g) {
						l = 0;
						break
					} else
						l = 0
				}
				m = a[y >> 0] | 0;
				m = (m & 1) == 0 ? (m & 255) >>> 1 : c[r >> 2] | 0;
				if ((c[w >> 2] | 0) == (k + m | 0)) {
					uj(y, m << 1, 0);
					if (!(a[y >> 0] & 1))
						g = 10;
					else
						g = (c[y >> 2] & -2) + -1 | 0;
					uj(y, g, 0);
					k = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
					c[w >> 2] = k + m
				}
				m = b + 12 | 0;
				g = c[m >> 2] | 0;
				n = b + 16 | 0;
				if ((g | 0) == (c[n >> 2] | 0))
					g = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
				else
					g = d[g >> 0] | 0;
				if (_k(g & 255, v, k, w, t, o, z, x, u, s) | 0)
					break;
				g = c[m >> 2] | 0;
				if ((g | 0) == (c[n >> 2] | 0)) {
					wb[c[(c[b >> 2] | 0) + 40 >> 2] & 127](b) | 0;
					continue
				} else {
					c[m >> 2] = g + 1;
					continue
				}
			}
			s = a[z >> 0] | 0;
			g = c[u >> 2] | 0;
			if ((((s & 1) == 0 ? (s & 255) >>> 1 : c[z + 4 >> 2] | 0) | 0) != 0 ? (g - x | 0) < 160 : 0) {
				s = c[t >> 2] | 0;
				t = g + 4 | 0;
				c[u >> 2] = t;
				c[g >> 2] = s;
				g = t
			}
			c[j >> 2] = Yr(k, c[w >> 2] | 0, h, v) | 0;
			Yn(z, x, g, h);
			if (b) {
				if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
					c[e >> 2] = 0;
					b = 0
				}
			} else
				b = 0;
			b = (b | 0) == 0;
			do
				if (l) {
					if ((c[l + 12 >> 2] | 0) == (c[l + 16 >> 2] | 0) ? (wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0) == -1 : 0) {
						c[f >> 2] = 0;
						B = 38;
						break
					}
					if (!b)
						B = 39
				} else
					B = 38;
			while (0);
			if ((B | 0) == 38 ? b : 0)
				B = 39;
			if ((B | 0) == 39)
				c[h >> 2] = c[h >> 2] | 2;
			B = c[e >> 2] | 0;
			qj(y);
			qj(z);
			i = A;
			return B | 0
		}
		function Dq(b, e, f, g, h, j) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0;
			A = i;
			i = i + 240 | 0;
			s = A + 202 | 0;
			k = A + 200 | 0;
			z = A + 24 | 0;
			y = A + 12 | 0;
			w = A + 8 | 0;
			x = A + 40 | 0;
			u = A + 4 | 0;
			t = A;
			v = iq(g) | 0;
			ol(z, g, s, k);
			c[y >> 2] = 0;
			c[y + 4 >> 2] = 0;
			c[y + 8 >> 2] = 0;
			if (!(a[y >> 0] & 1))
				b = 10;
			else
				b = (c[y >> 2] & -2) + -1 | 0;
			uj(y, b, 0);
			p = y + 8 | 0;
			q = y + 1 | 0;
			n = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
			c[w >> 2] = n;
			c[u >> 2] = x;
			c[t >> 2] = 0;
			r = y + 4 | 0;
			o = a[k >> 0] | 0;
			b = c[e >> 2] | 0;
			k = n;
			a : while (1) {
				if (b) {
					if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
						c[e >> 2] = 0;
						b = 0
					}
				} else
					b = 0;
				g = (b | 0) == 0;
				l = c[f >> 2] | 0;
				do
					if (l) {
						if ((c[l + 12 >> 2] | 0) != (c[l + 16 >> 2] | 0))
							if (g)
								break;
							else
								break a;
						if ((wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0) != -1)
							if (g)
								break;
							else
								break a;
						else {
							c[f >> 2] = 0;
							B = 13;
							break
						}
					} else
						B = 13;
				while (0);
				if ((B | 0) == 13) {
					B = 0;
					if (g) {
						l = 0;
						break
					} else
						l = 0
				}
				m = a[y >> 0] | 0;
				m = (m & 1) == 0 ? (m & 255) >>> 1 : c[r >> 2] | 0;
				if ((c[w >> 2] | 0) == (k + m | 0)) {
					uj(y, m << 1, 0);
					if (!(a[y >> 0] & 1))
						g = 10;
					else
						g = (c[y >> 2] & -2) + -1 | 0;
					uj(y, g, 0);
					k = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
					c[w >> 2] = k + m
				}
				m = b + 12 | 0;
				g = c[m >> 2] | 0;
				n = b + 16 | 0;
				if ((g | 0) == (c[n >> 2] | 0))
					g = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
				else
					g = d[g >> 0] | 0;
				if (_k(g & 255, v, k, w, t, o, z, x, u, s) | 0)
					break;
				g = c[m >> 2] | 0;
				if ((g | 0) == (c[n >> 2] | 0)) {
					wb[c[(c[b >> 2] | 0) + 40 >> 2] & 127](b) | 0;
					continue
				} else {
					c[m >> 2] = g + 1;
					continue
				}
			}
			s = a[z >> 0] | 0;
			g = c[u >> 2] | 0;
			if ((((s & 1) == 0 ? (s & 255) >>> 1 : c[z + 4 >> 2] | 0) | 0) != 0 ? (g - x | 0) < 160 : 0) {
				s = c[t >> 2] | 0;
				t = g + 4 | 0;
				c[u >> 2] = t;
				c[g >> 2] = s;
				g = t
			}
			c[j >> 2] = Xr(k, c[w >> 2] | 0, h, v) | 0;
			Yn(z, x, g, h);
			if (b) {
				if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
					c[e >> 2] = 0;
					b = 0
				}
			} else
				b = 0;
			b = (b | 0) == 0;
			do
				if (l) {
					if ((c[l + 12 >> 2] | 0) == (c[l + 16 >> 2] | 0) ? (wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0) == -1 : 0) {
						c[f >> 2] = 0;
						B = 38;
						break
					}
					if (!b)
						B = 39
				} else
					B = 38;
			while (0);
			if ((B | 0) == 38 ? b : 0)
				B = 39;
			if ((B | 0) == 39)
				c[h >> 2] = c[h >> 2] | 2;
			B = c[e >> 2] | 0;
			qj(y);
			qj(z);
			i = A;
			return B | 0
		}
		function Eq(b, e, f, g, h, j) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0;
			A = i;
			i = i + 240 | 0;
			s = A + 202 | 0;
			k = A + 200 | 0;
			z = A + 24 | 0;
			y = A + 12 | 0;
			w = A + 8 | 0;
			x = A + 40 | 0;
			u = A + 4 | 0;
			t = A;
			v = iq(g) | 0;
			ol(z, g, s, k);
			c[y >> 2] = 0;
			c[y + 4 >> 2] = 0;
			c[y + 8 >> 2] = 0;
			if (!(a[y >> 0] & 1))
				b = 10;
			else
				b = (c[y >> 2] & -2) + -1 | 0;
			uj(y, b, 0);
			p = y + 8 | 0;
			q = y + 1 | 0;
			n = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
			c[w >> 2] = n;
			c[u >> 2] = x;
			c[t >> 2] = 0;
			r = y + 4 | 0;
			o = a[k >> 0] | 0;
			b = c[e >> 2] | 0;
			k = n;
			a : while (1) {
				if (b) {
					if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
						c[e >> 2] = 0;
						b = 0
					}
				} else
					b = 0;
				g = (b | 0) == 0;
				l = c[f >> 2] | 0;
				do
					if (l) {
						if ((c[l + 12 >> 2] | 0) != (c[l + 16 >> 2] | 0))
							if (g)
								break;
							else
								break a;
						if ((wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0) != -1)
							if (g)
								break;
							else
								break a;
						else {
							c[f >> 2] = 0;
							B = 13;
							break
						}
					} else
						B = 13;
				while (0);
				if ((B | 0) == 13) {
					B = 0;
					if (g) {
						l = 0;
						break
					} else
						l = 0
				}
				m = a[y >> 0] | 0;
				m = (m & 1) == 0 ? (m & 255) >>> 1 : c[r >> 2] | 0;
				if ((c[w >> 2] | 0) == (k + m | 0)) {
					uj(y, m << 1, 0);
					if (!(a[y >> 0] & 1))
						g = 10;
					else
						g = (c[y >> 2] & -2) + -1 | 0;
					uj(y, g, 0);
					k = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
					c[w >> 2] = k + m
				}
				m = b + 12 | 0;
				g = c[m >> 2] | 0;
				n = b + 16 | 0;
				if ((g | 0) == (c[n >> 2] | 0))
					g = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
				else
					g = d[g >> 0] | 0;
				if (_k(g & 255, v, k, w, t, o, z, x, u, s) | 0)
					break;
				g = c[m >> 2] | 0;
				if ((g | 0) == (c[n >> 2] | 0)) {
					wb[c[(c[b >> 2] | 0) + 40 >> 2] & 127](b) | 0;
					continue
				} else {
					c[m >> 2] = g + 1;
					continue
				}
			}
			s = a[z >> 0] | 0;
			g = c[u >> 2] | 0;
			if ((((s & 1) == 0 ? (s & 255) >>> 1 : c[z + 4 >> 2] | 0) | 0) != 0 ? (g - x | 0) < 160 : 0) {
				s = c[t >> 2] | 0;
				t = g + 4 | 0;
				c[u >> 2] = t;
				c[g >> 2] = s;
				g = t
			}
			w = Wr(k, c[w >> 2] | 0, h, v) | 0;
			c[j >> 2] = w;
			c[j + 4 >> 2] = C;
			Yn(z, x, g, h);
			if (b) {
				if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
					c[e >> 2] = 0;
					b = 0
				}
			} else
				b = 0;
			b = (b | 0) == 0;
			do
				if (l) {
					if ((c[l + 12 >> 2] | 0) == (c[l + 16 >> 2] | 0) ? (wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0) == -1 : 0) {
						c[f >> 2] = 0;
						B = 38;
						break
					}
					if (!b)
						B = 39
				} else
					B = 38;
			while (0);
			if ((B | 0) == 38 ? b : 0)
				B = 39;
			if ((B | 0) == 39)
				c[h >> 2] = c[h >> 2] | 2;
			B = c[e >> 2] | 0;
			qj(y);
			qj(z);
			i = A;
			return B | 0
		}
		function Fq(b, e, f, h, j, k) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			h = h | 0;
			j = j | 0;
			k = k | 0;
			var l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0,
			E = 0;
			D = i;
			i = i + 240 | 0;
			v = D + 208 | 0;
			l = D + 203 | 0;
			m = D + 202 | 0;
			C = D + 24 | 0;
			B = D + 12 | 0;
			z = D + 8 | 0;
			A = D + 40 | 0;
			y = D + 4 | 0;
			x = D;
			w = D + 201 | 0;
			u = D + 200 | 0;
			pl(C, h, v, l, m);
			c[B >> 2] = 0;
			c[B + 4 >> 2] = 0;
			c[B + 8 >> 2] = 0;
			if (!(a[B >> 0] & 1))
				b = 10;
			else
				b = (c[B >> 2] & -2) + -1 | 0;
			uj(B, b, 0);
			r = B + 8 | 0;
			s = B + 1 | 0;
			o = (a[B >> 0] & 1) == 0 ? s : c[r >> 2] | 0;
			c[z >> 2] = o;
			c[y >> 2] = A;
			c[x >> 2] = 0;
			a[w >> 0] = 1;
			a[u >> 0] = 69;
			t = B + 4 | 0;
			q = a[l >> 0] | 0;
			p = a[m >> 0] | 0;
			b = c[e >> 2] | 0;
			l = o;
			a : while (1) {
				if (b) {
					if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
						c[e >> 2] = 0;
						b = 0
					}
				} else
					b = 0;
				h = (b | 0) == 0;
				m = c[f >> 2] | 0;
				do
					if (m) {
						if ((c[m + 12 >> 2] | 0) != (c[m + 16 >> 2] | 0))
							if (h)
								break;
							else
								break a;
						if ((wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) != -1)
							if (h)
								break;
							else
								break a;
						else {
							c[f >> 2] = 0;
							E = 13;
							break
						}
					} else
						E = 13;
				while (0);
				if ((E | 0) == 13) {
					E = 0;
					if (h) {
						m = 0;
						break
					} else
						m = 0
				}
				n = a[B >> 0] | 0;
				n = (n & 1) == 0 ? (n & 255) >>> 1 : c[t >> 2] | 0;
				if ((c[z >> 2] | 0) == (l + n | 0)) {
					uj(B, n << 1, 0);
					if (!(a[B >> 0] & 1))
						h = 10;
					else
						h = (c[B >> 2] & -2) + -1 | 0;
					uj(B, h, 0);
					l = (a[B >> 0] & 1) == 0 ? s : c[r >> 2] | 0;
					c[z >> 2] = l + n
				}
				n = b + 12 | 0;
				h = c[n >> 2] | 0;
				o = b + 16 | 0;
				if ((h | 0) == (c[o >> 2] | 0))
					h = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
				else
					h = d[h >> 0] | 0;
				if (ql(h & 255, w, u, l, z, q, p, C, A, y, x, v) | 0)
					break;
				h = c[n >> 2] | 0;
				if ((h | 0) == (c[o >> 2] | 0)) {
					wb[c[(c[b >> 2] | 0) + 40 >> 2] & 127](b) | 0;
					continue
				} else {
					c[n >> 2] = h + 1;
					continue
				}
			}
			v = a[C >> 0] | 0;
			h = c[y >> 2] | 0;
			if (!((a[w >> 0] | 0) == 0 ? 1 : (((v & 1) == 0 ? (v & 255) >>> 1 : c[C + 4 >> 2] | 0) | 0) == 0) ? (h - A | 0) < 160 : 0) {
				w = c[x >> 2] | 0;
				x = h + 4 | 0;
				c[y >> 2] = x;
				c[h >> 2] = w;
				h = x
			}
			g[k >> 2] = +Vr(l, c[z >> 2] | 0, j);
			Yn(C, A, h, j);
			if (b) {
				if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
					c[e >> 2] = 0;
					b = 0
				}
			} else
				b = 0;
			b = (b | 0) == 0;
			do
				if (m) {
					if ((c[m + 12 >> 2] | 0) == (c[m + 16 >> 2] | 0) ? (wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) == -1 : 0) {
						c[f >> 2] = 0;
						E = 38;
						break
					}
					if (!b)
						E = 39
				} else
					E = 38;
			while (0);
			if ((E | 0) == 38 ? b : 0)
				E = 39;
			if ((E | 0) == 39)
				c[j >> 2] = c[j >> 2] | 2;
			E = c[e >> 2] | 0;
			qj(B);
			qj(C);
			i = D;
			return E | 0
		}
		function Gq(b, e, f, g, j, k) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			j = j | 0;
			k = k | 0;
			var l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0,
			E = 0;
			D = i;
			i = i + 240 | 0;
			v = D + 208 | 0;
			l = D + 203 | 0;
			m = D + 202 | 0;
			C = D + 24 | 0;
			B = D + 12 | 0;
			z = D + 8 | 0;
			A = D + 40 | 0;
			y = D + 4 | 0;
			x = D;
			w = D + 201 | 0;
			u = D + 200 | 0;
			pl(C, g, v, l, m);
			c[B >> 2] = 0;
			c[B + 4 >> 2] = 0;
			c[B + 8 >> 2] = 0;
			if (!(a[B >> 0] & 1))
				b = 10;
			else
				b = (c[B >> 2] & -2) + -1 | 0;
			uj(B, b, 0);
			r = B + 8 | 0;
			s = B + 1 | 0;
			o = (a[B >> 0] & 1) == 0 ? s : c[r >> 2] | 0;
			c[z >> 2] = o;
			c[y >> 2] = A;
			c[x >> 2] = 0;
			a[w >> 0] = 1;
			a[u >> 0] = 69;
			t = B + 4 | 0;
			q = a[l >> 0] | 0;
			p = a[m >> 0] | 0;
			b = c[e >> 2] | 0;
			l = o;
			a : while (1) {
				if (b) {
					if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
						c[e >> 2] = 0;
						b = 0
					}
				} else
					b = 0;
				g = (b | 0) == 0;
				m = c[f >> 2] | 0;
				do
					if (m) {
						if ((c[m + 12 >> 2] | 0) != (c[m + 16 >> 2] | 0))
							if (g)
								break;
							else
								break a;
						if ((wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) != -1)
							if (g)
								break;
							else
								break a;
						else {
							c[f >> 2] = 0;
							E = 13;
							break
						}
					} else
						E = 13;
				while (0);
				if ((E | 0) == 13) {
					E = 0;
					if (g) {
						m = 0;
						break
					} else
						m = 0
				}
				n = a[B >> 0] | 0;
				n = (n & 1) == 0 ? (n & 255) >>> 1 : c[t >> 2] | 0;
				if ((c[z >> 2] | 0) == (l + n | 0)) {
					uj(B, n << 1, 0);
					if (!(a[B >> 0] & 1))
						g = 10;
					else
						g = (c[B >> 2] & -2) + -1 | 0;
					uj(B, g, 0);
					l = (a[B >> 0] & 1) == 0 ? s : c[r >> 2] | 0;
					c[z >> 2] = l + n
				}
				n = b + 12 | 0;
				g = c[n >> 2] | 0;
				o = b + 16 | 0;
				if ((g | 0) == (c[o >> 2] | 0))
					g = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
				else
					g = d[g >> 0] | 0;
				if (ql(g & 255, w, u, l, z, q, p, C, A, y, x, v) | 0)
					break;
				g = c[n >> 2] | 0;
				if ((g | 0) == (c[o >> 2] | 0)) {
					wb[c[(c[b >> 2] | 0) + 40 >> 2] & 127](b) | 0;
					continue
				} else {
					c[n >> 2] = g + 1;
					continue
				}
			}
			v = a[C >> 0] | 0;
			g = c[y >> 2] | 0;
			if (!((a[w >> 0] | 0) == 0 ? 1 : (((v & 1) == 0 ? (v & 255) >>> 1 : c[C + 4 >> 2] | 0) | 0) == 0) ? (g - A | 0) < 160 : 0) {
				w = c[x >> 2] | 0;
				x = g + 4 | 0;
				c[y >> 2] = x;
				c[g >> 2] = w;
				g = x
			}
			h[k >> 3] = +Ur(l, c[z >> 2] | 0, j);
			Yn(C, A, g, j);
			if (b) {
				if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
					c[e >> 2] = 0;
					b = 0
				}
			} else
				b = 0;
			b = (b | 0) == 0;
			do
				if (m) {
					if ((c[m + 12 >> 2] | 0) == (c[m + 16 >> 2] | 0) ? (wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) == -1 : 0) {
						c[f >> 2] = 0;
						E = 38;
						break
					}
					if (!b)
						E = 39
				} else
					E = 38;
			while (0);
			if ((E | 0) == 38 ? b : 0)
				E = 39;
			if ((E | 0) == 39)
				c[j >> 2] = c[j >> 2] | 2;
			E = c[e >> 2] | 0;
			qj(B);
			qj(C);
			i = D;
			return E | 0
		}
		function Hq(b, e, f, g, j, k) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			j = j | 0;
			k = k | 0;
			var l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0,
			E = 0;
			D = i;
			i = i + 240 | 0;
			v = D + 208 | 0;
			l = D + 203 | 0;
			m = D + 202 | 0;
			C = D + 24 | 0;
			B = D + 12 | 0;
			z = D + 8 | 0;
			A = D + 40 | 0;
			y = D + 4 | 0;
			x = D;
			w = D + 201 | 0;
			u = D + 200 | 0;
			pl(C, g, v, l, m);
			c[B >> 2] = 0;
			c[B + 4 >> 2] = 0;
			c[B + 8 >> 2] = 0;
			if (!(a[B >> 0] & 1))
				b = 10;
			else
				b = (c[B >> 2] & -2) + -1 | 0;
			uj(B, b, 0);
			r = B + 8 | 0;
			s = B + 1 | 0;
			o = (a[B >> 0] & 1) == 0 ? s : c[r >> 2] | 0;
			c[z >> 2] = o;
			c[y >> 2] = A;
			c[x >> 2] = 0;
			a[w >> 0] = 1;
			a[u >> 0] = 69;
			t = B + 4 | 0;
			q = a[l >> 0] | 0;
			p = a[m >> 0] | 0;
			b = c[e >> 2] | 0;
			l = o;
			a : while (1) {
				if (b) {
					if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
						c[e >> 2] = 0;
						b = 0
					}
				} else
					b = 0;
				g = (b | 0) == 0;
				m = c[f >> 2] | 0;
				do
					if (m) {
						if ((c[m + 12 >> 2] | 0) != (c[m + 16 >> 2] | 0))
							if (g)
								break;
							else
								break a;
						if ((wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) != -1)
							if (g)
								break;
							else
								break a;
						else {
							c[f >> 2] = 0;
							E = 13;
							break
						}
					} else
						E = 13;
				while (0);
				if ((E | 0) == 13) {
					E = 0;
					if (g) {
						m = 0;
						break
					} else
						m = 0
				}
				n = a[B >> 0] | 0;
				n = (n & 1) == 0 ? (n & 255) >>> 1 : c[t >> 2] | 0;
				if ((c[z >> 2] | 0) == (l + n | 0)) {
					uj(B, n << 1, 0);
					if (!(a[B >> 0] & 1))
						g = 10;
					else
						g = (c[B >> 2] & -2) + -1 | 0;
					uj(B, g, 0);
					l = (a[B >> 0] & 1) == 0 ? s : c[r >> 2] | 0;
					c[z >> 2] = l + n
				}
				n = b + 12 | 0;
				g = c[n >> 2] | 0;
				o = b + 16 | 0;
				if ((g | 0) == (c[o >> 2] | 0))
					g = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
				else
					g = d[g >> 0] | 0;
				if (ql(g & 255, w, u, l, z, q, p, C, A, y, x, v) | 0)
					break;
				g = c[n >> 2] | 0;
				if ((g | 0) == (c[o >> 2] | 0)) {
					wb[c[(c[b >> 2] | 0) + 40 >> 2] & 127](b) | 0;
					continue
				} else {
					c[n >> 2] = g + 1;
					continue
				}
			}
			v = a[C >> 0] | 0;
			g = c[y >> 2] | 0;
			if (!((a[w >> 0] | 0) == 0 ? 1 : (((v & 1) == 0 ? (v & 255) >>> 1 : c[C + 4 >> 2] | 0) | 0) == 0) ? (g - A | 0) < 160 : 0) {
				w = c[x >> 2] | 0;
				x = g + 4 | 0;
				c[y >> 2] = x;
				c[g >> 2] = w;
				g = x
			}
			h[k >> 3] = +Tr(l, c[z >> 2] | 0, j);
			Yn(C, A, g, j);
			if (b) {
				if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
					c[e >> 2] = 0;
					b = 0
				}
			} else
				b = 0;
			b = (b | 0) == 0;
			do
				if (m) {
					if ((c[m + 12 >> 2] | 0) == (c[m + 16 >> 2] | 0) ? (wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) == -1 : 0) {
						c[f >> 2] = 0;
						E = 38;
						break
					}
					if (!b)
						E = 39
				} else
					E = 38;
			while (0);
			if ((E | 0) == 38 ? b : 0)
				E = 39;
			if ((E | 0) == 39)
				c[j >> 2] = c[j >> 2] | 2;
			E = c[e >> 2] | 0;
			qj(B);
			qj(C);
			i = D;
			return E | 0
		}
		function Iq(a, b, d, e) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0;
			f = i;
			i = i + 16 | 0;
			g = f;
			c[g >> 2] = e;
			e = gi(b) | 0;
			b = Mi(a, d, g) | 0;
			if (e)
				gi(e) | 0;
			i = f;
			return b | 0
		}
		function Jq(b, d, e, f, g, h, j) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0;
			y = i;
			i = i + 112 | 0;
			l = y;
			m = (f - e | 0) / 12 | 0;
			if (m >>> 0 > 100) {
				l = fj(m) | 0;
				if (!l)
					Nh();
				else {
					w = l;
					k = l
				}
			} else {
				w = 0;
				k = l
			}
			if ((e | 0) == (f | 0))
				l = 0;
			else {
				p = e;
				n = 0;
				o = k;
				while (1) {
					l = a[p >> 0] | 0;
					if (!(l & 1))
						l = (l & 255) >>> 1;
					else
						l = c[p + 4 >> 2] | 0;
					if (!l) {
						a[o >> 0] = 2;
						l = n + 1 | 0;
						m = m + -1 | 0
					} else {
						a[o >> 0] = 1;
						l = n
					}
					p = p + 12 | 0;
					if ((p | 0) == (f | 0))
						break;
					else {
						n = l;
						o = o + 1 | 0
					}
				}
			}
			u = (e | 0) == (f | 0);
			v = (e | 0) == (f | 0);
			t = 0;
			q = m;
			a : while (1) {
				m = c[b >> 2] | 0;
				do
					if (m) {
						n = c[m + 12 >> 2] | 0;
						if ((n | 0) == (c[m + 16 >> 2] | 0))
							m = wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0;
						else
							m = c[n >> 2] | 0;
						if ((m | 0) == -1) {
							c[b >> 2] = 0;
							p = 1;
							break
						} else {
							p = (c[b >> 2] | 0) == 0;
							break
						}
					} else
						p = 1;
				while (0);
				n = c[d >> 2] | 0;
				if (n) {
					m = c[n + 12 >> 2] | 0;
					if ((m | 0) == (c[n + 16 >> 2] | 0))
						m = wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](n) | 0;
					else
						m = c[m >> 2] | 0;
					if ((m | 0) == -1) {
						c[d >> 2] = 0;
						n = 0;
						o = 1
					} else
						o = 0
				} else {
					n = 0;
					o = 1
				}
				m = c[b >> 2] | 0;
				if (!((q | 0) != 0 & (p^o)))
					break;
				n = c[m + 12 >> 2] | 0;
				if ((n | 0) == (c[m + 16 >> 2] | 0))
					m = wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0;
				else
					m = c[n >> 2] | 0;
				if (!j)
					m = Cb[c[(c[g >> 2] | 0) + 28 >> 2] & 15](g, m) | 0;
				s = t + 1 | 0;
				if (u) {
					m = 0;
					p = q
				} else {
					p = 0;
					r = e;
					o = q;
					q = k;
					while (1) {
						do
							if ((a[q >> 0] | 0) == 1) {
								if (!(a[r >> 0] & 1))
									n = r + 4 | 0;
								else
									n = c[r + 8 >> 2] | 0;
								n = c[n + (t << 2) >> 2] | 0;
								if (!j)
									n = Cb[c[(c[g >> 2] | 0) + 28 >> 2] & 15](g, n) | 0;
								if ((m | 0) != (n | 0)) {
									a[q >> 0] = 0;
									n = p;
									o = o + -1 | 0;
									break
								}
								n = a[r >> 0] | 0;
								if (!(n & 1))
									n = (n & 255) >>> 1;
								else
									n = c[r + 4 >> 2] | 0;
								if ((n | 0) == (s | 0)) {
									a[q >> 0] = 2;
									n = 1;
									l = l + 1 | 0;
									o = o + -1 | 0
								} else
									n = 1
							} else
								n = p;
						while (0);
						r = r + 12 | 0;
						if ((r | 0) == (f | 0)) {
							m = n;
							p = o;
							break
						} else {
							p = n;
							q = q + 1 | 0
						}
					}
				}
				if (!m) {
					t = s;
					q = p;
					continue
				}
				m = c[b >> 2] | 0;
				n = m + 12 | 0;
				o = c[n >> 2] | 0;
				if ((o | 0) == (c[m + 16 >> 2] | 0))
					wb[c[(c[m >> 2] | 0) + 40 >> 2] & 127](m) | 0;
				else
					c[n >> 2] = o + 4;
				if ((l + p | 0) >>> 0 < 2 | v) {
					t = s;
					q = p;
					continue
				} else {
					m = e;
					o = k
				}
				while (1) {
					if ((a[o >> 0] | 0) == 2) {
						n = a[m >> 0] | 0;
						if (!(n & 1))
							n = (n & 255) >>> 1;
						else
							n = c[m + 4 >> 2] | 0;
						if ((n | 0) != (s | 0)) {
							a[o >> 0] = 0;
							l = l + -1 | 0
						}
					}
					m = m + 12 | 0;
					if ((m | 0) == (f | 0)) {
						t = s;
						q = p;
						continue a
					} else
						o = o + 1 | 0
				}
			}
			do
				if (m) {
					l = c[m + 12 >> 2] | 0;
					if ((l | 0) == (c[m + 16 >> 2] | 0))
						l = wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0;
					else
						l = c[l >> 2] | 0;
					if ((l | 0) == -1) {
						c[b >> 2] = 0;
						m = 1;
						break
					} else {
						m = (c[b >> 2] | 0) == 0;
						break
					}
				} else
					m = 1;
			while (0);
			do
				if (n) {
					l = c[n + 12 >> 2] | 0;
					if ((l | 0) == (c[n + 16 >> 2] | 0))
						l = wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](n) | 0;
					else
						l = c[l >> 2] | 0;
					if ((l | 0) != -1)
						if (m)
							break;
						else {
							x = 74;
							break
						}
					else {
						c[d >> 2] = 0;
						x = 72;
						break
					}
				} else
					x = 72;
			while (0);
			if ((x | 0) == 72 ? m : 0)
				x = 74;
			if ((x | 0) == 74)
				c[h >> 2] = c[h >> 2] | 2;
			b : do
				if ((e | 0) == (f | 0))
					x = 78;
				else
					while (1) {
						if ((a[k >> 0] | 0) == 2)
							break b;
						e = e + 12 | 0;
						if ((e | 0) == (f | 0)) {
							x = 78;
							break
						} else
							k = k + 1 | 0
					}
			while (0);
			if ((x | 0) == 78) {
				c[h >> 2] = c[h >> 2] | 4;
				e = f
			}
			gj(w);
			i = y;
			return e | 0
		}
		function Kq(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0;
			z = i;
			i = i + 320 | 0;
			r = z + 208 | 0;
			j = z + 200 | 0;
			y = z + 24 | 0;
			x = z + 12 | 0;
			v = z + 8 | 0;
			w = z + 40 | 0;
			t = z + 4 | 0;
			s = z;
			u = iq(f) | 0;
			rl(y, f, r, j);
			c[x >> 2] = 0;
			c[x + 4 >> 2] = 0;
			c[x + 8 >> 2] = 0;
			if (!(a[x >> 0] & 1))
				b = 10;
			else
				b = (c[x >> 2] & -2) + -1 | 0;
			uj(x, b, 0);
			o = x + 8 | 0;
			p = x + 1 | 0;
			f = (a[x >> 0] & 1) == 0 ? p : c[o >> 2] | 0;
			c[v >> 2] = f;
			c[t >> 2] = w;
			c[s >> 2] = 0;
			q = x + 4 | 0;
			n = c[j >> 2] | 0;
			j = c[d >> 2] | 0;
			a : while (1) {
				if (j) {
					b = c[j + 12 >> 2] | 0;
					if ((b | 0) == (c[j + 16 >> 2] | 0))
						b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
					else
						b = c[b >> 2] | 0;
					if ((b | 0) == -1) {
						c[d >> 2] = 0;
						j = 0;
						l = 1
					} else
						l = 0
				} else {
					j = 0;
					l = 1
				}
				k = c[e >> 2] | 0;
				do
					if (k) {
						b = c[k + 12 >> 2] | 0;
						if ((b | 0) == (c[k + 16 >> 2] | 0))
							b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
						else
							b = c[b >> 2] | 0;
						if ((b | 0) != -1)
							if (l) {
								m = k;
								break
							} else
								break a;
						else {
							c[e >> 2] = 0;
							A = 16;
							break
						}
					} else
						A = 16;
				while (0);
				if ((A | 0) == 16) {
					A = 0;
					if (l) {
						k = 0;
						break
					} else
						m = 0
				}
				k = a[x >> 0] | 0;
				k = (k & 1) == 0 ? (k & 255) >>> 1 : c[q >> 2] | 0;
				if ((c[v >> 2] | 0) == (f + k | 0)) {
					uj(x, k << 1, 0);
					if (!(a[x >> 0] & 1))
						b = 10;
					else
						b = (c[x >> 2] & -2) + -1 | 0;
					uj(x, b, 0);
					f = (a[x >> 0] & 1) == 0 ? p : c[o >> 2] | 0;
					c[v >> 2] = f + k
				}
				k = j + 12 | 0;
				b = c[k >> 2] | 0;
				l = j + 16 | 0;
				if ((b | 0) == (c[l >> 2] | 0))
					b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
				else
					b = c[b >> 2] | 0;
				if (nl(b, u, f, v, s, n, y, w, t, r) | 0) {
					k = m;
					break
				}
				b = c[k >> 2] | 0;
				if ((b | 0) == (c[l >> 2] | 0)) {
					wb[c[(c[j >> 2] | 0) + 40 >> 2] & 127](j) | 0;
					continue
				} else {
					c[k >> 2] = b + 4;
					continue
				}
			}
			r = a[y >> 0] | 0;
			b = c[t >> 2] | 0;
			if ((((r & 1) == 0 ? (r & 255) >>> 1 : c[y + 4 >> 2] | 0) | 0) != 0 ? (b - w | 0) < 160 : 0) {
				r = c[s >> 2] | 0;
				s = b + 4 | 0;
				c[t >> 2] = s;
				c[b >> 2] = r;
				b = s
			}
			c[h >> 2] = $r(f, c[v >> 2] | 0, g, u) | 0;
			Yn(y, w, b, g);
			if (j) {
				b = c[j + 12 >> 2] | 0;
				if ((b | 0) == (c[j + 16 >> 2] | 0))
					b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
				else
					b = c[b >> 2] | 0;
				if ((b | 0) == -1) {
					c[d >> 2] = 0;
					f = 1
				} else
					f = 0
			} else
				f = 1;
			do
				if (k) {
					b = c[k + 12 >> 2] | 0;
					if ((b | 0) == (c[k + 16 >> 2] | 0))
						b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
					else
						b = c[b >> 2] | 0;
					if ((b | 0) != -1)
						if (f)
							break;
						else {
							A = 46;
							break
						}
					else {
						c[e >> 2] = 0;
						A = 44;
						break
					}
				} else
					A = 44;
			while (0);
			if ((A | 0) == 44 ? f : 0)
				A = 46;
			if ((A | 0) == 46)
				c[g >> 2] = c[g >> 2] | 2;
			A = c[d >> 2] | 0;
			qj(x);
			qj(y);
			i = z;
			return A | 0
		}
		function Lq(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0;
			z = i;
			i = i + 320 | 0;
			r = z + 208 | 0;
			j = z + 200 | 0;
			y = z + 24 | 0;
			x = z + 12 | 0;
			v = z + 8 | 0;
			w = z + 40 | 0;
			t = z + 4 | 0;
			s = z;
			u = iq(f) | 0;
			rl(y, f, r, j);
			c[x >> 2] = 0;
			c[x + 4 >> 2] = 0;
			c[x + 8 >> 2] = 0;
			if (!(a[x >> 0] & 1))
				b = 10;
			else
				b = (c[x >> 2] & -2) + -1 | 0;
			uj(x, b, 0);
			o = x + 8 | 0;
			p = x + 1 | 0;
			f = (a[x >> 0] & 1) == 0 ? p : c[o >> 2] | 0;
			c[v >> 2] = f;
			c[t >> 2] = w;
			c[s >> 2] = 0;
			q = x + 4 | 0;
			n = c[j >> 2] | 0;
			j = c[d >> 2] | 0;
			a : while (1) {
				if (j) {
					b = c[j + 12 >> 2] | 0;
					if ((b | 0) == (c[j + 16 >> 2] | 0))
						b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
					else
						b = c[b >> 2] | 0;
					if ((b | 0) == -1) {
						c[d >> 2] = 0;
						j = 0;
						l = 1
					} else
						l = 0
				} else {
					j = 0;
					l = 1
				}
				k = c[e >> 2] | 0;
				do
					if (k) {
						b = c[k + 12 >> 2] | 0;
						if ((b | 0) == (c[k + 16 >> 2] | 0))
							b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
						else
							b = c[b >> 2] | 0;
						if ((b | 0) != -1)
							if (l) {
								m = k;
								break
							} else
								break a;
						else {
							c[e >> 2] = 0;
							A = 16;
							break
						}
					} else
						A = 16;
				while (0);
				if ((A | 0) == 16) {
					A = 0;
					if (l) {
						k = 0;
						break
					} else
						m = 0
				}
				k = a[x >> 0] | 0;
				k = (k & 1) == 0 ? (k & 255) >>> 1 : c[q >> 2] | 0;
				if ((c[v >> 2] | 0) == (f + k | 0)) {
					uj(x, k << 1, 0);
					if (!(a[x >> 0] & 1))
						b = 10;
					else
						b = (c[x >> 2] & -2) + -1 | 0;
					uj(x, b, 0);
					f = (a[x >> 0] & 1) == 0 ? p : c[o >> 2] | 0;
					c[v >> 2] = f + k
				}
				k = j + 12 | 0;
				b = c[k >> 2] | 0;
				l = j + 16 | 0;
				if ((b | 0) == (c[l >> 2] | 0))
					b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
				else
					b = c[b >> 2] | 0;
				if (nl(b, u, f, v, s, n, y, w, t, r) | 0) {
					k = m;
					break
				}
				b = c[k >> 2] | 0;
				if ((b | 0) == (c[l >> 2] | 0)) {
					wb[c[(c[j >> 2] | 0) + 40 >> 2] & 127](j) | 0;
					continue
				} else {
					c[k >> 2] = b + 4;
					continue
				}
			}
			r = a[y >> 0] | 0;
			b = c[t >> 2] | 0;
			if ((((r & 1) == 0 ? (r & 255) >>> 1 : c[y + 4 >> 2] | 0) | 0) != 0 ? (b - w | 0) < 160 : 0) {
				r = c[s >> 2] | 0;
				s = b + 4 | 0;
				c[t >> 2] = s;
				c[b >> 2] = r;
				b = s
			}
			v = _r(f, c[v >> 2] | 0, g, u) | 0;
			c[h >> 2] = v;
			c[h + 4 >> 2] = C;
			Yn(y, w, b, g);
			if (j) {
				b = c[j + 12 >> 2] | 0;
				if ((b | 0) == (c[j + 16 >> 2] | 0))
					b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
				else
					b = c[b >> 2] | 0;
				if ((b | 0) == -1) {
					c[d >> 2] = 0;
					f = 1
				} else
					f = 0
			} else
				f = 1;
			do
				if (k) {
					b = c[k + 12 >> 2] | 0;
					if ((b | 0) == (c[k + 16 >> 2] | 0))
						b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
					else
						b = c[b >> 2] | 0;
					if ((b | 0) != -1)
						if (f)
							break;
						else {
							A = 46;
							break
						}
					else {
						c[e >> 2] = 0;
						A = 44;
						break
					}
				} else
					A = 44;
			while (0);
			if ((A | 0) == 44 ? f : 0)
				A = 46;
			if ((A | 0) == 46)
				c[g >> 2] = c[g >> 2] | 2;
			A = c[d >> 2] | 0;
			qj(x);
			qj(y);
			i = z;
			return A | 0
		}
		function Mq(d, e, f, g, h, j) {
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0;
			A = i;
			i = i + 320 | 0;
			s = A + 208 | 0;
			k = A + 200 | 0;
			z = A + 24 | 0;
			y = A + 12 | 0;
			w = A + 8 | 0;
			x = A + 40 | 0;
			u = A + 4 | 0;
			t = A;
			v = iq(g) | 0;
			rl(z, g, s, k);
			c[y >> 2] = 0;
			c[y + 4 >> 2] = 0;
			c[y + 8 >> 2] = 0;
			if (!(a[y >> 0] & 1))
				d = 10;
			else
				d = (c[y >> 2] & -2) + -1 | 0;
			uj(y, d, 0);
			p = y + 8 | 0;
			q = y + 1 | 0;
			g = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
			c[w >> 2] = g;
			c[u >> 2] = x;
			c[t >> 2] = 0;
			r = y + 4 | 0;
			o = c[k >> 2] | 0;
			k = c[e >> 2] | 0;
			a : while (1) {
				if (k) {
					d = c[k + 12 >> 2] | 0;
					if ((d | 0) == (c[k + 16 >> 2] | 0))
						d = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
					else
						d = c[d >> 2] | 0;
					if ((d | 0) == -1) {
						c[e >> 2] = 0;
						k = 0;
						m = 1
					} else
						m = 0
				} else {
					k = 0;
					m = 1
				}
				l = c[f >> 2] | 0;
				do
					if (l) {
						d = c[l + 12 >> 2] | 0;
						if ((d | 0) == (c[l + 16 >> 2] | 0))
							d = wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0;
						else
							d = c[d >> 2] | 0;
						if ((d | 0) != -1)
							if (m) {
								n = l;
								break
							} else
								break a;
						else {
							c[f >> 2] = 0;
							B = 16;
							break
						}
					} else
						B = 16;
				while (0);
				if ((B | 0) == 16) {
					B = 0;
					if (m) {
						l = 0;
						break
					} else
						n = 0
				}
				l = a[y >> 0] | 0;
				l = (l & 1) == 0 ? (l & 255) >>> 1 : c[r >> 2] | 0;
				if ((c[w >> 2] | 0) == (g + l | 0)) {
					uj(y, l << 1, 0);
					if (!(a[y >> 0] & 1))
						d = 10;
					else
						d = (c[y >> 2] & -2) + -1 | 0;
					uj(y, d, 0);
					g = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
					c[w >> 2] = g + l
				}
				l = k + 12 | 0;
				d = c[l >> 2] | 0;
				m = k + 16 | 0;
				if ((d | 0) == (c[m >> 2] | 0))
					d = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
				else
					d = c[d >> 2] | 0;
				if (nl(d, v, g, w, t, o, z, x, u, s) | 0) {
					l = n;
					break
				}
				d = c[l >> 2] | 0;
				if ((d | 0) == (c[m >> 2] | 0)) {
					wb[c[(c[k >> 2] | 0) + 40 >> 2] & 127](k) | 0;
					continue
				} else {
					c[l >> 2] = d + 4;
					continue
				}
			}
			s = a[z >> 0] | 0;
			d = c[u >> 2] | 0;
			if ((((s & 1) == 0 ? (s & 255) >>> 1 : c[z + 4 >> 2] | 0) | 0) != 0 ? (d - x | 0) < 160 : 0) {
				s = c[t >> 2] | 0;
				t = d + 4 | 0;
				c[u >> 2] = t;
				c[d >> 2] = s;
				d = t
			}
			b[j >> 1] = Zr(g, c[w >> 2] | 0, h, v) | 0;
			Yn(z, x, d, h);
			if (k) {
				d = c[k + 12 >> 2] | 0;
				if ((d | 0) == (c[k + 16 >> 2] | 0))
					d = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
				else
					d = c[d >> 2] | 0;
				if ((d | 0) == -1) {
					c[e >> 2] = 0;
					g = 1
				} else
					g = 0
			} else
				g = 1;
			do
				if (l) {
					d = c[l + 12 >> 2] | 0;
					if ((d | 0) == (c[l + 16 >> 2] | 0))
						d = wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0;
					else
						d = c[d >> 2] | 0;
					if ((d | 0) != -1)
						if (g)
							break;
						else {
							B = 46;
							break
						}
					else {
						c[f >> 2] = 0;
						B = 44;
						break
					}
				} else
					B = 44;
			while (0);
			if ((B | 0) == 44 ? g : 0)
				B = 46;
			if ((B | 0) == 46)
				c[h >> 2] = c[h >> 2] | 2;
			B = c[e >> 2] | 0;
			qj(y);
			qj(z);
			i = A;
			return B | 0
		}
		function Nq(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0;
			z = i;
			i = i + 320 | 0;
			r = z + 208 | 0;
			j = z + 200 | 0;
			y = z + 24 | 0;
			x = z + 12 | 0;
			v = z + 8 | 0;
			w = z + 40 | 0;
			t = z + 4 | 0;
			s = z;
			u = iq(f) | 0;
			rl(y, f, r, j);
			c[x >> 2] = 0;
			c[x + 4 >> 2] = 0;
			c[x + 8 >> 2] = 0;
			if (!(a[x >> 0] & 1))
				b = 10;
			else
				b = (c[x >> 2] & -2) + -1 | 0;
			uj(x, b, 0);
			o = x + 8 | 0;
			p = x + 1 | 0;
			f = (a[x >> 0] & 1) == 0 ? p : c[o >> 2] | 0;
			c[v >> 2] = f;
			c[t >> 2] = w;
			c[s >> 2] = 0;
			q = x + 4 | 0;
			n = c[j >> 2] | 0;
			j = c[d >> 2] | 0;
			a : while (1) {
				if (j) {
					b = c[j + 12 >> 2] | 0;
					if ((b | 0) == (c[j + 16 >> 2] | 0))
						b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
					else
						b = c[b >> 2] | 0;
					if ((b | 0) == -1) {
						c[d >> 2] = 0;
						j = 0;
						l = 1
					} else
						l = 0
				} else {
					j = 0;
					l = 1
				}
				k = c[e >> 2] | 0;
				do
					if (k) {
						b = c[k + 12 >> 2] | 0;
						if ((b | 0) == (c[k + 16 >> 2] | 0))
							b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
						else
							b = c[b >> 2] | 0;
						if ((b | 0) != -1)
							if (l) {
								m = k;
								break
							} else
								break a;
						else {
							c[e >> 2] = 0;
							A = 16;
							break
						}
					} else
						A = 16;
				while (0);
				if ((A | 0) == 16) {
					A = 0;
					if (l) {
						k = 0;
						break
					} else
						m = 0
				}
				k = a[x >> 0] | 0;
				k = (k & 1) == 0 ? (k & 255) >>> 1 : c[q >> 2] | 0;
				if ((c[v >> 2] | 0) == (f + k | 0)) {
					uj(x, k << 1, 0);
					if (!(a[x >> 0] & 1))
						b = 10;
					else
						b = (c[x >> 2] & -2) + -1 | 0;
					uj(x, b, 0);
					f = (a[x >> 0] & 1) == 0 ? p : c[o >> 2] | 0;
					c[v >> 2] = f + k
				}
				k = j + 12 | 0;
				b = c[k >> 2] | 0;
				l = j + 16 | 0;
				if ((b | 0) == (c[l >> 2] | 0))
					b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
				else
					b = c[b >> 2] | 0;
				if (nl(b, u, f, v, s, n, y, w, t, r) | 0) {
					k = m;
					break
				}
				b = c[k >> 2] | 0;
				if ((b | 0) == (c[l >> 2] | 0)) {
					wb[c[(c[j >> 2] | 0) + 40 >> 2] & 127](j) | 0;
					continue
				} else {
					c[k >> 2] = b + 4;
					continue
				}
			}
			r = a[y >> 0] | 0;
			b = c[t >> 2] | 0;
			if ((((r & 1) == 0 ? (r & 255) >>> 1 : c[y + 4 >> 2] | 0) | 0) != 0 ? (b - w | 0) < 160 : 0) {
				r = c[s >> 2] | 0;
				s = b + 4 | 0;
				c[t >> 2] = s;
				c[b >> 2] = r;
				b = s
			}
			c[h >> 2] = Yr(f, c[v >> 2] | 0, g, u) | 0;
			Yn(y, w, b, g);
			if (j) {
				b = c[j + 12 >> 2] | 0;
				if ((b | 0) == (c[j + 16 >> 2] | 0))
					b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
				else
					b = c[b >> 2] | 0;
				if ((b | 0) == -1) {
					c[d >> 2] = 0;
					f = 1
				} else
					f = 0
			} else
				f = 1;
			do
				if (k) {
					b = c[k + 12 >> 2] | 0;
					if ((b | 0) == (c[k + 16 >> 2] | 0))
						b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
					else
						b = c[b >> 2] | 0;
					if ((b | 0) != -1)
						if (f)
							break;
						else {
							A = 46;
							break
						}
					else {
						c[e >> 2] = 0;
						A = 44;
						break
					}
				} else
					A = 44;
			while (0);
			if ((A | 0) == 44 ? f : 0)
				A = 46;
			if ((A | 0) == 46)
				c[g >> 2] = c[g >> 2] | 2;
			A = c[d >> 2] | 0;
			qj(x);
			qj(y);
			i = z;
			return A | 0
		}
		function Oq(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0;
			z = i;
			i = i + 320 | 0;
			r = z + 208 | 0;
			j = z + 200 | 0;
			y = z + 24 | 0;
			x = z + 12 | 0;
			v = z + 8 | 0;
			w = z + 40 | 0;
			t = z + 4 | 0;
			s = z;
			u = iq(f) | 0;
			rl(y, f, r, j);
			c[x >> 2] = 0;
			c[x + 4 >> 2] = 0;
			c[x + 8 >> 2] = 0;
			if (!(a[x >> 0] & 1))
				b = 10;
			else
				b = (c[x >> 2] & -2) + -1 | 0;
			uj(x, b, 0);
			o = x + 8 | 0;
			p = x + 1 | 0;
			f = (a[x >> 0] & 1) == 0 ? p : c[o >> 2] | 0;
			c[v >> 2] = f;
			c[t >> 2] = w;
			c[s >> 2] = 0;
			q = x + 4 | 0;
			n = c[j >> 2] | 0;
			j = c[d >> 2] | 0;
			a : while (1) {
				if (j) {
					b = c[j + 12 >> 2] | 0;
					if ((b | 0) == (c[j + 16 >> 2] | 0))
						b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
					else
						b = c[b >> 2] | 0;
					if ((b | 0) == -1) {
						c[d >> 2] = 0;
						j = 0;
						l = 1
					} else
						l = 0
				} else {
					j = 0;
					l = 1
				}
				k = c[e >> 2] | 0;
				do
					if (k) {
						b = c[k + 12 >> 2] | 0;
						if ((b | 0) == (c[k + 16 >> 2] | 0))
							b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
						else
							b = c[b >> 2] | 0;
						if ((b | 0) != -1)
							if (l) {
								m = k;
								break
							} else
								break a;
						else {
							c[e >> 2] = 0;
							A = 16;
							break
						}
					} else
						A = 16;
				while (0);
				if ((A | 0) == 16) {
					A = 0;
					if (l) {
						k = 0;
						break
					} else
						m = 0
				}
				k = a[x >> 0] | 0;
				k = (k & 1) == 0 ? (k & 255) >>> 1 : c[q >> 2] | 0;
				if ((c[v >> 2] | 0) == (f + k | 0)) {
					uj(x, k << 1, 0);
					if (!(a[x >> 0] & 1))
						b = 10;
					else
						b = (c[x >> 2] & -2) + -1 | 0;
					uj(x, b, 0);
					f = (a[x >> 0] & 1) == 0 ? p : c[o >> 2] | 0;
					c[v >> 2] = f + k
				}
				k = j + 12 | 0;
				b = c[k >> 2] | 0;
				l = j + 16 | 0;
				if ((b | 0) == (c[l >> 2] | 0))
					b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
				else
					b = c[b >> 2] | 0;
				if (nl(b, u, f, v, s, n, y, w, t, r) | 0) {
					k = m;
					break
				}
				b = c[k >> 2] | 0;
				if ((b | 0) == (c[l >> 2] | 0)) {
					wb[c[(c[j >> 2] | 0) + 40 >> 2] & 127](j) | 0;
					continue
				} else {
					c[k >> 2] = b + 4;
					continue
				}
			}
			r = a[y >> 0] | 0;
			b = c[t >> 2] | 0;
			if ((((r & 1) == 0 ? (r & 255) >>> 1 : c[y + 4 >> 2] | 0) | 0) != 0 ? (b - w | 0) < 160 : 0) {
				r = c[s >> 2] | 0;
				s = b + 4 | 0;
				c[t >> 2] = s;
				c[b >> 2] = r;
				b = s
			}
			c[h >> 2] = Xr(f, c[v >> 2] | 0, g, u) | 0;
			Yn(y, w, b, g);
			if (j) {
				b = c[j + 12 >> 2] | 0;
				if ((b | 0) == (c[j + 16 >> 2] | 0))
					b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
				else
					b = c[b >> 2] | 0;
				if ((b | 0) == -1) {
					c[d >> 2] = 0;
					f = 1
				} else
					f = 0
			} else
				f = 1;
			do
				if (k) {
					b = c[k + 12 >> 2] | 0;
					if ((b | 0) == (c[k + 16 >> 2] | 0))
						b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
					else
						b = c[b >> 2] | 0;
					if ((b | 0) != -1)
						if (f)
							break;
						else {
							A = 46;
							break
						}
					else {
						c[e >> 2] = 0;
						A = 44;
						break
					}
				} else
					A = 44;
			while (0);
			if ((A | 0) == 44 ? f : 0)
				A = 46;
			if ((A | 0) == 46)
				c[g >> 2] = c[g >> 2] | 2;
			A = c[d >> 2] | 0;
			qj(x);
			qj(y);
			i = z;
			return A | 0
		}
		function Pq(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0;
			z = i;
			i = i + 320 | 0;
			r = z + 208 | 0;
			j = z + 200 | 0;
			y = z + 24 | 0;
			x = z + 12 | 0;
			v = z + 8 | 0;
			w = z + 40 | 0;
			t = z + 4 | 0;
			s = z;
			u = iq(f) | 0;
			rl(y, f, r, j);
			c[x >> 2] = 0;
			c[x + 4 >> 2] = 0;
			c[x + 8 >> 2] = 0;
			if (!(a[x >> 0] & 1))
				b = 10;
			else
				b = (c[x >> 2] & -2) + -1 | 0;
			uj(x, b, 0);
			o = x + 8 | 0;
			p = x + 1 | 0;
			f = (a[x >> 0] & 1) == 0 ? p : c[o >> 2] | 0;
			c[v >> 2] = f;
			c[t >> 2] = w;
			c[s >> 2] = 0;
			q = x + 4 | 0;
			n = c[j >> 2] | 0;
			j = c[d >> 2] | 0;
			a : while (1) {
				if (j) {
					b = c[j + 12 >> 2] | 0;
					if ((b | 0) == (c[j + 16 >> 2] | 0))
						b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
					else
						b = c[b >> 2] | 0;
					if ((b | 0) == -1) {
						c[d >> 2] = 0;
						j = 0;
						l = 1
					} else
						l = 0
				} else {
					j = 0;
					l = 1
				}
				k = c[e >> 2] | 0;
				do
					if (k) {
						b = c[k + 12 >> 2] | 0;
						if ((b | 0) == (c[k + 16 >> 2] | 0))
							b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
						else
							b = c[b >> 2] | 0;
						if ((b | 0) != -1)
							if (l) {
								m = k;
								break
							} else
								break a;
						else {
							c[e >> 2] = 0;
							A = 16;
							break
						}
					} else
						A = 16;
				while (0);
				if ((A | 0) == 16) {
					A = 0;
					if (l) {
						k = 0;
						break
					} else
						m = 0
				}
				k = a[x >> 0] | 0;
				k = (k & 1) == 0 ? (k & 255) >>> 1 : c[q >> 2] | 0;
				if ((c[v >> 2] | 0) == (f + k | 0)) {
					uj(x, k << 1, 0);
					if (!(a[x >> 0] & 1))
						b = 10;
					else
						b = (c[x >> 2] & -2) + -1 | 0;
					uj(x, b, 0);
					f = (a[x >> 0] & 1) == 0 ? p : c[o >> 2] | 0;
					c[v >> 2] = f + k
				}
				k = j + 12 | 0;
				b = c[k >> 2] | 0;
				l = j + 16 | 0;
				if ((b | 0) == (c[l >> 2] | 0))
					b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
				else
					b = c[b >> 2] | 0;
				if (nl(b, u, f, v, s, n, y, w, t, r) | 0) {
					k = m;
					break
				}
				b = c[k >> 2] | 0;
				if ((b | 0) == (c[l >> 2] | 0)) {
					wb[c[(c[j >> 2] | 0) + 40 >> 2] & 127](j) | 0;
					continue
				} else {
					c[k >> 2] = b + 4;
					continue
				}
			}
			r = a[y >> 0] | 0;
			b = c[t >> 2] | 0;
			if ((((r & 1) == 0 ? (r & 255) >>> 1 : c[y + 4 >> 2] | 0) | 0) != 0 ? (b - w | 0) < 160 : 0) {
				r = c[s >> 2] | 0;
				s = b + 4 | 0;
				c[t >> 2] = s;
				c[b >> 2] = r;
				b = s
			}
			v = Wr(f, c[v >> 2] | 0, g, u) | 0;
			c[h >> 2] = v;
			c[h + 4 >> 2] = C;
			Yn(y, w, b, g);
			if (j) {
				b = c[j + 12 >> 2] | 0;
				if ((b | 0) == (c[j + 16 >> 2] | 0))
					b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
				else
					b = c[b >> 2] | 0;
				if ((b | 0) == -1) {
					c[d >> 2] = 0;
					f = 1
				} else
					f = 0
			} else
				f = 1;
			do
				if (k) {
					b = c[k + 12 >> 2] | 0;
					if ((b | 0) == (c[k + 16 >> 2] | 0))
						b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
					else
						b = c[b >> 2] | 0;
					if ((b | 0) != -1)
						if (f)
							break;
						else {
							A = 46;
							break
						}
					else {
						c[e >> 2] = 0;
						A = 44;
						break
					}
				} else
					A = 44;
			while (0);
			if ((A | 0) == 44 ? f : 0)
				A = 46;
			if ((A | 0) == 46)
				c[g >> 2] = c[g >> 2] | 2;
			A = c[d >> 2] | 0;
			qj(x);
			qj(y);
			i = z;
			return A | 0
		}
		function Qq(b, d, e, f, h, j) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			h = h | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0;
			C = i;
			i = i + 352 | 0;
			u = C + 208 | 0;
			k = C + 40 | 0;
			l = C + 36 | 0;
			B = C + 24 | 0;
			A = C + 12 | 0;
			y = C + 8 | 0;
			z = C + 48 | 0;
			x = C + 4 | 0;
			w = C;
			v = C + 337 | 0;
			t = C + 336 | 0;
			sl(B, f, u, k, l);
			c[A >> 2] = 0;
			c[A + 4 >> 2] = 0;
			c[A + 8 >> 2] = 0;
			if (!(a[A >> 0] & 1))
				b = 10;
			else
				b = (c[A >> 2] & -2) + -1 | 0;
			uj(A, b, 0);
			q = A + 8 | 0;
			r = A + 1 | 0;
			f = (a[A >> 0] & 1) == 0 ? r : c[q >> 2] | 0;
			c[y >> 2] = f;
			c[x >> 2] = z;
			c[w >> 2] = 0;
			a[v >> 0] = 1;
			a[t >> 0] = 69;
			s = A + 4 | 0;
			p = c[k >> 2] | 0;
			o = c[l >> 2] | 0;
			k = c[d >> 2] | 0;
			a : while (1) {
				if (k) {
					b = c[k + 12 >> 2] | 0;
					if ((b | 0) == (c[k + 16 >> 2] | 0))
						b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
					else
						b = c[b >> 2] | 0;
					if ((b | 0) == -1) {
						c[d >> 2] = 0;
						k = 0;
						m = 1
					} else
						m = 0
				} else {
					k = 0;
					m = 1
				}
				l = c[e >> 2] | 0;
				do
					if (l) {
						b = c[l + 12 >> 2] | 0;
						if ((b | 0) == (c[l + 16 >> 2] | 0))
							b = wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0;
						else
							b = c[b >> 2] | 0;
						if ((b | 0) != -1)
							if (m)
								break;
							else
								break a;
						else {
							c[e >> 2] = 0;
							D = 16;
							break
						}
					} else
						D = 16;
				while (0);
				if ((D | 0) == 16) {
					D = 0;
					if (m) {
						l = 0;
						break
					} else
						l = 0
				}
				m = a[A >> 0] | 0;
				m = (m & 1) == 0 ? (m & 255) >>> 1 : c[s >> 2] | 0;
				if ((c[y >> 2] | 0) == (f + m | 0)) {
					uj(A, m << 1, 0);
					if (!(a[A >> 0] & 1))
						b = 10;
					else
						b = (c[A >> 2] & -2) + -1 | 0;
					uj(A, b, 0);
					f = (a[A >> 0] & 1) == 0 ? r : c[q >> 2] | 0;
					c[y >> 2] = f + m
				}
				m = k + 12 | 0;
				b = c[m >> 2] | 0;
				n = k + 16 | 0;
				if ((b | 0) == (c[n >> 2] | 0))
					b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
				else
					b = c[b >> 2] | 0;
				if (tl(b, v, t, f, y, p, o, B, z, x, w, u) | 0)
					break;
				b = c[m >> 2] | 0;
				if ((b | 0) == (c[n >> 2] | 0)) {
					wb[c[(c[k >> 2] | 0) + 40 >> 2] & 127](k) | 0;
					continue
				} else {
					c[m >> 2] = b + 4;
					continue
				}
			}
			u = a[B >> 0] | 0;
			b = c[x >> 2] | 0;
			if (!((a[v >> 0] | 0) == 0 ? 1 : (((u & 1) == 0 ? (u & 255) >>> 1 : c[B + 4 >> 2] | 0) | 0) == 0) ? (b - z | 0) < 160 : 0) {
				v = c[w >> 2] | 0;
				w = b + 4 | 0;
				c[x >> 2] = w;
				c[b >> 2] = v;
				b = w
			}
			g[j >> 2] = +Vr(f, c[y >> 2] | 0, h);
			Yn(B, z, b, h);
			if (k) {
				b = c[k + 12 >> 2] | 0;
				if ((b | 0) == (c[k + 16 >> 2] | 0))
					b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
				else
					b = c[b >> 2] | 0;
				if ((b | 0) == -1) {
					c[d >> 2] = 0;
					f = 1
				} else
					f = 0
			} else
				f = 1;
			do
				if (l) {
					b = c[l + 12 >> 2] | 0;
					if ((b | 0) == (c[l + 16 >> 2] | 0))
						b = wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0;
					else
						b = c[b >> 2] | 0;
					if ((b | 0) != -1)
						if (f)
							break;
						else {
							D = 46;
							break
						}
					else {
						c[e >> 2] = 0;
						D = 44;
						break
					}
				} else
					D = 44;
			while (0);
			if ((D | 0) == 44 ? f : 0)
				D = 46;
			if ((D | 0) == 46)
				c[h >> 2] = c[h >> 2] | 2;
			D = c[d >> 2] | 0;
			qj(A);
			qj(B);
			i = C;
			return D | 0
		}
		function Rq(b, d, e, f, g, j) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0;
			C = i;
			i = i + 352 | 0;
			u = C + 208 | 0;
			k = C + 40 | 0;
			l = C + 36 | 0;
			B = C + 24 | 0;
			A = C + 12 | 0;
			y = C + 8 | 0;
			z = C + 48 | 0;
			x = C + 4 | 0;
			w = C;
			v = C + 337 | 0;
			t = C + 336 | 0;
			sl(B, f, u, k, l);
			c[A >> 2] = 0;
			c[A + 4 >> 2] = 0;
			c[A + 8 >> 2] = 0;
			if (!(a[A >> 0] & 1))
				b = 10;
			else
				b = (c[A >> 2] & -2) + -1 | 0;
			uj(A, b, 0);
			q = A + 8 | 0;
			r = A + 1 | 0;
			f = (a[A >> 0] & 1) == 0 ? r : c[q >> 2] | 0;
			c[y >> 2] = f;
			c[x >> 2] = z;
			c[w >> 2] = 0;
			a[v >> 0] = 1;
			a[t >> 0] = 69;
			s = A + 4 | 0;
			p = c[k >> 2] | 0;
			o = c[l >> 2] | 0;
			k = c[d >> 2] | 0;
			a : while (1) {
				if (k) {
					b = c[k + 12 >> 2] | 0;
					if ((b | 0) == (c[k + 16 >> 2] | 0))
						b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
					else
						b = c[b >> 2] | 0;
					if ((b | 0) == -1) {
						c[d >> 2] = 0;
						k = 0;
						m = 1
					} else
						m = 0
				} else {
					k = 0;
					m = 1
				}
				l = c[e >> 2] | 0;
				do
					if (l) {
						b = c[l + 12 >> 2] | 0;
						if ((b | 0) == (c[l + 16 >> 2] | 0))
							b = wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0;
						else
							b = c[b >> 2] | 0;
						if ((b | 0) != -1)
							if (m)
								break;
							else
								break a;
						else {
							c[e >> 2] = 0;
							D = 16;
							break
						}
					} else
						D = 16;
				while (0);
				if ((D | 0) == 16) {
					D = 0;
					if (m) {
						l = 0;
						break
					} else
						l = 0
				}
				m = a[A >> 0] | 0;
				m = (m & 1) == 0 ? (m & 255) >>> 1 : c[s >> 2] | 0;
				if ((c[y >> 2] | 0) == (f + m | 0)) {
					uj(A, m << 1, 0);
					if (!(a[A >> 0] & 1))
						b = 10;
					else
						b = (c[A >> 2] & -2) + -1 | 0;
					uj(A, b, 0);
					f = (a[A >> 0] & 1) == 0 ? r : c[q >> 2] | 0;
					c[y >> 2] = f + m
				}
				m = k + 12 | 0;
				b = c[m >> 2] | 0;
				n = k + 16 | 0;
				if ((b | 0) == (c[n >> 2] | 0))
					b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
				else
					b = c[b >> 2] | 0;
				if (tl(b, v, t, f, y, p, o, B, z, x, w, u) | 0)
					break;
				b = c[m >> 2] | 0;
				if ((b | 0) == (c[n >> 2] | 0)) {
					wb[c[(c[k >> 2] | 0) + 40 >> 2] & 127](k) | 0;
					continue
				} else {
					c[m >> 2] = b + 4;
					continue
				}
			}
			u = a[B >> 0] | 0;
			b = c[x >> 2] | 0;
			if (!((a[v >> 0] | 0) == 0 ? 1 : (((u & 1) == 0 ? (u & 255) >>> 1 : c[B + 4 >> 2] | 0) | 0) == 0) ? (b - z | 0) < 160 : 0) {
				v = c[w >> 2] | 0;
				w = b + 4 | 0;
				c[x >> 2] = w;
				c[b >> 2] = v;
				b = w
			}
			h[j >> 3] = +Ur(f, c[y >> 2] | 0, g);
			Yn(B, z, b, g);
			if (k) {
				b = c[k + 12 >> 2] | 0;
				if ((b | 0) == (c[k + 16 >> 2] | 0))
					b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
				else
					b = c[b >> 2] | 0;
				if ((b | 0) == -1) {
					c[d >> 2] = 0;
					f = 1
				} else
					f = 0
			} else
				f = 1;
			do
				if (l) {
					b = c[l + 12 >> 2] | 0;
					if ((b | 0) == (c[l + 16 >> 2] | 0))
						b = wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0;
					else
						b = c[b >> 2] | 0;
					if ((b | 0) != -1)
						if (f)
							break;
						else {
							D = 46;
							break
						}
					else {
						c[e >> 2] = 0;
						D = 44;
						break
					}
				} else
					D = 44;
			while (0);
			if ((D | 0) == 44 ? f : 0)
				D = 46;
			if ((D | 0) == 46)
				c[g >> 2] = c[g >> 2] | 2;
			D = c[d >> 2] | 0;
			qj(A);
			qj(B);
			i = C;
			return D | 0
		}
		function Sq(b, d, e, f, g, j) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			j = j | 0;
			var k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = 0,
			w = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			B = 0,
			C = 0,
			D = 0;
			C = i;
			i = i + 352 | 0;
			u = C + 208 | 0;
			k = C + 40 | 0;
			l = C + 36 | 0;
			B = C + 24 | 0;
			A = C + 12 | 0;
			y = C + 8 | 0;
			z = C + 48 | 0;
			x = C + 4 | 0;
			w = C;
			v = C + 337 | 0;
			t = C + 336 | 0;
			sl(B, f, u, k, l);
			c[A >> 2] = 0;
			c[A + 4 >> 2] = 0;
			c[A + 8 >> 2] = 0;
			if (!(a[A >> 0] & 1))
				b = 10;
			else
				b = (c[A >> 2] & -2) + -1 | 0;
			uj(A, b, 0);
			q = A + 8 | 0;
			r = A + 1 | 0;
			f = (a[A >> 0] & 1) == 0 ? r : c[q >> 2] | 0;
			c[y >> 2] = f;
			c[x >> 2] = z;
			c[w >> 2] = 0;
			a[v >> 0] = 1;
			a[t >> 0] = 69;
			s = A + 4 | 0;
			p = c[k >> 2] | 0;
			o = c[l >> 2] | 0;
			k = c[d >> 2] | 0;
			a : while (1) {
				if (k) {
					b = c[k + 12 >> 2] | 0;
					if ((b | 0) == (c[k + 16 >> 2] | 0))
						b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
					else
						b = c[b >> 2] | 0;
					if ((b | 0) == -1) {
						c[d >> 2] = 0;
						k = 0;
						m = 1
					} else
						m = 0
				} else {
					k = 0;
					m = 1
				}
				l = c[e >> 2] | 0;
				do
					if (l) {
						b = c[l + 12 >> 2] | 0;
						if ((b | 0) == (c[l + 16 >> 2] | 0))
							b = wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0;
						else
							b = c[b >> 2] | 0;
						if ((b | 0) != -1)
							if (m)
								break;
							else
								break a;
						else {
							c[e >> 2] = 0;
							D = 16;
							break
						}
					} else
						D = 16;
				while (0);
				if ((D | 0) == 16) {
					D = 0;
					if (m) {
						l = 0;
						break
					} else
						l = 0
				}
				m = a[A >> 0] | 0;
				m = (m & 1) == 0 ? (m & 255) >>> 1 : c[s >> 2] | 0;
				if ((c[y >> 2] | 0) == (f + m | 0)) {
					uj(A, m << 1, 0);
					if (!(a[A >> 0] & 1))
						b = 10;
					else
						b = (c[A >> 2] & -2) + -1 | 0;
					uj(A, b, 0);
					f = (a[A >> 0] & 1) == 0 ? r : c[q >> 2] | 0;
					c[y >> 2] = f + m
				}
				m = k + 12 | 0;
				b = c[m >> 2] | 0;
				n = k + 16 | 0;
				if ((b | 0) == (c[n >> 2] | 0))
					b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
				else
					b = c[b >> 2] | 0;
				if (tl(b, v, t, f, y, p, o, B, z, x, w, u) | 0)
					break;
				b = c[m >> 2] | 0;
				if ((b | 0) == (c[n >> 2] | 0)) {
					wb[c[(c[k >> 2] | 0) + 40 >> 2] & 127](k) | 0;
					continue
				} else {
					c[m >> 2] = b + 4;
					continue
				}
			}
			u = a[B >> 0] | 0;
			b = c[x >> 2] | 0;
			if (!((a[v >> 0] | 0) == 0 ? 1 : (((u & 1) == 0 ? (u & 255) >>> 1 : c[B + 4 >> 2] | 0) | 0) == 0) ? (b - z | 0) < 160 : 0) {
				v = c[w >> 2] | 0;
				w = b + 4 | 0;
				c[x >> 2] = w;
				c[b >> 2] = v;
				b = w
			}
			h[j >> 3] = +Tr(f, c[y >> 2] | 0, g);
			Yn(B, z, b, g);
			if (k) {
				b = c[k + 12 >> 2] | 0;
				if ((b | 0) == (c[k + 16 >> 2] | 0))
					b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
				else
					b = c[b >> 2] | 0;
				if ((b | 0) == -1) {
					c[d >> 2] = 0;
					f = 1
				} else
					f = 0
			} else
				f = 1;
			do
				if (l) {
					b = c[l + 12 >> 2] | 0;
					if ((b | 0) == (c[l + 16 >> 2] | 0))
						b = wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0;
					else
						b = c[b >> 2] | 0;
					if ((b | 0) != -1)
						if (f)
							break;
						else {
							D = 46;
							break
						}
					else {
						c[e >> 2] = 0;
						D = 44;
						break
					}
				} else
					D = 44;
			while (0);
			if ((D | 0) == 44 ? f : 0)
				D = 46;
			if ((D | 0) == 46)
				c[g >> 2] = c[g >> 2] | 2;
			D = c[d >> 2] | 0;
			qj(A);
			qj(B);
			i = C;
			return D | 0
		}
		function Tq(a, b, d, e, f) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0;
			g = i;
			i = i + 16 | 0;
			h = g;
			c[h >> 2] = f;
			f = gi(d) | 0;
			d = Li(a, b, e, h) | 0;
			if (f)
				gi(f) | 0;
			i = g;
			return d | 0
		}
		function Uq(a, b, d, e) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0;
			f = i;
			i = i + 16 | 0;
			g = f;
			c[g >> 2] = e;
			e = gi(b) | 0;
			b = Ii(a, d, g) | 0;
			if (e)
				gi(e) | 0;
			i = f;
			return b | 0
		}
		function Vq(b, d, e, f, g, h) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0;
			o = i;
			i = i + 16 | 0;
			n = o;
			j = c[b >> 2] | 0;
			a : do
				if (!j)
					j = 0;
				else {
					p = d;
					l = f - p >> 2;
					m = g + 12 | 0;
					g = c[m >> 2] | 0;
					l = (g | 0) > (l | 0) ? g - l | 0 : 0;
					g = e;
					p = g - p | 0;
					k = p >> 2;
					if ((p | 0) > 0 ? (pb[c[(c[j >> 2] | 0) + 48 >> 2] & 31](j, d, k) | 0) != (k | 0) : 0) {
						c[b >> 2] = 0;
						j = 0;
						break
					}
					do
						if ((l | 0) > 0) {
							Ej(n, l, h);
							if ((pb[c[(c[j >> 2] | 0) + 48 >> 2] & 31](j, (a[n >> 0] & 1) == 0 ? n + 4 | 0 : c[n + 8 >> 2] | 0, l) | 0) == (l | 0)) {
								Fj(n);
								break
							} else {
								c[b >> 2] = 0;
								Fj(n);
								j = 0;
								break a
							}
						}
					while (0);
					p = f - g | 0;
					f = p >> 2;
					if ((p | 0) > 0 ? (pb[c[(c[j >> 2] | 0) + 48 >> 2] & 31](j, e, f) | 0) != (f | 0) : 0) {
						c[b >> 2] = 0;
						j = 0;
						break
					}
					c[m >> 2] = 0
				}
			while (0);
			i = o;
			return j | 0
		}
		function Wq(a, e, f, g, h) {
			a = a | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			var i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0;
			i = c[a >> 2] | 0;
			do
				if (i) {
					if ((c[i + 12 >> 2] | 0) == (c[i + 16 >> 2] | 0))
						if ((wb[c[(c[i >> 2] | 0) + 36 >> 2] & 127](i) | 0) == -1) {
							c[a >> 2] = 0;
							i = 0;
							break
						} else {
							i = c[a >> 2] | 0;
							break
						}
				} else
					i = 0;
			while (0);
			j = (i | 0) == 0;
			i = c[e >> 2] | 0;
			do
				if (i) {
					if ((c[i + 12 >> 2] | 0) == (c[i + 16 >> 2] | 0) ? (wb[c[(c[i >> 2] | 0) + 36 >> 2] & 127](i) | 0) == -1 : 0) {
						c[e >> 2] = 0;
						r = 11;
						break
					}
					if (j)
						r = 13;
					else
						r = 12
				} else
					r = 11;
			while (0);
			if ((r | 0) == 11)
				if (j)
					r = 12;
				else {
					i = 0;
					r = 13
				}
			a : do
				if ((r | 0) == 12) {
					c[f >> 2] = c[f >> 2] | 6;
					i = 0
				} else if ((r | 0) == 13) {
					j = c[a >> 2] | 0;
					k = c[j + 12 >> 2] | 0;
					if ((k | 0) == (c[j + 16 >> 2] | 0))
						j = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
					else
						j = d[k >> 0] | 0;
					k = j & 255;
					if (k << 24 >> 24 > -1 ? (q = g + 8 | 0, (b[(c[q >> 2] | 0) + (j << 24 >> 24 << 1) >> 1] & 2048) != 0) : 0) {
						m = (pb[c[(c[g >> 2] | 0) + 36 >> 2] & 31](g, k, 0) | 0) << 24 >> 24;
						j = c[a >> 2] | 0;
						k = j + 12 | 0;
						l = c[k >> 2] | 0;
						if ((l | 0) == (c[j + 16 >> 2] | 0)) {
							wb[c[(c[j >> 2] | 0) + 40 >> 2] & 127](j) | 0;
							o = h;
							n = i;
							h = i;
							i = m
						} else {
							c[k >> 2] = l + 1;
							o = h;
							n = i;
							h = i;
							i = m
						}
						while (1) {
							i = i + -48 | 0;
							p = o + -1 | 0;
							j = c[a >> 2] | 0;
							do
								if (j) {
									if ((c[j + 12 >> 2] | 0) == (c[j + 16 >> 2] | 0))
										if ((wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0) == -1) {
											c[a >> 2] = 0;
											j = 0;
											break
										} else {
											j = c[a >> 2] | 0;
											break
										}
								} else
									j = 0;
							while (0);
							l = (j | 0) == 0;
							if (h)
								if ((c[h + 12 >> 2] | 0) == (c[h + 16 >> 2] | 0))
									if ((wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0) == -1) {
										c[e >> 2] = 0;
										k = 0;
										h = 0
									} else {
										k = n;
										h = n
									}
								else
									k = n;
							else {
								k = n;
								h = 0
							}
							j = c[a >> 2] | 0;
							if (!((o | 0) > 1 & (l^(h | 0) == 0)))
								break;
							l = c[j + 12 >> 2] | 0;
							if ((l | 0) == (c[j + 16 >> 2] | 0))
								j = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
							else
								j = d[l >> 0] | 0;
							l = j & 255;
							if (l << 24 >> 24 <= -1)
								break a;
							if (!(b[(c[q >> 2] | 0) + (j << 24 >> 24 << 1) >> 1] & 2048))
								break a;
							i = ((pb[c[(c[g >> 2] | 0) + 36 >> 2] & 31](g, l, 0) | 0) << 24 >> 24) + (i * 10 | 0) | 0;
							j = c[a >> 2] | 0;
							l = j + 12 | 0;
							m = c[l >> 2] | 0;
							if ((m | 0) == (c[j + 16 >> 2] | 0)) {
								wb[c[(c[j >> 2] | 0) + 40 >> 2] & 127](j) | 0;
								o = p;
								n = k;
								continue
							} else {
								c[l >> 2] = m + 1;
								o = p;
								n = k;
								continue
							}
						}
						do
							if (j) {
								if ((c[j + 12 >> 2] | 0) == (c[j + 16 >> 2] | 0))
									if ((wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0) == -1) {
										c[a >> 2] = 0;
										j = 0;
										break
									} else {
										j = c[a >> 2] | 0;
										break
									}
							} else
								j = 0;
						while (0);
						j = (j | 0) == 0;
						do
							if (k) {
								if ((c[k + 12 >> 2] | 0) == (c[k + 16 >> 2] | 0) ? (wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0) == -1 : 0) {
									c[e >> 2] = 0;
									r = 50;
									break
								}
								if (j)
									break a
							} else
								r = 50;
						while (0);
						if ((r | 0) == 50 ? !j : 0)
							break;
						c[f >> 2] = c[f >> 2] | 2;
						break
					}
					c[f >> 2] = c[f >> 2] | 4;
					i = 0
				}
			while (0);
			return i | 0
		}
		function Xq(a, b, d, e, f) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0;
			g = c[a >> 2] | 0;
			do
				if (g) {
					h = c[g + 12 >> 2] | 0;
					if ((h | 0) == (c[g + 16 >> 2] | 0))
						g = wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0;
					else
						g = c[h >> 2] | 0;
					if ((g | 0) == -1) {
						c[a >> 2] = 0;
						i = 1;
						break
					} else {
						i = (c[a >> 2] | 0) == 0;
						break
					}
				} else
					i = 1;
			while (0);
			h = c[b >> 2] | 0;
			do
				if (h) {
					g = c[h + 12 >> 2] | 0;
					if ((g | 0) == (c[h + 16 >> 2] | 0))
						g = wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0;
					else
						g = c[g >> 2] | 0;
					if ((g | 0) != -1)
						if (i) {
							o = 17;
							break
						} else {
							o = 16;
							break
						}
					else {
						c[b >> 2] = 0;
						o = 14;
						break
					}
				} else
					o = 14;
			while (0);
			if ((o | 0) == 14)
				if (i)
					o = 16;
				else {
					h = 0;
					o = 17
				}
			a : do
				if ((o | 0) == 16) {
					c[d >> 2] = c[d >> 2] | 6;
					g = 0
				} else if ((o | 0) == 17) {
					g = c[a >> 2] | 0;
					i = c[g + 12 >> 2] | 0;
					if ((i | 0) == (c[g + 16 >> 2] | 0))
						g = wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0;
					else
						g = c[i >> 2] | 0;
					if (!(pb[c[(c[e >> 2] | 0) + 12 >> 2] & 31](e, 2048, g) | 0)) {
						c[d >> 2] = c[d >> 2] | 4;
						g = 0;
						break
					}
					g = (pb[c[(c[e >> 2] | 0) + 52 >> 2] & 31](e, g, 0) | 0) << 24 >> 24;
					i = c[a >> 2] | 0;
					j = i + 12 | 0;
					k = c[j >> 2] | 0;
					if ((k | 0) == (c[i + 16 >> 2] | 0)) {
						wb[c[(c[i >> 2] | 0) + 40 >> 2] & 127](i) | 0;
						m = f;
						l = h;
						j = h
					} else {
						c[j >> 2] = k + 4;
						m = f;
						l = h;
						j = h
					}
					while (1) {
						g = g + -48 | 0;
						n = m + -1 | 0;
						h = c[a >> 2] | 0;
						do
							if (h) {
								i = c[h + 12 >> 2] | 0;
								if ((i | 0) == (c[h + 16 >> 2] | 0))
									h = wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0;
								else
									h = c[i >> 2] | 0;
								if ((h | 0) == -1) {
									c[a >> 2] = 0;
									k = 1;
									break
								} else {
									k = (c[a >> 2] | 0) == 0;
									break
								}
							} else
								k = 1;
						while (0);
						do
							if (j) {
								h = c[j + 12 >> 2] | 0;
								if ((h | 0) == (c[j + 16 >> 2] | 0))
									h = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
								else
									h = c[h >> 2] | 0;
								if ((h | 0) == -1) {
									c[b >> 2] = 0;
									j = 0;
									f = 0;
									h = 1;
									break
								} else {
									j = l;
									f = l;
									h = (l | 0) == 0;
									break
								}
							} else {
								j = l;
								f = 0;
								h = 1
							}
						while (0);
						i = c[a >> 2] | 0;
						if (!((m | 0) > 1 & (k^h)))
							break;
						h = c[i + 12 >> 2] | 0;
						if ((h | 0) == (c[i + 16 >> 2] | 0))
							h = wb[c[(c[i >> 2] | 0) + 36 >> 2] & 127](i) | 0;
						else
							h = c[h >> 2] | 0;
						if (!(pb[c[(c[e >> 2] | 0) + 12 >> 2] & 31](e, 2048, h) | 0))
							break a;
						g = ((pb[c[(c[e >> 2] | 0) + 52 >> 2] & 31](e, h, 0) | 0) << 24 >> 24) + (g * 10 | 0) | 0;
						h = c[a >> 2] | 0;
						i = h + 12 | 0;
						k = c[i >> 2] | 0;
						if ((k | 0) == (c[h + 16 >> 2] | 0)) {
							wb[c[(c[h >> 2] | 0) + 40 >> 2] & 127](h) | 0;
							m = n;
							l = j;
							j = f;
							continue
						} else {
							c[i >> 2] = k + 4;
							m = n;
							l = j;
							j = f;
							continue
						}
					}
					do
						if (i) {
							h = c[i + 12 >> 2] | 0;
							if ((h | 0) == (c[i + 16 >> 2] | 0))
								h = wb[c[(c[i >> 2] | 0) + 36 >> 2] & 127](i) | 0;
							else
								h = c[h >> 2] | 0;
							if ((h | 0) == -1) {
								c[a >> 2] = 0;
								i = 1;
								break
							} else {
								i = (c[a >> 2] | 0) == 0;
								break
							}
						} else
							i = 1;
					while (0);
					do
						if (j) {
							h = c[j + 12 >> 2] | 0;
							if ((h | 0) == (c[j + 16 >> 2] | 0))
								h = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
							else
								h = c[h >> 2] | 0;
							if ((h | 0) != -1)
								if (i)
									break a;
								else
									break;
							else {
								c[b >> 2] = 0;
								o = 60;
								break
							}
						} else
							o = 60;
					while (0);
					if ((o | 0) == 60 ? !i : 0)
						break;
					c[d >> 2] = c[d >> 2] | 2
				}
			while (0);
			return g | 0
		}
		function Yq(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0;
			h = a + 4 | 0;
			f = (c[h >> 2] | 0) != 144;
			e = c[a >> 2] | 0;
			i = e;
			g = (c[d >> 2] | 0) - i | 0;
			g = g >>> 0 < 2147483647 ? g << 1 : -1;
			i = (c[b >> 2] | 0) - i | 0;
			e = ij(f ? e : 0, g) | 0;
			if (!e)
				Nh();
			if (!f) {
				f = c[a >> 2] | 0;
				c[a >> 2] = e;
				if (f) {
					sb[c[h >> 2] & 255](f);
					e = c[a >> 2] | 0
				}
			} else
				c[a >> 2] = e;
			c[h >> 2] = 147;
			c[b >> 2] = e + i;
			c[d >> 2] = (c[a >> 2] | 0) + g;
			return
		}
		function Zq(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0;
			h = a + 4 | 0;
			f = (c[h >> 2] | 0) != 144;
			e = c[a >> 2] | 0;
			i = e;
			g = (c[d >> 2] | 0) - i | 0;
			g = g >>> 0 < 2147483647 ? g << 1 : -1;
			i = (c[b >> 2] | 0) - i >> 2;
			e = ij(f ? e : 0, g) | 0;
			if (!e)
				Nh();
			if (!f) {
				f = c[a >> 2] | 0;
				c[a >> 2] = e;
				if (f) {
					sb[c[h >> 2] & 255](f);
					e = c[a >> 2] | 0
				}
			} else
				c[a >> 2] = e;
			c[h >> 2] = 147;
			c[b >> 2] = e + (i << 2);
			c[d >> 2] = (c[a >> 2] | 0) + (g >>> 2 << 2);
			return
		}
		function _q(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0;
			h = d;
			f = a[b >> 0] | 0;
			if (!(f & 1)) {
				g = 10;
				k = (f & 255) >>> 1
			} else {
				f = c[b >> 2] | 0;
				g = (f & -2) + -1 | 0;
				k = c[b + 4 >> 2] | 0;
				f = f & 255
			}
			j = e - h | 0;
			do
				if ((e | 0) != (d | 0)) {
					if ((g - k | 0) >>> 0 < j >>> 0) {
						Bj(b, g, k + j - g | 0, k, k, 0, 0);
						f = a[b >> 0] | 0
					}
					if (!(f & 1))
						i = b + 1 | 0;
					else
						i = c[b + 8 >> 2] | 0;
					h = e + (k - h) | 0;
					if ((d | 0) != (e | 0)) {
						f = d;
						g = i + k | 0;
						while (1) {
							a[g >> 0] = a[f >> 0] | 0;
							f = f + 1 | 0;
							if ((f | 0) == (e | 0))
								break;
							else
								g = g + 1 | 0
						}
					}
					a[i + h >> 0] = 0;
					f = k + j | 0;
					if (!(a[b >> 0] & 1)) {
						a[b >> 0] = f << 1;
						break
					} else {
						c[b + 4 >> 2] = f;
						break
					}
				}
			while (0);
			return b | 0
		}
		function $q(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0;
			h = a + 4 | 0;
			f = (c[h >> 2] | 0) != 144;
			e = c[a >> 2] | 0;
			i = e;
			g = (c[d >> 2] | 0) - i | 0;
			g = g >>> 0 < 2147483647 ? g << 1 : -1;
			i = (c[b >> 2] | 0) - i >> 2;
			e = ij(f ? e : 0, g) | 0;
			if (!e)
				Nh();
			if (!f) {
				f = c[a >> 2] | 0;
				c[a >> 2] = e;
				if (f) {
					sb[c[h >> 2] & 255](f);
					e = c[a >> 2] | 0
				}
			} else
				c[a >> 2] = e;
			c[h >> 2] = 147;
			c[b >> 2] = e + (i << 2);
			c[d >> 2] = (c[a >> 2] | 0) + (g >>> 2 << 2);
			return
		}
		function ar(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0;
			h = d;
			f = a[b >> 0] | 0;
			if (!(f & 1)) {
				g = 1;
				k = (f & 255) >>> 1
			} else {
				f = c[b >> 2] | 0;
				g = (f & -2) + -1 | 0;
				k = c[b + 4 >> 2] | 0;
				f = f & 255
			}
			j = e - h >> 2;
			do
				if (j) {
					if ((g - k | 0) >>> 0 < j >>> 0) {
						Lj(b, g, k + j - g | 0, k, k, 0, 0);
						f = a[b >> 0] | 0
					}
					if (!(f & 1))
						i = b + 4 | 0;
					else
						i = c[b + 8 >> 2] | 0;
					h = k + ((e - h | 0) >>> 2) | 0;
					if ((d | 0) != (e | 0)) {
						f = d;
						g = i + (k << 2) | 0;
						while (1) {
							c[g >> 2] = c[f >> 2];
							f = f + 4 | 0;
							if ((f | 0) == (e | 0))
								break;
							else
								g = g + 4 | 0
						}
					}
					c[i + (h << 2) >> 2] = 0;
					f = k + j | 0;
					if (!(a[b >> 0] & 1)) {
						a[b >> 0] = f << 1;
						break
					} else {
						c[b + 4 >> 2] = f;
						break
					}
				}
			while (0);
			return b | 0
		}
		function br(b, d) {
			b = b | 0;
			d = d | 0;
			c[b >> 2] = 0;
			c[b + 4 >> 2] = 0;
			c[b + 8 >> 2] = 0;
			a[b + 128 >> 0] = 0;
			if (d) {
				Sr(b, d);
				Or(b, d)
			}
			return
		}
		function cr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(8280) | 0);
			return
		}
		function dr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(8320) | 0);
			return
		}
		function er(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(9352) | 0);
			return
		}
		function fr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(9344) | 0);
			return
		}
		function gr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(9412) | 0);
			return
		}
		function hr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(9420) | 0);
			return
		}
		function ir(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(9476) | 0);
			return
		}
		function jr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(9484) | 0);
			return
		}
		function kr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(9492) | 0);
			return
		}
		function lr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(9500) | 0);
			return
		}
		function mr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(8392) | 0);
			return
		}
		function nr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(8464) | 0);
			return
		}
		function or(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(8524) | 0);
			return
		}
		function pr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(8584) | 0);
			return
		}
		function qr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(8896) | 0);
			return
		}
		function rr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(8960) | 0);
			return
		}
		function sr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(9024) | 0);
			return
		}
		function tr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(9088) | 0);
			return
		}
		function ur(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(9124) | 0);
			return
		}
		function vr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(9160) | 0);
			return
		}
		function wr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(9196) | 0);
			return
		}
		function xr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(9232) | 0);
			return
		}
		function yr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(8676) | 0);
			return
		}
		function zr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(8768) | 0);
			return
		}
		function Ar(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(8800) | 0);
			return
		}
		function Br(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(8832) | 0);
			return
		}
		function Cr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(9272) | 0);
			return
		}
		function Dr(a, b) {
			a = a | 0;
			b = b | 0;
			Co(a, b, Lo(9312) | 0);
			return
		}
		function Er(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0;
			h = a + 4 | 0;
			d = c[h >> 2] | 0;
			e = c[a >> 2] | 0;
			f = d - e >> 2;
			if (f >>> 0 >= b >>> 0) {
				if (f >>> 0 > b >>> 0 ? (g = e + (b << 2) | 0, (d | 0) != (g | 0)) : 0) {
					do
						d = d + -4 | 0;
					while ((d | 0) != (g | 0));
					c[h >> 2] = d
				}
			} else
				Nr(a, b - f | 0);
			return
		}
		function Fr(b) {
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0;
			e = c[b >> 2] | 0;
			do
				if (e) {
					f = b + 4 | 0;
					d = c[f >> 2] | 0;
					if ((d | 0) != (e | 0)) {
						do
							d = d + -4 | 0;
						while ((d | 0) != (e | 0));
						c[f >> 2] = d
					}
					if ((b + 16 | 0) == (e | 0)) {
						a[b + 128 >> 0] = 0;
						break
					} else {
						ih(e);
						break
					}
				}
			while (0);
			return
		}
		function Gr(a) {
			a = a | 0;
			var b = 0,
			d = 0;
			d = a + 4 | 0;
			b = c[d >> 2] | 0;
			d = c[d + 4 >> 2] | 0;
			a = (c[a >> 2] | 0) + (d >> 1) | 0;
			if (d & 1)
				b = c[(c[a >> 2] | 0) + b >> 2] | 0;
			sb[b & 255](a);
			return
		}
		function Hr(d, f, g, h, i, j, k, l) {
			d = d | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			i = i | 0;
			j = j | 0;
			k = k | 0;
			l = l | 0;
			var m = 0,
			n = 0;
			c[g >> 2] = d;
			c[j >> 2] = h;
			if (l & 2)
				if ((i - h | 0) < 3)
					d = 1;
				else {
					c[j >> 2] = h + 1;
					a[h >> 0] = -17;
					m = c[j >> 2] | 0;
					c[j >> 2] = m + 1;
					a[m >> 0] = -69;
					m = c[j >> 2] | 0;
					c[j >> 2] = m + 1;
					a[m >> 0] = -65;
					m = 4
				}
			else
				m = 4;
			a : do
				if ((m | 0) == 4) {
					n = f;
					d = c[g >> 2] | 0;
					if (d >>> 0 < f >>> 0)
						while (1) {
							l = b[d >> 1] | 0;
							m = l & 65535;
							if (m >>> 0 > k >>> 0) {
								d = 2;
								break a
							}
							do
								if ((l & 65535) < 128) {
									d = c[j >> 2] | 0;
									if ((i - d | 0) < 1) {
										d = 1;
										break a
									}
									c[j >> 2] = d + 1;
									a[d >> 0] = l
								} else {
									if ((l & 65535) < 2048) {
										d = c[j >> 2] | 0;
										if ((i - d | 0) < 2) {
											d = 1;
											break a
										}
										c[j >> 2] = d + 1;
										a[d >> 0] = m >>> 6 | 192;
										h = c[j >> 2] | 0;
										c[j >> 2] = h + 1;
										a[h >> 0] = m & 63 | 128;
										break
									}
									if ((l & 65535) < 55296) {
										d = c[j >> 2] | 0;
										if ((i - d | 0) < 3) {
											d = 1;
											break a
										}
										c[j >> 2] = d + 1;
										a[d >> 0] = m >>> 12 | 224;
										h = c[j >> 2] | 0;
										c[j >> 2] = h + 1;
										a[h >> 0] = m >>> 6 & 63 | 128;
										h = c[j >> 2] | 0;
										c[j >> 2] = h + 1;
										a[h >> 0] = m & 63 | 128;
										break
									}
									if ((l & 65535) >= 56320) {
										if ((l & 65535) < 57344) {
											d = 2;
											break a
										}
										d = c[j >> 2] | 0;
										if ((i - d | 0) < 3) {
											d = 1;
											break a
										}
										c[j >> 2] = d + 1;
										a[d >> 0] = m >>> 12 | 224;
										h = c[j >> 2] | 0;
										c[j >> 2] = h + 1;
										a[h >> 0] = m >>> 6 & 63 | 128;
										h = c[j >> 2] | 0;
										c[j >> 2] = h + 1;
										a[h >> 0] = m & 63 | 128;
										break
									}
									if ((n - d | 0) < 4) {
										d = 1;
										break a
									}
									d = d + 2 | 0;
									l = e[d >> 1] | 0;
									if ((l & 64512 | 0) != 56320) {
										d = 2;
										break a
									}
									if ((i - (c[j >> 2] | 0) | 0) < 4) {
										d = 1;
										break a
									}
									h = m & 960;
									if (((h << 10) + 65536 | m << 10 & 64512 | l & 1023) >>> 0 > k >>> 0) {
										d = 2;
										break a
									}
									c[g >> 2] = d;
									d = (h >>> 6) + 1 | 0;
									h = c[j >> 2] | 0;
									c[j >> 2] = h + 1;
									a[h >> 0] = d >>> 2 | 240;
									h = c[j >> 2] | 0;
									c[j >> 2] = h + 1;
									a[h >> 0] = m >>> 2 & 15 | d << 4 & 48 | 128;
									h = c[j >> 2] | 0;
									c[j >> 2] = h + 1;
									a[h >> 0] = m << 4 & 48 | l >>> 6 & 15 | 128;
									m = c[j >> 2] | 0;
									c[j >> 2] = m + 1;
									a[m >> 0] = l & 63 | 128
								}
							while (0);
							d = (c[g >> 2] | 0) + 2 | 0;
							c[g >> 2] = d;
							if (d >>> 0 >= f >>> 0) {
								d = 0;
								break
							}
						}
					else
						d = 0
				}
			while (0);
			return d | 0
		}
		function Ir(e, f, g, h, i, j, k, l) {
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			i = i | 0;
			j = j | 0;
			k = k | 0;
			l = l | 0;
			var m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0,
			r = 0;
			c[g >> 2] = e;
			c[j >> 2] = h;
			if (l & 4) {
				e = c[g >> 2] | 0;
				l = f;
				if ((((l - e | 0) > 2 ? (a[e >> 0] | 0) == -17 : 0) ? (a[e + 1 >> 0] | 0) == -69 : 0) ? (a[e + 2 >> 0] | 0) == -65 : 0) {
					c[g >> 2] = e + 3;
					m = c[j >> 2] | 0
				} else
					m = h
			} else {
				m = h;
				l = f
			}
			q = i;
			h = c[g >> 2] | 0;
			e = h >>> 0 < f >>> 0;
			a : do
				if (e & m >>> 0 < i >>> 0)
					while (1) {
						e = a[h >> 0] | 0;
						o = e & 255;
						if (o >>> 0 > k >>> 0) {
							e = 2;
							break a
						}
						do
							if (e << 24 >> 24 > -1) {
								b[m >> 1] = e & 255;
								c[g >> 2] = h + 1
							} else {
								if ((e & 255) < 194) {
									e = 2;
									break a
								}
								if ((e & 255) < 224) {
									if ((l - h | 0) < 2) {
										e = 1;
										break a
									}
									e = d[h + 1 >> 0] | 0;
									if ((e & 192 | 0) != 128) {
										e = 2;
										break a
									}
									e = e & 63 | o << 6 & 1984;
									if (e >>> 0 > k >>> 0) {
										e = 2;
										break a
									}
									b[m >> 1] = e;
									c[g >> 2] = h + 2;
									break
								}
								if ((e & 255) < 240) {
									if ((l - h | 0) < 3) {
										e = 1;
										break a
									}
									n = a[h + 1 >> 0] | 0;
									e = a[h + 2 >> 0] | 0;
									switch (o | 0) {
									case 224: {
											if ((n & -32) << 24 >> 24 != -96) {
												e = 2;
												break a
											}
											break
										}
									case 237: {
											if ((n & -32) << 24 >> 24 != -128) {
												e = 2;
												break a
											}
											break
										}
									default:
										if ((n & -64) << 24 >> 24 != -128) {
											e = 2;
											break a
										}
									}
									e = e & 255;
									if ((e & 192 | 0) != 128) {
										e = 2;
										break a
									}
									e = (n & 255) << 6 & 4032 | o << 12 | e & 63;
									if ((e & 65535) >>> 0 > k >>> 0) {
										e = 2;
										break a
									}
									b[m >> 1] = e;
									c[g >> 2] = h + 3;
									break
								}
								if ((e & 255) >= 245) {
									e = 2;
									break a
								}
								if ((l - h | 0) < 4) {
									e = 1;
									break a
								}
								n = a[h + 1 >> 0] | 0;
								e = a[h + 2 >> 0] | 0;
								h = a[h + 3 >> 0] | 0;
								switch (o | 0) {
								case 240: {
										if ((n + 112 & 255) >= 48) {
											e = 2;
											break a
										}
										break
									}
								case 244: {
										if ((n & -16) << 24 >> 24 != -128) {
											e = 2;
											break a
										}
										break
									}
								default:
									if ((n & -64) << 24 >> 24 != -128) {
										e = 2;
										break a
									}
								}
								p = e & 255;
								if ((p & 192 | 0) != 128) {
									e = 2;
									break a
								}
								e = h & 255;
								if ((e & 192 | 0) != 128) {
									e = 2;
									break a
								}
								if ((q - m | 0) < 4) {
									e = 1;
									break a
								}
								o = o & 7;
								h = n & 255;
								n = p << 6;
								e = e & 63;
								if ((h << 12 & 258048 | o << 18 | n & 4032 | e) >>> 0 > k >>> 0) {
									e = 2;
									break a
								}
								b[m >> 1] = h << 2 & 60 | p >>> 4 & 3 | ((h >>> 4 & 3 | o << 2) << 6) + 16320 | 55296;
								p = m + 2 | 0;
								c[j >> 2] = p;
								b[p >> 1] = e | n & 960 | 56320;
								c[g >> 2] = (c[g >> 2] | 0) + 4
							}
						while (0);
						m = (c[j >> 2] | 0) + 2 | 0;
						c[j >> 2] = m;
						h = c[g >> 2] | 0;
						e = h >>> 0 < f >>> 0;
						if (!(e & m >>> 0 < i >>> 0)) {
							r = 39;
							break
						}
					}
				else
					r = 39;
			while (0);
			if ((r | 0) == 39)
				e = e & 1;
			return e | 0
		}
		function Jr(b, c, e, f, g) {
			b = b | 0;
			c = c | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0;
			n = c;
			if ((((g & 4 | 0) != 0 ? (n - b | 0) > 2 : 0) ? (a[b >> 0] | 0) == -17 : 0) ? (a[b + 1 >> 0] | 0) == -69 : 0)
				g = (a[b + 2 >> 0] | 0) == -65 ? b + 3 | 0 : b;
			else
				g = b;
			a : do
				if ((e | 0) != 0 & g >>> 0 < c >>> 0) {
					m = g;
					h = 0;
					b : while (1) {
						g = a[m >> 0] | 0;
						l = g & 255;
						if (l >>> 0 > f >>> 0) {
							g = m;
							h = 42;
							break a
						}
						do
							if (g << 24 >> 24 > -1)
								g = m + 1 | 0;
							else {
								if ((g & 255) < 194) {
									g = m;
									h = 42;
									break a
								}
								if ((g & 255) < 224) {
									if ((n - m | 0) < 2) {
										g = m;
										h = 42;
										break a
									}
									g = d[m + 1 >> 0] | 0;
									if ((g & 192 | 0) != 128) {
										g = m;
										h = 42;
										break a
									}
									if ((g & 63 | l << 6 & 1984) >>> 0 > f >>> 0) {
										g = m;
										h = 42;
										break a
									}
									g = m + 2 | 0;
									break
								}
								if ((g & 255) < 240) {
									g = m;
									if ((n - g | 0) < 3) {
										g = m;
										h = 42;
										break a
									}
									j = a[m + 1 >> 0] | 0;
									i = a[m + 2 >> 0] | 0;
									switch (l | 0) {
									case 224: {
											if ((j & -32) << 24 >> 24 != -96) {
												h = 20;
												break b
											}
											break
										}
									case 237: {
											if ((j & -32) << 24 >> 24 != -128) {
												h = 22;
												break b
											}
											break
										}
									default:
										if ((j & -64) << 24 >> 24 != -128) {
											h = 24;
											break b
										}
									}
									g = i & 255;
									if ((g & 192 | 0) != 128) {
										g = m;
										h = 42;
										break a
									}
									if (((j & 255) << 6 & 4032 | l << 12 & 61440 | g & 63) >>> 0 > f >>> 0) {
										g = m;
										h = 42;
										break a
									}
									g = m + 3 | 0;
									break
								}
								if ((g & 255) >= 245) {
									g = m;
									h = 42;
									break a
								}
								g = m;
								if ((e - h | 0) >>> 0 < 2 | (n - g | 0) < 4) {
									g = m;
									h = 42;
									break a
								}
								k = a[m + 1 >> 0] | 0;
								i = a[m + 2 >> 0] | 0;
								j = a[m + 3 >> 0] | 0;
								switch (l | 0) {
								case 240: {
										if ((k + 112 & 255) >= 48) {
											h = 32;
											break b
										}
										break
									}
								case 244: {
										if ((k & -16) << 24 >> 24 != -128) {
											h = 34;
											break b
										}
										break
									}
								default:
									if ((k & -64) << 24 >> 24 != -128) {
										h = 36;
										break b
									}
								}
								i = i & 255;
								if ((i & 192 | 0) != 128) {
									g = m;
									h = 42;
									break a
								}
								g = j & 255;
								if ((g & 192 | 0) != 128) {
									g = m;
									h = 42;
									break a
								}
								if (((k & 255) << 12 & 258048 | l << 18 & 1835008 | i << 6 & 4032 | g & 63) >>> 0 > f >>> 0) {
									g = m;
									h = 42;
									break a
								}
								g = m + 4 | 0;
								h = h + 1 | 0
							}
						while (0);
						h = h + 1 | 0;
						if (!(h >>> 0 < e >>> 0 & g >>> 0 < c >>> 0)) {
							h = 42;
							break a
						} else
							m = g
					}
					if ((h | 0) == 20) {
						g = g - b | 0;
						break
					} else if ((h | 0) == 22) {
						g = g - b | 0;
						break
					} else if ((h | 0) == 24) {
						g = g - b | 0;
						break
					} else if ((h | 0) == 32) {
						g = g - b | 0;
						break
					} else if ((h | 0) == 34) {
						g = g - b | 0;
						break
					} else if ((h | 0) == 36) {
						g = g - b | 0;
						break
					}
				} else
					h = 42;
			while (0);
			if ((h | 0) == 42)
				g = g - b | 0;
			return g | 0
		}
		function Kr(b, d, e, f, g, h, i, j) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			i = i | 0;
			j = j | 0;
			var k = 0,
			l = 0;
			c[e >> 2] = b;
			c[h >> 2] = f;
			l = g;
			if (j & 2)
				if ((l - f | 0) < 3)
					b = 1;
				else {
					c[h >> 2] = f + 1;
					a[f >> 0] = -17;
					k = c[h >> 2] | 0;
					c[h >> 2] = k + 1;
					a[k >> 0] = -69;
					k = c[h >> 2] | 0;
					c[h >> 2] = k + 1;
					a[k >> 0] = -65;
					k = 4
				}
			else
				k = 4;
			a : do
				if ((k | 0) == 4) {
					b = c[e >> 2] | 0;
					if (b >>> 0 < d >>> 0)
						while (1) {
							j = c[b >> 2] | 0;
							if (j >>> 0 > i >>> 0 | (j & -2048 | 0) == 55296) {
								b = 2;
								break a
							}
							do
								if (j >>> 0 >= 128) {
									if (j >>> 0 < 2048) {
										b = c[h >> 2] | 0;
										if ((l - b | 0) < 2) {
											b = 1;
											break a
										}
										c[h >> 2] = b + 1;
										a[b >> 0] = j >>> 6 | 192;
										k = c[h >> 2] | 0;
										c[h >> 2] = k + 1;
										a[k >> 0] = j & 63 | 128;
										break
									}
									b = c[h >> 2] | 0;
									g = l - b | 0;
									if (j >>> 0 < 65536) {
										if ((g | 0) < 3) {
											b = 1;
											break a
										}
										c[h >> 2] = b + 1;
										a[b >> 0] = j >>> 12 | 224;
										k = c[h >> 2] | 0;
										c[h >> 2] = k + 1;
										a[k >> 0] = j >>> 6 & 63 | 128;
										k = c[h >> 2] | 0;
										c[h >> 2] = k + 1;
										a[k >> 0] = j & 63 | 128;
										break
									} else {
										if ((g | 0) < 4) {
											b = 1;
											break a
										}
										c[h >> 2] = b + 1;
										a[b >> 0] = j >>> 18 | 240;
										k = c[h >> 2] | 0;
										c[h >> 2] = k + 1;
										a[k >> 0] = j >>> 12 & 63 | 128;
										k = c[h >> 2] | 0;
										c[h >> 2] = k + 1;
										a[k >> 0] = j >>> 6 & 63 | 128;
										k = c[h >> 2] | 0;
										c[h >> 2] = k + 1;
										a[k >> 0] = j & 63 | 128;
										break
									}
								} else {
									b = c[h >> 2] | 0;
									if ((l - b | 0) < 1) {
										b = 1;
										break a
									}
									c[h >> 2] = b + 1;
									a[b >> 0] = j
								}
							while (0);
							b = (c[e >> 2] | 0) + 4 | 0;
							c[e >> 2] = b;
							if (b >>> 0 >= d >>> 0) {
								b = 0;
								break
							}
						}
					else
						b = 0
				}
			while (0);
			return b | 0
		}
		function Lr(b, e, f, g, h, i, j, k) {
			b = b | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			i = i | 0;
			j = j | 0;
			k = k | 0;
			var l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0,
			q = 0;
			c[f >> 2] = b;
			c[i >> 2] = g;
			if (k & 4) {
				b = c[f >> 2] | 0;
				k = e;
				if ((((k - b | 0) > 2 ? (a[b >> 0] | 0) == -17 : 0) ? (a[b + 1 >> 0] | 0) == -69 : 0) ? (a[b + 2 >> 0] | 0) == -65 : 0) {
					c[f >> 2] = b + 3;
					g = c[i >> 2] | 0;
					p = k
				} else
					p = k
			} else
				p = e;
			k = c[f >> 2] | 0;
			b = k >>> 0 < e >>> 0;
			a : do
				if (b & g >>> 0 < h >>> 0)
					while (1) {
						b = a[k >> 0] | 0;
						o = b & 255;
						do
							if (b << 24 >> 24 > -1) {
								if (o >>> 0 > j >>> 0) {
									b = 2;
									break a
								}
								c[g >> 2] = o;
								c[f >> 2] = k + 1
							} else {
								if ((b & 255) < 194) {
									b = 2;
									break a
								}
								if ((b & 255) < 224) {
									if ((p - k | 0) < 2) {
										b = 1;
										break a
									}
									b = d[k + 1 >> 0] | 0;
									if ((b & 192 | 0) != 128) {
										b = 2;
										break a
									}
									b = b & 63 | o << 6 & 1984;
									if (b >>> 0 > j >>> 0) {
										b = 2;
										break a
									}
									c[g >> 2] = b;
									c[f >> 2] = k + 2;
									break
								}
								if ((b & 255) < 240) {
									if ((p - k | 0) < 3) {
										b = 1;
										break a
									}
									l = a[k + 1 >> 0] | 0;
									b = a[k + 2 >> 0] | 0;
									switch (o | 0) {
									case 224: {
											if ((l & -32) << 24 >> 24 != -96) {
												b = 2;
												break a
											}
											break
										}
									case 237: {
											if ((l & -32) << 24 >> 24 != -128) {
												b = 2;
												break a
											}
											break
										}
									default:
										if ((l & -64) << 24 >> 24 != -128) {
											b = 2;
											break a
										}
									}
									b = b & 255;
									if ((b & 192 | 0) != 128) {
										b = 2;
										break a
									}
									b = (l & 255) << 6 & 4032 | o << 12 & 61440 | b & 63;
									if (b >>> 0 > j >>> 0) {
										b = 2;
										break a
									}
									c[g >> 2] = b;
									c[f >> 2] = k + 3;
									break
								}
								if ((b & 255) >= 245) {
									b = 2;
									break a
								}
								if ((p - k | 0) < 4) {
									b = 1;
									break a
								}
								n = a[k + 1 >> 0] | 0;
								b = a[k + 2 >> 0] | 0;
								l = a[k + 3 >> 0] | 0;
								switch (o | 0) {
								case 240: {
										if ((n + 112 & 255) >= 48) {
											b = 2;
											break a
										}
										break
									}
								case 244: {
										if ((n & -16) << 24 >> 24 != -128) {
											b = 2;
											break a
										}
										break
									}
								default:
									if ((n & -64) << 24 >> 24 != -128) {
										b = 2;
										break a
									}
								}
								m = b & 255;
								if ((m & 192 | 0) != 128) {
									b = 2;
									break a
								}
								b = l & 255;
								if ((b & 192 | 0) != 128) {
									b = 2;
									break a
								}
								b = (n & 255) << 12 & 258048 | o << 18 & 1835008 | m << 6 & 4032 | b & 63;
								if (b >>> 0 > j >>> 0) {
									b = 2;
									break a
								}
								c[g >> 2] = b;
								c[f >> 2] = k + 4
							}
						while (0);
						g = (c[i >> 2] | 0) + 4 | 0;
						c[i >> 2] = g;
						k = c[f >> 2] | 0;
						b = k >>> 0 < e >>> 0;
						if (!(b & g >>> 0 < h >>> 0)) {
							q = 38;
							break
						}
					}
				else
					q = 38;
			while (0);
			if ((q | 0) == 38)
				b = b & 1;
			return b | 0
		}
		function Mr(b, c, e, f, g) {
			b = b | 0;
			c = c | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			var h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0;
			n = c;
			if ((((g & 4 | 0) != 0 ? (n - b | 0) > 2 : 0) ? (a[b >> 0] | 0) == -17 : 0) ? (a[b + 1 >> 0] | 0) == -69 : 0)
				g = (a[b + 2 >> 0] | 0) == -65 ? b + 3 | 0 : b;
			else
				g = b;
			a : do
				if ((e | 0) != 0 & g >>> 0 < c >>> 0) {
					l = g;
					m = 0;
					b : while (1) {
						g = a[l >> 0] | 0;
						k = g & 255;
						do
							if (g << 24 >> 24 > -1) {
								if (k >>> 0 > f >>> 0) {
									g = l;
									h = 42;
									break a
								}
								g = l + 1 | 0
							} else {
								if ((g & 255) < 194) {
									g = l;
									h = 42;
									break a
								}
								if ((g & 255) < 224) {
									if ((n - l | 0) < 2) {
										g = l;
										h = 42;
										break a
									}
									g = d[l + 1 >> 0] | 0;
									if ((g & 192 | 0) != 128) {
										g = l;
										h = 42;
										break a
									}
									if ((g & 63 | k << 6 & 1984) >>> 0 > f >>> 0) {
										g = l;
										h = 42;
										break a
									}
									g = l + 2 | 0;
									break
								}
								if ((g & 255) < 240) {
									g = l;
									if ((n - g | 0) < 3) {
										g = l;
										h = 42;
										break a
									}
									i = a[l + 1 >> 0] | 0;
									h = a[l + 2 >> 0] | 0;
									switch (k | 0) {
									case 224: {
											if ((i & -32) << 24 >> 24 != -96) {
												h = 20;
												break b
											}
											break
										}
									case 237: {
											if ((i & -32) << 24 >> 24 != -128) {
												h = 22;
												break b
											}
											break
										}
									default:
										if ((i & -64) << 24 >> 24 != -128) {
											h = 24;
											break b
										}
									}
									g = h & 255;
									if ((g & 192 | 0) != 128) {
										g = l;
										h = 42;
										break a
									}
									if (((i & 255) << 6 & 4032 | k << 12 & 61440 | g & 63) >>> 0 > f >>> 0) {
										g = l;
										h = 42;
										break a
									}
									g = l + 3 | 0;
									break
								}
								if ((g & 255) >= 245) {
									g = l;
									h = 42;
									break a
								}
								g = l;
								if ((n - g | 0) < 4) {
									g = l;
									h = 42;
									break a
								}
								j = a[l + 1 >> 0] | 0;
								h = a[l + 2 >> 0] | 0;
								i = a[l + 3 >> 0] | 0;
								switch (k | 0) {
								case 240: {
										if ((j + 112 & 255) >= 48) {
											h = 32;
											break b
										}
										break
									}
								case 244: {
										if ((j & -16) << 24 >> 24 != -128) {
											h = 34;
											break b
										}
										break
									}
								default:
									if ((j & -64) << 24 >> 24 != -128) {
										h = 36;
										break b
									}
								}
								h = h & 255;
								if ((h & 192 | 0) != 128) {
									g = l;
									h = 42;
									break a
								}
								g = i & 255;
								if ((g & 192 | 0) != 128) {
									g = l;
									h = 42;
									break a
								}
								if (((j & 255) << 12 & 258048 | k << 18 & 1835008 | h << 6 & 4032 | g & 63) >>> 0 > f >>> 0) {
									g = l;
									h = 42;
									break a
								}
								g = l + 4 | 0
							}
						while (0);
						m = m + 1 | 0;
						if (!(m >>> 0 < e >>> 0 & g >>> 0 < c >>> 0)) {
							h = 42;
							break a
						} else
							l = g
					}
					if ((h | 0) == 20) {
						g = g - b | 0;
						break
					} else if ((h | 0) == 22) {
						g = g - b | 0;
						break
					} else if ((h | 0) == 24) {
						g = g - b | 0;
						break
					} else if ((h | 0) == 32) {
						g = g - b | 0;
						break
					} else if ((h | 0) == 34) {
						g = g - b | 0;
						break
					} else if ((h | 0) == 36) {
						g = g - b | 0;
						break
					}
				} else
					h = 42;
			while (0);
			if ((h | 0) == 42)
				g = g - b | 0;
			return g | 0
		}
		function Nr(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0,
			j = 0,
			k = 0;
			k = i;
			i = i + 32 | 0;
			j = k;
			g = c[a + 8 >> 2] | 0;
			d = c[a + 4 >> 2] | 0;
			if (g - d >> 2 >>> 0 < b >>> 0) {
				e = c[a >> 2] | 0;
				h = d - e >> 2;
				f = h + b | 0;
				if (f >>> 0 > 1073741823)
					fh(a);
				d = g - e | 0;
				if (d >> 2 >>> 0 < 536870911) {
					d = d >> 1;
					d = d >>> 0 < f >>> 0 ? f : d
				} else
					d = 1073741823;
				Pr(j, d, h, a + 16 | 0);
				h = j + 8 | 0;
				g = c[h >> 2] | 0;
				gs(g | 0, 0, b << 2 | 0) | 0;
				c[h >> 2] = g + (b << 2);
				Qr(a, j);
				Rr(j)
			} else
				Or(a, b);
			i = k;
			return
		}
		function Or(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0;
			d = a + 4 | 0;
			a = b;
			b = c[d >> 2] | 0;
			do {
				c[b >> 2] = 0;
				b = (c[d >> 2] | 0) + 4 | 0;
				c[d >> 2] = b;
				a = a + -1 | 0
			} while ((a | 0) != 0);
			return
		}
		function Pr(b, d, e, f) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0;
			c[b + 12 >> 2] = 0;
			c[b + 16 >> 2] = f;
			do
				if (d) {
					g = f + 112 | 0;
					if (d >>> 0 < 29 & (a[g >> 0] | 0) == 0) {
						a[g >> 0] = 1;
						break
					} else {
						f = gh(d << 2) | 0;
						break
					}
				} else
					f = 0;
			while (0);
			c[b >> 2] = f;
			e = f + (e << 2) | 0;
			c[b + 8 >> 2] = e;
			c[b + 4 >> 2] = e;
			c[b + 12 >> 2] = f + (d << 2);
			return
		}
		function Qr(a, b) {
			a = a | 0;
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0,
			g = 0,
			h = 0;
			e = c[a >> 2] | 0;
			g = a + 4 | 0;
			d = b + 4 | 0;
			f = (c[g >> 2] | 0) - e | 0;
			h = (c[d >> 2] | 0) + (0 - (f >> 2) << 2) | 0;
			c[d >> 2] = h;
			js(h | 0, e | 0, f | 0) | 0;
			f = c[a >> 2] | 0;
			c[a >> 2] = c[d >> 2];
			c[d >> 2] = f;
			f = b + 8 | 0;
			e = c[g >> 2] | 0;
			c[g >> 2] = c[f >> 2];
			c[f >> 2] = e;
			f = a + 8 | 0;
			a = b + 12 | 0;
			e = c[f >> 2] | 0;
			c[f >> 2] = c[a >> 2];
			c[a >> 2] = e;
			c[b >> 2] = c[d >> 2];
			return
		}
		function Rr(b) {
			b = b | 0;
			var d = 0,
			e = 0,
			f = 0;
			e = c[b + 4 >> 2] | 0;
			f = b + 8 | 0;
			d = c[f >> 2] | 0;
			if ((d | 0) != (e | 0)) {
				do
					d = d + -4 | 0;
				while ((d | 0) != (e | 0));
				c[f >> 2] = d
			}
			e = c[b >> 2] | 0;
			do
				if (e) {
					d = c[b + 16 >> 2] | 0;
					if ((d | 0) == (e | 0)) {
						a[d + 112 >> 0] = 0;
						break
					} else {
						ih(e);
						break
					}
				}
			while (0);
			return
		}
		function Sr(b, d) {
			b = b | 0;
			d = d | 0;
			var e = 0;
			if (d >>> 0 > 1073741823)
				fh(b);
			e = b + 128 | 0;
			if (d >>> 0 < 29 & (a[e >> 0] | 0) == 0) {
				a[e >> 0] = 1;
				e = b + 16 | 0
			} else
				e = gh(d << 2) | 0;
			c[b + 4 >> 2] = e;
			c[b >> 2] = e;
			c[b + 8 >> 2] = e + (d << 2);
			return
		}
		function Tr(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0.0,
			f = 0,
			g = 0,
			h = 0,
			j = 0;
			j = i;
			i = i + 16 | 0;
			h = j;
			do
				if ((a | 0) != (b | 0)) {
					f = Vh() | 0;
					g = c[f >> 2] | 0;
					c[f >> 2] = 0;
					e = +Ni(a, h, $k() | 0);
					a = c[f >> 2] | 0;
					if (!a)
						c[f >> 2] = g;
					if ((c[h >> 2] | 0) != (b | 0)) {
						c[d >> 2] = 4;
						e = 0.0;
						break
					}
					if ((a | 0) == 34)
						c[d >> 2] = 4
				} else {
					c[d >> 2] = 4;
					e = 0.0
				}
			while (0);
			i = j;
			return +e
		}
		function Ur(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0.0,
			f = 0,
			g = 0,
			h = 0,
			j = 0;
			j = i;
			i = i + 16 | 0;
			h = j;
			do
				if ((a | 0) != (b | 0)) {
					f = Vh() | 0;
					g = c[f >> 2] | 0;
					c[f >> 2] = 0;
					e = +Ni(a, h, $k() | 0);
					a = c[f >> 2] | 0;
					if (!a)
						c[f >> 2] = g;
					if ((c[h >> 2] | 0) != (b | 0)) {
						c[d >> 2] = 4;
						e = 0.0;
						break
					}
					if ((a | 0) == 34)
						c[d >> 2] = 4
				} else {
					c[d >> 2] = 4;
					e = 0.0
				}
			while (0);
			i = j;
			return +e
		}
		function Vr(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			var e = 0.0,
			f = 0,
			g = 0,
			h = 0,
			j = 0;
			j = i;
			i = i + 16 | 0;
			h = j;
			do
				if ((a | 0) == (b | 0)) {
					c[d >> 2] = 4;
					e = 0.0
				} else {
					f = Vh() | 0;
					g = c[f >> 2] | 0;
					c[f >> 2] = 0;
					e = +Ni(a, h, $k() | 0);
					a = c[f >> 2] | 0;
					if (!a)
						c[f >> 2] = g;
					if ((c[h >> 2] | 0) != (b | 0)) {
						c[d >> 2] = 4;
						e = 0.0;
						break
					}
					if ((a | 0) == 34)
						c[d >> 2] = 4
				}
			while (0);
			i = j;
			return +e
		}
		function Wr(b, d, e, f) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			j = 0,
			k = 0;
			k = i;
			i = i + 16 | 0;
			j = k;
			do
				if ((b | 0) != (d | 0)) {
					if ((a[b >> 0] | 0) == 45) {
						c[e >> 2] = 4;
						f = 0;
						b = 0;
						break
					}
					g = Vh() | 0;
					h = c[g >> 2] | 0;
					c[g >> 2] = 0;
					b = Oh(b, j, f, $k() | 0) | 0;
					f = c[g >> 2] | 0;
					if (!f)
						c[g >> 2] = h;
					if ((c[j >> 2] | 0) != (d | 0)) {
						c[e >> 2] = 4;
						f = 0;
						b = 0;
						break
					}
					if ((f | 0) == 34) {
						c[e >> 2] = 4;
						f = -1;
						b = -1
					} else
						f = C
				} else {
					c[e >> 2] = 4;
					f = 0;
					b = 0
				}
			while (0);
			C = f;
			i = k;
			return b | 0
		}
		function Xr(b, d, e, f) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0;
			l = i;
			i = i + 16 | 0;
			k = l;
			do
				if ((b | 0) != (d | 0)) {
					if ((a[b >> 0] | 0) == 45) {
						c[e >> 2] = 4;
						b = 0;
						break
					}
					h = Vh() | 0;
					j = c[h >> 2] | 0;
					c[h >> 2] = 0;
					b = Oh(b, k, f, $k() | 0) | 0;
					f = C;
					g = c[h >> 2] | 0;
					if (!g)
						c[h >> 2] = j;
					if ((c[k >> 2] | 0) != (d | 0)) {
						c[e >> 2] = 4;
						b = 0;
						break
					}
					if (f >>> 0 > 0 | (f | 0) == 0 & b >>> 0 > 4294967295 | (g | 0) == 34) {
						c[e >> 2] = 4;
						b = -1;
						break
					} else
						break
				} else {
					c[e >> 2] = 4;
					b = 0
				}
			while (0);
			i = l;
			return b | 0
		}
		function Yr(b, d, e, f) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0;
			l = i;
			i = i + 16 | 0;
			k = l;
			do
				if ((b | 0) != (d | 0)) {
					if ((a[b >> 0] | 0) == 45) {
						c[e >> 2] = 4;
						b = 0;
						break
					}
					h = Vh() | 0;
					j = c[h >> 2] | 0;
					c[h >> 2] = 0;
					b = Oh(b, k, f, $k() | 0) | 0;
					f = C;
					g = c[h >> 2] | 0;
					if (!g)
						c[h >> 2] = j;
					if ((c[k >> 2] | 0) != (d | 0)) {
						c[e >> 2] = 4;
						b = 0;
						break
					}
					if (f >>> 0 > 0 | (f | 0) == 0 & b >>> 0 > 4294967295 | (g | 0) == 34) {
						c[e >> 2] = 4;
						b = -1;
						break
					} else
						break
				} else {
					c[e >> 2] = 4;
					b = 0
				}
			while (0);
			i = l;
			return b | 0
		}
		function Zr(b, d, e, f) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0;
			l = i;
			i = i + 16 | 0;
			k = l;
			do
				if ((b | 0) != (d | 0)) {
					if ((a[b >> 0] | 0) == 45) {
						c[e >> 2] = 4;
						b = 0;
						break
					}
					h = Vh() | 0;
					j = c[h >> 2] | 0;
					c[h >> 2] = 0;
					b = Oh(b, k, f, $k() | 0) | 0;
					f = C;
					g = c[h >> 2] | 0;
					if (!g)
						c[h >> 2] = j;
					if ((c[k >> 2] | 0) != (d | 0)) {
						c[e >> 2] = 4;
						b = 0;
						break
					}
					if (f >>> 0 > 0 | (f | 0) == 0 & b >>> 0 > 65535 | (g | 0) == 34) {
						c[e >> 2] = 4;
						b = -1;
						break
					} else {
						b = b & 65535;
						break
					}
				} else {
					c[e >> 2] = 4;
					b = 0
				}
			while (0);
			i = l;
			return b | 0
		}
		function _r(a, b, d, e) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0,
			j = 0,
			k = 0;
			k = i;
			i = i + 16 | 0;
			j = k;
			do
				if ((a | 0) != (b | 0)) {
					g = Vh() | 0;
					h = c[g >> 2] | 0;
					c[g >> 2] = 0;
					a = Ph(a, j, e, $k() | 0) | 0;
					e = C;
					f = c[g >> 2] | 0;
					if (!f)
						c[g >> 2] = h;
					if ((c[j >> 2] | 0) != (b | 0)) {
						c[d >> 2] = 4;
						e = 0;
						a = 0;
						break
					}
					if ((f | 0) == 34) {
						c[d >> 2] = 4;
						j = (e | 0) > 0 | (e | 0) == 0 & a >>> 0 > 0;
						C = j ? 2147483647 : -2147483648;
						i = k;
						return (j ? -1 : 0) | 0
					}
				} else {
					c[d >> 2] = 4;
					e = 0;
					a = 0
				}
			while (0);
			C = e;
			i = k;
			return a | 0
		}
		function $r(a, b, d, e) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0,
			j = 0,
			k = 0;
			k = i;
			i = i + 16 | 0;
			j = k;
			a : do
				if ((a | 0) == (b | 0)) {
					c[d >> 2] = 4;
					a = 0
				} else {
					g = Vh() | 0;
					h = c[g >> 2] | 0;
					c[g >> 2] = 0;
					a = Ph(a, j, e, $k() | 0) | 0;
					e = C;
					f = c[g >> 2] | 0;
					if (!f)
						c[g >> 2] = h;
					if ((c[j >> 2] | 0) != (b | 0)) {
						c[d >> 2] = 4;
						a = 0;
						break
					}
					do
						if ((f | 0) == 34) {
							c[d >> 2] = 4;
							if ((e | 0) > 0 | (e | 0) == 0 & a >>> 0 > 0) {
								a = 2147483647;
								break a
							}
						} else {
							if ((e | 0) < -1 | (e | 0) == -1 & a >>> 0 < 2147483648) {
								c[d >> 2] = 4;
								break
							}
							if ((e | 0) > 0 | (e | 0) == 0 & a >>> 0 > 2147483647) {
								c[d >> 2] = 4;
								a = 2147483647;
								break a
							} else
								break a
						}
					while (0);
					a = -2147483648
				}
			while (0);
			i = k;
			return a | 0
		}
		function as(a) {
			a = a | 0;
			return
		}
		function bs(a) {
			a = a | 0;
			a = a + 4 | 0;
			c[a >> 2] = (c[a >> 2] | 0) + 1;
			return
		}
		function cs(a) {
			a = a | 0;
			var b = 0,
			d = 0;
			d = a + 4 | 0;
			b = c[d >> 2] | 0;
			c[d >> 2] = b + -1;
			if (!b) {
				sb[c[(c[a >> 2] | 0) + 8 >> 2] & 255](a);
				a = 1
			} else
				a = 0;
			return a | 0
		}
		function ds(a, b, d) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			db(12868) | 0;
			if ((c[a >> 2] | 0) == 1)
				do
					va(12896, 12868) | 0;
				while ((c[a >> 2] | 0) == 1);
			if (!(c[a >> 2] | 0)) {
				c[a >> 2] = 1;
				Va(12868) | 0;
				sb[d & 255](b);
				db(12868) | 0;
				c[a >> 2] = -1;
				Va(12868) | 0;
				Za(12896) | 0
			} else
				Va(12868) | 0;
			return
		}
		function es() {}

		function fs(a, b, c, d) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			d = b - d - (c >>> 0 > a >>> 0 | 0) >>> 0;
			return (C = d, a - c >>> 0 | 0) | 0
		}
		function gs(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0,
			i = 0;
			f = b + e | 0;
			if ((e | 0) >= 20) {
				d = d & 255;
				h = b & 3;
				i = d | d << 8 | d << 16 | d << 24;
				g = f & ~3;
				if (h) {
					h = b + 4 - h | 0;
					while ((b | 0) < (h | 0)) {
						a[b >> 0] = d;
						b = b + 1 | 0
					}
				}
				while ((b | 0) < (g | 0)) {
					c[b >> 2] = i;
					b = b + 4 | 0
				}
			}
			while ((b | 0) < (f | 0)) {
				a[b >> 0] = d;
				b = b + 1 | 0
			}
			return b - e | 0
		}
		function hs(a, b, c) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			if ((c | 0) < 32) {
				C = b >>> c;
				return a >>> c | (b & (1 << c) - 1) << 32 - c
			}
			C = 0;
			return b >>> c - 32 | 0
		}
		function is(a, b, c, d) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			c = a + c >>> 0;
			return (C = b + d + (c >>> 0 < a >>> 0 | 0) >>> 0, c | 0) | 0
		}
		function js(b, d, e) {
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0;
			if ((e | 0) >= 4096)
				return Ma(b | 0, d | 0, e | 0) | 0;
			f = b | 0;
			if ((b & 3) == (d & 3)) {
				while (b & 3) {
					if (!e)
						return f | 0;
					a[b >> 0] = a[d >> 0] | 0;
					b = b + 1 | 0;
					d = d + 1 | 0;
					e = e - 1 | 0
				}
				while ((e | 0) >= 4) {
					c[b >> 2] = c[d >> 2];
					b = b + 4 | 0;
					d = d + 4 | 0;
					e = e - 4 | 0
				}
			}
			while ((e | 0) > 0) {
				a[b >> 0] = a[d >> 0] | 0;
				b = b + 1 | 0;
				d = d + 1 | 0;
				e = e - 1 | 0
			}
			return f | 0
		}
		function ks(a, b, c) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			if ((c | 0) < 32) {
				C = b << c | (a & (1 << c) - 1 << 32 - c) >>> 32 - c;
				return a << c
			}
			C = a << c - 32;
			return 0
		}
		function ls(b, c, d) {
			b = b | 0;
			c = c | 0;
			d = d | 0;
			var e = 0;
			if ((c | 0) < (b | 0) & (b | 0) < (c + d | 0)) {
				e = b;
				c = c + d | 0;
				b = b + d | 0;
				while ((d | 0) > 0) {
					b = b - 1 | 0;
					c = c - 1 | 0;
					d = d - 1 | 0;
					a[b >> 0] = a[c >> 0] | 0
				}
				b = e
			} else
				js(b, c, d) | 0;
			return b | 0
		}
		function ms(a, b, c) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			if ((c | 0) < 32) {
				C = b >> c;
				return a >>> c | (b & (1 << c) - 1) << 32 - c
			}
			C = (b | 0) < 0 ? -1 : 0;
			return b >> c - 32 | 0
		}
		function ns(b) {
			b = b | 0;
			var c = 0;
			c = a[m + (b & 255) >> 0] | 0;
			if ((c | 0) < 8)
				return c | 0;
			c = a[m + (b >> 8 & 255) >> 0] | 0;
			if ((c | 0) < 8)
				return c + 8 | 0;
			c = a[m + (b >> 16 & 255) >> 0] | 0;
			if ((c | 0) < 8)
				return c + 16 | 0;
			return (a[m + (b >>> 24) >> 0] | 0) + 24 | 0
		}
		function os(a, b) {
			a = a | 0;
			b = b | 0;
			var c = 0,
			d = 0,
			e = 0,
			f = 0;
			f = a & 65535;
			e = b & 65535;
			c = _(e, f) | 0;
			d = a >>> 16;
			a = (c >>> 16) + (_(e, d) | 0) | 0;
			e = b >>> 16;
			b = _(e, f) | 0;
			return (C = (a >>> 16) + (_(e, d) | 0) + (((a & 65535) + b | 0) >>> 16) | 0, a + b << 16 | c & 65535 | 0) | 0
		}
		function ps(a, b, c, d) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			var e = 0,
			f = 0,
			g = 0,
			h = 0,
			i = 0,
			j = 0;
			j = b >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
			i = ((b | 0) < 0 ? -1 : 0) >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
			f = d >> 31 | ((d | 0) < 0 ? -1 : 0) << 1;
			e = ((d | 0) < 0 ? -1 : 0) >> 31 | ((d | 0) < 0 ? -1 : 0) << 1;
			h = fs(j^a, i^b, j, i) | 0;
			g = C;
			a = f^j;
			b = e^i;
			return fs((us(h, g, fs(f^c, e^d, f, e) | 0, C, 0) | 0)^a, C^b, a, b) | 0
		}
		function qs(a, b, d, e) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0,
			h = 0,
			j = 0,
			k = 0,
			l = 0;
			f = i;
			i = i + 16 | 0;
			j = f | 0;
			h = b >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
			g = ((b | 0) < 0 ? -1 : 0) >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
			l = e >> 31 | ((e | 0) < 0 ? -1 : 0) << 1;
			k = ((e | 0) < 0 ? -1 : 0) >> 31 | ((e | 0) < 0 ? -1 : 0) << 1;
			a = fs(h^a, g^b, h, g) | 0;
			b = C;
			us(a, b, fs(l^d, k^e, l, k) | 0, C, j) | 0;
			e = fs(c[j >> 2]^h, c[j + 4 >> 2]^g, h, g) | 0;
			d = C;
			i = f;
			return (C = d, e) | 0
		}
		function rs(a, b, c, d) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			var e = 0,
			f = 0;
			e = a;
			f = c;
			c = os(e, f) | 0;
			a = C;
			return (C = (_(b, f) | 0) + (_(d, e) | 0) + a | a & 0, c | 0 | 0) | 0
		}
		function ss(a, b, c, d) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			return us(a, b, c, d, 0) | 0
		}
		function ts(a, b, d, e) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			var f = 0,
			g = 0;
			g = i;
			i = i + 16 | 0;
			f = g | 0;
			us(a, b, d, e, f) | 0;
			i = g;
			return (C = c[f + 4 >> 2] | 0, c[f >> 2] | 0) | 0
		}
		function us(a, b, d, e, f) {
			a = a | 0;
			b = b | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			var g = 0,
			h = 0,
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0;
			l = a;
			j = b;
			k = j;
			h = d;
			n = e;
			i = n;
			if (!k) {
				g = (f | 0) != 0;
				if (!i) {
					if (g) {
						c[f >> 2] = (l >>> 0) % (h >>> 0);
						c[f + 4 >> 2] = 0
					}
					n = 0;
					f = (l >>> 0) / (h >>> 0) >>> 0;
					return (C = n, f) | 0
				} else {
					if (!g) {
						n = 0;
						f = 0;
						return (C = n, f) | 0
					}
					c[f >> 2] = a | 0;
					c[f + 4 >> 2] = b & 0;
					n = 0;
					f = 0;
					return (C = n, f) | 0
				}
			}
			g = (i | 0) == 0;
			do
				if (h) {
					if (!g) {
						g = (aa(i | 0) | 0) - (aa(k | 0) | 0) | 0;
						if (g >>> 0 <= 31) {
							m = g + 1 | 0;
							i = 31 - g | 0;
							b = g - 31 >> 31;
							h = m;
							a = l >>> (m >>> 0) & b | k << i;
							b = k >>> (m >>> 0) & b;
							g = 0;
							i = l << i;
							break
						}
						if (!f) {
							n = 0;
							f = 0;
							return (C = n, f) | 0
						}
						c[f >> 2] = a | 0;
						c[f + 4 >> 2] = j | b & 0;
						n = 0;
						f = 0;
						return (C = n, f) | 0
					}
					g = h - 1 | 0;
					if (g & h) {
						i = (aa(h | 0) | 0) + 33 - (aa(k | 0) | 0) | 0;
						p = 64 - i | 0;
						m = 32 - i | 0;
						j = m >> 31;
						o = i - 32 | 0;
						b = o >> 31;
						h = i;
						a = m - 1 >> 31 & k >>> (o >>> 0) | (k << m | l >>> (i >>> 0)) & b;
						b = b & k >>> (i >>> 0);
						g = l << p & j;
						i = (k << p | l >>> (o >>> 0)) & j | l << m & i - 33 >> 31;
						break
					}
					if (f) {
						c[f >> 2] = g & l;
						c[f + 4 >> 2] = 0
					}
					if ((h | 0) == 1) {
						o = j | b & 0;
						p = a | 0 | 0;
						return (C = o, p) | 0
					} else {
						p = ns(h | 0) | 0;
						o = k >>> (p >>> 0) | 0;
						p = k << 32 - p | l >>> (p >>> 0) | 0;
						return (C = o, p) | 0
					}
				} else {
					if (g) {
						if (f) {
							c[f >> 2] = (k >>> 0) % (h >>> 0);
							c[f + 4 >> 2] = 0
						}
						o = 0;
						p = (k >>> 0) / (h >>> 0) >>> 0;
						return (C = o, p) | 0
					}
					if (!l) {
						if (f) {
							c[f >> 2] = 0;
							c[f + 4 >> 2] = (k >>> 0) % (i >>> 0)
						}
						o = 0;
						p = (k >>> 0) / (i >>> 0) >>> 0;
						return (C = o, p) | 0
					}
					g = i - 1 | 0;
					if (!(g & i)) {
						if (f) {
							c[f >> 2] = a | 0;
							c[f + 4 >> 2] = g & k | b & 0
						}
						o = 0;
						p = k >>> ((ns(i | 0) | 0) >>> 0);
						return (C = o, p) | 0
					}
					g = (aa(i | 0) | 0) - (aa(k | 0) | 0) | 0;
					if (g >>> 0 <= 30) {
						b = g + 1 | 0;
						i = 31 - g | 0;
						h = b;
						a = k << i | l >>> (b >>> 0);
						b = k >>> (b >>> 0);
						g = 0;
						i = l << i;
						break
					}
					if (!f) {
						o = 0;
						p = 0;
						return (C = o, p) | 0
					}
					c[f >> 2] = a | 0;
					c[f + 4 >> 2] = j | b & 0;
					o = 0;
					p = 0;
					return (C = o, p) | 0
				}
			while (0);
			if (!h) {
				k = i;
				j = 0;
				i = 0
			} else {
				m = d | 0 | 0;
				l = n | e & 0;
				k = is(m | 0, l | 0, -1, -1) | 0;
				d = C;
				j = i;
				i = 0;
				do {
					e = j;
					j = g >>> 31 | j << 1;
					g = i | g << 1;
					e = a << 1 | e >>> 31 | 0;
					n = a >>> 31 | b << 1 | 0;
					fs(k, d, e, n) | 0;
					p = C;
					o = p >> 31 | ((p | 0) < 0 ? -1 : 0) << 1;
					i = o & 1;
					a = fs(e, n, o & m, (((p | 0) < 0 ? -1 : 0) >> 31 | ((p | 0) < 0 ? -1 : 0) << 1) & l) | 0;
					b = C;
					h = h - 1 | 0
				} while ((h | 0) != 0);
				k = j;
				j = 0
			}
			h = 0;
			if (f) {
				c[f >> 2] = a;
				c[f + 4 >> 2] = b
			}
			o = (g | 0) >>> 31 | (k | h) << 1 | (h << 1 | g >>> 31) & 0 | j;
			p = (g << 1 | 0 >>> 31) & -2 | i;
			return (C = o, p) | 0
		}
		function vs(a, b, c, d, e, f, g, h) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			return ob[a & 7](b | 0, c | 0, d | 0, e | 0, f | 0, g | 0, h | 0) | 0
		}
		function ws(a, b, c, d) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			return pb[a & 31](b | 0, c | 0, d | 0) | 0
		}
		function xs(a, b, c, d, e, f) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			qb[a & 3](b | 0, c | 0, d | 0, e | 0, f | 0)
		}
		function ys(a, b, c, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = +g;
			return rb[a & 3](b | 0, c | 0, d | 0, e | 0, f | 0, +g) | 0
		}
		function zs(a, b) {
			a = a | 0;
			b = b | 0;
			sb[a & 255](b | 0)
		}
		function As(a, b, c) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			tb[a & 127](b | 0, c | 0)
		}
		function Bs(a, b, c, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			return ub[a & 63](b | 0, c | 0, d | 0, e | 0, f | 0, g | 0) | 0
		}
		function Cs(a, b, c, d, e, f) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			f = +f;
			return vb[a & 7](b | 0, c | 0, d | 0, e | 0, +f) | 0
		}
		function Ds(a, b) {
			a = a | 0;
			b = b | 0;
			return wb[a & 127](b | 0) | 0
		}
		function Es(a, b, c, d) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			xb[a & 0](b | 0, c | 0, d | 0)
		}
		function Fs(a) {
			a = a | 0;
			yb[a & 3]()
		}
		function Gs(a, b, c, d, e, f, g, h, i) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			i = i | 0;
			return zb[a & 15](b | 0, c | 0, d | 0, e | 0, f | 0, g | 0, h | 0, i | 0) | 0
		}
		function Hs(a, b, c, d, e) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			return Ab[a & 7](b | 0, c | 0, d | 0, e | 0) | 0
		}
		function Is(a, b, c, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			Bb[a & 7](b | 0, c | 0, d | 0, e | 0, f | 0, g | 0)
		}
		function Js(a, b, c) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			return Cb[a & 15](b | 0, c | 0) | 0
		}
		function Ks(a, b, c, d, e, f) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			return Db[a & 31](b | 0, c | 0, d | 0, e | 0, f | 0) | 0
		}
		function Ls(a, b, c, d, e) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			Eb[a & 7](b | 0, c | 0, d | 0, e | 0)
		}
		function Ms(a, b, c, d, e, f, g) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			ba(0);
			return 0
		}
		function Ns(a, b, c) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			ba(1);
			return 0
		}
		function Os(a, b, c, d, e) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			ba(2)
		}
		function Ps(a, b, c, d, e, f) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			f = +f;
			ba(3);
			return 0
		}
		function Qs(a) {
			a = a | 0;
			ba(4)
		}
		function Rs(a, b) {
			a = a | 0;
			b = b | 0;
			ba(5)
		}
		function Ss(a, b, c, d, e, f) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			ba(6);
			return 0
		}
		function Ts(a, b, c, d, e) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = +e;
			ba(7);
			return 0
		}
		function Us(a) {
			a = a | 0;
			ba(8);
			return 0
		}
		function Vs(a, b, c) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			ba(9)
		}
		function Ws() {
			ba(10)
		}
		function Xs(a, b, c, d, e, f, g, h) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			g = g | 0;
			h = h | 0;
			ba(11);
			return 0
		}
		function Ys(a, b, c, d) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			ba(12);
			return 0
		}
		function Zs(a, b, c, d, e, f) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			f = f | 0;
			ba(13)
		}
		function _s(a, b) {
			a = a | 0;
			b = b | 0;
			ba(14);
			return 0
		}
		function $s(a, b, c, d, e) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			e = e | 0;
			ba(15);
			return 0
		}
		function at(a, b, c, d) {
			a = a | 0;
			b = b | 0;
			c = c | 0;
			d = d | 0;
			ba(16)
		}

		// EMSCRIPTEN_END_FUNCS
		var ob = [Ms, Um, Ym, Tn, Wn, $n, bo, Ms];
		var pb = [Ns, Zj, ck, gk, xh, bj, Hk, Mk, so, xo, fp, hp, kp, Ro, Wo, Yo, $o, _i, Ns, Ns, Ns, Ns, Ns, Ns, Ns, Ns, Ns, Ns, Ns, Ns, Ns, Ns];
		var qb = [Os, Jh, Ih, Fh];
		var rb = [Ps, go, mo, Ps];
		var sb = [Qs, pd, Ye, $e, af, Se, Ve, We, Me, Pe, Qe, Ge, Je, Ke, ze, Ce, De, se, ve, we, le, oe, pe, fe, ie, je, $d, ce, de, Vd, Yd, Zd, Pd, Sd, Td, Jd, Md, Nd, Dd, Gd, Hd, wd, zd, Ad, qd, td, ud, Gf, Hf, If, Jf, Kf, Lf, ik, kk, jk, lk, zf, Af, vk, yk, wk, zk, xk, Ak, nk, pk, ok, qk, Fg, Gg, Jg, Kg, lh, mh, rh, uh, sh, th, vh, wh, Vj, Wj, Rj, Bk, Ck, Ek, Oo, Ik, Jk, Nk, Ok, al, bl, ul, vl, Jl, Kl, Wl, Xl, tm, um, Rm, Tm, Wm, Xm, _m, $m, kn, ln, vn, wn, Gn, Hn, Rn, Sn, Zn, _n, eo, fo, ko, lo, qo, ro, vo, wo, Do, Eo, cp, dp, xq, up, Wp, Xp, Yp, Zp, Dk, No, Qo, mp, Cp, Kp, Sp, Tp, Un, Po, Gr, gj, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs, Qs];
		var tb = [Rs, _e, bf, Ue, Xe, Oe, Re, Ie, Le, Be, Ee, ue, xe, ne, qe, he, ke, be, ee, Xd, _d, Rd, Ud, Ld, Od, Fd, Id, yd, Bd, sd, vd, Yj, Ig, cn, dn, en, fn, hn, jn, on, pn, qn, rn, tn, un, zn, An, Bn, Cn, En, Fn, Kn, Ln, Mn, Nn, Pn, Qn, uo, zo, cq, eq, gq, dq, fq, hq, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs];
		var ub = [Ss, Pk, Qk, Rk, Sk, Tk, Uk, Vk, Wk, Xk, Yk, Zk, cl, dl, el, fl, gl, hl, il, jl, kl, ll, ml, Bl, Dl, Ol, Ql, Zl, _l, $l, bm, dm, wm, xm, ym, Am, Cm, jo, po, Ss, Ss, Ss, Ss, Ss, Ss, Ss, Ss, Ss, Ss, Ss, Ss, Ss, Ss, Ss, Ss, Ss, Ss, Ss, Ss, Ss, Ss, Ss, Ss, Ss];
		var vb = [Ts, El, Hl, Rl, Tl, Ts, Ts, Ts];
		var wb = [Us, Ze, Te, Ne, He, Ae, te, me, ge, ae, Wd, Qd, Kd, Ed, xd, rd, ak, bk, Df, ek, Hg, nh, dk, Yl, jq, lq, nq, tq, vq, pq, rq, vm, kq, mq, oq, uq, wq, qq, sq, an, bn, gn, mn, nn, sn, xn, yn, Dn, In, Jn, On, yp, zp, Bp, _p, aq, $p, bq, qp, rp, tp, Gp, Hp, Jp, Op, Pp, Rp, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us];
		var xb = [Vs];
		var yb = [Ws, Of, Pf, Qf];
		var zb = [Xs, fm, Em, vp, wp, np, op, Dp, Ep, Lp, Mp, Xs, Xs, Xs, Xs, Xs];
		var Ab = [Ys, jp, So, To, Uo, _o, Ys, Ys];
		var Bb = [Zs, Bf, Mh, Lh, Kh, _j, to, yo];
		var Cb = [_s, Ef, Ff, Lg, fk, hk, ep, gp, ip, Vo, Xo, Zo, _s, _s, _s, _s];
		var Db = [$s, Fk, Kk, wl, xl, Cl, Il, Ll, Ml, Pl, Ul, lp, xp, Ap, ap, pp, sp, Fp, Ip, Np, Qp, $s, $s, $s, $s, $s, $s, $s, $s, $s, $s, $s];
		var Eb = [at, Cf, zh, Ah, Ch, $j, Gk, Lk];
		return {
			_519fb875 : Mg,
			_72a8556b : Rf,
			_69250d12 : Zf,
			_3a30dbee : qf,
			_3bdb05b9 : Wf,
			_2ff12cc0 : Ec,
			_16d1de1b : hs,
			_32d0e50a : Qg,
			_73bcdcf0 : Yf,
			_409ea582 : ks,
			_635d5fa6 : ag,
			_763bfaab : Tf,
			_62c81d47 : gs,
			_662e892e : Og,
			_30766555 : Pg,
			_66e232c9 : js,
			_3f8b740d : Ng,
			_35b4f71d : Ic,
			_16da5007 : fs,
			_123698b5 : is,
			_65ec1277 : Rg,
			_321a3f8a : $f,
			_14710372 : Jc,
			_31b1d559 : Xf,
			_4289a65f : gj,
			_23d47861 : Uf,
			_35425847 : ls,
			_53aace95 : Nc,
			_dd408a : fj,
			_61628403 : bg,
			_2bcdb3ea : _f,
			_55c1404a : Vf,
			_5bbcdbcb : Sf,
			_15d0120b : sf,
			_545efb8b : cg,
			_1d9b6630 : hg,
			_31d07795 : Bg,
			_4f8515c2 : Yg,
			runPostSets : es,
			stackAlloc : Fb,
			stackSave : Gb,
			stackRestore : Hb,
			establishStackSpace : Ib,
			setThrew : Jb,
			setTempRet0 : Mb,
			getTempRet0 : Nb,
			dynCall_iiiiiiii : vs,
			dynCall_iiii : ws,
			dynCall_viiiii : xs,
			dynCall_iiiiiid : ys,
			dynCall_vi : zs,
			dynCall_vii : As,
			dynCall_iiiiiii : Bs,
			dynCall_iiiiid : Cs,
			dynCall_ii : Ds,
			dynCall_viii : Es,
			dynCall_v : Fs,
			dynCall_iiiiiiiii : Gs,
			dynCall_iiiii : Hs,
			dynCall_viiiiii : Is,
			dynCall_iii : Js,
			dynCall_iiiiii : Ks,
			dynCall_viiii : Ls
		}
	})

	// EMSCRIPTEN_END_ASM
	(c.Ia, c.Ja, x),
	Db = c._519fb875 = f._519fb875;
	c._72a8556b = f._72a8556b;
	var vb =
		c._69250d12 = f._69250d12,
	Cb = c._3a30dbee = f._3a30dbee,
	Qb = c._545efb8b = f._545efb8b,
	xb = c._3bdb05b9 = f._3bdb05b9,
	la = c._2ff12cc0 = f._2ff12cc0,
	bc = c._16d1de1b = f._16d1de1b,
	Tb = c._4f8515c2 = f._4f8515c2,
	Hb = c._32d0e50a = f._32d0e50a,
	zb = c._73bcdcf0 = f._73bcdcf0,
	hc = c._409ea582 = f._409ea582,
	Rb = c._1d9b6630 = f._1d9b6630,
	jb = c._635d5fa6 = f._635d5fa6,
	sb = c._763bfaab = f._763bfaab,
	Sb = c._31d07795 = f._31d07795,
	Xb = c._62c81d47 = f._62c81d47,
	Fb = c._662e892e = f._662e892e,
	Gb = c._30766555 = f._30766555,
	ec = c._66e232c9 = f._66e232c9,
	Pb = c._15d0120b = f._15d0120b,
	Eb = c._3f8b740d = f._3f8b740d,
	ib = c._35b4f71d = f._35b4f71d,
	Ub = c._16da5007 = f._16da5007,
	dc = c._123698b5 = f._123698b5,
	Ib = c._65ec1277 = f._65ec1277,
	Bb = c._321a3f8a = f._321a3f8a;
	c.runPostSets = f.runPostSets;
	var Kb = c._14710372 = f._14710372,
	yb = c._31b1d559 = f._31b1d559,
	y = c._4289a65f = f._4289a65f,
	ub = c._23d47861 = f._23d47861,
	ic = c._35425847 = f._35425847,
	Ab = c._53aace95 = f._53aace95,
	z = c._dd408a = f._dd408a,
	Jb = c._61628403 = f._61628403,
	tb = c._2bcdb3ea = f._2bcdb3ea,
	wb = c._55c1404a = f._55c1404a,
	rb = c._5bbcdbcb = f._5bbcdbcb;
	c.dynCall_iiiiiiii =
		f.dynCall_iiiiiiii;
	c.dynCall_iiii = f.dynCall_iiii;
	c.dynCall_viiiii = f.dynCall_viiiii;
	c.dynCall_iiiiiid = f.dynCall_iiiiiid;
	c.dynCall_vi = f.dynCall_vi;
	c.dynCall_vii = f.dynCall_vii;
	c.dynCall_iiiiiii = f.dynCall_iiiiiii;
	c.dynCall_iiiiid = f.dynCall_iiiiid;
	c.dynCall_ii = f.dynCall_ii;
	c.dynCall_viii = f.dynCall_viii;
	c.dynCall_v = f.dynCall_v;
	c.dynCall_iiiiiiiii = f.dynCall_iiiiiiiii;
	c.dynCall_iiiii = f.dynCall_iiiii;
	c.dynCall_viiiiii = f.dynCall_viiiiii;
	c.dynCall_iii = f.dynCall_iii;
	c.dynCall_iiiiii = f.dynCall_iiiiii;
	c.dynCall_viiii =
		f.dynCall_viiii;
	k.ba = f.stackAlloc;
	k.pa = f.stackSave;
	k.da = f.stackRestore;
	k.Bb = f.establishStackSpace;
	k.eb = f.setTempRet0;
	k.Qa = f.getTempRet0;
	S.prototype = Error();
	S.prototype.constructor = S;
	var pb,
	Va = null,
	U = function b() {
		c.calledRun || wa();
		c.calledRun || (U = b)
	};
	c.callMain = c.ub = function (b) {
		function d() {
			for (var b = 0; 3 > b; b++)
				f.push(0)
		}
		u(0 == H, "cannot call main when async dependencies remain! (listen on _249a860b)");
		u(0 == ua.length, "cannot call main when preRun functions remain to be called");
		b = b || [];
		Z || (Z = !0, R(ja));
		var e = b.length + 1,
		f = [E(T(c.thisProgram), "i8", 0)];
		d();
		for (var h = 0; h < e - 1; h += 1)
			f.push(E(T(b[h]), "i8", 0)), d();
		f.push(0);
		f = E(f, "i32", 0);
		try {
			var l = c._72a8556b(e, f, 0);
			Wa(l, !0)
		} catch (k) {
			if (!(k instanceof S))
				if ("SimulateInfiniteLoop" == k)
					c.noExitRuntime = !0;
				else
					throw k && "object" === typeof k && k.stack && c.P("exception thrown: " + [k, k.stack]), k;
		}
		finally {}

	};
	c.run = c.run = wa;
	c.exit = c.exit = Wa;
	var Ya = [];
	c.abort = c.abort = K;
	if (c.preInit)
		for ("function" == typeof c.preInit && (c.preInit = [c.preInit]); 0 < c.preInit.length; )
			c.preInit.pop()();
	var Ua = !0;
	c.noInitialRun && (Ua = !1);
	c.noExitRuntime = !0;
	wa()
})(window);

212
