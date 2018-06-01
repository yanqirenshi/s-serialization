<page03>
    <section-header title="OPERATORS"
                    subtitle-hide={headerSubtitleHide()}
                    breadcrumb-hide={headerBreadcrumbHide()}
                    section-code={sectionCode()}>
        <h2 class="subtitle">
            <p class="{opts.subtitleHide}">
                オペレータのマニュアルです。
            </p>
            <nav class="breadcrumb {opts.breadcrumbHide}" aria-label="breadcrumbs">
                <ul>
                    <li><a href="#page03">operators > </a></li>
                    <li class="is-active">
                        <a href="#" aria-current="page">{opts.sectionCode}</a>
                    </li>
                </ul>
            </nav>
        </h2>
    </section-header>

    <operators-root type="page-section" class="hide"></operators-root>
    <deserialize-sexp type="page-section" class="hide"></deserialize-sexp>
    <deserialize-xml type="page-section" class="hide"></deserialize-xml>
    <make-serialization-state type="page-section" class="hide"></make-serialization-state>
    <reset-known-slots type="page-section" class="hide"></reset-known-slots>
    <serializable-slots type="page-section" class="hide"></serializable-slots>
    <serialize-sexp type="page-section" class="hide"></serialize-sexp>
    <serialize-sexp-internal type="page-section" class="hide"></serialize-sexp-internal>
    <serialize-xml type="page-section" class="hide"></serialize-xml>
    <serialize-xml-internal type="page-section" class="hide"></serialize-xml-internal>
    <section-footer type="page-section" class="hide"></section-footer>

    <section-footer></section-footer>

    <style>
     page03 .hide { display:none; }
    </style>

    <script>
     this.headerSubtitleHide = ()=> {
         let state = STORE.state().get('pages').page03;
         return state.section=='root' ? '' : 'hide';
     }
     this.headerBreadcrumbHide = ()=> {
         let state = STORE.state().get('pages').page03;
         return state.section=='root' ? 'hide' : '';
     }
     this.sectionCode = ()=> {
         let state = STORE.state().get('pages').page03;
         return state.section=='root' ? '' : state.section;
     }
     this.on('update', ()=>{
         let state = STORE.state().get('pages').page03;
         let section = state.section=='root' ? 'operators-root' : state.section;
         let tags = this.tags;

         for (var k in tags) {
             let tag = tags[k];
             if (tag.opts && tag.opts.type && tag.opts.type=='page-section') {
                 let element = tag.root;
                 let classes = element.getAttribute('class');
                 element.setAttribute('class', (k==section ? '' : 'hide'))
             }
         }
     });
    </script>
</page03>
