riot.tag2('app', '<page01 class="page {this.hide(\'page01\')}"></page01> <page02 class="page {this.hide(\'page02\')}"></page02> <page03 class="page {this.hide(\'page03\')}"></page03> <menu></menu>', 'app > .page.hide { display: none; }', '', function(opts) {
     this.hide = (code)=>{
         let pages = STORE.state().get('pages');
         return pages[code].active ? '' : 'hide'
     };

     STORE.subscribe((action)=>{
         if(action.type=='MOVE-PAGE')
             this.update();
     });

     this.on('mount', function () {
         Metronome.start();

         if (location.hash=='')
             location.hash='#page01'
     });

     window.addEventListener('resize', (event) => {
         this.update();
     });
});

riot.tag2('class-list', '<table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <td>package</td> <td>name</td> <td>description</td> </tr> </thead> <tbody> <tr each="{opts.data}"> <td>{package}</td> <td><a href="#classes/{name}">{name}</a></td> <td>{description}</td> </tr> </tbody> </table>', '', '', function(opts) {
});

riot.tag2('pool', '<section-3 title="Class: ????"> <h2 class="subtitle"> </h2> </section-3> <section-3 title="Description"> <h2 class="subtitle"></h2> <div class="contents"> </div> </section-3> <section-3 title="Slots"> <h2 class="subtitle"></h2> <div class="contents"> <table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <th>Name</th> <th>Type</th> <th>Description</th> </tr> </thead> <tbody> <tr> <th></th> <td></td> <td></td> </tr> </tbody> </table> </div> </section-3>', '', '', function(opts) {
});

riot.tag2('menu', '<div class="menu-item {active(\'page03\')}" code="page03" onclick="{click}">03</div> <div class="menu-item {active(\'page02\')}" code="page02" onclick="{click}">02</div> <div class="menu-item {active(\'page01\')}" code="page01" onclick="{click}">01</div>', 'menu { position: fixed; right: 11px; bottom: 11px; } menu > .menu-item { float: right; margin-left: 11px; border-radius: 55px; width: 55px; height: 55px; background: rgba(255, 255, 255, 0.9); z-index: 99999999; text-align: center; padding-top: 12px; border: 3px solid rgb(238, 238, 238); box-shadow: 0 0 8px gray; } menu > .menu-item.active { background: rgba(236, 109, 113, 0.9); color: #ffffff; border: 3px solid rgba(236, 109, 113); }', '', function(opts) {
     this.active = (code) => {
         let page = STORE.state().get('pages')[code];
         return page.active ? 'active' : '';
     };
     this.click = (e) => {
         let target = e.target;
         let hash = '#' + target.getAttribute('CODE');

         if (hash!=location.hash)
             location.hash = hash;
     };
});

riot.tag2('section-3', '<section class="section"> <div class="container"> <h1 class="title is-3">{opts.title}</h1> <yield></yield> </div> </section>', '', '', function(opts) {
});

riot.tag2('section-4', '<section class="section"> <div class="container"> <h1 class="title is-4">{opts.title}</h1> <yield></yield> </div> </section>', 'section-4 section4 > section.section,[data-is="section-4"] section4 > section.section{ padding: 1rem 1.5rem; }', '', function(opts) {
});

riot.tag2('section-footer', '<footer class="footer"> <div class="container"> <div class="content has-text-centered"> Footer ........ </div> </div> </footer>', 'section-footer > footer.footer{ background: #eeeeee; }', '', function(opts) {
});

riot.tag2('section-header', '<section class="section"> <div class="container"> <h1 class="title is-2">{opts.title}</h1> <yield></yield> </div> </section>', 'section-header > section.section{ background: #eeeeee; }', '', function(opts) {
});

riot.tag2('deserialize-sexp', '<section-3 title="Function: DESERIALIZE-SEXP"> </section-3>', '', '', function(opts) {
});

riot.tag2('deserialize-xml', '<section-3 title="Function: DESERIALIZE-XML"> </section-3>', '', '', function(opts) {
});

riot.tag2('make-serialization-state', '<section-3 title="Function: MAKE-SERIALIZATION-STATE"> </section-3>', '', '', function(opts) {
});

riot.tag2('operator-list', '<table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <td></td> <td>Type</td> <td>Name</td> <td>Description</td> <td>File</td> </tr> </thead> <tbody> <tr each="{data()}"> <td riot-style="{exportStyle(export)}"></td> <td>{type}</td> <td><a href="#page03/{name}">{name.toUpperCase()}</a></td> <td>{description}</td> <td>{file}</td> </tr> </tbody> </table>', '', '', function(opts) {
     this.data = ()=>{
         return opts.data.sort((a,b)=>{
             return a.name > b.name ? 1 : -1;
         });
     };
     this.exportStyle = (value)=>{
         return value ? 'background:#d8e698;' : '';
     };
});

riot.tag2('operators-matrix1', '<table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> </tr> </thead> <tbody> <tr> </tr> </tbody> </table>', '', '', function(opts) {
});

riot.tag2('operators-root', '<section-3 title="Description"> <h2 class="subtitle"></h2> <div class="contents"> <p>(たぶん)オペレータは以下の三つに分類できます。</p> <p>(1) シリアライズ</p> <p>(2) デシリアライズ</p> <p>(3) ステート</p> </div> </section-3> <section-3 title="List" data="{operators()}"> <h2 class="subtitle">オペレータの一覧です。</h2> <div class="contents"> <operator-list data="{opts.data}"></operator-list> </div> </section-3>', '', '', function(opts) {
     this.operators = ()=>{
         let operators = STORE.state().get('operators');
         let targets = []
         for (var i in operators)
             if (operators[i].display)
                 targets.push(operators[i]);
         return targets;
     };
});

