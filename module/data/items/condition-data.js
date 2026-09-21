import { sharedItemFields } from "./shared-item-fields.js";

export class ConditionData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      ...sharedItemFields(fields),
      severity: new fields.NumberField({ initial: 1 }),
      treatment: new fields.SchemaField({
        value: new fields.NumberField({ initial: 0 }),
        html:  new fields.StringField({ initial: "" }),
      }),
    };
  }
}
