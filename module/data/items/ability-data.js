import { sharedItemFields } from "./shared-item-fields.js";

export class AbilityData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      ...sharedItemFields(fields),
      text:    new fields.StringField({ initial: "An Ability" }),
      roll:    new fields.StringField({ initial: "" }),
      psionic: new fields.BooleanField({ initial: false }),
      level:   new fields.NumberField({ initial: 1, min: 1, max: 3 }),
      level_1: new fields.HTMLField({ initial: "" }),
      level_2: new fields.HTMLField({ initial: "" }),
      level_3: new fields.HTMLField({ initial: "" }),
    };
  }
}
