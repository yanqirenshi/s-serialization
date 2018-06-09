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

riot.tag2('serialization-state', '<section-3 title="Class: SERIALIZATION-STATE"> <h2 class="subtitle"> </h2> </section-3> <section-3 title="Description"> <h2 class="subtitle"></h2> <div class="contents"> </div> </section-3> <section-3 title="Slots"> <h2 class="subtitle"></h2> <div class="contents"> <table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <th>Name</th> <th>Type</th> <th>Description</th> </tr> </thead> <tbody> <tr> <th>xml-parser-state</th> <td></td> <td></td> </tr> <tr> <th>counter</th> <td>integer</td> <td></td> </tr> <tr> <th>hashtable</th> <td>hash-table</td> <td></td> </tr> <tr> <th>known-slots</th> <td>hash-table</td> <td></td> </tr> </tbody> </table> </div> </section-3>', '', '', function(opts) {
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

riot.tag2('section-container', '<section class="section"> <div class="container"> <h1 class="title">{opts.title}</h1> <h2 class="subtitle">{opts.subtitle}</h2> <yield></yield> </div> </section>', '', '', function(opts) {
});

riot.tag2('section-contents', '<section class="section"> <div class="container"> <h1 class="title is-{opts.no ? opts.no : 3}"> {opts.title} </h1> <h2 class="subtitle">{opts.subtitle}</h2> <div class="contents"> <yield></yield> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('section-footer', '<footer class="footer"> <div class="container"> <div class="content has-text-centered"> Footer ........ </div> </div> </footer>', 'section-footer > footer.footer{ background: #eeeeee; }', '', function(opts) {
});

riot.tag2('section-header', '<section class="section"> <div class="container"> <h1 class="title is-2">{opts.title}</h1> <yield></yield> </div> </section>', 'section-header > section.section{ background: #eeeeee; }', '', function(opts) {
});

riot.tag2('core-operator-list', '<table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <th>Type</th> <th>Action</th> <th>Root</th> <th>Internal</th> </thead> <tbody> <tr> <th rowspan="2">sexp</th> <th>serialize</th> <td><serialize-sexp-a></serialize-sexp-a></td> <td><serialize-sexp-internal-a></serialize-sexp-internal-a></td> </tr> <tr> <th>deserialize</th> <td><deserialize-sexp-a></deserialize-sexp-a></td> <td><deserialize-sexp-internal></deserialize-sexp-internal></td> </tr> <tr> <th rowspan="2">xml</th> <th>serialize</th> <td><serialize-xml-a></serialize-xml-a></td> <td><serialize-xml-internal-a></serialize-xml-internal-a></td> </tr> <tr> <th>deserialize</th> <td><deserialize-xml-a></deserialize-xml-a></td> <td>--</td> </tr> </tbody> </table>', '', '', function(opts) {
});

riot.tag2('deserialize-sexp-a', '<a href="#page03/deserialize-sexp">DESERIALIZE-SEXP</a>', '', '', function(opts) {
});

riot.tag2('deserialize-sexp-internal', '<a href="#page03/deserialize-sexp-internal">DESERIALIZE-SEXP-INTERNAL</a>', '', '', function(opts) {
});

riot.tag2('deserialize-sexp', '<section-3 title="Function: DESERIALIZE-SEXP"> </section-3>', '', '', function(opts) {
});

riot.tag2('deserialize-xml-a', '<a href="#page03/deserialize-xml">DESERIALIZE-XML</a>', '', '', function(opts) {
});

riot.tag2('deserialize-xml-internal-a', '<a href="#page03/deserialize-xml-internal">DESERIALIZE-XML-INTERNAL</a>', '', '', function(opts) {
});

riot.tag2('deserialize-xml', '<section-3 title="Function: DESERIALIZE-XML"> </section-3>', '', '', function(opts) {
});

riot.tag2('get-xml-parser-state', '<section-3 title="Generic Function: GET-XML-PARSER-STATE"> </section-3>', '', '', function(opts) {
});

riot.tag2('known-object-id', '<section-3 title="Generic Function: KNOWN-OBJECT-ID"> </section-3>', '', '', function(opts) {
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

riot.tag2('operators-root', '<section-3 title="Description"> <h2 class="subtitle"></h2> <div class="contents"> <p>(たぶん)オペレータは以下の三つに分類できます。</p> <p>(1) シリアライズ</p> <p>(2) デシリアライズ</p> <p>(3) ステート</p> </div> </section-3> <section-3 title="オペレータ" data="{operators()}"> <div class="contents"> <p> XMLのデシリアライズの internal が存在しません。<br> 制作途中で事切れたのでしょうか。 </p> <core-operator-list></core-operator-list> </div> </section-3> <section-3 title="データ・タイプ" data="{operators()}"> <div class="contents"> <p></p> <serialize-type-matrix></serialize-type-matrix> </div> </section-3> <section-3 title="Dictionaries" data="{operators()}"> <div class="contents"> <operator-list data="{opts.data}"></operator-list> </div> </section-3>', '', '', function(opts) {
     this.operators = ()=>{
         let operators = STORE.state().get('operators');
         let targets = []
         for (var i in operators)

             targets.push(operators[i]);
         return targets;
     };
});

riot.tag2('reset-known-slots', '<section-3 title="Generic Function: RESET-KNOWN-SLOTS"> </section-3>', '', '', function(opts) {
});

riot.tag2('reset', '<section-3 title="Generic Function: RESET"> </section-3>', '', '', function(opts) {
});

riot.tag2('serializable-slots', '<section-3 title="Generic Function: SERIALIZABLE-SLOTS"> <div class="contents"> <pre>serializable-slots object</pre> </div> <section-4 title="Description"> <div class="contents"> </div> </section-4> <section-4 title="Methods"> <div class="contents"> <table class="table"> <thead> <tr> <th>Object</th> </tr> </thead> <tbody> <tr><td>structure-object</td></tr> <tr><td>standard-object</td></tr> </tbody> </table> </div> </section-4> </section-3>', '', '', function(opts) {
});

riot.tag2('serialize-sexp-a', '<a href="#page03/serialize-sexp">SERIALIZE-SEXP</a>', '', '', function(opts) {
});

riot.tag2('serialize-sexp-internal-a', '<a href="#page03/serialize-sexp-internal">SERIALIZE-SEXP-INTERNAL</a>', '', '', function(opts) {
});

riot.tag2('serialize-sexp-internal', '<section-3 title="Generic Function: SERIALIZE-SEXP-INTERNAL"> <div class="contents"> <pre>serialize-xml-internal object stream serialization-state</pre> </div> <section-4 title="Description"> <div class="contents"> </div> </section-4> <section-4 title="Methods"> <div class="contents"> <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"> <thead> <tr> <th colspan="3">Arguments</th> <th rowspan="2">Description</th> </tr> <tr> <th>Object</th> <th>stream</th> <th>serialization-state</th> </tr> </thead> <tbody> <tr><td>null</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>(eql \'t)</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>string</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>character</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>symbol</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>sequence</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>hash-table</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>structure-object</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>standard-object</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>number</td> <td>stream</td> <td>serialize-sexp-internal</td> <td></td></tr> </tbody> </table> </div> </section-4> </section-3>', '', '', function(opts) {
});

riot.tag2('serialize-sexp', '<section-3 title="Function: SERIALIZE-SEXP"> <div class="contents"> <pre>serialize-sexp object stream &optional serialization-state</pre> </div> <section-4 title="Description"> <div class="contents"> <p><a href="#page03/serialize-sexp-internal">serialize-sexp-internal</a> をコールして object をS式(文字列)に変換します。</p> <p>文字列に変換したものを stream に出力します。</p> sexp は<a href="https://www.emacswiki.org/emacs/Sexp#sexp">S式</a>のことです。 </div> </section-4> <section-4 title="Arguments"> <div class="contents"> <table class="table"> <thead> <tr> <th>Name</th> <th>Description</th> </tr> </thead> <tbody> <tr> <th>object</th> <td></td> </tr> <tr> <th>stream</th> <td></td> </tr> <tr> <th>serialization-state</th> <td>初期値: (make-serialization-state)</td> </tr> </tbody> </table> </div> </section-4> </section-3>', '', '', function(opts) {
});

riot.tag2('serialize-type-matrix', '<table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <th colspan="3">Sexp</th> <th colspan="2">Xml</th> </tr> <tr> <th>type</ty> <th>keyword</ty> <th>value</ty> <th>type</ty> <th>tag</ty> </tr> </thead> <tbody> <tr> <th>null</th> <td>---</td> <td>"NIL"</td> <th>null</th> <td>&lt;NULL/&gt;</td> </tr> <tr> <th>t</th> <td>---</td> <td>"T"</td> <th>t</th> <td>&lt;TRUE/&gt;</td> </tr> <tr> <th>symbol</th> <td>---</td> <td>print-symbol</td> <th>symbol</th> <td>&lt;SYMBOL&gt;</td> </tr> <tr> <th>character</th> <td>---</td> <td>prin1</td> <th>character</th> <td>&lt;CHARACTER&gt; </td> </tr> <tr> <th>string</th> <td>---</td> <td>prin1</td> <th>string</th> <td>&lt;STRING&gt;</td> </tr> <tr> <th rowspan="4">number</th> <td rowspan="4">---</td> <td rowspan="4">prin1</td> <th>complex</th> <td>&lt;COMPLEX&gt;</td> </tr> <tr> <th>float</th> <td>&lt;FLOAT&gt;</td> </tr> <tr> <th>integer</th> <td>&lt;INT&gt;</td> </tr> <tr> <th>ratio</th> <td>&lt;RATIO&gt;</td> </tr> <tr> <th>hash-table</th> <td>:HASH-TABLE</td> <td></td> <th>hash-table</th> <td>&lt;HASH-TABLE&gt;</td> </tr> <tr> <th>sequence</th> <td>:SEQUENCE</td> <td></td> <th>sequence</th> <td>&lt;SEQUENCE&gt;</td> </tr> <tr> <th>standard-object</th> <td>:OBJECT</td> <td></td> <th>standard-object</th> <td>&lt;OBJECT&gt;</td> </tr> <tr> <th>structure-object</th> <td>:STRUCT</td> <td></td> <th>structure-object</th> <td>&lt;STRUCT&gt;</td> </tr> </tbody> </table>', '', '', function(opts) {
});

riot.tag2('serialize-xml-a', '<a href="#page03/serialize-xml">SERIALIZE-XML</a>', '', '', function(opts) {
});

riot.tag2('serialize-xml-internal-a', '<a href="#page03/serialize-xml-internal">SERIALIZE-XML-INTERNAL</a>', '', '', function(opts) {
});

riot.tag2('serialize-xml-internal', '<section-3 title="Generic Function: SERIALIZE-XML-INTERNAL"> <div class="contents"> <pre>serialize-xml-internal object stream serialization-state</pre> </div> <section-4 title="Description"> <div class="contents"> <p>object を文字列に変換します。</p> <p>文字列に変換したものを stream に出力します。</p> </div> </section-4> <section-4 title="Methods"> <div class="contents"> <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"> <thead> <tr> <th colspan="3">Arguments</th> <th rowspan="2">description</th> </tr> <tr> <th>Object</th> <th>stream</th> <th>serialization-state</th> </tr> </thead> <tbody> <tr><td>integer</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>ratio</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>float</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>complex</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>null</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>(eql \'t)</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>string</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>character</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>symbol</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>sequence</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>hash-table</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>structure-object</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> <tr><td>standard-object</td> <td>stream</td> <td>serialization-state</td> <td></td></tr> </tbody> </table> </div> </section-4> </section-3>', '', '', function(opts) {
});

riot.tag2('serialize-xml', '<section-3 title="Function: SERIALIZE-XML"> <div class="contents"> <pre>serialize-xml object stream &optional serialization-state</pre> </div> <section-4 title="Description"> <div class="contents"> <p><a href="#page03/serialize-xml-internal">serialize-xml-internal</a> をコールして object をXML(文字列)に変換します。</p> <p>文字列に変換したものを stream に出力します。</p> </div> </section-4> <section-4 title="Arguments"> <div class="contents"> <table class="table"> <thead> <tr> <th>Name</th> <th>Description</th> </tr> </thead> <tbody> <tr> <th>object</th> <td></td> </tr> <tr> <th>stream</th> <td></td> </tr> <tr> <th>serialization-state</th> <td>初期値: (make-serialization-state)</td> </tr> </tbody> </table> </div> </section-4> </section-3>', '', '', function(opts) {
});

riot.tag2('set-known-object', '<section-3 title="Generic Function: SET-KNOWN-OBJECT"> </section-3>', '', '', function(opts) {
});

riot.tag2('page01', '<section-header title="S-SERIALIZATION"> <h2 class="subtitle"> データ/オブジェクトをシリアライズ/デシリアライズするためのライブラリです。。 </h2> </section-header> <section class="section"> <div class="container"> <h1 class="title">概要</h1> <div class="contents"> 以下のフォーマットにシリアライズ/デシリアライズ出来ます。 <ol style="margin-left:3.0rem;"> <li>XML</li> <li><a href="https://www.emacswiki.org/emacs/Sexp#sexp">S式</a></li> </ol> </div> </div> </section> <section-container title="Usage"> <div class="contents"> <p>XML へのシリアライズ、XMLからのシリアライズを以下のように行います。</p> </div> <section-contents no="4" title="シリアライズ"> <pre>(<a href="#page03/serialize-xml">serialize-xml</a> objects out (serialization-state pool))</pre> </section-contents> <section-contents no="4" title="デシリアライズ"> <pre>(<a href="#page03/deserialize-xml">deserialize-xml</a> in (serialization-state pool))</pre> </section-contents> </section-container> <section-container title="カスタマイズ"> <section-contents no="4" title="構造"> <p> シリアライズ/デシリアライズのオペレータは以下の様な構成になっています。<br> 以下の例は XML ですが SEXP でも同じ構成です。 </p> <p> <a>serialize-xml</a> ---call---> <a>serialize-xml-internal</a> </p> <p> <a>deserialize-xml</a> ---call---> <a>serialize-xml-internal</a> </p> <p> 例えば、XML へのシリアライズの内容を変更したい場合は <a>serialize-xml-internal</a> をオーバーライドすると良いです。 </p> <p> また <a>serialize-xml-internal</a> は Generic Function なので、クラス毎でのカスタマイズが可能です。 </p> <p> デシリアライズに関しても同じことが言えます。 </p> </section-contents> <section-contents no="4" title="Operator: *-internal"> <p> 以下の Generic Function を利用してカスタマイズできます。 </p> <table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <th>Type</th> <th>serialize</th> <th>deserialize</th> </tr> </thead> <tbody> <tr> <th>XML</th> <td><a href="#page03/serialize-xml-internal">serialize-xml-internal</a></td> <td><a href="#page03/deserialize-xml-internal">deserialize-xml-internal</a></td> </tr> <tr> <th>SEXP</th> <td><a href="#page03/serialize-sexp-internal">serialize-sexp-internal</a></td> <td><a href="#page03/deserialize-sexp-internal">deserialize-sexp-internal</a></td> </tr> </tbody> </table> </section-contents> </section-container> <section-3 title="生い立ち"> <div class="contents"> <p> <a href="https://bitbucket.org/skypher/cl-prevalence">CL-PREVALENCE</a> から切り出したものです。 </p> <p> <a href="https://bitbucket.org/skypher/cl-prevalence">CL-PREVALENCE</a> からフォークした 拙作 の <a href="https://github.com/yanqirenshi/upanishad">UPANISHAD</a> を書く上で一旦切り出しました。 </p> </div> </section-3> <section-footer></section-footer>', '', '', function(opts) {
});

riot.tag2('page02', '<section-header title="CLASSES"> <h2 class="subtitle"> </h2> </section-header> <section-3 title="Class List" data="{classes()}"> <h2 class="subtitle">クラスの一覧</h2> <div class="contents"> <class-list data="{this.opts.data}"></class-list> </div> </section-3> <serialization-state></serialization-state> <get-xml-parser-state></get-xml-parser-state> <reset></reset> <reset-known-slots></reset-known-slots> <known-object-id></known-object-id> <set-known-object></set-known-object> <section-footer></section-footer>', '', '', function(opts) {
     this.classes = ()=>{
         return STORE.state().get('classes');
     };
});

riot.tag2('page03', '<section-header title="OPERATORS" subtitle-hide="{headerSubtitleHide()}" breadcrumb-hide="{headerBreadcrumbHide()}" section-code="{sectionCode()}"> <h2 class="subtitle"> <p class="{opts.subtitleHide}"> オペレータのマニュアルです。 </p> <nav class="breadcrumb {opts.breadcrumbHide}" aria-label="breadcrumbs"> <ul> <li><a href="#page03">operators > </a></li> <li class="is-active"> <a href="#" aria-current="page">{opts.sectionCode}</a> </li> </ul> </nav> </h2> </section-header> <operators-root type="page-section" class="hide"></operators-root> <deserialize-sexp type="page-section" class="hide"></deserialize-sexp> <deserialize-xml type="page-section" class="hide"></deserialize-xml> <make-serialization-state type="page-section" class="hide"></make-serialization-state> <reset-known-slots type="page-section" class="hide"></reset-known-slots> <serializable-slots type="page-section" class="hide"></serializable-slots> <serialize-sexp type="page-section" class="hide"></serialize-sexp> <serialize-sexp-internal type="page-section" class="hide"></serialize-sexp-internal> <serialize-xml type="page-section" class="hide"></serialize-xml> <serialize-xml-internal type="page-section" class="hide"></serialize-xml-internal> <section-footer type="page-section" class="hide"></section-footer> <section-footer></section-footer>', 'page03 .hide { display:none; }', '', function(opts) {
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
