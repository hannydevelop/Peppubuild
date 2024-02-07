export default (editor, opts = {}) => {
  const domc = editor.DomComponents;

  domc.addType('B-CARD', {
    model: {
      defaults: {
        tagName: 'div',
        attributes: { class: 'card', style: 'width: 18rem' },
        components: [
          {
            type: 'image',
            attributes: { src: 'https://fakeimg.pl/600x400?text=Replace+image', style: 'card-img-top', alt: '' },
          },
          {
            tagName: 'div',
            attributes: { class: 'card-body' },
            components: [
              {
                tagName: 'h5',
                type: 'text',
                attributes: { class: 'card-title' },
                components: [{
                  type: 'textnode',
                  content: 'Card title'
                }]
              },
              {
                tagName: 'p',
                type: 'text',
                attributes: { class: 'card-text' },
                components: [{
                  type: 'textnode',
                  content: `Some quick example text to build on the card title and make up the bulk of the card's content.`
                }]
              },
              {
                type: 'link',
                attributes: { href: '#', class: 'btn btn-primary' },
                components: [{
                  type: 'textnode',
                  content: 'Go somewhere'
                }]
              },
            ]
          }
        ]
      },
    },
    view: {

    },
  });
};
