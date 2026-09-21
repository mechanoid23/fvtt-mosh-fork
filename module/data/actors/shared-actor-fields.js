export function sharedActorFields(fields) {
  return {
    health: new fields.SchemaField({
      value: new fields.NumberField({ initial: 10 }),
      min:   new fields.NumberField({ initial: 0 }),
      max:   new fields.NumberField({ initial: 10 }),
      label: new fields.StringField({ initial: "Health" }),
    }),
    hits: new fields.SchemaField({
      value: new fields.NumberField({ initial: 0 }),
      min:   new fields.NumberField({ initial: 0 }),
      max:   new fields.NumberField({ initial: 2 }),
      label: new fields.StringField({ initial: "Wounds" }),
    }),
    netHP: new fields.SchemaField({
      value: new fields.NumberField({ initial: 20 }),
      min:   new fields.NumberField({ initial: 0 }),
      max:   new fields.NumberField({ initial: 20 }),
      label: new fields.StringField({ initial: "Net HP" }),
    }),
    bleeding: new fields.SchemaField({
      value: new fields.NumberField({ initial: 0 }),
      min:   new fields.NumberField({ initial: 0 }),
      label: new fields.StringField({ initial: "Bleeding" }),
    }),
  };
}
