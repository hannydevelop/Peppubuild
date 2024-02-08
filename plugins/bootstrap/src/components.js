export default (editor, opts = {}) => {
  const domc = editor.DomComponents;

  // Bootstrap card component
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

  // Bootstrap hero component
  domc.addType('B-HERO', {
    model: {
      defaults: {
        tagName: 'div',
        attributes: { class: 'container col-xxl-8 px-4 py-5' },
        components: [{
          tagName: 'div',
          attributes: { class: 'row flex-lg-row-reverse align-items-center g-5 py-5' },
          components: [
            {
              tagName: 'div',
              attributes: { class: 'col-10 col-sm-8 col-lg-6' },
              components: [{
                type: 'image',
                attributes: { src: 'https://fakeimg.pl/600x400?text=Replace+image', style: 'width: 700; height: 500', alt: '', class: 'd-block mx-lg-auto img-fluid' },
              }],
            },
            {
              tagName: 'div',
              attributes: { class: 'col-lg-6' },
              components: [
                {
                  tagName: 'h1',
                  type: 'text',
                  attributes: { class: 'display-5 fw-bold text-body-emphasis lh-1 mb-3' },
                  components: [{
                    type: 'textnode',
                    content: 'Responsive left-aligned hero with image'
                  }]
                },
                {
                  tagName: 'p',
                  type: 'text',
                  attributes: { class: 'lead' },
                  components: [{
                    type: 'textnode',
                    content: `Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.`
                  }]
                },
                {
                  tagName: 'div',
                  attributes: { class: 'd-grid gap-2 d-md-flex justify-content-md-start' },
                  components: [
                    {
                      type: 'B-BUTTON',
                    }
                  ]
                }
              ]
            }
          ],

        }]
      }
    },
    view: {

    },
  });

  domc.addType('B-BUTTON', {
    isComponent: el => el.tagName == 'BUTTON',

    model: {
      defaults: {
        tagName: 'button',
        attributes: { type: 'button', class: 'btn btn-primary' },
        text: 'Send',
        traits: [
          {
            name: 'text',
            changeProp: true,
          }, {
            type: 'select',
            name: 'type',
            options: [
              { value: 'button' },
              { value: 'submit' },
              { value: 'reset' },
            ]
          }]
      },

      init() {
        const comps = this.components();
        const tChild = comps.length === 1 && comps.models[0];
        const chCnt = (tChild && tChild.is('textnode') && tChild.get('content')) || '';
        const text = chCnt || this.get('text');
        this.set('text', text);
        this.on('change:text', this.__onTextChange);
        (text !== chCnt) && this.__onTextChange();
      },

      __onTextChange() {
        this.components(this.get('text'));
      },
    },

    view: {

    },
  });
};
