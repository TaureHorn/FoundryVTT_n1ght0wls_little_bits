
class NLB {

    static id = 'n1ght0wls_little_bits'

    static shortName = 'NLB'

}

console.log(`${NLB.id}: module init`)

Hooks.once('ready', async function() {

    // set up custom Hooks
    game.socket.on(`module.${NLB.id}`, async (data) => {
        if (!data.users.includes(game.userId)) return
        switch (data.event) {
            case 'triggerMacro':
		if (!data.macroId) return console.error(`${NLB.id} socketEvent[${data.event}]: did not receive the data 'macroId'`)
                const macro = game.macros.get(data.macroId)
                if (typeof macro === "undefined") return ui.notifications.warn(`${NLB.id}: macro with id '${data.macroId}' not found`)
                data.macroArgs ? await macro.execute(data.macroArgs) : await macro.execute({})
                break;
            default:
                const str = `${NLB.id}: received an incorrect socket event string`
                console.log(str)
                ui.notifications.error(str)
        }
    })

    // set default FilePicker view to thumbnails
    new FilePicker().constructor.LAST_DISPLAY_MODE = 'thumbs'

})

