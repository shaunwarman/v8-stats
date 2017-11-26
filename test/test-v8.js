const {Writable} = require('stream');

const Test = require('tape');
const V8 = require('..');

Test('v8', t => {
  let v8 = null;

  t.test('instantiate', t => {
    v8 = new V8();

    t.equals(typeof v8, 'object');
    t.end();
  });

  t.test('single read', t => {
    const stats = v8.read();
    const [
      new_space,
      old_space,
      code_space,
      map_space,
      large_object_space
    ] = stats;

    t.ok(Array.isArray(stats));
    t.equals(typeof new_space, 'object');
    t.equals(typeof old_space, 'object');
    t.equals(typeof code_space, 'object');
    t.equals(typeof map_space, 'object');
    t.equals(typeof large_object_space, 'object');
    t.end();
  });

  t.test('data listener', t => {
    v8.once('data', stats => {
      const [
        new_space,
        old_space,
        code_space,
        map_space,
        large_object_space
      ] = stats;

      t.ok(Array.isArray(stats));
      t.equals(typeof new_space, 'object');
      t.equals(typeof old_space, 'object');
      t.equals(typeof code_space, 'object');
      t.equals(typeof map_space, 'object');
      t.equals(typeof large_object_space, 'object');

      v8.destroy();
      t.end();
    });
  });

  t.test('pipe', t => {
    const write = new Writable();
    write.on('pipe', src => {
      t.ok(src instanceof V8);
      t.end();
    });

    v8.pipe(write);
  });

});
