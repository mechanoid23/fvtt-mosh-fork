import { sharedActorFields } from "./shared-actor-fields.js";

export class CharacterData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    const statField = (label, rollLabel, extra = {}) => new fields.SchemaField({
      value:     new fields.NumberField({ initial: 10 }),
      mod:       new fields.NumberField({ initial: 0 }),
      min:       new fields.NumberField({ initial: 0 }),
      max:       new fields.NumberField({ initial: 99 }),
      label:     new fields.StringField({ initial: label }),
      rollLabel: new fields.StringField({ initial: rollLabel }),
      ...extra,
    });

    return {
      ...sharedActorFields(fields),

      biography:  new fields.HTMLField({ initial: "" }),
      notes:      new fields.StringField({ initial: "" }),

      weight: new fields.SchemaField({
        current:  new fields.NumberField({ initial: 0 }),
        capacity: new fields.NumberField({ initial: 0 }),
      }),

      class:      new fields.SchemaField({ value: new fields.StringField({ initial: "" }) }),
      rank:       new fields.SchemaField({ value: new fields.StringField({ initial: "" }) }),
      pronouns:   new fields.SchemaField({ value: new fields.StringField({ initial: "" }) }),
      credits:    new fields.SchemaField({ value: new fields.StringField({ initial: "" }) }),
      stressdesc: new fields.SchemaField({ value: new fields.StringField({ initial: "" }) }),

      xp: new fields.SchemaField({
        value:         new fields.NumberField({ initial: 0 }),
        html:          new fields.StringField({ initial: "" }),
        selectedSkill: new fields.StringField({ initial: "" }),
      }),

      attributes: new fields.SchemaField({
        level: new fields.SchemaField({
          value: new fields.NumberField({ initial: 0 }),
        }),
      }),

      stats: new fields.SchemaField({
        strength:  statField("Strength",  "Strength Check"),
        speed:     statField("Speed",     "Speed Check"),
        intellect: statField("Intellect", "Intellect Check"),
        combat:    statField("Combat",    "Combat Check"),
        sanity:    statField("Sanity",    "Sanity Save"),
        fear:      statField("Fear",      "Fear Save"),
        body:      statField("Body",      "Body Save"),
        potential: statField("Potential", "Potential Save"),
        armor:     statField("Armor",     "Armor Save", {
          damageReduction: new fields.NumberField({ initial: 0 }),
          cover:           new fields.StringField({ initial: "none" }),
        }),
      }),

      other: new fields.SchemaField({
        stress: new fields.SchemaField({
          value: new fields.NumberField({ initial: 2 }),
          min:   new fields.NumberField({ initial: 2 }),
          max:   new fields.NumberField({ initial: 20 }),
          label: new fields.StringField({ initial: "Stress" }),
        }),
        resolve: new fields.SchemaField({
          value: new fields.NumberField({ initial: 0 }),
          min:   new fields.NumberField({ initial: 0 }),
          max:   new fields.NumberField({ initial: 15 }),
          label: new fields.StringField({ initial: "Resolve" }),
        }),
        stressdesc: new fields.SchemaField({
          value: new fields.StringField({ initial: "" }),
        }),
      }),
    };
  }
}
