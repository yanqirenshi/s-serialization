riot.tag2('app', '<menu-bar brand="{{label:\'RT\'}}" site="{site()}" moves="{[]}"></menu-bar> <div ref="page-area"></div>', 'app > .page { width: 100vw; height: 100vh; display: block; } app .hide,[data-is="app"] .hide{ display: none; }', '', function(opts) {
     this.site = () => {
         return STORE.state().get('site');
     };

     STORE.subscribe((action)=>{
         if (action.type!='MOVE-PAGE')
             return;

         let tags= this.tags;

         tags['menu-bar'].update();
         ROUTER.switchPage(this, this.refs['page-area'], this.site());
     })

     window.addEventListener('resize', (event) => {
         this.update();
     });

     if (location.hash=='')
         location.hash='#page01'
});

riot.tag2('class-list', '<table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <td>package</td> <td>name</td> <td>description</td> </tr> </thead> <tbody> <tr each="{opts.data}"> <td>{package}</td> <td><a href="#classes/{name}">{name}</a></td> <td>{description}</td> </tr> </tbody> </table>', '', '', function(opts) {
});

riot.tag2('pool', '<section-3 title="Class: ????"> <h2 class="subtitle"> </h2> </section-3> <section-3 title="Description"> <h2 class="subtitle"></h2> <div class="contents"> </div> </section-3> <section-3 title="Slots"> <h2 class="subtitle"></h2> <div class="contents"> <table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <th>Name</th> <th>Type</th> <th>Description</th> </tr> </thead> <tbody> <tr> <th></th> <td></td> <td></td> </tr> </tbody> </table> </div> </section-3>', '', '', function(opts) {
});

riot.tag2('serialization-state', '<section-header-with-breadcrumb title="Class: SERIALIZATION-STATE"></section-header-with-breadcrumb> <section-container title="Description"> <section-contents> </section-contents> </section-container> <section-container title="Slots"> <section-contents> <table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <th>Name</th> <th>Type</th> <th>Description</th> </tr> </thead> <tbody> <tr> <th>xml-parser-state</th> <td></td> <td></td> </tr> <tr> <th>counter</th> <td>integer</td> <td></td> </tr> <tr> <th>hashtable</th> <td>hash-table</td> <td></td> </tr> <tr> <th>known-slots</th> <td>hash-table</td> <td></td> </tr> </tbody> </table> </section-contents> </section-container>', '', '', function(opts) {
});

