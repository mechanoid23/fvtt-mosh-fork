import { sharedActorFields } from "./shared-actor-fields.js";

export class CreatureData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    const statField = (label, rollLabel, enabled, extra = {}) => new fields.SchemaField({
      value:     new fields.NumberField({ initial: 10 }),
      min:       new fields.NumberField({ initial: 0 }),
      max:       new fields.NumberField({ initial: 99 }),
      label:     new fields.StringField({ initial: label }),
      rollLabel: new fields.StringField({ initial: rollLabel }),
      enabled:   new fields.BooleanField({ initial: enabled }),
      ...extra,
    });

    return {
      ...sharedActorFields(fields),

      biography:   new fields.StringField({ initial: "" }),
      notes:       new fields.StringField({ initial: "" }),
      description: new fields.StringField({ initial: "This is a description" }),

      xp: new fields.SchemaField({
        value: new fields.NumberField({ initial: 1 }),
        html:  new fields.StringField({ initial: "" }),
      }),

      stats: new fields.SchemaField({
        combat:   statField("Combat",   "Combat Check",   true),
        instinct: statField("Instinct", "Instinct Check", true),
        speed:    statField("Speed",    "Speed Check",    false),
        loyalty:  statField("Loyalty",  "Loyalty Check",  false),
        armor:    statField("Armor",    "Armor Save",     false, {
          mod:             new fields.NumberField({ initial: 0 }),
          damageReduction: new fields.NumberField({ initial: 0 }),
          cover:           new fields.StringField({ initial: "none" }),
        }),
        sanity:   statField("Sanity",   "Sanity Save",    false),
      }),
    };
  }
}
