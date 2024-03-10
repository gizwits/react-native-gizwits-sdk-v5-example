export function isset(prop: any) {
  return typeof prop !== 'undefined';
}

export function merge(target: any, source: any) {
  Object.keys(source).forEach(key => {
    if (Object.prototype.toString.call(source).slice(8, -1) === 'Object') {
      target[key] = merge(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  });
  return target;
}