riot.tag2('menu-bar', '<aside class="menu"> <p ref="brand" class="menu-label" onclick="{clickBrand}"> {opts.brand.label} </p> <ul class="menu-list"> <li each="{opts.site.pages}"> <a class="{opts.site.active_page==code ? \'is-active\' : \'\'}" href="{\'#\' + code}"> {menu_label} </a> </li> </ul> </aside> <div class="move-page-menu hide" ref="move-panel"> <p each="{moves()}"> <a href="{href}">{label}</a> </p> </div>', 'menu-bar .move-page-menu { z-index: 666665; background: #fdeff2; position: fixed; left: 55px; top: 0px; min-width: 111px; height: 100vh; box-shadow: 2px 0px 8px 0px #e0e0e0; padding: 22px 55px 22px 22px; } menu-bar .move-page-menu.hide { display: none; } menu-bar .move-page-menu > p { margin-bottom: 11px; } menu-bar > .menu { z-index: 666666; height: 100vh; width: 55px; padding: 11px 0px 11px 11px; position: fixed; left: 0px; top: 0px; background: #e198b4; } menu-bar .menu-label, menu-bar .menu-list a { padding: 0; width: 33px; height: 33px; text-align: center; margin-top: 8px; border-radius: 3px; background: none; color: #ffffff; font-weight: bold; padding-top: 7px; font-size: 14px; } menu-bar .menu-label,[data-is="menu-bar"] .menu-label{ background: #fdeff2; color: #e198b4; } menu-bar .menu-label.open,[data-is="menu-bar"] .menu-label.open{ background: #fdeff2; color: #e198b4; width: 44px; border-radius: 3px 0px 0px 3px; text-shadow: 0px 0px 1px #eee; padding-right: 11px; } menu-bar .menu-list a.is-active { width: 44px; padding-right: 11px; border-radius: 3px 0px 0px 3px; background: #ffffff; color: #333333; }', '', function(opts) {
     this.moves = () => {
         let moves = [
             { code: 'RBP',    href: '/rb/rbp/',    label: 'RBP: RUN PASSPORT' },
             { code: 'RBR',    href: '/rb/rbr/',    label: 'RBR: TATTA' },
             { code: 'GEMS',   href: '/rb/gems/',   label: 'Ruby Gems' },
             { code: 'RUBY',   href: '/rb/Ruby/',   label: 'Ruby' },
             { code: 'GITLAB', href: '/rb/gitlab/', label: 'Gitlab' },
             { code: 'SCRUM',  href: '/rb/Scrum/',  label: 'Scrum' },
             { code: 'HELP',   href: '/rb/help/',   label: 'Help' }
         ]
         return moves.filter((d)=>{
             return d.code != this.opts.current;
         });
     };

     this.brandStatus = (status) => {
         let brand = this.refs['brand'];
         let classes = brand.getAttribute('class').trim().split(' ');

         if (status=='open') {
             if (classes.find((d)=>{ return d!='open'; }))
                 classes.push('open')
         } else {
             if (classes.find((d)=>{ return d=='open'; }))
                 classes = classes.filter((d)=>{ return d!='open'; });
         }
         brand.setAttribute('class', classes.join(' '));
     }

     this.clickBrand = () => {
         let panel = this.refs['move-panel'];
         let classes = panel.getAttribute('class').trim().split(' ');

         if (classes.find((d)=>{ return d=='hide'; })) {
             classes = classes.filter((d)=>{ return d!='hide'; });
             this.brandStatus('open');
         } else {
             classes.push('hide');
             this.brandStatus('close');
         }
         panel.setAttribute('class', classes.join(' '));
     };
});

riot.tag2('section-breadcrumb', '<section-container data="{path()}"> <nav class="breadcrumb" aria-label="breadcrumbs"> <ul> <li each="{opts.data}"> <a class="{active ? \'is-active\' : \'\'}" href="{href}" aria-current="page">{label}</a> </li> </ul> </nav> </section-container>', 'section-breadcrumb section-container > .section,[data-is="section-breadcrumb"] section-container > .section{ padding-top: 3px; }', '', function(opts) {
     this.path = () => {
         let hash = location.hash;
         let path = hash.split('/');

         if (path[0] && path[0].substr(0,1)=='#')
             path[0] = path[0].substr(1);

         let out = [];
         let len = path.length;
         let href = null;
         for (var i in path) {
             href = href ? href + '/' + path[i] : '#' + path[i];

             if (i==len-1)
                 out.push({
                     label: path[i],
                     href: hash,
                     active: true
                 });

             else
                 out.push({
                     label: path[i],
                     href: href,
                     active: false
                 });
         }
         return out;
     }
});

riot.tag2('section-container', '<section class="section"> <div class="container"> <h1 class="title is-{opts.no ? opts.no : 3}"> {opts.title} </h1> <h2 class="subtitle">{opts.subtitle}</h2> <yield></yield> </div> </section>', '', '', function(opts) {
});

riot.tag2('section-contents', '<section class="section"> <div class="container"> <h1 class="title is-{opts.no ? opts.no : 3}"> {opts.title} </h1> <h2 class="subtitle">{opts.subtitle}</h2> <div class="contents"> <yield></yield> </div> </div> </section>', 'section-contents > section.section { padding: 0.0rem 1.5rem 2.0rem 1.5rem; }', '', function(opts) {
});

riot.tag2('section-footer', '<footer class="footer"> <div class="container"> <div class="content has-text-centered"> <p> </p> </div> </div> </footer>', 'section-footer > .footer { padding-top: 13px; padding-bottom: 13px; height: 66px; background: #fef4f4; opacity: 0.7; }', '', function(opts) {
});

riot.tag2('section-header-with-breadcrumb', '<section-header title="{opts.title}"></section-header> <section-breadcrumb></section-breadcrumb>', 'section-header-with-breadcrumb section-header > .section,[data-is="section-header-with-breadcrumb"] section-header > .section{ margin-bottom: 3px; }', '', function(opts) {
});

