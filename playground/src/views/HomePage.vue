<template>
        <div id="navbar" class="sidenav d-flex flex-column overflow-scroll">
            <nav class="navbar navbar-light">
                <div class="container-fluid">
                    <router-link to="dashboard/projects">
                        <img src="https://www.peppubuild.com/logo.png" class="navbar-brand mb-0 h3 logo" />
                    </router-link>
                </div>
            </nav>
            <div class="">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#block"
                            type="button" role="tab" aria-controls="block" aria-selected="true">
                            <i class="bi bi-grid-fill"></i>
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="trait-tab" data-bs-toggle="tab" data-bs-target="#trait" type="button"
                            role="tab" aria-controls="trait" aria-selected="false">
                            <i class="bi bi-layers-fill"></i>
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="style-tab" data-bs-toggle="tab" data-bs-target="#style" type="button"
                            role="tab" aria-controls="style" aria-selected="false">
                            <i class="bi bi-palette-fill"></i>
                        </button>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="block" role="tabpanel" aria-labelledby="block-tab">
                        <div id="blocks"></div>
                    </div>
                    <div class="tab-pane fade" id="trait" role="tabpanel" aria-labelledby="trait-tab">
                        <div id="layers-containe"></div>
                    </div>
                    <div class="tab-pane fade" id="style" role="tabpanel" aria-labelledby="style-tab">
                        <div id="styles-container"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-content">
            <nav class="navbar navbar-light">
                <div class="container-fluid">
                    <div class="panel__devices"></div>
                    <div class="panel__basic-actions"></div>
                </div>
            </nav>
            <div id="editor"></div>
        </div>
</template>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css');

@import './css/style.css';
</style>

<script>
import grapesjs from 'grapesjs'

