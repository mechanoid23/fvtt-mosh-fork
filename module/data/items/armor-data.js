import { sharedItemFields } from "./shared-item-fields.js";

export class ArmorData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      ...sharedItemFields(fields),
      armorPoints:     new fields.NumberField({ initial: 1 }),
      damageReduction: new fields.NumberField({ initial: 0 }),
      speed:           new fields.StringField({ initial: "" }),
      oxygenMax:       new fields.NumberField({ initial: 0 }),
      oxygenCurrent:   new fields.NumberField({ initial: 0 }),
      weight:          new fields.NumberField({ initial: 0 }),
      cost:            new fields.NumberField({ initial: 0 }),
    };
  }
}