riot.tag2('section-header', '<section class="section"> <div class="container"> <h1 class="title is-{opts.no ? opts.no : 3}"> {opts.title} </h1> <h2 class="subtitle">{opts.subtitle}</h2> <yield></yield> </div> </section>', 'section-header > .section { padding-top: 13px; padding-bottom: 13px; height: 66px; background: #fef4f4; margin-bottom: 33px; }', '', function(opts) {
});

riot.tag2('section-list', '<table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <th>機能</th> <th>概要</th> </tr> </thead> <tbody> <tr each="{data()}"> <td><a href="{hash}">{title}</a></td> <td>{description}</td> </tr> </tbody> </table>', '', '', function(opts) {
     this.data = () => {
         return opts.data.filter((d) => {
             if (d.code=='root') return false;

             let len = d.code.length;
             let suffix = d.code.substr(len-5);
             if (suffix=='_root' || suffix=='-root')
                 return false;

             return true;
         });
     };
});

riot.tag2('sections-list', '<table class="table"> <tbody> <tr each="{opts.data}"> <td><a href="{hash}">{title}</a></td> </tr> </tbody> </table>', '', '', function(opts) {
});

riot.tag2('core-operator-list', '<table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <th>Type</th> <th>Action</th> <th>Root</th> <th>Internal</th> </thead> <tbody> <tr> <th rowspan="2">sexp</th> <th>serialize</th> <td><serialize-sexp-a></serialize-sexp-a></td> <td><serialize-sexp-internal-a></serialize-sexp-internal-a></td> </tr> <tr> <th>deserialize</th> <td><deserialize-sexp-a></deserialize-sexp-a></td> <td><deserialize-sexp-internal></deserialize-sexp-internal></td> </tr> <tr> <th rowspan="2">xml</th> <th>serialize</th> <td><serialize-xml-a></serialize-xml-a></td> <td><serialize-xml-internal-a></serialize-xml-internal-a></td> </tr> <tr> <th>deserialize</th> <td><deserialize-xml-a></deserialize-xml-a></td> <td>--</td> </tr> </tbody> </table>', '', '', function(opts) {
});

riot.tag2('deserialize-sexp-a', '<a href="#page05/deserialize-sexp">DESERIALIZE-SEXP</a>', '', '', function(opts) {
});

riot.tag2('deserialize-sexp-internal', '<a href="#page05/deserialize-sexp-internal">DESERIALIZE-SEXP-INTERNAL</a>', '', '', function(opts) {
});

riot.tag2('deserialize-sexp', '<section-header-with-breadcrumb title="Function: DESERIALIZE-SEXP"></section-header-with-breadcrumb>', '', '', function(opts) {
});

riot.tag2('deserialize-xml-a', '<a href="#page05/deserialize-xml">DESERIALIZE-XML</a>', '', '', function(opts) {
});

riot.tag2('deserialize-xml-internal-a', '<a href="#page05/deserialize-xml-internal">DESERIALIZE-XML-INTERNAL</a>', '', '', function(opts) {
});

riot.tag2('deserialize-xml', '<section-header-with-breadcrumb title="Function: DESERIALIZE-XML"></section-header-with-breadcrumb> <section-container title="コール・スタック"> <section-contents> <div class="contents"> <p> <pre>\ndeserialize-xml\n   |\n   `--- get-xml-parser-state\n           |\n           `---> s-xml:xml-parser-state\n                    |\n                    +---> deserialize-xml-text\n                    |\n                    +---> deserialize-xml-new-element --> deserialize-xml-new-element-aux\n                    |\n                    `---> deserialize-xml-finish-element --> deserialize-xml-finish-element-aux\n                    </pre> </p> </div> </section-contents> </section-container>', '', '', function(opts) {
});

riot.tag2('get-xml-parser-state', '<section-header-with-breadcrumb title="Generic Function: GET-XML-PARSER-STATE"></section-header-with-breadcrumb>', '', '', function(opts) {
});

riot.tag2('known-object-id', '<section-header-with-breadcrumb title="Generic Function: KNOWN-OBJECT-ID"></section-header-with-breadcrumb>', '', '', function(opts) {
});

