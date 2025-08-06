export class ObjectFlattener {
  /**
   * Flatten deeply nested objects and arrays into dot-notation key-value pairs.
   *
   * @param obj The object to flatten
   * @param parentKey Used internally for recursion
   * @param result Used internally for recursion
   * @returns A flat object with dot-notated keys
   */
  static flatten(
    obj: any,
    parentKey = '',
    result: Record<string, any> = {},
  ): Record<string, any> {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          const arrayKey = `${newKey}.${index}`;
          if (item && typeof item === 'object') {
            this.flatten(item, arrayKey, acc);
          } else {
            acc[arrayKey] = item;
          }
        });
      } else if (
        value &&
        typeof value === 'object' &&
        !(value instanceof Date)
      ) {
        this.flatten(value, newKey, acc);
      } else {
        acc[newKey] = value;
      }

      return acc;
    }, result);
  }
}
