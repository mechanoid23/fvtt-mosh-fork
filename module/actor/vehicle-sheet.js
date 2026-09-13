export class MothershipVehicleSheet extends foundry.appv1.sheets.ActorSheet {

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["mosh", "sheet", "actor", "vehicle"],
            template: "systems/mosh-fork/templates/actor/vehicle-sheet.html",
            width: 820,
            height: 770,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "weapons" }],
            submitOnChange: true
        });
    }

    async getData() {
        const data = await super.getData();
        const actorData = data.data;

        actorData.img = this.actor.img;
        actorData.name = this.actor.name;

        const weapons = [];
        for (let i of data.items) {
            if (i.type === 'weapon') weapons.push(i);
        }
        actorData.system.weaponItems = weapons;

        actorData.enriched = {
            description: await foundry.applications.ux.TextEditor.implementation.enrichHTML(actorData.system.description, { async: true }),
            notes: await foundry.applications.ux.TextEditor.implementation.enrichHTML(actorData.system.notes, { async: true }),
        };

        return actorData;
    }

    activateListeners(html) {
        super.activateListeners(html);
        if (!this.options.editable) return;

        html.find('.stat-roll').click(ev => {
            const statName = $(ev.currentTarget).data("key");
            this.actor.rollCheck(null, 'low', statName, null, null, null);
        });

        html.find('.weapon-roll').click(ev => {
            const li = ev.currentTarget.closest(".item");
            const item = foundry.utils.duplicate(this.actor.getEmbeddedDocument("Item", li.dataset.itemId));
            this.actor.rollCheck(null, 'low', 'combat', null, null, item);
        });

        html.find('.dmg-roll').click(ev => {
            const li = ev.currentTarget.closest(".item");
            const item = foundry.utils.duplicate(this.actor.getEmbeddedDocument("Item", li.dataset.itemId));
            this.actor.rollCheck(null, null, 'damage', null, null, item);
        });

        html.find('.item-create').click(ev => {
            ev.preventDefault();
            const type = ev.currentTarget.dataset.type;
            this.actor.createEmbeddedDocuments("Item", [{ name: `New ${type}`, type }]);
        });

        html.find('.item-edit').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            this.actor.getEmbeddedDocument("Item", li.data("itemId")).sheet.render({ force: true });
        });

        html.find('.item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            this.actor.deleteEmbeddedDocuments("Item", [li.data("itemId")]);
            li.slideUp(200, () => this.render(false));
        });
    }

    async _updateObject(event, formData) {
        await this.object.update(foundry.utils.expandObject(formData), { diff: false });
    }
}