riot.tag2('make-serialization-state', '<section-header-with-breadcrumb title="Function: MAKE-SERIALIZATION-STATE"></section-header-with-breadcrumb>', '', '', function(opts) {
});

riot.tag2('operator-list', '<table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <td></td> <td>Type</td> <td>Name</td> <td>Description</td> <td>File</td> </tr> </thead> <tbody> <tr each="{data()}"> <td riot-style="{exportStyle(export)}"></td> <td>{type}</td> <td><a href="#page05/{name}">{name.toUpperCase()}</a></td> <td>{description}</td> <td>{file}</td> </tr> </tbody> </table>', '', '', function(opts) {
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

riot.tag2('operators-root', '<section-container title="Description"> <section-contents> <h2 class="subtitle"></h2> <div class="contents"> <p>(たぶん)オペレータは以下の三つに分類できます。</p> <p>(1) シリアライズ</p> <p>(2) デシリアライズ</p> <p>(3) ステート</p> </div> </section-contents> </section-container> <section-container title="オペレータ"> <section-contents> <p> XMLのデシリアライズの internal が存在しません。<br> 制作途中で事切れたのでしょうか。 </p> <core-operator-list></core-operator-list> </section-contents> </section-container> <section-container title="Dictionaries" data="{operators()}"> <section-contents data="{opts.data}"> <operator-list data="{opts.data}"></operator-list> </section-contents> </section-container>', '', '', function(opts) {
     this.operators = ()=>{
         let operators = STORE.state().get('operators');
         let targets = []

         for (var i in operators)

             targets.push(operators[i]);

         return targets;
     };
});

riot.tag2('reset-known-slots', '<section-header-with-breadcrumb title="Generic Function: RESET-KNOWN-SLOTS"></section-header-with-breadcrumb>', '', '', function(opts) {
});

riot.tag2('reset', '<section-header-with-breadcrumb title="Generic Function: RESET"></section-header-with-breadcrumb>', '', '', function(opts) {
});

riot.tag2('serializable-slots', '<section-header-with-breadcrumb title="Generic Function: SERIALIZABLE-SLOTS"></section-header-with-breadcrumb> <section-container> <section-contents> <pre>serializable-slots object</pre> </section-contents> </section-container> <section-container title="Description"> <section-contents> <pre>serializable-slots object</pre> </section-contents> </section-container> <section-container title="Methods"> <section-contents> <table class="table"> <thead> <tr> <th>Object</th> </tr> </thead> <tbody> <tr><td>structure-object</td></tr> <tr><td>standard-object</td></tr> </tbody> </table> </section-contents> </section-container>', '', '', function(opts) {
});

riot.tag2('serialize-sexp-a', '<a href="#page05/serialize-sexp">SERIALIZE-SEXP</a>', '', '', function(opts) {
});

riot.tag2('serialize-sexp-internal-a', '<a href="#page05/serialize-sexp-internal">SERIALIZE-SEXP-INTERNAL</a>', '', '', function(opts) {
});

riot.tag2('serialize-sexp-internal', '<section-header-with-breadcrumb title="Generic Function: SERIALIZE-SEXP-INTERNAL"></section-header-with-breadcrumb> <section-container title="Syntax"> <section-contents> <pre>serialize-xml-internal object stream serialization-state</pre> </section-contents> </section-container> <section-container title="Description"> </section-container> <section-container title="Methods"> <section-contents> <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"> <thead> <tr> <th colspan="3">Arguments</th> <th rowspan="2">Description</th> </tr> <tr> <th>Object</th> <th>stream</th> <th>serialization-state</th> </tr> </thead> <tbody> <tr><td>null</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>(eql \'t)</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>string</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>character</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>symbol</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>sequence</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>hash-table</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>structure-object</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>standard-object</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>number</td> <td>stream</td> <td>serialize-sexp-internal</td> <td></td></tr> </tbody> </table> </section-contents> </section-container>', '', '', function(opts) {
});

riot.tag2('serialize-sexp', '<section-header-with-breadcrumb title="Function: SERIALIZE-SEXP"></section-header-with-breadcrumb> <section-container title="Syntax"> <section-contents> <pre>serialize-sexp object stream &optional serialization-state</pre> </section-contents> </section-container> <section-container title="Description"> <section-contents> <p><a href="#page05/serialize-sexp-internal">serialize-sexp-internal</a> をコールして object をS式(文字列)に変換します。</p> <p>文字列に変換したものを stream に出力します。</p> sexp は<a href="https://www.emacswiki.org/emacs/Sexp#sexp">S式</a>のことです。 </section-contents> </section-container> <section-container title="Arguments"> <section-contents> <table class="table"> <thead> <tr> <th>Name</th> <th>Description</th> </tr> </thead> <tbody> <tr> <th>object</th> <td></td> </tr> <tr> <th>stream</th> <td></td> </tr> <tr> <th>serialization-state</th> <td>初期値: (make-serialization-state)</td> </tr> </tbody> </table> </section-contents> </section-container>', '', '', function(opts) {
});

riot.tag2('serialize-type-matrix', '<table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <th colspan="3">Sexp</th> <th colspan="2">Xml</th> </tr> <tr> <th>type</ty> <th>keyword</ty> <th>value</ty> <th>type</ty> <th>tag</ty> </tr> </thead> <tbody> <tr> <th>null</th> <td>---</td> <td>"NIL"</td> <th>null</th> <td>&lt;NULL/&gt;</td> </tr> <tr> <th>t</th> <td>---</td> <td>"T"</td> <th>t</th> <td>&lt;TRUE/&gt;</td> </tr> <tr> <th>symbol</th> <td>---</td> <td>print-symbol</td> <th>symbol</th> <td>&lt;SYMBOL&gt;</td> </tr> <tr> <th>character</th> <td>---</td> <td>prin1</td> <th>character</th> <td>&lt;CHARACTER&gt; </td> </tr> <tr> <th>string</th> <td>---</td> <td>prin1</td> <th>string</th> <td>&lt;STRING&gt;</td> </tr> <tr> <th rowspan="4">number</th> <td rowspan="4">---</td> <td rowspan="4">prin1</td> <th>complex</th> <td>&lt;COMPLEX&gt;</td> </tr> <tr> <th>float</th> <td>&lt;FLOAT&gt;</td> </tr> <tr> <th>integer</th> <td>&lt;INT&gt;</td> </tr> <tr> <th>ratio</th> <td>&lt;RATIO&gt;</td> </tr> <tr> <th>hash-table</th> <td>:HASH-TABLE</td> <td></td> <th>hash-table</th> <td>&lt;HASH-TABLE&gt;</td> </tr> <tr> <th>sequence</th> <td>:SEQUENCE</td> <td></td> <th>sequence</th> <td>&lt;SEQUENCE&gt;</td> </tr> <tr> <th>standard-object</th> <td>:OBJECT</td> <td></td> <th>standard-object</th> <td>&lt;OBJECT&gt;</td> </tr> <tr> <th>structure-object</th> <td>:STRUCT</td> <td></td> <th>structure-object</th> <td>&lt;STRUCT&gt;</td> </tr> </tbody> </table>', '', '', function(opts) {
});

riot.tag2('serialize-xml-a', '<a href="#page05/serialize-xml">SERIALIZE-XML</a>', '', '', function(opts) {
});

riot.tag2('serialize-xml-internal-a', '<a href="#page05/serialize-xml-internal">SERIALIZE-XML-INTERNAL</a>', '', '', function(opts) {
});

riot.tag2('serialize-xml-internal', '<section-header-with-breadcrumb title="Generic Function: SERIALIZE-XML-INTERNAL"></section-header-with-breadcrumb> <section-container title="Syntax"> <section-contents> <pre>serialize-xml-internal object stream serialization-state</pre> </section-contents> </section-container> <section-container title="Description"> <section-contents> <p>object を文字列に変換します。</p> <p>文字列に変換したものを stream に出力します。</p> </section-contents> </section-container> <section-container title="Method"> <section-contents> <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"> <thead> <tr> <th colspan="3">Arguments</th> <th rowspan="2">description</th> </tr> <tr> <th>Object</th> <th>stream</th> <th>serialization-state</th> </tr> </thead> <tbody> <tr><td>integer</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>ratio</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>float</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>complex</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>null</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>(eql \'t)</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>string</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>character</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>symbol</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>sequence</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>hash-table</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>structure-object</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>standard-object</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> </tbody> </table> </section-contents> </section-container>', '', '', function(opts) {
});

riot.tag2('serialize-xml', '<section-header-with-breadcrumb title="Function: SERIALIZE-XML"></section-header-with-breadcrumb> <section-container title="Syntax"> <section-contents> <pre>serialize-xml object stream &optional serialization-state</pre> </section-contents> </section-container> <section-container title="Description"> <section-contents> <p><a href="#page05/serialize-xml-internal">serialize-xml-internal</a> をコールして object をXML(文字列)に変換します。</p> <p>文字列に変換したものを stream に出力します。</p> </section-contents> </section-container> <section-container title="Arguments"> <section-contents> <table class="table"> <thead> <tr> <th>Name</th> <th>Description</th> </tr> </thead> <tbody> <tr> <th>object</th> <td></td> </tr> <tr> <th>stream</th> <td></td> </tr> <tr> <th>serialization-state</th> <td>初期値: (make-serialization-state)</td> </tr> </tbody> </table> </section-contents> </section-container>', '', '', function(opts) {
});

riot.tag2('set-known-object', '<section-header-with-breadcrumb title="Generic Function: SET-KNOWN-OBJECT"></section-header-with-breadcrumb>', '', '', function(opts) {
});

riot.tag2('page01', '', '', '', function(opts) {
     this.mixin(MIXINS.page);

     this.on('mount', () => { this.draw(); });
     this.on('update', () => { this.draw(); });
});

riot.tag2('page02', '', '', '', function(opts) {
     this.mixin(MIXINS.page);

     this.on('mount', () => { this.draw(); });
     this.on('update', () => { this.draw(); });
});

riot.tag2('page03', '', '', '', function(opts) {
     this.mixin(MIXINS.page);

     this.on('mount', () => { this.draw(); });
     this.on('update', () => { this.draw(); });
});

riot.tag2('page04', '', '', '', function(opts) {
     this.mixin(MIXINS.page);

     this.on('mount', () => { this.draw(); });
     this.on('update', () => { this.draw(); });
});

riot.tag2('page05', '', '', '', function(opts) {
     this.mixin(MIXINS.page);

     this.on('mount', () => { this.draw(); });
     this.on('update', () => { this.draw(); });
});

riot.tag2('page01-sec1', '<section-header-with-breadcrumb title="Page01 Sec 1"></section-header-with-breadcrumb>', '', '', function(opts) {
});

riot.tag2('page01-sec2', '<section-header-with-breadcrumb title="Page01 Sec 2"></section-header-with-breadcrumb>', '', '', function(opts) {
});

riot.tag2('page01-sec3', '<section-header-with-breadcrumb title="Page01 Sec 3"></section-header-with-breadcrumb>', '', '', function(opts) {
});

riot.tag2('page01-sec_root', '<section-header title="S-SERIALIZATION" subtitle="データ/オブジェクトをシリアライズ/デシリアライズするためのライブラリです。"></section-header> <section-container title="概要"> <section-contents> <p>以下のフォーマットにシリアライズ/デシリアライズ出来ます。</p> <ol style="margin-left:3.0rem;"> <li>XML</li> <li><a href="https://www.emacswiki.org/emacs/Sexp#sexp">S式</a></li> </ol> </section-contents> <section-contents title="生い立ち"> <div class="contents"> <p> <a href="https://bitbucket.org/skypher/cl-prevalence">CL-PREVALENCE</a> から切り出したものです。 </p> <p> <a href="https://bitbucket.org/skypher/cl-prevalence">CL-PREVALENCE</a> からフォークした 拙作 の <a href="https://github.com/yanqirenshi/upanishad">UPANISHAD</a> を書く上で一旦切り出しました。 </p> </div> </section-contents> </section-container> <section-container title="Usage"> <div class="contents"> <p>XML へのシリアライズ、XMLからのシリアライズを以下のように行います。</p> </div> <section-contents no="4" title="シリアライズ"> <pre>(<a href="#page03/serialize-xml">serialize-xml</a> objects out (serialization-state pool))</pre> </section-contents> <section-contents no="4" title="デシリアライズ"> <pre>(<a href="#page03/deserialize-xml">deserialize-xml</a> in (serialization-state pool))</pre> </section-contents> </section-container> <section-container title="Install"> </section-container> <section-container title="Tests"> <section-contents> <p> <pre>(asdf:test-system :s-serialization-test)</pre> </p> </section-contents> </section-container> <section-footer></section-footer>', '', '', function(opts) {
     this.sections = () => {
         let pages = STORE.state().get('site').pages;
         let page = pages.find((d) => { return d.code=='page01'; });

         return page.sections;
     }
});

riot.tag2('page02-sec_root', '<section-header title="永続化"></section-header> <section-container title="概要"> <section-contents> <p>永続化の対象とフォーマットについて説明します。</p> </section-contents> </section-container> <section-container title="対象"> <section-contents> <p>永続化は以下の表のように永続化されます。</p> <serialize-type-matrix></serialize-type-matrix> </section-contents> </section-container> <section-container title="フォーマット"> <section-container> <p>対象毎に出力されるフォーマットは以下の通りです。</p> </section-container> <section-container title="Type: null"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> <section-container title="Type: symbol"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> <section-container title="Type: character"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> <section-container title="Type: string"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> <section-container title="Type: number"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> <section-container title="Type: complex"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> <section-container title="Type: float"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> <section-container title="Type: integer"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> <section-container title="Type: ratio"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> </section-container> <section-container title="Type: hash-table"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> <section-container title="Type: sequence"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> <section-container title="Type: standard-object"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> <section-container title="Type: structure-object"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> </section-container>', '', '', function(opts) {
});

riot.tag2('page03-sec_root', '<section-header title="カスタマイズ" subtitle="カスタマイズの方法について説明します。"></section-header> <section-container title="概要"> <section-contents> <p>データタイプを増やすことでカスタマイズが可能。</p> <p>シリアライズのカスタマイズは <code>*-internal</code> でカスタマイズが可能</p> <p>デシリアライズの場合は -aux でカスタマイズが可能。</p> </section-contents> </section-container> <section-container title="カスタマイズ"> <section-contents no="4" title="構造"> <p> シリアライズ/デシリアライズのオペレータは以下の様な構成になっています。<br> 以下の例は XML ですが SEXP でも同じ構成です。 </p> <p> <a>serialize-xml</a> ---call---> <a>serialize-xml-internal</a> </p> <p> <a>deserialize-xml</a> ---call---> <a>serialize-xml-internal</a> </p> <p> 例えば、XML へのシリアライズの内容を変更したい場合は <a>serialize-xml-internal</a> をオーバーライドすると良いです。 </p> <p> また <a>serialize-xml-internal</a> は Generic Function なので、クラス毎でのカスタマイズが可能です。 </p> <p> デシリアライズに関しても同じことが言えます。 </p> </section-contents> <section-contents no="4" title="Operator: *-internal"> <p> 以下の Generic Function を利用してカスタマイズできます。 </p> <table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <th>Type</th> <th>serialize</th> <th>deserialize</th> </tr> </thead> <tbody> <tr> <th>XML</th> <td><a href="#page03/serialize-xml-internal">serialize-xml-internal</a></td> <td><a href="#page03/deserialize-xml-internal">deserialize-xml-internal</a></td> </tr> <tr> <th>SEXP</th> <td><a href="#page03/serialize-sexp-internal">serialize-sexp-internal</a></td> <td><a href="#page03/deserialize-sexp-internal">deserialize-sexp-internal</a></td> </tr> </tbody> </table> </section-contents> </section-container>', '', '', function(opts) {
});

riot.tag2('page04-sec_root', '<section-header title="CLASSES"></section-header> <section-container title="Class List" data="{classes()}"> <section-contents data="{opts.data}"> <div class="contents"> <class-list data="{opts.data}"></class-list> </div> </section-contents> </section-container> <serialization-state></serialization-state> <section-footer></section-footer>', '', '', function(opts) {
     this.classes = ()=>{
         return STORE.state().get('classes');
     };
});

riot.tag2('page05-sec_root', '<section-header title="OPERATORS"></section-header> <operators-root></operators-root>', '', '', function(opts) {
});
