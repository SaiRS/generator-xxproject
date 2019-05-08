import { mergeConfigValue } from '../merge-config';

describe('完全不同类型的两个元素', () => {
	it('null, a ==> a', () => {
		expect(mergeConfigValue(null, 'a')).toBe('a');
	});

	it('null, 2 ==> 2', () => {
		expect(mergeConfigValue(null, 2)).toBe(2);
	});

	it('null, true ==> true', () => {
		expect(mergeConfigValue(null, true)).toBe(true);
	});

	it('null, {a: 1} ==> {a: 1}', () => {
		expect(mergeConfigValue(null, { a: 1 })).toEqual({ a: 1 });
	});

	it('null, [1, 2, 3] ==> [1, 2, 3]', () => {
		expect(mergeConfigValue(null, [1, 2, 3])).toEqual([1, 2, 3]);
	});

	it('null, undefined ==> undefined', () => {
		expect(mergeConfigValue(null, undefined)).toBe(undefined);
	});

	it('null, a ==> a', () => {
		expect(mergeConfigValue(null, 'a')).toBe('a');
	});

	it('null, 2 ==> 2', () => {
		expect(mergeConfigValue(null, 2)).toBe(2);
	});

	it('null, true ==> true', () => {
		expect(mergeConfigValue(null, true)).toBe(true);
	});

	it('null, {a: 1} ==> {a: 1}', () => {
		expect(mergeConfigValue(null, { a: 1 })).toEqual({ a: 1 });
	});

	it('null, [1, 2, 3] ==> [1, 2, 3]', () => {
		expect(mergeConfigValue(null, [1, 2, 3])).toEqual([1, 2, 3]);
	});

	it('2, undefined ==> 2', () => {
		expect(mergeConfigValue(2, undefined)).toBe(2);
	});

	it('2, "3" ==> "3"', () => {
		expect(mergeConfigValue(2, '3')).toBe('3');
	});

	it('2, true ==> true', () => {
		expect(mergeConfigValue(2, true)).toBe(true);
	});

	it('2, [1, 3] ==> [1, 3]', () => {
		expect(mergeConfigValue(2, [1, 3])).toEqual([1, 3]);
	});

	it('2, {a: "a"} ==> {a: "a"}', () => {
		expect(mergeConfigValue(2, { a: 'a' })).toEqual({ a: 'a' });
	});

	it('[1, 2], {a: "a"} ==> {a: "a"}', () => {
		expect(mergeConfigValue([1, 2], { a: 'a' })).toEqual({ a: 'a' });
	});

	it('{a: "a"}, [1, 2] ==> [1, 2]', () => {
		expect(mergeConfigValue({ a: 'a' }, [1, 2])).toEqual([1, 2]);
	});
});

describe('相同的两个类型', () => {
	it('1, 2 ==> 2', () => {
		expect(mergeConfigValue(1, 2)).toBe(2);
	});

	it('"hello", "world" ===> ["hello","world"]', () => {
		expect(mergeConfigValue('hello', 'world')).toEqual(['hello', 'world']);
	});

	it('[1, 2], [3, 4] ==> [1, 2, 3, 4]', () => {
		expect(mergeConfigValue([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
	});

	it('[1, 2], [2, 4] ==> [1, 2, 4]', () => {
		expect(mergeConfigValue([1, 2], [2, 4])).toEqual([1, 2, 4]);
	});

	it('{a: 1, b: 3}, {a: 2} ===> {a:2, b:3}', () => {
		expect(mergeConfigValue({ a: 1, b: 3 }, { a: 2 })).toEqual({ a: 2, b: 3 });
	});

	it('{a: 1, b: {c: 3}}, {a: 2, b: {d: 4}} ===> {a:2, b:{c: 3, d: 4}}', () => {
		expect(
			mergeConfigValue({ a: 1, b: { c: 3 } }, { a: 2, b: { d: 4 } })
		).toEqual({ a: 2, b: { c: 3, d: 4 } });
	});
});
