import { sharedItemFields } from "./shared-item-fields.js";

export class SkillData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      ...sharedItemFields(fields),
      rank:             new fields.StringField({ initial: "Trained" }),
      bonus:            new fields.NumberField({ initial: 10 }),
      prerequisite_ids: new fields.ArrayField(new fields.StringField()),
    };
  }
}
