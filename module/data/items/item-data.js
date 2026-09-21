import { sharedItemFields } from "./shared-item-fields.js";

export class ItemData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      ...sharedItemFields(fields),
      quantity: new fields.NumberField({ initial: 1 }),
      weight:   new fields.NumberField({ initial: 0 }),
      cost:     new fields.NumberField({ initial: 0 }),
    };
  }
}