riot.tag2('reset-known-slots', '<section-3 title="Generic Function: RESET-KNOWN-SLOTS"> </section-3>', '', '', function(opts) {
});

riot.tag2('serializable-slots', '<section-3 title="Generic Function: SERIALIZABLE-SLOTS"> <div class="contents"> <pre>serializable-slots object</pre> </div> <section-4 title="Description"> <div class="contents"> </div> </section-4> <section-4 title="Methods"> <div class="contents"> <table class="table"> <thead> <tr> <th>Object</th> </tr> </thead> <tbody> <tr><td>structure-object</td></tr> <tr><td>standard-object</td></tr> </tbody> </table> </div> </section-4> </section-3>', '', '', function(opts) {
});

riot.tag2('serialize-sexp-internal', '<section-3 title="Generic Function: SERIALIZE-SEXP-INTERNAL"> <div class="contents"> <pre>serialize-xml-internal object stream serialization-state</pre> </div> <section-4 title="Description"> <div class="contents"> </div> </section-4> <section-4 title="Methods"> <div class="contents"> <table class="table"> <thead> <tr> <th>Object</th> <th>stream</th> <th>serialization-state</th> </tr> </thead> <tbody> <tr><td>null</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>(eql \'t)</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>string</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>character</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>symbol</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>sequence</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>hash-table</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>structure-object</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>standard-object</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>number</td> <td>stream</td> <td>serialize-sexp-internal</td></tr> </tbody> </table> </div> </section-4> </section-3>', '', '', function(opts) {
});

riot.tag2('serialize-sexp', '<section-3 title="Function: SERIALIZE-SEXP"> </section-3>', '', '', function(opts) {
});

riot.tag2('serialize-xml-internal', '<section-3 title="Generic Function: SERIALIZE-XML-INTERNAL"> <div class="contents"> <pre>serialize-xml-internal object stream serialization-state</pre> </div> <section-4 title="Description"> <div class="contents"> <p>object を文字列に変換します。</p> <p>文字列に変換したものを stream に出力します。</p> </div> </section-4> <section-4 title="Methods"> <div class="contents"> <table class="table"> <thead> <tr> <th>Object</th> <th>stream</th> <th>serialization-state</th> </tr> </thead> <tbody> <tr><td>integer</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>ratio</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>float</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>complex</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>null</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>(eql \'t)</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>string</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>character</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>symbol</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>sequence</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>hash-table</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>structure-object</td> <td>stream</td> <td>serialization-state</td></tr> <tr><td>standard-object</td> <td>stream</td> <td>serialization-state</td></tr> </tbody> </table> </div> </section-4> </section-3>', '', '', function(opts) {
});

riot.tag2('serialize-xml', '<section-3 title="Function: SERIALIZE-XML"> <div class="contents"> <pre>serialize-xml object stream &optional serialization-state (make-serialization-state)</pre> </div> <section-4 title="Description"> <div class="contents"> <p>serialize-xml-internal をコールして object を文字列に変換します。</p> <p>文字列に変換したものを stream に出力します。</p> </div> </section-4> </section-3>', '', '', function(opts) {
});

riot.tag2('page01', '<section-header title="S-SERIALIZATION"> <h2 class="subtitle"> </h2> </section-header> <section class="section"> <div class="container"> <h1 class="title">Section</h1> <h2 class="subtitle">subtitle ........</h2> </div> </section> <section-footer></section-footer>', '', '', function(opts) {
});

riot.tag2('page02', '<section-header title="CLASSES"> <h2 class="subtitle"> </h2> </section-header> <section-3 title="Class List" data="{classes()}"> <h2 class="subtitle">クラスの一覧</h2> <div class="contents"> <class-list data="{this.opts.data}"></class-list> </div> </section-3> <section-3 title="クラス図"> <h2 class="subtitle"></h2> <div class="contents"> <class-diagram> </class-diagram> </div> </section-3> <section-footer></section-footer>', '', '', function(opts) {
     this.classes = ()=>{
         return STORE.state().get('classes');
     };
});

riot.tag2('page03', '<section-header title="OPERATORS" subtitle-hide="{headerSubtitleHide()}" breadcrumb-hide="{headerBreadcrumbHide()}" section-code="{sectionCode()}"> <h2 class="subtitle"> <p class="{opts.subtitleHide}"> オペレータのマニュアルです。 </p> <nav class="breadcrumb {opts.breadcrumbHide}" aria-label="breadcrumbs"> <ul> <li><a href="#page03">operators > </a></li> <li class="is-active"><a href="#" aria-current="page">{opts.sectionCode}</a></li> </ul> </nav> </h2> </section-header> <operators-root type="page-section" class="hide"></operators-root> <deserialize-sexp type="page-section" class="hide"></deserialize-sexp> <deserialize-xml type="page-section" class="hide"></deserialize-xml> <make-serialization-state type="page-section" class="hide"></make-serialization-state> <reset-known-slots type="page-section" class="hide"></reset-known-slots> <serializable-slots type="page-section" class="hide"></serializable-slots> <serialize-sexp type="page-section" class="hide"></serialize-sexp> <serialize-sexp-internal type="page-section" class="hide"></serialize-sexp-internal> <serialize-xml type="page-section" class="hide"></serialize-xml> <serialize-xml-internal type="page-section" class="hide"></serialize-xml-internal> <section-footer type="page-section" class="hide"></section-footer> <section-footer></section-footer>', 'page03 .hide { display:none; }', '', function(opts) {
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
});
