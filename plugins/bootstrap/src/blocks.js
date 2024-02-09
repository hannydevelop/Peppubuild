export default (editor, opts = {}) => {
  const bm = editor.BlockManager;

  // Navbar
  bm.add('Navbar', {
    label: 'Navbar',
    category: 'Bootstrap Component',
    media: `<svg width="70" height="36" viewBox="0 0 70 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="70" height="36" fill="#AAAAAA"/>
    <path d="M7 4.5C5.067 4.5 3.5 6.067 3.5 8C3.5 9.933 5.067 11.5 7 11.5L7 4.5ZM7 11.5L36 11.5L36 4.5L7 4.5L7 11.5Z" fill="black"/>
    <path d="M62 11.5C63.933 11.5 65.5 9.933 65.5 8C65.5 6.067 63.933 4.5 62 4.5L62 11.5ZM62 4.5L35 4.5L35 11.5L62 11.5L62 4.5Z" fill="black"/>
    <path d="M7 14.5C5.067 14.5 3.5 16.067 3.5 18C3.5 19.933 5.067 21.5 7 21.5L7 14.5ZM7 21.5L36 21.5L36 14.5L7 14.5L7 21.5Z" fill="black"/>
    <path d="M62 21.5C63.933 21.5 65.5 19.933 65.5 18C65.5 16.067 63.933 14.5 62 14.5L62 21.5ZM62 14.5L35 14.5L35 21.5L62 21.5L62 14.5Z" fill="black"/>
    <path d="M7 23.5C5.067 23.5 3.5 25.067 3.5 27C3.5 28.933 5.067 30.5 7 30.5L7 23.5ZM7 30.5L36 30.5L36 23.5L7 23.5L7 30.5Z" fill="black"/>
    <path d="M62 30.5C63.933 30.5 65.5 28.933 65.5 27C65.5 25.067 63.933 23.5 62 23.5L62 30.5ZM62 23.5L35 23.5L35 30.5L62 30.5L62 23.5Z" fill="black"/>
    </svg>`,
    /* 
    content: `<nav class="navbar navbar-expand-lg fixed-top navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>`
  */
 content: {type: 'B-NAVBAR'}
    // media: '<svg>...</svg>',
  });

  // Accordion
  bm.add('Accordion', {
    label: 'Accordion',
    category: 'Bootstrap Component',
    media: `<svg width="70" height="36" viewBox="0 0 70 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="70" height="36" fill="#AAAAAA"/>
    <line x1="3" y1="3.32144" x2="26.3333" y2="3.32144" stroke="black" stroke-width="3"/>
    <line x1="3" y1="12.5" x2="67" y2="12.5" stroke="black" stroke-width="7"/>
    <line x1="3" y1="20.5" x2="67" y2="20.5" stroke="black" stroke-width="7"/>
    <line x1="3" y1="28.5" x2="67" y2="28.5" stroke="black" stroke-width="7"/>
    </svg>`,
    content: `
  <div>
    <div class="container col-xxl-8 px-4 py-5 accordion" id="accordionExample">
    <h2 class="pb-2 border-bottom">Accordion</h2>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Accordion Item #1
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Accordion Item #2
        </button>
      </h2>
      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Accordion Item #3
        </button>
      </h2>
      <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
      </div>
    </div>
  </div>
  </div>`,
  });

  // Card
  bm.add('B-CARD', {
    label: 'Card',
    category: 'Bootstrap Card',
    media: `<svg width="70" height="38" viewBox="0 0 70 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="70" height="37.3333" fill="#AAAAAA"/>
    <line x1="3" y1="3.5" x2="26.3333" y2="3.5" stroke="black" stroke-width="3"/>
    <rect x="3" y="7" width="18" height="25" fill="black"/>
    <line x1="5.9984" y1="26.5128" x2="17.9984" y2="26.5" stroke="white" stroke-width="3"/>
    <line x1="5.99947" y1="19.5128" x2="17.9995" y2="19.5" stroke="white"/>
    <line x1="5.99947" y1="21.5128" x2="17.9995" y2="21.5" stroke="white"/>
    <rect x="8" y="10" width="8" height="7.69811" fill="white"/>
    <rect x="10.8895" y="12.911" width="2.26415" height="1.9407" fill="#D9D9D9"/>
    <rect x="26" y="7" width="18" height="25" fill="black"/>
    <line x1="28.9984" y1="26.5128" x2="40.9984" y2="26.5" stroke="white" stroke-width="3"/>
    <line x1="28.9995" y1="19.5128" x2="40.9995" y2="19.5" stroke="white"/>
    <line x1="28.9995" y1="21.5128" x2="40.9995" y2="21.5" stroke="white"/>
    <rect x="31" y="10" width="8" height="7.69811" fill="white"/>
    <rect x="33.8895" y="12.911" width="2.26415" height="1.9407" fill="#D9D9D9"/>
    <rect x="49" y="7" width="18" height="25" fill="black"/>
    <line x1="51.9984" y1="26.5128" x2="63.9984" y2="26.5" stroke="white" stroke-width="3"/>
    <line x1="51.9995" y1="19.5128" x2="63.9995" y2="19.5" stroke="white"/>
    <line x1="51.9995" y1="21.5128" x2="63.9995" y2="21.5" stroke="white"/>
    <rect x="54" y="10" width="8" height="7.69811" fill="white"/>
    <rect x="56.8895" y="12.911" width="2.26415" height="1.9407" fill="#D9D9D9"/>
    </svg>
    `,
    content: { type: 'B-CARD'}
  });
  /* 
  bm.add('Card-Feature', {
    label: 'Card-Feature',
    category: 'Bootstrap Card',
    content: `<div class="card text-center">
    <div class="card-header">
      Featured
    </div>
    <div class="card-body">
      <h5 class="card-title">Special title treatment</h5>
      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
    <div class="card-footer text-muted">
      2 days ago
    </div>
  </div>`,
  });

  bm.add('Card-Border', {
    label: 'Card-Border',
    category: 'Bootstrap Card',
    content: `
    <div class="card border-success mb-3" style="max-width: 18rem;">
    <div class="card-header bg-transparent border-success">Header</div>
    <div class="card-body text-success">
      <h5 class="card-title">Success card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="card-footer bg-transparent border-success">Footer</div>
  </div>`,
  });
    */

  bm.add('Footer', {
    label: 'Footer',
    category: 'Bootstrap Component',
    media: `<svg width="70" height="36" viewBox="0 0 70 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="70" height="36" fill="#AAAAAA"/>
    <path d="M4 19.5H27.3333" stroke="black" stroke-width="3"/>
    <line x1="43" y1="19.5" x2="66.3333" y2="19.5" stroke="black" stroke-width="3"/>
    <path d="M36.9077 19.2102L33.706 20.8409V20.2045L36.1619 19.0213L36.142 19.0611V18.9616L36.1619 19.0014L33.706 17.8182V17.1818L36.9077 18.8125V19.2102Z" fill="black"/>
    </svg>`,
    content: `
  <div class="">
  <footer class="container py-5">
    <div class="row">
      <div class="col-6 col-md-2 mb-3">
        <h5>Section</h5>
        <ul class="nav flex-column">
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Home</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Features</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Pricing</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">FAQs</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">About</a></li>
        </ul>
      </div>

      <div class="col-6 col-md-2 mb-3">
        <h5>Section</h5>
        <ul class="nav flex-column">
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Home</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Features</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Pricing</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">FAQs</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">About</a></li>
        </ul>
      </div>

      <div class="col-6 col-md-2 mb-3">
        <h5>Section</h5>
        <ul class="nav flex-column">
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Home</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Features</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Pricing</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">FAQs</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">About</a></li>
        </ul>
      </div>

      <div class="col-md-5 offset-md-1 mb-3">
        <form>
          <h5>Subscribe to our newsletter</h5>
          <p>Monthly digest of what's new and exciting from us.</p>
          <div class="d-flex flex-column flex-sm-row w-100 gap-2">
            <label for="newsletter1" class="visually-hidden">Email address</label>
            <input id="newsletter1" type="text" class="form-control" placeholder="Email address">
            <button class="btn btn-primary" type="button">Subscribe</button>
          </div>
        </form>
      </div>
    </div>

    <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
      <p>&copy; 2023 Company, Inc. All rights reserved.</p>
      <ul class="list-unstyled d-flex">
        <li class="ms-3"><a class="link-body-emphasis" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15"/>
      </svg></a></li>
        <li class="ms-3"><a class="link-body-emphasis" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
      </svg></a></li>
        <li class="ms-3"><a class="link-body-emphasis" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
      </svg></a></li>
      </ul>
    </div>
  </footer>
</div>
    `,
  });


  bm.add('Pricing', {
    label: 'Pricing',
    category: 'Bootstrap Component',
    content: `<div>
    <div class="container col-sm-8 px-4 py-5">
    <h2 class="pb-2 border-bottom">Pricing</h2>
    <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
      <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 fw-normal">Free</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">$0<small class="text-body-secondary fw-light">/mo</small></h1>
            <ul class="list-unstyled mt-3 mb-4">
              <li>10 users included</li>
              <li>2 GB of storage</li>
              <li>Email support</li>
              <li>Help center access</li>
            </ul>
            <button type="button" class="w-100 btn btn-lg btn-outline-primary">Sign up for free</button>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 fw-normal">Pro</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">$15<small class="text-body-secondary fw-light">/mo</small></h1>
            <ul class="list-unstyled mt-3 mb-4">
              <li>20 users included</li>
              <li>10 GB of storage</li>
              <li>Priority email support</li>
              <li>Help center access</li>
            </ul>
            <button type="button" class="w-100 btn btn-lg btn-primary">Get started</button>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm border-primary">
          <div class="card-header py-3 text-bg-primary border-primary">
            <h4 class="my-0 fw-normal">Enterprise</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">$29<small class="text-body-secondary fw-light">/mo</small></h1>
            <ul class="list-unstyled mt-3 mb-4">
              <li>30 users included</li>
              <li>15 GB of storage</li>
              <li>Phone and email support</li>
              <li>Help center access</li>
            </ul>
            <button type="button" class="w-100 btn btn-lg btn-primary">Contact us</button>
          </div>
        </div>
      </div>
    </div>

    <h2 class="display-6 text-center mb-4">Compare plans</h2>

    <div class="table-responsive">
      <table class="table text-center">
        <thead>
          <tr>
            <th style="width: 34%;"></th>
            <th style="width: 22%;">Free</th>
            <th style="width: 22%;">Pro</th>
            <th style="width: 22%;">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" class="text-start">Public</th>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Private</th>
            <td></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <th scope="row" class="text-start">Permissions</th>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Sharing</th>
            <td></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Unlimited members</th>
            <td></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Extra security</th>
            <td></td>
            <td></td>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
    `,
    media: `<svg width="70" height="38" viewBox="0 0 70 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="70" height="37.3333" fill="#AAAAAA"/>
    <line x1="3" y1="3.5" x2="26.3333" y2="3.5" stroke="black" stroke-width="3"/>
    <rect x="3" y="7" width="18" height="25" fill="black"/>
    <line x1="5.9984" y1="26.5128" x2="17.9984" y2="26.5" stroke="white" stroke-width="3"/>
    <line x1="5.99947" y1="19.5128" x2="17.9995" y2="19.5" stroke="white"/>
    <line x1="5.99947" y1="21.5128" x2="17.9995" y2="21.5" stroke="white"/>
    <path d="M12.1591 13.3636V9.72727H12.392V13.3636H12.1591ZM12.9432 10.8182C12.9261 10.6742 12.857 10.5625 12.7358 10.483C12.6146 10.4034 12.4659 10.3636 12.2898 10.3636C12.161 10.3636 12.0483 10.3845 11.9517 10.4261C11.8561 10.4678 11.7813 10.5251 11.7273 10.598C11.6742 10.6709 11.6477 10.7538 11.6477 10.8466C11.6477 10.9242 11.6662 10.991 11.7031 11.0469C11.741 11.1018 11.7893 11.1477 11.848 11.1847C11.9067 11.2206 11.9683 11.2505 12.0327 11.2741C12.0971 11.2969 12.1562 11.3153 12.2102 11.3295L12.5057 11.4091C12.5814 11.429 12.6657 11.4564 12.7585 11.4915C12.8523 11.5265 12.9418 11.5743 13.027 11.6349C13.1132 11.6946 13.1842 11.7713 13.2401 11.8651C13.2959 11.9588 13.3239 12.0739 13.3239 12.2102C13.3239 12.3674 13.2827 12.5095 13.2003 12.6364C13.1188 12.7633 12.9995 12.8641 12.8423 12.9389C12.6861 13.0137 12.4962 13.0511 12.2727 13.0511C12.0644 13.0511 11.884 13.0175 11.7315 12.9503C11.58 12.883 11.4607 12.7893 11.3736 12.669C11.2874 12.5488 11.2386 12.4091 11.2273 12.25H11.5909C11.6004 12.3598 11.6373 12.4508 11.7017 12.5227C11.767 12.5937 11.8494 12.6468 11.9489 12.6818C12.0492 12.7159 12.1572 12.733 12.2727 12.733C12.4072 12.733 12.5279 12.7112 12.6349 12.6676C12.742 12.6231 12.8267 12.5616 12.8892 12.483C12.9517 12.4034 12.983 12.3106 12.983 12.2045C12.983 12.108 12.956 12.0294 12.902 11.9688C12.848 11.9081 12.777 11.8589 12.6889 11.821C12.6009 11.7831 12.5057 11.75 12.4034 11.7216L12.0455 11.6193C11.8182 11.554 11.6383 11.4607 11.5057 11.3395C11.3731 11.2183 11.3068 11.0597 11.3068 10.8636C11.3068 10.7008 11.3509 10.5587 11.4389 10.4375C11.5279 10.3153 11.6473 10.2206 11.7969 10.1534C11.9474 10.0852 12.1155 10.0511 12.3011 10.0511C12.4886 10.0511 12.6553 10.0848 12.8011 10.152C12.947 10.2183 13.0625 10.3092 13.1477 10.4247C13.2339 10.5402 13.2794 10.6714 13.2841 10.8182H12.9432Z" fill="white"/>
    <rect x="26" y="7" width="18" height="25" fill="black"/>
    <line x1="28.9984" y1="26.5128" x2="40.9984" y2="26.5" stroke="white" stroke-width="3"/>
    <line x1="28.9995" y1="19.5128" x2="40.9995" y2="19.5" stroke="white"/>
    <line x1="28.9995" y1="21.5128" x2="40.9995" y2="21.5" stroke="white"/>
    <path d="M35.1591 13.3636V9.72727H35.392V13.3636H35.1591ZM35.9432 10.8182C35.9261 10.6742 35.857 10.5625 35.7358 10.483C35.6146 10.4034 35.4659 10.3636 35.2898 10.3636C35.161 10.3636 35.0483 10.3845 34.9517 10.4261C34.8561 10.4678 34.7813 10.5251 34.7273 10.598C34.6742 10.6709 34.6477 10.7538 34.6477 10.8466C34.6477 10.9242 34.6662 10.991 34.7031 11.0469C34.741 11.1018 34.7893 11.1477 34.848 11.1847C34.9067 11.2206 34.9683 11.2505 35.0327 11.2741C35.0971 11.2969 35.1562 11.3153 35.2102 11.3295L35.5057 11.4091C35.5814 11.429 35.6657 11.4564 35.7585 11.4915C35.8523 11.5265 35.9418 11.5743 36.027 11.6349C36.1132 11.6946 36.1842 11.7713 36.2401 11.8651C36.2959 11.9588 36.3239 12.0739 36.3239 12.2102C36.3239 12.3674 36.2827 12.5095 36.2003 12.6364C36.1188 12.7633 35.9995 12.8641 35.8423 12.9389C35.6861 13.0137 35.4962 13.0511 35.2727 13.0511C35.0644 13.0511 34.884 13.0175 34.7315 12.9503C34.58 12.883 34.4607 12.7893 34.3736 12.669C34.2874 12.5488 34.2386 12.4091 34.2273 12.25H34.5909C34.6004 12.3598 34.6373 12.4508 34.7017 12.5227C34.767 12.5937 34.8494 12.6468 34.9489 12.6818C35.0492 12.7159 35.1572 12.733 35.2727 12.733C35.4072 12.733 35.5279 12.7112 35.6349 12.6676C35.742 12.6231 35.8267 12.5616 35.8892 12.483C35.9517 12.4034 35.983 12.3106 35.983 12.2045C35.983 12.108 35.956 12.0294 35.902 11.9688C35.848 11.9081 35.777 11.8589 35.6889 11.821C35.6009 11.7831 35.5057 11.75 35.4034 11.7216L35.0455 11.6193C34.8182 11.554 34.6383 11.4607 34.5057 11.3395C34.3731 11.2183 34.3068 11.0597 34.3068 10.8636C34.3068 10.7008 34.3509 10.5587 34.4389 10.4375C34.5279 10.3153 34.6473 10.2206 34.7969 10.1534C34.9474 10.0852 35.1155 10.0511 35.3011 10.0511C35.4886 10.0511 35.6553 10.0848 35.8011 10.152C35.947 10.2183 36.0625 10.3092 36.1477 10.4247C36.2339 10.5402 36.2794 10.6714 36.2841 10.8182H35.9432Z" fill="white"/>
    <rect x="49" y="7" width="18" height="25" fill="black"/>
    <line x1="51.9984" y1="26.5128" x2="63.9984" y2="26.5" stroke="white" stroke-width="3"/>
    <line x1="51.9995" y1="19.5128" x2="63.9995" y2="19.5" stroke="white"/>
    <line x1="51.9995" y1="21.5128" x2="63.9995" y2="21.5" stroke="white"/>
    <path d="M58.1591 13.3636V9.72727H58.392V13.3636H58.1591ZM58.9432 10.8182C58.9261 10.6742 58.857 10.5625 58.7358 10.483C58.6146 10.4034 58.4659 10.3636 58.2898 10.3636C58.161 10.3636 58.0483 10.3845 57.9517 10.4261C57.8561 10.4678 57.7813 10.5251 57.7273 10.598C57.6742 10.6709 57.6477 10.7538 57.6477 10.8466C57.6477 10.9242 57.6662 10.991 57.7031 11.0469C57.741 11.1018 57.7893 11.1477 57.848 11.1847C57.9067 11.2206 57.9683 11.2505 58.0327 11.2741C58.0971 11.2969 58.1562 11.3153 58.2102 11.3295L58.5057 11.4091C58.5814 11.429 58.6657 11.4564 58.7585 11.4915C58.8523 11.5265 58.9418 11.5743 59.027 11.6349C59.1132 11.6946 59.1842 11.7713 59.2401 11.8651C59.2959 11.9588 59.3239 12.0739 59.3239 12.2102C59.3239 12.3674 59.2827 12.5095 59.2003 12.6364C59.1188 12.7633 58.9995 12.8641 58.8423 12.9389C58.6861 13.0137 58.4962 13.0511 58.2727 13.0511C58.0644 13.0511 57.884 13.0175 57.7315 12.9503C57.58 12.883 57.4607 12.7893 57.3736 12.669C57.2874 12.5488 57.2386 12.4091 57.2273 12.25H57.5909C57.6004 12.3598 57.6373 12.4508 57.7017 12.5227C57.767 12.5937 57.8494 12.6468 57.9489 12.6818C58.0492 12.7159 58.1572 12.733 58.2727 12.733C58.4072 12.733 58.5279 12.7112 58.6349 12.6676C58.742 12.6231 58.8267 12.5616 58.8892 12.483C58.9517 12.4034 58.983 12.3106 58.983 12.2045C58.983 12.108 58.956 12.0294 58.902 11.9688C58.848 11.9081 58.777 11.8589 58.6889 11.821C58.6009 11.7831 58.5057 11.75 58.4034 11.7216L58.0455 11.6193C57.8182 11.554 57.6383 11.4607 57.5057 11.3395C57.3731 11.2183 57.3068 11.0597 57.3068 10.8636C57.3068 10.7008 57.3509 10.5587 57.4389 10.4375C57.5279 10.3153 57.6473 10.2206 57.7969 10.1534C57.9474 10.0852 58.1155 10.0511 58.3011 10.0511C58.4886 10.0511 58.6553 10.0848 58.8011 10.152C58.947 10.2183 59.0625 10.3092 59.1477 10.4247C59.2339 10.5402 59.2794 10.6714 59.2841 10.8182H58.9432Z" fill="white"/>
    </svg>`
  });

  bm.add('Features', {
    label: 'Features',
    category: 'Bootstrap Component',
    media: `<svg width="70" height="38" viewBox="0 0 70 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="70" height="37.3333" fill="#AAAAAA"/>
    <line x1="3" y1="3.5" x2="26.3333" y2="3.5" stroke="black" stroke-width="3"/>
    <rect x="3" y="7" width="18" height="25" fill="black"/>
    <line x1="5.9984" y1="26.5128" x2="10.9984" y2="26.5075" stroke="white" stroke-width="3"/>
    <line x1="5.99947" y1="17.5128" x2="17.9995" y2="17.5" stroke="white"/>
    <line x1="5.99947" y1="20.5128" x2="17.9995" y2="20.5" stroke="white"/>
    <path d="M9.86364 11.7273L9.88636 11.1023L9.35795 11.4375L9.22159 11.1989L9.77841 10.9091L9.22159 10.6193L9.35795 10.3807L9.88636 10.7159L9.86364 10.0909H10.1364L10.1136 10.7159L10.642 10.3807L10.7784 10.6193L10.2216 10.9091L10.7784 11.1989L10.642 11.4375L10.1136 11.1023L10.1364 11.7273H9.86364ZM11.8636 11.7273L11.8864 11.1023L11.358 11.4375L11.2216 11.1989L11.7784 10.9091L11.2216 10.6193L11.358 10.3807L11.8864 10.7159L11.8636 10.0909H12.1364L12.1136 10.7159L12.642 10.3807L12.7784 10.6193L12.2216 10.9091L12.7784 11.1989L12.642 11.4375L12.1136 11.1023L12.1364 11.7273H11.8636ZM13.8636 11.7273L13.8864 11.1023L13.358 11.4375L13.2216 11.1989L13.7784 10.9091L13.2216 10.6193L13.358 10.3807L13.8864 10.7159L13.8636 10.0909H14.1364L14.1136 10.7159L14.642 10.3807L14.7784 10.6193L14.2216 10.9091L14.7784 11.1989L14.642 11.4375L14.1136 11.1023L14.1364 11.7273H13.8636Z" fill="white"/>
    <rect x="26" y="7" width="18" height="25" fill="black"/>
    <line x1="28.9984" y1="26.5128" x2="33.9984" y2="26.5075" stroke="white" stroke-width="3"/>
    <line x1="28.9995" y1="17.5128" x2="40.9995" y2="17.5" stroke="white"/>
    <line x1="28.9995" y1="20.5128" x2="40.9995" y2="20.5" stroke="white"/>
    <path d="M32.8636 11.7273L32.8864 11.1023L32.358 11.4375L32.2216 11.1989L32.7784 10.9091L32.2216 10.6193L32.358 10.3807L32.8864 10.7159L32.8636 10.0909H33.1364L33.1136 10.7159L33.642 10.3807L33.7784 10.6193L33.2216 10.9091L33.7784 11.1989L33.642 11.4375L33.1136 11.1023L33.1364 11.7273H32.8636ZM34.8636 11.7273L34.8864 11.1023L34.358 11.4375L34.2216 11.1989L34.7784 10.9091L34.2216 10.6193L34.358 10.3807L34.8864 10.7159L34.8636 10.0909H35.1364L35.1136 10.7159L35.642 10.3807L35.7784 10.6193L35.2216 10.9091L35.7784 11.1989L35.642 11.4375L35.1136 11.1023L35.1364 11.7273H34.8636ZM36.8636 11.7273L36.8864 11.1023L36.358 11.4375L36.2216 11.1989L36.7784 10.9091L36.2216 10.6193L36.358 10.3807L36.8864 10.7159L36.8636 10.0909H37.1364L37.1136 10.7159L37.642 10.3807L37.7784 10.6193L37.2216 10.9091L37.7784 11.1989L37.642 11.4375L37.1136 11.1023L37.1364 11.7273H36.8636Z" fill="white"/>
    <rect x="49" y="7" width="18" height="25" fill="black"/>
    <line x1="51.9984" y1="26.5128" x2="56.9984" y2="26.5075" stroke="white" stroke-width="3"/>
    <line x1="51.9995" y1="17.5128" x2="63.9995" y2="17.5" stroke="white"/>
    <line x1="51.9995" y1="20.5128" x2="63.9995" y2="20.5" stroke="white"/>
    <path d="M55.8636 11.7273L55.8864 11.1023L55.358 11.4375L55.2216 11.1989L55.7784 10.9091L55.2216 10.6193L55.358 10.3807L55.8864 10.7159L55.8636 10.0909H56.1364L56.1136 10.7159L56.642 10.3807L56.7784 10.6193L56.2216 10.9091L56.7784 11.1989L56.642 11.4375L56.1136 11.1023L56.1364 11.7273H55.8636ZM57.8636 11.7273L57.8864 11.1023L57.358 11.4375L57.2216 11.1989L57.7784 10.9091L57.2216 10.6193L57.358 10.3807L57.8864 10.7159L57.8636 10.0909H58.1364L58.1136 10.7159L58.642 10.3807L58.7784 10.6193L58.2216 10.9091L58.7784 11.1989L58.642 11.4375L58.1136 11.1023L58.1364 11.7273H57.8636ZM59.8636 11.7273L59.8864 11.1023L59.358 11.4375L59.2216 11.1989L59.7784 10.9091L59.2216 10.6193L59.358 10.3807L59.8864 10.7159L59.8636 10.0909H60.1364L60.1136 10.7159L60.642 10.3807L60.7784 10.6193L60.2216 10.9091L60.7784 11.1989L60.642 11.4375L60.1136 11.1023L60.1364 11.7273H59.8636Z" fill="white"/>
    </svg>
    `,
    content: `
    <div>
    <div class="container px-4 py-5" id="hanging-icons">
    <h2 class="pb-2 border-bottom">Features</h2>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div class="col d-flex align-items-start">
        <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <img src='' class="bi" width="100px" height="100px"><use xlink:href="#toggles2"/></img>
        </div>
        <div>
          <h3 class="fs-2 text-body-emphasis">Featured title</h3>
          <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
          <a href="#" class="btn btn-primary">
            Primary button
          </a>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <img src='' class="bi" width="100px" height="100px"><use xlink:href="#cpu-fill"/></img>
        </div>
        <div>
          <h3 class="fs-2 text-body-emphasis">Featured title</h3>
          <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
          <a href="#" class="btn btn-primary">
            Primary button
          </a>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <img src='' class="bi" width="100px" height="100px"><use xlink:href="#tools"/></img>
        </div>
        <div>
          <h3 class="fs-2 text-body-emphasis">Featured title</h3>
          <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
          <a href="#" class="btn btn-primary">
            Primary button
          </a>
        </div>
      </div>
    </div>
  </div>
  </div>
    `,
  });

  bm.add('Hero', {
    label: 'Hero',
    category: 'Bootstrap Component',
    /*
    content: `
    <div class="container col-xxl-8 px-4 py-5">
      <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div class="col-10 col-sm-8 col-lg-6">
          <img src="bootstrap-themes.png" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy">
        </div>
        <div class="col-lg-6">
          <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Responsive left-aligned hero with image</h1>
          <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start">
            <button type="button" class="btn btn-primary btn-lg px-4 me-md-2">Primary</button>
            <button type="button" class="btn btn-outline-secondary btn-lg px-4">Default</button>
          </div>
        </div>
      </div>
    </div>`,
    */
   content: {type: 'B-HERO'},
    media: `<svg width="70" height="38" viewBox="0 0 70 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="70" height="37.3333" fill="#AAAAAA"/>
    <rect x="6.06665" y="7" width="24.7333" height="23.8" fill="black"/>
    <line x1="42.4667" y1="12.0333" x2="65.8" y2="12.0333" stroke="black" stroke-width="3"/>
    <line x1="42.4667" y1="17.1667" x2="60.2" y2="17.1667" stroke="black" stroke-width="3"/>
    <line x1="42.4667" y1="23.2333" x2="54.1333" y2="23.2333" stroke="black" stroke-width="3"/>
    <rect x="15" y="16" width="7" height="6" fill="#D9D9D9"/>
    </svg>`
  });

  bm.add('Button', {
    label: 'Button',
    category: 'Bootstrap Component',
   content: {type: 'B-BUTTON'},
   attributes: {class: "fa fa-square-o"}
  });

  bm.add('Carousel', {
    label: 'Carousel',
    category: 'Bootstrap Animation',
    media: `<svg width="70" height="36" viewBox="0 0 70 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="70" height="36" fill="#AAAAAA"/>
    <circle cx="28" cy="27" r="1" fill="#D9D9D9"/>
    <circle cx="33" cy="27" r="1" fill="#D9D9D9"/>
    <circle cx="38" cy="27" r="1" fill="#D9D9D9"/>
    <path d="M20.2173 17.0696C20.0085 17.0663 19.7997 17.0265 19.5909 16.9503C19.3821 16.8741 19.1915 16.7456 19.0192 16.565C18.8468 16.3827 18.7085 16.1366 18.604 15.8267C18.4996 15.5152 18.4474 15.1241 18.4474 14.6534C18.4474 14.2027 18.4897 13.8033 18.5742 13.4553C18.6587 13.1056 18.7814 12.8114 18.9421 12.5728C19.1029 12.3325 19.2968 12.1502 19.5238 12.0259C19.7525 11.9016 20.0102 11.8395 20.2969 11.8395C20.5819 11.8395 20.8355 11.8967 21.0575 12.011C21.2813 12.1237 21.4635 12.2811 21.6044 12.4833C21.7453 12.6855 21.8364 12.9183 21.8778 13.1818H21.2713C21.215 12.9531 21.1056 12.7634 20.9432 12.6126C20.7808 12.4618 20.5653 12.3864 20.2969 12.3864C19.9025 12.3864 19.5917 12.5579 19.3647 12.9009C19.1393 13.244 19.0258 13.7254 19.0241 14.3452H19.0639C19.1567 14.2043 19.2669 14.0842 19.3945 13.9847C19.5238 13.8836 19.6663 13.8058 19.8221 13.7511C19.9779 13.6964 20.1428 13.669 20.3168 13.669C20.6084 13.669 20.8752 13.742 21.1172 13.8878C21.3591 14.032 21.553 14.2317 21.6989 14.4869C21.8447 14.7404 21.9176 15.0312 21.9176 15.3594C21.9176 15.6742 21.8472 15.9626 21.7063 16.2244C21.5655 16.4846 21.3674 16.6918 21.1122 16.8459C20.8587 16.9983 20.5604 17.0729 20.2173 17.0696ZM20.2173 16.5227C20.4261 16.5227 20.6134 16.4705 20.7791 16.3661C20.9465 16.2617 21.0782 16.1217 21.1744 15.946C21.2721 15.7704 21.321 15.5748 21.321 15.3594C21.321 15.1489 21.2738 14.9575 21.1793 14.7852C21.0865 14.6112 20.9581 14.4728 20.794 14.37C20.6316 14.2673 20.446 14.2159 20.2372 14.2159C20.0798 14.2159 19.9331 14.2474 19.7972 14.3104C19.6613 14.3717 19.542 14.4562 19.4393 14.5639C19.3382 14.6716 19.2586 14.7951 19.2006 14.9343C19.1426 15.0719 19.1136 15.2169 19.1136 15.3693C19.1136 15.5715 19.1609 15.7604 19.2553 15.9361C19.3514 16.1117 19.4824 16.2534 19.6481 16.3612C19.8155 16.4689 20.0052 16.5227 20.2173 16.5227ZM24.5557 17.0696C24.1811 17.0696 23.8621 16.9677 23.5986 16.7638C23.3351 16.5584 23.1338 16.2609 22.9946 15.8714C22.8554 15.4804 22.7858 15.008 22.7858 14.4545C22.7858 13.9044 22.8554 13.4345 22.9946 13.0451C23.1354 12.654 23.3376 12.3557 23.6011 12.1502C23.8663 11.9431 24.1845 11.8395 24.5557 11.8395C24.9269 11.8395 25.2442 11.9431 25.5077 12.1502C25.7729 12.3557 25.9751 12.654 26.1143 13.0451C26.2551 13.4345 26.3256 13.9044 26.3256 14.4545C26.3256 15.008 26.2559 15.4804 26.1167 15.8714C25.9775 16.2609 25.7762 16.5584 25.5127 16.7638C25.2492 16.9677 24.9302 17.0696 24.5557 17.0696ZM24.5557 16.5227C24.9269 16.5227 25.2152 16.3437 25.4207 15.9858C25.6262 15.6278 25.729 15.1174 25.729 14.4545C25.729 14.0137 25.6817 13.6384 25.5873 13.3285C25.4945 13.0186 25.3602 12.7824 25.1846 12.62C25.0106 12.4576 24.8009 12.3764 24.5557 12.3764C24.1878 12.3764 23.9002 12.5579 23.6931 12.9208C23.4859 13.2821 23.3824 13.7933 23.3824 14.4545C23.3824 14.8954 23.4288 15.2699 23.5216 15.5781C23.6144 15.8864 23.7478 16.1209 23.9218 16.2816C24.0974 16.4424 24.3087 16.5227 24.5557 16.5227ZM28.9307 17.0696C28.5561 17.0696 28.2371 16.9677 27.9736 16.7638C27.7101 16.5584 27.5088 16.2609 27.3696 15.8714C27.2304 15.4804 27.1608 15.008 27.1608 14.4545C27.1608 13.9044 27.2304 13.4345 27.3696 13.0451C27.5104 12.654 27.7126 12.3557 27.9761 12.1502C28.2413 11.9431 28.5595 11.8395 28.9307 11.8395C29.3019 11.8395 29.6192 11.9431 29.8827 12.1502C30.1479 12.3557 30.3501 12.654 30.4893 13.0451C30.6301 13.4345 30.7006 13.9044 30.7006 14.4545C30.7006 15.008 30.6309 15.4804 30.4917 15.8714C30.3525 16.2609 30.1512 16.5584 29.8877 16.7638C29.6242 16.9677 29.3052 17.0696 28.9307 17.0696ZM28.9307 16.5227C29.3019 16.5227 29.5902 16.3437 29.7957 15.9858C30.0012 15.6278 30.104 15.1174 30.104 14.4545C30.104 14.0137 30.0567 13.6384 29.9623 13.3285C29.8695 13.0186 29.7352 12.7824 29.5596 12.62C29.3856 12.4576 29.1759 12.3764 28.9307 12.3764C28.5628 12.3764 28.2752 12.5579 28.0681 12.9208C27.8609 13.2821 27.7574 13.7933 27.7574 14.4545C27.7574 14.8954 27.8038 15.2699 27.8966 15.5781C27.9894 15.8864 28.1228 16.1209 28.2968 16.2816C28.4724 16.4424 28.6837 16.5227 28.9307 16.5227ZM34.0017 11.9091L35.3142 14.027H35.354L36.6665 11.9091H37.3923L35.7915 14.4545L37.3923 17H36.6665L35.354 14.9219H35.3142L34.0017 17H33.2758L34.9165 14.4545L33.2758 11.9091H34.0017ZM41.7642 17.0696C41.5554 17.0663 41.3466 17.0265 41.1378 16.9503C40.929 16.8741 40.7384 16.7456 40.5661 16.565C40.3937 16.3827 40.2553 16.1366 40.1509 15.8267C40.0465 15.5152 39.9943 15.1241 39.9943 14.6534C39.9943 14.2027 40.0366 13.8033 40.1211 13.4553C40.2056 13.1056 40.3282 12.8114 40.489 12.5728C40.6497 12.3325 40.8436 12.1502 41.0707 12.0259C41.2994 11.9016 41.5571 11.8395 41.8438 11.8395C42.1288 11.8395 42.3823 11.8967 42.6044 12.011C42.8281 12.1237 43.0104 12.2811 43.1513 12.4833C43.2921 12.6855 43.3833 12.9183 43.4247 13.1818H42.8182C42.7618 12.9531 42.6525 12.7634 42.4901 12.6126C42.3277 12.4618 42.1122 12.3864 41.8438 12.3864C41.4493 12.3864 41.1386 12.5579 40.9116 12.9009C40.6862 13.244 40.5727 13.7254 40.571 14.3452H40.6108C40.7036 14.2043 40.8138 14.0842 40.9414 13.9847C41.0707 13.8836 41.2132 13.8058 41.369 13.7511C41.5247 13.6964 41.6896 13.669 41.8636 13.669C42.1553 13.669 42.4221 13.742 42.6641 13.8878C42.906 14.032 43.0999 14.2317 43.2457 14.4869C43.3916 14.7404 43.4645 15.0312 43.4645 15.3594C43.4645 15.6742 43.3941 15.9626 43.2532 16.2244C43.1123 16.4846 42.9143 16.6918 42.6591 16.8459C42.4055 16.9983 42.1072 17.0729 41.7642 17.0696ZM41.7642 16.5227C41.973 16.5227 42.1603 16.4705 42.326 16.3661C42.4934 16.2617 42.6251 16.1217 42.7212 15.946C42.819 15.7704 42.8679 15.5748 42.8679 15.3594C42.8679 15.1489 42.8207 14.9575 42.7262 14.7852C42.6334 14.6112 42.505 14.4728 42.3409 14.37C42.1785 14.2673 41.9929 14.2159 41.7841 14.2159C41.6267 14.2159 41.48 14.2474 41.3441 14.3104C41.2082 14.3717 41.0889 14.4562 40.9862 14.5639C40.8851 14.6716 40.8055 14.7951 40.7475 14.9343C40.6895 15.0719 40.6605 15.2169 40.6605 15.3693C40.6605 15.5715 40.7077 15.7604 40.8022 15.9361C40.8983 16.1117 41.0292 16.2534 41.195 16.3612C41.3623 16.4689 41.5521 16.5227 41.7642 16.5227ZM46.1025 17.0696C45.728 17.0696 45.409 16.9677 45.1455 16.7638C44.882 16.5584 44.6807 16.2609 44.5415 15.8714C44.4023 15.4804 44.3327 15.008 44.3327 14.4545C44.3327 13.9044 44.4023 13.4345 44.5415 13.0451C44.6823 12.654 44.8845 12.3557 45.148 12.1502C45.4131 11.9431 45.7313 11.8395 46.1025 11.8395C46.4738 11.8395 46.7911 11.9431 47.0546 12.1502C47.3198 12.3557 47.5219 12.654 47.6611 13.0451C47.802 13.4345 47.8724 13.9044 47.8724 14.4545C47.8724 15.008 47.8028 15.4804 47.6636 15.8714C47.5244 16.2609 47.3231 16.5584 47.0596 16.7638C46.7961 16.9677 46.4771 17.0696 46.1025 17.0696ZM46.1025 16.5227C46.4738 16.5227 46.7621 16.3437 46.9676 15.9858C47.1731 15.6278 47.2758 15.1174 47.2758 14.4545C47.2758 14.0137 47.2286 13.6384 47.1341 13.3285C47.0413 13.0186 46.9071 12.7824 46.7314 12.62C46.5574 12.4576 46.3478 12.3764 46.1025 12.3764C45.7346 12.3764 45.4471 12.5579 45.24 12.9208C45.0328 13.2821 44.9292 13.7933 44.9292 14.4545C44.9292 14.8954 44.9756 15.2699 45.0684 15.5781C45.1613 15.8864 45.2947 16.1209 45.4687 16.2816C45.6443 16.4424 45.8556 16.5227 46.1025 16.5227ZM50.4775 17.0696C50.103 17.0696 49.784 16.9677 49.5205 16.7638C49.257 16.5584 49.0557 16.2609 48.9165 15.8714C48.7773 15.4804 48.7077 15.008 48.7077 14.4545C48.7077 13.9044 48.7773 13.4345 48.9165 13.0451C49.0573 12.654 49.2595 12.3557 49.523 12.1502C49.7881 11.9431 50.1063 11.8395 50.4775 11.8395C50.8488 11.8395 51.1661 11.9431 51.4296 12.1502C51.6948 12.3557 51.8969 12.654 52.0361 13.0451C52.177 13.4345 52.2474 13.9044 52.2474 14.4545C52.2474 15.008 52.1778 15.4804 52.0386 15.8714C51.8994 16.2609 51.6981 16.5584 51.4346 16.7638C51.1711 16.9677 50.8521 17.0696 50.4775 17.0696ZM50.4775 16.5227C50.8488 16.5227 51.1371 16.3437 51.3426 15.9858C51.5481 15.6278 51.6508 15.1174 51.6508 14.4545C51.6508 14.0137 51.6036 13.6384 51.5091 13.3285C51.4163 13.0186 51.2821 12.7824 51.1064 12.62C50.9324 12.4576 50.7228 12.3764 50.4775 12.3764C50.1096 12.3764 49.8221 12.5579 49.615 12.9208C49.4078 13.2821 49.3042 13.7933 49.3042 14.4545C49.3042 14.8954 49.3506 15.2699 49.4434 15.5781C49.5363 15.8864 49.6697 16.1209 49.8437 16.2816C50.0193 16.4424 50.2306 16.5227 50.4775 16.5227Z" fill="black"/>
    </svg>`,
    content: `
    <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://fakeimg.pl/1024x400/141111/141111" class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></img>
        <div class="container">
          <div class="carousel-caption text-start">
            <h1>Example headline.</h1>
            <p class="opacity-75">Some representative placeholder content for the first slide of the carousel.</p>
            <p><a class="btn btn-lg btn-primary" href="#">Sign up today</a></p>
          </div>
        </div>
      </div>
      <div class="carousel-item">
      <img src="https://fakeimg.pl/1024x400/141111/141111" class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></img>
      <div class="container">
        <div class="carousel-caption text-start">
          <h1>Example headline.</h1>
          <p class="opacity-75">Some representative placeholder content for the first slide of the carousel.</p>
          <p><a class="btn btn-lg btn-primary" href="#">Sign up today</a></p>
        </div>
      </div>
      </div>
      <div class="carousel-item">
      <img src="https://fakeimg.pl/1024x400/141111/141111" class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></img>
      <div class="container">
        <div class="carousel-caption text-start">
          <h1>Example headline.</h1>
          <p class="opacity-75">Some representative placeholder content for the first slide of the carousel.</p>
          <p><a class="btn btn-lg btn-primary" href="#">Sign up today</a></p>
        </div>
      </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  <style>
    /* CUSTOMIZE THE CAROUSEL
    -------------------------------------------------- */

    /* Carousel base class */
    .carousel {
      margin-bottom: 4rem;
    }
    /* Since positioning the image, we need to help out the caption */
    .carousel-caption {
      bottom: 3rem;
      z-index: 10;
    }

    /* Declare heights because of positioning of img element */
    .carousel-item {
      height: 32rem;
    }
  </style>
    `
  });
}
