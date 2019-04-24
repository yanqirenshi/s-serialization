riot.tag2('app-page-area', '', '', '', function(opts) {
     this.on('update', (action) => {
         if (this.opts.route)
             ROUTER.draw(this, STORE.get('site.pages'), this.opts.route);
     });
});

riot.tag2('app', '<menu-bar brand="{{label:\'RT\'}}" site="{site()}" moves="{[]}"></menu-bar> <app-page-area></app-page-area> <section-footer></section-footer>', '', '', function(opts) {
     this.site = () => {
         return STORE.state().get('site');
     };
     this.updateMenuBar = () => {
         if (this.tags['menu-bar'])
             this.tags['menu-bar'].update();
     }

     STORE.subscribe((action)=>{
         if (action.type=='MOVE-PAGE') {
             this.updateMenuBar();
             this.tags['app-page-area'].update({ opts: { route: action.route }});
         }
     });

     window.addEventListener('resize', (event) => {
         this.update();
     });

     if (location.hash=='')
         location.hash=STORE.get('site.active_page');
});

riot.tag2('markdown-preview', '', 'markdown-preview h1 { font-weight: bold; font-size: 20px; margin-top: 11px; margin-bottom: 6px; } markdown-preview h2 { font-weight: bold; font-size: 18px; margin-top: 8px; margin-bottom: 4px; } markdown-preview h3 { font-weight: bold; font-size: 16px; margin-top: 6px; margin-bottom: 3px; } markdown-preview h4 { font-weight: bold; font-size: 14px; margin-top: 6px; margin-bottom: 3px; } markdown-preview h5 { font-weight: bold; font-size: 12px; margin-bottom: 4px; } markdown-preview * { font-size: 12px; } markdown-preview table { border-collapse: collapse; } markdown-preview td { border: solid 0.6px #888888; padding: 2px 5px; } markdown-preview th { border: solid 0.6px #888888; padding: 2px 5px; background: #eeeeee; }', '', function(opts) {
     this.on('update', () => {
         this.root.innerHTML = this.opts.data;
     });

    this.root.innerHTML = opts.data

});

