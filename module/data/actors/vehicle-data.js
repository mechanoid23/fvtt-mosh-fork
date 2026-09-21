import { sharedActorFields } from "./shared-actor-fields.js";

export class VehicleData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    return {
      ...sharedActorFields(fields),

      biography:   new fields.StringField({ initial: "" }),
      notes:       new fields.StringField({ initial: "" }),
      description: new fields.StringField({ initial: "" }),
      type:        new fields.StringField({ initial: "" }),

      crew: new fields.SchemaField({
        value: new fields.NumberField({ initial: 0 }),
        max:   new fields.NumberField({ initial: 4 }),
        label: new fields.StringField({ initial: "Crew" }),
      }),

      weapons: new fields.SchemaField({
        value: new fields.NumberField({ initial: 0 }),
        max:   new fields.NumberField({ initial: 2 }),
        label: new fields.StringField({ initial: "Weapons" }),
      }),

      stats: new fields.SchemaField({
        speed: new fields.SchemaField({
          value:     new fields.NumberField({ initial: 10 }),
          min:       new fields.NumberField({ initial: 0 }),
          max:       new fields.NumberField({ initial: 99 }),
          label:     new fields.StringField({ initial: "Speed" }),
          rollLabel: new fields.StringField({ initial: "Speed Check" }),
        }),
        armor: new fields.SchemaField({
          value:           new fields.NumberField({ initial: 0 }),
          mod:             new fields.NumberField({ initial: 0 }),
          min:             new fields.NumberField({ initial: 0 }),
          max:             new fields.NumberField({ initial: 99 }),
          damageReduction: new fields.NumberField({ initial: 0 }),
          cover:           new fields.StringField({ initial: "none" }),
          label:           new fields.StringField({ initial: "Armor" }),
          rollLabel:       new fields.StringField({ initial: "Armor Save" }),
        }),
      }),
    };
  }
}
