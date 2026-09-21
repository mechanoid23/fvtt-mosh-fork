import { sharedItemFields } from "./shared-item-fields.js";

export class AbilityData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      ...sharedItemFields(fields),
      text: new fields.StringField({ initial: "An Ability" }),
      roll: new fields.StringField({ initial: "" }),
    };
  }
}
