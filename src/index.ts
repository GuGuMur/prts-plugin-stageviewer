import config from '../ipe-plugin.json'
import './style.css';

mw.hook('InPageEdit.toolbox').add(({ $toolbox }) => {
    $toolbox
        .find('.btn-group.group1')
        .append(
            $('<li>', { class: 'btn-tip-group' }).append(
                $('<div>', { class: 'btn-tip', text: config.description }),
                $('<button>',
                    {
                        id: config.name,
                        class: `ipe-toolbox-btn fa ${config.icon}`
                    })
                    .click(main)
            )
        );
});

async function main():Promise<void> {
    console.log("Hello");
}