export default {
    mounted() {
        // initialize grapesjs
        const editor = grapesjs.init({
            container: '#editor',
            height: '100vh',
            width: 'auto',
            showOffsets: true,
            fromElement: true,
            StorageManager: true,
            noticeOnUnload: false,
            pageManager: {
                pages: [
                    {
                        id: 'index'
                    }
                ]
            },
            blockManager: {
                appendTo: "#blocks",
            },

            layerManager: {
                appendTo: "#layers-containe",
            },
            panels: {

            },
            styleManager: {
                appendTo: "#styles-container",
                sectors: [{
                    name: 'General',
                    open: false,
                    buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom']
                }, {
                    name: 'Dimension',
                    open: false,
                    buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding']
                }, {
                    name: 'Typography',
                    open: false,
                    buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-shadow']
                }, {
                    name: 'Decorations',
                    open: false,
                    buildProps: ['border-radius-c', 'background-color', 'border-radius', 'border', 'box-shadow', 'background'],
                }, {
                    name: 'Background',
                    open: false,
                    buildProps: ['background-color', 'background'],
                }, {
                    name: 'Extra',
                    open: false,
                    buildProps: ['opacity', 'transition', 'perspective', 'transform'],
                    properties: [{
                        type: 'slider',
                        property: 'opacity',
                        defaults: 1,
                        step: 0.01,
                        max: 1,
                        min: 0,
                    }]
                },
                {
                    name: 'Flex',
                    open: false,
                    properties: [{
                        name: 'Flex Container',
                        property: 'display',
                        type: 'select',
                        defaults: 'block',
                        list: [
                            { value: 'block', name: 'Disable' },
                            { value: 'flex', name: 'Enable' }
                        ],
                    }, {
                        name: 'Flex Parent',
                        property: 'label-parent-flex',
                        type: 'integer',
                    }, {
                        name: 'Direction',
                        property: 'flex-direction',
                        type: 'radio',
                        defaults: 'row',
                        list: [{
                            value: 'row',
                            name: 'Row',
                            className: 'icons-flex icon-dir-row',
                            title: 'Row',
                        }, {
                            value: 'row-reverse',
                            name: 'Row reverse',
                            className: 'icons-flex icon-dir-row-rev',
                            title: 'Row reverse',
                        }, {
                            value: 'column',
                            name: 'Column',
                            title: 'Column',
                            className: 'icons-flex icon-dir-col',
                        }, {
                            value: 'column-reverse',
                            name: 'Column reverse',
                            title: 'Column reverse',
                            className: 'icons-flex icon-dir-col-rev',
                        }],
                    }, {
                        name: 'Justify',
                        property: 'justify-content',
                        type: 'radio',
                        defaults: 'flex-start',
                        list: [{
                            value: 'flex-start',
                            className: 'icons-flex icon-just-start',
                            title: 'Start',
                        }, {
                            value: 'flex-end',
                            title: 'End',
                            className: 'icons-flex icon-just-end',
                        }, {
                            value: 'space-between',
                            title: 'Space between',
                            className: 'icons-flex icon-just-sp-bet',
                        }, {
                            value: 'space-around',
                            title: 'Space around',
                            className: 'icons-flex icon-just-sp-ar',
                        }, {
                            value: 'center',
                            title: 'Center',
                            className: 'icons-flex icon-just-sp-cent',
                        }],
                    }, {
                        name: 'Align',
                        property: 'align-items',
                        type: 'radio',
                        defaults: 'center',
                        list: [{
                            value: 'flex-start',
                            title: 'Start',
                            className: 'icons-flex icon-al-start',
                        }, {
                            value: 'flex-end',
                            title: 'End',
                            className: 'icons-flex icon-al-end',
                        }, {
                            value: 'stretch',
                            title: 'Stretch',
                            className: 'icons-flex icon-al-str',
                        }, {
                            value: 'center',
                            title: 'Center',
                            className: 'icons-flex icon-al-center',
                        }],
                    }, {
                        name: 'Flex Children',
                        property: 'label-parent-flex',
                        type: 'integer',
                    }, {
                        name: 'Order',
                        property: 'order',
                        type: 'integer',
                        defaults: 0,
                        min: 0
                    }, {
                        name: 'Flex',
                        property: 'flex',
                        type: 'composite',
                        properties: [{
                            name: 'Grow',
                            property: 'flex-grow',
                            type: 'integer',
                            defaults: 0,
                            min: 0
                        }, {
                            name: 'Shrink',
                            property: 'flex-shrink',
                            type: 'integer',
                            defaults: 0,
                            min: 0
                        }, {
                            name: 'Basis',
                            property: 'flex-basis',
                            type: 'integer',
                            units: ['px', '%', ''],
                            unit: '',
                            defaults: 'auto',
                        }],
                    }, {
                        name: 'Align',
                        property: 'align-self',
                        type: 'radio',
                        defaults: 'auto',
                        list: [{
                            value: 'auto',
                            name: 'Auto',
                        }, {
                            value: 'flex-start',
                            title: 'Start',
                            className: 'icons-flex icon-al-start',
                        }, {
                            value: 'flex-end',
                            title: 'End',
                            className: 'icons-flex icon-al-end',
                        }, {
                            value: 'stretch',
                            title: 'Stretch',
                            className: 'icons-flex icon-al-str',
                        }, {
                            value: 'center',
                            title: 'Center',
                            className: 'icons-flex icon-al-center',
                        }],
                    }]
                }
                ],
            },
            // Add peppu and other plugins.
            plugins: ['peppu-sidebar', 'peppu-bootstrap', 'peppu-panel', "gjs-blocks-basic", "grapesjs-plugin-forms", 'grapesjs-style-bg', 'grapesjs-touch'],
            pluginsOpts: {
                'peppu-sidebar': { /* Test here your options  */ },
                'peppu-bootstrap': {},
                'gjs-blocks-basic': { flexGrid: true },
            },
            canvas: {
                styles: [
                    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                ],
                scripts: [
                    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
                ],
            }
        });
        var panelManager = editor.Panels;
        // get the buttons
        panelManager.getButton("views", "open-sm");
        panelManager.getButton("views", "open-layers");
        panelManager.getButton("views", "open-blocks");

        // remove the buttons
        panelManager.removeButton("views", "open-layers");
        panelManager.removeButton("views", "open-blocks");
        const mdl = editor.Modal;
        editor.on('load', () => {
            mdl.open({
                title: 'Quickstart',
                content: `
                <div class="container" style="background-color: black;">
                  The 'View Code' icon contains the HTML and CSS code added to the editor.<br>
                  To get started, you need to install VSCode and create a HTML/CSS file.<br>
                  In the HTML file, you can start with a scaffold by typing '!' and hitting enter.<br>
                  For bootstrap components, add the Bootstrap CSS and HTML.<br>
      
                  <div class="mb-3">
                      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">"></textarea>
                  </div>
                  Always start with the basic blocks if you're just starting out.<br>
                  Remember that you can change the style of any component in the editor from the style panel.
                </div>`,
            })
        })
        editor.on('block:drag:stop', (component) => {
            if (component.attributes.type == 'B-NAVBAR') {
                mdl.open({
                    title: 'This is a Navigation Bar',
                    content: `
                    <div class="container" style="background-color: black;">
                    You just dropped a navigation bar.<br> Navigation bars are usually a list of links, 
                    useful to aid visitors to access information faster.<br> This navigation bar is built with Bootstrap, to create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    For more information, checkout the Bootstap navigation page: 
                    https://getbootstrap.com/docs/5.3/components/navbar
                    </div>
                `,
                })
            }
            else if (component.attributes.type == 'B-ACCORDION') {
                mdl.open({
                    title: 'This is an Accordion',
                    content: `
                    <div class="container" style="background-color: black;">
                    You just dropped an accordion.<br> Accordions are menus that have headers stacked together. They reveal more details when you click on them. This accordion is built with Bootstrap, to create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    For more information, checkout the Bootstap accordion page:
                    https://getbootstrap.com/docs/5.3/components/accordion/
                    </div>
                `,
                })
            } else if (component.attributes.type == 'B-CARD') {
                mdl.open({
                    title: 'This is a Card',
                    content: `
                    <div class="container" style="background-color: black;">
                    You just dropped a card.<br> Cards are containers that group related information in flexible-size containers
                    visually resembling playing cards.<br> This card is built with Bootstrap, to create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    For more information, checkout the Bootstap card page:
                    https://getbootstrap.com/docs/5.3/components/cards
                    </div>
                `,
                })
            } else if (component.attributes.type == 'B-FOOTER') {
                mdl.open({
                    title: 'This is a Footer',
                    content: `
                    <div class="container" style="background-color: black;">
                    You just dropped a footer.<br> Footers are website components that hold important information about
                    your website. They are mostly fixed at the bottom of the website. This footer is built with Bootstrap, to create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    For more information, checkout the Bootstap footer page:
                    https://getbootstrap.com/docs/5.2/examples/footers/
                    </div>
                `,
                })
            } else if (component.attributes.type == 'B-PRICING') {
                mdl.open({
                    title: 'This is a Pricing',
                    content: `
                    <div class="container" style="background-color: black;">
                    You just dropped a pricing component.<br> This component has all the elements you need for creating the different
                    pricing models. If you have used any subscription model for the web and have seen the 
                    pricing page, this is exactly what this component does. This component is built with Bootstrap, to create
                    yours, check the 'View code' component and add the HTML code into your HTML file.:
                    For more information, checkout the Bootstap pricing page:
                    https://getbootstrap.com/docs/5.2/examples/pricing
                    </div>
                `,
                })
            } else if (component.attributes.type == 'B-FEATURES') {
                mdl.open({
                    title: 'This is a Feature',
                    content: `
                    <div class="container" style="background-color: black;">
                    You just dropped a feature component.<br> If you have ever wondered how to show-off the great
                    features of your product, consider using this component.<br> This component is built with Bootstrap, to create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    For more information, checkout the Bootstap features page:
                    https://getbootstrap.com/docs/5.2/examples/features
                    </div>
                `,
                })
            } else if (component.attributes.type == 'B-HERO') {
                mdl.open({
                    title: 'This is Hero',
                    content: `
                    <div class="container" style="background-color: black;">
                    You just dropped a Hero component.<br> This is the first thing the visitor sees when they visit your website.
                    The goal is to capture the attention of the visitor. This Hero is built with Bootstrap, to create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    For more information, checkout the Bootstap hero page:
                    https://getbootstrap.com/docs/5.2/examples/hero/
                    </div>
                `,
                })
            } else if (component.attributes.type == 'B-BUTTON') {
                mdl.open({
                    title: 'This is a Button',
                    content: `
                    <div class="container" style="background-color: black;">
                    You just dropped a button. Buttons are interractive elements that communicate actions that users can take.
                    They mostly perform actions when users click on them. This button is built with Bootstrap, to create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    For more information, checkout the Bootstap button page:
                    
                    </div>
                `,
                })
            } else if (component.attributes.type == 'B-CAROUSEL') {
                mdl.open({
                    title: 'This is an Carousel',
                    content: `
                    <div class="container" style="background-color: black;">
                    You just dropped a carousel.<br> Carousels can also be called slideshows or galleries.
                    They allow you display text, images, and even video in one interractive sliding block. This carousel is built with Bootstrap, to create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    For more information, checkout the Bootstap carousel page:
                    </div>
                `,
                })
            } else if (component.attributes.type == 'text') {
                mdl.open({
                    title: 'This is a text',
                    content: `
                    <div class="container" style="background-color: black;">
                    This is a text. Texts can be added into divs or 'p' tags. To create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    </div>
                `,
                })
            } else if (component.attributes.name == 'Row') {
                mdl.open({
                    title: 'This is a Div',
                    content: `
                    <div class="container" style="background-color: black;">
                    This is a Div tag. Div tags are mostly used as building blocks to create components. To create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    </div>
                `,
                })
            } else if (component.attributes.type == 'link') {
                mdl.open({
                    title: 'This is a Link',
                    content: `
                    <div class="container" style="background-color: black;">
                    This is a Link. Links can be added to texts or buttons and come with an 'a' tag. To create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    </div>
                `,
                })
            } else if (component.attributes.type == 'image') {
                mdl.open({
                    title: 'This is an Image',
                    content: `
                    <div class="container" style="background-color: black;">
                    This is an Image (img tag). Image tags are mostly used to display images. To create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    </div>
                `,
                })
            }
        });
    }
}

</script>