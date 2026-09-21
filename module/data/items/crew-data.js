import { sharedItemFields } from "./shared-item-fields.js";

export class CrewData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      ...sharedItemFields(fields),
      text: new fields.StringField({ initial: "" }),
      job:  new fields.StringField({ initial: "" }),
    };
  }
}
