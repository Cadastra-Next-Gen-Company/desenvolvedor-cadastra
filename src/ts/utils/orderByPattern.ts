export function orderByPattern(arr: string[], patternArray?: string[]): string[] {
  const patternObjects: string[] = [];
  const numberObjects: string[] = [];
  for (const item of arr) {
    if (isNaN(parseInt(item))) {
      patternObjects.push(item);
    } else {
      numberObjects.push(item);
    }
  }

  const order: string[] = patternArray ? patternArray : ['pp', 'p', 'm', 'g', 'gg', 'u', 'xg', 'exg'];
  const patternObjectsOrdered: string[] = patternObjects.sort((a, b) => {
    return order.indexOf(a.toLowerCase()) - order.indexOf(b.toLowerCase());
  });

  const numberObjectsOrdered: string[] = numberObjects.sort((a, b) => parseInt(a) - parseInt(b));

  return patternObjectsOrdered.concat(numberObjectsOrdered);
}