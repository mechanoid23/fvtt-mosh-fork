import { sharedItemFields } from "./shared-item-fields.js";

export class RepairData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      ...sharedItemFields(fields),
      quantity: new fields.NumberField({ initial: 1 }),
      major:    new fields.BooleanField({ initial: false }),
    };
  }
}
