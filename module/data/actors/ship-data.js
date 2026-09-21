import { sharedActorFields } from "./shared-actor-fields.js";

export class ShipData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    const statField = (label, rollLabel) => new fields.SchemaField({
      value:     new fields.NumberField({ initial: 10 }),
      min:       new fields.NumberField({ initial: 0 }),
      max:       new fields.NumberField({ initial: 99 }),
      label:     new fields.StringField({ initial: label }),
      rollLabel: new fields.StringField({ initial: rollLabel }),
    });

    return {
      ...sharedActorFields(fields),

      biography:   new fields.StringField({ initial: "" }),
      description: new fields.StringField({ initial: "This is a description" }),
      type:        new fields.StringField({ initial: "" }),
      class:       new fields.StringField({ initial: "" }),

      xp: new fields.SchemaField({
        value: new fields.NumberField({ initial: 1 }),
      }),

      images: new fields.SchemaField({
        layout: new fields.StringField({ initial: "systems/mosh/images/Galloway_Top.png" }),
        beauty: new fields.StringField({ initial: "systems/mosh/images/Galloway_Top.png" }),
      }),

      runSetup:   new fields.BooleanField({ initial: true }),
      megadamage: new fields.ObjectField(),

      stats: new fields.SchemaField({
        armor:      statField("Armor",      "Armor Save"),
        combat:     statField("Combat",     "Combat Check"),
        intellect:  statField("Intellect",  "Intellect Check"),
        speed:      statField("Speed",      "Speed Check"),
        thrusters:  statField("Thrusters",  "Thrusters Save"),
        battle:     statField("Battle",     "Battle Save"),
        systems:    statField("Systems",    "Systems Save"),
        bankruptcy: statField("Bankruptcy", "Bankruptcy Save"),
      }),

      // ObjectField used for both because their keys contain hyphens,
      // which are not valid JS identifiers in typed SchemaField definitions.
      supplies:         new fields.ObjectField(),
      "weapon-stats":   new fields.ObjectField(),
    };
  }
}
