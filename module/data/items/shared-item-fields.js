export function sharedItemFields(fields) {
  return {
    description: new fields.HTMLField({ initial: "" }),
  };
}
