import { sharedItemFields } from "./shared-item-fields.js";

export class ClassData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      ...sharedItemFields(fields),
      source:          new fields.StringField({ initial: "" }),
      author:          new fields.StringField({ initial: "" }),
      link:            new fields.StringField({ initial: "" }),
      trauma_response: new fields.StringField({ initial: "" }),
      robotic:         new fields.BooleanField({ initial: true }),
      common_skills:   new fields.ArrayField(new fields.StringField()),

      base_adjustment: new fields.SchemaField({
        strength:       new fields.NumberField({ initial: 0 }),
        speed:          new fields.NumberField({ initial: 0 }),
        intellect:      new fields.NumberField({ initial: 0 }),
        combat:         new fields.NumberField({ initial: 0 }),
        sanity:         new fields.NumberField({ initial: 0 }),
        fear:           new fields.NumberField({ initial: 0 }),
        body:           new fields.NumberField({ initial: 0 }),
        max_wounds:     new fields.NumberField({ initial: 0 }),
        skills_granted: new fields.ArrayField(new fields.StringField()),
      }),

      selected_adjustment: new fields.SchemaField({
        choose_stat: new fields.ArrayField(new fields.StringField()),
        choose_skill_and: new fields.SchemaField({
          trained:          new fields.NumberField({ initial: 0 }),
          expert:           new fields.NumberField({ initial: 0 }),
          expert_full_set:  new fields.NumberField({ initial: 0 }),
          master:           new fields.NumberField({ initial: 0 }),
          master_full_set:  new fields.NumberField({ initial: 0 }),
        }),
        choose_skill_or: new fields.ArrayField(new fields.StringField()),
      }),

      roll_tables: new fields.SchemaField({
        loadout: new fields.StringField({ initial: "" }),
        trinket: new fields.StringField({ initial: "" }),
        patch:   new fields.StringField({ initial: "" }),
      }),
    };
  }
}
