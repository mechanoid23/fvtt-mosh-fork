import { sharedItemFields } from "./shared-item-fields.js";

export class ModuleData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      ...sharedItemFields(fields),
      quantity:   new fields.NumberField({ initial: 1 }),
      hull:       new fields.NumberField({ initial: 1 }),
      totalHull:  new fields.NumberField({ initial: 1 }),
      feature:    new fields.StringField({ initial: "" }),
      offline:    new fields.BooleanField({ initial: false }),
    };
  }
}