riot.tag2('menu-bar', '<aside class="menu"> <p ref="brand" class="menu-label" onclick="{clickBrand}"> {opts.brand.label} </p> <ul class="menu-list"> <li each="{opts.site.pages}"> <a class="{opts.site.active_page==code ? \'is-active\' : \'\'}" href="{\'#\' + code}"> {menu_label} </a> </li> </ul> </aside> <div class="move-page-menu hide" ref="move-panel"> <p each="{moves()}"> <a href="{href}">{label}</a> </p> </div>', 'menu-bar .move-page-menu { z-index: 666665; background: #ffffff; position: fixed; left: 55px; top: 0px; min-width: 111px; height: 100vh; box-shadow: 2px 0px 8px 0px #e0e0e0; padding: 22px 55px 22px 22px; } menu-bar .move-page-menu.hide { display: none; } menu-bar .move-page-menu > p { margin-bottom: 11px; } menu-bar > .menu { z-index: 666666; height: 100vh; width: 55px; padding: 11px 0px 11px 11px; position: fixed; left: 0px; top: 0px; background: #e198b4; } menu-bar .menu-label, menu-bar .menu-list a { padding: 0; width: 33px; height: 33px; text-align: center; margin-top: 8px; border-radius: 3px; background: none; color: #ffffff; font-weight: bold; padding-top: 7px; font-size: 14px; } menu-bar .menu-label,[data-is="menu-bar"] .menu-label{ background: #ffffff; color: #e198b4; } menu-bar .menu-label.open,[data-is="menu-bar"] .menu-label.open{ background: #ffffff; color: #e198b4; width: 44px; border-radius: 3px 0px 0px 3px; text-shadow: 0px 0px 1px #eee; padding-right: 11px; } menu-bar .menu-list a.is-active { width: 44px; padding-right: 11px; border-radius: 3px 0px 0px 3px; background: #ffffff; color: #333333; }', '', function(opts) {
     this.moves = () => {
         let moves = [
             { code: 'link-a', href: '', label: 'Link A' },
             { code: 'link-b', href: '', label: 'Link B' },
             { code: 'link-c', href: '', label: 'Link C' },
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

riot.tag2('modal-description-editor', '<div class="modal {isActive()}"> <div class="modal-background"></div> <div class="modal-content" style="width: 88vw;"> <div class="card"> <div class="card-content" style="height: 88vh;"> <div style="display:flex; height: 100%; width: 100%;flex-direction: column;"> <div style="margin-bottom:11px;"> <h1 class="title is-4">{title()} の Description の変更</h1> </div> <div style="display:flex; flex-grow: 1"> <div style="flex-grow: 1;margin-right: 8px;"> <div class="element-container"> <h1 class="title is-5">Markdown</h1> <textarea class="input" ref="description" onkeyup="{inputDescription}">{description()}</textarea> </div> </div> <div style=";flex-grow: 1;margin-left: 8px;"> <div class="element-container"> <h1 class="title is-5">Preview</h1> <div class="preview" style="padding: 0px 11px 11px 11px;"> <markdown-preview data="{marked(markdown)}"></markdown-preview> </div> </div> </div> </div> <div style="margin-top:11px;"> <button class="button is-warning" onclick="{clickCancel}">Cancel</button> <button class="button is-danger" style="float:right;" onclick="{clickSave}">Save</button> </div> </div> </div> </div> </div> </div>', 'modal-description-editor .element-container { display:flex; height: 100%; width: 100%; flex-direction: column; } modal-description-editor .element-container .title{ margin-bottom:6px; } modal-description-editor .input { border: 1px solid #eeeeee; padding: 11px; box-shadow: none; height: 100%; width: 100%; } modal-description-editor .preview { border: 1px solid #eeeeee; flex-grow:1; }', '', function(opts) {
     this.markdown = null;

     this.clickCancel = () => {
         this.opts.callback('close-modal-description-editor');
     };
     this.clickSave = () => {
         this.opts.callback('save-column-instance-description', {
             object: this.opts.data,
             value: this.refs['description'].value,
         });
     };
     this.inputDescription = () => {
         this.markdown = this.refs['description'].value;

         this.tags['markdown-preview'].update();
     };

     this.description = () => {
         if (!this.markdown) {
             let obj = this.opts.data;

             this.markdown = !obj ? '' : obj.description;
         }

         return this.markdown;
     };
     this.title = () => {
         if (!this.opts.data)
             return '';

         let obj = this.opts.data;
         return obj._class + ':' + obj.name;
     };
     this.isActive = () => {
         return this.opts.data ? 'is-active' : '';
     };
});

riot.tag2('page-tabs', '<div class="tabs is-boxed"> <ul> <li each="{opts.core.tabs}" class="{opts.core.active_tab==code ? \'is-active\' : \'\'}"> <a code="{code}" onclick="{clickTab}">{label}</a> </li> </ul> </div>', 'page-tabs li:first-child { margin-left: 55px; }', '', function(opts) {
     this.clickTab = (e) => {
         let code = e.target.getAttribute('code');
         this.opts.callback(e, 'CLICK-TAB', { code: code });
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

riot.tag2('section-footer', '<footer class="footer"> <div class="container"> <div class="content has-text-centered"> <p> </p> </div> </div> </footer>', 'section-footer > .footer { background: #ffffff; padding-top: 13px; padding-bottom: 13px; }', '', function(opts) {
});

riot.tag2('section-header-with-breadcrumb', '<section-header title="{opts.title}"></section-header> <section-breadcrumb></section-breadcrumb>', 'section-header-with-breadcrumb section-header > .section,[data-is="section-header-with-breadcrumb"] section-header > .section{ margin-bottom: 3px; }', '', function(opts) {
});

riot.tag2('section-header', '<section class="section"> <div class="container"> <h1 class="title is-{opts.no ? opts.no : 3}"> {opts.title} </h1> <h2 class="subtitle">{opts.subtitle}</h2> <yield></yield> </div> </section>', 'section-header > .section { background: #ffffff; }', '', function(opts) {
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

riot.tag2('sections-list', '<table class="table"> <tbody> <tr each="{opts.data}"> <td><a href="{hash}">{code}</a></td> <td>{tag}</td> </tr> </tbody> </table>', '', '', function(opts) {
});

riot.tag2('customize-page', '<section-header title="カスタマイズ"></section-header> <div style="padding-left:55px;"> <page-tabs core="{page_tabs}" callback="{clickTab}"></page-tabs> </div> <div> <customize-page_tab-readme class="hide"></customize-page_tab-readme> <customize-page_tab-tab1 class="hide"></customize-page_tab-tab1> <customize-page_tab-tab2 class="hide"></customize-page_tab-tab2> <customize-page_tab-tab3 class="hide"></customize-page_tab-tab3> <customize-page_tab-help class="hide"></customize-page_tab-help> </div>', '', '', function(opts) {
     this.page_tabs = new PageTabs([
         {code: 'readme', label: 'README', tag: 'customize-page_tab-readme' },
         {code: 'tab1',   label: 'TAB1',   tag: 'customize-page_tab-tab1' },
         {code: 'tab2',   label: 'TAB2',   tag: 'customize-page_tab-tab2' },
         {code: 'tab3',   label: 'TAB3',   tag: 'customize-page_tab-tab3' },
         {code: 'help',   label: 'HELP',   tag: 'customize-page_tab-help' },
     ]);

     this.on('mount', () => {
         this.page_tabs.switchTab(this.tags)
         this.update();
     });

     this.clickTab = (e, action, data) => {
         if (this.page_tabs.switchTab(this.tags, data.code))
             this.update();
     };
});

riot.tag2('customize-page_tab-help', '<section class="section"> <div class="container"> <h1 class="title">HELP</h1> <h2 class="subtitle"> </h2> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('customize-page_tab-readme', '<section class="section"> <div class="container"> <h1 class="title">概要</h1> <h2 class="subtitle"></h2> <div class="contents"> <p>データタイプを増やすことでカスタマイズが可能。</p> <p>シリアライズのカスタマイズは <code>*-internal</code> でカスタマイズが可能</p> <p>デシリアライズの場合は -aux でカスタマイズが可能。</p> </div> </div> </section> <section class="section"> <div class="container"> <h1 class="title">カスタマイズ</h1> <h2 class="subtitle"></h2> <div class="contents"> </div> <section class="section"> <div class="container"> <h1 class="title is-4">構造</h1> <h2 class="subtitle"></h2> <div class="contents"> <p> シリアライズ/デシリアライズのオペレータは以下の様な構成になっています。<br> 以下の例は XML ですが SEXP でも同じ構成です。 </p> <p> <a>serialize-xml</a> ---call---> <a>serialize-xml-internal</a> </p> <p> <a>deserialize-xml</a> ---call---> <a>serialize-xml-internal</a> </p> <p> 例えば、XML へのシリアライズの内容を変更したい場合は <a>serialize-xml-internal</a> をオーバーライドすると良いです。 </p> <p> また <a>serialize-xml-internal</a> は Generic Function なので、クラス毎でのカスタマイズが可能です。 </p> <p> デシリアライズに関しても同じことが言えます。 </p> </div> </div> </section> <section class="section"> <div class="container"> <h1 class="title is-4">Operator: *-internal</h1> <h2 class="subtitle"></h2> <div class="contents"> <p> 以下の Generic Function を利用してカスタマイズできます。 </p> <table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <th>Type</th> <th>serialize</th> <th>deserialize</th> </tr> </thead> <tbody> <tr> <th>XML</th> <td><a href="#page03/serialize-xml-internal">serialize-xml-internal</a></td> <td><a href="#page03/deserialize-xml-internal">deserialize-xml-internal</a></td> </tr> <tr> <th>SEXP</th> <td><a href="#page03/serialize-sexp-internal">serialize-sexp-internal</a></td> <td><a href="#page03/deserialize-sexp-internal">deserialize-sexp-internal</a></td> </tr> </tbody> </table> </div> </div> </section> </div> </section>', '', '', function(opts) {
});

riot.tag2('customize-page_tab-tab1', '<section class="section"> <div class="container"> <h1 class="title">TAB1</h1> <h2 class="subtitle"> </h2> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('customize-page_tab-tab2', '<section class="section"> <div class="container"> <h1 class="title">TAB2</h1> <h2 class="subtitle"> </h2> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('customize-page_tab-tab3', '<section class="section"> <div class="container"> <h1 class="title">TAB3</h1> <h2 class="subtitle"> </h2> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('home-page_tab-classes', '<section class="section"> <div class="container"> <h1 class="title">Description</h1> <h2 class="subtitle"></h2> <div class="contents"> <p><code>SERIALIZATION-STATE</code> 一つのみです。今のところ。</p> </div> </div> </section> <section class="section"> <div class="container"> <h1 class="title">List</h1> <h2 class="subtitle"></h2> <div class="contents"> <table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <th>Symbol</th> <th>Package</th> <th>Parent</th> </tr> </thead> <tbody> <tr each="{obj in classes}"> <td>{obj.symbol}</td> <td>{obj.package}</td> <td>{obj.parent}</td> </tr> </tbody> </table> </div> </div> </section>', '', '', function(opts) {
     this.classes = [
         { parent: 't (?)', symbol: 'SERIALIZATION-STATE', package: '' },
     ];
});

riot.tag2('home-page_tab-operators', '<section class="section"> <div class="container"> <h1 class="title">Description</h1> <h2 class="subtitle"></h2> <div class="contents"> <p>(たぶん)オペレータは以下の三つに分類できます。</p> <p>(1) シリアライズ</p> <p>(2) デシリアライズ</p> <p>(3) ステート</p> </div> </div> </section> <section class="section"> <div class="container"> <h1 class="title">オペレータ</h1> <h2 class="subtitle"></h2> <div class="contents"> <p> XMLのデシリアライズの internal が存在しません。<br> 制作途中で事切れたのでしょうか。 </p> <core-operator-list></core-operator-list> </div> </div> </section> <section class="section"> <div class="container"> <h1 class="title">Dictionaries</h1> <h2 class="subtitle"></h2> <div class="contents"> <operator-list data="{operators()}"></operator-list> </div> </div> </section>', '', '', function(opts) {
     this.operators = ()=>{
         let operators = STORE.state().get('operators');
         let targets = []

         for (var i in operators)

             targets.push(operators[i]);

         return targets;
     };
});

riot.tag2('home-page_tab-packages', '<section class="section"> <div class="container"> <h1 class="title">List</h1> <h2 class="subtitle"></h2> <div class="contents"> <table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <th>Symbol</th> <th>Description</th> </tr> </thead> <tbody> <tr each="{obj in packages}"> <td>{obj.name}</td> <td>{obj.description}</td> </tr> </tbody> </table> </div> </div> </section>', '', '', function(opts) {
     this.packages = STORE.get('packages');
});

riot.tag2('home-page_tab-readme', '<section class="section"> <div class="container"> <h1 class="title">Description</h1> <h2 class="subtitle"></h2> <div class="contents"> <p>データ/オブジェクトをシリアライズ/デシリアライズするためのライブラリです。</p> </div> <section class="section"> <div class="container"> <h1 class="title is-4">生い立ち</h1> <h2 class="subtitle"></h2> <div class="contents"> <p> <a href="https://bitbucket.org/skypher/cl-prevalence">CL-PREVALENCE</a> から切り出したものです。 </p> <p> <a href="https://bitbucket.org/skypher/cl-prevalence">CL-PREVALENCE</a> からフォークした 拙作 の <a href="https://github.com/yanqirenshi/upanishad">UPANISHAD</a> を書く上で一旦切り出しました。 </p> </div> </div> </section> <section class="section"> <div class="container"> <h1 class="title is-4">出来ること</h1> <h2 class="subtitle"></h2> <div class="contents"> <p>以下のフォーマットにシリアライズ/デシリアライズ出来ます。</p> <ol style="margin-left:3.0rem;"> <li>XML</li> <li><a href="https://www.emacswiki.org/emacs/Sexp#sexp">S式</a></li> </ol> </div> </div> </section> </div> </section> <section class="section"> <div class="container"> <h1 class="title">Authors</h1> <h2 class="subtitle"></h2> <div class="contents"> <p>yanqirenshi@gmail.com</p> </div> </div> </section> <section class="section"> <div class="container"> <h1 class="title">Licence</h1> <h2 class="subtitle"></h2> <div class="contents"> <p>LLGPL</p> </div> </div> </section>', '', '', function(opts) {
     this.sections = () => {
         let pages = STORE.state().get('site').pages;
         let page = pages.find((d) => { return d.code=='page01'; });

         return page.sections;
     }
});

riot.tag2('home-page_tab-usage', '<section class="section"> <div class="container"> <h1 class="title">シリアライズ</h1> <h2 class="subtitle"></h2> <div class="contents"> <p><pre>(<a href="#page03/serialize-xml">serialize-xml</a> objects stream (serialization-state pool))</pre></p> <br> <p>今後は以下のようにする方向。</p> <p><pre>(hole:black stream objects :state (serialization-state pool))</pre></p> </div> </div> </section> <section class="section"> <div class="container"> <h1 class="title">デシリアライズ</h1> <h2 class="subtitle"></h2> <div class="contents"> <pre>(<a href="#page03/deserialize-xml">deserialize-xml</a> stream (serialization-state pool))</pre> <br> <p>今後は以下のようにする方向。</p> <p><pre>(hole:white stream :state (serialization-state pool))</pre></p> </div> </div> </section> <section class="section"> <div class="container"> <h1 class="title">Test</h1> <h2 class="subtitle"></h2> <div class="contents"> <p> <pre>(asdf:test-system :s-serialization-test)</pre> </p> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('home_page', '<section-header title="Hole (S-SERIALIZATION)"></section-header> <div style="padding-left:55px;"> <page-tabs core="{page_tabs}" callback="{clickTab}"></page-tabs> </div> <div> <home-page_tab-readme class="hide"></home-page_tab-readme> <home-page_tab-usage class="hide"></home-page_tab-usage> <home-page_tab-classes class="hide"></home-page_tab-classes> <home-page_tab-operators class="hide"></home-page_tab-operators> <home-page_tab-packages class="hide"></home-page_tab-packages> </div>', '', '', function(opts) {
     this.page_tabs = new PageTabs([
         {code: 'readme',    label: 'README',    tag: 'home-page_tab-readme' },
         {code: 'usage',     label: 'Usage',     tag: 'home-page_tab-usage' },
         {code: 'operators', label: 'Operators', tag: 'home-page_tab-operators' },
         {code: 'classes',   label: 'Classes',   tag: 'home-page_tab-classes' },
         {code: 'packages',  label: 'Packages',  tag: 'home-page_tab-packages' },
     ]);

     this.on('mount', () => {
         this.page_tabs.switchTab(this.tags)
         this.update();
     });

     this.clickTab = (e, action, data) => {
         if (this.page_tabs.switchTab(this.tags, data.code))
             this.update();
     };
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

riot.tag2('persistence-page', '<section-header title="永続化"></section-header> <div style="padding-left:55px;"> <page-tabs core="{page_tabs}" callback="{clickTab}"></page-tabs> </div> <div> <persistence-page_tab-readme class="hide"></persistence-page_tab-readme> <persistence-page_tab-tab1 class="hide"></persistence-page_tab-tab1> <persistence-page_tab-tab2 class="hide"></persistence-page_tab-tab2> <persistence-page_tab-tab3 class="hide"></persistence-page_tab-tab3> <persistence-page_tab-help class="hide"></persistence-page_tab-help> </div>', '', '', function(opts) {
     this.page_tabs = new PageTabs([
         {code: 'readme', label: 'README', tag: 'persistence-page_tab-readme' },
         {code: 'tab1',   label: 'Output format',   tag: 'persistence-page_tab-tab1' },
         {code: 'tab2',   label: 'TAB2',   tag: 'persistence-page_tab-tab2' },
         {code: 'tab3',   label: 'TAB3',   tag: 'persistence-page_tab-tab3' },
         {code: 'help',   label: 'HELP',   tag: 'persistence-page_tab-help' },
     ]);

     this.on('mount', () => {
         this.page_tabs.switchTab(this.tags)
         this.update();
     });

     this.clickTab = (e, action, data) => {
         if (this.page_tabs.switchTab(this.tags, data.code))
             this.update();
     };
});

riot.tag2('persistence-page_tab-help', '<section class="section"> <div class="container"> <h1 class="title">HELP</h1> <h2 class="subtitle"> </h2> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('persistence-page_tab-readme', '<section class="section"> <div class="container"> <h1 class="title">概要</h1> <h2 class="subtitle"></h2> <div class="contents"> <p>永続化の対象とフォーマットについて説明します。</p> </div> </div> </section> <section class="section"> <div class="container"> <h1 class="title">対象</h1> <h2 class="subtitle"></h2> <div class="contents"> <p>永続化は以下の表のように永続化されます。</p> <serialize-type-matrix></serialize-type-matrix> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('persistence-page_tab-tab1', '<section class="section"> <div class="container"> <h1 class="title"></h1> <h2 class="subtitle"></h2> <section-container> <p>対象毎に出力されるフォーマットは以下の通りです。</p> </section-container> <section-container title="Type: null"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> <section-container title="Type: symbol"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> <section-container title="Type: character"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> <section-container title="Type: string"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> <section-container title="Type: number"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> <section-container title="Type: complex"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> <section-container title="Type: float"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> <section-container title="Type: integer"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> <section-container title="Type: ratio"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> </section-container> <section-container title="Type: hash-table"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> <section-container title="Type: sequence"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> <section-container title="Type: standard-object"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> <section-container title="Type: structure-object"> <section-contents title="xml"></section-contents> <section-contents title="sexp"></section-contents> </section-container> </div> </section>', '', '', function(opts) {
});

riot.tag2('persistence-page_tab-tab2', '<section class="section"> <div class="container"> <h1 class="title">TAB2</h1> <h2 class="subtitle"> </h2> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('persistence-page_tab-tab3', '<section class="section"> <div class="container"> <h1 class="title">TAB3</h1> <h2 class="subtitle"> </h2> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('serialize-type-matrix', '<table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <th colspan="3">Sexp</th> <th colspan="2">Xml</th> </tr> <tr> <th>type</ty> <th>keyword</ty> <th>value</ty> <th>type</ty> <th>tag</ty> </tr> </thead> <tbody> <tr> <th>null</th> <td>---</td> <td>"NIL"</td> <th>null</th> <td>&lt;NULL/&gt;</td> </tr> <tr> <th>t</th> <td>---</td> <td>"T"</td> <th>t</th> <td>&lt;TRUE/&gt;</td> </tr> <tr> <th>symbol</th> <td>---</td> <td>print-symbol</td> <th>symbol</th> <td>&lt;SYMBOL&gt;</td> </tr> <tr> <th>character</th> <td>---</td> <td>prin1</td> <th>character</th> <td>&lt;CHARACTER&gt; </td> </tr> <tr> <th>string</th> <td>---</td> <td>prin1</td> <th>string</th> <td>&lt;STRING&gt;</td> </tr> <tr> <th rowspan="4">number</th> <td rowspan="4">---</td> <td rowspan="4">prin1</td> <th>complex</th> <td>&lt;COMPLEX&gt;</td> </tr> <tr> <th>float</th> <td>&lt;FLOAT&gt;</td> </tr> <tr> <th>integer</th> <td>&lt;INT&gt;</td> </tr> <tr> <th>ratio</th> <td>&lt;RATIO&gt;</td> </tr> <tr> <th>hash-table</th> <td>:HASH-TABLE</td> <td></td> <th>hash-table</th> <td>&lt;HASH-TABLE&gt;</td> </tr> <tr> <th>sequence</th> <td>:SEQUENCE</td> <td></td> <th>sequence</th> <td>&lt;SEQUENCE&gt;</td> </tr> <tr> <th>standard-object</th> <td>:OBJECT</td> <td></td> <th>standard-object</th> <td>&lt;OBJECT&gt;</td> </tr> <tr> <th>structure-object</th> <td>:STRUCT</td> <td></td> <th>structure-object</th> <td>&lt;STRUCT&gt;</td> </tr> </tbody> </table>', '', '', function(opts) {
});
