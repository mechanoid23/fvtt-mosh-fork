import { sharedItemFields } from "./shared-item-fields.js";

export class WeaponData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      ...sharedItemFields(fields),
      antiArmor:    new fields.BooleanField({ initial: false }),
      damage:       new fields.StringField({ initial: "1d10" }),
      ammo:         new fields.NumberField({ initial: 10 }),
      shots:        new fields.NumberField({ initial: 1 }),
      curShots:     new fields.NumberField({ initial: 0 }),
      shotsPerFire: new fields.NumberField({ initial: 1 }),
      useAmmo:      new fields.BooleanField({ initial: false }),
      ammoType:     new fields.StringField({ initial: "" }),
      wound:        new fields.StringField({ initial: "" }),
      critDmg:      new fields.StringField({ initial: "" }),
      woundEffect:  new fields.StringField({ initial: "" }),
      bonus:        new fields.NumberField({ initial: 0 }),
      weight:       new fields.NumberField({ initial: 0 }),
      cost:         new fields.NumberField({ initial: 0 }),
      ranges: new fields.SchemaField({
        short:  new fields.NumberField({ initial: 0 }),
        medium: new fields.NumberField({ initial: 0 }),
        long:   new fields.NumberField({ initial: 0 }),
        value:  new fields.StringField({ initial: "" }),
      }),
      settings: new fields.SchemaField({
        firstEdition: new fields.BooleanField({ initial: false }),
      }),
    };
  }
}
