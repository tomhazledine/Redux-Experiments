import { counter } from './index.js';

test('Counter', () => {
    expect(counter(0, { type: 'INCREMENT' })).toEqual(1);

    expect(counter(1, { type: 'INCREMENT' })).toEqual(2);

    expect(counter(2, { type: 'DECREMENT' })).toEqual(1);

    expect(counter(1, { type: 'SOMETHING' })).toEqual(1);

    expect(counter(undefined, {})).toEqual(0);
});
