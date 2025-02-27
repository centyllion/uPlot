export function debounce(fn, time) {
	let pending = null;

	function run() {
		pending = null;
		fn();
	}

	return function() {
		clearTimeout(pending);
		pending = setTimeout(run, time);
	}
}

// binary search for index of closest value
export function closestIdx(num, arr, lo, hi) {
	let mid;
	lo = lo || 0;
	hi = hi || arr.length - 1;
	let bitwise = hi <= 2147483647;

	while (hi - lo > 1) {
		mid = bitwise ? (lo + hi) >> 1 : floor((lo + hi) / 2);

		if (arr[mid] < num)
			lo = mid;
		else
			hi = mid;
	}

	if (num - arr[lo] <= arr[hi] - num)
		return lo;

	return hi;
}

export function getMinMax(data, _i0, _i1) {
//	console.log("getMinMax()");

	let _min = inf;
	let _max = -inf;

	for (let i = _i0; i <= _i1; i++) {
		if (data[i] != null) {
			_min = min(_min, data[i]);
			_max = max(_max, data[i]);
		}
	}

	return [_min, _max];
}

// this ensures that non-temporal/numeric y-axes get multiple-snapped padding added above/below
// TODO: also account for incrs when snapping to ensure top of axis gets a tick & value
export function rangeNum(min, max, mult, extra) {
	// auto-scale Y
	const delta = max - min;
	const mag = log10(delta || abs(max) || 1);
	const exp = floor(mag);
	const incr = pow(10, exp) * mult;
	const buf = delta == 0 ? incr : 0;

	let snappedMin = round6(incrRoundDn(min - buf, incr));
	let snappedMax = round6(incrRoundUp(max + buf, incr));

	if (extra) {
		// for flat data, always use 0 as one chart extreme
		if (delta == 0) {
			if (max > 0)
				snappedMin = 0;
			else if (max < 0)
				snappedMax = 0;
		}
		else {
			// if buffer is too small, increase it
			if (snappedMax - max < incr)
				snappedMax += incr;

			if (min - snappedMin < incr)
				snappedMin -= incr;

			// if original data never crosses 0, use 0 as one chart extreme
			if (min >= 0 && snappedMin < 0)
				snappedMin = 0;

			if (max <= 0 && snappedMax > 0)
				snappedMax = 0;
		}
	}

	return [snappedMin, snappedMax];
}

const M = Math;

export const abs = M.abs;
export const floor = M.floor;
export const round = M.round;
export const ceil = M.ceil;
export const min = M.min;
export const max = M.max;
export const pow = M.pow;
export const log10 = M.log10;

export const inf = Infinity;

/*
export function incrRound() {
	return round(num/incr)*incr;
}
*/

export function clamp(num, _min, _max) {
	return min(max(num, _min), _max);
}

export function fnOrSelf(v) {
	return typeof v == "function" ? v : () => v;
}

export function retArg2(a, b) {
	return b;
}

export function incrRoundUp(num, incr) {
	return ceil(num/incr)*incr;
}

export function incrRoundDn(num, incr) {
	return floor(num/incr)*incr;
}

export function round2(val) {
	return round(val * 1e2) / 1e2;
}

export function round3(val) {
	return round(val * 1e3) / 1e3;
}

export function round6(val) {
	return round(val * 1e6) / 1e6;
}

export const assign = Object.assign;

export const isArr = Array.isArray;

export function isStr(v) {
	return typeof v === 'string';
}

function isObj(v) {
	return typeof v === 'object' && v !== null;
}

export function copy(o) {
	let out;

	if (isArr(o))
		out = o.map(copy);
	else if (isObj(o)) {
		out = {};
		for (var k in o)
			out[k] = copy(o[k]);
	}
	else
		out = o;

	return out;
}

/*
function isObj(v) {
	return typeof v === 'object' && v !== null;
}

// https://stackoverflow.com/a/34624648
function copy(o) {
	var _out, v, _key;
	_out = Array.isArray(o) ? [] : {};
	for (_key in o) {
		v = o[_key];
		_out[_key] = isObj(v) ? copy(v) : v;
	}
	return _out;
}

// https://github.com/jaredreich/tread
function merge(oldObject, newObject) {
	var obj = oldObject
	for (var key in newObject) {
		if (isObj(obj[key]))
			merge(obj[key], newObject[key]);
		else
			obj[key] = newObject[key];
	}
	return obj;
}
*/